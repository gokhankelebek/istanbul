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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      <article className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-16">
        {/* Back Button */}
        <div className="mb-8">
          <Link
            to="/blog-posts"
            className="inline-flex items-center text-gray-600 hover:text-red-600 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 rounded-lg px-4 py-2 bg-white shadow-sm hover:shadow-md border border-gray-200"
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
        <div className="relative h-64 md:h-80 lg:h-96 rounded-2xl overflow-hidden mb-12 shadow-xl group">
          <img
            src={coverSrc}
            alt={post.title}
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end pb-8 px-6 md:px-12">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg mb-3 leading-tight">
              {post.title}
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-medium drop-shadow max-w-3xl">
              {post.excerpt}
            </p>
          </div>
        </div>

        {/* Meta Information */}
        <div className="flex flex-wrap gap-3 mb-12">
          <span className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 font-medium px-4 py-2 rounded-full text-sm border border-blue-200">
            <svg
              className="w-4 h-4"
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
          <span className="inline-flex items-center gap-2 bg-green-50 text-green-700 font-medium px-4 py-2 rounded-full text-sm border border-green-200">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />
            </svg>
            {readingTime} min read
          </span>
          <span className="inline-flex items-center gap-2 bg-red-50 text-red-700 font-medium px-4 py-2 rounded-full text-sm border border-red-200">
            <svg
              className="w-4 h-4"
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

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-gray-100">
          <div className="prose prose-lg max-w-none font-sans">
            <style>{`
          .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
            color: #1a1a1a !important;
            font-weight: 700 !important;
            font-family: 'Inter', 'Segoe UI', Arial, sans-serif !important;
            letter-spacing: -0.02em;
            margin-top: 2rem !important;
            margin-bottom: 1rem !important;
          }
          .prose h1 {
            font-size: 2.5rem !important;
            line-height: 1.2 !important;
            margin-top: 0 !important;
            margin-bottom: 1.5rem !important;
          }
          .prose h2 {
            font-size: 2rem !important;
            line-height: 1.3 !important;
            border-bottom: 2px solid #f3f4f6;
            padding-bottom: 0.5rem;
            margin-top: 3rem !important;
          }
          .prose h3 {
            font-size: 1.5rem !important;
            line-height: 1.4 !important;
            color: #dc2626 !important;
          }
          .prose strong {
            color: #1a1a1a !important;
            font-weight: 700 !important;
          }
          .prose table, .prose th, .prose td {
            color: #1a1a1a !important;
            border-color: #e5e7eb !important;
          }
          .prose em {
            color: #4b5563 !important;
            font-style: italic;
          }
          .prose {
            --tw-prose-headings: #1a1a1a !important;
            --tw-prose-bold: #1a1a1a !important;
            --tw-prose-body: #374151 !important;
            --tw-prose-links: #dc2626 !important;
            font-size: 1.125rem;
            line-height: 1.75;
            letter-spacing: 0.01em;
            max-width: none;
          }
          .prose p {
            margin-bottom: 1.5rem !important;
            color: #374151 !important;
          }
          .prose ul, .prose ol {
            margin-bottom: 1.5rem !important;
            padding-left: 1.5rem;
          }
          .prose li {
            margin-bottom: 0.5rem !important;
            color: #374151 !important;
          }
          .prose a {
            color: #dc2626 !important;
            font-weight: 600;
            text-decoration: none;
            border-bottom: 2px solid #fecaca;
            transition: all 0.2s ease;
            padding: 0.125rem 0;
          }
          .prose a:hover {
            color: #1a1a1a !important;
            border-bottom-color: #dc2626;
            background: #fef2f2;
            border-radius: 0.25rem;
            padding: 0.125rem 0.25rem;
          }
          .prose blockquote {
            border-left: 4px solid #dc2626 !important;
            background: #fef2f2 !important;
            padding: 1rem 1.5rem !important;
            margin: 2rem 0 !important;
            border-radius: 0.5rem;
            font-style: italic;
            color: #4b5563 !important;
          }
          .prose hr {
            border-color: #e5e7eb !important;
            margin: 3rem 0 !important;
          }
          .prose code {
            background: #f3f4f6 !important;
            color: #dc2626 !important;
            padding: 0.25rem 0.5rem !important;
            border-radius: 0.25rem !important;
            font-size: 0.875rem !important;
            font-weight: 600 !important;
          }
          .prose pre {
            background: #1f2937 !important;
            color: #f9fafb !important;
            padding: 1.5rem !important;
            border-radius: 0.75rem !important;
            overflow-x: auto !important;
            margin: 2rem 0 !important;
          }
          .prose pre code {
            background: transparent !important;
            color: #f9fafb !important;
            padding: 0 !important;
          }
          /* Custom styled divs from markdown content */
          .prose div[style*="background-color"] {
            border-radius: 0.75rem !important;
            box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06) !important;
            margin: 2rem 0 !important;
            padding: 1.5rem !important;
            border-left-width: 6px !important;
            border-left-style: solid !important;
          }
          .prose div[style*="background-color"] strong {
            font-weight: 700 !important;
            color: inherit !important;
          }
          .prose div[style*="background-color"] em {
            font-style: italic !important;
            color: inherit !important;
          }
          .prose div[style*="background-color"] ul {
            margin-top: 0.75rem !important;
            margin-bottom: 0.75rem !important;
          }
          .prose div[style*="background-color"] li {
            margin-bottom: 0.5rem !important;
            color: inherit !important;
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
              <div className="my-8 p-6 rounded-lg bg-red-50 border-l-4 border-red-500">
                <span className="block mb-2 font-semibold text-red-700">
                  Want to learn more about Mediterranean desserts?
                </span>
                <a
                  href="https://www.istanbullv.com/blog-posts/baklava-unwrapped"
                  className="text-red-600 underline hover:text-red-800 font-medium"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Read our Baklava Origins article →
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Related Links */}
        <div className="mt-16">
          <RelatedLinks links={getRelatedLinks(slug)} />
        </div>

        {/* Back to Blog */}
        <div className="mt-12 text-center">
          <Link
            to="/blog-posts"
            className="inline-flex items-center text-gray-600 hover:text-red-600 font-medium transition-colors"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
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
      </article>
    </div>
  );
}
