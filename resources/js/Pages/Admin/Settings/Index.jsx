import { useState } from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { getServices, getTeamMembers } from '@/lib/siteContent';
import {
    Facebook, Twitter, Instagram, Linkedin, Youtube, Github, Globe,
    Building2, Mail, Phone, MapPin, Clock3, ShieldCheck, FileText, Users, Briefcase,
    Search, Share2, CheckCircle2, Save,
} from 'lucide-react';

/* ── platform configs ─────────────────────────────────────────── */
const PLATFORM_FIELDS = [
    { key: 'facebook',  label: 'Facebook',    Icon: Facebook,  placeholder: 'https://facebook.com/yourpage' },
    { key: 'twitter',   label: 'Twitter / X', Icon: Twitter,   placeholder: 'https://twitter.com/yourhandle' },
    { key: 'instagram', label: 'Instagram',   Icon: Instagram, placeholder: 'https://instagram.com/yourhandle' },
    { key: 'linkedin',  label: 'LinkedIn',    Icon: Linkedin,  placeholder: 'https://linkedin.com/company/yourcompany' },
    { key: 'youtube',   label: 'YouTube',     Icon: Youtube,   placeholder: 'https://youtube.com/@yourchannel' },
    { key: 'github',    label: 'GitHub',      Icon: Github,    placeholder: 'https://github.com/yourorg' },
    { key: 'tiktok',    label: 'TikTok',      Icon: null,      placeholder: 'https://tiktok.com/@yourhandle' },
    { key: 'whatsapp',  label: 'WhatsApp',    Icon: null,      placeholder: 'https://wa.me/1234567890' },
];

const TEAM_SOCIAL_FIELDS = [
    { key: 'linkedin',  label: 'LinkedIn',    Icon: Linkedin,  placeholder: 'https://linkedin.com/in/username' },
    { key: 'github',    label: 'GitHub',      Icon: Github,    placeholder: 'https://github.com/username' },
    { key: 'twitter',   label: 'Twitter / X', Icon: Twitter,   placeholder: 'https://twitter.com/username' },
    { key: 'instagram', label: 'Instagram',   Icon: Instagram, placeholder: 'https://instagram.com/username' },
    { key: 'facebook',  label: 'Facebook',    Icon: Facebook,  placeholder: 'https://facebook.com/username' },
    { key: 'youtube',   label: 'YouTube',     Icon: Youtube,   placeholder: 'https://youtube.com/@channel' },
    { key: 'tiktok',    label: 'TikTok',      Icon: null,      placeholder: 'https://tiktok.com/@username' },
    { key: 'whatsapp',  label: 'WhatsApp',    Icon: null,      placeholder: 'https://wa.me/1234567890' },
    { key: 'website',   label: 'Website',     Icon: Globe,     placeholder: 'https://yourwebsite.com/profile' },
];

const EMPTY_TEAM_SOCIAL_LINKS = Object.fromEntries(
    TEAM_SOCIAL_FIELDS.map((field) => [field.key, '']),
);

/* ── custom brand icons ───────────────────────────────────────── */
function TikTokIcon({ size = 18 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.29 6.29 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.54V6.78a4.85 4.85 0 01-1.02-.09z" />
        </svg>
    );
}

function WhatsAppIcon({ size = 18 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.122 1.522 5.855L.057 23.943l6.236-1.638A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.36-.214-3.7.972.987-3.605-.234-.371A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
        </svg>
    );
}

