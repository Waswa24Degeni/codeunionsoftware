import { Head, Link } from '@inertiajs/react';
import WebsiteLayout from '@/Layouts/WebsiteLayout';
import { Calendar } from 'lucide-react';

export default function BlogTag({ tag, posts }) {
    return (
        <WebsiteLayout>
            <Head title={`#${tag.name} — Blog — CodeUnion`} />

            <section className="py-16 bg-gradient-to-br from-[#021B1C] to-[#0c3d3f] text-center">
                <div className="container mx-auto px-4">
                    <p className="text-accent-400 text-sm uppercase tracking-widest mb-2">Tag</p>
                    <h1 className="text-4xl font-extrabold text-text-primary">#{tag.name}</h1>
                </div>
            </section>

            <section className="py-16 bg-[#021B1C]">
                <div className="container mx-auto px-4 max-w-4xl">
                    {posts.data.length === 0 ? (
                        <p className="text-text-secondary text-center py-12">No posts with this tag yet.</p>
                    ) : (
                        <div className="grid sm:grid-cols-2 gap-6">
                            {posts.data.map((post) => (
                                <article key={post.id} className="card p-5">
                                    {post.category && (
                                        <span className="text-xs font-semibold text-accent-400 uppercase tracking-wide">
                                            {post.category.name}
                                        </span>
                                    )}
                                    <h2 className="text-lg font-semibold text-text-primary mt-1 mb-2 line-clamp-2">
                                        <Link href={route('blog.show', post.slug)} className="hover:text-brand-500">{post.title}</Link>
                                    </h2>
                                    <p className="text-sm text-text-secondary line-clamp-2 mb-3">{post.excerpt}</p>
                                    <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                                        <Calendar size={12} />
                                        {new Date(post.published_at).toLocaleDateString()}
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                    {posts.links && (
                        <div className="flex gap-1 mt-8 justify-center">
                            {posts.links.map((link, i) => (
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
