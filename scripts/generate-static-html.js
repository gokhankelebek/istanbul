#!/usr/bin/env node

/**
 * Static HTML Generator for SEO
 *
 * This script pre-renders your React pages to static HTML files that search engines
 * can easily crawl and index. This solves the "Crawled - currently not indexed" problem
 * by providing real content to crawlers instead of empty <div id="root"></div>.
 */

const fs = require("fs");
const path = require("path");
const React = require("react");
const ReactDOMServer = require("react-dom/server");

// Routes to pre-render (add more as needed)
const routes = [
  {
    path: "/",
    title: "Istanbul Mediterranean | Best Turkish Food Las Vegas",
    description:
      "Authentic Turkish doner kebab, shawarma & halal food on the Las Vegas Strip. Family recipes, open until 5 AM. Order online or visit us!",
  },
  {
    path: "/menu",
    title: "Mediterranean Menu | Istanbul Doner Las Vegas",
    description:
      "Explore our authentic Turkish and Mediterranean menu. Fresh doner, wraps, bowls, and traditional dishes made with family recipes.",
  },
  {
    path: "/halal",
    title: "Halal Certified Turkish Food | Istanbul Mediterranean",
    description:
      "Enjoy 100% halal certified Turkish doner and Mediterranean cuisine. Family-owned restaurant serving authentic halal food in Las Vegas.",
  },
  {
    path: "/about",
    title: "About Istanbul Mediterranean | Authentic Turkish Restaurant",
    description:
      "Learn about our family story and authentic Turkish heritage. Bringing traditional Istanbul flavors to Las Vegas since our opening.",
  },
  {
    path: "/contact",
    title: "Contact Istanbul Mediterranean | Las Vegas Location",
    description:
      "Visit us at 3615 S Las Vegas Blvd or call (702) 847-3300. Open daily for authentic Turkish doner and Mediterranean cuisine.",
  },
  {
    path: "/blog-posts",
    title: "Turkish Food Blog | Istanbul Mediterranean Las Vegas",
    description:
      "Discover articles about Turkish cuisine, halal food, and Mediterranean cooking. Learn about doner, shawarma, and traditional recipes.",
  },
  {
    path: "/delivery",
    title: "Turkish Food Delivery Las Vegas | Istanbul Mediterranean",
    description:
      "Order authentic Turkish doner and Mediterranean food for delivery in Las Vegas. Fresh, halal-certified meals delivered to your door.",
  },
  {
    path: "/catering",
    title: "Turkish Catering Las Vegas | Istanbul Mediterranean",
    description:
      "Professional Turkish and Mediterranean catering services. Perfect for events, parties, and corporate gatherings in Las Vegas.",
  },
];

// Blog posts from sitemap
const blogPosts = [
  {
    path: "/blog-posts/baklava-unwrapped",
    title: "Traditional Turkish Baklava Recipe & History",
    description:
      "Discover the authentic Turkish baklava recipe and learn about its rich history. Made with layers of phyllo dough, nuts, and sweet syrup.",
  },
  {
    path: "/blog-posts/best-halal-baklava-las-vegas-strip",
    title: "Best Halal Baklava on Las Vegas Strip",
    description:
      "Find the best halal-certified baklava on the Las Vegas Strip. Authentic Turkish dessert made with traditional methods and halal ingredients.",
  },
  {
    path: "/blog-posts/halal-what-does-it-mean",
    title: "What Does Halal Mean? Complete Guide",
    description:
      "Understanding halal food requirements and why it matters. Learn about halal certification and how it affects food preparation and ingredients.",
  },
  {
    path: "/blog-posts/shawarma-vs-doner-kebab",
    title: "Shawarma vs Doner Kebab: Key Differences",
    description:
      "Learn the key differences between shawarma and doner kebab. Discover the origins, preparation methods, and flavors of these popular dishes.",
  },
  {
    path: "/blog-posts/greek-gyro-answering-top-7-questions",
    title: "Greek Gyro vs Turkish Doner: 7 Key Questions Answered",
    description:
      "Compare Greek gyro and Turkish doner. Get answers to the most common questions about these popular Mediterranean dishes.",
  },
  {
    path: "/blog-posts/what-is-falafel-what-is-it-made-from-which-cuisine",
    title: "What is Falafel? Origins and Ingredients Explained",
    description:
      "Learn about falafel - its Middle Eastern origins, traditional ingredients, and how it became a global favorite. Discover authentic preparation methods.",
  },
];

