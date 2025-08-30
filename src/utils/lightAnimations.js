/**
 * Lightweight Animation Utilities
 * Replaces framer-motion with CSS-based animations
 * Bundle impact: ~2KB vs 200KB+
 */

import React from "react";

// Simple animation classes for CSS transitions
export const animationClasses = {
  fadeIn: "animate-fade-in",
  slideUp: "animate-slide-up",
  slideDown: "animate-slide-down",
  slideLeft: "animate-slide-left",
  slideRight: "animate-slide-right",
  scale: "animate-scale",
  bounce: "animate-bounce-gentle",
};

// Intersection Observer for scroll animations
export class ScrollAnimator {
  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
            entry.target.classList.remove("animate-out");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );
  }

  observe(element) {
    if (element) {
      this.observer.observe(element);
    }
  }

  unobserve(element) {
    if (element) {
      this.observer.unobserve(element);
    }
  }

  disconnect() {
    this.observer.disconnect();
  }
}

// React hook for scroll animations
export const useScrollAnimation = () => {
  const elementRef = React.useRef(null);
  const animatorRef = React.useRef(null);

  React.useEffect(() => {
    if (!animatorRef.current) {
      animatorRef.current = new ScrollAnimator();
    }

    const element = elementRef.current;
    if (element) {
      animatorRef.current.observe(element);
    }

    return () => {
      if (element && animatorRef.current) {
        animatorRef.current.unobserve(element);
      }
    };
  }, []);

  React.useEffect(() => {
    return () => {
      if (animatorRef.current) {
        animatorRef.current.disconnect();
      }
    };
  }, []);

  return elementRef;
};

// Simple spring animation utility
export const createSpringTransition = (
  duration = 300,
  easing = "cubic-bezier(0.4, 0, 0.2, 1)"
) => ({
  transition: `all ${duration}ms ${easing}`,
});

// Stagger animation helper
export const staggerChildren = (delay = 100) => ({
  "--stagger-delay": `${delay}ms`,
});
