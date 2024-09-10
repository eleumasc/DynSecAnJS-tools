const Analysis = require("../lib/analysis");
const { getStdin } = require("./util");

async function main() {
  const input = await getStdin();
  const instrumented = Analysis.instrument(input);
  Analysis.setup();
  global.eval(instrumented);
}

main();
