const Analysis = require("../lib/analysis");
const { readFileSync, writeFileSync } = require("fs");
const path = require("path");

async function main() {
  const appDir = path.resolve("app");
  const generatedDir = path.resolve("generated");

  const input = readFileSync(path.join(appDir, "policy.js")).toString();
  const instrumented = Analysis.instrument(input);
  writeFileSync(
    path.join(generatedDir, "policy.instrumented.js"),
    `(function () {\n${instrumented}\n})();`
  );
}

main();
