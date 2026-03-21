import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Badge from '@/Components/UI/Badge';
import Pagination from '@/Components/UI/Pagination';
import { Plus, Eye, Pencil, Trash2 } from 'lucide-react';

export default function AdminQuotationsIndex({ quotations }) {
    const destroy = (id) => {
        if (confirm('Delete this quotation?')) router.delete(route('admin.quotations.destroy', id));
    };

    return (
        <AdminLayout title="Quotations">
            <Head title="Quotations — Admin" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-text-primary">Manage quotations</h2>
                    <p className="text-sm text-text-secondary">Draft, send, and track client proposals.</p>
                </div>
                <Link href={route('admin.quotations.create')} className="btn btn-primary inline-flex items-center gap-1.5">
                    <Plus size={16} /> New Quotation
                </Link>
            </div>

            <div className="card">
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Reference</th>
                                <th>Client</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th>Created</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {quotations.data.map((quotation) => (
                                <tr key={quotation.id}>
                                    <td className="font-medium text-text-primary">{quotation.reference_number}</td>
                                    <td className="text-text-secondary">{quotation.client?.company_name}</td>
                                    <td><Badge status={quotation.status} /></td>
                                    <td className="text-text-secondary">${Number(quotation.total ?? 0).toLocaleString()}</td>
                                    <td className="text-text-secondary text-sm">{new Date(quotation.created_at).toLocaleDateString()}</td>
                                    <td>
                                        <div className="flex items-center gap-2 justify-end">
                                            <Link href={route('admin.quotations.show', quotation.id)} className="p-1.5 rounded hover:bg-[#0f3536] text-text-secondary"><Eye size={15} /></Link>
                                            <Link href={route('admin.quotations.edit', quotation.id)} className="p-1.5 rounded hover:bg-[#0f3536] text-text-secondary"><Pencil size={15} /></Link>
                                            <button onClick={() => destroy(quotation.id)} className="p-1.5 rounded hover:bg-red-50 text-text-secondary hover:text-brand-400"><Trash2 size={15} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-[#1a4445]">
                    <Pagination links={quotations} />
                </div>
            </div>
        </AdminLayout>
    );
}
