const Acorn = require("acorn");
const Aran = require("aran");
const Astring = require("astring");
const Linvail = require("linvail");

const DEBUG = false;

const advice = {};
const pointcut = (name, node) => name in advice;
const aran = Aran({});
const internals = new WeakSet();
const callstack = [];
const push = (tag, name, serial) => {
  callstack.push({ tag, name, inputs: [], serial });
};
const peek = () => callstack[callstack.length - 1];
const pop = () => {
  callstack.pop();
};
global[aran.namespace] = advice;
const isTainted = ($$value) => $$value.meta;
const membrane = {
  taint: (value) => {
    let meta = null;
    if (peek().tag !== "internal" && peek().inputs.filter(isTainted).length) {
      meta = Object.assign({}, peek());
      meta.inputs = meta.inputs.slice();
    }
    return { base: value, meta };
  },
  clean: ({ base, meta }) => {
    peek().inputs.push({ base, meta });
    return base;
  },
};
const { capture, release } = Linvail(membrane, { check: true });

// Program //
advice.program = (global, serial) => {
  push("internal", "program", serial);
};
advice.success = ($$value, serial) => {
  const value = release(membrane.clean($$value));
  pop();
  return value;
};
advice.failure = ($$value, serial) => {
  const value = release(membrane.clean($$value));
  pop();
  return value;
};

// Closure //
advice.arrival = (callee, $newtarget, $$context, $$arguments, serial) => {
  push("internal", callee.name, serial);
};
advice.return = ($$value, serial) => {
  pop();
  return $$value;
};
advice.abrupt = ($$value, serial) => {
  pop();
  return $$value;
};

// Consumers //
advice.test = ($$value, serial) => membrane.clean($$value);
advice.eval = ($$value, serial) => {
  const script = release(membrane.clean($$value));
  return aran.weave(Acorn.parse(script, { locations: true }), pointcut, serial);
};

// Producers //
advice.argument = (_value, name) => {
  if (name === "length" || name === "new.target") return membrane.taint(_value);
  return _value;
};
advice.primitive = (primitive, serial) => membrane.taint(primitive);
advice.builtin = (value, name, serial) => membrane.taint(capture(value));
advice.closure = ($closure, serial) => {
  Reflect.setPrototypeOf($closure, capture(Function.prototype));
  internals.add($closure);
  return membrane.taint($closure);
};

// Combiners //
advice.apply = ($$value1, $$value2, $$values, serial) => {
  const $value1 = membrane.clean($$value1);
  const f = release($value1);

  // Begin Policy //
  if (f === _aran_source_) {
    DEBUG && console.log("_aran_source_", $$values);

    const $$x = $$values[0];
    const name = release(membrane.clean($$values[1]));
    const argument = release(membrane.clean($$values[2]));

    $$x.meta = { tag: "initial", name, argument, serial, inputs: [] };
    return $$x;
  } else if (f === _aran_sink_) {
    DEBUG && console.log("_aran_sink_", $$values);

    const $$x = $$values[0];
    const name = release(membrane.clean($$values[1]));
    const argument = release(membrane.clean($$values[2]));

    if ($$x.meta) {
      const r = {
        name,
        argument,
        str: $$x.base,
        taint: getTaint($$x.meta),
      };
      DEBUG && console.log("Tainted flow", r);
      _aran_taintReports_.push(r);
    }

    return $$x;
  }
  // End Policy //

  if (internals.has($value1)) return Reflect.apply($value1, $$value2, $$values);
  push("apply", f.name, serial);
  try {
    return Reflect.apply($value1, $$value2, $$values);
  } finally {
    pop();
  }
};
advice.construct = ($$value, $$values, serial) => {
  const $value = membrane.clean($$value);
  if (internals.has($value)) return Reflect.construct($value, $$values);
  push("construct", release($value).name, serial);
  try {
    return Reflect.construct($value, $$values);
  } finally {
    pop();
  }
};
advice.unary = (operator, $$value, serial) => {
  push("unary", operator, serial);
  const value = release(membrane.clean($$value));
  try {
    return membrane.taint(aran.unary(operator, value));
  } catch (error) {
    throw membrane.taint(capture(error));
  } finally {
    pop();
  }
};
advice.binary = (operator, $$value1, $$value2, serial) => {
  push("binary", operator, serial);
  const value1 = release(membrane.clean($$value1));
  const value2 = release(membrane.clean($$value2));
  try {
    return membrane.taint(aran.binary(operator, value1, value2));
  } catch (error) {
    throw membrane.taint(capture(error));
  } finally {
    pop();
  }
};

const getTaint = (meta) => {
  const visited = new WeakSet();
  const visit = (meta) => {
    if (meta === null) return [];
    if (visited.has(meta)) return [];
    visited.add(meta);
    if (meta.inputs.length === 0) {
      const { name, argument } = meta;
      return { name, argument };
    }
    return meta.inputs.flatMap((input) => visit(input.meta));
  };
  return visit(meta);
};

const _aran_taintReports_ = [];
const _aran_source_ = (x) => x;
const _aran_sink_ = (x) => x;

const generateSetup = (exports.generateSetup = () => {
  return Astring.generate(aran.setup());
});

exports.setup = (generatedSetup) => {
  if (generatedSetup) {
    generatedSetup();
  } else {
    global.eval(generateSetup());
  }

  global._aran_taintReports_ = _aran_taintReports_;
  global._aran_source_ = _aran_source_;
  global._aran_sink_ = _aran_sink_;
};

exports.instrument = (script) => {
  return Astring.generate(
    aran.weave(
      Acorn.parse(script, { ecmaVersion: "latest", locations: true }),
      pointcut,
      null
    )
  );
};
