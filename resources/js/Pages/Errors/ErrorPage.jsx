import { Head, Link } from '@inertiajs/react';
import { Home, ArrowLeft, RefreshCw, ShieldAlert, ServerCrash, Search } from 'lucide-react';

const ERRORS = {
    404: {
        icon: Search,
        title: 'Page Not Found',
        message: "The page you're looking for doesn't exist or has been moved.",
        color: 'accent',
    },
    403: {
        icon: ShieldAlert,
        title: 'Access Forbidden',
        message: "You don't have permission to access this page.",
        color: 'brand',
    },
    500: {
        icon: ServerCrash,
        title: 'Server Error',
        message: 'Something went wrong on our end. We\'re working on fixing it.',
        color: 'brand',
    },
    503: {
        icon: ServerCrash,
        title: 'Service Unavailable',
        message: 'The server is temporarily unavailable. Please try again shortly.',
        color: 'brand',
    },
    419: {
        icon: RefreshCw,
        title: 'Page Expired',
        message: 'Your session has expired. Please refresh and try again.',
        color: 'accent',
    },
};

export default function ErrorPage({ status }) {
    const code = status ?? 404;
    const config = ERRORS[code] ?? {
        icon: ServerCrash,
        title: 'Unexpected Error',
        message: 'Something went wrong. Please try again.',
        color: 'brand',
    };

    const { icon: ErrorIcon, title, message, color } = config;
    const isOrange = color === 'brand';

    const iconBg = isOrange
        ? 'bg-brand-500/10 border-brand-500/20'
        : 'bg-accent-500/10 border-accent-500/20';
    const iconColor = isOrange ? 'text-brand-400' : 'text-accent-400';
    const codeColor = isOrange ? 'text-brand-500' : 'text-accent-500';
    const blobColor1 = isOrange ? 'bg-brand-500/8' : 'bg-accent-500/8';
    const blobColor2 = isOrange ? 'bg-brand-500/5' : 'bg-accent-500/5';

    return (
        <>
            <Head title={`${code} — ${title}`} />

            <div className="min-h-screen bg-[#021B1C] flex flex-col items-center justify-center px-4 relative overflow-hidden">
                {/* Background blobs */}
                <div className={`pointer-events-none absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full blur-3xl ${blobColor1}`} />
                <div className={`pointer-events-none absolute bottom-0 -left-32 w-[380px] h-[380px] rounded-full blur-3xl ${blobColor2}`} />

                {/* Dot grid */}
                <svg className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="dots" x="0" y="0" width="32" height="32" patternUnits="userSpaceOnUse">
                            <circle cx="1.5" cy="1.5" r="1.5" fill="white" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#dots)" />
                </svg>

                <div className="relative z-10 text-center max-w-lg">
                    {/* Logo */}
                    <div className="flex justify-center mb-10">
                        <Link href={route('home')}>
                            <img src="/images/logo.png" alt="CodeUnion Software" className="h-10 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity" />
                        </Link>
                    </div>

                    {/* Error code */}
                    <p className={`text-8xl sm:text-9xl font-extrabold leading-none mb-6 tabular-nums ${codeColor}`} aria-hidden="true">
                        {code}
                    </p>

                    {/* Icon + heading */}
                    <div className="flex justify-center mb-5">
                        <div className={`w-16 h-16 rounded-2xl border flex items-center justify-center ${iconBg}`}>
                            <ErrorIcon size={28} className={iconColor} />
                        </div>
                    </div>

                    <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3">{title}</h1>
                    <p className="text-text-secondary text-base leading-relaxed mb-10">{message}</p>

                    {/* Actions */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <Link
                            href={route('home')}
                            className="btn-primary w-full sm:w-auto inline-flex items-center gap-2 px-6 py-2.5"
                        >
                            <Home size={16} />
                            Back to Home
                        </Link>

                        {code === 419 ? (
                            <button
                                onClick={() => window.location.reload()}
                                className="btn-ghost w-full sm:w-auto inline-flex items-center gap-2 px-6 py-2.5 border border-[#1a4445]"
                            >
                                <RefreshCw size={16} />
                                Refresh Page
                            </button>
                        ) : (
                            <button
                                onClick={() => window.history.back()}
                                className="btn-ghost w-full sm:w-auto inline-flex items-center gap-2 px-6 py-2.5 border border-[#1a4445]"
                            >
                                <ArrowLeft size={16} />
                                Go Back
                            </button>
                        )}
                    </div>
                </div>

                {/* Bottom hint */}
                <p className="relative z-10 mt-16 text-xs text-text-secondary/50">
                    HTTP {code} &mdash; If this keeps happening, <Link href={route('contact')} className="underline hover:text-text-secondary">contact us</Link>.
                </p>
            </div>
        </>
    );
}
