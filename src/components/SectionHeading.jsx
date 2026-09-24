import Reveal from './Reveal.jsx';

export default function SectionHeading({ index, eyebrow, title, description, align = 'left' }) {
  const alignClass = align === 'center' ? 'section-head--center' : '';
  return (
    <div className={`section-head ${alignClass}`}>
      <Reveal y={18}>
        <span className="eyebrow">
          <span className="eyebrow-index">{index}</span> {eyebrow}
        </span>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="section-title">{title}</h2>
      </Reveal>
      {description && (
        <Reveal delay={0.12}>
          <p className="section-desc">{description}</p>
        </Reveal>
      )}
    </div>
  );
}