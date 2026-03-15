import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';

import { SceneModule } from '../scene/scene.module';
import { ImageModule } from '../image/image.module';
import { VoiceModule } from '../voice/voice.module';
import { RendererModule } from '../renderer/renderer.module';
import { ScriptModule } from '../script/script.module';
import { MotionService } from '../motion/motion.service';
@Module({
  providers: [MotionService],
  exports: [MotionService],   // ⭐ IMPORTANT
})
export class MotionModule {}

@Module({
  imports: [
    SceneModule,
    ImageModule,
    VoiceModule,      // ✅ ADD THIS
    RendererModule,
    ScriptModule,
    MotionModule
  ],
  controllers: [VideoController],
  providers: [VideoService],
})
export class VideoModule {}