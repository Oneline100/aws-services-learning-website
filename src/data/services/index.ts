import type { AWSService } from '../../types/service';
import { COMPUTE_SERVICES } from './compute';
import { CONTAINER_SERVICES } from './containers';

// TODO(Task 11): the `s3` entry below moves to storage.ts when STORAGE_SERVICES is added.
// Remove it from ALL_SERVICES here once that happens so it isn't duplicated.
const S3_SAMPLE: AWSService[] = [
  {
    id: 's3',
    name: 'Amazon S3',
    category: 'Storage',
    tagline: 'Object storage built for scale, durability, and availability.',
    description:
      'Amazon Simple Storage Service (S3) stores any amount of data as objects within buckets, offering 99.999999999% (11 nines) durability and multiple storage classes to balance cost against access frequency.',
    keyFeatures: [
      'Storage classes from S3 Standard to Glacier for cost/access tradeoffs',
      'Versioning, lifecycle policies, and cross-region replication',
      'Static website hosting directly from a bucket',
      'Strong read-after-write consistency for all operations',
    ],
    useCases: [
      'Static website and asset hosting',
      'Data lake storage for analytics pipelines',
      'Backup, archival, and disaster recovery targets',
    ],
    examNotes: [
      'S3 is regional, but bucket names are globally unique',
      'S3 Standard-IA and One Zone-IA trade availability/durability for lower cost — know the difference',
      'Glacier retrieval times range from minutes (Expedited) to hours (Bulk) — pick based on RTO needs',
    ],
    relatedServices: ['cloudfront', 'glacier', 'athena'],
    pricingModel: 'Pay per GB stored per month (varies by storage class), plus request and data transfer fees.',
    iconPath: '/icons/storage/s3.svg',
  },
];

export const ALL_SERVICES: AWSService[] = [
  ...COMPUTE_SERVICES,
  ...CONTAINER_SERVICES,
  ...S3_SAMPLE,
];

export function getServiceById(id: string): AWSService | undefined {
  return ALL_SERVICES.find((service) => service.id === id);
}
