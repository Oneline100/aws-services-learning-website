import { Handle, Position, type NodeProps } from 'reactflow';
import type { CSSProperties } from 'react';
import { getServiceById } from '../../data/services';
import { handleIconError } from '../../utils/iconFallback';
import { categoryColor } from '../../utils/categoryColor';
import styles from './DiagramCanvas.module.css';

export interface ServiceNodeData {
  serviceId: string;
  onSelect: (id: string) => void;
}

export default function ServiceNode({ data }: NodeProps<ServiceNodeData>) {
  const service = getServiceById(data.serviceId);
  if (!service) return null;

  return (
    <div
      className={styles.node}
      style={{ '--accent': categoryColor(service.category) } as CSSProperties}
      onClick={() => data.onSelect(data.serviceId)}
    >
      <Handle type="target" position={Position.Left} />
      <img
        src={service.iconPath}
        alt={service.name}
        className={styles.nodeIcon}
        onError={handleIconError}
      />
      <span className={styles.nodeLabel}>{service.name}</span>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
