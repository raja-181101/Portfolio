import { ArrowUp } from 'lucide-react';
import { useScrolledPast } from '../lib/hooks.js';
import './Overlays.css';

export default function BackToTop() {
  const show = useScrolledPast(640);

  const onClick = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  };

  return (
    <button
      type="button"
      className={`back-to-top ${show ? 'back-to-top--show' : ''}`}
      onClick={onClick}
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
    >
      <ArrowUp size={18} />
    </button>
  );
}