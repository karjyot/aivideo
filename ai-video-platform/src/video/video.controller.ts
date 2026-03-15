import { Controller, Post, Body } from '@nestjs/common';
import { VideoService } from './video.service';

@Controller('video')
export class VideoController {

  constructor(private readonly videoService: VideoService) {}

  @Post('generate')
  async generateVideo(@Body() body: { prompt: string }) {
    return this.videoService.generateVideo(body.prompt);
  }

}