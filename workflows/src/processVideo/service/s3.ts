import {
  DeleteObjectCommand,
  GetObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import { Readable } from 'stream';
import type { GetReadStream, GetWriteStream } from './filesystem';

const UploadsBucket = 'uploads';
const VideosBucket = 'videos';

const s3Config = {
  region: 'us-east-1',
  endpoint: 'http://localhost:9090',
  credentials: {
    accessKeyId: 'minio',
    secretAccessKey: 'miniosecret',
  },
  forcePathStyle: true,
};

export class S3 {
  private client: S3Client;
  private getUploadReadStream: GetReadStream;
  private getDowloadWriteStream: GetWriteStream;
  private uploadId: string;

  constructor(
    uploadId: string,
    readStream: GetReadStream,
    writeStream: GetWriteStream
  ) {
    this.getUploadReadStream = readStream;
    this.getDowloadWriteStream = writeStream;
    this.client = new S3Client(s3Config);
    this.uploadId = uploadId;
  }

  private async uploadFileToS3(filePath: string, s3Key: string) {
    const fileStream = await this.getUploadReadStream(filePath);

    const upload = new Upload({
      client: this.client,
      params: {
        Bucket: VideosBucket,
        Key: s3Key,
        Body: fileStream,
      },
    });

    await upload.done();
  }

  async downloadOriginalFile() {
    const command = new GetObjectCommand({
      Bucket: UploadsBucket,
      Key: this.uploadId,
    });

    const { Body } = await this.client.send(command);

    if (Body instanceof Readable) {
      const writeStream = await this.getDowloadWriteStream(this.uploadId);
      await new Promise<void>((resolve, reject) => {
        Body.pipe(writeStream);
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
      });
    } else {
      throw new Error(
        `Body is not a Readable stream for file ${this.uploadId}`
      );
    }
  }

  async uploadProcessedFiles(
    files: { relativePath: string; absolutePath: string }[]
  ) {
    for (const file of files) {
      await this.uploadFileToS3(file.absolutePath, file.relativePath);
    }
  }

  async deleteFile(fileName: string) {
    const command = new DeleteObjectCommand({
      Bucket: UploadsBucket,
      Key: fileName,
    });

    await this.client.send(command);
  }
}
