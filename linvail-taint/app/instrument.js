const Analysis = require("../lib/analysis");
const { getStdin } = require("./util");
const { promisify } = require("util");

async function main() {
  try {
    const input = await getStdin();
    const instrumented = Analysis.instrument(input);
    await promisify((callback) => {
      process.stdout.write(instrumented, callback);
    })();
    process.exit(0);
  } catch (e) {
    await promisify((callback) => {
      process.stderr.write(String(e), callback);
    })();
    process.exit(1);
  }
}

main();
