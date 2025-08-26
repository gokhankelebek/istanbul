import React, { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import matter from "gray-matter";
import { marked } from "marked";
import DOMPurify from "dompurify";

// Dynamic MD-driven marketing pages (About, Catering, etc.)
// Place your .md files under /public/pages, e.g. /public/pages/about.md
// Each markdown file should include YAML front-matter:
// ---
// title: "About Us"
// description: "Learn our story and mission."
// ---
// Your markdown content here.

export default function MarkdownPage({ fixedSlug }) {
  const params = useParams();
  const slug = fixedSlug || params.slug;
  const [html, setHtml] = useState(null);
  const [meta, setMeta] = useState({ title: "", description: "" });

  useEffect(() => {
    // If no slug could be resolved, mark as not found so the router can handle it
    if (!slug) {
      setHtml("not-found");
      return;
    }
    const url = `/pages/${slug}.md`;
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Not Found");
        return res.text();
      })
      .then((raw) => {
        const { data, content } = matter(raw);
        setMeta({
          title: data.title || "",
          description: data.description || "",
        });
        setHtml(DOMPurify.sanitize(marked(content)));
      })
      .catch(() => setHtml("not-found"));
  }, [slug]);

  if (html === "not-found") return <Navigate to="/not-found" replace />;
  if (html === null)
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading…
      </div>
    );

  return (
    <>
      <Helmet>
        <title>{meta.title} | Istanbul Mediterranean Halal</title>
        <meta name="description" content={meta.description} />
        <link rel="canonical" href={`https://www.istanbullv.com/${slug}`} />
      </Helmet>
      <article className="prose mx-auto py-12 px-4 sm:px-0">
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </article>
    </>
  );
}
