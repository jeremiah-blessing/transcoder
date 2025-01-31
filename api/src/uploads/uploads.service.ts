import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TemporalService } from 'src/temporal/temporal.service';
import { processVideo as processVideoWorkflow } from 'workflows/lib/workflows';
import { Upload } from './upload.schema';
import { Model } from 'mongoose';
import { CreateUploadDto, UpdateUploadDto } from './dto';
import { S3Service } from 'src/s3/s3.service';

@Injectable()
export class UploadsService {
  constructor(
    private readonly temporalService: TemporalService,
    private readonly s3Service: S3Service,
    @InjectModel(Upload.name) private uploadModel: Model<Upload>
  ) {}

  findAll() {
    return this.uploadModel.find().exec();
  }

  findOne(id: string) {
    return this.uploadModel.findById(id).exec();
  }

  async processVideo(uploadId: string) {
    const upload = await this.uploadModel.findById(uploadId).exec();

    const videoId = upload.videoId;

    const createdWorkflow = await this.temporalService.client.start(
      processVideoWorkflow,
      {
        taskQueue: 'process-video',
        workflowId:
          'process-video-' + uploadId + '-' + new Date().toISOString(),
        args: [{ uploadId, videoId }],
      }
    );

    return { workflowId: createdWorkflow.workflowId, success: true };
  }

  async create(createUploadDto: CreateUploadDto) {
    const createdUpload = new this.uploadModel(createUploadDto);
    return createdUpload.save();
  }

  async update(id: string, updateUploadDto: UpdateUploadDto) {
    return this.uploadModel
      .findByIdAndUpdate(id, updateUploadDto, { new: true })
      .exec();
  }

  async createUploadUrl(uploadId: string) {
    const uploadUrl = await this.s3Service.generateUploadUrl(uploadId);

    return { uploadUrl };
  }

  async delete(id: string) {
    return this.uploadModel.findByIdAndDelete(id).exec();
  }
}
