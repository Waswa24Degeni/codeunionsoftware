import { useState } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Menu, X } from 'lucide-react';
import clsx from 'clsx';

const links = [
    { label: 'Home',      href: 'home' },
    { label: 'About',     href: 'about' },
    { label: 'Services',  href: 'services' },
    { label: 'Portfolio', href: 'portfolio.index' },
    { label: 'Blog',      href: 'blog.index' },
    { label: 'Contact',   href: 'contact' },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const { auth, siteSettings = {} } = usePage().props;
    const siteName = siteSettings.site_name || 'CodeUnion Software';

    return (
        <nav className="sticky top-0 z-40 bg-[#021B1C]/95 backdrop-blur border-b border-[#1a4445]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20 sm:h-16">
                {/* Logo */}
                <Link href={route('home')} className="flex items-center shrink-0">
                    <img
                        src="/images/logo.png"
                        alt={siteName}
                        className="h-10 sm:h-11 w-auto max-w-[180px] object-contain"
                    />
                </Link>

                {/* Desktop nav */}
                <div className="hidden md:flex items-center gap-1">
                    {links.map(({ label, href }) => (
                        <Link
                            key={href}
                            href={route(href)}
                            className={clsx(
                                'px-3 py-2 text-sm font-medium rounded-lg transition-colors',
                                route().current(href)
                                    ? 'text-brand-500 bg-brand-500/10'
                                    : 'text-text-secondary hover:text-text-primary hover:bg-[#0f3536]',
                            )}
                        >
                            {label}
                        </Link>
                    ))}
                    {!auth.user ? (
                        <>
                            <Link href={route('login')} className="btn-secondary text-sm">Login</Link>
                            <Link href={route('register')} className="btn-primary text-sm">Get Started</Link>
                        </>
                    ) : null}
                </div>

                {/* Mobile toggle */}
                <button
                    onClick={() => setOpen(!open)}
                    className="md:hidden p-2 rounded-lg text-text-secondary"
                >
                    <Menu size={22} />
                </button>
            </div>

            {/* Mobile drawer overlay */}
            {open && (
                <div
                    className="fixed inset-0 z-50 bg-black/50 md:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* Mobile drawer — slides in from the right */}
            <div
                className={clsx(
                    'fixed inset-y-0 right-0 z-50 h-dvh min-h-dvh w-full max-w-sm bg-[#021B1C] border-l border-[#1a4445] flex flex-col shadow-2xl transition-transform duration-300 md:hidden',
                    open ? 'translate-x-0' : 'translate-x-full',
                )}
            >
                {/* Drawer header */}
                <div className="flex items-center justify-between px-5 py-5 border-b border-[#1a4445]">
                    <div className="flex items-center gap-3 min-w-0">
                        <img
                            src="/images/logo.png"
                            alt={siteName}
                            className="h-10 w-auto max-w-[120px] object-contain"
                        />
                        <span className="text-sm font-semibold text-text-primary truncate">Menu</span>
                    </div>
                    <button
                        onClick={() => setOpen(false)}
                        className="p-1 rounded-lg text-text-secondary hover:text-text-primary"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Nav links */}
                <nav className="flex-1 overflow-y-auto px-5 py-5 space-y-2">
                    {links.map(({ label, href }) => (
                        <Link
                            key={href}
                            href={route(href)}
                            onClick={() => setOpen(false)}
                            className={clsx(
                                'block w-full px-4 py-3 text-base font-medium rounded-xl transition-colors',
                                route().current(href)
                                    ? 'text-brand-500 bg-brand-500/10'
                                    : 'text-text-secondary hover:text-text-primary hover:bg-[#0f3536]',
                            )}
                        >
                            {label}
                        </Link>
                    ))}
                </nav>

                {/* Auth buttons */}
                <div className="px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-4 border-t border-[#1a4445] flex flex-col gap-3">
                    <Link href={route('login')} onClick={() => setOpen(false)} className="btn-secondary w-full text-center">Login</Link>
                    <Link href={route('register')} onClick={() => setOpen(false)} className="btn-primary w-full text-center">Register</Link>
                </div>
            </div>
        </nav>
    );
}
