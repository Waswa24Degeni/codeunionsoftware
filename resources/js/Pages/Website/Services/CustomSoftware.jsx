import ServiceDetailPage from '@/Components/Website/ServiceDetailPage';
import { usePage } from '@inertiajs/react';
import { getServiceByKey } from '@/lib/siteContent';

export default function CustomSoftware() {
    const { siteSettings = {} } = usePage().props;
    const service = getServiceByKey(siteSettings, 'custom-software');

    return <ServiceDetailPage service={service} />;
}
