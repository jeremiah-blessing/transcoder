import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VideosModule } from './videos/videos.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UploadsModule } from './uploads/uploads.module';
import { TemporalModule } from './temporal/temporal.module';
import { S3Module } from './s3/s3.module';

@Module({
  imports: [
    TemporalModule,
    UploadsModule,
    VideosModule,
    MongooseModule.forRoot('mongodb://localhost/videos-api'),
    S3Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
