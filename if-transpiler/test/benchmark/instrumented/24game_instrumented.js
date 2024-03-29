
var $Γ = { 'global': { 'scope': null, 'Σ': 0 } };
var _$tmp;

$Γ['global'].$this = $Γ['global'];

$Λ = [{'l': 0, id: 'global'}];
$Δ = [];
function $pc() {
    return $Λ[$Λ.length - 1];
}
function $lub() {
    var args = Array.prototype.slice.call(arguments, 0);
    return args.sort(function (a, b) {
        return (b - a);
    })[0];
}

function $scope($$cs, $var, isLHS) {
    //console.log($$cs)
    var $$csCopy = $$cs;

    do {
        //if ($$cs.hasOwnProperty(""+$var))
        if ($$cs[$var] !== undefined)
            return $$cs;
    } while ($$cs = $$cs.scope);


    if (isLHS) {
        $Γ['global'][$var] = 0;
        return $Γ['global'];
    } else {

        // if we can't find $var in any scope and its name is 'global'
        // it must be the the global object. Return $Γ which contains
        // global object as a property.
        if ($var == 'global')
            return $Γ;

        throw new Error("Can't find variable " + $var + " in scope chain: " + JSON.stringify($$csCopy));
    }
}

function $prop(obj, prop, $$cs) {
    var $ro, $t;
    $ro = $t = $scope($$cs, obj, false)[obj];
    do {
        if ($ro[prop] !== undefined)
            return $ro[prop];
    } while ($ro = $ro['__$proto__']);

    // if we looked up a property that doesn't exist return
    // the objects sec level.
    return $t.Σ;
}

function $comp(lbl, lvl) {
    var i = $Λ.length;
    while (i > 1 && $Λ[i].id !== lbl) {
        i--;
        $Λ[i].l = ($Λ[i].l > lvl) ? $Λ[i].l : lvl;
    }
    i--;
    $Λ[i].l = ($Λ[i].l > lvl) ? $Λ[i].l : lvl;
}

function $upgrade(varArray, lvl, $$cs) {
    var variable;
    for (var e in varArray) {
        var i = varArray[e].indexOf('.');
        try {
            if (i == -1) {
                variable = $scope($$cs, varArray[e], false)[varArray[e]];
                variable instanceof Object ? variable.Σ = (variable.Σ >= lvl) ? variable.Σ : lvl :
                    $scope($$cs, varArray[e], false)[varArray[e]] = (variable >= lvl) ? variable : lvl;
            }
            else {
                var obj = varArray[e].split('.')[0], prop = varArray[e].split('.')[1];
                variable = $prop(obj, prop, $$cs);
                variable instanceof Object ? variable.Σ = (variable.Σ >= lvl) ? variable.Σ : lvl :
                    $scope($$cs, obj, false)[obj][prop] = (variable >= lvl) ? variable : lvl;
            }
        } catch (e) {
        }
    }
}

function sec_lvl(obj, prop, getValue, $$cs) {

    var result;
    // special case of looking up 'this'
    if (obj === 'this') {
        obj = prop;
        prop = null;
    }
    if (prop !== null) {
        result = $prop(obj, "" + prop, $$cs);
    } else {
        result = $scope($$cs, obj, false)[obj];
    }
    if (getValue) {
        return (result instanceof Object) ? result.Σ : result;
    } else {
        return result;
    }
}
//-------------------------------------------------------------------------------

