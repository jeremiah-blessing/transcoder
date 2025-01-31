import { proxyActivities, log } from '@temporalio/workflow';
import type * as activities from './activities';

const { createHLSStream, createVideoImagePreviews } = proxyActivities<
  typeof activities
>({
  startToCloseTimeout: '1 minute',
});

interface ProcessVideoArgs {
  uploadId: string;
  videoId: string;
}

export async function processVideo({
  uploadId,
  videoId,
}: ProcessVideoArgs): Promise<string> {
  log.info('Processing Video with ID' + videoId);
  const res1 = await createHLSStream({ uploadId, videoId });
  const res2 = await createVideoImagePreviews(uploadId);
  return `${res1} ${res2}`;
}
