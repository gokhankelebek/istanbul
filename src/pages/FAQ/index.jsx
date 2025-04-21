import React from 'react';
import { Link } from 'react-router-dom';
import faq from '../../data/faq.json';

export default function FAQIndex() {
  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-extrabold text-primary mb-8">Frequently Asked Questions</h1>
      <ul className="space-y-4">
        {faq.map(q => (
          <li key={q.slug}>
            <Link to={`/faq/${q.slug}`} className="text-istanbulRed text-xl hover:underline font-semibold">
              {q.question}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
