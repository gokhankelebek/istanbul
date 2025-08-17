import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useParams, Link } from "react-router-dom";
import menu from "../data/menu.json";

export default function MenuItem() {
  const { slug } = useParams();
  const item = menu.find((i) => i.slug === slug);
  if (!item) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h1 className="text-3xl font-bold mb-4 text-istanbulRed">
          Menu Item Not Found
        </h1>
        <Link to="/menu" className="btn btn-primary">
          ← Back to Menu
        </Link>
      </div>
    );
  }
  // SEO Meta Tags
  const itemTitle = `${item.name} | Istanbul Mediterranean Halal`;
  const itemDesc =
    item.desc ||
    item.description ||
    "Order authentic Mediterranean food in Las Vegas.";
  const itemImg = item.img || item.image || "/default-cover.jpg";
  const canonicalUrl =
    typeof window !== "undefined" ? window.location.href : "";
  // SEO keyword expansion
  const keywordSynonyms = [
    item.name,
    ...(item.synonyms || []),
    ...(item.ingredients || []),
    "halal",
    "Mediterranean",
    "Turkish",
    "Greek",
    "Middle Eastern",
    "Las Vegas",
    "delivery",
    "order online",
    "authentic",
    "healthy",
    "best",
    ...(item.categories || []),
    `best ${item.name} in Las Vegas`,
    `order ${item.name} Las Vegas`,
    `halal ${item.name} Las Vegas`,
    `Mediterranean ${item.name} Las Vegas`,
  ];
  const keywords = Array.from(new Set(keywordSynonyms)).join(", ");

  // Structured data for rich results (without price)
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: item.name,
    image: itemImg,
    description: itemDesc,
    url: canonicalUrl,
  };

  // Simple analytics
  useEffect(() => {
    try {
      window?.gtag &&
        window.gtag("event", "view_menu_item", {
          item_slug: slug,
          item_name: item.name,
        });
    } catch {}
  }, [slug, item?.name]);

  function handleOrderClick() {
    try {
      window?.gtag &&
        window.gtag("event", "click_order_cta", {
          item_slug: slug,
          item_name: item.name,
        });
    } catch {}
  }

  // Intelligent 'Pairs Well With' logic
  function getPairsWellWith(item) {
    const lowerName = item.name.toLowerCase();
    if (
      lowerName.includes("chikofte") ||
      lowerName.includes("falafel") ||
      lowerName.includes("veggie")
    ) {
      return menu
        .filter(
          (i) =>
            i.slug !== item.slug &&
            [
              "hummus",
              "stuffed-grape-leaves-(4-pieces)",
              "french-fries",
              "falafel-side",
              "veggie-bowl",
              "yogurt-drink-(ayran)",
              "salad-bowls",
              "sides",
            ].some(
              (key) =>
                (i.slug || "").includes(key) ||
                (i.categories || []).includes(key)
            )
        )
        .slice(0, 2);
    }
    if (
      lowerName.includes("baklava") ||
      lowerName.includes("dessert") ||
      (item.categories && item.categories.includes("desserts"))
    ) {
      return menu
        .filter(
          (i) =>
            i.slug !== item.slug &&
            ["turkish-coffee", "tea", "coffee", "drinks"].some(
              (key) =>
                (i.slug || "").includes(key) ||
                (i.categories || []).includes(key)
            )
        )
        .slice(0, 2);
    }
    if (lowerName.includes("chicken")) {
      return menu
        .filter(
          (i) =>
            i.slug !== item.slug &&
            [
              "french-fries",
              "salad-bowls",
              "hummus",
              "yogurt-drink-(ayran)",
              "baklava",
              "sides",
              "desserts",
            ].some(
              (key) =>
                (i.slug || "").includes(key) ||
                (i.categories || []).includes(key)
            )
        )
        .slice(0, 2);
    }
    if (
      lowerName.includes("beef") ||
      lowerName.includes("lamb") ||
      lowerName.includes("doner") ||
      lowerName.includes("shawarma") ||
      lowerName.includes("mixed")
    ) {
      return menu
        .filter(
          (i) =>
            i.slug !== item.slug &&
            [
              "french-fries",
              "salad-bowls",
              "hummus",
              "yogurt-drink-(ayran)",
              "baklava",
              "sides",
              "desserts",
            ].some(
              (key) =>
                (i.slug || "").includes(key) ||
                (i.categories || []).includes(key)
            )
        )
        .slice(0, 2);
    }
    if ((item.categories || []).includes("drinks")) {
      return menu.filter((i) => i.slug !== item.slug).slice(0, 2);
    }
    return menu.filter((i) => i.slug !== item.slug).slice(0, 2);
  }
  const pairsWellWith = getPairsWellWith(item);

  // Find related items (same category, not current, up to 3)
  const related = menu.filter(
    (i) =>
      i.slug !== item.slug &&
      i.categories &&
      item.categories &&
      i.categories.some((cat) => item.categories.includes(cat))
  );
  const relatedItems = (
    related.length > 0 ? related : menu.filter((i) => i.slug !== item.slug)
  ).slice(0, 3);

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
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <Link
          to="/menu"
          className="text-istanbulRed hover:underline mb-6 inline-flex items-center gap-2 text-lg"
        >
          <span>←</span> Back to Menu
        </Link>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={itemImg}
                alt={`Halal ${item.name} ${
                  item.categories && item.categories[0]
                    ? item.categories[0]
                    : ""
                } Las Vegas`}
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.target.src = "/menu/placeholder.jpg";
                  e.target.onerror = null;
                }}
              />
            </div>
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col">
              <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-primary mb-4">
                  {item.name}
                </h1>
                {item.description && (
                  <p className="text-lg text-charcoal max-w-2xl mx-auto">
                    {item.description}
                  </p>
                )}
              </div>
              <a
                href={
                  item.url ||
                  `https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary w-full text-center text-lg"
                onClick={handleOrderClick}
              >
                Order Online
              </a>
            </div>
          </div>
        </div>

        {/* Why Our [Item Name]? */}
        <section className="mt-8 md:mt-10 mb-6 md:mb-8 px-4 md:px-0">
          <h2 className="text-xl md:text-2xl font-bold text-primary mb-3">
            Why Our {item.name}?
          </h2>
          {item.slug.startsWith("chikofte") ? (
            <p className="text-gray-700 text-lg">
              Looking for the best vegan {item.name} in Las Vegas? Our{" "}
              {item.name.toLowerCase()} is 100% plant-based, made fresh daily
              with premium ingredients and authentic Mediterranean spices. Enjoy
              a delicious, healthy, and cruelty-free option—perfect for vegans,
              vegetarians, and anyone seeking a flavorful, nutritious meal!
            </p>
          ) : (
            <p className="text-gray-700 text-base md:text-lg leading-relaxed">
              Looking for the best {item.name} in Las Vegas? Our{" "}
              {item.name.toLowerCase()} is made fresh daily with premium,
              halal-certified ingredients. Enjoy authentic Mediterranean
              flavors, generous portions, and a perfect blend of spices—served
              fast for dine-in, takeout, or delivery. Whether you crave a
              healthy meal or a hearty treat, our {item.name.toLowerCase()} is
              the top choice for Mediterranean food lovers in Las Vegas.
            </p>
          )}
        </section>
        {/* FAQ Section */}
        <section className="mb-6 md:mb-8 px-4 md:px-0">
          <h2 className="text-lg md:text-xl font-bold text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            <details className="bg-herb/5 rounded-lg p-4 border border-herb/20 group">
              <summary className="font-semibold cursor-pointer text-primary text-sm md:text-base group-open:mb-3">
                {item.slug.startsWith("chikofte")
                  ? `Is your ${item.name.toLowerCase()} vegan?`
                  : `Is your ${item.name.toLowerCase()} halal?`}
              </summary>
              <div className="text-sm md:text-base text-gray-700 leading-relaxed">
                {item.slug.startsWith("chikofte")
                  ? `Yes! Our ${item.name.toLowerCase()} is 100% vegan and made entirely from plant-based ingredients.`
                  : `Yes! All our menu items, including ${item.name.toLowerCase()}, are 100% halal and prepared according to Islamic dietary laws.`}
              </div>
            </details>
            <details className="bg-herb/5 rounded-lg p-4 border border-herb/20 group">
              <summary className="font-semibold cursor-pointer text-primary text-sm md:text-base group-open:mb-3">
                Do you offer delivery for {item.name.toLowerCase()} in Las
                Vegas?
              </summary>
              <div className="text-sm md:text-base text-gray-700 leading-relaxed">
                Absolutely! You can order {item.name.toLowerCase()} online for
                fast delivery anywhere in Las Vegas via{" "}
                <a
                  href="https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv"
                  className="text-istanbulRed underline hover:text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.orderdoner.com
                </a>
                .
              </div>
            </details>
            <details className="bg-herb/5 rounded-lg p-4 border border-herb/20 group">
              <summary className="font-semibold cursor-pointer text-primary text-sm md:text-base group-open:mb-3">
                What makes your {item.name.toLowerCase()} authentic?
              </summary>
              <div className="text-sm md:text-base text-gray-700 leading-relaxed">
                {item.slug.startsWith("chikofte")
                  ? `Our ${item.name.toLowerCase()} is crafted using traditional Mediterranean recipes, fresh herbs, and high-quality plant-based ingredients for a truly authentic and delicious vegan experience.`
                  : `Our ${item.name.toLowerCase()} uses traditional Mediterranean recipes, fresh herbs, and halal meats—prepared by experienced chefs for true flavor.`}
              </div>
            </details>
          </div>
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                item.slug.startsWith("chikofte")
                  ? {
                      "@type": "Question",
                      name: `Is your ${item.name.toLowerCase()} vegan?`,
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: `Yes! Our ${item.name.toLowerCase()} is 100% vegan and made entirely from plant-based ingredients.`,
                      },
                    }
                  : {
                      "@type": "Question",
                      name: `Is your ${item.name.toLowerCase()} halal?`,
                      acceptedAnswer: {
                        "@type": "Answer",
                        text: `Yes! All our menu items, including ${item.name.toLowerCase()}, are 100% halal and prepared according to Islamic dietary laws.`,
                      },
                    },
                {
                  "@type": "Question",
                  name: `Do you offer delivery for ${item.name.toLowerCase()} in Las Vegas?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: `Absolutely! You can order ${item.name.toLowerCase()} online for fast delivery anywhere in Las Vegas via www.orderdoner.com.`,
                  },
                },
                {
                  "@type": "Question",
                  name: `What makes your ${item.name.toLowerCase()} authentic?`,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: item.slug.startsWith("chikofte")
                      ? `Our ${item.name.toLowerCase()} is crafted using traditional Mediterranean recipes, fresh herbs, and high-quality plant-based ingredients for a truly authentic and delicious vegan experience.`
                      : `Our ${item.name.toLowerCase()} uses traditional Mediterranean recipes, fresh herbs, and halal meats—prepared by experienced chefs for true flavor.`,
                  },
                },
              ],
            })}
          </script>
        </section>
        {/* Pairs Well With Section */}
        <section className="mb-8">
          <h2 className="text-xl font-bold text-primary mb-2">
            Pairs Well With
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {pairsWellWith.map((rel) => (
              <Link
                to={`/menu/${rel.slug}`}
                key={rel.slug}
                className="flex flex-col items-center w-36 bg-offwhite rounded-lg shadow hover:shadow-lg transition p-2 group focus:outline-none focus:ring-2 focus:ring-istanbulRed"
              >
                <img
                  src={rel.img || rel.image || "/default-cover.jpg"}
                  alt={`${rel.name} ${
                    rel.categories && rel.categories[0] ? rel.categories[0] : ""
                  } Las Vegas`}
                  className="w-full h-20 object-cover rounded mb-2 group-hover:scale-105 transition-transform"
                  loading="lazy"
                />
                <span className="text-center text-sm font-semibold text-primary group-hover:text-istanbulRed">
                  {rel.name}
                </span>
              </Link>
            ))}
          </div>
        </section>
        {/* You may also like section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">
            You may also like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedItems.map((rel) => (
              <Link
                key={rel.slug}
                to={`/menu/${rel.slug}`}
                className="block group bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 text-center"
              >
                <img
                  src={rel.img || rel.image || "/default-cover.jpg"}
                  alt={rel.name}
                  className="w-full h-40 object-cover rounded mb-4 transition-transform group-hover:scale-105"
                  loading="lazy"
                />
                <div className="text-center">
                  <h3 className="font-semibold text-lg mb-2">{rel.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    {rel.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
