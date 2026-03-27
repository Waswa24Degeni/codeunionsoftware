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
        image: 'https://www.erpcloudllc.com/web/image/34089-93e5ed3b/ODOO%20ERP.webp',
        image2: 'https://braintec.com/web/image/329752-2a85aa0d/Odoo-all-in-one-Dashboard',
        description: 'We architect and deploy enterprise-grade Odoo ERP systems that unify your sales, HR, accounting, inventory, and manufacturing workflows into a single platform — eliminating data silos and accelerating decision-making across your entire organization.',
        longDescription: 'Our certified Odoo consultants work alongside your team to map existing processes, identify automation opportunities, and deliver a tailored ERP environment that grows with your business. From initial gap analysis through go-live and beyond, we ensure minimal disruption and maximum ROI.',
        features: [
            'End-to-end Odoo installation, hosting & cloud deployment',
            'Module customization — Sales, HR, Accounting, Inventory, Manufacturing',
            'Odoo 18 migration, upgrade & performance tuning',
            'Third-party API integrations (payment gateways, shipping, CRM)',
            'Custom module development for unique business logic',
            'Staff training workshops & ongoing technical support',
        ],
        process: ['Discovery & Audit', 'Solution Design', 'Development & Config', 'Testing & QA', 'Go-Live & Training', 'Ongoing Support'],
        technologies: ['Odoo 18', 'Python', 'PostgreSQL', 'XML/QWeb', 'Docker', 'REST API'],
        noteLabel: 'Perfect for',
        noteText: 'Businesses, schools, hospitals, NGOs and government organizations seeking unified operations',
        cta: 'Start Your ERP Project',
        accent: 'brand',
        routeName: 'services.erp-odoo',
    },
    {
        key: 'mobile-flutter',
        title: 'Mobile App Development',
        headline: 'Native & Cross-Platform Mobile Solutions',
        image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&q=80',
        description: 'We build high-performance mobile applications using both cross-platform and native technologies — Flutter for rapid multi-platform delivery, plus Java, Kotlin, and Swift for projects demanding maximum platform-specific performance and deep OS integration.',
        longDescription: 'Our mobile engineers are fluent in the full spectrum of mobile development. For speed-to-market, we leverage Flutter\'s single-codebase approach. For performance-critical or hardware-intensive apps, we build natively with Java and Kotlin for Android and Swift for iOS. Every app we deliver is production-grade, with clean architecture, offline-first data layers, and seamless backend integrations.',
        features: [
            'Cross-platform Android & iOS with Flutter (single codebase)',
            'Native Android development with Java & Kotlin',
            'Native iOS development with Swift & SwiftUI',
            'REST & GraphQL API integration (Laravel, Node, Odoo)',
            'Push notifications, deep linking & analytics',
            'Offline-first architecture with local data sync',
            'App Store & Google Play submission & optimization',
        ],
        process: ['UX Research', 'UI Prototype', 'Sprint Development', 'QA & Testing', 'App Store Launch', 'Iteration & Updates'],
        technologies: ['Flutter', 'Dart', 'Java', 'Kotlin', 'Swift', 'Firebase', 'REST API', 'GraphQL'],
        noteLabel: 'Key Benefit',
        noteText: 'Choose cross-platform for speed or native for power — we deliver both with equal expertise',
        cta: 'Build Your Mobile App',
        accent: 'accent',
        routeName: 'services.mobile-flutter',
    },
    {
        key: 'web-development',
        title: 'Web Development',
        headline: 'Modern, Responsive Web Solutions',
        image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=800&q=80',
        description: 'We engineer fast, secure, and scalable web applications using battle-tested frameworks — from sleek corporate websites and SaaS platforms to complex admin dashboards and client portals that handle millions of requests.',
        longDescription: 'Our full-stack team specializes in Laravel, React, and modern deployment pipelines. We write clean, tested code backed by CI/CD, ensuring your application is maintainable, performant, and ready to scale from day one.',
        features: [
            'Corporate websites & landing pages with SEO optimization',
            'Full-stack SaaS application development',
            'Admin dashboards & client portals with role-based access',
            'E-commerce platforms with payment gateway integration',
            'Progressive Web Apps (PWA) for offline capabilities',
            'API development & third-party system integrations',
        ],
        process: ['Requirements', 'Architecture', 'Frontend & Backend', 'Integration Testing', 'Deployment', 'Monitoring'],
        technologies: ['Laravel', 'React', 'Inertia.js', 'Tailwind CSS', 'PostgreSQL', 'Docker'],
        noteLabel: 'Our Stack',
        noteText: 'Laravel + React + Tailwind — the same stack powering this very platform',
        cta: 'Start a Web Project',
        accent: 'brand',
        routeName: 'services.web-development',
    },
    {
        key: 'cybersecurity',
        title: 'Cybersecurity Solutions',
        headline: 'Protect, Detect, Respond',
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&q=80',
        description: 'We safeguard your digital assets with proactive security assessments, penetration testing, and continuous monitoring — identifying vulnerabilities before they become breaches and building defense-in-depth architectures that keep your data safe.',
        longDescription: 'Our security engineers follow OWASP, NIST, and ISO 27001 frameworks to deliver comprehensive protection. From application-level code review to network infrastructure hardening, we provide actionable reports and hands-on remediation — not just PDF findings.',
        features: [
            'Penetration testing & vulnerability assessments',
            'Application security audits (OWASP Top 10)',
            'Network infrastructure hardening & firewall configuration',
            'Security awareness training for staff',
            'Incident response planning & tabletop exercises',
            'Compliance consulting (GDPR, PCI-DSS, ISO 27001)',
        ],
        process: ['Threat Modeling', 'Vulnerability Scan', 'Penetration Test', 'Risk Report', 'Remediation', 'Ongoing Monitoring'],
        technologies: ['Burp Suite', 'Nmap', 'Metasploit', 'Wireshark', 'SIEM', 'WAF'],
        noteLabel: 'Why It Matters',
        noteText: 'The average cost of a data breach exceeds $4.5M — proactive security is your best investment',
        cta: 'Secure Your Systems',
        accent: 'accent',
        routeName: 'services.cybersecurity',
    },
    {
        key: 'database-management',
        title: 'Database Design & Management',
        headline: 'Reliable, Scalable Data Architecture',
        image: '/images/database-management.jpeg',
        description: 'We design normalized, high-performance database architectures and provide ongoing management — from schema design and query optimization through automated backups, replication, and disaster recovery planning.',
        longDescription: 'Data is the backbone of every digital system. Our database specialists ensure your data layer is fast, reliable, and secure. We handle everything from initial schema modeling to production performance tuning, migration between platforms, and real-time replication setups.',
        features: [
            'Relational database design & normalization',
            'Query optimization & index tuning for peak performance',
            'Automated backup strategies & disaster recovery plans',
            'Database migration between platforms (MySQL, PostgreSQL, MSSQL)',
            'Replication, clustering & high-availability configurations',
            'Data warehousing & analytics pipeline setup',
        ],
        process: ['Data Modeling', 'Schema Design', 'Implementation', 'Performance Tuning', 'Backup Setup', 'Monitoring & Alerts'],
        technologies: ['PostgreSQL', 'MySQL', 'Redis', 'MongoDB', 'pgAdmin', 'Docker'],
        noteLabel: 'Performance',
        noteText: 'We routinely achieve 10x query performance improvements through targeted optimization',
        cta: 'Optimize Your Database',
        accent: 'brand',
        routeName: 'services.database-management',
    },
    {
        key: 'custom-software',
        title: 'Custom Software Development',
        headline: 'Tailor-Made Systems for Your Business',
        image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
        description: 'We build bespoke software systems designed around your exact operational requirements — from school management platforms and hospital information systems to inventory tracking, point-of-sale, and logistics solutions that eliminate manual work.',
        longDescription: 'Off-the-shelf software forces your team to adapt to rigid workflows. Our custom solutions do the opposite — we study your processes, identify bottlenecks, and engineer systems that fit like a glove. Every module, report, and integration is built specifically for how your organization operates.',
        features: [
            'School Management Systems (enrolment, grading, fees, reports)',
            'Hospital Information Systems (patients, billing, pharmacy, lab)',
            'Inventory & Point-of-Sale Systems with barcode/QR support',
            'Fleet & logistics management platforms',
            'HR & payroll automation systems',
            'Custom reporting dashboards & business intelligence tools',
        ],
        process: ['Business Analysis', 'System Design', 'Agile Development', 'User Testing', 'Deployment', 'Maintenance'],
        technologies: ['Laravel', 'React', 'Flutter', 'PostgreSQL', 'REST API', 'Docker'],
        noteLabel: 'Our Approach',
        noteText: 'Agile sprints with weekly demos — you see progress and give feedback every step of the way',
        cta: 'Build Custom Software',
        accent: 'accent',
        routeName: 'services.custom-software',
    },
    {
        key: 'ui-ux-graphic-design',
        title: 'UI/UX & Graphic Design',
        headline: 'Design That Converts and Delights',
        image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
        description: 'We craft visually compelling, intuitive user interfaces grounded in research and usability principles — transforming complex workflows into clean, accessible experiences that drive engagement, reduce friction, and strengthen your brand identity.',
        longDescription: 'Great design isn\'t decoration — it\'s strategy. Our design team combines user research, wireframing, and iterative prototyping to create interfaces that are beautiful and functional. From brand identity systems to production-ready component libraries, we ensure consistency across every touchpoint.',
        features: [
            'User research, personas & journey mapping',
            'Wireframing & interactive prototyping (Figma)',
            'Mobile & web UI design with design-system delivery',
            'Brand identity — logos, color systems, typography',
            'Marketing collateral — social media, print, presentations',
            'Usability testing & accessibility (WCAG) audits',
        ],
        process: ['Research & Discovery', 'Wireframes', 'Visual Design', 'Prototype & Test', 'Handoff to Dev', 'Design QA'],
        technologies: ['Figma', 'Adobe Creative Suite', 'Tailwind CSS', 'Framer Motion', 'Lottie', 'Storybook'],
        noteLabel: 'Design Philosophy',
        noteText: 'Every pixel earns its place — we design for clarity, speed, and emotional connection',
        cta: 'Design with Us',
        accent: 'brand',
        routeName: 'services.ui-ux-graphic-design',
    },
    {
        key: 'networking',
        title: 'Networking & CCTV Installation',
        headline: 'Reliable Infrastructure, Total Visibility',
        image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
        description: 'We design, deploy, and maintain robust network infrastructure and surveillance systems — from structured cabling and enterprise Wi-Fi to IP-based CCTV installations that keep your premises secure and your operations connected 24/7.',
        longDescription: 'A dependable network is the foundation of every modern business. Our certified network engineers handle end-to-end infrastructure projects: site surveys, structured cabling (Cat6/Cat6a/fiber), switch and router configuration, VLAN segmentation, firewall deployment, and wireless coverage optimization. We also specialize in professional CCTV installation — IP cameras, NVR/DVR systems, remote viewing setup, and integration with access control systems — ensuring complete coverage and peace of mind.',
        features: [
            'Structured cabling — Cat6, Cat6a & fiber optic installation',
            'Enterprise Wi-Fi design, deployment & heat-map optimization',
            'Router, switch & firewall configuration (Cisco, MikroTik, Ubiquiti)',
            'VLAN segmentation, QoS & network security hardening',
            'IP CCTV camera installation with NVR/DVR setup',
            'Remote viewing & mobile surveillance app configuration',
            'Access control system integration & intercom setup',
        ],
        process: ['Site Survey', 'Network Design', 'Cabling & Hardware', 'Configuration', 'CCTV Deployment', 'Testing & Handover'],
        technologies: ['Cisco', 'MikroTik', 'Ubiquiti', 'Hikvision', 'Dahua', 'Cat6/Fiber', 'IP Cameras', 'NVR'],
        noteLabel: 'Coverage',
        noteText: 'From small offices to multi-floor campuses — we scale infrastructure to match your environment',
        cta: 'Plan Your Network',
        accent: 'accent',
        routeName: 'services.networking',
    },
    {
        key: 'it-support',
        title: 'IT Support & Managed Services',
        headline: 'Proactive IT That Keeps You Running',
        image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80',
        description: 'We provide comprehensive IT support and managed services — from day-to-day helpdesk and troubleshooting to proactive system monitoring, hardware maintenance, and strategic IT consulting that minimizes downtime and maximizes productivity.',
        longDescription: 'Technology issues shouldn\'t slow your business down. Our IT support team delivers fast, reliable assistance — whether it\'s resolving a printer jam, recovering a crashed workstation, or architecting a disaster recovery plan. We offer flexible support tiers from on-demand break-fix to fully managed IT partnerships with SLA-backed response times, regular health checks, and quarterly technology reviews.',
        features: [
            'Helpdesk & remote support with rapid response SLAs',
            'On-site technical support & hardware troubleshooting',
            'Workstation, laptop & printer setup, repair & maintenance',
            'Server administration & patch management',
            'Email & Microsoft 365 / Google Workspace administration',
            'Data backup, recovery & disaster recovery planning',
            'IT asset management & technology procurement consulting',
        ],
        process: ['Assessment', 'Support Plan', 'Onboarding', 'Monitoring', 'Incident Response', 'Quarterly Review'],
        technologies: ['Windows Server', 'Active Directory', 'Microsoft 365', 'Google Workspace', 'RMM Tools', 'Backup Solutions'],
        noteLabel: 'Reliability',
        noteText: 'Our average response time is under 30 minutes — because every minute of downtime costs your business',
        cta: 'Get IT Support',
        accent: 'brand',
        routeName: 'services.it-support',
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
            longDescription: toCleanString(override.longDescription) || service.longDescription,
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
