const Analysis = require("../lib/analysis");
const { getStdin } = require("./getStdin");
const { promisify } = require("util");

async function main() {
  try {
    const input = await getStdin();
    const transformed = Analysis.transform(input);
    await promisify((callback) => {
      process.stdout.write(transformed, callback);
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
