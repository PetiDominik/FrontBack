<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Selected extends Model
{
    public $timestamps = false;

    protected $fillable = [
        "writer_id",
    ];

    use HasFactory;
}
