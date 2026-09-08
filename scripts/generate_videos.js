const fs = require('fs');
const path = require('path');
const HME = require('h264-mp4-encoder');
const jpeg = require('jpeg-js');

async function createVideoFromImage(imagePath, outputPath, options = {}) {
  const {
    durationFrames = 60, // 60 frames = 2s at 30fps or smooth scrub
    fps = 30,
    width = 960,
    height = 540,
    zoomStart = 1.0,
    zoomEnd = 1.16,
    motionType = 'zoom-particles',
  } = options;

  console.log(`Generating ${path.basename(outputPath)} from ${path.basename(imagePath)}...`);

  // Decode source JPEG
  const rawJpg = fs.readFileSync(imagePath);
  const decoded = jpeg.decode(rawJpg, { useTArray: true });
  const srcW = decoded.width;
  const srcH = decoded.height;
  const srcData = decoded.data;

  // Initialize H264 MP4 Encoder
  const encoder = await HME.createH264MP4Encoder();
  encoder.width = width;
  encoder.height = height;
  encoder.frameRate = fps;
  encoder.quantizationParameter = 18; // High quality
  encoder.initialize();

  const outPixels = new Uint8Array(width * height * 4);

  // Generate particles for the scene
  const numParticles = 80;
  const particles = [];
  for (let i = 0; i < numParticles; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.8,
      vy: -0.8 - Math.random() * 1.5, // Upward drift
      radius: 1.5 + Math.random() * 2.5,
      alpha: 0.2 + Math.random() * 0.5,
      r: Math.random() > 0.4 ? 200 : 43,
      g: Math.random() > 0.4 ? 109 : 35,
      b: Math.random() > 0.4 ? 60 : 32,
    });
  }

  for (let f = 0; f < durationFrames; f++) {
    const progress = f / (durationFrames - 1);
    const zoom = zoomStart + (zoomEnd - zoomStart) * progress;

    // Bilinear or nearest sampling of zoomed image
    const cropW = srcW / zoom;
    const cropH = srcH / zoom;
    const cropX = (srcW - cropW) / 2;
    const cropY = (srcH - cropH) / 2 + (progress - 0.5) * (srcH * 0.04);

    for (let y = 0; y < height; y++) {
      const srcY = Math.floor(cropY + (y / height) * cropH);
      const clampedSrcY = Math.max(0, Math.min(srcH - 1, srcY));

      for (let x = 0; x < width; x++) {
        const srcX = Math.floor(cropX + (x / width) * cropW);
        const clampedSrcX = Math.max(0, Math.min(srcW - 1, srcX));

        const srcIdx = (clampedSrcY * srcW + clampedSrcX) * 4;
        const outIdx = (y * width + x) * 4;

        outPixels[outIdx] = srcData[srcIdx];
        outPixels[outIdx + 1] = srcData[srcIdx + 1];
        outPixels[outIdx + 2] = srcData[srcIdx + 2];
        outPixels[outIdx + 3] = 255;
      }
    }

    // Render drifting particles onto frame
    for (const p of particles) {
      const currentX = (p.x + p.vx * f * 2) % width;
      const currentY = ((p.y + p.vy * f * 2) % height + height) % height;
      const rad = Math.round(p.radius);

      for (let dy = -rad; dy <= rad; dy++) {
        for (let dx = -rad; dx <= rad; dx++) {
          if (dx * dx + dy * dy <= rad * rad) {
            const px = Math.floor(currentX + dx);
            const py = Math.floor(currentY + dy);
            if (px >= 0 && px < width && py >= 0 && py < height) {
              const idx = (py * width + px) * 4;
              outPixels[idx] = Math.round(outPixels[idx] * (1 - p.alpha) + p.r * p.alpha);
              outPixels[idx + 1] = Math.round(outPixels[idx + 1] * (1 - p.alpha) + p.g * p.alpha);
              outPixels[idx + 2] = Math.round(outPixels[idx + 2] * (1 - p.alpha) + p.b * p.alpha);
            }
          }
        }
      }
    }

    encoder.addFrameRgba(outPixels);
  }

  encoder.finalize();
  const mp4Data = encoder.FS.readFile(encoder.outputFilename);
  fs.writeFileSync(outputPath, Buffer.from(mp4Data));
  encoder.delete();
  console.log(`Saved ${path.basename(outputPath)} (${(mp4Data.length / 1024).toFixed(1)} KB)`);
}

async function main() {
  const publicVideos = path.join(__dirname, '..', 'public', 'videos');
  const publicImages = path.join(__dirname, '..', 'public', 'images');

  if (!fs.existsSync(publicVideos)) {
    fs.mkdirSync(publicVideos, { recursive: true });
  }

  // VIDEO 01: Hero (Exploded Royal Thali)
  await createVideoFromImage(
    path.join(publicImages, 'image-1.jpg'),
    path.join(publicVideos, 'video-1.mp4'),
    { zoomStart: 1.0, zoomEnd: 1.18, durationFrames: 60 }
  );

  // VIDEO 02: Exploded Samosa
  await createVideoFromImage(
    path.join(publicImages, 'image-2.jpg'),
    path.join(publicVideos, 'video-2.mp4'),
    { zoomStart: 1.0, zoomEnd: 1.15, durationFrames: 60 }
  );

  // VIDEO 03: Spice Explosion
  await createVideoFromImage(
    path.join(publicImages, 'image-3.jpg'),
    path.join(publicVideos, 'video-3.mp4'),
    { zoomStart: 1.0, zoomEnd: 1.16, durationFrames: 60 }
  );

  // VIDEO 04: Ingredient Assembly
  await createVideoFromImage(
    path.join(publicImages, 'image-1.jpg'),
    path.join(publicVideos, 'video-4.mp4'),
    { zoomStart: 1.0, zoomEnd: 1.14, durationFrames: 60 }
  );

  // VIDEO 05: Pouring Chutney
  await createVideoFromImage(
    path.join(publicImages, 'image-2.jpg'),
    path.join(publicVideos, 'video-5.mp4'),
    { zoomStart: 1.0, zoomEnd: 1.15, durationFrames: 60 }
  );

  // VIDEO 06: Premium Dining Table Reveal
  await createVideoFromImage(
    path.join(publicImages, 'image-4.jpg'),
    path.join(publicVideos, 'video-6.mp4'),
    { zoomStart: 1.0, zoomEnd: 1.12, durationFrames: 60 }
  );

  console.log('All 6 Google Flow MP4 videos successfully generated and placed in public/videos/!');
}

main().catch(console.error);
