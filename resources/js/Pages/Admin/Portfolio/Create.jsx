import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import InputField from '@/Components/UI/InputField';
import Button from '@/Components/UI/Button';

const categories = ['Web App', 'Mobile', 'E-commerce', 'SaaS', 'API'];
const THUMBNAIL_FALLBACK = 'https://api.dicebear.com/8.x/initials/svg?seed=project-logo';

export default function AdminPortfolioCreate({ technologies }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category: 'Web App',
        client_name: '',
        live_url: '',
        github_url: '',
        thumbnail: '',
        technologies: [],
        is_featured: false,
        status: 'draft',
        completed_at: '',
    });

    const autoSlug = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

    const toggleTechnology = (id) => {
        setData('technologies', data.technologies.includes(id)
            ? data.technologies.filter((tech) => tech !== id)
            : [...data.technologies, id]);
    };

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.portfolio.store'));
    };

    return (
        <AdminLayout title="New Project">
            <Head title="New Project — Admin" />

            <form onSubmit={submit}>
                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-5">
                        <div className="card p-6 space-y-4">
                            <InputField label="Title" value={data.title}
                                onChange={(e) => setData({ ...data, title: e.target.value, slug: autoSlug(e.target.value) })}
                                error={errors.title} />
                            <InputField label="Slug" value={data.slug} onChange={(e) => setData('slug', e.target.value)} error={errors.slug} />
                            <InputField label="Excerpt" value={data.excerpt} onChange={(e) => setData('excerpt', e.target.value)} error={errors.excerpt} />
                            <div>
                                <label className="label">Content</label>
                                <textarea rows={14} value={data.content} onChange={(e) => setData('content', e.target.value)}
                                    className={`input resize-y font-mono text-sm ${errors.content ? 'border-red-400' : ''}`} />
                                {errors.content && <p className="mt-1 text-xs text-red-500">{errors.content}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-5">
                        <div className="card p-5 space-y-4">
                            <div>
                                <label className="label">Category</label>
                                <select value={data.category} onChange={(e) => setData('category', e.target.value)} className="input">
                                    {categories.map((category) => <option key={category} value={category}>{category}</option>)}
                                </select>
                            </div>
                            <InputField label="Client Name" value={data.client_name}
                                onChange={(e) => setData('client_name', e.target.value)} error={errors.client_name} />
                            <InputField label="Live URL" value={data.live_url}
                                onChange={(e) => setData('live_url', e.target.value)} error={errors.live_url} />
                            <InputField label="GitHub URL" value={data.github_url}
                                onChange={(e) => setData('github_url', e.target.value)} error={errors.github_url} />
                            <InputField label="Thumbnail / Logo URL" value={data.thumbnail}
                                placeholder="Paste image URL (https://...)"
                                onChange={(e) => setData('thumbnail', e.target.value)} error={errors.thumbnail} />
                            <p className="text-xs text-text-secondary -mt-2">
                                Paste the project image/logo link. This will be shown on project cards.
                            </p>

                            <div>
                                <label className="label">Thumbnail Preview</label>
                                <div className="w-full h-32 rounded-lg border border-[#1a4445] bg-[#0a2e2f] flex items-center justify-center overflow-hidden">
                                    {data.thumbnail ? (
                                        <img
                                            src={data.thumbnail}
                                            alt="Thumbnail preview"
                                            className="w-full h-full object-contain p-2"
                                            onError={(e) => {
                                                e.currentTarget.src = THUMBNAIL_FALLBACK;
                                            }}
                                        />
                                    ) : (
                                        <span className="text-xs text-text-secondary">No thumbnail yet</span>
                                    )}
                                </div>
                            </div>

                            <InputField label="Completed At" type="date" value={data.completed_at}
                                onChange={(e) => setData('completed_at', e.target.value)} error={errors.completed_at} />
                            <div>
                                <label className="label">Status</label>
                                <select value={data.status} onChange={(e) => setData('status', e.target.value)} className="input">
                                    <option value="draft">Draft</option>
                                    <option value="published">Published</option>
                                </select>
                            </div>
                            <label className="flex items-center gap-2 text-sm text-text-secondary">
                                <input type="checkbox" checked={data.is_featured}
                                    onChange={(e) => setData('is_featured', e.target.checked)} className="rounded border-gray-300" />
                                Feature this project
                            </label>
                        </div>

                        <div className="card p-5">
                            <label className="label mb-2">Technologies</label>
                            <div className="flex flex-wrap gap-2">
                                {(technologies ?? []).map((tech) => (
                                    <button key={tech.id} type="button" onClick={() => toggleTechnology(tech.id)}
                                        className={`badge cursor-pointer ${data.technologies.includes(tech.id) ? 'badge-blue' : 'badge-gray'}`}>
                                        {tech.name}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button type="submit" loading={processing} className="flex-1">Create Project</Button>
                            <a href={route('admin.portfolio.index')} className="btn btn-secondary flex-1 text-center">Cancel</a>
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
