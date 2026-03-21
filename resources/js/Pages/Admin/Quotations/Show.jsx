import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Badge from '@/Components/UI/Badge';
import Button from '@/Components/UI/Button';

export default function AdminQuotationsShow({ quotation }) {
    const sendForm = useForm({});
    const approveForm = useForm({});

    return (
        <AdminLayout title={quotation.reference_number}>
            <Head title="Quotation Details — Admin" />

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="card p-6">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-text-primary">{quotation.reference_number}</h2>
                                <p className="text-sm text-text-secondary mt-1">{quotation.client?.company_name}</p>
                            </div>
                            <Badge status={quotation.status} />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4 text-sm mb-6">
                            <div>
                                <p className="text-text-secondary mb-1">Title</p>
                                <p className="text-text-secondary">{quotation.title}</p>
                            </div>
                            <div>
                                <p className="text-text-secondary mb-1">Valid Until</p>
                                <p className="text-text-secondary">{quotation.valid_until ? new Date(quotation.valid_until).toLocaleDateString() : '—'}</p>
                            </div>
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
                                            <td className="px-4 py-3 text-text-primary font-medium">${Number(item.subtotal).toLocaleString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="space-y-5">
                    <div className="card p-5">
                        <h3 className="font-semibold text-text-primary mb-4">Summary</h3>
                        <div className="space-y-3 text-sm">
                            <div className="flex justify-between"><span className="text-text-secondary">Subtotal</span><span className="font-medium">${Number(quotation.subtotal ?? quotation.total ?? 0).toLocaleString()}</span></div>
                            <div className="flex justify-between"><span className="text-text-secondary">Tax Rate</span><span className="font-medium">{Number(quotation.tax_rate ?? 0).toLocaleString()}%</span></div>
                            <div className="flex justify-between text-base pt-3 border-t border-[#1a4445]"><span className="font-semibold">Total</span><span className="font-bold text-text-primary">${Number(quotation.total ?? 0).toLocaleString()}</span></div>
                        </div>
                    </div>

                    <div className="grid gap-3">
                        <Link href={route('admin.quotations.edit', quotation.id)} className="btn btn-secondary text-center">Edit Quote</Link>
                        <Button onClick={() => sendForm.post(route('admin.quotations.send', quotation.id))} loading={sendForm.processing}>Send to Client</Button>
                        <Button variant="primary" onClick={() => approveForm.post(route('admin.quotations.approve', quotation.id))} loading={approveForm.processing}>Mark Approved</Button>
                        <a href={route('admin.quotations.pdf', quotation.id)} className="btn btn-ghost text-center">Download PDF</a>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
