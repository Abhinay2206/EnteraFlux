import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { submitSurveyResponse } from '../firebase';
import useMetaTags from '../hooks/useMetaTags';
import {
    ClipboardList,
    Scale,
    Pill,
    Users,
    Smartphone,
    CreditCard,
    CheckCircle2,
    AlertCircle,
    ArrowRight,
    Loader2,
    ShieldAlert,
} from 'lucide-react';

/* ──────────────────────────────────────────────
   Types
   ────────────────────────────────────────────── */

interface SurveyData {
    q1_age: string;
    q2_gender: string;
    q3_body_type: string;
    q4_medical_conditions: string;
    q5_tried_weight_loss: string;
    q6_methods: string[];
    q6_other: string;
    q7_biggest_difficulty: string;
    q8_consistency_duration: string;
    q9_why_stop: string;
    q10_heard_about_injections: string;
    q11_where_heard: string;
    q12_opinion: string;
    q13_consider_using: string;
    q14_concerns: string[];
    q14_other: string;
    q15_family_members: string[];
    q16_relatives_know: string;
    q17_know_anyone: string;
    q18_support_family: string;
    q19_why_or_why_not: string;
    q20_use_apps: string;
    q21_why_stopped_apps: string;
    q22_support_type: string[];
    q23_would_use_app: string;
    q24_useful_features: string;
    q25_would_pay: string;
    q26_monthly_amount: string;
    q27_what_convinces: string;
}

const initialData: SurveyData = {
    q1_age: '', q2_gender: '', q3_body_type: '', q4_medical_conditions: '',
    q5_tried_weight_loss: '', q6_methods: [], q6_other: '', q7_biggest_difficulty: '',
    q8_consistency_duration: '', q9_why_stop: '', q10_heard_about_injections: '',
    q11_where_heard: '', q12_opinion: '', q13_consider_using: '', q14_concerns: [],
    q14_other: '', q15_family_members: [], q16_relatives_know: '', q17_know_anyone: '',
    q18_support_family: '', q19_why_or_why_not: '', q20_use_apps: '',
    q21_why_stopped_apps: '', q22_support_type: [], q23_would_use_app: '',
    q24_useful_features: '', q25_would_pay: '', q26_monthly_amount: '', q27_what_convinces: '',
};

/* ──────────────────────────────────────────────
   Reusable UI primitives
   ────────────────────────────────────────────── */

const inputCls =
    'w-full px-4 py-3 rounded-lg bg-white border border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-colors text-sm';

function RequiredDot() {
    return <span className="text-red-500 ml-0.5">*</span>;
}

function QNum({ n }: { n: number }) {
    return (
        <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-blue-50 text-blue-600 text-xs font-bold mr-2 shrink-0">
            {n}
        </span>
    );
}

