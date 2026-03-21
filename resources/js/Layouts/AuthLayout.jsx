import { Head } from '@inertiajs/react';

export default function AuthLayout({ children, title }) {
    return (
        <>
            <Head title={title} />
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#021B1C] to-[#0a2e2f] p-4 sm:p-6">
                <div className="w-full max-w-md">
                    {/* Logo */}
                    <div className="flex justify-center mb-8">
                        <img
                            src="/images/logo.png"
                            alt="CodeUnion Software"
                            className="h-16 sm:h-20 w-auto object-contain"
                        />
                    </div>

                    <div className="card p-6 sm:p-8">
                        {title && (
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
                                {title}
                            </h1>
                        )}
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
