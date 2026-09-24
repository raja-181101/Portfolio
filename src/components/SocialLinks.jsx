import { FaLinkedin, FaJava } from 'react-icons/fa';
import { SiGithub, SiLeetcode, SiHackerrank } from 'react-icons/si';
import { socials } from '../data/site.js';

function Icon({ label }) {
  switch (label) {
    case 'GitHub':
      return <SiGithub size={20} aria-hidden="true" />;
    case 'LinkedIn':
      return <FaLinkedin size={19} aria-hidden="true" />;
    case 'LeetCode':
      return <SiLeetcode size={19} aria-hidden="true" />;
    case 'HackerRank':
      return <SiHackerrank size={19} aria-hidden="true" />;
    case 'Java':
      return <FaJava size={19} aria-hidden="true" />;
    default:
      return null;
  }
}

function Link({ entry, size = 'md' }) {
  return (
    <a
      href={entry.url}
      target="_blank"
      rel="noreferrer"
      className={`social-link social-link--${size}`}
      aria-label={`${entry.label} — opens in a new tab`}
    >
      <Icon label={entry.label} />
    </a>
  );
}

/** Icon-only row of social/profile links. */
export function SocialRow({ size = 'md', className = '' }) {
  const order = ['github', 'linkedin', 'leetcode', 'hackerrank'];
  return (
    <div className={`social-row ${className}`}>
      {order.map((key) => (
        <Link key={key} entry={socials[key]} size={size} />
      ))}
    </div>
  );
}

export default SocialRow;