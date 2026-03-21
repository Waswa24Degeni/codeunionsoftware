import { Head, useForm, Link } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import InputField from '@/Components/UI/InputField';
import Button from '@/Components/UI/Button';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email:    '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login.attempt'));
    };

    return (
        <AuthLayout title="Welcome back">
            <Head title="Log In" />

            <form onSubmit={submit} className="space-y-5">
                <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                    error={errors.email}
                    placeholder="you@example.com"
                    required
                    autoFocus
                />

                <InputField
                    label="Password"
                    name="password"
                    type="password"
                    value={data.password}
                    onChange={e => setData('password', e.target.value)}
                    error={errors.password}
                    placeholder="••••••••"
                    required
                />

                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-text-secondary">
                        <input
                            type="checkbox"
                            checked={data.remember}
                            onChange={e => setData('remember', e.target.checked)}
                            className="rounded border-gray-300"
                        />
                        Remember me
                    </label>
                    <Link href={route('password.request')} className="text-sm text-brand-500 hover:underline">
                        Forgot password?
                    </Link>
                </div>

                <Button type="submit" loading={processing} className="w-full justify-center">
                    Log In
                </Button>

                <p className="text-center text-sm text-text-secondary">
                    Don't have an account?{' '}
                    <Link href={route('register')} className="text-brand-500 hover:underline font-medium">
                        Register
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}
