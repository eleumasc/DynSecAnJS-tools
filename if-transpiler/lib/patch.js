const { transformSync } = require("@babel/core");

exports.patch = (script) => {
  const result = transformSync(script, {
    parserOpts: {
      sourceType: "script",
    },
    plugins: [
      babelPluginPatchSequenceExpression,
      babelPluginPatchArguments,
      babelPluginPatchGlobalAccess,
    ],
  }).code;
  // console.error(result);
  return result;
};

function babelPluginPatchSequenceExpression({ types: t }) {
  return {
    visitor: {
      SequenceExpression(path) {
        const { node } = path;

        const params = node.expressions.map((_, i) => t.identifier(`_${i}`));

        path.replaceWith(
          t.callExpression(
            t.functionExpression(
              null,
              params,
              t.blockStatement([
                t.returnStatement(t.identifier(params[params.length - 1].name)),
              ])
            ),
            node.expressions
          )
        );
      },
    },
  };
}

function babelPluginPatchArguments({ types: t }) {
  return {
    visitor: {
      Function(path) {
        const { node } = path;

        let usesArguments = false;
        path.traverse({
          Identifier(innerPath) {
            if (innerPath.node.name === "arguments") {
              usesArguments = true;
              innerPath.replaceWith(t.identifier("$arguments"));
            }
          },

          Function(path) {
            path.skip();
          },
        });

        if (usesArguments) {
          node.params = Array.from(Array(32), (_, i) => {
            if (i < node.params.length) {
              const param = node.params[i];
              if (t.isIdentifier(param)) {
                return param;
              } else {
                throw path.buildCodeFrameError(
                  "Destructured or complex parameters are not supported."
                );
              }
            } else {
              return path.scope.generateUidIdentifier("a");
            }
          });

          const params = node.params.map((param) => t.identifier(param.name));

          const argsArray = t.arrayExpression(params);

          path.scope.push({ id: t.identifier("$arguments"), init: argsArray });
        }
      },
    },
  };
}

function babelPluginPatchGlobalAccess({ types: t }) {
  return {
    visitor: {
      Identifier(path) {
        const { node } = path;

        if (node.name !== "global" && !path.scope.hasBinding(path.node.name)) {
          try {
            path.replaceWith(
              t.memberExpression(
                t.identifier("global"),
                t.identifier(node.name)
              )
            );
          } catch (e) {}
        }
      },
    },
  };
}
