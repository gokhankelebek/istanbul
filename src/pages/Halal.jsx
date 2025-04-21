import React from 'react';

import { Helmet } from 'react-helmet';

export default function Halal() {
  return (
    <>
      <Helmet>
        <title>Istanbul Mediterranean Halal Restaurant Las Vegas | 100% Halal Meat Certificate</title>
        <meta name="description" content="Istanbul Mediterranean Grill is the top halal restaurant on the Las Vegas Strip. 100% halal-certified meats, authentic Mediterranean cuisine, and the best Turkish food in Las Vegas. Order online or visit us today!" />
        <link rel="canonical" href="https://www.istanbullv.com/halal" />
      </Helmet>
    {/* Hero Banner */}
    <section className="relative h-[32vh] md:h-[40vh] flex items-center justify-center bg-charcoal mb-12 overflow-hidden" style={{background:'#1F1F1F'}}>
      <img src="/halal/halal_hero.jpg" alt="Halal at Istanbul Mediterranean" className="absolute inset-0 w-full h-full object-cover object-center opacity-80" style={{zIndex:0}} loading="lazy" onError={e => e.target.style.display='none'} />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-charcoal/30 to-transparent" style={{zIndex:1}} />
      <div className="relative z-10 text-center text-offwhite space-y-5 w-full flex flex-col items-center">
        <h1 className="font-poppins font-extrabold text-4xl md:text-5xl drop-shadow-lg">100% Halal Commitment</h1>
        <p className="text-lg md:text-xl max-w-xl mx-auto">We are dedicated to serving authentic, ethically sourced, and fully halal-certified Mediterranean cuisine in Las Vegas.</p>
      </div>
    </section>

    {/* Halal Commitment Badge & Certificate */}
    <div className="flex flex-col items-center mb-8">
      <div className="flex items-center gap-2 bg-herb/10 px-5 py-2 rounded-full shadow border border-herb/20">
        <svg className="text-herb w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
        <span className="font-semibold text-herb text-lg">Certified Halal</span>
      </div>
      <img src="/halal/halal_certificate.jpg" alt="Halal Certificate" className="w-56 mt-4 rounded shadow border border-saffron/20" onError={e => e.target.style.display='none'} />
    </div>

    {/* What is Halal / Our Certification / Why Choose Halal */}
    <section className="py-12 bg-offwhite">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-2xl shadow p-6 border border-saffron/10 flex flex-col items-center">
          <svg className="text-saffron w-10 h-10 mb-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" /></svg>
          <h2 className="text-xl font-bold mb-2 text-primary">What is Halal?</h2>
          <p className="text-charcoal text-sm">Halal means "permissible" in Arabic, referring to food prepared according to Islamic dietary law. All our meats are halal-certified and prepared with care.</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 border border-saffron/10 flex flex-col items-center">
          <svg className="text-herb w-10 h-10 mb-2" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 7.293a1 1 0 00-1.414 0L10 13.172l-2.293-2.293a1 1 0 00-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 00-1.414-1.414z" /></svg>
          <h2 className="text-xl font-bold mb-2 text-primary">Our Certification</h2>
          <p className="text-charcoal text-sm">We proudly display our halal certificate in-store. All meats are sourced from certified halal suppliers and handled with strict separation from non-halal items.</p>
        </div>
        <div className="bg-white rounded-2xl shadow p-6 border border-saffron/10 flex flex-col items-center">
          <svg className="text-istanbulRed w-10 h-10 mb-2" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-7V7a1 1 0 112 0v4a1 1 0 01-2 0zm1 4a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /></svg>
          <h2 className="text-xl font-bold mb-2 text-primary">Why Choose Halal?</h2>
          <p className="text-charcoal text-sm">Halal food is ethically sourced, humane, and prepared with integrity. We welcome everyone to enjoy our delicious, healthy, and inclusive menu.</p>
        </div>
      </div>
    </section>

    {/* Halal FAQ - Collapsible */}
    <section className="py-12 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-saffron mb-6">Halal FAQ</h2>
        <details className="mb-4 bg-offwhite rounded-lg shadow p-4 border-l-4 border-saffron/40">
          <summary className="font-semibold text-primary cursor-pointer">What does halal mean?</summary>
          <p className="mt-2 text-charcoal">Halal means permissible under Islamic law. For food, this means ingredients and preparation methods that follow these rules.</p>
        </details>
        <details className="mb-4 bg-offwhite rounded-lg shadow p-4 border-l-4 border-saffron/40">
          <summary className="font-semibold text-primary cursor-pointer">Is all your food halal?</summary>
          <p className="mt-2 text-charcoal">Yes, all our meats and most menu items are halal. Vegetarian and vegan dishes are also available.</p>
        </details>
        <details className="mb-4 bg-offwhite rounded-lg shadow p-4 border-l-4 border-saffron/40">
          <summary className="font-semibold text-primary cursor-pointer">How do you ensure halal compliance?</summary>
          <p className="mt-2 text-charcoal">We source from certified suppliers and train our staff in halal food handling. Ask our staff if you have any questions about halal practices.</p>
        </details>
      </div>
    </section>

    {/* Call to Action */}
    <section className="py-12 bg-gradient-to-b from-white via-offwhite to-saffron/10 text-center">
      <div className="max-w-xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-primary">Ready to Taste the Difference?</h2>
        <p className="mb-6 text-lg text-charcoal">Explore our <a href="/menu" className="text-saffron underline hover:text-primary">full menu</a> or <a href="mailto:info@istanbullv.com" className="text-istanbulRed underline hover:text-primary">contact us</a> with any questions about our halal practices.</p>
        <a href="/menu" className="btn btn-primary px-8 py-3 text-lg">View Menu</a>
      </div>
    </section>
    </>
  );
}
