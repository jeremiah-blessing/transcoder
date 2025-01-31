import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type UploadDocument = HydratedDocument<Upload>;

export enum UploadStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
}

@Schema({ toJSON: { virtuals: true, versionKey: false }, timestamps: true })
export class Upload {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  videoId: string;

  @Prop({
    type: mongoose.Schema.Types.String,
    default: UploadStatus.PENDING,
    enum: UploadStatus,
  })
  status: UploadStatus;
}

export const UploadSchema = SchemaFactory.createForClass(Upload);
