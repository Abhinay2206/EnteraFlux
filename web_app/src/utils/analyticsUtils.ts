/* ═══════════════════════════════════════════════════════════════
   Analytics Utility Functions
   Core computation engine for the Admin Analytics Dashboard
   ═══════════════════════════════════════════════════════════════ */

export interface SurveyResponse {
  id: string;
  submitted_at?: string;
  q1_age?: string;
  q2_gender?: string;
  q3_body_type?: string;
  q4_medical_conditions?: string;
  q5_tried_weight_loss?: string;
  q6_methods?: string[];
  q7_biggest_difficulty?: string;
  q8_consistency_duration?: string;
  q10_heard_about_injections?: string;
  q11_where_heard?: string;
  q12_opinion?: string;
  q13_consider_using?: string;
  q14_concerns?: string[];
  q15_family_members?: string;
  q16_relatives_know?: string;
  q17_know_anyone?: string;
  q18_support_family?: string;
  q20_use_apps?: string;
  q22_support_type?: string[];
  q23_would_use_app?: string;
  q24_useful_features?: string[];
  q25_would_pay?: string;
  q26_monthly_amount?: string;
  q27_what_convinces?: string[];
  [key: string]: unknown;
}

/* ─── Count helpers ─── */

export function countField(responses: SurveyResponse[], field: string): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const r of responses) {
    const val = r[field];
    if (Array.isArray(val)) {
      for (const item of val) {
        const key = String(item);
        if (key) counts[key] = (counts[key] || 0) + 1;
      }
    } else if (val && String(val).trim()) {
      const key = String(val);
      counts[key] = (counts[key] || 0) + 1;
    }
  }
  return counts;
}

/* ─── Risk Stratification ─── */

export type RiskLevel = 'High' | 'Medium' | 'Low';

export function classifyRisk(r: SurveyResponse): RiskLevel {
  let score = 0;
  const bt = String(r.q3_body_type || '').toLowerCase();
  if (bt.includes('overweight') || bt.includes('obese')) score += 2;
  else if (bt.includes('slightly')) score += 1;

  const med = String(r.q4_medical_conditions || '').toLowerCase();
  if (med && med !== 'none' && med !== '—' && med.trim().length > 0) score += 2;

  const tried = String(r.q5_tried_weight_loss || '');
  if (tried.includes('multiple')) score += 2;
  else if (tried.includes('Yes')) score += 1;

  if (score >= 4) return 'High';
  if (score >= 2) return 'Medium';
  return 'Low';
}

export interface RiskGroup {
  level: RiskLevel;
  count: number;
  pct: number;
  interestPct: number;
  payPct: number;
}

export function getRiskGroups(responses: SurveyResponse[]): RiskGroup[] {
  const groups: Record<RiskLevel, SurveyResponse[]> = { High: [], Medium: [], Low: [] };
  for (const r of responses) groups[classifyRisk(r)].push(r);

  return (['High', 'Medium', 'Low'] as RiskLevel[]).map((level) => {
    const list = groups[level];
    const n = list.length;
    const interested = list.filter((r) => {
      const v = String(r.q23_would_use_app || '');
      return v === 'Yes' || v === 'Maybe';
    }).length;
    const paying = list.filter((r) => {
      const v = String(r.q25_would_pay || '');
      return v === 'Yes' || v === 'Maybe';
    }).length;
    return {
      level,
      count: n,
      pct: responses.length > 0 ? Math.round((n / responses.length) * 100) : 0,
      interestPct: n > 0 ? Math.round((interested / n) * 100) : 0,
      payPct: n > 0 ? Math.round((paying / n) * 100) : 0,
    };
  });
}

/* ─── Conversion Funnel ─── */

export interface FunnelStage {
  label: string;
  count: number;
  pct: number;
  dropOff: number; // % from previous stage
}

export function getConversionFunnel(responses: SurveyResponse[]): FunnelStage[] {
  const total = responses.length;
  const aware = responses.filter((r) => String(r.q10_heard_about_injections || '') === 'Yes').length;
  const interested = responses.filter((r) => {
    const v = String(r.q23_would_use_app || '');
    return v === 'Yes' || v === 'Maybe';
  }).length;
  const payWilling = responses.filter((r) => {
    const v = String(r.q25_would_pay || '');
    return v === 'Yes' || v === 'Maybe';
  }).length;

  const stages = [
    { label: 'Total Responses', count: total },
    { label: 'Awareness', count: aware },
    { label: 'Interest', count: interested },
    { label: 'Pay Willingness', count: payWilling },
  ];

  return stages.map((s, i) => {
    const prev = i > 0 ? stages[i - 1].count : s.count;
    return {
      ...s,
      pct: total > 0 ? Math.round((s.count / total) * 100) : 0,
      dropOff: prev > 0 ? Math.round(((prev - s.count) / prev) * 100) : 0,
    };
  });
}

