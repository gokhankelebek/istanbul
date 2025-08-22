import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { getMenuItemTranslation, getDescriptionTranslation } from '../utils/menuTranslations';
import useTranslation from '../hooks/useTranslation';
import { motion } from 'framer-motion';

export default function MenuCard({ slug, img, name, desc, categories, url }) {
  const { language } = useLanguage();
  const t = useTranslation();
  const [isHovered, setIsHovered] = useState(false);
  
  // Translate menu item name and description
  const translatedName = getMenuItemTranslation(name, language);
  const translatedDesc = desc ? getDescriptionTranslation(desc, language, slug.includes('doner') ? 'doner' : slug.includes('falafel') ? 'falafel' : '') : '';
  
  return (
    <Link to={`/menu/${slug}`} className="block">
      <motion.div
        className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-300 hover:scale-105"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ y: -5 }}
      >
        <div className="relative overflow-hidden">
          <img
            src={img}
            alt={name}
            className="w-full h-48 object-cover transition-transform duration-300"
            style={{
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            }}
            onError={(e) => {
              e.target.src = '/menu/placeholder.jpg';
            }}
          />
        </div>
        
        <div className="p-4">
          <h3 className="text-xl font-bold text-charcoal mb-2 line-clamp-2">{name}</h3>
          
          {desc && (
            <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">{desc}</p>
          )}
          
          {categories && (
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-saffron/20 text-saffron text-xs rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
          
          <div className="flex justify-between items-center">
            <span className="text-istanbulRed font-semibold text-base hover:text-primary transition-colors">View Details</span>
            <motion.div
              className="text-istanbulRed text-xl"
              animate={{ x: isHovered ? 5 : 0 }}
            >
              →
            </motion.div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
