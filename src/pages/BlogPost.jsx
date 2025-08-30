import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
// Removed react-syntax-highlighter for performance - using simple code blocks
import { Helmet } from "react-helmet";
import { useParams, Link } from "react-router-dom";
// Removed framer-motion for performance
import postsData from "../data/posts.json";
import RelatedLinks from "../components/RelatedLinks";

function getRelatedLinks(currentSlug) {
  // Define some curated related links for each main post
  const relatedMap = {
    "baklava-unwrapped": [
      {
        to: "/shawarma",
        title: "Shawarma: Everything You Need to Know",
        description: "Dive into the history and flavors of shawarma.",
      },
      {
        to: "/turkish-food",
        title: "Turkish Food: A Mediterranean Treasure",
        description: "Explore the staples of Turkish culinary heritage.",
      },
      {
        to: "/blog-posts/what-is-falafel-what-is-it-made-from-which-cuisine",
        title: "Falafel: Origins and Ingredients",
        description: "Discover why falafel is a global vegan favorite.",
      },
    ],
    "what-is-falafel-what-is-it-made-from-which-cuisine": [
      {
        to: "/shawarma",
        title: "Shawarma: Everything You Need to Know",
        description: "Dive into the history and flavors of shawarma.",
      },
      {
        to: "/blog-posts/baklava-unwrapped",
        title: "Baklava: The Sweetest Legacy",
        description:
          "Uncover the rich history of baklava from empire to table.",
      },
      {
        to: "/turkish-food",
        title: "Turkish Food: A Mediterranean Treasure",
        description: "Explore the staples of Turkish culinary heritage.",
      },
    ],
    "shawarma-vs-doner-kebab": [
      {
        to: "/blog-posts/baklava-unwrapped",
        title: "Baklava: The Sweetest Legacy",
        description:
          "Uncover the rich history of baklava from empire to table.",
      },
      {
        to: "/turkish-food",
        title: "Turkish Food: A Mediterranean Treasure",
        description: "Explore the staples of Turkish culinary heritage.",
      },
      {
        to: "/blog-posts/what-is-falafel-what-is-it-made-from-which-cuisine",
        title: "Falafel: Origins and Ingredients",
        description: "Discover why falafel is a global vegan favorite.",
      },
    ],
    // Default fallback:
    default: [
      {
        to: "/shawarma",
        title: "Shawarma: Everything You Need to Know",
        description: "Dive into the history and flavors of shawarma.",
      },
      {
        to: "/blog-posts/baklava-unwrapped",
        title: "Baklava: The Sweetest Legacy",
        description:
          "Uncover the rich history of baklava from empire to table.",
      },
      {
        to: "/turkish-food",
        title: "Turkish Food: A Mediterranean Treasure",
        description: "Explore the staples of Turkish culinary heritage.",
      },
    ],
  };
  return relatedMap[currentSlug] || relatedMap["default"];
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const postMeta = postsData.find((p) => p.slug === slug);
    if (!postMeta) {
      setLoading(false);
      return;
    }

    setPost(postMeta);

    // Load markdown content
    fetch(`/content/blog/${slug}.md`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Post not found");
        }
        return response.text();
      })
      .then((markdownContent) => {
        // Extract content after frontmatter
        const contentMatch = markdownContent.match(
          /^---\s*\n.*?\n---\s*\n(.*)/s
        );
        const extractedContent = contentMatch
          ? contentMatch[1]
          : markdownContent;
        setContent(extractedContent);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error loading post:", error);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Post Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link
            to="/blog-posts"
            className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition-colors"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Fallbacks
  const coverSrc = post.cover || post.image || "/default-cover.jpg";
  const author = post.author || "Istanbul Mediterranean";
  const readingTime =
    post.readingTime || Math.ceil(content.split(" ").length / 200) || 1;

  // Only generate TOC if contentHtml exists
  const tableOfContents = [];

  return (
    <article className="max-w-3xl mx-auto px-2 md:px-6 py-8 md:py-14 bg-white/80 rounded-3xl shadow-xl border border-herb/10 relative z-10">
      <div className="mb-8 flex justify-between items-center sticky top-4 z-30">
        <Link
          to="/blog-posts"
          className="inline-flex items-center text-primary hover:text-istanbulRed font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-istanbulRed rounded-lg px-3 py-2 bg-white/90 shadow hover:shadow-lg"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Blog
        </Link>
      </div>
      <Helmet>
        <title>{post.title} | Istanbul Mediterranean Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={coverSrc} />
        <meta property="og:type" content="article" />
        <meta
          property="og:url"
          content={`https://istanbullv.com/blog-posts/${post.slug}`}
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={coverSrc} />
        <link
          rel="canonical"
          href={`https://istanbullv.com/blog-posts/${post.slug}`}
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: post.title,
            image: coverSrc,
            author: { "@type": "Person", name: author },
            publisher: {
              "@type": "Organization",
              name: "Istanbul Mediterranean",
              logo: {
                "@type": "ImageObject",
                url: "https://istanbullv.com/logo.png",
              },
            },
            datePublished: post.date,
            description: post.excerpt,
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <motion.div
        className="relative h-72 md:h-[32rem] rounded-3xl overflow-hidden mb-10 shadow-2xl group"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        whileHover={{ scale: 1.015 }}
      >
        <img
          src={coverSrc}
          alt={post.title}
          className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end pb-10 px-6 md:px-16">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg mb-2 animate-fade-in">
            {post.title}
          </h1>
          <p className="text-lg md:text-2xl text-white/90 font-medium drop-shadow mb-2 animate-fade-in delay-200">
            {post.excerpt}
          </p>
        </div>
      </motion.div>

      {/* Meta & TOC Grid */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div className="flex flex-wrap gap-3 mb-8">
          <span className="inline-flex items-center gap-2 bg-herb/10 text-herb font-semibold px-4 py-2 rounded-full text-xs shadow-sm">
            <svg
              className="w-4 h-4 text-herb"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M12 6v6l4 2" />
            </svg>
            {post.date}
          </span>
          <span className="inline-flex items-center gap-2 bg-primary/10 text-primary font-semibold px-4 py-2 rounded-full text-xs shadow-sm">
            <svg
              className="w-4 h-4 text-primary"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
            </svg>
            {readingTime} min read
          </span>
          <span className="inline-flex items-center gap-2 bg-istanbulRed/10 text-istanbulRed font-semibold px-4 py-2 rounded-full text-xs shadow-sm">
            <svg
              className="w-4 h-4 text-istanbulRed"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <circle cx="12" cy="7" r="4" />
              <path d="M5.5 21a7.5 7.5 0 0 1 13 0" />
            </svg>
            by {author}
          </span>
        </div>
        {/* TOC placeholder or actual TOC if contentHtml exists */}
        {tableOfContents.length > 0 && (
          <nav className="hidden md:block">
            <h2 className="font-semibold text-primary mb-2">On This Page</h2>
            <ul className="space-y-2 text-charcoal">
              {tableOfContents.map((item) => (
                <li key={item.id}>
                  <a href={`#${item.id}`} className="hover:text-primary">
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Content */}
      <div
        className="prose prose-lg max-w-none text-charcoal font-sans"
        style={{ color: "#222" }}
      >
        <style>{`
          .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
            color: #222 !important;
            font-weight: bold !important;
            font-family: 'Inter', 'Segoe UI', Arial, sans-serif !important;
            letter-spacing: -0.01em;
          }
          .prose strong {
            color: #222 !important;
            font-weight: bold !important;
          }
          .prose table, .prose th, .prose td {
            color: #222 !important;
            border-color: #bbb !important;
          }
          .prose em {
            color: #444 !important;
          }
          .prose {
            --tw-prose-headings: #222 !important;
            --tw-prose-bold: #222 !important;
            --tw-prose-body: #222 !important;
            --tw-prose-links: #b91c1c !important;
            font-size: 1.18rem;
            line-height: 1.8;
            letter-spacing: 0.01em;
          }
          .prose a {
            color: #b91c1c !important;
            font-weight: 600;
            border-bottom: 1.5px solid #b91c1c22;
            transition: color 0.2s, border-color 0.2s;
          }
          .prose a:hover {
            color: #222 !important;
            border-color: #b91c1c;
            background: #fff8f8;
          }
        `}</style>
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{}}
        >
          {content}
        </ReactMarkdown>

        {/* Subtle internal link for gyros post only */}
        {post.slug === "history-and-variations-of-gyros" && (
          <div className="my-8 p-4 rounded-lg bg-herb/10 border-l-4 border-istanbulRed">
            <span className="block mb-1 font-semibold text-istanbulRed">
              Want to learn more about Mediterranean desserts?
            </span>
            <a
              href="https://www.istanbullv.com/blog-posts/baklava-unwrapped"
              className="text-primary underline hover:text-istanbulRed font-medium"
              rel="noopener noreferrer"
              target="_blank"
            >
              Read our Baklava Origins article →
            </a>
          </div>
        )}
      </div>

      {/* Related Links */}
      <RelatedLinks links={getRelatedLinks(slug)} />

      {/* Back to Blog */}
      <div className="mt-12 text-center">
        <Link to="/blog-posts" className="text-primary hover:underline">
          ← Back to Blog
        </Link>
      </div>
    </article>
  );
}
