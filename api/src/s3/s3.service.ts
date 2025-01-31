import { Injectable } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class S3Service {
  private s3Client: S3Client;
  private uploadsBucketName: string;

  constructor() {
    this.s3Client = new S3Client({
      region: 'us-east-1',
      endpoint: 'http://localhost:9090',
      credentials: {
        accessKeyId: 'minio',
        secretAccessKey: 'miniosecret',
      },
      forcePathStyle: true,
    });

    this.uploadsBucketName = 'uploads';
  }

  async generateUploadUrl(
    Key: string,
    expiresIn: number = 3600
  ): Promise<string> {
    const command = new PutObjectCommand({
      Bucket: this.uploadsBucketName,
      Key,
    });

    return getSignedUrl(this.s3Client, command, { expiresIn });
  }
}
