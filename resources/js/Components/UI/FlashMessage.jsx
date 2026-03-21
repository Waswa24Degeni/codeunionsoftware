import { useEffect, useState } from 'react';
import { CheckCircle, XCircle, AlertTriangle, X } from 'lucide-react';
import clsx from 'clsx';

const icons = {
    success: <CheckCircle size={20} className="text-accent-400 flex-shrink-0" />,
    error:   <XCircle    size={20} className="text-brand-500 flex-shrink-0" />,
    warning: <AlertTriangle size={20} className="text-brand-400 flex-shrink-0" />,
};

const styles = {
    success: 'bg-[#0a2e2f] border-accent-500/20 text-accent-300',
    error:   'bg-[#0a2e2f] border-brand-500/20 text-brand-300',
    warning: 'bg-[#0a2e2f] border-brand-400/20 text-brand-300',
};

export default function FlashMessage({ flash, className = '' }) {
    const [visible, setVisible] = useState(true);

    const type = flash?.success ? 'success' : flash?.error ? 'error' : 'warning';
    const message = flash?.success || flash?.error || flash?.warning;

    useEffect(() => {
        const t = setTimeout(() => setVisible(false), 5000);
        return () => clearTimeout(t);
    }, [message]);

    if (!visible || !message) return null;

    return (
        <div className={clsx(
            'flex items-center gap-3 px-4 py-3 rounded-lg border text-sm',
            styles[type],
            className,
        )}>
            {icons[type]}
            <span className="flex-1">{message}</span>
            <button onClick={() => setVisible(false)} className="p-0.5 rounded hover:opacity-70">
                <X size={16} />
            </button>
        </div>
    );
}
