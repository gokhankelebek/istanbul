import React from "react";
import { Helmet } from "react-helmet";
import {
  FaCheckCircle,
  FaClock,
  FaHeart,
  FaUsers,
  FaTrophy,
} from "react-icons/fa";
import SEOHead from "../components/SEOHead";
import StructuredDataManager from "../components/StructuredDataManager";

export default function About() {
  // Generate structured data for the about page
  const aboutPageData = {
    name: "About Istanbul Mediterranean",
    description:
      "Learn about Istanbul Mediterranean—our story, mission, and commitment to serving the best Turkish and Mediterranean cuisine in Las Vegas.",
    url: "https://www.istanbullv.com/about",
    mainEntity: {
      "@type": "Organization",
      name: "Istanbul Mediterranean Restaurant",
      description:
        "Family-owned, halal-certified Turkish and Mediterranean restaurant in Las Vegas",
      url: "https://www.istanbullv.com",
      logo: "https://www.istanbullv.com/logo.png",
      address: {
        "@type": "PostalAddress",
        streetAddress: "3615 S Las Vegas Blvd #101",
        addressLocality: "Las Vegas",
        addressRegion: "NV",
        postalCode: "89109",
        addressCountry: "US",
      },
      telephone: "+17259008844",
      sameAs: [
        "https://www.instagram.com/istanbulmedlv",
        "https://www.facebook.com/istanbulmedlv",
      ],
    },
  };

  // Generate Organization data
  const organizationData = {
    name: "Istanbul Mediterranean Restaurant",
    description:
      "Family-owned, halal-certified Turkish and Mediterranean restaurant in Las Vegas",
    url: "https://www.istanbullv.com",
    logo: "https://www.istanbullv.com/logo.png",
    address: {
      streetAddress: "3615 S Las Vegas Blvd #101",
      addressLocality: "Las Vegas",
      addressRegion: "NV",
      postalCode: "89109",
      addressCountry: "US",
    },
    telephone: "+17259008844",
    sameAs: [
      "https://www.instagram.com/istanbulmedlv",
      "https://www.facebook.com/istanbulmedlv",
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
        name: "About",
        item: "https://www.istanbullv.com/about",
      },
    ],
  };

  // Aggregate all schema types for the about page
  const aggregateSchemaData = [
    { type: "aboutPage", data: aboutPageData },
    { type: "organization", data: organizationData },
    { type: "breadcrumb", data: breadcrumbData },
  ];

  return (
    <>
      <SEOHead
        title="About Istanbul Mediterranean | Our Story"
        description="Learn about Istanbul Mediterranean—our story, mission, and commitment to serving the best Turkish and Mediterranean cuisine in Las Vegas."
        keywords="about istanbul mediterranean, turkish restaurant las vegas, family owned restaurant, halal restaurant las vegas, mediterranean cuisine story"
        canonicalUrl="https://www.istanbullv.com/about"
        ogType="website"
        ogImage="https://www.istanbullv.com/about/about_hero.jpg"
      />
      <StructuredDataManager type="aggregate" data={aggregateSchemaData} />

      {/* Hero Banner */}
      <section
        className="relative h-[38vh] md:h-[48vh] flex items-center justify-center bg-charcoal mb-12 overflow-hidden"
        style={{ background: "#1F1F1F" }}
      >
        <img
          src="/about/about_hero.jpg"
          alt="About Istanbul Mediterranean"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-80"
          style={{ zIndex: 0 }}
          loading="lazy"
          onError={(e) => (e.target.style.display = "none")}
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-charcoal/30 to-transparent"
          style={{ zIndex: 1 }}
        />
        <div className="relative z-10 text-center text-offwhite space-y-5 w-full flex flex-col items-center">
          <h1 className="font-poppins font-extrabold text-4xl md:text-5xl drop-shadow-lg">
            About Istanbul Mediterranean
          </h1>
          <p className="text-lg md:text-2xl max-w-2xl mx-auto">
            Family-owned, halal-certified, and dedicated to authentic Turkish
            hospitality in the heart of Las Vegas.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-offwhite text-center">
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-5xl mx-auto">
          <img
            src="/chef_avatar.png"
            alt="Chef at Istanbul Mediterranean"
            className="w-40 h-40 rounded-full object-cover shadow-lg mb-6 md:mb-0 border-4 border-saffron/40"
            onError={(e) => (e.target.style.display = "none")}
          />
          <div className="flex-1">
            <h2 className="text-3xl font-semibold mb-3 text-primary">
              Our Story
            </h2>
            <p className="text-lg text-charcoal mb-4">
              Istanbul Mediterranean was born from a passion for sharing the
              flavors and traditions of Turkey. Our family recipes are rooted in
              the bustling streets of Istanbul, passed down through generations
              and lovingly recreated in Las Vegas. We believe food is a
              celebration—of culture, of family, and of togetherness.
            </p>
            <div className="bg-white p-4 rounded-xl shadow mb-4 border-l-4 border-istanbulRed/70 max-w-xl mx-auto">
              <span className="italic text-saffron text-lg">
                "Cooking is our family's passion. Every dish is a journey
                through history, crafted with love and served with a smile."
              </span>
            </div>
            <div className="mt-6">
              <span
                style={{
                  fontFamily: "Pacifico, cursive",
                  fontSize: "2rem",
                  color: "#b48b3c",
                  display: "inline-block",
                }}
              >
                Istanbul Family
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Why We're Different / Our Values */}
      <section className="py-16 bg-white">
        <h2 className="text-2xl font-bold mb-8 text-primary text-center">
          Why We're Different
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
          <div className="flex flex-col items-center p-6 rounded-2xl shadow bg-offwhite border border-saffron/10">
            <FaCheckCircle className="text-herb text-3xl mb-2" />
            <span className="font-bold text-lg mb-1">100% Halal</span>
            <span className="text-herb text-sm">
              Ethically sourced, halal-certified meats in every dish.
            </span>
          </div>
          <div className="flex flex-col items-center p-6 rounded-2xl shadow bg-offwhite border border-saffron/10">
            <FaUsers className="text-saffron text-3xl mb-2" />
            <span className="font-bold text-lg mb-1">Family-Owned</span>
            <span className="text-herb text-sm">
              Warm, friendly service from our family to yours.
            </span>
          </div>
          <div className="flex flex-col items-center p-6 rounded-2xl shadow bg-offwhite border border-saffron/10">
            <FaClock className="text-istanbulRed text-3xl mb-2" />
            <span className="font-bold text-lg mb-1">Open Late</span>
            <span className="text-herb text-sm">
              We're open until 5am for late-night cravings.
            </span>
          </div>
          <div className="flex flex-col items-center p-6 rounded-2xl shadow bg-offwhite border border-saffron/10">
            <FaHeart className="text-primary text-3xl mb-2" />
            <span className="font-bold text-lg mb-1">True Hospitality</span>
            <span className="text-herb text-sm">
              Every guest is treated like family—always.
            </span>
          </div>
        </div>
      </section>

      {/* Meet the Chef */}
      <section className="py-16 bg-gradient-to-br from-white via-offwhite to-saffron/10 text-center">
        <h2 className="text-2xl font-bold mb-6 text-primary">Meet the Chef</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-4xl mx-auto">
          <img
            src="/menu/chef_avatar2.webp"
            alt="Chef Portrait"
            className="w-36 h-36 rounded-full object-cover shadow-lg mb-6 md:mb-0 border-4 border-saffron/40"
            onError={(e) => (e.target.style.display = "none")}
          />
          <div className="flex-1 text-lg text-charcoal">
            <p className="mb-4">
              Chef Ahmet brings decades of culinary experience from Istanbul's
              vibrant food scene to Las Vegas. His passion for Turkish cuisine
              and commitment to quality shine through in every dish.
            </p>
            <div className="bg-white p-4 rounded-xl shadow border-l-4 border-herb/70 max-w-xl mx-auto">
              <span className="italic text-herb">
                "My greatest joy is seeing guests discover the flavors of my
                homeland. Welcome to our table!"
              </span>
            </div>
            <div className="mt-6">
              <span
                style={{
                  fontFamily: "Pacifico, cursive",
                  fontSize: "1.5rem",
                  color: "#b48b3c",
                  display: "inline-block",
                }}
              >
                Chef Ahmet
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Press & Awards Placeholder */}
      <section className="py-12 bg-white text-center">
        <h2 className="text-2xl font-bold mb-4 text-primary">Press & Awards</h2>
        <div className="flex flex-col items-center justify-center gap-4 text-herb">
          <FaTrophy className="text-saffron text-4xl mb-2" />
          <span className="text-lg">
            Stay tuned for our latest press features and awards!
          </span>
        </div>
      </section>
    </>
  );
}
