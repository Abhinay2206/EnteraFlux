import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Section from '../components/Section';
import ScrollReveal from '../components/ScrollReveal';
import { Mail, User, Building, MessageSquare, Beaker, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { submitFeedback, submitRDInterest } from '../firebase';

type FeedbackRole = 'patient' | 'developer' | 'clinician' | 'researcher' | 'other';
type ActiveTab = 'feedback' | 'rnd';

export default function Contact() {
    useEffect(() => {
        document.title = 'Contact | EnteraFlux';
    }, []);

    const [searchParams] = useSearchParams();
    const defaultTab: ActiveTab = searchParams.get('tab') === 'rnd' ? 'rnd' : 'feedback';
    const [activeTab, setActiveTab] = useState<ActiveTab>(defaultTab);

    // ── Feedback Form ──
    const [feedbackData, setFeedbackData] = useState({
        name: '',
        email: '',
        role: (searchParams.get('type') as FeedbackRole) || 'patient',
        message: '',
    });
    const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);
    const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
    const [feedbackError, setFeedbackError] = useState(false);

    const handleFeedbackChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFeedbackData({ ...feedbackData, [e.target.name]: e.target.value });
    };

    const handleFeedbackSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFeedbackSubmitting(true);
        setFeedbackError(false);
        const ok = await submitFeedback(feedbackData);
        setFeedbackSubmitting(false);
        if (ok) setFeedbackSubmitted(true);
        else setFeedbackError(true);
    };

    // ── R&D Form ──
    const [rndData, setRndData] = useState({
        name: '',
        email: '',
        organization: '',
        expertise: '',
        motivation: '',
    });
    const [rndSubmitting, setRndSubmitting] = useState(false);
    const [rndSubmitted, setRndSubmitted] = useState(false);
    const [rndError, setRndError] = useState(false);

    const handleRndChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setRndData({ ...rndData, [e.target.name]: e.target.value });
    };

    const handleRndSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setRndSubmitting(true);
        setRndError(false);
        const ok = await submitRDInterest(rndData);
        setRndSubmitting(false);
        if (ok) setRndSubmitted(true);
        else setRndError(true);
    };

    const inputClass =
        'w-full px-4 py-3 rounded-xl bg-white dark:bg-white/[0.04] border border-neutral-200 dark:border-white/[0.08] text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-600 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 focus:ring-offset-0 transition-colors';

    return (
        <div>
            <Section
                title="Get In Touch"
                subtitle="Share your feedback or join our Research & Development team"
                variant="gradient"
                firstSection
            >
                <ScrollReveal delay={200} effect="blur-in">
                    <div className="max-w-2xl mx-auto text-center">
                        <p className="text-neutral-700 dark:text-neutral-300 mb-8">
                            Whether you're a patient using GLP-1 medications, a developer, clinician, or researcher, we'd love to hear your thoughts and ideas.
                        </p>
                    </div>
                </ScrollReveal>
            </Section>

            <Section variant="dark">
                <div className="max-w-3xl mx-auto">
                    {/* Tab Switcher */}
                    <div className="flex items-center gap-1 mb-8 bg-white/80 dark:bg-white/[0.04] rounded-xl border border-neutral-200/60 dark:border-white/[0.08] p-1.5 w-fit mx-auto">
                        <button
                            onClick={() => setActiveTab('feedback')}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${activeTab === 'feedback'
                                    ? 'bg-primary-600 text-white shadow-sm'
                                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                                }`}
                        >
                            <MessageSquare className="w-4 h-4" />
                            Give Feedback
                        </button>
                        <button
                            onClick={() => setActiveTab('rnd')}
                            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${activeTab === 'rnd'
                                    ? 'bg-primary-600 text-white shadow-sm'
                                    : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                                }`}
                        >
                            <Beaker className="w-4 h-4" />
                            Join R&D
                        </button>
                    </div>

                    {/* ═══════════ Feedback Form ═══════════ */}
                    {activeTab === 'feedback' && (
                        <div className="card p-8 sm:p-10">
                            {feedbackSubmitted ? (
                                <div className="text-center py-10">
                                    <CheckCircle2 className="w-14 h-14 text-success-500 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Thank You!</h3>
                                    <p className="text-neutral-500 dark:text-neutral-400 text-sm">Your feedback has been submitted and saved. We really appreciate it.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleFeedbackSubmit} className="space-y-6">
                                    <div className="mb-2">
                                        <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Share Your Feedback</h3>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                                            As a patient, developer, or health professional, tell us what you think about EnteraFlux.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="fb-name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                                <User className="w-4 h-4 inline mr-2" />
                                                Full Name
                                            </label>
                                            <input
                                                type="text" id="fb-name" name="name" required
                                                value={feedbackData.name} onChange={handleFeedbackChange}
                                                className={inputClass} placeholder="Your name"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="fb-email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                                <Mail className="w-4 h-4 inline mr-2" />
                                                Email
                                            </label>
                                            <input
                                                type="email" id="fb-email" name="email" required
                                                value={feedbackData.email} onChange={handleFeedbackChange}
                                                className={inputClass} placeholder="you@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="fb-role" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                            I am a...
                                        </label>
                                        <select
                                            id="fb-role" name="role"
                                            value={feedbackData.role} onChange={handleFeedbackChange}
                                            className={inputClass}
                                        >
                                            <option value="patient">Patient / GLP-1 User</option>
                                            <option value="developer">Developer / Tech Professional</option>
                                            <option value="clinician">Doctor / Nutritionist</option>
                                            <option value="researcher">Researcher</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label htmlFor="fb-message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                            <MessageSquare className="w-4 h-4 inline mr-2" />
                                            Your Feedback
                                        </label>
                                        <textarea
                                            id="fb-message" name="message" required rows={5}
                                            value={feedbackData.message} onChange={handleFeedbackChange}
                                            className={`${inputClass} resize-none`}
                                            placeholder="Share your thoughts, suggestions, or experience with EnteraFlux..."
                                        />
                                    </div>

                                    {feedbackError && (
                                        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20">
                                            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                                            <p className="text-sm text-red-600 dark:text-red-400">Failed to submit. Please try again.</p>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={feedbackSubmitting}
                                        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {feedbackSubmitting ? (
                                            <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                                        ) : (
                                            'Submit Feedback'
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    )}

                    {/* ═══════════ R&D Join Form ═══════════ */}
                    {activeTab === 'rnd' && (
                        <div className="card p-8 sm:p-10">
                            {rndSubmitted ? (
                                <div className="text-center py-10">
                                    <CheckCircle2 className="w-14 h-14 text-success-500 mx-auto mb-4" />
                                    <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">Application Received!</h3>
                                    <p className="text-neutral-500 dark:text-neutral-400 text-sm">Thank you for your interest in joining our R&D team. We'll review your application and get back to you.</p>
                                </div>
                            ) : (
                                <form onSubmit={handleRndSubmit} className="space-y-6">
                                    <div className="mb-2">
                                        <h3 className="text-lg font-bold text-neutral-900 dark:text-white">Join Our R&D Team</h3>
                                        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                                            Interested in contributing to research and development at EnteraFlux? Tell us about yourself.
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div>
                                            <label htmlFor="rnd-name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                                <User className="w-4 h-4 inline mr-2" />
                                                Full Name
                                            </label>
                                            <input
                                                type="text" id="rnd-name" name="name" required
                                                value={rndData.name} onChange={handleRndChange}
                                                className={inputClass} placeholder="Your name"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="rnd-email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                                <Mail className="w-4 h-4 inline mr-2" />
                                                Email
                                            </label>
                                            <input
                                                type="email" id="rnd-email" name="email" required
                                                value={rndData.email} onChange={handleRndChange}
                                                className={inputClass} placeholder="you@example.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="rnd-org" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                            <Building className="w-4 h-4 inline mr-2" />
                                            Organization / University (Optional)
                                        </label>
                                        <input
                                            type="text" id="rnd-org" name="organization"
                                            value={rndData.organization} onChange={handleRndChange}
                                            className={inputClass} placeholder="Your organization or university"
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="rnd-expertise" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                            <Beaker className="w-4 h-4 inline mr-2" />
                                            Area of Expertise
                                        </label>
                                        <input
                                            type="text" id="rnd-expertise" name="expertise" required
                                            value={rndData.expertise} onChange={handleRndChange}
                                            className={inputClass} placeholder="e.g. Machine Learning, Nutrition Science, Health Tech..."
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor="rnd-motivation" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                            <MessageSquare className="w-4 h-4 inline mr-2" />
                                            Why do you want to join?
                                        </label>
                                        <textarea
                                            id="rnd-motivation" name="motivation" required rows={5}
                                            value={rndData.motivation} onChange={handleRndChange}
                                            className={`${inputClass} resize-none`}
                                            placeholder="Tell us about your interest in wellness tech, GLP-1 research, or what you'd like to contribute..."
                                        />
                                    </div>

                                    {rndError && (
                                        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20">
                                            <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                                            <p className="text-sm text-red-600 dark:text-red-400">Failed to submit. Please try again.</p>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={rndSubmitting}
                                        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {rndSubmitting ? (
                                            <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                                        ) : (
                                            'Submit Application'
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    )}
                </div>
            </Section>

            <Section variant="default">
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-2xl font-bold text-center mb-8 text-neutral-900 dark:text-white">Other Ways to Connect</h3>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                        <div className="text-center card p-6">
                            <Mail className="w-10 h-10 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
                            <h4 className="font-bold mb-2 text-neutral-900 dark:text-white">Email</h4>
                            <a href="mailto:contact.enteraflux@gmail.com" className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm">
                                contact.enteraflux@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
            </Section>
        </div>
    );
}
