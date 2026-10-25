import type { ArchitectureDemo } from '../../types/architecture';

export const EVENT_DRIVEN_DEMO: ArchitectureDemo = {
  id: 'event-driven',
  title: 'Event-Driven Architecture',
  description:
    'An application publishes domain events to EventBridge, which routes matching events to an SQS queue for durable buffered processing and to an SNS topic for fan-out notification, with a Lambda function consuming the queued messages.',
  nodes: [
    { id: 'n1', serviceId: 'eventbridge', position: { x: 0, y: 150 } },
    { id: 'n2', serviceId: 'sqs', position: { x: 300, y: 50 } },
    { id: 'n3', serviceId: 'sns', position: { x: 300, y: 250 } },
    { id: 'n4', serviceId: 'lambda', position: { x: 600, y: 50 } },
  ],
  edges: [
    { id: 'e1', source: 'n1', target: 'n2', label: 'Route matched event to queue', animated: true },
    { id: 'e2', source: 'n1', target: 'n3', label: 'Route matched event to topic', animated: true },
    { id: 'e3', source: 'n2', target: 'n4', label: 'Poll and process queued message', animated: true },
  ],
};
