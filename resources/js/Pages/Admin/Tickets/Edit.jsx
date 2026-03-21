import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Button from '@/Components/UI/Button';
import InputField from '@/Components/UI/InputField';

export default function AdminTicketsEdit({ ticket, agents }) {
    const { data, setData, patch, processing, errors } = useForm({
        status: ticket.status ?? 'open',
        priority: ticket.priority ?? 'medium',
        category: ticket.category ?? '',
        internal_note: '',
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('admin.tickets.update', ticket.id));
    };

    return (
        <AdminLayout title="Edit Ticket">
            <Head title="Edit Ticket — Admin" />

            <form onSubmit={submit} className="max-w-3xl space-y-6">
                <div className="card p-6 space-y-4">
                    <div className="rounded-xl bg-[#0a2e2f] p-4">
                        <p className="text-sm font-medium text-text-primary">{ticket.subject}</p>
                        <p className="text-sm text-text-secondary mt-1 whitespace-pre-line">{ticket.message}</p>
                    </div>
                    <div className="grid sm:grid-cols-3 gap-4">
                        <div>
                            <label className="label">Status</label>
                            <select value={data.status} onChange={(e) => setData('status', e.target.value)} className="input">
                                <option value="open">Open</option>
                                <option value="in_progress">In Progress</option>
                                <option value="waiting">Waiting</option>
                                <option value="resolved">Resolved</option>
                                <option value="closed">Closed</option>
                            </select>
                        </div>
                        <div>
                            <label className="label">Priority</label>
                            <select value={data.priority} onChange={(e) => setData('priority', e.target.value)} className="input">
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                                <option value="urgent">Urgent</option>
                            </select>
                        </div>
                        <InputField label="Category" value={data.category}
                            onChange={(e) => setData('category', e.target.value)} error={errors.category} />
                    </div>
                    <div>
                        <label className="label">Internal Note</label>
                        <textarea rows={5} value={data.internal_note}
                            onChange={(e) => setData('internal_note', e.target.value)} className="input resize-none" />
                        {errors.internal_note && <p className="mt-1 text-xs text-red-500">{errors.internal_note}</p>}
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button type="submit" loading={processing}>Save Changes</Button>
                    <a href={route('admin.tickets.index')} className="btn btn-secondary">Cancel</a>
                </div>
            </form>
        </AdminLayout>
    );
}
