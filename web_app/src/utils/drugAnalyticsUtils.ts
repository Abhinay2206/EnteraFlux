/* ═══════════════════════════════════════════════════════
   Drug Risk Analytics — Utility Functions & Types
   Processes FAERS adverse event + GLP-1 trial data
   ═══════════════════════════════════════════════════════ */

/* ── Type Definitions ── */

export interface FaersRecord {
    id: string;
    target_drug: string;
    reactions: string;
    outcomes: string;
    report_date: string;
    age: string | number;
    sex: string;
    weight: string | number;
    dose: string | number;
    route: string;
    indication: string;
    reporter_type: string;
    serious: string | number;
    concomitant_drugs: string;
    country: string;
    uploaded_at: string;
    [key: string]: unknown;
}

export interface GLP1Trial {
    id: string;
    nct_id: string;
    title: string;
    condition: string;
    intervention: string;
    phase: string;
    status: string;
    enrollment: string | number;
    start_date: string;
    completion_date: string;
    sponsor: string;
    study_type: string;
    primary_outcome: string;
    results_summary: string;
    adverse_events_reported: string;
    uploaded_at: string;
    [key: string]: unknown;
}

export interface ChartDataPoint {
    label: string;
    value: number;
    pct?: number;
}

export interface HeatmapCell {
    label: string;
    value: number;
    maxValue: number;
}

export interface HeatmapRow {
    label: string;
    values: HeatmapCell[];
}

export interface AIInsight {
    icon: string; // icon name
    color: string;
    title: string;
    detail: string;
    tag: 'positive' | 'warning' | 'critical' | 'neutral';
    importance: number;
}

export interface RiskScoreBreakdown {
    overallScore: number;
    frequencyScore: number;
    severityScore: number;
    demographicScore: number;
    riskLevel: 'Low' | 'Moderate' | 'High' | 'Critical';
    formula: string;
    components: { name: string; weight: number; rawValue: number; weightedValue: number }[];
}

/* ── Helpers ── */

function parseCSVField(val: unknown): string {
    if (val === null || val === undefined) return '';
    return String(val).trim();
}

function splitReactions(reactions: string): string[] {
    if (!reactions) return [];
    // Reactions may be semicolon, comma, or pipe separated
    return reactions
        .split(/[;|]/)
        .map((r) => r.trim())
        .filter((r) => r.length > 0 && r !== '—' && r !== 'N/A');
}

function parseAge(age: unknown): number | null {
    if (age === null || age === undefined || age === '') return null;
    const n = typeof age === 'number' ? age : parseFloat(String(age).replace(/[^0-9.]/g, ''));
    return isNaN(n) ? null : n;
}

function getAgeGroup(age: number): string {
    if (age < 18) return '<18';
    if (age < 30) return '18–29';
    if (age < 45) return '30–44';
    if (age < 60) return '45–59';
    if (age < 75) return '60–74';
    return '75+';
}

function normalizeSex(sex: unknown): string {
    const s = parseCSVField(sex).toUpperCase();
    if (s.startsWith('F')) return 'Female';
    if (s.startsWith('M')) return 'Male';
    return 'Unknown';
}

function isSeriousOutcome(record: FaersRecord): boolean {
    const serious = parseCSVField(record.serious);
    if (serious === '1' || serious.toLowerCase() === 'yes' || serious.toLowerCase() === 'true') return true;
    const outcomes = parseCSVField(record.outcomes).toLowerCase();
    return outcomes.includes('death') || outcomes.includes('hospitali') || outcomes.includes('life-threatening') || outcomes.includes('disab');
}

function classifySeverity(record: FaersRecord): 'Mild' | 'Moderate' | 'Severe' | 'Fatal' {
    const outcomes = parseCSVField(record.outcomes).toLowerCase();
    if (outcomes.includes('death') || outcomes.includes('fatal')) return 'Fatal';
    if (outcomes.includes('life-threatening') || outcomes.includes('disab')) return 'Severe';
    if (isSeriousOutcome(record)) return 'Moderate';
    return 'Mild';
}

