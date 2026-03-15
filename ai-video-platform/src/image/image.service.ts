import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class ImageService {

  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

// async generateImages(scenes: string[]): Promise<string[]> {

//   const fs = require('fs');
//   const path = require('path');

//   const dir = path.join(process.cwd(), 'storage', 'images');

//   if (!fs.existsSync(dir)) {
//     fs.mkdirSync(dir, { recursive: true });
//   }

//   const limitedScenes = scenes.slice(0, 3); // limit for testing

//   const images: string[] = [];

//   for (let i = 0; i < limitedScenes.length; i++) {

//     const scene = limitedScenes[i];

//     console.log(`Generating image for scene ${i + 1}`);

//     const response = await this.openai.images.generate({
//       model: "gpt-image-1",
//       prompt: scene,
//       size: "1024x1024"
//     });

//     if (!response.data?.length) {
//       throw new Error("Image generation failed");
//     }

//     const imageBase64 = response.data[0]?.b64_json;

//     if (!imageBase64) {
//       throw new Error("Invalid image data received");
//     }

//     const buffer = Buffer.from(imageBase64, 'base64');

//     const filePath = path.join(dir, `scene-${i}.png`);

//     fs.writeFileSync(filePath, buffer);

//     images.push(filePath);
//   }

//   return images;
// }
async generateImages(scenes: string[]): Promise<string[]> {

  const fs = require('fs');
  const path = require('path');

  const dir = path.join(process.cwd(), 'storage', 'images');

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const limitedScenes = scenes.slice(0, 3);
  const images: string[] = [];

  for (let i = 0; i < limitedScenes.length; i++) {

    const filePath = path.join(dir, `scene-${i}.png`);

    // ✅ If image already exists, reuse it
    if (fs.existsSync(filePath)) {
      console.log(`Using existing image: scene-${i}.png`);
      images.push(filePath);
      continue;
    }

    const scene = limitedScenes[i];

    console.log(`Generating image for scene ${i + 1}`);

    const response = await this.openai.images.generate({
      model: "gpt-image-1",
      prompt: scene,
      size: "1024x1024"
    });

    if (!response.data?.length) {
      throw new Error("Image generation failed");
    }

    const imageBase64 = response.data[0]?.b64_json;

    if (!imageBase64) {
      throw new Error("Invalid image data");
    }

    const buffer = Buffer.from(imageBase64, 'base64');

    fs.writeFileSync(filePath, buffer);

    images.push(filePath);
  }

  return images;
}
}