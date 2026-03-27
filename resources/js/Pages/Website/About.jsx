import { Head, usePage } from '@inertiajs/react';
import WebsiteLayout from '@/Layouts/WebsiteLayout';
import {
    Users,
    Zap,
    Shield,
    Award,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    Youtube,
    Github,
    Globe,
} from 'lucide-react';
import { getTeamMembers } from '@/lib/siteContent';

const SOCIAL_ICON_MAP = {
    linkedin: { label: 'LinkedIn', Icon: Linkedin, color: '#0A66C2' },
    github: { label: 'GitHub', Icon: Github, color: '#181717' },
    twitter: { label: 'Twitter', Icon: Twitter, color: '#1D9BF0' },
    instagram: { label: 'Instagram', Icon: Instagram, color: '#E4405F' },
    facebook: { label: 'Facebook', Icon: Facebook, color: '#1877F2' },
    youtube: { label: 'YouTube', Icon: Youtube, color: '#FF0000' },
    tiktok: { label: 'TikTok', Icon: null, color: '#111111' },
    whatsapp: { label: 'WhatsApp', Icon: null, color: '#25D366' },
    website: { label: 'Website', Icon: Globe, color: '#0EA5E9' },
};

function TikTokIcon({ size = 15 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.29 6.29 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.79 1.54V6.78a4.85 4.85 0 01-1.02-.09z" />
        </svg>
    );
}

function WhatsAppIcon({ size = 15 }) {
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.126.553 4.122 1.522 5.855L.057 23.943l6.236-1.638A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.374l-.36-.214-3.7.972.987-3.605-.234-.371A9.818 9.818 0 012.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z" />
        </svg>
    );
}

function TeamSocialLinks({ links = {} }) {
    const entries = Object.entries(links).filter(([, url]) => typeof url === 'string' && url.trim() !== '');
    if (entries.length === 0) return null;

    return (
        <div className="mt-4 flex items-center justify-center gap-2 flex-wrap">
            {entries.map(([platform, url]) => {
                const config = SOCIAL_ICON_MAP[platform] ?? SOCIAL_ICON_MAP.website;
                const Icon = config.Icon;
                const brandColor = config.color;
                const iconNode = platform === 'tiktok'
                    ? <TikTokIcon size={15} />
                    : platform === 'whatsapp'
                        ? <WhatsAppIcon size={15} />
                        : <Icon size={15} />;

                return (
                    <a
                        key={`${platform}-${url}`}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/social relative inline-flex items-center justify-center w-9 h-9 rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-lg"
                        style={{
                            color: brandColor,
                            borderColor: `${brandColor}40`,
                            backgroundColor: `${brandColor}0A`,
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = brandColor; e.currentTarget.style.borderColor = brandColor; e.currentTarget.style.color = '#fff'; e.currentTarget.style.boxShadow = `0 8px 24px ${brandColor}55`; }}
                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = `${brandColor}0A`; e.currentTarget.style.borderColor = `${brandColor}40`; e.currentTarget.style.color = brandColor; e.currentTarget.style.boxShadow = 'none'; }}
                        aria-label={config.label}
                    >
                        {iconNode}
                        <span
                            className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md px-2.5 py-1 text-[10px] font-semibold opacity-0 transition-all duration-200 group-hover/social:-translate-y-0.5 group-hover/social:opacity-100"
                            style={{
                                color: '#fff',
                                backgroundColor: brandColor,
                                boxShadow: `0 4px 12px ${brandColor}44`,
                            }}
                        >
                            {config.label}
                        </span>
                    </a>
                );
            })}
        </div>
    );
}

export default function About() {
    const { siteSettings = {} } = usePage().props;
    const siteName = siteSettings.site_name || 'CodeUnion Software';
    const team = getTeamMembers(siteSettings);

    const values = [
        { icon: Zap,    title: 'Performance First', desc: 'We build fast, optimized solutions that scale with your business needs.' },
        { icon: Shield, title: 'Security by Design', desc: 'Every line of code is written with security as a core consideration.' },
        { icon: Users,  title: 'Client Partnership', desc: 'We work alongside you as a true partner, not just a vendor.' },
        { icon: Award,  title: 'Quality Committed', desc: 'Rigorous testing and code reviews ensure production-ready deliverables.' },
    ];

    return (
        <WebsiteLayout>
            <Head title={`About Us - ${siteName}`} />

            {/* Hero */}
            <section className="py-20 bg-gradient-to-br from-[#021B1C] to-[#0c3d3f] text-center">
                <div className="container mx-auto px-4">
                    <p className="text-accent-400 text-sm uppercase tracking-widest font-semibold mb-4">• WHO WE ARE •</p>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-4">About {siteName}</h1>
                    <p className="text-lg text-text-secondary max-w-2xl mx-auto">
                        We're a passionate team of developers, designers, and strategists building digital solutions that matter.
                    </p>
                </div>
            </section>

            {/* Mission */}
            <section className="py-16 bg-[#021B1C]">
                <div className="container mx-auto px-4 max-w-3xl text-center">
                    <h2 className="text-3xl font-bold text-text-primary mb-4">Our Mission</h2>
                    <p className="text-text-secondary text-lg leading-relaxed">
                        At {siteName}, we unite technology and creativity to help businesses grow online. From beautiful
                        interfaces to robust backend systems, we deliver end-to-end digital solutions that are fast,
                        secure, and scalable.
                    </p>
                </div>
            </section>

            {/* Values */}
            <section className="py-16 bg-[#0a2e2f]">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-text-primary text-center mb-12">Our Values</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {values.map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="card p-6 text-center">
                                <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-brand-500/20 to-accent-500/20 flex items-center justify-center mb-4">
                                    <Icon size={22} className="text-accent-400" />
                                </div>
                                <h3 className="font-semibold text-text-primary mb-2">{title}</h3>
                                <p className="text-sm text-text-secondary">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team */}
            <section className="py-16 bg-[#021B1C]">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-text-primary text-center mb-12">Meet the Team</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        {team.map((member) => (
                            <div key={member.name} className="card p-6 text-center">
                                <img
                                    src={member.avatar}
                                    alt={member.name}
                                    onError={(event) => {
                                        event.currentTarget.onerror = null;
                                        event.currentTarget.src = `https://api.dicebear.com/8.x/initials/svg?seed=${encodeURIComponent(member.name)}`;
                                    }}
                                    className="w-16 h-16 rounded-full mx-auto mb-3 ring-2 ring-accent-500/30 object-cover"
                                />
                                <h3 className="font-semibold text-text-primary">{member.name}</h3>
                                <p className="text-sm text-accent-400">{member.role}</p>
                                {member.description && (
                                    <p className="text-xs text-text-secondary mt-3 leading-relaxed">{member.description}</p>
                                )}
                                <TeamSocialLinks links={member.social_links} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </WebsiteLayout>
    );
}
