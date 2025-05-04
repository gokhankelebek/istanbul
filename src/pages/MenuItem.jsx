import React from 'react';
import { Helmet } from 'react-helmet';
import { useParams, Link } from 'react-router-dom';
import menu from '../data/menu.json';

export default function MenuItem() {
  const { slug } = useParams();
  const item = menu.find(i => i.slug === slug);
  if (!item) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h1 className="text-3xl font-bold mb-4 text-istanbulRed">Menu Item Not Found</h1>
        <Link to="/menu" className="btn btn-primary">← Back to Menu</Link>
      </div>
    );
  }
  // SEO Meta Tags
  const itemTitle = `${item.name} | Istanbul Mediterranean Halal`;
  const itemDesc = item.desc || item.description || 'Order authentic Mediterranean food in Las Vegas.';
  const itemImg = item.img || item.image || '/default-cover.jpg';
  const canonicalUrl = typeof window !== 'undefined' ? window.location.href : '';
  // SEO keyword expansion
  const keywordSynonyms = [
    item.name,
    ...(item.synonyms || []),
    ...(item.ingredients || []),
    'halal',
    'Mediterranean',
    'Turkish',
    'Greek',
    'Middle Eastern',
    'Las Vegas',
    'delivery',
    'order online',
    'authentic',
    'healthy',
    'best',
    ...(item.categories || []),
    `best ${item.name} in Las Vegas`,
    `order ${item.name} Las Vegas`,
    `halal ${item.name} Las Vegas`,
    `Mediterranean ${item.name} Las Vegas`
  ];
  const keywords = Array.from(new Set(keywordSynonyms)).join(', ');

  // Structured data for rich results
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'MenuItem',
    'name': item.name,
    'image': itemImg,
    'description': itemDesc,
    'offers': {
      '@type': 'Offer',
      'price': item.price,
      'priceCurrency': 'USD',
      'availability': 'https://schema.org/InStock'
    },
    'url': canonicalUrl
  };

  // Intelligent 'Pairs Well With' logic
  function getPairsWellWith(item) {
    const lowerName = item.name.toLowerCase();
    if (lowerName.includes('chikofte') || lowerName.includes('falafel') || lowerName.includes('veggie')) {
      // Vegan/vegetarian: suggest hummus, grape leaves, fries, salad, ayran
      return menu.filter(i =>
        i.slug !== item.slug && [
          'hummus', 'stuffed-grape-leaves-(4-pieces)', 'french-fries', 'falafel-side', 'veggie-bowl', 'yogurt-drink-(ayran)', 'salad-bowls', 'sides'
        ].some(key => (i.slug || '').includes(key) || (i.categories || []).includes(key))
      ).slice(0, 2);
    }
    if (lowerName.includes('baklava') || lowerName.includes('dessert') || (item.categories && item.categories.includes('desserts'))) {
      // Dessert: suggest Turkish coffee, tea
      return menu.filter(i =>
        i.slug !== item.slug && [
          'turkish-coffee', 'tea', 'coffee', 'drinks'
        ].some(key => (i.slug || '').includes(key) || (i.categories || []).includes(key))
      ).slice(0, 2);
    }
    if (lowerName.includes('chicken')) {
      // Chicken: suggest fries, salad, hummus, ayran, baklava
      return menu.filter(i =>
        i.slug !== item.slug && [
          'french-fries', 'salad-bowls', 'hummus', 'yogurt-drink-(ayran)', 'baklava', 'sides', 'desserts'
        ].some(key => (i.slug || '').includes(key) || (i.categories || []).includes(key))
      ).slice(0, 2);
    }
    if (lowerName.includes('beef') || lowerName.includes('lamb') || lowerName.includes('doner') || lowerName.includes('shawarma') || lowerName.includes('mixed')) {
      // Beef/lamb/mixed: suggest fries, salad, hummus, ayran, baklava
      return menu.filter(i =>
        i.slug !== item.slug && [
          'french-fries', 'salad-bowls', 'hummus', 'yogurt-drink-(ayran)', 'baklava', 'sides', 'desserts'
        ].some(key => (i.slug || '').includes(key) || (i.categories || []).includes(key))
      ).slice(0, 2);
    }
    if ((item.categories || []).includes('drinks')) {
      // Drink: suggest popular mains or desserts
      return menu.filter(i =>
        i.slug !== item.slug && [
          'doner', 'shawarma', 'baklava', 'falafel', 'pita', 'wrap', 'desserts', 'rice-bowls', 'pita-sandwiches'
        ].some(key => (i.slug || '').includes(key) || (i.categories || []).includes(key))
      ).slice(0, 2);
    }
    // Default: suggest fries, salad, baklava
    return menu.filter(i =>
      i.slug !== item.slug && [
        'french-fries', 'salad-bowls', 'baklava', 'sides', 'desserts'
      ].some(key => (i.slug || '').includes(key) || (i.categories || []).includes(key))
    ).slice(0, 2);
  }
  const pairsWellWith = getPairsWellWith(item);

  // Find related items (same category, not current, up to 3)
  const related = menu.filter(i => i.slug !== item.slug && i.categories && item.categories && i.categories.some(cat => item.categories.includes(cat)));
  const relatedItems = (related.length > 0 ? related : menu.filter(i => i.slug !== item.slug)).slice(0, 3);

  return (
    <>
      <Helmet>
        <title>{itemTitle}</title>
        <meta name="description" content={itemDesc} />
        <meta property="og:title" content={itemTitle} />
        <meta property="og:description" content={itemDesc} />
        <meta property="og:image" content={itemImg} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta name="keywords" content={keywords} />
        <link rel="canonical" href={canonicalUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={itemTitle} />
        <meta name="twitter:description" content={itemDesc} />
        <meta name="twitter:image" content={itemImg} />
        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>
      <div className="container mx-auto py-12 max-w-2xl">
        <Link to="/menu" className="text-istanbulRed hover:underline mb-4 inline-block">← Back to Menu</Link>
        <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
          <img src={itemImg} alt={`Halal ${item.name} ${item.categories && item.categories[0] ? item.categories[0] : ''} Las Vegas`} className="w-full max-w-md h-64 object-cover rounded-xl mb-6" loading="lazy" />
          <h1 className="text-3xl font-bold mb-2 text-center">{item.name}</h1>
          <div className="text-istanbulRed font-bold text-2xl mb-2">${item.price}</div>
          <div className="text-gray-700 mb-4 text-center">{itemDesc}</div>
          <a
            href={item.url || `https://orderdoner.com`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary px-6 py-2 rounded text-lg mt-2"
          >
            Order {item.name} Online in Las Vegas
          </a>
        </div>
        {/* Why Our [Item Name]? */}
        <section className="mt-10 mb-8">
          <h2 className="text-2xl font-bold text-primary mb-3">Why Our {item.name}?</h2>
          {item.slug.startsWith('chikofte') ? (
            <p className="text-gray-700 text-lg">
              Looking for the best vegan {item.name} in Las Vegas? Our {item.name.toLowerCase()} is 100% plant-based, made fresh daily with premium ingredients and authentic Mediterranean spices. Enjoy a delicious, healthy, and cruelty-free option—perfect for vegans, vegetarians, and anyone seeking a flavorful, nutritious meal!
            </p>
          ) : (
            <p className="text-gray-700 text-lg">
              Looking for the best {item.name} in Las Vegas? Our {item.name.toLowerCase()} is made fresh daily with premium, halal-certified ingredients. Enjoy authentic Mediterranean flavors, generous portions, and a perfect blend of spices—served fast for dine-in, takeout, or delivery. Whether you crave a healthy meal or a hearty treat, our {item.name.toLowerCase()} is the top choice for Mediterranean food lovers in Las Vegas.
            </p>
          )}
        </section>
        {/* FAQ Section */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-primary mb-2">Frequently Asked Questions</h2>
          <div className="space-y-3">
            <details className="bg-herb/5 rounded-lg p-4 border border-herb/20">
              <summary className="font-semibold cursor-pointer text-primary">{item.slug.startsWith('chikofte') ? `Is your ${item.name.toLowerCase()} vegan?` : `Is your ${item.name.toLowerCase()} halal?`}</summary>
              <div>
                {item.slug.startsWith('chikofte')
                  ? `Yes! Our ${item.name.toLowerCase()} is 100% vegan and made entirely from plant-based ingredients.`
                  : `Yes! All our menu items, including ${item.name.toLowerCase()}, are 100% halal and prepared according to Islamic dietary laws.`}
              </div>
            </details>
            <details className="bg-herb/5 rounded-lg p-4 border border-herb/20">
              <summary className="font-semibold cursor-pointer text-primary">Do you offer delivery for {item.name.toLowerCase()} in Las Vegas?</summary>
              <div>Absolutely! You can order {item.name.toLowerCase()} online for fast delivery anywhere in Las Vegas via <a href="https://orderdoner.com" className="text-istanbulRed underline hover:text-primary" target="_blank" rel="noopener noreferrer">orderdoner.com</a>.</div>
            </details>
            <details className="bg-herb/5 rounded-lg p-4 border border-herb/20">
              <summary className="font-semibold cursor-pointer text-primary">What makes your {item.name.toLowerCase()} authentic?</summary>
              <div>
                {item.slug.startsWith('chikofte')
                  ? `Our ${item.name.toLowerCase()} is crafted using traditional Mediterranean recipes, fresh herbs, and high-quality plant-based ingredients for a truly authentic and delicious vegan experience.`
                  : `Our ${item.name.toLowerCase()} uses traditional Mediterranean recipes, fresh herbs, and halal meats—prepared by experienced chefs for true flavor.`}
              </div>
            </details>
          </div>
          <script type="application/ld+json">{JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              item.slug.startsWith('chikofte') ? {
                "@type": "Question",
                "name": `Is your ${item.name.toLowerCase()} vegan?`,
                "acceptedAnswer": {"@type": "Answer", "text": `Yes! Our ${item.name.toLowerCase()} is 100% vegan and made entirely from plant-based ingredients.`}
              } : {
                "@type": "Question",
                "name": `Is your ${item.name.toLowerCase()} halal?`,
                "acceptedAnswer": {"@type": "Answer", "text": `Yes! All our menu items, including ${item.name.toLowerCase()}, are 100% halal and prepared according to Islamic dietary laws.`}
              },
              {
                "@type": "Question",
                "name": `Do you offer delivery for ${item.name.toLowerCase()} in Las Vegas?`,
                "acceptedAnswer": {"@type": "Answer", "text": `Absolutely! You can order ${item.name.toLowerCase()} online for fast delivery anywhere in Las Vegas via orderdoner.com.`}
              },
              {
                "@type": "Question",
                "name": `What makes your ${item.name.toLowerCase()} authentic?`,
                "acceptedAnswer": {"@type": "Answer", "text": item.slug.startsWith('chikofte')
                  ? `Our ${item.name.toLowerCase()} is crafted using traditional Mediterranean recipes, fresh herbs, and high-quality plant-based ingredients for a truly authentic and delicious vegan experience.`
                  : `Our ${item.name.toLowerCase()} uses traditional Mediterranean recipes, fresh herbs, and halal meats—prepared by experienced chefs for true flavor.`}
              }
            ]
          })}</script>
        </section>
        {/* Pairs Well With Section */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-primary mb-2">Pairs Well With</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {pairsWellWith.map(rel => (
              <Link to={`/menu/${rel.slug}`} key={rel.slug} className="flex flex-col items-center w-36 bg-offwhite rounded-lg shadow hover:shadow-lg transition p-2 group focus:outline-none focus:ring-2 focus:ring-istanbulRed">
                <img src={rel.img} alt={`${rel.name} ${rel.categories && rel.categories[0] ? rel.categories[0] : ''} Las Vegas`} className="w-full h-20 object-cover rounded mb-2 group-hover:scale-105 transition-transform" loading="lazy" />
                <span className="text-center text-sm font-semibold text-primary group-hover:text-istanbulRed">{rel.name}</span>
              </Link>
            ))}
          </div>
        </section>
      </div>
      {/* You may also like section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-primary mb-6 text-center">You may also like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedItems.map((rel) => (
            <Link key={rel.slug} to={`/menu/${rel.slug}`} className="block group bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 text-center">
              <img src={rel.img || rel.image || '/default-cover.jpg'} alt={rel.name} className="w-full h-40 object-cover rounded mb-4 transition-transform group-hover:scale-105" />
              <div className="text-lg font-semibold mb-1 group-hover:text-primary">{rel.name}</div>
              <div className="text-istanbulRed font-bold text-md mb-2">${rel.price}</div>
              <div className="text-sm text-gray-600 line-clamp-2">{rel.desc || rel.description}</div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
