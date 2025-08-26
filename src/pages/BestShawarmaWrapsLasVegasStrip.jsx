import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import SEOHead from "../components/SEOHead";
import StructuredDataManager from "../components/StructuredDataManager";

export default function BestShawarmaWrapsLasVegasStrip() {
  // Generate structured data for the page
  const pageData = {
    name: "Best Shawarma Wraps on Las Vegas Strip",
    description:
      "Discover the best shawarma wraps on the Las Vegas Strip at Istanbul Mediterranean. Authentic Turkish döner wraps, fresh ingredients, and halal-certified meats.",
    url: "https://www.istanbullv.com/best-shawarma-wraps-on-las-vegas-strip",
    mainEntity: {
      "@type": "Restaurant",
      name: "Istanbul Mediterranean Restaurant",
      description: "Best shawarma wraps on the Las Vegas Strip",
      url: "https://www.istanbullv.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "3615 S Las Vegas Blvd #101",
        addressLocality: "Las Vegas",
        addressRegion: "NV",
        postalCode: "89109",
        addressCountry: "US",
      },
      telephone: "+17259008844",
      servesCuisine: ["Turkish", "Mediterranean", "Middle Eastern"],
      priceRange: "$$",
    },
  };

  const breadcrumbData = {
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.istanbullv.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Shawarma",
        item: "https://www.istanbullv.com/shawarma",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Best Shawarma Wraps on Las Vegas Strip",
        item: "https://www.istanbullv.com/best-shawarma-wraps-on-las-vegas-strip",
      },
    ],
  };

  const aggregateSchemaData = [
    { type: "webpage", data: pageData },
    { type: "breadcrumb", data: breadcrumbData },
  ];

  return (
    <>
      <SEOHead
        title="Best Shawarma Wraps on Las Vegas Strip | Istanbul Mediterranean"
        description="Discover the best shawarma wraps on the Las Vegas Strip at Istanbul Mediterranean. Authentic Turkish döner wraps, fresh ingredients, and halal-certified meats served fresh daily."
        keywords="best shawarma wraps las vegas strip, shawarma las vegas, doner wrap, halal wrap las vegas, turkish wrap, mediterranean wrap, authentic shawarma"
        canonicalUrl="https://www.istanbullv.com/best-shawarma-wraps-on-las-vegas-strip"
        ogType="website"
        ogImage="https://www.istanbullv.com/menu/lavash-wraps/chicken-doner-shawarma-lavash-wrap.webp"
      />
      <StructuredDataManager type="aggregate" data={aggregateSchemaData} />

      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center bg-gradient-to-br from-istanbulRed to-red-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/menu/lavash-wraps/chicken-doner-shawarma-lavash-wrap.webp"
            alt="Shawarma wrap background"
            className="w-full h-full object-cover"
            loading="lazy"
            onError={(e) => (e.target.style.display = "none")}
          />
        </div>
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            Best Shawarma Wraps on Las Vegas Strip
          </h1>
          <p className="text-xl md:text-2xl mb-6 drop-shadow">
            Authentic Turkish döner wraps with fresh ingredients and
            halal-certified meats
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=shawarma_wraps"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-saffron hover:bg-yellow-600 text-charcoal px-8 py-3 rounded-lg font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Order Now
            </a>
            <Link
              to="/menu"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-istanbulRed px-8 py-3 rounded-lg font-bold text-lg transition-all duration-200"
            >
              View Menu
            </Link>
          </div>
        </div>
      </section>

      {/* What Makes Our Wraps Special */}
      <section className="py-16 bg-offwhite">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
            What Makes Our Shawarma Wraps the Best on the Strip?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-istanbulRed">
              <h3 className="text-xl font-bold text-charcoal mb-3">
                100% Halal Certified
              </h3>
              <p className="text-herb">
                All our meats are halal-certified and ethically sourced,
                ensuring the highest quality and religious compliance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-saffron">
              <h3 className="text-xl font-bold text-charcoal mb-3">
                Fresh Daily Preparation
              </h3>
              <p className="text-herb">
                Our döner meat is slow-cooked on a vertical rotisserie for over
                12 hours, carved fresh throughout the day.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg border-l-4 border-herb">
              <h3 className="text-xl font-bold text-charcoal mb-3">
                Authentic Turkish Recipe
              </h3>
              <p className="text-herb">
                Traditional Istanbul family recipes passed down through
                generations, brought directly to Las Vegas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Wrap Options */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-primary mb-12">
            Our Signature Shawarma Wraps
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-offwhite to-white p-8 rounded-xl shadow-xl">
              <img
                src="/menu/lavash-wraps/beefandlamb-doner-shawarma-lavash-wrap.webp"
                alt="Beef and Lamb Döner Wrap"
                className="w-full h-48 object-cover rounded-lg mb-6"
                loading="lazy"
                onError={(e) => (e.target.style.display = "none")}
              />
              <h3 className="text-2xl font-bold text-charcoal mb-3">
                Beef & Lamb Döner Wrap
              </h3>
              <p className="text-herb mb-4">
                Our signature blend of marinated beef and lamb, slow-cooked to
                perfection, wrapped in fresh lavash with crisp vegetables and
                our house-made sauces.
              </p>
              <ul className="text-sm text-herb space-y-1">
                <li>• Premium halal beef and lamb blend</li>
                <li>• Fresh tomatoes, onions, and lettuce</li>
                <li>• Garlic sauce and hot sauce</li>
                <li>• Wrapped in warm lavash bread</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-offwhite to-white p-8 rounded-xl shadow-xl">
              <img
                src="/menu/lavash-wraps/chicken-doner-shawarma-lavash-wrap.webp"
                alt="Chicken Döner Wrap"
                className="w-full h-48 object-cover rounded-lg mb-6"
                loading="lazy"
                onError={(e) => (e.target.style.display = "none")}
              />
              <h3 className="text-2xl font-bold text-charcoal mb-3">
                Chicken Döner Wrap
              </h3>
              <p className="text-herb mb-4">
                Tender, marinated chicken breast seasoned with authentic Turkish
                spices, served with fresh vegetables and our signature sauces.
              </p>
              <ul className="text-sm text-herb space-y-1">
                <li>• Halal chicken breast, marinated overnight</li>
                <li>• Fresh cucumbers, tomatoes, and red onions</li>
                <li>• Tzatziki and garlic sauce</li>
                <li>• Soft lavash bread, warmed to perfection</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Istanbul Mediterranean */}
      <section className="py-16 bg-gradient-to-br from-istanbulRed/10 to-saffron/10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8">
            Why Las Vegas Loves Our Shawarma Wraps
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="text-center">
              <div className="text-4xl mb-3">🕐</div>
              <h3 className="font-bold text-charcoal mb-2">Open Late</h3>
              <p className="text-herb text-sm">
                Until 5AM daily for late-night cravings
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-3">🏆</div>
              <h3 className="font-bold text-charcoal mb-2">Strip Location</h3>
              <p className="text-herb text-sm">
                Conveniently located on Las Vegas Blvd
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-3">👨‍👩‍👧‍👦</div>
              <h3 className="font-bold text-charcoal mb-2">Family Recipe</h3>
              <p className="text-herb text-sm">
                Authentic Istanbul family traditions
              </p>
            </div>

            <div className="text-center">
              <div className="text-4xl mb-3">✅</div>
              <h3 className="font-bold text-charcoal mb-2">Fresh Daily</h3>
              <p className="text-herb text-sm">Made fresh every single day</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-charcoal mb-4">
              Visit Us Today
            </h3>
            <p className="text-herb mb-6">
              Experience the best shawarma wraps on the Las Vegas Strip. Fresh,
              authentic, and halal-certified.
            </p>
            <div className="space-y-2 text-charcoal">
              <p>
                <strong>Address:</strong> 3615 S Las Vegas Blvd #101, Las Vegas,
                NV 89109
              </p>
              <p>
                <strong>Hours:</strong> Daily 10:00 AM - 5:00 AM
              </p>
              <p>
                <strong>Phone:</strong>{" "}
                <a
                  href="tel:+17259008844"
                  className="text-istanbulRed hover:underline"
                >
                  (725) 900-8844
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-charcoal text-white text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Craving the Best Shawarma Wrap in Vegas?
          </h2>
          <p className="text-xl mb-8 text-gray-300">
            Order online for pickup or delivery, or visit us on the Strip for
            the freshest experience.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=shawarma_wraps_cta"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-istanbulRed hover:bg-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Order Online Now
            </a>
            <Link
              to="/contact"
              className="bg-transparent border-2 border-saffron text-saffron hover:bg-saffron hover:text-charcoal px-8 py-4 rounded-lg font-bold text-lg transition-all duration-200"
            >
              Visit Our Location
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
