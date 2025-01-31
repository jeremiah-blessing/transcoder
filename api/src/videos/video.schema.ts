import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type VideoDocument = HydratedDocument<Video>;

@Schema({ toJSON: { virtuals: true, versionKey: false }, timestamps: true })
export class Video {
  @Prop({ type: mongoose.Schema.Types.String, required: true })
  title: string;

  @Prop({ type: mongoose.Schema.Types.Int32 })
  duration: number;
}

export const VideoSchema = SchemaFactory.createForClass(Video);
