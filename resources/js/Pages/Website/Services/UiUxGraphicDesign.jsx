import ServiceDetailPage from '@/Components/Website/ServiceDetailPage';
import { usePage } from '@inertiajs/react';
import { getServiceByKey } from '@/lib/siteContent';

export default function UiUxGraphicDesign() {
    const { siteSettings = {} } = usePage().props;
    const service = getServiceByKey(siteSettings, 'ui-ux-graphic-design');

    return (
        <ServiceDetailPage
            title={service.title}
            description={service.description}
            points={service.features}
            noteLabel={service.noteLabel}
            noteText={service.noteText}
        />
    );
}
