import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import InputField from '@/Components/UI/InputField';
import Button from '@/Components/UI/Button';

export default function AdminBlogCreate({ categories, tags }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category_id: '',
        tags: [],
        featured_image: '',
        status: 'published',
        published_at: '',
        meta_title: '',
        meta_description: '',
    });

    const autoSlug = (title) => title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const handleTitleChange = (e) => {
        const title = e.target.value;
        setData((prev) => ({ ...prev, title, slug: autoSlug(title) }));
    };

    const toggleTag = (id) => {
        setData('tags', data.tags.includes(id) ? data.tags.filter((t) => t !== id) : [...data.tags, id]);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.blog.store'));
    };

    return (
        <AdminLayout title="New Blog Post">
            <Head title="New Post — Admin" />

            <form onSubmit={submit}>
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main */}
                    <div className="lg:col-span-2 space-y-5">
                        <div className="card p-6 space-y-4">
                            <InputField label="Title" id="title" value={data.title} onChange={handleTitleChange} error={errors.title} />
                            <InputField label="Slug" id="slug" value={data.slug}
                                onChange={(e) => setData('slug', e.target.value)} error={errors.slug} />
                            <InputField label="Excerpt" id="excerpt" value={data.excerpt}
                                onChange={(e) => setData('excerpt', e.target.value)} error={errors.excerpt} />
                            <div>
                                <label className="label">Content</label>
                                <textarea id="content" rows={14} value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                    className={`input resize-y font-mono text-sm ${errors.content ? 'border-red-400' : ''}`}
                                    placeholder="Write your post content here (HTML supported)..." />
                                {errors.content && <p className="mt-1 text-xs text-red-500">{errors.content}</p>}
                            </div>
                        </div>

                        {/* SEO */}
                        <div className="card p-6 space-y-4">
                            <h3 className="font-semibold text-text-primary">SEO</h3>
                            <InputField label="Meta Title" id="meta_title" value={data.meta_title}
                                onChange={(e) => setData('meta_title', e.target.value)} error={errors.meta_title} />
                            <div>
                                <label className="label">Meta Description</label>
                                <textarea rows={3} value={data.meta_description}
                                    onChange={(e) => setData('meta_description', e.target.value)}
                                    className="input resize-none" />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-5">
                        <div className="card p-5 space-y-4">
                            <div>
                                <label className="label">Status</label>
                                <select value={data.status} onChange={(e) => setData('status', e.target.value)} className="input">
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </div>
                            <InputField label="Published At" id="published_at" type="datetime-local" value={data.published_at}
                                onChange={(e) => setData('published_at', e.target.value)} error={errors.published_at} />
                            <InputField label="Featured Image URL" id="featured_image" value={data.featured_image}
                                onChange={(e) => setData('featured_image', e.target.value)} error={errors.featured_image} />
                        </div>

                        <div className="card p-5">
                            <label className="label mb-2">Category</label>
                            <select value={data.category_id} onChange={(e) => setData('category_id', e.target.value)} className="input">
                                <option value="">No Category</option>
                                {(categories ?? []).map((cat) => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                            {errors.category_id && <p className="mt-1 text-xs text-red-500">{errors.category_id}</p>}
                        </div>

                        <div className="card p-5">
                            <label className="label mb-2">Tags</label>
                            <div className="flex flex-wrap gap-2">
                                {(tags ?? []).map((tag) => (
                                    <button key={tag.id} type="button" onClick={() => toggleTag(tag.id)}
                                        className={`badge cursor-pointer ${data.tags.includes(tag.id) ? 'badge-blue' : 'badge-gray'}`}>
                                        {tag.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button type="submit" loading={processing} className="flex-1">
                                {data.status === 'draft' ? 'Save Draft' : 'Publish'}
                            </Button>
                            <a href={route('admin.blog.index')} className="btn btn-secondary flex-1 text-center">Cancel</a>
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
