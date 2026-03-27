import ServiceDetailPage from '@/Components/Website/ServiceDetailPage';
import { usePage } from '@inertiajs/react';
import { getServiceByKey } from '@/lib/siteContent';

export default function WebDevelopment() {
    const { siteSettings = {} } = usePage().props;
    const service = getServiceByKey(siteSettings, 'web-development');

    return <ServiceDetailPage service={service} />;
}
