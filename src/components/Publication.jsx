import { BookOpen, FileText } from 'lucide-react';
import SectionHeading from './SectionHeading.jsx';
import Reveal from './Reveal.jsx';
import './Publication.css';

export default function Publication() {
  return (
    <section className="section publication" id="publication">
      <div className="container">
        <SectionHeading
          index="08"
          eyebrow="Publication"
          title={<>Research work on <span className="gradient-text">Android systems</span></>}
        />

        <Reveal y={24}>
          <article className="publication__card card">
            <div className="publication__icon">
              <BookOpen size={22} aria-hidden="true" />
            </div>

            <div className="publication__main">
              <span className="publication__journal mono">IJRASET · International Journal</span>
              <h3>Android-Based Online Application for Students Information System</h3>
              <p>
                Published research on an Android student information system built with Java and
                Firebase — covering the storage, retrieval and updating of student records through
                a realtime mobile application. Demonstrates work on mobile architecture,
                Firebase integration and end-to-end CRUD flows.
              </p>
              <div className="publication__meta">
                <span className="publication__tag mono">
                  <FileText size={12} aria-hidden="true" />
                  Paper
                </span>
                <span className="publication__tag mono">Java · Firebase</span>
                <span className="publication__tag mono">IJRASET</span>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}