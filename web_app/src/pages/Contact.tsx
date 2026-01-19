import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Section from '../components/Section';
import ScrollReveal from '../components/ScrollReveal';
import { Mail, User, Building, MessageSquare } from 'lucide-react';

type UserRole = 'patient' | 'researcher' | 'clinician' | 'investor' | 'partner';

export default function Contact() {
    const [searchParams] = useSearchParams();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        organization: '',
        role: (searchParams.get('type') as UserRole) || 'patient',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder: Would integrate with backend API
        console.log('Form submission:', formData);
        setSubmitted(true);

        // In production, this would be an API call
        setTimeout(() => {
            alert('Thank you! We\'ll be in touch soon. (This is a placeholder - no data was actually sent)');
        }, 100);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div>
            <Section
                title="Get in Touch"
                subtitle="Join the waitlist, request partnership access, or reach out with questions"
                variant="gradient"
                firstSection
            >
                <ScrollReveal delay={200} direction="up">
                    <div className="max-w-2xl mx-auto text-center">
                        <p className="text-neutral-700 dark:text-neutral-300 mb-8">
                            Whether you're a patient interested in early access, a researcher exploring partnerships, or an investor learning about our mission, we'd love to hear from you.
                        </p>
                    </div>
                </ScrollReveal>
            </Section>

            <Section variant="dark">
                <div className="max-w-3xl mx-auto">
                    <div className="glass rounded-2xl p-8 sm:p-12">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Name */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                    <User className="w-4 h-4 inline mr-2" />
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-900 border border-neutral-300 dark:border-slate-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-slate-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-950 transition-colors"
                                    placeholder="Jane Smith"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                    <Mail className="w-4 h-4 inline mr-2" />
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-900 border border-neutral-300 dark:border-slate-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-slate-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-950 transition-colors"
                                    placeholder="jane@example.com"
                                />
                            </div>

                            {/* Organization (optional) */}
                            <div>
                                <label htmlFor="organization" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                    <Building className="w-4 h-4 inline mr-2" />
                                    Organization (Optional)
                                </label>
                                <input
                                    type="text"
                                    id="organization"
                                    name="organization"
                                    value={formData.organization}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-900 border border-neutral-300 dark:border-slate-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-slate-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-950 transition-colors"
                                    placeholder="Company or Institution"
                                />
                            </div>

                            {/* Role */}
                            <div>
                                <label htmlFor="role" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                    I am a...
                                </label>
                                <select
                                    id="role"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-900 border border-neutral-300 dark:border-slate-700 text-neutral-900 dark:text-white focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-950 transition-colors"
                                >
                                    <option value="patient">Patient (join waitlist)</option>
                                    <option value="researcher">Researcher / CRO</option>
                                    <option value="clinician">Clinician</option>
                                    <option value="investor">Investor</option>
                                    <option value="partner">Partner / Other</option>
                                </select>
                            </div>

                            {/* Message */}
                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
                                    <MessageSquare className="w-4 h-4 inline mr-2" />
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    required
                                    rows={6}
                                    value={formData.message}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-900 border border-neutral-300 dark:border-slate-700 text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-slate-500 focus:border-primary-500 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-950 transition-colors resize-none"
                                    placeholder="Tell us about your interest in EnteraFlux..."
                                />
                            </div>

                            {/* Submit Button */}
                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={submitted}
                                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {submitted ? 'Submitted!' : 'Send Message'}
                                </button>
                                <p className="text-xs text-neutral-500 dark:text-slate-500 mt-4 text-center">
                                    This is a placeholder form. In production, submissions would be sent to our team.
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </Section>

            <Section variant="default">
                <div className="max-w-4xl mx-auto">
                    <h3 className="text-2xl font-bold text-center mb-8 text-neutral-900 dark:text-white">Other Ways to Connect</h3>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                        <div className="text-center glass rounded-xl p-6">
                            <Mail className="w-12 h-12 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
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
