import type { AWSService } from '../../types/service';

export const STORAGE_SERVICES: AWSService[] = [
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
    relatedServices: ['cloudfront', 's3-glacier', 'athena'],
    pricingModel: 'Pay per GB stored per month (varies by storage class), plus request and data transfer fees.',
    iconPath: './icons/storage/s3.svg',
  },
  {
    id: 'ebs',
    name: 'Amazon Elastic Block Store (EBS)',
    category: 'Storage',
    tagline: 'Persistent block storage volumes for EC2 instances.',
    description:
      'Amazon EBS provides durable, persistent block-level storage volumes that attach to EC2 instances, retaining data independently of the instance lifecycle. Volume types range from high-IOPS SSD to lower-cost HDD, tuned for different throughput and latency needs.',
    keyFeatures: [
      'Multiple volume types: General Purpose SSD (gp3/gp2), Provisioned IOPS SSD (io2/io1), Throughput Optimized HDD (st1), Cold HDD (sc1)',
      'Point-in-time snapshots stored in S3 for backup and cross-Region/account copying',
      'Volumes can be resized and have their type changed live, without downtime',
      'Multi-Attach support for io1/io2 volumes lets multiple instances share a volume',
    ],
    useCases: [
      'Boot volumes and primary storage for EC2 instances',
      'Databases and transactional workloads needing low-latency, high-IOPS storage',
      'Throughput-intensive workloads like big data and log processing (st1)',
    ],
    examNotes: [
      'EBS volumes are AZ-locked — to move one across AZs, snapshot it and restore into the target AZ',
      'Snapshots are incremental after the first full snapshot, reducing storage cost and backup time',
      'io2 Block Express offers the highest durability/performance tier for mission-critical databases',
    ],
    relatedServices: ['ec2', 's3', 'aws-backup'],
    pricingModel: 'Pay per GB-month provisioned (varies by volume type), plus provisioned IOPS/throughput charges.',
    iconPath: './icons/storage/ebs.svg',
  },
  {
    id: 'efs',
    name: 'Amazon Elastic File System (EFS)',
    category: 'Storage',
    tagline: 'Fully managed, elastic NFS file storage shared across instances.',
    description:
      'Amazon EFS provides a scalable, fully managed NFS file system that can be mounted concurrently by thousands of EC2 instances, containers, and Lambda functions across multiple Availability Zones, growing and shrinking automatically as files are added or removed.',
    keyFeatures: [
      'Elastic capacity — no pre-provisioning; storage grows and shrinks automatically',
      'Concurrent access from thousands of EC2 instances, containers, or Lambda functions',
      'Storage classes (Standard, Infrequent Access, Archive) with lifecycle management to cut cost',
      'Regional by default, replicating data across multiple AZs for high availability',
    ],
    useCases: [
      'Shared file storage for content management systems and web serving farms',
      'Shared persistent storage for containerized applications (ECS/EKS) and Lambda',
      'Big data analytics and media processing workloads needing shared access',
    ],
    examNotes: [
      'EFS uses the NFS protocol and works only with Linux-based workloads, unlike EBS which attaches to a single instance',
      'EFS is Regional (multi-AZ) by default; EBS is AZ-scoped — a key exam differentiator',
      'EFS-IA and lifecycle management automatically move infrequently accessed files to cheaper storage',
    ],
    relatedServices: ['ec2', 'ecs', 'lambda'],
    pricingModel: 'Pay per GB-month used (varies by storage class); no pre-provisioning required.',
    iconPath: './icons/storage/efs.svg',
  },
  {
    id: 'fsx',
    name: 'Amazon FSx',
    category: 'Storage',
    tagline: 'Fully managed third-party file systems, including Windows and Lustre.',
    description:
      'Amazon FSx provides fully managed, native-compatible file systems built on popular third-party file system technologies, including FSx for Windows File Server (SMB) and FSx for Lustre (high-performance computing), removing the undifferentiated heavy lifting of running them yourself.',
    keyFeatures: [
      'FSx for Windows File Server offers native SMB support, Active Directory integration, and DFS Namespaces',
      'FSx for Lustre delivers sub-millisecond latencies and hundreds of GB/s throughput for HPC and ML workloads',
      'FSx for NetApp ONTAP and FSx for OpenZFS extend support to additional popular file system technologies',
      'Automated backups, patching, and Multi-AZ deployment options for high availability',
    ],
    useCases: [
      'Lifting and shifting Windows-based applications that require native SMB file shares',
      'High-performance computing, machine learning training, and media processing pipelines (Lustre)',
      'Workloads needing NetApp ONTAP or ZFS-specific features on AWS',
    ],
    examNotes: [
      'Choose FSx for Windows File Server over EFS when a workload specifically needs SMB/Windows ACL support',
      'FSx for Lustre can process data directly from and back to S3, which is a common exam scenario for HPC/ML',
      'FSx is a family covering four distinct engines — match the exam scenario to the specific engine named',
    ],
    relatedServices: ['ec2', 's3', 'efs'],
    pricingModel: 'Pay per GB-month of storage provisioned, plus throughput capacity (varies by file system type).',
    iconPath: './icons/storage/fsx.svg',
  },
  {
    id: 's3-glacier',
    name: 'Amazon S3 Glacier',
    category: 'Storage',
    tagline: 'Low-cost archival storage classes within S3 for long-term retention.',
    description:
      'Amazon S3 Glacier storage classes (Glacier Instant Retrieval, Glacier Flexible Retrieval, and Glacier Deep Archive) are purpose-built for data archiving, offering the lowest-cost storage in S3 in exchange for longer or variable retrieval times.',
    keyFeatures: [
      'Glacier Deep Archive is the lowest-cost S3 storage class, intended for data accessed once or twice a year',
      'Flexible Retrieval offers Expedited (1-5 min), Standard (3-5 hrs), and Bulk (5-12 hrs) retrieval tiers',
      'Glacier Instant Retrieval provides millisecond access for rarely accessed archive data',
      'Vault Lock policies enforce WORM (write-once-read-many) compliance controls',
    ],
    useCases: [
      'Long-term regulatory and compliance archives (financial records, medical imaging)',
      'Media archives and digital preservation with infrequent, predictable access',
      'Backup tier for data that must be retained for years but rarely retrieved',
    ],
    examNotes: [
      'Glacier is accessed through S3 lifecycle rules as a storage class, not a separate service with its own console workflow',
      'Deep Archive has a minimum 180-day storage duration charge; Flexible Retrieval has a 90-day minimum',
      'Retrieval tier choice (Expedited/Standard/Bulk) is a frequent exam cost-vs-speed tradeoff question',
    ],
    relatedServices: ['s3', 'aws-backup', 'storage-gateway'],
    pricingModel: 'Pay per GB-month stored (lowest of all S3 classes), plus retrieval fees based on speed tier.',
    iconPath: './icons/storage/s3-glacier.svg',
  },
  {
    id: 'aws-backup',
    name: 'AWS Backup',
    category: 'Storage',
    tagline: 'Centralized, policy-based backup management across AWS services.',
    description:
      'AWS Backup is a fully managed service that centralizes and automates data protection across AWS services — EBS, RDS, DynamoDB, EFS, FSx, EC2, and more — through a single console and policy-based backup plans, removing the need for custom scripts per service.',
    keyFeatures: [
      'Centralized backup plans applied across multiple AWS services from one console',
      'Policy-based scheduling, lifecycle transitions to cold storage, and retention rules',
      'Cross-Region and cross-account backup copying for disaster recovery and compliance',
      'Vault Lock for immutable, WORM-compliant backup retention',
    ],
    useCases: [
      'Enforcing a consistent, auditable backup policy across many AWS resource types',
      'Meeting regulatory retention and disaster recovery requirements for multiple services at once',
      'Replacing custom per-service backup scripts (e.g., Lambda snapshotting EBS) with a managed policy',
    ],
    examNotes: [
      'AWS Backup centralizes what would otherwise be separate snapshot mechanisms (EBS snapshots, RDS snapshots, etc.)',
      'Backup Vault Lock enforces immutability even from the account root user, useful for ransomware protection scenarios',
      'Supports both on-demand and scheduled backups, with cross-Region copy for DR',
    ],
    relatedServices: ['ebs', 'rds', 's3-glacier'],
    pricingModel: 'Pay per GB-month of backup storage consumed, plus cross-Region/account copy and restore fees.',
    iconPath: './icons/storage/aws-backup.svg',
  },
  {
    id: 'storage-gateway',
    name: 'AWS Storage Gateway',
    category: 'Storage',
    tagline: 'Hybrid storage connecting on-premises environments to AWS cloud storage.',
    description:
      'AWS Storage Gateway is a hybrid cloud storage service that gives on-premises applications seamless access to virtually unlimited cloud storage, via a virtual appliance deployed on-premises or in a VM, caching frequently accessed data locally for low-latency access.',
    keyFeatures: [
      'File Gateway presents NFS/SMB file shares backed by S3',
      'Volume Gateway presents iSCSI block volumes, backed by EBS snapshots, in cached or stored modes',
      'Tape Gateway presents a virtual tape library (VTL) interface for existing backup software',
      'Local caching keeps frequently accessed data available with low latency on-premises',
    ],
    useCases: [
      'Extending on-premises storage capacity into AWS without rearchitecting applications',
      'Migrating backup workflows from physical tape libraries to the cloud (Tape Gateway)',
      'Hybrid cloud bursting where on-premises apps need occasional access to cloud-resident data',
    ],
    examNotes: [
      'Storage Gateway bridges on-premises environments to AWS storage — a key hybrid/migration exam topic',
      'Volume Gateway "cached" mode keeps only hot data locally with the full dataset in S3; "stored" mode keeps the full dataset locally with async backup to S3',
      'Tape Gateway is the drop-in replacement for physical tape infrastructure, integrating with existing backup software',
    ],
    relatedServices: ['s3', 'ebs', 'datasync'],
    pricingModel: 'Pay for storage used in AWS plus the gateway appliance resources and data transfer.',
    iconPath: './icons/storage/storage-gateway.svg',
  },
  {
    id: 'snow-family',
    name: 'AWS Snow Family',
    category: 'Storage',
    tagline: 'Physical devices for offline, large-scale data transfer and edge compute.',
    description:
      'The AWS Snow Family (Snowcone, Snowball Edge, Snowmobile) provides ruggedized physical devices for transporting large volumes of data into and out of AWS, and for running compute and storage at disconnected or bandwidth-constrained edge locations.',
    keyFeatures: [
      'Snowcone is a small, portable device for edge compute and small-scale data transfer',
      'Snowball Edge offers Storage Optimized and Compute Optimized variants for mid-to-large transfers with optional local processing',
      'Snowmobile is a shipping-container-scale appliance for exabyte-scale data migrations',
      'Devices can run EC2 instances and Lambda functions locally for edge compute use cases',
    ],
    useCases: [
      'Large-scale, one-time data migrations where network transfer would take weeks or months',
      'Edge computing and data collection in locations with limited or no connectivity',
      'Disaster recovery and data center decommissioning projects involving petabytes of data',
    ],
    examNotes: [
      'Rule of thumb: if transferring data over the network would take more than about a week, consider Snow Family instead',
      'Snowball Edge can run compute workloads on the device itself, not just transport data — distinguishing it from pure shipping solutions',
      'Snowmobile is reserved for truly massive (10PB+) migrations; Snowball Edge covers the more common petabyte-and-below use cases',
    ],
    relatedServices: ['s3', 'storage-gateway', 'datasync'],
    pricingModel: 'Pay a service fee per device per job, plus data transfer fees for data moved into AWS.',
    iconPath: './icons/storage/snow-family.svg',
  },
  {
    id: 'datasync',
    name: 'AWS DataSync',
    category: 'Storage',
    tagline: 'Automated, accelerated online data transfer between on-premises and AWS.',
    description:
      'AWS DataSync automates and accelerates moving data between on-premises storage (NFS, SMB, HDFS) or other clouds and AWS storage services (S3, EFS, FSx), using a purpose-built protocol that can transfer data up to 10 times faster than open-source tools.',
    keyFeatures: [
      'Purpose-built transfer protocol that maximizes network throughput over standard internet or Direct Connect links',
      'Automatic encryption in transit and data integrity validation on every transfer',
      'Scheduled, incremental transfers that only move changed data after the initial sync',
      'Supports on-premises NFS/SMB/HDFS sources and self-managed object storage as well as other AWS Regions',
    ],
    useCases: [
      'Ongoing or one-time online migration of large file datasets into S3, EFS, or FSx',
      'Recurring replication of on-premises data for hybrid backup or analytics pipelines',
      'Data transfer between AWS storage services across accounts or Regions',
    ],
    examNotes: [
      'DataSync is for online (network-based) transfer; Snow Family is for offline (physical device) transfer — a classic exam contrast',
      'Unlike Storage Gateway, DataSync performs discrete, scheduled transfer jobs rather than continuous live-mounted access',
      'Requires an agent deployed on-premises (as a VM) to connect to NFS/SMB sources',
    ],
    relatedServices: ['s3', 'efs', 'storage-gateway'],
    pricingModel: 'Pay per GB of data copied by DataSync.',
    iconPath: './icons/storage/datasync.svg',
  },
  {
    id: 'elastic-disaster-recovery',
    name: 'AWS Elastic Disaster Recovery',
    category: 'Storage',
    tagline: 'Minimize downtime and data loss with fast, reliable recovery of on-premises and cloud workloads.',
    description:
      'AWS Elastic Disaster Recovery (DRS) continuously replicates server-level data from on-premises or cloud-based source servers into a staging area in AWS, enabling fast recovery (minutes) by launching fully provisioned recovery instances when a disruption occurs.',
    keyFeatures: [
      'Continuous, block-level replication minimizes recovery point objective (RPO) to seconds/minutes',
      'Low-cost staging area uses minimal resources until a failover/drill is actually launched',
      'Automated conversion of replicated servers into fully booted EC2 instances during recovery or testing',
      'Supports non-disruptive recovery drills without impacting ongoing replication',
    ],
    useCases: [
      'Disaster recovery for on-premises VMware/physical servers or other-cloud workloads into AWS',
      'Minimizing RPO/RTO for business-critical applications without maintaining a fully running duplicate environment',
      'Regular DR testing/drills required for compliance without disrupting production replication',
    ],
    examNotes: [
      'DRS replaced/superseded CloudEndure Disaster Recovery as AWS\'s primary DR service — know the current name for the exam',
      'DRS keeps costs low during normal operation by only paying for lightweight staging resources, scaling up to full instance size only on failover',
      'Distinguish DRS (continuous server replication for DR) from AWS Backup (periodic point-in-time backups)',
    ],
    relatedServices: ['ec2', 'ebs', 'aws-backup'],
    pricingModel: 'Pay per hour for each source server being replicated, plus the cost of staging area and recovery instance resources.',
    iconPath: './icons/storage/elastic-disaster-recovery.svg',
  },
];
