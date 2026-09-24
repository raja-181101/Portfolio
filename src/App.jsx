import { useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Experience from './components/Experience.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import GitHubCTA from './components/GitHubCTA.jsx';
import Certifications from './components/Certifications.jsx';
import Education from './components/Education.jsx';
import Publication from './components/Publication.jsx';
import CodingProfiles from './components/CodingProfiles.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';
import ScrollProgress from './components/ScrollProgress.jsx';
import BackToTop from './components/BackToTop.jsx';

export default function App() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <>
      <div className="page-ambient" aria-hidden="true" />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <GitHubCTA />
        <Certifications />
        <Education />
        <Publication />
        <CodingProfiles />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  );
}