/* ─── Engagement Score ─── */

export function getEngagementScore(r: SurveyResponse): number {
  let score = 0;
  if (String(r.q10_heard_about_injections || '') === 'Yes') score += 20;
  const interest = String(r.q23_would_use_app || '');
  if (interest === 'Yes') score += 30;
  else if (interest === 'Maybe') score += 15;
  const pay = String(r.q25_would_pay || '');
  if (pay === 'Yes') score += 30;
  else if (pay === 'Maybe') score += 15;
  const tried = String(r.q5_tried_weight_loss || '');
  if (tried.includes('multiple')) score += 10;
  else if (tried.includes('Yes')) score += 5;
  const apps = String(r.q20_use_apps || '');
  if (apps === 'Yes') score += 10;
  return Math.min(score, 100);
}

export function getAvgEngagementScore(responses: SurveyResponse[]): number {
  if (responses.length === 0) return 0;
  const sum = responses.reduce((acc, r) => acc + getEngagementScore(r), 0);
  return Math.round(sum / responses.length);
}

/* ─── Revenue Projection ─── */

const AMOUNT_MAP: Record<string, number> = {
  '₹0 – ₹99': 50,
  '₹100 – ₹199': 150,
  '₹200 – ₹299': 250,
  '₹300 – ₹499': 400,
  '₹500+': 600,
  'Under ₹100': 50,
  '₹100 - ₹200': 150,
  '₹200 - ₹500': 350,
  '₹500 - ₹1000': 750,
  '₹1000+': 1200,
  'Under $5': 2.5,
  '$5 – $10': 7.5,
  '$10 – $20': 15,
  '$20+': 25,
};

function estimateMonthlyAmount(r: SurveyResponse): number {
  const raw = String(r.q26_monthly_amount || '');
  for (const [pattern, val] of Object.entries(AMOUNT_MAP)) {
    if (raw.includes(pattern) || raw === pattern) return val;
  }
  const num = parseFloat(raw.replace(/[^0-9.]/g, ''));
  return isNaN(num) ? 0 : num;
}

export interface RevenueProjection {
  avgMonthly: number;
  payingCount: number;
  payingPct: number;
  currentRevenue: number;
  revenue10k: number;
  revenue100k: number;
}

export function getRevenueProjection(
  responses: SurveyResponse[],
  priceOverride?: number
): RevenueProjection {
  const paying = responses.filter((r) => {
    const v = String(r.q25_would_pay || '');
    return v === 'Yes' || v === 'Maybe';
  });
  const payingPct = responses.length > 0 ? paying.length / responses.length : 0;

  let avgMonthly: number;
  if (priceOverride !== undefined) {
    avgMonthly = priceOverride;
  } else {
    const amounts = paying.map(estimateMonthlyAmount).filter((a) => a > 0);
    avgMonthly = amounts.length > 0 ? Math.round(amounts.reduce((a, b) => a + b, 0) / amounts.length) : 0;
  }

  return {
    avgMonthly,
    payingCount: paying.length,
    payingPct: Math.round(payingPct * 100),
    currentRevenue: Math.round(paying.length * avgMonthly),
    revenue10k: Math.round(10000 * payingPct * avgMonthly),
    revenue100k: Math.round(100000 * payingPct * avgMonthly),
  };
}

/* ─── Correlation (Phi Coefficient for 2×2) ─── */

export interface CorrelationResult {
  label: string;
  rowLabel: string;
  colLabel: string;
  phi: number;
  strength: 'Strong' | 'Moderate' | 'Weak' | 'None';
}

function phiCoefficient(a: number, b: number, c: number, d: number): number {
  const denom = Math.sqrt((a + b) * (c + d) * (a + c) * (b + d));
  if (denom === 0) return 0;
  return (a * d - b * c) / denom;
}

