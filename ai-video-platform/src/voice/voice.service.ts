import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

@Injectable()
export class VoiceService {

  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  async generateVoice(script: string): Promise<string> {

    const outputDir = path.join(process.cwd(), 'storage/audio');

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // create hash from script
    const hash = crypto.createHash('md5').update(script).digest('hex');

    const outputPath = path.join(outputDir, `voice-${hash}.mp3`);

    // ✅ reuse if already exists
    if (fs.existsSync(outputPath)) {
      console.log("Using cached voice:", outputPath);
      return outputPath;
    }

    console.log("Generating new voice...");

    const response = await this.openai.audio.speech.create({
      model: "gpt-4o-mini-tts",
      voice: "alloy",
      input: script
    });

    const buffer = Buffer.from(await response.arrayBuffer());

    fs.writeFileSync(outputPath, buffer);

    return outputPath;
  }
}