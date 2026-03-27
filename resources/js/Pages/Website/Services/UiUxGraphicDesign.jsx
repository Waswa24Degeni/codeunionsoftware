import ServiceDetailPage from '@/Components/Website/ServiceDetailPage';
import { usePage } from '@inertiajs/react';
import { getServiceByKey } from '@/lib/siteContent';

export default function UiUxGraphicDesign() {
    const { siteSettings = {} } = usePage().props;
    const service = getServiceByKey(siteSettings, 'ui-ux-graphic-design');

    return <ServiceDetailPage service={service} />;
}
