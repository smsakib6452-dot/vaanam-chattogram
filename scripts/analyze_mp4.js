const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "../public/videos");
const files = fs.readdirSync(dir).filter(f => f.endsWith(".mp4"));

files.forEach(file => {
  const buf = fs.readFileSync(path.join(dir, file));
  
  // Find avc1
  const avc1Idx = buf.indexOf(Buffer.from("avc1"));
  let width = 0, height = 0;
  if (avc1Idx !== -1) {
    // In avc1 box: width at offset + 24, height at offset + 26 (uint16 big-endian)
    width = buf.readUInt16BE(avc1Idx + 24);
    height = buf.readUInt16BE(avc1Idx + 26);
  }

  // Find mdhd to get timescale and duration
  const mdhdIdx = buf.indexOf(Buffer.from("mdhd"));
  let durationSec = 0;
  if (mdhdIdx !== -1) {
    const version = buf.readUInt8(mdhdIdx + 4);
    let timescale, duration;
    if (version === 1) {
      timescale = buf.readUInt32BE(mdhdIdx + 20);
      duration = Number(buf.readBigUInt64BE(mdhdIdx + 24));
    } else {
      timescale = buf.readUInt32BE(mdhdIdx + 12);
      duration = buf.readUInt32BE(mdhdIdx + 16);
    }
    durationSec = duration / timescale;
  }

  const bitrateKbps = durationSec > 0 ? ((buf.length * 8) / durationSec / 1000).toFixed(0) : 0;

  console.log({
    file,
    sizeMB: (buf.length / 1024 / 1024).toFixed(2) + " MB",
    resolution: `${width}x${height}`,
    duration: durationSec.toFixed(2) + "s",
    bitrate: bitrateKbps + " kbps"
  });
});