function parseQuarter(dateStr: string): string | null {
    if (!dateStr) return null;
    // Try various date formats
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) {
        // Try YYYYMMDD format
        if (/^\d{8}$/.test(dateStr)) {
            const y = dateStr.slice(0, 4);
            const m = parseInt(dateStr.slice(4, 6));
            const q = Math.ceil(m / 3);
            return `${y} Q${q}`;
        }
        return null;
    }
    const y = d.getFullYear();
    const q = Math.ceil((d.getMonth() + 1) / 3);
    if (y < 2000 || y > 2030) return null;
    return `${y} Q${q}`;
}

function parseYear(dateStr: string): number | null {
    if (!dateStr) return null;
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
        const y = d.getFullYear();
        return (y >= 2000 && y <= 2030) ? y : null;
    }
    if (/^\d{8}$/.test(dateStr)) return parseInt(dateStr.slice(0, 4));
    const match = dateStr.match(/(\d{4})/);
    return match ? parseInt(match[1]) : null;
}


/* ═══════════════════════════════════════════════════════
   1. DATA OVERVIEW
   ═══════════════════════════════════════════════════════ */

export interface DataOverview {
    faersTotal: number;
    trialsTotal: number;
    faersFeatures: number;
    trialsFeatures: number;
    faersMissingPct: number;
    trialsMissingPct: number;
    uniqueDrugs: number;
    uniqueConditions: number;
    uniqueReactions: number;
    dateRange: string;
}

export function computeDataOverview(faers: FaersRecord[], trials: GLP1Trial[]): DataOverview {
    const faersKeys = faers.length > 0 ? Object.keys(faers[0]).filter((k) => k !== 'id' && k !== 'uploaded_at') : [];
    const trialsKeys = trials.length > 0 ? Object.keys(trials[0]).filter((k) => k !== 'id' && k !== 'uploaded_at') : [];

    // Missing values
    let faersMissing = 0, faersTotal = 0;
    for (const r of faers) {
        for (const k of faersKeys) {
            faersTotal++;
            const v = r[k];
            if (v === null || v === undefined || v === '' || v === 'N/A' || v === '—') faersMissing++;
        }
    }

    let trialsMissing = 0, trialsFieldTotal = 0;
    for (const t of trials) {
        for (const k of trialsKeys) {
            trialsFieldTotal++;
            const v = t[k];
            if (v === null || v === undefined || v === '' || v === 'N/A' || v === '—') trialsMissing++;
        }
    }

    // Unique values
    const drugs = new Set<string>();
    const conditions = new Set<string>();
    const reactions = new Set<string>();

    for (const r of faers) {
        if (r.target_drug) drugs.add(parseCSVField(r.target_drug).toLowerCase());
        splitReactions(parseCSVField(r.reactions)).forEach((rx) => reactions.add(rx.toLowerCase()));
    }
    for (const t of trials) {
        if (t.condition) parseCSVField(t.condition).split(/[;,]/).forEach((c) => { if (c.trim()) conditions.add(c.trim().toLowerCase()); });
        if (t.intervention) drugs.add(parseCSVField(t.intervention).toLowerCase());
    }

    // Date range
    const years: number[] = [];
    for (const r of faers) {
        const y = parseYear(parseCSVField(r.report_date));
        if (y) years.push(y);
    }
    for (const t of trials) {
        const y = parseYear(parseCSVField(t.start_date));
        if (y) years.push(y);
    }
    const minYear = years.length > 0 ? Math.min(...years) : 0;
    const maxYear = years.length > 0 ? Math.max(...years) : 0;

    return {
        faersTotal: faers.length,
        trialsTotal: trials.length,
        faersFeatures: faersKeys.length,
        trialsFeatures: trialsKeys.length,
        faersMissingPct: faersTotal > 0 ? Math.round((faersMissing / faersTotal) * 100) : 0,
        trialsMissingPct: trialsFieldTotal > 0 ? Math.round((trialsMissing / trialsFieldTotal) * 100) : 0,
        uniqueDrugs: drugs.size,
        uniqueConditions: conditions.size,
        uniqueReactions: reactions.size,
        dateRange: minYear && maxYear ? `${minYear}–${maxYear}` : 'N/A',
    };
}


