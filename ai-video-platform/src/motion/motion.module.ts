import { Module } from '@nestjs/common';
import { MotionService } from './motion.service';

@Module({
  providers: [MotionService],
  exports: [MotionService],   // ⭐ IMPORTANT
})
export class MotionModule {}