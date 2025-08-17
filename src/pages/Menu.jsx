import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import menu from '../data/menu.json';
import MenuCard from '../components/MenuCard';
import './menu-smooth-scroll.css';
import { useLanguage } from '../contexts/LanguageContext';
import { getCategoryTranslation } from '../utils/menuTranslations';
import useTranslation from '../hooks/useTranslation';

// Hardcoded display order and names to match user's screenshots
const CATEGORY_ORDER = [
  'TURKISH PITA',
  'LAVASH WRAPS',
  'PITA SANDWICHES',
  'RICE BOWLS',
  'FRENCH FRIES BOWLS',
  'SALAD BOWLS',
  'SIDES',
  'DESSERT',
  'DRINKS',
];

// Map normalized categories to display names (if needed)
const CATEGORY_DISPLAY = {
  'TURKISH PITA': 'TURKISH PITA',
  'LAVASH WRAPS': 'LAVASH WRAPS',
  'PITA SANDWICHES': 'PITA SANDWICHES',
  'RICE BOWLS': 'RICE BOWLS',
  'FRENCH FRIES BOWLS': 'FRENCH FRIES BOWLS',
  'SALAD BOWLS': 'SALAD BOWLS',
  'SIDES': 'SIDES',
  'DESSERT': 'DESSERT',
  'DRINKS': 'DRINKS',
};

// Group items by normalized category
function groupByCategoryStrict(items) {
  const grouped = {};
  items.forEach(item => {
    if (item.categories && item.categories.length > 0) {
      // Normalize categories by stripping parentheses and trimming
      const normalizedCategories = item.categories.map(cat => cat.replace(/-/g, ' ').replace(/\s*\(.*?\)/g, '').replace(/>.*$/, '').trim().toUpperCase());
      for (const cat of CATEGORY_ORDER) {
        if (normalizedCategories.some(nc => nc === cat)) {
          if (!grouped[cat]) grouped[cat] = [];
          grouped[cat].push(item);
          return;
        }
      }
    }
  });
  return grouped;
}

const groupedMenu = groupByCategoryStrict(menu);

export default function Menu() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { language } = useLanguage();
  const t = useTranslation();

  // Only show categories with items
  const filteredCategories = CATEGORY_ORDER.filter(cat => groupedMenu[cat] && groupedMenu[cat].length > 0);

  // Scroll to section on filter select
  function handleCategoryClick(cat) {
    setSelectedCategory(cat);
    if (cat !== 'All') {
      const section = document.getElementById(`category-${cat.replace(/\s+/g, '-')}`);
      if (section) {
        // Only scroll if not already at the section
        const rect = section.getBoundingClientRect();
        if (Math.abs(rect.top) > 10) {
          section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Menu | Istanbul Mediterranean Grill Las Vegas | Order Halal Mediterranean Food</title>
        <meta
          name="description"
          content="Explore the Istanbul Mediterranean Grill menu—Las Vegas’s best halal-certified Mediterranean restaurant. Order online for authentic Turkish food, doner, shawarma, falafel, and more!"
        />
        <link rel="canonical" href="https://www.istanbullv.com/menu" />
      </Helmet>

      {/* Modern Category Selector - Scrollable Pills */}
      <div className="sticky top-0 z-10 bg-offwhite/95 backdrop-blur-sm border-b border-saffron/10 shadow-sm">
        <nav
          className="flex overflow-x-auto gap-3 px-4 py-4 scrollbar-hide"
          aria-label="Menu categories"
        >
          <button
            onClick={() => handleCategoryClick('All')}
            className={`px-5 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-150 border ${
              selectedCategory === 'All' 
                ? 'bg-istanbulRed text-white shadow-lg scale-105 border-istanbulRed' 
                : 'bg-white text-charcoal hover:bg-istanbulRed hover:text-white border-gray-200'
            }`}
            tabIndex={0}
          >
            {t('menu.categories.all')}
          </button>
          {filteredCategories.map(cat => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-5 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-150 border ${
                selectedCategory === cat 
                  ? 'bg-istanbulRed text-white shadow-lg scale-105 border-istanbulRed' 
                  : 'bg-white text-charcoal hover:bg-istanbulRed hover:text-white border-gray-200'
              }`}
              tabIndex={0}
            >
              {getCategoryTranslation(cat.toLowerCase().replace(/\s+/g, '-'), language)}
            </button>
          ))}
        </nav>
      </div>

      {/* Filtered Menu Items - Sectioned by Category */}
      <div className="container mx-auto px-4 py-8 md:py-12" id="full-menu">
        {(selectedCategory === 'All' ? filteredCategories : [selectedCategory]).map(cat => (
          <section key={cat} id={`category-${cat.replace(/\s+/g, '-')}`} className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-istanbulRed mb-6 md:mb-8 tracking-wide uppercase px-2">{getCategoryTranslation(cat.toLowerCase().replace(/\s+/g, '-'), language)}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {groupedMenu[cat].map(item => (
                <MenuCard
                  key={item.slug}
                  slug={item.slug}
                  img={item.image}
                  name={item.name}
                  desc={item.description}
                  categories={item.categories}
                  url={item.url}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}