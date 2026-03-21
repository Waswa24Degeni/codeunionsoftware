import { useEffect } from 'react';
import { router } from '@inertiajs/react';

/**
 * Lightweight Inertia polling for near real-time page props updates.
 */
export default function useRealtimePageRefresh({
    only = [],
    intervalMs = 5000,
    enabled = true,
    pauseWhenTyping = true,
} = {}) {
    const onlyKey = Array.isArray(only) ? only.join('|') : '';

    useEffect(() => {
        if (!enabled) {
            return;
        }

        const isTypingInForm = () => {
            if (!pauseWhenTyping || typeof document === 'undefined') {
                return false;
            }

            const active = document.activeElement;
            if (!active) {
                return false;
            }

            const tag = active.tagName?.toUpperCase?.() ?? '';
            return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || active.isContentEditable;
        };

        const refresh = () => {
            if (isTypingInForm()) {
                return;
            }

            router.reload({
                only,
                preserveState: true,
                preserveScroll: true,
                async: true,
                showProgress: false,
                showLoader: false,
                silent: true,
            });
        };

        const timer = window.setInterval(() => {
            if (document.visibilityState === 'visible') {
                refresh();
            }
        }, intervalMs);

        const onVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                refresh();
            }
        };

        document.addEventListener('visibilitychange', onVisibilityChange);

        return () => {
            window.clearInterval(timer);
            document.removeEventListener('visibilitychange', onVisibilityChange);
        };
    }, [enabled, intervalMs, onlyKey, pauseWhenTyping]);
}
