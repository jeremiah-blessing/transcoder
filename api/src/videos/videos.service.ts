import { Injectable } from '@nestjs/common';
import { CreateVideoDto, UpdateVideoDto } from './dto';
import { Video } from './video.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class VideosService {
  constructor(
    @InjectModel(Video.name) private readonly videoModel: Model<Video>
  ) {}

  async findAll() {
    return this.videoModel.find().exec();
  }

  async findOne(id: string) {
    return this.videoModel.findById(id).exec();
  }

  async create(createVideoDto: CreateVideoDto) {
    const createdVideo = await this.videoModel.create(createVideoDto);
    return createdVideo;
  }

  async update(id: string, updateVideoDto: UpdateVideoDto) {
    return this.videoModel
      .findByIdAndUpdate(id, updateVideoDto, { new: true })
      .exec();
  }

  async delete(id: string) {
    return this.videoModel.findByIdAndDelete(id).exec();
  }
}
