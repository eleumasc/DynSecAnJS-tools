const Acorn = require("acorn");
const Aran = require("aran");
const Astring = require("astring");
const AranAccess = require("aran-access");

const access = AranAccess({
  check: true,
  enter: (value) => value,
  leave: (value) => value,
});

const ADVICE = Object.assign({}, access.advice);

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
    global[aran.namespace] = ADVICE;
    global.eval(Astring.generate(aran.setup()));
  },
  transform: (script) => access.membrane.transform(script, ["this"]),
};
