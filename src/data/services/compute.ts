import type { AWSService } from '../../types/service';

export const COMPUTE_SERVICES: AWSService[] = [
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
    relatedServices: ['ebs', 'elastic-load-balancing', 'ec2-auto-scaling'],
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
    id: 'elastic-beanstalk',
    name: 'AWS Elastic Beanstalk',
    category: 'Compute',
    tagline: 'Deploy and scale web apps without managing the underlying infrastructure.',
    description:
      'Elastic Beanstalk is a platform-as-a-service that automatically handles deployment details — capacity provisioning, load balancing, auto scaling, and health monitoring — for applications uploaded in supported languages, while still giving access to the underlying EC2/RDS resources if needed.',
    keyFeatures: [
      'Supports Java, .NET, PHP, Node.js, Python, Ruby, Go, and Docker',
      'Automatic capacity provisioning, load balancing, and health monitoring',
      'Full access to underlying AWS resources (EC2, RDS, S3) when customization is needed',
      'Blue/green deployment support via environment swapping',
    ],
    useCases: [
      'Quickly deploying web applications without manually configuring infrastructure',
      'Teams that want PaaS convenience but may need to drop to IaaS-level control later',
    ],
    examNotes: [
      'Elastic Beanstalk is free — you pay only for the underlying resources it provisions',
      'Unlike Lambda, Beanstalk runs on EC2 instances it manages for you, not a fully serverless model',
    ],
    relatedServices: ['ec2', 'rds', 'ec2-auto-scaling'],
    pricingModel: 'No additional charge; billed only for underlying resources (EC2, RDS, etc.) it provisions.',
    iconPath: '/icons/compute/elastic-beanstalk.svg',
  },
  {
    id: 'lightsail',
    name: 'Amazon Lightsail',
    category: 'Compute',
    tagline: 'Simplified virtual private servers with predictable, bundled pricing.',
    description:
      'Amazon Lightsail is an easy-to-use VPS offering that bundles compute, storage, and networking into low-cost, predictable monthly plans. It is designed for simple web applications, dev/test environments, and users who want a simpler on-ramp than the full EC2 console.',
    keyFeatures: [
      'Preconfigured blueprints for common stacks (WordPress, LAMP, Node.js) and OS-only images',
      'Bundled, flat-rate monthly pricing including a fixed data transfer allowance',
      'Built-in load balancing, managed databases, CDN distributions, and simple DNS management',
      'One-click snapshots and easy upgrade path to EC2',
    ],
    useCases: [
      'Simple websites, blogs, and small business applications',
      'Developers and students who want a low-cost, low-complexity entry point to AWS compute',
      'Quick dev/test environments that do not need full EC2 configurability',
    ],
    examNotes: [
      'Lightsail trades flexibility for simplicity — it is the "easy mode" VPS compared to raw EC2',
      'Predictable flat pricing (vs. EC2 per-second billing) makes Lightsail attractive for budget-constrained, low-traffic workloads',
      'You can migrate a Lightsail instance to a full EC2 instance when you outgrow it',
    ],
    relatedServices: ['ec2', 'elastic-beanstalk', 'route-53'],
    pricingModel: 'Flat monthly bundles covering compute, storage, and a data transfer allowance.',
    iconPath: '/icons/compute/lightsail.svg',
  },
  {
    id: 'batch',
    name: 'AWS Batch',
    category: 'Compute',
    tagline: 'Fully managed batch processing at any scale.',
    description:
      'AWS Batch plans, schedules, and runs batch computing jobs across the full range of AWS compute services (EC2, Spot, Fargate), dynamically provisioning the optimal quantity and type of compute based on the volume and resource requirements of submitted jobs.',
    keyFeatures: [
      'Automatically provisions compute (On-Demand, Spot, or Fargate) sized to queued jobs',
      'Job queues, job definitions, and compute environments for flexible scheduling',
      'Supports Docker container-based jobs with dependency chains',
      'Integrates with Spot Instances for significant cost savings on fault-tolerant jobs',
    ],
    useCases: [
      'Large-scale scientific simulations, financial modeling, and rendering',
      'ETL and data processing jobs that run on a schedule or trigger',
      'Genomics, media transcoding, and other high-throughput compute workloads',
    ],
    examNotes: [
      'AWS Batch itself is free — you pay only for the underlying EC2/Fargate/Spot compute it provisions',
      'Unlike Lambda, Batch is built for long-running, resource-intensive jobs without the 15-minute execution limit',
      'Batch can run on Fargate for simpler jobs that do not need EC2-level customization',
    ],
    relatedServices: ['ec2', 'fargate', 'ecs'],
    pricingModel: 'No additional charge; billed only for the underlying compute resources used.',
    iconPath: '/icons/compute/batch.svg',
  },
  {
    id: 'outposts',
    name: 'AWS Outposts',
    category: 'Compute',
    tagline: 'Run AWS infrastructure and services on-premises.',
    description:
      'AWS Outposts delivers AWS-designed hardware and services to virtually any on-premises or edge location, enabling a consistent hybrid experience where the same APIs, tools, and services used in an AWS Region run locally for low-latency or local data residency needs.',
    keyFeatures: [
      'Available as full server racks or smaller 1U/2U servers for space-constrained sites',
      'Runs a subset of AWS services (EC2, EBS, ECS, EKS, RDS) locally, connected back to a home Region',
      'Fully managed by AWS — hardware monitoring, patching, and updates included',
      'Uses the same APIs, SDKs, and consoles as the rest of AWS for a consistent hybrid experience',
    ],
    useCases: [
      'Low-latency workloads that must run physically close to on-premises systems or users',
      'Local data processing where data residency regulations require data to stay on-site',
      'Migrating workloads that cannot yet move fully to the cloud due to latency or connectivity constraints',
    ],
    examNotes: [
      'Outposts requires reliable connectivity back to an AWS Region for management, billing, and some service dependencies',
      'Distinguish from Local Zones and Wavelength: Outposts hardware physically sits in the customer\'s own facility',
      'Billed via upfront capacity commitment plus a term, unlike standard pay-as-you-go EC2',
    ],
    relatedServices: ['ec2', 'local-zones', 'wavelength'],
    pricingModel: 'Fixed-term capacity pricing for the physical rack/server, paid upfront or monthly.',
    iconPath: '/icons/compute/outposts.svg',
  },
  {
    id: 'app-runner',
    name: 'AWS App Runner',
    category: 'Compute',
    tagline: 'Deploy containerized web apps and APIs directly from source code or a container image.',
    description:
      'AWS App Runner is a fully managed service that builds and deploys web applications and APIs directly from source code or a container image, automatically handling load balancing, scaling, and TLS, with no infrastructure to manage.',
    keyFeatures: [
      'Deploys directly from a GitHub repository (with automatic rebuild on commit) or an existing container image in ECR',
      'Automatic scaling based on traffic, including scale-to-near-zero for idle apps',
      'Built-in HTTPS, load balancing, and VPC connectivity to private resources',
      'No cluster, load balancer, or Auto Scaling Group configuration required',
    ],
    useCases: [
      'Deploying containerized web apps and APIs quickly without managing ECS/EKS infrastructure',
      'Teams wanting Heroku-like simplicity on AWS for stateless web services',
    ],
    examNotes: [
      'App Runner sits above ECS/Fargate in abstraction — simpler than ECS but less configurable',
      'Good exam signal for "fully managed container deployment with minimal setup" scenarios',
      'Unlike Elastic Beanstalk, App Runner is container/source-native and has a simpler scale-to-zero cost model',
    ],
    relatedServices: ['ecs', 'fargate', 'ecr'],
    pricingModel: 'Pay per vCPU and memory consumed while the app is running/provisioned, plus build minutes.',
    iconPath: '/icons/compute/app-runner.svg',
  },
  {
    id: 'ec2-auto-scaling',
    name: 'Amazon EC2 Auto Scaling',
    category: 'Compute',
    tagline: 'Automatically add or remove EC2 instances to match demand.',
    description:
      'Amazon EC2 Auto Scaling monitors applications and automatically adjusts the number of EC2 instances in a group to maintain steady, predictable performance, based on scaling policies, schedules, or target tracking metrics such as CPU utilization.',
    keyFeatures: [
      'Dynamic scaling policies (target tracking, step scaling) and scheduled scaling for predictable load patterns',
      'Health checks that automatically replace unhealthy instances',
      'Integrates with Elastic Load Balancing to distribute traffic across the group',
      'Supports mixed instance types and purchase options (On-Demand + Spot) within one group',
    ],
    useCases: [
      'Maintaining application availability by automatically replacing failed instances',
      'Cost optimization by scaling capacity down during low-traffic periods',
      'Handling variable or spiky traffic patterns for web applications',
    ],
    examNotes: [
      'Auto Scaling Groups span multiple Availability Zones for high availability by default',
      'Target tracking scaling (e.g., keep average CPU at 50%) is the most common exam scenario',
      'Combine with ELB health checks, not just EC2 status checks, for application-level failure detection',
    ],
    relatedServices: ['ec2', 'elastic-load-balancing', 'cloudwatch'],
    pricingModel: 'No additional charge for the service; billed for the EC2 instances it launches.',
    iconPath: '/icons/compute/ec2-auto-scaling.svg',
  },
  {
    id: 'ec2-image-builder',
    name: 'EC2 Image Builder',
    category: 'Compute',
    tagline: 'Automate the creation, maintenance, and testing of server images.',
    description:
      'EC2 Image Builder simplifies building, testing, and maintaining golden server images (AMIs or container images) through automated pipelines, reducing the manual effort and inconsistency involved in hand-rolling and patching base images.',
    keyFeatures: [
      'Automated pipelines that build, test, and distribute AMIs or Docker images on a schedule',
      'Built-in and custom "components" define installation and configuration steps declaratively',
      'Automated testing stage validates images before they are marked distributable',
      'Distributes resulting images across multiple AWS Regions and accounts automatically',
    ],
    useCases: [
      'Maintaining a consistent, patched "golden image" baseline across a large EC2 fleet',
      'Automating recurring AMI rebuilds to include the latest security patches',
    ],
    examNotes: [
      'Reduces manual AMI management toil — a common exam distractor is doing this manually with snapshots',
      'Works for both EC2 AMIs and container images pushed to ECR',
      'No charge for the Image Builder service itself; you pay for the build/test infrastructure consumed',
    ],
    relatedServices: ['ec2', 'ecr', 'systems-manager'],
    pricingModel: 'No additional charge for the service; billed for underlying build/test resources consumed.',
    iconPath: '/icons/compute/ec2-image-builder.svg',
  },
  {
    id: 'wavelength',
    name: 'AWS Wavelength',
    category: 'Compute',
    tagline: 'Deliver ultra-low-latency applications to 5G devices.',
    description:
      'AWS Wavelength embeds AWS compute and storage services within telecommunications providers\' 5G networks, allowing application traffic to reach application servers without leaving the mobile network, minimizing latency for mobile and connected-device applications.',
    keyFeatures: [
      'Wavelength Zones are deployed within telco 5G network edge locations',
      'Runs a subset of AWS services (EC2, EBS, VPC) at the network edge, close to end users',
      'Traffic stays on the carrier network, avoiding multiple internet hops to a Region',
      'Managed and billed through the parent AWS Region like any other Availability Zone',
    ],
    useCases: [
      'Latency-sensitive mobile applications such as game streaming and augmented/virtual reality',
      'Connected vehicle and smart-city applications needing near-real-time response over 5G',
      'Live video analytics and ML inference at the mobile network edge',
    ],
    examNotes: [
      'Wavelength targets 5G mobile network edge latency; Local Zones target metro-area proximity for any user; Outposts targets fully on-premises deployments',
      'Requires a 5G carrier partnership region/zone to be available in the target metro area',
    ],
    relatedServices: ['ec2', 'local-zones', 'outposts'],
    pricingModel: 'Standard EC2/EBS pricing for resources deployed within the Wavelength Zone, billed via the parent Region.',
    iconPath: '/icons/compute/wavelength.svg',
  },
  {
    id: 'local-zones',
    name: 'AWS Local Zones',
    category: 'Compute',
    tagline: 'Place select AWS services closer to large population and industry centers.',
    description:
      'AWS Local Zones are infrastructure deployments that extend an AWS Region to a specific metro area, enabling single-digit-millisecond latency for end users in that area by running compute, storage, and other select services closer to where they live and work.',
    keyFeatures: [
      'Extends a parent Region\'s VPC into the Local Zone, so existing resources connect with minimal reconfiguration',
      'Supports EC2, EBS, VPC, ELB, and a growing set of other services locally',
      'Connected to the parent Region via AWS\'s private network backbone',
      'Appears as just another Availability Zone option when launching supported resources',
    ],
    useCases: [
      'Latency-sensitive applications like real-time gaming, live streaming, and video rendering for a specific metro area',
      'Hybrid migrations where a company needs AWS resources near a specific city for compliance or latency reasons',
    ],
    examNotes: [
      'Local Zones are AWS-operated, in AWS-chosen metro locations — unlike Outposts, which goes into the customer\'s own facility',
      'Think "closer to a city" for Local Zones vs. "closer to mobile carrier network" for Wavelength vs. "on your own site" for Outposts',
    ],
    relatedServices: ['ec2', 'outposts', 'wavelength'],
    pricingModel: 'Standard EC2/EBS pricing for resources deployed in the Local Zone, billed via the parent Region.',
    iconPath: '/icons/compute/local-zones.svg',
  },
  {
    id: 'serverless-application-repository',
    name: 'AWS Serverless Application Repository',
    category: 'Compute',
    tagline: 'Discover, deploy, and publish reusable serverless applications.',
    description:
      'The AWS Serverless Application Repository (SAR) is a managed catalog of serverless applications, built on AWS SAM, that lets developers find, configure, and deploy pre-built Lambda-based applications and components into their own accounts, or publish their own for reuse.',
    keyFeatures: [
      'Catalog of publicly and privately shared serverless applications packaged with AWS SAM templates',
      'One-click deployment directly into your own AWS account via the console, CLI, or CloudFormation',
      'Supports licensing options and private sharing within an organization',
      'Applications are versioned, making it easy to track and update deployed components',
    ],
    useCases: [
      'Quickly deploying common serverless patterns (e.g., image resizing, Slack bots) without building from scratch',
      'Sharing internal, reusable serverless components across teams within an organization',
    ],
    examNotes: [
      'Built on top of AWS SAM (Serverless Application Model) — SAR is the distribution/discovery layer, SAM is the packaging/deployment framework',
      'Not itself a compute runtime — applications deployed from SAR typically run on Lambda',
    ],
    relatedServices: ['lambda', 'cloudformation', 'api-gateway'],
    pricingModel: 'No charge for the repository itself; billed for the underlying resources (e.g., Lambda) the deployed application creates.',
    iconPath: '/icons/compute/serverless-application-repository.svg',
  },
];
