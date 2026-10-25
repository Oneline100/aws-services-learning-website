import type { ArchitectureDemo } from '../../types/architecture';

export const DISASTER_RECOVERY_DEMO: ArchitectureDemo = {
  id: 'disaster-recovery',
  title: 'Multi-Region Disaster Recovery',
  description:
    'Application data in RDS is continuously replicated and backed up to S3 across regions, and Route 53 health checks monitor the primary region, automatically failing over DNS to the secondary region if it becomes unhealthy.',
  nodes: [
    { id: 'n1', serviceId: 'route-53', position: { x: 0, y: 100 } },
    { id: 'n2', serviceId: 'rds', position: { x: 250, y: 100 } },
    { id: 'n3', serviceId: 's3', position: { x: 500, y: 100 } },
  ],
  edges: [
    { id: 'e1', source: 'n1', target: 'n2', label: 'Health check and failover routing', animated: true },
    { id: 'e2', source: 'n2', target: 'n3', label: 'Cross-region backup/snapshot', animated: true },
  ],
};
