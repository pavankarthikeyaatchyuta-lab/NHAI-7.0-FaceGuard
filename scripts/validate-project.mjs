import {existsSync} from 'node:fs';
import {join} from 'node:path';

const root = process.cwd();
const required = [
  'README.md',
  'LICENSE',
  'docs/ARCHITECTURE.md',
  'docs/INTEGRATION_GUIDE.md',
  'docs/MODEL_PIPELINE.md',
  'docs/SETUP_AND_USAGE.md',
  'docs/DEMO_FLOW.md',
  'docs/BRIEF_COMPLIANCE.md',
  'docs/PRESENTATION.md',
  'docs/SECURITY.md',
  'docs/SYNC_PURGE.md',
  'docs/TESTING_PLAN.md',
  'docs/EVALUATION_MAPPING.md',
  'docs/screenshots/enrollment-screen.svg',
  'docs/screenshots/authentication-screen.svg',
  'docs/screenshots/liveness-challenge-screen.svg',
  'docs/screenshots/sync-dashboard.svg',
  'docs/Technical_Proposal.pdf',
  'docs/Presentation.pptx',
  'docs/sync-workflow.md',
  'mobile/App.tsx',
  'mobile/src/services/face/FacePipeline.ts',
  'mobile/src/services/liveness/LivenessEngine.ts',
  'mobile/src/services/sync/SyncManager.ts',
  'backend/lambda/syncEvents/handler.mjs',
  'backend/infra/template.yaml',
  'models/README.md',
  'tests/vitest.config.ts',
];

const missing = required.filter(file => !existsSync(join(root, file)));
if (missing.length > 0) {
  console.error(`Missing required files:\n${missing.join('\n')}`);
  process.exit(1);
}

console.log(`FaceGuard validation passed (${required.length} required files present).`);
