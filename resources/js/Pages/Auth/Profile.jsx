import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import InputField from '@/Components/UI/InputField';
import Button from '@/Components/UI/Button';

export default function Profile({ user }) {
    const form = useForm({
        name: user?.name ?? '',
        email: user?.email ?? '',
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        form.patch(route('profile.update'), {
            onSuccess: () => form.reset('current_password', 'password', 'password_confirmation'),
        });
    };

    return (
        <AdminLayout title="My Profile">
            <Head title="Profile" />

            <div className="max-w-2xl space-y-6">
                <div className="card p-6">
                    <h2 className="text-lg font-semibold text-text-primary mb-5">Profile Information</h2>

                    <form onSubmit={submit} className="space-y-4">
                        <InputField label="Name" id="name" value={form.data.name}
                            onChange={(e) => form.setData('name', e.target.value)} error={form.errors.name} />
                        <InputField label="Email" id="email" type="email" value={form.data.email}
                            onChange={(e) => form.setData('email', e.target.value)} error={form.errors.email} />
                        <InputField label="Current Password" id="current_password" type="password"
                            value={form.data.current_password}
                            onChange={(e) => form.setData('current_password', e.target.value)}
                            error={form.errors.current_password} />
                        <InputField label="New Password" id="password" type="password"
                            value={form.data.password}
                            onChange={(e) => form.setData('password', e.target.value)}
                            error={form.errors.password} />
                        <InputField label="Confirm New Password" id="password_confirmation" type="password"
                            value={form.data.password_confirmation}
                            onChange={(e) => form.setData('password_confirmation', e.target.value)}
                            error={form.errors.password_confirmation} />
                        <Button type="submit" loading={form.processing}>Save Changes</Button>
                    </form>
                </div>
            </div>
        </AdminLayout>
    );
}
