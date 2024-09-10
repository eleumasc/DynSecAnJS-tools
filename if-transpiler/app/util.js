const { readFileSync, writeFileSync } = require("fs");
const path = require("path");
const { promisify } = require("util");

const getStdin = () =>
  new Promise((resolve) => {
    process.stdin.setEncoding("utf8");
    let inputData = "";
    process.stdin.on("data", function (chunk) {
      inputData += chunk;
    });
    process.stdin.on("end", function () {
      resolve(inputData);
    });
  });

const instrumentWithStdio = async (callback) => {
  const input = await getStdin();
  const output = await callback(input);
  await promisify((callback) => {
    process.stdout.write(output, callback);
  })();
};

const instrumentWithFiles = async (callback, inputPath, outputPath) => {
  const input = readFileSync(inputPath).toString();
  const output = await callback(input);
  writeFileSync(outputPath, output);
};

exports.runInstrument = async (callback) => {
  try {
    const argv = process.argv.slice(2);
    if (argv.length >= 2) {
      await instrumentWithFiles(
        callback,
        path.resolve(argv[0]),
        path.resolve(argv[1])
      );
    } else {
      await instrumentWithStdio(callback);
    }
    process.exit(0);
  } catch (e) {
    await promisify((callback) => {
      process.stderr.write(String(e), callback);
    })();
    process.exit(1);
  }
};

exports.getStdin = getStdin;
