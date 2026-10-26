import type { ArchitectureDemo } from '../../types/architecture';

export const IOT_INGESTION_DEMO: ArchitectureDemo = {
  id: 'iot-ingestion',
  title: 'IoT Data Ingestion',
  description:
    'Fleets of connected devices publish telemetry to IoT Core over MQTT, IoT Core rules forward the messages into Kinesis Data Streams for real-time processing, and the stream is durably archived to S3 for later analysis.',
  nodes: [
    { id: 'n1', serviceId: 'iot-core', position: { x: 0, y: 100 } },
    { id: 'n2', serviceId: 'kinesis-data-streams', position: { x: 340, y: 100 } },
    { id: 'n3', serviceId: 's3', position: { x: 680, y: 100 } },
  ],
  edges: [
    { id: 'e1', source: 'n1', target: 'n2', label: 'Device telemetry via rule action', animated: true },
    { id: 'e2', source: 'n2', target: 'n3', label: 'Archive stream records', animated: true },
  ],
};
