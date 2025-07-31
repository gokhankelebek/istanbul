import React, { useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Helmet } from "react-helmet";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FooterAwareOrderOnlineButton from "./FooterAwareOrderOnlineButton";
import EnhancedSEODashboard from "./components/EnhancedSEODashboard";
import HreflangTags from "./components/HreflangTags";
import LanguageSwitcher from "./components/LanguageSwitcher";
import SchemaMarkupTester from "./components/SchemaMarkupTester";
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useEffect, Suspense } from 'react';
import NavBar from './components/NavBar';
import Chatbot from './components/Chatbot';

// Lazy load all page components for better performance
const YelpLandingPage = React.lazy(() => import('./pages/yelp'));
const GoogleLanding = React.lazy(() => import('./pages/GoogleLanding'));
const BlogPosts = React.lazy(() => import('./pages/BlogPosts'));
const Experience = React.lazy(() => import('./pages/Experience'));
const MediterraneanRestaurant = React.lazy(() => import('./pages/MediterraneanRestaurant'));
const NearMeHalalFood = React.lazy(() => import('./pages/NearMeHalalFood'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const Contact = React.lazy(() => import('./pages/Contact'));
const MenuItem = React.lazy(() => import('./pages/MenuItem'));
const Menu = React.lazy(() => import('./pages/Menu'));
const Home = React.lazy(() => import('./pages/Home'));
const Halal = React.lazy(() => import('./pages/Halal'));
const MarkdownPage = React.lazy(() => import('./pages/MarkdownPage'));
const FAQIndex = React.lazy(() => import('./pages/FAQ/index'));
const FAQSlug = React.lazy(() => import('./pages/FAQ/[slug]'));
const Delivery = React.lazy(() => import('./pages/Delivery'));
const TurkishFood = React.lazy(() => import('./pages/TurkishFood'));
const ShawarmaPage = React.lazy(() => import('./pages/Shawarma'));
const BestMediterraneanFoodNearCaesarsPalace = React.lazy(() => import('./pages/best-mediterranean-food-near-caesars-palace-las-vegas'));
const WhereToEatNearTheSphere = React.lazy(() => import('./pages/where-to-eat-near-the-sphere-las-vegas'));
const BlogEditor = React.lazy(() => import('./pages/BlogEditor'));
const Careers = React.lazy(() => import('./pages/Careers'));
import "./index.css";
import { getMenuItemOrderUrl } from './utils/config';

const categorizedMenu = {
  "Turkish Pita": [
    { name: "Beef&Lamb Döner (Shawarma) Turkish Pita", slug: "beefandlamb-doner-(shawarma)-turkish-pita", img: "/menu/Turkish Pita/Beef&Lamb-Döner (Shawarma-Turkish-Pita.png", price: "$16.68", url: "https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv#9" },
    { name: "Chicken Döner (Shawarma) Turkish Pita", slug: "chicken-doner-(shawarma)-turkish-pita", img: "/menu/Turkish Pita/Chicken-Döner (Shawarma)-Turkish-Pita.png", price: "$16.68", url: "https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv#9" },
    { name: "Mixed Döner (Beef&Lamb and Chicken Shawarma) Turkish Pita", slug: "mixed-doner-(beefandlamb-and-chicken-shawarma)-turkish-pita", img: "/menu/Turkish Pita/Mixed-Döner-(Beef&Lamb and-Chicken-Shawarma) Turkish-Pita.png", price: "$17.68", url: "https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv#9" },
    { name: "Falafel Turkish Pita", slug: "falafel-turkish-pita", img: "/menu/Turkish Pita/Falafel-Turkish-Pita.png", price: "$16.68", url: "https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv#9" },
  ],
  "Lavash Wraps": [
    { name: "Beef&Lamb Döner (Shawarma) Lavash Wrap", slug: "beef_and_lamb_doner_wrap", img: "/menu/Wrap/Beef&Lamb-Döner-(Shawarma-Lavash-Wrap.png", price: "$15.95", url: "https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv#6" },
    { name: "Chicken Döner (Shawarma) Lavash Wrap", slug: "chicken-doner-wrap", img: "/menu/Wrap/Chicken-Döner-(Shawarma)-Lavash-Wrap.png", price: "$15.95", url: "https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv#6" },
    { name: "Mixed Döner (Beef&Lamb and Chicken Shawarma) Lavash Wrap", slug: "mixed-doner-(beefandlamb-and-chicken-shawarma)-lavash-wrap", img: "/menu/Wrap/Mixed-Döner-(Beef&Lamb-and-Chicken-Shawarma)-Lavash-Wrap.png", price: "$16.95", url: "https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv#6" },
    { name: "Falafel Lavash Wrap", slug: "falafel-lavash-wrap", img: "/menu/Wrap/Falafel-Lavash-Wrap.png", price: "$15.95", url: "https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv#6" },
  ],
  "Pita Sandwiches": [
    { name: "Beef&Lamb Döner (Shawarma) Pita", slug: "beef_and_lamb_doner_pita", img: "/menu/Pita/Beef&Lamb-Döner-(Shawarma)-Pita.png", price: "$15.95", url: "https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv#2" },
    { name: "Chicken Döner (Shawarma) Pita", slug: "chicken_pita_doner", img: "/menu/Pita/Chicken-Döner-(Shawarma)-Pita.png", price: "$15.95", url: "https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv#2" },
    { name: "Mixed Döner (Beef&Lamb and Chicken Shawarma) Pita", slug: "mix-doner-pita", img: "/menu/Pita/Mixed-Döner-(Beef&Lamb-and-Chicken-Shawarma)-Pita.png", price: "$16.95", url: "https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv#2" },
    { name: "Falafel Pita", slug: "falafel-pita", img: "/menu/Pita/Falafel-Pita.png", price: "$15.95", url: "https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv#2" },
  ],
  "Rice Bowls": [
    { name: "Beef&Lamb Döner (Shawarma) Rice Bowl", slug: "beef_n_lamb_doner_rice_bowl", img: "/menu/Rice Bowl/Beef&Lamb-Dõner-(Shawarma)-Rice-Bowl.png", price: "$20.95", url: "https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv#5" },
    { name: "Chicken Döner (Shawarma) Rice Bowl", slug: "chicken_doner_rice_bowl", img: "/menu/Rice Bowl/Chicken-Döner-(Shawarma)-Rice-Bowl.png", price: "$20.95", url: "https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv#5" },
    { name: "Mixed Döner (Beef&Lamb and Chicken Shawarma) Rice Bowl", slug: "mix-doner-rice-bowl", img: "/menu/Rice Bowl/Mixed-Döner-(Beef&Lamb-and-Chicken-Shawarma)-Rice-Bowl.png", price: "$21.95", url: "https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv#5" },
    { name: "Falafel Rice Bowl", slug: "falafel-rice-bowl", img: "/menu/Rice Bowl/Falafel-Rice-Bowl.png", price: "$20.95", url: "https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv#5" },
  ],
  "French Fries Bowls": [
    { name: "Beef&Lamb Döner (Shawarma) French Fries Bowl", slug: "beef_and_lamb_french_fries_bowl", img: "/menu/Fries Bowl/Beef&Lamb-Döner-(Shawarma)-French-Fries-Bowl.png", price: "$20.95", url: "https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv#7" },
    { name: "Chicken Döner (Shawarma) French Fries Bowl", slug: "chicken_doner_french_fries_bowl", img: "/menu/Fries Bowl/Chicken-Döner-Shawarma)-French-Fries-Bowl.png", price: "$20.95", url: "https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv#7" },
    { name: "Mixed Döner (Beef&Lamb and Chicken Shawarma) French Fries Bowl", slug: "mix-doner-french-fries-bowl", img: "/menu/Fries Bowl/Mixed-Döner-(Beef&Lamb-and-Chicken-Shawarma)-French-Fries-Bowl.png", price: "$21.95", url: "https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv#7" },
    { name: "Falafel French Fries Bowl", slug: "falafel-french-fries-bowl", img: "/menu/Fries Bowl/Falafel-French-Fries-Bowl.png", price: "$20.95", url: "https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv#7" },
  ],
  "Salad Bowls": [
    { name: "Beef&Lamb Döner (Shawarma) Salad Bowl", slug: "beefandlamb-doner-(shawarma)-salad-bowl", img: "/menu/Salad Bowl/Beef&Lamb-Döner-(Shawarma)-Salad-Bowl.png", price: "$20.95", url: "https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv#BVBECEXIUUB7HE2S7NSD8Q6O" },
    { name: "Falafel Salad Bowl", slug: "falafel-salad-bowl", img: "/menu/Salad Bowl/Falafel-Salad-Bowl.png", price: "$20.95", url: "https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv#BVBECEXIUUB7HE2S7NSD8Q6O" },
    { name: "Veggie Bowl", slug: "veggie-bowl", img: "/menu/Salad Bowl/Veggie-Bowl.png", price: "$9.95", url: "https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv#BVBECEXIUUB7HE2S7NSD8Q6O" },
  ],
  "Sides": [
    { name: "Side Rice", slug: "side-rice", img: "/menu/Sides/Side-Rice.png", price: "$5.00", url: "https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv#3" },
    { name: "French Fries", slug: "french-fries", img: "/menu/Sides/French-Fries.png", price: "$5.95", url: "https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv#3" },
    { name: "Mozzarella Sticks (5 Pieces)", slug: "mozzarella-sticks-(5-pieces)", img: "/menu/Sides/Mozzarella-Sticks.png", price: "$5.95", url: "https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv#3" },
    { name: "Onion Rings", slug: "onion-rings", img: "/menu/Sides/Onion-Rings.png", price: "$5.95", url: "https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv#3" },
    { name: "Tzatziki Dip", slug: "tzatziki-dip", img: "/menu/Sides/Tzatziki-Dip.png", price: "$6.95", url: "https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv#3" },
    { name: "Stuffed Grape Leaves (4 Pieces)", slug: "stuffed-grape-leaves-(4-pieces)", img: "/menu/Sides/Stuffed-Grape-Leaves.png", price: "$5.95", url: "https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv#3" },
    { name: "Falafel Side (4 Pieces)", slug: "falafel-side-(4-pieces)", img: "/menu/Sides/Falafel-Side.png", price: "$5.95", url: "https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv#3" },
    { name: "Hummus", slug: "hummus", img: "/menu/Sides/Hummus.png", price: "$5.95", url: "https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv#3" },
    { name: "Extra Pita", slug: "pita", img: "/menu/Sides/Extra-Pita.png", price: "$1.00", url: "https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv#3" },
    { name: "Side Beef&Lamb Döner (Shawarma)", img: "/menu/Sides/Side-Beef&Lamb-Döner-(Shawarma).png", price: "$10.00", url: "https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv#3" },
    { name: "Side Chicken Döner (Shawarma)", img: "/menu/Sides/Side-Chicken-Döner-(Shawarma).png", price: "$10.00", url: "https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv#3" },
    { name: "Side Mixed (Beef&Lamb and Chicken) Döner (Shawarma)", img: "/menu/Sides/Side-Mixed-(Beef&Lamb-and-Chicken) Döner-(Shawarma).png", price: "$10.00", url: "https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv#3" },
    { name: "Side Sauce", img: "/menu/Sides/Side-Sauce.png", price: "$1.00", url: "https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv#3" },
  ],
};

// ...the rest of your code...

const combos = [
  { name: "Family Feast", img: "/combos/family.jpg", price: "$42", desc: "4 wraps + baklava + drinks" },
  { name: "Lunch Duo", img: "/combos/duo.jpg", price: "$22", desc: "2 plates + drinks" },
  { name: "Veggie Combo", img: "/combos/veggie.jpg", price: "$18", desc: "Falafel + salad + drink" },
];
const reviews = [
  "Best doner in Vegas! Fresh and authentic.",
  "The wraps are out of this world!",
  "Family-run, super friendly, and delicious.",
];
function Section({ id, children }) {
  const ref = useRef();
  const inView = useInView(ref, { once: true });
  return (
    <motion.section
      id={id}
      ref={ref}
      className="section"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.section>
  );
}
function ScrollRestoration() {
  const { key } = useLocation();
  useEffect(() => {
    window.scrollTo(0, Number(sessionStorage.getItem(key)) || 0);
    return () => {
      sessionStorage.setItem(key, window.scrollY);
    };
  }, [key]);
  return null;
}

export default function App() {
  const menuRef = useRef();
  // Parallax
  React.useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("hero-bg");
      if(hero) hero.style.transform = `translateY(${window.scrollY * -0.15}px)`;
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NJLK8BB"
                height="0" width="0" style={{display:'none',visibility:'hidden'}}></iframe>
      </noscript>
      {/* End Google Tag Manager (noscript) */}
      <Helmet>
        <title>Best Doner in Vegas | Istanbul Mediterranean Halal</title>
        {/* Google Tag Manager */}
        <script>
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NJLK8BB');`}
        </script>
        {/* End Google Tag Manager */}
        <meta name="description" content="Authentic Turkish doner wraps, plates, and more. Family recipe, Istanbul roots—crafted fresh in Las Vegas." />
        <link rel="icon" href="/favicon-32x32.png" />
        <link rel="canonical" href="https://www.istanbullv.com/" />
      </Helmet>
      {/* Add hreflang tags for international SEO */}
      <HreflangTags />
      <NavBar>
        {/* Add language switcher in the NavBar */}
        <div className="ml-4">
          <LanguageSwitcher />
        </div>
      </NavBar>
      <ScrollRestoration />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      }>
        <Routes>
        {/* English Routes (Default) */}
        <Route path="/" element={<Home />} />
        <Route path="/yelp" element={<YelpLandingPage />} />
        <Route path="/google" element={<GoogleLanding />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:slug" element={<MenuItem />} />
        <Route path="/blog-posts" element={<BlogPosts />} />
        <Route path="/blog-posts/:slug" element={<BlogPost />} />
        <Route path="/admin/blog-editor" element={<BlogEditor />} />
        <Route path="/test" element={<div>Test Route Works!</div>} />
        <Route path="/halal" element={<Halal />} />
        <Route path="/faq" element={<FAQIndex />} />
        <Route path="/faq/:slug" element={<FAQSlug />} />
        <Route path="/about" element={<MarkdownPage />} />
        <Route path="/catering" element={<MarkdownPage />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/mediterranean-restaurant" element={<MediterraneanRestaurant />} />
        <Route path="/near-me/halal-food" element={<NearMeHalalFood />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/shawarma" element={<ShawarmaPage />} />
        <Route path="/turkish-food" element={<TurkishFood />} />
        
        {/* Root-level blog post pages */}
        <Route path="/best-mediterranean-food-near-caesars-palace-las-vegas" element={<BestMediterraneanFoodNearCaesarsPalace />} />
        <Route path="/where-to-eat-near-the-sphere-las-vegas" element={<WhereToEatNearTheSphere />} />
        
        {/* Turkish Routes */}
        <Route path="/tr" element={<Home />} />
        <Route path="/tr/menu" element={<Menu />} />
        <Route path="/tr/menu/:slug" element={<MenuItem />} />
        <Route path="/tr/blog-posts" element={<BlogPosts />} />
        <Route path="/tr/blog-posts/:slug" element={<BlogPost />} />
        <Route path="/tr/helal" element={<Halal />} />
        <Route path="/tr/sss" element={<FAQIndex />} />
        <Route path="/tr/sss/:slug" element={<FAQSlug />} />
        <Route path="/tr/hakkimizda" element={<MarkdownPage />} />
        <Route path="/tr/catering" element={<MarkdownPage />} />
        <Route path="/tr/deneyim" element={<Experience />} />
        <Route path="/tr/iletisim" element={<Contact />} />
        <Route path="/tr/akdeniz-restoran" element={<MediterraneanRestaurant />} />
        <Route path="/tr/yakinimda/helal-yemek" element={<NearMeHalalFood />} />
        <Route path="/tr/teslimat" element={<Delivery />} />
        <Route path="/tr/savarma" element={<ShawarmaPage />} />
        <Route path="/tr/turk-yemekleri" element={<TurkishFood />} />
        
        {/* Arabic Routes */}
        <Route path="/ar" element={<Home />} />
        <Route path="/ar/menu" element={<Menu />} />
        <Route path="/ar/menu/:slug" element={<MenuItem />} />
        <Route path="/ar/blog-posts" element={<BlogPosts />} />
        <Route path="/ar/blog-posts/:slug" element={<BlogPost />} />
        <Route path="/ar/حلال" element={<Halal />} />
        <Route path="/ar/الأسئلة-الشائعة" element={<FAQIndex />} />
        <Route path="/ar/الأسئلة-الشائعة/:slug" element={<FAQSlug />} />
        <Route path="/ar/عن-المطعم" element={<MarkdownPage />} />
        <Route path="/ar/تموين" element={<MarkdownPage />} />
        <Route path="/ar/تجربة" element={<Experience />} />
        <Route path="/ar/اتصل-بنا" element={<Contact />} />
        <Route path="/ar/مطعم-متوسطي" element={<MediterraneanRestaurant />} />
        <Route path="/ar/بالقرب-مني/طعام-حلال" element={<NearMeHalalFood />} />
        <Route path="/ar/توصيل" element={<Delivery />} />
        <Route path="/ar/شاورما" element={<ShawarmaPage />} />
        <Route path="/ar/الطعام-التركي" element={<TurkishFood />} />
        
        {/* Spanish Routes */}
        <Route path="/es" element={<Home />} />
        <Route path="/es/menu" element={<Menu />} />
        <Route path="/es/menu/:slug" element={<MenuItem />} />
        <Route path="/es/blog-posts" element={<BlogPosts />} />
        <Route path="/es/blog-posts/:slug" element={<BlogPost />} />
        <Route path="/es/halal" element={<Halal />} />
        <Route path="/es/preguntas-frecuentes" element={<FAQIndex />} />
        <Route path="/es/preguntas-frecuentes/:slug" element={<FAQSlug />} />
        <Route path="/es/sobre-nosotros" element={<MarkdownPage />} />
        <Route path="/es/catering" element={<MarkdownPage />} />
        <Route path="/es/experiencia" element={<Experience />} />
        <Route path="/es/contacto" element={<Contact />} />
        <Route path="/es/restaurante-mediterraneo" element={<MediterraneanRestaurant />} />
        <Route path="/es/cerca-de-mi/comida-halal" element={<NearMeHalalFood />} />
        <Route path="/es/entrega" element={<Delivery />} />
        <Route path="/es/shawarma" element={<ShawarmaPage />} />
        <Route path="/es/comida-turca" element={<TurkishFood />} />
        </Routes>
      </Suspense>
      {/* Footer */}
      <Footer />
      {/* Chatbot */}
      <Chatbot />
      
      {/* Enhanced SEO Dashboard - only visible in development mode or for admin users */}
      <EnhancedSEODashboard />
      
      {/* Schema Markup Tester - only visible in development mode */}
      <SchemaMarkupTester />

    </>
  );
}
