import { Helmet } from "react-helmet";

export default function ShawarmaPage() {
  return (
    <div className="px-6 py-12 max-w-5xl mx-auto space-y-14">
      <Helmet>
        <title>Best Shawarma in Las Vegas | Authentic Turkish Döner | Istanbul Mediterranean</title>
        <meta
          name="description"
          content="Experience authentic shawarma & döner kebab in Las Vegas at Istanbul Mediterranean. 100% halal, traditional Turkish preparation, fresh ingredients. Order online now!"
        />
        <meta name="keywords" content="shawarma las vegas, doner kebab, halal food las vegas, turkish food, mediterranean restaurant, authentic shawarma, best shawarma las vegas" />
        <meta property="og:title" content="Best Shawarma in Las Vegas | Istanbul Mediterranean" />
        <meta property="og:description" content="Authentic Turkish shawarma & döner kebab in Las Vegas. 100% halal, traditional preparation, fresh daily. Order now!" />
        <meta property="og:image" content="https://www.istanbullv.com/shawarma-vs-doner.webp" />
        <meta property="og:url" content="https://www.istanbullv.com/shawarma" />
        <link rel="canonical" href="https://www.istanbullv.com/shawarma" />
        <script type="application/ld+json">{`
          [
            {
              "@context": "https://schema.org",
              "@type": "Restaurant",
              "name": "Istanbul Mediterranean",
              "description": "Authentic Turkish Mediterranean restaurant serving halal shawarma and döner kebab in Las Vegas",
              "url": "https://www.istanbullv.com",
              "telephone": "+17028473300",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Las Vegas",
                "@region": "Nevada",
                "addressCountry": "US"
              },
              "servesCuisine": ["Turkish", "Mediterranean", "Middle Eastern"],
              "acceptsReservations": true,
              "hasMenu": "https://www.istanbullv.com/menu",
              "image": "https://www.istanbullv.com/istanbul-exterior.webp"
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
              {
                "@type": "Question",
                "name": "What is shawarma and where does it come from?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Shawarma is a Middle Eastern street food of spiced, thinly sliced meat cooked on a rotating vertical spit. It originated in the Ottoman Empire (modern Turkey) in the 19th century."
                }
              },
              {
                "@type": "Question",
                "name": "What ingredients and sauces are typically used in shawarma?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Authentic shawarma uses meat marinated in spices like cumin, coriander, paprika, turmeric, and garlic, often with lemon and olive oil, served in pita or flatbread with tahini, pickles, tomatoes, onions."
                }
              },
              {
                "@type": "Question",
                "name": "How can I make shawarma at home?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Marinate thinly sliced meat in spices, lemon, and oil. Grill, bake, or use a rotisserie until cooked, then slice thinly. Serve wrapped in flatbread with tahini, yogurt sauce, and fresh vegetables."
                }
              },
              {
                "@type": "Question",
                "name": "How is shawarma different from a gyro or döner kebab?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Shawarma is seasoned with Middle Eastern spices and served with tahini sauces. Gyros use Greek herbs and tzatziki. Döner kebab is the Turkish original with traditional seasonings."
                }
              },
              {
                "@type": "Question",
                "name": "Is shawarma a healthy choice?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Shawarma can be a healthy, protein-rich meal if made with lean meats, fresh vegetables, and light sauces. Watch for calorie-dense extras like fries or heavy garlic sauces."
                }
              }
            ]
            }
          ]
        `}</script>
      </Helmet>

      {/* Hero Section with Image */}
      <header className="text-center relative mb-8">
        <div className="relative">
          <img
            src="/shawarma-vs-doner.webp"
            alt="Authentic shawarma and döner kebab preparation at Istanbul Mediterranean Restaurant"
            className="w-full h-64 md:h-96 object-cover rounded-2xl shadow-2xl"
            loading="eager"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-2xl flex items-center justify-center">
            <div className="text-white text-center px-4">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-lg">
                Shawarma: Authentic Middle Eastern Street Food
              </h1>
              <p className="text-lg md:text-xl drop-shadow-md max-w-3xl mx-auto">
                Everything you need to know about one of the world's most beloved street foods.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Order CTA */}
      <section className="bg-gradient-to-r from-red-600 to-orange-600 text-white p-8 rounded-2xl text-center shadow-2xl">
        <h2 className="text-3xl font-bold mb-4">🔥 Try Our Authentic Shawarma Today!</h2>
        <p className="text-xl mb-6">Experience the same traditional flavors described below at Istanbul Mediterranean</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=shawarma_page" 
            className="bg-white text-red-600 px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            🥙 Order Shawarma Now
          </a>
          <a 
            href="/menu" 
            className="border-2 border-white text-white px-8 py-3 rounded-full font-bold text-lg hover:bg-white hover:text-red-600 transition-colors"
          >
            View Full Menu
          </a>
        </div>
      </section>

      {/* What is Shawarma */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">What Is Shawarma?</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-lg leading-relaxed">
              Shawarma is thinly sliced, spiced meat—lamb, beef, or chicken—cooked slowly on a vertical rotisserie. 
              The meat self-bastes in its own juices, resulting in tender, flavorful slices served in flatbreads 
              with tahini, garlic sauce, and pickled vegetables.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/menu/pita-sandwiches/beefandlamb-doner-shawarma-pita.webp"
              alt="Beef and lamb shawarma pita sandwich"
              className="w-full h-32 object-cover rounded-lg shadow-md"
              loading="lazy"
            />
            <img
              src="/menu/pita-sandwiches/chicken-doner-shawarma-pita.webp"
              alt="Chicken shawarma pita sandwich"
              className="w-full h-32 object-cover rounded-lg shadow-md"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* History */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Origins and History</h2>
        <p>
          Shawarma evolved from the Turkish <em>döner kebab</em> in the Ottoman Empire during the 19th century. 
          As the method spread to the Levant, it adapted into what we now call shawarma—meaning "turning" in Turkish.
          By the 20th century, Lebanese immigrants popularized it globally, influencing dishes like Mexico's <em>tacos al pastor</em>.
        </p>
      </section>

      {/* How It's Made */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">How Shawarma Is Made</h2>
        <ol className="list-decimal list-inside space-y-3">
          <li>Marinate thin slices of meat with spices (cumin, coriander, paprika, turmeric, garlic) plus olive oil and lemon juice.</li>
          <li>Stack the meat tightly onto a vertical spit and slow-roast.</li>
          <li>Shave off tender slices as the meat cooks, and serve immediately in wraps or plates with sides.</li>
        </ol>
      </section>

      {/* Interactive Shawarma Varieties */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">Our Authentic Shawarma Varieties</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Beef & Lamb Shawarma */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <img
              src="/menu/lavash-wraps/beefandlamb-doner-shawarma-lavash-wrap.webp"
              alt="Beef and lamb shawarma lavash wrap"
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">🥩 Beef & Lamb Shawarma</h3>
              <p className="text-gray-600 mb-4">Traditional blend with rich Middle Eastern spices. The original and most authentic flavor profile.</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Classic • Authentic</span>
                <a 
                  href="https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=shawarma_page#beef_lamb" 
                  className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-700 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Order Now
                </a>
              </div>
            </div>
          </div>

          {/* Chicken Shawarma */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <img
              src="/menu/lavash-wraps/chicken-doner-shawarma-lavash-wrap.webp"
              alt="Chicken shawarma lavash wrap"
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">🐔 Chicken Shawarma</h3>
              <p className="text-gray-600 mb-4">Yogurt-lemon marinated for extra tenderness. Light yet flavorful, perfect for health-conscious diners.</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Light • Healthy</span>
                <a 
                  href="https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=shawarma_page#chicken" 
                  className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-700 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Order Now
                </a>
              </div>
            </div>
          </div>

          {/* Mixed Shawarma */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            <img
              src="/menu/turkish-pita/mixed-doner-beefandlamb-and-chicken-shawarma-turkish-pita.webp"
              alt="Mixed shawarma with beef, lamb, and chicken"
              className="w-full h-48 object-cover"
              loading="lazy"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3">🔥 Mixed Shawarma</h3>
              <p className="text-gray-600 mb-4">Best of both worlds! Combination of beef, lamb, and chicken for the ultimate flavor experience.</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Popular • Bold</span>
                <a 
                  href="https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=shawarma_page#mixed" 
                  className="bg-red-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-red-700 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Order Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Adaptations */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Shawarma Around the World</h2>
        <p>
          From Lebanon and Jordan to Germany and Mexico, shawarma has adapted into countless regional favorites.
          Variations include <em>tacos al pastor</em> in Mexico and lamb döner in Europe—each inspired by the same rotating-spit method.
        </p>
      </section>

      {/* Shawarma vs Gyro vs Döner */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Shawarma vs. Gyro vs. Döner</h2>
        <p>
          Though similar in preparation, shawarma (Middle Eastern) is seasoned with bold spices, gyros (Greek) are made 
          with Mediterranean herbs and tzatziki, and döner kebab (Turkish) features a more subtle flavor profile.
        </p>
      </section>

      {/* Las Vegas Local Section */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 p-8 rounded-2xl space-y-6">
        <h2 className="text-3xl font-bold text-center">🎰 Best Shawarma in Las Vegas</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-xl font-semibold mb-4">Why Istanbul Mediterranean?</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <strong>Authentic Turkish preparation</strong> - Traditional vertical rotisserie method
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <strong>100% Halal certified</strong> - Meeting the highest dietary standards
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <strong>Fresh daily preparation</strong> - Never frozen, always made to order
              </li>
              <li className="flex items-center">
                <span className="text-green-600 mr-2">✓</span>
                <strong>Family recipes</strong> - Passed down through generations
              </li>
            </ul>
          </div>
          <div className="text-center">
            <img
              src="/istanbul-exterior.webp"
              alt="Istanbul Mediterranean Restaurant exterior in Las Vegas"
              className="w-full h-48 object-cover rounded-lg shadow-lg mb-4"
              loading="lazy"
            />
            <p className="text-gray-600">📍 Located in the heart of Las Vegas</p>
          </div>
        </div>
      </section>

      {/* Health & Nutrition */}
      <section className="space-y-8">
        <h2 className="text-3xl font-bold text-center">🥗 Health & Nutrition Benefits</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-green-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4 text-green-800">💪 Nutritional Highlights</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Protein (Chicken Shawarma)</span>
                <span className="font-semibold">32g</span>
              </div>
              <div className="flex justify-between">
                <span>Calories (Wrap)</span>
                <span className="font-semibold">230-350</span>
              </div>
              <div className="flex justify-between">
                <span>Healthy Fats</span>
                <span className="font-semibold">Moderate</span>
              </div>
              <div className="flex justify-between">
                <span>Fiber (with veggies)</span>
                <span className="font-semibold">8-12g</span>
              </div>
            </div>
          </div>
          <div className="bg-blue-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-4 text-blue-800">🌟 Health Benefits</h3>
            <ul className="space-y-2">
              <li>• <strong>High protein</strong> supports muscle growth</li>
              <li>• <strong>Mediterranean spices</strong> have anti-inflammatory properties</li>
              <li>• <strong>Fresh vegetables</strong> provide essential vitamins</li>
              <li>• <strong>Tahini sauce</strong> contains healthy fats and calcium</li>
              <li>• <strong>No processed additives</strong> in traditional preparation</li>
            </ul>
          </div>
        </div>
        <div className="text-center bg-yellow-50 p-6 rounded-xl">
          <h4 className="font-semibold text-yellow-800 mb-2">💡 Pro Tip for Healthier Shawarma:</h4>
          <p className="text-yellow-700">
            Choose lavash wrap instead of pita, extra vegetables, and request light sauce for a lower-calorie, nutrient-dense meal.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <details className="p-4 border rounded-lg">
            <summary className="font-semibold cursor-pointer">What is shawarma and where does it come from?</summary>
            <p className="mt-2">
              Shawarma originated in the Ottoman Empire and refers to spiced meat cooked on a rotating spit, 
              a culinary tradition that evolved into today's Middle Eastern favorite.
            </p>
          </details>

          <details className="p-4 border rounded-lg">
            <summary className="font-semibold cursor-pointer">What ingredients are typically used in shawarma?</summary>
            <p className="mt-2">
              Typical shawarma includes cumin, paprika, turmeric, garlic, and lemon-marinated meats like lamb, beef, or chicken, 
              wrapped with tahini or garlic sauces, pickles, and salads.
            </p>
          </details>

          <details className="p-4 border rounded-lg">
            <summary className="font-semibold cursor-pointer">How do I make shawarma at home?</summary>
            <p className="mt-2">
              Marinate sliced meat in Middle Eastern spices and roast or grill. Serve thinly sliced meat in pita with toppings.
            </p>
          </details>

          <details className="p-4 border rounded-lg">
            <summary className="font-semibold cursor-pointer">Is shawarma healthy?</summary>
            <p className="mt-2">
              Yes, especially when made with lean meats, fresh vegetables, and lighter sauces. 
              It's a great source of protein with moderate fat and provides essential nutrients.
            </p>
          </details>

          <details className="p-4 border rounded-lg">
            <summary className="font-semibold cursor-pointer">What's the difference between shawarma and döner kebab?</summary>
            <p className="mt-2">
              While both use the rotating spit method, döner kebab is Turkish with specific spice blends, 
              while shawarma is Arab/Levantine with different seasonings and sauces. At Istanbul Mediterranean, 
              we serve authentic Turkish döner kebab using traditional methods.
            </p>
          </details>

          <details className="p-4 border rounded-lg">
            <summary className="font-semibold cursor-pointer">Is your shawarma halal certified?</summary>
            <p className="mt-2">
              Yes! All our meats are 100% halal certified, ensuring they meet the highest Islamic dietary standards. 
              We source from certified suppliers and maintain strict halal preparation methods.
            </p>
          </details>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gradient-to-r from-orange-500 to-red-600 text-white p-12 rounded-2xl text-center">
        <h2 className="text-4xl font-bold mb-4">🥙 Ready to Experience Authentic Shawarma?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Don't just read about it - taste the difference that authentic Turkish preparation makes. 
          Order from Istanbul Mediterranean and discover why we're Las Vegas's premier destination for halal Mediterranean cuisine.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <a 
            href="https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=shawarma_page_bottom" 
            className="bg-white text-red-600 px-10 py-4 rounded-full font-bold text-xl hover:bg-gray-100 transition-colors shadow-2xl transform hover:scale-105"
            target="_blank"
            rel="noopener noreferrer"
          >
            🚀 Order Shawarma Now
          </a>
          
          <div className="flex gap-4">
            <a 
              href="/menu" 
              className="border-2 border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-red-600 transition-colors"
            >
              View Menu
            </a>
            <a 
              href="/contact" 
              className="border-2 border-white text-white px-6 py-3 rounded-full font-medium hover:bg-white hover:text-red-600 transition-colors"
            >
              Visit Us
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white border-opacity-20">
          <p className="text-lg opacity-90">
            📞 Call us: <a href="tel:+17028473300" className="underline hover:no-underline">(702) 847-3300</a> |
            📍 Las Vegas, Nevada
          </p>
        </div>
      </section>
    </div>
  );
}