// Menu items (sample - add more as needed)
const menuItems = [
  {
    path: "/menu/beefandlamb-doner-(shawarma)-turkish-pita",
    title: "Beef & Lamb Doner Turkish Pita | Istanbul Mediterranean",
    description:
      "Authentic Turkish pita with premium beef and lamb doner (shawarma). Fresh vegetables, traditional sauces, and halal-certified meat.",
  },
  {
    path: "/menu/chicken-doner-(shawarma)-turkish-pita",
    title: "Chicken Doner Turkish Pita | Istanbul Mediterranean",
    description:
      "Tender chicken doner (shawarma) in fresh Turkish pita bread. Served with crisp vegetables and authentic Mediterranean sauces.",
  },
  {
    path: "/menu/falafel-turkish-pita",
    title: "Falafel Turkish Pita | Istanbul Mediterranean",
    description:
      "Crispy homemade falafel in Turkish pita with fresh vegetables and tahini sauce. Perfect vegetarian Mediterranean option.",
  },
  {
    path: "/menu/baklava",
    title: "Traditional Turkish Baklava | Istanbul Mediterranean",
    description:
      "Authentic Turkish baklava made with layers of phyllo dough, premium nuts, and traditional sweet syrup. A perfect end to your meal.",
  },
];

// Combine all routes
const allRoutes = [...routes, ...blogPosts, ...menuItems];

// Template for static HTML
function generateHTML(route) {
  const { path: routePath, title, description } = route;

  return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${title}</title>
    <meta name="description" content="${description}" />
    
    <!-- Open Graph tags -->
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${description}" />
    <meta property="og:type" content="website" />
    <meta property="og:image" content="https://www.istanbullv.com/doner-og.webp" />
    <meta property="og:url" content="https://www.istanbullv.com${routePath}" />
    
    <!-- Twitter Card tags -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${description}" />
    <meta name="twitter:image" content="https://www.istanbullv.com/doner-og.webp" />
    
    <!-- Canonical URL -->
    <link rel="canonical" href="https://www.istanbullv.com${routePath}" />
    
    <!-- Additional SEO meta tags -->
    <meta name="robots" content="index, follow" />
    <meta name="googlebot" content="index, follow" />
    
    <!-- Favicon -->
    <link rel="icon" type="image/png" href="/favicon.png" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    
    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500&family=Poppins:wght@600&display=swap" rel="stylesheet" />
    
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-FFY0FW17ZM"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-FFY0FW17ZM');
    </script>
    
    <!-- Schema.org structured data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Restaurant",
        "name": "Istanbul Mediterranean",
        "description": "Authentic Turkish Mediterranean restaurant serving halal döner kebab and shawarma in Las Vegas",
        "image": "https://www.istanbullv.com/doner-og.webp",
        "servesCuisine": ["Turkish", "Mediterranean", "Middle Eastern"],
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "3615 S Las Vegas Blvd #101",
            "addressLocality": "Las Vegas",
            "addressRegion": "NV",
            "postalCode": "89109",
            "addressCountry": "US"
        },
        "url": "https://www.istanbullv.com",
        "telephone": "+17028473300",
        "priceRange": "$$",
        "acceptsReservations": false,
        "hasMenu": "https://www.istanbullv.com/menu",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday", 
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday"
            ],
            "opens": "10:00",
            "closes": "05:00"
          }
        ],
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 36.0944,
          "longitude": -115.1745
        },
        "paymentAccepted": "Cash, Credit Card, Debit Card",
        "currenciesAccepted": "USD",
        "sameAs": [
            "https://www.instagram.com/istanbulmedlv",
            "https://www.facebook.com/istanbulmedlv",
            "https://www.yelp.com/biz/istanbul-mediterranean-las-vegas"
        ]
    }
    </script>
    
    <!-- Load React scripts for all users -->
    <script defer src="/static/js/main.4d74bec8.js"></script>
    <link href="/static/css/main.e1e1553e.css" rel="stylesheet">
    
    <!-- Progressive enhancement - show content to all users and bots -->
    <style>
        .seo-fallback {
            display: block;
        }
        
        /* Hide fallback when React loads */
        .react-loaded .seo-fallback {
            display: none;
        }
    </style>
    
    <!-- Progressive enhancement script -->
    <script>
        // Remove no-js class and mark React as loaded
        document.documentElement.className = document.documentElement.className.replace('no-js', '');
        
        // Mark React as loaded when the main script loads
        document.addEventListener('DOMContentLoaded', function() {
            setTimeout(function() {
                document.documentElement.classList.add('react-loaded');
            }, 1000);
        });
    </script>
