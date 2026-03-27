/**
 * Unique SVG background illustrations for each service.
 * These render as absolute-positioned decorative layers inside service cards/heroes.
 */

export const SERVICE_BACKGROUNDS = {
    'erp-odoo': ({ className = '' }) => (
        <svg className={className} viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="520" y="60" width="220" height="140" rx="16" stroke="#FF7A18" strokeOpacity="0.15" strokeWidth="1.5" />
            <rect x="540" y="85" width="80" height="10" rx="3" fill="#FF7A18" fillOpacity="0.12" />
            <rect x="540" y="105" width="180" height="8" rx="3" fill="#00ADB5" fillOpacity="0.08" />
            <rect x="540" y="123" width="160" height="8" rx="3" fill="#00ADB5" fillOpacity="0.06" />
            <rect x="540" y="155" width="55" height="28" rx="6" fill="#FF7A18" fillOpacity="0.10" />
            <rect x="605" y="155" width="55" height="28" rx="6" fill="#00ADB5" fillOpacity="0.10" />
            <rect x="670" y="155" width="55" height="28" rx="6" fill="#FF7A18" fillOpacity="0.08" />
            <circle cx="160" cy="320" r="60" stroke="#00ADB5" strokeOpacity="0.10" strokeWidth="1" />
            <circle cx="160" cy="320" r="40" stroke="#00ADB5" strokeOpacity="0.07" strokeWidth="1" />
            <path d="M80 250 L200 250 L240 300 L120 300Z" stroke="#FF7A18" strokeOpacity="0.08" strokeWidth="1" />
            <line x1="400" y1="0" x2="400" y2="400" stroke="#00ADB5" strokeOpacity="0.04" strokeDasharray="6 8" />
            <line x1="0" y1="200" x2="800" y2="200" stroke="#FF7A18" strokeOpacity="0.03" strokeDasharray="6 8" />
        </svg>
    ),

    'mobile-flutter': ({ className = '' }) => (
        <svg className={className} viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="560" y="50" width="140" height="260" rx="20" stroke="#00ADB5" strokeOpacity="0.18" strokeWidth="1.5" />
            <rect x="575" y="75" width="110" height="200" rx="8" fill="#00ADB5" fillOpacity="0.04" />
            <rect x="610" y="58" width="40" height="6" rx="3" fill="#00ADB5" fillOpacity="0.12" />
            <circle cx="630" cy="330" r="10" stroke="#00ADB5" strokeOpacity="0.14" strokeWidth="1.5" />
            <rect x="590" y="95" width="80" height="12" rx="4" fill="#FF7A18" fillOpacity="0.10" />
            <rect x="590" y="120" width="60" height="40" rx="6" fill="#00ADB5" fillOpacity="0.08" />
            <rect x="660" y="120" width="12" height="40" rx="4" fill="#FF7A18" fillOpacity="0.10" />
            <rect x="590" y="175" width="80" height="8" rx="3" fill="#00ADB5" fillOpacity="0.06" />
            <rect x="590" y="195" width="60" height="8" rx="3" fill="#00ADB5" fillOpacity="0.05" />
            <circle cx="120" cy="280" r="80" stroke="#FF7A18" strokeOpacity="0.06" strokeWidth="1" />
            <path d="M90 100 L150 60 L210 100 L150 140Z" stroke="#00ADB5" strokeOpacity="0.10" strokeWidth="1" />
        </svg>
    ),

    'web-development': ({ className = '' }) => (
        <svg className={className} viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="480" y="70" width="280" height="180" rx="14" stroke="#FF7A18" strokeOpacity="0.15" strokeWidth="1.5" />
            <rect x="480" y="70" width="280" height="30" rx="14" fill="#FF7A18" fillOpacity="0.06" />
            <circle cx="500" cy="85" r="5" fill="#FF7A18" fillOpacity="0.20" />
            <circle cx="516" cy="85" r="5" fill="#00ADB5" fillOpacity="0.20" />
            <circle cx="532" cy="85" r="5" fill="#FF7A18" fillOpacity="0.12" />
            <rect x="500" y="115" width="100" height="8" rx="3" fill="#00ADB5" fillOpacity="0.12" />
            <rect x="500" y="133" width="240" height="6" rx="3" fill="#00ADB5" fillOpacity="0.06" />
            <rect x="500" y="148" width="200" height="6" rx="3" fill="#FF7A18" fillOpacity="0.06" />
            <rect x="500" y="170" width="80" height="50" rx="8" fill="#00ADB5" fillOpacity="0.05" />
            <rect x="595" y="170" width="80" height="50" rx="8" fill="#FF7A18" fillOpacity="0.05" />
            <rect x="690" y="170" width="50" height="50" rx="8" fill="#00ADB5" fillOpacity="0.04" />
            <path d="M100 350 C150 300 200 340 250 280 S350 320 400 290" stroke="#00ADB5" strokeOpacity="0.08" strokeWidth="1.5" fill="none" />
            <circle cx="140" cy="100" r="45" stroke="#FF7A18" strokeOpacity="0.06" strokeWidth="1" />
        </svg>
    ),

    cybersecurity: ({ className = '' }) => (
        <svg className={className} viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M620 60 L620 170 C620 220 580 260 540 280 C500 260 460 220 460 170 L460 60 L540 30 L620 60Z" stroke="#00ADB5" strokeOpacity="0.18" strokeWidth="1.5" fill="#00ADB5" fillOpacity="0.03" />
            <path d="M540 120 L560 145 L590 100" stroke="#00ADB5" strokeOpacity="0.25" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="150" cy="200" r="70" stroke="#FF7A18" strokeOpacity="0.06" strokeWidth="1" />
            <circle cx="150" cy="200" r="50" stroke="#FF7A18" strokeOpacity="0.04" strokeWidth="1" />
            <line x1="680" y1="300" x2="750" y2="340" stroke="#00ADB5" strokeOpacity="0.08" strokeWidth="1" />
            <line x1="680" y1="340" x2="750" y2="300" stroke="#00ADB5" strokeOpacity="0.08" strokeWidth="1" />
            <rect x="200" y="310" width="120" height="60" rx="10" stroke="#00ADB5" strokeOpacity="0.06" strokeWidth="1" />
            <rect x="220" y="330" width="80" height="6" rx="3" fill="#00ADB5" fillOpacity="0.08" />
        </svg>
    ),

    'database-management': ({ className = '' }) => (
        <svg className={className} viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="600" cy="100" rx="100" ry="30" stroke="#FF7A18" strokeOpacity="0.16" strokeWidth="1.5" />
            <path d="M500 100 V200 C500 216 544 230 600 230 C656 230 700 216 700 200 V100" stroke="#FF7A18" strokeOpacity="0.12" strokeWidth="1.5" />
            <ellipse cx="600" cy="200" rx="100" ry="30" stroke="#FF7A18" strokeOpacity="0.10" strokeWidth="1" />
            <path d="M500 200 V280 C500 296 544 310 600 310 C656 310 700 296 700 280 V200" stroke="#00ADB5" strokeOpacity="0.10" strokeWidth="1.5" />
            <ellipse cx="600" cy="280" rx="100" ry="30" stroke="#00ADB5" strokeOpacity="0.08" strokeWidth="1" />
            <rect x="530" y="135" width="140" height="6" rx="3" fill="#FF7A18" fillOpacity="0.08" />
            <rect x="550" y="150" width="100" height="6" rx="3" fill="#00ADB5" fillOpacity="0.06" />
            <circle cx="150" cy="150" r="55" stroke="#00ADB5" strokeOpacity="0.06" strokeWidth="1" />
            <path d="M120 320 L180 320 L200 360 L100 360Z" stroke="#FF7A18" strokeOpacity="0.06" strokeWidth="1" />
        </svg>
    ),

    'custom-software': ({ className = '' }) => (
        <svg className={className} viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="520" y="60" width="200" height="130" rx="12" stroke="#00ADB5" strokeOpacity="0.14" strokeWidth="1.5" />
            <rect x="540" y="85" width="60" height="8" rx="3" fill="#00ADB5" fillOpacity="0.12" />
            <rect x="540" y="103" width="160" height="6" rx="3" fill="#FF7A18" fillOpacity="0.06" />
            <rect x="540" y="118" width="120" height="6" rx="3" fill="#00ADB5" fillOpacity="0.05" />
            <rect x="540" y="144" width="70" height="26" rx="6" fill="#FF7A18" fillOpacity="0.10" />
            <path d="M580 240 L620 210 L660 240 L700 210 L740 240" stroke="#00ADB5" strokeOpacity="0.10" strokeWidth="1.5" fill="none" />
            <rect x="540" y="270" width="180" height="80" rx="10" stroke="#FF7A18" strokeOpacity="0.08" strokeWidth="1" />
            <rect x="560" y="290" width="140" height="6" rx="3" fill="#FF7A18" fillOpacity="0.06" />
            <rect x="560" y="306" width="100" height="6" rx="3" fill="#00ADB5" fillOpacity="0.05" />
            <circle cx="140" cy="160" r="50" stroke="#FF7A18" strokeOpacity="0.06" strokeWidth="1" />
            <circle cx="200" cy="300" r="35" stroke="#00ADB5" strokeOpacity="0.05" strokeWidth="1" />
        </svg>
    ),

    'ui-ux-graphic-design': ({ className = '' }) => (
        <svg className={className} viewBox="0 0 800 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="520" y="60" width="220" height="160" rx="14" stroke="#FF7A18" strokeOpacity="0.14" strokeWidth="1.5" />
            <circle cx="570" cy="120" r="30" fill="#FF7A18" fillOpacity="0.08" />
            <circle cx="650" cy="110" r="20" fill="#00ADB5" fillOpacity="0.10" />
            <rect x="540" y="165" width="180" height="35" rx="8" fill="#FF7A18" fillOpacity="0.04" />
            <rect x="555" y="177" width="60" height="8" rx="3" fill="#FF7A18" fillOpacity="0.10" />
            <rect x="625" y="177" width="80" height="8" rx="3" fill="#00ADB5" fillOpacity="0.08" />
            <path d="M580 260 Q620 230 660 260 Q700 290 740 260" stroke="#00ADB5" strokeOpacity="0.12" strokeWidth="1.5" fill="none" />
            <path d="M100 100 L180 100 L140 170Z" stroke="#FF7A18" strokeOpacity="0.08" strokeWidth="1.5" />
            <circle cx="140" cy="280" r="45" stroke="#00ADB5" strokeOpacity="0.06" strokeWidth="1" />
            <rect x="200" y="310" width="80" height="40" rx="8" stroke="#FF7A18" strokeOpacity="0.05" strokeWidth="1" />
        </svg>
    ),
};

export function ServiceBg({ serviceKey, className = '' }) {
    const Bg = SERVICE_BACKGROUNDS[serviceKey];
    if (!Bg) return null;
    return (
        <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
            <Bg className="absolute inset-0 h-full w-full" />
        </div>
    );
}
