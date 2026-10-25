import type { AWSService } from '../../types/service';

export const IOT_SERVICES: AWSService[] = [
  {
    id: 'iot-core',
    name: 'AWS IoT Core',
    category: 'IoT',
    tagline: 'Connects billions of IoT devices to the cloud and lets them interact securely with applications.',
    description:
      'AWS IoT Core is a managed cloud service that lets connected devices easily and securely interact with cloud applications and other devices, supporting billions of devices and trillions of messages, and routing those messages to AWS endpoints and other devices reliably and securely.',
    keyFeatures: [
      'Device Gateway supports standard protocols (MQTT, HTTPS, LoRaWAN) for secure, bidirectional device communication',
      'Device Shadow maintains a persistent virtual representation of a device\'s last known state, even while offline',
      'Rules Engine routes incoming device data to other AWS services (Lambda, S3, DynamoDB, Kinesis) based on message content',
      'Device Registry and X.509 certificate-based authentication/authorization secure every connected device',
    ],
    useCases: [
      'Connecting large fleets of sensors or smart devices to the cloud for data ingestion and processing',
      'Allowing applications to read or set a device\'s desired state via its Device Shadow, even when the device is temporarily offline',
      'Routing incoming telemetry data to downstream AWS services like Lambda or Kinesis for real-time processing',
    ],
    examNotes: [
      'IoT Core is the central hub connecting devices to AWS — the Device Shadow feature (tracking last-known/desired state) is a frequently tested distinguishing capability',
      'The Rules Engine lets you route messages to other AWS services without writing custom integration code, based on an SQL-like syntax over the message payload',
      'Works alongside Greengrass (edge compute) and device-management/analytics services to form the broader AWS IoT platform',
    ],
    relatedServices: ['iot-greengrass', 'iot-device-management', 'lambda', 'kinesis-data-streams'],
    pricingModel: 'Pay per million messages published/delivered, plus charges for device connectivity and registry/shadow usage.',
    iconPath: './icons/iot/iot-core.svg',
  },
  {
    id: 'iot-greengrass',
    name: 'AWS IoT Greengrass',
    category: 'IoT',
    tagline: 'Extends AWS to edge devices for local compute, messaging, and ML inference.',
    description:
      'AWS IoT Greengrass is an open-source edge runtime and cloud service that extends AWS capabilities to edge devices, enabling them to act locally on the data they generate, run predictions based on machine learning models, and operate with intermittent cloud connectivity.',
    keyFeatures: [
      'Runs Lambda functions and containerized components locally on edge devices, not just in the cloud',
      'Supports local machine learning inference using models trained in the cloud (e.g., via SageMaker) and deployed to the edge',
      'Enables local device-to-device communication and message routing even when disconnected from the internet',
      'Securely syncs device data and state back to AWS IoT Core once connectivity is restored',
    ],
    useCases: [
      'Running real-time, low-latency processing or ML inference directly on edge devices (e.g., factory floor sensors)',
      'Allowing edge devices to continue operating and communicating locally during intermittent or lost internet connectivity',
      'Reducing bandwidth and cloud costs by filtering, aggregating, or acting on data locally before syncing to the cloud',
    ],
    examNotes: [
      'Greengrass extends AWS compute (Lambda) and ML inference to the edge; IoT Core is the cloud-side message hub — know Greengrass is about local/edge processing specifically',
      'Supports offline operation: devices keep functioning and communicating locally even without a cloud connection, syncing later',
      'A common exam scenario: "need to run inference locally with low latency and act even when disconnected" points to Greengrass, not IoT Core alone',
    ],
    relatedServices: ['iot-core', 'lambda', 'sagemaker'],
    pricingModel: 'Pay per connected device per month for Greengrass Core devices; no charge for the open-source edge runtime itself.',
    iconPath: './icons/iot/iot-greengrass.svg',
  },
  {
    id: 'iot-analytics',
    name: 'AWS IoT Analytics',
    category: 'IoT',
    tagline: 'Fully managed service for running sophisticated analytics on massive volumes of IoT data.',
    description:
      'AWS IoT Analytics is a fully managed service that makes it easy to run and operationalize sophisticated analytics on massive volumes of IoT data, filtering, transforming, and enriching device data before storing it for analysis and visualization.',
    keyFeatures: [
      'Channels, pipelines, and data stores clean, filter, and enrich raw IoT message data before analysis',
      'Built-in SQL querying lets you analyze processed IoT data without standing up a separate analytics stack',
      'Supports integration with Jupyter notebooks for advanced statistical analysis and machine learning on IoT data',
      'Can output results to QuickSight or other visualization tools for dashboards built on IoT data',
    ],
    useCases: [
      'Cleaning and enriching raw sensor data at scale before running analytical queries',
      'Running statistical analysis or building ML models on historical IoT device data using notebooks',
      'Feeding processed IoT datasets into dashboards for operational or business insight',
    ],
    examNotes: [
      'IoT Analytics is purpose-built for processing and analyzing device data specifically, distinguishing it from general-purpose analytics services like Athena or Redshift',
      'The channel -> pipeline -> data store -> dataset pipeline model is the core IoT Analytics workflow to remember',
      'Complements IoT Core (ingestion) and IoT SiteWise (industrial equipment-specific analytics) rather than replacing them',
    ],
    relatedServices: ['iot-core', 'iot-sitewise', 'quicksight'],
    pricingModel: 'Pay based on the volume of messages processed and the data stored/queried within IoT Analytics.',
    iconPath: './icons/iot/iot-analytics.svg',
  },
  {
    id: 'iot-device-defender',
    name: 'AWS IoT Device Defender',
    category: 'IoT',
    tagline: 'Continuously audits IoT configurations and monitors devices for security anomalies.',
    description:
      'AWS IoT Device Defender is a fully managed service that helps secure a fleet of IoT devices by continuously auditing device configurations against security best practices and monitoring device behavior to detect anomalies that may indicate a compromised device.',
    keyFeatures: [
      'Audit feature continuously checks IoT configurations (certificates, policies) against AWS security best practices',
      'Detect feature monitors device-side and cloud-side metrics for behavioral anomalies compared to an expected baseline',
      'Mitigation actions can automatically respond to detected issues, such as revoking a device\'s certificate',
      'Sends alerts via CloudWatch and SNS when audits or anomaly detection surface a security concern',
    ],
    useCases: [
      'Continuously auditing a large IoT device fleet\'s security configuration for drift from best practices',
      'Detecting a compromised device based on anomalous behavior, such as unusual outbound traffic patterns',
      'Automatically revoking certificates or quarantining devices identified as behaving maliciously',
    ],
    examNotes: [
      'Device Defender is the security-monitoring and auditing layer specifically for IoT fleets — audit (configuration compliance) and detect (behavioral anomalies) are the two core capabilities to remember',
      'It focuses on fleet-wide security posture, distinct from Device Management, which focuses on operational fleet management (updates, grouping, remote actions)',
      'Mitigation actions allow automated response (e.g., certificate revocation), reducing manual intervention when threats are detected',
    ],
    relatedServices: ['iot-core', 'iot-device-management', 'cloudwatch'],
    pricingModel: 'Pay per device per month for audit checks and behavioral anomaly detection monitoring.',
    iconPath: './icons/iot/iot-device-defender.svg',
  },
  {
    id: 'iot-device-management',
    name: 'AWS IoT Device Management',
    category: 'IoT',
    tagline: 'Onboard, organize, monitor, and remotely manage IoT devices at scale.',
    description:
      'AWS IoT Device Management makes it easy to securely onboard, organize, monitor, and remotely manage IoT devices at scale throughout their lifecycle, from initial provisioning through ongoing software updates and eventual decommissioning.',
    keyFeatures: [
      'Fleet indexing and search enable querying device fleets by attributes, state, or connectivity status',
      'Jobs let you deploy operations (e.g., firmware/software updates) to defined groups of devices at scale',
      'Device grouping (static or dynamic) organizes fleets logically for targeted management actions',
      'Remote actions support troubleshooting and managing individual devices without physical access',
    ],
    useCases: [
      'Performing bulk firmware or software updates across thousands of deployed IoT devices using Jobs',
      'Organizing a large, heterogeneous device fleet into logical groups for targeted operations or monitoring',
      'Searching and indexing a device fleet by attributes such as firmware version or connectivity status',
    ],
    examNotes: [
      'Device Management is about the operational lifecycle (onboarding, grouping, updates, remote actions) of a device fleet — distinct from Device Defender\'s security-focused auditing/detection role',
      'Jobs are the mechanism for rolling out fleet-wide actions like OTA (over-the-air) firmware updates in a controlled, staged manner',
      'Fleet indexing enables fast, attribute-based search across potentially millions of registered devices',
    ],
    relatedServices: ['iot-core', 'iot-device-defender', 'iot-greengrass'],
    pricingModel: 'Pay based on the number of fleet indexing operations, managed devices, and Jobs executions performed.',
    iconPath: './icons/iot/iot-device-management.svg',
  },
  {
    id: 'iot-sitewise',
    name: 'AWS IoT SiteWise',
    category: 'IoT',
    tagline: 'Collects, organizes, and analyzes industrial equipment data at scale.',
    description:
      'AWS IoT SiteWise is a managed service that makes it easy to collect, store, organize, and monitor data from industrial equipment at scale, using pre-built connectors and asset models that mirror real-world equipment hierarchies for operational insight.',
    keyFeatures: [
      'Asset models represent real-world industrial equipment hierarchies (e.g., site -> production line -> machine)',
      'Gateway software (SiteWise Edge) connects to industrial protocols like OPC-UA and Modbus to collect equipment data',
      'Built-in computations calculate metrics like availability, performance, and quality (common industrial KPIs)',
      'Monitor dashboards visualize real-time and historical equipment data without separate BI tooling',
    ],
    useCases: [
      'Monitoring factory floor equipment performance and availability metrics in near real time',
      'Modeling complex industrial equipment hierarchies to roll up metrics from individual machines to an entire plant',
      'Bridging legacy industrial protocols (OPC-UA, Modbus) into AWS for cloud-based analysis',
    ],
    examNotes: [
      'SiteWise is purpose-built for industrial/manufacturing equipment data, distinguishing it from the more general-purpose IoT Analytics service',
      'Asset models and their hierarchical structure are the key feature that lets SiteWise roll up metrics across a facility, not just a single device',
      'Edge gateway software enables on-premises data collection from legacy industrial equipment protocols before data reaches the cloud',
    ],
    relatedServices: ['iot-core', 'iot-analytics', 'iot-twinmaker'],
    pricingModel: 'Pay based on the number of data streams collected, messages processed, and queries executed.',
    iconPath: './icons/iot/iot-sitewise.svg',
  },
  {
    id: 'iot-events',
    name: 'AWS IoT Events',
    category: 'IoT',
    tagline: 'Detects and responds to events from IoT sensors and applications in real time.',
    description:
      'AWS IoT Events is a fully managed service that makes it easy to detect and respond to events from IoT sensors and applications, using detector models that represent devices or processes as a state machine to trigger alerts or automated actions based on sensor data patterns.',
    keyFeatures: [
      'Detector models represent equipment or processes as state machines, transitioning states based on incoming sensor data',
      'Can trigger actions (e.g., sending alerts, invoking Lambda) automatically when a defined event or state transition occurs',
      'Supports monitoring multiple related sensors together to detect complex, multi-condition events',
      'Integrates directly with IoT Core and IoT SiteWise data streams as event sources',
    ],
    useCases: [
      'Detecting when equipment transitions into a fault or warning state based on patterns across multiple sensors',
      'Triggering automated alerts or remediation workflows when specific sensor-data conditions are met',
      'Modeling complex operational processes (e.g., a multi-step industrial process) as a state machine for monitoring',
    ],
    examNotes: [
      'IoT Events focuses specifically on detecting event patterns/state changes across sensor data and triggering responses — distinct from IoT Analytics (broader data analysis) and SiteWise (equipment data organization)',
      'The detector model (state machine) concept is the key feature to recognize on the exam: "detect state transitions and respond" points to IoT Events',
      'Often used downstream of IoT Core or SiteWise, consuming their data streams as event-detection input',
    ],
    relatedServices: ['iot-core', 'iot-sitewise', 'lambda'],
    pricingModel: 'Pay per message evaluated by detector models and per detector instance created.',
    iconPath: './icons/iot/iot-events.svg',
  },
  {
    id: 'iot-fleetwise',
    name: 'AWS IoT FleetWise',
    category: 'IoT',
    tagline: 'Collects, transforms, and transfers vehicle data to the cloud in near real time.',
    description:
      'AWS IoT FleetWise makes it easier and more cost-effective for automakers to collect, transform, and transfer vehicle data to the cloud in near real time, using customizable data collection schemes to capture only the vehicle signals needed for a given analysis.',
    keyFeatures: [
      'Vehicle modeling framework represents vehicle sensors, signals, and network interfaces in a structured schema',
      'Customizable data collection schemes let fleets collect only the specific signals needed, reducing transfer costs',
      'Edge agent software (ran onboard the vehicle) processes and filters data before transmission to the cloud',
      'Integrates with existing AWS analytics and storage services (e.g., S3, Timestream) for downstream processing',
    ],
    useCases: [
      'Collecting connected-vehicle telemetry data at scale for automakers without transmitting excessive raw data',
      'Building condition-based maintenance or driver-behavior analysis programs using selective vehicle signal data',
      'Reducing cellular/data transfer costs by filtering vehicle data at the edge before sending it to the cloud',
    ],
    examNotes: [
      'IoT FleetWise is a niche, automotive/vehicle-specific IoT offering — exam scenarios mentioning "connected vehicles" or "automakers" point here specifically, not general IoT Core',
      'Selective data collection (only transmitting needed signals) is the core cost/efficiency value proposition to remember',
      'Built on top of general IoT connectivity concepts but specialized with a vehicle-signal data model',
    ],
    relatedServices: ['iot-core', 'iot-greengrass', 's3'],
    pricingModel: 'Pay based on the number of vehicles onboarded and the volume of vehicle data collected and transferred.',
    iconPath: './icons/iot/iot-fleetwise.svg',
  },
  {
    id: 'iot-twinmaker',
    name: 'AWS IoT TwinMaker',
    category: 'IoT',
    tagline: 'Build digital twins of real-world systems to monitor and optimize operations.',
    description:
      'AWS IoT TwinMaker makes it faster and easier to create digital twins of real-world systems, such as buildings, factories, and industrial equipment, by connecting existing data sources (IoT, video, enterprise applications) into a unified, visual 3D representation.',
    keyFeatures: [
      'Knowledge graph connects and models relationships between real-world entities without needing to migrate or duplicate underlying data',
      'Supports importing 3D models (e.g., from CAD or point-cloud scans) to create visual, spatial representations of facilities',
      'Pulls data from multiple existing sources (SiteWise, Kinesis Video Streams, S3) into a single unified twin',
      'Scene composer and viewer provide an interactive 3D visualization of connected real-world systems',
    ],
    useCases: [
      'Creating a visual, interactive digital twin of a factory or building to monitor real-time operational status',
      'Correlating data from multiple sources (sensors, video feeds, enterprise systems) into a unified operational view',
      'Supporting root-cause analysis by visually connecting equipment state to real-world spatial context',
    ],
    examNotes: [
      'TwinMaker focuses on visual, spatial digital twins composed of data from multiple existing sources, distinguishing it from SiteWise, which focuses on collecting/organizing the underlying industrial data itself',
      'It connects to existing data (SiteWise, Kinesis Video Streams, S3) rather than requiring data migration into a new store',
      'A relatively specialized/niche service — exam emphasis is more likely on the concept of "digital twin" than deep configuration detail',
    ],
    relatedServices: ['iot-sitewise', 'iot-core', 'kinesis-data-streams'],
    pricingModel: 'Pay based on the number of queries, workspace data storage, and 3D scene usage within TwinMaker.',
    iconPath: './icons/iot/iot-twinmaker.svg',
  },
  {
    id: 'freertos',
    name: 'FreeRTOS',
    category: 'IoT',
    tagline: 'Open-source, real-time operating system for microcontrollers used in IoT edge devices.',
    description:
      'FreeRTOS is a free, open-source real-time operating system for microcontrollers that makes small, low-power edge devices easy to program, deploy, secure, connect, and maintain, with AWS providing software libraries that make it easy to connect FreeRTOS devices to AWS IoT services.',
    keyFeatures: [
      'Lightweight real-time kernel designed to run on resource-constrained microcontrollers',
      'AWS-provided libraries enable secure, out-of-the-box connectivity to AWS IoT Core and Greengrass',
      'Over-the-air (OTA) update support allows remotely updating firmware on deployed microcontroller-based devices',
      'Open source and widely adopted across many microcontroller vendors and hardware platforms',
    ],
    useCases: [
      'Running real-time, low-power applications on microcontroller-based IoT edge devices (sensors, actuators)',
      'Securely connecting small, resource-constrained edge devices directly to AWS IoT Core',
      'Performing over-the-air firmware updates on deployed microcontroller devices in the field',
    ],
    examNotes: [
      'FreeRTOS is the microcontroller-level (not full server/edge-gateway) real-time OS, distinguishing it from Greengrass, which runs on more capable edge devices/gateways',
      'The pairing to remember: FreeRTOS runs on the constrained microcontroller/sensor itself; Greengrass typically runs on a more capable local gateway that aggregates multiple FreeRTOS devices',
      'It is open source and free — AWS\'s value-add is the libraries and OTA tooling for secure connectivity to AWS IoT services',
    ],
    relatedServices: ['iot-core', 'iot-greengrass'],
    pricingModel: 'FreeRTOS itself is free and open source; you pay only for the AWS IoT services (e.g., IoT Core) it connects to.',
    iconPath: './icons/iot/freertos.svg',
  },
];
