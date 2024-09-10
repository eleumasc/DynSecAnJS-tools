const Analysis = require("../lib/analysis");
const { getStdin } = require("./getStdin");
const { setupPreamble, header, footer } = require("./snippets");

async function main() {
  const input = await getStdin();
  const instrumented = Analysis.instrument(input);
  global.eval(`${setupPreamble}\n${header}\n${instrumented}\n${footer}`);
}

main();
