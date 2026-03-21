import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function Analytics({ analyticsData }) {
    const cards = [
        { label: 'Revenue Points', value: analyticsData?.revenue?.length ?? 0 },
        { label: 'Ticket Trend Points', value: analyticsData?.tickets?.length ?? 0 },
        { label: 'Client Growth Points', value: analyticsData?.clients?.length ?? 0 },
    ];

    return (
        <AdminLayout title="Analytics">
            <Head title="Analytics — Admin" />

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
                {cards.map((card) => (
                    <div key={card.label} className="card p-5">
                        <p className="text-sm text-text-secondary mb-1">{card.label}</p>
                        <p className="text-2xl font-bold text-text-primary">{card.value}</p>
                    </div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <div className="card p-6">
                    <h2 className="text-lg font-semibold text-text-primary mb-4">Revenue Trend</h2>
                    <div className="space-y-3">
                        {(analyticsData?.revenue ?? []).map((item, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                                <span className="text-text-secondary">{new Date(item.month).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                                <span className="font-medium text-text-primary">${Number(item.revenue ?? 0).toLocaleString()}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card p-6">
                    <h2 className="text-lg font-semibold text-text-primary mb-4">Ticket Trend</h2>
                    <div className="space-y-3">
                        {(analyticsData?.tickets ?? []).map((item, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                                <span className="text-text-secondary">{new Date(item.week).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                                <span className="font-medium text-text-primary">{item.count}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card p-6 lg:col-span-2">
                    <h2 className="text-lg font-semibold text-text-primary mb-4">Client Growth</h2>
                    <div className="space-y-3">
                        {(analyticsData?.clients ?? []).map((item, index) => (
                            <div key={index} className="flex items-center justify-between text-sm">
                                <span className="text-text-secondary">{new Date(item.month).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
                                <span className="font-medium text-text-primary">{item.count}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
