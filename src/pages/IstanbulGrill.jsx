import React from 'react';

export default function IstanbulGrill() {
  return (
    <div className="bg-offwhite min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-6">Istanbul Grill</h1>
        <p className="text-lg text-charcoal mb-4">Discover the flavors of Istanbul with our authentic grill selections. From juicy kebabs to grilled vegetables, every dish is prepared over an open flame and seasoned with traditional Mediterranean spices.</p>
        <h2 className="text-2xl font-bold text-saffron mb-2">Why Our Grill?</h2>
        <ul className="list-disc ml-6 text-charcoal mb-6">
          <li>Fresh, halal-certified meats</li>
          <li>Classic Turkish marinades and spices</li>
          <li>Char-grilled for maximum flavor</li>
          <li>Served with fresh salads and house-made sauces</li>
        </ul>
        <p className="text-charcoal">Come taste the best of Istanbul—right here in Las Vegas!</p>
      </div>
    </div>
  );
}
