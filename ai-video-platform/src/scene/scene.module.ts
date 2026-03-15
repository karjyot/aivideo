import { Module } from '@nestjs/common';
import { SceneService } from './scene.service';

@Module({
  providers: [SceneService],
  exports: [SceneService],   // ✅ REQUIRED
})
export class SceneModule {}