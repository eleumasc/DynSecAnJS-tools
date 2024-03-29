const readStdin = () => {
  return new Promise((resolve) => {
    process.stdin.setEncoding("utf8");

    let inputData = "";

    process.stdin.on("data", function (chunk) {
      inputData += chunk;
    });

    process.stdin.on("end", function () {
      resolve(inputData);
    });
  });
};

module.exports = { readStdin };
