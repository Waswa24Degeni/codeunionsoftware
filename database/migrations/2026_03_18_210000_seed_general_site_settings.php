<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        $defaults = [
            ['key' => 'site_name', 'value' => 'CodeUnion Software', 'group' => 'general'],
            ['key' => 'site_tagline', 'value' => 'We build modern web solutions powered by AI, crafted for growth.', 'group' => 'general'],
            ['key' => 'contact_email', 'value' => 'hello@codeunion.dev', 'group' => 'general'],
            ['key' => 'contact_phone', 'value' => '+1 (555) 000-0000', 'group' => 'general'],
            ['key' => 'contact_address', 'value' => 'Remote - Worldwide', 'group' => 'general'],
            ['key' => 'business_hours', 'value' => 'Mon-Fri, 9:00 AM - 6:00 PM', 'group' => 'general'],
            ['key' => 'privacy_policy_url', 'value' => '#', 'group' => 'general'],
            ['key' => 'terms_of_service_url', 'value' => '#', 'group' => 'general'],
            ['key' => 'meta_title', 'value' => 'CodeUnion Software', 'group' => 'general'],
            ['key' => 'meta_description', 'value' => 'CodeUnion Software builds modern websites, apps, and AI-powered digital solutions.', 'group' => 'general'],
            ['key' => 'footer_copyright', 'value' => 'All rights reserved.', 'group' => 'general'],
        ];

        foreach ($defaults as $row) {
            DB::table('site_settings')->updateOrInsert(
                ['key' => $row['key']],
                [
                    'value' => $row['value'],
                    'group' => $row['group'],
                    'updated_at' => now(),
                    'created_at' => now(),
                ]
            );
        }
    }

    public function down(): void
    {
        DB::table('site_settings')->whereIn('key', [
            'site_name',
            'site_tagline',
            'contact_email',
            'contact_phone',
            'contact_address',
            'business_hours',
            'privacy_policy_url',
            'terms_of_service_url',
            'meta_title',
            'meta_description',
            'footer_copyright',
        ])->delete();
    }
};
