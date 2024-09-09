const Rewriter = require("./ifc/rewriter");
const sl = require("./fmodel/sl");

exports.setup = (generatedSetup) => {
  if (generatedSetup) {
    generatedSetup();
  } else {
    global.eval(Rewriter.setup());
  }
  sl.setup();
};

exports.transform = (script) => {
  return Rewriter.instrument()(script, null);
};
