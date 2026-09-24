import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, X, FileText, ExternalLink, Award } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { certificateUrl } from '../lib/assets.js';
import { useBodyScrollLock } from '../lib/hooks.js';
import SectionHeading from './SectionHeading.jsx';
import Reveal from './Reveal.jsx';
import { certificates } from '../data/certificates.js';
import './Certifications.css';

function CertGrid({ onPick }) {
  return (
    <div className="certs__grid">
      {certificates.map((cert, i) => {
        const url = certificateUrl(cert.file);
        return (
          <Reveal key={cert.id} delay={Math.min((i % 4) * 0.05, 0.2)} y={22}>
            <button
              type="button"
              className="cert card"
              onClick={() => onPick(i)}
              aria-haspopup="dialog"
              aria-label={`Open certificate: ${cert.title}`}
            >
              <span className="cert__preview">
                <CertPreview cert={cert} url={url} />
              </span>
              <span className="cert__meta">
                <span className="cert__title">{cert.title}</span>
                <span className="cert__issuer">{cert.issuer}</span>
                <span className="cert__year mono">{cert.year}</span>
              </span>
            </button>
          </Reveal>
        );
      })}
    </div>
  );
}

function CertPreview({ cert, url }) {
  const [failed, setFailed] = useState(false);

  if (cert.kind === 'pdf') {
    return (
      <span className="cert-preview cert-preview--doc" aria-hidden="true">
        <FileText size={34} />
        <span className="cert-preview__badge">PDF</span>
      </span>
    );
  }

  if (!url || failed) {
    return (
      <span className="cert-preview cert-preview--doc" aria-hidden="true">
        <Award size={34} />
        <span className="cert-preview__badge">IMG</span>
      </span>
    );
  }

  return (
    <img
      src={url}
      alt=""
      loading="lazy"
      onError={() => setFailed(true)}
      className="cert-preview__img"
    />
  );
}

export default function Certifications() {
  const [open, setOpen] = useState(null);

  const close = useCallback(() => setOpen(null), []);
  const prev = useCallback(() => setOpen((o) => (o === null ? o : (o - 1 + certificates.length) % certificates.length)), []);
  const next = useCallback(() => setOpen((o) => (o === null ? o : (o + 1) % certificates.length)), []);

  return (
    <section className="section certifications" id="certifications">
      <div className="container">
        <SectionHeading
          index="06"
          eyebrow="Certifications"
          title={<>Verified by <span className="gradient-text">recognized programs</span></>}
          description="Testing, Java, AI-ML, Android and cybersecurity credentials — click any card to view the certificate."
        />
        <CertGrid onPick={setOpen} />
      </div>

      <AnimatePresence>
        {open !== null && (
          <CertModal
            index={open}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function CertModal({ index, onClose, onPrev, onNext }) {
  const cert = certificates[index];
  const url = certificateUrl(cert.file);
  const dialogRef = useRef(null);
  const reduce = useReducedMotion();
  const [failed, setFailed] = useState(false);

  useBodyScrollLock(true);

  useEffect(() => {
    dialogRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose, onPrev, onNext]);

  useEffect(() => {
    setFailed(cert.kind !== 'pdf' && !url);
  }, [cert, url]);

  const showImage = cert.kind !== 'pdf' && url && !failed;

  return (
    <motion.div
      className="cert-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`${cert.title} — certificate`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
    >
      <div className="cert-modal__backdrop" onClick={onClose} aria-hidden="true" />

      <motion.div
        ref={dialogRef}
        tabIndex={-1}
        className="cert-modal__dialog card"
        role="document"
        initial={reduce ? false : { opacity: 0, scale: 0.96, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={reduce ? undefined : { opacity: 0, scale: 0.97, y: 8 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="cert-modal__toolbar">
          <span className="cert-modal__counter mono">
            {String(index + 1).padStart(2, '0')} / {String(certificates.length).padStart(2, '0')}
          </span>
          <div className="cert-modal__arrows">
            <button type="button" onClick={onPrev} aria-label="Previous certificate">
              <ChevronLeft size={18} />
            </button>
            <button type="button" onClick={onNext} aria-label="Next certificate">
              <ChevronRight size={18} />
            </button>
          </div>
          <button type="button" className="cert-modal__close" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        </div>

        <div className="cert-modal__preview">
          {cert.kind === 'pdf' ? (
            <div className="cert-modal__doc">
              <FileText size={54} />
              <span>PDF certificate</span>
            </div>
          ) : showImage ? (
            <img
              src={url}
              alt={`${cert.title} certificate from ${cert.issuer}`}
              onError={() => setFailed(true)}
            />
          ) : (
            <div className="cert-modal__doc">
              <Award size={54} />
              <span>Certificate image appears here once the file is added</span>
            </div>
          )}
        </div>

        <div className="cert-modal__info">
          <h3>{cert.title}</h3>
          <p className="cert-modal__issuer">{cert.issuer}</p>
          <div className="cert-modal__meta mono">
            {cert.sub && <span>{cert.sub}</span>}
            <span>
              {cert.duration
                ? cert.duration
                : cert.issueDate
                  ? `Issued ${cert.issueDate}`
                  : cert.year}
            </span>
          </div>

          <div className="cert-modal__actions">
            <span className="cert-modal__year mono">{cert.year}</span>
            {url && (
              <a className="btn btn--ghost cert-modal__open" href={url} target="_blank" rel="noreferrer">
                Open original
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}