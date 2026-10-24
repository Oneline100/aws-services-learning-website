# AWS Services Learning Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fully offline, animated React site that lets users browse every AWS service in an icon grid (with exam-oriented detail on click) and explore 14 animated architecture-demo diagrams showing how services connect.

**Architecture:** A Vite + React + TypeScript single-page app, built to a static `dist/` bundle with `HashRouter` so it works from `file://` or any static server with zero backend. All service and architecture-demo data are static TypeScript modules compiled into the bundle (no runtime network calls). React Flow renders the animated architecture diagrams; Framer Motion handles UI micro-animations.

**Tech Stack:** React 18, TypeScript, Vite, React Router (`HashRouter`), React Flow, Framer Motion, official AWS Architecture Icons (static assets).

## Global Constraints

- Project must run fully offline once built: no CDN links, no external font/icon requests, no backend calls at runtime.
- Build output must work both via direct `file://` open of `dist/index.html` and via a static file server (per spec §7).
- Routing uses `HashRouter` (not `BrowserRouter`) — required for `file://` compatibility.
- Vite config must set `base: './'` so asset paths resolve when opened from an arbitrary filesystem location.
- No automated unit-test framework for this initial build (per spec §7) — verification is manual: inspect behavior in `npm run dev` and in the built `dist/` output, as directed per task. Do not add Vitest/Jest/RTL unless a later task explicitly says to.
- Service data fields are exactly these 8, no more, no fewer (per spec §4.1): `category`, `tagline`, `description`, `keyFeatures`, `useCases`, `examNotes`, `relatedServices`, `pricingModel` (plus identity fields `id`, `name`, `iconPath`).
- Icons must be the official AWS Architecture Icons asset pack, used per its license terms — no hand-drawn substitutes.
- Architecture demos: exactly the 14 listed in the spec (§2) — no more, no fewer, unless the user asks to add some later.

---

## File Structure

```
package.json
vite.config.ts
index.html
src/
  main.tsx
  App.tsx
  types/
    service.ts
    architecture.ts
  data/
    categories.ts
    services/
      compute.ts
      storage.ts
      database.ts
      networking.ts
      security.ts
      analytics.ts
      ml.ts
      integration.ts
      management.ts
      developerTools.ts
      migration.ts
      media.ts
      iot.ts
      misc.ts
      index.ts
    architectures/
      staticWebsite.ts
      threeTier.ts
      serverlessApi.ts
      containerOrchestration.ts
      dataLake.ts
      streaming.ts
      mlPipeline.ts
      cicd.ts
      hybridNetworking.ts
      disasterRecovery.ts
      iotIngestion.ts
      microservicesMesh.ts
      eventDriven.ts
      securityBaseline.ts
      index.ts
  utils/
    search.ts
  components/
    Nav/
      TopNav.tsx
      TopNav.module.css
    Grid/
      ServiceGrid.tsx
      ServiceGrid.module.css
      CategoryFilter.tsx
      SearchBox.tsx
    ServiceModal/
      ServiceModal.tsx
      ServiceModal.module.css
    Diagram/
      DiagramCanvas.tsx
      DiagramCanvas.module.css
      ServiceNode.tsx
  pages/
    HomePage.tsx
    ArchitecturePage.tsx
public/
  icons/            (official AWS Architecture Icons, added in Task 9)
```

---

### Task 1: Scaffold Vite + React + TypeScript project

**Files:**
- Create: `package.json`, `vite.config.ts`, `tsconfig.json`, `index.html`, `src/main.tsx`, `src/App.tsx`
- Create: `.gitignore`

**Interfaces:**
- Produces: a running Vite dev server and a working `npm run build` that outputs `dist/`.

- [ ] **Step 1: Scaffold the project**

```bash
npm create vite@latest . -- --template react-ts
```

When prompted about the current directory not being empty, confirm proceeding (the repo already has `docs/` and `.vexp/`, which is fine).

- [ ] **Step 2: Install base dependencies**

```bash
npm install
```

- [ ] **Step 3: Set `base: './'` in Vite config**

Edit `vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
})
```

- [ ] **Step 4: Add `.gitignore` entries**

```
node_modules
dist
```

- [ ] **Step 5: Verify dev server runs**

Run: `npm run dev`
Expected: terminal prints a local URL (e.g. `http://localhost:5173`); opening it shows the default Vite+React starter page. Stop the server after confirming.

- [ ] **Step 6: Verify production build works**

Run: `npm run build`
Expected: `dist/` directory created containing `index.html` and `assets/`.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vite.config.ts tsconfig.json tsconfig.node.json index.html src .gitignore
git commit -m "chore: scaffold Vite + React + TypeScript project"
```

---

### Task 2: Install routing/diagram/animation dependencies and base folders

**Files:**
- Modify: `package.json`
- Create: `src/types/`, `src/data/`, `src/utils/`, `src/components/`, `src/pages/` (empty dirs populated in later tasks)

**Interfaces:**
- Produces: `react-router-dom`, `reactflow`, `framer-motion` available as imports for all later tasks.

- [ ] **Step 1: Install dependencies**

```bash
npm install react-router-dom reactflow framer-motion
```

- [ ] **Step 2: Verify install**

Run: `cat package.json` (or open the file) and confirm `react-router-dom`, `reactflow`, and `framer-motion` appear under `dependencies`.

- [ ] **Step 3: Create folder skeleton**

Create empty-but-tracked folders by adding a `.gitkeep` placeholder is unnecessary — the next tasks will populate each folder with real files, so skip creating empty dirs now.

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add react-router-dom, reactflow, framer-motion"
```

---

### Task 3: Define core data types and category taxonomy

**Files:**
- Create: `src/types/service.ts`
- Create: `src/types/architecture.ts`
- Create: `src/data/categories.ts`

**Interfaces:**
- Produces: `AWSService` type, `ArchitectureDemo`/`ArchitectureNode`/`ArchitectureEdge` types, `CATEGORIES: string[]` constant — imported by every data and component task below.

- [ ] **Step 1: Write the service type**

`src/types/service.ts`:

```ts
export interface AWSService {
  id: string;
  name: string;
  category: string;
  tagline: string;
  description: string;
  keyFeatures: string[];
  useCases: string[];
  examNotes: string[];
  relatedServices: string[];
  pricingModel: string;
  iconPath: string;
}
```

- [ ] **Step 2: Write the architecture demo type**

`src/types/architecture.ts`:

```ts
export interface ArchitectureNode {
  id: string;
  serviceId: string;
  position: { x: number; y: number };
}

export interface ArchitectureEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  animated: boolean;
}

export interface ArchitectureDemo {
  id: string;
  title: string;
  description: string;
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
}
```

- [ ] **Step 3: Write the category taxonomy**

`src/data/categories.ts`:

```ts
export const CATEGORIES = [
  'Compute',
  'Containers',
  'Storage',
  'Database',
  'Networking & Content Delivery',
  'Security, Identity & Compliance',
  'Analytics',
  'Machine Learning',
  'Application Integration',
  'Management & Governance',
  'Developer Tools',
  'Migration & Transfer',
  'Media Services',
  'IoT',
  'Other',
] as const;

export type Category = (typeof CATEGORIES)[number];
```

- [ ] **Step 4: Verify it compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/types/service.ts src/types/architecture.ts src/data/categories.ts
git commit -m "feat: add AWSService/ArchitectureDemo types and category taxonomy"
```

---

### Task 4: Build service data index and search/filter utilities

**Files:**
- Create: `src/data/services/index.ts`
- Create: `src/utils/search.ts`

**Interfaces:**
- Consumes: `AWSService` from `src/types/service.ts` (Task 3).
- Produces: `ALL_SERVICES: AWSService[]`, `getServiceById(id: string): AWSService | undefined`, `filterServices(services: AWSService[], query: string, category: string | null): AWSService[]` — used by `ServiceGrid` (Task 6), `ServiceModal` (Task 7), and `DiagramCanvas`/`ArchitecturePage` (Tasks 17, 19).

This task creates the index with 3 placeholder-free sample entries so later components have real data to render against before the full data-authoring tasks (10–16) run. The sample entries are real, complete, final content — not placeholders — and will simply remain part of the Compute dataset once Task 10 adds the rest.

- [ ] **Step 1: Create a temporary sample dataset directly in the index**

`src/data/services/index.ts`:

```ts
import type { AWSService } from '../../types/service';

