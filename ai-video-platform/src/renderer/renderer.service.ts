import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import ffmpegPath from 'ffmpeg-static';

@Injectable()
export class RendererService {

  async render(images: string[], audio?: string): Promise<string> {

    const outputDir = path.join(process.cwd(), "storage/videos");

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const output = path.join(outputDir, `video-${Date.now()}.mp4`);

    const args: string[] = [
      "-y"
    ];

    // add image inputs
    images.forEach((img) => {
      args.push("-loop", "1");
      args.push("-t", "4");
      args.push("-i", img);
    });

    // add audio input
    if (audio) {
      args.push("-i", audio);
    }

    // SINGLE IMAGE CASE
    if (images.length === 1) {

      args.push(
        "-vf",
        "scale=1080:1920,zoompan=z='min(zoom+0.0015,1.5)':d=125",
        "-map", "0:v"
      );

      if (audio) {
        args.push("-map", `${images.length}:a?`);
      }

    }

    // MULTIPLE IMAGES CASE
    else {

      const filters: string[] = [];

      for (let i = 0; i < images.length - 1; i++) {

        const offset = (i + 1) * 3;

        const inputA = i === 0 ? `${i}:v` : `v${i}`;
        const inputB = `${i + 1}:v`;
        const outputV = `v${i + 1}`;

        filters.push(
          `[${inputA}][${inputB}]xfade=transition=fade:duration=1:offset=${offset}[${outputV}]`
        );
      }

      const finalStream = `v${images.length - 1}`;

      const filterComplex =
        filters.join(";") +
        `,[${finalStream}]scale=1080:1920,zoompan=z='min(zoom+0.0015,1.5)':d=125[vout]`;

      args.push(
        "-filter_complex",
        filterComplex,
        "-map",
        "[vout]"
      );

      if (audio) {
        args.push("-map", `${images.length}:a?`);
      }

    }

    args.push(
      "-preset", "ultrafast",
      "-pix_fmt", "yuv420p",
      "-shortest",
      output
    );

    console.log("Running FFmpeg:", ffmpegPath, args.join(" "));

    return new Promise((resolve, reject) => {

      const ffmpeg = spawn(ffmpegPath as string, args);

      ffmpeg.stdout.on("data", (data) => {
        console.log(`FFmpeg: ${data}`);
      });

      ffmpeg.stderr.on("data", (data) => {
        console.log(`FFmpeg: ${data}`);
      });

      ffmpeg.on("close", (code) => {

        if (code !== 0) {
          reject(`FFmpeg exited with code ${code}`);
          return;
        }

        console.log("Video created:", output);

        resolve(output);

      });

    });

  }

}