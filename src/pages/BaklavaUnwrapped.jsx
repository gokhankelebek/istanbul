import { Helmet } from "react-helmet";

export default function BaklavaUnwrapped() {
  return (
    <div className="px-6 py-12 max-w-5xl mx-auto space-y-16">
      <Helmet>
        <title>Baklava Unwrapped: The Ultimate Guide to the World's Sweetest Masterpiece</title>
        <meta name="description" content="Discover the rich history, secrets, and varieties of baklava. Learn why this ancient dessert remains a global icon." />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              { "@type": "Question", "name": "Where did baklava originate?", "acceptedAnswer": { "@type": "Answer", "text": "Baklava traces its origins to the Ottoman Empire, with earlier influences from Middle Eastern and Central Asian cuisines." } },
              { "@type": "Question", "name": "What makes Turkish baklava special?", "acceptedAnswer": { "@type": "Answer", "text": "Turkish baklava is famous for its ultra-thin phyllo layers, clarified butter, pistachio or walnut fillings, and lighter syrup compared to other versions." } },
              { "@type": "Question", "name": "Is baklava healthy?", "acceptedAnswer": { "@type": "Answer", "text": "Baklava is rich in calories and sugar but contains healthy fats from nuts. It should be enjoyed in moderation." } }
            ]
          }
        `}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="text-center">
        <h1 className="text-5xl font-extrabold mb-4">Baklava Unwrapped</h1>
        <p className="text-lg text-gray-600">
          A crisp, golden, syrup-drenched journey through history, culture, and irresistible flavor.
        </p>
      </section>

      {/* History Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">A Bite Through Time: The Origins of Baklava</h2>
        <p>
          Baklava's roots wind through the opulent courts of the Ottoman Empire. Although layered pastries existed in Assyrian and Byzantine kitchens, it was in Istanbul’s Topkapı Palace that baklava was perfected into the art form we know today. Over centuries, the dessert migrated across the Middle East, Greece, North Africa, and eventually the world.
        </p>
      </section>

      {/* How It's Made Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">How Baklava Is Made</h2>
        <ol className="list-decimal list-inside space-y-3">
          <li><strong>Phyllo Preparation:</strong> Paper-thin layers of unleavened dough are hand-rolled or machine-rolled.</li>
          <li><strong>Nut Filling:</strong> Traditionally crushed pistachios or walnuts, often blended with cinnamon or cardamom.</li>
          <li><strong>Layering:</strong> Dozens of sheets are stacked with melted butter brushed between each one.</li>
          <li><strong>Cutting:</strong> Sliced into diamond or square shapes before baking to ensure crispness.</li>
          <li><strong>Baking:</strong> Baked slowly at a moderate temperature until golden brown.</li>
          <li><strong>Soaking:</strong> Drenched in a syrup of sugar, water, lemon, and sometimes rosewater or orange blossom water.</li>
        </ol>
      </section>

      {/* Turkish vs Greek Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Turkish Baklava vs Greek Baklava</h2>
        <p>
          Both cuisines cherish baklava, but Turkish baklava typically uses pistachios, clarified butter, and a lighter syrup. Greek baklava often leans on walnuts, heavier honey syrups, and spices like cloves and cinnamon.
        </p>
      </section>

      {/* Secrets of Great Baklava */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Secrets of Exceptional Baklava</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Ultra-thin phyllo (the thinner, the more delicate the final texture)</li>
          <li>High-quality butter, preferably clarified to remove milk solids</li>
          <li>Fresh pistachios or walnuts, never stale</li>
          <li>A perfectly balanced syrup: not too thick, not too thin</li>
          <li>Resting the baklava after soaking so flavors meld deeply</li>
        </ul>
      </section>

      {/* Global Journey Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Baklava Around the World</h2>
        <p>
          In Lebanon and Syria, baklava often incorporates cashews and rosewater. In Algeria and Morocco, it mingles with North African pastries like makrout. Across Europe and America, artisanal baklava shops now celebrate both tradition and innovation, offering versions like chocolate-dipped baklava or vegan nut-free variations.
        </p>
      </section>

      {/* Health Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold">Is Baklava Healthy?</h2>
        <p>
          Baklava is calorie-dense due to butter, syrup, and nuts. However, it also contains heart-healthy unsaturated fats from pistachios and walnuts. Treat baklava as a luxurious indulgence—enjoyed occasionally and savored fully.
        </p>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <details className="p-4 border rounded-lg">
            <summary className="font-semibold cursor-pointer">Where did baklava originate?</summary>
            <p className="mt-2">Baklava has its deepest roots in the kitchens of the Ottoman Empire, influenced by Central Asian and Middle Eastern culinary traditions.</p>
          </details>

          <details className="p-4 border rounded-lg">
            <summary className="font-semibold cursor-pointer">What makes Turkish baklava special?</summary>
            <p className="mt-2">Ultra-thin phyllo, clarified butter, and a lighter syrup featuring fragrant pistachios make Turkish baklava distinct.</p>
          </details>

          <details className="p-4 border rounded-lg">
            <summary className="font-semibold cursor-pointer">Is baklava healthy?</summary>
            <p className="mt-2">Baklava is rich, sweet, and best enjoyed as an occasional treat. Thanks to nuts, it also offers beneficial fats and antioxidants.</p>
          </details>
        </div>
      </section>
    </div>
  );
}

        </div>
      </div>
    </>
  );
}
