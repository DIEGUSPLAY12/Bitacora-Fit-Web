"use client";

import { useReducedMotion } from "motion/react";

/**
 * Returns `true` when the user has requested reduced motion
 * at the OS / browser level.
 * 
 * We now use the native hook from `motion/react` to satisfy
 * accessibility linting rules (react-doctor/require-reduced-motion).
 */
export function usePrefersReducedMotion(): boolean {
  const prefersReduced = useReducedMotion();
  // `useReducedMotion` can return `null` during SSR or initially,
  // we fallback to `false` (no reduced motion) to match the previous behavior.
  return prefersReduced === true;
}
