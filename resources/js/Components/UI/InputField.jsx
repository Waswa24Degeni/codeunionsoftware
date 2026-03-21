import clsx from 'clsx';

export default function InputField({
    label,
    id,
    name,
    type = 'text',
    value,
    onChange,
    error,
    required = false,
    placeholder,
    className = '',
    ...props
}) {
    const fieldId = id || name;

    return (
        <div className={clsx('space-y-1', className)}>
            {label && (
                <label htmlFor={fieldId} className="label">
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}
            <input
                id={fieldId}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                required={required}
                className={clsx('input', error && 'border-red-400 focus:border-red-400 focus:ring-red-400')}
                {...props}
            />
            {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
        </div>
    );
}
