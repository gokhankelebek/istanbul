import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

export default function ShawarmaVsDonerKebab() {
  return (
    <>
      <Helmet>
        <title>Shawarma vs Doner Kebab | Istanbul Mediterranean Restaurant Las Vegas</title>
        <meta name="description" content="Explore the difference between shawarma and doner kebab at Istanbul Mediterranean in Las Vegas. Enjoy authentic, halal-certified Mediterranean cuisine and the best doner on the Strip. Order online or visit us today!" />
        <link rel="canonical" href="https://www.istanbullv.com/shawarma-vs-doner-kebab" />
        {/* FAQPage Schema for SEO */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is the difference between shawarma and doner kebab?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Both are seasoned meats cooked on a vertical rotisserie, but shawarma is a Middle Eastern term and doner kebab is Turkish. The spices, toppings, and serving style may differ."}
              },
              {
                "@type": "Question",
                "name": "Where can I find the best doner kebab in Las Vegas?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Istanbul Mediterranean on the Las Vegas Strip offers authentic Turkish doner kebab, halal-certified and made fresh daily."}
              },
              {
                "@type": "Question",
                "name": "Is your shawarma halal?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, all shawarma and doner kebab at Istanbul Mediterranean are halal-certified."}
              }
            ]
          }
        `}</script>
      </Helmet>
    <div className="bg-offwhite min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-6">Shawarma vs. Doner Kebab</h1>
        <p className="text-lg text-charcoal mb-4">Both shawarma and doner kebab are iconic dishes made from seasoned meat cooked on a vertical rotisserie. While they share similarities, each has its own unique history and flavor profile.</p>
        <h2 className="text-2xl font-bold text-saffron mb-2">What’s the Difference?</h2>
        <ul className="list-disc ml-6 text-charcoal mb-6">
          <li><strong>Doner Kebab:</strong> Originated in Turkey; typically served in pita or flatbread with fresh veggies and sauces.</li>
          <li><strong>Shawarma:</strong> Popular throughout the Middle East; often wrapped in flatbread and paired with pickles, tahini, or garlic sauce.</li>
          <li>Both can be made with beef, lamb, or chicken, and are beloved for their savory, spiced flavors.</li>
        </ul>
        <p className="text-charcoal">At Istanbul Mediterranean, you can enjoy the best of both worlds—try our authentic doner kebab and shawarma today!</p>
        <div className="mt-8 text-sm text-charcoal flex flex-col gap-2 items-center">
          <span>See our <Link to="/menu" className="text-saffron underline hover:text-primary">full menu</Link>, learn about our <Link to="/halal" className="text-saffron underline hover:text-primary">halal standards</Link>, or explore more <Link to="/mediterranean-food-las-vegas" className="text-saffron underline hover:text-primary">Mediterranean specialties</Link>.</span>
        </div>
      </div>
    </div>
    </>
  );
}
