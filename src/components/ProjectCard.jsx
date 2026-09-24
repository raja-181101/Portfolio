import { ArrowUpRight } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import ProjectVisual from './ProjectVisual.jsx';
import Reveal from './Reveal.jsx';
import './Projects.css';

function Capabilities({ items }) {
  return (
    <ul className="proj__caps">
      {items.map((c) => (
        <li key={c}>
          <span className="proj__cap-ok" aria-hidden="true">
            ✓
          </span>
          {c}
        </li>
      ))}
    </ul>
  );
}

function Tags({ tech }) {
  return (
    <div className="proj__tags">
      {tech.map((t) => (
        <span key={t} className="proj__tag mono" title={t}>
          {t}
        </span>
      ))}
    </div>
  );
}

function RepoButton({ repo, name }) {
  return (
    <a
      className="btn btn--ghost proj__repo"
      href={repo}
      target="_blank"
      rel="noreferrer"
      aria-label={`View source on GitHub — ${name}`}
    >
      <SiGithub size={16} aria-hidden="true" />
      GitHub
      <ArrowUpRight size={14} className="proj__repo-arrow" aria-hidden="true" />
    </a>
  );
}

export function FeaturedProject({ project }) {
  return (
    <Reveal y={30}>
      <article className="proj proj--featured card">
        <div className="proj__side">
          <span className="proj__index mono">{project.index}</span>
          <h3 className="proj__name">{project.name}</h3>
          <p className="proj__flag mono">Flagship backend project</p>
          <p className="proj__desc">{project.description}</p>

          <div className="proj__visual proj__visual--featured">
            <ProjectVisual type={project.visual} />
          </div>

          <Tags tech={project.tech} />
          <Capabilities items={project.capabilities} />

          <div className="proj__actions">
            <RepoButton repo={project.repo} name={project.name} />
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export default function ProjectCard({ project, delay = 0 }) {
  return (
    <Reveal delay={delay} y={26} className="proj__cell">
      <article className="proj card">
        <div className="proj__visual">
          <ProjectVisual type={project.visual} />
        </div>

        <div className="proj__body">
          <div className="proj__head">
            <span className="proj__index mono">{project.index}</span>
            <h3 className="proj__name">{project.name}</h3>
          </div>
          <p className="proj__desc">{project.description}</p>

          <Tags tech={project.tech} />

          <ul className="proj__caps proj__caps--compact">
            {(project.capabilities || []).slice(0, 4).map((c) => (
              <li key={c}>
                <span className="proj__cap-ok" aria-hidden="true">
                  ✓
                </span>
                {c}
              </li>
            ))}
          </ul>

          <div className="proj__actions">
            <RepoButton repo={project.repo} name={project.name} />
          </div>
        </div>
      </article>
    </Reveal>
  );
}