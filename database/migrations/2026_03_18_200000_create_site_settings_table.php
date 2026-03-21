<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('site_settings', function (Blueprint $table) {
            $table->id();
            $table->string('key')->unique();
            $table->text('value')->nullable();
            $table->string('group')->default('general');
            $table->timestamps();
        });

        // Seed default social links (empty — admin fills them in)
        $defaults = [
            ['key' => 'social_facebook',  'group' => 'social', 'value' => ''],
            ['key' => 'social_twitter',   'group' => 'social', 'value' => ''],
            ['key' => 'social_instagram', 'group' => 'social', 'value' => ''],
            ['key' => 'social_linkedin',  'group' => 'social', 'value' => ''],
            ['key' => 'social_youtube',   'group' => 'social', 'value' => ''],
            ['key' => 'social_github',    'group' => 'social', 'value' => ''],
            ['key' => 'social_tiktok',    'group' => 'social', 'value' => ''],
            ['key' => 'social_whatsapp',  'group' => 'social', 'value' => ''],
        ];

        foreach ($defaults as $row) {
            DB::table('site_settings')->insert(array_merge($row, [
                'created_at' => now(),
                'updated_at' => now(),
            ]));
        }
    }

    public function down(): void
    {
        Schema::dropIfExists('site_settings');
    }
};
