import { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import AdminSidebar from '@/Components/Admin/AdminSidebar';
import AdminHeader from '@/Components/Admin/AdminHeader';
import FlashMessage from '@/Components/UI/FlashMessage';

const SIDEBAR_STORAGE_KEY = 'admin_sidebar_collapsed';

function getInitialSidebarState() {
    if (typeof window === 'undefined') {
        return false;
    }

    return window.localStorage.getItem(SIDEBAR_STORAGE_KEY) === '1';
}

export default function AdminLayout({ children, title }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(getInitialSidebarState);
    const { flash } = usePage().props;

    useEffect(() => {
        window.localStorage.setItem(SIDEBAR_STORAGE_KEY, sidebarCollapsed ? '1' : '0');
    }, [sidebarCollapsed]);

    const handleToggleSidebar = () => {
        setSidebarCollapsed((prev) => !prev);
    };

    return (
        <div className="flex h-full min-h-screen bg-[#021B1C]">
            {/* Sidebar */}
            <AdminSidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                collapsed={sidebarCollapsed}
            />

            {/* Main */}
            <div className="flex flex-1 flex-col min-w-0">
                <AdminHeader
                    title={title}
                    onMenuClick={() => setSidebarOpen(true)}
                    onToggleSidebar={handleToggleSidebar}
                    isSidebarCollapsed={sidebarCollapsed}
                />

                <main className="flex-1 p-6 overflow-auto">
                    {(flash?.success || flash?.error || flash?.warning) && (
                        <FlashMessage flash={flash} className="mb-4" />
                    )}
                    {children}
                </main>
            </div>
        </div>
    );
}
