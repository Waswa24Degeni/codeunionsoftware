import Navbar from '@/Components/Website/Navbar';
import Footer from '@/Components/Website/Footer';
import FlashMessage from '@/Components/UI/FlashMessage';
import { usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

export default function WebsiteLayout({ children, title, description }) {
    const { flash, siteSettings = {} } = usePage().props;
    const metaDescription = description || siteSettings.meta_description;

    return (
        <>
            <Head>
                {metaDescription && <meta name="description" content={metaDescription} />}
            </Head>
            <div className="min-h-screen flex flex-col bg-[#021B1C] overflow-x-hidden">
                <Navbar />
                <main className="flex-1">
                    {flash?.success && <FlashMessage flash={flash} />}
                    {children}
                </main>
                <Footer />
            </div>
        </>
    );
}
