import { Head, usePage } from '@inertiajs/react';
import WebsiteLayout from '@/Layouts/WebsiteLayout';

export default function PrivacyPolicy() {
    const { siteSettings = {} } = usePage().props;
    const siteName = siteSettings.site_name || 'CodeUnion Software';

    return (
        <WebsiteLayout>
            <Head title={`Privacy Policy - ${siteName}`} />

            <section className="py-20 bg-gradient-to-br from-[#021B1C] to-[#0c3d3f] text-center">
                <div className="container mx-auto px-4">
                    <p className="text-accent-400 text-sm uppercase tracking-widest font-semibold mb-4">• LEGAL •</p>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-4">Privacy Policy</h1>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                        This page explains how {siteName} collects, uses, and protects your information.
                    </p>
                </div>
            </section>

            <section className="py-16 bg-[#021B1C]">
                <div className="container mx-auto px-4 max-w-4xl space-y-8">
                    <div className="card p-6">
                        <h2 className="text-xl font-semibold text-text-primary mb-3">1. Information We Collect</h2>
                        <p className="text-text-secondary leading-relaxed">
                            We may collect personal data you provide directly (such as name, email, phone number, and project details),
                            plus technical data (like IP address, browser type, and usage behavior) to improve our services.
                        </p>
                    </div>

                    <div className="card p-6">
                        <h2 className="text-xl font-semibold text-text-primary mb-3">2. How We Use Information</h2>
                        <p className="text-text-secondary leading-relaxed">
                            We use your information to communicate with you, deliver requested services, maintain security,
                            process support requests, and improve website performance and user experience.
                        </p>
                    </div>

                    <div className="card p-6">
                        <h2 className="text-xl font-semibold text-text-primary mb-3">3. Data Sharing</h2>
                        <p className="text-text-secondary leading-relaxed">
                            We do not sell your personal information. We only share data with trusted service providers when necessary
                            to operate our business, comply with legal obligations, or protect our rights.
                        </p>
                    </div>

                    <div className="card p-6">
                        <h2 className="text-xl font-semibold text-text-primary mb-3">4. Contact</h2>
                        <p className="text-text-secondary leading-relaxed">
                            If you have questions about this policy, contact us at {siteSettings.contact_email || 'hello@codeunion.dev'}.
                        </p>
                    </div>
                </div>
            </section>
        </WebsiteLayout>
    );
}
