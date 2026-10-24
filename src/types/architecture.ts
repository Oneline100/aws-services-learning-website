export interface ArchitectureNode {
  id: string;
  serviceId: string;
  position: { x: number; y: number };
}

export interface ArchitectureEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
  animated: boolean;
}

export interface ArchitectureDemo {
  id: string;
  title: string;
  description: string;
  nodes: ArchitectureNode[];
  edges: ArchitectureEdge[];
}
