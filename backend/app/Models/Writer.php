<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Writer extends Model
{
    use HasFactory;

    public $timestamps = false;

    protected $primaryKey = "writer_id";

    protected $fillable = [
        "nev",
        "szul",
    ];
}
