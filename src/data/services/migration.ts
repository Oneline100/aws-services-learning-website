import type { AWSService } from '../../types/service';

export const MIGRATION_SERVICES: AWSService[] = [
  {
    id: 'application-migration-service',
    name: 'AWS Application Migration Service (MGN)',
    category: 'Migration & Transfer',
    tagline: 'Automated lift-and-shift migration of physical, virtual, and cloud servers to AWS.',
    description:
      'AWS Application Migration Service (MGN) is AWS\'s recommended, automated lift-and-shift (rehost) solution that minimizes time-intensive, error-prone manual processes by continuously replicating entire source servers (not just data) into AWS, allowing you to launch and cut over to equivalent instances with minimal downtime.',
    keyFeatures: [
      'Continuous, block-level replication of entire source servers (OS, applications, and data) into a staging area in AWS',
      'Non-disruptive testing lets you launch test instances without affecting ongoing replication or the source server',
      'Automated conversion of replicated servers into fully booting EC2 instances at cutover',
      'Supports migrating physical servers, virtual machines, and other-cloud instances with minimal application changes',
    ],
    useCases: [
      'Rehosting ("lift-and-shift") large numbers of on-premises or other-cloud servers into EC2 with minimal downtime',
      'Migrating applications without re-architecting them, as a first step before later optimization',
      'Performing large-scale data center migrations or evacuations under time pressure',
    ],
    examNotes: [
      'MGN replicates entire servers (OS + apps + data) for rehosting; DMS replicates only database data for database migrations — a key exam distinction',
      'AWS now recommends MGN over the legacy Server Migration Service (SMS), which has been deprecated',
      'MGN uses continuous block-level replication, enabling cutover with only minutes of downtime versus traditional one-time copy approaches',
    ],
    relatedServices: ['dms', 'ec2', 'migration-hub', 'application-discovery-service'],
    pricingModel: 'Free during the replication/testing period for the first 90 days per server; billed hourly per server after that window if still replicating.',
    iconPath: '/icons/migration/application-migration-service.svg',
  },
  {
    id: 'transfer-family',
    name: 'AWS Transfer Family',
    category: 'Migration & Transfer',
    tagline: 'Fully managed file transfer service supporting SFTP, FTPS, FTP, and AS2 directly into AWS storage.',
    description:
      'AWS Transfer Family is a fully managed service that enables transfer of files directly into and out of Amazon S3 or Amazon EFS using standard file transfer protocols (SFTP, FTPS, FTP, and AS2), without needing to manage any file transfer server infrastructure.',
    keyFeatures: [
      'Supports industry-standard protocols: SFTP, FTPS, FTP, and AS2 for business-to-business file exchange',
      'Fully managed, highly available endpoints with no server infrastructure to patch or scale',
      'Integrates directly with S3 and EFS as the backing storage, so files land where downstream processing expects them',
      'Custom identity providers (e.g., IAM, Active Directory, or Lambda-based) control user authentication and authorization',
    ],
    useCases: [
      'Replacing self-managed SFTP/FTP servers with a fully managed, AWS-native equivalent',
      'Receiving files from external partners (e.g., EDI/AS2 exchanges) directly into S3 for downstream processing',
      'Migrating existing file-transfer workflows to AWS without requiring clients to change their file transfer protocol or tooling',
    ],
    examNotes: [
      'Transfer Family is specifically for protocol-based (SFTP/FTPS/FTP/AS2) file exchange, distinguishing it from DataSync (bulk, protocol-agnostic online transfer) and Snow Family (offline/physical)',
      'It is the go-to answer when a scenario requires clients to keep using SFTP/FTP without AWS managing custom server software',
      'Files land directly in S3 or EFS, enabling existing AWS-native workflows to process them immediately after transfer',
    ],
    relatedServices: ['s3', 'efs', 'datasync'],
    pricingModel: 'Pay an hourly fee per protocol endpoint enabled, plus a per-GB charge for data uploaded and downloaded.',
    iconPath: '/icons/migration/transfer-family.svg',
  },
  {
    id: 'migration-hub',
    name: 'AWS Migration Hub',
    category: 'Migration & Transfer',
    tagline: 'Central dashboard to track migration progress across multiple AWS and partner migration tools.',
    description:
      'AWS Migration Hub provides a single location to track the progress of application migrations across multiple AWS migration tools (such as Application Migration Service and Database Migration Service) and partner solutions, giving you visibility into overall migration status.',
    keyFeatures: [
      'Aggregates and displays migration status and progress from multiple AWS and partner migration tools in one dashboard',
      'Groups individual servers and databases into logical "applications" to track migration as a cohesive unit',
      'Integrates with Application Discovery Service to import on-premises server inventory and dependency data',
      'Provides strategy recommendations (rehost, replatform, refactor) based on discovered server data',
    ],
    useCases: [
      'Getting a consolidated, single-pane view of migration progress when using multiple migration tools simultaneously',
      'Grouping discovered on-premises servers into logical applications before planning a phased migration',
      'Tracking migration status across a large-scale, multi-wave data center migration project',
    ],
    examNotes: [
      'Migration Hub is a tracking/visibility dashboard, not a migration execution tool itself — it aggregates status from MGN, DMS, and partner tools',
      'Works closely with Application Discovery Service, which supplies the on-premises inventory data Migration Hub displays and groups',
      'The correct answer for "I need a single view of migration progress across many servers and tools," not for performing the migration itself',
    ],
    relatedServices: ['application-discovery-service', 'application-migration-service', 'dms'],
    pricingModel: 'AWS Migration Hub is offered at no additional charge; you pay only for the underlying migration tools and resources used.',
    iconPath: '/icons/migration/migration-hub.svg',
  },
  {
    id: 'application-discovery-service',
    name: 'AWS Application Discovery Service',
    category: 'Migration & Transfer',
    tagline: 'Discovers on-premises servers, applications, and dependencies to plan migrations.',
    description:
      'AWS Application Discovery Service helps enterprises plan migration projects by automatically gathering information about on-premises data centers, including server configuration, utilization data, and network dependency mappings, which feeds into AWS Migration Hub.',
    keyFeatures: [
      'Agentless discovery collects server configuration and utilization data via VMware vCenter integration',
      'Agent-based discovery (via the AWS Application Discovery Agent) gathers detailed system configuration, running processes, and network connections',
      'Builds dependency maps showing which servers communicate with each other, informing migration grouping and sequencing',
      'Discovered data exports to Migration Hub and Athena/QuickSight for analysis and migration-wave planning',
    ],
    useCases: [
      'Building an accurate inventory of on-premises servers and applications before planning a large migration',
      'Identifying network dependencies between servers to group them into migration waves that move together',
      'Sizing right-sized AWS target resources based on actual observed on-premises utilization data',
    ],
    examNotes: [
      'Application Discovery Service answers "what do I have and how is it connected" before migration; it feeds directly into Migration Hub\'s application grouping view',
      'Agentless discovery requires VMware vCenter; agent-based discovery works on physical servers and non-VMware virtual machines for deeper data',
      'A prerequisite step for a well-planned migration — used for discovery/assessment, not for performing the actual migration (that is MGN/DMS)',
    ],
    relatedServices: ['migration-hub', 'application-migration-service', 'dms'],
    pricingModel: 'AWS Application Discovery Service is offered at no additional charge.',
    iconPath: '/icons/migration/application-discovery-service.svg',
  },
];
