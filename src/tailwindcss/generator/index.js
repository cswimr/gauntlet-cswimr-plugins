import fs from "fs";
import css from "css";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  execSync(
    "yarn dlx tailwindcss -c ../../../tailwind.config.js -i ./input.css -o ../../../assets/tailwindcss/tmp/output.css",
    {
      cwd: __dirname,
    }
  );
} catch (error) {
  console.error("Error running tailwindcss: ", error);
}

const file = fs.readFileSync(
  path.join(__dirname, "../../../assets/tailwindcss/tmp/output.css"),
  "utf8"
);

const json = css
  .parse(file)
  .stylesheet.rules.filter((rule) => !!rule.selectors)
  .map((rule) => {
    if (!rule.selectors) {
      return;
    }
    const selector = rule.selectors[0].replace("\\", "").split(" ")[0];
    const classes = css
      .stringify({ stylesheet: { rules: [rule] } })
      .split("\n")
      .slice(1, -1)
      .map((line) => line.trim())
      .join(" ");

    return {
      selector,
      classes,
    };
  });

fs.writeFileSync(
  path.join(__dirname, "../../../assets/tailwindcss/generated/classes.json"),
  JSON.stringify(json)
);
