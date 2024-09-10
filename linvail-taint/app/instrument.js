const Analysis = require("../lib/analysis");
const { runInstrument } = require("./runInstrument");

runInstrument((input) => Analysis.instrument(input));