/* ── shared primitives ────────────────────────────────────────── */
function Field({ icon: Icon, label, required = false, error, children }) {
    return (
        <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
                <span className="flex items-center gap-2">
                    {Icon && <span className="text-accent-500"><Icon size={16} /></span>}
                    {label}
                    {required && <span className="text-brand-500 ml-0.5">*</span>}
                </span>
            </label>
            {children}
            {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
        </div>
    );
}

function SaveBar({ processing, label = 'Save Changes' }) {
    return (
        <div className="flex justify-end pt-4 border-t border-[#1a4445]">
            <button type="submit" disabled={processing}
                className="btn-primary inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium">
                <Save size={15} />
                {processing ? 'Saving…' : label}
            </button>
        </div>
    );
}

function FlashSuccess({ message }) {
    if (!message) return null;
    return (
        <div className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent-500/10 border border-accent-500/30 text-accent-400 text-sm">
            <CheckCircle2 size={15} />
            {message}
        </div>
    );
}

/* ── tab definitions ──────────────────────────────────────────── */
const TABS = [
    { key: 'general', label: 'General',     Icon: Building2  },
    { key: 'contact', label: 'Contact',     Icon: Phone      },
    { key: 'seo',     label: 'Legal & SEO', Icon: ShieldCheck },
    { key: 'social',  label: 'Social Media', Icon: Share2    },
    { key: 'team',    label: 'Team',        Icon: Users      },
    { key: 'services',label: 'Services',    Icon: Briefcase  },
];

/* ──────────────────────────────────────────────────────────────── */
/* TAB PANELS                                                       */
/* ──────────────────────────────────────────────────────────────── */

function GeneralTab({ settings }) {
    const flash = usePage().props.flash ?? {};
    const { data, setData, post, processing, errors } = useForm({
        site_name:        settings.site_name        ?? '',
        site_tagline:     settings.site_tagline     ?? '',
        footer_copyright: settings.footer_copyright ?? '',
        company_logo_file: null,
        remove_company_logo: false,
    });

    const currentLogo = settings.company_logo
        ? (settings.company_logo.startsWith('http://') || settings.company_logo.startsWith('https://') || settings.company_logo.startsWith('data:'))
            ? settings.company_logo
            : settings.company_logo.startsWith('/uploads/')
                ? settings.company_logo
                : settings.company_logo.startsWith('/media/')
                    ? `/uploads/${String(settings.company_logo).replace(/^\/media\//, '')}`
                : settings.company_logo.startsWith('/storage/')
                    ? `/uploads/${String(settings.company_logo).replace(/^\/storage\//, '')}`
                    : settings.company_logo.startsWith('storage/')
                        ? `/uploads/${String(settings.company_logo).replace(/^storage\//, '')}`
                        : settings.company_logo.startsWith('uploads/')
                            ? `/${settings.company_logo}`
                            : `/uploads/${String(settings.company_logo).replace(/^\/+/, '')}`
        : '';

    return (
        <form onSubmit={e => {
            e.preventDefault();
            post(route('admin.settings.general.update'), { forceFormData: true });
        }}
            className="space-y-5">
            <FlashSuccess message={flash.success} />

            <div className="grid md:grid-cols-2 gap-5">
                <Field icon={Building2} label="Site Name" required error={errors.site_name}>
                    <input className="input w-full"
                        value={data.site_name}
                        onChange={e => setData('site_name', e.target.value)}
                        placeholder="CodeUnion Software" />
                </Field>

                <Field icon={FileText} label="Site Tagline" error={errors.site_tagline}>
                    <input className="input w-full"
                        value={data.site_tagline}
                        onChange={e => setData('site_tagline', e.target.value)}
                        placeholder="A short brand statement" />
                </Field>
            </div>

            <Field icon={ShieldCheck} label="Footer Copyright Text" error={errors.footer_copyright}>
                <input className="input w-full"
                    value={data.footer_copyright}
                    onChange={e => setData('footer_copyright', e.target.value)}
                    placeholder="© 2025 CodeUnion. All rights reserved." />
            </Field>

            <Field icon={Building2} label="Company Logo" error={errors.company_logo_file || errors.remove_company_logo}>
                <div className="space-y-3">
                    {currentLogo && !data.remove_company_logo && (
                        <div className="rounded-lg border border-[#1a4445] bg-[#0a2a2b] p-3 inline-flex">
                            <img src={currentLogo} alt="Company logo" className="h-12 w-auto object-contain" />
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        className="input w-full file:mr-3 file:rounded-md file:border-0 file:bg-brand-500 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-brand-600"
                        onChange={(e) => {
                            const file = e.target.files?.[0] ?? null;
                            setData('company_logo_file', file);
                            if (file) {
                                setData('remove_company_logo', false);
                            }
                        }}
                    />
                    <label className="inline-flex items-center gap-2 text-xs text-text-secondary">
                        <input
                            type="checkbox"
                            checked={data.remove_company_logo}
                            onChange={(e) => setData('remove_company_logo', e.target.checked)}
                        />
                        Remove current company logo
                    </label>
                </div>
            </Field>

            <SaveBar processing={processing} label="Save General Settings" />
        </form>
    );
}

function ContactTab({ settings }) {
    const flash = usePage().props.flash ?? {};
    const { data, setData, post, processing, errors } = useForm({
        contact_email:   settings.contact_email   ?? '',
        contact_phone:   settings.contact_phone   ?? '',
        contact_address: settings.contact_address ?? '',
        business_hours:  settings.business_hours  ?? '',
    });

    return (
        <form onSubmit={e => { e.preventDefault(); post(route('admin.settings.contact.update')); }}
            className="space-y-5">
            <FlashSuccess message={flash.success} />

            <div className="grid md:grid-cols-2 gap-5">
                <Field icon={Mail} label="Contact Email" required error={errors.contact_email}>
                    <input type="email" className="input w-full"
                        value={data.contact_email}
                        onChange={e => setData('contact_email', e.target.value)}
                        placeholder="hello@codeunion.dev" />
                </Field>

                <Field icon={Phone} label="Contact Phone" error={errors.contact_phone}>
                    <input className="input w-full"
                        value={data.contact_phone}
                        onChange={e => setData('contact_phone', e.target.value)}
                        placeholder="+1 (555) 000-0000" />
                </Field>

                <Field icon={MapPin} label="Address / Location" error={errors.contact_address}>
                    <input className="input w-full"
                        value={data.contact_address}
                        onChange={e => setData('contact_address', e.target.value)}
                        placeholder="Remote - Worldwide" />
                </Field>

                <Field icon={Clock3} label="Business Hours" error={errors.business_hours}>
                    <input className="input w-full"
                        value={data.business_hours}
                        onChange={e => setData('business_hours', e.target.value)}
                        placeholder="Mon-Fri, 9:00 AM – 6:00 PM" />
                </Field>
            </div>

            <SaveBar processing={processing} label="Save Contact Settings" />
        </form>
    );
}

function SeoTab({ settings }) {
    const flash = usePage().props.flash ?? {};
    const { data, setData, post, processing, errors } = useForm({
        privacy_policy_url:   settings.privacy_policy_url   ?? '',
        terms_of_service_url: settings.terms_of_service_url ?? '',
        meta_title:           settings.meta_title           ?? '',
        meta_description:     settings.meta_description     ?? '',
    });

    return (
        <form onSubmit={e => { e.preventDefault(); post(route('admin.settings.seo.update')); }}
            className="space-y-5">
            <FlashSuccess message={flash.success} />

            <div className="grid md:grid-cols-2 gap-5">
                <Field icon={ShieldCheck} label="Privacy Policy URL" error={errors.privacy_policy_url}>
                    <input type="url" className="input w-full"
                        value={data.privacy_policy_url}
                        onChange={e => setData('privacy_policy_url', e.target.value)}
                        placeholder="https://example.com/privacy" />
                </Field>

                <Field icon={FileText} label="Terms of Service URL" error={errors.terms_of_service_url}>
                    <input type="url" className="input w-full"
                        value={data.terms_of_service_url}
                        onChange={e => setData('terms_of_service_url', e.target.value)}
                        placeholder="https://example.com/terms" />
                </Field>

                <Field icon={Search} label="Default Meta Title" error={errors.meta_title}>
                    <input className="input w-full"
                        value={data.meta_title}
                        onChange={e => setData('meta_title', e.target.value)}
                        placeholder="CodeUnion Software" />
                </Field>
            </div>

            <Field icon={FileText} label="Default Meta Description" error={errors.meta_description}>
                <textarea rows={3} className="input w-full resize-none"
                    value={data.meta_description}
                    onChange={e => setData('meta_description', e.target.value)}
                    placeholder="Describe your company for search engines…" />
            </Field>

            <SaveBar processing={processing} label="Save SEO & Legal Settings" />
        </form>
    );
}

function SocialTab({ socials }) {
    const flash = usePage().props.flash ?? {};
    const { data, setData, post, processing, errors } = useForm(
        Object.fromEntries(PLATFORM_FIELDS.map(({ key }) => [key, socials[key] ?? '']))
    );

    const renderIcon = (p) => {
        if (p.Icon) return <p.Icon size={18} />;
        return p.key === 'tiktok' ? <TikTokIcon size={18} /> : <WhatsAppIcon size={18} />;
    };

    return (
        <form onSubmit={e => { e.preventDefault(); post(route('admin.settings.social.update')); }}
            className="space-y-5">
            <FlashSuccess message={flash.success} />

            <div className="grid md:grid-cols-2 gap-5">
                {PLATFORM_FIELDS.map(p => (
                    <Field key={p.key} label={p.label} error={errors[p.key]}>
                        <div className="flex items-center gap-2">
                            <span className="w-10 h-10 rounded-lg border border-[#1a4445] text-accent-500 flex items-center justify-center shrink-0">
                                {renderIcon(p)}
                            </span>
                            <input type="url" className="input w-full"
                                value={data[p.key]}
                                onChange={e => setData(p.key, e.target.value)}
                                placeholder={p.placeholder} />
                        </div>
                    </Field>
                ))}
            </div>

            <SaveBar processing={processing} label="Save Social Links" />
        </form>
    );
}

function TeamTab({ settings }) {
    const flash = usePage().props.flash ?? {};
    const { data, setData, post, processing, errors } = useForm({
        team_members: getTeamMembers(settings).map((member) => ({
            ...member,
            social_links: {
                ...EMPTY_TEAM_SOCIAL_LINKS,
                ...(member.social_links ?? {}),
                ...(member.social_link ? { website: member.social_link } : {}),
            },
            avatar_file: null,
        })),
    });

    const updateMember = (index, field, value) => {
        setData('team_members', data.team_members.map((member, i) => (
            i === index ? { ...member, [field]: value } : member
        )));
    };

    const addMember = () => {
        setData('team_members', [
            ...data.team_members,
            {
                name: '',
                role: '',
                description: '',
                social_links: { ...EMPTY_TEAM_SOCIAL_LINKS },
                avatar: '',
                avatar_file: null,
            },
        ]);
    };

    const updateMemberSocial = (index, platform, value) => {
        setData('team_members', data.team_members.map((member, i) => {
            if (i !== index) return member;

            return {
                ...member,
                social_links: {
                    ...EMPTY_TEAM_SOCIAL_LINKS,
                    ...(member.social_links ?? {}),
                    [platform]: value,
                },
            };
        }));
    };

    const renderSocialIcon = (platform, Icon) => {
        if (Icon) return <Icon size={16} />;
        if (platform === 'tiktok') return <TikTokIcon size={16} />;
        if (platform === 'whatsapp') return <WhatsAppIcon size={16} />;
        return <Globe size={16} />;
    };

    const removeMember = (index) => {
        if (data.team_members.length <= 1) return;
        setData('team_members', data.team_members.filter((_, i) => i !== index));
    };

    return (
        <form onSubmit={e => {
            e.preventDefault();
            post(route('admin.settings.team.update'), { forceFormData: true });
        }}
            className="space-y-5">
            <FlashSuccess message={flash.success} />
            {errors.team_members && (
                <p className="text-sm text-red-400">{errors.team_members}</p>
            )}

            <div className="space-y-4">
                {data.team_members.map((member, index) => (
                    <div key={`${index}-${member.name}`} className="rounded-xl border border-[#1a4445] bg-[#071f20] p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-text-primary">Team Member {index + 1}</p>
                            <button
                                type="button"
                                onClick={() => removeMember(index)}
                                disabled={data.team_members.length <= 1}
                                className="text-xs px-2.5 py-1 rounded-md border border-[#1a4445] text-text-secondary hover:text-text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Remove
                            </button>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <Field label="Name" required error={errors[`team_members.${index}.name`]}>
                                <input className="input w-full"
                                    value={member.name}
                                    onChange={e => updateMember(index, 'name', e.target.value)}
                                    placeholder="John Doe" />
                            </Field>

                            <Field label="Role" required error={errors[`team_members.${index}.role`]}>
                                <input className="input w-full"
                                    value={member.role}
                                    onChange={e => updateMember(index, 'role', e.target.value)}
                                    placeholder="Lead Developer" />
                            </Field>

                            <Field label="Avatar URL (Optional)" error={errors[`team_members.${index}.avatar`]}>
                                <input className="input w-full"
                                    value={member.avatar}
                                    onChange={e => updateMember(index, 'avatar', e.target.value)}
                                    placeholder="https://..." />
                            </Field>

                            <Field label="Profile Description" error={errors[`team_members.${index}.description`]}>
                                <textarea
                                    rows={3}
                                    className="input w-full resize-none"
                                    value={member.description ?? ''}
                                    onChange={e => updateMember(index, 'description', e.target.value)}
                                    placeholder="Short member bio shown on About page"
                                />
                            </Field>

                            <Field label="Upload Profile Image" error={errors[`team_members.${index}.avatar_file`]}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="input w-full file:mr-3 file:rounded-md file:border-0 file:bg-brand-500 file:px-3 file:py-1.5 file:text-xs file:font-semibold file:text-white hover:file:bg-brand-600"
                                    onChange={(e) => updateMember(index, 'avatar_file', e.target.files?.[0] ?? null)}
                                />
                                <p className="mt-1 text-xs text-text-muted">
                                    Upload an image file, or keep using Avatar URL.
                                </p>
                            </Field>

                            <div className="md:col-span-2 rounded-lg border border-[#1a4445] bg-[#0a2a2b] p-4">
                                <p className="text-sm font-medium text-text-primary">Social Profiles</p>
                                <p className="text-xs text-text-muted mt-1">Add one or more profile links. Icons are shown automatically on the website.</p>
                                <div className="grid md:grid-cols-2 gap-3 mt-3">
                                    {TEAM_SOCIAL_FIELDS.map((field) => (
                                        <Field
                                            key={field.key}
                                            label={field.label}
                                            error={errors[`team_members.${index}.social_links.${field.key}`]}
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="w-10 h-10 rounded-lg border border-[#1a4445] text-accent-500 flex items-center justify-center shrink-0">
                                                    {renderSocialIcon(field.key, field.Icon)}
                                                </span>
                                                <input
                                                    type="url"
                                                    className="input w-full"
                                                    value={member.social_links?.[field.key] ?? ''}
                                                    onChange={(e) => updateMemberSocial(index, field.key, e.target.value)}
                                                    placeholder={field.placeholder}
                                                />
                                            </div>
                                        </Field>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {(member.avatar || member.avatar_file) && (
                            <div className="pt-2">
                                <p className="text-xs text-text-secondary mb-2">Preview</p>
                                {member.avatar && (
                                    <img
                                        src={member.avatar}
                                        alt={member.name || `Team member ${index + 1}`}
                                        className="w-16 h-16 rounded-full object-cover ring-2 ring-accent-500/30"
                                    />
                                )}
                                {member.avatar_file instanceof File && (
                                    <p className="text-xs text-brand-300 mt-2">
                                        Selected file: {member.avatar_file.name}
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-center border-t border-[#1a4445] pt-4">
                <button
                    type="button"
                    onClick={addMember}
                    className="btn-secondary text-sm"
                >
                    Add Team Member
                </button>
                <button type="submit" disabled={processing}
                    className="btn-primary inline-flex items-center gap-2 px-6 py-2.5 text-sm font-medium">
                    <Save size={15} />
                    {processing ? 'Saving…' : 'Save Team Settings'}
                </button>
            </div>
        </form>
    );
}

function ServicesTab({ settings }) {
    const flash = usePage().props.flash ?? {};
    const { data, setData, post, processing, errors } = useForm({
        services: getServices(settings).map((service) => ({
            key: service.key,
            title: service.title,
            description: service.description,
            features: service.features,
            noteLabel: service.noteLabel,
            noteText: service.noteText,
        })),
    });

    const updateService = (index, field, value) => {
        setData('services', data.services.map((service, i) => (
            i === index ? { ...service, [field]: value } : service
        )));
    };

    return (
        <form onSubmit={e => { e.preventDefault(); post(route('admin.settings.services.update')); }}
            className="space-y-5">
            <FlashSuccess message={flash.success} />

            <div className="space-y-4">
                {data.services.map((service, index) => (
                    <div key={service.key} className="rounded-xl border border-[#1a4445] bg-[#071f20] p-4 space-y-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-text-primary">{service.title}</p>
                            <span className="text-[11px] uppercase tracking-wider text-text-muted">{service.key}</span>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                            <Field label="Service Title" required error={errors[`services.${index}.title`]}>
                                <input className="input w-full"
                                    value={service.title}
                                    onChange={e => updateService(index, 'title', e.target.value)}
                                    placeholder="Service title" />
                            </Field>

                            <Field label="Description" required error={errors[`services.${index}.description`]}>
                                <input className="input w-full"
                                    value={service.description}
                                    onChange={e => updateService(index, 'description', e.target.value)}
                                    placeholder="Short service description" />
                            </Field>

                            <Field label="Note Label" error={errors[`services.${index}.noteLabel`]}>
                                <input className="input w-full"
                                    value={service.noteLabel}
                                    onChange={e => updateService(index, 'noteLabel', e.target.value)}
                                    placeholder="Perfect for / Benefit" />
                            </Field>

                            <Field label="Note Text" error={errors[`services.${index}.noteText`]}>
                                <input className="input w-full"
                                    value={service.noteText}
                                    onChange={e => updateService(index, 'noteText', e.target.value)}
                                    placeholder="Optional supporting note" />
                            </Field>
                        </div>

                        <Field
                            label="Features (one per line)"
                            required
                            error={errors[`services.${index}.features`] || errors[`services.${index}.features.0`]}
                        >
                            <textarea
                                rows={5}
                                className="input w-full resize-y"
                                value={service.features.join('\n')}
                                onChange={e => updateService(
                                    index,
                                    'features',
                                    e.target.value
                                        .split('\n')
                                        .map(line => line.trim())
                                        .filter(Boolean),
                                )}
                                placeholder="Feature one&#10;Feature two"
                            />
                        </Field>
                    </div>
                ))}
            </div>

            <SaveBar processing={processing} label="Save Services Settings" />
        </form>
    );
}

/* ──────────────────────────────────────────────────────────────── */
/* PAGE                                                             */
/* ──────────────────────────────────────────────────────────────── */

export default function SettingsIndex({ settings = {}, socials = {} }) {
    const [activeTab, setActiveTab] = useState('general');

    const panels = {
        general: <GeneralTab settings={settings} />,
        contact: <ContactTab settings={settings} />,
        seo: <SeoTab settings={settings} />,
        social: <SocialTab socials={socials} />,
        team: <TeamTab settings={settings} />,
        services: <ServicesTab settings={settings} />,
    };

    return (
        <AdminLayout title="Site Settings">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Header */}
                <div>
                    <h1 className="text-2xl font-bold text-text-primary">Website Settings</h1>
                    <p className="mt-1 text-sm text-text-secondary">
                        Manage brand identity, contact info, legal links, SEO defaults, social profiles, team members, and public services.
                    </p>
                </div>

                {/* Tab bar */}
                <div className="flex gap-1 p-1 rounded-xl bg-[#0a2e2f] border border-[#1a4445]">
                    {TABS.map(({ key, label, Icon }) => (
                        <button key={key} type="button"
                            onClick={() => setActiveTab(key)}
                            className={[
                                'flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg text-sm font-medium transition-all',
                                activeTab === key
                                    ? 'bg-accent-500 text-white shadow'
                                    : 'text-text-secondary hover:text-text-primary hover:bg-[#163537]',
                            ].join(' ')}>
                            <Icon size={15} />
                            <span className="hidden sm:inline">{label}</span>
                        </button>
                    ))}
                </div>

                {/* Tab content */}
                <div className="card p-6">
                    {panels[activeTab]}
                </div>
            </div>
        </AdminLayout>
    );
}
