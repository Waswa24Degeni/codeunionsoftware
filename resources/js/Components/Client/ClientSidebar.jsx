import { Link } from '@inertiajs/react';
import { LayoutDashboard, MessageSquare, FileCheck, User, Settings, LogOut } from 'lucide-react';
import clsx from 'clsx';
import LogoutButton from '@/Components/UI/LogoutButton';

const links = [
    { label: 'Dashboard',    icon: LayoutDashboard, href: 'client.dashboard' },
    { label: 'Tickets',      icon: MessageSquare,   href: 'client.tickets.index' },
    { label: 'Quotations',   icon: FileCheck,       href: 'client.quotations.index' },
    { label: 'My Profile',   icon: User,            href: 'client.profile' },
    { label: 'Settings',     icon: Settings,        href: 'client.settings' },
];

export default function ClientSidebar({ collapsed = false, open = false, onClose = () => {} }) {
    const renderNav = (isCompact = false) => (
        <>
            <nav className="flex-1 px-3 py-4 space-y-1">
                {links.map(({ label, icon: Icon, href }) => (
                    <Link
                        key={href}
                        href={route(href)}
                        onClick={onClose}
                        title={isCompact ? label : undefined}
                        className={clsx(
                            'sidebar-link',
                            route().current(href) && 'active',
                            isCompact && 'justify-center px-2',
                        )}
                    >
                        <Icon size={18} />
                        {!isCompact && <span>{label}</span>}
                    </Link>
                ))}
            </nav>

            <div className="border-t border-[#1a4445] p-3">
                <LogoutButton
                    onClick={onClose}
                    title={isCompact ? 'Log Out' : undefined}
                    className={clsx(
                        'sidebar-link w-full text-brand-500 hover:bg-brand-500/10',
                        isCompact && 'justify-center px-2',
                    )}
                >
                    <LogOut size={18} />
                    {!isCompact && <span>Log Out</span>}
                </LogoutButton>
            </div>
        </>
    );

    return (
        <>
            <aside className={clsx(
                'hidden lg:flex flex-col bg-[#0a2e2f] border-r border-[#1a4445] transition-all duration-200',
                collapsed ? 'w-20' : 'w-64',
            )}>
                <div className={clsx('py-5 border-b border-[#1a4445]', collapsed ? 'px-3' : 'px-4')}>
                    <Link href={route('home')} className={clsx('flex items-center', collapsed ? 'justify-center' : '')} title="CodeUnion Software">
                        <img
                            src="/images/logo.png"
                            alt="CodeUnion Software"
                            className={clsx('object-contain', collapsed ? 'h-9 w-9' : 'h-10 w-auto')}
                        />
                    </Link>
                    {!collapsed && <p className="text-xs text-text-secondary mt-0.5">Client Portal</p>}
                </div>

                {renderNav(collapsed)}
            </aside>

            {open && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    <button
                        type="button"
                        className="absolute inset-0 bg-black/60"
                        onClick={onClose}
                        aria-label="Close sidebar"
                    />
                    <aside className="absolute left-0 top-0 h-full w-72 max-w-[85vw] bg-[#0a2e2f] border-r border-[#1a4445] flex flex-col">
                        <div className="px-4 py-5 border-b border-[#1a4445]">
                            <Link href={route('home')} className="flex items-center" onClick={onClose}>
                                <img
                                    src="/images/logo.png"
                                    alt="CodeUnion Software"
                                    className="h-10 w-auto object-contain"
                                />
                            </Link>
                            <p className="text-xs text-text-secondary mt-0.5">Client Portal</p>
                        </div>

                        {renderNav(false)}
                    </aside>
                </div>
            )}
        </>
    );
}
