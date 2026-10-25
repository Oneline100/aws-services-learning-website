import type { ArchitectureDemo } from '../../types/architecture';

export const STREAMING_DEMO: ArchitectureDemo = {
  id: 'streaming',
  title: 'Real-Time Stream Processing',
  description:
    'Clickstream and event data is ingested continuously into Kinesis Data Streams, a Lambda function processes each batch of records in near real time, and results are persisted to DynamoDB for low-latency lookups.',
  nodes: [
    { id: 'n1', serviceId: 'kinesis-data-streams', position: { x: 0, y: 100 } },
    { id: 'n2', serviceId: 'lambda', position: { x: 250, y: 100 } },
    { id: 'n3', serviceId: 'dynamodb', position: { x: 500, y: 100 } },
  ],
  edges: [
    { id: 'e1', source: 'n1', target: 'n2', label: 'Poll and process record batch', animated: true },
    { id: 'e2', source: 'n2', target: 'n3', label: 'Write processed result', animated: true },
  ],
};
