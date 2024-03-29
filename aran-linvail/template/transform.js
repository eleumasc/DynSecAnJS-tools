const Analysis = require("./analysis");
const { readStdin } = require("./readStdin");

const main = async () => {
  try {
    const input = await readStdin();
    const transformed = Analysis.transform(input);
    process.stdout.write(transformed);
    process.exitCode = 0;
  } catch (e) {
    process.stderr.write(String(e));
    process.exitCode = 1;
  }
};

main();
