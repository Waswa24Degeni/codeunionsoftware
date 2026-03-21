<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        $this->alignClients();
        $this->alignQuotations();
        $this->alignQuotationItems();
        $this->alignTicketStatusConstraint();
    }

    public function down(): void
    {
        // Keep down migration intentionally conservative to avoid destructive rollback
        // on production data that may rely on the new normalized schema.
    }

    private function alignClients(): void
    {
        if (!Schema::hasTable('clients')) {
            return;
        }

        if (Schema::hasColumn('clients', 'user_id')) {
            DB::statement('ALTER TABLE clients ALTER COLUMN user_id DROP NOT NULL');
        }

        if (!Schema::hasColumn('clients', 'website')) {
            Schema::table('clients', function (Blueprint $table) {
                $table->string('website')->nullable();
            });
        }

        DB::statement('ALTER TABLE clients DROP CONSTRAINT IF EXISTS clients_status_check');
        DB::statement("ALTER TABLE clients ADD CONSTRAINT clients_status_check CHECK (status IN ('active','inactive','lead','suspended'))");
    }

    private function alignQuotations(): void
    {
        if (!Schema::hasTable('quotations')) {
            return;
        }

        if (!Schema::hasColumn('quotations', 'title')) {
            Schema::table('quotations', function (Blueprint $table) {
                $table->string('title')->nullable();
            });
        }

        if (!Schema::hasColumn('quotations', 'description')) {
            Schema::table('quotations', function (Blueprint $table) {
                $table->text('description')->nullable();
            });
        }

        if (!Schema::hasColumn('quotations', 'discount')) {
            Schema::table('quotations', function (Blueprint $table) {
                $table->decimal('discount', 5, 2)->default(0);
            });
        }

        if (!Schema::hasColumn('quotations', 'valid_until')) {
            Schema::table('quotations', function (Blueprint $table) {
                $table->date('valid_until')->nullable();
            });
        }

        if (Schema::hasColumn('quotations', 'expires_at') && Schema::hasColumn('quotations', 'valid_until')) {
            DB::statement('UPDATE quotations SET valid_until = DATE(expires_at) WHERE valid_until IS NULL AND expires_at IS NOT NULL');
        }

        DB::statement('ALTER TABLE quotations DROP CONSTRAINT IF EXISTS quotations_status_check');
        DB::statement("ALTER TABLE quotations ADD CONSTRAINT quotations_status_check CHECK (status IN ('draft','sent','pending','accepted','declined','approved','expired'))");
    }

    private function alignQuotationItems(): void
    {
        if (!Schema::hasTable('quotation_items')) {
            return;
        }

        if (!Schema::hasColumn('quotation_items', 'qty')) {
            Schema::table('quotation_items', function (Blueprint $table) {
                $table->decimal('qty', 12, 2)->default(1);
            });
        }

        if (!Schema::hasColumn('quotation_items', 'sort_order')) {
            Schema::table('quotation_items', function (Blueprint $table) {
                $table->integer('sort_order')->default(0);
            });
        }

        if (Schema::hasColumn('quotation_items', 'quantity') && Schema::hasColumn('quotation_items', 'qty')) {
            DB::statement('UPDATE quotation_items SET qty = quantity WHERE qty IS NULL OR qty = 0');
        }
    }

    private function alignTicketStatusConstraint(): void
    {
        if (!Schema::hasTable('tickets') || !Schema::hasColumn('tickets', 'status')) {
            return;
        }

        DB::statement('ALTER TABLE tickets DROP CONSTRAINT IF EXISTS tickets_status_check');
        DB::statement("ALTER TABLE tickets ADD CONSTRAINT tickets_status_check CHECK (status IN ('open','in-progress','in_progress','waiting','resolved','closed'))");
    }
};
