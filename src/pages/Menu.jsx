import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

import menu from "../data/menu.json";
import MenuCard from "../components/MenuCard";
import "./menu-smooth-scroll.css";
import { useLanguage } from "../contexts/LanguageContext";
import { getCategoryTranslation } from "../utils/menuTranslations";
import useTranslation from "../hooks/useTranslation";
import StructuredDataManager from "../components/StructuredDataManager";

// Hardcoded display order and names to match user's screenshots
const CATEGORY_ORDER = [
  "Turkish Pita",
  "Lavash Wraps",
  "Pita Sandwiches",
  "Rice Bowls",
  "French Fries Bowls",
  "Salad Bowls",
  "Sides",
  "Dessert",
  "Drinks",
];

// Map normalized categories to display names (if needed)
const CATEGORY_DISPLAY = {
  "Turkish Pita": "Turkish Pita",
  "Lavash Wraps": "Lavash Wraps",
  "Pita Sandwiches": "Pita Sandwiches",
  "Rice Bowls": "Rice Bowls",
  "French Fries Bowls": "French Fries Bowls",
  "Salad Bowls": "Salad Bowls",
  Sides: "Sides",
  Dessert: "Dessert",
  Drinks: "Drinks",
};

// Group items by normalized category
function groupByCategoryStrict(items) {
  const grouped = {};
  items.forEach((item) => {
    if (item.categories && item.categories.length > 0) {
      // Check if any of the item's categories match our category order
      for (const cat of CATEGORY_ORDER) {
        if (item.categories.includes(cat)) {
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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [query, setQuery] = useState("");
  const { language } = useLanguage();
  const t = useTranslation();



  // Only show categories with items (and matching search if any)
  function itemsForCategory(cat) {
    const items = groupedMenu[cat] || [];
    if (!query) return items;
    const q = query.toLowerCase();
    return items.filter(
      (i) =>
        (i.name && i.name.toLowerCase().includes(q)) ||
        (i.description && i.description.toLowerCase().includes(q)) ||
        (i.categories && i.categories.some((c) => c.toLowerCase().includes(q)))
    );
  }
  const visibleCategories = CATEGORY_ORDER.filter(
    (cat) => itemsForCategory(cat).length > 0
  );



  // Scroll to section on filter select
  function handleCategoryClick(cat) {
    setSelectedCategory(cat);
    if (cat !== "All") {
      const section = document.getElementById(
        `category-${cat.replace(/\s+/g, "-")}`
      );
      if (section) {
        // Only scroll if not already at the section
        const rect = section.getBoundingClientRect();
        if (Math.abs(rect.top) > 10) {
          section.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    }
  }

  // Structured Data: ItemList for all menu items
  const itemListData = {
    name: "Istanbul Mediterranean Menu",
    description:
      "Explore our authentic Turkish and Mediterranean menu items in Las Vegas.",
    numberOfItems: menu.length,
    itemListElement: menu.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "MenuItem",
        name: item.name,
        url: `https://www.istanbullv.com/menu/${item.slug}`,
        image: item.image,
        description: item.description,
      },
    })),
  };

  const aggregateSchemaData = [{ type: "itemList", data: itemListData }];

  return (
    <>
      <Helmet>
        <title>
          Menu | Istanbul Mediterranean Grill Las Vegas | Order Halal
          Mediterranean Food
        </title>
        <meta
          name="description"
          content="Explore the Istanbul Mediterranean Grill menu—Las Vegas’s best halal-certified Mediterranean restaurant. Order online for authentic Turkish food, doner, shawarma, falafel, and more!"
        />
        <link rel="canonical" href="https://www.istanbullv.com/menu" />
      </Helmet>
      <StructuredDataManager type="aggregate" data={aggregateSchemaData} />

      {/* Search Bar */}
      <div className="bg-offwhite border-b border-saffron/10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search menu (e.g., doner, falafel, salad)"
            className="w-full md:w-1/2 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-istanbulRed"
            aria-label="Search menu items"
          />
        </div>
      </div>

      {/* Modern Category Selector - Scrollable Pills */}
      <div className="sticky top-0 z-10 bg-offwhite/95 backdrop-blur-sm border-b border-saffron/10 shadow-sm">
        <nav
          className="flex overflow-x-auto gap-3 px-4 py-4 scrollbar-hide"
          aria-label="Menu categories"
        >
          <button
            onClick={() => handleCategoryClick("All")}
            className={`px-5 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-150 border ${
              selectedCategory === "All"
                ? "bg-istanbulRed text-white shadow-lg scale-105 border-istanbulRed"
                : "bg-white text-charcoal hover:bg-istanbulRed hover:text-white border-gray-200"
            }`}
            tabIndex={0}
          >
            {t("menu.categories.all")}
          </button>
          {visibleCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryClick(cat)}
              className={`px-5 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-150 border ${
                selectedCategory === cat
                  ? "bg-istanbulRed text-white shadow-lg scale-105 border-istanbulRed"
                  : "bg-white text-charcoal hover:bg-istanbulRed hover:text-white border-gray-200"
              }`}
              tabIndex={0}
            >
              {getCategoryTranslation(
                cat.toLowerCase().replace(/\s+/g, "-"),
                language
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Filtered Menu Items - Sectioned by Category */}
      <div className="container mx-auto px-4 py-8 md:py-12" id="full-menu">
        {(selectedCategory === "All"
          ? visibleCategories
          : [selectedCategory]
        ).map((cat) => {
          const items = itemsForCategory(cat);
          if (!items || items.length === 0) return null;
          return (
            <section
              key={cat}
              id={`category-${cat.replace(/\s+/g, "-")}`}
              className="mb-12 md:mb-16"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-istanbulRed mb-6 md:mb-8 tracking-wide uppercase px-2">
                {getCategoryTranslation(
                  cat.toLowerCase().replace(/\s+/g, "-"),
                  language
                )}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.map((item) => (
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
          );
        })}
      </div>
    </>
  );
}
