import { Head, Link, router } from '@inertiajs/react';
import WebsiteLayout from '@/Layouts/WebsiteLayout';
import { Search, Calendar } from 'lucide-react';
import { useState } from 'react';
import { resolveFeaturedImageUrl } from '@/lib/featuredImage';

export default function BlogIndex({ posts, categories, tags, filters }) {
    const [search, setSearch] = useState(filters?.search ?? '');

    const applySearch = (e) => {
        e.preventDefault();
        router.get(route('blog.index'), { search }, { preserveScroll: true, replace: true });
    };

    return (
        <WebsiteLayout>
            <Head title="Blog — CodeUnion" />

            {/* Header */}
            <section className="py-16 bg-gradient-to-br from-[#021B1C] to-[#0c3d3f] text-center">
                <div className="container mx-auto px-4">
                    <p className="text-accent-400 text-sm uppercase tracking-widest font-semibold mb-3">• INSIGHTS •</p>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-3">Blog</h1>
                    <p className="text-text-secondary max-w-xl mx-auto">Insights, tutorials, and updates from the CodeUnion team.</p>

                    <form onSubmit={applySearch} className="mt-6 flex gap-2 max-w-md mx-auto">
                        <input value={search} onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search articles..." className="input flex-1 bg-[#0a2e2f]/50 border-[#1a4445] text-text-primary placeholder-text-secondary/60" />
                        <button type="submit" className="btn btn-primary">
                            <Search size={16} />
                        </button>
                    </form>
                </div>
            </section>

            <section className="py-16 bg-[#021B1C]">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-10">
                        {/* Posts */}
                        <div className="flex-1">
                            {posts.data.length === 0 ? (
                                <p className="text-text-secondary text-center py-12">No posts found.</p>
                            ) : (
                                <div className="grid sm:grid-cols-2 gap-6">
                                    {posts.data.map((post) => {
                                        const imageUrl = resolveFeaturedImageUrl(post.featured_image);

                                        return (
                                        <article key={post.id} className="card overflow-hidden flex flex-col">
                                            {imageUrl && (
                                                <img src={imageUrl} alt={post.title}
                                                    className="w-full h-48 object-cover"
                                                    onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                                            )}
                                            <div className="p-5 flex flex-col flex-1">
                                                {post.category && (
                                                    <Link href={route('blog.category', post.category.slug)}
                                                        className="text-xs font-semibold text-accent-400 uppercase tracking-wide mb-1">
                                                        {post.category.name}
                                                    </Link>
                                                )}
                                                <h2 className="text-lg font-semibold text-text-primary mb-2 line-clamp-2">
                                                    <Link href={route('blog.show', post.slug)} className="hover:text-brand-500">
                                                        {post.title}
                                                    </Link>
                                                </h2>
                                                <p className="text-sm text-text-secondary line-clamp-3 flex-1">{post.excerpt}</p>
                                                <div className="flex items-center gap-2 mt-4 text-xs text-text-secondary">
                                                    <Calendar size={12} />
                                                    {new Date(post.published_at).toLocaleDateString()}
                                                    <span>·</span>
                                                    <span>{post.reading_time} min read</span>
                                                </div>
                                            </div>
                                        </article>
                                        );
                                    })}
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

                        {/* Sidebar */}
                        <aside className="lg:w-64 space-y-6">
                            <div className="card p-5">
                                <h3 className="font-semibold text-text-primary mb-3">Categories</h3>
                                <ul className="space-y-2">
                                    {(categories ?? []).map((cat) => (
                                        <li key={cat.id}>
                                            <Link href={route('blog.category', cat.slug)}
                                                className={`flex justify-between text-sm ${filters?.category === cat.slug ? 'text-brand-500 font-semibold' : 'text-text-secondary hover:text-brand-500'}`}>
                                                {cat.name}
                                                <span className="text-text-secondary/50">{cat.posts_count}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="card p-5">
                                <h3 className="font-semibold text-text-primary mb-3">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {(tags ?? []).map((tag) => (
                                        <Link key={tag.id} href={route('blog.tag', tag.slug)}
                                            className="badge badge-gray hover:bg-[#0f3536] cursor-pointer">
                                            {tag.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </section>
        </WebsiteLayout>
    );
}
