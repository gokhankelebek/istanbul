import React, { useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Helmet } from "react-helmet";
import Header from "./components/Header";
import FooterAwareOrderOnlineButton from "./FooterAwareOrderOnlineButton";
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import BlogPosts from './pages/BlogPosts';
import NavBar from './components/NavBar';
import Experience from './pages/Experience';
import MediterraneanRestaurant from './pages/MediterraneanRestaurant';
import NearMeHalalFood from './pages/NearMeHalalFood';
import BlogPost from './pages/BlogPost';
import Contact from './pages/Contact';
import MenuItem from './pages/MenuItem';
import Menu from './pages/Menu';
import Home from './pages/Home';
import Halal from './pages/Halal';
import MarkdownPage from './pages/MarkdownPage';
import FAQIndex from './pages/FAQ/index';
import FAQSlug from './pages/FAQ/[slug]';
import Delivery from './pages/Delivery';
import "./index.css";

const categorizedMenu = {
  "Turkish Pita": [
    { name: "Beef&Lamb Döner (Shawarma) Turkish Pita", slug: "beefandlamb-doner-(shawarma)-turkish-pita", img: "/menu/Turkish Pita/Beef&Lamb-Döner (Shawarma-Turkish-Pita.png", price: "$16.68", url: "https://orderdoner.com/#9" },
    { name: "Chicken Döner (Shawarma) Turkish Pita", slug: "chicken-doner-(shawarma)-turkish-pita", img: "/menu/Turkish Pita/Chicken-Döner (Shawarma)-Turkish-Pita.png", price: "$16.68", url: "https://orderdoner.com/#9" },
    { name: "Mixed Döner (Beef&Lamb and Chicken Shawarma) Turkish Pita", slug: "mixed-doner-(beefandlamb-and-chicken-shawarma)-turkish-pita", img: "/menu/Turkish Pita/Mixed-Döner-(Beef&Lamb and-Chicken-Shawarma) Turkish-Pita.png", price: "$17.68", url: "https://orderdoner.com/#9" },
    { name: "Falafel Turkish Pita", slug: "falafel-turkish-pita", img: "/menu/Turkish Pita/Falafel-Turkish-Pita.png", price: "$16.68", url: "https://orderdoner.com/#9" },
  ],
  "Lavash Wraps": [
    { name: "Beef&Lamb Döner (Shawarma) Lavash Wrap", slug: "beef_and_lamb_doner_wrap", img: "/menu/Wrap/Beef&Lamb-Döner-(Shawarma-Lavash-Wrap.png", price: "$15.95", url: "https://orderdoner.com/#6" },
    { name: "Chicken Döner (Shawarma) Lavash Wrap", slug: "chicken-doner-wrap", img: "/menu/Wrap/Chicken-Döner-(Shawarma)-Lavash-Wrap.png", price: "$15.95", url: "https://orderdoner.com/#6" },
    { name: "Mixed Döner (Beef&Lamb and Chicken Shawarma) Lavash Wrap", slug: "mixed-doner-(beefandlamb-and-chicken-shawarma)-lavash-wrap", img: "/menu/Wrap/Mixed-Döner-(Beef&Lamb-and-Chicken-Shawarma)-Lavash-Wrap.png", price: "$16.95", url: "https://orderdoner.com/#6" },
    { name: "Falafel Lavash Wrap", slug: "falafel-lavash-wrap", img: "/menu/Wrap/Falafel-Lavash-Wrap.png", price: "$15.95", url: "https://orderdoner.com/#6" },
  ],
  "Pita Sandwiches": [
    { name: "Beef&Lamb Döner (Shawarma) Pita", slug: "beef_and_lamb_doner_pita", img: "/menu/Pita/Beef&Lamb-Döner-(Shawarma)-Pita.png", price: "$15.95", url: "https://orderdoner.com/#2" },
    { name: "Chicken Döner (Shawarma) Pita", slug: "chicken_pita_doner", img: "/menu/Pita/Chicken-Döner-(Shawarma)-Pita.png", price: "$15.95", url: "https://orderdoner.com/#2" },
    { name: "Mixed Döner (Beef&Lamb and Chicken Shawarma) Pita", slug: "mix-doner-pita", img: "/menu/Pita/Mixed-Döner-(Beef&Lamb-and-Chicken-Shawarma)-Pita.png", price: "$16.95", url: "https://orderdoner.com/#2" },
    { name: "Falafel Pita", slug: "falafel-pita", img: "/menu/Pita/Falafel-Pita.png", price: "$15.95", url: "https://orderdoner.com/#2" },
  ],
  "Rice Bowls": [
    { name: "Beef&Lamb Döner (Shawarma) Rice Bowl", slug: "beef_n_lamb_doner_rice_bowl", img: "/menu/Rice Bowl/Beef&Lamb-Dõner-(Shawarma)-Rice-Bowl.png", price: "$20.95", url: "https://orderdoner.com/#5" },
    { name: "Chicken Döner (Shawarma) Rice Bowl", slug: "chicken_doner_rice_bowl", img: "/menu/Rice Bowl/Chicken-Döner-(Shawarma)-Rice-Bowl.png", price: "$20.95", url: "https://orderdoner.com/#5" },
    { name: "Mixed Döner (Beef&Lamb and Chicken Shawarma) Rice Bowl", slug: "mix-doner-rice-bowl", img: "/menu/Rice Bowl/Mixed-Döner-(Beef&Lamb-and-Chicken-Shawarma)-Rice-Bowl.png", price: "$21.95", url: "https://orderdoner.com/#5" },
    { name: "Falafel Rice Bowl", slug: "falafel-rice-bowl", img: "/menu/Rice Bowl/Falafel-Rice-Bowl.png", price: "$20.95", url: "https://orderdoner.com/#5" },
  ],
  "French Fries Bowls": [
    { name: "Beef&Lamb Döner (Shawarma) French Fries Bowl", slug: "beef_and_lamb_french_fries_bowl", img: "/menu/Fries Bowl/Beef&Lamb-Döner-(Shawarma)-French-Fries-Bowl.png", price: "$20.95", url: "https://orderdoner.com/#7" },
    { name: "Chicken Döner (Shawarma) French Fries Bowl", slug: "chicken_doner_french_fries_bowl", img: "/menu/Fries Bowl/Chicken-Döner-Shawarma)-French-Fries-Bowl.png", price: "$20.95", url: "https://orderdoner.com/#7" },
    { name: "Mixed Döner (Beef&Lamb and Chicken Shawarma) French Fries Bowl", slug: "mix-doner-french-fries-bowl", img: "/menu/Fries Bowl/Mixed-Döner-(Beef&Lamb-and-Chicken-Shawarma)-French-Fries-Bowl.png", price: "$21.95", url: "https://orderdoner.com/#7" },
    { name: "Falafel French Fries Bowl", slug: "falafel-french-fries-bowl", img: "/menu/Fries Bowl/Falafel-French-Fries-Bowl.png", price: "$20.95", url: "https://orderdoner.com/#7" },
  ],
  "Salad Bowls": [
    { name: "Beef&Lamb Döner (Shawarma) Salad Bowl", slug: "beefandlamb-doner-(shawarma)-salad-bowl", img: "/menu/Salad Bowl/Beef&Lamb-Döner-(Shawarma)-Salad-Bowl.png", price: "$20.95", url: "https://orderdoner.com/#BVBECEXIUUB7HE2S7NSD8Q6O" },
    { name: "Falafel Salad Bowl", slug: "falafel-salad-bowl", img: "/menu/Salad Bowl/Falafel-Salad-Bowl.png", price: "$20.95", url: "https://orderdoner.com/#BVBECEXIUUB7HE2S7NSD8Q6O" },
    { name: "Veggie Bowl", slug: "veggie-bowl", img: "/menu/Salad Bowl/Veggie-Bowl.png", price: "$9.95", url: "https://orderdoner.com/#BVBECEXIUUB7HE2S7NSD8Q6O" },
  ],
  "Sides": [
    { name: "Side Rice", slug: "side-rice", img: "/menu/Sides/Side-Rice.png", price: "$5.00", url: "https://orderdoner.com/#3" },
    { name: "French Fries", slug: "french-fries", img: "/menu/Sides/French-Fries.png", price: "$5.95", url: "https://orderdoner.com/#3" },
    { name: "Mozzarella Sticks (5 Pieces)", slug: "mozzarella-sticks-(5-pieces)", img: "/menu/Sides/Mozzarella-Sticks.png", price: "$5.95", url: "https://orderdoner.com/#3" },
    { name: "Onion Rings", slug: "onion-rings", img: "/menu/Sides/Onion-Rings.png", price: "$5.95", url: "https://orderdoner.com/#3" },
    { name: "Tzatziki Dip", slug: "tzatziki-dip", img: "/menu/Sides/Tzatziki-Dip.png", price: "$6.95", url: "https://orderdoner.com/#3" },
    { name: "Stuffed Grape Leaves (4 Pieces)", slug: "stuffed-grape-leaves-(4-pieces)", img: "/menu/Sides/Stuffed-Grape-Leaves.png", price: "$5.95", url: "https://orderdoner.com/#3" },
    { name: "Falafel Side (4 Pieces)", slug: "falafel-side-(4-pieces)", img: "/menu/Sides/Falafel-Side.png", price: "$5.95", url: "https://orderdoner.com/#3" },
    { name: "Hummus", slug: "hummus", img: "/menu/Sides/Hummus.png", price: "$5.95", url: "https://orderdoner.com/#3" },
    { name: "Extra Pita", slug: "pita", img: "/menu/Sides/Extra-Pita.png", price: "$1.00", url: "https://orderdoner.com/#3" },
    { name: "Side Beef&Lamb Döner (Shawarma)", img: "/menu/Sides/Side-Beef&Lamb-Döner-(Shawarma).png", price: "$10.00", url: "https://orderdoner.com/#3" },
    { name: "Side Chicken Döner (Shawarma)", img: "/menu/Sides/Side-Chicken-Döner-(Shawarma).png", price: "$10.00", url: "https://orderdoner.com/#3" },
    { name: "Side Mixed (Beef&Lamb and Chicken) Döner (Shawarma)", img: "/menu/Sides/Side-Mixed-(Beef&Lamb-and-Chicken) Döner-(Shawarma).png", price: "$10.00", url: "https://orderdoner.com/#3" },
    { name: "Side Sauce", img: "/menu/Sides/Side-Sauce.png", price: "$1.00", url: "https://orderdoner.com/#3" },
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
      <NavBar />
      <ScrollRestoration />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/menu/:slug" element={<MenuItem />} />
        <Route path="/blog-posts" element={<BlogPosts />} />
        <Route path="/blog-posts/:slug" element={<BlogPost />} />
        <Route path="/halal" element={<Halal />} />
        <Route path="/faq" element={<FAQIndex />} />
        <Route path="/faq/:slug" element={<FAQSlug />} />
        <Route path="/about" element={<MarkdownPage />} />
        <Route path="/catering" element={<MarkdownPage />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mediterranean-restaurant" element={<MediterraneanRestaurant />} />
        <Route path="/near-me/halal-food" element={<NearMeHalalFood />} />
        <Route path="/delivery" element={<Delivery />} />
      </Routes>
      {/* Footer */}
      <footer className="bg-charcoal text-offwhite py-8 mt-8 text-center">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <div className="font-bold text-lg mb-2">Explore</div>
            <ul className="space-y-1">
              <li><a href="/experience" className="hover:text-saffron">Our Story</a></li>
              <li><a href="/halal" className="hover:text-saffron">Halal Commitment</a></li>
              <li><a href="/mediterranean-food-las-vegas" className="hover:text-saffron">Mediterranean Cuisine</a></li>
              <li><a href="/mediterranean-restaurant" className="hover:text-yellow-400 font-semibold">Mediterranean Restaurant</a></li>
              <li><a href="/faq/what-is-halal" className="hover:text-saffron">What is Halal? (FAQ)</a></li>
            </ul>
          </div>
          <div className="text-sm mt-4 md:mt-0">
            <div className="font-bold mb-1">Visit Us</div>
            <div>3615 S Las Vegas Blvd #101<br/>Las Vegas, NV 89109</div>
            <div className="mt-1">Open: 10:00 am - 5:00 am daily</div>
            <a href="tel:+17259008844" className="block mt-1 text-saffron underline">(725) 900-8844</a>
          </div>
          <div className="text-xs mt-6 md:mt-0">Istanbul Mediterranean &copy; {new Date().getFullYear()}<br/>All rights reserved.</div>
        </div>
      </footer>
      {/* Sticky Order Online CTA - Only show on mobile (hamburger menu) and hide when footer is visible */}
      <FooterAwareOrderOnlineButton />
    </>
  );
}