export const ALL_SERVICES: AWSService[] = [
  {
    id: 'ec2',
    name: 'Amazon EC2',
    category: 'Compute',
    tagline: 'Resizable virtual servers in the cloud.',
    description:
      'Amazon Elastic Compute Cloud (EC2) provides on-demand, resizable virtual machines ("instances") that run your applications. You choose the instance family, size, operating system, and storage, and can scale capacity up or down within minutes.',
    keyFeatures: [
      'Wide range of instance families optimized for compute, memory, storage, or GPU workloads',
      'Pay-as-you-go, Reserved, Savings Plans, and Spot pricing models',
      'Auto Scaling Groups for automatic capacity adjustment',
      'Elastic Block Store (EBS) for persistent attached storage',
    ],
    useCases: [
      'Hosting traditional web applications and APIs',
      'Batch processing and high-performance computing',
      'Lift-and-shift migration of on-premises workloads',
    ],
    examNotes: [
      'Spot Instances can be reclaimed by AWS with 2 minutes notice — not for stateful, uninterruptible workloads',
      'Reserved Instances and Savings Plans both discount steady-state usage, but Savings Plans are more flexible across instance families',
      'EC2 instance store is ephemeral; EBS volumes persist independently of the instance lifecycle',
    ],
    relatedServices: ['ebs', 'elastic-load-balancing', 'auto-scaling'],
    pricingModel: 'Pay per instance-hour/second; also Reserved, Savings Plans, and Spot pricing.',
    iconPath: '/icons/compute/ec2.svg',
  },
  {
    id: 'lambda',
    name: 'AWS Lambda',
    category: 'Compute',
    tagline: 'Run code without provisioning or managing servers.',
    description:
      'AWS Lambda runs your code in response to events (HTTP requests, file uploads, queue messages, schedules) and automatically manages the compute infrastructure, scaling from zero to thousands of concurrent executions.',
    keyFeatures: [
      'Event-driven execution triggered by 200+ AWS services',
      'Automatic scaling with no server management',
      'Billed per millisecond of execution time and memory allocated',
      'Supports multiple runtimes (Node.js, Python, Java, Go, .NET, Ruby, custom containers)',
    ],
    useCases: [
      'Serverless REST/GraphQL API backends (with API Gateway)',
      'Real-time file or stream processing',
      'Scheduled automation tasks',
    ],
    examNotes: [
      'Default execution timeout max is 15 minutes — not for long-running batch jobs',
      'Cold starts can add latency; provisioned concurrency mitigates this',
      'Lambda is stateless between invocations — persist state externally (DynamoDB, S3, etc.)',
    ],
    relatedServices: ['api-gateway', 'dynamodb', 'eventbridge'],
    pricingModel: 'Pay per request and per GB-second of compute duration; free tier included.',
    iconPath: '/icons/compute/lambda.svg',
  },
  {
    id: 's3',
    name: 'Amazon S3',
    category: 'Storage',
    tagline: 'Object storage built for scale, durability, and availability.',
    description:
      'Amazon Simple Storage Service (S3) stores any amount of data as objects within buckets, offering 99.999999999% (11 nines) durability and multiple storage classes to balance cost against access frequency.',
    keyFeatures: [
      'Storage classes from S3 Standard to Glacier for cost/access tradeoffs',
      'Versioning, lifecycle policies, and cross-region replication',
      'Static website hosting directly from a bucket',
      'Strong read-after-write consistency for all operations',
    ],
    useCases: [
      'Static website and asset hosting',
      'Data lake storage for analytics pipelines',
      'Backup, archival, and disaster recovery targets',
    ],
    examNotes: [
      'S3 is regional, but bucket names are globally unique',
      'S3 Standard-IA and One Zone-IA trade availability/durability for lower cost — know the difference',
      'Glacier retrieval times range from minutes (Expedited) to hours (Bulk) — pick based on RTO needs',
    ],
    relatedServices: ['cloudfront', 'glacier', 'athena'],
    pricingModel: 'Pay per GB stored per month (varies by storage class), plus request and data transfer fees.',
    iconPath: '/icons/storage/s3.svg',
  },
];

export function getServiceById(id: string): AWSService | undefined {
  return ALL_SERVICES.find((service) => service.id === id);
}
```

- [ ] **Step 2: Write the search/filter utility**

`src/utils/search.ts`:

```ts
import type { AWSService } from '../types/service';

export function filterServices(
  services: AWSService[],
  query: string,
  category: string | null
): AWSService[] {
  const normalizedQuery = query.trim().toLowerCase();

  return services.filter((service) => {
    const matchesCategory = !category || service.category === category;
    const matchesQuery =
      normalizedQuery === '' ||
      service.name.toLowerCase().includes(normalizedQuery) ||
      service.tagline.toLowerCase().includes(normalizedQuery);

    return matchesCategory && matchesQuery;
  });
}
```

- [ ] **Step 3: Manually verify in a scratch file**

Run: `npx tsc --noEmit`
Expected: no errors. (No automated test framework is used per Global Constraints — type-checking is the verification gate for pure logic at this stage.)

- [ ] **Step 4: Commit**

```bash
git add src/data/services/index.ts src/utils/search.ts
git commit -m "feat: add initial service dataset and search/filter utility"
```

---

### Task 5: Build TopNav, HashRouter, and page shells

**Files:**
- Create: `src/pages/HomePage.tsx`
- Create: `src/pages/ArchitecturePage.tsx`
- Create: `src/components/Nav/TopNav.tsx`
- Create: `src/components/Nav/TopNav.module.css`
- Modify: `src/App.tsx`

**Interfaces:**
- Produces: routes `#/` (HomePage) and `#/architecture/:demoId?` (ArchitecturePage), both reachable via `TopNav`.

- [ ] **Step 1: Write placeholder page components**

`src/pages/HomePage.tsx`:

```tsx
export default function HomePage() {
  return (
    <div>
      <h1>Service Directory</h1>
    </div>
  );
}
```

`src/pages/ArchitecturePage.tsx`:

```tsx
export default function ArchitecturePage() {
  return (
    <div>
      <h1>Architecture Demos</h1>
    </div>
  );
}
```

- [ ] **Step 2: Write TopNav**

`src/components/Nav/TopNav.module.css`:

```css
.nav {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem 2rem;
  background: #232f3e;
  color: #ffffff;
}

.title {
  font-weight: 700;
  font-size: 1.1rem;
  margin-right: auto;
}

.link {
  color: #d5dbdb;
  text-decoration: none;
  padding: 0.4rem 0.8rem;
  border-radius: 4px;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.link:hover {
  background-color: #37475a;
  color: #ffffff;
}

.linkActive {
  background-color: #ff9900;
  color: #161e2d;
  font-weight: 600;
}
```

`src/components/Nav/TopNav.tsx`:

```tsx
import { NavLink } from 'react-router-dom';
import styles from './TopNav.module.css';

export default function TopNav() {
  return (
    <nav className={styles.nav}>
      <span className={styles.title}>AWS Services Explorer</span>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? `${styles.link} ${styles.linkActive}` : styles.link)}
        end
      >
        Service Directory
      </NavLink>
      <NavLink
        to="/architecture"
        className={({ isActive }) => (isActive ? `${styles.link} ${styles.linkActive}` : styles.link)}
      >
        Architecture Demos
      </NavLink>
    </nav>
  );
}
```

- [ ] **Step 3: Wire routing in App.tsx**

