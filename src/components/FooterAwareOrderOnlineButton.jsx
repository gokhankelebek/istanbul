import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { ORDER_LINKS } from "../lib/orderLinks";

const AD_LANDING_REGEX = /^(\/yelp|\/google|\/facebook|\/instagram|\/tiktok|\/tripadvisor)(\/|$)/;

export default function FooterAwareOrderOnlineButton() {
  const [show, setShow] = useState(true);
  const footerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // If on an ad landing page, never show the sticky button
    if (AD_LANDING_REGEX.test(location.pathname)) {
      setShow(false);
      return;
    }
    footerRef.current = document.querySelector("footer");
    if (!footerRef.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setShow(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.01,
      }
    );
    observer.observe(footerRef.current);
    return () => observer.disconnect();
  }, [location.pathname]);

  // Hide on all ad landing pages (/yelp, /google, /facebook, /instagram, /tiktok, /tripadvisor)
  if (AD_LANDING_REGEX.test(location.pathname)) return null;
  const href = ORDER_LINKS.default;
  // Only show on mobile (hamburger menu)
  return show ? (
    <div className="fixed bottom-0 left-0 w-full z-50 flex justify-center md:hidden rounded-xl">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order Online Sticky CTA"
        className="text-offwhite font-poppins font-semibold py-3 px-8 rounded-xl shadow-lg m-2 text-lg transition-all"
        style={{ minWidth: "220px", textAlign: "center", background: "#BE1E2D" }}
      >
        Order Online
      </a>
    </div>
  ) : null;
}

