import sharp from "sharp";
import fs from "fs";
import path from "path";

const imagesDir = path.resolve("./src/assets/images");

async function compressImages() {
  const files = fs.readdirSync(imagesDir);
  let totalSavedBytes = 0;

  for (const file of files) {
    if (file.endsWith(".png")) {
      const inputPath = path.join(imagesDir, file);
      const outputWebpName = file.replace(/\.png$/, ".webp");
      const outputPath = path.join(imagesDir, outputWebpName);

      const stat = fs.statSync(inputPath);
      const originalSize = stat.size;

      // Only compress images larger than 50KB
      if (originalSize > 50 * 1024) {
        await sharp(inputPath)
          .webp({ quality: 80, effort: 6 })
          .toFile(outputPath);

        const newStat = fs.statSync(outputPath);
        const newSize = newStat.size;
        const saved = originalSize - newSize;
        totalSavedBytes += saved;

        console.log(
          `Converted ${file}: ${(originalSize / 1024).toFixed(1)} KB -> ${(newSize / 1024).toFixed(1)} KB (Saved ${((saved / originalSize) * 100).toFixed(1)}%)`
        );
      }
    }
  }

  console.log(`\nTOTAL SAVED: ${(totalSavedBytes / (1024 * 1024)).toFixed(2)} MB!`);
}

compressImages().catch(console.error);
