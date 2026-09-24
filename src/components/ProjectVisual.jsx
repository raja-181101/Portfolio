/**
 * Lightweight, factual visual vignettes rendered with CSS/SVG for each project.
 * No screenshots needed — each visual is a designed stand-in that reads like
 * real engineering output (pipeline, test log, chat, etc.).
 */
import './ProjectVisual.css';

function Window({ title, children, bodyClass = '' }) {
  return (
    <div className="pv-window">
      <div className="pv-bar">
        <span className="pv-dot pv-dot--r" />
        <span className="pv-dot pv-dot--y" />
        <span className="pv-dot pv-dot--g" />
        <span className="pv-title mono">{title}</span>
      </div>
      <div className={`pv-body ${bodyClass}`}>{children}</div>
    </div>
  );
}

function Node({ label, sub, kind = '', pulse = false }) {
  return (
    <div className={`pv-node ${kind ? `pv-node--${kind}` : ''} ${pulse ? 'pv-node--pulse' : ''}`}>
      <span className="pv-node__label mono">{label}</span>
      {sub && <span className="pv-node__sub">{sub}</span>}
    </div>
  );
}

function Flow() {
  return (
    <span className={`pv-arrow mono`} aria-hidden="true">
      →
    </span>
  );
}

/* 1 — Layered REST pipeline + Kafka bus (flagship project) */
function EcommerceVisual() {
  return (
    <Window title="ecommerce / architecture" bodyClass="pv-body--ecommerce">
      <div className="pv-flow-row">
        <Node label="Client" sub="REST · JWT" kind="client" />
        <Flow />
        <Node label="Controllers" sub="Auth · Product · Order" kind="ctrl" />
        <Flow />
        <Node label="Services" sub="Business logic" kind="svc" />
        <Flow />
        <Node label="Repositories" sub="Spring Data JPA" kind="repo" />
        <Flow />
        <Node label="PostgreSQL" sub="Persistence" kind="db" pulse />
      </div>
      <div className="pv-kafka">
        <div className="pv-kafka__head mono">
          <span className="pv-kafka__tag">event-bus</span> Apache Kafka · JSON
        </div>
        <div className="pv-flow-row pv-flow-row--kafka">
          <Node label="Producer" sub="Order events" kind="kfk" />
          <Flow />
          <Node label="Consumer" sub="NotificationService" kind="kfk" pulse />
        </div>
      </div>
      <div className="pv-log mono">
        <span className="pv-log__ok">✓</span> JWT verified · 200 OK · POST /api/orders
      </div>
    </Window>
  );
}

/* 2 — Realtime social feed phone mockup */
function CampusVisual() {
  return (
    <Window title="campus_connect / feed.xml" bodyClass="pv-body--campus">
      <div className="pv-phone">
        <div className="pv-phone__status mono">● Firebase Realtime · synced</div>
        {[0, 1, 2].map((i) => (
          <div key={i} className="pv-post">
            <span className="pv-post__avatar" />
            <div className="pv-post__lines">
              <span className="pv-post__line pv-post__line--w" />
              <span className="pv-post__line" />
            </div>
            <span className="pv-post__likes mono">♥ {12 * (i + 1)}</span>
          </div>
        ))}
        <div className="pv-phone__nav">
          <span>●</span>
          <span>●</span>
          <span>●</span>
          <span>●</span>
        </div>
      </div>
      <div className="pv-log mono">
        <span className="pv-log__ok">🧭</span> RecyclerView · ViewPager · Auth
      </div>
    </Window>
  );
}

/* 3 — TestNG run log */
function AutomationVisual() {
  const rows = [
    ['PASS', 'LoginTests.loginWithValidCredentials'],
    ['PASS', 'CartTests.addProductToCart'],
    ['PASS', 'CheckOutTests.completePayment'],
    ['PASS', 'ProductTests.verifyProductDetails'],
    ['PASS', 'SearchTests.searchReturnsResults'],
    ['PASS', 'SubscriptionTests.verifySubscription'],
  ];
  return (
    <Window title="testng-results.log" bodyClass="pv-body--term">
      <div className="pv-term mono">
        {rows.map(([s, name]) => (
          <div key={name} className="pv-term__row">
            <span className="pv-term__pass">[ {s} ]</span> {name}
          </div>
        ))}
        <div className="pv-term__row pv-term__row--sum">
          Total tests run: <span className="pv-term__num">10</span> · Failures:{' '}
          <span className="pv-term__num">0</span>
        </div>
        <div className="pv-term__row">
          <span className="pv-term__caret">{'>'}</span> data: TestData.xlsx · apache-poi
        </div>
      </div>
    </Window>
  );
}

/* 4 — Anonymous chat bubbles */
function ChatVisual() {
  return (
    <Window title="chat / anonymous-room" bodyClass="pv-body--chat">
      <div className="pv-chat mono">
        <div className="pv-chat__stamp">● matched from waiting_room</div>
        <div className="pv-bubble pv-bubble--in">
          Hey, matched with me? <span className="pv-bubble__time">14:02</span>
        </div>
        <div className="pv-bubble pv-bubble--out">
          Yep — realtime sync via Firebase <span className="pv-bubble__time">14:03</span>
        </div>
        <div className="pv-bubble pv-bubble--in">
          This is anonymous btw <span className="pv-bubble__time">14:03</span>
        </div>
        <div className="pv-chat__stamp pv-chat__stamp--out">● session cleanup · onDisconnect()</div>
      </div>
    </Window>
  );
}

/* 5 — Internship task progression */
function TasksVisual() {
  return (
    <Window title="internship-tasks / README" bodyClass="pv-body--tasks">
      <div className="pv-ladder">
        {[
          ['T1', 'Node + EJS'],
          ['T4', 'Forms & routing'],
          ['T5', 'Spring Boot + React'],
          ['T6', 'JWT auth'],
          ['T7', 'GitHub OAuth'],
          ['T8', 'Redis + jobs'],
        ].map(([t, label], i) => (
          <div key={t} className="pv-ladder__row">
            <span className="pv-ladder__idx mono">{i === 0 ? t : ''}</span>
            <span className="pv-ladder__track">
              <span className={`pv-ladder__node ${i >= 4 ? 'pv-ladder__node--done' : ''}`} />
            </span>
            <span className="pv-ladder__label mono">{label}</span>
          </div>
        ))}
      </div>
    </Window>
  );
}

const VISUALS = {
  ecommerce: EcommerceVisual,
  campus: CampusVisual,
  automation: AutomationVisual,
  chat: ChatVisual,
  tasks: TasksVisual,
};

export default function ProjectVisual({ type }) {
  const Visual = VISUALS[type] || EcommerceVisual;
  return <Visual />;
}