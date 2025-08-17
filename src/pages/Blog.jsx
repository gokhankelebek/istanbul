import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import postsData from '../data/posts.json';
import menu from '../data/menu.json';
import SEOHead from '../components/SEOHead';
import StructuredDataManager from '../components/StructuredDataManager';

function getFeaturedAndRest(posts) {
  if (posts.length >= 3) {
    return {
      featured: posts[0],
      rest: posts.slice(1)
    };
  }
  return { featured: null, rest: posts };
}

export default function Blog() {
  // Generate structured data for the blog page
  const blogData = {
    name: "Istanbul Mediterranean Blog",
    description: "Stories, flavors, and Mediterranean inspiration from Las Vegas",
    url: "https://www.istanbullv.com/blog",
    author: {
      name: "Istanbul Mediterranean Team",
      url: "https://www.istanbullv.com/about"
    },
    publisher: {
      name: "Istanbul Mediterranean Restaurant",
      logo: "https://www.istanbullv.com/logo.png"
    }
  };

  // Generate ItemList data for blog posts
  const itemListData = {
    name: "Blog Posts",
    description: "Latest articles about Turkish food, Mediterranean cuisine, and halal dining in Las Vegas",
    numberOfItems: postsData.length,
    itemListElement: postsData.map((post, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Article",
        name: post.title,
        url: `https://www.istanbullv.com/blog-posts/${post.slug}`,
        description: post.excerpt,
        author: {
          "@type": "Person",
          name: post.author
        },
        datePublished: post.date,
        image: post.cover ? `https://www.istanbullv.com${post.cover}` : undefined
      }
    }))
  };

  // Generate BreadcrumbList data
  const breadcrumbData = {
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.istanbullv.com"
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: "https://www.istanbullv.com/blog"
      }
    ]
  };

  // Aggregate all schema types for the blog page
  const aggregateSchemaData = [
    { type: 'blog', data: blogData },
    { type: 'itemList', data: itemListData },
    { type: 'breadcrumb', data: breadcrumbData }
  ];

  return (
    <>
      <SEOHead 
        title="Istanbul Mediterranean Blog | Turkish Food Stories & Mediterranean Cuisine"
        description="Discover authentic Turkish food stories, Mediterranean cuisine insights, and halal dining tips from Istanbul Mediterranean in Las Vegas. Read our latest blog posts about döner kebab, shawarma, baklava, and more."
        keywords="turkish food blog, mediterranean cuisine blog, halal food las vegas, doner kebab blog, shawarma blog, baklava blog, mediterranean food blog"
        canonicalUrl="https://www.istanbullv.com/blog"
        ogType="website"
        ogImage="https://www.istanbullv.com/blog-hero.jpg"
      />
      <StructuredDataManager type="aggregate" data={aggregateSchemaData} />
      
      <div className="bg-offwhite min-h-screen">
        <div className="w-full min-h-screen bg-gradient-to-br from-istanbulRed/5 via-offwhite to-primary/5 pb-16">
          {/* Blog Hero Section */}
          <div className="relative h-64 md:h-80 flex items-center justify-center mb-16">
            <img src="/menu/blog-hero.webp" alt="Istanbul Mediterranean Turkish food blog featuring authentic recipes, halal cuisine, and Mediterranean cooking tips from Las Vegas" className="absolute inset-0 w-full h-full object-cover object-center opacity-70" onError={e => e.target.style.display='none'} />
            <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 to-transparent" />
            <div className="relative z-10 text-center w-full">
              <h1 className="text-5xl md:text-6xl font-extrabold text-primary drop-shadow mb-4">Istanbul Blog</h1>
              <p className="text-lg md:text-2xl text-charcoal font-medium drop-shadow">Stories, flavors, and Mediterranean inspiration from Las Vegas</p>
            </div>
          </div>
          {/* Featured Post */}
          {(getFeaturedAndRest(postsData).featured) && (
            <div className="max-w-5xl mx-auto mb-16 px-4">
              <div className="relative flex flex-col md:flex-row rounded-3xl overflow-hidden shadow-2xl border border-herb/10 bg-white hover:scale-[1.015] transition-transform duration-200 group">
                <div className="md:w-2/5 relative">
                  <img src={getFeaturedAndRest(postsData).featured.cover || '/blog-default.jpg'} alt={getFeaturedAndRest(postsData).featured.title} className="h-60 md:h-full w-full object-cover object-center group-hover:brightness-105 transition duration-200" onError={e => e.target.src='/blog-default.jpg'} />
                  <div className="absolute inset-0 bg-gradient-to-t from-istanbulRed/20 via-transparent to-transparent" />
                </div>
                <div className="flex-1 flex flex-col p-8">
                  <span className="uppercase text-xs text-istanbulRed font-bold mb-2 tracking-widest">Featured</span>
                  <h2 className="text-3xl font-bold mb-2 text-primary group-hover:text-istanbulRed transition-colors">
                    <Link to={`/blog-posts/${getFeaturedAndRest(postsData).featured.slug}`}>{getFeaturedAndRest(postsData).featured.title}</Link>
                  </h2>
                  <p className="text-xs text-herb mb-3">{getFeaturedAndRest(postsData).featured.date}</p>
                  <p className="text-charcoal mb-4 flex-1">{getFeaturedAndRest(postsData).featured.excerpt}</p>
                  <div className="mt-auto">
                    <Link to={`/blog-posts/${getFeaturedAndRest(postsData).featured.slug}`} className="inline-block px-5 py-2 rounded bg-primary text-offwhite font-semibold shadow hover:bg-istanbulRed hover:text-offwhite transition-colors duration-150">Read More</Link>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Blog Grid */}
          <div className="max-w-6xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-10 text-center text-primary">Other Posts</h1>
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
              {getFeaturedAndRest(postsData).rest.map(post => {
  // Normalize slugs for matching
  const normalize = s => s && s.toLowerCase().replace(/[-_]/g, '');
  const postSlug = normalize(post.slug);
  const match = menu.find(item => postSlug.includes(normalize(item.slug)));
  const img = post.cover || (match ? match.img : '/blog-default.jpg');
  return (
    <div key={post.slug} className="rounded-3xl overflow-hidden shadow-xl border border-herb/10 bg-white flex flex-col hover:scale-[1.015] transition-transform duration-200 group">
      <div className="h-48 w-full relative">
        <img
          src={img}
          alt={post.title}
          className="h-full w-full object-cover object-center group-hover:brightness-105 transition duration-200"
          onError={e => (e.target.src = '/blog-default.jpg')}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-istanbulRed/20 via-transparent to-transparent" />
      </div>
      <div className="flex-1 flex flex-col p-6">
        <h2 className="text-xl font-bold mb-2 text-primary group-hover:text-istanbulRed transition-colors">
          <Link to={`/blog-posts/${post.slug}`}>{post.title}</Link>
        </h2>
        <p className="text-xs text-herb mb-3">{post.date}</p>
        <p className="text-charcoal mb-4 flex-1">{post.excerpt}</p>
        <div className="mt-auto">
          <Link to={`/blog-posts/${post.slug}`} className="inline-block px-4 py-2 rounded bg-istanbulRed text-white font-semibold shadow hover:bg-primary hover:text-offwhite transition-colors duration-150">Read More</Link>
        </div>
      </div>
    </div>
  );
})}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
