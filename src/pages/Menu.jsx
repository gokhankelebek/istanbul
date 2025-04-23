import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import menu from '../data/menu.json';
import MenuCard from '../components/MenuCard';
import './menu-smooth-scroll.css';

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
      <nav
        className="flex overflow-x-auto gap-3 px-2 py-4 mb-8 bg-white/90 backdrop-blur border-b border-saffron/10 scrollbar-hide shadow-sm"
        aria-label="Menu categories"
      >
        <button
          onClick={() => handleCategoryClick('All')}
          className={`px-5 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-150 border border-saffron/20 focus:outline-none focus:ring-2 focus:ring-istanbulRed/60 ${selectedCategory === 'All' ? 'bg-istanbulRed text-white shadow-lg scale-105' : 'bg-offwhite text-charcoal hover:bg-istanbulRed hover:text-white'}`}
          tabIndex={0}
        >
          All
        </button>
        {filteredCategories.map(cat => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`px-5 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-150 border border-saffron/20 focus:outline-none focus:ring-2 focus:ring-istanbulRed/60 ${selectedCategory === cat ? 'bg-istanbulRed text-white shadow-lg scale-105' : 'bg-offwhite text-charcoal hover:bg-istanbulRed hover:text-white'}`}
            tabIndex={0}
          >
            {CATEGORY_DISPLAY[cat]}
          </button>
        ))}
      </nav>

      {/* Filtered Menu Items - Sectioned by Category */}
      <div className="container mx-auto py-12" id="full-menu">
        {(selectedCategory === 'All' ? filteredCategories : [selectedCategory]).map(cat => (
          <section key={cat} id={`category-${cat.replace(/\s+/g, '-')}`} className="mb-16">
            <h2 className="text-3xl font-bold text-istanbulRed mb-8 tracking-wide uppercase">{CATEGORY_DISPLAY[cat]}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
              {groupedMenu[cat].map(item => (
                <MenuCard
                  key={item.slug}
                  slug={item.slug === 'falafel-lavash-wrap' || item.slug === 'falafel-pita' || item.slug === 'falafel-rice-bowl' || item.slug === 'falafel-salad-bowl' || item.slug === 'falafel-side-(4-pieces)' || item.slug === 'falafel-turkish-pita' ? 'what-is-falafel-what-is-it-made-from-which-cuisine' : item.slug}
                  img={item.img}
                  name={item.name}
                  price={item.price}
                  desc={item.desc}
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