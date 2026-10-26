import { useMemo } from 'react';
import ReactFlow, { Background, Controls, MarkerType, type Edge, type Node } from 'reactflow';
import 'reactflow/dist/style.css';
import type { ArchitectureDemo } from '../../types/architecture';
import ServiceNode, { type ServiceNodeData } from './ServiceNode';
import styles from './DiagramCanvas.module.css';

interface DiagramCanvasProps {
  demo: ArchitectureDemo;
  onSelectService: (id: string) => void;
}

const nodeTypes = { serviceNode: ServiceNode };

export default function DiagramCanvas({ demo, onSelectService }: DiagramCanvasProps) {
  const nodes: Node<ServiceNodeData>[] = useMemo(
    () =>
      demo.nodes.map((node) => ({
        id: node.id,
        type: 'serviceNode',
        position: node.position,
        data: { serviceId: node.serviceId, onSelect: onSelectService },
      })),
    [demo, onSelectService]
  );

  const edges: Edge[] = useMemo(
    () =>
      demo.edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        label: edge.label,
        animated: edge.animated,
        style: { stroke: '#ff9900', strokeWidth: 1.75 },
        labelStyle: { fontSize: 11, fill: '#16213f' },
        labelBgStyle: { fill: '#ffffff', fillOpacity: 0.9 },
        markerEnd: { type: MarkerType.ArrowClosed, color: '#ff9900' },
      })),
    [demo]
  );

  return (
    <div className={styles.wrapper}>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView nodesDraggable={false}>
        <Background color="#e3e7ed" gap={24} size={1} />
        <Controls />
      </ReactFlow>
    </div>
  );
}
