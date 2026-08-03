import fs from "fs";
import path from "path";

const srcDir = path.resolve("./src");
const imagesDir = path.resolve("./src/assets/images");

function getWebpImages() {
  const files = fs.readdirSync(imagesDir);
  return new Set(files.filter(f => f.endsWith(".webp")).map(f => f.replace(/\.webp$/, "")));
}

const webpImages = getWebpImages();

function updateFile(filePath) {
  let content = fs.readFileSync(filePath, "utf-8");
  let modified = false;

  webpImages.forEach(imgName => {
    const pngRegex = new RegExp(`(['"])([^'"]*?/${imgName})\\.png(['"])`, "g");
    if (pngRegex.test(content)) {
      content = content.replace(pngRegex, `$1$2.webp$3`);
      modified = true;
    }
  });

  if (modified) {
    fs.writeFileSync(filePath, content, "utf-8");
    console.log(`Updated imports in ${path.relative(process.cwd(), filePath)}`);
  }
}

function scanDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(fullPath);
    } else if (entry.isFile() && (entry.name.endsWith(".tsx") || entry.name.endsWith(".ts"))) {
      updateFile(fullPath);
    }
  }
}

scanDir(srcDir);
console.log("Finished updating image imports to WebP!");
