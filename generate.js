import { readdirSync, statSync, existsSync } from "fs";
import { join } from "path";
import { execSync } from "child_process";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = join(__dirname, "src");

try {
  const directories = readdirSync(srcDir).filter((file) =>
    statSync(join(srcDir, file)).isDirectory()
  );

  directories.forEach((dir) => {
    const generatorPath = join(srcDir, dir, "generator", "index.js");
    if (existsSync(generatorPath)) {
      console.log(`Running generator for ${dir}...`);
      try {
        execSync(`node "${generatorPath}"`, { stdio: "inherit" });
      } catch (error) {
        console.error(`Error running generator for ${dir}:`, error);
      }
      console.log(`Generator for ${dir} completed.`);
    }
  });
} catch (error) {
  console.error("Error reading directories:", error);
}
