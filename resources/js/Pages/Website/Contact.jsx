import { Head, useForm, usePage } from '@inertiajs/react';
import WebsiteLayout from '@/Layouts/WebsiteLayout';
import InputField from '@/Components/UI/InputField';
import Button from '@/Components/UI/Button';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function Contact({ status }) {
    const { siteSettings = {} } = usePage().props;
    const siteName = siteSettings.site_name || 'CodeUnion Software';
    const contactEmail = siteSettings.contact_email || 'hello@codeunion.dev';
    const contactPhone = siteSettings.contact_phone || '+1 (555) 000-0000';
    const contactAddress = siteSettings.contact_address || 'Remote - Worldwide';

    const { data, setData, post, processing, errors, wasSuccessful, reset } = useForm({
        name: '',
        email: '',
        subject: '',
        message: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('contact.send'), { onSuccess: () => reset() });
    };

    return (
        <WebsiteLayout>
            <Head title={`Contact Us - ${siteName}`} />

            <section className="py-20 bg-gradient-to-br from-[#021B1C] to-[#0c3d3f] text-center">
                <div className="container mx-auto px-4">
                    <p className="text-accent-400 text-sm uppercase tracking-widest font-semibold mb-4">• REACH OUT •</p>
                    <h1 className="text-4xl md:text-5xl font-extrabold text-text-primary mb-4">Get In Touch</h1>
                    <p className="text-text-secondary text-lg max-w-xl mx-auto">
                        Have a project in mind? We'd love to hear about it. Fill out the form and we'll get back to you shortly.
                    </p>
                </div>
            </section>

            <section className="py-20 bg-[#021B1C]">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-10 max-w-5xl mx-auto">
                        {/* Contact Details */}
                        <div className="space-y-6">
                            {[
                                { icon: Mail, label: 'Email', value: contactEmail },
                                { icon: Phone, label: 'Phone', value: contactPhone },
                                { icon: MapPin, label: 'Location', value: contactAddress },
                            ].map(({ icon: Icon, label, value }) => (
                                <div key={label} className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-brand-500/20 to-accent-500/20 flex items-center justify-center flex-shrink-0">
                                        <Icon size={18} className="text-accent-400" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-text-primary">{label}</p>
                                        <p className="text-sm text-text-secondary">{value}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Form */}
                        <div className="lg:col-span-2 card p-7">
                            {wasSuccessful && (
                                <div className="mb-5 rounded-lg bg-accent-500/10 border border-accent-500/20 p-3 text-sm text-accent-300">
                                    Thanks for reaching out! We'll be in touch soon.
                                </div>
                            )}

                            <form onSubmit={submit} className="space-y-4">
                                <div className="grid sm:grid-cols-2 gap-4">
                                    <InputField label="Your Name" id="name" value={data.name}
                                        onChange={(e) => setData('name', e.target.value)} error={errors.name} />
                                    <InputField label="Email Address" id="email" type="email" value={data.email}
                                        onChange={(e) => setData('email', e.target.value)} error={errors.email} />
                                </div>

                                <InputField label="Subject" id="subject" value={data.subject}
                                    onChange={(e) => setData('subject', e.target.value)} error={errors.subject} />

                                <div>
                                    <label htmlFor="message" className="label">Message</label>
                                    <textarea id="message" rows={5} value={data.message}
                                        onChange={(e) => setData('message', e.target.value)}
                                        className={`input resize-none ${errors.message ? 'border-red-400' : ''}`}
                                        placeholder="Describe your project...">
                                    </textarea>
                                    {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
                                </div>

                                <Button type="submit" loading={processing}>Send Message</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </WebsiteLayout>
    );
}
