const fs = require("fs");
const path = require("path");
const glob = require("glob");

const projectRoot = path.resolve(__dirname, "..");
const screensGlob = path.join(projectRoot, "screens", "**", "*.js");

const files = glob.sync(screensGlob, { nodir: true });

if (!files.length) {
  console.log("No screen files found in screens/.");
  process.exit(0);
}

files.forEach((filePath) => {
  let src = fs.readFileSync(filePath, "utf8");
  const original = src;

  // 1) Ensure react-native import includes Dimensions, or add a new import
  const rnImportRegex = /import\s+([^\n]*)\s+from\s+['"]react-native['"];?/;
  const hasDimensions = /\bDimensions\b/.test(src);
  if (!hasDimensions) {
    const match = src.match(rnImportRegex);
    if (match) {
      // modify existing import to include Dimensions inside braces
      const importLine = match[0];
      const importSpec = match[1];
      // If it's a default import or has braces, insert Dimensions appropriately
      if (/\{.*\}/.test(importSpec)) {
        const newImport = importLine.replace(
          /\{([^}]*)\}/,
          (m, inner) => `{ ${inner.trim()} , Dimensions }`
        );
        src = src.replace(importLine, newImport);
      } else {
        // no braces, create a named import
        const newImport = `import { Dimensions, ${importSpec.replace(
          /,/g,
          ", "
        )} } from "react-native";`;
        src = src.replace(importLine, newImport);
      }
    } else {
      // no react-native import at all -> add it at top
      src = `import { Dimensions } from "react-native";\n` + src;
    }
  }

  // 2) Ensure SCREEN_WIDTH / SCREEN_HEIGHT destructuring exists
  if (
    !/const\s+\{\s*width\s*:\s*SCREEN_WIDTH\s*,\s*height\s*:\s*SCREEN_HEIGHT\s*\}\s*=\s*Dimensions\.get\(["']window["']\)/.test(
      src
    )
  ) {
    // find last import block to insert after
    const lastImportMatch = Array.from(src.matchAll(/^import .*$/gm)).pop();
    const insertPos = lastImportMatch
      ? lastImportMatch.index + lastImportMatch[0].length
      : 0;
    const insertion = `\nconst { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");\n`;
    // Place insertion after last import line
    if (lastImportMatch) {
      const before = src.slice(0, insertPos);
      const after = src.slice(insertPos);
      src = before + "\n" + insertion + after;
    } else {
      src = insertion + src;
    }
  }

  // 3) Replace common full-screen design token usages with SCREEN_*
  // Targeted safe replacements (don't try to replace all Width.* or Height.*)
  const replacements = [
    { from: /\bHeight\.height_812\b/g, to: "SCREEN_HEIGHT" },
    { from: /\bWidth\.width_375\b/g, to: "SCREEN_WIDTH" },
    { from: /\bWidth\.width_378(?:_09)?\b/g, to: "SCREEN_WIDTH" },
    { from: /height:\s*812\b/g, to: "height: SCREEN_HEIGHT" },
    { from: /width:\s*375\b/g, to: "width: SCREEN_WIDTH" },
    { from: /width:\s*378(?:\.09)?\b/g, to: "width: SCREEN_WIDTH" },
    // common named usages from generated code
    { from: /\bWidth\.width_378_09\b/g, to: "SCREEN_WIDTH" },
    { from: /\bWidth\.width_375_0\b/g, to: "SCREEN_WIDTH" },
    { from: /\bHeight\.height_812_0\b/g, to: "SCREEN_HEIGHT" },
  ];

  replacements.forEach(({ from, to }) => {
    src = src.replace(from, to);
  });

  // 4) Where exclusion icons or full-width assets used Width.width_375 as prop values, replace as well:
  src = src.replace(/width=\{Width\.width_375\}/g, "width={SCREEN_WIDTH}");
  src = src.replace(
    /width=\{Width\.width_378(?:_09)?\}/g,
    "width={SCREEN_WIDTH}"
  );
  src = src.replace(/height=\{Height\.height_812\}/g, "height={SCREEN_HEIGHT}");

  // 5) Tidy: avoid duplicated SCREEN line if insertion duplicated
  // (already guarded above, but extra check)
  const screenLineCount = (src.match(/SCREEN_WIDTH/g) || []).length;
  // commit file if changed
  if (src !== original) {
    fs.writeFileSync(filePath, src, "utf8");
    console.log(
      "Updated:",
      path.relative(projectRoot, filePath),
      `(SCREEN refs: ${screenLineCount})`
    );
  } else {
    console.log("No change:", path.relative(projectRoot, filePath));
  }
});

console.log(
  "Responsive pass complete. Review changes and run project tests/build."
);
