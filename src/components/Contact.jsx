import { useMemo, useState } from 'react';
import { Send, Mail, Copy, Check, MapPin, ArrowUpRight } from 'lucide-react';
import { useCopy } from '../lib/hooks.js';
import { buildMailtoUri } from '../lib/mailto.js';
import SectionHeading from './SectionHeading.jsx';
import Reveal from './Reveal.jsx';
import SocialRow from './SocialLinks.jsx';
import { site, socials } from '../data/site.js';
import './Contact.css';

const ROLES = ['Java Development', 'Backend Development', 'Spring Boot', 'Software Engineering', 'Test Automation'];

/**
 * CONTACT FORM NOTE
 * ----------------
 * No backend or email service is wired up yet, so this form intentionally
 * opens the visitor's email client via a mailto: link — it never pretends a
 * message was sent.
 *
 * To connect a real endpoint later, replace the `onSubmit` handler here with
 * a fetch() to Formspree / EmailJS / a custom Spring Boot endpoint. The
 * `payload` object below already contains the parsed fields.
 */
export default function Contact() {
  const { copied, copy } = useCopy();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [error, setError] = useState('');

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const payload = useMemo(() => form, [form]);

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, subject, message } = form;
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in your name, email and a message before sending.');
      return;
    }
    setError('');

    const uri = buildMailtoUri(form, site.email);

    // Integration point: replace with fetch('https://formspree.io/f/XXXX', { method: 'POST', body: JSON.stringify(payload) }) or EmailJS.
    const open = () => {
      window.location.href = uri;
    };

    // Small delay keeps the button press state visible on slower machines.
    setTimeout(open, 40);
  };

  return (
    <section className="section contact" id="contact">
      <div className="container">
        <SectionHeading
          index="10"
          eyebrow="Contact"
          title={<>Let's build something <span className="gradient-text">great together</span></>}
          align="left"
        />

        <div className="contact__grid">
          <div className="contact__info">
            <Reveal delay={0.05}>
              <p className="contact__lead">
                I'm currently open to opportunities and collaborations in{' '}
                <strong>
                  {ROLES.slice(0, 4).join(', ')} and {ROLES[4]}
                </strong>
                . If you're hiring a Java/backend engineer or building something interesting,
                let's talk.
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="contact__channel">
                <span className="contact__channel-label mono">Email</span>
                <button
                  type="button"
                  className="contact__email-card"
                  onClick={() => copy(site.email)}
                  aria-label={`Copy email address ${site.email}`}
                >
                  <span className="contact__email-icon">
                    <Mail size={17} aria-hidden="true" />
                  </span>
                  <span className="contact__email-value">{site.email}</span>
                  {copied ? (
                    <span className="contact__copied mono">
                      <Check size={13} aria-hidden="true" />
                      Copied
                    </span>
                  ) : (
                    <Copy size={15} className="contact__copy-icon" aria-hidden="true" />
                  )}
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <p className="contact__location">
                <MapPin size={15} aria-hidden="true" />
                Hyderabad, Telangana, India
              </p>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="contact__socials">
                <SocialRow />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12} y={26}>
            <form className="contact__form card" onSubmit={onSubmit} noValidate>
              <div className="contact__field">
                <label htmlFor="cf-name">Name</label>
                <input
                  id="cf-name"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={set('name')}
                  autoComplete="name"
                />
              </div>

              <div className="contact__field">
                <label htmlFor="cf-email">Email</label>
                <input
                  id="cf-email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={set('email')}
                  autoComplete="email"
                />
              </div>

              <div className="contact__field">
                <label htmlFor="cf-subject">Subject</label>
                <input
                  id="cf-subject"
                  type="text"
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={set('subject')}
                />
              </div>

              <div className="contact__field">
                <label htmlFor="cf-message">Message</label>
                <textarea
                  id="cf-message"
                  rows={5}
                  placeholder="Tell me about the role or project…"
                  value={form.message}
                  onChange={set('message')}
                />
              </div>

              {error && (
                <p className="contact__error" role="alert">
                  {error}
                </p>
              )}

              <button type="submit" className="btn btn--primary contact__submit">
                <Send size={16} aria-hidden="true" />
                Send Message
              </button>

              <p className="contact__notice mono">
                This form opens your email client — no server is configured yet.
              </p>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}