function RadioOption({
    name, value, label, checked, onChange,
}: {
    name: string; value: string; label: string; checked: boolean; onChange: (v: string) => void;
}) {
    return (
        <label
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg border cursor-pointer transition-all text-sm select-none ${checked
                ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
        >
            <input type="radio" name={name} value={value} checked={checked} onChange={() => onChange(value)} className="sr-only" />
            <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${checked ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}>
                {checked && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
            </div>
            {label}
        </label>
    );
}

function CheckOption({
    label, checked, onChange,
}: {
    label: string; checked: boolean; onChange: (c: boolean) => void;
}) {
    return (
        <label
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-lg border cursor-pointer transition-all text-sm select-none ${checked
                ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                }`}
        >
            <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="sr-only" />
            <div className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${checked ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}>
                {checked && (
                    <svg className="w-2.5 h-2.5 text-white" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
            </div>
            {label}
        </label>
    );
}

function SectionHeader({ icon: Icon, label, num }: { icon: React.ElementType; label: string; num: number }) {
    return (
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-blue-50 text-blue-600">
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Section {num}</p>
                <h3 className="text-lg font-semibold text-gray-900">{label}</h3>
            </div>
        </div>
    );
}

/* ──────────────────────────────────────────────
   Main Survey component
   ────────────────────────────────────────────── */

export default function Survey() {
    const [disclaimerAccepted, setDisclaimerAccepted] = useState(false);
    const [data, setData] = useState<SurveyData>(initialData);
    const [submitted, setSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    const navigate = useNavigate();

    useMetaTags({
        title: 'Weight-Loss & Health Perception Survey | EnteraFlux',
        description: 'Take part in our anonymous research survey about health behaviours, weight management perceptions, and technology usage patterns in India.',
        url: 'https://www.enteraflux.tech/public/survey',
        image: 'https://www.enteraflux.tech/logo.png',
    });

    // Prevent browser back button from navigating away from the survey
    useEffect(() => {
        // Push a duplicate entry so back stays on this page
        window.history.pushState(null, '', window.location.href);
        const handlePopState = () => {
            window.history.pushState(null, '', window.location.href);
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

    const set = (field: keyof SurveyData, value: string) => setData((p) => ({ ...p, [field]: value }));
    const toggleArr = (field: keyof SurveyData, value: string) => {
        setData((p) => {
            const arr = p[field] as string[];
            return { ...p, [field]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value] };
        });
    };

    const validate = (): string[] => {
        const m: string[] = [];
        if (!data.q1_age) m.push('Q1 — Age');
        if (!data.q3_body_type) m.push('Q3 — Body type');
        if (!data.q5_tried_weight_loss) m.push('Q5 — Tried to lose weight');
        if (!data.q8_consistency_duration) m.push('Q8 — Consistency duration');
        if (!data.q10_heard_about_injections) m.push('Q10 — Heard about injections');
        if (!data.q13_consider_using) m.push('Q13 — Consider using medication');
        if (data.q15_family_members.length === 0) m.push('Q15 — Family members');
        if (!data.q16_relatives_know) m.push('Q16 — Relatives know about semaglutide');
        if (!data.q17_know_anyone) m.push('Q17 — Know anyone planning medication');
        if (!data.q18_support_family) m.push('Q18 — Support family member');
        if (!data.q20_use_apps) m.push('Q20 — Use fitness/health apps');
        if (!data.q23_would_use_app) m.push('Q23 — Would use the app');
        if (!data.q25_would_pay) m.push('Q25 — Would pay for app');
        return m;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const missing = validate();
        if (missing.length > 0) { setErrors(missing); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
        setErrors([]);
        setSubmitting(true);
        setSubmitError(false);

        const success = await submitSurveyResponse({
            ...data,
            q6_methods: data.q6_methods,
            q14_concerns: data.q14_concerns,
            q15_family_members: data.q15_family_members,
            q22_support_type: data.q22_support_type,
        });

        setSubmitting(false);
        if (success) {
            setSubmitted(true);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            setSubmitError(true);
        }
    };

    /* ── Success Screen ── */
    if (submitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center">
                    <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100">
                        <CheckCircle2 className="w-10 h-10 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">Thank You!</h2>
                    <p className="text-gray-600 mb-2">Your response has been recorded anonymously.</p>
                    <p className="text-sm text-gray-500 mb-8">
                        Your input will help shape better health-tech solutions for India.
                    </p>
                    <button
                        onClick={() => navigate('/', { replace: true })}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25 cursor-pointer"
                    >
                        Learn more about EnteraFlux
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>
            </div>
        );
    }

    /* ── Survey Form ── */
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
            {/* ── Disclaimer Modal ── */}
            {!disclaimerAccepted && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
                    <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="w-11 h-11 rounded-xl bg-amber-100 flex items-center justify-center shrink-0">
                                <ShieldAlert className="w-6 h-6 text-amber-600" />
                            </div>
                            <h2 className="text-lg font-bold text-gray-900">Research Participation Disclaimer</h2>
                        </div>

                        <p className="text-sm text-gray-700 mb-3">
                            This survey is conducted for academic and research purposes related to health awareness, weight management, and technology usage patterns.
                        </p>
                        <p className="text-sm font-semibold text-gray-800 mb-2">Before participating, please read the following carefully:</p>
                        <ul className="space-y-2 text-sm text-gray-600 mb-4 list-disc list-inside">
                            <li>This survey is <strong>for research purposes only</strong>. It does not provide medical advice, diagnosis, or treatment recommendations.</li>
                            <li>Any mention of medications (including semaglutide or other weight-loss drugs) is <strong>purely informational</strong>. Participants should consult qualified healthcare professionals before making any medical decisions.</li>
                            <li>Participation in this survey is <strong>completely voluntary</strong>.</li>
                            <li>The survey is <strong>anonymous</strong>. We do not collect personally identifiable information such as name, phone number, or email address unless explicitly stated.</li>
                            <li>The responses collected will be used <strong>only for research, analysis, and academic purposes</strong>. Data will be stored securely and will not be shared with third parties in identifiable form.</li>
                        </ul>
                        <p className="text-sm text-gray-700 mb-2 font-semibold">By proceeding with this survey, you confirm that:</p>
                        <ul className="space-y-1.5 text-sm text-gray-600 mb-5 list-disc list-inside">
                            <li>You are participating voluntarily.</li>
                            <li>You understand this is not medical advice.</li>
                            <li>You consent to the use of your anonymized responses for research and analysis.</li>
                        </ul>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={() => setDisclaimerAccepted(true)}
                                className="flex-1 px-5 py-3 rounded-xl bg-blue-600 text-white font-semibold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/25 cursor-pointer"
                            >
                                I Agree &amp; Continue
                            </button>
                            <button
                                onClick={() => navigate('/', { replace: true })}
                                className="flex-1 px-5 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold text-sm hover:bg-gray-200 transition-colors cursor-pointer"
                            >
                                I Do Not Agree
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {/* Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
                <div className="max-w-3xl mx-auto px-5 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-lg font-bold text-gray-900">EnteraFlux</h1>
                        <p className="text-xs text-gray-500">Research Survey</p>
                    </div>
                    <span className="text-[11px] font-medium uppercase tracking-wider text-gray-400 bg-gray-100 px-3 py-1 rounded-full">
                        Anonymous
                    </span>
                </div>
            </header>

            <div className="max-w-3xl mx-auto px-5 py-10">
                {/* Title */}
                <div className="text-center mb-10">
                    <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                        Weight-Loss & Health Perception Survey
                    </h2>
                    <p className="text-gray-500 text-sm max-w-xl mx-auto">
                        Help us understand health behaviors, perceptions, and needs in India.
                        All responses are anonymous and used solely for research.
                    </p>
                    <p className="text-xs text-gray-400 mt-3">
                        Fields marked with <span className="text-red-500 font-medium">*</span> are required.
                    </p>
                </div>


                {/* Validation errors */}
                {errors.length > 0 && (
                    <div className="mb-8 rounded-lg border border-red-200 bg-red-50 p-4">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm font-medium text-red-700 mb-2">Please fill in the following required fields:</p>
                                <ul className="text-sm text-red-600 space-y-1 list-disc list-inside">
                                    {errors.map((err) => <li key={err}>{err}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-10">

                    {/* ═══════ SECTION 1 ═══════ */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-8">
                        <SectionHeader icon={ClipboardList} label="Basic Background" num={1} />
                        <div className="space-y-7">
                            {/* Q1 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2"><QNum n={1} />Age<RequiredDot /></label>
                                <div className="flex flex-wrap gap-3">
                                    {['17–19', '20–22', '23–25', 'Above 25'].map((v) => (
                                        <RadioOption key={v} name="q1" value={v} label={v} checked={data.q1_age === v} onChange={(val) => set('q1_age', val)} />
                                    ))}
                                </div>
                            </div>
                            {/* Q2 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2"><QNum n={2} />Gender <span className="text-gray-400 text-xs font-normal">(Optional)</span></label>
                                <div className="flex flex-wrap gap-3">
                                    {['Male', 'Female', 'Prefer not to say'].map((v) => (
                                        <RadioOption key={v} name="q2" value={v} label={v} checked={data.q2_gender === v} onChange={(val) => set('q2_gender', val)} />
                                    ))}
                                </div>
                            </div>
                            {/* Q3 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2"><QNum n={3} />How would you describe your current body type?<RequiredDot /></label>
                                <div className="flex flex-wrap gap-3">
                                    {['Underweight', 'Average', 'Slightly overweight', 'Overweight', 'Not sure'].map((v) => (
                                        <RadioOption key={v} name="q3" value={v} label={v} checked={data.q3_body_type === v} onChange={(val) => set('q3_body_type', val)} />
                                    ))}
                                </div>
                            </div>
                            {/* Q4 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2"><QNum n={4} />Do you have any known medical conditions? <span className="text-gray-400 text-xs font-normal">(Optional)</span></label>
                                <input type="text" className={inputCls} placeholder="e.g. Diabetes, Thyroid, PCOS, None..." value={data.q4_medical_conditions} onChange={(e) => set('q4_medical_conditions', e.target.value)} />
                            </div>
                        </div>
                    </div>

                    {/* ═══════ SECTION 2 ═══════ */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-8">
                        <SectionHeader icon={Scale} label="Weight Loss Experience" num={2} />
                        <div className="space-y-7">
                            {/* Q5 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2"><QNum n={5} />Have you ever tried to lose weight?<RequiredDot /></label>
                                <div className="flex flex-wrap gap-3">
                                    {['Yes, multiple times', 'Yes, once', 'No, but I want to', 'No'].map((v) => (
                                        <RadioOption key={v} name="q5" value={v} label={v} checked={data.q5_tried_weight_loss === v} onChange={(val) => set('q5_tried_weight_loss', val)} />
                                    ))}
                                </div>
                            </div>
                            {/* Q6 — conditional */}
                            {(data.q5_tried_weight_loss === 'Yes, multiple times' || data.q5_tried_weight_loss === 'Yes, once') && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2"><QNum n={6} />What methods have you tried? <span className="text-gray-400 text-xs font-normal">(Select all that apply)</span></label>
                                    <div className="flex flex-wrap gap-3">
                                        {['Gym', 'Home workouts', 'Dieting', 'Fasting', 'Supplements', 'Doctor consultation'].map((v) => (
                                            <CheckOption key={v} label={v} checked={data.q6_methods.includes(v)} onChange={() => toggleArr('q6_methods', v)} />
                                        ))}
                                    </div>
                                    <input type="text" className={`${inputCls} mt-3`} placeholder="Other method (please specify)..." value={data.q6_other} onChange={(e) => set('q6_other', e.target.value)} />
                                </div>
                            )}
                            {/* Q7 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2"><QNum n={7} />What was the biggest difficulty you faced while trying to lose weight? <span className="text-gray-400 text-xs font-normal">(Optional)</span></label>
                                <textarea className={`${inputCls} resize-none`} rows={3} placeholder="Describe your biggest challenge..." value={data.q7_biggest_difficulty} onChange={(e) => set('q7_biggest_difficulty', e.target.value)} />
                            </div>
                            {/* Q8 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2"><QNum n={8} />How long do you usually stay consistent before stopping?<RequiredDot /></label>
                                <div className="flex flex-wrap gap-3">
                                    {['Less than 2 weeks', '2–4 weeks', '1–3 months', 'More than 3 months'].map((v) => (
                                        <RadioOption key={v} name="q8" value={v} label={v} checked={data.q8_consistency_duration === v} onChange={(val) => set('q8_consistency_duration', val)} />
                                    ))}
                                </div>
                            </div>
                            {/* Q9 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2"><QNum n={9} />Why do you stop? <span className="text-gray-400 text-xs font-normal">(Optional)</span></label>
                                <textarea className={`${inputCls} resize-none`} rows={3} placeholder="What usually makes you give up..." value={data.q9_why_stop} onChange={(e) => set('q9_why_stop', e.target.value)} />
                            </div>
                        </div>
                    </div>

                    {/* ═══════ SECTION 3 ═══════ */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-8">
                        <SectionHeader icon={Pill} label="Awareness About Weight-Loss Medications" num={3} />

                        {/* Info box */}
                        <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-5">
                            <h4 className="text-sm font-semibold text-blue-700 mb-2 flex items-center gap-2">
                                <Pill className="w-4 h-4" />
                                About Semaglutide (GLP-1 Medications)
                            </h4>
                            <div className="text-sm text-gray-700 space-y-2 leading-relaxed">
                                <p>Semaglutide is a doctor-prescribed medication originally developed for diabetes. It works by regulating appetite and slowing digestion, helping people feel full for longer.</p>
                                <p>It is now also prescribed in some countries for weight loss under medical supervision.</p>
                                <p>Like all medications, it may have side effects and should only be taken under a doctor's guidance.</p>
                            </div>
                        </div>

                        <div className="space-y-7">
                            {/* Q10 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2"><QNum n={10} />Before reading this, had you heard about such weight-loss injections?<RequiredDot /></label>
                                <div className="flex flex-wrap gap-3">
                                    {['Yes', 'No'].map((v) => (
                                        <RadioOption key={v} name="q10" value={v} label={v} checked={data.q10_heard_about_injections === v} onChange={(val) => set('q10_heard_about_injections', val)} />
                                    ))}
                                </div>
                            </div>
                            {/* Q11 — conditional */}
                            {data.q10_heard_about_injections === 'Yes' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2"><QNum n={11} />Where did you hear about it? <span className="text-gray-400 text-xs font-normal">(Optional)</span></label>
                                    <div className="flex flex-wrap gap-3">
                                        {['Social media', 'Doctor', 'Friends/Family', 'News', 'Other'].map((v) => (
                                            <RadioOption key={v} name="q11" value={v} label={v} checked={data.q11_where_heard === v} onChange={(val) => set('q11_where_heard', val)} />
                                        ))}
                                    </div>
                                </div>
                            )}
                            {/* Q12 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2"><QNum n={12} />After reading the description, what is your opinion about such medications? <span className="text-gray-400 text-xs font-normal">(Optional)</span></label>
                                <textarea className={`${inputCls} resize-none`} rows={3} placeholder="Share your thoughts..." value={data.q12_opinion} onChange={(e) => set('q12_opinion', e.target.value)} />
                            </div>
                            {/* Q13 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2"><QNum n={13} />Would you personally consider using a medically prescribed weight-loss injection if it was safe, doctor-approved, and affordable?<RequiredDot /></label>
                                <div className="flex flex-wrap gap-3">
                                    {['Yes', 'Maybe', 'No'].map((v) => (
                                        <RadioOption key={v} name="q13" value={v} label={v} checked={data.q13_consider_using === v} onChange={(val) => set('q13_consider_using', val)} />
                                    ))}
                                </div>
                            </div>
                            {/* Q14 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2"><QNum n={14} />What concerns would stop you? <span className="text-gray-400 text-xs font-normal">(Optional — select all)</span></label>
                                <div className="flex flex-wrap gap-3">
                                    {['Side effects', 'Long-term health risks', 'Cost', 'Fear of dependency', 'Social judgment', 'Prefer natural methods'].map((v) => (
                                        <CheckOption key={v} label={v} checked={data.q14_concerns.includes(v)} onChange={() => toggleArr('q14_concerns', v)} />
                                    ))}
                                </div>
                                <input type="text" className={`${inputCls} mt-3`} placeholder="Other concern (please describe)..." value={data.q14_other} onChange={(e) => set('q14_other', e.target.value)} />
                            </div>
                        </div>
                    </div>

                    {/* ═══════ SECTION 4 ═══════ */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-8">
                        <SectionHeader icon={Users} label="Family & Social Influence" num={4} />
                        <div className="space-y-7">
                            {/* Q15 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2"><QNum n={15} />Do you have any family members (parents, relatives, siblings) who:<RequiredDot /></label>
                                <div className="flex flex-wrap gap-3">
                                    {['Are overweight', 'Have diabetes', 'Have tried weight-loss medications', 'None'].map((v) => (
                                        <CheckOption key={v} label={v} checked={data.q15_family_members.includes(v)} onChange={() => toggleArr('q15_family_members', v)} />
                                    ))}
                                </div>
                            </div>
                            {/* Q16 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2"><QNum n={16} />Do any of your relatives or parents know about semaglutide or similar drugs?<RequiredDot /></label>
                                <div className="flex flex-wrap gap-3">
                                    {['Yes', 'No', 'Not sure'].map((v) => (
                                        <RadioOption key={v} name="q16" value={v} label={v} checked={data.q16_relatives_know === v} onChange={(val) => set('q16_relatives_know', val)} />
                                    ))}
                                </div>
                            </div>
                            {/* Q17 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2"><QNum n={17} />Do you know anyone personally who is planning to take such medication?<RequiredDot /></label>
                                <div className="flex flex-wrap gap-3">
                                    {['Yes', 'No'].map((v) => (
                                        <RadioOption key={v} name="q17" value={v} label={v} checked={data.q17_know_anyone === v} onChange={(val) => set('q17_know_anyone', val)} />
                                    ))}
                                </div>
                            </div>
                            {/* Q18 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2"><QNum n={18} />If a close family member wanted to take it, would you support them?<RequiredDot /></label>
                                <div className="flex flex-wrap gap-3">
                                    {['Yes', 'Maybe', 'No'].map((v) => (
                                        <RadioOption key={v} name="q18" value={v} label={v} checked={data.q18_support_family === v} onChange={(val) => set('q18_support_family', val)} />
                                    ))}
                                </div>
                            </div>
                            {/* Q19 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2"><QNum n={19} />Why or why not? <span className="text-gray-400 text-xs font-normal">(Optional)</span></label>
                                <textarea className={`${inputCls} resize-none`} rows={3} placeholder="Share your reasoning..." value={data.q19_why_or_why_not} onChange={(e) => set('q19_why_or_why_not', e.target.value)} />
                            </div>
                        </div>
                    </div>

                    {/* ═══════ SECTION 5 ═══════ */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-8">
                        <SectionHeader icon={Smartphone} label="Technology & Support Systems" num={5} />
                        <div className="space-y-7">
                            {/* Q20 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2"><QNum n={20} />Do you use fitness or health tracking apps?<RequiredDot /></label>
                                <div className="flex flex-wrap gap-3">
                                    {['Regularly', 'Sometimes', 'Tried but stopped', 'Never'].map((v) => (
                                        <RadioOption key={v} name="q20" value={v} label={v} checked={data.q20_use_apps === v} onChange={(val) => set('q20_use_apps', val)} />
                                    ))}
                                </div>
                            </div>
                            {/* Q21 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2"><QNum n={21} />If you stopped using them, why? <span className="text-gray-400 text-xs font-normal">(Optional)</span></label>
                                <textarea className={`${inputCls} resize-none`} rows={3} placeholder="What made you stop..." value={data.q21_why_stopped_apps} onChange={(e) => set('q21_why_stopped_apps', e.target.value)} />
                            </div>
                            {/* Q22 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2"><QNum n={22} />What kind of support would help you stay consistent? <span className="text-gray-400 text-xs font-normal">(Optional — select all)</span></label>
                                <div className="flex flex-wrap gap-3">
                                    {['AI-based personalized guidance', 'Human coach', 'Doctor monitoring', 'Community support', 'Simple reminders', 'Not interested'].map((v) => (
                                        <CheckOption key={v} label={v} checked={data.q22_support_type.includes(v)} onChange={() => toggleArr('q22_support_type', v)} />
                                    ))}
                                </div>
                            </div>
                            {/* Q23 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2"><QNum n={23} />If there was an app that analysed your body's physiological patterns during medication use, helped you understand how your body responds over time, suggested personalised diet changes, and supported your journey under doctor supervision, would you use it?<RequiredDot /></label>
                                <div className="flex flex-wrap gap-3">
                                    {['Yes', 'Maybe', 'No'].map((v) => (
                                        <RadioOption key={v} name="q23" value={v} label={v} checked={data.q23_would_use_app === v} onChange={(val) => set('q23_would_use_app', val)} />
                                    ))}
                                </div>
                            </div>
                            {/* Q24 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2"><QNum n={24} />What features would make such an app genuinely useful for you? <span className="text-gray-400 text-xs font-normal">(Optional)</span></label>
                                <textarea className={`${inputCls} resize-none`} rows={3} placeholder="Describe features that would matter to you..." value={data.q24_useful_features} onChange={(e) => set('q24_useful_features', e.target.value)} />
                            </div>
                        </div>
                    </div>

                    {/* ═══════ SECTION 6 ═══════ */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6 sm:p-8">
                        <SectionHeader icon={CreditCard} label="Willingness to Pay" num={6} />
                        <div className="space-y-7">
                            {/* Q25 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2"><QNum n={25} />Would you pay for a personalized health support app?<RequiredDot /></label>
                                <div className="flex flex-wrap gap-3">
                                    {['Yes', 'Maybe', 'No'].map((v) => (
                                        <RadioOption key={v} name="q25" value={v} label={v} checked={data.q25_would_pay === v} onChange={(val) => set('q25_would_pay', val)} />
                                    ))}
                                </div>
                            </div>
                            {/* Q26 — conditional */}
                            {(data.q25_would_pay === 'Yes' || data.q25_would_pay === 'Maybe') && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2"><QNum n={26} />How much would you pay monthly? <span className="text-gray-400 text-xs font-normal">(Optional)</span></label>
                                    <div className="flex flex-wrap gap-3">
                                        {['₹99–199', '₹199–499', '₹499–999', 'More than ₹999'].map((v) => (
                                            <RadioOption key={v} name="q26" value={v} label={v} checked={data.q26_monthly_amount === v} onChange={(val) => set('q26_monthly_amount', val)} />
                                        ))}
                                    </div>
                                </div>
                            )}
                            {/* Q27 */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2"><QNum n={27} />What would convince you to pay? <span className="text-gray-400 text-xs font-normal">(Optional)</span></label>
                                <textarea className={`${inputCls} resize-none`} rows={3} placeholder="What value would make it worth paying for..." value={data.q27_what_convinces} onChange={(e) => set('q27_what_convinces', e.target.value)} />
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="mt-10 pt-6 border-t border-gray-100">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full py-3.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 active:bg-blue-800 transition-colors shadow-lg shadow-blue-600/25 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                                {submitting ? 'Submitting...' : 'Submit Survey'}
                            </button>
                            {submitError && (
                                <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-3 flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                                    <p className="text-sm text-red-600">Failed to submit. Please check your internet connection and try again.</p>
                                </div>
                            )}
                            <p className="text-xs text-gray-400 mt-4 text-center">
                                All responses are anonymous. Your data is used solely for research purposes.
                            </p>
                        </div>
                    </div>
                </form>

                {/* Footer */}
                <div className="text-center mt-10 pb-10">
                    <p className="text-xs text-gray-400">© {new Date().getFullYear()} EnteraFlux — Research Survey</p>
                </div>
            </div>
        </div>
    );
}
