import React from 'react';
import { Link } from 'react-router-dom';
import menu from '../data/menu.json';
import MenuCard from '../components/MenuCard';

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

export default function Home() {
  // Demo testimonials
  const testimonials = [
    {
      name: "Sarah L.",
      text: "Absolutely the best doner in Vegas! The meat was juicy and flavorful. Will be back!",
      source: "Yelp",
      avatar: "/avatars/avatar1.png",
      rating: 5
    },
    {
      name: "Mike D.",
      text: "Open late, super convenient after a night out. The Turkish bread is amazing.",
      source: "Google",
      avatar: "/avatars/avatar2.png",
      rating: 5
    },
    {
      name: "Jessica P.",
      text: "Falafel wrap was fresh and delicious. Friendly staff and fast service.",
      source: "Yelp",
      avatar: "/avatars/avatar3.png",
      rating: 5
    },
    {
      name: "Alex K.",
      text: "Great vegetarian options and everything is halal. Highly recommend the baklava!",
      source: "Google",
      avatar: "/avatars/avatar4.png",
      rating: 5
    },
    {
      name: "David S.",
      text: "Portions are generous and prices are reasonable for the Strip. Will visit again!",
      source: "Yelp",
      avatar: "/avatars/avatar5.png",
      rating: 4
    },
    {
      name: "Maria G.",
      text: "Impeccably clean, friendly, and the food is always fresh. Love this place!",
      source: "Google",
      avatar: "/avatars/avatar6.png",
      rating: 5
    }
  ];
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center bg-charcoal mb-12 overflow-hidden" style={{background:'#1F1F1F'}}>
        <img id="hero-bg" src="/hero_chef_wide.jpg" srcSet="/hero_chef_wide.jpg 2x" alt="Chef preparing doner" className="absolute inset-0 w-full h-full object-cover animate-fadein" style={{zIndex:0, objectPosition: 'center top'}} loading="lazy" onError={e => e.target.style.display='none'} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-charcoal/40 to-transparent" style={{zIndex:1}} />
        <div className="relative z-10 text-center text-offwhite space-y-6 animate-fadein-slow">
          <h1 className="font-poppins font-extrabold text-4xl md:text-6xl animate-text-pop">Wraps That Roll, <span className="text-istanbulRed">Flavors That Rock.</span></h1>
          <p className="text-lg md:text-2xl">Authentic Turkish doner crafted fresh in Las Vegas.</p>
          <div className="flex gap-4 justify-center">
            <a href="https://orderdoner.com" target="_blank" rel="noopener noreferrer" className="btn btn-primary" aria-label="Order Online">Order Online</a>
            <Link to="/menu" className="btn btn-secondary" aria-label="See Menu">See Menu</Link>
          </div>
        </div>
        <img src="/scooter.png" alt="Delivery scooter" className="hidden md:block absolute right-8 bottom-8 w-32 animate-float" style={{zIndex:2}} loading="lazy" onError={e => e.target.style.display='none'} />
      </section>

      {/* Halal Commitment Badge */}
      <div className="flex flex-col items-center mb-6">
        <div className="flex items-center gap-2 bg-herb/10 px-5 py-2 rounded-full shadow border border-herb/20">
          <FaCheckCircle className="text-herb text-2xl" />
          <span className="font-semibold text-herb text-lg">100% Halal Certified</span>
        </div>
        <div className="text-charcoal text-sm mt-2">All meats are ethically sourced and prepared in accordance with halal standards.</div>
      </div>

      {/* Featured Dishes Horizontal Scroll */}
      <section className="py-8 bg-offwhite">
        <h2 className="text-2xl font-bold mb-4 text-primary text-center">Featured Dishes</h2>
        <div className="flex overflow-x-auto gap-6 px-2 pb-4 scrollbar-hide">
          {highlights.map(i => (
            <div key={i.slug} className="min-w-[250px] max-w-xs bg-white rounded-2xl shadow-lg border border-saffron/20 flex-shrink-0 hover:scale-105 transition-transform duration-200">
              <MenuCard {...i} />
            </div>
          ))}
        </div>
      </section>
      <div className="flex justify-center mt-8">
        <Link to="/menu" className="btn btn-primary text-lg px-8 py-3">View Full Menu</Link>
      </div>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-offwhite text-center">
        <h2 className="text-3xl font-extrabold mb-10 text-primary tracking-tight">Why Choose Us?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          <div className="flex flex-col items-center p-6 rounded-2xl shadow bg-white border border-saffron/10 hover:shadow-xl transition-shadow group">
            <img src="/doner.png" alt="Authentic Turkish Doner" className="w-16 h-16 mb-3 object-contain group-hover:scale-110 transition-transform" />
            <span className="font-bold text-lg mb-1">Authentic Turkish Doner</span>
            <span className="text-herb text-sm">Juicy, flavorful, and carved fresh daily—just like Istanbul.</span>
          </div>
          <div className="flex flex-col items-center p-6 rounded-2xl shadow bg-white border border-saffron/10 hover:shadow-xl transition-shadow group">
            <img src="/halal-vegan.png" alt="Halal & Vegan Options" className="w-16 h-16 mb-3 object-contain group-hover:scale-110 transition-transform" />
            <span className="font-bold text-lg mb-1">100% Halal & Vegan Options</span>
            <span className="text-herb text-sm">Halal-certified meats and plenty of vegetarian/vegan choices for all.</span>
          </div>
          <div className="flex flex-col items-center p-6 rounded-2xl shadow bg-white border border-saffron/10 hover:shadow-xl transition-shadow group">
            <img src="/open-late.png" alt="Open Late" className="w-16 h-16 mb-3 object-contain group-hover:scale-110 transition-transform" />
            <span className="font-bold text-lg mb-1">Open Late, Every Day</span>
            <span className="text-herb text-sm">Craving doner at 4am? We’re here for you—open until 5am daily.</span>
          </div>
          <div className="flex flex-col items-center p-6 rounded-2xl shadow bg-white border border-saffron/10 hover:shadow-xl transition-shadow group">
            <img src="/family-owned.png" alt="Family-Owned Hospitality" className="w-16 h-16 mb-3 object-contain group-hover:scale-110 transition-transform" />
            <span className="font-bold text-lg mb-1">Family-Owned Hospitality</span>
            <span className="text-herb text-sm">Warm, friendly service that makes you feel right at home.</span>
          </div>
          <div className="flex flex-col items-center p-6 rounded-2xl shadow bg-white border border-saffron/10 hover:shadow-xl transition-shadow group">
            <img src="/strip.png" alt="On the Vegas Strip" className="w-16 h-16 mb-3 object-contain group-hover:scale-110 transition-transform" />
            <span className="font-bold text-lg mb-1">On the Vegas Strip</span>
            <span className="text-herb text-sm">Conveniently located in the heart of Las Vegas for locals & visitors.</span>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gradient-to-br from-white via-offwhite to-saffron/10 text-center mb-16 rounded-xl shadow-sm container mx-auto flex flex-col items-center">
        <h2 className="text-4xl font-semibold mb-4 text-primary">About Us</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-4xl mx-auto">
          <img src="/chef_avatar.png" alt="Chef at Istanbul Mediterranean" className="w-40 h-40 rounded-full object-cover shadow-lg mb-6 md:mb-0 border-4 border-saffron/40" onError={e => e.target.style.display='none'} />
          <div className="flex-1">
            <p className="text-lg text-charcoal mb-4">
              At Istanbul Mediterranean, our story begins in the heart of Turkey, where food is more than a meal—it’s a celebration of family, tradition, and togetherness. Our recipes are rooted in the rich history of the Ottoman Empire and shaped by the vibrant cultures along the Silk Road and Mediterranean coasts. Each dish we serve is a reflection of our family’s heritage and the centuries-old culinary traditions passed down through generations.
            </p>
            <div className="bg-white p-4 rounded-xl shadow mb-4 border-l-4 border-istanbulRed/70 max-w-xl mx-auto">
              <span className="italic text-saffron text-lg">“Cooking is our family’s passion. From Istanbul’s bustling streets to our kitchen in Las Vegas, we bring you the authentic flavors of Turkish and Mediterranean cuisine.”</span>
            </div>
            <p className="text-lg text-charcoal">
              We are proud to serve 100% Halal-certified meats and honor the values of ethical sourcing and traditional preparation. At Istanbul Mediterranean, we invite you to join our family table and experience the true taste of Turkey—where every meal is a journey through history, and every guest is treated like family.
            </p>
            <div className="mt-6">
              <span style={{ fontFamily: 'Pacifico, cursive', fontSize: '2rem', color: '#b48b3c', display: 'inline-block' }}>
                Istanbul Family
              </span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-b from-white via-offwhite to-saffron/10 text-center">
        <h2 className="text-3xl font-extrabold mb-8 text-primary tracking-tight">What People Say</h2>
        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-x-auto flex gap-6 snap-x pb-4 scrollbar-hide">
            {testimonials.map((t,i)=>(
              <div key={i} className="bg-white rounded-3xl p-6 shadow-xl text-charcoal min-w-[320px] max-w-xs flex flex-col items-center snap-center border border-saffron/10 hover:shadow-2xl transition-shadow duration-200">
                <img src={t.avatar} alt={t.name} className="w-16 h-16 rounded-full object-cover border-2 border-saffron mb-2" onError={e => e.target.style.display='none'} />
                <div className="flex gap-1 mb-2 justify-center">
                  {[...Array(t.rating)].map((_,idx)=>(<span key={idx} className="text-saffron text-xl">★</span>))}
                  {[...Array(5-t.rating)].map((_,idx)=>(<span key={idx} className="text-gray-300 text-xl">★</span>))}
                </div>
                <div className="italic mb-2 text-lg">“{t.text}”</div>
                <div className="font-semibold text-primary flex items-center gap-2">
                  {t.name}
                  {t.source === 'Yelp' && <FaYelp className="text-yelpRed text-lg" title="Yelp" />}
                  {t.source === 'Google' && <FaGoogle className="text-googleBlue text-lg" title="Google" />}
                </div>
                <div className="text-xs text-herb mt-1">{t.source} Review</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Find Us Section */}
      <section className="py-16 bg-white text-center border-t border-saffron/20 mt-12">
        <h2 className="text-3xl font-extrabold mb-6 text-primary">Find Us</h2>
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 max-w-4xl mx-auto">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2 text-herb justify-center">
              <FaMapMarkerAlt className="text-saffron text-2xl" />
              <span className="font-bold text-lg">3615 S Las Vegas Blvd #101, Las Vegas, NV 89109</span>
            </div>
            <div className="flex items-center gap-2 mb-2 text-charcoal justify-center">
              <FaClock className="text-istanbulRed text-xl" />
              <span>Open: 10:00 am - 5:00 am daily</span>
            </div>
            <a href="tel:+17259008844" className="block mt-2 text-lg text-istanbulRed underline font-bold">(725) 900-8844</a>
            <div className="mt-4">
              <a href="https://www.google.com/maps/place/3615+S+Las+Vegas+Blvd+%23101,+Las+Vegas,+NV+89109" target="_blank" rel="noopener noreferrer" className="btn btn-secondary">View on Google Maps</a>
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
