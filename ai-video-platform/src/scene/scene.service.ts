import { Injectable } from '@nestjs/common';

@Injectable()
export class SceneService {

  splitScenes(script: string) {

    const scenes = script
      .split('\n')
      .filter(line => line.trim() !== '');

    return scenes;
  }

}