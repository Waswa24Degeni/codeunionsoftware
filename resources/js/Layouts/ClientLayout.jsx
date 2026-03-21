import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import ClientSidebar from '@/Components/Client/ClientSidebar';
import FlashMessage from '@/Components/UI/FlashMessage';
import NotificationBell from '@/Components/Notifications/NotificationBell';
import { Menu, PanelLeftClose, PanelLeftOpen } from 'lucide-react';

const CLIENT_SIDEBAR_STORAGE_KEY = 'client_sidebar_collapsed';

function getInitialSidebarState() {
    if (typeof window === 'undefined') {
        return false;
    }

    return window.localStorage.getItem(CLIENT_SIDEBAR_STORAGE_KEY) === '1';
}

export default function ClientLayout({ children, title }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(getInitialSidebarState);
    const { flash } = usePage().props;

    useEffect(() => {
        window.localStorage.setItem(CLIENT_SIDEBAR_STORAGE_KEY, sidebarCollapsed ? '1' : '0');
    }, [sidebarCollapsed]);

    return (
            <div className="flex h-full min-h-screen bg-[#021B1C]">
            <ClientSidebar
                collapsed={sidebarCollapsed}
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
            />
            <div className="flex flex-1 flex-col min-w-0">
                <header className="sticky top-0 z-10 bg-[#0a2e2f] border-b border-[#1a4445] px-6 py-4 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 rounded-md text-text-secondary hover:bg-[#0f3536]"
                            aria-label="Open client sidebar"
                        >
                            <Menu size={20} />
                        </button>
                        <button
                            type="button"
                            onClick={() => setSidebarCollapsed((prev) => !prev)}
                            className="hidden lg:inline-flex p-2 rounded-md text-text-secondary hover:bg-[#0f3536]"
                            aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                            title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                        >
                            {sidebarCollapsed ? <PanelLeftOpen size={20} /> : <PanelLeftClose size={20} />}
                        </button>
                        <h1 className="text-xl font-semibold text-text-primary">{title}</h1>
                    </div>
                    <NotificationBell />
                </header>
                <main className="flex-1 p-6 overflow-auto">
                    {(flash?.success || flash?.error) && (
                        <FlashMessage flash={flash} className="mb-4" />
                    )}
                    {children}
                </main>
            </div>
        </div>
    );
}
