<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('portfolio_project_technology', function (Blueprint $table) {
            $table->id();
            $table->foreignId('portfolio_project_id')->constrained('portfolio_projects')->cascadeOnDelete();
            $table->foreignId('technology_id')->constrained('technologies')->cascadeOnDelete();
            $table->timestamps();
            
            $table->unique(['portfolio_project_id', 'technology_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('portfolio_project_technology');
    }
};