/* ═══════════════════════════════════════════════════════
   2. ADVERSE EVENT ANALYSIS
   ═══════════════════════════════════════════════════════ */

export function getTopAdverseEvents(faers: FaersRecord[], limit = 15): ChartDataPoint[] {
    const counts: Record<string, number> = {};
    for (const r of faers) {
        const rxns = splitReactions(parseCSVField(r.reactions));
        for (const rx of rxns) {
            const key = rx.charAt(0).toUpperCase() + rx.slice(1).toLowerCase();
            counts[key] = (counts[key] || 0) + 1;
        }
    }
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, limit);
    const total = faers.length || 1;
    return sorted.map(([label, value]) => ({ label, value, pct: Math.round((value / total) * 100) }));
}

export function getSeverityDistribution(faers: FaersRecord[]): ChartDataPoint[] {
    const counts: Record<string, number> = { Mild: 0, Moderate: 0, Severe: 0, Fatal: 0 };
    for (const r of faers) {
        counts[classifySeverity(r)]++;
    }
    const total = faers.length || 1;
    return Object.entries(counts).map(([label, value]) => ({
        label,
        value,
        pct: Math.round((value / total) * 100),
    }));
}

export function getRareCriticalEvents(faers: FaersRecord[], maxFrequency = 5): ChartDataPoint[] {
    const counts: Record<string, { count: number; severe: boolean }> = {};
    for (const r of faers) {
        const severity = classifySeverity(r);
        const rxns = splitReactions(parseCSVField(r.reactions));
        for (const rx of rxns) {
            const key = rx.charAt(0).toUpperCase() + rx.slice(1).toLowerCase();
            if (!counts[key]) counts[key] = { count: 0, severe: false };
            counts[key].count++;
            if (severity === 'Severe' || severity === 'Fatal') counts[key].severe = true;
        }
    }
    return Object.entries(counts)
        .filter(([, v]) => v.count <= maxFrequency && v.severe)
        .sort((a, b) => b[1].count - a[1].count)
        .slice(0, 10)
        .map(([label, v]) => ({ label, value: v.count }));
}


/* ═══════════════════════════════════════════════════════
   3. DEMOGRAPHIC INSIGHTS
   ═══════════════════════════════════════════════════════ */

export function getDemographicRiskHeatmap(faers: FaersRecord[]): HeatmapRow[] {
    const AGE_GROUPS = ['<18', '18–29', '30–44', '45–59', '60–74', '75+'];
    const SEXES = ['Female', 'Male', 'Unknown'];

    const grid: Record<string, Record<string, number>> = {};
    for (const ag of AGE_GROUPS) {
        grid[ag] = {};
        for (const s of SEXES) grid[ag][s] = 0;
    }

    for (const r of faers) {
        const age = parseAge(r.age);
        const sex = normalizeSex(r.sex);
        if (age === null) continue;
        const ag = getAgeGroup(age);
        if (grid[ag] && grid[ag][sex] !== undefined) {
            grid[ag][sex]++;
        }
    }

    const maxVal = Math.max(1, ...Object.values(grid).flatMap((row) => Object.values(row)));

    return AGE_GROUPS.map((ag) => ({
        label: ag,
        values: SEXES.map((s) => ({
            label: s,
            value: grid[ag][s],
            maxValue: maxVal,
        })),
    }));
}

export function getGenderDistribution(faers: FaersRecord[]): ChartDataPoint[] {
    const counts: Record<string, number> = {};
    for (const r of faers) {
        const sex = normalizeSex(r.sex);
        counts[sex] = (counts[sex] || 0) + 1;
    }
    const total = faers.length || 1;
    return Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .map(([label, value]) => ({ label, value, pct: Math.round((value / total) * 100) }));
}

