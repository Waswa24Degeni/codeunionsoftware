import { useEffect, useRef } from 'react';
import { Head } from '@inertiajs/react';
import { useAuth, useUser, useClerk } from '@clerk/clerk-react';

export default function ClerkCallback() {
    const { getToken, isSignedIn, isLoaded: authLoaded } = useAuth();
    const { user, isLoaded: userLoaded } = useUser();
    const { signOut } = useClerk();
    const syncedRef = useRef(false);
    const failCountRef = useRef(0);

    useEffect(() => {
        // Wait until both auth and user data are fully loaded
        if (!authLoaded || !userLoaded || syncedRef.current) return;

        // Not signed in with Clerk — go to login (Clerk is clean, no loop risk)
        if (!isSignedIn || !user) {
            window.location.href = '/login';
            return;
        }

        syncedRef.current = true;

        (async () => {
            try {
                const token = await getToken();

                const res = await fetch('/clerk/sync-session', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-XSRF-TOKEN': decodeURIComponent(
                            document.cookie
                                .split('; ')
                                .find((c) => c.startsWith('XSRF-TOKEN='))
                                ?.split('=')[1] ?? ''
                        ),
                    },
                    credentials: 'same-origin',
                    body: JSON.stringify({
                        clerk_token: token || '',
                        clerk_user_id: user.id,
                        name: user.fullName || `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim() || 'User',
                        email: user.primaryEmailAddress?.emailAddress,
                        avatar_url: user.imageUrl,
                    }),
                });

                if (!res.ok) {
                    console.error('ClerkCallback: sync-session failed', res.status);
                    // Sign out of Clerk to break any redirect loop, then go to login
                    await signOut().catch(() => {});
                    window.location.href = '/login';
                    return;
                }

                const data = await res.json();
                window.location.href = data.redirect || '/';
            } catch (err) {
                console.error('ClerkCallback: error during sync', err);
                // Sign out of Clerk to break the loop
                await signOut().catch(() => {});
                window.location.href = '/login';
            }
        })();
    }, [authLoaded, userLoaded, isSignedIn, user]);

    return (
        <>
            <Head title="Signing in..." />
            <div className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-[#021B1C] via-[#062728] to-[#0a2e2f] overflow-hidden">
                {/* Decorative orbs */}
                <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-brand-500/[0.06] blur-[100px] pointer-events-none" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-accent-500/[0.06] blur-[100px] pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center">
                    {/* Logo with spinning ring around it */}
                    <div className="relative w-28 h-28 flex items-center justify-center">
                        {/* Spinning ring */}
                        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#FF7A18] border-r-[#00ADB5] animate-spin" />
                        {/* Subtle glow ring */}
                        <div className="absolute inset-1 rounded-full border border-[#1a4445]/50" />
                        {/* Logo */}
                        <img
                            src="/images/logo.png"
                            alt="CodeUnion Software"
                            className="h-14 w-auto object-contain relative z-10"
                        />
                    </div>
                    <p className="mt-6 text-sm text-[#999999] tracking-wide">Signing you in…</p>
                </div>
            </div>
        </>
    );
}
