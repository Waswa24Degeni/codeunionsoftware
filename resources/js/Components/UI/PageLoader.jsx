import { useEffect, useState } from 'react';
import { router } from '@inertiajs/react';

export default function PageLoader() {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const removeStart  = router.on('start',  (event) => {
            const visit = event?.detail?.visit;

            if (visit?.silent || visit?.showLoader === false || visit?.showProgress === false) {
                return;
            }

            setLoading(true);
        });
        const removeFinish = router.on('finish', () => setLoading(false));

        return () => {
            removeStart();
            removeFinish();
        };
    }, []);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#021B1C]/90 backdrop-blur-sm">
            <div className="relative flex items-center justify-center w-24 h-24">
                {/* Track ring */}
                <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 96 96"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="48" cy="48" r="43" stroke="#1a4445" strokeWidth="5" />
                </svg>

                {/* Spinning arc */}
                <svg
                    className="absolute inset-0 w-full h-full animate-spin"
                    viewBox="0 0 96 96"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ animationDuration: '900ms' }}
                >
                    <circle
                        cx="48"
                        cy="48"
                        r="43"
                        stroke="#FF7A18"
                        strokeWidth="5"
                        strokeLinecap="round"
                        strokeDasharray="270"
                        strokeDashoffset="202"
                    />
                </svg>

                {/* Logo */}
                <img
                    src="/images/logo.png"
                    alt="Loading…"
                    className="w-12 h-12 object-contain relative z-10 select-none"
                    draggable={false}
                />
            </div>
        </div>
    );
}
