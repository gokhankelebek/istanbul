import React from "react";
// Replace with your actual optimized hero image path or import
// Hero image is served from public folder
const heroImg = "/menu/french-fries-bowls/chicken-doner-shawarma-french-fries-bowl.webp";

/**
 * Yelp Landing Page – /yelp
 * Designed for Istanbul Mediterranean (Las Vegas) – React + Tailwind (Windsurf)
 * --------------------------------------------------
 * • Hero food photo to spark appetite
 * • Three bullet USPs (hours, halal, delivery speed)
 * • Social proof carousel (swap quotes as you like)
 * • Sticky bottom bar CTA on mobile
 * • One primary CTA → OrderDoner.com with UTM tags
 */

const REVIEW_QUOTES = [
  {
    quote:
      "Best shawarma on the Strip! Huge portions & fresh halal meat. Lifesaver after the club.",
    author: "— ★★★★★ Yelp Review",
  },
  {
    quote:
      "Delivery hit my hotel room in 20 min and it was still sizzling. Fries bowl is a 10/10!",
    author: "— ★★★★★ Google Review",
  },
];

import { ORDER_LINKS } from "../lib/orderLinks";

export default function YelpLandingPage() {
  const orderUrl = ORDER_LINKS.yelp;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-neutral-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 rounded-b-3xl shadow-2xl">
        <img
          src={heroImg}
          alt="Chicken Döner Fries Bowl—crispy crinkle fries topped with halal chicken shawarma"
          className="w-full h-[420px] object-cover object-center opacity-85 md:h-[520px]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/40 to-black/70" />
        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-12 text-slate-50">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg">
            Late‑Night Cravings? <br className="hidden md:inline" /> Meet the <span className="text-amber-400">Chicken
            Döner Fries Bowl</span>
          </h1>
          <p className="max-w-lg mb-6 text-lg md:text-xl leading-relaxed">
            100 % halal, piled high with juicy shawarma & crispy crinkle fries—delivered to your hotel or ready for
            pickup in minutes.
          </p>
          <a
            id="order-btn"
            href={orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white shadow-xl text-lg font-semibold px-8 py-3 rounded-xl transition-colors duration-200 text-center"
          >
            Order in 30&nbsp;sec ↗
          </a>
        </div>
      </section>

      {/* Authentic Turkish Doner USP with Icon */}
      <section className="flex flex-col items-center py-6">
        <img src="/doner-icon.png" alt="Doner Kebab Icon" className="w-12 h-12 mb-3 object-contain" />
        <h2 className="text-lg md:text-xl font-bold text-center mb-2">Authentic Turkish Doner</h2>
        <p className="text-gray-700 text-center text-base md:text-lg max-w-xs leading-snug">
          Juicy, flavorful, and carved fresh daily—just like Istanbul.
        </p>
      </section>

      {/* USPs */}
      <section className="py-10 md:py-14 px-6 md:px-10 grid gap-6 md:grid-cols-3 max-w-6xl mx-auto">
        {[
          { icon: "⏰", text: "Open every night until 5 AM" },
          { icon: "🕌", text: "100 % Halal‑certified meats" },
          { icon: "🚚", text: "Avg. delivery <30 min to Strip hotels" },
        ].map((item, i) => (
          <div key={i} className="rounded-2xl shadow-md bg-white">
            <div className="flex items-center gap-4 p-6 md:p-8">
              <span className="text-3xl md:text-4xl">{item.icon}</span>
              <p className="text-lg font-medium">{item.text}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Mid-page Desktop CTA */}
      <section className="hidden sm:block text-center py-6">
        <a
          href={orderUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-amber-500 hover:bg-amber-600 text-white text-lg font-semibold px-10 py-4 rounded-xl shadow-md"
        >
          Get Yours in 30 Sec ↗
        </a>
      </section>

      {/* Social Proof */}
      <section className="pb-16 md:pb-24 px-6 md:px-10 max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">Loved by 900+ hungry Vegas foodies</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {REVIEW_QUOTES.map((r, idx) => (
            <blockquote
              key={idx}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border-l-4 border-amber-500"
            >
              <p className="text-lg italic mb-3">“{r.quote}”</p>
              <footer className="text-sm font-semibold text-amber-600">{r.author}</footer>
            </blockquote>
          ))}
        </div>
      </section>



    </div>
  );
}
