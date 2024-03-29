const Analysis = require("./analysis");
const { readStdin } = require("./readStdin");

const main = async () => {
  const input = await readStdin();
  const transformed = Analysis.transform(input);
  Analysis.setup(global);
  global.eval(transformed);
};

main();