export function getAgeGroupDistribution(faers: FaersRecord[]): ChartDataPoint[] {
    const AGE_GROUPS = ['<18', '18–29', '30–44', '45–59', '60–74', '75+'];
    const counts: Record<string, number> = {};
    for (const ag of AGE_GROUPS) counts[ag] = 0;

    for (const r of faers) {
        const age = parseAge(r.age);
        if (age === null) continue;
        const ag = getAgeGroup(age);
        counts[ag] = (counts[ag] || 0) + 1;
    }
    const total = faers.length || 1;
    return AGE_GROUPS.map((label) => ({
        label,
        value: counts[label] || 0,
        pct: Math.round(((counts[label] || 0) / total) * 100),
    }));
}


/* ═══════════════════════════════════════════════════════
   4. TEMPORAL / TREND ANALYSIS
   ═══════════════════════════════════════════════════════ */

export function getTemporalTrends(faers: FaersRecord[]): { label: string; value: number; value2: number }[] {
    const quarterCounts: Record<string, number> = {};
    const quarterSerious: Record<string, number> = {};

    for (const r of faers) {
        const q = parseQuarter(parseCSVField(r.report_date));
        if (!q) continue;
        quarterCounts[q] = (quarterCounts[q] || 0) + 1;
        if (isSeriousOutcome(r)) quarterSerious[q] = (quarterSerious[q] || 0) + 1;
    }

    return Object.keys(quarterCounts)
        .sort()
        .map((label) => ({
            label,
            value: quarterCounts[label],
            value2: quarterSerious[label] || 0,
        }));
}


/* ═══════════════════════════════════════════════════════
   5. COMPARATIVE ANALYSIS
   ═══════════════════════════════════════════════════════ */

export interface ComparisonMetric {
    metric: string;
    faersValue: string;
    trialsValue: string;
    discrepancy: string;
    flag: 'match' | 'minor' | 'major';
}

export function getComparativeAnalysis(faers: FaersRecord[], trials: GLP1Trial[]): ComparisonMetric[] {
    const metrics: ComparisonMetric[] = [];

    // 1. Total dataset size
    metrics.push({
        metric: 'Total Records',
        faersValue: `${faers.length} reports`,
        trialsValue: `${trials.length} trials`,
        discrepancy: 'Real-world data is ~' + (faers.length > trials.length ? `${Math.round(faers.length / Math.max(trials.length, 1))}x` : 'smaller than') + ' trial data',
        flag: 'minor',
    });

    // 2. Severity — FAERS has real outcomes; trials may underreport
    const severeFaers = faers.filter((r) => classifySeverity(r) === 'Severe' || classifySeverity(r) === 'Fatal').length;
    const severePct = faers.length > 0 ? Math.round((severeFaers / faers.length) * 100) : 0;

    const trialsWithAE = trials.filter((t) => {
        const ae = parseCSVField(t.adverse_events_reported).toLowerCase();
        return ae && ae !== 'n/a' && ae !== 'none' && ae !== '';
    }).length;
    const trialAEPct = trials.length > 0 ? Math.round((trialsWithAE / trials.length) * 100) : 0;

    metrics.push({
        metric: 'Severe/Fatal Events',
        faersValue: `${severePct}% of reports`,
        trialsValue: `${trialAEPct}% report AEs`,
        discrepancy: severePct > trialAEPct ? 'FAERS reveals higher severity than trials suggest' : 'Comparable severity rates',
        flag: severePct > trialAEPct + 10 ? 'major' : 'minor',
    });

    // 3. Unique adverse events
    const faersReactions = new Set<string>();
    for (const r of faers) {
        splitReactions(parseCSVField(r.reactions)).forEach((rx) => faersReactions.add(rx.toLowerCase()));
    }

    const trialAEs = new Set<string>();
    for (const t of trials) {
        const ae = parseCSVField(t.adverse_events_reported);
        if (ae) splitReactions(ae).forEach((rx) => trialAEs.add(rx.toLowerCase()));
    }

    const faersOnly = [...faersReactions].filter((r) => !trialAEs.has(r));

    metrics.push({
        metric: 'Unique Adverse Events',
        faersValue: `${faersReactions.size} distinct`,
        trialsValue: `${trialAEs.size} distinct`,
        discrepancy: `${faersOnly.length} events found ONLY in real-world data`,
        flag: faersOnly.length > 10 ? 'major' : 'minor',
    });

    // 4. Population diversity
    const countriesSet = new Set<string>();
    for (const r of faers) {
        const c = parseCSVField(r.country);
        if (c && c.toLowerCase() !== 'n/a') countriesSet.add(c);
    }

    const sponsorsSet = new Set<string>();
    for (const t of trials) {
        const s = parseCSVField(t.sponsor);
        if (s) sponsorsSet.add(s);
    }

    metrics.push({
        metric: 'Population Diversity',
        faersValue: `${countriesSet.size} countries`,
        trialsValue: `${sponsorsSet.size} sponsors`,
        discrepancy: 'Real-world data captures global diversity vs controlled cohorts',
        flag: 'minor',
    });

    // 5. Monitoring duration
    const faersYears = new Set<number>();
    for (const r of faers) {
        const y = parseYear(parseCSVField(r.report_date));
        if (y) faersYears.add(y);
    }
    const trialsYears = new Set<number>();
    for (const t of trials) {
        const y = parseYear(parseCSVField(t.start_date));
        if (y) trialsYears.add(y);
    }

    metrics.push({
        metric: 'Monitoring Window',
        faersValue: `${faersYears.size > 0 ? Math.min(...faersYears) + '–' + Math.max(...faersYears) : 'N/A'}`,
        trialsValue: `${trialsYears.size > 0 ? Math.min(...trialsYears) + '–' + Math.max(...trialsYears) : 'N/A'}`,
        discrepancy: 'FAERS provides continuous post-market surveillance',
        flag: 'minor',
    });

    return metrics;
}


