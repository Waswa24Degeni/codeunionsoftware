import { Link } from '@inertiajs/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ links: linksOrPaginator, meta: metaProp }) {
    // Support passing a full Laravel paginator object or just the links array
    const links = Array.isArray(linksOrPaginator) ? linksOrPaginator : linksOrPaginator?.links;
    const meta  = metaProp ?? (Array.isArray(linksOrPaginator) ? undefined : linksOrPaginator?.meta);

    if (!links || links.length <= 3) return null;

    return (
        <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-text-secondary">
                Showing <span className="font-medium">{meta?.from ?? 1}</span>–
                <span className="font-medium">{meta?.to ?? 1}</span> of{' '}
                <span className="font-medium">{meta?.total ?? 1}</span> results
            </p>

            <div className="flex items-center gap-1">
                {links.map((link, i) => {
                    if (link.label === '&laquo; Previous') {
                        return (
                            <Link
                                key={i}
                                href={link.url ?? '#'}
                                disabled={!link.url}
                                className="p-2 rounded-lg text-text-secondary hover:bg-[#0f3536] disabled:opacity-40"
                                preserveScroll
                            >
                                <ChevronLeft size={16} />
                            </Link>
                        );
                    }
                    if (link.label === 'Next &raquo;') {
                        return (
                            <Link
                                key={i}
                                href={link.url ?? '#'}
                                disabled={!link.url}
                                className="p-2 rounded-lg text-text-secondary hover:bg-[#0f3536] disabled:opacity-40"
                                preserveScroll
                            >
                                <ChevronRight size={16} />
                            </Link>
                        );
                    }
                    return (
                        <Link
                            key={i}
                            href={link.url ?? '#'}
                            className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium ${
                                link.active
                                    ? 'bg-brand-500 text-white'
                                    : 'text-text-secondary hover:bg-[#0f3536]'
                            }`}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                            preserveScroll
                        />
                    );
                })}
            </div>
        </div>
    );
}
