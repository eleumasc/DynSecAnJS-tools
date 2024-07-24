const { gets } = require("./lib/utils");
const { setupPreamble, header, footer } = require("./lib/snippets");
const esprima = require("esprima");
const escodegen = require("escodegen");
const ifTranspiler = require("./lib/esIF-Transpiler");
const common = require("./lib/common");

function compile(content) {
  var tree, formatOption;

  tree = esprima.parse(content, {
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
}

const main = async () => {
  const input = await gets();
  const compiled = compile(input);
  global.eval(`${setupPreamble}\n${header}\n${compiled}\n${footer}`);
};

main();
