<?php
 
namespace App\Http\Controllers;
 
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Location;
 
class LocationController extends Controller
{
    public function index(): Response{
        $locations = Location::all();
 
        return Inertia::render('Location/Index', [
            'locations' => $locations
        ]);
    }
}