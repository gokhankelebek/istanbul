import React from 'react';
import { Helmet } from 'react-helmet';

export default function MediterraneanRestaurant() {
  return (
    <>
      <Helmet>
        <title>Mediterranean Restaurant Las Vegas | Istanbul Mediterranean</title>
        <meta name="description" content="Discover authentic Mediterranean cuisine at Istanbul Mediterranean in Las Vegas. Enjoy doner, wraps, pita, and more in a family-owned restaurant with halal options." />
        <meta property="og:title" content="Mediterranean Restaurant Las Vegas | Istanbul Mediterranean" />
        <meta property="og:description" content="Discover authentic Mediterranean cuisine at Istanbul Mediterranean in Las Vegas. Enjoy doner, wraps, pita, and more in a family-owned restaurant with halal options." />
        <meta property="og:image" content="/hero-mediterranean.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mediterranean Restaurant Las Vegas | Istanbul Mediterranean" />
        <meta name="twitter:description" content="Discover authentic Mediterranean cuisine at Istanbul Mediterranean in Las Vegas. Enjoy doner, wraps, pita, and more in a family-owned restaurant with halal options." />
        <meta name="twitter:image" content="/hero-mediterranean.jpg" />
        <link rel="canonical" href="https://www.istanbullv.com/mediterranean-restaurant" />
        <script type="application/ld+json">{JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Restaurant',
          name: 'Istanbul Mediterranean',
          image: '/hero-mediterranean.jpg',
          servesCuisine: ['Mediterranean', 'Turkish'],
          address: {
            '@type': 'PostalAddress',
            streetAddress: '123 Las Vegas Blvd',
            addressLocality: 'Las Vegas',
            addressRegion: 'NV',
            postalCode: '89109',
            addressCountry: 'US',
          },
          url: 'https://www.istanbullv.com/mediterranean-restaurant',
          priceRange: '$$',
          telephone: '+1-702-555-1234',
        })}</script>
      </Helmet>

      {/* Hero Section */}
      <div className="relative w-full h-[360px] md:h-[480px] flex items-center justify-center mb-10">
        <img
          src="/hero-mediterranean.jpg"
          alt="Mediterranean feast at Istanbul Mediterranean Restaurant in Las Vegas"
          className="absolute inset-0 w-full h-full object-cover brightness-75"
        />
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">Mediterranean Restaurant in Las Vegas</h1>
          <p className="text-lg md:text-2xl font-medium mb-6 max-w-2xl mx-auto drop-shadow">Experience authentic Turkish and Mediterranean cuisine, made with passion and the freshest ingredients.</p>
          <a href="https://orderdoner.com" target="_blank" rel="noopener noreferrer" className="inline-block bg-istanbulRed hover:bg-red-700 text-white font-bold px-8 py-3 rounded-xl text-lg shadow-lg transition">Order Online</a>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="container mx-auto max-w-4xl px-4 py-8 bg-white/80 rounded-xl shadow mb-10">
        <h2 className="text-2xl font-bold text-istanbulRed mb-4 text-center">Why Choose Us?</h2>
        <ul className="list-disc ml-8 text-lg space-y-2">
          <li>Authentic Mediterranean & Turkish cuisine</li>
          <li>Halal-certified meats and ingredients</li>
          <li>Vegetarian and vegan options</li>
          <li>Convenient Las Vegas Strip location</li>
          <li>Open late for your cravings</li>
        </ul>
      </div>

      {/* Dish Gallery */}
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">Signature Dishes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center">
            <img src="/menu/salad-bowls/veggie-bowl.webp" alt="Veggie Bowl" className="rounded-xl shadow object-cover w-full h-56 mb-2" />
            <div className="font-semibold text-lg text-center">Veggie Bowl</div>
          </div>
          <div className="flex flex-col items-center">
            <img src="/menu/pita-sandwiches/falafel-pita.webp" alt="Falafel Pita" className="rounded-xl shadow object-cover w-full h-56 mb-2" />
            <div className="font-semibold text-lg text-center">Falafel Pita</div>
          </div>
          <div className="flex flex-col items-center">
            <img src="/menu/pita-sandwiches/beefandlamb-doner-shawarma-pita.webp" alt="Beef&Lamb Döner (Shawarma) Pita" className="rounded-xl shadow object-cover w-full h-56 mb-2" />
            <div className="font-semibold text-lg text-center">Beef&Lamb Döner (Shawarma) Pita</div>
          </div>
          <div className="flex flex-col items-center">
            <img src="/menu/turkish-pita/chicken-doner-shawarma-turkish-pita.webp" alt="Chicken Döner (Shawarma) Turkish Pita" className="rounded-xl shadow object-cover w-full h-56 mb-2" />
            <div className="font-semibold text-lg text-center">Chicken Döner (Shawarma) Turkish Pita</div>
          </div>
          <div className="flex flex-col items-center">
            <img src="/menu/sides/hummus.webp" alt="Hummus" className="rounded-xl shadow object-cover w-full h-56 mb-2" />
            <div className="font-semibold text-lg text-center">Hummus</div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="container mx-auto max-w-3xl px-4 py-8 mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">What Our Guests Say</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-istanbulRed text-3xl mb-2">★ ★ ★ ★ ★</span>
            <p className="text-gray-700 italic mb-2">“Best doner in Vegas! The flavors are authentic and the staff is so friendly.”</p>
            <span className="font-bold text-primary">— Sarah K.</span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-istanbulRed text-3xl mb-2">★ ★ ★ ★ ★</span>
            <p className="text-gray-700 italic mb-2">“Loved the vegan options and the baklava was heavenly. Highly recommend!”</p>
            <span className="font-bold text-primary">— Daniel R.</span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-istanbulRed text-3xl mb-2">★ ★ ★ ★ ★</span>
            <p className="text-gray-700 italic mb-2">“Perfect late-night spot after a show on the Strip. Will be back!”</p>
            <span className="font-bold text-primary">— Maria S.</span>
          </div>
        </div>
      </div>
    </>
  );
}
