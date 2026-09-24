import {
  Braces,
  Waypoints,
  Layers,
  Zap,
  Network,
  TestTube2,
  ClipboardCheck,
  FileText,
  Smartphone,
  FlaskConical,
  RefreshCw,
} from 'lucide-react';
import { FaJava } from 'react-icons/fa';
import { DiDatabase } from 'react-icons/di';
import {
  SiSpringboot,
  SiSpring,
  SiSpringsecurity,
  SiHibernate,
  SiApachekafka,
  SiPostgresql,
  SiFirebase,
  SiSelenium,
  SiPostman,
  SiReact,
  SiHtml5,
  SiCss,
  SiAndroid,
  SiGit,
  SiGithub,
  SiApachemaven,
  SiIntellijidea,
  SiJira,
} from 'react-icons/si';

const iconMap = {
  java: FaJava,
  sql: DiDatabase,
  springboot: SiSpringboot,
  spring: SiSpring,
  springsecurity: SiSpringsecurity,
  springjpa: SiSpring,
  hibernate: SiHibernate,
  rest: Braces,
  microservices: Waypoints,
  events: Zap,
  kafka: SiApachekafka,
  layers: Layers,
  postgres: SiPostgresql,
  firebase: SiFirebase,
  selenium: SiSelenium,
  playwright: FlaskConical,
  appium: Smartphone,
  testng: TestTube2,
  postman: SiPostman,
  api: Network,
  functional: ClipboardCheck,
  regression: RefreshCw,
  smoke: Zap,
  react: SiReact,
  html: SiHtml5,
  css: SiCss,
  android: SiAndroid,
  recyclerview: Layers,
  git: SiGit,
  github: SiGithub,
  maven: SiApachemaven,
  intellij: SiIntellijidea,
  jira: SiJira,
  apachepoi: FileText,
  allure: TestTube2,
};

/**
 * Renders a registered brand icon or a clean monogram tile fallback.
 * Keeps the skills UI consistent even for tools without a brand icon.
 */
export default function BrandIcon({ name, size = 16 }) {
  if (!name) return null;
  const Icon = iconMap[name];
  if (Icon) return <Icon size={size} aria-hidden="true" />;
  return <Monogram label={name} />;
}

export function Monogram({ label }) {
  const glyph = label
    .split(/[\s-]+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return (
    <span className="monogram" aria-hidden="true">
      {glyph || ''}
    </span>
  );
}