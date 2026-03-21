<?php

namespace App\Controllers\Dashboard;

use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use App\Controllers\Controller;
use App\Models\SiteSetting;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class SettingsController extends Controller
{
    private const SETTINGS_KEYS = [
        'site_name',
        'site_tagline',
        'company_logo',
        'contact_email',
        'contact_phone',
        'contact_address',
        'business_hours',
        'privacy_policy_url',
        'terms_of_service_url',
        'meta_title',
        'meta_description',
        'footer_copyright',
    ];

    private const SOCIAL_KEYS = [
        'facebook', 'twitter', 'instagram', 'linkedin',
        'youtube', 'github', 'tiktok', 'whatsapp',
    ];

    private const SERVICE_KEYS = [
        'erp-odoo',
        'mobile-flutter',
        'web-development',
        'cybersecurity',
        'database-management',
        'custom-software',
        'ui-ux-graphic-design',
    ];

    private const TEAM_SOCIAL_KEYS = [
        'linkedin',
        'github',
        'twitter',
        'instagram',
        'facebook',
        'youtube',
        'tiktok',
        'whatsapp',
        'website',
    ];

    public function index(): Response
    {
        $socials = SiteSetting::socials();
        $settings = SiteSetting::publicSettings();

        return Inertia::render('Admin/Settings/Index', [
            'settings' => $settings,
            'socials'  => $socials,
        ]);
    }

    public function updateGeneral(Request $request)
    {
        $validated = $request->validate([
            'site_name'        => ['required', 'string', 'max:120'],
            'site_tagline'     => ['nullable', 'string', 'max:255'],
            'footer_copyright' => ['nullable', 'string', 'max:160'],
            'company_logo_file' => ['nullable', 'image', 'max:4096'],
            'remove_company_logo' => ['nullable'],
        ]);

        $currentLogo = SiteSetting::get('company_logo', '');

        if ($request->boolean('remove_company_logo')) {
            $this->deleteStorageAsset((string) $currentLogo);
            $validated['company_logo'] = '';
        }

        if ($request->hasFile('company_logo_file')) {
            $this->deleteStorageAsset((string) $currentLogo);
            $validated['company_logo'] = $request->file('company_logo_file')->store('branding/company-logo', 'public');
        }

        unset($validated['company_logo_file'], $validated['remove_company_logo']);

        SiteSetting::setMany($validated, 'general');
        SiteSetting::flushPublicCache();

        return back()->with('success', 'General settings saved.');
    }

    private function deleteStorageAsset(string $storedValue): void
    {
        if ($storedValue === '') {
            return;
        }

        if (str_starts_with($storedValue, 'http://') || str_starts_with($storedValue, 'https://') || str_starts_with($storedValue, 'data:')) {
            return;
        }

        $normalized = ltrim($storedValue, '/');

        if (str_starts_with($normalized, 'storage/')) {
            $normalized = substr($normalized, strlen('storage/'));
        }

        if ($normalized !== '') {
            Storage::disk('public')->delete($normalized);
        }
    }

    public function updateContact(Request $request)
    {
        $validated = $request->validate([
            'contact_email'   => ['required', 'email', 'max:255'],
            'contact_phone'   => ['nullable', 'string', 'max:50'],
            'contact_address' => ['nullable', 'string', 'max:255'],
            'business_hours'  => ['nullable', 'string', 'max:120'],
        ]);

        SiteSetting::setMany($validated, 'general');
        SiteSetting::flushPublicCache();

        return back()->with('success', 'Contact settings saved.');
    }

    public function updateSeo(Request $request)
    {
        $validated = $request->validate([
            'privacy_policy_url'   => ['nullable', 'string', 'max:500'],
            'terms_of_service_url' => ['nullable', 'string', 'max:500'],
            'meta_title'           => ['nullable', 'string', 'max:160'],
            'meta_description'     => ['nullable', 'string', 'max:255'],
        ]);

        SiteSetting::setMany($validated, 'general');
        SiteSetting::flushPublicCache();

        return back()->with('success', 'SEO & Legal settings saved.');
    }

    public function updateSocial(Request $request)
    {
        $rules = [];
        foreach (self::SOCIAL_KEYS as $key) {
            $rules[$key] = ['nullable', 'string', 'url', 'max:500'];
        }

        $validated = $request->validate($rules);

        foreach (self::SOCIAL_KEYS as $key) {
            SiteSetting::set("social_{$key}", $validated[$key] ?? '', 'social');
        }

        SiteSetting::flushSocialCache();

        return back()->with('success', 'Social media links saved.');
    }

    public function updateTeam(Request $request)
    {
        $rules = [
            'team_members'            => ['required', 'array', 'min:1', 'max:12'],
            'team_members.*.name'     => ['nullable', 'string', 'max:80'],
            'team_members.*.role'     => ['nullable', 'string', 'max:120'],
            'team_members.*.description' => ['nullable', 'string', 'max:500'],
            'team_members.*.social_link' => ['nullable', 'string', 'max:500'],
            'team_members.*.social_links' => ['nullable', 'array'],
            'team_members.*.avatar'   => ['nullable', 'string', 'max:500'],
            'team_members.*.avatar_file' => ['nullable', 'image', 'max:4096'],
        ];

        foreach (self::TEAM_SOCIAL_KEYS as $platform) {
            $rules["team_members.*.social_links.$platform"] = ['nullable', 'string', 'max:500'];
        }

        $validated = $request->validate($rules);

        $members = collect($validated['team_members'])
            ->map(function (array $member, int $index) use ($request) {
                $avatar = trim((string) ($member['avatar'] ?? ''));
                $socialLinks = [];

                foreach (self::TEAM_SOCIAL_KEYS as $platform) {
                    $url = trim((string) data_get($member, "social_links.$platform", ''));
                    if ($url !== '') {
                        $socialLinks[$platform] = $url;
                    }
                }

                $legacyLink = trim((string) ($member['social_link'] ?? ''));
                if ($legacyLink !== '' && !array_key_exists('website', $socialLinks)) {
                    $socialLinks['website'] = $legacyLink;
                }

                if ($request->hasFile("team_members.$index.avatar_file")) {
                    $storedPath = $request->file("team_members.$index.avatar_file")->store('team-members', 'public');
                    $avatar = $storedPath;
                }

                return [
                    'name'        => trim($member['name']),
                    'role'        => trim($member['role']),
                    'description' => trim((string) ($member['description'] ?? '')),
                    'social_links' => $socialLinks,
                    'avatar'      => $avatar,
                ];
            })
            ->filter(fn (array $member) => $member['name'] !== '' && $member['role'] !== '')
            ->values()
            ->all();

        if (empty($members)) {
            throw ValidationException::withMessages([
                'team_members' => 'Add at least one team member with both name and role.',
            ]);
        }

        SiteSetting::set('team_members_json', json_encode($members, JSON_UNESCAPED_UNICODE), 'general');
        SiteSetting::flushPublicCache();

        return back()->with('success', 'Team settings saved.');
    }

    public function updateServices(Request $request)
    {
        $validated = $request->validate([
            'services'                    => ['required', 'array', 'min:1', 'max:20'],
            'services.*.key'              => ['required', 'string', 'in:'.implode(',', self::SERVICE_KEYS)],
            'services.*.title'            => ['required', 'string', 'max:140'],
            'services.*.description'      => ['required', 'string', 'max:600'],
            'services.*.features'         => ['required', 'array', 'min:1', 'max:12'],
            'services.*.features.*'       => ['required', 'string', 'max:180'],
            'services.*.noteLabel'        => ['nullable', 'string', 'max:40'],
            'services.*.noteText'         => ['nullable', 'string', 'max:255'],
        ]);

        $services = collect($validated['services'])
            ->map(function (array $service) {
                $features = collect($service['features'] ?? [])
                    ->map(fn ($feature) => trim((string) $feature))
                    ->filter(fn ($feature) => $feature !== '')
                    ->values()
                    ->all();

                return [
                    'key'         => $service['key'],
                    'title'       => trim($service['title']),
                    'description' => trim($service['description']),
                    'features'    => $features,
                    'noteLabel'   => trim((string) ($service['noteLabel'] ?? '')),
                    'noteText'    => trim((string) ($service['noteText'] ?? '')),
                ];
            })
            ->filter(fn (array $service) => !empty($service['features']))
            ->values()
            ->all();

        SiteSetting::set('services_json', json_encode($services, JSON_UNESCAPED_UNICODE), 'general');
        SiteSetting::flushPublicCache();

        return back()->with('success', 'Services settings saved.');
    }
}
