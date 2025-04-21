import React from 'react';
import { Link } from 'react-router-dom';

export default function MenuCard({ slug, img, name, price, desc, categories, url }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-4 flex flex-col h-full hover:shadow-2xl transition-shadow duration-200">
      <Link to={`/menu/${slug}`} className="block group">
        <img src={img} alt={name} className="w-full h-72 object-cover rounded-xl mb-4 group-hover:scale-105 transition-transform duration-200 shadow-lg" />
        <h2 className="text-xl font-bold mb-1 text-charcoal group-hover:text-primary">{name}</h2>
      </Link>
      <div className="flex items-center justify-between mb-2">
        <span className="text-primary font-bold text-xl">${price}</span>
        <a href={url || '#'} target="_blank" rel="noopener noreferrer" className="btn btn-primary px-4 py-2 rounded text-sm">Order Online</a>
      </div>
    </div>
  );
}
