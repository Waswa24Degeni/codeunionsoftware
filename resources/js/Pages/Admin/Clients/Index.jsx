import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Badge from '@/Components/UI/Badge';
import Pagination from '@/Components/UI/Pagination';
import { Plus, Pencil, Eye, Trash2 } from 'lucide-react';
import { normalizeImageUrl } from '@/lib/normalizeImageUrl';

export default function AdminClientsIndex({ clients }) {
    const destroy = (id) => {
        if (confirm('Delete this client?')) router.delete(route('admin.clients.destroy', id));
    };

    return (
        <AdminLayout title="Clients">
            <Head title="Clients — Admin" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-text-primary">Manage clients</h2>
                    <p className="text-sm text-text-secondary">Keep client accounts and contact records organized.</p>
                </div>
                <Link href={route('admin.clients.create')} className="btn btn-primary inline-flex items-center gap-1.5">
                    <Plus size={16} /> New Client
                </Link>
            </div>

            <div className="card">
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Client</th>
                                <th>Contact</th>
                                <th>Status</th>
                                <th>Tickets</th>
                                <th>Quotations</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.data.map((client) => (
                                <tr key={client.id}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={normalizeImageUrl(client.avatar_url)}
                                                alt={client.company_name}
                                                className="w-10 h-10 rounded-full bg-gray-100 object-cover"
                                                onError={(e) => {
                                                    e.currentTarget.onerror = null;
                                                    e.currentTarget.src = '/images/default-avatar.svg';
                                                }}
                                            />
                                            <div>
                                                <p className="font-medium text-text-primary">{client.company_name}</p>
                                                <p className="text-xs text-text-secondary">{client.website || 'No website'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p className="text-sm text-text-secondary">{client.email}</p>
                                        <p className="text-xs text-text-secondary">{client.phone || 'No phone'}</p>
                                    </td>
                                    <td><Badge status={client.status} /></td>
                                    <td className="text-text-secondary">{client.tickets_count ?? 0}</td>
                                    <td className="text-text-secondary">{client.quotations_count ?? 0}</td>
                                    <td>
                                        <div className="flex items-center gap-2 justify-end">
                                            <Link href={route('admin.clients.show', client.id)} className="p-1.5 rounded hover:bg-[#0f3536] text-text-secondary">
                                                <Eye size={15} />
                                            </Link>
                                            <Link href={route('admin.clients.edit', client.id)} className="p-1.5 rounded hover:bg-[#0f3536] text-text-secondary">
                                                <Pencil size={15} />
                                            </Link>
                                            <button onClick={() => destroy(client.id)} className="p-1.5 rounded hover:bg-red-50 text-text-secondary hover:text-brand-400">
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
                    <Pagination links={clients} />
                </div>
            </div>
        </AdminLayout>
    );
}
