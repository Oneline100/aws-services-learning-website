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
