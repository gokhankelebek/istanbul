import React from 'react';
import { Helmet } from 'react-helmet';

export default function MediterraneanRestaurant() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <Helmet>
        <title>Mediterranean Restaurant Las Vegas | Istanbul Mediterranean</title>
        <meta name="description" content="Discover authentic Mediterranean cuisine at Istanbul Mediterranean in Las Vegas. Enjoy doner, wraps, pita, and more in a family-owned restaurant with halal options." />
        <link rel="canonical" href="https://www.istanbullv.com/mediterranean-restaurant" />
      </Helmet>
      <h1 className="text-3xl font-bold mb-4">Mediterranean Restaurant in Las Vegas</h1>
      <p className="mb-4">Experience the flavors of the Mediterranean at Istanbul Mediterranean. Our menu features authentic Turkish doner, wraps, pita sandwiches, rice bowls, and more, prepared with fresh ingredients and traditional recipes. As a family-owned restaurant, we pride ourselves on warm hospitality and a vibrant dining atmosphere.</p>
      <h2 className="text-2xl font-semibold mt-8 mb-2">Why Choose Us?</h2>
      <ul className="list-disc ml-6 mb-4">
        <li>Authentic Mediterranean & Turkish cuisine</li>
        <li>Halal-certified meats and ingredients</li>
        <li>Vegetarian and vegan options</li>
        <li>Convenient Las Vegas Strip location</li>
        <li>Open late for your cravings</li>
      </ul>
      <p className="mb-4">Whether you're a local or visiting Las Vegas, Istanbul Mediterranean is your destination for delicious, healthy, and satisfying Mediterranean food. Join us for lunch, dinner, or a late-night bite!</p>
    </div>
  );
}
