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
  /** Custom Y offset in pixels. Default: 24 */
  yOffset?: number;
  /** Custom duration in seconds. Default: 0.6 */
  duration?: number;
  /** Custom GSAP ease function. Default: "power2.out" */
  ease?: string;
  /** Optional external ref to use instead of creating a new one */
  ref?: React.RefObject<any>;
}

/**
 * Attaches a GSAP ScrollTrigger reveal animation to the referenced element.
 */
export function useScrollReveal<T extends HTMLElement>({
  staggerSelector,
  staggerDelay = 0.1,
  reducedMotion,
  yOffset = 24,
  duration = 0.6,
  ease = "power2.out",
  ref: externalRef,
}: ScrollRevealOptions) {
  const internalRef = useRef<T>(null);
  const ref = externalRef || internalRef;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

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

    gsap.set(targets, { opacity: 0, y: yOffset });

    const tween = gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: duration,
      ease: ease,
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
