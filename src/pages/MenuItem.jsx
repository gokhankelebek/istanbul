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
  const itemTitle = `${item.name} | Istanbul Mediterranean`;
  const itemDesc = item.desc || item.description || 'Order authentic Mediterranean food in Las Vegas.';
  const itemImg = item.img || item.image || '/default-cover.jpg';
  const canonicalUrl = typeof window !== 'undefined' ? window.location.href : '';
  const keywords = [item.name, 'Mediterranean', 'Las Vegas', 'halal', ...(item.categories || [])].join(', ');

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
          <img src={itemImg} alt={item.name} className="w-full max-w-md h-64 object-cover rounded-xl mb-6" />
          <h1 className="text-3xl font-bold mb-2 text-center">{item.name}</h1>
          <div className="text-istanbulRed font-bold text-2xl mb-2">${item.price}</div>
          <div className="text-gray-700 mb-4 text-center">{itemDesc}</div>
          <a
            href={item.url || `https://orderdoner.com`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary px-6 py-2 rounded text-lg mt-2"
          >
            Order Online
          </a>
        </div>
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
