const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "../public/videos");
const files = fs.readdirSync(dir).filter(f => f.endsWith(".mp4"));

files.forEach(file => {
  const filePath = path.join(dir, file);
  const buffer = fs.readFileSync(filePath);
  const size = buffer.length;

  const moovIdx = buffer.indexOf(Buffer.from("moov"));
  const mdatIdx = buffer.indexOf(Buffer.from("mdat"));

  console.log(JSON.stringify({
    file,
    sizeMB: (size / (1024 * 1024)).toFixed(2) + " MB",
    moovIdx,
    mdatIdx,
    isFastStart: moovIdx !== -1 && mdatIdx !== -1 && moovIdx < mdatIdx
  }, null, 2));
});
