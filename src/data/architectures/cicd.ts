import type { ArchitectureDemo } from '../../types/architecture';

export const CICD_DEMO: ArchitectureDemo = {
  id: 'cicd',
  title: 'CI/CD Release Pipeline',
  description:
    'A developer pushes code to CodeCommit, which triggers CodePipeline to orchestrate the release: CodeBuild compiles and tests the code, and CodeDeploy rolls the resulting artifact out to target environments.',
  nodes: [
    { id: 'n1', serviceId: 'codecommit', position: { x: 0, y: 100 } },
    { id: 'n2', serviceId: 'codepipeline', position: { x: 250, y: 100 } },
    { id: 'n3', serviceId: 'codebuild', position: { x: 500, y: 100 } },
    { id: 'n4', serviceId: 'codedeploy', position: { x: 750, y: 100 } },
  ],
  edges: [
    { id: 'e1', source: 'n1', target: 'n2', label: 'Code push triggers pipeline', animated: true },
    { id: 'e2', source: 'n2', target: 'n3', label: 'Build and test stage', animated: true },
    { id: 'e3', source: 'n3', target: 'n4', label: 'Deploy build artifact', animated: true },
  ],
};
