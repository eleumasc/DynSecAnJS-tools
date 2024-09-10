const Analysis = require("../lib/analysis");
const { runInstrument } = require("./util");

runInstrument((input) => Analysis.instrument(input));
