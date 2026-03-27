import { Head, Link, usePage } from '@inertiajs/react';
import WebsiteLayout from '@/Layouts/WebsiteLayout';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export default function ServiceDetailPage({ service }) {
    const { siteSettings = {} } = usePage().props;
    const siteName = siteSettings.site_name || 'CodeUnion Software';
    const {
        title,
        headline,
        image,
        image2,
        description,
        longDescription,
        features = [],
        process = [],
        technologies = [],
        noteLabel,
        noteText,
        cta,
    } = service;

    return (
        <WebsiteLayout>
            <Head title={`${title} - ${siteName}`} />

            {/* Hero with background image */}
            <section className="relative py-28 sm:py-36 lg:py-44 overflow-hidden">
                {/* Background image */}
                {image && (
                    <img
                        src={image}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                )}
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#021B1C]/80 via-[#021B1C]/70 to-[#021B1C]" />
                <div className="container relative z-10 mx-auto px-4 text-center">
                    <p className="text-accent-400 text-sm uppercase tracking-widest font-semibold mb-4">Service</p>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-text-primary mb-5 leading-tight">
                        {headline || title}
                    </h1>
                    <p className="text-lg sm:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">{description}</p>
                    <div className="mt-8 flex flex-wrap justify-center gap-3">
                        <Link href={route('contact')} className="btn btn-primary inline-flex items-center gap-2 px-7 py-3">
                            {cta || 'Request This Service'} <ArrowRight size={18} />
                        </Link>
                        <Link href={route('services')} className="btn btn-secondary px-7 py-3">
                            All Services
                        </Link>
                    </div>
                </div>
            </section>

            {/* About this service — image + description */}
            {(longDescription || image || image2) && (
                <section className="py-14 sm:py-20 bg-[#021B1C]">
                    <div className="container mx-auto px-4 max-w-6xl">
                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
                            {(image2 || image) && (
                                <div className="rounded-2xl overflow-hidden border border-[#1a4445]/40">
                                    <img
                                        src={image2 || image}
                                        alt={title}
                                        className="w-full h-64 sm:h-80 lg:h-96 object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            )}
                            {longDescription && (
                                <div>
                                    <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-5">About This Service</h2>
                                    <p className="text-text-secondary text-base sm:text-lg leading-relaxed">{longDescription}</p>
                                    {noteLabel && noteText && (
                                        <div className="mt-6 rounded-xl border border-brand-500/30 bg-brand-500/5 p-5">
                                            <p className="text-sm text-brand-100">
                                                <span className="font-bold text-brand-300">{noteLabel}: </span>
                                                {noteText}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </section>
            )}

            {/* Features */}
            <section className="py-14 sm:py-20 bg-[#0a2e2f]/40 border-y border-[#1a4445]/40">
                <div className="container mx-auto px-4 max-w-5xl">
                    <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-10 text-center flex items-center justify-center gap-3">
                        <CheckCircle2 size={28} className="text-brand-400" />
                        What We Deliver
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                        {features.map((feature, i) => (
                            <div key={i} className="flex items-start gap-4 rounded-xl border border-[#1a4445]/40 bg-[#021B1C]/60 p-5 backdrop-blur-sm">
                                <span className="mt-1 flex h-7 w-7 items-center justify-center rounded-lg bg-brand-500/15 text-brand-400 text-xs font-bold flex-shrink-0">
                                    {i + 1}
                                </span>
                                <span className="text-text-secondary text-sm sm:text-base leading-relaxed">{feature}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process */}
            {process.length > 0 && (
                <section className="py-14 sm:py-20 bg-[#021B1C]">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-10 text-center">Our Process</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                            {process.map((step, i) => (
                                <div key={i} className="text-center group">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500/20 to-accent-500/20 border border-brand-500/30 flex items-center justify-center mx-auto mb-3 text-brand-400 font-bold text-sm">
                                        {i + 1}
                                    </div>
                                    <p className="text-sm text-text-secondary font-medium">{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Technologies */}
            {technologies.length > 0 && (
                <section className="py-14 sm:py-20 bg-[#0a2e2f]/30 border-t border-[#1a4445]/40">
                    <div className="container mx-auto px-4 max-w-4xl text-center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-text-primary mb-8">Technologies We Use</h2>
                        <div className="flex flex-wrap justify-center gap-3">
                            {technologies.map((tech) => (
                                <span key={tech} className="px-5 py-2 rounded-full text-sm font-medium bg-accent-500/10 text-accent-300 border border-accent-500/20">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA */}
            <section className="py-16 sm:py-20 bg-gradient-to-br from-[#0a2e2f] to-[#021B1C] border-t border-[#1a4445] text-center">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl sm:text-4xl font-bold text-text-primary mb-4">Ready to Start?</h2>
                    <p className="text-text-secondary text-lg mb-8 max-w-lg mx-auto">
                        Let's discuss how we can help you achieve your goals.
                    </p>
                    <div className="flex flex-wrap justify-center gap-3">
                        <Link href={route('contact')} className="btn btn-primary inline-flex items-center gap-2 px-8 py-3">
                            {cta || 'Request This Service'} <ArrowRight size={18} />
                        </Link>
                        <Link href={route('services')} className="btn btn-secondary px-8 py-3">
                            Back to All Services
                        </Link>
                    </div>
                </div>
            </section>
        </WebsiteLayout>
    );
}
