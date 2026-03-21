import { Head, Link } from '@inertiajs/react';
import ClientLayout from '@/Layouts/ClientLayout';
import { MessageSquare, FileText, Clock } from 'lucide-react';
import useRealtimePageRefresh from '@/lib/useRealtimePageRefresh';

export default function ClientDashboard({ client }) {
    useRealtimePageRefresh({ only: ['client'], intervalMs: 5000 });

    const tickets = client?.tickets ?? [];
    const quotations = client?.quotations ?? [];
    const cards = [
        { label: 'Open Tickets', value: tickets.filter((ticket) => ticket.status !== 'closed').length, icon: MessageSquare, color: 'bg-yellow-50 text-yellow-600' },
        { label: 'Pending Quotes', value: quotations.filter((quotation) => ['draft', 'sent', 'pending'].includes(quotation.status)).length, icon: FileText, color: 'bg-blue-50 text-blue-600' },
        { label: 'Accepted Quotes', value: quotations.filter((quotation) => quotation.status === 'accepted').length, icon: Clock, color: 'bg-green-50 text-green-600' },
    ];

    return (
        <ClientLayout title="Dashboard">
            <Head title="Client Dashboard" />

            <div className="grid md:grid-cols-3 gap-5 mb-8">
                {cards.map(({ label, value, icon: Icon, color }) => (
                    <div key={label} className="card p-5 flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}><Icon size={22} /></div>
                        <div>
                            <p className="text-2xl font-bold text-text-primary">{value}</p>
                            <p className="text-sm text-text-secondary">{label}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="card">
                    <div className="flex items-center justify-between p-5 border-b border-[#1a4445]">
                        <h2 className="font-semibold text-text-primary">Recent Tickets</h2>
                        <Link href={route('client.tickets.index')} className="text-sm text-brand-500 hover:underline">View all</Link>
                    </div>
                    <div className="divide-y divide-[#1a4445]">
                        {tickets.length === 0 && (
                            <p className="px-5 py-4 text-sm text-text-secondary">No tickets yet.</p>
                        )}
                        {tickets.slice(0, 5).map((ticket) => (
                            <Link key={ticket.id} href={route('client.tickets.show', ticket.id)} className="block px-5 py-3.5 hover:bg-[#0f3536]">
                                <p className="text-sm font-medium text-text-primary line-clamp-1">{ticket.subject}</p>
                                <p className="text-xs text-text-secondary mt-1">{ticket.status}</p>
                            </Link>
                        ))}
                    </div>
                </div>

                <div className="card">
                    <div className="flex items-center justify-between p-5 border-b border-[#1a4445]">
                        <h2 className="font-semibold text-text-primary">Recent Quotations</h2>
                        <Link href={route('client.quotations.index')} className="text-sm text-brand-500 hover:underline">View all</Link>
                    </div>
                    <div className="divide-y divide-[#1a4445]">
                        {quotations.length === 0 && (
                            <p className="px-5 py-4 text-sm text-text-secondary">No quotations available yet.</p>
                        )}
                        {quotations.slice(0, 5).map((quotation) => (
                            <Link key={quotation.id} href={route('client.quotations.show', quotation.id)} className="block px-5 py-3.5 hover:bg-[#0f3536]">
                                <p className="text-sm font-medium text-text-primary">{quotation.reference_number}</p>
                                <p className="text-xs text-text-secondary mt-1">{quotation.status}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
}
