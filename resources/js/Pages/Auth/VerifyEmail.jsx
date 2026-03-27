import { Head, useForm, usePage } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import Button from '@/Components/UI/Button';
import LogoutButton from '@/Components/UI/LogoutButton';
import { Mail } from 'lucide-react';

export default function VerifyEmail({ status }) {
    const { auth } = usePage().props;
    const { post: resend, processing: resending } = useForm({});

    return (
        <AuthLayout>
            <Head title="Verify Email" />

            <div className="text-center mb-6">
                <div className="mx-auto w-14 h-14 rounded-full bg-brand-50 flex items-center justify-center mb-4">
                    <Mail size={24} className="text-brand-500" />
                </div>
                <h1 className="text-2xl font-bold text-text-primary">Check your inbox</h1>
                <p className="mt-2 text-sm text-text-secondary max-w-sm mx-auto">
                    We've sent a verification link to <strong>{auth?.user?.email}</strong>. Click the link to activate your account.
                </p>
            </div>

            {status === 'verification-link-sent' && (
                <div className="mb-4 rounded-lg bg-accent-500/10 p-3 text-sm text-accent-300 text-center">
                    A new verification link has been sent to your email.
                </div>
            )}

            <div className="flex flex-col gap-3">
                <Button onClick={() => resend(route('verification.send'))} loading={resending} className="w-full">
                    Resend Verification Email
                </Button>
                <LogoutButton className="w-full btn ghost">
                    Log Out
                </LogoutButton>
            </div>
        </AuthLayout>
    );
}
