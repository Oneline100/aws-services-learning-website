import type { AWSService } from '../../types/service';

export const CONTAINER_SERVICES: AWSService[] = [
  {
    id: 'ecs',
    name: 'Amazon Elastic Container Service (ECS)',
    category: 'Containers',
    tagline: 'A fully managed container orchestration service built for AWS.',
    description:
      'Amazon ECS runs and manages Docker containers at scale, scheduling them across a cluster of EC2 instances or serverless Fargate capacity. It is deeply integrated with other AWS services like ELB, IAM, and CloudWatch, and uses AWS-native concepts (task definitions, services, clusters) rather than the Kubernetes API.',
    keyFeatures: [
      'Task definitions describe one or more containers, their images, CPU/memory, and networking as a unit',
      'Runs on EC2 (self-managed instances) or AWS Fargate (serverless, no instance management)',
      'Native integrations with ELB, IAM roles for tasks, Service Discovery, and CloudWatch Container Insights',
      'ECS Service scheduler maintains a desired count of running tasks and replaces unhealthy ones',
    ],
    useCases: [
      'Running microservices architectures without managing a Kubernetes control plane',
      'Migrating existing Docker Compose-style workloads to a managed AWS orchestrator',
      'Batch and long-running containerized workloads that need tight AWS service integration',
    ],
    examNotes: [
      'ECS uses AWS-proprietary orchestration APIs; EKS uses the open-source Kubernetes API — pick ECS for simpler AWS-native setups, EKS for Kubernetes portability',
      'Fargate launch type removes the need to manage EC2 instances for your cluster; EC2 launch type gives more control and can be cheaper at steady scale',
      'ECS itself is free — you pay for the underlying EC2 or Fargate compute, not for ECS orchestration',
    ],
    relatedServices: ['fargate', 'ecr', 'eks'],
    pricingModel: 'No additional charge for ECS; billed for the underlying EC2 instances or Fargate vCPU/memory used.',
    iconPath: './icons/containers/ecs.svg',
  },
  {
    id: 'eks',
    name: 'Amazon Elastic Kubernetes Service (EKS)',
    category: 'Containers',
    tagline: 'Run fully managed, upstream-compatible Kubernetes on AWS.',
    description:
      'Amazon EKS runs a managed Kubernetes control plane across multiple Availability Zones, handling control-plane patching, scaling, and upgrades, while worker nodes run on EC2, Fargate, or on-premises via EKS Anywhere, giving teams a certified, standard Kubernetes experience on AWS.',
    keyFeatures: [
      'Managed, highly available Kubernetes control plane spread across multiple AZs',
      'Worker nodes can run on EC2 (managed node groups or self-managed) or on Fargate for serverless pods',
      'Fully compatible with standard Kubernetes tooling (kubectl, Helm, operators) and upstream Kubernetes releases',
      'Integrates with IAM for Kubernetes RBAC (IRSA) and with VPC CNI for native pod networking',
    ],
    useCases: [
      'Organizations standardizing on Kubernetes for portability across cloud and on-premises',
      'Teams with existing Kubernetes expertise or manifests wanting to lift them into AWS',
      'Complex multi-service applications needing the Kubernetes ecosystem (Helm charts, operators, service meshes)',
    ],
    examNotes: [
      'EKS has an hourly charge for the managed control plane, in addition to worker node compute costs — unlike ECS, which has no separate orchestration fee',
      'Choose EKS over ECS when Kubernetes API compatibility or multi-cloud portability is a stated requirement',
      'EKS supports Fargate for pods, avoiding the need to size and patch EC2 worker nodes for every workload',
    ],
    relatedServices: ['ecs', 'fargate', 'ecr'],
    pricingModel: 'Hourly charge per cluster for the control plane, plus the cost of EC2 or Fargate worker compute.',
    iconPath: './icons/containers/eks.svg',
  },
  {
    id: 'fargate',
    name: 'AWS Fargate',
    category: 'Containers',
    tagline: 'Serverless compute for containers — no servers or clusters to manage.',
    description:
      'AWS Fargate is a serverless compute engine for containers that works with both ECS and EKS, removing the need to provision, patch, or scale EC2 instances. You specify CPU and memory for each task or pod, and Fargate runs it in an isolated, right-sized environment.',
    keyFeatures: [
      'No EC2 instances to provision, patch, or scale — Fargate manages the underlying infrastructure',
      'Each task/pod runs in its own isolated kernel for workload-level security isolation',
      'Pay only for the vCPU and memory resources requested by running tasks/pods, per-second billing',
      'Works as a launch type for both ECS and EKS',
    ],
    useCases: [
      'Running containerized applications without the operational overhead of managing a cluster of instances',
      'Bursty or unpredictable workloads where pre-provisioning EC2 capacity would waste money',
      'Teams that want container benefits without taking on infrastructure management',
    ],
    examNotes: [
      'Fargate generally costs more per compute unit than equivalent EC2 capacity — it trades cost efficiency for zero infrastructure management',
      'Fargate cannot use privileged containers or access the underlying host OS the way EC2 launch type can — a common limitation distractor',
      'Billed per-second for the vCPU/memory configured for each task, rounded to the nearest second (with a minimum charge)',
    ],
    relatedServices: ['ecs', 'eks', 'ecr'],
    pricingModel: 'Pay per-second for the vCPU and memory resources allocated to running tasks or pods.',
    iconPath: './icons/containers/fargate.svg',
  },
  {
    id: 'ecr',
    name: 'Amazon Elastic Container Registry (ECR)',
    category: 'Containers',
    tagline: 'A fully managed Docker container registry for storing and deploying images.',
    description:
      'Amazon ECR is a fully managed container image registry that stores, manages, and deploys Docker and OCI images, integrating tightly with ECS, EKS, and Lambda, with IAM-based access control and built-in image scanning for vulnerabilities.',
    keyFeatures: [
      'Private and public repositories for Docker/OCI container images',
      'IAM-based resource policies control who can push and pull images',
      'Built-in vulnerability scanning (basic and enhanced via Inspector) on image push',
      'Lifecycle policies automatically expire old or untagged images to control storage costs',
    ],
    useCases: [
      'Storing and versioning container images used by ECS, EKS, Fargate, or Lambda container-image functions',
      'Centralizing a private image registry across an organization with fine-grained access control',
    ],
    examNotes: [
      'ECR is the AWS-native equivalent of Docker Hub, but secured by IAM rather than a separate credential system',
      'Image scanning can flag known CVEs in OS packages before deployment — an important security exam talking point',
      'Cross-Region and cross-account replication is supported for resiliency and multi-Region deployments',
    ],
    relatedServices: ['ecs', 'eks', 'lambda'],
    pricingModel: 'Pay per GB-month of image storage, plus data transfer charges for image pulls outside the Region.',
    iconPath: './icons/containers/ecr.svg',
  },
  {
    id: 'app-mesh',
    name: 'AWS App Mesh',
    category: 'Containers',
    tagline: 'Application-level networking for monitoring and controlling microservices.',
    description:
      'AWS App Mesh is a service mesh that provides application-level networking, giving consistent visibility and traffic control across microservices running on ECS, EKS, Fargate, or EC2, using the open-source Envoy proxy as its data plane.',
    keyFeatures: [
      'Uses Envoy proxies deployed as sidecars to handle service-to-service traffic',
      'Provides traffic routing rules, retries, timeouts, and circuit breaking without application code changes',
      'Centralized observability: consistent metrics, logs, and traces across all mesh services',
      'Works across ECS, EKS, Fargate, and EC2-based microservices in a single mesh',
    ],
    useCases: [
      'Standardizing traffic management (canary deployments, retries, circuit breaking) across many microservices',
      'Gaining end-to-end visibility into service-to-service communication in a distributed application',
    ],
    examNotes: [
      'App Mesh operates at the application (L7) layer, distinct from a VPC\'s network-layer (L3/L4) controls',
      'Not required to run containers on AWS — it is an optional add-on for observability/traffic control, not a core orchestration dependency',
      'Built on Envoy, the same proxy used by many open-source service mesh implementations, aiding portability of configuration concepts',
    ],
    relatedServices: ['ecs', 'eks', 'fargate'],
    pricingModel: 'No additional charge for App Mesh itself; billed for the underlying compute and data transfer resources used.',
    iconPath: './icons/containers/app-mesh.svg',
  },
  {
    id: 'red-hat-openshift-service-on-aws',
    name: 'Red Hat OpenShift Service on AWS (ROSA)',
    category: 'Containers',
    tagline: 'A jointly managed Red Hat OpenShift service, fully integrated with AWS.',
    description:
      'Red Hat OpenShift Service on AWS (ROSA) is a fully managed OpenShift service, jointly operated and supported by AWS and Red Hat, that lets teams run OpenShift clusters natively on AWS with a unified bill, native AWS service integrations, and the full OpenShift developer experience.',
    keyFeatures: [
      'Jointly managed and supported by AWS and Red Hat with a single SLA',
      'Full OpenShift platform: integrated CI/CD, developer console, and operator ecosystem on top of Kubernetes',
      'Native integration with AWS services (IAM, VPC, CloudWatch) and consolidated AWS billing',
      'Automated cluster provisioning, scaling, upgrades, and patching handled by the managed service',
    ],
    useCases: [
      'Enterprises already standardized on Red Hat OpenShift who want to run it natively on AWS infrastructure',
      'Organizations needing a jointly supported, enterprise-grade Kubernetes platform with consolidated AWS billing',
    ],
    examNotes: [
      'ROSA is a Kubernetes distribution (OpenShift) jointly managed with a partner, distinct from EKS which is AWS\'s own managed Kubernetes offering',
      'Useful exam distinction: choose ROSA when a scenario specifically requires existing OpenShift tooling/skills or Red Hat support agreements; choose EKS for a native AWS-first Kubernetes approach',
    ],
    relatedServices: ['eks', 'ecs', 'ec2'],
    pricingModel: 'Hourly/annual subscription per cluster plus the underlying AWS infrastructure (EC2, EBS, etc.) consumed.',
    iconPath: './icons/containers/red-hat-openshift-service-on-aws.svg',
  },
];
