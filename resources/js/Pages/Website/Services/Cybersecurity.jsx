import ServiceDetailPage from '@/Components/Website/ServiceDetailPage';
import { usePage } from '@inertiajs/react';
import { getServiceByKey } from '@/lib/siteContent';

export default function Cybersecurity() {
    const { siteSettings = {} } = usePage().props;
    const service = getServiceByKey(siteSettings, 'cybersecurity');

    return <ServiceDetailPage service={service} />;
}
