import { Head, usePage } from '@inertiajs/react';
import WebsiteLayout from '@/Layouts/WebsiteLayout';

export default function TermsOfService() {
    const { siteSettings = {} } = usePage().props;
    const siteName = siteSettings.site_name || 'CodeUnion Software';

    return (
        <WebsiteLayout>
            <Head title={`Terms of Service - ${siteName}`} />

            <section className="py-20 bg-gradient-to-br from-[#021B1C] to-[#0c3d3f] text-center">
                <div className="container mx-auto px-4">
                    <p className="text-accent-400 text-sm uppercase tracking-widest font-semibold mb-4">• LEGAL •</p>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-4">Terms of Service</h1>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                        These terms govern your access to and use of services provided by {siteName}.
                    </p>
                </div>
            </section>

            <section className="py-16 bg-[#021B1C]">
                <div className="container mx-auto px-4 max-w-4xl space-y-8">
                    <div className="card p-6">
                        <h2 className="text-xl font-semibold text-text-primary mb-3">1. Acceptance of Terms</h2>
                        <p className="text-text-secondary leading-relaxed">
                            By using this website or engaging our services, you agree to these terms and all applicable laws.
                        </p>
                    </div>

                    <div className="card p-6">
                        <h2 className="text-xl font-semibold text-text-primary mb-3">2. Services and Deliverables</h2>
                        <p className="text-text-secondary leading-relaxed">
                            Project scope, timelines, and fees are defined in individual proposals or agreements.
                            Any additional requests may require a separate estimate and approval.
                        </p>
                    </div>

                    <div className="card p-6">
                        <h2 className="text-xl font-semibold text-text-primary mb-3">3. Intellectual Property</h2>
                        <p className="text-text-secondary leading-relaxed">
                            Unless otherwise agreed in writing, all pre-existing tools, templates, and frameworks remain the property of their
                            respective owners. Client ownership of final deliverables is governed by the signed agreement.
                        </p>
                    </div>

                    <div className="card p-6">
                        <h2 className="text-xl font-semibold text-text-primary mb-3">4. Limitation of Liability</h2>
                        <p className="text-text-secondary leading-relaxed">
                            To the fullest extent permitted by law, we are not liable for indirect, incidental, or consequential damages
                            arising from use of this website or services.
                        </p>
                    </div>
                </div>
            </section>
        </WebsiteLayout>
    );
}
