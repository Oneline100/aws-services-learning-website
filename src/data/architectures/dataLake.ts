import type { ArchitectureDemo } from '../../types/architecture';

export const DATA_LAKE_DEMO: ArchitectureDemo = {
  id: 'data-lake',
  title: 'Data Lake Analytics',
  description:
    'Raw data lands in an S3-based data lake, Glue crawls and catalogs it into queryable schemas, Athena runs serverless SQL queries directly against S3, and QuickSight visualizes the results in dashboards.',
  nodes: [
    { id: 'n1', serviceId: 's3', position: { x: 0, y: 100 } },
    { id: 'n2', serviceId: 'glue', position: { x: 340, y: 100 } },
    { id: 'n3', serviceId: 'athena', position: { x: 680, y: 100 } },
    { id: 'n4', serviceId: 'quicksight', position: { x: 1020, y: 100 } },
  ],
  edges: [
    { id: 'e1', source: 'n1', target: 'n2', label: 'Crawl and catalog raw data', animated: true },
    { id: 'e2', source: 'n2', target: 'n3', label: 'Provides schema for SQL queries', animated: true },
    { id: 'e3', source: 'n3', target: 'n4', label: 'Query results feed dashboard', animated: true },
  ],
};
