<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Align tickets columns with application models/controllers.
        if (Schema::hasTable('tickets')) {
            if (Schema::hasColumn('tickets', 'assigned_to') && !Schema::hasColumn('tickets', 'assignee_id')) {
                DB::statement('ALTER TABLE tickets RENAME COLUMN assigned_to TO assignee_id');
            }

            if (!Schema::hasColumn('tickets', 'category')) {
                Schema::table('tickets', function (Blueprint $table) {
                    $table->string('category', 100)->nullable();
                });
            }

            if (!Schema::hasColumn('tickets', 'internal_note')) {
                Schema::table('tickets', function (Blueprint $table) {
                    $table->text('internal_note')->nullable();
                });
            }

            if (Schema::hasColumn('tickets', 'status')) {
                // Move from legacy enum values to normalized string statuses used by the app.
                DB::statement("ALTER TABLE tickets ALTER COLUMN status TYPE VARCHAR(32) USING REPLACE(status::text, 'in-progress', 'in_progress')");
            }
        }

        // Align ticket reply message field.
        if (Schema::hasTable('ticket_replies') && Schema::hasColumn('ticket_replies', 'body') && !Schema::hasColumn('ticket_replies', 'message')) {
            DB::statement('ALTER TABLE ticket_replies RENAME COLUMN body TO message');
        }
    }

    public function down(): void
    {
        if (Schema::hasTable('ticket_replies') && Schema::hasColumn('ticket_replies', 'message') && !Schema::hasColumn('ticket_replies', 'body')) {
            DB::statement('ALTER TABLE ticket_replies RENAME COLUMN message TO body');
        }

        if (Schema::hasTable('tickets')) {
            if (Schema::hasColumn('tickets', 'status')) {
                DB::statement("ALTER TABLE tickets ALTER COLUMN status TYPE VARCHAR(32) USING REPLACE(status::text, 'in_progress', 'in-progress')");
            }

            if (Schema::hasColumn('tickets', 'internal_note')) {
                Schema::table('tickets', function (Blueprint $table) {
                    $table->dropColumn('internal_note');
                });
            }

            if (Schema::hasColumn('tickets', 'category')) {
                Schema::table('tickets', function (Blueprint $table) {
                    $table->dropColumn('category');
                });
            }

            if (Schema::hasColumn('tickets', 'assignee_id') && !Schema::hasColumn('tickets', 'assigned_to')) {
                DB::statement('ALTER TABLE tickets RENAME COLUMN assignee_id TO assigned_to');
            }
        }
    }
};
