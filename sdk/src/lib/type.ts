export interface IVideo {
  id: string;
  title: string;
  duration: number;
}

export enum UploadStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

export interface IUpload {
  id: string;
  videoId: string;
  status: UploadStatus;
}
