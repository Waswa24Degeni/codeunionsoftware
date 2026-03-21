import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import InputField from '@/Components/UI/InputField';
import Button from '@/Components/UI/Button';

export default function AdminClientsCreate() {
    const { data, setData, post, processing, errors } = useForm({
        company_name: '',
        contact_name: '',
        email: '',
        phone: '',
        website: '',
        address: '',
        status: 'active',
        notes: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.clients.store'));
    };

    return (
        <AdminLayout title="New Client">
            <Head title="New Client — Admin" />

            <form onSubmit={submit} className="max-w-3xl space-y-6">
                <div className="card p-6 space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <InputField label="Company Name" value={data.company_name}
                            onChange={(e) => setData('company_name', e.target.value)} error={errors.company_name} />
                        <InputField label="Contact Name" value={data.contact_name}
                            onChange={(e) => setData('contact_name', e.target.value)} error={errors.contact_name} />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InputField label="Email" type="email" value={data.email}
                            onChange={(e) => setData('email', e.target.value)} error={errors.email} />
                        <InputField label="Phone" value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)} error={errors.phone} />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                        <InputField label="Website" value={data.website}
                            onChange={(e) => setData('website', e.target.value)} error={errors.website} />
                        <div>
                            <label className="label">Status</label>
                            <select value={data.status} onChange={(e) => setData('status', e.target.value)} className="input">
                                <option value="active">Active</option>
                                <option value="inactive">Inactive</option>
                                <option value="lead">Lead</option>
                            </select>
                        </div>
                    </div>

                    <InputField label="Address" value={data.address}
                        onChange={(e) => setData('address', e.target.value)} error={errors.address} />

                    <div>
                        <label className="label">Notes</label>
                        <textarea rows={5} value={data.notes} onChange={(e) => setData('notes', e.target.value)} className="input resize-none" />
                    </div>
                </div>

                <div className="flex gap-3">
                    <Button type="submit" loading={processing}>Create Client</Button>
                    <a href={route('admin.clients.index')} className="btn btn-secondary">Cancel</a>
                </div>
            </form>
        </AdminLayout>
    );
}
