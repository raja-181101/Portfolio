import { GraduationCap, Calendar } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';
import Reveal from './Reveal.jsx';
import './Education.css';

export default function Education() {
  return (
    <section className="section section--alt education" id="education">
      <div className="container">
        <SectionHeading
          index="07"
          eyebrow="Education"
          title={<>Academic <span className="gradient-text">foundation</span></>}
        />

        <div className="education__row">
          <Reveal y={24}>
            <article className="education__card card">
              <div className="education__icon">
                <GraduationCap size={24} aria-hidden="true" />
              </div>

              <div className="education__main">
                <span className="education__degree mono">Bachelor of Technology · B.Tech</span>
                <h3>Electronics & Communication Engineering</h3>
                <p className="education__school">Vignana Bharathi Institute of Technology</p>
                <div className="education__tags">
                  <span className="education__tag mono">
                    <Calendar size={12} aria-hidden="true" />
                    2019 – 2023
                  </span>
                  <span className="education__tag mono">Hyderabad, India</span>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.12} y={24}>
            <p className="education__note">
              B.Tech in Electronics and Communication Engineering, providing
              a foundation in engineering problem-solving, systems thinking and
              technical analysis.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}