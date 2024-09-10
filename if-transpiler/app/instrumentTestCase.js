const Analysis = require("../lib/analysis");
const { setupPreamble, header, footer } = require("./snippets");
const { runInstrument } = require("./util");

runInstrument(
  (input) =>
    `${setupPreamble}\n${header}\n${Analysis.instrument(input)}\n${footer}`
);