$Γ['global']['solve24'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    s: $Λ[$Λ.length - 1].l
};
$Γ['global']['showsolution'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$Γ['global']['getpriority'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    x: $Λ[$Λ.length - 1].l
};
$Γ['global']['parenth'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    n: $Λ[$Λ.length - 1].l
};
$Γ['global']['shuffle'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    s: $Λ[$Λ.length - 1].l,
    n: $Λ[$Λ.length - 1].l
};
$Γ['global']['calc'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$Γ['global']['getvalue'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    x: $Λ[$Λ.length - 1].l,
    dir: $Λ[$Λ.length - 1].l
};
$Γ['global']['say'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    s: $Λ[$Λ.length - 1].l
};
$Γ['global']['rnd'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    n: $Λ[$Λ.length - 1].l
};
var ar, order, op, val, NOVAL, oper, out, $tmp0, $tmp1, $tmp2;
$Γ['global']['$tmp2'] = $Γ['global']['$tmp1'] = $Γ['global']['$tmp0'] = $Γ['global']['out'] = $Γ['global']['oper'] = $Γ['global']['NOVAL'] = $Γ['global']['val'] = $Γ['global']['op'] = $Γ['global']['order'] = $Γ['global']['ar'] = 0;
ar = [];
$Γ['global']['ar'] = {
    __proto__: {},
    scope: $Γ['global'],
    Σ: $Λ[$Λ.length - 1].l
};
order = [
    0,
    1,
    2
];
$Γ['global']['order'] = {
    __proto__: {},
    scope: $Γ['global'],
    0: $Λ[$Λ.length - 1].l,
    1: $Λ[$Λ.length - 1].l,
    2: $Λ[$Λ.length - 1].l,
    Σ: $Λ[$Λ.length - 1].l
};
op = [];
$Γ['global']['op'] = {
    __proto__: {},
    scope: $Γ['global'],
    Σ: $Λ[$Λ.length - 1].l
};
val = [];
$Γ['global']['val'] = {
    __proto__: {},
    scope: $Γ['global'],
    Σ: $Λ[$Λ.length - 1].l
};
NOVAL = 9999;
$Γ['global']['NOVAL'] = $Λ[$Λ.length - 1].l;
oper = '+-*/';
$Γ['global']['oper'] = $Λ[$Λ.length - 1].l;
function rnd(n) {
    var $tmp3, $tmp4, $tmp5;
    $Γ['global']['rnd']['$tmp5'] = $Γ['global']['rnd']['$tmp4'] = $Γ['global']['rnd']['$tmp3'] = 0;
    $tmp5 = Math.random();
    $tmp4 = $tmp5 * n;
    $Γ['global']['rnd']['$tmp4'] = sec_lvl('$tmp5', null, true, $Γ['global']['rnd']) >= sec_lvl('n', null, true, $Γ['global']['rnd']) ? sec_lvl('$tmp5', null, true, $Γ['global']['rnd']) : sec_lvl('n', null, true, $Γ['global']['rnd']);
    $Γ['global']['rnd']['$tmp4'] instanceof Object ? $Γ['global']['rnd']['$tmp4'].Σ = $Γ['global']['rnd']['$tmp4'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['rnd']['$tmp4'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['rnd']['$tmp4'] = $Γ['global']['rnd']['$tmp4'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['rnd']['$tmp4'] : $Λ[$Λ.length - 1].l;
    $tmp3 = Math.floor($tmp4);
    return $tmp3;
}
function say(s) {
    var $tmp6;
    $Γ['global']['say']['$tmp6'] = 0;
    $tmp6 = console.log(s);
    return;
}
function getvalue(x, dir) {
    var r, $tmp7, $tmp8;
    $Γ['global']['getvalue']['$tmp8'] = $Γ['global']['getvalue']['$tmp7'] = $Γ['global']['getvalue']['r'] = 0;
    r = NOVAL;
    $scope($Γ['global']['getvalue'], 'r', true)['r'] = sec_lvl('NOVAL', null, false, $Γ['global']['getvalue']);
    $scope($Γ['global']['getvalue'], 'r', true)['r'] instanceof Object ? $scope($Γ['global']['getvalue'], 'r', true)['r'].Σ = $scope($Γ['global']['getvalue'], 'r', true)['r'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['getvalue'], 'r', true)['r'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['getvalue'], 'r', true)['r'] = $scope($Γ['global']['getvalue'], 'r', true)['r'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['getvalue'], 'r', true)['r'] : $Λ[$Λ.length - 1].l;
    $tmp7 = dir > 0;
    $Γ['global']['getvalue']['$tmp7'] = sec_lvl('dir', null, true, $Γ['global']['getvalue']) >= $Λ[$Λ.length - 1].l ? sec_lvl('dir', null, true, $Γ['global']['getvalue']) : $Λ[$Λ.length - 1].l;
    $Γ['global']['getvalue']['$tmp7'] instanceof Object ? $Γ['global']['getvalue']['$tmp7'].Σ = $Γ['global']['getvalue']['$tmp7'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['getvalue']['$tmp7'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['getvalue']['$tmp7'] = $Γ['global']['getvalue']['$tmp7'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['getvalue']['$tmp7'] : $Λ[$Λ.length - 1].l;
    $Λ.push({
        l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp7', null, true, $Γ['global']['getvalue']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp7', null, true, $Γ['global']['getvalue']),
        id: 'IF'
    });
    if ($tmp7) {
        var $tmp9;
        $Γ['global']['getvalue']['$tmp9'] = 0;
        $tmp9 = ++x;
        $Γ['global']['getvalue']['$tmp9'] = sec_lvl('x', null, false, $Γ['global']['getvalue']);
        $Γ['global']['getvalue']['$tmp9'] instanceof Object ? $Γ['global']['getvalue']['$tmp9'].Σ = $Γ['global']['getvalue']['$tmp9'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['getvalue']['$tmp9'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['getvalue']['$tmp9'] = $Γ['global']['getvalue']['$tmp9'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['getvalue']['$tmp9'] : $Λ[$Λ.length - 1].l;
    } else {
    }
    $Λ.pop();
    $Λ.push({
        l: $Λ[$Λ.length - 1].l,
        id: 'LOOP'
    });
    while (1) {
        var $tmp10, $tmp11;
        $Γ['global']['getvalue']['$tmp11'] = $Γ['global']['getvalue']['$tmp10'] = 0;
        $tmp11 = val[x];
        $Γ['global']['getvalue']['$tmp11'] = sec_lvl('val', x, false, $Γ['global']['getvalue']);
        $Γ['global']['getvalue']['$tmp11'] instanceof Object ? $Γ['global']['getvalue']['$tmp11'].Σ = $Γ['global']['getvalue']['$tmp11'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['getvalue']['$tmp11'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['getvalue']['$tmp11'] = $Γ['global']['getvalue']['$tmp11'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['getvalue']['$tmp11'] : $Λ[$Λ.length - 1].l;
        $tmp10 = $tmp11 != NOVAL;
        $Γ['global']['getvalue']['$tmp10'] = sec_lvl('$tmp11', null, true, $Γ['global']['getvalue']) >= sec_lvl('NOVAL', null, true, $Γ['global']['getvalue']) ? sec_lvl('$tmp11', null, true, $Γ['global']['getvalue']) : sec_lvl('NOVAL', null, true, $Γ['global']['getvalue']);
        $Γ['global']['getvalue']['$tmp10'] instanceof Object ? $Γ['global']['getvalue']['$tmp10'].Σ = $Γ['global']['getvalue']['$tmp10'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['getvalue']['$tmp10'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['getvalue']['$tmp10'] = $Γ['global']['getvalue']['$tmp10'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['getvalue']['$tmp10'] : $Λ[$Λ.length - 1].l;
        $Λ.push({
            l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp10', null, true, $Γ['global']['getvalue']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp10', null, true, $Γ['global']['getvalue']),
            id: 'IF'
        });
        if ($tmp10) {
            r = val[x];
            $scope($Γ['global']['getvalue'], 'r', true)['r'] = sec_lvl('val', x, false, $Γ['global']['getvalue']);
            $scope($Γ['global']['getvalue'], 'r', true)['r'] instanceof Object ? $scope($Γ['global']['getvalue'], 'r', true)['r'].Σ = $scope($Γ['global']['getvalue'], 'r', true)['r'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['getvalue'], 'r', true)['r'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['getvalue'], 'r', true)['r'] = $scope($Γ['global']['getvalue'], 'r', true)['r'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['getvalue'], 'r', true)['r'] : $Λ[$Λ.length - 1].l;
            val[x] = NOVAL;
            $scope($Γ['global']['getvalue'], 'val', false)[x] = sec_lvl('NOVAL', null, false, $Γ['global']['getvalue']);
            _$tmp = sec_lvl('x', null, false, $Γ['global']['getvalue']) instanceof Object ? sec_lvl('x', null, false, $Γ['global']['getvalue']).Σ : sec_lvl('x', null, false, $Γ['global']['getvalue']);
            $scope($Γ['global']['getvalue'], 'val', false)[x] instanceof Object ? $scope($Γ['global']['getvalue'], 'val', false)[x].Σ = $scope($Γ['global']['getvalue'], 'val', false)[x].Σ : $scope($Γ['global']['getvalue'], 'val', false)[x] = $scope($Γ['global']['getvalue'], 'val', false)[x];
            break;
            var $shouldComp = { 'lbl': 'LOOP' };
        } else {
        }
        if ($shouldComp)
            $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
        $Λ.pop();
        x += dir;
        $scope($Γ['global']['getvalue'], 'x', true)['x'] = sec_lvl('dir', null, false, $Γ['global']['getvalue']);
        $scope($Γ['global']['getvalue'], 'x', true)['x'] instanceof Object ? $scope($Γ['global']['getvalue'], 'x', true)['x'].Σ = $scope($Γ['global']['getvalue'], 'x', true)['x'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['getvalue'], 'x', true)['x'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['getvalue'], 'x', true)['x'] = $scope($Γ['global']['getvalue'], 'x', true)['x'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['getvalue'], 'x', true)['x'] : $Λ[$Λ.length - 1].l;
    }
    $Λ.pop();
    $tmp8 = r * 1;
    $Γ['global']['getvalue']['$tmp8'] = sec_lvl('r', null, true, $Γ['global']['getvalue']) >= $Λ[$Λ.length - 1].l ? sec_lvl('r', null, true, $Γ['global']['getvalue']) : $Λ[$Λ.length - 1].l;
    $Γ['global']['getvalue']['$tmp8'] instanceof Object ? $Γ['global']['getvalue']['$tmp8'].Σ = $Γ['global']['getvalue']['$tmp8'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['getvalue']['$tmp8'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['getvalue']['$tmp8'] = $Γ['global']['getvalue']['$tmp8'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['getvalue']['$tmp8'] : $Λ[$Λ.length - 1].l;
    return $tmp8;
}
function calc() {
    var c, l, r, x, $tmp12, $tmp13, $tmp14;
    $Γ['global']['calc']['$tmp14'] = $Γ['global']['calc']['$tmp13'] = $Γ['global']['calc']['$tmp12'] = $Γ['global']['calc']['x'] = $Γ['global']['calc']['r'] = $Γ['global']['calc']['l'] = $Γ['global']['calc']['c'] = 0;
    c = 0;
    $scope($Γ['global']['calc'], 'c', true)['c'] = $Λ[$Λ.length - 1].l;
    $tmp = ar.join('/');
    val = $tmp.split('/');
    $tmp12 = c < 3;
    $Γ['global']['calc']['$tmp12'] = sec_lvl('c', null, true, $Γ['global']['calc']) >= $Λ[$Λ.length - 1].l ? sec_lvl('c', null, true, $Γ['global']['calc']) : $Λ[$Λ.length - 1].l;
    $Γ['global']['calc']['$tmp12'] instanceof Object ? $Γ['global']['calc']['$tmp12'].Σ = $Γ['global']['calc']['$tmp12'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['calc']['$tmp12'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['calc']['$tmp12'] = $Γ['global']['calc']['$tmp12'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['calc']['$tmp12'] : $Λ[$Λ.length - 1].l;
    $Λ.push({
        l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp12', null, true, $Γ['global']['calc']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp12', null, true, $Γ['global']['calc']),
        id: 'LOOP'
    });
    while ($tmp12) {
        x = order[c];
        $scope($Γ['global']['calc'], 'x', true)['x'] = sec_lvl('order', c, false, $Γ['global']['calc']);
        $scope($Γ['global']['calc'], 'x', true)['x'] instanceof Object ? $scope($Γ['global']['calc'], 'x', true)['x'].Σ = $scope($Γ['global']['calc'], 'x', true)['x'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['calc'], 'x', true)['x'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['calc'], 'x', true)['x'] = $scope($Γ['global']['calc'], 'x', true)['x'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['calc'], 'x', true)['x'] : $Λ[$Λ.length - 1].l;
        var $tmp15, $tmp16, $tmp17, $tmp18, $tmp12;
        $Γ['global']['calc']['$tmp12'] = $Γ['global']['calc']['$tmp18'] = $Γ['global']['calc']['$tmp17'] = $Γ['global']['calc']['$tmp16'] = $Γ['global']['calc']['$tmp15'] = 0;
        $tmp15 = -1;
        $Γ['global']['calc']['$tmp15'] = $Λ[$Λ.length - 1].l;
        $Γ['global']['calc']['$tmp15'] instanceof Object ? $Γ['global']['calc']['$tmp15'].Σ = $Γ['global']['calc']['$tmp15'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['calc']['$tmp15'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['calc']['$tmp15'] = $Γ['global']['calc']['$tmp15'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['calc']['$tmp15'] : $Λ[$Λ.length - 1].l;
        $rf = $scope($Γ['global']['calc'], 'getvalue', false)['getvalue'];
        $rf.scope = $Γ['global']['calc'];
        $rf.$this = $Γ['global'];
        $rf['x'] = sec_lvl('x', null, true, $Γ['global']['calc']) >= $Λ[$Λ.length - 1].l ? sec_lvl('x', null, true, $Γ['global']['calc']) : $Λ[$Λ.length - 1].l;
        $rf['dir'] = sec_lvl('$tmp15', null, true, $Γ['global']['calc']) >= $Λ[$Λ.length - 1].l ? sec_lvl('$tmp15', null, true, $Γ['global']['calc']) : $Λ[$Λ.length - 1].l;
        $Λ.push({
            l: $rf.$fscope,
            id: 'FUNC'
        });
        l = getvalue(x, $tmp15);
        $scope($Γ['global']['calc'], 'l', true)['l'] = $Λ.pop().l;
        $scope($Γ['global']['calc'], 'l', true)['l'] instanceof Object ? $scope($Γ['global']['calc'], 'l', true)['l'].Σ = $scope($Γ['global']['calc'], 'l', true)['l'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['calc'], 'l', true)['l'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['calc'], 'l', true)['l'] = $scope($Γ['global']['calc'], 'l', true)['l'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['calc'], 'l', true)['l'] : $Λ[$Λ.length - 1].l;
        $rf = $scope($Γ['global']['calc'], 'getvalue', false)['getvalue'];
        $rf.scope = $Γ['global']['calc'];
        $rf.$this = $Γ['global'];
        $rf['x'] = sec_lvl('x', null, true, $Γ['global']['calc']) >= $Λ[$Λ.length - 1].l ? sec_lvl('x', null, true, $Γ['global']['calc']) : $Λ[$Λ.length - 1].l;
        $rf['dir'] = $Λ[$Λ.length - 1].l;
        $Λ.push({
            l: $rf.$fscope,
            id: 'FUNC'
        });
        r = getvalue(x, 1);
        $scope($Γ['global']['calc'], 'r', true)['r'] = $Λ.pop().l;
        $scope($Γ['global']['calc'], 'r', true)['r'] instanceof Object ? $scope($Γ['global']['calc'], 'r', true)['r'].Σ = $scope($Γ['global']['calc'], 'r', true)['r'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['calc'], 'r', true)['r'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['calc'], 'r', true)['r'] = $scope($Γ['global']['calc'], 'r', true)['r'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['calc'], 'r', true)['r'] : $Λ[$Λ.length - 1].l;
        $tmp17 = op[x];
        $Γ['global']['calc']['$tmp17'] = sec_lvl('op', x, false, $Γ['global']['calc']);
        $Γ['global']['calc']['$tmp17'] instanceof Object ? $Γ['global']['calc']['$tmp17'].Σ = $Γ['global']['calc']['$tmp17'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['calc']['$tmp17'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['calc']['$tmp17'] = $Γ['global']['calc']['$tmp17'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['calc']['$tmp17'] : $Λ[$Λ.length - 1].l;
        $tmp16 = $tmp17 == 0;
        $Γ['global']['calc']['$tmp16'] = sec_lvl('$tmp17', null, true, $Γ['global']['calc']) >= $Λ[$Λ.length - 1].l ? sec_lvl('$tmp17', null, true, $Γ['global']['calc']) : $Λ[$Λ.length - 1].l;
        $Γ['global']['calc']['$tmp16'] instanceof Object ? $Γ['global']['calc']['$tmp16'].Σ = $Γ['global']['calc']['$tmp16'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['calc']['$tmp16'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['calc']['$tmp16'] = $Γ['global']['calc']['$tmp16'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['calc']['$tmp16'] : $Λ[$Λ.length - 1].l;
        $Λ.push({
            l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp16', null, true, $Γ['global']['calc']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp16', null, true, $Γ['global']['calc']),
            id: 'IF'
        });
        if ($tmp16) {
            val[x] = l + r;
            $scope($Γ['global']['calc'], 'val', false)[x] = sec_lvl('l', null, true, $Γ['global']['calc']) >= sec_lvl('r', null, true, $Γ['global']['calc']) ? sec_lvl('l', null, true, $Γ['global']['calc']) : sec_lvl('r', null, true, $Γ['global']['calc']);
            _$tmp = sec_lvl('x', null, false, $Γ['global']['calc']) instanceof Object ? sec_lvl('x', null, false, $Γ['global']['calc']).Σ : sec_lvl('x', null, false, $Γ['global']['calc']);
            $scope($Γ['global']['calc'], 'val', false)[x] instanceof Object ? $scope($Γ['global']['calc'], 'val', false)[x].Σ = $scope($Γ['global']['calc'], 'val', false)[x].Σ : $scope($Γ['global']['calc'], 'val', false)[x] = $scope($Γ['global']['calc'], 'val', false)[x];
        } else {
            var $tmp19, $tmp20;
            $Γ['global']['calc']['$tmp20'] = $Γ['global']['calc']['$tmp19'] = 0;
            $tmp20 = op[x];
            $Γ['global']['calc']['$tmp20'] = sec_lvl('op', x, false, $Γ['global']['calc']);
            $Γ['global']['calc']['$tmp20'] instanceof Object ? $Γ['global']['calc']['$tmp20'].Σ = $Γ['global']['calc']['$tmp20'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['calc']['$tmp20'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['calc']['$tmp20'] = $Γ['global']['calc']['$tmp20'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['calc']['$tmp20'] : $Λ[$Λ.length - 1].l;
            $tmp19 = $tmp20 == 1;
            $Γ['global']['calc']['$tmp19'] = sec_lvl('$tmp20', null, true, $Γ['global']['calc']) >= $Λ[$Λ.length - 1].l ? sec_lvl('$tmp20', null, true, $Γ['global']['calc']) : $Λ[$Λ.length - 1].l;
            $Γ['global']['calc']['$tmp19'] instanceof Object ? $Γ['global']['calc']['$tmp19'].Σ = $Γ['global']['calc']['$tmp19'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['calc']['$tmp19'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['calc']['$tmp19'] = $Γ['global']['calc']['$tmp19'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['calc']['$tmp19'] : $Λ[$Λ.length - 1].l;
            $Λ.push({
                l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp19', null, true, $Γ['global']['calc']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp19', null, true, $Γ['global']['calc']),
                id: 'IF'
            });
            if ($tmp19) {
                val[x] = l - r;
                $scope($Γ['global']['calc'], 'val', false)[x] = sec_lvl('l', null, true, $Γ['global']['calc']) >= sec_lvl('r', null, true, $Γ['global']['calc']) ? sec_lvl('l', null, true, $Γ['global']['calc']) : sec_lvl('r', null, true, $Γ['global']['calc']);
                _$tmp = sec_lvl('x', null, false, $Γ['global']['calc']) instanceof Object ? sec_lvl('x', null, false, $Γ['global']['calc']).Σ : sec_lvl('x', null, false, $Γ['global']['calc']);
                $scope($Γ['global']['calc'], 'val', false)[x] instanceof Object ? $scope($Γ['global']['calc'], 'val', false)[x].Σ = $scope($Γ['global']['calc'], 'val', false)[x].Σ : $scope($Γ['global']['calc'], 'val', false)[x] = $scope($Γ['global']['calc'], 'val', false)[x];
            } else {
                var $tmp21, $tmp22;
                $Γ['global']['calc']['$tmp22'] = $Γ['global']['calc']['$tmp21'] = 0;
                $tmp22 = op[x];
                $Γ['global']['calc']['$tmp22'] = sec_lvl('op', x, false, $Γ['global']['calc']);
                $Γ['global']['calc']['$tmp22'] instanceof Object ? $Γ['global']['calc']['$tmp22'].Σ = $Γ['global']['calc']['$tmp22'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['calc']['$tmp22'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['calc']['$tmp22'] = $Γ['global']['calc']['$tmp22'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['calc']['$tmp22'] : $Λ[$Λ.length - 1].l;
                $tmp21 = $tmp22 == 2;
                $Γ['global']['calc']['$tmp21'] = sec_lvl('$tmp22', null, true, $Γ['global']['calc']) >= $Λ[$Λ.length - 1].l ? sec_lvl('$tmp22', null, true, $Γ['global']['calc']) : $Λ[$Λ.length - 1].l;
                $Γ['global']['calc']['$tmp21'] instanceof Object ? $Γ['global']['calc']['$tmp21'].Σ = $Γ['global']['calc']['$tmp21'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['calc']['$tmp21'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['calc']['$tmp21'] = $Γ['global']['calc']['$tmp21'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['calc']['$tmp21'] : $Λ[$Λ.length - 1].l;
                $Λ.push({
                    l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp21', null, true, $Γ['global']['calc']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp21', null, true, $Γ['global']['calc']),
                    id: 'IF'
                });
                if ($tmp21) {
                    val[x] = l * r;
                    $scope($Γ['global']['calc'], 'val', false)[x] = sec_lvl('l', null, true, $Γ['global']['calc']) >= sec_lvl('r', null, true, $Γ['global']['calc']) ? sec_lvl('l', null, true, $Γ['global']['calc']) : sec_lvl('r', null, true, $Γ['global']['calc']);
                    _$tmp = sec_lvl('x', null, false, $Γ['global']['calc']) instanceof Object ? sec_lvl('x', null, false, $Γ['global']['calc']).Σ : sec_lvl('x', null, false, $Γ['global']['calc']);
                    $scope($Γ['global']['calc'], 'val', false)[x] instanceof Object ? $scope($Γ['global']['calc'], 'val', false)[x].Σ = $scope($Γ['global']['calc'], 'val', false)[x].Σ : $scope($Γ['global']['calc'], 'val', false)[x] = $scope($Γ['global']['calc'], 'val', false)[x];
                } else {
                    var $tmp23, $tmp24, $tmp25;
                    $Γ['global']['calc']['$tmp25'] = $Γ['global']['calc']['$tmp24'] = $Γ['global']['calc']['$tmp23'] = 0;
                    $tmp24 = !r;
                    $Γ['global']['calc']['$tmp24'] = sec_lvl('r', null, false, $Γ['global']['calc']);
                    $Γ['global']['calc']['$tmp24'] instanceof Object ? $Γ['global']['calc']['$tmp24'].Σ = $Γ['global']['calc']['$tmp24'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['calc']['$tmp24'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['calc']['$tmp24'] = $Γ['global']['calc']['$tmp24'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['calc']['$tmp24'] : $Λ[$Λ.length - 1].l;
                    $tmp25 = l % r;
                    $Γ['global']['calc']['$tmp25'] = sec_lvl('l', null, true, $Γ['global']['calc']) >= sec_lvl('r', null, true, $Γ['global']['calc']) ? sec_lvl('l', null, true, $Γ['global']['calc']) : sec_lvl('r', null, true, $Γ['global']['calc']);
                    $Γ['global']['calc']['$tmp25'] instanceof Object ? $Γ['global']['calc']['$tmp25'].Σ = $Γ['global']['calc']['$tmp25'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['calc']['$tmp25'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['calc']['$tmp25'] = $Γ['global']['calc']['$tmp25'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['calc']['$tmp25'] : $Λ[$Λ.length - 1].l;
                    $tmp23 = $tmp24 || $tmp25;
                    $Γ['global']['calc']['$tmp23'] = sec_lvl('$tmp24', null, true, $Γ['global']['calc']) >= sec_lvl('$tmp25', null, true, $Γ['global']['calc']) ? sec_lvl('$tmp24', null, true, $Γ['global']['calc']) : sec_lvl('$tmp25', null, true, $Γ['global']['calc']);
                    $Γ['global']['calc']['$tmp23'] instanceof Object ? $Γ['global']['calc']['$tmp23'].Σ = $Γ['global']['calc']['$tmp23'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['calc']['$tmp23'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['calc']['$tmp23'] = $Γ['global']['calc']['$tmp23'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['calc']['$tmp23'] : $Λ[$Λ.length - 1].l;
                    $Λ.push({
                        l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp23', null, true, $Γ['global']['calc']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp23', null, true, $Γ['global']['calc']),
                        id: 'IF'
                    });
                    if ($tmp23) {
                        var $tmp26;
                        $Γ['global']['calc']['$tmp26'] = 0;
                        $tmp26 = 0;
                        $Γ['global']['calc']['$tmp26'] = $Λ[$Λ.length - 1].l;
                        return $tmp26;
                        var $shouldComp = { 'lbl': 'FUNC' };
                    } else {
                    }
                    if ($shouldComp)
                        $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
                    $Λ.pop();
                    val[x] = l / r;
                    $scope($Γ['global']['calc'], 'val', false)[x] = sec_lvl('l', null, true, $Γ['global']['calc']) >= sec_lvl('r', null, true, $Γ['global']['calc']) ? sec_lvl('l', null, true, $Γ['global']['calc']) : sec_lvl('r', null, true, $Γ['global']['calc']);
                    _$tmp = sec_lvl('x', null, false, $Γ['global']['calc']) instanceof Object ? sec_lvl('x', null, false, $Γ['global']['calc']).Σ : sec_lvl('x', null, false, $Γ['global']['calc']);
                    $scope($Γ['global']['calc'], 'val', false)[x] instanceof Object ? $scope($Γ['global']['calc'], 'val', false)[x].Σ = $scope($Γ['global']['calc'], 'val', false)[x].Σ : $scope($Γ['global']['calc'], 'val', false)[x] = $scope($Γ['global']['calc'], 'val', false)[x];
                }
                $Λ.pop();
            }
            $Λ.pop();
        }
        $Λ.pop();
        $tmp18 = ++c;
        $Γ['global']['calc']['$tmp18'] = sec_lvl('c', null, false, $Γ['global']['calc']);
        $Γ['global']['calc']['$tmp18'] instanceof Object ? $Γ['global']['calc']['$tmp18'].Σ = $Γ['global']['calc']['$tmp18'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['calc']['$tmp18'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['calc']['$tmp18'] = $Γ['global']['calc']['$tmp18'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['calc']['$tmp18'] : $Λ[$Λ.length - 1].l;
        $tmp12 = c < 3;
        $Γ['global']['calc']['$tmp12'] = sec_lvl('c', null, true, $Γ['global']['calc']) >= $Λ[$Λ.length - 1].l ? sec_lvl('c', null, true, $Γ['global']['calc']) : $Λ[$Λ.length - 1].l;
        $Γ['global']['calc']['$tmp12'] instanceof Object ? $Γ['global']['calc']['$tmp12'].Σ = $Γ['global']['calc']['$tmp12'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['calc']['$tmp12'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['calc']['$tmp12'] = $Γ['global']['calc']['$tmp12'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['calc']['$tmp12'] : $Λ[$Λ.length - 1].l;
    }
    $upgrade([
        'l',
        'r'
    ], $Λ[$Λ.length - 1].l, $Γ['global']['calc']);
    $Λ.pop();
    $tmp14 = -1;
    $Γ['global']['calc']['$tmp14'] = $Λ[$Λ.length - 1].l;
    $Γ['global']['calc']['$tmp14'] instanceof Object ? $Γ['global']['calc']['$tmp14'].Σ = $Γ['global']['calc']['$tmp14'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['calc']['$tmp14'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['calc']['$tmp14'] = $Γ['global']['calc']['$tmp14'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['calc']['$tmp14'] : $Λ[$Λ.length - 1].l;
    $rf = $scope($Γ['global']['calc'], 'getvalue', false)['getvalue'];
    $rf.scope = $Γ['global']['calc'];
    $rf.$this = $Γ['global'];
    $rf['x'] = sec_lvl('$tmp14', null, true, $Γ['global']['calc']) >= $Λ[$Λ.length - 1].l ? sec_lvl('$tmp14', null, true, $Γ['global']['calc']) : $Λ[$Λ.length - 1].l;
    $rf['dir'] = $Λ[$Λ.length - 1].l;
    $Λ.push({
        l: $rf.$fscope,
        id: 'FUNC'
    });
    $tmp13 = getvalue($tmp14, 1);
    $Γ['global']['calc']['$tmp13'] = $Λ.pop().l;
    $Γ['global']['calc']['$tmp13'] instanceof Object ? $Γ['global']['calc']['$tmp13'].Σ = $Γ['global']['calc']['$tmp13'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['calc']['$tmp13'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['calc']['$tmp13'] = $Γ['global']['calc']['$tmp13'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['calc']['$tmp13'] : $Λ[$Λ.length - 1].l;
    return $tmp13;
}
function shuffle(s, n) {
    var x, p, r, t, $tmp27;
    $Γ['global']['shuffle']['$tmp27'] = $Γ['global']['shuffle']['t'] = $Γ['global']['shuffle']['r'] = $Γ['global']['shuffle']['p'] = $Γ['global']['shuffle']['x'] = 0;
    x = n;
    $scope($Γ['global']['shuffle'], 'x', true)['x'] = sec_lvl('n', null, false, $Γ['global']['shuffle']);
    $scope($Γ['global']['shuffle'], 'x', true)['x'] instanceof Object ? $scope($Γ['global']['shuffle'], 'x', true)['x'].Σ = $scope($Γ['global']['shuffle'], 'x', true)['x'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['shuffle'], 'x', true)['x'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['shuffle'], 'x', true)['x'] = $scope($Γ['global']['shuffle'], 'x', true)['x'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['shuffle'], 'x', true)['x'] : $Λ[$Λ.length - 1].l;
    p = eval(s);
    $tmp27 = x--;
    $Γ['global']['shuffle']['$tmp27'] = sec_lvl('x', null, false, $Γ['global']['shuffle']);
    $Γ['global']['shuffle']['$tmp27'] instanceof Object ? $Γ['global']['shuffle']['$tmp27'].Σ = $Γ['global']['shuffle']['$tmp27'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['shuffle']['$tmp27'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['shuffle']['$tmp27'] = $Γ['global']['shuffle']['$tmp27'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['shuffle']['$tmp27'] : $Λ[$Λ.length - 1].l;
    $Λ.push({
        l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp27', null, true, $Γ['global']['shuffle']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp27', null, true, $Γ['global']['shuffle']),
        id: 'LOOP'
    });
    while ($tmp27) {
        $rf = $scope($Γ['global']['shuffle'], 'rnd', false)['rnd'];
        $rf.scope = $Γ['global']['shuffle'];
        $rf.$this = $Γ['global'];
        $rf['n'] = sec_lvl('n', null, true, $Γ['global']['shuffle']) >= $Λ[$Λ.length - 1].l ? sec_lvl('n', null, true, $Γ['global']['shuffle']) : $Λ[$Λ.length - 1].l;
        $Λ.push({
            l: $rf.$fscope,
            id: 'FUNC'
        });
        r = rnd(n);
        $scope($Γ['global']['shuffle'], 'r', true)['r'] = $Λ.pop().l;
        $scope($Γ['global']['shuffle'], 'r', true)['r'] instanceof Object ? $scope($Γ['global']['shuffle'], 'r', true)['r'].Σ = $scope($Γ['global']['shuffle'], 'r', true)['r'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['shuffle'], 'r', true)['r'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['shuffle'], 'r', true)['r'] = $scope($Γ['global']['shuffle'], 'r', true)['r'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['shuffle'], 'r', true)['r'] : $Λ[$Λ.length - 1].l;
        t = p[x];
        $scope($Γ['global']['shuffle'], 't', true)['t'] = sec_lvl('p', x, false, $Γ['global']['shuffle']);
        $scope($Γ['global']['shuffle'], 't', true)['t'] instanceof Object ? $scope($Γ['global']['shuffle'], 't', true)['t'].Σ = $scope($Γ['global']['shuffle'], 't', true)['t'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['shuffle'], 't', true)['t'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['shuffle'], 't', true)['t'] = $scope($Γ['global']['shuffle'], 't', true)['t'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['shuffle'], 't', true)['t'] : $Λ[$Λ.length - 1].l;
        p[x] = p[r];
        $scope($Γ['global']['shuffle'], 'p', false)[x] = sec_lvl('p', r, false, $Γ['global']['shuffle']);
        _$tmp = sec_lvl('x', null, false, $Γ['global']['shuffle']) instanceof Object ? sec_lvl('x', null, false, $Γ['global']['shuffle']).Σ : sec_lvl('x', null, false, $Γ['global']['shuffle']);
        $scope($Γ['global']['shuffle'], 'p', false)[x] instanceof Object ? $scope($Γ['global']['shuffle'], 'p', false)[x].Σ = $scope($Γ['global']['shuffle'], 'p', false)[x].Σ : $scope($Γ['global']['shuffle'], 'p', false)[x] = $scope($Γ['global']['shuffle'], 'p', false)[x];
        p[r] = t;
        $scope($Γ['global']['shuffle'], 'p', false)[r] = sec_lvl('t', null, false, $Γ['global']['shuffle']);
        _$tmp = sec_lvl('r', null, false, $Γ['global']['shuffle']) instanceof Object ? sec_lvl('r', null, false, $Γ['global']['shuffle']).Σ : sec_lvl('r', null, false, $Γ['global']['shuffle']);
        $scope($Γ['global']['shuffle'], 'p', false)[r] instanceof Object ? $scope($Γ['global']['shuffle'], 'p', false)[r].Σ = $scope($Γ['global']['shuffle'], 'p', false)[r].Σ : $scope($Γ['global']['shuffle'], 'p', false)[r] = $scope($Γ['global']['shuffle'], 'p', false)[r];
        var $tmp27;
        $Γ['global']['shuffle']['$tmp27'] = 0;
        $tmp27 = x--;
        $Γ['global']['shuffle']['$tmp27'] = sec_lvl('x', null, false, $Γ['global']['shuffle']);
        $Γ['global']['shuffle']['$tmp27'] instanceof Object ? $Γ['global']['shuffle']['$tmp27'].Σ = $Γ['global']['shuffle']['$tmp27'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['shuffle']['$tmp27'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['shuffle']['$tmp27'] = $Γ['global']['shuffle']['$tmp27'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['shuffle']['$tmp27'] : $Λ[$Λ.length - 1].l;
    }
    $upgrade(['r'], $Λ[$Λ.length - 1].l, $Γ['global']['shuffle']);
    $Λ.pop();
    return;
}
function parenth(n) {
    var $tmp28, $tmp29;
    $Γ['global']['parenth']['$tmp29'] = $Γ['global']['parenth']['$tmp28'] = 0;
    $tmp28 = n > 0;
    $Γ['global']['parenth']['$tmp28'] = sec_lvl('n', null, true, $Γ['global']['parenth']) >= $Λ[$Λ.length - 1].l ? sec_lvl('n', null, true, $Γ['global']['parenth']) : $Λ[$Λ.length - 1].l;
    $Γ['global']['parenth']['$tmp28'] instanceof Object ? $Γ['global']['parenth']['$tmp28'].Σ = $Γ['global']['parenth']['$tmp28'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['parenth']['$tmp28'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['parenth']['$tmp28'] = $Γ['global']['parenth']['$tmp28'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['parenth']['$tmp28'] : $Λ[$Λ.length - 1].l;
    $Λ.push({
        l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp28', null, true, $Γ['global']['parenth']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp28', null, true, $Γ['global']['parenth']),
        id: 'LOOP'
    });
    while ($tmp28) {
        var $tmp30, $tmp28;
        $Γ['global']['parenth']['$tmp28'] = $Γ['global']['parenth']['$tmp30'] = 0;
        $tmp30 = --n;
        $Γ['global']['parenth']['$tmp30'] = sec_lvl('n', null, false, $Γ['global']['parenth']);
        $Γ['global']['parenth']['$tmp30'] instanceof Object ? $Γ['global']['parenth']['$tmp30'].Σ = $Γ['global']['parenth']['$tmp30'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['parenth']['$tmp30'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['parenth']['$tmp30'] = $Γ['global']['parenth']['$tmp30'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['parenth']['$tmp30'] : $Λ[$Λ.length - 1].l;
        out += '(';
        $scope($Γ['global']['parenth'], 'out', true)['out'] = $Λ[$Λ.length - 1].l;
        $tmp28 = n > 0;
        $Γ['global']['parenth']['$tmp28'] = sec_lvl('n', null, true, $Γ['global']['parenth']) >= $Λ[$Λ.length - 1].l ? sec_lvl('n', null, true, $Γ['global']['parenth']) : $Λ[$Λ.length - 1].l;
        $Γ['global']['parenth']['$tmp28'] instanceof Object ? $Γ['global']['parenth']['$tmp28'].Σ = $Γ['global']['parenth']['$tmp28'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['parenth']['$tmp28'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['parenth']['$tmp28'] = $Γ['global']['parenth']['$tmp28'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['parenth']['$tmp28'] : $Λ[$Λ.length - 1].l;
    }
    $Λ.pop();
    ;
    $tmp29 = n < 0;
    $Γ['global']['parenth']['$tmp29'] = sec_lvl('n', null, true, $Γ['global']['parenth']) >= $Λ[$Λ.length - 1].l ? sec_lvl('n', null, true, $Γ['global']['parenth']) : $Λ[$Λ.length - 1].l;
    $Γ['global']['parenth']['$tmp29'] instanceof Object ? $Γ['global']['parenth']['$tmp29'].Σ = $Γ['global']['parenth']['$tmp29'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['parenth']['$tmp29'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['parenth']['$tmp29'] = $Γ['global']['parenth']['$tmp29'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['parenth']['$tmp29'] : $Λ[$Λ.length - 1].l;
    $Λ.push({
        l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp29', null, true, $Γ['global']['parenth']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp29', null, true, $Γ['global']['parenth']),
        id: 'LOOP'
    });
    while ($tmp29) {
        var $tmp31, $tmp29;
        $Γ['global']['parenth']['$tmp29'] = $Γ['global']['parenth']['$tmp31'] = 0;
        $tmp31 = ++n;
        $Γ['global']['parenth']['$tmp31'] = sec_lvl('n', null, false, $Γ['global']['parenth']);
        $Γ['global']['parenth']['$tmp31'] instanceof Object ? $Γ['global']['parenth']['$tmp31'].Σ = $Γ['global']['parenth']['$tmp31'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['parenth']['$tmp31'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['parenth']['$tmp31'] = $Γ['global']['parenth']['$tmp31'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['parenth']['$tmp31'] : $Λ[$Λ.length - 1].l;
        out += ')';
        $scope($Γ['global']['parenth'], 'out', true)['out'] = $Λ[$Λ.length - 1].l;
        $tmp29 = n < 0;
        $Γ['global']['parenth']['$tmp29'] = sec_lvl('n', null, true, $Γ['global']['parenth']) >= $Λ[$Λ.length - 1].l ? sec_lvl('n', null, true, $Γ['global']['parenth']) : $Λ[$Λ.length - 1].l;
        $Γ['global']['parenth']['$tmp29'] instanceof Object ? $Γ['global']['parenth']['$tmp29'].Σ = $Γ['global']['parenth']['$tmp29'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['parenth']['$tmp29'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['parenth']['$tmp29'] = $Γ['global']['parenth']['$tmp29'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['parenth']['$tmp29'] : $Λ[$Λ.length - 1].l;
    }
    $Λ.pop();
    ;
    return;
}
function getpriority(x) {
    var z, $tmp32, $tmp33;
    $Γ['global']['getpriority']['$tmp33'] = $Γ['global']['getpriority']['$tmp32'] = $Γ['global']['getpriority']['z'] = 0;
    z = 3;
    $scope($Γ['global']['getpriority'], 'z', true)['z'] = $Λ[$Λ.length - 1].l;
    $tmp32 = z--;
    $Γ['global']['getpriority']['$tmp32'] = sec_lvl('z', null, false, $Γ['global']['getpriority']);
    $Γ['global']['getpriority']['$tmp32'] instanceof Object ? $Γ['global']['getpriority']['$tmp32'].Σ = $Γ['global']['getpriority']['$tmp32'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['getpriority']['$tmp32'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['getpriority']['$tmp32'] = $Γ['global']['getpriority']['$tmp32'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['getpriority']['$tmp32'] : $Λ[$Λ.length - 1].l;
    $Λ.push({
        l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp32', null, true, $Γ['global']['getpriority']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp32', null, true, $Γ['global']['getpriority']),
        id: 'LOOP'
    });
    for (; $tmp32;) {
        var $tmp34, $tmp35, $tmp32;
        $Γ['global']['getpriority']['$tmp32'] = $Γ['global']['getpriority']['$tmp35'] = $Γ['global']['getpriority']['$tmp34'] = 0;
        $tmp35 = order[z];
        $Γ['global']['getpriority']['$tmp35'] = sec_lvl('order', z, false, $Γ['global']['getpriority']);
        $Γ['global']['getpriority']['$tmp35'] instanceof Object ? $Γ['global']['getpriority']['$tmp35'].Σ = $Γ['global']['getpriority']['$tmp35'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['getpriority']['$tmp35'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['getpriority']['$tmp35'] = $Γ['global']['getpriority']['$tmp35'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['getpriority']['$tmp35'] : $Λ[$Λ.length - 1].l;
        $tmp34 = $tmp35 == x;
        $Γ['global']['getpriority']['$tmp34'] = sec_lvl('$tmp35', null, true, $Γ['global']['getpriority']) >= sec_lvl('x', null, true, $Γ['global']['getpriority']) ? sec_lvl('$tmp35', null, true, $Γ['global']['getpriority']) : sec_lvl('x', null, true, $Γ['global']['getpriority']);
        $Γ['global']['getpriority']['$tmp34'] instanceof Object ? $Γ['global']['getpriority']['$tmp34'].Σ = $Γ['global']['getpriority']['$tmp34'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['getpriority']['$tmp34'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['getpriority']['$tmp34'] = $Γ['global']['getpriority']['$tmp34'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['getpriority']['$tmp34'] : $Λ[$Λ.length - 1].l;
        $Λ.push({
            l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp34', null, true, $Γ['global']['getpriority']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp34', null, true, $Γ['global']['getpriority']),
            id: 'IF'
        });
        if ($tmp34) {
            var $tmp36;
            $Γ['global']['getpriority']['$tmp36'] = 0;
            $tmp36 = 3 - z;
            $Γ['global']['getpriority']['$tmp36'] = $Λ[$Λ.length - 1].l >= sec_lvl('z', null, true, $Γ['global']['getpriority']) ? $Λ[$Λ.length - 1].l : sec_lvl('z', null, true, $Γ['global']['getpriority']);
            $Γ['global']['getpriority']['$tmp36'] instanceof Object ? $Γ['global']['getpriority']['$tmp36'].Σ = $Γ['global']['getpriority']['$tmp36'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['getpriority']['$tmp36'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['getpriority']['$tmp36'] = $Γ['global']['getpriority']['$tmp36'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['getpriority']['$tmp36'] : $Λ[$Λ.length - 1].l;
            return $tmp36;
            var $shouldComp = { 'lbl': 'FUNC' };
        } else {
        }
        if ($shouldComp)
            $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
        $Λ.pop();
        $tmp32 = z--;
        $Γ['global']['getpriority']['$tmp32'] = sec_lvl('z', null, false, $Γ['global']['getpriority']);
        $Γ['global']['getpriority']['$tmp32'] instanceof Object ? $Γ['global']['getpriority']['$tmp32'].Σ = $Γ['global']['getpriority']['$tmp32'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['getpriority']['$tmp32'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['getpriority']['$tmp32'] = $Γ['global']['getpriority']['$tmp32'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['getpriority']['$tmp32'] : $Λ[$Λ.length - 1].l;
    }
    $Λ.pop();
    $tmp33 = 0;
    $Γ['global']['getpriority']['$tmp33'] = $Λ[$Λ.length - 1].l;
    return $tmp33;
}
function showsolution() {
    var x, p, lp, v, $tmp37, $tmp38, $tmp39, $tmp40;
    $Γ['global']['showsolution']['$tmp40'] = $Γ['global']['showsolution']['$tmp39'] = $Γ['global']['showsolution']['$tmp38'] = $Γ['global']['showsolution']['$tmp37'] = $Γ['global']['showsolution']['v'] = $Γ['global']['showsolution']['lp'] = $Γ['global']['showsolution']['p'] = $Γ['global']['showsolution']['x'] = 0;
    x = 0;
    $scope($Γ['global']['showsolution'], 'x', true)['x'] = $Λ[$Λ.length - 1].l;
    p = 0;
    $scope($Γ['global']['showsolution'], 'p', true)['p'] = $Λ[$Λ.length - 1].l;
    lp = 0;
    $scope($Γ['global']['showsolution'], 'lp', true)['lp'] = $Λ[$Λ.length - 1].l;
    v = 0;
    $scope($Γ['global']['showsolution'], 'v', true)['v'] = $Λ[$Λ.length - 1].l;
    $tmp37 = x < 4;
    $Γ['global']['showsolution']['$tmp37'] = sec_lvl('x', null, true, $Γ['global']['showsolution']) >= $Λ[$Λ.length - 1].l ? sec_lvl('x', null, true, $Γ['global']['showsolution']) : $Λ[$Λ.length - 1].l;
    $Γ['global']['showsolution']['$tmp37'] instanceof Object ? $Γ['global']['showsolution']['$tmp37'].Σ = $Γ['global']['showsolution']['$tmp37'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['showsolution']['$tmp37'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['showsolution']['$tmp37'] = $Γ['global']['showsolution']['$tmp37'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['showsolution']['$tmp37'] : $Λ[$Λ.length - 1].l;
    $Λ.push({
        l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp37', null, true, $Γ['global']['showsolution']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp37', null, true, $Γ['global']['showsolution']),
        id: 'LOOP'
    });
    while ($tmp37) {
        var $tmp41, $tmp42, $tmp43, $tmp37;
        $Γ['global']['showsolution']['$tmp37'] = $Γ['global']['showsolution']['$tmp43'] = $Γ['global']['showsolution']['$tmp42'] = $Γ['global']['showsolution']['$tmp41'] = 0;
        $tmp41 = x < 3;
        $Γ['global']['showsolution']['$tmp41'] = sec_lvl('x', null, true, $Γ['global']['showsolution']) >= $Λ[$Λ.length - 1].l ? sec_lvl('x', null, true, $Γ['global']['showsolution']) : $Λ[$Λ.length - 1].l;
        $Γ['global']['showsolution']['$tmp41'] instanceof Object ? $Γ['global']['showsolution']['$tmp41'].Σ = $Γ['global']['showsolution']['$tmp41'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['showsolution']['$tmp41'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['showsolution']['$tmp41'] = $Γ['global']['showsolution']['$tmp41'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['showsolution']['$tmp41'] : $Λ[$Λ.length - 1].l;
        $Λ.push({
            l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp41', null, true, $Γ['global']['showsolution']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp41', null, true, $Γ['global']['showsolution']),
            id: 'IF'
        });
        if ($tmp41) {
            lp = p;
            $scope($Γ['global']['showsolution'], 'lp', true)['lp'] = sec_lvl('p', null, false, $Γ['global']['showsolution']);
            $scope($Γ['global']['showsolution'], 'lp', true)['lp'] instanceof Object ? $scope($Γ['global']['showsolution'], 'lp', true)['lp'].Σ = $scope($Γ['global']['showsolution'], 'lp', true)['lp'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['showsolution'], 'lp', true)['lp'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['showsolution'], 'lp', true)['lp'] = $scope($Γ['global']['showsolution'], 'lp', true)['lp'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['showsolution'], 'lp', true)['lp'] : $Λ[$Λ.length - 1].l;
            $rf = $scope($Γ['global']['showsolution'], 'getpriority', false)['getpriority'];
            $rf.scope = $Γ['global']['showsolution'];
            $rf.$this = $Γ['global'];
            $rf['x'] = sec_lvl('x', null, true, $Γ['global']['showsolution']) >= $Λ[$Λ.length - 1].l ? sec_lvl('x', null, true, $Γ['global']['showsolution']) : $Λ[$Λ.length - 1].l;
            $Λ.push({
                l: $rf.$fscope,
                id: 'FUNC'
            });
            p = getpriority(x);
            $scope($Γ['global']['showsolution'], 'p', true)['p'] = $Λ.pop().l;
            $scope($Γ['global']['showsolution'], 'p', true)['p'] instanceof Object ? $scope($Γ['global']['showsolution'], 'p', true)['p'].Σ = $scope($Γ['global']['showsolution'], 'p', true)['p'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['showsolution'], 'p', true)['p'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['showsolution'], 'p', true)['p'] = $scope($Γ['global']['showsolution'], 'p', true)['p'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['showsolution'], 'p', true)['p'] : $Λ[$Λ.length - 1].l;
            v = p - lp;
            $scope($Γ['global']['showsolution'], 'v', true)['v'] = sec_lvl('p', null, true, $Γ['global']['showsolution']) >= sec_lvl('lp', null, true, $Γ['global']['showsolution']) ? sec_lvl('p', null, true, $Γ['global']['showsolution']) : sec_lvl('lp', null, true, $Γ['global']['showsolution']);
            $scope($Γ['global']['showsolution'], 'v', true)['v'] instanceof Object ? $scope($Γ['global']['showsolution'], 'v', true)['v'].Σ = $scope($Γ['global']['showsolution'], 'v', true)['v'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['showsolution'], 'v', true)['v'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['showsolution'], 'v', true)['v'] = $scope($Γ['global']['showsolution'], 'v', true)['v'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['showsolution'], 'v', true)['v'] : $Λ[$Λ.length - 1].l;
            var $tmp44;
            $Γ['global']['showsolution']['$tmp44'] = 0;
            $tmp44 = v > 0;
            $Γ['global']['showsolution']['$tmp44'] = sec_lvl('v', null, true, $Γ['global']['showsolution']) >= $Λ[$Λ.length - 1].l ? sec_lvl('v', null, true, $Γ['global']['showsolution']) : $Λ[$Λ.length - 1].l;
            $Γ['global']['showsolution']['$tmp44'] instanceof Object ? $Γ['global']['showsolution']['$tmp44'].Σ = $Γ['global']['showsolution']['$tmp44'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['showsolution']['$tmp44'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['showsolution']['$tmp44'] = $Γ['global']['showsolution']['$tmp44'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['showsolution']['$tmp44'] : $Λ[$Λ.length - 1].l;
            $Λ.push({
                l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp44', null, true, $Γ['global']['showsolution']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp44', null, true, $Γ['global']['showsolution']),
                id: 'IF'
            });
            if ($tmp44) {
                var $tmp45;
                $Γ['global']['showsolution']['$tmp45'] = 0;
                $rf = $scope($Γ['global']['showsolution'], 'parenth', false)['parenth'];
                $rf.scope = $Γ['global']['showsolution'];
                $rf.$this = $Γ['global'];
                $rf['n'] = sec_lvl('v', null, true, $Γ['global']['showsolution']) >= $Λ[$Λ.length - 1].l ? sec_lvl('v', null, true, $Γ['global']['showsolution']) : $Λ[$Λ.length - 1].l;
                $Λ.push({
                    l: $rf.$fscope,
                    id: 'FUNC'
                });
                $tmp45 = parenth(v);
                $Γ['global']['showsolution']['$tmp45'] = $Λ.pop().l;
                $Γ['global']['showsolution']['$tmp45'] instanceof Object ? $Γ['global']['showsolution']['$tmp45'].Σ = $Γ['global']['showsolution']['$tmp45'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['showsolution']['$tmp45'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['showsolution']['$tmp45'] = $Γ['global']['showsolution']['$tmp45'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['showsolution']['$tmp45'] : $Λ[$Λ.length - 1].l;
            } else {
                $upgrade(['$tmp45'], $Λ[$Λ.length - 1].l, $Γ['global']['showsolution']);
            }
            $Λ.pop();
        } else {
            $upgrade([
                'p',
                '$tmp45'
            ], $Λ[$Λ.length - 1].l, $Γ['global']['showsolution']);
        }
        $Λ.pop();
        out += ar[x];
        $scope($Γ['global']['showsolution'], 'out', true)['out'] = sec_lvl('ar', x, false, $Γ['global']['showsolution']);
        $scope($Γ['global']['showsolution'], 'out', true)['out'] instanceof Object ? $scope($Γ['global']['showsolution'], 'out', true)['out'].Σ = $scope($Γ['global']['showsolution'], 'out', true)['out'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['showsolution'], 'out', true)['out'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['showsolution'], 'out', true)['out'] = $scope($Γ['global']['showsolution'], 'out', true)['out'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['showsolution'], 'out', true)['out'] : $Λ[$Λ.length - 1].l;
        $tmp42 = x < 3;
        $Γ['global']['showsolution']['$tmp42'] = sec_lvl('x', null, true, $Γ['global']['showsolution']) >= $Λ[$Λ.length - 1].l ? sec_lvl('x', null, true, $Γ['global']['showsolution']) : $Λ[$Λ.length - 1].l;
        $Γ['global']['showsolution']['$tmp42'] instanceof Object ? $Γ['global']['showsolution']['$tmp42'].Σ = $Γ['global']['showsolution']['$tmp42'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['showsolution']['$tmp42'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['showsolution']['$tmp42'] = $Γ['global']['showsolution']['$tmp42'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['showsolution']['$tmp42'] : $Λ[$Λ.length - 1].l;
        $Λ.push({
            l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp42', null, true, $Γ['global']['showsolution']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp42', null, true, $Γ['global']['showsolution']),
            id: 'IF'
        });
        if ($tmp42) {
            var $tmp46, $tmp47;
            $Γ['global']['showsolution']['$tmp47'] = $Γ['global']['showsolution']['$tmp46'] = 0;
            $tmp46 = v < 0;
            $Γ['global']['showsolution']['$tmp46'] = sec_lvl('v', null, true, $Γ['global']['showsolution']) >= $Λ[$Λ.length - 1].l ? sec_lvl('v', null, true, $Γ['global']['showsolution']) : $Λ[$Λ.length - 1].l;
            $Γ['global']['showsolution']['$tmp46'] instanceof Object ? $Γ['global']['showsolution']['$tmp46'].Σ = $Γ['global']['showsolution']['$tmp46'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['showsolution']['$tmp46'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['showsolution']['$tmp46'] = $Γ['global']['showsolution']['$tmp46'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['showsolution']['$tmp46'] : $Λ[$Λ.length - 1].l;
            $Λ.push({
                l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp46', null, true, $Γ['global']['showsolution']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp46', null, true, $Γ['global']['showsolution']),
                id: 'IF'
            });
            if ($tmp46) {
                var $tmp48;
                $Γ['global']['showsolution']['$tmp48'] = 0;
                $rf = $scope($Γ['global']['showsolution'], 'parenth', false)['parenth'];
                $rf.scope = $Γ['global']['showsolution'];
                $rf.$this = $Γ['global'];
                $rf['n'] = sec_lvl('v', null, true, $Γ['global']['showsolution']) >= $Λ[$Λ.length - 1].l ? sec_lvl('v', null, true, $Γ['global']['showsolution']) : $Λ[$Λ.length - 1].l;
                $Λ.push({
                    l: $rf.$fscope,
                    id: 'FUNC'
                });
                $tmp48 = parenth(v);
                $Γ['global']['showsolution']['$tmp48'] = $Λ.pop().l;
                $Γ['global']['showsolution']['$tmp48'] instanceof Object ? $Γ['global']['showsolution']['$tmp48'].Σ = $Γ['global']['showsolution']['$tmp48'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['showsolution']['$tmp48'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['showsolution']['$tmp48'] = $Γ['global']['showsolution']['$tmp48'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['showsolution']['$tmp48'] : $Λ[$Λ.length - 1].l;
            } else {
                $upgrade(['$tmp48'], $Λ[$Λ.length - 1].l, $Γ['global']['showsolution']);
            }
            $Λ.pop();
            $tmp47 = op[x];
            $Γ['global']['showsolution']['$tmp47'] = sec_lvl('op', x, false, $Γ['global']['showsolution']);
            $Γ['global']['showsolution']['$tmp47'] instanceof Object ? $Γ['global']['showsolution']['$tmp47'].Σ = $Γ['global']['showsolution']['$tmp47'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['showsolution']['$tmp47'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['showsolution']['$tmp47'] = $Γ['global']['showsolution']['$tmp47'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['showsolution']['$tmp47'] : $Λ[$Λ.length - 1].l;
            out += oper.charAt($tmp47);
        } else {
            $upgrade([
                '$tmp48',
                'out'
            ], $Λ[$Λ.length - 1].l, $Γ['global']['showsolution']);
        }
        $Λ.pop();
        $tmp43 = ++x;
        $Γ['global']['showsolution']['$tmp43'] = sec_lvl('x', null, false, $Γ['global']['showsolution']);
        $Γ['global']['showsolution']['$tmp43'] instanceof Object ? $Γ['global']['showsolution']['$tmp43'].Σ = $Γ['global']['showsolution']['$tmp43'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['showsolution']['$tmp43'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['showsolution']['$tmp43'] = $Γ['global']['showsolution']['$tmp43'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['showsolution']['$tmp43'] : $Λ[$Λ.length - 1].l;
        $tmp37 = x < 4;
        $Γ['global']['showsolution']['$tmp37'] = sec_lvl('x', null, true, $Γ['global']['showsolution']) >= $Λ[$Λ.length - 1].l ? sec_lvl('x', null, true, $Γ['global']['showsolution']) : $Λ[$Λ.length - 1].l;
        $Γ['global']['showsolution']['$tmp37'] instanceof Object ? $Γ['global']['showsolution']['$tmp37'].Σ = $Γ['global']['showsolution']['$tmp37'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['showsolution']['$tmp37'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['showsolution']['$tmp37'] = $Γ['global']['showsolution']['$tmp37'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['showsolution']['$tmp37'] : $Λ[$Λ.length - 1].l;
    }
    $upgrade([
        'p',
        '$tmp45',
        '$tmp48',
        'out'
    ], $Λ[$Λ.length - 1].l, $Γ['global']['showsolution']);
    $Λ.pop();
    $tmp39 = -p;
    $Γ['global']['showsolution']['$tmp39'] = sec_lvl('p', null, false, $Γ['global']['showsolution']);
    $Γ['global']['showsolution']['$tmp39'] instanceof Object ? $Γ['global']['showsolution']['$tmp39'].Σ = $Γ['global']['showsolution']['$tmp39'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['showsolution']['$tmp39'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['showsolution']['$tmp39'] = $Γ['global']['showsolution']['$tmp39'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['showsolution']['$tmp39'] : $Λ[$Λ.length - 1].l;
    $rf = $scope($Γ['global']['showsolution'], 'parenth', false)['parenth'];
    $rf.scope = $Γ['global']['showsolution'];
    $rf.$this = $Γ['global'];
    $rf['n'] = sec_lvl('$tmp39', null, true, $Γ['global']['showsolution']) >= $Λ[$Λ.length - 1].l ? sec_lvl('$tmp39', null, true, $Γ['global']['showsolution']) : $Λ[$Λ.length - 1].l;
    $Λ.push({
        l: $rf.$fscope,
        id: 'FUNC'
    });
    $tmp38 = parenth($tmp39);
    $Γ['global']['showsolution']['$tmp38'] = $Λ.pop().l;
    $Γ['global']['showsolution']['$tmp38'] instanceof Object ? $Γ['global']['showsolution']['$tmp38'].Σ = $Γ['global']['showsolution']['$tmp38'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['showsolution']['$tmp38'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['showsolution']['$tmp38'] = $Γ['global']['showsolution']['$tmp38'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['showsolution']['$tmp38'] : $Λ[$Λ.length - 1].l;
    $rf = $scope($Γ['global']['showsolution'], 'say', false)['say'];
    $rf.scope = $Γ['global']['showsolution'];
    $rf.$this = $Γ['global'];
    $rf['s'] = sec_lvl('out', null, true, $Γ['global']['showsolution']) >= $Λ[$Λ.length - 1].l ? sec_lvl('out', null, true, $Γ['global']['showsolution']) : $Λ[$Λ.length - 1].l;
    $Λ.push({
        l: $rf.$fscope,
        id: 'FUNC'
    });
    $tmp40 = say(out);
    $Γ['global']['showsolution']['$tmp40'] = $Λ.pop().l;
    $Γ['global']['showsolution']['$tmp40'] instanceof Object ? $Γ['global']['showsolution']['$tmp40'].Σ = $Γ['global']['showsolution']['$tmp40'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['showsolution']['$tmp40'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['showsolution']['$tmp40'] = $Γ['global']['showsolution']['$tmp40'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['showsolution']['$tmp40'] : $Λ[$Λ.length - 1].l;
    return;
}
function solve24(s) {
    var z, r, $tmp49, $tmp50, $tmp51;
    $Γ['global']['solve24']['$tmp51'] = $Γ['global']['solve24']['$tmp50'] = $Γ['global']['solve24']['$tmp49'] = $Γ['global']['solve24']['r'] = $Γ['global']['solve24']['z'] = 0;
    z = 4;
    $scope($Γ['global']['solve24'], 'z', true)['z'] = $Λ[$Λ.length - 1].l;
    $tmp49 = z--;
    $Γ['global']['solve24']['$tmp49'] = sec_lvl('z', null, false, $Γ['global']['solve24']);
    $Γ['global']['solve24']['$tmp49'] instanceof Object ? $Γ['global']['solve24']['$tmp49'].Σ = $Γ['global']['solve24']['$tmp49'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['solve24']['$tmp49'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['solve24']['$tmp49'] = $Γ['global']['solve24']['$tmp49'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['solve24']['$tmp49'] : $Λ[$Λ.length - 1].l;
    $Λ.push({
        l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp49', null, true, $Γ['global']['solve24']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp49', null, true, $Γ['global']['solve24']),
        id: 'LOOP'
    });
    while ($tmp49) {
        var $tmp52, $tmp49;
        $Γ['global']['solve24']['$tmp49'] = $Γ['global']['solve24']['$tmp52'] = 0;
        $tmp52 = s.charCodeAt(z);
        ar[z] = $tmp52 - 48;
        $scope($Γ['global']['solve24'], 'ar', false)[z] = sec_lvl('$tmp52', null, true, $Γ['global']['solve24']) >= $Λ[$Λ.length - 1].l ? sec_lvl('$tmp52', null, true, $Γ['global']['solve24']) : $Λ[$Λ.length - 1].l;
        _$tmp = sec_lvl('z', null, false, $Γ['global']['solve24']) instanceof Object ? sec_lvl('z', null, false, $Γ['global']['solve24']).Σ : sec_lvl('z', null, false, $Γ['global']['solve24']);
        $scope($Γ['global']['solve24'], 'ar', false)[z] instanceof Object ? $scope($Γ['global']['solve24'], 'ar', false)[z].Σ = $scope($Γ['global']['solve24'], 'ar', false)[z].Σ : $scope($Γ['global']['solve24'], 'ar', false)[z] = $scope($Γ['global']['solve24'], 'ar', false)[z];
        $tmp49 = z--;
        $Γ['global']['solve24']['$tmp49'] = sec_lvl('z', null, false, $Γ['global']['solve24']);
        $Γ['global']['solve24']['$tmp49'] instanceof Object ? $Γ['global']['solve24']['$tmp49'].Σ = $Γ['global']['solve24']['$tmp49'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['solve24']['$tmp49'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['solve24']['$tmp49'] = $Γ['global']['solve24']['$tmp49'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['solve24']['$tmp49'] : $Λ[$Λ.length - 1].l;
    }
    $upgrade(['$tmp52'], $Λ[$Λ.length - 1].l, $Γ['global']['solve24']);
    $Λ.pop();
    out = '';
    $scope($Γ['global']['solve24'], 'out', true)['out'] = $Λ[$Λ.length - 1].l;
    z = 100000;
    $scope($Γ['global']['solve24'], 'z', true)['z'] = $Λ[$Λ.length - 1].l;
    $tmp50 = z;
    $Γ['global']['solve24']['$tmp50'] = sec_lvl('z', null, false, $Γ['global']['solve24']);
    $Γ['global']['solve24']['$tmp50'] instanceof Object ? $Γ['global']['solve24']['$tmp50'].Σ = $Γ['global']['solve24']['$tmp50'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['solve24']['$tmp50'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['solve24']['$tmp50'] = $Γ['global']['solve24']['$tmp50'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['solve24']['$tmp50'] : $Λ[$Λ.length - 1].l;
    $tmp51 = z--;
    $Γ['global']['solve24']['$tmp51'] = sec_lvl('z', null, false, $Γ['global']['solve24']);
    $Γ['global']['solve24']['$tmp51'] instanceof Object ? $Γ['global']['solve24']['$tmp51'].Σ = $Γ['global']['solve24']['$tmp51'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['solve24']['$tmp51'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['solve24']['$tmp51'] = $Γ['global']['solve24']['$tmp51'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['solve24']['$tmp51'] : $Λ[$Λ.length - 1].l;
    $Λ.push({
        l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp51', null, true, $Γ['global']['solve24']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp51', null, true, $Γ['global']['solve24']),
        id: 'LOOP'
    });
    for (; $tmp51;) {
        $rf = $scope($Γ['global']['solve24'], 'rnd', false)['rnd'];
        $rf.scope = $Γ['global']['solve24'];
        $rf.$this = $Γ['global'];
        $rf['n'] = $Λ[$Λ.length - 1].l;
        $Λ.push({
            l: $rf.$fscope,
            id: 'FUNC'
        });
        r = rnd(256);
        $scope($Γ['global']['solve24'], 'r', true)['r'] = $Λ.pop().l;
        $scope($Γ['global']['solve24'], 'r', true)['r'] instanceof Object ? $scope($Γ['global']['solve24'], 'r', true)['r'].Σ = $scope($Γ['global']['solve24'], 'r', true)['r'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['solve24'], 'r', true)['r'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['solve24'], 'r', true)['r'] = $scope($Γ['global']['solve24'], 'r', true)['r'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['solve24'], 'r', true)['r'] : $Λ[$Λ.length - 1].l;
        op[0] = r & 3;
        $scope($Γ['global']['solve24'], 'op', false)[0] = sec_lvl('r', null, true, $Γ['global']['solve24']) >= $Λ[$Λ.length - 1].l ? sec_lvl('r', null, true, $Γ['global']['solve24']) : $Λ[$Λ.length - 1].l;
        _$tmp = sec_lvl('0', null, false, $Γ['global']['solve24']) instanceof Object ? sec_lvl('0', null, false, $Γ['global']['solve24']).Σ : sec_lvl('0', null, false, $Γ['global']['solve24']);
        $scope($Γ['global']['solve24'], 'op', false)[0] instanceof Object ? $scope($Γ['global']['solve24'], 'op', false)[0].Σ = $scope($Γ['global']['solve24'], 'op', false)[0].Σ : $scope($Γ['global']['solve24'], 'op', false)[0] = $scope($Γ['global']['solve24'], 'op', false)[0];
        var $tmp53, $tmp54, $tmp55, $tmp56, $tmp57, $tmp58, $tmp59, $tmp51;
        $Γ['global']['solve24']['$tmp51'] = $Γ['global']['solve24']['$tmp59'] = $Γ['global']['solve24']['$tmp58'] = $Γ['global']['solve24']['$tmp57'] = $Γ['global']['solve24']['$tmp56'] = $Γ['global']['solve24']['$tmp55'] = $Γ['global']['solve24']['$tmp54'] = $Γ['global']['solve24']['$tmp53'] = 0;
        $tmp53 = r >> 2;
        $Γ['global']['solve24']['$tmp53'] = sec_lvl('r', null, true, $Γ['global']['solve24']) >= $Λ[$Λ.length - 1].l ? sec_lvl('r', null, true, $Γ['global']['solve24']) : $Λ[$Λ.length - 1].l;
        $Γ['global']['solve24']['$tmp53'] instanceof Object ? $Γ['global']['solve24']['$tmp53'].Σ = $Γ['global']['solve24']['$tmp53'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['solve24']['$tmp53'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['solve24']['$tmp53'] = $Γ['global']['solve24']['$tmp53'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['solve24']['$tmp53'] : $Λ[$Λ.length - 1].l;
        op[1] = $tmp53 & 3;
        $scope($Γ['global']['solve24'], 'op', false)[1] = sec_lvl('$tmp53', null, true, $Γ['global']['solve24']) >= $Λ[$Λ.length - 1].l ? sec_lvl('$tmp53', null, true, $Γ['global']['solve24']) : $Λ[$Λ.length - 1].l;
        _$tmp = sec_lvl('1', null, false, $Γ['global']['solve24']) instanceof Object ? sec_lvl('1', null, false, $Γ['global']['solve24']).Σ : sec_lvl('1', null, false, $Γ['global']['solve24']);
        $scope($Γ['global']['solve24'], 'op', false)[1] instanceof Object ? $scope($Γ['global']['solve24'], 'op', false)[1].Σ = $scope($Γ['global']['solve24'], 'op', false)[1].Σ : $scope($Γ['global']['solve24'], 'op', false)[1] = $scope($Γ['global']['solve24'], 'op', false)[1];
        $tmp54 = r >> 4;
        $Γ['global']['solve24']['$tmp54'] = sec_lvl('r', null, true, $Γ['global']['solve24']) >= $Λ[$Λ.length - 1].l ? sec_lvl('r', null, true, $Γ['global']['solve24']) : $Λ[$Λ.length - 1].l;
        $Γ['global']['solve24']['$tmp54'] instanceof Object ? $Γ['global']['solve24']['$tmp54'].Σ = $Γ['global']['solve24']['$tmp54'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['solve24']['$tmp54'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['solve24']['$tmp54'] = $Γ['global']['solve24']['$tmp54'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['solve24']['$tmp54'] : $Λ[$Λ.length - 1].l;
        op[2] = $tmp54 & 3;
        $scope($Γ['global']['solve24'], 'op', false)[2] = sec_lvl('$tmp54', null, true, $Γ['global']['solve24']) >= $Λ[$Λ.length - 1].l ? sec_lvl('$tmp54', null, true, $Γ['global']['solve24']) : $Λ[$Λ.length - 1].l;
        _$tmp = sec_lvl('2', null, false, $Γ['global']['solve24']) instanceof Object ? sec_lvl('2', null, false, $Γ['global']['solve24']).Σ : sec_lvl('2', null, false, $Γ['global']['solve24']);
        $scope($Γ['global']['solve24'], 'op', false)[2] instanceof Object ? $scope($Γ['global']['solve24'], 'op', false)[2].Σ = $scope($Γ['global']['solve24'], 'op', false)[2].Σ : $scope($Γ['global']['solve24'], 'op', false)[2] = $scope($Γ['global']['solve24'], 'op', false)[2];
        $rf = $scope($Γ['global']['solve24'], 'shuffle', false)['shuffle'];
        $rf.scope = $Γ['global']['solve24'];
        $rf.$this = $Γ['global'];
        $rf['s'] = $Λ[$Λ.length - 1].l;
        $rf['n'] = $Λ[$Λ.length - 1].l;
        $Λ.push({
            l: $rf.$fscope,
            id: 'FUNC'
        });
        $tmp55 = shuffle('ar', 4);
        $Γ['global']['solve24']['$tmp55'] = $Λ.pop().l;
        $Γ['global']['solve24']['$tmp55'] instanceof Object ? $Γ['global']['solve24']['$tmp55'].Σ = $Γ['global']['solve24']['$tmp55'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['solve24']['$tmp55'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['solve24']['$tmp55'] = $Γ['global']['solve24']['$tmp55'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['solve24']['$tmp55'] : $Λ[$Λ.length - 1].l;
        $rf = $scope($Γ['global']['solve24'], 'shuffle', false)['shuffle'];
        $rf.scope = $Γ['global']['solve24'];
        $rf.$this = $Γ['global'];
        $rf['s'] = $Λ[$Λ.length - 1].l;
        $rf['n'] = $Λ[$Λ.length - 1].l;
        $Λ.push({
            l: $rf.$fscope,
            id: 'FUNC'
        });
        $tmp56 = shuffle('order', 3);
        $Γ['global']['solve24']['$tmp56'] = $Λ.pop().l;
        $Γ['global']['solve24']['$tmp56'] instanceof Object ? $Γ['global']['solve24']['$tmp56'].Σ = $Γ['global']['solve24']['$tmp56'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['solve24']['$tmp56'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['solve24']['$tmp56'] = $Γ['global']['solve24']['$tmp56'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['solve24']['$tmp56'] : $Λ[$Λ.length - 1].l;
        $rf = $scope($Γ['global']['solve24'], 'calc', false)['calc'];
        $rf.scope = $Γ['global']['solve24'];
        $rf.$this = $Γ['global'];
        $Λ.push({
            l: $rf.$fscope,
            id: 'FUNC'
        });
        $tmp58 = calc();
        $Γ['global']['solve24']['$tmp58'] = $Λ.pop().l;
        $Γ['global']['solve24']['$tmp58'] instanceof Object ? $Γ['global']['solve24']['$tmp58'].Σ = $Γ['global']['solve24']['$tmp58'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['solve24']['$tmp58'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['solve24']['$tmp58'] = $Γ['global']['solve24']['$tmp58'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['solve24']['$tmp58'] : $Λ[$Λ.length - 1].l;
        $tmp57 = $tmp58 != 24;
        $Γ['global']['solve24']['$tmp57'] = sec_lvl('$tmp58', null, true, $Γ['global']['solve24']) >= $Λ[$Λ.length - 1].l ? sec_lvl('$tmp58', null, true, $Γ['global']['solve24']) : $Λ[$Λ.length - 1].l;
        $Γ['global']['solve24']['$tmp57'] instanceof Object ? $Γ['global']['solve24']['$tmp57'].Σ = $Γ['global']['solve24']['$tmp57'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['solve24']['$tmp57'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['solve24']['$tmp57'] = $Γ['global']['solve24']['$tmp57'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['solve24']['$tmp57'] : $Λ[$Λ.length - 1].l;
        $Λ.push({
            l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp57', null, true, $Γ['global']['solve24']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp57', null, true, $Γ['global']['solve24']),
            id: 'IF'
        });
        if ($tmp57) {
            var $tmp51;
            $Γ['global']['solve24']['$tmp51'] = 0;
            $tmp51 = z--;
            $Γ['global']['solve24']['$tmp51'] = sec_lvl('z', null, false, $Γ['global']['solve24']);
            $Γ['global']['solve24']['$tmp51'] instanceof Object ? $Γ['global']['solve24']['$tmp51'].Σ = $Γ['global']['solve24']['$tmp51'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['solve24']['$tmp51'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['solve24']['$tmp51'] = $Γ['global']['solve24']['$tmp51'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['solve24']['$tmp51'] : $Λ[$Λ.length - 1].l;
            continue;
            var $shouldComp = { 'lbl': 'LOOP' };
        } else {
        }
        if ($shouldComp)
            $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
        $Λ.pop();
        $rf = $scope($Γ['global']['solve24'], 'showsolution', false)['showsolution'];
        $rf.scope = $Γ['global']['solve24'];
        $rf.$this = $Γ['global'];
        $Λ.push({
            l: $rf.$fscope,
            id: 'FUNC'
        });
        $tmp59 = showsolution();
        $Γ['global']['solve24']['$tmp59'] = $Λ.pop().l;
        $Γ['global']['solve24']['$tmp59'] instanceof Object ? $Γ['global']['solve24']['$tmp59'].Σ = $Γ['global']['solve24']['$tmp59'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['solve24']['$tmp59'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['solve24']['$tmp59'] = $Γ['global']['solve24']['$tmp59'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['solve24']['$tmp59'] : $Λ[$Λ.length - 1].l;
        break;
        $tmp51 = z--;
        $Γ['global']['solve24']['$tmp51'] = sec_lvl('z', null, false, $Γ['global']['solve24']);
        $Γ['global']['solve24']['$tmp51'] instanceof Object ? $Γ['global']['solve24']['$tmp51'].Σ = $Γ['global']['solve24']['$tmp51'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['solve24']['$tmp51'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['solve24']['$tmp51'] = $Γ['global']['solve24']['$tmp51'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['solve24']['$tmp51'] : $Λ[$Λ.length - 1].l;
        var $shouldComp = { 'lbl': 'LOOP' };
    }
    $upgrade([
        'r',
        '$tmp55',
        '$tmp56',
        '$tmp58',
        '$tmp59'
    ], $Λ[$Λ.length - 1].l, $Γ['global']['solve24']);
    if ($shouldComp)
        $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
    $Λ.pop();
    return;
}
$rf = $scope($Γ['global'], 'solve24', false)['solve24'];
$rf.scope = $Γ['global'];
$rf.$this = $Γ['global'];
$rf['s'] = $Λ[$Λ.length - 1].l;
$Λ.push({
    l: $rf.$fscope,
    id: 'FUNC'
});
$tmp0 = solve24('1234');
$Γ['global']['$tmp0'] = $Λ.pop().l;
$Γ['global']['$tmp0'] instanceof Object ? $Γ['global']['$tmp0'].Σ = $Γ['global']['$tmp0'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0'] = $Γ['global']['$tmp0'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0'] : $Λ[$Λ.length - 1].l;
$rf = $scope($Γ['global'], 'solve24', false)['solve24'];
$rf.scope = $Γ['global'];
$rf.$this = $Γ['global'];
$rf['s'] = $Λ[$Λ.length - 1].l;
$Λ.push({
    l: $rf.$fscope,
    id: 'FUNC'
});
$tmp1 = solve24('6789');
$Γ['global']['$tmp1'] = $Λ.pop().l;
$Γ['global']['$tmp1'] instanceof Object ? $Γ['global']['$tmp1'].Σ = $Γ['global']['$tmp1'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp1'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp1'] = $Γ['global']['$tmp1'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp1'] : $Λ[$Λ.length - 1].l;
$rf = $scope($Γ['global'], 'solve24', false)['solve24'];
$rf.scope = $Γ['global'];
$rf.$this = $Γ['global'];
$rf['s'] = $Λ[$Λ.length - 1].l;
$Λ.push({
    l: $rf.$fscope,
    id: 'FUNC'
});
$tmp2 = solve24('1127');
$Γ['global']['$tmp2'] = $Λ.pop().l;
$Γ['global']['$tmp2'] instanceof Object ? $Γ['global']['$tmp2'].Σ = $Γ['global']['$tmp2'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp2'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp2'] = $Γ['global']['$tmp2'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp2'] : $Λ[$Λ.length - 1].l;