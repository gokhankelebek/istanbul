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
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">The Perfect Halal Vibe – Casual, Cozy & Trendy</h2>
        <p className="mb-4">Experience the Istanbul Mediterranean vibe—a cozy, casual spot with limited seating but unlimited flavor. Perfect for a quick bite or takeaway, we serve up bold halal tastes in a warm and friendly setting.</p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Our Halal Eats in Las Vegas – Shawarma, Falafel, Rice Bowls & More</h2>
        <p className="mb-4">Here are a few of our favorite dishes that our guests keep coming back for:</p>
        <ul className="list-disc ml-6 mb-4">
          <li><strong>Mix Doner (Shawarma) Pita</strong></li>
          <li><strong>Chicken Döner Shawarma</strong></li>
          <li><strong>Falafel Turkish Pita</strong> <span className="italic">(vegan option)</span></li>
          <li><strong>Beef & Lamb Döner Rice Bowl</strong></li>
        </ul>
        <p className="mb-4">We’re proud to offer 100% halal dishes — including vegan-friendly options — prepared fresh with authentic Mediterranean spices.</p>
        <p className="mb-4">Complete your dining experience with our selection of exquisite desserts and refreshing beverages, thoughtfully crafted to perfectly complement your meal.</p>
        <a href="https://istanbullv.com/menu" className="text-blue-600 underline font-semibold" target="_blank" rel="noopener noreferrer">👉 Explore our full menu here</a>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Your Go-To Spot for Halal Food on the Las Vegas Strip – Shawarma, Bowls, Wraps & More</h2>
        <p className="mb-4">When it comes to the best halal food in Las Vegas, locals and tourists alike trust Istanbul Mediterranean for our bold flavors, certified halal ingredients, and fresh Mediterranean recipes. From shawarma to falafel and everything in between, our menu delivers on quality and taste.</p>
        <p className="mb-4">Our signature doner features 100% halal beef, lamb or chicken grilled to perfection and infused with authentic Middle Eastern flavors. It’s a must-try for halal doner lovers looking for exceptional halal options right in the heart of Las Vegas.</p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Late-Night Halal Food on the Las Vegas Strip – Open Daily 10 AM to 5 AM</h2>
        <p className="mb-4">Craving halal food after hours? Istanbul Mediterranean has you covered with bold, authentic flavors served late into the night. Open daily from 10 AM to 5 AM, we’re perfectly located on the Las Vegas Strip for post-club cravings or a midnight shawarma run. Quick, halal, and always satisfying.</p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-2">Why Choose Our Halal Restaurant?</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>100% halal-certified meats and ingredients</li>
          <li>Family-owned and operated</li>
          <li>Located on the Las Vegas Strip</li>
          <li>Open late for your convenience</li>
          <li>Friendly, welcoming staff</li>
        </ul>
        <p className="mb-4">Visit us today and enjoy a true halal dining experience in the heart of Las Vegas!</p>
      </section>
    </div>
  );
}
