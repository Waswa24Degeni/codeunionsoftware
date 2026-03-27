import { useState, useEffect, useCallback } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import WebsiteLayout from '@/Layouts/WebsiteLayout';
import {
    ArrowRight,
    ChevronLeft,
    ChevronRight,
    Building2,
    Smartphone,
    Globe,
    ShieldCheck,
    Database,
    Settings2,
    Palette,
    Facebook,
    Instagram,
    Twitter,
    Linkedin,
    Play,
    Monitor,
    Lightbulb,
    Sparkles,
} from 'lucide-react';
import { getServices } from '@/lib/siteContent';

const SERVICE_ICONS = {
    'erp-odoo': Building2,
    'mobile-flutter': Smartphone,
    'web-development': Globe,
    cybersecurity: ShieldCheck,
    'database-management': Database,
    'custom-software': Settings2,
    'ui-ux-graphic-design': Palette,
};

const HERO_SOCIAL_META = {
    facebook: { label: 'Facebook', Icon: Facebook, color: '#1877F2' },
    instagram: { label: 'Instagram', Icon: Instagram, color: '#E4405F' },
    twitter: { label: 'Twitter/X', Icon: Twitter, color: '#1D9BF0' },
    linkedin: { label: 'LinkedIn', Icon: Linkedin, color: '#0A66C2' },
};

function HeroSocialLinks({ socialLinks = {} }) {
    const links = Object.entries(HERO_SOCIAL_META)
        .map(([key, meta]) => ({ ...meta, url: socialLinks?.[key] }))
        .filter((item) => typeof item.url === 'string' && item.url.trim() !== '');

    if (links.length === 0) {
        return null;
    }

    return (
        <div className="flex flex-wrap items-center gap-2.5">
            {links.map(({ label, Icon, color, url }) => (
                <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/social relative inline-flex h-9 w-9 items-center justify-center rounded-xl border transition-all duration-300 hover:-translate-y-0.5 hover:scale-110 hover:shadow-lg"
                    style={{
                        color,
                        borderColor: `${color}40`,
                        backgroundColor: `${color}0A`,
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = color; e.currentTarget.style.borderColor = color; e.currentTarget.style.color = '#fff'; e.currentTarget.style.boxShadow = `0 6px 20px ${color}55`; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = `${color}0A`; e.currentTarget.style.borderColor = `${color}40`; e.currentTarget.style.color = color; e.currentTarget.style.boxShadow = 'none'; }}
                    aria-label={label}
                >
                    <Icon size={15} />
                    <span
                        className="pointer-events-none absolute -top-9 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md px-2.5 py-1 text-[10px] font-semibold opacity-0 transition-all duration-200 group-hover/social:-translate-y-0.5 group-hover/social:opacity-100"
                        style={{
                            color: '#fff',
                            backgroundColor: color,
                            boxShadow: `0 4px 12px ${color}44`,
                        }}
                    >
                        {label}
                    </span>
                </a>
            ))}
        </div>
    );
}

