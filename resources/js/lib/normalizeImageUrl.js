export function normalizeImageUrl(rawUrl, fallback = '/images/default-avatar.svg') {
    if (typeof rawUrl !== 'string') {
        return fallback;
    }

    const value = rawUrl.trim();
    if (!value) {
        return fallback;
    }

    if (value.startsWith('data:')) {
        return value;
    }

    if (/^https?:\/\//i.test(value)) {
        try {
            const parsed = new URL(value);
            const path = parsed.pathname || '';

            if (path.startsWith('/media/')) {
                return `/uploads/${path.replace(/^\/media\//, '')}`;
            }

            if (path.startsWith('/storage/')) {
                return `/uploads/${path.replace(/^\/storage\//, '')}`;
            }

            if (path.startsWith('/uploads/')) {
                return path;
            }

            return value;
        } catch {
            return fallback;
        }
    }

    const normalized = value.replace(/^\/+/, '');

    if (normalized.startsWith('uploads/')) {
        return `/${normalized}`;
    }

    if (normalized.startsWith('media/')) {
        return `/uploads/${normalized.replace(/^media\//, '')}`;
    }

    if (normalized.startsWith('storage/')) {
        return `/uploads/${normalized.replace(/^storage\//, '')}`;
    }

    if (normalized.startsWith('images/')) {
        return `/${normalized}`;
    }

    return `/uploads/${normalized}`;
}
