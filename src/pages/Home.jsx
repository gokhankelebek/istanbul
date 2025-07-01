import React from 'react';
import { Link } from 'react-router-dom';
import menu from '../data/menu.json';
import MenuCard from '../components/MenuCard';
import TranslatedHero from '../components/TranslatedHero';
import useTranslation from '../hooks/useTranslation';
import { useLanguage } from '../contexts/LanguageContext';

// Placeholder for navigation enhancement
// import NavBar from '../components/NavBar';
import { FaYelp, FaGoogle, FaMapMarkerAlt, FaClock, FaCheckCircle } from 'react-icons/fa';

// Only show highlights (Best Sellers)
const highlights = menu.filter(i => [
  'beefandlamb-doner-(shawarma)-turkish-pita',
  'chicken-doner-wrap',
  'mix-doner-pita',
  'falafel-rice-bowl',
  'hummus',
].includes(i.slug));
// Add baklava to the end
const baklava = menu.find(i => i.slug === 'baklava');
if (baklava) highlights.push(baklava);

import { Helmet } from 'react-helmet';
import SEOHead from '../components/SEOHead';
import ResourceHints from '../components/ResourceHints';
import StructuredDataManager from '../components/StructuredDataManager';
import Breadcrumbs from '../components/Breadcrumbs';
import SocialShare from '../components/SocialShare';
import OptimizedImage from '../components/OptimizedImage';

