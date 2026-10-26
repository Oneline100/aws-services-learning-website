import type { ArchitectureDemo } from '../../types/architecture';

export const SERVERLESS_API_DEMO: ArchitectureDemo = {
  id: 'serverless-api',
  title: 'Serverless REST API',
  description:
    'A fully managed, pay-per-use API: API Gateway exposes HTTPS endpoints that invoke Lambda functions on demand, which read and write items in a DynamoDB table.',
  nodes: [
    { id: 'n1', serviceId: 'api-gateway', position: { x: 0, y: 100 } },
    { id: 'n2', serviceId: 'lambda', position: { x: 340, y: 100 } },
    { id: 'n3', serviceId: 'dynamodb', position: { x: 680, y: 100 } },
  ],
  edges: [
    { id: 'e1', source: 'n1', target: 'n2', label: 'Invoke function on request', animated: true },
    { id: 'e2', source: 'n2', target: 'n3', label: 'Read/write item', animated: true },
  ],
};
