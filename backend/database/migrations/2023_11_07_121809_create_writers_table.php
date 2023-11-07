<?php

use App\Models\Writer;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('writers', function (Blueprint $table) {
            $table->id("writer_id");
            $table->string("nev");
            $table->date("szul");
        });

        Writer::create(["nev" => "Én", "szul" => "19000101"]);
        Writer::create(["nev" => "Te", "szul" => "19000102"]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('writers');
    }
};
