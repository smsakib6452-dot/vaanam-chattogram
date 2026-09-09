const fs = require('fs');
const path = require('path');
const HME = require('h264-mp4-encoder');
const jpeg = require('jpeg-js');

function sampleBilinear(srcData, srcW, srcH, fx, fy, out, outOffset) {
  const x0 = Math.floor(fx);
  const y0 = Math.floor(fy);
  const x1 = Math.min(srcW - 1, x0 + 1);
  const y1 = Math.min(srcH - 1, y0 + 1);

  const dx = fx - x0;
  const dy = fy - y0;
  const w00 = (1 - dx) * (1 - dy);
  const w10 = dx * (1 - dy);
  const w01 = (1 - dx) * dy;
  const w11 = dx * dy;

  const idx00 = (y0 * srcW + x0) * 4;
  const idx10 = (y0 * srcW + x1) * 4;
  const idx01 = (y1 * srcW + x0) * 4;
  const idx11 = (y1 * srcW + x1) * 4;

  out[outOffset] = Math.round(srcData[idx00] * w00 + srcData[idx10] * w10 + srcData[idx01] * w01 + srcData[idx11] * w11);
  out[outOffset + 1] = Math.round(srcData[idx00 + 1] * w00 + srcData[idx10 + 1] * w10 + srcData[idx01 + 1] * w01 + srcData[idx11 + 1] * w11);
  out[outOffset + 2] = Math.round(srcData[idx00 + 2] * w00 + srcData[idx10 + 2] * w10 + srcData[idx01 + 2] * w01 + srcData[idx11 + 2] * w11);
  out[outOffset + 3] = 255;
}

async function renderVideo(imagePath, outputPath, options = {}) {
  const {
    width = 1280,
    height = 720,
    fps = 30,
    frames = 90,
    zoomStart = 1.0,
    zoomEnd = 1.12,
  } = options;

  console.log(`Rendering ${path.basename(outputPath)} from ${path.basename(imagePath)}...`);

  const raw = fs.readFileSync(imagePath);
  const decoded = jpeg.decode(raw, { useTArray: true });
  const srcW = decoded.width;
  const srcH = decoded.height;
  const srcData = decoded.data;

  const encoder = await HME.createH264MP4Encoder();
  encoder.width = width;
  encoder.height = height;
  encoder.frameRate = fps;
  encoder.quantizationParameter = 12;
  encoder.initialize();

  const outPixels = new Uint8Array(width * height * 4);

  for (let f = 0; f < frames; f++) {
    const progress = f / (frames - 1);
    const eased = 0.5 - 0.5 * Math.cos(progress * Math.PI);
    const zoom = zoomStart + (zoomEnd - zoomStart) * eased;

    const cropW = srcW / zoom;
    const cropH = srcH / zoom;
    const cropX = (srcW - cropW) / 2;
    const cropY = (srcH - cropH) / 2;

    for (let y = 0; y < height; y++) {
      const fy = cropY + (y / (height - 1)) * (cropH - 1);
      const rowOffset = y * width * 4;

      for (let x = 0; x < width; x++) {
        const fx = cropX + (x / (width - 1)) * (cropW - 1);
        sampleBilinear(srcData, srcW, srcH, fx, fy, outPixels, rowOffset + x * 4);
      }
    }

    encoder.addFrameRgba(outPixels);
  }

  encoder.finalize();
  const mp4Data = encoder.FS.readFile(encoder.outputFilename);
  fs.writeFileSync(outputPath, Buffer.from(mp4Data));
  encoder.delete();
  console.log(`✓ Created ${path.basename(outputPath)} (${(mp4Data.length / 1024 / 1024).toFixed(2)} MB)`);
}

async function run() {
  const photoDir = path.join(__dirname, '..', 'public', 'assets', 'photos');
  const videoDir1 = path.join(__dirname, '..', 'public', 'assets', 'videos');
  const videoDir2 = path.join(__dirname, '..', 'public', 'assets', 'video');

  const jobs = [
    {
      img: path.join(photoDir, 'img-filter-coffee.jpg'),
      name: 'filter-coffee-pour.mp4',
    },
    {
      img: path.join(photoDir, 'img-jalebi.jpg'),
      name: 'sweets-macro.mp4',
    },
    {
      img: path.join(photoDir, 'img-mango-lassi.jpg'),
      name: 'lassi-matcha-pour.mp4',
    },
  ];

  for (const job of jobs) {
    if (fs.existsSync(job.img)) {
      const out1 = path.join(videoDir1, job.name);
      const out2 = path.join(videoDir2, job.name);
      await renderVideo(job.img, out1);
      fs.copyFileSync(out1, out2);
    }
  }
}

run().catch(console.error);
