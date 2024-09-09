const Analysis = require("../lib/analysis");
const { getStdin } = require("./getStdin");

async function main() {
  const input = await getStdin();
  const transformed = Analysis.transform(input);
  Analysis.setup();
  global.eval(transformed);
}

main();
