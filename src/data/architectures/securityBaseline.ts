import type { ArchitectureDemo } from '../../types/architecture';

export const SECURITY_BASELINE_DEMO: ArchitectureDemo = {
  id: 'security-baseline',
  title: 'Multi-Account Security Baseline',
  description:
    'Organizations groups all member accounts under central management, Control Tower provisions those accounts with guardrails and governance, IAM enforces fine-grained access policies within each account, and GuardDuty continuously monitors for threats across the organization.',
  nodes: [
    { id: 'n1', serviceId: 'organizations', position: { x: 0, y: 140 } },
    { id: 'n2', serviceId: 'control-tower', position: { x: 340, y: 140 } },
    { id: 'n3', serviceId: 'iam', position: { x: 700, y: 20 } },
    { id: 'n4', serviceId: 'guardduty', position: { x: 700, y: 260 } },
  ],
  edges: [
    { id: 'e1', source: 'n1', target: 'n2', label: 'Provision governed landing zone', animated: true },
    { id: 'e2', source: 'n2', target: 'n3', label: 'Enforces account access policies', animated: true },
    { id: 'e3', source: 'n2', target: 'n4', label: 'Enables threat monitoring org-wide', animated: true },
  ],
};
