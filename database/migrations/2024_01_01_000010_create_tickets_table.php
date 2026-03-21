<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tickets', function (Blueprint $table) {
            $table->id();
            $table->foreignId('client_id')->constrained('clients')->cascadeOnDelete();
            $table->foreignId('assigned_to')->nullable()->constrained('users')->nullOnDelete();
            $table->string('subject');
            $table->text('body')->nullable();
            $table->enum('priority', ['low', 'medium', 'high', 'urgent'])->default('medium');
            $table->enum('status', ['open', 'in-progress', 'waiting', 'closed'])->default('open');
            $table->timestamp('closed_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
            
            $table->fullText(['subject', 'body']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tickets');
    }
};
