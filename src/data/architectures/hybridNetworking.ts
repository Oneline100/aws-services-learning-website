import type { ArchitectureDemo } from '../../types/architecture';

export const HYBRID_NETWORKING_DEMO: ArchitectureDemo = {
  id: 'hybrid-networking',
  title: 'Hybrid Cloud Networking',
  description:
    'An on-premises data center connects to AWS over both a Site-to-Site VPN (for failover and quick setup) and Direct Connect (for dedicated low-latency bandwidth), with Transit Gateway acting as the central hub routing traffic to multiple VPCs.',
  nodes: [
    { id: 'n1', serviceId: 'vpn', position: { x: 0, y: 50 } },
    { id: 'n2', serviceId: 'direct-connect', position: { x: 0, y: 250 } },
    { id: 'n3', serviceId: 'transit-gateway', position: { x: 300, y: 150 } },
  ],
  edges: [
    { id: 'e1', source: 'n1', target: 'n3', label: 'Encrypted failover connection', animated: true },
    { id: 'e2', source: 'n2', target: 'n3', label: 'Dedicated private connection', animated: true },
  ],
};
