import { Head, useForm } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import InputField from '@/Components/UI/InputField';
import Button from '@/Components/UI/Button';

export default function ResetPassword({ token, email }) {
    const { data, setData, post, processing, errors } = useForm({
        token,
        email: email ?? '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.update'));
    };

    return (
        <AuthLayout>
            <Head title="Reset Password" />

            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-text-primary">Set new password</h1>
                <p className="mt-1 text-sm text-text-secondary">Choose a strong password for your account.</p>
            </div>

            <form onSubmit={submit} className="space-y-4">
                <InputField label="Email address" id="email" type="email" value={data.email}
                    onChange={(e) => setData('email', e.target.value)} error={errors.email} autoComplete="email" />

                <InputField label="New password" id="password" type="password" value={data.password}
                    onChange={(e) => setData('password', e.target.value)} error={errors.password} autoComplete="new-password" />

                <InputField label="Confirm new password" id="password_confirmation" type="password"
                    value={data.password_confirmation}
                    onChange={(e) => setData('password_confirmation', e.target.value)}
                    error={errors.password_confirmation} autoComplete="new-password" />

                <Button type="submit" loading={processing} className="w-full">
                    Reset Password
                </Button>
            </form>
        </AuthLayout>
    );
}
