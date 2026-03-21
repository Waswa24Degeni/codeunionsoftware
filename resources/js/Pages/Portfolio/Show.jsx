import { Head, Link } from '@inertiajs/react';
import WebsiteLayout from '@/Layouts/WebsiteLayout';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';

export default function PortfolioShow({ project, related }) {
    return (
        <WebsiteLayout>
            <Head title={`${project.title} — Portfolio — CodeUnion`} />

            <div className="py-16 bg-[#021B1C]">
                <div className="container mx-auto px-4">
                    <Link href={route('portfolio.index')} className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent-400 mb-6">
                        <ArrowLeft size={14} /> Back to Portfolio
                    </Link>

                    <div className="max-w-4xl">
                        <span className="text-xs font-semibold text-accent-400 uppercase tracking-wide">{project.category}</span>
                        <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary mt-1 mb-3">{project.title}</h1>

                        {/* Links */}
                        <div className="flex gap-3 mb-6">
                            {project.live_url && (
                                <a href={project.live_url} target="_blank" rel="noopener noreferrer"
                                    className="btn btn-primary text-sm flex items-center gap-1.5">
                                    <ExternalLink size={14} /> Live Demo
                                </a>
                            )}
                            {project.github_url && (
                                <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                                    className="btn btn-secondary text-sm flex items-center gap-1.5">
                                    <Github size={14} /> Source Code
                                </a>
                            )}
                        </div>

                        {/* Hero Image */}
                        {project.thumbnail && (
                            <div className="w-full h-80 rounded-2xl border border-[#1a4445] bg-[#0a2e2f] mb-8 overflow-hidden flex items-center justify-center">
                                <img
                                    src={project.thumbnail}
                                    alt={project.title}
                                    className="w-full h-full object-contain p-4"
                                    onError={(e) => {
                                        e.currentTarget.src = `https://api.dicebear.com/8.x/initials/svg?seed=${project.title}`;
                                    }}
                                />
                            </div>
                        )}

                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Content */}
                            <div className="lg:col-span-2">
                                <div className="prose prose-lg max-w-none"
                                    dangerouslySetInnerHTML={{ __html: project.content }} />
                            </div>

                            {/* Sidebar */}
                            <aside className="space-y-5">
                                <div className="card p-5">
                                    <h3 className="font-semibold text-text-primary mb-3">Technologies</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies?.map((tech) => (
                                            <span key={tech.id} className="badge badge-blue">{tech.name}</span>
                                        ))}
                                    </div>
                                </div>

                                {project.client_name && (
                                    <div className="card p-5">
                                        <h3 className="font-semibold text-text-primary mb-1">Client</h3>
                                        <p className="text-sm text-text-secondary">{project.client_name}</p>
                                    </div>
                                )}

                                {project.completed_at && (
                                    <div className="card p-5">
                                        <h3 className="font-semibold text-text-primary mb-1">Completed</h3>
                                        <p className="text-sm text-text-secondary">
                                            {new Date(project.completed_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                                        </p>
                                    </div>
                                )}
                            </aside>
                        </div>
                    </div>
                </div>
            </div>

            {/* Related */}
            {related?.length > 0 && (
                <section className="py-12 bg-[#0a2e2f]">
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-bold text-text-primary mb-6">Related Projects</h2>
                        <div className="grid sm:grid-cols-3 gap-5">
                            {related.map((rp) => (
                                <Link key={rp.id} href={route('portfolio.show', rp.slug)} className="card p-4 hover:border-accent-500/50 transition-colors">
                                    {rp.thumbnail && (
                                        <div className="w-full h-36 rounded-lg border border-[#1a4445] bg-[#0a2e2f] mb-3 overflow-hidden flex items-center justify-center">
                                            <img
                                                src={rp.thumbnail}
                                                alt={rp.title}
                                                className="w-full h-full object-contain p-2"
                                                onError={(e) => {
                                                    e.currentTarget.src = `https://api.dicebear.com/8.x/initials/svg?seed=${rp.title}`;
                                                }}
                                            />
                                        </div>
                                    )}
                                    <h3 className="text-sm font-semibold text-text-primary">{rp.title}</h3>
                                    <p className="text-xs text-accent-400 mt-0.5">{rp.category}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </WebsiteLayout>
    );
}
