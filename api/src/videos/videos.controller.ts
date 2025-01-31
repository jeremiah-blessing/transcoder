import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { VideosService } from './videos.service';
import { CreateVideoDto, UpdateVideoDto } from './dto';

@Controller('videos')
export class VideosController {
  constructor(private readonly videosService: VideosService) {}

  @Get()
  findAll() {
    return this.videosService.findAll();
  }

  @Get(':id')
  findOne(id: string) {
    return this.videosService.findOne(id);
  }

  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videosService.create(createVideoDto);
  }

  @Patch(':id')
  update(id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videosService.update(id, updateVideoDto);
  }

  @Delete(':id')
  delete(id: string) {
    return this.videosService.delete(id);
  }
}
