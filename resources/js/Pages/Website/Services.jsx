import { Head, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import WebsiteLayout from '@/Layouts/WebsiteLayout';
import { Building2, Smartphone, Globe, ShieldCheck, Database, Settings2, Palette } from 'lucide-react';
import { getServices } from '@/lib/siteContent';

const SERVICE_ICONS = {
    'erp-odoo': Building2,
    'mobile-flutter': Smartphone,
    'web-development': Globe,
    cybersecurity: ShieldCheck,
    'database-management': Database,
    'custom-software': Settings2,
    'ui-ux-graphic-design': Palette,
};

export default function Services() {
    const { siteSettings = {} } = usePage().props;
    const siteName = siteSettings.site_name || 'CodeUnion Software';
    const services = getServices(siteSettings);

    return (
        <WebsiteLayout>
            <Head title={`Services - ${siteName}`} />

            {/* Hero */}
            <section className="py-20 bg-gradient-to-br from-[#021B1C] to-[#0c3d3f] text-center">
                <div className="container mx-auto px-4">
                    <p className="text-accent-400 text-sm uppercase tracking-widest font-semibold mb-4">• WHAT WE DO •</p>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-4">Our Services</h1>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                        Complete technology services built around your operations, growth, and security.
                    </p>
                </div>
            </section>

            {/* Services Grid */}
            <section className="py-20 bg-[#021B1C]">
                <div className="container mx-auto px-4">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map(({ key, title, routeName, description, features, noteLabel, noteText }) => {
                            const Icon = SERVICE_ICONS[key] ?? Globe;
                            return (
                            <div key={title} className="card p-7 flex flex-col">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 flex items-center justify-center mb-5">
                                    <Icon size={22} className="text-accent-400" />
                                </div>
                                <h2 className="text-xl font-semibold text-text-primary mb-2">{title}</h2>
                                <p className="text-text-secondary text-sm mb-4 flex-1">{description}</p>
                                <ul className="space-y-1.5 mb-6">
                                    {features.map((f) => (
                                        <li key={f} className="flex items-center gap-2 text-sm text-text-secondary">
                                            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 flex-shrink-0" />
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                                {noteText && (
                                    <p className="text-xs text-brand-300 mb-4">
                                        {noteLabel ? `${noteLabel}: ${noteText}` : noteText}
                                    </p>
                                )}
                                <div className="mt-auto flex flex-wrap gap-2">
                                    <Link href={route(routeName)} className="btn btn-secondary text-sm">
                                        View Details
                                    </Link>
                                    <Link href={route('contact')} className="btn btn-primary text-sm">
                                        Get a Quote
                                    </Link>
                                </div>
                            </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-[#0a2e2f] border-t border-[#1a4445] text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-text-primary mb-3">Ready to get started?</h2>
                    <p className="text-text-secondary mb-6 max-w-lg mx-auto">
                        Tell us about your project and we'll get back to you within 24 hours.
                    </p>
                    <Link href={route('contact')} className="btn btn-primary inline-flex items-center gap-2">
                        Contact Us
                    </Link>
                </div>
            </section>
        </WebsiteLayout>
    );
}
