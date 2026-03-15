import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';

@Injectable()
export class ScriptService {

  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async generateScript(prompt: string): Promise<string> {

    const completion = await this.openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are a creative script writer for short animated videos.

Rules:
- If the prompt describes a simple action (like dancing, running, singing), generate ONLY 1 scene.
- If the prompt describes a story, generate EXACTLY 3 scenes.

Formatting rules:

For 1 scene:
Scene 1: description

For 3 scenes:
Scene 1:
Scene 2:
Scene 3:

Each scene must be one short sentence.
`
        },
        {
          role: "user",
          content: prompt
        }
      ]
    });

    return completion.choices[0].message.content ?? "";
  }

}