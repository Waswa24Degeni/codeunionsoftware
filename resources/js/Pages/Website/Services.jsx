import { Head, usePage } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import WebsiteLayout from '@/Layouts/WebsiteLayout';
import { Building2, Smartphone, Globe, ShieldCheck, Database, Settings2, Palette, Network, Headset, ArrowRight, CheckCircle2 } from 'lucide-react';
import { getServices } from '@/lib/siteContent';

const SERVICE_ICONS = {
    'erp-odoo': Building2,
    'mobile-flutter': Smartphone,
    'web-development': Globe,
    cybersecurity: ShieldCheck,
    'database-management': Database,
    'custom-software': Settings2,
    'ui-ux-graphic-design': Palette,
    networking: Network,
    'it-support': Headset,
};

export default function Services() {
    const { siteSettings = {} } = usePage().props;
    const siteName = siteSettings.site_name || 'CodeUnion Software';
    const services = getServices(siteSettings);

    return (
        <WebsiteLayout>
            <Head title={`Services - ${siteName}`} />

            {/* Hero */}
            <section className="relative py-24 sm:py-32 bg-gradient-to-br from-[#021B1C] via-[#0a2e2f] to-[#021B1C] text-center overflow-hidden">
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, #00ADB5 1px, transparent 0)', backgroundSize: '40px 40px' }} />
                <div className="container relative mx-auto px-4">
                    <p className="text-accent-400 text-sm uppercase tracking-widest font-semibold mb-4">• WHAT WE DO •</p>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary mb-5">Our Services</h1>
                    <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
                        Complete technology services built around your operations, growth, and security — from concept to deployment and beyond.
                    </p>
                </div>
            </section>

            {/* Services — Alternating Full-Width Cards */}
            <section className="py-16 sm:py-24 bg-[#021B1C]">
                <div className="container mx-auto px-4 space-y-16 sm:space-y-20">
                    {services.map(({ key, title, routeName, description, image, features, technologies, noteLabel, noteText }, index) => {
                        const Icon = SERVICE_ICONS[key] ?? Globe;
                        const isReversed = index % 2 === 1;

                        return (
                            <div
                                key={key}
                                className="relative rounded-2xl border border-[#1a4445]/60 bg-gradient-to-br from-[#0a2e2f]/80 to-[#021B1C] overflow-hidden"
                            >
                                <div className={`relative z-10 grid lg:grid-cols-2 gap-0`}>
                                    {/* Image side */}
                                    <div className={`relative min-h-[280px] sm:min-h-[340px] lg:min-h-[460px] ${isReversed ? 'lg:order-2' : ''}`}>
                                        {image && (
                                            <img
                                                src={image}
                                                alt={title}
                                                className="absolute inset-0 w-full h-full object-cover"
                                                loading="lazy"
                                            />
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-t from-[#021B1C] via-[#021B1C]/40 to-transparent lg:bg-none" />
                                        <div className={`absolute inset-0 hidden lg:block ${isReversed ? 'bg-gradient-to-l' : 'bg-gradient-to-r'} from-[#021B1C]/90 via-[#021B1C]/50 to-transparent`} />
                                        {/* Number badge */}
                                        <div className="absolute top-4 left-4 sm:top-6 sm:left-6 w-10 h-10 rounded-xl bg-brand-500/80 backdrop-blur-sm flex items-center justify-center text-white font-bold text-sm">
                                            0{index + 1}
                                        </div>
                                    </div>

                                    {/* Content side */}
                                    <div className={`flex flex-col justify-center p-6 sm:p-10 lg:p-14 ${isReversed ? 'lg:order-1' : ''}`}>
                                        <div className="flex items-center gap-3 mb-5">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 flex items-center justify-center flex-shrink-0">
                                                <Icon size={22} className="text-accent-400" />
                                            </div>
                                        </div>

                                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-text-primary mb-4 leading-tight">{title}</h2>
                                        <p className="text-text-secondary text-base sm:text-lg leading-relaxed mb-6">{description}</p>

                                        {/* Tech badges */}
                                        {technologies && technologies.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mb-6">
                                                {technologies.map((tech) => (
                                                    <span key={tech} className="px-3 py-1 rounded-full text-xs font-medium bg-accent-500/10 text-accent-300 border border-accent-500/20">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {/* Key features (first 3) */}
                                        <ul className="space-y-2 mb-6">
                                            {features.slice(0, 3).map((f) => (
                                                <li key={f} className="flex items-start gap-2.5 text-sm text-text-secondary">
                                                    <CheckCircle2 size={16} className="text-brand-400 mt-0.5 flex-shrink-0" />
                                                    <span>{f}</span>
                                                </li>
                                            ))}
                                        </ul>

                                        {noteText && (
                                            <p className="text-sm text-brand-300 mb-6">
                                                <span className="font-semibold">{noteLabel}: </span>{noteText}
                                            </p>
                                        )}

                                        <div className="flex flex-wrap gap-3">
                                            <Link href={route(routeName)} className="btn btn-primary inline-flex items-center gap-2 text-sm">
                                                Learn More <ArrowRight size={16} />
                                            </Link>
                                            <Link href={route('contact')} className="btn btn-secondary text-sm">
                                                Get a Quote
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 sm:py-20 bg-gradient-to-br from-[#0a2e2f] to-[#021B1C] border-t border-[#1a4445] text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">Ready to get started?</h2>
                    <p className="text-text-secondary text-lg mb-8 max-w-lg mx-auto">
                        Tell us about your project and we'll get back to you within 24 hours.
                    </p>
                    <Link href={route('contact')} className="btn btn-primary inline-flex items-center gap-2 text-base px-8 py-3">
                        Contact Us <ArrowRight size={18} />
                    </Link>
                </div>
            </section>
        </WebsiteLayout>
    );
}
