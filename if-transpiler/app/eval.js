const Analysis = require("../lib/analysis");
const { getStdin } = require("./util");
const { readFileSync } = require("fs");
const path = require("path");

const header = `
var source, sink;
$Γ['global']['sink'] = $Γ['global']['source'] = 0;
source = 'secret';
$Γ['global']['source'] = $Λ[$Λ.length - 1].l;
$Γ['global']['source'] instanceof Object ? $Γ['global']['source'].Σ = $lub($Γ['global']['source'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['source'] = $lub($Γ['global']['source'], $Λ[$Λ.length - 1].l);
sink = undefined;
$Γ['global']['sink'] = $Λ[$Λ.length - 1].l;
$Γ['global']['sink'] instanceof Object ? $Γ['global']['sink'].Σ = $lub($Γ['global']['sink'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['sink'] = $lub($Γ['global']['sink'], $Λ[$Λ.length - 1].l);

$Γ["global"]["source"] = allocTaint({ name: "test-source", argument: undefined });
`;

const footer = `
$output("sink", sink, $Γ["global"], $Λ[$Λ.length - 1].l, "test-sink", undefined);
`;

async function main() {
  const preamble = readFileSync(path.resolve("app", "preamble.js"));

  const input = await getStdin();
  const instrumented = Analysis.instrument(input);
  global.eval(`${preamble}\n${header}\n${instrumented}\n${footer}`);
  console.log(global.eval("global._ifTranspiler_taintReports_"));
}

main();
