import type { ArchitectureDemo } from '../../types/architecture';

export const ML_PIPELINE_DEMO: ArchitectureDemo = {
  id: 'ml-pipeline',
  title: 'Machine Learning Training & Inference Pipeline',
  description:
    'Training data is read from S3 by SageMaker to train and host a model endpoint, and a Lambda function invokes that endpoint to serve real-time predictions to applications.',
  nodes: [
    { id: 'n1', serviceId: 's3', position: { x: 0, y: 60 } },
    { id: 'n2', serviceId: 'sagemaker', position: { x: 420, y: 200 } },
    { id: 'n3', serviceId: 'lambda', position: { x: 0, y: 340 } },
  ],
  edges: [
    { id: 'e1', source: 'n1', target: 'n2', label: 'Read training dataset', animated: true },
    { id: 'e2', source: 'n3', target: 'n2', label: 'Invoke model endpoint for inference', animated: true },
  ],
};
