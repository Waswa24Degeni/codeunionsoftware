import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Badge from '@/Components/UI/Badge';
import Pagination from '@/Components/UI/Pagination';
import { Plus, Pencil, Trash2 } from 'lucide-react';

export default function AdminPortfolioIndex({ projects }) {
    const destroy = (id) => {
        if (confirm('Delete this project?')) router.delete(route('admin.portfolio.destroy', id));
    };

    return (
        <AdminLayout title="Portfolio Projects">
            <Head title="Portfolio — Admin" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-text-primary">Manage portfolio projects</h2>
                    <p className="text-sm text-text-secondary">Create, update, and feature your recent work.</p>
                </div>
                <Link href={route('admin.portfolio.create')} className="btn btn-primary inline-flex items-center gap-1.5">
                    <Plus size={16} /> New Project
                </Link>
            </div>

            <div className="card">
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Project</th>
                                <th>Category</th>
                                <th>Status</th>
                                <th>Featured</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {projects.data.map((project) => (
                                <tr key={project.id}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg border border-[#1a4445] bg-[#0a2e2f] overflow-hidden flex items-center justify-center">
                                                <img
                                                    src={project.thumbnail || `https://api.dicebear.com/8.x/initials/svg?seed=${project.title}`}
                                                    alt={project.title}
                                                    className="w-full h-full object-contain p-1"
                                                    onError={(e) => {
                                                        e.currentTarget.src = `https://api.dicebear.com/8.x/initials/svg?seed=${project.title}`;
                                                    }}
                                                />
                                            </div>
                                            <div>
                                                <p className="font-medium text-text-primary">{project.title}</p>
                                                <p className="text-xs text-text-secondary">/{project.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="text-text-secondary">{project.category}</td>
                                    <td><Badge status={project.status} /></td>
                                    <td>{project.is_featured ? <Badge color="yellow">Featured</Badge> : '—'}</td>
                                    <td>
                                        <div className="flex items-center gap-2 justify-end">
                                            <Link href={route('admin.portfolio.edit', project.id)}
                                                className="p-1.5 rounded hover:bg-[#0f3536] text-text-secondary">
                                                <Pencil size={15} />
                                            </Link>
                                            <button onClick={() => destroy(project.id)}
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
                    <Pagination links={projects} />
                </div>
            </div>
        </AdminLayout>
    );
}
