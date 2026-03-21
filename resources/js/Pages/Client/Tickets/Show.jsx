import { Head, useForm } from '@inertiajs/react';
import ClientLayout from '@/Layouts/ClientLayout';
import Button from '@/Components/UI/Button';
import Badge from '@/Components/UI/Badge';
import useRealtimePageRefresh from '@/lib/useRealtimePageRefresh';

export default function ClientTicketsShow({ ticket }) {
    const form = useForm({ message: '' });
    const closeForm = useForm({});
    const reopenForm = useForm({});
    const updateForm = useForm({
        subject: ticket.subject ?? '',
        priority: ticket.priority ?? 'medium',
        category: ticket.category ?? '',
    });
    const firstReplyMessage = ticket?.replies?.[0]?.message ?? '';

    useRealtimePageRefresh({
        only: ['ticket'],
        intervalMs: 4000,
        enabled: !form.processing && !closeForm.processing && !reopenForm.processing && !updateForm.processing,
        pauseWhenTyping: true,
    });

    const submitReply = (e) => {
        e.preventDefault();
        form.post(route('client.tickets.reply', ticket.id), { onSuccess: () => form.reset('message') });
    };

    const submitUpdate = (e) => {
        e.preventDefault();
        updateForm.put(route('client.tickets.update', ticket.id));
    };

    return (
        <ClientLayout title={ticket.subject}>
            <Head title="Ticket Details" />

            <div className="max-w-4xl space-y-6">
                <div className="card p-6">
                    <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                        <div>
                            <h2 className="text-2xl font-bold text-text-primary">{ticket.subject}</h2>
                            <p className="text-sm text-text-secondary mt-1">Created {new Date(ticket.created_at).toLocaleDateString()}</p>
                        </div>
                        <div className="flex gap-2">
                            <Badge status={ticket.status} />
                            <Badge status={ticket.priority} />
                        </div>
                    </div>
                    <div className="rounded-xl bg-[#0a2e2f] p-4 text-sm text-text-secondary whitespace-pre-line">
                        {firstReplyMessage || 'No ticket details were provided.'}
                    </div>

                    <form onSubmit={submitUpdate} className="mt-5 grid md:grid-cols-3 gap-3">
                        <div className="md:col-span-3">
                            <label className="label">Subject</label>
                            <input
                                value={updateForm.data.subject}
                                onChange={(e) => updateForm.setData('subject', e.target.value)}
                                className="input"
                            />
                            {updateForm.errors.subject && <p className="mt-1 text-xs text-red-500">{updateForm.errors.subject}</p>}
                        </div>

                        <div>
                            <label className="label">Priority</label>
                            <select
                                value={updateForm.data.priority}
                                onChange={(e) => updateForm.setData('priority', e.target.value)}
                                className="input"
                            >
                                <option value="low">Low</option>
                                <option value="medium">Medium</option>
                                <option value="high">High</option>
                                <option value="urgent">Urgent</option>
                            </select>
                            {updateForm.errors.priority && <p className="mt-1 text-xs text-red-500">{updateForm.errors.priority}</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label className="label">Category</label>
                            <input
                                value={updateForm.data.category}
                                onChange={(e) => updateForm.setData('category', e.target.value)}
                                className="input"
                                placeholder="Support"
                            />
                            {updateForm.errors.category && <p className="mt-1 text-xs text-red-500">{updateForm.errors.category}</p>}
                        </div>

                        <div className="md:col-span-3 flex flex-wrap gap-3">
                            <Button type="submit" loading={updateForm.processing}>Update Ticket</Button>
                            {ticket.status === 'closed' && (
                                <Button
                                    type="button"
                                    variant="secondary"
                                    onClick={() => reopenForm.post(route('client.tickets.reopen', ticket.id))}
                                    loading={reopenForm.processing}
                                >
                                    Reopen Ticket
                                </Button>
                            )}
                        </div>
                    </form>
                </div>

                <div className="card p-6">
                    <h3 className="font-semibold text-text-primary mb-4">Conversation</h3>
                    <div className="space-y-4 mb-6">
                        {(ticket.replies ?? []).map((reply) => (
                            <div key={reply.id} className="rounded-xl bg-[#0a2e2f] p-4">
                                <div className="flex items-center justify-between mb-2 text-xs text-text-secondary">
                                    <span>{reply.user?.name}</span>
                                    <span>{new Date(reply.created_at).toLocaleString()}</span>
                                </div>
                                <p className="text-sm text-text-secondary whitespace-pre-line">{reply.message}</p>
                            </div>
                        ))}
                    </div>

                    {ticket.status !== 'closed' && (
                        <form onSubmit={submitReply} className="space-y-4">
                            <div>
                                <label className="label">Reply</label>
                                <textarea rows={5} value={form.data.message} onChange={(e) => form.setData('message', e.target.value)} className="input resize-none" />
                                {form.errors.message && <p className="mt-1 text-xs text-red-500">{form.errors.message}</p>}
                            </div>
                            <div className="flex gap-3">
                                <Button type="submit" loading={form.processing}>Send Reply</Button>
                                <Button type="button" variant="secondary" onClick={() => closeForm.post(route('client.tickets.close', ticket.id))} loading={closeForm.processing}>
                                    Close Ticket
                                </Button>
                            </div>
                        </form>
                    )}

                    {ticket.status === 'closed' && (
                        <p className="text-sm text-text-secondary">
                            This ticket is closed. Click "Reopen Ticket" above to continue the conversation.
                        </p>
                    )}
                </div>
            </div>
        </ClientLayout>
    );
}