/* ═══════════════════════════════════════════════════════
   6. RISK SCORING LOGIC
   ═══════════════════════════════════════════════════════ */

const SEVERITY_WEIGHTS: Record<string, number> = { Mild: 1, Moderate: 3, Severe: 7, Fatal: 10 };

export function computeRiskScore(faers: FaersRecord[]): RiskScoreBreakdown {
    if (faers.length === 0) {
        return {
            overallScore: 0, frequencyScore: 0, severityScore: 0, demographicScore: 0,
            riskLevel: 'Low', formula: 'N/A', components: [],
        };
    }

    // --- Frequency Score (0–100) ---
    // Based on number of unique adverse events per 100 reports
    const allReactions = new Set<string>();
    let totalRxCount = 0;
    for (const r of faers) {
        const rxns = splitReactions(parseCSVField(r.reactions));
        totalRxCount += rxns.length;
        rxns.forEach((rx) => allReactions.add(rx.toLowerCase()));
    }
    const rxnPer100 = (totalRxCount / faers.length) * 100;
    const frequencyScore = Math.min(100, Math.round(rxnPer100 / 5)); // Normalize: 500 events/100 reports = 100

    // --- Severity Score (0–100) ---
    let severitySum = 0;
    for (const r of faers) {
        severitySum += SEVERITY_WEIGHTS[classifySeverity(r)];
    }
    const avgSeverity = severitySum / faers.length;
    const severityScore = Math.min(100, Math.round((avgSeverity / 10) * 100)); // Normalize: max weight 10 = 100

    // --- Demographic Vulnerability Score (0–100) ---
    // Higher if at-risk groups (elderly, < 18) are disproportionately affected
    let vulnerableCount = 0;
    let ageKnown = 0;
    for (const r of faers) {
        const age = parseAge(r.age);
        if (age === null) continue;
        ageKnown++;
        if (age < 18 || age >= 65) vulnerableCount++;
    }
    const vulnerablePct = ageKnown > 0 ? (vulnerableCount / ageKnown) * 100 : 0;
    const demographicScore = Math.min(100, Math.round(vulnerablePct * 1.5)); // Amplify: 67% vulnerable = 100

    // --- Overall Risk Score ---
    const FREQ_WEIGHT = 0.35;
    const SEV_WEIGHT = 0.45;
    const DEMO_WEIGHT = 0.20;

    const overallScore = Math.round(
        frequencyScore * FREQ_WEIGHT +
        severityScore * SEV_WEIGHT +
        demographicScore * DEMO_WEIGHT
    );

    const riskLevel: RiskScoreBreakdown['riskLevel'] =
        overallScore >= 75 ? 'Critical' :
        overallScore >= 50 ? 'High' :
        overallScore >= 25 ? 'Moderate' : 'Low';

    return {
        overallScore,
        frequencyScore,
        severityScore,
        demographicScore,
        riskLevel,
        formula: `Risk = (Frequency × ${FREQ_WEIGHT}) + (Severity × ${SEV_WEIGHT}) + (Demographics × ${DEMO_WEIGHT})`,
        components: [
            { name: 'Adverse Event Frequency', weight: FREQ_WEIGHT, rawValue: frequencyScore, weightedValue: Math.round(frequencyScore * FREQ_WEIGHT) },
            { name: 'Severity Index', weight: SEV_WEIGHT, rawValue: severityScore, weightedValue: Math.round(severityScore * SEV_WEIGHT) },
            { name: 'Demographic Vulnerability', weight: DEMO_WEIGHT, rawValue: demographicScore, weightedValue: Math.round(demographicScore * DEMO_WEIGHT) },
        ],
    };
}


