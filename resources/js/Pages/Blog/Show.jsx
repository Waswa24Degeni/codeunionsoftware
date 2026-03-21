import { Head, Link } from '@inertiajs/react';
import WebsiteLayout from '@/Layouts/WebsiteLayout';
import { Calendar, Clock, Eye, ArrowLeft } from 'lucide-react';
import { resolveFeaturedImageUrl } from '@/lib/featuredImage';
import { normalizeImageUrl } from '@/lib/normalizeImageUrl';

export default function BlogShow({ post, relatedPosts }) {
    const imageUrl = resolveFeaturedImageUrl(post.featured_image);
    const content = post.content ?? '';
    const hasHtmlMarkup = /<\/?[a-z][\s\S]*>/i.test(content);

    return (
        <WebsiteLayout>
            <Head title={`${post.title} — CodeUnion`} />

            <article className="py-16 bg-[#021B1C]">
                <div className="container mx-auto px-4 max-w-3xl">
                    <Link href={route('blog.index')} className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-accent-400 mb-6">
                        <ArrowLeft size={14} /> Back to Blog
                    </Link>

                    {/* Meta */}
                    {post.category && (
                        <Link href={route('blog.category', post.category.slug)}
                            className="text-xs font-semibold text-accent-400 uppercase tracking-wide">
                            {post.category.name}
                        </Link>
                    )}

                    <h1 className="text-3xl md:text-4xl font-extrabold text-text-primary mt-2 mb-4">
                        {post.title}
                    </h1>

                    <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary mb-6">
                        <span className="flex items-center gap-1.5">
                            <Calendar size={14} />
                            {new Date(post.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </span>
                        <span className="flex items-center gap-1.5"><Clock size={14} /> {post.reading_time} min read</span>
                        <span className="flex items-center gap-1.5"><Eye size={14} /> {post.views_count} views</span>
                        {post.author && (
                            <span className="flex items-center gap-1.5">
                                <img
                                    src={normalizeImageUrl(post.author.avatar_url)}
                                    alt={post.author.name}
                                    className="w-5 h-5 rounded-full"
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = '/images/default-avatar.svg';
                                    }}
                                />
                                {post.author.name}
                            </span>
                        )}
                    </div>

                    {imageUrl && (
                        <img src={imageUrl} alt={post.title}
                            className="w-full h-72 object-cover rounded-2xl mb-8"
                            onError={(e) => { e.currentTarget.style.display = 'none'; }} />
                    )}

                    {/* Content */}
                    {hasHtmlMarkup ? (
                        <div
                            className="prose prose-lg dark:prose-invert max-w-none break-words"
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    ) : (
                        <div className="prose prose-lg dark:prose-invert max-w-none break-words whitespace-pre-line text-left">
                            {content}
                        </div>
                    )}

                    {/* Tags */}
                    {post.tags?.length > 0 && (
                        <div className="mt-8 pt-6 border-t border-[#1a4445]">
                            <p className="text-sm font-medium text-text-secondary mb-2">Tags:</p>
                            <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag) => (
                                    <Link key={tag.id} href={route('blog.tag', tag.slug)} className="badge badge-gray hover:bg-[#0f3536]">
                                        {tag.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </article>

            {/* Related Posts */}
            {relatedPosts?.length > 0 && (
                <section className="py-12 bg-[#0a2e2f]">
                    <div className="container mx-auto px-4 max-w-3xl">
                        <h2 className="text-2xl font-bold text-text-primary mb-6">Related Articles</h2>
                        <div className="grid sm:grid-cols-3 gap-5">
                            {relatedPosts.map((rp) => (
                                <Link key={rp.id} href={route('blog.show', rp.slug)} className="card p-4 hover:border-accent-500/50 transition-colors">
                                    <h3 className="text-sm font-semibold text-text-primary line-clamp-2 mb-1">{rp.title}</h3>
                                    <p className="text-xs text-text-secondary">{new Date(rp.published_at).toLocaleDateString()}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </WebsiteLayout>
    );
}
