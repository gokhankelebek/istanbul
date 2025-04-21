import React from 'react';
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
  return (
    <div className="container mx-auto py-12 max-w-2xl">
      <Link to="/menu" className="text-istanbulRed hover:underline mb-4 inline-block">← Back to Menu</Link>
      <div className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center">
        <img src={item.img || item.image} alt={item.name} className="w-full max-w-md h-64 object-cover rounded-xl mb-6" />
        <h1 className="text-3xl font-bold mb-2 text-center">{item.name}</h1>
        <div className="text-istanbulRed font-bold text-2xl mb-2">${item.price}</div>
        <div className="text-gray-700 mb-4 text-center">{item.desc || item.description}</div>
        
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
  );
}
