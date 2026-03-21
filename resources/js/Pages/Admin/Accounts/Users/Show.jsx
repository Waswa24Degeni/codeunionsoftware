import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Badge from '@/Components/UI/Badge';
import { normalizeImageUrl } from '@/lib/normalizeImageUrl';

export default function AdminUsersShow({ user }) {
    return (
        <AdminLayout title={user.name}>
            <Head title="User Details — Admin" />

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="card p-6">
                        <div className="flex items-center gap-4 mb-5">
                            <img
                                src={normalizeImageUrl(user.avatar_url)}
                                alt={user.name}
                                className="w-16 h-16 rounded-full bg-gray-100"
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = '/images/default-avatar.svg';
                                }}
                            />
                            <div>
                                <h2 className="text-2xl font-bold text-text-primary">{user.name}</h2>
                                <p className="text-text-secondary">{user.email}</p>
                            </div>
                        </div>
                        <div className="grid sm:grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-text-secondary mb-1">Primary Role</p>
                                <Badge color="blue">{user.roles?.[0]?.name ?? 'User'}</Badge>
                            </div>
                            <div>
                                <p className="text-text-secondary mb-1">Email Status</p>
                                {user.email_verified_at ? <Badge color="green">Verified</Badge> : <Badge color="yellow">Pending</Badge>}
                            </div>
                            <div>
                                <p className="text-text-secondary mb-1">Created</p>
                                <p className="text-text-secondary">{new Date(user.created_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                    </div>

                    <div className="card p-6">
                        <h3 className="font-semibold text-text-primary mb-4">Direct Permissions</h3>
                        <div className="flex flex-wrap gap-2">
                            {(user.permissions ?? []).length > 0 ? user.permissions.map((permission) => (
                                <span key={permission.id} className="badge badge-gray">{permission.name}</span>
                            )) : <p className="text-sm text-text-secondary">No direct permissions assigned.</p>}
                        </div>
                    </div>
                </div>

                <div className="space-y-5">
                    <Link href={route('admin.accounts.users.edit', user.id)} className="btn btn-primary w-full text-center">
                        Edit User
                    </Link>
                </div>
            </div>
        </AdminLayout>
    );
}
