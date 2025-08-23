import React from 'react';
import { Helmet } from 'react-helmet';

export default function HalalWhatDoesItMean() {
  return (
    <>
      <Helmet>
        <title>Halal: What Does it Mean? | Istanbul Mediterranean Restaurant Las Vegas</title>
        <meta name="description" content="Understand what halal means in the context of food and lifestyle. Istanbul Mediterranean in Las Vegas offers halal-certified Mediterranean cuisine." />
        <link rel="canonical" href="https://www.istanbullv.com/blog-posts/halal-what-does-it-mean" />
      </Helmet>
      <div className="bg-offwhite min-h-screen py-16 px-4">
  <div className="max-w-2xl mx-auto">
    <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-6">Halal: More Than a Label</h1>
    <p className="text-lg text-charcoal mb-4">
      Halal means "permissible" in Arabic, but to us, it means trust, respect, and a commitment to our guests. At Istanbul Mediterranean, halal is not just a standard—it's a promise that every meal is prepared with integrity, care, and authenticity.
    </p>
    <h2 className="text-2xl font-bold text-saffron mb-2">What Makes Food Halal?</h2>
    <ul className="list-disc ml-6 text-charcoal mb-6">
      <li>Meat sourced from animals raised and processed according to Islamic principles</li>
      <li>No pork, pork by-products, or alcohol</li>
      <li>Utmost cleanliness and ethical sourcing throughout the kitchen</li>
      <li>Transparency and respect for all dietary needs</li>
    </ul>
    <h2 className="text-2xl font-bold text-saffron mb-2">Our Commitment to You</h2>
    <p className="text-charcoal mb-4">
      We partner only with trusted halal-certified suppliers and maintain rigorous standards in every aspect of our kitchen. Our team is trained to honor these principles, ensuring every guest can dine with confidence and peace of mind.
    </p>
    <p className="text-lg text-saffron font-semibold mb-6">Experience the true meaning of halal—join us for a meal that nourishes body and soul at Istanbul Mediterranean.</p>
    <div className="mt-8 text-center">
      <a href="/menu" className="inline-block px-6 py-3 bg-istanbulRed text-white rounded-full font-bold shadow hover:bg-primary transition-colors">See Our Full Menu</a>
    </div>
  </div>
      </div>
    </>
  );
}
