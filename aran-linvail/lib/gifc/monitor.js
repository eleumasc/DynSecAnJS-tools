const sinks = new Set();

const isSink = (obj) => sinks.has(obj);

const enforceIFC = (isSink, node, ...values) => {
  if (isSink === true) {
    if (Array.from(values).some((value) => value > 0)) {
      let err = new Error("Information flow violation [source=> sink]");
      err.node = node;
      throw err;
    }
  }
  return false;
};

const enforceIFC2 = (isSink, ...values) => {
  if (isSink === true) {
    if (Array.from(values).some((value) => value > 0)) return true;
  }
  return false;
};

const tagAsSource = (x) => {
  x.label = 1;
  return x;
};

const tagAsSink = (x) => {
  sinks.add(x);
};

const configurePolicyLang = (environment) => {
  environment.tagAsSink = tagAsSink;
  environment.tagAsSource = tagAsSource;
};

// Laticce

const bottom = () => 0;
const taint = () => 1;

const join = (...xs) =>
  xs
    .map((x) => x | 0) // maybe delete mapping
    .reduce((acc, curr) => Math.max(acc, curr), 0);

//PU
const permissiveCheck = (label, node) => {
  if (label === 2) {
    let err = new Error("IFC violation [permissive test]");
    err.node = node;
    throw err;
  }
};

const permissiveCheck2 = (label) => {
  return label === 2;
};

function lift(oldLabel, ctx) {
  if (ctx === 0) {
    return 0;
  }
  if (ctx === 1 && oldLabel === 1) {
    return 1;
  }
  if (ctx === 1 && oldLabel !== 1) {
    return 2;
  }
}

//Context

let context = [[0], [], [], []];

let contextIdx = [[0], [], [], []];

const PC = 0; //PC maintains the PC label.
const EXC = 1; //EXCEPTION maintain the extension of the control flow; if there is a throw inside the function.
const BREAK = 2; //BREAK maintain the extension of the control flow; if there is a throw inside the function.
const RETURN = 3; //RETURN maintain the extension of the control flow; if there is a throw inside the function.

const currentContext = (type) => {
  const ctx = context[type];
  return ctx[ctx.length - 1];
};

//Return e.g. [0,0,1,0] representing the current values of all context stacks
const currentContext2 = (...types) => {
  return types.map((t) => {
    return currentContext(t);
  });
};

const pushContext = (type, label, idx) => {
  let top = contextIdx[type][contextIdx[type].length - 1];
  if (idx !== top && type !== PC) {
    contextIdx[type].push(idx);
    context[type].push(label);
  } else if (type === PC) {
    context[type].push(label);
  }
};

const popContext = (type) => {
  contextIdx[type].pop();
  return context[type].pop();
};

const popAllContexts = (...contexts) => {
  contexts.map((ctx) => popContext(ctx));
};

//AST walking

const hasASTNode = (type, astNode) => {
  if (!astNode) return false;
  switch (astNode.type) {
    case type:
      return true;
      break;
    case "BlockStatement":
      const body = astNode.body;
      return body.find((statement) => statement.type === type) || false;
    default:
      return false;
      break;
  }
};

const hasNode = (type, node) => {
  if (node.type === "IfStatement") {
    return (
      hasASTNode(type, node.consequent) || hasASTNode(type, node.alternate)
    );
  } else {
    return hasASTNode(type, node.body);
  }
};

const writeTargets = (node) => {
  let result = [];
  if (node.type === "IfStatement") {
    //asssumming all if has a block statement as consequent as normalization
    if (node.consequent.type === "BlockStatement") {
      result = _writeTargets(node.consequent.body);
    }
    if (node.alternate && node.alternate.type === "BlockStatement") {
      result = result.concat(_writeTargets(node.alternate.body));
    }
  }
  return result;
};

/**
 * Extracts all TOP level AssignmentExpression from a given body array
 **/
const _writeTargets = (arrayNode) => {
  return arrayNode
    .filter(
      (statement) =>
        statement.type === "ExpressionStatement" &&
        statement.expression.type === "AssignmentExpression"
    )
    .map((statement) => statement.expression);
};

/**
 * Updates write targets
 */

const updateWriteTargets = () => {};

exports.isSink = isSink;
exports.enforceIFC = enforceIFC;
exports.enforceIFC2 = enforceIFC2;
exports.configurePolicyLang = configurePolicyLang;
exports.tagAsSink = tagAsSink;
exports.tagAsSource = tagAsSource;
exports.sinks = sinks;
exports.bottom = bottom;
exports.taint = taint;
exports.join = join;
exports.pushContext = pushContext;
exports.popContext = popContext;
exports.popAllContexts = popAllContexts;
exports.currentContext = currentContext;
exports.currentContext2 = currentContext2;
exports.permissiveCheck = permissiveCheck;
exports.permissiveCheck2 = permissiveCheck2;
exports.lift = lift;
exports.writeTargets = writeTargets;

exports.PC = PC;
exports.EXC = EXC;
exports.BREAK = BREAK;
exports.RETURN = RETURN;

exports.hasNode = hasNode;
