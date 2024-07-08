const Rewriter = require("./ifc/rewriter");
const sl = require("./fmodel/sl");

exports.setup = () => {
  global.eval(Rewriter.setup());
  sl.setup();
};

exports.transform = (script) => {
  return Rewriter.instrument()(script, null);
};
