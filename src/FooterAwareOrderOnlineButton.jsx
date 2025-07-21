import React, { useEffect, useRef, useState } from "react";

export default function FooterAwareOrderOnlineButton() {
  const [show, setShow] = useState(true);
  const footerRef = useRef(null);

  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setShow(!entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.01,
      }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  // Only show on mobile (hamburger menu)
  return show ? (
    <div className="fixed bottom-0 left-0 w-full z-50 flex justify-center md:hidden rounded-xl">
      <a
        href="https://www.orderdoner.com/?utm_source=istanbullv&utm_medium=referral&utm_campaign=from_istanbullv"
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
