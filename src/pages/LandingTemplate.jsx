import React from "react";
import { ORDER_LINKS } from "../lib/orderLinks";

export default function LandingTemplate({
  source, // "yelp", "google", …
  hero,
  headline,
  subhead,
  reviewQuotes,
}) {
  const orderUrl = ORDER_LINKS[source];
  return (
    <div className="min-h-screen bg-white">
      <section className="relative flex flex-col items-center justify-center p-8">
        <img
          src={hero}
          alt="Chicken Döner Fries Bowl from Istanbul Mediterranean – Vegas Strip late-night halal"
          className="w-full max-w-2xl rounded-xl shadow-lg mb-6"
        />
        <h1 className="text-3xl font-bold mb-2 text-center">{headline}</h1>
        <p className="text-lg text-gray-700 mb-4 text-center">{subhead}</p>
        <a
          href={orderUrl}
          className="bg-amber-400 hover:bg-amber-500 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all text-lg mb-6"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Order Online CTA"
        >
          Order Online
        </a>
        <div className="mt-8 max-w-xl mx-auto">
          {reviewQuotes && reviewQuotes.length > 0 && (
            <div className="space-y-6">
              {reviewQuotes.map((q, i) => (
                <blockquote key={i} className="border-l-4 border-amber-400 pl-4 italic text-gray-800">
                  “{q.quote}”
                  <footer className="mt-2 text-sm text-gray-600">— {q.author}</footer>
                </blockquote>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
