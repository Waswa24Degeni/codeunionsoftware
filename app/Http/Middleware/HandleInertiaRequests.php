<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;
use App\Models\SiteSetting;
use Illuminate\Support\Facades\Schema;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $user = $request->user();

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $user
                    ? array_merge([
                        'id' => $user->id,
                        'name' => $user->name,
                        'email' => $user->email,
                        'avatar_url' => $user->avatar_url,
                    ], [
                        'roles'       => $user->getRoleNames()->all(),
                        'permissions' => $user->getAllPermissions()->pluck('name')->all(),
                    ])
                    : null,
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error'   => fn () => $request->session()->get('error'),
                'warning' => fn () => $request->session()->get('warning'),
            ],
            'ziggy' => fn () => [
                ...(new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'siteSettings' => fn () => SiteSetting::publicSettings(),
            'socialLinks'  => fn () => SiteSetting::socials(),
            'notificationCenter' => fn () => $this->notificationCenterPayload($user),
        ]);
    }

    private function notificationCenterPayload($user): array
    {
        if (!$user || !Schema::hasTable('notifications')) {
            return [
                'items' => [],
                'unreadCount' => 0,
            ];
        }

        $notifications = $user->notifications()
            ->latest()
            ->limit(8)
            ->get()
            ->map(function ($notification) {
                $data = is_array($notification->data) ? $notification->data : [];

                return [
                    'id' => $notification->id,
                    'title' => (string) ($data['title'] ?? 'Notification'),
                    'message' => (string) ($data['message'] ?? ''),
                    'url' => $data['url'] ?? null,
                    'level' => (string) ($data['level'] ?? 'info'),
                    'meta' => is_array($data['meta'] ?? null) ? $data['meta'] : [],
                    'read_at' => optional($notification->read_at)?->toIso8601String(),
                    'created_at' => optional($notification->created_at)?->toIso8601String(),
                    'created_at_human' => optional($notification->created_at)?->diffForHumans(),
                ];
            })
            ->values();

        return [
            'items' => $notifications,
            'unreadCount' => $user->unreadNotifications()->count(),
        ];
    }
}
