import sys
import torch
import imageio
from PIL import Image

from diffusers import (
    AnimateDiffPipeline,
    MotionAdapter,
    DDIMScheduler
)

image_path = sys.argv[1]
output_path = sys.argv[2]

print("Loading motion adapter...")

adapter = MotionAdapter.from_pretrained(
    "guoyww/animatediff-motion-adapter-v1-5"
)

print("Loading base model...")

pipe = AnimateDiffPipeline.from_pretrained(
    "runwayml/stable-diffusion-v1-5",
    motion_adapter=adapter,
    torch_dtype=torch.float16
)

pipe.scheduler = DDIMScheduler.from_config(pipe.scheduler.config)

pipe.to("cuda" if torch.cuda.is_available() else "cpu")

print("Generating animation...")

prompt = "cute rabbit dancing happily"

frames = pipe(
    prompt=prompt,
    num_frames=16,
    guidance_scale=7.5
).frames[0]

print("Saving video...")

imageio.mimsave(output_path, frames, fps=8)

print("Done")