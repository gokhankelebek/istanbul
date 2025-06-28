import React from 'react';
import { Helmet } from 'react-helmet';
import RelatedPages from '../components/RelatedPages';
import Breadcrumbs from '../components/Breadcrumbs';
import ResourceHints from '../components/ResourceHints';

export default function TurkishFood() {
  return (
    <>
      <ResourceHints />
      <Helmet>
        <title>Authentic Turkish Food in Las Vegas | Best Döner Kebab | Istanbul Mediterranean</title>
        <meta
          name="description"
          content="Discover authentic Turkish food in Las Vegas at Istanbul Mediterranean. From succulent döner kebab to flaky baklava, we serve the Strip's top-rated, 100% halal Turkish cuisine until 5 AM daily. #1 on TripAdvisor!"
        />
        <meta name="keywords" content="turkish food las vegas, döner kebab, turkish restaurant, halal food, baklava, turkish cuisine, las vegas strip restaurant" />
        
        {/* Canonical URL - prevents duplicate content issues */}
        <link rel="canonical" href="https://www.istanbullv.com/turkishfood" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.istanbullv.com/turkishfood" />
        <meta property="og:title" content="Authentic Turkish Food in Las Vegas | Best Döner Kebab | Istanbul Mediterranean" />
        <meta property="og:description" content="Discover authentic Turkish food in Las Vegas at Istanbul Mediterranean. From succulent döner kebab to flaky baklava, we serve the Strip's top-rated, 100% halal Turkish cuisine." />
        <meta property="og:image" content="https://www.istanbullv.com/istanbul-hero.png" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://www.istanbullv.com/turkishfood" />
        <meta name="twitter:title" content="Authentic Turkish Food in Las Vegas | Best Döner Kebab | Istanbul Mediterranean" />
        <meta name="twitter:description" content="Discover authentic Turkish food in Las Vegas at Istanbul Mediterranean. From succulent döner kebab to flaky baklava, we serve the Strip's top-rated, 100% halal Turkish cuisine." />
        <meta name="twitter:image" content="https://www.istanbullv.com/istanbul-hero.png" />
        
        {/* Enhanced Structured Data with FAQ */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Restaurant",
            "name": "Istanbul Mediterranean Halal",
            "image": "https://www.istanbullv.com/istanbul-hero.png",
            "@id": "https://www.istanbullv.com/turkishfood",
            "url": "https://www.istanbullv.com/turkishfood",
            "servesCuisine": ["Turkish", "Mediterranean", "Halal"],
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "3615 S Las Vegas Blvd #101",
              "addressLocality": "Las Vegas",
              "addressRegion": "NV",
              "postalCode": "89109",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": 36.1230858,
              "longitude": -115.1724256
            },
            "telephone": "+1-725-900-8844",
            "openingHours": "Mo-Su 10:00-05:00",
            "priceRange": "$$",
            "menu": "https://www.istanbullv.com/menu",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.2",
              "reviewCount": "896"
            },
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": "https://www.istanbullv.com/turkishfood"
            },
            "hasMenu": {
              "@type": "Menu",
              "name": "Turkish Food Menu",
              "description": "Authentic Turkish cuisine including döner kebab, shawarma, and baklava",
              "hasMenuSection": [
                {
                  "@type": "MenuSection",
                  "name": "Signature Dishes",
                  "hasMenuItem": [
                    {
                      "@type": "MenuItem",
                      "name": "Döner Kebab Bowl / Wrap",
                      "description": "Slow-spit lamb-and-beef carved to order, nestled on Turkish rice or wrapped in house-baked pide."
                    },
                    {
                      "@type": "MenuItem",
                      "name": "Chicken Shawarma Plate",
                      "description": "Citrus-marinated chicken, charred and shaved thin, served with garlic sauce and pickled veggies."
                    },
                    {
                      "@type": "MenuItem",
                      "name": "Veggie Falafel Wrap",
                      "description": "Crispy-outside, herb-packed falafel with tahini and fresh salad (fan favorite on Yelp)."
                    },
                    {
                      "@type": "MenuItem",
                      "name": "Baklava",
                      "description": "40 flaky layers, pistachio-rich, baked daily for that just-out-of-the-oven crunch."
                    }
                  ]
                }
              ]
            }
          }
        `}</script>
        
        {/* FAQ Schema for Rich Results */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Is everything really halal?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes—every ingredient, from meat to sauces, is sourced from certified halal suppliers and prepared in a dedicated kitchen."
                }
              },
              {
                "@type": "Question",
                "name": "Do you have vegetarian or vegan options?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Absolutely. Try our falafel wrap, hummus mezze box, or fresh Greek salad—each can be made vegan upon request."
                }
              },
              {
                "@type": "Question",
                "name": "How spicy is Turkish food?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Most dishes are aromatic rather than fiery. For heat lovers, ask for our house-made acı pepper sauce on the side."
                }
              },
              {
                "@type": "Question",
                "name": "What makes Turkish cuisine different from other Mediterranean food?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Turkish cuisine uniquely blends Middle Eastern, Central Asian, and Balkan influences. It features distinctive cooking methods like vertical rotisserie (döner), specialized bread types like pide, and a greater emphasis on yogurt-based sauces and meat preparations compared to other Mediterranean cuisines."
                }
              },
              {
                "@type": "Question",
                "name": "What are the most popular Turkish dishes?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Beyond döner kebab, Turkish cuisine is known for dishes like iskender kebab (thinly sliced meat over bread with tomato sauce and yogurt), manti (Turkish dumplings), pide (boat-shaped flatbread with toppings), lahmacun (thin meat-topped flatbread), and a variety of mezze including hummus, baba ganoush, and dolma (stuffed vegetables)."
                }
              }
            ]
          }
        `}</script>
      </Helmet>

      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-4 pt-4">
        <Breadcrumbs customPaths={{'/turkishfood': 'Turkish Food'}} />
      </div>

      {/* Hero Section */}
      <section className="bg-cover bg-center text-white py-24" style={{ backgroundImage: "url('/istanbul-hero.png')" }}>
        <div className="container mx-auto max-w-4xl text-center backdrop-blur-sm/20">
          <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow">
            Authentic&nbsp;Turkish&nbsp;Food, <br className="hidden md:inline" />Right on&nbsp;the&nbsp;Strip
          </h1>
          <p className="mt-6 text-lg md:text-xl">
            Ranked #1 Turkish restaurant in Las Vegas on TripAdvisor and loved by 800+ Yelp reviewers, we bring Istanbul’s streets to your plate—late into the night.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <a
              href="https://orderdoner.com"
              className="px-8 py-4 bg-amber-500 hover:bg-amber-600 rounded-xl font-semibold shadow-lg transition"
            >
              Order Delivery (10 AM – 4 : 30 AM)
            </a>
            <a
              href="/menu"
              className="px-8 py-4 bg-white/10 hover:bg-white/20 rounded-xl font-semibold shadow-inner border border-white/20 transition"
            >
              Browse Full Menu
            </a>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-5xl px-6 py-16 space-y-14">
        {/* What makes Turkish food special */}
        <article className="space-y-6">
          <h2 className="text-3xl font-bold">What Makes&nbsp;Turkish Cuisine Unique?</h2>
          <p>
            Turkish food is the crossroads of the ancient Silk Road: bold Mediterranean herbs, sizzling Middle-Eastern spices,
            and the slow-roasted techniques of Anatolia. Staples like <em>döner kebab</em>, <em>pide</em>, and
            honey-soaked <em>baklava</em> are more than dishes—they’re centuries-old celebrations of hospitality.
          </p>
        </article>

        {/* Signature dishes */}
        <article className="grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Our Signature Dishes</h2>
            <ul className="list-disc list-inside space-y-3">
              <li>
                <strong>Döner Kebab Bowl / Wrap</strong> – Slow-spit lamb-and-beef carved to order, nestled on Turkish rice or
                wrapped in house-baked <em>pide</em>.
              </li>
              <li>
                <strong>Chicken Shawarma Plate</strong> – Citrus-marinated chicken, charred and shaved thin, served with garlic
                sauce and pickled veggies.
              </li>
              <li>
                <strong>Veggie Falafel Wrap</strong> – Crispy-outside, herb-packed falafel with tahini and fresh salad (fan
                favorite on Yelp).
              </li>
              <li>
                <strong>Baklava</strong> – 40 flaky layers, pistachio-rich, baked daily for that just-out-of-the-oven crunch.
              </li>
            </ul>
          </div>
          <img
            src="/menu/rice-bowls/beefandlamb-doner-shawarma-rice-bowl.webp"
            alt="Istanbul Mediterranean döner bowl"
            className="rounded-3xl shadow-lg object-cover w-full"
          />
        </article>

        {/* Late night + halal */}
        <article className="space-y-6">
          <h2 className="text-3xl font-bold">Open Late &amp; Always Halal</h2>
          <p>
            Whether it’s a quick lunch or a 4 AM bite after the clubs, we’ve got you. We fire up the grills from
            <strong> 10 : 00 AM to 5 : 00 AM daily</strong>, with delivery until 4 : 30 AM. Everything is certified 100 % halal—
            no compromises, ever.
          </p>
        </article>

        {/* Social proof */}
        <article className="bg-zinc-50 dark:bg-zinc-900 p-8 rounded-2xl shadow-inner">
          <h2 className="text-3xl font-bold text-center">Why Vegas Loves&nbsp;Us</h2>
          <blockquote className="mt-6 italic border-l-4 border-amber-500 pl-6">
            “Open late, super convenient after a night out. The Turkish bread is amazing!” — Mike D. (Google&nbsp;Review)
          </blockquote>
          <blockquote className="mt-4 italic border-l-4 border-amber-500 pl-6">
            “Best deal in Vegas. Hot, fresh, friendly, and friggin delicious.” — TripAdvisor Guest
          </blockquote>
        </article>

        {/* Visit us */}
        <article className="space-y-4 text-center">
          <h2 className="text-3xl font-bold">Visit Us</h2>
          <p>
            <strong>Grand Bazaar Shops @ Horseshoe</strong><br />
            3615 S Las Vegas Blvd #101<br />
            Las Vegas, NV 89109 • <a href="tel:+17259008844" className="underline">(725)&nbsp;900-8844</a>
          </p>
          <p className="mt-4">
            Planning ahead? <a href="https://orderdoner.com" className="underline">Order online</a> for pickup or delivery and
            skip the line.
          </p>
        </article>

        {/* FAQ */}
        <article className="space-y-6">
          <h2 className="text-3xl font-bold">FAQ</h2>
          <details className="p-4 border rounded-xl">
            <summary className="font-semibold cursor-pointer">Is everything really halal?</summary>
            <p className="mt-2">
              Yes—every ingredient, from meat to sauces, is sourced from certified halal suppliers and prepared in a dedicated
              kitchen.
            </p>
          </details>
          <details className="p-4 border rounded-xl">
            <summary className="font-semibold cursor-pointer">Do you have vegetarian or vegan options?</summary>
            <p className="mt-2">
              Absolutely. Try our falafel wrap, hummus mezze box, or fresh Greek salad—each can be made vegan upon request.
            </p>
          </details>
          <details className="p-4 border rounded-xl">
            <summary className="font-semibold cursor-pointer">How spicy is Turkish food?</summary>
            <p className="mt-2">
              Most dishes are aromatic rather than fiery. For heat lovers, ask for our house-made <em>acı</em> pepper sauce on
              the side.
            </p>
          </details>
          <details className="p-4 border rounded-xl">
            <summary className="font-semibold cursor-pointer">What makes Turkish cuisine different from other Mediterranean food?</summary>
            <p className="mt-2">
              Turkish cuisine uniquely blends Middle Eastern, Central Asian, and Balkan influences. It features distinctive cooking methods like vertical rotisserie (döner), specialized bread types like pide, and a greater emphasis on yogurt-based sauces and meat preparations compared to other Mediterranean cuisines.
            </p>
          </details>
          <details className="p-4 border rounded-xl">
            <summary className="font-semibold cursor-pointer">What are the most popular Turkish dishes?</summary>
            <p className="mt-2">
              Beyond döner kebab, Turkish cuisine is known for dishes like iskender kebab (thinly sliced meat over bread with tomato sauce and yogurt), manti (Turkish dumplings), pide (boat-shaped flatbread with toppings), lahmacun (thin meat-topped flatbread), and a variety of mezze including hummus, baba ganoush, and dolma (stuffed vegetables).
            </p>
          </details>
        </article>
        
        {/* Related Pages Section */}
        <RelatedPages currentPage="TurkishFood" />
      </section>
    </>
  );
}
