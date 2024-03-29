const _0 = Symbol("0");
const _1 = Symbol("1");
const _2 = Symbol("2");
const _3 = Symbol("3");

const table = {
  0: _0,
  1: _1,
  2: _2,
  3: _3,
};

const GENERAL_FN_MODEL = Symbol.for("general_function_model");

const isPrimitive = (x) => {
  return x !== Object(x);
};

const union = (params) => {
  return params.reduce((acc, curr) => {
    return acc > curr ? acc : curr;
  }, 0);
};

const stateValues = (map) => {
  let arr = [];
  for (const val of map.values()) {
    arr.push(val);
  }
  return arr;
};

/**
 * ********************************************************************
 * ********************** Implementation ******************************
 * ********************************************************************
 */

const fnRegistry = new Map();
const fnModelInstance = new Map();

const addFnModel = (fn, model) => {
  if (!fnRegistry.has(fn)) {
    fnRegistry.set(fn, model);
  }
};

addFnModel(GENERAL_FN_MODEL, {
  getLabel: function () {
    let arr = stateValues(this.labelState);
    if (this.self) arr.push(this.self.label);
    return union(arr);
  },
});

const label = (unlabeledVal, labelModelInstance) => {
  let label = labelModelInstance.getLabel();
  return label;
};

// const unlabel = (labeledVal, id, labelModelInstance) => {
//     labelModelInstance.labelState.set(id, labeledVal)
//     return labeledVal.inner;
// }

const unlabel = (labeledVal, id, labelModelInstance) => {
  //No Label Structure Marshalling for Primitive Values (number,string, boolean, null, undefined)
  if (isPrimitive(labeledVal.inner)) {
    labelModelInstance.labelState.set(id, labeledVal.label);
  } else {
    if (labeledVal.inner instanceof Array) {
      var oL = labeledVal.label;
      var pL = labeledVal.inner.map((x) => x.label);

      labelModelInstance.labelState.set(id, {
        oLabel: oL, //label of the array as object
        pLabel: pL, //label of each item in the array
      });
    } else if (labeledVal.inner instanceof Object) {
      console.log("labeling objec!");
      //TODO how to unlabel objects? stateful | lazy
    }
  }

  return labeledVal.inner;
};

/**
 *
 * @param {Function} fn is a uninstrumented function
 * @param {Object} ths target object
 * @param {Array} args arguments for the call
 *
 * Before an external library is executed a model instance is created for the function call with the label of the
 */
let leave = (fn, ths, args) => {
  let fnModel = fnRegistry.get(fn) || fnRegistry.get(GENERAL_FN_MODEL);
  let counter = 0;
  let modelInstance = Object.assign(fnModel, {
    labelState: new Map(), //The label state is populated later see: unlabel below
    self: ths,
  });

  for (let val of args) {
    unlabel(val, table["" + counter++], modelInstance);
  }

  fnModelInstance.set(fn, modelInstance);
  //return fnRegistry.has(fn);
  return true;
};

let enter = (fn, val) => {
  let modelInstance = fnModelInstance.get(fn);
  val.label = label(val, modelInstance);
  return val;
};

exports._t = table;

exports.leave = leave;
exports.enter = enter;
exports.addFnModel = addFnModel;

exports.union = union;
exports.stateValues = stateValues;
exports.hasFunction = (fn) => {
  return fnRegistry.has(fn);
};
