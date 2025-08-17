import React from "react";
import { Link } from "react-router-dom";
import faq from "../../data/faq.json";
import SEOHead from "../../components/SEOHead";
import StructuredDataManager from "../../components/StructuredDataManager";

export default function FAQIndex() {
  // Generate FAQPage structured data
  const faqPageData = {
    name: "Frequently Asked Questions",
    description:
      "Find answers to common questions about Istanbul Mediterranean restaurant, our Turkish and Mediterranean cuisine, halal options, and services in Las Vegas.",
    url: "https://www.istanbullv.com/faq",
    mainEntity: faq.map((q) => ({
      "@type": "Question",
      name: q.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: q.answer,
      },
    })),
  };

  // Generate BreadcrumbList data
  const breadcrumbData = {
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.istanbullv.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "FAQ",
        item: "https://www.istanbullv.com/faq",
      },
    ],
  };

  // Aggregate all schema types for the FAQ page
  const aggregateSchemaData = [
    { type: "faq", data: faqPageData },
    { type: "breadcrumb", data: breadcrumbData },
  ];

  return (
    <>
      <SEOHead
        title="FAQ | Istanbul Mediterranean Restaurant Las Vegas"
        description="Find answers to frequently asked questions about Istanbul Mediterranean restaurant, our Turkish cuisine, halal options, delivery, and services in Las Vegas."
        keywords="faq istanbul mediterranean, turkish restaurant faq, mediterranean food questions, halal restaurant faq, restaurant delivery las vegas"
        canonicalUrl="https://www.istanbullv.com/faq"
        ogType="website"
        ogImage="https://www.istanbullv.com/faq-hero.jpg"
      />
      <StructuredDataManager type="aggregate" data={aggregateSchemaData} />

      <div className="container mx-auto py-16">
        <h1 className="text-4xl font-extrabold text-primary mb-8">
          Frequently Asked Questions
        </h1>
        <ul className="space-y-4">
          {faq.map((q) => (
            <li key={q.slug}>
              <Link
                to={`/faq/${q.slug}`}
                className="text-istanbulRed text-xl hover:underline font-semibold"
              >
                {q.question}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
