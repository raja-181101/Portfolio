import SocialRow from './SocialLinks.jsx';
import { site } from '../data/site.js';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <span className="footer__name">
            {site.name.split(' ')[0]} <span className="gradient-text">{site.name.split(' ')[1]}</span>
          </span>
          <span className="footer__role mono">Java Developer</span>
        </div>

        <SocialRow size="sm" />

        <div className="footer__meta">
          <span className="footer__line">Designed & Built with React</span>
          <span className="footer__sep" aria-hidden="true" />
          <span className="footer__copy mono">© 2026 Rajapandu M · Hyderabad</span>
        </div>
      </div>
    </footer>
  );
}