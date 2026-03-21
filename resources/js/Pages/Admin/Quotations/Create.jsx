import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import Button from '@/Components/UI/Button';
import InputField from '@/Components/UI/InputField';
import { Plus, Trash2 } from 'lucide-react';

const emptyItem = { description: '', qty: 1, unit_price: 0 };

export default function AdminQuotationsCreate({ clients }) {
    const { data, setData, post, processing, errors } = useForm({
        client_id: '',
        title: '',
        description: '',
        valid_until: '',
        notes: '',
        discount: 0,
        tax_rate: 0,
        items: [emptyItem],
    });

    const updateItem = (index, field, value) => {
        const items = [...data.items];
        items[index] = { ...items[index], [field]: value };
        setData('items', items);
    };

    const addItem = () => setData('items', [...data.items, { ...emptyItem }]);
    const removeItem = (index) => setData('items', data.items.filter((_, i) => i !== index));

    const submit = (e) => {
        e.preventDefault();
        post(route('admin.quotations.store'));
    };

    return (
        <AdminLayout title="New Quotation">
            <Head title="New Quotation — Admin" />

            <form onSubmit={submit} className="space-y-6">
                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <div className="card p-6 space-y-4">
                            <div className="grid sm:grid-cols-2 gap-4">
                                <div>
                                    <label className="label">Client</label>
                                    <select value={data.client_id} onChange={(e) => setData('client_id', e.target.value)} className="input">
                                        <option value="">Select client</option>
                                        {(clients ?? []).map((client) => (
                                            <option key={client.id} value={client.id}>{client.company_name}</option>
                                        ))}
                                    </select>
                                    {errors.client_id && <p className="mt-1 text-xs text-red-500">{errors.client_id}</p>}
                                </div>
                                <div>
                                    <label className="label">Status</label>
                                    <select value={data.status} onChange={(e) => setData('status', e.target.value)} className="input">
                                        <option value="draft">Draft</option>
                                        <option value="pending">Pending</option>
                                        <option value="sent">Sent</option>
                                    </select>
                                </div>
                            </div>
                            <InputField label="Title" value={data.title} onChange={(e) => setData('title', e.target.value)} error={errors.title} />
                            <div>
                                <label className="label">Description</label>
                                <textarea rows={4} value={data.description} onChange={(e) => setData('description', e.target.value)} className="input resize-none" />
                            </div>
                            <InputField label="Valid Until" type="date" value={data.valid_until}
                                onChange={(e) => setData('valid_until', e.target.value)} error={errors.valid_until} />
                        </div>

                        <div className="card p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="font-semibold text-text-primary">Items</h3>
                                <button type="button" onClick={addItem} className="btn btn-secondary inline-flex items-center gap-1.5">
                                    <Plus size={15} /> Add Item
                                </button>
                            </div>

                            <div className="space-y-4">
                                {data.items.map((item, index) => (
                                    <div key={index} className="rounded-xl border border-[#1a4445] p-4 space-y-4">
                                        <div className="flex items-center justify-between">
                                            <h4 className="font-medium text-text-primary">Item {index + 1}</h4>
                                            {data.items.length > 1 && (
                                                <button type="button" onClick={() => removeItem(index)} className="text-red-500 hover:text-red-600">
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                        <div>
                                            <label className="label">Description</label>
                                            <textarea rows={3} value={item.description}
                                                onChange={(e) => updateItem(index, 'description', e.target.value)} className="input resize-none" />
                                        </div>
                                        <div className="grid sm:grid-cols-2 gap-4">
                                            <InputField label="Quantity" type="number" min="1" value={item.qty}
                                                onChange={(e) => updateItem(index, 'qty', Number(e.target.value))} />
                                            <InputField label="Unit Price" type="number" min="0" step="0.01" value={item.unit_price}
                                                onChange={(e) => updateItem(index, 'unit_price', Number(e.target.value))} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="card p-5 space-y-4">
                            <InputField label="Discount (%)" type="number" min="0" max="100" step="0.01" value={data.discount}
                                onChange={(e) => setData('discount', Number(e.target.value))} error={errors.discount} />
                            <InputField label="Tax Rate (%)" type="number" min="0" max="100" step="0.01" value={data.tax_rate}
                                onChange={(e) => setData('tax_rate', Number(e.target.value))} error={errors.tax_rate} />
                            <label className="label">Notes</label>
                            <textarea rows={8} value={data.notes} onChange={(e) => setData('notes', e.target.value)} className="input resize-none" />
                        </div>
                        <div className="flex gap-3">
                            <Button type="submit" loading={processing} className="flex-1">Create Quote</Button>
                            <a href={route('admin.quotations.index')} className="btn btn-secondary flex-1 text-center">Cancel</a>
                        </div>
                    </div>
                </div>
            </form>
        </AdminLayout>
    );
}
