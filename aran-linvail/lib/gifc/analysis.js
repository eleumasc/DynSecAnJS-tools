const Acorn = require("acorn");
const Aran = require("aran");
const Astring = require("astring");
const AranAccess = require("aran-access");
const extlib = require("./extlib");
const IFC = require("./monitor");

const membrane = {
  check: true,
  enter: (value) => {
    return {
      inner: value,
      label: 0,
      structureLabel: 0,
    };
  },
  leave: (value) => value.inner,
};

const access = AranAccess(membrane);

const ADVICE = Object.assign({}, access.advice);

const isPrimitive = (x) =>
  typeof x === "string" ||
  typeof x === "number" ||
  typeof x === "undefined" ||
  typeof x === "null" ||
  typeof x === "boolean" ||
  typeof x === "symbol";

let contextTemp = IFC.bottom();

const release = (obj) => access.release(access.membrane.leave(obj));

const capture = (obj) => access.membrane.enter(access.capture(obj));

let scope = {};
const scopeOf = new WeakMap();
const callstack = [];
const peekScope = () => {
  return callstack[callstack.length - 1];
};
ADVICE.begin = function (strict, $scope, produced, serial) {
  callstack.push(scope);
  return $scope;
};

ADVICE.declare = function (type, name, value, serial) {
  let curscope = peekScope();
  curscope[name] = value;
  return value;
};

ADVICE.arrival = function (strict, $scope, serial) {
  callstack.push(scope);
  scope = scopeOf.get($scope.callee);
  return $scope;
};

ADVICE.closure = function ($closure, serial) {
  Reflect.setPrototypeOf($closure, capture(Function.prototype));
  let $$closure = membrane.enter($closure);
  scopeOf.set($closure, Object.create(scope));
  return $$closure;
};

ADVICE.block = (idx) => {
  IFC.pushContext(IFC.PC, contextTemp);
};

ADVICE.label = (isCont, noop, idx) => {
  if (!isCont) {
    IFC.pushContext(IFC.PC, contextTemp);
  }
};

ADVICE.leave = (id, idx) => {
  IFC.popContext(IFC.PC);
};

ADVICE.break = (isCont, lbl, idx) => {
  if (isCont) {
    IFC.popContext(IFC.PC);
  } else {
  }
};

ADVICE.test = (value, idx) => {
  IFC.permissiveCheck(value.label, aran.nodes[idx]);

  contextTemp = IFC.join(IFC.currentContext(IFC.PC), value.label);
  const node = aran.nodes[idx];
  if (node && node.type === "IfStatement") {
    if (IFC.hasNode("BreakStatement", node)) {
      IFC.pushContext(IFC.BREAK, contextTemp, idx);
    } else if (IFC.hasNode("ReturnStatement", node)) {
      IFC.pushContext(IFC.RETURN, contextTemp, idx);
    }
  }

  let val = access.advice.test(value, idx);

  return val;
};

ADVICE.apply = (f, xs, idx) => {
  callstack.push(scope);
  const targetFn = release(f);

  if (targetFn === IFC.tagAsSink) {
    return targetFn(...xs.map((x) => release(x)));
  } else if (targetFn === IFC.tagAsSource) {
    return targetFn(...xs);
  }

  return access.advice.apply(f, xs);
};

ADVICE.invoke = (o, k, xs, idx) => {
  const ths = release(o);
  const key = release(k);
  const fn = ths[key];
  let isSink = IFC.isSink(fn);

  if (isSink) {
    const argsLabels = xs
      ? Array.from(xs).map((arg) => IFC.join(arg.label, 0))
      : [];
    argsLabels.push(
      IFC.currentContext(IFC.PC),
      IFC.currentContext(IFC.BREAK),
      IFC.currentContext(IFC.RETURN)
    );
    IFC.enforceIFC(isSink, aran.nodes[idx], ...argsLabels);
  }

  let isExternal = extlib.hasFunction(fn);
  if (isExternal) extlib.leave(fn, o.inner, xs);

  let res = access.advice.invoke(o, k, xs, idx);

  if (isExternal) res = extlib.enter(fn, res);
  return res;
};

