export const DEFAULT_TEAM_MEMBERS = [
    {
        name: 'Alex Johnson',
        role: 'Founder & Lead Developer',
        description: 'Leads engineering strategy and architecture for client projects.',
        social_links: {
            linkedin: '',
            github: '',
            twitter: '',
            instagram: '',
            facebook: '',
            youtube: '',
            tiktok: '',
            whatsapp: '',
            website: '',
        },
        avatar: 'https://api.dicebear.com/8.x/initials/svg?seed=AJ',
    },
    {
        name: 'Sara Lee',
        role: 'UI/UX Designer',
        description: 'Designs intuitive interfaces and brand-consistent digital experiences.',
        social_links: {
            linkedin: '',
            github: '',
            twitter: '',
            instagram: '',
            facebook: '',
            youtube: '',
            tiktok: '',
            whatsapp: '',
            website: '',
        },
        avatar: 'https://api.dicebear.com/8.x/initials/svg?seed=SL',
    },
    {
        name: 'Omar Khalil',
        role: 'Backend Engineer',
        description: 'Builds secure APIs, integrations, and scalable backend services.',
        social_links: {
            linkedin: '',
            github: '',
            twitter: '',
            instagram: '',
            facebook: '',
            youtube: '',
            tiktok: '',
            whatsapp: '',
            website: '',
        },
        avatar: 'https://api.dicebear.com/8.x/initials/svg?seed=OK',
    },
    {
        name: 'Maria Santos',
        role: 'Project Manager',
        description: 'Coordinates delivery timelines and ensures successful execution.',
        social_links: {
            linkedin: '',
            github: '',
            twitter: '',
            instagram: '',
            facebook: '',
            youtube: '',
            tiktok: '',
            whatsapp: '',
            website: '',
        },
        avatar: 'https://api.dicebear.com/8.x/initials/svg?seed=MS',
    },
];

const TEAM_SOCIAL_KEYS = [
    'linkedin',
    'github',
    'twitter',
    'instagram',
    'facebook',
    'youtube',
    'tiktok',
    'whatsapp',
    'website',
];

export const DEFAULT_SERVICES = [
    {
        key: 'erp-odoo',
        title: 'ERP Solutions with Odoo ERP',
        headline: 'Streamline Operations with Odoo ERP',
        description: 'We implement and customize powerful ERP systems to streamline your business operations.',
        features: [
            'Odoo installation & setup',
            'Module customization (Sales, HR, Accounting, Inventory)',
            'Odoo 18 deployment & configuration',
            'Integration with third-party systems',
            'User training & support',
        ],
        noteLabel: 'Perfect for',
        noteText: 'Businesses, schools, hospitals, and organizations',
        cta: 'Start Your ERP Project',
        accent: 'brand',
        routeName: 'services.erp-odoo',
    },
    {
        key: 'mobile-flutter',
        title: 'Mobile App Development with Flutter',
        headline: 'One App for Android and iOS',
        description: 'We build high-performance mobile apps using modern cross-platform technology.',
        features: [
            'Android & iOS apps from a single codebase',
            'Fast and responsive UI',
            'API integration (PHP, Laravel, Odoo)',
            'Custom business apps',
        ],
        noteLabel: 'Benefit',
        noteText: 'One app works on both Android & iOS',
        cta: 'Build Your Mobile App',
        accent: 'accent',
        routeName: 'services.mobile-flutter',
    },
    {
        key: 'web-development',
        title: 'Web Development',
        headline: 'Responsive and Secure Web Solutions',
        description: 'We create responsive and secure websites and systems.',
        features: [
            'Company websites',
            'Web applications (PHP, Laravel)',
            'Admin dashboards',
            'System integrations',
        ],
        noteLabel: '',
        noteText: '',
        cta: 'Start a Web Project',
        accent: 'brand',
        routeName: 'services.web-development',
    },
    {
        key: 'cybersecurity',
        title: 'Cybersecurity Solutions',
        headline: 'Protect Systems from Threats',
        description: 'Protect your systems from threats and vulnerabilities.',
        features: [
            'Security testing & audits',
            'System hardening',
            'Data protection strategies',
        ],
        noteLabel: '',
        noteText: '',
        cta: 'Secure Your Systems',
        accent: 'accent',
        routeName: 'services.cybersecurity',
    },
    {
        key: 'database-management',
        title: 'Database Design & Management',
        headline: 'Reliable Data Architecture',
        description: 'Efficient and secure data handling solutions.',
        features: [
            'MySQL database design',
            'Optimization & backup',
            'Data migration',
        ],
        noteLabel: '',
        noteText: '',
        cta: 'Optimize Your Database',
        accent: 'brand',
        routeName: 'services.database-management',
    },
    {
        key: 'custom-software',
        title: 'Custom Software Development',
        headline: 'Tailor-Made Business Systems',
        description: 'Tailor-made systems to fit your business needs.',
        features: [
            'School Management Systems',
            'Hospital Systems',
            'Inventory & POS Systems',
        ],
        noteLabel: '',
        noteText: '',
        cta: 'Build Custom Software',
        accent: 'accent',
        routeName: 'services.custom-software',
    },
    {
        key: 'ui-ux-graphic-design',
        title: 'UI/UX & Graphic Design',
        headline: 'Design That Users Love',
        description: 'We design clean, modern, and user-friendly interfaces.',
        features: [
            'Mobile & web UI design',
            'Branding & graphics',
            'User experience optimization',
        ],
        noteLabel: '',
        noteText: '',
        cta: 'Design with Us',
        accent: 'brand',
        routeName: 'services.ui-ux-graphic-design',
    },
];

