import { Module } from '@nestjs/common';
import { VoiceService } from './voice.service';

@Module({
  providers: [VoiceService],
  exports: [VoiceService],   // ✅ REQUIRED
})
export class VoiceModule {}