`src/App.tsx`:

```tsx
import { HashRouter, Routes, Route } from 'react-router-dom';
import TopNav from './components/Nav/TopNav';
import HomePage from './pages/HomePage';
import ArchitecturePage from './pages/ArchitecturePage';

export default function App() {
  return (
    <HashRouter>
      <TopNav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/architecture" element={<ArchitecturePage />} />
        <Route path="/architecture/:demoId" element={<ArchitecturePage />} />
      </Routes>
    </HashRouter>
  );
}
```

- [ ] **Step 4: Verify routing manually**

Run: `npm run dev`, open the printed URL.
Expected: page shows "AWS Services Explorer" nav bar with two links. Clicking "Architecture Demos" navigates to `#/architecture` and shows "Architecture Demos" heading; clicking "Service Directory" returns to `#/` and shows "Service Directory" heading.

- [ ] **Step 5: Commit**

```bash
git add src/App.tsx src/pages/HomePage.tsx src/pages/ArchitecturePage.tsx src/components/Nav
git commit -m "feat: add HashRouter routing with TopNav and page shells"
```

---

### Task 6: Build ServiceGrid (grid + search + category filter + entrance animation)

**Files:**
- Create: `src/components/Grid/SearchBox.tsx`
- Create: `src/components/Grid/CategoryFilter.tsx`
- Create: `src/components/Grid/ServiceGrid.tsx`
- Create: `src/components/Grid/ServiceGrid.module.css`

**Interfaces:**
- Consumes: `AWSService` (Task 3), `ALL_SERVICES`, `filterServices` (Task 4), `CATEGORIES` (Task 3).
- Produces: `<ServiceGrid onSelectService={(service: AWSService) => void} />` — consumed by `HomePage` (Task 8).

- [ ] **Step 1: Write SearchBox**

`src/components/Grid/SearchBox.tsx`:

```tsx
interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchBox({ value, onChange }: SearchBoxProps) {
  return (
    <input
      type="text"
      placeholder="Search services..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Search AWS services"
    />
  );
}
```

- [ ] **Step 2: Write CategoryFilter**

`src/components/Grid/CategoryFilter.tsx`:

```tsx
import { CATEGORIES } from '../../data/categories';

interface CategoryFilterProps {
  selected: string | null;
  onSelect: (category: string | null) => void;
}

export default function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div role="group" aria-label="Filter by category">
      <button type="button" onClick={() => onSelect(null)} aria-pressed={selected === null}>
        All
      </button>
      {CATEGORIES.map((category) => (
        <button
          key={category}
          type="button"
          onClick={() => onSelect(category)}
          aria-pressed={selected === category}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
```

- [ ] **Step 3: Write ServiceGrid styles**

`src/components/Grid/ServiceGrid.module.css`:

```css
.toolbar {
  display: flex;
  gap: 1rem;
  padding: 1.5rem 2rem 0.5rem;
  flex-wrap: wrap;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1rem;
  padding: 1.5rem 2rem;
}

.card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  border-radius: 8px;
  background: #f7f8fa;
  cursor: pointer;
  border: 1px solid transparent;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.card:hover {
  border-color: #ff9900;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.icon {
  width: 48px;
  height: 48px;
}

.name {
  font-size: 0.85rem;
  text-align: center;
  color: #16191f;
}
```

- [ ] **Step 4: Write ServiceGrid with Framer Motion entrance animation**

`src/components/Grid/ServiceGrid.tsx`:

```tsx
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import type { AWSService } from '../../types/service';
import { ALL_SERVICES } from '../../data/services';
import { filterServices } from '../../utils/search';
import SearchBox from './SearchBox';
import CategoryFilter from './CategoryFilter';
import styles from './ServiceGrid.module.css';

interface ServiceGridProps {
  onSelectService: (service: AWSService) => void;
}

export default function ServiceGrid({ onSelectService }: ServiceGridProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<string | null>(null);

  const visibleServices = useMemo(
    () => filterServices(ALL_SERVICES, query, category),
    [query, category]
  );

  return (
    <div>
      <div className={styles.toolbar}>
        <SearchBox value={query} onChange={setQuery} />
        <CategoryFilter selected={category} onSelect={setCategory} />
      </div>
      <div className={styles.grid}>
        {visibleServices.map((service, index) => (
          <motion.div
            key={service.id}
            className={styles.card}
            onClick={() => onSelectService(service)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: Math.min(index * 0.02, 0.4) }}
          >
            <img src={service.iconPath} alt={service.name} className={styles.icon} />
            <span className={styles.name}>{service.name}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Verify manually with a temporary render**

Temporarily render `<ServiceGrid onSelectService={console.log} />` inside `HomePage` (full wiring happens in Task 8 — this is just to confirm the component works in isolation).

Run: `npm run dev`
Expected: grid shows the 3 sample services (EC2, Lambda, S3) with broken icon images (icons are added in Task 9 — that's expected right now), fading in on load. Typing "lambda" in the search box leaves only Lambda visible. Clicking "Storage" in the category filter leaves only S3 visible. Clicking "All" restores all three.

Revert the temporary render change after confirming (Task 8 does the real wiring).

- [ ] **Step 6: Commit**

```bash
git add src/components/Grid
git commit -m "feat: add ServiceGrid with search, category filter, and entrance animation"
```

---

### Task 7: Build ServiceModal

**Files:**
- Create: `src/components/ServiceModal/ServiceModal.tsx`
- Create: `src/components/ServiceModal/ServiceModal.module.css`

**Interfaces:**
- Consumes: `AWSService` (Task 3), `getServiceById` (Task 4).
- Produces: `<ServiceModal service={AWSService} onClose={() => void} onNavigateToService={(id: string) => void} />` — consumed by `HomePage` (Task 8) and `ArchitecturePage` (Task 19).

- [ ] **Step 1: Write ServiceModal styles**

`src/components/ServiceModal/ServiceModal.module.css`:

```css
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
}

.panel {
  background: #ffffff;
  border-radius: 10px;
  max-width: 640px;
  width: 90%;
  max-height: 85vh;
  overflow-y: auto;
  padding: 2rem;
}

.header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.icon {
  width: 56px;
  height: 56px;
}

.closeButton {
  margin-left: auto;
  border: none;
  background: transparent;
  font-size: 1.25rem;
  cursor: pointer;
}

.section {
  margin-top: 1.25rem;
}

.sectionTitle {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: #687078;
  margin-bottom: 0.4rem;
}

.relatedButton {
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  padding: 0.3rem 0.7rem;
  border-radius: 999px;
  border: 1px solid #ff9900;
  background: #fff8ef;
  color: #16191f;
  cursor: pointer;
}
```

- [ ] **Step 2: Write ServiceModal with Framer Motion transition**

`src/components/ServiceModal/ServiceModal.tsx`:

```tsx
import { motion, AnimatePresence } from 'framer-motion';
import type { AWSService } from '../../types/service';
import { getServiceById } from '../../data/services';
import styles from './ServiceModal.module.css';

interface ServiceModalProps {
  service: AWSService | null;
  onClose: () => void;
  onNavigateToService: (id: string) => void;
}

