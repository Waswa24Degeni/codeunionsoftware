import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Badge from '@/Components/UI/Badge';
import { normalizeImageUrl } from '@/lib/normalizeImageUrl';

export default function AdminClientsShow({ client }) {
    return (
        <AdminLayout title={client.company_name}>
            <Head title={`${client.company_name} — Client`} />

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="card p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <img
                                src={normalizeImageUrl(client.avatar_url)}
                                alt={client.company_name}
                                className="w-16 h-16 rounded-full"
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = '/images/default-avatar.svg';
                                }}
                            />
                            <div>
                                <h2 className="text-2xl font-bold text-text-primary">{client.company_name}</h2>
                                <p className="text-text-secondary">{client.email}</p>
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-text-secondary mb-1">Phone</p>
                                <p className="text-text-secondary">{client.phone || '—'}</p>
                            </div>
                            <div>
                                <p className="text-text-secondary mb-1">Website</p>
                                <p className="text-text-secondary">{client.website || '—'}</p>
                            </div>
                            <div>
                                <p className="text-text-secondary mb-1">Address</p>
                                <p className="text-text-secondary">{client.address || '—'}</p>
                            </div>
                            <div>
                                <p className="text-text-secondary mb-1">Status</p>
                                <Badge status={client.status} />
                            </div>
                        </div>
                        {client.notes && (
                            <div className="mt-5 pt-5 border-t border-[#1a4445]">
                                <p className="text-text-secondary text-sm mb-1">Notes</p>
                                <p className="text-text-secondary whitespace-pre-line">{client.notes}</p>
                            </div>
                        )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="card p-5">
                            <h3 className="font-semibold text-text-primary mb-4">Recent Tickets</h3>
                            <div className="space-y-3">
                                {(client.tickets ?? []).slice(0, 5).map((ticket) => (
                                    <Link key={ticket.id} href={route('admin.tickets.show', ticket.id)}
                                        className="block rounded-lg border border-[#1a4445] p-3 hover:border-brand-200">
                                        <p className="font-medium text-sm text-text-primary line-clamp-1">{ticket.subject}</p>
                                        <p className="text-xs text-text-secondary mt-1">{ticket.status}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                        <div className="card p-5">
                            <h3 className="font-semibold text-text-primary mb-4">Recent Quotations</h3>
                            <div className="space-y-3">
                                {(client.quotations ?? []).slice(0, 5).map((quotation) => (
                                    <Link key={quotation.id} href={route('admin.quotations.show', quotation.id)}
                                        className="block rounded-lg border border-[#1a4445] p-3 hover:border-brand-200">
                                        <p className="font-medium text-sm text-text-primary">{quotation.reference_number}</p>
                                        <p className="text-xs text-text-secondary mt-1">{quotation.status}</p>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-5">
                    <div className="card p-5">
                        <h3 className="font-semibold text-text-primary mb-3">Quick Stats</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between"><span className="text-text-secondary">Tickets</span><span className="font-medium">{client.tickets_count ?? client.tickets?.length ?? 0}</span></div>
                            <div className="flex justify-between"><span className="text-text-secondary">Quotations</span><span className="font-medium">{client.quotations_count ?? client.quotations?.length ?? 0}</span></div>
                            <div className="flex justify-between"><span className="text-text-secondary">Created</span><span className="font-medium">{new Date(client.created_at).toLocaleDateString()}</span></div>
                        </div>
                    </div>

                    <Link href={route('admin.clients.edit', client.id)} className="btn btn-primary w-full text-center">
                        Edit Client
                    </Link>
                </div>
            </div>
        </AdminLayout>
    );
}
