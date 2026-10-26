import type { ArchitectureDemo } from '../../types/architecture';

export const CONTAINER_ORCHESTRATION_DEMO: ArchitectureDemo = {
  id: 'container-orchestration',
  title: 'Container Orchestration',
  description:
    'Container images are built and stored in ECR, then deployed as serverless containers on Fargate, which can be run under either ECS or EKS orchestration without managing underlying servers.',
  nodes: [
    { id: 'n1', serviceId: 'ecr', position: { x: 0, y: 180 } },
    { id: 'n2', serviceId: 'fargate', position: { x: 360, y: 180 } },
    { id: 'n3', serviceId: 'ecs', position: { x: 720, y: 60 } },
    { id: 'n4', serviceId: 'eks', position: { x: 720, y: 300 } },
  ],
  edges: [
    { id: 'e1', source: 'n1', target: 'n2', label: 'Pull container image', animated: true },
    { id: 'e2', source: 'n2', target: 'n3', label: 'Runs tasks on serverless compute', animated: true },
    { id: 'e3', source: 'n2', target: 'n4', label: 'Runs pods on serverless compute', animated: true },
  ],
};