</head>
<body class="no-js">
    <div id="root"></div>
    
    <!-- SEO fallback content for crawlers and no-JS users -->
    <div class="seo-fallback">
        <main style="max-width: 1200px; margin: 0 auto; padding: 20px; font-family: Arial, sans-serif;">
            <header>
                <h1>${title}</h1>
                <p>${description}</p>
            </header>
            
            <nav style="margin: 20px 0;">
                <a href="/" style="margin-right: 20px; color: #d4654a; text-decoration: none;">Home</a>
                <a href="/menu" style="margin-right: 20px; color: #d4654a; text-decoration: none;">Menu</a>
                <a href="/blog-posts" style="margin-right: 20px; color: #d4654a; text-decoration: none;">Blog</a>
                <a href="/about" style="margin-right: 20px; color: #d4654a; text-decoration: none;">About</a>
                <a href="/contact" style="margin-right: 20px; color: #d4654a; text-decoration: none;">Contact</a>
            </nav>
            
            <section style="margin: 30px 0;">
                <h2>Istanbul Mediterranean Restaurant - Las Vegas</h2>
                <p>Experience authentic Turkish and Mediterranean cuisine at Istanbul Mediterranean, located in the heart of Las Vegas. Our family-owned restaurant serves traditional doner kebab, fresh wraps, bowls, and classic Middle Eastern dishes prepared with halal-certified ingredients.</p>
                
                <h3>Our Specialties:</h3>
                <ul>
                    <li>Authentic Turkish Doner (Shawarma)</li>
                    <li>Fresh Mediterranean Wraps</li>
                    <li>Traditional Rice and Fries Bowls</li>
                    <li>Homemade Falafel</li>
                    <li>Turkish Baklava</li>
                    <li>Fresh Salads and Sides</li>
                </ul>
                
                <h3>Why Choose Istanbul Mediterranean?</h3>
                <ul>
                    <li>100% Halal Certified</li>
                    <li>Family Recipes from Istanbul</li>
                    <li>Fresh Ingredients Daily</li>
                    <li>Open Late Night</li>
                    <li>Dine-in, Takeout & Delivery</li>
                </ul>
            </section>
            
            <section style="margin: 30px 0;">
                <h3>Location & Hours</h3>
                <address style="font-style: normal;">
                    <strong>Istanbul Mediterranean</strong><br>
                    3615 S Las Vegas Blvd #101<br>
                    Las Vegas, Nevada 89109<br>
                    Phone: <a href="tel:+17028473300">(702) 847-3300</a><br>
                    Hours: Monday-Sunday 10:00 AM - 5:00 AM
                </address>
            </section>
            
            <footer style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
                <p>Follow us on social media:</p>
                <a href="https://www.instagram.com/istanbulmedlv" style="color: #d4654a; margin-right: 15px;">Instagram</a>
                <a href="https://www.facebook.com/istanbulmedlv" style="color: #d4654a; margin-right: 15px;">Facebook</a>
                <a href="https://www.yelp.com/biz/istanbul-mediterranean-las-vegas" style="color: #d4654a;">Yelp</a>
            </footer>
        </main>
    </div>
</body>
</html>`;
}

// Create build directory if it doesn't exist
const buildDir = path.join(__dirname, "../build");
if (!fs.existsSync(buildDir)) {
  fs.mkdirSync(buildDir, { recursive: true });
}

// Generate static HTML files
console.log("🚀 Generating static HTML files for SEO...");

allRoutes.forEach((route) => {
  const html = generateHTML(route);

  // Create clean-URL directory structure, e.g. /menu/index.html
  const isHome = route.path === "/";
  const routeDir = isHome ? buildDir : path.join(buildDir, route.path);
  const filePath = path.join(routeDir, "index.html");

  if (!fs.existsSync(routeDir)) {
    fs.mkdirSync(routeDir, { recursive: true });
  }

  fs.writeFileSync(filePath, html);
  console.log(
    `✅ Generated: ${isHome ? "/index.html" : `${route.path}/index.html`}`
  );
});

// Ensure main index.html exists and contains SEO content
const mainIndexPath = path.join(buildDir, "index.html");
if (!fs.existsSync(mainIndexPath)) {
  const homeRoute = routes.find((r) => r.path === "/");
  const html = generateHTML(homeRoute);
  fs.writeFileSync(mainIndexPath, html);
  console.log("✅ Created main index.html with SEO content");
}

console.log(`\n🎉 Generated ${allRoutes.length} static HTML pages for SEO!`);
console.log("\n📝 Next steps:");
console.log("1. Deploy your site to see the changes");
console.log('2. Test with: curl -A "Googlebot" https://www.istanbullv.com/');
console.log("3. Request reindexing in Google Search Console");
console.log("4. Monitor indexing status over the next few days");
