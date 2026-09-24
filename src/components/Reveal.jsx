import { motion, useReducedMotion } from 'framer-motion';

/**
 * Fade/slide-in on scroll. Framer Motion is skipped entirely when the user
 * prefers reduced motion.
 */
export default function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  as: Tag = 'div',
  ...rest
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[Tag];

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-72px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}