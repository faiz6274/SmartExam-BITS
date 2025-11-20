const fs = require("fs");
const path = require("path");
const glob = require("glob");

const projectRoot = path.resolve(__dirname, "..");
const screensGlob = path.join(projectRoot, "screens", "**", "*.js");
const files = glob.sync(screensGlob, { nodir: true });

const requiredTokens = [
  "Color",
  "FontSize",
  "Padding",
  "Border",
  "Gap",
  "Height",
  "Width",
  "FontFamily",
  "LineHeight",
  "BoxShadow",
];

files.forEach((filePath) => {
  let src = fs.readFileSync(filePath, "utf8");
  const original = src;

  // Check if GlobalStyles import exists
  const hasGlobalStylesImport = /from\s+["'].*GlobalStyles["']/i.test(src);

  if (!hasGlobalStylesImport) {
    console.log("Skipping (no GlobalStyles import):", path.basename(filePath));
    return;
  }

  // Extract existing import tokens
  const importMatch = src.match(
    /import\s+\{([^}]+)\}\s+from\s+["'].*GlobalStyles["']/
  );
  if (!importMatch) return;

  const existingTokens = importMatch[1]
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);

  // Find missing tokens that are used in the file
  const missingTokens = requiredTokens.filter(
    (token) =>
      !existingTokens.includes(token) && new RegExp(`\\b${token}\\b`).test(src)
  );

  if (missingTokens.length === 0) {
    console.log("No changes:", path.basename(filePath));
    return;
  }

  // Add missing tokens to import
  const newTokens = [...existingTokens, ...missingTokens].join(", ");
  src = src.replace(
    /import\s+\{[^}]+\}\s+from\s+(["'].*GlobalStyles["'])/,
    `import { ${newTokens} } from ${require("path").basename(importMatch[1])}`
  );

  // More robust replacement
  src = src.replace(
    /import\s+\{([^}]+)\}\s+from\s+(["'].*GlobalStyles["'])/,
    `import { ${newTokens} } from $2`
  );

  if (src !== original) {
    fs.writeFileSync(filePath, src, "utf8");
    console.log(
      "Updated:",
      path.basename(filePath),
      `+${missingTokens.join(", ")}`
    );
  }
});

console.log("Import pass complete.");
