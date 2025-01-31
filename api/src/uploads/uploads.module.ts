import { Module } from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { UploadsController } from './uploads.controller';
import { TemporalModule } from 'src/temporal/temporal.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Upload, UploadSchema } from './upload.schema';
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports: [
    TemporalModule,
    S3Module,
    MongooseModule.forFeature([{ name: Upload.name, schema: UploadSchema }]),
  ],
  providers: [UploadsService],
  controllers: [UploadsController],
})
export class UploadsModule {}
