const ifTranspiler = require("./esIF-Transpiler");
const common = require("./common");
const esprima = require("esprima");
const escodegen = require("escodegen");

exports.instrument = (script) => {
  var tree, formatOption;

  tree = esprima.parse(script, {
    loc: true,
    range: false,
    raw: false,
    tokens: false,
  });

  tree = ifTranspiler.transform(tree, null, {
    destructive: true,
    directive: true,
    preserveCompletionValue: false,
  });

  tree = ifTranspiler.inline(tree);

  formatOption = common.deepCopy(escodegen.FORMAT_DEFAULTS);
  formatOption.indent.adjustMultilineComment = true;

  return escodegen.generate(tree, {
    format: formatOption,
    directive: true,
  });
};
