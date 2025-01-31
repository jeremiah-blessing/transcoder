import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UploadsService } from './uploads.service';
import { CreateUploadDto, UpdateUploadDto } from './dto';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}
  @Get()
  findAll() {
    return this.uploadsService.findAll();
  }

  @Get(':id')
  findOne(id: string) {
    return this.uploadsService.findOne(id);
  }

  @Post(':id/process')
  processVideo(@Param('id') id: string) {
    return this.uploadsService.processVideo(id);
  }

  @Post()
  create(@Body() createUploadDto: CreateUploadDto) {
    return this.uploadsService.create(createUploadDto);
  }

  @Post(':id/generate-url')
  generateUrl(@Param('id') id: string) {
    return this.uploadsService.createUploadUrl(id);
  }

  @Patch(':id')
  update(id: string, @Body() updateUploadDto: UpdateUploadDto) {
    return this.uploadsService.update(id, updateUploadDto);
  }

  @Delete(':id')
  delete(id: string) {
    return this.uploadsService.delete(id);
  }
}
