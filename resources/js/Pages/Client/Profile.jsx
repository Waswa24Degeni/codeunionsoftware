import { Head, useForm, usePage } from '@inertiajs/react';
import ClientLayout from '@/Layouts/ClientLayout';
import InputField from '@/Components/UI/InputField';
import Button from '@/Components/UI/Button';
import { normalizeImageUrl } from '@/lib/normalizeImageUrl';

export default function ClientProfile({ client, user }) {
    const { auth } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        _method: 'patch',
        name: user?.name ?? '',
        email: user?.email ?? '',
        phone: client?.phone ?? '',
        company_name: client?.company_name ?? '',
        contact_person: client?.contact_person ?? user?.name ?? '',
        website: client?.website ?? '',
        address: client?.address ?? '',
        city: client?.city ?? '',
        state: client?.state ?? '',
        country: client?.country ?? '',
        postal_code: client?.postal_code ?? '',
        notes: client?.notes ?? '',
        avatar_file: null,
        remove_avatar: false,
    });

    const activeAvatar = normalizeImageUrl(auth?.user?.avatar_url || user?.avatar_url || '');

    const submit = (e) => {
        e.preventDefault();
        post(route('client.settings.update'), {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <ClientLayout title="Settings">
            <Head title="Client Settings" />

            <form onSubmit={submit} className="max-w-3xl space-y-6">
                <div className="card p-6 space-y-4">
                    <div className="rounded-xl bg-[#0a2e2f] p-4">
                        <p className="text-sm text-text-secondary">Client Account Settings</p>
                        <p className="text-lg font-semibold text-text-primary">{data.company_name || user?.name}</p>
                    </div>

                    <div className="rounded-xl border border-[#1a4445] bg-[#071f20] p-4 space-y-3">
                        <p className="text-sm font-medium text-text-primary">Profile Photo</p>
                        {activeAvatar && !data.remove_avatar && (
                            <img
                                src={activeAvatar}
                                alt={data.name}
                                className="h-16 w-16 rounded-full object-cover ring-2 ring-brand-500/30"
                                onError={(e) => {
                                    e.currentTarget.onerror = null;
                                    e.currentTarget.src = '/images/default-avatar.svg';
                                }}
                            />
                        )}
                        <input
                            type="file"
                            accept="image/*"
                            className="input w-full file:mr-3 file:rounded-md file:border-0 file:bg-brand-500 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-brand-600"
                            onChange={(e) => {
                                const file = e.target.files?.[0] ?? null;
                                setData('avatar_file', file);
                                if (file) {
                                    setData('remove_avatar', false);
                                }
                            }}
                        />
                        <label className="inline-flex items-center gap-2 text-xs text-text-secondary">
                            <input
                                type="checkbox"
                                checked={data.remove_avatar}
                                onChange={(e) => setData('remove_avatar', e.target.checked)}
                            />
                            Remove current profile photo
                        </label>
                        {(errors.avatar_file || errors.remove_avatar) && (
                            <p className="text-xs text-red-500">{errors.avatar_file || errors.remove_avatar}</p>
                        )}
                    </div>

                    <p className="text-sm font-medium text-text-primary">User Profile</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <InputField label="Name" value={data.name}
                            onChange={(e) => setData('name', e.target.value)} error={errors.name} />
                        <InputField label="Email" type="email" value={data.email}
                            onChange={(e) => setData('email', e.target.value)} error={errors.email} />
                    </div>
                    <InputField label="Phone" value={data.phone}
                        onChange={(e) => setData('phone', e.target.value)} error={errors.phone} />
                </div>

                <div className="card p-6 space-y-4">
                    <p className="text-sm font-medium text-text-primary">Company Details</p>
                    <div className="grid sm:grid-cols-2 gap-4">
                        <InputField
                            label="Company Name"
                            value={data.company_name}
                            onChange={(e) => setData('company_name', e.target.value)}
                            error={errors.company_name}
                        />
                        <InputField
                            label="Contact Person"
                            value={data.contact_person}
                            onChange={(e) => setData('contact_person', e.target.value)}
                            error={errors.contact_person}
                        />
                        <InputField
                            label="Website"
                            value={data.website}
                            onChange={(e) => setData('website', e.target.value)}
                            error={errors.website}
                            placeholder="https://example.com"
                        />
                        <InputField
                            label="Postal Code"
                            value={data.postal_code}
                            onChange={(e) => setData('postal_code', e.target.value)}
                            error={errors.postal_code}
                        />
                        <InputField
                            label="City"
                            value={data.city}
                            onChange={(e) => setData('city', e.target.value)}
                            error={errors.city}
                        />
                        <InputField
                            label="State"
                            value={data.state}
                            onChange={(e) => setData('state', e.target.value)}
                            error={errors.state}
                        />
                        <InputField
                            label="Country"
                            value={data.country}
                            onChange={(e) => setData('country', e.target.value)}
                            error={errors.country}
                        />
                        <InputField
                            label="Address"
                            value={data.address}
                            onChange={(e) => setData('address', e.target.value)}
                            error={errors.address}
                        />
                    </div>

                    <div>
                        <label className="label">Notes</label>
                        <textarea
                            rows={4}
                            className="input resize-none"
                            value={data.notes}
                            onChange={(e) => setData('notes', e.target.value)}
                            placeholder="Additional billing or support notes"
                        />
                        {errors.notes && <p className="mt-1 text-xs text-red-500">{errors.notes}</p>}
                    </div>
                </div>

                <Button type="submit" loading={processing}>Save Changes</Button>
            </form>
        </ClientLayout>
    );
}
