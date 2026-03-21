import { Head, useForm } from '@inertiajs/react';
import ClientLayout from '@/Layouts/ClientLayout';
import InputField from '@/Components/UI/InputField';
import Button from '@/Components/UI/Button';

export default function ClientTicketsCreate() {
    const { data, setData, post, processing, errors } = useForm({
        subject: '',
        message: '',
        priority: 'medium',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('client.tickets.store'));
    };

    return (
        <ClientLayout title="New Ticket">
            <Head title="Create Ticket" />

            <form onSubmit={submit} className="max-w-3xl space-y-6">
                <div className="card p-6 space-y-4">
                    <InputField label="Subject" value={data.subject}
                        onChange={(e) => setData('subject', e.target.value)} error={errors.subject} />
                    <div>
                        <label className="label">Priority</label>
                        <select value={data.priority} onChange={(e) => setData('priority', e.target.value)} className="input">
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                            <option value="urgent">Urgent</option>
                        </select>
                    </div>
                    <div>
                        <label className="label">Message</label>
                        <textarea rows={7} value={data.message} onChange={(e) => setData('message', e.target.value)} className="input resize-none" />
                        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button type="submit" loading={processing}>Submit Ticket</Button>
                    <a href={route('client.tickets.index')} className="btn btn-secondary">Cancel</a>
                </div>
            </form>
        </ClientLayout>
    );
}
