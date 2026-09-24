import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';
import SocialRow from './SocialLinks.jsx';
import { site } from '../data/site.js';
import { profilePhotoUrl, resumeUrl } from '../lib/assets.js';
import './Hero.css';
import './SocialLinks.css';

const CHIPS = [
  { label: 'Java', cls: 'chip--tl', delay: 0 },
  { label: 'Spring Boot', cls: 'chip--tr', delay: 1.4 },
  { label: 'REST API', cls: 'chip--bl', delay: 0.7 },
  { label: 'PostgreSQL', cls: 'chip--br', delay: 2.1 },
  { label: 'Kafka', cls: 'chip--edge', delay: 0.4 },
];

const CODE_FRAGS = [
  { text: '@RestController', cls: 'frag--a' },
  { text: '@Entity', cls: 'frag--b' },
  { text: 'JWT', cls: 'frag--c' },
  { text: 'SELECT * FROM products;', cls: 'frag--d' },
  { text: 'spring.kafka', cls: 'frag--e' },
];

function RotatingTitle() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return undefined;
    const t = setInterval(() => setI((v) => (v + 1) % site.roles.length), 3400);
    return () => clearInterval(t);
  }, [reduce]);

  return (
    <div className="hero__role" aria-live="polite">
      <span className="hero__role-prefix">$</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={site.roles[i]}
          className="hero__role-text"
          initial={reduce ? false : { opacity: 0, y: 12, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={reduce ? undefined : { opacity: 0, y: -12, filter: 'blur(6px)' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          {site.roles[i]}
        </motion.span>
      </AnimatePresence>
      <span className="hero__role-caret" aria-hidden="true" />
    </div>
  );
}

function PortraitFrame({ photo, reduce }) {
  const [failed, setFailed] = useState(false);
  return (
    <motion.div
      className="portrait"
      aria-label="Rajapandu M — professional portrait"
      initial={{ opacity: 0, scale: 0.94, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="portrait__glow" aria-hidden="true" />
      <div className="portrait__ring" aria-hidden="true" />
      <div className="portrait__grid" aria-hidden="true" />
      <div className={`portrait__scan ${reduce ? 'portrait__scan--off' : ''}`} aria-hidden="true" />

      <div className="portrait__media">
        {photo && !failed ? (
          <img
            src={photo}
            alt="Portrait of Rajapandu M, Java backend developer"
            className="portrait__img"
            onError={() => setFailed(true)}
          />
        ) : (
          <div className="portrait__monogram" aria-hidden="true">
            <span>RM</span>
          </div>
        )}
        <div className="portrait__vignette" aria-hidden="true" />
        <div className="portrait__shade portrait__shade--top" aria-hidden="true" />
        <div className="portrait__shade portrait__shade--bottom" aria-hidden="true" />
        <div className="portrait__rim" aria-hidden="true" />
      </div>

      {CHIPS.map((chip) => (
        <div
          key={chip.label}
          className={`portrait__chip ${chip.cls} ${reduce ? 'portrait__chip--off' : ''}`}
          style={{ animationDelay: `${chip.delay}s` }}
        >
          <span className="portrait__chip-dot" />
          {chip.label}
        </div>
      ))}
    </motion.div>
  );
}

export default function Hero() {
  const reduce = useReducedMotion();
  const heroRef = useRef(null);
  const photo = profilePhotoUrl();
  const resume = resumeUrl();

  useEffect(() => {
    const el = heroRef.current;
    if (!el || reduce || window.matchMedia('(pointer: coarse)').matches) return;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      el.style.setProperty('--my', `${e.clientY - rect.top}px`);
    };
    el.addEventListener('mousemove', onMove, { passive: true });
    return () => el.removeEventListener('mousemove', onMove);
  }, [reduce]);

  const scrollTo = (id) => () => {
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
  };

  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero__cursor-glow" aria-hidden="true" />
      {CODE_FRAGS.map((f) => (
        <span key={f.cls} className={`hero__frag ${f.cls}`} aria-hidden="true">
          {f.text}
        </span>
      ))}

      <div className="container hero__inner">
        <div className="hero__content">
          <motion.p
            className="hero__hello"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
          >
            <span className="hero__hello-brace">{'{'}</span> {site.heroIntro}{' '}
            <span className="hero__hello-brace">{'}'}</span>
          </motion.p>

          <motion.h1
            className="hero__name"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            {site.name.split(' ')[0]} <span className="gradient-text">{site.name.split(' ')[1]}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          >
            <RotatingTitle />
          </motion.div>

          <motion.p
            className="hero__desc"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: 'easeOut' }}
          >
            {site.heroDescription}
          </motion.p>

          <motion.div
            className="hero__cta"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: 'easeOut' }}
          >
            <button type="button" className="btn btn--primary" onClick={scrollTo('projects')}>
              View My Work
              <ArrowRight size={17} aria-hidden="true" />
            </button>
            {resume ? (
              <a
                className="btn btn--ghost"
                href={resume}
                download="Rajapandu-M-Resume.pdf"
                target="_blank"
                rel="noreferrer"
              >
                <Download size={16} aria-hidden="true" />
                Download Resume
              </a>
            ) : (
              <button type="button" className="btn btn--ghost" onClick={scrollTo('contact')}>
                <Download size={16} aria-hidden="true" />
                Download Resume
              </button>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.55 }}
          >
            <p className="hero__socials-label">Find me on</p>
            <SocialRow />
          </motion.div>
        </div>

        <div className="hero__portrait-wrap">
          <PortraitFrame photo={photo} reduce={reduce} />
        </div>
      </div>

      <motion.div
        className="hero__scroll"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
      >
        <span className="hero__scroll-mouse">
          <span className="hero__scroll-wheel" />
        </span>
        <span className="hero__scroll-text">Scroll</span>
      </motion.div>
    </section>
  );
}