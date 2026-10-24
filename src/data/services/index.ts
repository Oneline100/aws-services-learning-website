import type { AWSService } from '../../types/service';

export const ALL_SERVICES: AWSService[] = [
  {
    id: 'ec2',
    name: 'Amazon EC2',
    category: 'Compute',
    tagline: 'Resizable virtual servers in the cloud.',
    description:
      'Amazon Elastic Compute Cloud (EC2) provides on-demand, resizable virtual machines ("instances") that run your applications. You choose the instance family, size, operating system, and storage, and can scale capacity up or down within minutes.',
    keyFeatures: [
      'Wide range of instance families optimized for compute, memory, storage, or GPU workloads',
      'Pay-as-you-go, Reserved, Savings Plans, and Spot pricing models',
      'Auto Scaling Groups for automatic capacity adjustment',
      'Elastic Block Store (EBS) for persistent attached storage',
    ],
    useCases: [
      'Hosting traditional web applications and APIs',
      'Batch processing and high-performance computing',
      'Lift-and-shift migration of on-premises workloads',
    ],
    examNotes: [
      'Spot Instances can be reclaimed by AWS with 2 minutes notice — not for stateful, uninterruptible workloads',
      'Reserved Instances and Savings Plans both discount steady-state usage, but Savings Plans are more flexible across instance families',
      'EC2 instance store is ephemeral; EBS volumes persist independently of the instance lifecycle',
    ],
    relatedServices: ['ebs', 'elastic-load-balancing', 'auto-scaling'],
    pricingModel: 'Pay per instance-hour/second; also Reserved, Savings Plans, and Spot pricing.',
    iconPath: '/icons/compute/ec2.svg',
  },
  {
    id: 'lambda',
    name: 'AWS Lambda',
    category: 'Compute',
    tagline: 'Run code without provisioning or managing servers.',
    description:
      'AWS Lambda runs your code in response to events (HTTP requests, file uploads, queue messages, schedules) and automatically manages the compute infrastructure, scaling from zero to thousands of concurrent executions.',
    keyFeatures: [
      'Event-driven execution triggered by 200+ AWS services',
      'Automatic scaling with no server management',
      'Billed per millisecond of execution time and memory allocated',
      'Supports multiple runtimes (Node.js, Python, Java, Go, .NET, Ruby, custom containers)',
    ],
    useCases: [
      'Serverless REST/GraphQL API backends (with API Gateway)',
      'Real-time file or stream processing',
      'Scheduled automation tasks',
    ],
    examNotes: [
      'Default execution timeout max is 15 minutes — not for long-running batch jobs',
      'Cold starts can add latency; provisioned concurrency mitigates this',
      'Lambda is stateless between invocations — persist state externally (DynamoDB, S3, etc.)',
    ],
    relatedServices: ['api-gateway', 'dynamodb', 'eventbridge'],
    pricingModel: 'Pay per request and per GB-second of compute duration; free tier included.',
    iconPath: '/icons/compute/lambda.svg',
  },
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

export function getServiceById(id: string): AWSService | undefined {
  return ALL_SERVICES.find((service) => service.id === id);
}
