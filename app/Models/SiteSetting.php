<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Cache;

class SiteSetting extends Model
{
    protected $fillable = ['key', 'value', 'group'];

    private const PUBLIC_SETTINGS_CACHE_KEY = 'site_settings_public';
    private const SOCIAL_SETTINGS_CACHE_KEY = 'site_settings_social';

    public const PUBLIC_SETTINGS_DEFAULTS = [
        'site_name'            => 'CodeUnion Software',
        'site_tagline'         => 'We build modern web solutions powered by AI, crafted for growth.',
        'company_logo'         => '',
        'contact_email'        => 'hello@codeunion.dev',
        'contact_phone'        => '+1 (555) 000-0000',
        'contact_address'      => 'Remote - Worldwide',
        'business_hours'       => 'Mon-Fri, 9:00 AM - 6:00 PM',
        'privacy_policy_url'   => '#',
        'terms_of_service_url' => '#',
        'meta_title'           => 'CodeUnion Software',
        'meta_description'     => 'CodeUnion Software builds modern websites, apps, and AI-powered digital solutions.',
        'footer_copyright'     => 'All rights reserved.',
        'team_members_json'    => '',
        'services_json'        => '',
    ];

    /** Get a single setting value by key. */
    public static function get(string $key, mixed $default = null): mixed
    {
        return Cache::remember("site_setting_{$key}", 3600, function () use ($key, $default) {
            return static::where('key', $key)->value('value') ?? $default;
        });
    }

    /** Set (upsert) a single key. */
    public static function set(string $key, mixed $value, string $group = 'general'): void
    {
        static::updateOrCreate(['key' => $key], ['value' => $value, 'group' => $group]);
        Cache::forget("site_setting_{$key}");
    }

    /** Set many keys in one grouped operation. */
    public static function setMany(array $settings, string $group = 'general'): void
    {
        foreach ($settings as $key => $value) {
            static::set($key, $value, $group);
        }
    }

    /** Return site-wide public settings with defaults. */
    public static function publicSettings(): array
    {
        return Cache::remember(self::PUBLIC_SETTINGS_CACHE_KEY, 3600, function () {
            $stored = static::whereIn('key', array_keys(self::PUBLIC_SETTINGS_DEFAULTS))
                ->pluck('value', 'key')
                ->toArray();

            return array_merge(self::PUBLIC_SETTINGS_DEFAULTS, $stored);
        });
    }

    /** Return all social links as an associative array. */
    public static function socials(): array
    {
        return Cache::remember(self::SOCIAL_SETTINGS_CACHE_KEY, 3600, function () {
            return static::where('group', 'social')
                ->get()
                ->mapWithKeys(fn ($s) => [str_replace('social_', '', $s->key) => $s->value])
                ->toArray();
        });
    }

    /** Flush cached public settings after a write. */
    public static function flushPublicCache(): void
    {
        Cache::forget(self::PUBLIC_SETTINGS_CACHE_KEY);
    }

    /** Flush the social cache after any write. */
    public static function flushSocialCache(): void
    {
        Cache::forget(self::SOCIAL_SETTINGS_CACHE_KEY);
    }
}
