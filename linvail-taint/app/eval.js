const Analysis = require("../lib/analysis");
const { getStdin } = require("./util");

async function main() {
  const input = await getStdin();
  const instrumented = Analysis.instrument(input);
  Analysis.setup();
  global.eval(instrumented);
  console.log(global.eval(`global._aran_taintReports_`));
}

main();
