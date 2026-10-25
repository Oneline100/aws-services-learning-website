import type { ArchitectureDemo } from '../../types/architecture';

export const MICROSERVICES_MESH_DEMO: ArchitectureDemo = {
  id: 'microservices-mesh',
  title: 'Microservices Service Mesh',
  description:
    'Microservices run as ECS tasks, with App Mesh providing a service mesh layer that manages service-to-service traffic routing, observability, and encryption between those tasks without changing application code.',
  nodes: [
    { id: 'n1', serviceId: 'ecs', position: { x: 0, y: 100 } },
    { id: 'n2', serviceId: 'app-mesh', position: { x: 300, y: 100 } },
  ],
  edges: [
    { id: 'e1', source: 'n2', target: 'n1', label: 'Manages service-to-service traffic', animated: true },
  ],
};
