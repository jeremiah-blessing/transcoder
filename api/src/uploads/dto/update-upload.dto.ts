import { UploadStatus } from '../upload.schema';

export class UpdateUploadDto {
  readonly status?: UploadStatus;
}
