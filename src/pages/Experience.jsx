import React from 'react';

export default function Experience() {
  return (
    <div className="bg-offwhite min-h-screen py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-6">The Istanbul Mediterranean Experience</h1>
        <p className="text-lg text-charcoal mb-4">Immerse yourself in a dining adventure where each bite transports you to the vibrant streets of Turkey. Our dishes, crafted with the freshest ingredients and traditional spices, promise an authentic taste that will tantalize your senses and leave you craving more.</p>
        <h2 className="text-2xl font-bold text-saffron mb-2">The Istanbul Mediterranean Vision</h2>
        <p className="mb-4 text-charcoal">At Istanbul Mediterranean, we believe that good food is an art form. Our passion for Turkish cuisine is reflected in every dish we serve, from the sizzling kebabs to the delicate baklava. Join us for an unforgettable experience that will delight your palate and enrich your soul.</p>
        <h2 className="text-2xl font-bold text-saffron mb-2">A Hidden Gem at the Heart of Las Vegas Strip</h2>
        <p className="mb-4 text-charcoal">Nestled in the vibrant heart of the Las Vegas Strip, Istanbul Mediterranean is a culinary sanctuary known for its exquisite Doner Kebab. This treasured spot beckons with the promise of traditional Turkish flavors, where each slice of perfectly seasoned, succulent meat is a testament to time-honored cooking methods. Here, every Doner Kebab served is not just a meal, but a cultural experience, offering a taste of Istanbul's rich heritage with every bite.</p>
        <h2 className="text-2xl font-bold text-saffron mb-2">What Our Customers Say</h2>
        <blockquote className="border-l-4 border-saffron pl-4 italic text-herb mb-4">"We r here in Vegas, that is our to go country lace every night! Never disappoints! Best shawarma döner gyro"<br/>- Emin E., Customer</blockquote>
        <div className="mt-10 text-charcoal">
          <p className="mb-2 font-bold">Address</p>
          <p>3615 S Las Vegas Blvd #101, Las Vegas, USA</p>
          <p className="mt-4 mb-2 font-bold">Opening Times</p>
          <p>Everyday<br/>10:00 am - 5:00 am</p>
          <a href="tel:+1725-900-8844" className="block mt-4 text-saffron underline hover:text-primary">Call Us: +1 725-900-8844</a>
        </div>
      </div>
    </div>
  );
}
