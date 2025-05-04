import React from 'react';

import { Helmet } from 'react-helmet';

export default function MediterraneanFoodLasVegas() {
  return (
    <>
      <Helmet>
        <title>Best Mediterranean Restaurant Las Vegas | Istanbul Mediterranean Halal</title>
        <meta name="description" content="Discover Istanbul Mediterranean Grill, the top Mediterranean restaurant in Las Vegas. Enjoy authentic Turkish cuisine, halal-certified meats, and a menu crafted for flavor and tradition. Order online or visit us on the Strip!" />
        <link rel="canonical" href="https://www.istanbullv.com/mediterranean-food-las-vegas" />
      </Helmet>
    <div className="bg-offwhite min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-6">Mediterranean Food in Las Vegas</h1>
        <p className="text-lg text-charcoal mb-4">Looking for the best Mediterranean food in Las Vegas? Istanbul Mediterranean brings you authentic Turkish and Mediterranean flavors, from juicy doner kebabs and shawarma to fresh salads and house-made baklava.</p>
        <h2 className="text-2xl font-bold text-saffron mb-2">Why Choose Us?</h2>
        <ul className="list-disc ml-6 text-charcoal mb-6">
          <li>100% Halal-certified ingredients</li>
          <li>Traditional recipes, modern presentation</li>
          <li>Family-friendly atmosphere</li>
          <li>Convenient location on the Strip</li>
        </ul>
        <p className="text-charcoal">Visit us today or order online for a true taste of the Mediterranean—right here in Las Vegas!</p>
      </div>
    </div>
    </>
  );
}