function phiStrength(phi: number): 'Strong' | 'Moderate' | 'Weak' | 'None' {
  const abs = Math.abs(phi);
  if (abs >= 0.5) return 'Strong';
  if (abs >= 0.3) return 'Moderate';
  if (abs >= 0.1) return 'Weak';
  return 'None';
}

function boolFilter(r: SurveyResponse, field: string, positiveValues: string[]): boolean {
  const v = String(r[field] || '');
  return positiveValues.some((pv) => v.includes(pv));
}

export function getCorrelationMatrix(responses: SurveyResponse[]): CorrelationResult[] {
  const pairs: { label: string; rowLabel: string; colLabel: string; rowFn: (r: SurveyResponse) => boolean; colFn: (r: SurveyResponse) => boolean }[] = [
    {
      label: 'Body Type ↔ Pay Intent',
      rowLabel: 'Overweight',
      colLabel: 'Would Pay',
      rowFn: (r) => boolFilter(r, 'q3_body_type', ['Overweight', 'overweight', 'Slightly overweight']),
      colFn: (r) => boolFilter(r, 'q25_would_pay', ['Yes', 'Maybe']),
    },
    {
      label: 'Tried WL ↔ Interest',
      rowLabel: 'Tried WL',
      colLabel: 'Interested',
      rowFn: (r) => boolFilter(r, 'q5_tried_weight_loss', ['Yes']),
      colFn: (r) => boolFilter(r, 'q23_would_use_app', ['Yes', 'Maybe']),
    },
    {
      label: 'Awareness ↔ Pay',
      rowLabel: 'Aware',
      colLabel: 'Would Pay',
      rowFn: (r) => boolFilter(r, 'q10_heard_about_injections', ['Yes']),
      colFn: (r) => boolFilter(r, 'q25_would_pay', ['Yes', 'Maybe']),
    },
    {
      label: 'Medical ↔ Interest',
      rowLabel: 'Has Medical',
      colLabel: 'Interested',
      rowFn: (r) => {
        const v = String(r.q4_medical_conditions || '').toLowerCase().trim();
        return v.length > 0 && v !== 'none' && v !== '—';
      },
      colFn: (r) => boolFilter(r, 'q23_would_use_app', ['Yes', 'Maybe']),
    },
  ];

  return pairs.map(({ label, rowLabel, colLabel, rowFn, colFn }) => {
    let a = 0, b = 0, c = 0, d = 0;
    for (const r of responses) {
      const row = rowFn(r);
      const col = colFn(r);
      if (row && col) a++;
      else if (row && !col) b++;
      else if (!row && col) c++;
      else d++;
    }
    const phi = phiCoefficient(a, b, c, d);
    return { label, rowLabel, colLabel, phi: Math.round(phi * 100) / 100, strength: phiStrength(phi) };
  });
}

/* ─── Hypothesis Testing (Chi-Square) ─── */

export interface HypothesisResult {
  id: string;
  hypothesis: string;
  chiSquare: number;
  pValue: number;
  accepted: boolean;
  description: string;
}

function chiSquareTest(observed: number[][], expected: number[][]): { chi: number; p: number } {
  let chi = 0;
  for (let i = 0; i < observed.length; i++) {
    for (let j = 0; j < observed[i].length; j++) {
      const e = expected[i][j];
      if (e > 0) chi += Math.pow(observed[i][j] - e, 2) / e;
    }
  }
  // 1 degree of freedom approximation — using survival function of chi-square(1)
  const p = Math.exp(-chi / 2);
  return { chi: Math.round(chi * 100) / 100, p: Math.round(p * 10000) / 10000 };
}

function getContingencyTable(
  responses: SurveyResponse[],
  rowFn: (r: SurveyResponse) => boolean,
  colFn: (r: SurveyResponse) => boolean
): { observed: number[][]; expected: number[][] } {
  let a = 0, b = 0, c = 0, d = 0;
  for (const r of responses) {
    const row = rowFn(r);
    const col = colFn(r);
    if (row && col) a++;
    else if (row && !col) b++;
    else if (!row && col) c++;
    else d++;
  }
  const n = a + b + c + d;
  const observed = [[a, b], [c, d]];
  const r1 = a + b, r2 = c + d, c1 = a + c, c2 = b + d;
  const expected = [
    [n > 0 ? (r1 * c1) / n : 0, n > 0 ? (r1 * c2) / n : 0],
    [n > 0 ? (r2 * c1) / n : 0, n > 0 ? (r2 * c2) / n : 0],
  ];
  return { observed, expected };
}

