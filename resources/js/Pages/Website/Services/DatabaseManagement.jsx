import ServiceDetailPage from '@/Components/Website/ServiceDetailPage';
import { usePage } from '@inertiajs/react';
import { getServiceByKey } from '@/lib/siteContent';

export default function DatabaseManagement() {
    const { siteSettings = {} } = usePage().props;
    const service = getServiceByKey(siteSettings, 'database-management');

    return <ServiceDetailPage service={service} />;
}
