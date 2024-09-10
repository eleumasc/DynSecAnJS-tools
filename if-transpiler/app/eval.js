const Analysis = require("../lib/analysis");
const { setupPreamble, header, footer } = require("./snippets");
const { getStdin } = require("./util");

async function main() {
  const input = await getStdin();
  const instrumented = Analysis.instrument(input);
  global.eval(`${setupPreamble}\n${header}\n${instrumented}\n${footer}`);
}

main();
