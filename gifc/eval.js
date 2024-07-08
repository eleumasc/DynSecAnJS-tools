const Analysis = require("./lib/analysis");
const { gets } = require("./lib/utils");

const main = async () => {
  const input = await gets();
  const transformed = Analysis.transform(input);
  Analysis.setup();
  global.eval(transformed);
};

main();