const toPrimitive = (obj, hint) => {
  let base = release(obj);
  if (isPrimitive(base)) {
    return obj;
  } else {
    return defaultValue(obj, hint);
  }
};

const defaultValue = (obj, hint, idx) => {
  if (hint === 0) {
    if (release(obj).hasOwnProperty("valueOf")) {
      let t = ADVICE.invoke(obj, capture("valueOf"), [], idx);
      if (isPrimitive(release(t))) {
        return t;
      }
    } else if (release(obj).hasOwnProperty("toString")) {
      let t = ADVICE.invoke(obj, capture("toString"), [], idx);
      if (isPrimitive(release(t))) {
        return t;
      }
    } else {
      return obj;
    }
  } else {
    if ("toString" in obj) {
      let t = ADVICE.invoke(obj, capture("toString"), [], idx);
      if (isPrimitive(release(t))) {
        return t;
      }
    } else if ("valueOf" in obj) {
      let t = ADVICE.invoke(obj, capture("valueOf"), [], idx);
      if (isPrimitive(release(t))) {
        return t;
      }
    } else {
      return obj;
    }
  }
};

ADVICE.binary = (op, l, r, idx) => {
  let label = IFC.currentContext(IFC.PC);
  let res = undefined;
  label = IFC.join(label, l.label, r.label);

  switch (op) {
    case "+":
      let lprim = toPrimitive(l, 0, idx);
      let rprim = toPrimitive(r, 0, idx);

      res = access.advice.binary(op, lprim, rprim, idx);

      res.label = IFC.join(label, lprim.label, rprim.label);
      return res;
    default:
      break;
  }

  res = access.advice.binary(op, l, r, idx);
  res.label = label;

  return res;
};

ADVICE.write = (id, old, value, idx) => {
  let oldLabel = old.label;
  let context = IFC.join(
    IFC.currentContext(IFC.PC),
    IFC.currentContext(IFC.BREAK),
    IFC.currentContext(IFC.RETURN)
  );
  value.label = IFC.join(value.label, IFC.lift(oldLabel, context));
  value.label = IFC.join(value.label, context);
  return value;
};

ADVICE.set = (o, k, value, idx) => {
  let context = IFC.join(
    IFC.currentContext(IFC.PC),
    IFC.currentContext(IFC.BREAK),
    IFC.currentContext(IFC.RETURN)
  );
  let label = IFC.join(context, k.label, value.label);

  value.label = label;

  o.structureLabel = IFC.join(o.structureLabel, label);

  let res = access.advice.set(o, k, value, idx);

  return res;
};

ADVICE.get = (o, k, idx) => {
  const res = access.advice.get(o, k, idx);
  res.label = IFC.join(o.label, res.label, o.structureLabel, k.label);
  return res;
};

ADVICE.delete = (o, k, idx) => {
  let res = access.advice.delete(o, k, idx);
  if (res.inner) {
    o.structureLabel = IFC.join(
      IFC.currentContext(IFC.PC),
      IFC.currentContext(IFC.BREAK),
      IFC.currentContext(IFC.RETURN)
    );
  }
};

ADVICE.throw = (x, idx) => {
  x.label = IFC.join(IFC.PC, IFC.BREAK);
  return x;
};

ADVICE.return = (arrival, consumed, idx) => {
  IFC.popAllContexts(IFC.RETURN, IFC.PC);

  return access.advice.return(arrival, consumed, idx);
};

const aran = Aran({
  namespace: "META",
  sandbox: true,
  pointcut: Object.keys(ADVICE),
});

const acornOptions = { locations: true, ecmaVersion: 2018 };
access.membrane.transform = (script, scope) =>
  Astring.generate(aran.weave(Acorn.parse(script, acornOptions), scope));

module.exports = {
  setup: (global) => {
    // IFC.configurePolicyLang(global);
    global[aran.namespace] = ADVICE;
    global.eval(Astring.generate(aran.setup()));
  },
  transform: (script) => access.membrane.transform(script, ["this"]),
};