/* ═══════════════════════════════════════════════════════
   8. AI-POWERED INSIGHTS
   ═══════════════════════════════════════════════════════ */

export function generateAIInsights(faers: FaersRecord[], trials: GLP1Trial[]): AIInsight[] {
    const insights: AIInsight[] = [];

    if (faers.length === 0) return insights;

    // 1. Most common drug-event pair
    const topEvents = getTopAdverseEvents(faers, 3);
    if (topEvents.length > 0) {
        insights.push({
            icon: 'AlertTriangle',
            color: 'amber',
            title: 'Dominant Adverse Event Signal',
            detail: `"${topEvents[0].label}" is the most reported adverse event (${topEvents[0].pct}% of reports). ${topEvents.length > 1 ? `Followed by "${topEvents[1].label}" (${topEvents[1].pct}%).` : ''}`,
            tag: 'warning',
            importance: 95,
        });
    }

    // 2. Severity pattern
    const severity = getSeverityDistribution(faers);
    const fatalCount = severity.find((s) => s.label === 'Fatal')?.value || 0;
    const severeCount = severity.find((s) => s.label === 'Severe')?.value || 0;
    if (fatalCount + severeCount > 0) {
        const combinedPct = Math.round(((fatalCount + severeCount) / faers.length) * 100);
        insights.push({
            icon: 'Skull',
            color: 'rose',
            title: 'Severe Outcome Detection',
            detail: `${combinedPct}% of reports involve severe or fatal outcomes (${severeCount} severe, ${fatalCount} fatal). This highlights critical safety monitoring needs.`,
            tag: 'critical',
            importance: 98,
        });
    }

    // 3. Gender disparity
    const genderDist = getGenderDistribution(faers);
    if (genderDist.length >= 2) {
        const top = genderDist[0];
        if (top.pct && top.pct > 60) {
            insights.push({
                icon: 'Users',
                color: 'blue',
                title: 'Gender Disparity Detected',
                detail: `${top.label} patients represent ${top.pct}% of adverse event reports — a significant gender skew that may indicate differential drug response or reporting bias.`,
                tag: 'warning',
                importance: 82,
            });
        }
    }

    // 4. Age vulnerability
    const ageDist = getAgeGroupDistribution(faers);
    const elderlyGroup = ageDist.find((a) => a.label === '60–74' || a.label === '75+');
    if (elderlyGroup && elderlyGroup.pct && elderlyGroup.pct > 25) {
        insights.push({
            icon: 'HeartPulse',
            color: 'rose',
            title: 'Elderly Population at Risk',
            detail: `Patients aged ${elderlyGroup.label} account for ${elderlyGroup.pct}% of reports. Elderly populations may require dose adjustments or extra monitoring.`,
            tag: 'critical',
            importance: 90,
        });
    }

    // 5. Rare but critical events
    const rareEvents = getRareCriticalEvents(faers);
    if (rareEvents.length > 0) {
        insights.push({
            icon: 'Search',
            color: 'violet',
            title: 'Rare Safety Signals Detected',
            detail: `${rareEvents.length} rare but critical adverse events identified (each <5 reports but with severe outcomes): ${rareEvents.slice(0, 3).map((e) => `"${e.label}"`).join(', ')}${rareEvents.length > 3 ? ` and ${rareEvents.length - 3} more` : ''}.`,
            tag: 'warning',
            importance: 88,
        });
    }

    // 6. Polypharmacy signal
    const polyPharmacy = faers.filter((r) => {
        const drugs = parseCSVField(r.concomitant_drugs);
        return drugs && drugs !== 'N/A' && drugs.split(/[;,|]/).length >= 3;
    }).length;
    if (polyPharmacy > 0) {
        const pct = Math.round((polyPharmacy / faers.length) * 100);
        insights.push({
            icon: 'Pill',
            color: 'orange',
            title: 'Polypharmacy Risk Factor',
            detail: `${pct}% of patients (${polyPharmacy} reports) were on 3+ concomitant drugs, increasing drug interaction risk and complicating adverse event attribution.`,
            tag: polyPharmacy > faers.length * 0.3 ? 'critical' : 'warning',
            importance: 78,
        });
    }

    // 7. Trial coverage gap
    if (trials.length > 0) {
        const faersReactions = new Set<string>();
        for (const r of faers) {
            splitReactions(parseCSVField(r.reactions)).forEach((rx) => faersReactions.add(rx.toLowerCase()));
        }
        const trialAEs = new Set<string>();
        for (const t of trials) {
            const ae = parseCSVField(t.adverse_events_reported);
            if (ae) splitReactions(ae).forEach((rx) => trialAEs.add(rx.toLowerCase()));
        }
        const faersOnly = [...faersReactions].filter((r) => !trialAEs.has(r));
        if (faersOnly.length > 5) {
            insights.push({
                icon: 'ShieldAlert',
                color: 'rose',
                title: 'Hidden Risks Not Seen in Trials',
                detail: `${faersOnly.length} adverse events were found ONLY in real-world FAERS data and never reported in clinical trials — validating why post-market surveillance is essential.`,
                tag: 'critical',
                importance: 96,
            });
        }
    }

    // 8. Biomarker suggestion
    const gastrointestinal = faers.filter((r) => {
        const rx = parseCSVField(r.reactions).toLowerCase();
        return rx.includes('nausea') || rx.includes('vomit') || rx.includes('diarr') || rx.includes('pancreat');
    }).length;
    if (gastrointestinal > faers.length * 0.2) {
        insights.push({
            icon: 'Dna',
            color: 'emerald',
            title: 'Potential Biomarker: GI Sensitivity',
            detail: `${Math.round((gastrointestinal / faers.length) * 100)}% of reports involve GI events. Suggests GLP-1 receptor polymorphism or lipase/amylase levels as potential predictive biomarkers for adverse GI response.`,
            tag: 'positive',
            importance: 75,
        });
    }

    // Sort by importance
    insights.sort((a, b) => b.importance - a.importance);
    return insights;
}


/* ═══════════════════════════════════════════════════════
   9. TRIAL PHASE DISTRIBUTION
   ═══════════════════════════════════════════════════════ */

export function getTrialPhaseDistribution(trials: GLP1Trial[]): ChartDataPoint[] {
    const counts: Record<string, number> = {};
    for (const t of trials) {
        const phase = parseCSVField(t.phase) || 'Unknown';
        counts[phase] = (counts[phase] || 0) + 1;
    }
    const total = trials.length || 1;
    return Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .map(([label, value]) => ({
            label,
            value,
            pct: Math.round((value / total) * 100),
        }));
}

export function getTrialStatusDistribution(trials: GLP1Trial[]): ChartDataPoint[] {
    const counts: Record<string, number> = {};
    for (const t of trials) {
        const status = parseCSVField(t.status) || 'Unknown';
        counts[status] = (counts[status] || 0) + 1;
    }
    const total = trials.length || 1;
    return Object.entries(counts)
        .sort((a, b) => b[1] - a[1])
        .map(([label, value]) => ({
            label,
            value,
            pct: Math.round((value / total) * 100),
        }));
}
