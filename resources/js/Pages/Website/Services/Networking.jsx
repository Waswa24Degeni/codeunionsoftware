import ServiceDetailPage from '@/Components/Website/ServiceDetailPage';
import { usePage } from '@inertiajs/react';
import { getServiceByKey } from '@/lib/siteContent';

export default function Networking() {
    const { siteSettings = {} } = usePage().props;
    const service = getServiceByKey(siteSettings, 'networking');

    return <ServiceDetailPage service={service} />;
}
