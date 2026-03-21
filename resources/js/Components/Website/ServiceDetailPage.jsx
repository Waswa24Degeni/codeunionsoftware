import { Head, Link, usePage } from '@inertiajs/react';
import WebsiteLayout from '@/Layouts/WebsiteLayout';

export default function ServiceDetailPage({
    title,
    description,
    points,
    noteLabel,
    noteText,
}) {
    const { siteSettings = {} } = usePage().props;
    const siteName = siteSettings.site_name || 'CodeUnion Software';

    return (
        <WebsiteLayout>
            <Head title={`${title} - ${siteName}`} />

            <section className="py-20 bg-gradient-to-br from-[#021B1C] to-[#0c3d3f] text-center">
                <div className="container mx-auto px-4">
                    <p className="text-accent-400 text-sm uppercase tracking-widest font-semibold mb-4">Service</p>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-4">{title}</h1>
                    <p className="text-lg text-text-secondary max-w-3xl mx-auto">{description}</p>
                </div>
            </section>

            <section className="py-16 bg-[#021B1C]">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="card p-7 sm:p-8">
                        <h2 className="text-2xl font-bold text-text-primary mb-5">What We Deliver</h2>
                        <ul className="space-y-3">
                            {points.map((point) => (
                                <li key={point} className="flex items-start gap-3 text-text-secondary">
                                    <span className="mt-2 h-2 w-2 rounded-full bg-brand-500 flex-shrink-0" />
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>

                        {(noteLabel && noteText) && (
                            <div className="mt-7 rounded-xl border border-brand-500/50 bg-brand-500/10 p-4">
                                <p className="text-sm text-brand-100">
                                    <span className="font-semibold text-brand-300">{noteLabel}: </span>
                                    {noteText}
                                </p>
                            </div>
                        )}

                        <div className="mt-8 flex flex-wrap items-center gap-3">
                            <Link href={route('contact')} className="btn btn-primary">Request This Service</Link>
                            <Link href={route('services')} className="btn btn-secondary">Back to All Services</Link>
                        </div>
                    </div>
                </div>
            </section>
        </WebsiteLayout>
    );
}
