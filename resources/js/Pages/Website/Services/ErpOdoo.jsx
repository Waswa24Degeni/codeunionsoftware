import ServiceDetailPage from '@/Components/Website/ServiceDetailPage';
import { usePage } from '@inertiajs/react';
import { getServiceByKey } from '@/lib/siteContent';

export default function ErpOdoo() {
    const { siteSettings = {} } = usePage().props;
    const service = getServiceByKey(siteSettings, 'erp-odoo');

    return <ServiceDetailPage service={service} />;
}
