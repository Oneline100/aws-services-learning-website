# AWS Services Learning Website — Design

**Date:** 2026-10-24
**Status:** Approved for implementation planning

## 1. Purpose

A fully offline, animated reference and learning site covering every AWS service (including niche and newly-released ones). Users browse a searchable/filterable grid of official AWS service icons, click any icon to see exam-oriented details, and explore animated architecture diagrams showing how services connect in real-world systems. The site must run entirely offline — deployable on any computer with no network dependency, no backend, and no build step required at run time (only at build time).

## 2. Scope

- **Service coverage:** All AWS services, not limited to exam-tested subsets. Niche and newer services are included deliberately, even where documentation/content depth will be thinner.
- **Architecture demos:** 14 pre-defined demo systems covering major patterns:
  1. Static website hosting (S3 + CloudFront + Route 53)
  2. Three-tier web app (ALB + EC2/ASG + RDS)
  3. Serverless API (API Gateway + Lambda + DynamoDB)
  4. Container orchestration (ECS/EKS + Fargate)
  5. Data lake / analytics pipeline (S3 + Glue + Athena + QuickSight)
  6. Streaming data processing (Kinesis + Lambda + DynamoDB)
  7. ML training & inference (SageMaker + S3 + Lambda)
  8. CI/CD pipeline (CodeCommit/CodePipeline/CodeBuild/CodeDeploy)
  9. Hybrid cloud networking (VPN/Direct Connect + Transit Gateway)
  10. Disaster recovery / multi-region (Route 53 + S3 cross-region replication + Multi-AZ RDS)
  11. IoT data ingestion (IoT Core + Kinesis + S3)
  12. Containerized microservices + service mesh (App Mesh/ECS)
  13. Event-driven architecture (EventBridge + SQS/SNS + Lambda)
  14. Security/identity baseline (IAM + Organizations + Control Tower + GuardDuty)
- **Icons:** Official AWS Architecture Icons asset pack, bundled locally; usage must comply with AWS's icon license terms.
- **Out of scope:** User accounts, progress tracking/bookmarking, live pricing data, backend/API, analytics/telemetry, automated test suite beyond manual verification (see §7).

## 3. Architecture & Tech Stack

- **Framework:** React 18 + TypeScript, built with Vite. Output is a static `dist/` bundle (HTML/CSS/JS) — openable via `file://` or any static file server, no backend required.
- **Routing:** React Router using `HashRouter` (not `BrowserRouter`), so routes work correctly when opened directly from the filesystem without server rewrite rules.
- **Diagrams/animation:** React Flow for the 14 architecture demo diagrams — handles node/edge layout, pan/zoom, and animated (dashed, directional) edges out of the box. Framer Motion handles UI micro-interactions: grid entrance animations, hover states, modal transitions.
- **Icons:** Official AWS Architecture Icons, stored under `public/icons/`, bundled into the build — no external/CDN requests at runtime.
- **Data:** All service and architecture data are static TypeScript modules compiled into the bundle at build time. Zero runtime network calls.
- **Build config:** Vite `base: './'` so asset paths resolve correctly when the site is opened from an arbitrary filesystem location.

### Project structure

```
src/
  data/services/         Service data (200+ entries, organized by category)
  data/architectures/     14 demo architecture definitions
  components/Grid/        Icon grid, category filter, search
  components/ServiceModal/ Service detail modal
  components/Diagram/     React Flow wrapper component
  pages/                  Home (grid) page, architecture demo page
public/icons/              Official AWS icon assets
```

## 4. Data Model

### 4.1 Service record

```ts
interface AWSService {
  id: string;               // unique slug, e.g. "s3"
  name: string;              // "Amazon S3"
  category: string;          // "Storage", "Compute", etc.
  tagline: string;            // one-sentence definition
  description: string;        // fuller description: purpose, core capabilities
  keyFeatures: string[];       // bullet list of key features
  useCases: string[];          // common usage scenarios
  examNotes: string[];          // exam-relevant gotchas, limits, service comparisons
  relatedServices: string[];     // ids of related/paired services (clickable)
  pricingModel: string;          // high-level pricing model summary (not exact prices)
  iconPath: string;              // path to the official AWS icon asset
}
```

A fixed category taxonomy (Compute, Storage, Networking, Database, Analytics, Machine Learning, Security, Application Integration, Management & Governance, Migration, Media, IoT, Blockchain, Satellite, Quantum, etc.) drives the grid's category filter. Service data is authored in batches by category, each batch checked against official AWS service listings/documentation.

### 4.2 Architecture demo record

```ts
interface ArchitectureDemo {
  id: string;
  title: string;               // e.g. "Serverless API"
  description: string;          // scenario explanation
  nodes: { id: string; serviceId: string; position: { x: number; y: number } }[];
  edges: { id: string; source: string; target: string; label?: string; animated: boolean }[];
}
```

Each node's `serviceId` links to a service record, so clicking a node in a diagram opens the same detail modal used on the grid page. Edges marked `animated: true` render as flowing dashed lines indicating data flow direction.

## 5. Pages & Interaction Flow

### 5.1 Home / Grid page
- Header: title, search box, category filter bar (single or multi-select by category).
- Body: responsive icon grid (official AWS icons + service name), with Framer Motion staggered fade-in on load/filter change.
- Clicking an icon opens a modal showing all 8 data fields for that service. Within the modal, clicking a related service swaps the modal's content (no close/reopen).
- A persistent nav entry links to the Architecture Demos page.

### 5.2 Architecture Demos page
- A list of the 14 demo architectures (sidebar or top list); selecting one loads its diagram.
- Main canvas: React Flow rendering nodes (service icon + name) and animated directional edges, with the scenario description shown alongside.
- Clicking a node opens the same service detail modal used on the grid page.
- Pan/zoom enabled (React Flow built-in); node positions are fixed per diagram (curated layouts, not freeform/draggable, since these are fixed demo scenarios rather than an open canvas).

### 5.3 Navigation
- Persistent top nav toggles between "Service Directory" and "Architecture Demos."
- `HashRouter` keeps view state in the URL (e.g. `#/architecture/serverless-api`) so a refresh doesn't lose place.

## 6. Non-Goals / Explicit Exclusions

- No bookmarking, "mark as learned," or new/updated-service tagging — grid browsing is limited to category filter + text search.
- No draggable/freeform diagram editing — architecture demos are fixed, curated layouts.
- No live/exact pricing figures (pricing models change frequently; only high-level billing model is included).

## 7. Testing & Offline Deployment Verification

- **Build check:** `npm run build` produces `dist/`; verify by opening `index.html` directly via `file://` (not just a dev server) to confirm relative asset paths, icons, and routing all work without a server.
- **Functional checks:** category filter and search return correct results; service modal renders all 8 fields and related-service links navigate correctly; each of the 14 architecture diagrams renders its icons and animated edges, and node clicks open the correct service detail.
- **Cross-environment check:** confirm the built site works both via direct double-click of `index.html` and via a simple static server (`npx serve dist`), with no CDN or network dependency (fonts and icons fully embedded locally).
- **Content check:** spot-check a sample of service entries — including niche/newer services — against official AWS documentation for accuracy of descriptions and exam notes.
- No automated unit-test framework is planned initially, since this is primarily static, content-driven output verified by manual review. Vitest may be added later if filtering/search logic grows more complex.
