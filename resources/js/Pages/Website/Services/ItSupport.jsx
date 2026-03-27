import ServiceDetailPage from '@/Components/Website/ServiceDetailPage';
import { usePage } from '@inertiajs/react';
import { getServiceByKey } from '@/lib/siteContent';

export default function ItSupport() {
    const { siteSettings = {} } = usePage().props;
    const service = getServiceByKey(siteSettings, 'it-support');

    return <ServiceDetailPage service={service} />;
}