export function getHypothesisTests(responses: SurveyResponse[]): HypothesisResult[] {
  // H1: Overweight respondents have higher pay willingness
  const h1Table = getContingencyTable(
    responses,
    (r) => boolFilter(r, 'q3_body_type', ['Overweight', 'overweight', 'Slightly overweight']),
    (r) => boolFilter(r, 'q25_would_pay', ['Yes', 'Maybe'])
  );
  const h1 = chiSquareTest(h1Table.observed, h1Table.expected);

  // H2: Those who tried weight loss have higher interest
  const h2Table = getContingencyTable(
    responses,
    (r) => boolFilter(r, 'q5_tried_weight_loss', ['Yes']),
    (r) => boolFilter(r, 'q23_would_use_app', ['Yes', 'Maybe'])
  );
  const h2 = chiSquareTest(h2Table.observed, h2Table.expected);

  return [
    {
      id: 'H1',
      hypothesis: 'Overweight respondents have higher pay willingness',
      chiSquare: h1.chi,
      pValue: h1.p,
      accepted: h1.p < 0.05,
      description: 'Tests whether body type (overweight) is associated with higher willingness to pay',
    },
    {
      id: 'H2',
      hypothesis: 'Those who tried weight loss show higher app interest',
      chiSquare: h2.chi,
      pValue: h2.p,
      accepted: h2.p < 0.05,
      description: 'Tests whether prior weight-loss attempts are associated with higher interest in the app',
    },
  ];
}

/* ─── Statistical Summary ─── */

const AGE_MAP: Record<string, number> = {
  'Under 18': 16,
  '18-24': 21,
  '18–24': 21,
  '25-34': 29.5,
  '25–34': 29.5,
  '35-44': 39.5,
  '35–44': 39.5,
  '45-54': 49.5,
  '45–54': 49.5,
  '55-64': 59.5,
  '55–64': 59.5,
  '65+': 70,
};

export interface StatSummary {
  meanAge: number;
  stdAge: number;
  ci95Lower: number;
  ci95Upper: number;
  sampleSize: number;
  biasNote: string;
}

export function getStatSummary(responses: SurveyResponse[]): StatSummary {
  const ages = responses.map((r) => {
    const raw = String(r.q1_age || '');
    return AGE_MAP[raw] ?? parseFloat(raw.replace(/[^0-9.]/g, ''));
  }).filter((a) => !isNaN(a));

  const n = ages.length;
  if (n === 0) return { meanAge: 0, stdAge: 0, ci95Lower: 0, ci95Upper: 0, sampleSize: 0, biasNote: 'Insufficient data' };

  const mean = ages.reduce((a, b) => a + b, 0) / n;
  const variance = ages.reduce((acc, a) => acc + Math.pow(a - mean, 2), 0) / (n - 1 || 1);
  const std = Math.sqrt(variance);
  const se = std / Math.sqrt(n);
  const ci95Lower = mean - 1.96 * se;
  const ci95Upper = mean + 1.96 * se;

  const genders = countField(responses, 'q2_gender');
  const genderEntries = Object.entries(genders).sort((a, b) => b[1] - a[1]);
  const dominant = genderEntries[0];
  const dominantPct = dominant && responses.length > 0 ? Math.round((dominant[1] / responses.length) * 100) : 0;
  const biasNote = dominantPct > 70
    ? `Sample skews ${dominant[0]} (${dominantPct}%). Results may not generalize.`
    : n < 30
      ? 'Small sample size (n<30). Interpret with caution.'
      : 'Sample appears reasonably balanced.';

  return {
    meanAge: Math.round(mean * 10) / 10,
    stdAge: Math.round(std * 10) / 10,
    ci95Lower: Math.round(ci95Lower * 10) / 10,
    ci95Upper: Math.round(ci95Upper * 10) / 10,
    sampleSize: n,
    biasNote,
  };
}

/* ─── Data Quality Metrics ─── */

export interface DataQualityMetric {
  question: string;
  field: string;
  completionRate: number;
  missingCount: number;
}

export interface DataQuality {
  overallCompletionRate: number;
  avgResponseTimeEstimate: string;
  totalMissingPct: number;
  perQuestion: DataQualityMetric[];
}

