const Analysis = require("./lib/analysis");
const { gets } = require("./lib/utils");

const main = async () => {
  try {
    const input = await gets();
    const transformed = Analysis.transform(input);
    process.stdout.write(transformed);
    process.exitCode = 0;
  } catch (e) {
    process.stderr.write(String(e));
    process.exitCode = 1;
  }
};

main();
