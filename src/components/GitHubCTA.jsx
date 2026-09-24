import { useEffect, useState } from 'react';
import { ArrowUpRight, RefreshCw } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import SectionHeading from './SectionHeading.jsx';
import Reveal from './Reveal.jsx';
import './GithubCTA.css';

export default function GitHubCTA() {
  const [stats, setStats] = useState(null);
  const [state, setState] = useState('loading');

  useEffect(() => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 6000);

    fetch('https://api.github.com/users/raja-181101', { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('GitHub API unavailable');
        return res.json();
      })
      .then((data) => {
        setStats({ repos: data.public_repos });
        setState('ok');
      })
      .catch(() => setState('error'))
      .finally(() => clearTimeout(timer));

    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, []);

  return (
    <section className="section github-cta" id="github">
      <div className="container">
        <SectionHeading
          index="05"
          eyebrow="Open Source"
          title={<>More on <span className="gradient-text">GitHub</span></>}
          align="center"
        />

        <Reveal>
          <div className="github-cta__panel card">
            <div className="github-cta__orb" aria-hidden="true" />
            <SiGithub size={30} className="github-cta__icon" aria-hidden="true" />
            <p className="github-cta__handle mono">github.com/raja-181101</p>
            <h3>Explore my repositories</h3>
            <p className="github-cta__text">
              The Spring Boot e-commerce backend, Android apps and automation frameworks above are
              all open source — open issues, architecture and commit history included.
            </p>

            {/*<div className="github-cta__stat" aria-live="polite">*/}
            {/*  {state === 'ok' && stats ? (*/}
            {/*    <span className="github-cta__stat-text mono">*/}
            {/*      {stats.repos} public repositories*/}
            {/*    </span>*/}
            {/*  ) : state === 'loading' ? (*/}
            {/*    <span className="github-cta__stat-text mono github-cta__stat-text--loading">*/}
            {/*      <RefreshCw size={13} className="github-cta__spin" aria-hidden="true" />*/}
            {/*      fetching live data…*/}
            {/*    </span>*/}
            {/*  ) : (*/}
            {/*    <span className="github-cta__stat-text mono github-cta__stat-text--muted">*/}
            {/*      live GitHub stats unavailable right now*/}
            {/*    </span>*/}
            {/*  )}*/}
            {/*</div>*/}

            <a
              className="btn btn--primary github-cta__btn"
              href="https://github.com/raja-181101"
              target="_blank"
              rel="noreferrer"
            >
              Explore My GitHub
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}