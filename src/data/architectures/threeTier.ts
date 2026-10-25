import type { ArchitectureDemo } from '../../types/architecture';

export const THREE_TIER_DEMO: ArchitectureDemo = {
  id: 'three-tier',
  title: 'Three-Tier Web Application',
  description:
    'A classic resilient web application: an Elastic Load Balancer distributes incoming traffic across a fleet of EC2 instances managed by Auto Scaling, which read and write application data in an RDS relational database.',
  nodes: [
    { id: 'n1', serviceId: 'elastic-load-balancing', position: { x: 0, y: 100 } },
    { id: 'n2', serviceId: 'ec2', position: { x: 250, y: 100 } },
    { id: 'n3', serviceId: 'ec2-auto-scaling', position: { x: 250, y: 300 } },
    { id: 'n4', serviceId: 'rds', position: { x: 500, y: 100 } },
  ],
  edges: [
    { id: 'e1', source: 'n1', target: 'n2', label: 'HTTP request routing', animated: true },
    { id: 'e2', source: 'n3', target: 'n2', label: 'Scales instance fleet in/out', animated: true },
    { id: 'e3', source: 'n2', target: 'n4', label: 'SQL query/write', animated: true },
  ],
};
