export const CATEGORIES = [
  'Compute',
  'Containers',
  'Storage',
  'Database',
  'Networking & Content Delivery',
  'Security, Identity & Compliance',
  'Analytics',
  'Machine Learning',
  'Application Integration',
  'Management & Governance',
  'Developer Tools',
  'Migration & Transfer',
  'Media Services',
  'IoT',
  'Other',
] as const;

export type Category = (typeof CATEGORIES)[number];
