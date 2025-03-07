const Analysis = require("../lib/analysis");
const browserify = require("browserify");
const { writeFileSync, mkdirSync, readFileSync } = require("fs");
const path = require("path");
const { promisify } = require("util");

async function main() {
  const libDir = path.resolve("lib");
  const outDir = path.resolve("generated");

  writeFileSync(
    path.join(libDir, "generated__setup.js"),
    readFileSync(path.join(libDir, "template__setup.js"))
      .toString()
      .replace(
        "/*{{GENERATED_SETUP}}*/",
        () => `function () {\n${Analysis.generateSetup()}\n}`
      )
  );

  mkdirSync(outDir, { recursive: true });

  const bundle = await promisify((callback) => {
    browserify({ basedir: libDir })
      .add("./generated__setup.js")
      .bundle(callback);
  })();

  writeFileSync(path.join(outDir, "setup.js"), bundle);
}

main();
