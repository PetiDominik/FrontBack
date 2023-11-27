<?php

namespace App\Http\Controllers;

use App\Models\Selected;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SelectController extends Controller
{
    public function index() {
        return DB::select("SELECT w.*  FROM selecteds s INNER JOIN writers w ON w.writer_id = s.writer_id");
    }

    public function store(Request $request) {
        $selected = new Selected();
        $selected->writer_id = $request->writer_id;
        $selected->save();
    }

    public function delete($writer_id) {
        /* Selected::find($writer_id)->delete(); */
        DB::delete("DELETE FROM selecteds WHERE writer_id = $writer_id");
    }
}
