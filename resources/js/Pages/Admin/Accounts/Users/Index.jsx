import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Badge from '@/Components/UI/Badge';
import Pagination from '@/Components/UI/Pagination';
import { Plus } from 'lucide-react';
import { normalizeImageUrl } from '@/lib/normalizeImageUrl';

export default function AdminUsersIndex({ users }) {
    return (
        <AdminLayout title="Users">
            <Head title="Users — Admin" />

            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-lg font-semibold text-text-primary">Manage users</h2>
                    <p className="text-sm text-text-secondary">Control staff access, roles, and permissions.</p>
                </div>
                <Link href={route('admin.accounts.users.create')} className="btn btn-primary inline-flex items-center gap-1.5">
                    <Plus size={16} /> New User
                </Link>
            </div>

            <div className="card">
                <div className="table-container">
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Role</th>
                                <th>Email Verified</th>
                                <th>Created</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.data.map((user) => (
                                <tr key={user.id}>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={normalizeImageUrl(user.avatar_url)}
                                                alt={user.name}
                                                className="w-10 h-10 rounded-full bg-gray-100"
                                                onError={(e) => {
                                                    e.currentTarget.onerror = null;
                                                    e.currentTarget.src = '/images/default-avatar.svg';
                                                }}
                                            />
                                            <div>
                                                <p className="font-medium text-text-primary">{user.name}</p>
                                                <p className="text-xs text-text-secondary">{user.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td><Badge color="blue">{user.roles?.[0]?.name ?? 'User'}</Badge></td>
                                    <td>{user.email_verified_at ? <Badge color="green">Verified</Badge> : <Badge color="yellow">Pending</Badge>}</td>
                                    <td className="text-text-secondary text-sm">{new Date(user.created_at).toLocaleDateString()}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-4 border-t border-[#1a4445]">
                    <Pagination links={users} />
                </div>
            </div>
        </AdminLayout>
    );
}