export default function Home() {
  // ...existing code...
  // (caesarsLink is defined above)

  // Featured Caesars Palace callout
  const caesarsLink = (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-5 my-6 rounded-lg shadow flex flex-col md:flex-row items-center gap-4">
      <img src="/caesars-palace-hero.jpg" alt="Caesars Palace Mediterranean Food" className="w-28 h-20 object-cover rounded-md shadow-md" />
      <div>
        <h2 className="text-xl font-bold text-istanbulRed mb-1">Best Mediterranean Food Near Caesars Palace</h2>
        <p className="mb-2 text-gray-700">Staying near Caesars? Discover why Istanbul Mediterranean is the #1 spot for authentic, halal Mediterranean cuisine—just a 5-minute walk away!</p>
        <Link to="/blog-posts/best-mediterranean-food-near-caesars-palace-las-vegas" className="inline-block bg-istanbulRed text-white px-4 py-2 rounded hover:bg-red-700 font-semibold transition">See Guide</Link>
      </div>
    </div>
  );
  // Get translation function and current language
  const t = useTranslation();
  const { language } = useLanguage();
  
  // SEO Meta
  // (Place at the top of the returned JSX)

  // Testimonials using translation keys
  const testimonials = [
    {
      nameKey: "home.testimonials.person1.name",
      textKey: "home.testimonials.person1.text",
      sourceKey: "home.testimonials.person1.source",
      avatar: "/avatars/avatar1.png",
      rating: 5
    },
    {
      nameKey: "home.testimonials.person2.name",
      textKey: "home.testimonials.person2.text",
      sourceKey: "home.testimonials.person2.source",
      avatar: "/avatars/avatar2.png",
      rating: 5
    },
    {
      nameKey: "home.testimonials.person3.name",
      textKey: "home.testimonials.person3.text",
      sourceKey: "home.testimonials.person3.source",
      avatar: "/avatars/avatar3.png",
      rating: 5
    },
    {
      nameKey: "home.testimonials.person4.name",
      textKey: "home.testimonials.person4.text",
      sourceKey: "home.testimonials.person4.source",
      avatar: "/avatars/avatar4.png",
      rating: 5
    },
    {
      nameKey: "home.testimonials.person5.name",
      textKey: "home.testimonials.person5.text",
      sourceKey: "home.testimonials.person5.source",
      avatar: "/avatars/avatar5.png",
      rating: 4
    },
    {
      nameKey: "home.testimonials.person6.name",
      textKey: "home.testimonials.person6.text",
      sourceKey: "home.testimonials.person6.source",
      avatar: "/avatars/avatar6.png",
      rating: 5
    }
  ];
  // Define structured data for the home page
  const restaurantData = {
    name: "Istanbul Mediterranean",
    image: "https://www.istanbullv.com/hero_chef_wide.webp",
    url: "https://www.istanbullv.com",
    telephone: "+17259008844",
    address: {
      streetAddress: "3615 S Las Vegas Blvd #101",
      addressLocality: "Las Vegas",
      addressRegion: "NV",
      postalCode: "89109",
      addressCountry: "US"
    },
    geo: {
      latitude: 36.1230858,
      longitude: -115.1724256
    },
    openingHours: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        opens: "10:00",
        closes: "05:00"
      }
    ],
    servesCuisine: ["Turkish", "Mediterranean", "Middle Eastern", "Halal"],
    priceRange: "$$",
    menu: "https://www.istanbullv.com/menu",
    acceptsReservations: "True",
    aggregateRating: {
      ratingValue: "4.8",
      reviewCount: "896"
    },
    reviews: [
      {
        author: { name: "Sarah L." },
        datePublished: "2023-12-15",
        reviewRating: { ratingValue: "5" },
        reviewBody: "Absolutely the best doner in Vegas! The meat was juicy and flavorful. Will be back!"
      },
      {
        author: { name: "Mike D." },
        datePublished: "2023-11-20",
        reviewRating: { ratingValue: "5" },
        reviewBody: "Open late, super convenient after a night out. The Turkish bread is amazing."
      },
      {
        author: { name: "Jessica P." },
        datePublished: "2024-01-05",
        reviewRating: { ratingValue: "5" },
        reviewBody: "Falafel wrap was fresh and delicious. Friendly staff and fast service."
      }
    ]
  };

  // FAQ data for structured data
  const faqData = {
    questions: [
      {
        question: "What are your opening hours?",
        answer: "We are open daily from 10:00 AM to 5:00 AM, serving fresh Turkish food late into the night."
      },
      {
        question: "Is all your food halal?",
        answer: "Yes, all our meat is 100% halal certified. We take pride in serving authentic halal Turkish cuisine."
      },
      {
        question: "Do you offer vegetarian options?",
        answer: "Absolutely! We have a variety of vegetarian and vegan options including falafel, hummus, stuffed grape leaves, and more."
      },
      {
        question: "Where are you located on the Las Vegas Strip?",
        answer: "We are located at 3615 S Las Vegas Blvd #101, Las Vegas, NV 89109, conveniently situated on the Strip."
      },
      {
        question: "Do you offer delivery?",
        answer: "Yes, we offer delivery through our website and major delivery platforms like Uber Eats, DoorDash, and Grubhub."
      }
    ]
  };

  // Aggregate all schema types for the home page
  const aggregateSchemaData = [
    { type: 'restaurant', data: restaurantData },
    { type: 'localBusiness', data: restaurantData },
    { type: 'faq', data: faqData },
    { type: 'website', data: { name: "Istanbul Mediterranean Restaurant", url: "https://www.istanbullv.com" } }
  ];

  return (
    <>
      {/* Hero section and main intro */}
      <TranslatedHero />
      {/* Featured Caesars Palace callout */}
      {caesarsLink}

      <ResourceHints />
      <SEOHead 
        title="Istanbul Mediterranean | Best Turkish Food & Halal Restaurant Las Vegas Strip"
        description="Authentic Turkish food & halal restaurant on the Las Vegas Strip. Serving fresh döner kebab, shawarma & baklava until 5 AM. #1 rated on TripAdvisor. Order online!"
        keywords="turkish food las vegas, halal restaurant las vegas strip, doner kebab, shawarma, baklava, mediterranean food, late night food las vegas"
        canonicalUrl="https://www.istanbullv.com/"
        ogType="website"
        ogImage="https://www.istanbullv.com/social-banner.jpg"
      />
      <StructuredDataManager type="aggregate" data={aggregateSchemaData} />
      {/* Translated Hero Section */}
      <TranslatedHero />

      {/* Halal Commitment Badge */}
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-center gap-2 bg-herb/10 px-5 py-2 rounded-full shadow border border-herb/20">
          <FaCheckCircle className="text-herb text-2xl" />
          <span className="font-semibold text-herb text-lg">{t('home.halal.title')}</span>
        </div>
        <div className="text-charcoal text-sm mt-2">{t('home.halal.description')}</div>
      </div>

      {/* Featured Dishes Horizontal Scroll */}
      <section className="py-8 bg-offwhite">
        <h2 className="text-2xl font-bold mb-4 text-primary text-center">{t('home.featuredDishes')}</h2>
        <div className="flex overflow-x-auto gap-6 px-2 pb-4 scrollbar-hide">
          {highlights.map(i => (
            <div key={i.slug} className="min-w-[250px] max-w-xs bg-white rounded-2xl shadow-lg border border-saffron/20 flex-shrink-0 hover:scale-105 transition-transform duration-200">
              <MenuCard {...i} />
            </div>
          ))}
        </div>
      </section>
      <div className="flex flex-col items-center mt-8 space-y-4">
        <Link to={`/${language === 'en-us' ? '' : language}/menu`.replace('//', '/')} className="btn btn-primary text-lg px-8 py-3">{t('common.viewFullMenu')}</Link>
        <div className="mt-4">
          <SocialShare 
            url="https://www.istanbullv.com" 
            title={t('home.socialShare.title')} 
            description={t('home.socialShare.description')}
            hashtags="turkishfood,lasvegas,halal,doner"
            image="/hero_chef_wide.webp"
            showCounts
          />
        </div>
      </div>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-offwhite text-center">
        <h2 className="text-3xl font-extrabold mb-10 text-primary tracking-tight">{t('home.whyChooseUs')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          <div className="flex flex-col items-center p-6 rounded-2xl shadow bg-white border border-saffron/10 hover:shadow-xl transition-shadow group">
            <img src="/doner-icon.png" alt="Doner Kebab Icon" className="w-14 h-14 mb-3 object-contain group-hover:scale-110 transition-transform" />
            <span className="font-bold text-base mb-2 text-center">{t('home.features.doner.title')}</span>
            <span className="text-herb text-sm text-center max-w-[180px] mx-auto leading-snug">{t('home.features.doner.description')}</span>
          </div>
          <div className="flex flex-col items-center p-6 rounded-2xl shadow bg-white border border-saffron/10 hover:shadow-xl transition-shadow group">
            <img src="/halal-vegan.png" alt="Halal & Vegan Options" className="w-16 h-16 mb-3 object-contain group-hover:scale-110 transition-transform" />
            <span className="font-bold text-lg mb-1">{t('home.features.halal.title')}</span>
            <span className="text-herb text-sm">{t('home.features.halal.description')}</span>
          </div>
          <div className="flex flex-col items-center p-6 rounded-2xl shadow bg-white border border-saffron/10 hover:shadow-xl transition-shadow group">
            <img src="/open-late.png" alt="Open Late" className="w-16 h-16 mb-3 object-contain group-hover:scale-110 transition-transform" />
            <span className="font-bold text-lg mb-1">{t('home.features.openLate.title')}</span>
            <span className="text-herb text-sm">{t('home.features.openLate.description')}</span>
          </div>
          <div className="flex flex-col items-center p-6 rounded-2xl shadow bg-white border border-saffron/10 hover:shadow-xl transition-shadow group">
            <img src="/family-owned.png" alt="Family-Owned Hospitality" className="w-16 h-16 mb-3 object-contain group-hover:scale-110 transition-transform" />
            <span className="font-bold text-lg mb-1">{t('home.features.family.title')}</span>
            <span className="text-herb text-sm">{t('home.features.family.description')}</span>
          </div>
          <div className="flex flex-col items-center p-6 rounded-2xl shadow bg-white border border-saffron/10 hover:shadow-xl transition-shadow group">
            <img src="/strip.png" alt="On the Vegas Strip" className="w-16 h-16 mb-3 object-contain group-hover:scale-110 transition-transform" />
            <span className="font-bold text-lg mb-1">{t('home.features.location.title')}</span>
            <span className="text-herb text-sm">{t('home.features.location.description')}</span>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gradient-to-br from-white via-offwhite to-saffron/10 text-center mb-16 rounded-xl shadow-sm container mx-auto flex flex-col items-center">
        <h2 className="text-4xl font-semibold mb-4 text-primary">{t('home.aboutUs')}</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-4xl mx-auto">
          <img src="/chef_avatar.png" alt="Chef at Istanbul Mediterranean" className="w-40 h-40 rounded-full object-cover shadow-lg mb-6 md:mb-0 border-4 border-saffron/40" onError={e => e.target.style.display='none'} />
          <div className="flex-1">
            <p className="text-lg text-charcoal mb-4">
              {t('home.aboutText.paragraph1')}
            </p>
            <div className="bg-white p-4 rounded-xl shadow mb-4 border-l-4 border-istanbulRed/70 max-w-xl mx-auto">
              <span className="italic text-saffron text-lg">"{t('home.aboutText.quote')}"</span>
            </div>
            <p className="text-lg text-charcoal">
              {t('home.aboutText.paragraph2')}
            </p>
            <div className="mt-6">
              <span style={{ fontFamily: 'Pacifico, cursive', fontSize: '2rem', color: '#b48b3c', display: 'inline-block' }}>
                {t('home.aboutText.signature')}
              </span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-b from-white via-offwhite to-saffron/10 text-center">
        <h2 className="text-3xl font-extrabold mb-8 text-primary tracking-tight">{t('home.testimonials.title')}</h2>
        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-x-auto flex gap-6 snap-x pb-4 scrollbar-hide">
            {testimonials.map((testimonial, i)=>(
              <div key={i} className="bg-white rounded-3xl p-6 shadow-xl text-charcoal min-w-[320px] max-w-xs flex flex-col items-center snap-center border border-saffron/10 hover:shadow-2xl transition-shadow duration-200">
                <OptimizedImage 
                  src={testimonial.avatar} 
                  alt={t(testimonial.nameKey)} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-saffron mb-2" 
                  width={64}
                  height={64}
                  onError={e => e.target.style.display='none'}
                />
                <div className="flex gap-1 mb-2 justify-center">
                  {[...Array(testimonial.rating)].map((_,idx)=>(<span key={idx} className="text-saffron text-xl">★</span>))}
                  {[...Array(5-testimonial.rating)].map((_,idx)=>(<span key={idx} className="text-gray-300 text-xl">★</span>))}
                </div>
                <div className="italic mb-2 text-lg">"{t(testimonial.textKey)}"</div>
                <div className="font-semibold text-primary flex items-center gap-2">
                  {t(testimonial.nameKey)}
                  {t(testimonial.sourceKey) === 'Yelp' && <FaYelp className="text-yelpRed text-lg" title="Yelp" />}
                  {t(testimonial.sourceKey) === 'Google' && <FaGoogle className="text-googleBlue text-lg" title="Google" />}
                </div>
                <div className="text-xs text-herb mt-1">{t(testimonial.sourceKey)} {t('common.review')}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Find Us Section */}
      <section className="py-16 bg-white text-center border-t border-saffron/20 mt-12">
        <h2 className="text-3xl font-extrabold mb-6 text-primary">{t('home.findUs.title')}</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-4xl mx-auto">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 text-herb justify-center">
              <FaMapMarkerAlt className="text-saffron text-2xl" />
              <span className="font-bold text-lg">{t('home.findUs.address')}</span>
            </div>
            <div className="flex items-center gap-2 mb-2 text-charcoal justify-center">
              <FaClock className="text-istanbulRed text-xl" />
              <span>{t('home.findUs.hours')}</span>
            </div>
            <a href="tel:+17259008844" className="block mt-2 text-lg text-istanbulRed underline font-bold">(725) 900-8844</a>
            <div className="mt-4">
              <a href="https://www.google.com/maps/place/3615+S+Las+Vegas+Blvd+%23101,+Las+Vegas,+NV+89109" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">{t('home.findUs.viewMap')}</a>
            </div>
          </div>
          <div className="flex-1 mt-8 md:mt-0">
            <iframe
              title="Istanbul Mediterranean Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3239.778279190019!2d-115.17242568474799!3d36.12308588008944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c8c439e1e1e1e1%3A0x1e1e1e1e1e1e1e1e!2s3615%20S%20Las%20Vegas%20Blvd%20%23101%2C%20Las%20Vegas%2C%20NV%2089109!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
              width="100%"
              height="260"
              style={{ border: 0, borderRadius: '1rem', boxShadow: '0 2px 16px rgba(0,0,0,0.10)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}
