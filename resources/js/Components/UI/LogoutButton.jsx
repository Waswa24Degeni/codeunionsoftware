import { router } from '@inertiajs/react';
import { useClerk } from '@clerk/clerk-react';

/**
 * Handles sign-out from both Clerk and Laravel.
 * Usage: <LogoutButton className="..." />
 */
export default function LogoutButton({ children, className, onClick, ...props }) {
    const { signOut } = useClerk();

    const handleLogout = async (e) => {
        e.preventDefault();
        onClick?.();

        try {
            await signOut();
        } catch {
            // Clerk may not be initialised — that's fine
        }

        router.post(route('logout'));
    };

    return (
        <button type="button" onClick={handleLogout} className={className} {...props}>
            {children}
        </button>
    );
}
