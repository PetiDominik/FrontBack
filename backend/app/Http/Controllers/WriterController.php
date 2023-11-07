<?php

namespace App\Http\Controllers;

use App\Models\Writer;
use Illuminate\Http\Request;

class WriterController extends Controller
{
    //

    public function index() {
        return Writer::all();
    }

    public function store(Request $request) {
        $writer = new Writer();
        $writer->nev = $request->nev;
        $writer->szul = $request->szul;
        $writer->save();
    }
}
