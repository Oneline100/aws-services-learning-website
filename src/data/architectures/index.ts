import type { ArchitectureDemo } from '../../types/architecture';
import { STATIC_WEBSITE_DEMO } from './staticWebsite';
import { THREE_TIER_DEMO } from './threeTier';
import { SERVERLESS_API_DEMO } from './serverlessApi';
import { CONTAINER_ORCHESTRATION_DEMO } from './containerOrchestration';
import { DATA_LAKE_DEMO } from './dataLake';
import { STREAMING_DEMO } from './streaming';
import { ML_PIPELINE_DEMO } from './mlPipeline';
import { CICD_DEMO } from './cicd';
import { HYBRID_NETWORKING_DEMO } from './hybridNetworking';
import { DISASTER_RECOVERY_DEMO } from './disasterRecovery';
import { IOT_INGESTION_DEMO } from './iotIngestion';
import { MICROSERVICES_MESH_DEMO } from './microservicesMesh';
import { EVENT_DRIVEN_DEMO } from './eventDriven';
import { SECURITY_BASELINE_DEMO } from './securityBaseline';

export const ALL_ARCHITECTURES: ArchitectureDemo[] = [
  STATIC_WEBSITE_DEMO,
  THREE_TIER_DEMO,
  SERVERLESS_API_DEMO,
  CONTAINER_ORCHESTRATION_DEMO,
  DATA_LAKE_DEMO,
  STREAMING_DEMO,
  ML_PIPELINE_DEMO,
  CICD_DEMO,
  HYBRID_NETWORKING_DEMO,
  DISASTER_RECOVERY_DEMO,
  IOT_INGESTION_DEMO,
  MICROSERVICES_MESH_DEMO,
  EVENT_DRIVEN_DEMO,
  SECURITY_BASELINE_DEMO,
];

export function getArchitectureById(id: string): ArchitectureDemo | undefined {
  return ALL_ARCHITECTURES.find((demo) => demo.id === id);
}
