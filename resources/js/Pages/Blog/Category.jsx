import { Head, Link } from '@inertiajs/react';
import WebsiteLayout from '@/Layouts/WebsiteLayout';
import { Calendar } from 'lucide-react';

export default function BlogCategory({ category, posts }) {
    return (
        <WebsiteLayout>
            <Head title={`${category.name} — Blog — CodeUnion`} />

            <section className="py-16 bg-gradient-to-br from-[#021B1C] to-[#0c3d3f] text-center">
                <div className="container mx-auto px-4">
                    <p className="text-accent-400 text-sm uppercase tracking-widest mb-2">Category</p>
                    <h1 className="text-4xl font-extrabold text-text-primary">{category.name}</h1>
                    {category.description && <p className="mt-2 text-text-secondary max-w-lg mx-auto">{category.description}</p>}
                </div>
            </section>

            <section className="py-16 bg-[#021B1C]">
                <div className="container mx-auto px-4 max-w-4xl">
                    {posts.data.length === 0 ? (
                        <p className="text-text-secondary text-center py-12">No posts in this category yet.</p>
                    ) : (
                        <div className="grid sm:grid-cols-2 gap-6">
                            {posts.data.map((post) => (
                                <article key={post.id} className="card overflow-hidden">
                                    {post.featured_image && (
                                        <img src={post.featured_image} alt={post.title} className="w-full h-44 object-cover" />
                                    )}
                                    <div className="p-5">
                                        <h2 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2">
                                            <Link href={route('blog.show', post.slug)} className="hover:text-brand-500">{post.title}</Link>
                                        </h2>
                                        <p className="text-sm text-text-secondary line-clamp-2 mb-3">{post.excerpt}</p>
                                        <div className="flex items-center gap-1.5 text-xs text-text-secondary">
                                            <Calendar size={12} />
                                            {new Date(post.published_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}

                    {/* Pagination */}
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
