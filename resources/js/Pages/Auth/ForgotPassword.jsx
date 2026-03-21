import { Head, useForm } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import InputField from '@/Components/UI/InputField';
import Button from '@/Components/UI/Button';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({ email: '' });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <AuthLayout>
            <Head title="Forgot Password" />

            <div className="mb-6 text-center">
                <h1 className="text-2xl font-bold text-text-primary">Forgot password?</h1>
                <p className="mt-1 text-sm text-text-secondary">
                    Enter your email and we'll send you a reset link.
                </p>
            </div>

            {status && (
                <div className="mb-4 rounded-lg bg-accent-500/10 p-3 text-sm text-accent-300">
                    {status}
                </div>
            )}

            <form onSubmit={submit} className="space-y-4">
                <InputField
                    label="Email address"
                    id="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                    error={errors.email}
                    autoComplete="email"
                    autoFocus
                />

                <Button type="submit" loading={processing} className="w-full">
                    Send Reset Link
                </Button>
            </form>

            <p className="mt-6 text-center text-sm text-text-secondary">
                Remembered it?{' '}
                <a href={route('login')} className="font-medium text-brand-500 hover:underline">
                    Back to login
                </a>
            </p>
        </AuthLayout>
    );
}
