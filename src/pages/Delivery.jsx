import React from "react";
import SEOHead from "../components/SEOHead";
import StructuredDataManager from "../components/StructuredDataManager";

export default function Delivery() {
  // Generate Service structured data
  const serviceData = {
    name: "Turkish Food Delivery Service",
    description:
      "Vegas' most-craved döner delivered till 4:30 AM. Halal-certified Mediterranean wraps, bowls, and late-night platters with secure checkout.",
    provider: {
      "@type": "Restaurant",
      name: "Istanbul Mediterranean Restaurant",
      url: "https://www.istanbullv.com",
    },
    areaServed: {
      "@type": "City",
      name: "Las Vegas",
      addressRegion: "NV",
      addressCountry: "US",
    },
    serviceType: "Food Delivery",
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: "https://www.orderdoner.com",
    },
    hoursAvailable: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "10:00",
        closes: "04:30",
      },
    ],
  };

  // Generate BreadcrumbList data
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
        name: "Delivery",
        item: "https://www.istanbullv.com/delivery",
      },
    ],
  };

  // Aggregate all schema types for the delivery page
  const aggregateSchemaData = [
    { type: "service", data: serviceData },
    { type: "breadcrumb", data: breadcrumbData },
  ];

  return (
    <>
      <SEOHead
        title="Turkish Food Delivery Las Vegas | Istanbul Mediterranean"
        description="Vegas' most-craved döner delivered till 4:30 AM. Halal-certified Mediterranean wraps, bowls, and late-night platters. Secure checkout with Apple Pay, Google Pay, and all major cards."
        keywords="turkish food delivery las vegas, mediterranean food delivery, halal food delivery, doner delivery, late night food delivery las vegas"
        canonicalUrl="https://www.istanbullv.com/delivery"
        ogType="website"
        ogImage="https://www.istanbullv.com/delivery-hero.jpg"
      />
      <StructuredDataManager type="aggregate" data={aggregateSchemaData} />

      {/* Hero Section */}
      <section
        id="hero"
        className="bg-gradient-to-br from-primary via-saffron to-herb py-16 px-4 text-white text-center"
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-lg font-poppins">
            Vegas' Most-Craved Döner—Delivered Till 4:30 AM
          </h1>
          <p className="text-lg md:text-xl mb-6 font-medium drop-shadow">
            Halal-certified Mediterranean wraps, bowls, and late-night platters.
            Secure checkout with Apple Pay, Google Pay, and all major cards.
          </p>
          <a
            href="https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-istanbulRed hover:bg-primary text-white px-8 py-4 rounded-full font-bold text-xl shadow-lg transition-colors duration-150"
          >
            ORDER NOW • READY IN ~20 MIN
          </a>
          <div className="mt-4 text-base opacity-80">
            Delivery: 10am – 4:30am • Pickup: 10am – 5am
          </div>
        </div>
      </section>

      {/* Why Choose Us for Delivery */}
      <section
        id="why-delivery"
        className="container mx-auto max-w-5xl px-4 py-14"
      >
        <h2 className="text-2xl font-bold mb-8 text-center text-primary">
          Why Istanbul Mediterranean for Delivery?
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <ul className="space-y-6 text-lg">
            <li>
              <span className="font-bold text-istanbulRed">
                Open Super-Late:
              </span>{" "}
              Kitchen fires up 10am and doesn't stop until 5am; last delivery
              4:30am.
            </li>
            <li>
              <span className="font-bold text-istanbulRed">
                4.3★ on TripAdvisor:
              </span>{" "}
              90+ reviews praise generous portions and quick service.
            </li>
            <li>
              <span className="font-bold text-istanbulRed">
                750+ Photos on Yelp:
              </span>{" "}
              Proof our plates look as good as they taste.
            </li>
            <li>
              <span className="font-bold text-istanbulRed">100% Halal:</span>{" "}
              Verified by suppliers; full details on our FAQ.
            </li>
            <li>
              <span className="font-bold text-istanbulRed">
                Secure Square Checkout:
              </span>{" "}
              PCI-compliant, live order-status texts, driver ETA.
            </li>
          </ul>
          <div className="flex flex-col items-center justify-center">
            <img
              src="/menu/pita-sandwiches/beefandlamb-doner-shawarma-pita.webp"
              alt="Beef & Lamb Döner Pita"
              className="rounded-xl shadow-lg w-72 mb-4"
            />
            <img
              src="/menu/pita-sandwiches/chicken-doner-shawarma-pita.webp"
              alt="Chicken Döner Pita"
              className="rounded-xl shadow-lg w-72"
            />
          </div>
        </div>
      </section>

      {/* Fan-Favorite Dishes */}
      <section
        id="menu-highlights"
        className="container mx-auto max-w-5xl px-4 py-14 bg-white/90 rounded-xl shadow mb-14"
      >
        <h2 className="text-2xl font-bold mb-8 text-center text-primary">
          Fan-Favorite Dishes
        </h2>
        <div className="overflow-x-auto pb-2">
          <div className="flex gap-8 min-w-[700px] md:min-w-0">
            {/* Example dishes; you can map from your menu data here */}
            <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-4 w-60 min-w-[220px] hover:scale-105 transition-transform cursor-pointer">
              <img
                src="/menu/pita-sandwiches/beefandlamb-doner-shawarma-pita.webp"
                alt="Beef & Lamb Döner Pita"
                className="rounded-xl shadow object-cover w-full h-40 mb-2"
              />
              <div className="font-semibold text-lg text-primary mb-1">
                Beef & Lamb Döner Pita
              </div>
              <div className="text-sm text-charcoal text-center mb-1">
                "Stacked. Enough for two 'smedium' humans."
              </div>
            </div>
            <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-4 w-60 min-w-[220px] hover:scale-105 transition-transform cursor-pointer">
              <img
                src="/menu/pita-sandwiches/chicken-doner-shawarma-pita.webp"
                alt="Chicken Döner Lavash Wrap"
                className="rounded-xl shadow object-cover w-full h-40 mb-2"
              />
              <div className="font-semibold text-lg text-primary mb-1">
                Chicken Döner Lavash Wrap
              </div>
              <div className="text-sm text-charcoal text-center mb-1">
                Juicy thigh meat spun daily on our vertical rotisserie.
              </div>
            </div>
            <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-4 w-60 min-w-[220px] hover:scale-105 transition-transform cursor-pointer">
              <img
                src="/menu/salad-bowls/veggie-bowl.webp"
                alt="Falafel Bowl"
                className="rounded-xl shadow object-cover w-full h-40 mb-2"
              />
              <div className="font-semibold text-lg text-primary mb-1">
                Falafel Bowl (Vegan)
              </div>
              <div className="text-sm text-charcoal text-center mb-1">
                Crispy outside, herb-green inside—late-night vegan hero.
              </div>
            </div>

            <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-4 w-60 min-w-[220px] hover:scale-105 transition-transform cursor-pointer">
              <img
                src="/menu/desserts/baklava.webp"
                alt="Baklava"
                className="rounded-xl shadow object-cover w-full h-40 mb-2"
              />
              <div className="font-semibold text-lg text-primary mb-1">
                Baklava (2 pc)
              </div>
              <div className="text-sm text-charcoal text-center mb-1">
                Flaky pistachio layers, local honey drizzle.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Raves */}
      <section id="reviews" className="container mx-auto max-w-4xl px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">
          Recent Raves
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-istanbulRed text-3xl mb-2">★ ★ ★ ★ ★</span>
            <p className="text-gray-700 italic mb-2">
              Portions large, fast service, and great value.
            </p>
            <span className="font-bold text-primary">— Vikram R.</span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-istanbulRed text-3xl mb-2">★ ★ ★ ★ ★</span>
            <p className="text-gray-700 italic mb-2">
              "Exactly what you need after a night on the Strip—open 'til
              sunrise!"
            </p>
            <span className="font-bold text-primary">— TripAdvisor guest</span>
          </div>
          <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
            <span className="text-istanbulRed text-3xl mb-2">★ ★ ★ ★ ★</span>
            <p className="text-gray-700 italic mb-2">
              "Doner was STACKED… still hot after a 15-minute drive."
            </p>
            <span className="font-bold text-primary">
              — Larissa M. on DoorDash
            </span>
          </div>
        </div>
      </section>

      {/* How Delivery Works */}
      <section
        id="how-it-works"
        className="container mx-auto max-w-4xl px-4 py-12 bg-white/80 rounded-xl shadow"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">
          How Delivery Works
        </h2>
        <ol className="list-decimal list-inside space-y-4 text-lg max-w-2xl mx-auto">
          <li>
            Choose "Delivery" at checkout on{" "}
            <a
              href="https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv"
              className="text-istanbulRed underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              www.orderdoner.com
            </a>
          </li>
          <li>
            Enter your address—Square confirms you're within our 6-mile zone
          </li>
          <li>
            Pay with Apple Pay, Google Pay, or any major card (secure,
            PCI-compliant)
          </li>
          <li>Track in real time—SMS link as soon as the driver picks up</li>
          <li>
            Delivery window: 10 AM – 4:30 AM (orders after 4:30 AM switch to
            pickup)
          </li>
        </ol>
      </section>

      {/* FAQ */}
      <section id="faq" className="container mx-auto max-w-3xl px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">
          Delivery FAQ
        </h2>
        <div className="space-y-6 text-lg">
          <div>
            <span className="font-bold text-istanbulRed">
              Is everything Halal?
            </span>{" "}
            Yes—every protein, sauce, and side is sourced Halal; we even slice
            on dedicated boards.
          </div>
          <div>
            <span className="font-bold text-istanbulRed">
              Do you deliver to hotel rooms?
            </span>{" "}
            Absolutely. Include your tower/room #; drivers meet you in the
            lobby.
          </div>
          <div>
            <span className="font-bold text-istanbulRed">Allergy info?</span>{" "}
            Our most common allergens are gluten (pita, lavash) and dairy
            (tzatziki). Falafel Bowl is dairy-free.
          </div>
        </div>
      </section>
    </>
  );
}
