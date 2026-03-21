import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { Users, MessageSquare, FileCheck, TrendingUp } from 'lucide-react';
import { normalizeImageUrl } from '@/lib/normalizeImageUrl';

export default function Dashboard({ stats, recentTickets, recentClients }) {
    const statCards = [
        { label: 'Total Clients',    value: stats?.total_clients,    icon: Users,         color: 'bg-accent-500/20 text-accent-400' },
        { label: 'Open Tickets',     value: stats?.open_tickets,     icon: MessageSquare, color: 'bg-brand-500/20 text-brand-400' },
        { label: 'Pending Quotes',   value: stats?.pending_quotes,   icon: FileCheck,     color: 'bg-accent-500/20 text-accent-400' },
        { label: 'Revenue (Accepted)', value: `$${(stats?.accepted_revenue ?? 0).toLocaleString()}`, icon: TrendingUp, color: 'bg-brand-500/20 text-brand-400' },
    ];

    return (
        <AdminLayout title="Dashboard">
            <Head title="Dashboard" />

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
                {statCards.map(({ label, value, icon: Icon, color }) => (
                    <div key={label} className="card p-5 flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                            <Icon size={22} />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-text-primary">{value ?? '—'}</p>
                            <p className="text-sm text-text-secondary">{label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Tickets */}
                <div className="card">
                    <div className="flex items-center justify-between p-5 border-b border-[#1a4445]">
                        <h2 className="font-semibold text-text-primary">Recent Tickets</h2>
                        <Link href={route('admin.tickets.index')} className="text-sm text-accent-400 hover:underline">
                            View all
                        </Link>
                    </div>
                    <div className="divide-y divide-[#1a4445]">
                        {(recentTickets ?? []).slice(0, 5).map((ticket) => (
                            <Link key={ticket.id} href={route('admin.tickets.show', ticket.id)}
                                className="flex items-center justify-between px-5 py-3.5 hover:bg-[#0f3536] transition-colors"
                            >
                                <div>
                                    <p className="text-sm font-medium text-text-primary line-clamp-1">{ticket.subject}</p>
                                    <p className="text-xs text-text-secondary">{ticket.client?.company_name}</p>
                                </div>
                                <span className={`badge badge-${ticket.priority === 'urgent' ? 'red' : 'gray'}`}>
                                    {ticket.priority}
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Recent Clients */}
                <div className="card">
                    <div className="flex items-center justify-between p-5 border-b border-[#1a4445]">
                        <h2 className="font-semibold text-text-primary">Recent Clients</h2>
                        <Link href={route('admin.clients.index')} className="text-sm text-accent-400 hover:underline">
                            View all
                        </Link>
                    </div>
                    <div className="divide-y divide-[#1a4445]">
                        {(recentClients ?? []).slice(0, 5).map((client) => (
                            <Link key={client.id} href={route('admin.clients.show', client.id)}
                                className="flex items-center gap-3 px-5 py-3.5 hover:bg-[#0f3536] transition-colors"
                            >
                                <img
                                    src={normalizeImageUrl(client.avatar_url)}
                                    alt={client.company_name}
                                    className="w-8 h-8 rounded-full"
                                    onError={(e) => {
                                        e.currentTarget.onerror = null;
                                        e.currentTarget.src = '/images/default-avatar.svg';
                                    }}
                                />
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-text-primary truncate">{client.company_name}</p>
                                    <p className="text-xs text-text-secondary truncate">{client.email}</p>
                                </div>
                                <span className="badge badge-green capitalize">{client.status}</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
