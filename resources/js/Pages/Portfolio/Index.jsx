import { Head, Link, router } from '@inertiajs/react';
import WebsiteLayout from '@/Layouts/WebsiteLayout';
import { useState } from 'react';
import { ExternalLink } from 'lucide-react';

const CATEGORIES = ['All', 'Web App', 'Mobile', 'E-commerce', 'SaaS', 'API'];

export default function PortfolioIndex({ projects, activeCategory }) {
    const [category, setCategory] = useState(activeCategory ?? 'All');

    const filter = (cat) => {
        setCategory(cat);
        router.get(route('portfolio.index'), cat !== 'All' ? { category: cat } : {}, { replace: true, preserveScroll: true });
    };

    return (
        <WebsiteLayout>
            <Head title="Portfolio — CodeUnion" />

            <section className="py-20 bg-gradient-to-br from-[#021B1C] to-[#0c3d3f] text-center">
                <div className="container mx-auto px-4">
                    <p className="text-accent-400 text-sm uppercase tracking-widest font-semibold mb-4">• OUR WORK •</p>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-4">Portfolio</h1>
                    <p className="text-text-secondary max-w-xl mx-auto text-lg">
                        A showcase of projects we've built for clients around the world.
                    </p>
                </div>
            </section>

            <section className="py-16 bg-[#021B1C]">
                <div className="container mx-auto px-4">
                    {/* Category Filter */}
                    <div className="flex flex-wrap gap-2 justify-center mb-10">
                        {CATEGORIES.map((cat) => (
                            <button key={cat} onClick={() => filter(cat)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${category === cat ? 'bg-brand-500 text-white' : 'bg-[#0a2e2f] text-text-secondary border border-[#1a4445] hover:border-accent-500/50 hover:text-text-primary'}`}>
                                {cat}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    {projects.data.length === 0 ? (
                        <p className="text-text-secondary text-center py-12">No projects found.</p>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {projects.data.map((project) => (
                                <div key={project.id} className="card overflow-hidden group">
                                    <div className="relative overflow-hidden">
                                        {project.thumbnail ? (
                                            <div className="w-full h-52 bg-[#0a2e2f] flex items-center justify-center overflow-hidden">
                                                <img
                                                    src={project.thumbnail}
                                                    alt={project.title}
                                                    className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                                                    onError={(e) => {
                                                        e.currentTarget.src = `https://api.dicebear.com/8.x/initials/svg?seed=${project.title}`;
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            <div className="w-full h-52 bg-gradient-to-br from-brand-500/20 to-accent-500/20 flex items-center justify-center">
                                                <span className="text-brand-500 font-bold text-2xl">{project.title[0]}</span>
                                            </div>
                                        )}
                                        {project.is_featured && (
                                            <span className="absolute top-3 left-3 badge badge-yellow">Featured</span>
                                        )}
                                    </div>
                                    <div className="p-5">
                                        <span className="text-xs font-semibold text-accent-400 uppercase tracking-wide">{project.category}</span>
                                        <h2 className="text-lg font-semibold text-text-primary mt-1 mb-2">{project.title}</h2>
                                        <p className="text-sm text-text-secondary line-clamp-2 mb-3">{project.excerpt}</p>
                                        {project.technologies?.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mb-4">
                                                {project.technologies.slice(0, 4).map((tech) => (
                                                    <span key={tech.id} className="badge badge-gray text-xs">{tech.name}</span>
                                                ))}
                                            </div>
                                        )}
                                        <Link href={route('portfolio.show', project.slug)}
                                            className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-500 hover:text-brand-400">
                                            View Project <ExternalLink size={13} />
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {projects.links && (
                        <div className="flex gap-1 mt-8 justify-center">
                            {projects.links.map((link, i) => (
                                link.url ? (
                                    <Link key={i} href={link.url}
                                        className={`px-3 py-1.5 text-sm rounded-md ${link.active ? 'bg-brand-500 text-white' : 'text-text-secondary hover:bg-[#0f3536]'}`}
                                        dangerouslySetInnerHTML={{ __html: link.label }} />
                                ) : (
                                    <span key={i} className="px-3 py-1.5 text-sm text-text-secondary/40"
                                        dangerouslySetInnerHTML={{ __html: link.label }} />
                                )
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </WebsiteLayout>
    );
}
