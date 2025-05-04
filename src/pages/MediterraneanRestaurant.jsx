import React from 'react';
import { Helmet } from 'react-helmet';

export default function MediterraneanRestaurant() {
  return (
    <>
      <Helmet>
        <title>Mediterranean Restaurant Las Vegas | Istanbul Mediterranean Halal</title>
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
      <section className="relative w-full h-[420px] md:h-[540px] flex items-center justify-center mb-12 overflow-hidden">
        <img
          src="/hero-mediterranean.jpg"
          alt="Mediterranean feast at Istanbul Mediterranean Restaurant in Las Vegas"
          className="absolute inset-0 w-full h-full object-cover object-center brightness-70 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/40" />
        <div className="relative z-10 text-center text-white px-4 w-full flex flex-col items-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg font-poppins">Las Vegas' Premier Mediterranean Restaurant</h1>
          <p className="text-xl md:text-2xl font-medium mb-6 max-w-3xl mx-auto drop-shadow">Savor the vibrant flavors of Turkey and the Mediterranean, crafted with passion, tradition, and the freshest halal ingredients. Family-owned. Open late. Loved by locals & visitors alike.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="/menu" className="inline-block bg-primary hover:bg-istanbulRed text-white font-bold px-8 py-3 rounded-xl text-lg shadow-lg transition">View Menu</a>
            <a href="https://orderdoner.com" target="_blank" rel="noopener noreferrer" className="inline-block bg-istanbulRed hover:bg-red-700 text-white font-bold px-8 py-3 rounded-xl text-lg shadow-lg transition">Order Online</a>
          </div>
        </div>
      </section>

      {/* Our Story & Chef */}
      <section className="py-16 bg-offwhite text-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-5xl mx-auto">
          <img src="/hero_chef_wide.jpg" alt="Chef at Istanbul Mediterranean" className="w-72 h-72 rounded-2xl object-cover shadow-lg mb-6 md:mb-0 border-4 border-saffron/40" onError={e => e.target.style.display='none'} />
          <div className="flex-1">
            <h2 className="text-3xl font-semibold mb-3 text-primary">Our Story</h2>
            <p className="text-lg text-charcoal mb-4">At Istanbul Mediterranean, our journey began with a dream: to bring the rich culinary heritage of Turkey and the Mediterranean to the heart of Las Vegas. Family-owned and operated, our recipes are passed down through generations, blending tradition with a modern twist. Every plate is a celebration of culture, community, and authentic hospitality.</p>
            <div className="bg-white p-4 rounded-xl shadow mb-4 border-l-4 border-istanbulRed/70 max-w-xl mx-auto">
              <span className="italic text-saffron text-lg">“We cook from the heart, using only the finest halal ingredients. Every guest is family.”</span>
            </div>
            <div className="mt-6">
              <span style={{ fontFamily: 'Pacifico, cursive', fontSize: '2rem', color: '#b48b3c', display: 'inline-block' }}>
                Istanbul Family
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Enhanced */}
      <section className="container mx-auto max-w-5xl px-4 py-14 bg-white/90 rounded-xl shadow mb-14">
        <h2 className="text-2xl font-bold text-istanbulRed mb-8 text-center">Why Choose Istanbul Mediterranean?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center p-6 rounded-2xl shadow bg-offwhite border border-saffron/10">
            <img src="/halal-vegan.png" alt="Halal Certified" className="w-12 h-12 mb-2" />
            <span className="font-bold text-lg mb-1">100% Halal</span>
            <span className="text-herb text-sm">Ethically sourced, halal-certified meats in every dish.</span>
          </div>
          <div className="flex flex-col items-center p-6 rounded-2xl shadow bg-offwhite border border-saffron/10">
            <img src="/family-owned.png" alt="Family Owned" className="w-12 h-12 mb-2" />
            <span className="font-bold text-lg mb-1">Family-Owned</span>
            <span className="text-herb text-sm">Warm, friendly service from our family to yours.</span>
          </div>
          <div className="flex flex-col items-center p-6 rounded-2xl shadow bg-offwhite border border-saffron/10">
            <img src="/doner.png" alt="Doner" className="w-12 h-12 mb-2" />
            <span className="font-bold text-lg mb-1">Signature Döner</span>
            <span className="text-herb text-sm">Our house specialty: authentic Turkish döner, carved fresh daily.</span>
          </div>
          <div className="flex flex-col items-center p-6 rounded-2xl shadow bg-offwhite border border-saffron/10">
            <img src="/logo.png" alt="Las Vegas Strip" className="w-12 h-12 mb-2" />
            <span className="font-bold text-lg mb-1">Prime Strip Location</span>
            <span className="text-herb text-sm">Steps from the action, open late for your cravings.</span>
          </div>
        </div>
      </section>

      {/* Signature Dishes Carousel */}
      <section className="container mx-auto max-w-6xl px-4 py-14">
        <h2 className="text-2xl font-bold mb-8 text-center text-primary">Signature Dishes</h2>
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-8 min-w-[700px] md:min-w-0">
            {[
              { img: "/menu/pita-sandwiches/falafel-pita.webp", name: "Falafel Pita", desc: "Crispy falafel, fresh veggies, and creamy tahini in warm pita." },
              { img: "/menu/pita-sandwiches/beefandlamb-doner-shawarma-pita.webp", name: "Beef & Lamb Döner Pita", desc: "Classic döner, slow-roasted and bursting with flavor." },
              { img: "/menu/pita-sandwiches/chicken-doner-shawarma-pita.webp", name: "Chicken Döner Pita", desc: "Tender chicken döner, Mediterranean spices, and house sauce." },
              { img: "/menu/salad-bowls/veggie-bowl.webp", name: "Veggie Bowl", desc: "A vibrant bowl of Mediterranean veggies, grains, and herbs." },
              { img: "/menu/sides/hummus.webp", name: "Hummus", desc: "Our signature creamy hummus, made fresh daily." },
              { img: "/menu/desserts/baklava.webp", name: "Baklava", desc: "Flaky, nutty, and sweet—our famous Turkish dessert." },
            ].map((dish, i) => (
              <div key={i} className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-4 w-60 min-w-[220px] hover:scale-105 transition-transform cursor-pointer">
                <img src={dish.img} alt={dish.name} className="rounded-xl shadow object-cover w-full h-40 mb-2" />
                <div className="font-semibold text-lg text-primary mb-1">{dish.name}</div>
                <div className="text-sm text-charcoal text-center">{dish.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ambience & Experience */}
      <section className="container mx-auto max-w-5xl px-4 py-14 mb-12">
        <h2 className="text-2xl font-bold mb-8 text-center text-primary">Ambience & Experience</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <img src="/about/about_hero.jpg" alt="Interior of Istanbul Mediterranean" className="rounded-2xl shadow-lg object-cover h-52 w-full" />
          <img src="/hero_chef_wide.jpg" alt="Chef at Istanbul Mediterranean" className="rounded-2xl shadow-lg object-cover h-52 w-full" />
          <img src="/menu/desserts/baklava.webp" alt="Baklava at Istanbul Mediterranean" className="rounded-2xl shadow-lg object-cover h-52 w-full" />
        </div>
        <p className="text-center text-lg text-charcoal mt-6 max-w-3xl mx-auto">Whether you’re celebrating with friends, grabbing a quick lunch, or enjoying a late-night feast, our restaurant is your home for unforgettable Mediterranean moments in Las Vegas.</p>
      </section>

      {/* Menu Highlights */}
      <section className="container mx-auto max-w-4xl px-4 py-10 mb-12 bg-white/80 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">Menu Highlights</h2>
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="/menu#doner" className="bg-primary hover:bg-istanbulRed text-white px-6 py-2 rounded-lg font-semibold shadow">Döner & Shawarma</a>
          <a href="/menu#falafel" className="bg-primary hover:bg-istanbulRed text-white px-6 py-2 rounded-lg font-semibold shadow">Falafel</a>
          <a href="/menu#pita" className="bg-primary hover:bg-istanbulRed text-white px-6 py-2 rounded-lg font-semibold shadow">Pita Sandwiches</a>
          <a href="/menu#bowls" className="bg-primary hover:bg-istanbulRed text-white px-6 py-2 rounded-lg font-semibold shadow">Bowls</a>
          <a href="/menu#desserts" className="bg-primary hover:bg-istanbulRed text-white px-6 py-2 rounded-lg font-semibold shadow">Desserts</a>
          <a href="/menu#vegan" className="bg-primary hover:bg-istanbulRed text-white px-6 py-2 rounded-lg font-semibold shadow">Vegan & Vegetarian</a>
        </div>
      </section>

      {/* Google Map & Contact */}
      <section className="container mx-auto max-w-4xl px-4 py-10 mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">Visit Us</h2>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <iframe
            title="Istanbul Mediterranean Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.897707266276!2d-115.17183868474617!3d36.11722288009725!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c8c4381a1d4c3b%3A0x3c2a6e7f6b5a5f5a!2sIstanbul%20Mediterranean!5e0!3m2!1sen!2sus!4v1683071234567!5m2!1sen!2sus"
            width="100%"
            height="280"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-xl shadow-lg border w-full md:w-2/3"
          ></iframe>
          <div className="flex-1 text-center md:text-left">
            <div className="mb-2 font-bold text-lg">Istanbul Mediterranean</div>
            <div>3615 S Las Vegas Blvd #101, Las Vegas, NV 89109</div>
            <div className="mb-2">(Inside Grand Bazaar Shops, next to Bally’s/Horseshoe)</div>
            <div className="mb-2">Phone: <a href="tel:+17025551234" className="text-primary hover:underline">(702) 555-1234</a></div>
            <div className="mb-2">Hours: 11:00am – 5:00am, 7 days a week</div>
            <a href="/contact" className="inline-block mt-4 bg-istanbulRed hover:bg-primary text-white px-6 py-2 rounded-lg font-semibold shadow">Contact Us</a>
          </div>
        </div>
      </section>

      {/* Social Proof & Awards */}
      <section className="container mx-auto max-w-5xl px-4 py-14 mb-12">
        <h2 className="text-2xl font-bold mb-8 text-center text-primary">What Our Guests Say</h2>
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <a href="https://www.yelp.com/biz/istanbul-mediterranean-las-vegas" target="_blank" rel="noopener noreferrer" className="bg-[#d32323] hover:bg-[#b21e1e] text-white px-4 py-2 rounded-lg font-semibold shadow flex items-center gap-2"><img src="/yelp.png" alt="Yelp" className="w-5 h-5" /> Yelp</a>
          <a href="https://www.google.com/maps/place/Istanbul+Mediterranean" target="_blank" rel="noopener noreferrer" className="bg-[#4285f4] hover:bg-[#3367d6] text-white px-4 py-2 rounded-lg font-semibold shadow flex items-center gap-2"><img src="/google.png" alt="Google" className="w-5 h-5" /> Google</a>
          <a href="https://www.tripadvisor.com/Restaurant_Review-g45963-d10000000-Reviews-Istanbul_Mediterranean-Las_Vegas_Nevada.html" target="_blank" rel="noopener noreferrer" className="bg-[#34e0a1] hover:bg-[#2bb88a] text-white px-4 py-2 rounded-lg font-semibold shadow flex items-center gap-2"><img src="/tripadvisor.png" alt="TripAdvisor" className="w-5 h-5" /> TripAdvisor</a>
          <a href="https://www.instagram.com/istanbulmedlv/" target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-white px-4 py-2 rounded-lg font-semibold shadow flex items-center gap-2"><img src="/instagram.png" alt="Instagram" className="w-5 h-5" /> Instagram</a>
        </div>
      </section>

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


    </>
  );
}
