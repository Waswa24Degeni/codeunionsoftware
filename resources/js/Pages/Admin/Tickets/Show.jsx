import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Button from '@/Components/UI/Button';
import Badge from '@/Components/UI/Badge';

export default function AdminTicketsShow({ ticket, agents }) {
    const replyForm = useForm({ message: '', is_internal: false });
    const assignForm = useForm({ assignee_id: ticket.assignee?.id ?? '' });

    const submitReply = (e) => {
        e.preventDefault();
        replyForm.post(route('admin.tickets.reply', ticket.id), { onSuccess: () => replyForm.reset('message') });
    };

    const assign = (e) => {
        e.preventDefault();
        assignForm.post(route('admin.tickets.assign', ticket.id));
    };

    return (
        <AdminLayout title={ticket.subject}>
            <Head title="Ticket Details — Admin" />

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="card p-6">
                        <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                            <div>
                                <h2 className="text-2xl font-bold text-text-primary">{ticket.subject}</h2>
                                <p className="text-sm text-text-secondary mt-1">From {ticket.client?.company_name}</p>
                            </div>
                            <div className="flex gap-2">
                                <Badge status={ticket.status} />
                                <Badge status={ticket.priority} />
                            </div>
                        </div>
                        <div className="rounded-xl bg-[#0a2e2f] p-4 text-sm text-text-secondary whitespace-pre-line">
                            {ticket.message}
                        </div>
                    </div>

                    <div className="card p-6">
                        <h3 className="font-semibold text-text-primary mb-4">Conversation</h3>
                        <div className="space-y-4 mb-6">
                            {(ticket.replies ?? []).map((reply) => (
                                <div key={reply.id} className={`rounded-xl p-4 ${reply.is_internal ? 'bg-yellow-50 dark:bg-yellow-900/10' : 'bg-[#0a2e2f]'}`}>
                                    <div className="flex items-center justify-between mb-2 text-xs text-text-secondary">
                                        <span>{reply.user?.name}</span>
                                        <span>{new Date(reply.created_at).toLocaleString()}</span>
                                    </div>
                                    <p className="text-sm text-text-secondary whitespace-pre-line">{reply.message}</p>
                                </div>
                            ))}
                        </div>

                        <form onSubmit={submitReply} className="space-y-4">
                            <div>
                                <label className="label">Reply</label>
                                <textarea rows={5} value={replyForm.data.message}
                                    onChange={(e) => replyForm.setData('message', e.target.value)} className="input resize-none" />
                                {replyForm.errors.message && <p className="mt-1 text-xs text-red-500">{replyForm.errors.message}</p>}
                            </div>
                            <label className="flex items-center gap-2 text-sm text-text-secondary">
                                <input type="checkbox" checked={replyForm.data.is_internal}
                                    onChange={(e) => replyForm.setData('is_internal', e.target.checked)} className="rounded border-gray-300" />
                                Internal note
                            </label>
                            <Button type="submit" loading={replyForm.processing}>Send Reply</Button>
                        </form>
                    </div>
                </div>

                <div className="space-y-5">
                    <div className="card p-5">
                        <h3 className="font-semibold text-text-primary mb-3">Assign Ticket</h3>
                        <form onSubmit={assign} className="space-y-4">
                            <select value={assignForm.data.assignee_id}
                                onChange={(e) => assignForm.setData('assignee_id', e.target.value)} className="input">
                                <option value="">Unassigned</option>
                                {(agents ?? []).map((agent) => (
                                    <option key={agent.id} value={agent.id}>{agent.name}</option>
                                ))}
                            </select>
                            <Button type="submit" loading={assignForm.processing} className="w-full">Update Assignee</Button>
                        </form>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
