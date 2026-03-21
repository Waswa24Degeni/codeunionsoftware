import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { router, usePage } from '@inertiajs/react';
import { Bell, CheckCheck } from 'lucide-react';
import clsx from 'clsx';

const POLL_INTERVAL_MS = 5000;

function normalizePayload(payload) {
    return {
        items: Array.isArray(payload?.items) ? payload.items : [],
        unreadCount: Number(payload?.unreadCount ?? 0),
    };
}

export default function NotificationBell({ className = '' }) {
    const { notificationCenter } = usePage().props;
    const initial = useMemo(() => normalizePayload(notificationCenter), [notificationCenter]);

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState(initial.items);
    const [unreadCount, setUnreadCount] = useState(initial.unreadCount);
    const isFetchingRef = useRef(false);

    const hydrate = useCallback((payload) => {
        const normalized = normalizePayload(payload);
        setItems(normalized.items);
        setUnreadCount(normalized.unreadCount);
    }, []);

    useEffect(() => {
        hydrate(notificationCenter);
    }, [notificationCenter, hydrate]);

    const fetchNotifications = useCallback(async () => {
        if (isFetchingRef.current) {
            return;
        }

        isFetchingRef.current = true;

        try {
            const response = await window.axios.get(route('notifications.index'), {
                params: { limit: 12 },
            });
            hydrate(response.data);
        } catch {
            // Silent fail: notification polling should never block page UX.
        } finally {
            isFetchingRef.current = false;
        }
    }, [hydrate]);

    useEffect(() => {
        fetchNotifications();

        const timer = window.setInterval(() => {
            if (document.visibilityState === 'visible') {
                fetchNotifications();
            }
        }, POLL_INTERVAL_MS);

        const onVisibilityChange = () => {
            if (document.visibilityState === 'visible') {
                fetchNotifications();
            }
        };

        document.addEventListener('visibilitychange', onVisibilityChange);

        return () => {
            window.clearInterval(timer);
            document.removeEventListener('visibilitychange', onVisibilityChange);
        };
    }, [fetchNotifications]);

    const markAsRead = useCallback(async (id) => {
        setItems((previous) => previous.map((item) => (
            item.id === id ? { ...item, read_at: item.read_at ?? new Date().toISOString() } : item
        )));
        setUnreadCount((count) => Math.max(0, count - 1));

        try {
            const response = await window.axios.post(route('notifications.read', id));
            const count = Number(response?.data?.unreadCount ?? 0);
            if (Number.isFinite(count)) {
                setUnreadCount(count);
            }
        } catch {
            fetchNotifications();
        }
    }, [fetchNotifications]);

    const markAllAsRead = useCallback(async () => {
        setItems((previous) => previous.map((item) => ({ ...item, read_at: item.read_at ?? new Date().toISOString() })));
        setUnreadCount(0);

        try {
            await window.axios.post(route('notifications.read-all'));
        } catch {
            fetchNotifications();
        }
    }, [fetchNotifications]);

    const openNotification = useCallback((notification) => {
        if (!notification.read_at) {
            markAsRead(notification.id);
        }

        if (notification.url) {
            router.visit(notification.url);
            setOpen(false);
        }
    }, [markAsRead]);

    return (
        <div className={clsx('relative', className)}>
            <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                className="p-2 rounded-lg text-text-secondary hover:bg-[#0f3536] relative"
                aria-label="Notifications"
            >
                <Bell size={20} />
                {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 min-w-4 h-4 px-1 rounded-full bg-brand-500 text-[10px] leading-4 text-white text-center">
                        {unreadCount > 99 ? '99+' : unreadCount}
                    </span>
                )}
            </button>

            {open && (
                <>
                    <button
                        type="button"
                        className="fixed inset-0 z-20"
                        aria-label="Close notifications"
                        onClick={() => setOpen(false)}
                    />

                    <div className="absolute right-0 mt-2 z-30 w-[22rem] max-w-[90vw] rounded-xl border border-[#1a4445] bg-[#072526] shadow-2xl overflow-hidden">
                        <div className="px-4 py-3 border-b border-[#1a4445] flex items-center justify-between">
                            <p className="text-sm font-semibold text-text-primary">Notifications</p>
                            <button
                                type="button"
                                onClick={markAllAsRead}
                                className="inline-flex items-center gap-1 text-xs text-accent-400 hover:text-accent-300"
                            >
                                <CheckCheck size={14} /> Mark all read
                            </button>
                        </div>

                        <div className="max-h-96 overflow-auto divide-y divide-[#123839]">
                            {items.length === 0 && (
                                <div className="px-4 py-8 text-sm text-text-secondary text-center">
                                    No notifications yet.
                                </div>
                            )}

                            {items.map((notification) => (
                                <button
                                    key={notification.id}
                                    type="button"
                                    onClick={() => openNotification(notification)}
                                    className={clsx(
                                        'w-full text-left px-4 py-3 hover:bg-[#0c3233] transition-colors',
                                        !notification.read_at && 'bg-[#0b3435]/55',
                                    )}
                                >
                                    <div className="flex items-start gap-3">
                                        <span className={clsx(
                                            'mt-1 w-2 h-2 rounded-full shrink-0',
                                            notification.read_at ? 'bg-[#2b5b5d]' : 'bg-[#FF7A18]',
                                        )} />
                                        <div className="min-w-0">
                                            <p className="text-sm font-medium text-text-primary truncate">
                                                {notification.title}
                                            </p>
                                            {notification.message && (
                                                <p className="text-xs text-text-secondary mt-1 line-clamp-2">
                                                    {notification.message}
                                                </p>
                                            )}
                                            <p className="text-[11px] text-text-muted mt-1.5">
                                                {notification.created_at_human ?? ''}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
