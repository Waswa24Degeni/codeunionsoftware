import clsx from 'clsx';

const colors = {
    blue:   'badge-blue',
    green:  'badge-green',
    yellow: 'badge-yellow',
    red:    'badge-red',
    gray:   'badge-gray',
};

const statusColors = {
    // Tickets
    open:        'blue',
    in_progress: 'yellow',
    'in-progress': 'yellow',
    waiting:     'yellow',
    resolved:    'green',
    closed:      'gray',
    // Quotations
    draft:       'gray',
    sent:        'blue',
    accepted:    'green',
    declined:    'red',
    approved:    'green',
    // Blog
    published:   'green',
    scheduled:   'blue',
    // Priority
    low:         'green',
    medium:      'yellow',
    high:        'red',
    urgent:      'red',
    // Clients
    active:      'green',
    inactive:    'gray',
    lead:        'blue',
    suspended:   'red',
};

export default function Badge({ children, color, status, className = '' }) {
    const resolvedColor = color || statusColors[status] || 'gray';

    return (
        <span className={clsx(colors[resolvedColor], className)}>
            {children}
        </span>
    );
}