export default function ServiceModal({ service, onClose, onNavigateToService }: ServiceModalProps) {
  return (
    <AnimatePresence>
      {service && (
        <motion.div
          className={styles.overlay}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <motion.div
            className={styles.panel}
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
          >
            <div className={styles.header}>
              <img src={service.iconPath} alt={service.name} className={styles.icon} />
              <div>
                <h2>{service.name}</h2>
                <p>{service.tagline}</p>
              </div>
              <button type="button" className={styles.closeButton} onClick={onClose} aria-label="Close">
                ✕
              </button>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionTitle}>Category</div>
              <p>{service.category}</p>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionTitle}>Description</div>
              <p>{service.description}</p>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionTitle}>Key Features</div>
              <ul>
                {service.keyFeatures.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionTitle}>Common Use Cases</div>
              <ul>
                {service.useCases.map((useCase) => (
                  <li key={useCase}>{useCase}</li>
                ))}
              </ul>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionTitle}>Exam Notes</div>
              <ul>
                {service.examNotes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            </div>

            <div className={styles.section}>
              <div className={styles.sectionTitle}>Related Services</div>
              {service.relatedServices.map((relatedId) => {
                const related = getServiceById(relatedId);
                if (!related) return null;
                return (
                  <button
                    key={relatedId}
                    type="button"
                    className={styles.relatedButton}
                    onClick={() => onNavigateToService(relatedId)}
                  >
                    {related.name}
                  </button>
                );
              })}
            </div>

            <div className={styles.section}>
              <div className={styles.sectionTitle}>Pricing Model</div>
              <p>{service.pricingModel}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
```

- [ ] **Step 3: Verify manually**

This component is verified end-to-end once wired into `HomePage` in Task 8 — skip standalone verification here to avoid duplicate work.

- [ ] **Step 4: Commit**

```bash
git add src/components/ServiceModal
git commit -m "feat: add ServiceModal with related-service navigation"
```

---

### Task 8: Wire HomePage (Grid + Modal integration)

**Files:**
- Modify: `src/pages/HomePage.tsx`

**Interfaces:**
- Consumes: `ServiceGrid` (Task 6), `ServiceModal` (Task 7), `getServiceById` (Task 4).

- [ ] **Step 1: Wire the two components together with click-through navigation**

`src/pages/HomePage.tsx`:

```tsx
import { useState } from 'react';
import type { AWSService } from '../types/service';
import { getServiceById } from '../data/services';
import ServiceGrid from '../components/Grid/ServiceGrid';
import ServiceModal from '../components/ServiceModal/ServiceModal';

export default function HomePage() {
  const [selectedService, setSelectedService] = useState<AWSService | null>(null);

  return (
    <div>
      <ServiceGrid onSelectService={setSelectedService} />
      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onNavigateToService={(id) => {
          const next = getServiceById(id);
          if (next) setSelectedService(next);
        }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Verify manually**

Run: `npm run dev`
Expected: grid of 3 sample services renders. Clicking a card opens the modal with all 8 fields populated. Clicking a "Related Services" button inside the modal swaps its content to that service without closing. Clicking the ✕ or the overlay background closes the modal.

- [ ] **Step 3: Commit**

```bash
git add src/pages/HomePage.tsx
git commit -m "feat: wire ServiceGrid and ServiceModal into HomePage"
```

---

### Task 9: Acquire and integrate official AWS Architecture Icons

**Files:**
- Create: `public/icons/` (populated with official AWS icon SVGs, organized by category subfolder matching the `iconPath` convention used in service data, e.g. `public/icons/compute/ec2.svg`)
- Create: `docs/superpowers/notes/aws-icon-sourcing.md` (brief note on where the icons came from and license terms, for future reference)

**Interfaces:**
- Produces: icon files at the exact paths referenced by each service's `iconPath` field (Task 4 and all data-authoring tasks 10–16).

- [ ] **Step 1: Download the official AWS Architecture Icons asset package**

Obtain the current "AWS Architecture Icons" asset pack from AWS's official architecture icons page (search "AWS Architecture Icons" on the official AWS site if the direct URL has changed). Unzip it to a scratch location outside the repo.

- [ ] **Step 2: Extract and rename icons to match the project's `iconPath` convention**

For each service already defined in `src/data/services/index.ts` (and each one that will be added in Tasks 10–16), copy the matching SVG from the official pack into `public/icons/<category-folder>/<service-id>.svg`, where `<category-folder>` is a lowercase, hyphenated version of the service's category (e.g. `compute`, `storage`, `machine-learning`). Start with the 3 existing sample services:

```
public/icons/compute/ec2.svg
public/icons/compute/lambda.svg
public/icons/storage/s3.svg
```

- [ ] **Step 3: Record license terms**

`docs/superpowers/notes/aws-icon-sourcing.md`:

```markdown
# AWS Icon Sourcing Notes

Icons are from the official "AWS Architecture Icons" asset package, downloaded from AWS's official architecture-icons page.

Usage here (architecture diagrams and reference app for AWS exam study, not implying AWS endorsement) complies with the asset package's license terms, which are included in the downloaded zip as a terms-of-use document.

Icon files are stored under `public/icons/<category>/<service-id>.svg`, matching each service record's `iconPath` field in `src/data/services/`.
```

- [ ] **Step 4: Verify manually**

Run: `npm run dev`, open the Service Directory page.
Expected: EC2, Lambda, and S3 cards now show real AWS icons instead of broken image placeholders.

- [ ] **Step 5: Commit**

```bash
git add public/icons docs/superpowers/notes/aws-icon-sourcing.md
git commit -m "feat: add official AWS Architecture Icons for sample services"
```

---

### Task 10: Author service data — Compute & Containers

**Files:**
- Modify: `src/data/services/index.ts` (split into multiple files as below)
- Create: `src/data/services/compute.ts`
- Create: `src/data/services/containers.ts`

**Interfaces:**
- Consumes: `AWSService` type (Task 3).
- Produces: `COMPUTE_SERVICES: AWSService[]`, `CONTAINER_SERVICES: AWSService[]`, merged into `ALL_SERVICES` by `index.ts`.

This is the first of several content-authoring tasks that split the single `index.ts` dataset into per-category files. Each file follows the exact `AWSService` schema from Task 3. Below is one fully-worked example per file; author the remaining named services in that category using the same schema and level of detail, cross-referencing official AWS documentation for accuracy (per Global Constraints and spec §7's content-check requirement).

- [ ] **Step 1: Move existing compute data into `compute.ts` and add the rest**

`src/data/services/compute.ts` — start with the existing `ec2` and `lambda` entries (moved verbatim from the current `index.ts`), then add the following services using the same schema, each with a real `tagline`, `description`, 3-4 `keyFeatures`, 2-3 `useCases`, 2-3 `examNotes`, relevant `relatedServices` ids, a `pricingModel` summary, and `iconPath` under `/icons/compute/<id>.svg`:

`elastic-beanstalk`, `lightsail`, `batch`, `outposts`, `app-runner`, `ec2-auto-scaling`, `ec2-image-builder`, `wavelength`, `local-zones`, `serverless-application-repository`.

Example full entry to follow for each (already-complete, use this exact level of detail as the bar):

```ts
{
  id: 'elastic-beanstalk',
  name: 'AWS Elastic Beanstalk',
  category: 'Compute',
  tagline: 'Deploy and scale web apps without managing the underlying infrastructure.',
  description:
    'Elastic Beanstalk is a platform-as-a-service that automatically handles deployment details — capacity provisioning, load balancing, auto scaling, and health monitoring — for applications uploaded in supported languages, while still giving access to the underlying EC2/RDS resources if needed.',
  keyFeatures: [
    'Supports Java, .NET, PHP, Node.js, Python, Ruby, Go, and Docker',
    'Automatic capacity provisioning, load balancing, and health monitoring',
    'Full access to underlying AWS resources (EC2, RDS, S3) when customization is needed',
    'Blue/green deployment support via environment swapping',
  ],
  useCases: [
    'Quickly deploying web applications without manually configuring infrastructure',
    'Teams that want PaaS convenience but may need to drop to IaaS-level control later',
  ],
  examNotes: [
    'Elastic Beanstalk is free — you pay only for the underlying resources it provisions',
    'Unlike Lambda, Beanstalk runs on EC2 instances it manages for you, not a fully serverless model',
  ],
  relatedServices: ['ec2', 'rds', 'ec2-auto-scaling'],
  pricingModel: 'No additional charge; billed only for underlying resources (EC2, RDS, etc.) it provisions.',
  iconPath: '/icons/compute/elastic-beanstalk.svg',
},
```

End the file with:

```ts
export const COMPUTE_SERVICES: AWSService[] = [ /* all entries above */ ];
```

- [ ] **Step 2: Author `containers.ts`**

`src/data/services/containers.ts` covering: `ecs`, `eks`, `fargate`, `ecr`, `app-mesh`, `red-hat-openshift-service-on-aws`, using the same schema and detail bar as Step 1's example, with `iconPath` under `/icons/containers/<id>.svg`.

- [ ] **Step 3: Rebuild the service index to merge category files**

`src/data/services/index.ts`:

```ts
import type { AWSService } from '../../types/service';
import { COMPUTE_SERVICES } from './compute';
import { CONTAINER_SERVICES } from './containers';

export const ALL_SERVICES: AWSService[] = [
  ...COMPUTE_SERVICES,
  ...CONTAINER_SERVICES,
];

export function getServiceById(id: string): AWSService | undefined {
  return ALL_SERVICES.find((service) => service.id === id);
}
```

(Note: the `s3` sample entry moves to `storage.ts` in Task 11 — remove it from this intermediate `index.ts` once Task 11 adds `STORAGE_SERVICES`, so it isn't duplicated.)

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit` — expect no errors.
Run: `npm run dev` — expect the grid to show all Compute and Container services (minus S3, which temporarily disappears until Task 11 re-adds it — confirm this is the case and is expected).

- [ ] **Step 5: Commit**

```bash
git add src/data/services/compute.ts src/data/services/containers.ts src/data/services/index.ts
git commit -m "feat: author Compute and Containers service data"
```

---

### Task 11: Author service data — Storage & Database

**Files:**
- Create: `src/data/services/storage.ts`
- Create: `src/data/services/database.ts`
- Modify: `src/data/services/index.ts`

**Interfaces:**
- Produces: `STORAGE_SERVICES`, `DATABASE_SERVICES`, merged into `ALL_SERVICES`.

- [ ] **Step 1: Author `storage.ts`**

Move the existing `s3` entry here (verbatim), then add, using the Task 10-Step-1 example as the detail bar, with `iconPath` under `/icons/storage/<id>.svg`:

`ebs`, `efs`, `fsx`, `s3-glacier`, `aws-backup`, `storage-gateway`, `snow-family`, `datasync`, `elastic-disaster-recovery`.

- [ ] **Step 2: Author `database.ts`**

With `iconPath` under `/icons/database/<id>.svg`:

`rds`, `dynamodb`, `aurora`, `elasticache`, `neptune`, `documentdb`, `keyspaces`, `timestream`, `qldb`, `dms`, `rds-proxy`, `memorydb`.

- [ ] **Step 3: Update index.ts**

```ts
import type { AWSService } from '../../types/service';
import { COMPUTE_SERVICES } from './compute';
import { CONTAINER_SERVICES } from './containers';
import { STORAGE_SERVICES } from './storage';
import { DATABASE_SERVICES } from './database';

export const ALL_SERVICES: AWSService[] = [
  ...COMPUTE_SERVICES,
  ...CONTAINER_SERVICES,
  ...STORAGE_SERVICES,
  ...DATABASE_SERVICES,
];

export function getServiceById(id: string): AWSService | undefined {
  return ALL_SERVICES.find((service) => service.id === id);
}
```

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit` then `npm run dev` — confirm S3 reappears, and Storage/Database categories filter correctly in `CategoryFilter`.

- [ ] **Step 5: Commit**

```bash
git add src/data/services/storage.ts src/data/services/database.ts src/data/services/index.ts
git commit -m "feat: author Storage and Database service data"
```

---

### Task 12: Author service data — Networking & Security

**Files:**
- Create: `src/data/services/networking.ts`
- Create: `src/data/services/security.ts`
- Modify: `src/data/services/index.ts`

**Interfaces:**
- Produces: `NETWORKING_SERVICES`, `SECURITY_SERVICES`, merged into `ALL_SERVICES`.

- [ ] **Step 1: Author `networking.ts`**

Category `'Networking & Content Delivery'`, `iconPath` under `/icons/networking/<id>.svg`:

`vpc`, `cloudfront`, `route-53`, `api-gateway`, `direct-connect`, `vpn`, `transit-gateway`, `elastic-load-balancing`, `global-accelerator`, `privatelink`, `cloud-map`, `network-firewall`, `network-manager`, `verified-access`.

- [ ] **Step 2: Author `security.ts`**

Category `'Security, Identity & Compliance'`, `iconPath` under `/icons/security/<id>.svg`:

`iam`, `organizations`, `cognito`, `guardduty`, `inspector`, `macie`, `secrets-manager`, `kms`, `waf`, `shield`, `security-hub`, `certificate-manager`, `directory-service`, `iam-identity-center`, `control-tower`, `artifact`, `cloudhsm`, `detective`, `resource-access-manager`, `firewall-manager`, `audit-manager`, `verified-permissions`.

- [ ] **Step 3: Update index.ts**

Add the two new imports/spreads following the same pattern as Task 11 Step 3.

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit` then `npm run dev` — confirm new categories appear in the filter and services render.

- [ ] **Step 5: Commit**

```bash
git add src/data/services/networking.ts src/data/services/security.ts src/data/services/index.ts
git commit -m "feat: author Networking and Security service data"
```

---

### Task 13: Author service data — Analytics & Machine Learning

**Files:**
- Create: `src/data/services/analytics.ts`
- Create: `src/data/services/ml.ts`
- Modify: `src/data/services/index.ts`

**Interfaces:**
- Produces: `ANALYTICS_SERVICES`, `ML_SERVICES`, merged into `ALL_SERVICES`.

- [ ] **Step 1: Author `analytics.ts`**

Category `'Analytics'`, `iconPath` under `/icons/analytics/<id>.svg`:

`athena`, `emr`, `glue`, `kinesis-data-streams`, `kinesis-data-firehose`, `kinesis-data-analytics`, `quicksight`, `redshift`, `lake-formation`, `opensearch-service`, `data-pipeline`, `msk`, `datazone`, `clean-rooms`.

- [ ] **Step 2: Author `ml.ts`**

Category `'Machine Learning'`, `iconPath` under `/icons/ml/<id>.svg`:

`sagemaker`, `rekognition`, `comprehend`, `lex`, `polly`, `transcribe`, `translate`, `textract`, `personalize`, `forecast`, `kendra`, `deepracer`, `panorama`, `healthlake`, `bedrock`, `amazon-q`.

- [ ] **Step 3: Update index.ts**

Add the two new imports/spreads following the same pattern as Task 11 Step 3.

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit` then `npm run dev` — confirm new categories filter correctly.

- [ ] **Step 5: Commit**

```bash
git add src/data/services/analytics.ts src/data/services/ml.ts src/data/services/index.ts
git commit -m "feat: author Analytics and Machine Learning service data"
```

---

### Task 14: Author service data — Application Integration & Management/Governance

**Files:**
- Create: `src/data/services/integration.ts`
- Create: `src/data/services/management.ts`
- Modify: `src/data/services/index.ts`

**Interfaces:**
- Produces: `INTEGRATION_SERVICES`, `MANAGEMENT_SERVICES`, merged into `ALL_SERVICES`.

- [ ] **Step 1: Author `integration.ts`**

Category `'Application Integration'`, `iconPath` under `/icons/integration/<id>.svg`:

`sqs`, `sns`, `eventbridge`, `step-functions`, `appflow`, `amazon-mq`, `appsync`, `swf`.

- [ ] **Step 2: Author `management.ts`**

Category `'Management & Governance'`, `iconPath` under `/icons/management/<id>.svg`:

`cloudwatch`, `cloudtrail`, `aws-config`, `systems-manager`, `trusted-advisor`, `cloudformation`, `service-catalog`, `compute-optimizer`, `license-manager`, `well-architected-tool`, `resource-groups`, `budgets`, `cost-explorer`, `cost-and-usage-report`, `launch-wizard`, `proton`, `health-dashboard`.

- [ ] **Step 3: Update index.ts**

Add the two new imports/spreads following the same pattern as Task 11 Step 3.

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit` then `npm run dev` — confirm new categories filter correctly.

- [ ] **Step 5: Commit**

```bash
git add src/data/services/integration.ts src/data/services/management.ts src/data/services/index.ts
git commit -m "feat: author Application Integration and Management & Governance service data"
```

---

### Task 15: Author service data — Developer Tools, Migration & Transfer, Media Services, IoT

**Files:**
- Create: `src/data/services/developerTools.ts`
- Create: `src/data/services/migration.ts`
- Create: `src/data/services/media.ts`
- Create: `src/data/services/iot.ts`
- Modify: `src/data/services/index.ts`

**Interfaces:**
- Produces: `DEVELOPER_TOOLS_SERVICES`, `MIGRATION_SERVICES`, `MEDIA_SERVICES`, `IOT_SERVICES`, merged into `ALL_SERVICES`.

- [ ] **Step 1: Author `developerTools.ts`**

Category `'Developer Tools'`, `iconPath` under `/icons/developer-tools/<id>.svg`:

`codecommit`, `codebuild`, `codepipeline`, `codedeploy`, `cloud9`, `codeartifact`, `x-ray`, `cloudshell`, `codecatalyst`, `sam`, `amazon-q-developer`.

- [ ] **Step 2: Author `migration.ts`**

Category `'Migration & Transfer'`, `iconPath` under `/icons/migration/<id>.svg`:

`application-migration-service`, `transfer-family`, `migration-hub`, `application-discovery-service`.

(Note: `dms`, `datasync`, and `snow-family` already exist under Database/Storage — reference them via `relatedServices`, do not duplicate the records.)

- [ ] **Step 3: Author `media.ts`**

Category `'Media Services'`, `iconPath` under `/icons/media/<id>.svg`:

`elastic-transcoder`, `mediaconvert`, `medialive`, `mediapackage`, `mediastore`, `mediatailor`, `mediaconnect`, `interactive-video-service`.

- [ ] **Step 4: Author `iot.ts`**

Category `'IoT'`, `iconPath` under `/icons/iot/<id>.svg`:

`iot-core`, `iot-greengrass`, `iot-analytics`, `iot-device-defender`, `iot-device-management`, `iot-sitewise`, `iot-events`, `iot-fleetwise`, `iot-twinmaker`, `freertos`.

- [ ] **Step 5: Update index.ts**

Add the four new imports/spreads following the same pattern as Task 11 Step 3.

- [ ] **Step 6: Verify**

Run: `npx tsc --noEmit` then `npm run dev` — confirm all new categories filter correctly.

- [ ] **Step 7: Commit**

```bash
git add src/data/services/developerTools.ts src/data/services/migration.ts src/data/services/media.ts src/data/services/iot.ts src/data/services/index.ts
git commit -m "feat: author Developer Tools, Migration, Media, and IoT service data"
```

---

### Task 16: Author service data — Other (niche/misc)

**Files:**
- Create: `src/data/services/misc.ts`
- Modify: `src/data/services/index.ts`

**Interfaces:**
- Produces: `MISC_SERVICES`, merged into `ALL_SERVICES`.

- [ ] **Step 1: Author `misc.ts`**

Category `'Other'`, `iconPath` under `/icons/other/<id>.svg`:

`managed-blockchain`, `braket`, `ground-station`, `robomaker`, `gamelift`, `open-3d-engine`, `workspaces`, `appstream-2-0`, `workdocs`, `chime`, `connect`, `workmail`.

- [ ] **Step 2: Update index.ts to its final form**

```ts
import type { AWSService } from '../../types/service';
import { COMPUTE_SERVICES } from './compute';
import { CONTAINER_SERVICES } from './containers';
import { STORAGE_SERVICES } from './storage';
import { DATABASE_SERVICES } from './database';
import { NETWORKING_SERVICES } from './networking';
import { SECURITY_SERVICES } from './security';
import { ANALYTICS_SERVICES } from './analytics';
import { ML_SERVICES } from './ml';
import { INTEGRATION_SERVICES } from './integration';
import { MANAGEMENT_SERVICES } from './management';
import { DEVELOPER_TOOLS_SERVICES } from './developerTools';
import { MIGRATION_SERVICES } from './migration';
import { MEDIA_SERVICES } from './media';
import { IOT_SERVICES } from './iot';
import { MISC_SERVICES } from './misc';

export const ALL_SERVICES: AWSService[] = [
  ...COMPUTE_SERVICES,
  ...CONTAINER_SERVICES,
  ...STORAGE_SERVICES,
  ...DATABASE_SERVICES,
  ...NETWORKING_SERVICES,
  ...SECURITY_SERVICES,
  ...ANALYTICS_SERVICES,
  ...ML_SERVICES,
  ...INTEGRATION_SERVICES,
  ...MANAGEMENT_SERVICES,
  ...DEVELOPER_TOOLS_SERVICES,
  ...MIGRATION_SERVICES,
  ...MEDIA_SERVICES,
  ...IOT_SERVICES,
  ...MISC_SERVICES,
];

export function getServiceById(id: string): AWSService | undefined {
  return ALL_SERVICES.find((service) => service.id === id);
}
```

- [ ] **Step 3: Add matching icon files**

Following the Task 9 process, source and add an icon SVG under `public/icons/<category-folder>/<id>.svg` for every service id introduced across Tasks 10–16 that doesn't already have one.

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit` then `npm run dev` — confirm all 15 categories appear in the filter, search works across the full dataset, and every card shows a real icon (not a broken image).

- [ ] **Step 5: Commit**

```bash
git add src/data/services/misc.ts src/data/services/index.ts public/icons
git commit -m "feat: author remaining niche service data and complete icon set"
```

---

### Task 17: Build DiagramCanvas (React Flow wrapper with animated edges)

**Files:**
- Create: `src/components/Diagram/ServiceNode.tsx`
- Create: `src/components/Diagram/DiagramCanvas.tsx`
- Create: `src/components/Diagram/DiagramCanvas.module.css`

**Interfaces:**
- Consumes: `ArchitectureDemo` (Task 3), `getServiceById` (Task 4/16).
- Produces: `<DiagramCanvas demo={ArchitectureDemo} onSelectService={(id: string) => void} />` — consumed by `ArchitecturePage` (Task 19).

- [ ] **Step 1: Write the custom node renderer**

`src/components/Diagram/DiagramCanvas.module.css`:

```css
.wrapper {
  height: 70vh;
  border: 1px solid #e3e6e8;
  border-radius: 8px;
}

.node {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem 0.75rem;
  background: #ffffff;
  border: 1px solid #ff9900;
  border-radius: 8px;
  cursor: pointer;
}

.nodeIcon {
  width: 36px;
  height: 36px;
}

.nodeLabel {
  font-size: 0.75rem;
  text-align: center;
}
```

`src/components/Diagram/ServiceNode.tsx`:

```tsx
import { Handle, Position, type NodeProps } from 'reactflow';
import { getServiceById } from '../../data/services';
import styles from './DiagramCanvas.module.css';

export interface ServiceNodeData {
  serviceId: string;
  onSelect: (id: string) => void;
}

export default function ServiceNode({ data }: NodeProps<ServiceNodeData>) {
  const service = getServiceById(data.serviceId);
  if (!service) return null;

  return (
    <div className={styles.node} onClick={() => data.onSelect(data.serviceId)}>
      <Handle type="target" position={Position.Left} />
      <img src={service.iconPath} alt={service.name} className={styles.nodeIcon} />
      <span className={styles.nodeLabel}>{service.name}</span>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
```

- [ ] **Step 2: Write DiagramCanvas**

`src/components/Diagram/DiagramCanvas.tsx`:

```tsx
import { useMemo } from 'react';
import ReactFlow, { Background, Controls, type Edge, type Node } from 'reactflow';
import 'reactflow/dist/style.css';
import type { ArchitectureDemo } from '../../types/architecture';
import ServiceNode, { type ServiceNodeData } from './ServiceNode';
import styles from './DiagramCanvas.module.css';

interface DiagramCanvasProps {
  demo: ArchitectureDemo;
  onSelectService: (id: string) => void;
}

const nodeTypes = { serviceNode: ServiceNode };

export default function DiagramCanvas({ demo, onSelectService }: DiagramCanvasProps) {
  const nodes: Node<ServiceNodeData>[] = useMemo(
    () =>
      demo.nodes.map((node) => ({
        id: node.id,
        type: 'serviceNode',
        position: node.position,
        data: { serviceId: node.serviceId, onSelect: onSelectService },
      })),
    [demo, onSelectService]
  );

  const edges: Edge[] = useMemo(
    () =>
      demo.edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        label: edge.label,
        animated: edge.animated,
      })),
    [demo]
  );

  return (
    <div className={styles.wrapper}>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
```

- [ ] **Step 3: Verify manually**

Full verification happens once wired with real demo data in Task 19 — skip standalone verification here.

- [ ] **Step 4: Commit**

```bash
git add src/components/Diagram
git commit -m "feat: add DiagramCanvas with React Flow animated edges"
```

---

### Task 18: Author architecture demo data (all 14 demos)

**Files:**
- Create: `src/data/architectures/staticWebsite.ts`
- Create: `src/data/architectures/threeTier.ts`
- Create: `src/data/architectures/serverlessApi.ts`
- Create: `src/data/architectures/containerOrchestration.ts`
- Create: `src/data/architectures/dataLake.ts`
- Create: `src/data/architectures/streaming.ts`
- Create: `src/data/architectures/mlPipeline.ts`
- Create: `src/data/architectures/cicd.ts`
- Create: `src/data/architectures/hybridNetworking.ts`
- Create: `src/data/architectures/disasterRecovery.ts`
- Create: `src/data/architectures/iotIngestion.ts`
- Create: `src/data/architectures/microservicesMesh.ts`
- Create: `src/data/architectures/eventDriven.ts`
- Create: `src/data/architectures/securityBaseline.ts`
- Create: `src/data/architectures/index.ts`

**Interfaces:**
- Consumes: `ArchitectureDemo` type (Task 3), service ids from Tasks 10–16 (every `serviceId` referenced here must exist in `ALL_SERVICES`).
- Produces: `ALL_ARCHITECTURES: ArchitectureDemo[]`, `getArchitectureById(id: string)` — consumed by `ArchitecturePage` (Task 19).

- [ ] **Step 1: Author the first demo as the worked example**

`src/data/architectures/staticWebsite.ts`:

```ts
import type { ArchitectureDemo } from '../../types/architecture';

export const STATIC_WEBSITE_DEMO: ArchitectureDemo = {
  id: 'static-website',
  title: 'Static Website Hosting',
  description:
    'A globally distributed static website: content lives in an S3 bucket, CloudFront caches and serves it from edge locations worldwide, and Route 53 resolves the custom domain to CloudFront.',
  nodes: [
    { id: 'n1', serviceId: 'route-53', position: { x: 0, y: 100 } },
    { id: 'n2', serviceId: 'cloudfront', position: { x: 250, y: 100 } },
    { id: 'n3', serviceId: 's3', position: { x: 500, y: 100 } },
  ],
  edges: [
    { id: 'e1', source: 'n1', target: 'n2', label: 'DNS resolution', animated: true },
    { id: 'e2', source: 'n2', target: 'n3', label: 'Origin fetch (cache miss)', animated: true },
  ],
};
```

- [ ] **Step 2: Author the remaining 13 demos using the same structure**

Create each file below with the same shape as Step 1 (an `id`, `title`, `description`, 3-6 `nodes` with real `serviceId`s from the dataset authored in Tasks 10–16, and `edges` connecting them with descriptive `label`s and `animated: true`):

- `threeTier.ts` → `THREE_TIER_DEMO`: nodes using `elastic-load-balancing`, `ec2`, `ec2-auto-scaling`, `rds`.
- `serverlessApi.ts` → `SERVERLESS_API_DEMO`: nodes using `api-gateway`, `lambda`, `dynamodb`.
- `containerOrchestration.ts` → `CONTAINER_ORCHESTRATION_DEMO`: nodes using `ecs`, `eks`, `fargate`, `ecr`.
- `dataLake.ts` → `DATA_LAKE_DEMO`: nodes using `s3`, `glue`, `athena`, `quicksight`.
- `streaming.ts` → `STREAMING_DEMO`: nodes using `kinesis-data-streams`, `lambda`, `dynamodb`.
- `mlPipeline.ts` → `ML_PIPELINE_DEMO`: nodes using `sagemaker`, `s3`, `lambda`.
- `cicd.ts` → `CICD_DEMO`: nodes using `codecommit`, `codepipeline`, `codebuild`, `codedeploy`.
- `hybridNetworking.ts` → `HYBRID_NETWORKING_DEMO`: nodes using `vpn`, `direct-connect`, `transit-gateway`.
- `disasterRecovery.ts` → `DISASTER_RECOVERY_DEMO`: nodes using `route-53`, `s3`, `rds`.
- `iotIngestion.ts` → `IOT_INGESTION_DEMO`: nodes using `iot-core`, `kinesis-data-streams`, `s3`.
- `microservicesMesh.ts` → `MICROSERVICES_MESH_DEMO`: nodes using `ecs`, `app-mesh`.
- `eventDriven.ts` → `EVENT_DRIVEN_DEMO`: nodes using `eventbridge`, `sqs`, `sns`, `lambda`.
- `securityBaseline.ts` → `SECURITY_BASELINE_DEMO`: nodes using `iam`, `organizations`, `control-tower`, `guardduty`.

Every `serviceId` referenced must match an `id` already present in `ALL_SERVICES` from Tasks 10–16 — cross-check against those files while writing node lists.

- [ ] **Step 3: Write the architectures index**

`src/data/architectures/index.ts`:

```ts
import type { ArchitectureDemo } from '../../types/architecture';
import { STATIC_WEBSITE_DEMO } from './staticWebsite';
import { THREE_TIER_DEMO } from './threeTier';
import { SERVERLESS_API_DEMO } from './serverlessApi';
import { CONTAINER_ORCHESTRATION_DEMO } from './containerOrchestration';
import { DATA_LAKE_DEMO } from './dataLake';
import { STREAMING_DEMO } from './streaming';
import { ML_PIPELINE_DEMO } from './mlPipeline';
import { CICD_DEMO } from './cicd';
import { HYBRID_NETWORKING_DEMO } from './hybridNetworking';
import { DISASTER_RECOVERY_DEMO } from './disasterRecovery';
import { IOT_INGESTION_DEMO } from './iotIngestion';
import { MICROSERVICES_MESH_DEMO } from './microservicesMesh';
import { EVENT_DRIVEN_DEMO } from './eventDriven';
import { SECURITY_BASELINE_DEMO } from './securityBaseline';

export const ALL_ARCHITECTURES: ArchitectureDemo[] = [
  STATIC_WEBSITE_DEMO,
  THREE_TIER_DEMO,
  SERVERLESS_API_DEMO,
  CONTAINER_ORCHESTRATION_DEMO,
  DATA_LAKE_DEMO,
  STREAMING_DEMO,
  ML_PIPELINE_DEMO,
  CICD_DEMO,
  HYBRID_NETWORKING_DEMO,
  DISASTER_RECOVERY_DEMO,
  IOT_INGESTION_DEMO,
  MICROSERVICES_MESH_DEMO,
  EVENT_DRIVEN_DEMO,
  SECURITY_BASELINE_DEMO,
];

export function getArchitectureById(id: string): ArchitectureDemo | undefined {
  return ALL_ARCHITECTURES.find((demo) => demo.id === id);
}
```

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit` — expect no errors (this also catches any `serviceId` typos, though TypeScript won't catch an id that's merely missing from the dataset — manually re-check each node's `serviceId` against the relevant category file from Tasks 10–16).

- [ ] **Step 5: Commit**

```bash
git add src/data/architectures
git commit -m "feat: author all 14 architecture demo datasets"
```

---

### Task 19: Build ArchitecturePage (demo list + canvas + node-click integration)

**Files:**
- Modify: `src/pages/ArchitecturePage.tsx`

**Interfaces:**
- Consumes: `ALL_ARCHITECTURES`, `getArchitectureById` (Task 18), `DiagramCanvas` (Task 17), `ServiceModal` (Task 7), `getServiceById` (Task 16), `useParams`/`useNavigate` from `react-router-dom`.

- [ ] **Step 1: Write the full page**

`src/pages/ArchitecturePage.tsx`:

```tsx
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import type { AWSService } from '../types/service';
import { ALL_ARCHITECTURES, getArchitectureById } from '../data/architectures';
import { getServiceById } from '../data/services';
import DiagramCanvas from '../components/Diagram/DiagramCanvas';
import ServiceModal from '../components/ServiceModal/ServiceModal';

export default function ArchitecturePage() {
  const { demoId } = useParams();
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<AWSService | null>(null);

  const activeDemo = demoId ? getArchitectureById(demoId) : ALL_ARCHITECTURES[0];

  return (
    <div style={{ display: 'flex', gap: '1.5rem', padding: '1.5rem 2rem' }}>
      <aside style={{ minWidth: 220 }}>
        <h2>Architecture Demos</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {ALL_ARCHITECTURES.map((demo) => (
            <li key={demo.id}>
              <button
                type="button"
                onClick={() => navigate(`/architecture/${demo.id}`)}
                style={{ fontWeight: activeDemo?.id === demo.id ? 700 : 400 }}
              >
                {demo.title}
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {activeDemo && (
        <div style={{ flex: 1 }}>
          <h2>{activeDemo.title}</h2>
          <p>{activeDemo.description}</p>
          <DiagramCanvas
            demo={activeDemo}
            onSelectService={(id) => {
              const service = getServiceById(id);
              if (service) setSelectedService(service);
            }}
          />
        </div>
      )}

      <ServiceModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onNavigateToService={(id) => {
          const next = getServiceById(id);
          if (next) setSelectedService(next);
        }}
      />
    </div>
  );
}
```

- [ ] **Step 2: Verify manually**

Run: `npm run dev`, navigate to "Architecture Demos".
Expected: sidebar lists all 14 demo titles. The first demo loads by default. Clicking a different title loads its diagram (nodes + animated dashed edges visible, pan/zoom works via React Flow controls). Clicking a node opens the ServiceModal with that service's full detail, including working "Related Services" navigation. The URL updates to `#/architecture/<demo-id>` and survives a page refresh.

- [ ] **Step 3: Commit**

```bash
git add src/pages/ArchitecturePage.tsx
git commit -m "feat: wire ArchitecturePage with demo list, DiagramCanvas, and ServiceModal"
```

---

### Task 20: Visual polish pass (page transitions, hover states, typography)

**Files:**
- Modify: `src/pages/HomePage.tsx`
- Modify: `src/pages/ArchitecturePage.tsx`
- Create: `src/App.module.css` (or equivalent global stylesheet)
- Modify: `src/main.tsx` (import global stylesheet)

**Interfaces:**
- No new exports — this task only adds styling/animation polish on top of existing components.

- [ ] **Step 1: Add a global stylesheet with base typography and color tokens**

`src/App.module.css`:

```css
:global(body) {
  margin: 0;
  font-family: 'Amazon Ember', 'Helvetica Neue', Arial, sans-serif;
  background: #ffffff;
  color: #16191f;
}

:global(h1),
:global(h2) {
  color: #232f3e;
}

:global(button) {
  font-family: inherit;
}
```

- [ ] **Step 2: Import it globally**

In `src/main.tsx`, add `import './App.module.css';` near the top (alongside the existing React/ReactDOM imports).

- [ ] **Step 3: Add page-level fade transition on route change**

Wrap each page's root element in a `motion.div` with a simple fade-in, matching the pattern already used in `ServiceGrid` (Task 6) and `ServiceModal` (Task 7) — e.g. in `HomePage.tsx`, wrap the returned `<div>` with `<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.2 }}>` (add the `motion` import from `framer-motion`). Apply the same wrapper in `ArchitecturePage.tsx`.

- [ ] **Step 4: Verify manually**

Run: `npm run dev`. Confirm: typography and colors look intentional (not default browser styles), switching between Service Directory and Architecture Demos fades smoothly, and no console errors appear.

- [ ] **Step 5: Commit**

```bash
git add src/App.module.css src/main.tsx src/pages
git commit -m "style: add global typography, color tokens, and page transition polish"
```

---

### Task 21: Offline build verification

**Files:**
- No new files — this task is a verification pass per spec §7.

**Interfaces:**
- None — final acceptance gate for the whole plan.

- [ ] **Step 1: Produce a fresh production build**

```bash
npm run build
```

Expected: `dist/` is created with no build errors or warnings about unresolved imports.

- [ ] **Step 2: Verify `file://` compatibility**

Open `dist/index.html` directly by double-clicking it in a file explorer (not via `npm run dev`/`preview`).
Expected: the app loads fully — nav, grid with all services and icons, search/filter, modal, and architecture diagrams with animated edges all work identically to the dev server, with no blank page and no console errors about failed asset loads.

- [ ] **Step 3: Verify static-server compatibility**

```bash
npx serve dist
```

Open the printed local URL.
Expected: identical behavior to Step 2.

- [ ] **Step 4: Confirm no network dependency**

With the static server from Step 3 still running, disconnect the machine from the network (or use browser dev tools to throttle to "offline") and reload the page.
Expected: the app still loads and functions fully — this confirms no CDN fonts, icons, or scripts are being fetched externally.

- [ ] **Step 5: Spot-check content accuracy**

Pick 5 services at random — including at least 2 from the niche/misc categories authored in Task 16 — and compare their `description`, `examNotes`, and `pricingModel` fields against current official AWS documentation. Fix any inaccuracies found directly in the relevant `src/data/services/*.ts` file.

- [ ] **Step 6: Commit any fixes from Step 5**

```bash
git add src/data/services
git commit -m "fix: correct service data inaccuracies found during offline verification"
```

(Skip this step if Step 5 found no issues.)

---

## Self-Review Notes

- **Spec coverage:** §2 scope (all services incl. niche, 14 named demos) → Tasks 10–16, 18. §3 tech stack (Vite/React/TS, HashRouter, React Flow, Framer Motion, offline base config) → Tasks 1, 2, 5, 17, 21. §4 data model (8-field service schema, architecture demo schema) → Task 3. §5 pages/interaction (grid+search+filter, modal with related-service nav, demo list + canvas + node click-through, persistent nav with Hash routing) → Tasks 5, 6, 7, 8, 19. §7 testing/offline verification → Task 21 (plus the manual-verification approach declared in Global Constraints, replacing automated tests per spec's explicit exclusion).
- **Placeholder scan:** all content-authoring tasks (10–16, 18) name the exact services/demos to write and give one fully-worked example per file as the detail bar, rather than "TBD" or "similar to above" — this is the intentional, spec-appropriate way to scope large data-authoring work without literally inlining 200+ records into the plan document itself.
- **Type consistency:** `AWSService`, `ArchitectureDemo`/`ArchitectureNode`/`ArchitectureEdge` (Task 3) are used with identical field names across Tasks 4, 6, 7, 10–19. `getServiceById` (Task 4) and `getArchitectureById` (Task 18) signatures match their call sites in Tasks 7, 8, 17, 19.
