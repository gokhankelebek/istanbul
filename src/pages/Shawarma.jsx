import { Helmet } from "react-helmet";

export default function ShawarmaPage() {
  return (
    <div className="px-6 py-12 max-w-5xl mx-auto space-y-14">
      <Helmet>
        <title>Shawarma: Authentic Middle Eastern Street Food</title>
        <meta
          name="description"
          content="Discover everything about shawarma: origins, preparation, variations, and health facts. Learn why shawarma is loved worldwide."
        />
        <script type="application/ld+json">{`
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
        `}</script>
      </Helmet>

      {/* Page Title */}
      <header className="text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-4">Shawarma: Authentic Middle Eastern Street Food</h1>
        <p className="text-lg md:text-xl text-gray-600">
          Everything you need to know about one of the world's most beloved street foods.
        </p>
      </header>

      {/* What is Shawarma */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">What Is Shawarma?</h2>
        <p>
          Shawarma is thinly sliced, spiced meat—lamb, beef, or chicken—cooked slowly on a vertical rotisserie. 
          The meat self-bastes in its own juices, resulting in tender, flavorful slices served in flatbreads 
          with tahini, garlic sauce, and pickled vegetables.
        </p>
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

      {/* Variations */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Popular Shawarma Variations</h2>
        <ul className="list-disc list-inside space-y-3">
          <li><strong>Chicken Shawarma:</strong> Yogurt-lemon marinated for extra tenderness.</li>
          <li><strong>Beef/Lamb Shawarma:</strong> Traditional with rich spice blends.</li>
          <li><strong>Turkey Shawarma:</strong> Especially popular in Israel for kosher dining.</li>
          <li><strong>Veggie Shawarma:</strong> Using grilled vegetables or falafel for plant-based versions.</li>
        </ul>
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

      {/* Health */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Is Shawarma Healthy?</h2>
        <p>
          Shawarma can be a protein-rich, satisfying meal when paired with fresh vegetables and light sauces.
          A typical chicken shawarma wrap contains about 230 calories and 32g of protein. Watch portion sizes 
          and sides for the healthiest experience.
        </p>
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
              It’s a great source of protein with moderate fat.
            </p>
          </details>
        </div>
      </section>
    </div>
  );
}
