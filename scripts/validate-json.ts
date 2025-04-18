// scripts/validate-json.ts
import fs from "fs";
import path from "path";

const jsonFiles = ["data/ingredients.json", "data/recipes.json"];

jsonFiles.forEach((file) => {
  const filePath = path.resolve(file);
  if (!fs.existsSync(filePath)) {
    console.error(`❌ ${file} does not exist.`);
    process.exit(1);
  }

  try {
    const content = fs.readFileSync(filePath, "utf-8");
    JSON.parse(content);
    console.log(`✅ ${file} is a valid JSON file.`);
  } catch (error) {
    console.error(`❌ ${file} contains invalid JSON.`);
    process.exit(1);
  }
});
