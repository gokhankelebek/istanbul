import React from 'react';
import { Helmet } from 'react-helmet';

export default function Shawarma() {
  return (
    <>
      <Helmet>
        <title>Shawarma vs. Doner Kebab: Unraveling the Threads of Tradition | Istanbul Mediterranean Restaurant Las Vegas</title>
        <meta name="description" content="Dive into the savory world of Shawarma and Doner Kebab as we explore their origins, cultural significance, and how these iconic dishes differ across regions. Join us on a culinary journey that celebrates the rich heritage and delicious diversity of Mediterranean and Middle Eastern cuisine." />
        <link rel="canonical" href="https://www.istanbullv.com/shawarma" />
      </Helmet>
      {/* Hero Section */}
      <div className="relative min-h-[400px] md:min-h-[500px] flex items-center justify-center bg-gradient-to-b from-black/60 to-offwhite/80">
        <img 
          src="/menu/Fries Bowl/Beef&Lamb-Döner-(Shawarma)-French-Fries-Bowl.png" 
          alt="Shawarma Hero" 
          className="absolute inset-0 w-full h-full object-cover object-center opacity-70" 
          style={{zIndex: 0}}
        />
        <div className="relative z-10 text-center px-4 py-12">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-4">Shawarma vs. Doner Kebab</h1>
          <div className="text-lg md:text-2xl text-white font-medium mb-6 max-w-2xl mx-auto drop-shadow">Unraveling the Threads of Tradition</div>
          <a href="/menu" className="inline-block px-8 py-4 rounded bg-istanbulRed text-white font-bold shadow-lg hover:bg-red-700 transition-colors text-lg md:text-xl">Order Shawarma Now</a>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-offwhite min-h-screen py-16 px-4">
  <div className="max-w-2xl mx-auto">
    <h1 className="text-4xl md:text-5xl font-extrabold text-primary mb-6">Shawarma: The Sizzling Soul of the Mediterranean</h1>
    <p className="text-lg text-charcoal mb-4">
      Picture a vertical spit, slowly turning, layers of marinated meat sizzling and caramelizing as savory aromas fill the air. This is shawarma—a dish that has conquered hearts from Istanbul to Los Angeles. At Istanbul Mediterranean, our shawarma is a tribute to tradition, flavor, and the joy of sharing good food.
    </p>
    <h2 className="text-2xl font-bold text-saffron mb-2">A Storied Past</h2>
    <p className="text-charcoal mb-4">
      Shawarma’s roots stretch back centuries, evolving from the Turkish doner kebab and spreading throughout the Middle East and beyond. Each region has added its own twist, but the essence remains: expertly seasoned meat, slow-roasted to juicy perfection.
    </p>
    <h2 className="text-2xl font-bold text-saffron mb-2">Crafted with Passion</h2>
    <ul className="list-disc ml-6 text-charcoal mb-6">
      <li>Marinated for hours in a secret blend of Mediterranean spices</li>
      <li>Roasted on a vertical spit for maximum tenderness and flavor</li>
      <li>Hand-carved to order, ensuring every bite is fresh and juicy</li>
      <li>Served in warm pita or lavash with crisp veggies and signature sauces</li>
    </ul>
    <h2 className="text-2xl font-bold text-saffron mb-2">Why Ours is Special</h2>
    <ul className="list-disc ml-6 text-charcoal mb-6">
      <li>Authentic recipes passed down through generations</li>
      <li>Halal-certified meats and the freshest ingredients</li>
      <li>Balanced, bold flavors that keep you coming back</li>
      <li>A true taste of Istanbul, right here in Las Vegas</li>
    </ul>
    <p className="text-lg text-saffron font-semibold mb-6">Ready to experience shawarma at its best? Visit Istanbul Mediterranean Grill or order online for a flavor adventure!</p>
    <div className="mt-8 text-center">
      <a href="/menu" className="inline-block px-6 py-3 bg-istanbulRed text-white rounded-full font-bold shadow hover:bg-primary transition-colors">See Our Full Menu</a>
    </div>
  </div>
        <div className="max-w-4xl mx-auto">
          {/* Introduction */}
          {/* Culinary Tips & Date */}
          <div className="flex items-center justify-between mb-6">
            <div className="text-xs text-herb">Culinary tips</div>
            <div className="text-sm text-charcoal">Feb 6, 2024</div>
          </div>

          <h2 className="text-3xl font-bold text-primary mb-4">Different types of street food cooked on a vertical rotisserie</h2>
          <p className="text-lg text-charcoal mb-8">Dive into the savory world of Shawarma and Doner Kebab as we explore their origins, cultural significance, and how these iconic dishes differ across regions. Join us on a culinary journey that celebrates the rich heritage and delicious diversity of Mediterranean and Middle Eastern cuisine.</p>

          {/* Comparison Section */}
          <div className="my-12 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 flex flex-col items-center">
              <img src="/menu/fries-bowl/beefandlamb-doner-shawarma-french-fries-bowl.webp" alt="Shawarma" className="w-full max-w-xs rounded-xl shadow-lg mb-4" />
              <div className="text-lg font-semibold text-primary">Shawarma</div>
            </div>
            <div className="flex-1 flex flex-col items-center">
              <img src="/menu/Pita/Mixed-Doner-Pita.png" alt="Doner Kebab" className="w-full max-w-xs rounded-xl shadow-lg mb-4" />
              <div className="text-lg font-semibold text-saffron">Doner Kebab</div>
            </div>
          </div>
          <div className="overflow-x-auto mb-12">
            <table className="min-w-full text-left border border-gray-200 rounded-lg shadow-sm bg-white">
              <thead className="bg-istanbulRed text-white">
                <tr>
                  <th className="py-2 px-4">Feature</th>
                  <th className="py-2 px-4">Shawarma</th>
                  <th className="py-2 px-4">Doner Kebab</th>
                </tr>
              </thead>
              <tbody className="text-charcoal">
                <tr>
                  <td className="py-2 px-4 font-semibold">Origin</td>
                  <td className="py-2 px-4">Middle East</td>
                  <td className="py-2 px-4">Turkey</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-2 px-4 font-semibold">Meat</td>
                  <td className="py-2 px-4">Lamb, chicken, beef (marinated)</td>
                  <td className="py-2 px-4">Lamb, beef, chicken (often less marinated)</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-semibold">Spices</td>
                  <td className="py-2 px-4">Rich blend: cumin, coriander, turmeric, cinnamon, cardamom</td>
                  <td className="py-2 px-4">Simple: salt, pepper, oregano, sumac</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="py-2 px-4 font-semibold">Serving Style</td>
                  <td className="py-2 px-4">Wrap, pita, with tahini/veggies</td>
                  <td className="py-2 px-4">Bread, rice, with pickles/yogurt</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-semibold">Sauces</td>
                  <td className="py-2 px-4">Tahini, garlic, amba</td>
                  <td className="py-2 px-4">Yogurt, tomato, sumac onions</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* How It's Made Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-primary mb-6">How It's Made: Shawarma & Doner Kebab</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
                <img src="/menu/Wrap/Beef&Lamb-Döner-(Shawarma-Lavash-Wrap.png" alt="Shawarma Prep" className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-istanbulRed/30" />
                <h4 className="text-lg font-semibold mb-2 text-primary">Shawarma</h4>
                <ol className="list-decimal ml-6 text-charcoal text-base">
                  <li>Marinate meat in a blend of Middle Eastern spices.</li>
                  <li>Stack marinated slices on a vertical spit.</li>
                  <li>Slowly roast, shaving off thin slices as it cooks.</li>
                  <li>Serve in pita/wrap with veggies and tahini.</li>
                </ol>
              </div>
              <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
                <img src="/menu/Pita/Mixed-Doner-Pita.png" alt="Doner Prep" className="w-32 h-32 object-cover rounded-full mb-4 border-4 border-saffron/30" />
                <h4 className="text-lg font-semibold mb-2 text-saffron">Doner Kebab</h4>
                <ol className="list-decimal ml-6 text-charcoal text-base">
                  <li>Season meat with salt, pepper, and Turkish herbs.</li>
                  <li>Stack on vertical rotisserie (doner).</li>
                  <li>Roast and slice thinly for serving.</li>
                  <li>Serve on bread/rice with pickles and yogurt sauce.</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Testimonials Section */}
          <div className="mb-12">
            <h3 className="text-2xl font-bold text-primary mb-6">What Our Guests Say</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-xl shadow">
                <div className="text-lg font-semibold text-istanbulRed mb-1">"Best Shawarma in Vegas!"</div>
                <div className="text-charcoal text-base mb-2">"The flavors are authentic and the meat is always juicy. Highly recommend the shawarma wrap!"</div>
                <div className="text-xs text-right text-herb">- Sarah M.</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow">
                <div className="text-lg font-semibold text-saffron mb-1">"Doner Kebab Perfection"</div>
                <div className="text-charcoal text-base mb-2">"Reminds me of my travels in Istanbul. The doner is spot on!"</div>
                <div className="text-xs text-right text-herb">- Ahmed K.</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow">
                <div className="text-lg font-semibold text-primary mb-1">"A Must-Try Experience"</div>
                <div className="text-charcoal text-base mb-2">"The atmosphere and food are both amazing. I always bring friends here!"</div>
                <div className="text-xs text-right text-herb">- Lisa R.</div>
              </div>
              <div className="bg-white p-4 rounded-xl shadow">
                <div className="text-lg font-semibold text-istanbulRed mb-1">"Delicious and Authentic"</div>
                <div className="text-charcoal text-base mb-2">"You can taste the tradition in every bite. The best Mediterranean spot in town!"</div>
                <div className="text-xs text-right text-herb">- Omar F.</div>
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold text-primary mb-2">Experience Authentic Mediterranean Cuisine in Las Vegas</h3>
            <p className="mb-4">Istanbul Mediterranean Restaurant in Las Vegas is a must-visit spot for those looking to experience the flavors of authentic Mediterranean cuisine. The restaurant offers a unique culinary journey with fresh ingredients and traditional Turkish and Mediterranean dishes. Known for its popular items like doner kebab and shawarma, Istanbul Mediterranean Restaurant has become one of the city's favorite dining destinations. With a diverse menu that includes appetizers, meat and chicken dishes, and vegetarian options, the restaurant caters to all tastes. Its warm and inviting atmosphere makes it a top choice for anyone seeking a memorable meal in Las Vegas.</p>
          </div>

          {/* Menu Preview CTA */}
          <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 bg-istanbulRed/10 p-8 rounded-xl shadow">
            <div>
              <div className="text-2xl font-bold text-istanbulRed mb-2">Ready to Taste the Tradition?</div>
              <div className="text-charcoal mb-4">Explore our menu and order your favorite shawarma or doner kebab today!</div>
              <a href="/menu" className="inline-block px-8 py-4 rounded bg-istanbulRed text-white font-bold shadow-lg hover:bg-red-700 transition-colors text-lg md:text-xl">See Full Menu</a>
            </div>
            <img src="/menu/fries-bowl/beefandlamb-doner-shawarma-french-fries-bowl.webp" alt="Shawarma Menu Preview" className="w-48 h-48 object-cover rounded-lg shadow-lg border-4 border-istanbulRed/30" />
          </div>

          <h3 className="text-xl font-semibold text-primary mb-2">Experience Authentic Mediterranean Cuisine in Las Vegas</h3>
          <p className="mb-4">Istanbul Mediterranean Restaurant in Las Vegas is a must-visit spot for those looking to experience the flavors of authentic Mediterranean cuisine. The restaurant offers a unique culinary journey with fresh ingredients and traditional Turkish and Mediterranean dishes. Known for its popular items like doner kebab and shawarma, Istanbul Mediterranean Restaurant has become one of the city's favorite dining destinations. With a diverse menu that includes appetizers, meat and chicken dishes, and vegetarian options, the restaurant caters to all tastes. Its warm and inviting atmosphere makes it a top choice for anyone seeking a memorable meal in Las Vegas.</p>

          <div className="mt-8">
            <a href="/menu" className="inline-block px-6 py-3 rounded bg-istanbulRed text-white font-bold shadow hover:bg-red-700 transition-colors text-lg">Click here to visit Istanbul Mediterranean Restaurant now and find out more!</a>
          </div>
        </div>
      </div>
    </>
  );
}

