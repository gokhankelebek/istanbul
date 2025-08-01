import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getMenuItemTranslation, getDescriptionTranslation } from '../utils/menuTranslations';
import useTranslation from '../hooks/useTranslation';

export default function MenuCard({ slug, img, name, price, desc, categories, url }) {
  const { language } = useLanguage();
  const t = useTranslation();
  
  // Translate menu item name and description
  const translatedName = getMenuItemTranslation(name, language);
  const translatedDesc = desc ? getDescriptionTranslation(desc, language, slug.includes('doner') ? 'doner' : slug.includes('falafel') ? 'falafel' : '') : '';
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col h-full hover:shadow-2xl transition-shadow duration-200 group">
      <Link to={`/menu/${slug}`} className="block">
        <div className="aspect-w-4 aspect-h-3 overflow-hidden">
          <picture>
            <source srcSet={img.replace(/\.(jpg|jpeg|png)$/i, '.webp')} type="image/webp" />
            <img 
              src={img} 
              alt={name} 
              className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300" 
              loading="lazy"
              onError={e => {
                e.target.src = '/menu/placeholder.jpg';
                e.target.onerror = null;
              }} 
            />
          </picture>
        </div>
      </Link>
      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/menu/${slug}`} className="block flex-grow">
          <h3 className="text-lg font-bold mb-2 text-charcoal group-hover:text-primary transition-colors line-clamp-2">{translatedName}</h3>
          {translatedDesc && <p className="text-sm text-gray-600 mb-3 line-clamp-2">{translatedDesc}</p>}
        </Link>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
          <span className="text-primary font-bold text-xl">{price}</span>
          <a 
            href={url || `https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv`} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-primary/90 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            {t('common.orderNow')}
          </a>
        </div>
      </div>
    </div>
  );
}
