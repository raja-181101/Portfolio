import SectionHeading from './SectionHeading.jsx';
import { FeaturedProject, default as ProjectCard } from './ProjectCard.jsx';
import { projects } from '../data/projects.js';
import './Projects.css';

export default function Projects() {
  const featured = projects.find((p) => p.featured) || projects[0];
  const rest = projects.filter((p) => p.id !== featured.id);

  return (
    <section className="section section--alt projects" id="projects">
      <div className="container">
        <SectionHeading
          index="04"
          eyebrow="Featured Projects"
          title={<>Engineering work across <span className="gradient-text">backend, mobile & QA</span></>}
          description="Projects I've built end-to-end — from secure Spring Boot commerce APIs to Android apps with realtime sync and reusable Selenium frameworks."
        />

        <div className="projects__featured">
          <FeaturedProject project={featured} />
        </div>

        <div className="projects__grid">
          {rest.map((p, i) => (
            <ProjectCard key={p.id} project={p} delay={(i % 2) * 0.08} />
          ))}
        </div>
      </div>
    </section>
  );
}