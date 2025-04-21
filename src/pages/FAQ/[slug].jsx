import React from 'react';
import { useParams, Link } from 'react-router-dom';
import faq from '../../data/faq.json';

export default function FAQSlug() {
  const { slug } = useParams();
  const entry = faq.find(q => q.slug === slug);
  if (!entry) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h1 className="text-3xl font-bold mb-4 text-istanbulRed">FAQ Not Found</h1>
        <Link to="/faq" className="btn btn-primary">← Back to FAQ</Link>
      </div>
    );
  }
  return (
    <div className="container mx-auto py-16 max-w-2xl">
      <Link to="/faq" className="text-istanbulRed hover:underline mb-4 inline-block">← Back to FAQ</Link>
      <h1 className="text-3xl font-bold mb-6 text-primary">{entry.question}</h1>
      <div className="prose prose-lg max-w-none text-charcoal mb-8" dangerouslySetInnerHTML={{ __html: entry.answer }} />
    </div>
  );
}
