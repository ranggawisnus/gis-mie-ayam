<?php
 
namespace Database\Seeders;
 
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Location;
 
class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $locations = [
            [
                'name' => 'Mie Ayam Setia Kawan',
                'description' => 'A popular noodle shop that serves delicious chicken noodles with generous toppings and savory broth.',
                'image' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/00/bf/95/buffet-spread.jpg?w=500&h=-1&s=1',
                'lat' => -6.3659,
                'long' => 106.7638,
                'rating' => 4,
                'is_active' => 1
            ],
            [
                'name' => 'Mie Ayam Bangka Pak Jaya',
                'description' => 'A family-owned restaurant that specializes in Bangka-style chicken noodles with rich and spicy sauce.',
                'image' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/f3/b9/8c/babi-hong.jpg?w=600&h=-1&s=1',
                'lat' => -6.3612,
                'long' => 106.7612,
                'rating' => 4.5,
                'is_active' => 1
            ],
            [
                'name' => 'Mie Ayam Bakso Cak To',
                'description' => 'A cozy place to enjoy chicken noodles with meatballs, tofu, and crispy wontons. The portions are big and satisfying.',
                'image' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/f3/b7/92/kuluyuk-ayam.jpg?w=600&h=400&s=1',
                'lat' => -6.3587,
                'long' => 106.7645,
                'rating' => 3.5,
                'is_active' => 1
            ],
            [
                'name' => 'Mie Ayam Ceker Mas Gendut',
                'description' => 'A unique noodle shop that offers chicken feet as an optional topping. The chicken feet are tender and flavorful, and the noodles are chewy and tasty.',
                'image' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/e3/6d/6a/sushi-tei-plaza-indonesia.jpg?w=600&h=400&s=1',
                'lat' => -6.3554,
                'long' => 106.7678,
                'rating' => 4,
                'is_active' => 1
            ],
            [
                'name' => 'Mie Ayam Jamur Pak Kumis',
                'description' => 'A simple but satisfying noodle shop that serves chicken noodles with mushroom and green onion. The mushroom adds a nice texture and flavor to the dish.',
                'image' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/72/01/3b/diponegoro-dining-hall.jpg?w=600&h=400&s=1',
                'lat' => -6.3521,
                'long' => 106.7702,
                'rating' => 3,
                'is_active' => 1
            ],
            [
                'name' => 'Mie Ayam Yamin Pak Dede',
                'description' => 'A legendary noodle shop that has been serving sweet soy sauce chicken noodles for decades. The noodles are soft and slippery, and the sauce is sweet and savory.',
                'image' => 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/b3/5c/28/img20190307155916-largejpg.jpg?w=600&h=400&s=1',
                'lat' => -6.3489,
                'long' => 106.7735,
                'rating' => 5,
                'is_active' => 1
            ],
            [
                'name' => 'Mie Ayam Bakso Pak Slamet',
                'description' => "A halal noodle shop that serves chicken noodles with beef meatballs, fish balls, and tofu. The broth is clear and refreshing, and the meatballs are juicy and tender.",
                "image" => "https://menufyproduction.imgix.net/637865014833715521+765921.png?auto=compress,format&h=1080&w=1920&fit=max",
                 "lat" => -6.3457,
                 "long" => 106.7769,
                 "rating" => 4.5,
                 "is_active" => 1
             ],
             [
                 "name" => "Mie Ayam Pangsit Pak Budi",
                 "description" => "A modern noodle shop that serves chicken noodles with crispy fried dumplings. The dumplings are crunchy and savory, and the noodles are smooth and delicious.",
                 "image" => "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/12/50/6e/59/teras-dharmawangsa.jpg?w=600&h=-1&s=1",
                 "lat" => -6.3425,
                 "long" => 106.7803,
                 "rating" => 4,
                 "is_active" => 1
             ],
             [
                 "name" => "Mie Ayam Pedas Pak Rudi",
                 "description" => "A spicy noodle shop that serves chicken noodles with chili sauce and pickled vegetables. The chili sauce is hot and tangy, and the pickles add a crunchy and sour touch.",
                 "image" => "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/1a/00/bf/95/buffet-spread.jpg?w=500&h=-1&s=1",
                 "lat" => -6.3393,
                 "long" => 106.7837,
                 "rating" => 3.5,
                 "is_active" => 1
             ],
             [
                 "name" => "Mie Ayam Keju Pak Toni",
                 "description" => "A creative noodle shop that serves chicken noodles with cheese sauce and corned beef. The cheese sauce is creamy and cheesy, and the corned beef adds a meaty and salty flavor.",
                 "image" => "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/f3/b9/8c/babi-hong.jpg?w=600&h=-1&s=1",
                 "lat" => -6.3362,
                 "long" => 106.7871,
                 "rating" => 4,
                 "is_active" => 1
             ],
             ];
 
        foreach ($locations as $location) {
            Location::create($location);
        }
    }
}