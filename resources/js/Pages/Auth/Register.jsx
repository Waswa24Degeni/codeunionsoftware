import { Head, useForm, Link } from '@inertiajs/react';
import AuthLayout from '@/Layouts/AuthLayout';
import InputField from '@/Components/UI/InputField';
import Button from '@/Components/UI/Button';

export default function Register() {
    const { data, setData, post, processing, errors } = useForm({
        name:                  '',
        email:                 '',
        password:              '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('register.store'));
    };

    return (
        <AuthLayout title="Create an account">
            <Head title="Register" />

            <form onSubmit={submit} className="space-y-5">
                <InputField
                    label="Full Name"
                    name="name"
                    value={data.name}
                    onChange={e => setData('name', e.target.value)}
                    error={errors.name}
                    placeholder="John Doe"
                    required autoFocus
                />

                <InputField
                    label="Email"
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={e => setData('email', e.target.value)}
                    error={errors.email}
                    placeholder="you@example.com"
                    required
                />

                <InputField
                    label="Password"
                    name="password"
                    type="password"
                    value={data.password}
                    onChange={e => setData('password', e.target.value)}
                    error={errors.password}
                    placeholder="8+ characters"
                    required
                />

                <InputField
                    label="Confirm Password"
                    name="password_confirmation"
                    type="password"
                    value={data.password_confirmation}
                    onChange={e => setData('password_confirmation', e.target.value)}
                    error={errors.password_confirmation}
                    placeholder="Repeat password"
                    required
                />

                <Button type="submit" loading={processing} className="w-full justify-center">
                    Create Account
                </Button>

                <p className="text-center text-sm text-text-secondary">
                    Already have an account?{' '}
                    <Link href={route('login')} className="text-brand-500 hover:underline font-medium">
                        Log In
                    </Link>
                </p>
            </form>
        </AuthLayout>
    );
}