function parseJsonArray(value) {
    if (typeof value !== 'string' || value.trim() === '') {
        return null;
    }

    try {
        const parsed = JSON.parse(value);
        return Array.isArray(parsed) ? parsed : null;
    } catch {
        return null;
    }
}

function toCleanString(value) {
    if (typeof value !== 'string') return '';
    return value.trim();
}

function normalizeAvatarUrl(value) {
    const avatar = toCleanString(value);

    if (!avatar) return '';
    if (avatar.startsWith('data:')) {
        return avatar;
    }

    if (avatar.startsWith('http://') || avatar.startsWith('https://')) {
        try {
            const parsed = new URL(avatar);
            const path = parsed.pathname || '';

            if (path.startsWith('/uploads/')) {
                return path;
            }

            if (path.startsWith('/media/')) {
                return `/uploads/${path.replace(/^\/media\//, '')}`;
            }

            if (path.startsWith('/storage/')) {
                return `/uploads/${path.replace(/^\/storage\//, '')}`;
            }
        } catch {
            return avatar;
        }

        return avatar;
    }

    if (avatar.startsWith('/uploads/')) {
        return avatar;
    }

    if (avatar.startsWith('/media/')) {
        return `/uploads/${avatar.replace(/^\/media\//, '')}`;
    }

    if (avatar.startsWith('/storage/')) {
        return `/uploads/${avatar.replace(/^\/storage\//, '')}`;
    }

    if (avatar.startsWith('storage/')) {
        return `/uploads/${avatar.replace(/^storage\//, '')}`;
    }

    if (avatar.startsWith('uploads/')) {
        return `/${avatar}`;
    }

    return `/uploads/${avatar.replace(/^\/+/, '')}`;
}

function normalizeSocialLinks(member) {
    const links = {};
    const candidate = member?.social_links;

    if (candidate && typeof candidate === 'object' && !Array.isArray(candidate)) {
        TEAM_SOCIAL_KEYS.forEach((platform) => {
            const url = toCleanString(candidate[platform]);
            if (url) {
                links[platform] = url;
            }
        });
    }

    const legacyUrl = toCleanString(member?.social_link);
    if (legacyUrl && !links.website) {
        links.website = legacyUrl;
    }

    return links;
}

export function getTeamMembers(siteSettings = {}) {
    const parsed = parseJsonArray(siteSettings.team_members_json);
    if (!parsed || parsed.length === 0) {
        return DEFAULT_TEAM_MEMBERS;
    }

    const members = parsed
        .map((member, index) => {
            const fallback = DEFAULT_TEAM_MEMBERS[index % DEFAULT_TEAM_MEMBERS.length];
            const name = toCleanString(member?.name) || fallback.name;
            const role = toCleanString(member?.role) || fallback.role;
            const description = Object.prototype.hasOwnProperty.call(member ?? {}, 'description')
                ? toCleanString(member?.description)
                : fallback.description;
            const social_links = normalizeSocialLinks(member);
            const avatar = normalizeAvatarUrl(member?.avatar) || fallback.avatar;
            return { name, role, description, social_links, avatar };
        })
        .filter((member) => member.name && member.role);

    return members.length > 0 ? members : DEFAULT_TEAM_MEMBERS;
}

export function getServices(siteSettings = {}) {
    const parsed = parseJsonArray(siteSettings.services_json);
    if (!parsed || parsed.length === 0) {
        return DEFAULT_SERVICES;
    }

    const overrideByKey = new Map(
        parsed
            .map((service) => [toCleanString(service?.key), service])
            .filter(([key]) => key !== ''),
    );

    return DEFAULT_SERVICES.map((service) => {
        const override = overrideByKey.get(service.key);
        if (!override) return service;

        const features = Array.isArray(override.features)
            ? override.features.map((feature) => toCleanString(feature)).filter(Boolean)
            : [];

        return {
            ...service,
            title: toCleanString(override.title) || service.title,
            description: toCleanString(override.description) || service.description,
            features: features.length > 0 ? features : service.features,
            noteLabel: toCleanString(override.noteLabel) || service.noteLabel,
            noteText: toCleanString(override.noteText) || service.noteText,
        };
    });
}

export function getServiceByKey(siteSettings = {}, key) {
    const services = getServices(siteSettings);
    return services.find((service) => service.key === key) || DEFAULT_SERVICES.find((service) => service.key === key) || DEFAULT_SERVICES[0];
}
