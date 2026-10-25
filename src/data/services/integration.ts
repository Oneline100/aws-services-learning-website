import type { AWSService } from '../../types/service';

export const INTEGRATION_SERVICES: AWSService[] = [
  {
    id: 'sqs',
    name: 'Amazon Simple Queue Service (SQS)',
    category: 'Application Integration',
    tagline: 'Fully managed message queuing for decoupling and scaling microservices.',
    description:
      'Amazon SQS is a fully managed message queuing service that lets you decouple and scale microservices, distributed systems, and serverless applications by reliably passing messages between producers and consumers without losing them.',
    keyFeatures: [
      'Standard queues offer nearly unlimited throughput with at-least-once, best-effort ordered delivery',
      'FIFO queues guarantee exactly-once processing and strict message ordering, at lower throughput',
      'Messages can be retained up to 14 days and use visibility timeouts to prevent duplicate processing while a consumer works on them',
      'Dead-letter queues capture messages that repeatedly fail processing for later analysis',
    ],
    useCases: [
      'Decoupling producer and consumer components so a traffic spike on one side does not overwhelm the other',
      'Buffering work for asynchronous background processing, such as order or image-processing pipelines',
      'Building fault-tolerant distributed systems where consumers can scale independently of producers',
    ],
    examNotes: [
      'SQS is pull-based (consumers poll) — unlike SNS, which pushes messages to subscribers',
      'Standard queues are near-unlimited throughput with possible duplicate/out-of-order delivery; FIFO queues guarantee order and exactly-once but cap throughput (300 msg/sec, or 3,000 with batching)',
      'Visibility timeout controls how long a message is hidden from other consumers after being received — a frequently tested mechanic for avoiding duplicate processing',
    ],
    relatedServices: ['sns', 'lambda', 'step-functions'],
    pricingModel: 'Pay per request (API call) based on the number of messages sent, received, and deleted.',
    iconPath: './icons/integration/sqs.svg',
  },
  {
    id: 'sns',
    name: 'Amazon Simple Notification Service (SNS)',
    category: 'Application Integration',
    tagline: 'Fully managed pub/sub messaging for application-to-application and application-to-person communication.',
    description:
      'Amazon SNS is a fully managed publish/subscribe messaging service that enables you to send messages from a single publisher to many subscribing endpoints simultaneously, including SQS queues, Lambda functions, HTTP endpoints, email, and SMS.',
    keyFeatures: [
      'Publish/subscribe (fan-out) model delivers one published message to many subscribers at once',
      'Supports a wide range of subscriber protocols: SQS, Lambda, HTTP/S, email, SMS, and mobile push',
      'FIFO topics provide strict message ordering and deduplication when paired with SQS FIFO queues',
      'Message filtering policies let subscribers receive only the subset of messages relevant to them',
    ],
    useCases: [
      'Fanning out a single event to multiple SQS queues or Lambda functions for parallel processing',
      'Sending application alerts, alarms, or notifications via SMS, email, or mobile push',
      'Decoupling event producers from many heterogeneous subscriber types in a single publish operation',
    ],
    examNotes: [
      'SNS pushes messages to subscribers; SQS requires consumers to pull — the classic push vs. pull exam distinction',
      'The SNS fan-out pattern (SNS topic fanning out to multiple SQS queues) is a frequently tested decoupling architecture',
      'Message filtering lets each subscriber receive only messages matching its filter policy, avoiding unnecessary processing',
    ],
    relatedServices: ['sqs', 'lambda', 'eventbridge'],
    pricingModel: 'Pay per notification published and delivered, with pricing varying by delivery protocol (e.g., SMS, email).',
    iconPath: './icons/integration/sns.svg',
  },
  {
    id: 'eventbridge',
    name: 'Amazon EventBridge',
    category: 'Application Integration',
    tagline: 'Serverless event bus connecting applications using events from AWS, SaaS, and your own apps.',
    description:
      'Amazon EventBridge is a serverless event bus service that makes it easy to connect applications using events, routing events from AWS services, integrated SaaS applications, and your own applications to targets based on flexible, rule-based matching.',
    keyFeatures: [
      'Default, custom, and partner event buses route events based on rules matching event content',
      'Schema Registry infers and stores event structure, enabling code generation for event-driven applications',
      'Scheduler supports cron- and rate-based rules for triggering targets on a recurring schedule',
      'Direct integrations with dozens of AWS services as event sources and over a dozen built-in targets (Lambda, Step Functions, SQS, SNS)',
    ],
    useCases: [
      'Building event-driven architectures that react to state changes across AWS services in near real time',
      'Ingesting events from third-party SaaS applications (e.g., Zendesk, Datadog) via partner event buses',
      'Replacing CloudWatch Events cron jobs with scheduled rules that invoke Lambda or other targets',
    ],
    examNotes: [
      'EventBridge is the evolution of CloudWatch Events, with added support for custom/partner event buses and schema registry — CloudWatch Events still exists as the default bus underneath',
      'EventBridge routes structured events to multiple possible targets using content-based rule matching; SNS primarily fans out to subscribers with less rule sophistication',
      'Partner event buses are the key exam differentiator for ingesting third-party SaaS events directly into AWS',
    ],
    relatedServices: ['cloudwatch', 'sns', 'sqs', 'lambda'],
    pricingModel: 'Pay per event published to a custom or partner event bus; events on the default bus from AWS services are free.',
    iconPath: './icons/integration/eventbridge.svg',
  },
  {
    id: 'step-functions',
    name: 'AWS Step Functions',
    category: 'Application Integration',
    tagline: 'Serverless visual workflow orchestration for coordinating distributed applications.',
    description:
      'AWS Step Functions is a serverless orchestration service that lets you coordinate multiple AWS services, including Lambda functions, into visual workflows (state machines) defined using the Amazon States Language, handling retries, error handling, and parallel execution.',
    keyFeatures: [
      'Visual workflow designer and Amazon States Language (ASL) define state machines declaratively',
      'Standard workflows support long-running, auditable executions up to one year; Express workflows support high-volume, short-duration event processing',
      'Built-in error handling, retries, and parallel/choice states remove the need for custom orchestration code',
      'Direct service integrations let states call over 220 AWS services without writing glue Lambda functions',
    ],
    useCases: [
      'Orchestrating multi-step serverless workflows that chain Lambda functions with conditional logic and retries',
      'Coordinating long-running business processes, such as order fulfillment or data processing pipelines',
      'Running high-throughput, short-lived event-processing workflows using Express workflows',
    ],
    examNotes: [
      'Step Functions orchestrates a defined sequence/workflow of steps across services; EventBridge routes individual events to targets without inherent workflow state — a common point of confusion',
      'Standard workflows: exactly-once execution, up to one year duration, priced per state transition; Express workflows: at-least-once, short duration, priced by duration and memory — know both',
      'Direct AWS SDK service integrations reduce the need for "glue" Lambda functions purely to call other AWS APIs',
    ],
    relatedServices: ['lambda', 'sqs', 'sns', 'eventbridge'],
    pricingModel: 'Standard workflows are priced per state transition; Express workflows are priced by number of requests and duration/memory consumed.',
    iconPath: './icons/integration/step-functions.svg',
  },
  {
    id: 'appflow',
    name: 'Amazon AppFlow',
    category: 'Application Integration',
    tagline: 'Fully managed integration service for bidirectional data flows between SaaS apps and AWS.',
    description:
      'Amazon AppFlow is a fully managed integration service that enables you to securely transfer data between SaaS applications (such as Salesforce, ServiceNow, and Slack) and AWS services like S3 and Redshift, without writing custom integration code.',
    keyFeatures: [
      'Pre-built connectors for popular SaaS applications and AWS services, configured through a no-code flow designer',
      'Supports on-demand, scheduled, and event-triggered data transfers between source and destination',
      'Built-in data transformation, filtering, and validation as data moves through a flow',
      'Private connectivity to AWS services over AWS PrivateLink, keeping data off the public internet',
    ],
    useCases: [
      'Synchronizing Salesforce or ServiceNow records into S3 or Redshift for analytics without custom ETL code',
      'Automating scheduled data transfers between SaaS applications and a data lake',
      'Triggering data transfers in response to events occurring in a connected SaaS application',
    ],
    examNotes: [
      'AppFlow is purpose-built for SaaS-to-AWS (and AWS-to-SaaS) data integration — distinct from Glue, which is a general-purpose ETL service for diverse data sources',
      'No custom code or connector development is required; AppFlow provides managed connectors out of the box',
      'Can transfer data privately over PrivateLink rather than the public internet, a notable security/exam detail',
    ],
    relatedServices: ['s3', 'eventbridge'],
    pricingModel: 'Pay per flow run, based on the amount of data processed.',
    iconPath: './icons/integration/appflow.svg',
  },
  {
    id: 'amazon-mq',
    name: 'Amazon MQ',
    category: 'Application Integration',
    tagline: 'Managed message broker service for Apache ActiveMQ and RabbitMQ.',
    description:
      'Amazon MQ is a managed message broker service for Apache ActiveMQ and RabbitMQ that makes it easy to migrate existing applications using standard messaging protocols (JMS, AMQP, MQTT, STOMP, OpenWire) to the cloud without rewriting messaging code.',
    keyFeatures: [
      'Supports industry-standard APIs and protocols, including JMS, AMQP 0-9-1/1.0, MQTT, OpenWire, and STOMP',
      'Managed provisioning, patching, and failover of ActiveMQ or RabbitMQ brokers',
      'Active/standby deployment options provide high availability across Availability Zones',
      'Direct lift-and-shift path for existing applications already coded against ActiveMQ or RabbitMQ APIs',
    ],
    useCases: [
      'Migrating an on-premises application using ActiveMQ or RabbitMQ to AWS without rewriting messaging logic',
      'Integrating legacy enterprise applications that depend on standard protocols like JMS or AMQP',
      'Running a managed, highly available message broker for applications not built around SQS/SNS APIs',
    ],
    examNotes: [
      'Amazon MQ is chosen when migrating existing apps that already use standard protocols (JMS, AMQP, MQTT); SQS/SNS are preferred for new cloud-native applications built against AWS APIs',
      'Amazon MQ supports both ActiveMQ and RabbitMQ engines — a key detail distinguishing it from SQS/SNS, which are AWS-proprietary',
      'A classic exam cue: "migrate an existing messaging application without rewriting code" points to Amazon MQ, not SQS/SNS',
    ],
    relatedServices: ['sqs', 'sns'],
    pricingModel: 'Pay an hourly rate based on broker instance type and storage, plus data transfer charges.',
    iconPath: './icons/integration/amazon-mq.svg',
  },
  {
    id: 'appsync',
    name: 'AWS AppSync',
    category: 'Application Integration',
    tagline: 'Managed GraphQL and Pub/Sub APIs for real-time, data-driven applications.',
    description:
      'AWS AppSync is a managed service that simplifies building GraphQL and Pub/Sub APIs by handling the heavy lifting of securely connecting to data sources like DynamoDB, Lambda, and RDS, with built-in real-time subscriptions and offline data synchronization.',
    keyFeatures: [
      'Managed GraphQL API layer that resolves queries, mutations, and subscriptions against multiple backend data sources',
      'Real-time data updates via GraphQL subscriptions pushed to connected clients over WebSockets',
      'Offline data access and synchronization support for mobile applications',
      'Fine-grained authorization using IAM, Cognito, OIDC, or API keys per field or type',
    ],
    useCases: [
      'Building a single GraphQL API that aggregates data from DynamoDB, Lambda, and RDS for a mobile or web app',
      'Delivering real-time updates (e.g., chat messages, live dashboards) to connected clients via subscriptions',
      'Supporting offline-first mobile applications that need to sync local changes once connectivity returns',
    ],
    examNotes: [
      'AppSync provides GraphQL APIs; API Gateway provides REST/HTTP/WebSocket APIs — know when a GraphQL requirement points to AppSync specifically',
      'Built-in real-time subscriptions and offline sync are AppSync differentiators not natively offered by API Gateway',
      'Commonly paired with Cognito for authentication and DynamoDB as a primary data source in exam scenarios',
    ],
    relatedServices: ['api-gateway', 'dynamodb', 'cognito', 'lambda'],
    pricingModel: 'Pay per million query/data-modification requests and per real-time subscription message delivered.',
    iconPath: './icons/integration/appsync.svg',
  },
  {
    id: 'swf',
    name: 'Amazon Simple Workflow Service (SWF)',
    category: 'Application Integration',
    tagline: 'Legacy workflow coordination service for building applications across distributed components.',
    description:
      'Amazon Simple Workflow Service (SWF) is a workflow coordination service that helps developers build, run, and scale background jobs with parallel or sequential steps, giving full control over task assignment and coordination between distributed application components.',
    keyFeatures: [
      'Decider and activity worker programming model gives fine-grained, code-level control over workflow logic',
      'Supports both human-driven tasks (with timeouts measured in days) and automated processing steps',
      'Workflow executions can run for up to one year, with full state tracking maintained by the service',
      'Requires writing and hosting your own decider logic, unlike more fully managed orchestration options',
    ],
    useCases: [
      'Coordinating workflows that mix automated processing steps with long-running human tasks or approvals',
      'Maintaining legacy applications originally built directly on the SWF programming model',
      'Scenarios needing extremely fine-grained custom control over task state and history not offered by newer services',
    ],
    examNotes: [
      'AWS now recommends Step Functions for new workflow orchestration projects; SWF is considered a legacy service — expect exam questions to favor Step Functions for new designs',
      'SWF requires you to write and operate your own decider/worker code, whereas Step Functions provides a managed state machine with direct service integrations and less custom code',
      'Recognize SWF primarily to correctly choose Step Functions instead when a scenario describes a new workflow requirement',
    ],
    relatedServices: ['step-functions', 'sqs'],
    pricingModel: 'Pay per workflow execution, task, and open workflow day, based on usage.',
    iconPath: './icons/integration/swf.svg',
  },
];
