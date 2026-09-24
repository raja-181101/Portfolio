import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Active-section tracking for the navbar scroll-spy.
 * Returns the id of the section currently in the top 40% of the viewport.
 */
export function useActiveSection(ids, offsetRatio = 0.4) {
  const [active, setActive] = useState(ids[0] ?? '');
  const ticking = useRef(false);

  useEffect(() => {
    const compute = () => {
      ticking.current = false;
      const limit = window.innerHeight * offsetRatio;
      let current = ids[0] ?? '';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= limit) current = id;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(compute);
      }
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [ids, offsetRatio]);

  return active;
}

/** Locks body scroll while a boolean flag is true (mobile menu / lightbox). */
export function useBodyScrollLock(locked) {
  useEffect(() => {
    if (!locked) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [locked]);
}

/** Copy a string to the clipboard with a short-lived "copied" state. */
export function useCopy(timeout = 1800) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = useCallback(
    async (text) => {
      try {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => setCopied(false), timeout);
      } catch {
        setCopied(false);
      }
    },
    [timeout]
  );

  return { copied, copy };
}

/** Tracks whether the user has scrolled past a threshold. */
export function useScrolledPast(threshold = 320) {
  const [past, setPast] = useState(false);
  useEffect(() => {
    const onScroll = () => setPast(window.scrollY > threshold);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [threshold]);
  return past;
}