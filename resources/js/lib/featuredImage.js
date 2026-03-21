export function resolveFeaturedImageUrl(rawUrl) {
    if (typeof rawUrl !== 'string') return '';

    const value = rawUrl.trim();
    if (!value) return '';

    if (value.startsWith('data:image/')) {
        return value;
    }

    if (/^https?:\/\//i.test(value)) {
        try {
            const parsed = new URL(value);
            if (parsed.pathname === '/imgres') {
                const direct = parsed.searchParams.get('imgurl')?.trim();
                if (direct && /^https?:\/\//i.test(direct)) {
                    return direct;
                }
            }
        } catch {
            return value;
        }

        return value;
    }

    const normalized = value.replace(/^\/+/, '');

    if (normalized.startsWith('images/')) {
        return `/${normalized}`;
    }

    if (normalized.startsWith('uploads/')) {
        return `/${normalized}`;
    }

    if (normalized.startsWith('media/')) {
        return `/uploads/${normalized.replace(/^media\//, '')}`;
    }

    if (normalized.startsWith('storage/')) {
        return `/uploads/${normalized.replace(/^storage\//, '')}`;
    }

    return `/uploads/${normalized}`;
}
