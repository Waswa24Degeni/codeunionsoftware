import { Head } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';

export default function AdminRolesIndex({ roles }) {
    return (
        <AdminLayout title="Roles & Permissions">
            <Head title="Roles — Admin" />

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                {(roles ?? []).map((role) => (
                    <div key={role.id} className="card p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-lg font-semibold text-text-primary capitalize">{role.name}</h2>
                            <span className="badge badge-blue">{role.permissions?.length ?? 0} perms</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {(role.permissions ?? []).slice(0, 12).map((permission) => (
                                <span key={permission.id} className="badge badge-gray text-xs">{permission.name}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </AdminLayout>
    );
}
