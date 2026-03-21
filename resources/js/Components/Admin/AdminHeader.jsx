import { Link, usePage } from '@inertiajs/react';
import { Menu, LogOut, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import NotificationBell from '@/Components/Notifications/NotificationBell';
import { normalizeImageUrl } from '@/lib/normalizeImageUrl';

export default function AdminHeader({ title, onMenuClick, onToggleSidebar, isSidebarCollapsed }) {
    const { auth } = usePage().props;

    return (
        <header className="sticky top-0 z-10 bg-[#0a2e2f] border-b border-[#1a4445] px-4 py-3 flex items-center gap-3">
            {/* Mobile menu toggle */}
            <button
                onClick={onMenuClick}
                className="lg:hidden p-2 rounded-md text-text-secondary hover:bg-[#0f3536]"
                aria-label="Open sidebar"
            >
                <Menu size={22} />
            </button>

            <button
                onClick={onToggleSidebar}
                className="hidden lg:inline-flex p-2 rounded-md text-text-secondary hover:bg-[#0f3536]"
                aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
                {isSidebarCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
            </button>

            {/* Title */}
            <h1 className="text-lg font-semibold text-text-primary flex-1">
                {title}
            </h1>

            {/* Actions */}
            <div className="flex items-center gap-2">
                <NotificationBell />

                <div className="flex items-center gap-2 ml-2 border-l border-[#1a4445] pl-3">
                    <img
                        src={normalizeImageUrl(auth.user?.avatar_url)}
                        alt={auth.user?.name}
                        className="w-8 h-8 rounded-full object-cover"
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = '/images/default-avatar.svg';
                        }}
                    />
                    <div className="hidden sm:block">
                        <p className="text-sm font-medium text-text-primary leading-none">
                            {auth.user?.name}
                        </p>
                        <p className="text-xs text-text-secondary capitalize">
                            {auth.user?.roles?.[0] ?? 'Admin'}
                        </p>
                    </div>
                </div>

                <Link
                    href={route('logout')}
                    method="post"
                    as="button"
                    className="p-2 rounded-lg text-text-secondary hover:text-brand-500 hover:bg-brand-500/10"
                >
                    <LogOut size={18} />
                </Link>
            </div>
        </header>
    );
}
