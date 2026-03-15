import { Injectable } from '@nestjs/common';
import { exec } from 'child_process';
import * as path from 'path';

@Injectable()
export class MotionService {

  async generateMotion(image: string): Promise<string> {

    const output = path.join(
      process.cwd(),
      "storage/videos",
      `motion-${Date.now()}.mp4`
    );

    const script = path.join(
      process.cwd(),
      "ai/generate_motion.py"
    );

    const command = `python "${script}" "${image}" "${output}"`;

    console.log("Executing script:", command);

    return new Promise((resolve, reject) => {

      exec(command, (error) => {

        if (error) {
          reject(error);
          return;
        }

        resolve(output);

      });

    });

  }

}