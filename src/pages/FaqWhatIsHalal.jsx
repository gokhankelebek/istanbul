import React from 'react';

import { Helmet } from 'react-helmet';

export default function FaqWhatIsHalal() {
  return (
    <>
      <Helmet>
        <title>What is Halal? | Istanbul Mediterranean Halal Restaurant Las Vegas FAQ</title>
        <meta name="description" content="Learn what halal means and why Istanbul Mediterranean Grill is the top halal-certified Mediterranean restaurant in Las Vegas. See our halal meat certificate and commitment to authentic Turkish cuisine." />
        <link rel="canonical" href="https://www.istanbullv.com/faq/what-is-halal" />
        {/* FAQPage Schema for SEO */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What does halal mean?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Halal means 'permissible' in Arabic. In food, it refers to meat and ingredients that are prepared according to Islamic dietary laws."
                }
              },
              {
                "@type": "Question",
                "name": "Is Istanbul Mediterranean Grill halal certified?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, we serve 100% halal-certified meats and proudly display our halal meat certificate at our restaurant in Las Vegas."
                }
              },
              {
                "@type": "Question",
                "name": "Where is Istanbul Mediterranean Grill located?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "3615 S Las Vegas Blvd #101, Las Vegas, NV 89109. Open daily 10am-5am."
                }
              }
            ]
          }
        `}</script>
      </Helmet>
    <div className="bg-offwhite min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-extrabold text-primary mb-4">FAQ: What is Halal?</h1>
        <p className="mb-4 text-charcoal">Halal is an Arabic word meaning "permissible." In the context of food, it refers to what is allowed under Islamic law. Halal food must be prepared according to specific guidelines, including the sourcing and handling of meat and other ingredients.</p>
        <h2 className="text-xl font-bold text-saffron mb-2">Key Points:</h2>
        <ul className="list-disc ml-6 text-charcoal mb-6">
          <li>Halal meat must come from healthy animals slaughtered in the name of God.</li>
          <li>No pork or pork products are used in halal food.</li>
          <li>Alcohol and intoxicants are not permitted.</li>
          <li>All of our menu items at Istanbul Mediterranean are halal unless otherwise specified.</li>
        </ul>
        <p className="text-charcoal">If you have more questions about halal, please <a href="/contact" className="text-saffron underline hover:text-primary">contact us</a> or ask our staff in person.</p>
        <div className="mt-8 text-sm text-charcoal flex flex-col gap-2 items-center">
          <span>Explore our <Link to="/menu" className="text-saffron underline hover:text-primary">full menu</Link>, read about our <Link to="/halal" className="text-saffron underline hover:text-primary">halal certification</Link>, or learn more about <Link to="/mediterranean-food-las-vegas" className="text-saffron underline hover:text-primary">Mediterranean cuisine</Link>.</span>
        </div>
      </div>
    </div>
    </>
  );
}
