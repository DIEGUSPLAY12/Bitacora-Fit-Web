"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  /** CSS selector for child elements to stagger (optional). */
  staggerSelector?: string;
  /** Delay between staggered children in seconds. */
  staggerDelay?: number;
  /** Whether the user prefers reduced motion. */
  reducedMotion: boolean;
}

/**
 * Attaches a GSAP ScrollTrigger reveal animation to the referenced element.
 *
 * - Fades in from opacity 0 + translateY 24px → visible.
 * - Fires once when the top of the element hits 80% of the viewport.
 * - If `staggerSelector` is provided, animates matching children with stagger.
 * - If `reducedMotion` is true, elements are shown immediately without animation.
 */
export function useScrollReveal<T extends HTMLElement>({
  staggerSelector,
  staggerDelay = 0.1,
  reducedMotion,
}: ScrollRevealOptions) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If user prefers reduced motion, make everything visible immediately
    if (reducedMotion) {
      gsap.set(el, { opacity: 1, y: 0 });
      if (staggerSelector) {
        gsap.set(el.querySelectorAll(staggerSelector), { opacity: 1, y: 0 });
      }
      return;
    }

    const targets = staggerSelector
      ? el.querySelectorAll(staggerSelector)
      : el;

    // Set initial state
    gsap.set(targets, { opacity: 0, y: 24 });

    const tween = gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out",
      stagger: staggerSelector ? staggerDelay : 0,
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none none",
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reducedMotion, staggerSelector, staggerDelay]);

  return ref;
}
