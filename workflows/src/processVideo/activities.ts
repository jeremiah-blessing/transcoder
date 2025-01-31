import { log } from '@temporalio/activity';
import { ProcessVideo } from './service';

export const createHLSStream = async ({
  uploadId,
  videoId,
}: {
  uploadId: string;
  videoId: string;
}) => {
  log.info('Creating HLS Stream');
  const process = new ProcessVideo(uploadId);

  await process.setup();
  await process.process();
  await process.upload();
  await process.cleanup();
  return 'Success!';
};

export const createVideoImagePreviews = async (name: string) => {
  log.info('Creating Video Image Previews');
  return `Video Image Previews for ${name}`;
};
