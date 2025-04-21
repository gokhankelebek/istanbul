import React from 'react';

import { Helmet } from 'react-helmet';

export default function WhatIsFalafel() {
  return (
    <>
      <Helmet>
        <title>What is Falafel? | Istanbul Mediterranean Restaurant Las Vegas</title>
        <meta name="description" content="Discover what makes falafel special at Istanbul Mediterranean Grill in Las Vegas. Enjoy authentic, halal-certified Mediterranean cuisine and the best falafel on the Strip. Order online or visit us today!" />
        <link rel="canonical" href="https://www.istanbullv.com/what-is-falafel" />
        {/* FAQPage Schema for SEO */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is falafel?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Falafel is a deep-fried ball or patty made from ground chickpeas, herbs, and spices. It is a staple of Mediterranean and Middle Eastern cuisine."
                }
              },
              {
                "@type": "Question",
                "name": "Is your falafel halal?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, all menu items at Istanbul Mediterranean Grill in Las Vegas, including our falafel, are halal-certified."
                }
              },
              {
                "@type": "Question",
                "name": "Where can I order falafel in Las Vegas?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can order the best falafel at Istanbul Mediterranean Grill, 3615 S Las Vegas Blvd #101, Las Vegas, NV 89109. Order online or visit us on the Strip!"
                }
              }
            ]
          }
        `}</script>
      </Helmet>
    <div className="bg-offwhite min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-6">What is Falafel?</h1>
        <p className="text-lg text-charcoal mb-4">Falafel is a beloved Middle Eastern dish made from ground chickpeas (or fava beans), herbs, and spices, formed into balls or patties, and deep-fried until golden and crispy. It’s naturally vegan, protein-rich, and a staple of Mediterranean cuisine.</p>
        <h2 className="text-2xl font-bold text-saffron mb-2">Why is Falafel Popular?</h2>
        <ul className="list-disc ml-6 text-charcoal mb-6">
          <li>Deliciously crispy outside, soft inside</li>
          <li>Plant-based and nutritious</li>
          <li>Served in wraps, salads, or on its own</li>
          <li>Pairs perfectly with hummus, tahini, and fresh veggies</li>
        </ul>
        <p className="text-charcoal">Try our falafel in a wrap, bowl, or as a side—always made fresh at Istanbul Mediterranean!</p>
        <div className="mt-8 text-sm text-charcoal flex flex-col gap-2 items-center">
          <span>Explore our <Link to="/menu" className="text-saffron underline hover:text-primary">full menu</Link>, learn about our <Link to="/halal" className="text-saffron underline hover:text-primary">halal commitment</Link>, or discover more <Link to="/mediterranean-food-las-vegas" className="text-saffron underline hover:text-primary">Mediterranean flavors</Link>.</span>
        </div>
      </div>
    </div>
    </>
  );
}
