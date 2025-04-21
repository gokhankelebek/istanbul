import React from 'react';
import { FaUtensils, FaUsers, FaCheckCircle, FaCalendarAlt, FaPhoneAlt } from 'react-icons/fa';

export default function Catering() {
  return (
    <>
      {/* Hero Banner */}
      <section className="relative h-[32vh] md:h-[40vh] flex items-center justify-center bg-charcoal mb-12 overflow-hidden" style={{background:'#1F1F1F'}}>
        <img src="/catering/catering_hero.jpg" alt="Catering at Istanbul Mediterranean" className="absolute inset-0 w-full h-full object-cover object-center opacity-80" style={{zIndex:0}} loading="lazy" onError={e => e.target.style.display='none'} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-charcoal/30 to-transparent" style={{zIndex:1}} />
        <div className="relative z-10 text-center text-offwhite space-y-5 w-full flex flex-col items-center">
          <h1 className="font-poppins font-extrabold text-4xl md:text-5xl drop-shadow-lg">Catering & Events</h1>
          <p className="text-lg md:text-xl max-w-xl mx-auto">Let us bring the flavors of Istanbul to your next event! Perfect for parties, corporate events, weddings, and more.</p>
        </div>
      </section>

      {/* Catering Features */}
      <section className="py-16 bg-offwhite">
        <h2 className="text-2xl font-bold mb-8 text-primary text-center">Why Choose Our Catering?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
          <div className="flex flex-col items-center p-6 rounded-2xl shadow bg-white border border-saffron/10">
            <FaUtensils className="text-saffron text-3xl mb-2" />
            <span className="font-bold text-lg mb-1">Authentic Cuisine</span>
            <span className="text-herb text-sm">Traditional Turkish & Mediterranean dishes for every palate.</span>
          </div>
          <div className="flex flex-col items-center p-6 rounded-2xl shadow bg-white border border-saffron/10">
            <FaUsers className="text-herb text-3xl mb-2" />
            <span className="font-bold text-lg mb-1">Any Group Size</span>
            <span className="text-herb text-sm">From intimate gatherings to large corporate events.</span>
          </div>
          <div className="flex flex-col items-center p-6 rounded-2xl shadow bg-white border border-saffron/10">
            <FaCheckCircle className="text-istanbulRed text-3xl mb-2" />
            <span className="font-bold text-lg mb-1">100% Halal</span>
            <span className="text-herb text-sm">All meats are halal-certified and ethically sourced.</span>
          </div>
          <div className="flex flex-col items-center p-6 rounded-2xl shadow bg-white border border-saffron/10">
            <FaCalendarAlt className="text-primary text-3xl mb-2" />
            <span className="font-bold text-lg mb-1">Flexible Scheduling</span>
            <span className="text-herb text-sm">We work around your event needs and timing.</span>
          </div>
        </div>
      </section>

      {/* Catering Inquiry / Call to Action */}
      <section className="py-16 bg-gradient-to-br from-white via-offwhite to-saffron/10 text-center">
        <h2 className="text-2xl font-bold mb-6 text-primary">Request a Catering Quote</h2>
        <div className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow-lg border border-saffron/10 flex flex-col items-center">
          <p className="mb-4 text-lg text-charcoal">Tell us about your event and we’ll get back to you with a custom quote.</p>
          <form className="w-full flex flex-col gap-4">
            <input type="text" name="name" placeholder="Your Name" className="border-b-2 border-gray-300 bg-transparent px-2 py-3 focus:outline-none focus:border-istanbulRed transition-colors rounded" required />
            <input type="email" name="email" placeholder="Your Email" className="border-b-2 border-gray-300 bg-transparent px-2 py-3 focus:outline-none focus:border-istanbulRed transition-colors rounded" required />
            <input type="text" name="event" placeholder="Event Type (e.g. wedding, party)" className="border-b-2 border-gray-300 bg-transparent px-2 py-3 focus:outline-none focus:border-istanbulRed transition-colors rounded" required />
            <input type="number" name="guests" placeholder="Number of Guests" className="border-b-2 border-gray-300 bg-transparent px-2 py-3 focus:outline-none focus:border-istanbulRed transition-colors rounded" required />
            <textarea name="details" rows="3" placeholder="Event Details or Questions" className="border-b-2 border-gray-300 bg-transparent px-2 py-3 focus:outline-none focus:border-istanbulRed transition-colors rounded resize-none" required></textarea>
            <button type="submit" className="btn btn-primary w-full mt-2">Request Quote</button>
          </form>
          <div className="mt-6 text-herb text-base flex items-center gap-2 justify-center">
            <FaPhoneAlt className="text-istanbulRed" />
            <span>Or call us at <a href="tel:+17259008844" className="underline font-bold">(725) 900-8844</a></span>
          </div>
        </div>
      </section>
    </>
  );
}
