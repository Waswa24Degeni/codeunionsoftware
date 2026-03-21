import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Badge from '@/Components/UI/Badge';
import Pagination from '@/Components/UI/Pagination';
import { Eye, Pencil, Trash2 } from 'lucide-react';

export default function AdminTicketsIndex({ tickets }) {
    const destroy = (id) => {
        if (confirm('Delete this ticket?')) router.delete(route('admin.tickets.destroy', id));
    };

    return (
        <AdminLayout title="Support Tickets">
            <Head title="Tickets — Admin" />

            <div className="card">
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Client</th>
                                <th>Status</th>
                                <th>Priority</th>
                                <th>Assigned To</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.data.map((ticket) => (
                                <tr key={ticket.id}>
                                    <td className="font-medium text-text-primary">{ticket.subject}</td>
                                    <td className="text-text-secondary">{ticket.client?.company_name}</td>
                                    <td><Badge status={ticket.status} /></td>
                                    <td><Badge status={ticket.priority} /></td>
                                    <td className="text-text-secondary">{ticket.assignee?.name ?? 'Unassigned'}</td>
                                    <td>
                                        <div className="flex items-center gap-2 justify-end">
                                            <Link href={route('admin.tickets.show', ticket.id)} className="p-1.5 rounded hover:bg-[#0f3536] text-text-secondary"><Eye size={15} /></Link>
                                            <Link href={route('admin.tickets.edit', ticket.id)} className="p-1.5 rounded hover:bg-[#0f3536] text-text-secondary"><Pencil size={15} /></Link>
                                            <button onClick={() => destroy(ticket.id)} className="p-1.5 rounded hover:bg-red-50 text-text-secondary hover:text-brand-400"><Trash2 size={15} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-[#1a4445]">
                    <Pagination links={tickets} />
                </div>
            </div>
        </AdminLayout>
    );
}