/* ── Carousel hero ───────────────────────────────────────────────────── */
function ServiceCarousel({ services, socialLinks }) {
    const [active, setActive] = useState(0);
    const [animating, setAnimating] = useState(false);

    const go = useCallback((next) => {
        if (animating) return;
        setAnimating(true);
        setTimeout(() => {
            setActive((next + services.length) % services.length);
            setAnimating(false);
        }, 280);
    }, [animating, services.length]);

    const prev = () => go(active - 1);
    const next = () => go(active + 1);

    useEffect(() => {
        const t = setInterval(() => go(active + 1), 5000);
        return () => clearInterval(t);
    }, [active, go]);

    const s = services[active];
    const ActiveIcon = s.icon;
    const isOrange = s.accent === 'brand';

    return (
        <section className="relative overflow-hidden min-h-[84vh] sm:min-h-[92vh] flex flex-col bg-gradient-to-br from-[#021B1C] via-[#062728] to-[#0a2e2f]">

            {/* ── Decorative backdrop inspired by reference ───────────────── */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute inset-y-0 right-[-18%] w-[92%] sm:right-[-16%] sm:w-[74%] lg:right-[-14%] lg:w-[65%] origin-right -skew-x-[20deg] bg-gradient-to-br from-accent-500/20 via-accent-500/8 to-brand-500/16" />
                <div className={`absolute -top-24 right-[-5rem] h-64 w-64 sm:right-[-7rem] sm:h-[28rem] sm:w-[28rem] rounded-full blur-3xl ${isOrange ? 'bg-brand-500/20' : 'bg-accent-500/22'}`} />
                <div className="absolute bottom-[-6rem] left-[-5rem] h-[20rem] w-[20rem] rounded-full bg-accent-500/10 blur-3xl" />

                {/* Circuit-like line layer */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="hero-grid" x="0" y="0" width="56" height="56" patternUnits="userSpaceOnUse">
                            <path d="M56 0H0V56" fill="none" stroke="white" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#hero-grid)" />
                </svg>

                <svg className="absolute left-[-8%] top-[14%] hidden h-64 w-64 opacity-30 sm:block" viewBox="0 0 240 240" fill="none">
                    <circle cx="120" cy="120" r="90" stroke="#00ADB5" strokeOpacity="0.34" strokeWidth="1.5" />
                    <circle cx="120" cy="120" r="65" stroke="#00ADB5" strokeOpacity="0.26" strokeWidth="1.5" />
                    <circle cx="120" cy="120" r="36" stroke="#00ADB5" strokeOpacity="0.20" strokeWidth="1.5" />
                </svg>
            </div>

            {/* ── Slide content ────────────────────────────────────────────── */}
            <div className={`relative z-10 flex flex-1 items-center transition-opacity duration-300 ${animating ? 'opacity-0' : 'opacity-100'}`}>
                <div className="container mx-auto px-4 sm:px-8 py-14 sm:py-20 lg:py-24">
                    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">

                        {/* Left — Text */}
                        <div className="space-y-6 sm:space-y-7">
                            <HeroSocialLinks socialLinks={socialLinks} />

                            <p className={`text-[11px] font-bold uppercase tracking-[0.3em] sm:text-xs sm:tracking-[0.35em] ${isOrange ? 'text-brand-400' : 'text-accent-400'}`}>
                                • {s.label} •
                            </p>
                            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight">
                                {s.headline.split(' ').slice(0, -1).join(' ')}{' '}
                                <span className={isOrange ? 'text-brand-400' : 'text-accent-400'}>
                                    {s.headline.split(' ').slice(-1).join(' ')}
                                </span>
                            </h1>
                            <p className="max-w-lg text-base leading-relaxed text-text-secondary sm:text-lg">
                                {s.description}
                            </p>
                            <div className="flex flex-col items-stretch gap-3 pt-2 sm:flex-row sm:items-center sm:gap-4">
                                <Link
                                    href={route('contact')}
                                    className={`inline-flex w-full items-center justify-center gap-2 rounded-lg px-7 py-3.5 text-sm font-semibold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-xl sm:w-auto sm:hover:scale-[1.04] ${isOrange ? 'bg-brand-500 hover:bg-brand-600 shadow-brand-500/30' : 'bg-accent-500 hover:bg-accent-600 shadow-accent-500/30'}`}
                                >
                                    {s.cta} <ArrowRight size={16} />
                                </Link>
                                <div className="inline-flex items-center gap-3">
                                    <Link
                                        href={route('services')}
                                        className="group inline-flex h-12 w-12 items-center justify-center rounded-full border border-accent-500/55 bg-accent-500/14 text-accent-300 shadow-[0_0_14px_rgba(0,173,181,0.28)] transition-all duration-300 hover:scale-110 hover:text-white hover:shadow-[0_0_24px_rgba(0,173,181,0.45)]"
                                        aria-label="Explore Services"
                                    >
                                        <Play size={15} className="ml-0.5" />
                                    </Link>
                                    <p className="text-sm text-text-secondary">Explore Services</p>
                                </div>
                            </div>
                        </div>

                        {/* Right — non-image tech illustration */}
                        <div className="hidden lg:flex items-center justify-center">
                            <div className="relative h-[430px] w-[520px]">
                                <div className={`absolute left-1/2 top-[42%] h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl ${isOrange ? 'bg-brand-500/28' : 'bg-accent-500/28'}`} />

                                <div className="absolute bottom-10 right-2 h-44 w-[320px] rounded-2xl border border-[#1a4445] bg-[#0a2e2f]/85 shadow-2xl">
                                    <div className="h-8 rounded-t-2xl border-b border-[#1a4445] bg-[#0d3536]/85" />
                                    <div className="grid grid-cols-2 gap-3 p-4">
                                        <div className="h-16 rounded-lg bg-accent-500/12" />
                                        <div className="h-16 rounded-lg bg-brand-500/12" />
                                        <div className="h-16 rounded-lg bg-accent-500/10" />
                                        <div className="h-16 rounded-lg bg-[#143b3c]" />
                                    </div>
                                </div>

                                <div className="absolute bottom-[195px] left-[210px] h-40 w-12 rounded-full bg-gradient-to-b from-accent-400/90 via-accent-500/60 to-transparent" />

                                <div className="absolute bottom-[312px] left-[190px] flex h-24 w-24 items-center justify-center rounded-full border border-accent-400/45 bg-[#0b3032] shadow-[0_0_36px_rgba(0,173,181,0.35)]">
                                    <Lightbulb className="text-accent-300" size={40} strokeWidth={1.6} />
                                </div>

                                <div className="absolute bottom-[236px] left-[108px] flex h-16 w-16 items-center justify-center rounded-2xl border border-brand-500/40 bg-brand-500/14 shadow-[0_0_20px_rgba(255,122,24,0.32)]">
                                    <Sparkles size={26} className="text-brand-400" />
                                </div>

                                <div className="absolute bottom-[250px] right-[50px] flex h-16 w-16 items-center justify-center rounded-2xl border border-accent-500/45 bg-accent-500/14 shadow-[0_0_20px_rgba(0,173,181,0.30)]">
                                    <Monitor size={26} className="text-accent-300" />
                                </div>

                                <div className="absolute bottom-[150px] left-[202px] flex h-20 w-20 items-center justify-center rounded-full border border-[#1a4445] bg-[#0f3436]">
                                    <ActiveIcon size={34} className={isOrange ? 'text-brand-400' : 'text-accent-400'} strokeWidth={1.6} />
                                </div>

                                <div className="absolute bottom-[112px] left-[152px] rounded-full border border-[#1a4445] bg-[#082c2d] px-3 py-1.5 text-[11px] text-text-secondary">
                                    Scalable
                                </div>
                                <div className="absolute bottom-[112px] left-[258px] rounded-full border border-[#1a4445] bg-[#082c2d] px-3 py-1.5 text-[11px] text-text-secondary">
                                    Secure
                                </div>
                                <div className="absolute bottom-[80px] left-[208px] rounded-full border border-[#1a4445] bg-[#082c2d] px-3 py-1.5 text-[11px] text-text-secondary">
                                    Fast
                                </div>
                                <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs tracking-wide text-text-muted">
                                    {s.label}
                                    </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Controls bar ─────────────────────────────────────────────── */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-t border-[#1a4445] bg-[#0a2e2f]/55 px-4 py-4 backdrop-blur sm:gap-4 sm:px-8">

                {/* Dot indicators */}
                <div className="order-2 flex w-full items-center gap-2 sm:order-1 sm:w-auto">
                    {services.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => go(i)}
                            aria-label={`Go to slide ${i + 1}`}
                            className={`rounded-full transition-all duration-300 ${
                                i === active
                                    ? `w-7 h-2.5 ${isOrange ? 'bg-brand-500' : 'bg-accent-500'}`
                                    : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/40'
                            }`}
                        />
                    ))}
                </div>

                {/* Label */}
                <p className="order-3 hidden w-full select-none text-center text-xs uppercase tracking-widest text-text-muted md:block md:w-auto md:order-2">
                    {active + 1} / {services.length} — {s.label}
                </p>

                {/* Prev / Next */}
                <div className="order-1 ml-auto flex items-center gap-2 sm:order-3">
                    <button
                        onClick={prev}
                        aria-label="Previous"
                        className="w-9 h-9 rounded-lg border border-[#1a4445] flex items-center justify-center text-text-secondary hover:border-[#2a6667] hover:text-white transition-colors"
                    >
                        <ChevronLeft size={18} />
                    </button>
                    <button
                        onClick={next}
                        aria-label="Next"
                        className={`w-9 h-9 rounded-lg flex items-center justify-center text-white transition-colors ${isOrange ? 'bg-brand-500 hover:bg-brand-600' : 'bg-accent-500 hover:bg-accent-600'}`}
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </section>
    );
}

