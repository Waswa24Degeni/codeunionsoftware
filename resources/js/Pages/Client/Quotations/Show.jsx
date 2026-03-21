import { Head, useForm } from '@inertiajs/react';
import ClientLayout from '@/Layouts/ClientLayout';
import Button from '@/Components/UI/Button';
import Badge from '@/Components/UI/Badge';
import useRealtimePageRefresh from '@/lib/useRealtimePageRefresh';

export default function ClientQuotationsShow({ quotation }) {
    const acceptForm = useForm({});
    const declineForm = useForm({});

    useRealtimePageRefresh({
        only: ['quotation'],
        intervalMs: 5000,
        enabled: !acceptForm.processing && !declineForm.processing,
    });

    return (
        <ClientLayout title={quotation.reference_number}>
            <Head title="Quotation Details" />

            <div className="max-w-4xl space-y-6">
                <div className="card p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-text-primary">{quotation.reference_number}</h2>
                            <p className="text-sm text-text-secondary mt-1">{quotation.title}</p>
                        </div>
                        <Badge status={quotation.status} />
                    </div>

                    {quotation.description && (
                        <div className="rounded-xl bg-[#0a2e2f] p-4 text-sm text-text-secondary mb-6 whitespace-pre-line">
                            {quotation.description}
                        </div>
                    )}

                    <div className="overflow-x-auto rounded-xl border border-[#1a4445]">
                        <table className="w-full text-sm">
                            <thead className="bg-[#0a2e2f] text-left text-text-secondary">
                                <tr>
                                    <th className="px-4 py-3">Item</th>
                                    <th className="px-4 py-3">Qty</th>
                                    <th className="px-4 py-3">Unit Price</th>
                                    <th className="px-4 py-3">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {(quotation.items ?? []).map((item) => (
                                    <tr key={item.id} className="border-t border-[#1a4445]">
                                        <td className="px-4 py-3 text-text-secondary">{item.description}</td>
                                        <td className="px-4 py-3 text-text-secondary">{item.qty}</td>
                                        <td className="px-4 py-3 text-text-secondary">${Number(item.unit_price).toLocaleString()}</td>
                                        <td className="px-4 py-3 font-medium text-text-primary">${Number(item.subtotal).toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card p-6">
                    <div className="flex flex-wrap items-center justify-between gap-4">
                        <div>
                            <p className="text-sm text-text-secondary">Total</p>
                            <p className="text-3xl font-bold text-text-primary">${Number(quotation.total ?? 0).toLocaleString()}</p>
                        </div>
                        {quotation.status === 'sent' || quotation.status === 'pending' ? (
                            <div className="flex gap-3">
                                <Button onClick={() => acceptForm.post(route('client.quotations.accept', quotation.id))} loading={acceptForm.processing}>Accept</Button>
                                <Button variant="secondary" onClick={() => declineForm.post(route('client.quotations.decline', quotation.id))} loading={declineForm.processing}>Decline</Button>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </ClientLayout>
    );
}