const QUESTION_FIELDS = [
  'q1_age', 'q2_gender', 'q3_body_type', 'q4_medical_conditions', 'q5_tried_weight_loss',
  'q6_methods', 'q7_biggest_difficulty', 'q8_consistency_duration',
  'q10_heard_about_injections', 'q11_where_heard', 'q12_opinion', 'q13_consider_using',
  'q14_concerns', 'q15_family_members', 'q16_relatives_know', 'q17_know_anyone',
  'q18_support_family', 'q20_use_apps', 'q22_support_type', 'q23_would_use_app',
  'q24_useful_features', 'q25_would_pay', 'q26_monthly_amount', 'q27_what_convinces',
];

const QUESTION_LABELS: Record<string, string> = {
  q1_age: 'Age', q2_gender: 'Gender', q3_body_type: 'Body Type',
  q4_medical_conditions: 'Medical Conditions', q5_tried_weight_loss: 'Tried Weight Loss',
  q6_methods: 'Methods Tried', q7_biggest_difficulty: 'Biggest Difficulty',
  q8_consistency_duration: 'Consistency Duration',
  q10_heard_about_injections: 'Heard About Injections', q11_where_heard: 'Where Heard',
  q12_opinion: 'Opinion on Medication', q13_consider_using: 'Consider Using',
  q14_concerns: 'Concerns', q15_family_members: 'Family Members',
  q16_relatives_know: 'Relatives Know', q17_know_anyone: 'Know Anyone',
  q18_support_family: 'Support Family', q20_use_apps: 'Use Health Apps',
  q22_support_type: 'Support Type', q23_would_use_app: 'Would Use App',
  q24_useful_features: 'Useful Features', q25_would_pay: 'Would Pay',
  q26_monthly_amount: 'Monthly Amount', q27_what_convinces: 'What Convinces',
};

export { QUESTION_LABELS };

function isFieldEmpty(val: unknown): boolean {
  if (val === null || val === undefined || val === '') return true;
  if (Array.isArray(val) && val.length === 0) return true;
  if (typeof val === 'string' && val.trim() === '') return true;
  return false;
}

export function getDataQuality(responses: SurveyResponse[]): DataQuality {
  const n = responses.length;
  if (n === 0) {
    return { overallCompletionRate: 0, avgResponseTimeEstimate: '—', totalMissingPct: 100, perQuestion: [] };
  }

  let totalFilled = 0;
  const totalCells = n * QUESTION_FIELDS.length;

  const perQuestion: DataQualityMetric[] = QUESTION_FIELDS.map((field) => {
    const filled = responses.filter((r) => !isFieldEmpty(r[field])).length;
    totalFilled += filled;
    return {
      question: QUESTION_LABELS[field] || field,
      field,
      completionRate: Math.round((filled / n) * 100),
      missingCount: n - filled,
    };
  });

  // Estimate avg response time from timestamps (if available)
  let avgResponseTimeEstimate = '~3–5 min (estimated)';
  const times = responses.map((r) => r.submitted_at ? new Date(r.submitted_at).getTime() : 0).filter((t) => t > 0);
  if (times.length >= 2) {
    times.sort((a, b) => a - b);
    const gaps = [];
    for (let i = 1; i < times.length; i++) {
      const gap = times[i] - times[i - 1];
      if (gap > 0 && gap < 3600000) gaps.push(gap); // under 1 hour
    }
    if (gaps.length > 0) {
      const avgGapMs = gaps.reduce((a, b) => a + b, 0) / gaps.length;
      const mins = Math.round(avgGapMs / 60000);
      avgResponseTimeEstimate = mins > 0 ? `~${mins} min between responses` : '< 1 min between responses';
    }
  }

  return {
    overallCompletionRate: Math.round((totalFilled / totalCells) * 100),
    avgResponseTimeEstimate,
    totalMissingPct: Math.round(((totalCells - totalFilled) / totalCells) * 100),
    perQuestion,
  };
}

/* ─── Customer Personas ─── */

export interface Persona {
  name: string;
  description: string;
  count: number;
  pct: number;
  color: string;
  traits: string[];
}

