import { Head, Link } from '@inertiajs/react';
import ClientLayout from '@/Layouts/ClientLayout';
import Badge from '@/Components/UI/Badge';
import Pagination from '@/Components/UI/Pagination';
import { Plus } from 'lucide-react';
import useRealtimePageRefresh from '@/lib/useRealtimePageRefresh';

export default function ClientTicketsIndex({ tickets }) {
    useRealtimePageRefresh({ only: ['tickets'], intervalMs: 5000 });

    return (
        <ClientLayout title="My Tickets">
            <Head title="My Tickets" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-text-primary">Support Tickets</h2>
                    <p className="text-sm text-text-secondary">Track issues and communicate with the support team.</p>
                </div>
                <Link href={route('client.tickets.create')} className="btn btn-primary inline-flex items-center gap-1.5">
                    <Plus size={16} /> New Ticket
                </Link>
            </div>

            <div className="card">
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Subject</th>
                                <th>Status</th>
                                <th>Priority</th>
                                <th>Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tickets.data.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center text-text-secondary py-10">
                                        No tickets yet. Create your first support ticket.
                                    </td>
                                </tr>
                            )}
                            {tickets.data.map((ticket) => (
                                <tr key={ticket.id}>
                                    <td>
                                        <Link href={route('client.tickets.show', ticket.id)} className="font-medium text-text-primary hover:text-brand-500">
                                            {ticket.subject}
                                        </Link>
                                    </td>
                                    <td><Badge status={ticket.status} /></td>
                                    <td><Badge status={ticket.priority} /></td>
                                    <td className="text-text-secondary text-sm">{new Date(ticket.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-[#1a4445]">
                    <Pagination links={tickets} />
                </div>
            </div>
        </ClientLayout>
    );
}
