import React from 'react';
import { Helmet } from 'react-helmet';

export default function NearMeHalalFood() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <Helmet>
        <title>Halal Food Near Me Las Vegas | Istanbul Mediterranean Halal</title>
        <meta name="description" content="Looking for halal food near you in Las Vegas? Istanbul Mediterranean offers a wide range of halal-certified dishes including doner, wraps, and more. Come taste the best!" />
        <link rel="canonical" href="https://www.istanbullv.com/near-me/halal-food" />
      </Helmet>
      <h1 className="text-3xl font-bold mb-4">Halal Food Near Me in Las Vegas</h1>
      <p className="mb-4">Searching for authentic halal food in Las Vegas? Istanbul Mediterranean is your go-to spot for delicious, halal-certified Turkish and Mediterranean cuisine. Our menu features a variety of options, from doner and wraps to vegetarian and vegan dishes—all prepared with care and quality ingredients.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-2">Why Choose Our Halal Restaurant?</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>100% halal-certified meats and ingredients</li>
        <li>Family-owned and operated</li>
        <li>Located on the Las Vegas Strip</li>
        <li>Open late for your convenience</li>
        <li>Friendly, welcoming staff</li>
      </ul>
      <p className="mb-4">Visit us today and enjoy a true halal dining experience in the heart of Las Vegas!</p>
    </div>
  );
}
