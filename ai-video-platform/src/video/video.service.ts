import { Injectable } from '@nestjs/common';

import { ScriptService } from '../script/script.service';
import { SceneService } from '../scene/scene.service';
import { ImageService } from '../image/image.service';
import { MotionService } from '../motion/motion.service';
import { VoiceService } from '../voice/voice.service';
import { RendererService } from '../renderer/renderer.service';

@Injectable()
export class VideoService {

  constructor(
    private readonly scriptService: ScriptService,
    private readonly sceneService: SceneService,
    private readonly imageService: ImageService,
    private readonly motionService: MotionService,
    private readonly voiceService: VoiceService,
    private readonly rendererService: RendererService,
  ) {}

  async generateVideo(prompt: string) {

    console.log("Generating script...");

    const script = await this.scriptService.generateScript(prompt);

    console.log("Script:", script);


    console.log("Splitting scenes...");

    const scenes = this.sceneService.splitScenes(script);


    console.log("Generating images...");

    const images = await this.imageService.generateImages(scenes);


    console.log("Generating motion clips...");

    const clips: string[] = [];

    for (const img of images) {

    const clip = await this.motionService.generateMotion(images[0]);
      clips.push(clip);

    }


    console.log("Generating voice...");

    const voice = await this.voiceService.generateVoice(script);


    console.log("Rendering final video...");

    const video = await this.rendererService.render(clips, voice);


    return {
      prompt,
      script,
      scenes,
      images,
      clips,
      voice,
      video
    };

  }

}