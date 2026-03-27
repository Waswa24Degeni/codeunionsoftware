import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ClerkProvider } from '@clerk/clerk-react';
import ErrorPage from './Pages/Errors/ErrorPage';
import PageLoader from './Components/UI/PageLoader';

const appName = import.meta.env.VITE_APP_NAME || 'CodeUnion';
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(`./Pages/${name}.jsx`, import.meta.glob('./Pages/**/*.jsx')),
    setup({ el, App, props }) {
        const root = createRoot(el);
        const tree = (
            <>
                <PageLoader />
                <App {...props} />
            </>
        );
        root.render(
            clerkPubKey
                ? <ClerkProvider publishableKey={clerkPubKey} afterSignOutUrl="/">{tree}</ClerkProvider>
                : tree,
        );

        window.requestAnimationFrame(() => {
            document.getElementById('initial-page-loader')?.remove();
        });
    },
    progress: false,
    // Render the shared error page for any HTTP error Inertia surfaces
    errorBoundary(error) {
        const status = error?.response?.status ?? 500;
        return <ErrorPage status={status} />;
    },
});
