const Rewriter = require("./ifc/rewriter");
const sl = require("./fmodel/sl");

exports.generateSetup = () => {
  return Rewriter.setup();
};

exports.setup = (generatedSetup) => {
  if (generatedSetup) {
    generatedSetup();
  } else {
    global.eval(Rewriter.setup());
  }
  sl.setup();
};

exports.instrument = (script) => {
  return Rewriter.instrument(script, null);
};
