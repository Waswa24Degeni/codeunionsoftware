import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Badge from '@/Components/UI/Badge';
import Pagination from '@/Components/UI/Pagination';
import { Plus, Search, Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

export default function AdminBlogIndex({ posts, filters }) {
    const [search, setSearch] = useState(filters?.search ?? '');

    const applySearch = (e) => {
        e.preventDefault();
        router.get(route('admin.blog.index'), { search }, { preserveScroll: true, replace: true });
    };

    const handleDelete = (id) => {
        if (confirm('Delete this post?')) router.delete(route('admin.blog.destroy', id));
    };

    return (
        <AdminLayout title="Blog Posts">
            <Head title="Blog — Admin" />

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <form onSubmit={applySearch} className="flex gap-2">
                    <input value={search} onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search posts..." className="input w-64" />
                    <button type="submit" className="btn btn-secondary"><Search size={16} /></button>
                </form>
                <Link href={route('admin.blog.create')} className="btn btn-primary inline-flex items-center gap-1.5">
                    <Plus size={16} /> New Post
                </Link>
            </div>

            <div className="card">
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>Views</th>
                                <th>Published</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.data.map((post) => (
                                <tr key={post.id}>
                                    <td className="font-medium text-text-primary max-w-xs">
                                        <Link href={route('admin.blog.edit', post.id)} className="hover:text-brand-500 line-clamp-1">
                                            {post.title}
                                        </Link>
                                    </td>
                                    <td className="text-text-secondary">{post.category?.name ?? '—'}</td>
                                    <td><Badge status={post.status} /></td>
                                    <td className="text-text-secondary">{post.views_count}</td>
                                    <td className="text-text-secondary text-sm">
                                        {post.published_at ? new Date(post.published_at).toLocaleDateString() : '—'}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2 justify-end">
                                            <Link href={route('admin.blog.edit', post.id)}
                                                className="p-1.5 rounded hover:bg-[#0f3536] text-text-secondary">
                                                <Pencil size={15} />
                                            </Link>
                                            <button onClick={() => handleDelete(post.id)}
                                                className="p-1.5 rounded hover:bg-brand-500/10 text-text-secondary hover:text-brand-400">
                                                <Trash2 size={15} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-[#1a4445]">
                    <Pagination links={posts} />
                </div>
            </div>
        </AdminLayout>
    );
}
