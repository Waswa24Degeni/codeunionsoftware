import { Link } from '@inertiajs/react';
import {
    LayoutDashboard, Users, FileText, Briefcase, MessageSquare,
    FileCheck, Settings, SlidersHorizontal, Bot, BarChart2, ChevronRight, X
} from 'lucide-react';
import clsx from 'clsx';

const navItems = [
    { label: 'Dashboard',   icon: LayoutDashboard, href: 'admin.dashboard' },
    { label: 'Analytics',   icon: BarChart2,        href: 'admin.analytics' },
    { label: 'Blog',        icon: FileText,          href: 'admin.blog.index' },
    { label: 'Portfolio',   icon: Briefcase,         href: 'admin.portfolio.index' },
    { label: 'Clients',     icon: Users,             href: 'admin.clients.index' },
    { label: 'Tickets',     icon: MessageSquare,     href: 'admin.tickets.index' },
    { label: 'Quotations',  icon: FileCheck,         href: 'admin.quotations.index' },
    { label: 'Accounts',    icon: Settings,          href: 'admin.accounts.users.index' },
    { label: 'AI Tools',    icon: Bot,               href: 'admin.ai.index' },
    { label: 'Settings',    icon: SlidersHorizontal, href: 'admin.settings.index' },
];

export default function AdminSidebar({ open, onClose, collapsed = false }) {
    return (
        <>
            {/* Mobile overlay */}
            {open && (
                <div
                    className="fixed inset-0 bg-black/50 z-20 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside className={clsx(
                'fixed inset-y-0 left-0 z-30 bg-[#0a2e2f] border-r border-[#1a4445]',
                'transform transition-all duration-200 ease-in-out',
                'flex flex-col',
                'lg:relative lg:translate-x-0',
                collapsed ? 'w-64 lg:w-20' : 'w-64',
                open ? 'translate-x-0' : '-translate-x-full',
            )}>
                {/* Header */}
                <div className={clsx('flex items-center px-4 py-5 border-b border-[#1a4445]', collapsed ? 'justify-center lg:px-2' : 'justify-between')}>
                    <Link href={route('admin.dashboard')} className={clsx('flex items-center', collapsed && 'lg:justify-center')}>
                        <img
                            src="/images/logo.png"
                            alt="CodeUnion Software"
                            className={clsx('h-10 w-auto object-contain', collapsed && 'lg:hidden')}
                        />
                        {collapsed && (
                            <span className="hidden lg:flex w-10 h-10 items-center justify-center rounded-lg bg-accent-500/20 text-accent-300 text-xs font-bold">
                                CU
                            </span>
                        )}
                    </Link>
                    <button onClick={onClose} className="lg:hidden p-1 rounded-md text-text-secondary hover:text-text-primary">
                        <X size={20} />
                    </button>
                </div>

                {/* Nav */}
                <nav className={clsx('flex-1 overflow-y-auto py-4 space-y-1', collapsed ? 'px-2' : 'px-3')}>
                    {navItems.map(({ label, icon: Icon, href }) => {
                        const isActive = route().current(`${href}*`);
                        return (
                            <Link
                                key={href}
                                href={route(href)}
                                className={clsx('sidebar-link', isActive && 'active', collapsed && 'lg:justify-center lg:px-2')}
                                title={collapsed ? label : undefined}
                            >
                                <Icon size={18} className={clsx(collapsed && 'lg:mx-auto')} />
                                <span className={clsx('flex-1', collapsed && 'lg:hidden')}>{label}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Footer */}
                <div className={clsx('border-t border-[#1a4445]', collapsed ? 'p-2' : 'p-4')}>
                    <Link
                        href={route('home')}
                        className={clsx('sidebar-link text-xs text-text-secondary hover:text-text-primary', collapsed && 'lg:justify-center lg:px-2')}
                        title={collapsed ? 'Back to website' : undefined}
                    >
                        <ChevronRight size={14} className={clsx(collapsed && 'lg:mx-auto')} />
                        <span className={clsx(collapsed && 'lg:hidden')}>Back to website</span>
                    </Link>
                </div>
            </aside>
        </>
    );
}
