import { Link, usePage } from '@inertiajs/react';
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Github, Mail, Phone, MapPin, Clock3 } from 'lucide-react';

const SOCIAL_META = {
    facebook: { label: 'Facebook', Icon: Facebook, color: '#1877F2' },
    twitter: { label: 'Twitter/X', Icon: Twitter, color: '#1D9BF0' },
    instagram: { label: 'Instagram', Icon: Instagram, color: '#E4405F' },
    linkedin: { label: 'LinkedIn', Icon: Linkedin, color: '#0A66C2' },
    youtube: { label: 'YouTube', Icon: Youtube, color: '#FF0000' },
    github: { label: 'GitHub', Icon: Github, color: '#181717' },
    tiktok: { label: 'TikTok', Icon: null, color: '#111111' },
    whatsapp: { label: 'WhatsApp', Icon: null, color: '#25D366' },
};

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

export default function Footer() {
    const { socialLinks = {}, siteSettings = {} } = usePage().props;
    const activeSocials = Object.entries(socialLinks).filter(([, url]) => url);

    const siteName = siteSettings.site_name || 'CodeUnion Software';
    const siteTagline = siteSettings.site_tagline || 'We build modern web solutions powered by AI, crafted for growth.';
    const contactEmail = siteSettings.contact_email || 'hello@codeunion.dev';
    const contactPhone = siteSettings.contact_phone || '+1 (555) 000-0000';
    const contactAddress = siteSettings.contact_address || 'Remote - Worldwide';
    const businessHours = siteSettings.business_hours || 'Mon-Fri, 9:00 AM - 6:00 PM';
    const privacyPolicyUrl = siteSettings.privacy_policy_url?.trim();
    const termsUrl = siteSettings.terms_of_service_url?.trim();
    const resolvedPrivacyUrl = privacyPolicyUrl && privacyPolicyUrl !== '#' ? privacyPolicyUrl : route('privacy-policy');
    const resolvedTermsUrl = termsUrl && termsUrl !== '#' ? termsUrl : route('terms-of-service');
    const privacyIsExternal = /^https?:\/\//i.test(resolvedPrivacyUrl);
    const termsIsExternal = /^https?:\/\//i.test(resolvedTermsUrl);
    const footerCopyright = siteSettings.footer_copyright || 'All rights reserved.';

    return (
        <footer className="bg-[#0a2e2f] text-text-secondary py-16 border-t border-[#1a4445]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    <div className="md:col-span-1 flex flex-col items-center md:items-start text-center md:text-left">
                        <img
                            src="/images/logo.png"
                            alt={siteName}
                            className="h-14 sm:h-16 w-auto object-contain"
                        />
                        <p className="mt-3 text-sm leading-relaxed">{siteTagline}</p>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href={route('about')} className="hover:text-text-primary transition-colors">About Us</Link></li>
                            <li><Link href={route('services')} className="hover:text-text-primary transition-colors">Services</Link></li>
                            <li><Link href={route('portfolio.index')} className="hover:text-text-primary transition-colors">Portfolio</Link></li>
                            <li><Link href={route('contact')} className="hover:text-text-primary transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">Resources</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href={route('blog.index')} className="hover:text-text-primary transition-colors">Blog</Link></li>
                            <li><Link href={route('login')} className="hover:text-text-primary transition-colors">Client Portal</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">Contact</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href={`mailto:${contactEmail}`} className="inline-flex items-center gap-2 hover:text-text-primary transition-colors">
                                    <Mail size={14} />
                                    {contactEmail}
                                </a>
                            </li>
                            <li>
                                <a href={`tel:${contactPhone.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 hover:text-text-primary transition-colors">
                                    <Phone size={14} />
                                    {contactPhone}
                                </a>
                            </li>
                            <li className="inline-flex items-start gap-2">
                                <MapPin size={14} className="mt-0.5" />
                                <span>{contactAddress}</span>
                            </li>
                            <li className="inline-flex items-start gap-2">
                                <Clock3 size={14} className="mt-0.5" />
                                <span>{businessHours}</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {activeSocials.length > 0 && (
                    <div className="border-t border-[#1a4445] pt-8 mb-8 flex flex-col items-center gap-4">
                        <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary">Follow Us</p>
                        <div className="flex flex-wrap justify-center gap-3">
                            {activeSocials.map(([key, url]) => {
                                const meta = SOCIAL_META[key];
                                if (!meta || !url) return null;
                                const { label, Icon, color } = meta;
                                return (
                                    <a
                                        key={key}
                                        href={url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={label}
                                        title={label}
                                        className="group/social relative flex h-11 w-11 items-center justify-center rounded-xl border transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:shadow-lg focus-visible:outline-none"
                                        style={{
                                            '--brand': color,
                                            color: color,
                                            borderColor: `${color}40`,
                                            backgroundColor: `${color}0A`,
                                        }}
                                        onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = color; e.currentTarget.style.borderColor = color; e.currentTarget.style.color = '#fff'; e.currentTarget.style.boxShadow = `0 8px 24px ${color}55`; }}
                                        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = `${color}0A`; e.currentTarget.style.borderColor = `${color}40`; e.currentTarget.style.color = color; e.currentTarget.style.boxShadow = 'none'; }}
                                    >
                                        <span
                                            className="pointer-events-none absolute -top-10 left-1/2 z-10 -translate-x-1/2 rounded-md px-2.5 py-1 text-[10px] font-semibold tracking-wide opacity-0 transition-all duration-200 group-hover/social:-translate-y-1 group-hover/social:opacity-100"
                                            style={{
                                                color: '#fff',
                                                backgroundColor: color,
                                                boxShadow: `0 4px 12px ${color}44`,
                                            }}
                                        >
                                            {label}
                                        </span>
                                        {Icon ? (
                                            <Icon size={18} />
                                        ) : key === 'tiktok' ? (
                                            <TikTokIcon size={18} />
                                        ) : (
                                            <WhatsAppIcon size={18} />
                                        )}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                )}

                <div className="border-t border-[#1a4445] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-secondary text-center sm:text-left">
                    <p>
                        &copy; {new Date().getFullYear()} {siteName}. {footerCopyright}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                        <a
                            href={resolvedPrivacyUrl}
                            target={privacyIsExternal ? '_blank' : undefined}
                            rel={privacyIsExternal ? 'noopener noreferrer' : undefined}
                            className="hover:text-text-primary transition-colors"
                        >
                            Privacy Policy
                        </a>
                        <a
                            href={resolvedTermsUrl}
                            target={termsIsExternal ? '_blank' : undefined}
                            rel={termsIsExternal ? 'noopener noreferrer' : undefined}
                            className="hover:text-text-primary transition-colors"
                        >
                            Terms of Service
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
