import type { Category } from '../data/categories';

const FAMILY: Record<Category, string> = {
  Compute: '#D97706',
  Containers: '#D97706',
  'Developer Tools': '#D97706',
  Storage: '#2F5597',
  Database: '#2F5597',
  'Migration & Transfer': '#2F5597',
  'Networking & Content Delivery': '#0F9488',
  'Management & Governance': '#0F9488',
  'Security, Identity & Compliance': '#B3433D',
  Analytics: '#7C6FE0',
  'Machine Learning': '#7C6FE0',
  'Application Integration': '#0FB5BA',
  'Media Services': '#0FB5BA',
  IoT: '#0FB5BA',
  Other: '#0FB5BA',
};

export function categoryColor(category: string): string {
  return FAMILY[category as Category] ?? '#64748B';
}
