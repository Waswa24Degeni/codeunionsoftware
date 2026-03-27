import { useEffect } from 'react';
import { Head, Link } from '@inertiajs/react';
import { SignUp, useAuth } from '@clerk/clerk-react';
import { clerkAppearance } from '@/lib/clerkAppearance';

export default function Register() {
    const { isSignedIn, isLoaded } = useAuth();

    // If user already has an active Clerk session, skip to callback
    useEffect(() => {
        if (isLoaded && isSignedIn) {
            window.location.href = '/clerk/callback';
        }
    }, [isLoaded, isSignedIn]);

    if (!isLoaded || isSignedIn) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#021B1C] via-[#062728] to-[#0a2e2f]">
                <div className="relative w-28 h-28 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#FF7A18] border-r-[#00ADB5] animate-spin" />
                    <img src="/images/logo.png" alt="" className="h-14 w-auto object-contain" />
                </div>
            </div>
        );
    }

    return (
        <>
            <Head title="Register" />
            <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-[#021B1C] via-[#062728] to-[#0a2e2f] p-4 sm:p-6 overflow-hidden">
                {/* Decorative gradient orbs */}
                <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent-500/[0.06] blur-[100px] pointer-events-none" />
                <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-500/[0.06] blur-[100px] pointer-events-none" />

                {/* Subtle grid pattern */}
                <div
                    className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage:
                            'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                        backgroundSize: '60px 60px',
                    }}
                />

                <div className="relative z-10 w-full max-w-md">
                    {/* Logo & tagline */}
                    <div className="text-center mb-8">
                        <Link href="/" className="inline-block">
                            <img
                                src="/images/logo.png"
                                alt="CodeUnion Software"
                                className="h-14 sm:h-16 w-auto object-contain mx-auto"
                            />
                        </Link>
                        <p className="mt-3 text-sm text-[#999999]">
                            Create your account to get started
                        </p>
                    </div>

                    {/* Clerk SignUp */}
                    <div className="flex justify-center">
                        <SignUp
                            routing="hash"
                            signInUrl="/login"
                            fallbackRedirectUrl="/clerk/callback"
                            appearance={clerkAppearance}
                        />
                    </div>

                    {/* Footer */}
                    <p className="mt-8 text-center text-xs text-[#999999]">
                        &copy; {new Date().getFullYear()} CodeUnion Software. All rights reserved.
                    </p>
                </div>
            </div>
        </>
    );
}
