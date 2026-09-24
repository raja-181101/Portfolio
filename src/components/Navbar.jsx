import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, Download } from 'lucide-react';
import { useActiveSection, useBodyScrollLock, useScrolledPast } from '../lib/hooks.js';
import { resumeUrl } from '../lib/assets.js';
import './Navbar.css';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certificates' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const ids = useMemo(() => NAV_ITEMS.map((i) => i.id), []);
  const active = useActiveSection(ids);
  const scrolled = useScrolledPast(24);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const resume = resumeUrl();

  useBodyScrollLock(open);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) {
      document.querySelector('.nav-mobile .nav-mobile__link')?.focus();
    }
  }, [open]);

  const goto = (id) => (e) => {
    e.preventDefault();
    setOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
    }
  };

  return (
    <motion.header
      className={`nav ${scrolled ? 'nav--scrolled' : ''}`}
      initial={{ y: -70, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container nav__inner">
        <a href="#home" className="nav__logo" onClick={goto('home')} aria-label="Rajapandu M — back to top">
          <span className="nav__logo-text">
            RM<span className="nav__logo-dot">.</span>
          </span>
        </a>

        <nav className="nav__links" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`nav__link ${active === item.id ? 'nav__link--active' : ''}`}
              onClick={goto(item.id)}
              aria-current={active === item.id ? 'true' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <a
            className="btn btn--ghost nav__resume"
            href={resume || '#contact'}
            onClick={resume ? undefined : goto('contact')}
            download={resume ? 'Rajapandu-M-Resume.pdf' : undefined}
            aria-label="Download resume"
          >
            <Download size={16} aria-hidden="true" />
            <span>Resume</span>
          </a>

          <button
            type="button"
            className="nav__toggle"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            className="nav-mobile"
            aria-label="Mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            <div className="container nav-mobile__list">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`nav-mobile__link ${active === item.id ? 'nav-mobile__link--active' : ''}`}
                  onClick={goto(item.id)}
                  initial={false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                  tabIndex={open ? 0 : -1}
                >
                  <span className="nav-mobile__index">0{i + 1}</span> {item.label}
                </motion.a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}