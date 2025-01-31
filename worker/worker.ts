import { Worker } from '@temporalio/worker';
import * as activities from '../workflows/src/activities';

async function run() {
  const worker = await Worker.create({
    workflowsPath: require.resolve('../workflows/lib/workflows.js'),
    activities,
    taskQueue: 'process-video',
  });

  await worker.run();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
