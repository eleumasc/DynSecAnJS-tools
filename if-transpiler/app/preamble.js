var $Γ = { global: { scope: null, Σ: 0 } };
var _$tmp, $tmp, $rf;

var global = this;

$Γ["global"].global = $Γ["global"].$this = $Γ["global"];

var $Λ = [{ l: 0, id: "global" }];
var $Δ = [];

global._ifTranspiler_taintReports_ = [];

global._ifTranspiler_taintArray_ = [null];
function allocTaint(taint) {
  return _ifTranspiler_taintArray_.push(taint) - 1;
}

function $lub() {
  let taintIndex = 0;
  let taint = null;
  let allocRequired = false;
  for (const a of arguments) {
    if (a === 0) continue;
    if (taint) {
      taint = new Set([...taint, ..._ifTranspiler_taintArray_[a]]);
      allocRequired = true;
    } else {
      taintIndex = a;
      taint = _ifTranspiler_taintArray_[a];
    }
  }
  return allocRequired ? allocTaint(taint) : taintIndex;
}

function $pc() {
  return $Λ[$Λ.length - 1];
}

function $scope($$cs, $var, isLHS) {
  do {
    if ($$cs[$var] !== undefined) return $$cs;
  } while (($$cs = $$cs.scope));

  if (isLHS) {
    $Γ["global"][$var] = 0;
    return $Γ["global"];
  } else {
    if ($var === "global") return $Γ;

    throw new Error("Can't find variable " + $var + " in scope chain ");
  }
}

function $prop(obj, prop, $$cs) {
  var $ro, $t;
  $ro = $t = $scope($$cs, obj, false)[obj];
  do {
    if ($ro[prop] !== undefined) return $ro[prop];
  } while (($ro = $ro["__$proto__"]));

  return $t.Σ ? $t.Σ : $t;
}

function $comp(lblObj, lvl) {
  var i = $Λ.length - 1;
  while (i > 1 && $Λ[i].id !== lblObj.lbl) {
    i--;
    $Λ[i].l = $lub($Λ[i].l, lvl);
  }
  i--;
  $Λ[i].l = $lub($Λ[i].l, lvl);
}

function $upgrade(varArray, lvl, $$cs) {
  var variable;
  for (var e in varArray) {
    var i = varArray[e].indexOf(".");
    try {
      if (i === -1) {
        variable = $scope($$cs, varArray[e], false)[varArray[e]];
        variable instanceof Object
          ? (variable.Σ = $lub(variable.Σ, lvl))
          : ($scope($$cs, varArray[e], false)[varArray[e]] = $lub(
              variable,
              lvl
            ));
      } else {
        var obj = varArray[e].split(".")[0],
          prop = varArray[e].split(".")[1];
        variable = $prop(obj, prop, $$cs);
        variable instanceof Object
          ? (variable.Σ = $lub(variable.Σ, lvl))
          : ($scope($$cs, obj, false)[obj][prop] = $lub(variable, lvl));
      }
    } catch (e) {}
  }
}

function sec_lvl(obj, prop, getValue, $$cs) {
  var result;

  if (obj === "this") {
    obj = prop;
    prop = null;
  }
  if (prop !== null) {
    result = $prop(obj, "" + prop, $$cs);
  } else {
    result = $scope($$cs, obj, false)[obj];
  }
  if (getValue) {
    return result instanceof Object ? result.Σ : result;
  } else {
    return result;
  }
}

function $output(arg, argValue, $$cs, pcLvl, name, argument) {
  var argSecLvl = sec_lvl(arg, null, true, $$cs);

  if ($lub(argSecLvl, pcLvl) !== 0) {
    _ifTranspiler_taintReports_.push({
      name,
      argument,
      str: argValue,
      taint: _ifTranspiler_taintArray_[argSecLvl],
    });
  }
}

/**
 * function _ifTranspiler_source_(x, name, argument) {
 *   var xTainted = x;
 *   return xTainted; // TAINTED
 * }
 */
