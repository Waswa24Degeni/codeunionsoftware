import { Head, Link } from '@inertiajs/react';
import ClientLayout from '@/Layouts/ClientLayout';
import Badge from '@/Components/UI/Badge';
import Pagination from '@/Components/UI/Pagination';
import useRealtimePageRefresh from '@/lib/useRealtimePageRefresh';

export default function ClientQuotationsIndex({ quotations }) {
    useRealtimePageRefresh({ only: ['quotations'], intervalMs: 5000 });

    return (
        <ClientLayout title="My Quotations">
            <Head title="My Quotations" />

            <div className="card">
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Reference</th>
                                <th>Status</th>
                                <th>Total</th>
                                <th>Valid Until</th>
                            </tr>
                        </thead>
                        <tbody>
                            {quotations.data.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="text-center text-text-secondary py-10">
                                        No quotations available yet.
                                    </td>
                                </tr>
                            )}
                            {quotations.data.map((quotation) => (
                                <tr key={quotation.id}>
                                    <td>
                                        <Link href={route('client.quotations.show', quotation.id)} className="font-medium text-text-primary hover:text-brand-500">
                                            {quotation.reference_number}
                                        </Link>
                                    </td>
                                    <td><Badge status={quotation.status} /></td>
                                    <td className="text-text-secondary">${Number(quotation.total ?? 0).toLocaleString()}</td>
                                    <td className="text-text-secondary text-sm">{quotation.valid_until ? new Date(quotation.valid_until).toLocaleDateString() : '—'}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-[#1a4445]">
                    <Pagination links={quotations} />
                </div>
            </div>
        </ClientLayout>
    );
}
