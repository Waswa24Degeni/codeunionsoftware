<?php

namespace App\Controllers\Website;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Controllers\Controller;
use App\Models\BlogPost;
use App\Models\PortfolioProject;
use App\Services\BlogService;
use App\Services\SystemNotificationService;

class HomeController extends Controller
{
    public function __construct(
        private readonly BlogService $blogService,
        private readonly SystemNotificationService $notificationService,
    ) {}

    public function index(): Response
    {
        return Inertia::render('Website/Home', [
            'latestPosts'     => $this->blogService->getLatestPosts(3),
            'featuredProjects' => PortfolioProject::featured()->take(6)->get(),
        ]);
    }

    public function about(): Response
    {
        return Inertia::render('Website/About');
    }

    public function services(): Response
    {
        return Inertia::render('Website/Services');
    }

    public function serviceErpOdoo(): Response
    {
        return Inertia::render('Website/Services/ErpOdoo');
    }

    public function serviceMobileFlutter(): Response
    {
        return Inertia::render('Website/Services/MobileFlutter');
    }

    public function serviceWebDevelopment(): Response
    {
        return Inertia::render('Website/Services/WebDevelopment');
    }

    public function serviceCybersecurity(): Response
    {
        return Inertia::render('Website/Services/Cybersecurity');
    }

    public function serviceDatabaseManagement(): Response
    {
        return Inertia::render('Website/Services/DatabaseManagement');
    }

    public function serviceCustomSoftware(): Response
    {
        return Inertia::render('Website/Services/CustomSoftware');
    }

    public function serviceUiUxGraphicDesign(): Response
    {
        return Inertia::render('Website/Services/UiUxGraphicDesign');
    }

    public function serviceNetworking(): Response
    {
        return Inertia::render('Website/Services/Networking');
    }

    public function serviceItSupport(): Response
    {
        return Inertia::render('Website/Services/ItSupport');
    }

    public function contact(): Response
    {
        return Inertia::render('Website/Contact');
    }

    public function privacyPolicy(): Response
    {
        return Inertia::render('Website/PrivacyPolicy');
    }

    public function termsOfService(): Response
    {
        return Inertia::render('Website/TermsOfService');
    }

    public function sendContact(Request $request)
    {
        $validated = $request->validate([
            'name'    => ['required', 'string', 'max:100'],
            'email'   => ['required', 'email', 'max:255'],
            'subject' => ['required', 'string', 'max:200'],
            'message' => ['required', 'string', 'max:2000'],
        ]);

        // TODO: dispatch ContactMessageReceived mail event
        // Mail::to(config('mail.from.address'))->queue(new ContactFormMail($validated));

        $this->notificationService->notifyAdmins(
            title: 'New Contact Message',
            message: sprintf('%s (%s): %s', $validated['name'], $validated['email'], $validated['subject']),
            url: route('admin.dashboard'),
            level: 'info',
            meta: [
                'type' => 'contact.submitted',
                'email' => $validated['email'],
            ],
        );

        return back()->with('success', 'Your message has been sent. We will get back to you shortly.');
    }
}
