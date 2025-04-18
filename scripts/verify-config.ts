// scripts/verify-config.ts
import fs from "fs";
import path from "path";

const tailwindConfigPath = path.resolve("tailwind.config.ts");
const globalsCssPath = path.resolve("app/globals.css");
const layoutPath = path.resolve("app/layout.tsx");

const checkFileExists = (filePath: string): boolean => {
  return fs.existsSync(filePath);
};

const results = [
  { file: "tailwind.config.ts", exists: checkFileExists(tailwindConfigPath) },
  { file: "app/globals.css", exists: checkFileExists(globalsCssPath) },
  { file: "app/layout.tsx", exists: checkFileExists(layoutPath) },
];

let allGood = true;
for (const result of results) {
  if (!result.exists) {
    console.error(`❌ Missing: ${result.file}`);
    allGood = false;
  } else {
    console.log(`✅ Found: ${result.file}`);
  }
}

if (!allGood) {
  process.exit(1);
} else {
  console.log("✅ All required files are present.");
}
