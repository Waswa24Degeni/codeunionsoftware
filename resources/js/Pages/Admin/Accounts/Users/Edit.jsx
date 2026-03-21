import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import InputField from '@/Components/UI/InputField';
import Button from '@/Components/UI/Button';

export default function AdminUsersEdit({ user, roles }) {
    const { data, setData, put, processing, errors } = useForm({
        name: user.name ?? '',
        email: user.email ?? '',
        password: '',
        password_confirmation: '',
        role: user.roles?.[0]?.name ?? roles?.[0] ?? '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('admin.accounts.users.update', user.id));
    };

    return (
        <AdminLayout title="Edit User">
            <Head title="Edit User — Admin" />

            <form onSubmit={submit} className="max-w-3xl space-y-6">
                <div className="card p-6 space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                        <InputField label="Name" value={data.name}
                            onChange={(e) => setData('name', e.target.value)} error={errors.name} />
                        <InputField label="Email" type="email" value={data.email}
                            onChange={(e) => setData('email', e.target.value)} error={errors.email} />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <InputField label="New Password" type="password" value={data.password}
                            onChange={(e) => setData('password', e.target.value)} error={errors.password} />
                        <InputField label="Confirm New Password" type="password" value={data.password_confirmation}
                            onChange={(e) => setData('password_confirmation', e.target.value)} error={errors.password_confirmation} />
                    </div>
                    <div>
                        <label className="label">Role</label>
                        <select value={data.role} onChange={(e) => setData('role', e.target.value)} className="input">
                            {(roles ?? []).map((role) => (
                                <option key={role} value={role}>{role}</option>
                            ))}
                        </select>
                        {errors.role && <p className="mt-1 text-xs text-red-500">{errors.role}</p>}
                    </div>
                </div>
                <div className="flex gap-3">
                    <Button type="submit" loading={processing}>Save Changes</Button>
                    <a href={route('admin.accounts.users.show', user.id)} className="btn btn-secondary">Cancel</a>
                </div>
            </form>
        </AdminLayout>
    );
}