export function getPersonas(responses: SurveyResponse[]): Persona[] {
  const highRiskWilling: SurveyResponse[] = [];
  const curiousSkeptical: SurveyResponse[] = [];
  const unawareHighRisk: SurveyResponse[] = [];
  const others: SurveyResponse[] = [];

  for (const r of responses) {
    const risk = classifyRisk(r);
    const pay = String(r.q25_would_pay || '');
    const interest = String(r.q23_would_use_app || '');
    const aware = String(r.q10_heard_about_injections || '');

    if (risk === 'High' && (pay === 'Yes' || pay === 'Maybe')) {
      highRiskWilling.push(r);
    } else if (interest === 'Maybe' && pay === 'No') {
      curiousSkeptical.push(r);
    } else if (risk === 'High' && aware !== 'Yes') {
      unawareHighRisk.push(r);
    } else {
      others.push(r);
    }
  }

  const n = responses.length;
  return [
    {
      name: 'High-Risk & Willing',
      description: 'High metabolic risk with strong purchase intent',
      count: highRiskWilling.length,
      pct: n > 0 ? Math.round((highRiskWilling.length / n) * 100) : 0,
      color: 'emerald',
      traits: ['Overweight/Medical conditions', 'Multiple WL attempts', 'Willing to pay'],
    },
    {
      name: 'Curious but Skeptical',
      description: 'Interested in the app but hesitant to pay',
      count: curiousSkeptical.length,
      pct: n > 0 ? Math.round((curiousSkeptical.length / n) * 100) : 0,
      color: 'amber',
      traits: ['Some interest', 'Price-sensitive', 'Need convincing'],
    },
    {
      name: 'Unaware but High-Risk',
      description: 'High metabolic risk but not yet aware of solutions',
      count: unawareHighRisk.length,
      pct: n > 0 ? Math.round((unawareHighRisk.length / n) * 100) : 0,
      color: 'rose',
      traits: ['High risk profile', 'Low awareness', 'Education opportunity'],
    },
    {
      name: 'General Audience',
      description: 'Remaining respondents without strong cluster signals',
      count: others.length,
      pct: n > 0 ? Math.round((others.length / n) * 100) : 0,
      color: 'slate',
      traits: ['Mixed profiles', 'Moderate engagement', 'Broad market'],
    },
  ];
}

/* ─── LTV / CAC Simulation ─── */

export interface LTVSimulation {
  estimatedCAC: number;
  estimatedRetentionMonths: number;
  estimatedLTV: number;
  paybackPeriodMonths: number;
  ltvCacRatio: number;
}

export function getLTVSimulation(responses: SurveyResponse[]): LTVSimulation {
  const rev = getRevenueProjection(responses);
  const avgMonthly = rev.avgMonthly || 200; // fallback ₹200
  const estimatedCAC = Math.round(avgMonthly * 2.5); // industry benchmark
  const retentionPct = rev.payingPct / 100;
  const estimatedRetentionMonths = Math.max(Math.round(retentionPct * 18), 3); // scale retention 
  const estimatedLTV = avgMonthly * estimatedRetentionMonths;
  const paybackPeriodMonths = avgMonthly > 0 ? Math.round(estimatedCAC / avgMonthly * 10) / 10 : 0;
  const ltvCacRatio = estimatedCAC > 0 ? Math.round((estimatedLTV / estimatedCAC) * 10) / 10 : 0;

  return { estimatedCAC, estimatedRetentionMonths, estimatedLTV, paybackPeriodMonths, ltvCacRatio };
}

/* ─── Cohort Analysis ─── */

export interface CohortComparison {
  metric: string;
  earlyValue: number;
  recentValue: number;
  change: number; // percentage point change
  direction: 'up' | 'down' | 'same';
}

export function getCohortAnalysis(responses: SurveyResponse[]): CohortComparison[] {
  if (responses.length < 4) return [];
  const sorted = [...responses].sort((a, b) =>
    (a.submitted_at || '').localeCompare(b.submitted_at || '')
  );
  const mid = Math.floor(sorted.length / 2);
  const early = sorted.slice(0, mid);
  const recent = sorted.slice(mid);

  function pct(list: SurveyResponse[], field: string, positiveValues: string[]): number {
    const matching = list.filter((r) => {
      const v = String(r[field] || '');
      return positiveValues.some((pv) => v.includes(pv));
    }).length;
    return list.length > 0 ? Math.round((matching / list.length) * 100) : 0;
  }

  const metrics = [
    { metric: 'Awareness Rate', field: 'q10_heard_about_injections', positive: ['Yes'] },
    { metric: 'App Interest', field: 'q23_would_use_app', positive: ['Yes', 'Maybe'] },
    { metric: 'Pay Intent', field: 'q25_would_pay', positive: ['Yes', 'Maybe'] },
    { metric: 'Tried Weight Loss', field: 'q5_tried_weight_loss', positive: ['Yes'] },
  ];

  return metrics.map(({ metric, field, positive }) => {
    const e = pct(early, field, positive);
    const r = pct(recent, field, positive);
    const change = r - e;
    return {
      metric,
      earlyValue: e,
      recentValue: r,
      change,
      direction: change > 0 ? 'up' : change < 0 ? 'down' : 'same',
    };
  });
}