/* ── Page ─────────────────────────────────────────────────────────────── */
export default function Home({ featuredProjects, latestPosts }) {
    const { siteSettings = {}, socialLinks = {} } = usePage().props;
    const siteName = siteSettings.site_name || 'CodeUnion Software';
    const services = getServices(siteSettings).map((service) => ({
        ...service,
        icon: SERVICE_ICONS[service.key] ?? Globe,
        label: service.title,
    }));

    return (
        <WebsiteLayout>
            <Head title={`${siteName} - Web Development Agency`} />

            {/* ── Carousel CTA ─────────────────────────────────────────────── */}
            <ServiceCarousel services={services} socialLinks={socialLinks} />

            {/* ── Services Grid ─────────────────────────────────────────────── */}
            <section className="bg-[#021B1C] py-16 sm:py-20">
                <div className="container mx-auto px-4">
                    <div className="mb-12 sm:mb-16">
                        <p className="text-accent-400 text-sm uppercase tracking-widest font-semibold mb-3">
                            • SERVICES •
                        </p>
                        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                            <div>
                                <h2 className="mb-3 text-3xl font-bold text-text-primary sm:text-4xl">
                                    Services We Offer
                                </h2>
                                <p className="text-text-secondary max-w-xl">
                                    Comprehensive digital solutions tailored to your business goals and growth objectives.
                                </p>
                            </div>
                            <Link href={route('services')}
                                className="btn btn-secondary self-start sm:self-auto inline-flex items-center gap-2 shrink-0">
                                See All Services <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                        {services.map(({ icon: Icon, label, description, accent, routeName }) => (
                            <div key={label}
                                className="card p-6 group hover:border-accent-500/50 hover:bg-[#0f3a3c] transition-all border-[#1a4445]">
                                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-shadow ${accent === 'brand' ? 'bg-gradient-to-br from-brand-500 to-brand-600 group-hover:shadow-glow' : 'bg-gradient-to-br from-accent-500 to-accent-600 group-hover:shadow-glow-accent'}`}>
                                    <Icon size={24} className="text-white" />
                                </div>
                                <h3 className="text-lg font-semibold text-text-primary mb-2">{label}</h3>
                                <p className="text-text-secondary text-sm leading-relaxed">{description}</p>
                                <Link href={route(routeName)}
                                    className="inline-flex items-center gap-1.5 text-accent-400 hover:text-accent-300 text-sm font-medium mt-4">
                                    Read More <ArrowRight size={14} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Portfolio ─────────────────────────────────────────────────── */}
            {featuredProjects?.length > 0 && (
                <section className="bg-gradient-to-b from-[#021B1C] to-[#0c3d3f] py-16 sm:py-20">
                    <div className="container mx-auto px-4">
                        <div className="mb-10 text-center sm:mb-12">
                            <p className="text-accent-400 text-sm uppercase tracking-widest font-semibold mb-3">
                                • PORTFOLIO •
                            </p>
                            <h2 className="mb-3 text-3xl font-bold text-text-primary sm:text-4xl">
                                Featured Projects
                            </h2>
                            <p className="text-text-secondary max-w-xl mx-auto">
                                Check out some of our latest work and see how we help clients achieve their goals.
                            </p>
                        </div>

                        <div className="mb-8 grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
                            {featuredProjects.slice(0, 3).map((project) => (
                                <Link key={project.id} href={route('portfolio.show', project.slug)}
                                    className="card overflow-hidden group">
                                    {project.thumbnail && (
                                        <div className="relative overflow-hidden h-48">
                                            <img src={project.thumbnail} alt={project.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                                        </div>
                                    )}
                                    <div className="p-5">
                                        <p className="text-accent-400 text-xs uppercase tracking-wide font-semibold mb-1">
                                            {project.category}
                                        </p>
                                        <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent-400 transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-text-secondary text-sm mt-2 line-clamp-2">
                                            {project.excerpt}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="text-center">
                            <Link href={route('portfolio.index')}
                                className="btn btn-secondary inline-flex items-center gap-2">
                                View All Projects <ArrowRight size={16} />
                            </Link>
                        </div>
                    </div>
                </section>
            )}

            {/* ── Stats / Trust ─────────────────────────────────────────────── */}
            <section className="bg-[#021B1C] py-16 sm:py-20">
                <div className="container mx-auto px-4">
                    <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
                        <p className="text-accent-400 text-sm uppercase tracking-widest font-semibold mb-4">
                            • WHY CHOOSE US •
                        </p>
                        <h2 className="mb-4 text-3xl font-bold text-text-primary sm:text-4xl">
                            Trusted By Worldwide Clients
                        </h2>
                        <p className="text-base text-text-secondary sm:text-lg">
                            With over a decade of experience, we've helped hundreds of businesses transform their digital presence and achieve their goals.
                        </p>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                        {[
                            { number: '500+', label: 'Projects Delivered' },
                            { number: '200+', label: 'Happy Clients' },
                            { number: '50+',  label: 'Team Members' },
                            { number: '15+',  label: 'Years Experience' },
                        ].map((stat, i) => (
                            <div key={i} className="p-6 bg-gradient-to-br from-[#0a2e2f] to-[#051e1f] border border-[#1a4445] rounded-lg text-center hover:border-accent-500/50 transition-colors">
                                <div className="text-3xl font-bold text-brand-500 mb-2">{stat.number}</div>
                                <p className="text-text-secondary">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Bottom CTA (styled to match hero direction) ─────────────── */}
            <section className="relative overflow-hidden border-t border-[#1a4445] bg-[#081d2b] py-16 sm:py-24">
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute inset-y-0 right-[-18%] w-[62%] -skew-x-[22deg] bg-gradient-to-b from-accent-500/16 via-accent-500/10 to-brand-500/16" />
                    <div className="absolute -top-24 right-0 w-96 h-96 bg-brand-500/14 rounded-full blur-3xl" />
                    <div className="absolute bottom-[-80px] left-[-30px] w-80 h-80 bg-accent-500/14 rounded-full blur-3xl" />
                </div>
                <div className="relative container mx-auto px-4">
                    <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[1.2fr_0.8fr]">
                        <div>
                            <p className="text-accent-400 text-xs font-semibold uppercase tracking-[0.35em] mb-4">
                                • GET STARTED •
                            </p>
                            <h2 className="mb-5 text-3xl font-extrabold leading-tight text-white sm:text-5xl">
                                Build your next digital product with confidence
                            </h2>
                            <p className="max-w-2xl text-base leading-relaxed text-text-secondary sm:text-lg">
                                From first concept to production release, our team delivers secure and scalable systems aligned with your goals.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 lg:flex-col lg:items-stretch lg:justify-center">
                        <Link href={route('contact')}
                                className="btn btn-primary inline-flex w-full items-center justify-center gap-2 px-8 py-3.5 text-base sm:w-auto lg:w-full">
                                Start Your Project <ArrowRight size={18} />
                            </Link>
                            <Link href={route('about')}
                                className="btn inline-flex w-full items-center justify-center gap-2 border border-[#1a4445] px-8 py-3.5 text-base text-text-secondary transition-all hover:border-[#2a6667] hover:text-white sm:w-auto lg:w-full">
                                Learn More About Us
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </WebsiteLayout>
    );
}

