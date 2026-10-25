import type { AWSService } from '../../types/service';
import { COMPUTE_SERVICES } from './compute';
import { CONTAINER_SERVICES } from './containers';
import { STORAGE_SERVICES } from './storage';
import { DATABASE_SERVICES } from './database';
import { NETWORKING_SERVICES } from './networking';
import { SECURITY_SERVICES } from './security';
import { ANALYTICS_SERVICES } from './analytics';
import { ML_SERVICES } from './ml';
import { INTEGRATION_SERVICES } from './integration';
import { MANAGEMENT_SERVICES } from './management';
import { DEVELOPER_TOOLS_SERVICES } from './developerTools';
import { MIGRATION_SERVICES } from './migration';
import { MEDIA_SERVICES } from './media';
import { IOT_SERVICES } from './iot';

export const ALL_SERVICES: AWSService[] = [
  ...COMPUTE_SERVICES,
  ...CONTAINER_SERVICES,
  ...STORAGE_SERVICES,
  ...DATABASE_SERVICES,
  ...NETWORKING_SERVICES,
  ...SECURITY_SERVICES,
  ...ANALYTICS_SERVICES,
  ...ML_SERVICES,
  ...INTEGRATION_SERVICES,
  ...MANAGEMENT_SERVICES,
  ...DEVELOPER_TOOLS_SERVICES,
  ...MIGRATION_SERVICES,
  ...MEDIA_SERVICES,
  ...IOT_SERVICES,
];

export function getServiceById(id: string): AWSService | undefined {
  return ALL_SERVICES.find((service) => service.id === id);
}