/* ─── Growth Analytics (timeline helpers) ─── */

export interface TimelinePoint {
  date: string;
  count: number;
  cumulative: number;
}

export function getTimeline(responses: SurveyResponse[]): TimelinePoint[] {
  const byDay: Record<string, number> = {};
  for (const r of responses) {
    if (r.submitted_at) {
      const day = String(r.submitted_at).slice(0, 10);
      byDay[day] = (byDay[day] || 0) + 1;
    }
  }
  const sorted = Object.entries(byDay).sort(([a], [b]) => a.localeCompare(b));
  let cumulative = 0;
  return sorted.map(([date, count]) => {
    cumulative += count;
    return { date, count, cumulative };
  });
}

/* ─── Cross-tab (Demographic × Metric) ─── */

export interface CrossTabRow {
  segment: string;
  total: number;
  payPct: number;
  interestPct: number;
  awarenessPct: number;
}

export function getCrossTabByField(
  responses: SurveyResponse[],
  field: string
): CrossTabRow[] {
  const groups: Record<string, SurveyResponse[]> = {};
  for (const r of responses) {
    const val = String(r[field] || '') || 'Unknown';
    if (!groups[val]) groups[val] = [];
    groups[val].push(r);
  }

  return Object.entries(groups)
    .map(([segment, list]) => {
      const n = list.length;
      const pay = list.filter((r) => boolFilter(r, 'q25_would_pay', ['Yes', 'Maybe'])).length;
      const interest = list.filter((r) => boolFilter(r, 'q23_would_use_app', ['Yes', 'Maybe'])).length;
      const aware = list.filter((r) => boolFilter(r, 'q10_heard_about_injections', ['Yes'])).length;
      return {
        segment,
        total: n,
        payPct: n > 0 ? Math.round((pay / n) * 100) : 0,
        interestPct: n > 0 ? Math.round((interest / n) * 100) : 0,
        awarenessPct: n > 0 ? Math.round((aware / n) * 100) : 0,
      };
    })
    .sort((a, b) => b.total - a.total);
}

/* ─── Segment Profitability ─── */

export interface ProfitabilitySegment {
  segment: string;
  riskLevel: RiskLevel;
  count: number;
  payPct: number;
  avgMonthly: number;
  revenueScore: number; // 0–100
}

export function getSegmentProfitability(responses: SurveyResponse[]): ProfitabilitySegment[] {
  // Group by body type × risk level
  const groups: Record<string, { risk: RiskLevel; list: SurveyResponse[] }> = {};
  for (const r of responses) {
    const bt = String(r.q3_body_type || 'Unknown');
    const risk = classifyRisk(r);
    const key = `${bt}`;
    if (!groups[key]) groups[key] = { risk, list: [] };
    groups[key].list.push(r);
  }

  const segments = Object.entries(groups).map(([segment, { risk, list }]) => {
    const pay = list.filter((r) => boolFilter(r, 'q25_would_pay', ['Yes', 'Maybe']));
    const payPct = list.length > 0 ? Math.round((pay.length / list.length) * 100) : 0;
    const amounts = pay.map(estimateMonthlyAmount).filter((a) => a > 0);
    const avgMonthly = amounts.length > 0 ? Math.round(amounts.reduce((a, b) => a + b, 0) / amounts.length) : 0;
    return { segment, riskLevel: risk, count: list.length, payPct, avgMonthly, revenueScore: 0 };
  });

  // Normalize revenue score
  const maxRev = Math.max(...segments.map((s) => s.payPct * s.avgMonthly), 1);
  for (const s of segments) {
    s.revenueScore = Math.round((s.payPct * s.avgMonthly) / maxRev * 100);
  }

  return segments.sort((a, b) => b.revenueScore - a.revenueScore);
}
