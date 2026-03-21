<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (! Schema::hasTable('blog_posts')) {
            return;
        }

        // Allow long external image URLs used by blog featured image field.
        DB::statement('ALTER TABLE blog_posts ALTER COLUMN featured_image TYPE TEXT');
    }

    public function down(): void
    {
        if (! Schema::hasTable('blog_posts')) {
            return;
        }

        // Revert to varchar(255), truncating any oversized values safely.
        DB::statement('ALTER TABLE blog_posts ALTER COLUMN featured_image TYPE VARCHAR(255) USING LEFT(featured_image, 255)');
    }
};
