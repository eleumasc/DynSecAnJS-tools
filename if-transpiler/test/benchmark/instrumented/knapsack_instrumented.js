
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

$Γ['global']['findBestPack'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
var data, $tmp0, $tmp1, $tmp2, $tmp3, $tmp4, $tmp5, $tmp6, $tmp7, $tmp8, $tmp9, $tmp10, $tmp11, $tmp12, $tmp13, $tmp14, $tmp15, $tmp16, $tmp17, $tmp18, $tmp19, $tmp20, $tmp21, $tmp22;
$Γ['global']['$tmp22'] = $Γ['global']['$tmp21'] = $Γ['global']['$tmp20'] = $Γ['global']['$tmp19'] = $Γ['global']['$tmp18'] = $Γ['global']['$tmp17'] = $Γ['global']['$tmp16'] = $Γ['global']['$tmp15'] = $Γ['global']['$tmp14'] = $Γ['global']['$tmp13'] = $Γ['global']['$tmp12'] = $Γ['global']['$tmp11'] = $Γ['global']['$tmp10'] = $Γ['global']['$tmp9'] = $Γ['global']['$tmp8'] = $Γ['global']['$tmp7'] = $Γ['global']['$tmp6'] = $Γ['global']['$tmp5'] = $Γ['global']['$tmp4'] = $Γ['global']['$tmp3'] = $Γ['global']['$tmp2'] = $Γ['global']['$tmp1'] = $Γ['global']['$tmp0'] = $Γ['global']['data'] = 0;
$tmp0 = {
    name: 'map',
    weight: 9,
    value: 150,
    pieces: 1
};
$Γ['global']['$tmp0'] = {
    __proto__: {},
    name: $Λ[$Λ.length - 1].l,
    weight: $Λ[$Λ.length - 1].l,
    value: $Λ[$Λ.length - 1].l,
    pieces: $Λ[$Λ.length - 1].l,
    Σ: $Λ[$Λ.length - 1].l
};
$tmp1 = {
    name: 'compass',
    weight: 13,
    value: 35,
    pieces: 1
};
$Γ['global']['$tmp1'] = {
    __proto__: {},
    name: $Λ[$Λ.length - 1].l,
    weight: $Λ[$Λ.length - 1].l,
    value: $Λ[$Λ.length - 1].l,
    pieces: $Λ[$Λ.length - 1].l,
    Σ: $Λ[$Λ.length - 1].l
};
$tmp2 = {
    name: 'water',
    weight: 153,
    value: 200,
    pieces: 2
};
$Γ['global']['$tmp2'] = {
    __proto__: {},
    name: $Λ[$Λ.length - 1].l,
    weight: $Λ[$Λ.length - 1].l,
    value: $Λ[$Λ.length - 1].l,
    pieces: $Λ[$Λ.length - 1].l,
    Σ: $Λ[$Λ.length - 1].l
};
$tmp3 = {
    name: 'sandwich',
    weight: 50,
    value: 60,
    pieces: 2
};
$Γ['global']['$tmp3'] = {
    __proto__: {},
    name: $Λ[$Λ.length - 1].l,
    weight: $Λ[$Λ.length - 1].l,
    value: $Λ[$Λ.length - 1].l,
    pieces: $Λ[$Λ.length - 1].l,
    Σ: $Λ[$Λ.length - 1].l
};
$tmp4 = {
    name: 'glucose',
    weight: 15,
    value: 60,
    pieces: 2
};
$Γ['global']['$tmp4'] = {
    __proto__: {},
    name: $Λ[$Λ.length - 1].l,
    weight: $Λ[$Λ.length - 1].l,
    value: $Λ[$Λ.length - 1].l,
    pieces: $Λ[$Λ.length - 1].l,
    Σ: $Λ[$Λ.length - 1].l
};
$tmp5 = {
    name: 'tin',
    weight: 68,
    value: 45,
    pieces: 3
};
$Γ['global']['$tmp5'] = {
    __proto__: {},
    name: $Λ[$Λ.length - 1].l,
    weight: $Λ[$Λ.length - 1].l,
    value: $Λ[$Λ.length - 1].l,
    pieces: $Λ[$Λ.length - 1].l,
    Σ: $Λ[$Λ.length - 1].l
};
$tmp6 = {
    name: 'banana',
    weight: 27,
    value: 60,
    pieces: 3
};
$Γ['global']['$tmp6'] = {
    __proto__: {},
    name: $Λ[$Λ.length - 1].l,
    weight: $Λ[$Λ.length - 1].l,
    value: $Λ[$Λ.length - 1].l,
    pieces: $Λ[$Λ.length - 1].l,
    Σ: $Λ[$Λ.length - 1].l
};
$tmp7 = {
    name: 'apple',
    weight: 39,
    value: 40,
    pieces: 3
};
$Γ['global']['$tmp7'] = {
    __proto__: {},
    name: $Λ[$Λ.length - 1].l,
    weight: $Λ[$Λ.length - 1].l,
    value: $Λ[$Λ.length - 1].l,
    pieces: $Λ[$Λ.length - 1].l,
    Σ: $Λ[$Λ.length - 1].l
};
$tmp8 = {
    name: 'cheese',
    weight: 23,
    value: 30,
    pieces: 1
};
$Γ['global']['$tmp8'] = {
    __proto__: {},
    name: $Λ[$Λ.length - 1].l,
    weight: $Λ[$Λ.length - 1].l,
    value: $Λ[$Λ.length - 1].l,
    pieces: $Λ[$Λ.length - 1].l,
    Σ: $Λ[$Λ.length - 1].l
};
$tmp9 = {
    name: 'beer',
    weight: 52,
    value: 10,
    pieces: 3
};
$Γ['global']['$tmp9'] = {
    __proto__: {},
    name: $Λ[$Λ.length - 1].l,
    weight: $Λ[$Λ.length - 1].l,
    value: $Λ[$Λ.length - 1].l,
    pieces: $Λ[$Λ.length - 1].l,
    Σ: $Λ[$Λ.length - 1].l
};
$tmp10 = {
    name: 'suntan, cream',
    weight: 11,
    value: 70,
    pieces: 1
};
$Γ['global']['$tmp10'] = {
    __proto__: {},
    name: $Λ[$Λ.length - 1].l,
    weight: $Λ[$Λ.length - 1].l,
    value: $Λ[$Λ.length - 1].l,
    pieces: $Λ[$Λ.length - 1].l,
    Σ: $Λ[$Λ.length - 1].l
};
$tmp11 = {
    name: 'camera',
    weight: 32,
    value: 30,
    pieces: 1
};
$Γ['global']['$tmp11'] = {
    __proto__: {},
    name: $Λ[$Λ.length - 1].l,
    weight: $Λ[$Λ.length - 1].l,
    value: $Λ[$Λ.length - 1].l,
    pieces: $Λ[$Λ.length - 1].l,
    Σ: $Λ[$Λ.length - 1].l
};
$tmp12 = {
    name: 'T-shirt',
    weight: 24,
    value: 15,
    pieces: 2
};
$Γ['global']['$tmp12'] = {
    __proto__: {},
    name: $Λ[$Λ.length - 1].l,
    weight: $Λ[$Λ.length - 1].l,
    value: $Λ[$Λ.length - 1].l,
    pieces: $Λ[$Λ.length - 1].l,
    Σ: $Λ[$Λ.length - 1].l
};
$tmp13 = {
    name: 'trousers',
    weight: 48,
    value: 10,
    pieces: 2
};
$Γ['global']['$tmp13'] = {
    __proto__: {},
    name: $Λ[$Λ.length - 1].l,
    weight: $Λ[$Λ.length - 1].l,
    value: $Λ[$Λ.length - 1].l,
    pieces: $Λ[$Λ.length - 1].l,
    Σ: $Λ[$Λ.length - 1].l
};
$tmp14 = {
    name: 'umbrella',
    weight: 73,
    value: 40,
    pieces: 1
};
$Γ['global']['$tmp14'] = {
    __proto__: {},
    name: $Λ[$Λ.length - 1].l,
    weight: $Λ[$Λ.length - 1].l,
    value: $Λ[$Λ.length - 1].l,
    pieces: $Λ[$Λ.length - 1].l,
    Σ: $Λ[$Λ.length - 1].l
};
$tmp15 = {
    name: 'waterproof, trousers',
    weight: 42,
    value: 70,
    pieces: 1
};
$Γ['global']['$tmp15'] = {
    __proto__: {},
    name: $Λ[$Λ.length - 1].l,
    weight: $Λ[$Λ.length - 1].l,
    value: $Λ[$Λ.length - 1].l,
    pieces: $Λ[$Λ.length - 1].l,
    Σ: $Λ[$Λ.length - 1].l
};
$tmp16 = {
    name: 'waterproof, overclothes',
    weight: 43,
    value: 75,
    pieces: 1
};
$Γ['global']['$tmp16'] = {
    __proto__: {},
    name: $Λ[$Λ.length - 1].l,
    weight: $Λ[$Λ.length - 1].l,
    value: $Λ[$Λ.length - 1].l,
    pieces: $Λ[$Λ.length - 1].l,
    Σ: $Λ[$Λ.length - 1].l
};
$tmp17 = {
    name: 'note-case',
    weight: 22,
    value: 80,
    pieces: 1
};
$Γ['global']['$tmp17'] = {
    __proto__: {},
    name: $Λ[$Λ.length - 1].l,
    weight: $Λ[$Λ.length - 1].l,
    value: $Λ[$Λ.length - 1].l,
    pieces: $Λ[$Λ.length - 1].l,
    Σ: $Λ[$Λ.length - 1].l
};
$tmp18 = {
    name: 'sunglasses',
    weight: 7,
    value: 20,
    pieces: 1
};
$Γ['global']['$tmp18'] = {
    __proto__: {},
    name: $Λ[$Λ.length - 1].l,
    weight: $Λ[$Λ.length - 1].l,
    value: $Λ[$Λ.length - 1].l,
    pieces: $Λ[$Λ.length - 1].l,
    Σ: $Λ[$Λ.length - 1].l
};
$tmp19 = {
    name: 'towel',
    weight: 18,
    value: 12,
    pieces: 2
};
$Γ['global']['$tmp19'] = {
    __proto__: {},
    name: $Λ[$Λ.length - 1].l,
    weight: $Λ[$Λ.length - 1].l,
    value: $Λ[$Λ.length - 1].l,
    pieces: $Λ[$Λ.length - 1].l,
    Σ: $Λ[$Λ.length - 1].l
};
$tmp20 = {
    name: 'socks',
    weight: 4,
    value: 50,
    pieces: 1
};
$Γ['global']['$tmp20'] = {
    __proto__: {},
    name: $Λ[$Λ.length - 1].l,
    weight: $Λ[$Λ.length - 1].l,
    value: $Λ[$Λ.length - 1].l,
    pieces: $Λ[$Λ.length - 1].l,
    Σ: $Λ[$Λ.length - 1].l
};
$tmp21 = {
    name: 'book',
    weight: 30,
    value: 10,
    pieces: 2
};
$Γ['global']['$tmp21'] = {
    __proto__: {},
    name: $Λ[$Λ.length - 1].l,
    weight: $Λ[$Λ.length - 1].l,
    value: $Λ[$Λ.length - 1].l,
    pieces: $Λ[$Λ.length - 1].l,
    Σ: $Λ[$Λ.length - 1].l
};
data = [
    $tmp0,
    $tmp1,
    $tmp2,
    $tmp3,
    $tmp4,
    $tmp5,
    $tmp6,
    $tmp7,
    $tmp8,
    $tmp9,
    $tmp10,
    $tmp11,
    $tmp12,
    $tmp13,
    $tmp14,
    $tmp15,
    $tmp16,
    $tmp17,
    $tmp18,
    $tmp19,
    $tmp20,
    $tmp21
];
$Γ['global']['data'] = {
    __proto__: {},
    scope: $Γ['global'],
    0: $Λ[$Λ.length - 1].l,
    1: $Λ[$Λ.length - 1].l,
    2: $Λ[$Λ.length - 1].l,
    3: $Λ[$Λ.length - 1].l,
    4: $Λ[$Λ.length - 1].l,
    5: $Λ[$Λ.length - 1].l,
    6: $Λ[$Λ.length - 1].l,
    7: $Λ[$Λ.length - 1].l,
    8: $Λ[$Λ.length - 1].l,
    9: $Λ[$Λ.length - 1].l,
    10: $Λ[$Λ.length - 1].l,
    11: $Λ[$Λ.length - 1].l,
    12: $Λ[$Λ.length - 1].l,
    13: $Λ[$Λ.length - 1].l,
    14: $Λ[$Λ.length - 1].l,
    15: $Λ[$Λ.length - 1].l,
    16: $Λ[$Λ.length - 1].l,
    17: $Λ[$Λ.length - 1].l,
    18: $Λ[$Λ.length - 1].l,
    19: $Λ[$Λ.length - 1].l,
    20: $Λ[$Λ.length - 1].l,
    21: $Λ[$Λ.length - 1].l,
    Σ: sec_lvl('$tmp0', null, false, $Γ['global'])
};
function findBestPack() {
    var m, $tmp23, b, $tmp24, opts, P, choose, j, $tmp26, $tmp27, $tmp29, $tmp30, $tmp31, w, $tmp33, best, $tmp34, $tmp36, wgt, val, i, $tmp38, $tmp39, $tmp40, $tmp41, $tmp42, $tmp43;
    $Γ['global']['findBestPack']['$tmp43'] = $Γ['global']['findBestPack']['$tmp42'] = $Γ['global']['findBestPack']['$tmp41'] = $Γ['global']['findBestPack']['$tmp40'] = $Γ['global']['findBestPack']['$tmp39'] = $Γ['global']['findBestPack']['$tmp38'] = $Γ['global']['findBestPack']['i'] = $Γ['global']['findBestPack']['val'] = $Γ['global']['findBestPack']['wgt'] = $Γ['global']['findBestPack']['$tmp36'] = $Γ['global']['findBestPack']['$tmp34'] = $Γ['global']['findBestPack']['best'] = $Γ['global']['findBestPack']['$tmp33'] = $Γ['global']['findBestPack']['w'] = $Γ['global']['findBestPack']['$tmp31'] = $Γ['global']['findBestPack']['$tmp30'] = $Γ['global']['findBestPack']['$tmp29'] = $Γ['global']['findBestPack']['$tmp27'] = $Γ['global']['findBestPack']['$tmp26'] = $Γ['global']['findBestPack']['j'] = $Γ['global']['findBestPack']['choose'] = $Γ['global']['findBestPack']['P'] = $Γ['global']['findBestPack']['opts'] = $Γ['global']['findBestPack']['$tmp24'] = $Γ['global']['findBestPack']['b'] = $Γ['global']['findBestPack']['$tmp23'] = $Γ['global']['findBestPack']['m'] = 0;
    $tmp23 = [0];
    $Γ['global']['findBestPack']['$tmp23'] = {
        __proto__: {},
        scope: $Γ['global']['findBestPack'],
        0: $Λ[$Λ.length - 1].l,
        Σ: $Λ[$Λ.length - 1].l
    };
    m = [$tmp23];
    $Γ['global']['findBestPack']['m'] = {
        __proto__: {},
        scope: $Γ['global']['findBestPack'],
        0: $Λ[$Λ.length - 1].l,
        Σ: sec_lvl('$tmp23', null, false, $Γ['global']['findBestPack'])
    };
    $tmp24 = [0];
    $Γ['global']['findBestPack']['$tmp24'] = {
        __proto__: {},
        scope: $Γ['global']['findBestPack'],
        0: $Λ[$Λ.length - 1].l,
        Σ: $Λ[$Λ.length - 1].l
    };
    b = [$tmp24];
    $Γ['global']['findBestPack']['b'] = {
        __proto__: {},
        scope: $Γ['global']['findBestPack'],
        0: $Λ[$Λ.length - 1].l,
        Σ: sec_lvl('$tmp24', null, false, $Γ['global']['findBestPack'])
    };
    opts = [0];
    $Γ['global']['findBestPack']['opts'] = {
        __proto__: {},
        scope: $Γ['global']['findBestPack'],
        0: $Λ[$Λ.length - 1].l,
        Σ: $Λ[$Λ.length - 1].l
    };
    P = [1];
    $Γ['global']['findBestPack']['P'] = {
        __proto__: {},
        scope: $Γ['global']['findBestPack'],
        0: $Λ[$Λ.length - 1].l,
        Σ: $Λ[$Λ.length - 1].l
    };
    choose = 0;
    $scope($Γ['global']['findBestPack'], 'choose', true)['choose'] = $Λ[$Λ.length - 1].l;
    j = 0;
    $scope($Γ['global']['findBestPack'], 'j', true)['j'] = $Λ[$Λ.length - 1].l;
    $tmp27 = data.length;
    $Γ['global']['findBestPack']['$tmp27'] = sec_lvl('data', 'length', false, $Γ['global']['findBestPack']);
    $Γ['global']['findBestPack']['$tmp27'] instanceof Object ? $Γ['global']['findBestPack']['$tmp27'].Σ = $Γ['global']['findBestPack']['$tmp27'].Σ : $Γ['global']['findBestPack']['$tmp27'] = $Γ['global']['findBestPack']['$tmp27'];
    $tmp26 = j < $tmp27;
    $Γ['global']['findBestPack']['$tmp26'] = sec_lvl('j', null, true, $Γ['global']['findBestPack']);
    $Γ['global']['findBestPack']['$tmp26'] instanceof Object ? $Γ['global']['findBestPack']['$tmp26'].Σ = $Γ['global']['findBestPack']['$tmp26'].Σ : $Γ['global']['findBestPack']['$tmp26'] = $Γ['global']['findBestPack']['$tmp26'];
    $Λ.push({
        l: $Λ[$Λ.length - 1].l,
        id: 'LOOP'
    });
    for (; $tmp26;) {
        var $tmp44, $tmp45, $tmp46, $tmp47, $tmp48, $tmp49, $tmp50, $tmp51, $tmp25, $tmp26, $tmp52;
        $Γ['global']['findBestPack']['$tmp52'] = $Γ['global']['findBestPack']['$tmp26'] = $Γ['global']['findBestPack']['$tmp25'] = $Γ['global']['findBestPack']['$tmp51'] = $Γ['global']['findBestPack']['$tmp50'] = $Γ['global']['findBestPack']['$tmp49'] = $Γ['global']['findBestPack']['$tmp48'] = $Γ['global']['findBestPack']['$tmp47'] = $Γ['global']['findBestPack']['$tmp46'] = $Γ['global']['findBestPack']['$tmp45'] = $Γ['global']['findBestPack']['$tmp44'] = 0;
        $tmp44 = j + 1;
        $Γ['global']['findBestPack']['$tmp44'] = sec_lvl('j', null, true, $Γ['global']['findBestPack']);
        $Γ['global']['findBestPack']['$tmp44'] instanceof Object ? $Γ['global']['findBestPack']['$tmp44'].Σ = $Γ['global']['findBestPack']['$tmp44'].Σ : $Γ['global']['findBestPack']['$tmp44'] = $Γ['global']['findBestPack']['$tmp44'];
        $tmp45 = opts[j];
        $Γ['global']['findBestPack']['$tmp45'] = sec_lvl('opts', j, false, $Γ['global']['findBestPack']);
        $Γ['global']['findBestPack']['$tmp45'] instanceof Object ? $Γ['global']['findBestPack']['$tmp45'].Σ = $Γ['global']['findBestPack']['$tmp45'].Σ : $Γ['global']['findBestPack']['$tmp45'] = $Γ['global']['findBestPack']['$tmp45'];
        $tmp47 = data[j];
        $Γ['global']['findBestPack']['$tmp47'] = sec_lvl('data', j, false, $Γ['global']['findBestPack']);
        $Γ['global']['findBestPack']['$tmp47'] instanceof Object ? $Γ['global']['findBestPack']['$tmp47'].Σ = $Γ['global']['findBestPack']['$tmp47'].Σ : $Γ['global']['findBestPack']['$tmp47'] = $Γ['global']['findBestPack']['$tmp47'];
        $tmp46 = $tmp47.pieces;
        $Γ['global']['findBestPack']['$tmp46'] = sec_lvl('$tmp47', 'pieces', false, $Γ['global']['findBestPack']);
        $Γ['global']['findBestPack']['$tmp46'] instanceof Object ? $Γ['global']['findBestPack']['$tmp46'].Σ = $Γ['global']['findBestPack']['$tmp46'].Σ : $Γ['global']['findBestPack']['$tmp46'] = $Γ['global']['findBestPack']['$tmp46'];
        opts[$tmp44] = $tmp45 + $tmp46;
        $scope($Γ['global']['findBestPack'], 'opts', false)[$tmp44] = sec_lvl('$tmp45', null, true, $Γ['global']['findBestPack']);
        _$tmp = sec_lvl('$tmp44', null, false, $Γ['global']['findBestPack']) instanceof Object ? sec_lvl('$tmp44', null, false, $Γ['global']['findBestPack']).Σ : sec_lvl('$tmp44', null, false, $Γ['global']['findBestPack']);
        $scope($Γ['global']['findBestPack'], 'opts', false)[$tmp44] instanceof Object ? $scope($Γ['global']['findBestPack'], 'opts', false)[$tmp44].Σ = $scope($Γ['global']['findBestPack'], 'opts', false)[$tmp44].Σ : $scope($Γ['global']['findBestPack'], 'opts', false)[$tmp44] = $scope($Γ['global']['findBestPack'], 'opts', false)[$tmp44];
        $tmp48 = j + 1;
        $Γ['global']['findBestPack']['$tmp48'] = sec_lvl('j', null, true, $Γ['global']['findBestPack']);
        $Γ['global']['findBestPack']['$tmp48'] instanceof Object ? $Γ['global']['findBestPack']['$tmp48'].Σ = $Γ['global']['findBestPack']['$tmp48'].Σ : $Γ['global']['findBestPack']['$tmp48'] = $Γ['global']['findBestPack']['$tmp48'];
        $tmp49 = P[j];
        $Γ['global']['findBestPack']['$tmp49'] = sec_lvl('P', j, false, $Γ['global']['findBestPack']);
        $Γ['global']['findBestPack']['$tmp49'] instanceof Object ? $Γ['global']['findBestPack']['$tmp49'].Σ = $Γ['global']['findBestPack']['$tmp49'].Σ : $Γ['global']['findBestPack']['$tmp49'] = $Γ['global']['findBestPack']['$tmp49'];
        $tmp47 = data[j];
        $Γ['global']['findBestPack']['$tmp47'] = sec_lvl('data', j, false, $Γ['global']['findBestPack']);
        $Γ['global']['findBestPack']['$tmp47'] instanceof Object ? $Γ['global']['findBestPack']['$tmp47'].Σ = $Γ['global']['findBestPack']['$tmp47'].Σ : $Γ['global']['findBestPack']['$tmp47'] = $Γ['global']['findBestPack']['$tmp47'];
        $tmp51 = $tmp47.pieces;
        $Γ['global']['findBestPack']['$tmp51'] = sec_lvl('$tmp47', 'pieces', false, $Γ['global']['findBestPack']);
        $Γ['global']['findBestPack']['$tmp51'] instanceof Object ? $Γ['global']['findBestPack']['$tmp51'].Σ = $Γ['global']['findBestPack']['$tmp51'].Σ : $Γ['global']['findBestPack']['$tmp51'] = $Γ['global']['findBestPack']['$tmp51'];
        $tmp50 = 1 + $tmp51;
        $Γ['global']['findBestPack']['$tmp50'] = $Λ[$Λ.length - 1].l;
        $Γ['global']['findBestPack']['$tmp50'] instanceof Object ? $Γ['global']['findBestPack']['$tmp50'].Σ = $Γ['global']['findBestPack']['$tmp50'].Σ : $Γ['global']['findBestPack']['$tmp50'] = $Γ['global']['findBestPack']['$tmp50'];
        P[$tmp48] = $tmp49 * $tmp50;
        $scope($Γ['global']['findBestPack'], 'P', false)[$tmp48] = sec_lvl('$tmp49', null, true, $Γ['global']['findBestPack']);
        _$tmp = sec_lvl('$tmp48', null, false, $Γ['global']['findBestPack']) instanceof Object ? sec_lvl('$tmp48', null, false, $Γ['global']['findBestPack']).Σ : sec_lvl('$tmp48', null, false, $Γ['global']['findBestPack']);
        $scope($Γ['global']['findBestPack'], 'P', false)[$tmp48] instanceof Object ? $scope($Γ['global']['findBestPack'], 'P', false)[$tmp48].Σ = $scope($Γ['global']['findBestPack'], 'P', false)[$tmp48].Σ : $scope($Γ['global']['findBestPack'], 'P', false)[$tmp48] = $scope($Γ['global']['findBestPack'], 'P', false)[$tmp48];
        $tmp25 = j++;
        $Γ['global']['findBestPack']['$tmp25'] = sec_lvl('j', null, false, $Γ['global']['findBestPack']);
        $Γ['global']['findBestPack']['$tmp25'] instanceof Object ? $Γ['global']['findBestPack']['$tmp25'].Σ = $Γ['global']['findBestPack']['$tmp25'].Σ : $Γ['global']['findBestPack']['$tmp25'] = $Γ['global']['findBestPack']['$tmp25'];
        $tmp52 = data.length;
        $Γ['global']['findBestPack']['$tmp52'] = sec_lvl('data', 'length', false, $Γ['global']['findBestPack']);
        $Γ['global']['findBestPack']['$tmp52'] instanceof Object ? $Γ['global']['findBestPack']['$tmp52'].Σ = $Γ['global']['findBestPack']['$tmp52'].Σ : $Γ['global']['findBestPack']['$tmp52'] = $Γ['global']['findBestPack']['$tmp52'];
        $tmp26 = j < $tmp52;
        $Γ['global']['findBestPack']['$tmp26'] = sec_lvl('j', null, true, $Γ['global']['findBestPack']);
        $Γ['global']['findBestPack']['$tmp26'] instanceof Object ? $Γ['global']['findBestPack']['$tmp26'].Σ = $Γ['global']['findBestPack']['$tmp26'].Σ : $Γ['global']['findBestPack']['$tmp26'] = $Γ['global']['findBestPack']['$tmp26'];
    }
    $Λ.pop();
    j = 0;
    $scope($Γ['global']['findBestPack'], 'j', true)['j'] = $Λ[$Λ.length - 1].l;
    $tmp31 = data.length;
    $Γ['global']['findBestPack']['$tmp31'] = sec_lvl('data', 'length', false, $Γ['global']['findBestPack']);
    $Γ['global']['findBestPack']['$tmp31'] instanceof Object ? $Γ['global']['findBestPack']['$tmp31'].Σ = $Γ['global']['findBestPack']['$tmp31'].Σ : $Γ['global']['findBestPack']['$tmp31'] = $Γ['global']['findBestPack']['$tmp31'];
    $tmp30 = opts[$tmp31];
    $Γ['global']['findBestPack']['$tmp30'] = sec_lvl('opts', $tmp31, false, $Γ['global']['findBestPack']);
    $Γ['global']['findBestPack']['$tmp30'] instanceof Object ? $Γ['global']['findBestPack']['$tmp30'].Σ = $Γ['global']['findBestPack']['$tmp30'].Σ : $Γ['global']['findBestPack']['$tmp30'] = $Γ['global']['findBestPack']['$tmp30'];
    $tmp29 = j < $tmp30;
    $Γ['global']['findBestPack']['$tmp29'] = sec_lvl('j', null, true, $Γ['global']['findBestPack']);
    $Γ['global']['findBestPack']['$tmp29'] instanceof Object ? $Γ['global']['findBestPack']['$tmp29'].Σ = $Γ['global']['findBestPack']['$tmp29'].Σ : $Γ['global']['findBestPack']['$tmp29'] = $Γ['global']['findBestPack']['$tmp29'];
    $Λ.push({
        l: $Λ[$Λ.length - 1].l,
        id: 'LOOP'
    });
    for (; $tmp29;) {
        var $tmp53, $tmp54, $tmp55, $tmp56, $tmp28, $tmp29, $tmp57, $tmp58;
        $Γ['global']['findBestPack']['$tmp58'] = $Γ['global']['findBestPack']['$tmp57'] = $Γ['global']['findBestPack']['$tmp29'] = $Γ['global']['findBestPack']['$tmp28'] = $Γ['global']['findBestPack']['$tmp56'] = $Γ['global']['findBestPack']['$tmp55'] = $Γ['global']['findBestPack']['$tmp54'] = $Γ['global']['findBestPack']['$tmp53'] = 0;
        $tmp53 = m[0];
        $Γ['global']['findBestPack']['$tmp53'] = {
            Σ: 0,
            prototype: { Σ: $Λ[$Λ.length - 1].l }
        };
        $Γ['global']['findBestPack']['$tmp53'] instanceof Object ? $Γ['global']['findBestPack']['$tmp53'].Σ = $Γ['global']['findBestPack']['$tmp53'].Σ : $Γ['global']['findBestPack']['$tmp53'] = $Γ['global']['findBestPack']['$tmp53'];
        $tmp54 = j + 1;
        $Γ['global']['findBestPack']['$tmp54'] = sec_lvl('j', null, true, $Γ['global']['findBestPack']);
        $Γ['global']['findBestPack']['$tmp54'] instanceof Object ? $Γ['global']['findBestPack']['$tmp54'].Σ = $Γ['global']['findBestPack']['$tmp54'].Σ : $Γ['global']['findBestPack']['$tmp54'] = $Γ['global']['findBestPack']['$tmp54'];
        $tmp55 = b[0];
        $Γ['global']['findBestPack']['$tmp55'] = {
            Σ: 0,
            prototype: { Σ: $Λ[$Λ.length - 1].l }
        };
        $Γ['global']['findBestPack']['$tmp55'] instanceof Object ? $Γ['global']['findBestPack']['$tmp55'].Σ = $Γ['global']['findBestPack']['$tmp55'].Σ : $Γ['global']['findBestPack']['$tmp55'] = $Γ['global']['findBestPack']['$tmp55'];
        $tmp56 = j + 1;
        $Γ['global']['findBestPack']['$tmp56'] = sec_lvl('j', null, true, $Γ['global']['findBestPack']);
        $Γ['global']['findBestPack']['$tmp56'] instanceof Object ? $Γ['global']['findBestPack']['$tmp56'].Σ = $Γ['global']['findBestPack']['$tmp56'].Σ : $Γ['global']['findBestPack']['$tmp56'] = $Γ['global']['findBestPack']['$tmp56'];
        $tmp55[$tmp56] = 0;
        $Γ['global']['findBestPack']['$tmp55']['$tmp56'] = $Λ[$Λ.length - 1].l;
        _$tmp = sec_lvl('$tmp56', null, false, $Γ['global']['findBestPack']) instanceof Object ? sec_lvl('$tmp56', null, false, $Γ['global']['findBestPack']).Σ : sec_lvl('$tmp56', null, false, $Γ['global']['findBestPack']);
        $tmp53[$tmp54] = $tmp55[$tmp56];
        $Γ['global']['findBestPack']['$tmp53']['$tmp54'] = sec_lvl('$tmp55', $tmp56, false, $Γ['global']['findBestPack']);
        _$tmp = sec_lvl('$tmp54', null, false, $Γ['global']['findBestPack']) instanceof Object ? sec_lvl('$tmp54', null, false, $Γ['global']['findBestPack']).Σ : sec_lvl('$tmp54', null, false, $Γ['global']['findBestPack']);
        $Γ['global']['findBestPack']['$tmp53']['$tmp54'] instanceof Object ? $Γ['global']['findBestPack']['$tmp53']['$tmp54'].Σ = $Γ['global']['findBestPack']['$tmp53']['$tmp54'].Σ : $Γ['global']['findBestPack']['$tmp53']['$tmp54'] = $Γ['global']['findBestPack']['$tmp53']['$tmp54'];
        $tmp28 = j++;
        $Γ['global']['findBestPack']['$tmp28'] = sec_lvl('j', null, false, $Γ['global']['findBestPack']);
        $Γ['global']['findBestPack']['$tmp28'] instanceof Object ? $Γ['global']['findBestPack']['$tmp28'].Σ = $Γ['global']['findBestPack']['$tmp28'].Σ : $Γ['global']['findBestPack']['$tmp28'] = $Γ['global']['findBestPack']['$tmp28'];
        $tmp58 = data.length;
        $Γ['global']['findBestPack']['$tmp58'] = sec_lvl('data', 'length', false, $Γ['global']['findBestPack']);
        $Γ['global']['findBestPack']['$tmp58'] instanceof Object ? $Γ['global']['findBestPack']['$tmp58'].Σ = $Γ['global']['findBestPack']['$tmp58'].Σ : $Γ['global']['findBestPack']['$tmp58'] = $Γ['global']['findBestPack']['$tmp58'];
        $tmp57 = opts[$tmp58];
        $Γ['global']['findBestPack']['$tmp57'] = sec_lvl('opts', $tmp58, false, $Γ['global']['findBestPack']);
        $Γ['global']['findBestPack']['$tmp57'] instanceof Object ? $Γ['global']['findBestPack']['$tmp57'].Σ = $Γ['global']['findBestPack']['$tmp57'].Σ : $Γ['global']['findBestPack']['$tmp57'] = $Γ['global']['findBestPack']['$tmp57'];
        $tmp29 = j < $tmp57;
        $Γ['global']['findBestPack']['$tmp29'] = sec_lvl('j', null, true, $Γ['global']['findBestPack']);
        $Γ['global']['findBestPack']['$tmp29'] instanceof Object ? $Γ['global']['findBestPack']['$tmp29'].Σ = $Γ['global']['findBestPack']['$tmp29'].Σ : $Γ['global']['findBestPack']['$tmp29'] = $Γ['global']['findBestPack']['$tmp29'];
    }
    $Λ.pop();
    w = 1;
    $scope($Γ['global']['findBestPack'], 'w', true)['w'] = $Λ[$Λ.length - 1].l;
    $tmp33 = w <= 400;
    $Γ['global']['findBestPack']['$tmp33'] = sec_lvl('w', null, true, $Γ['global']['findBestPack']);
    $Γ['global']['findBestPack']['$tmp33'] instanceof Object ? $Γ['global']['findBestPack']['$tmp33'].Σ = $Γ['global']['findBestPack']['$tmp33'].Σ : $Γ['global']['findBestPack']['$tmp33'] = $Γ['global']['findBestPack']['$tmp33'];
    $Λ.push({
        l: $Λ[$Λ.length - 1].l,
        id: 'LOOP'
    });
    for (; $tmp33;) {
        m[w] = [0];
        $Γ['global']['findBestPack']['m']['w'] = {
            __proto__: {},
            scope: $Γ['global']['findBestPack'],
            0: $Λ[$Λ.length - 1].l,
            Σ: $Λ[$Λ.length - 1].l
        };
        b[w] = [0];
        $Γ['global']['findBestPack']['b']['w'] = {
            __proto__: {},
            scope: $Γ['global']['findBestPack'],
            0: $Λ[$Λ.length - 1].l,
            Σ: $Λ[$Λ.length - 1].l
        };
        var j, $tmp60, $tmp61, $tmp32, $tmp33;
        $Γ['global']['findBestPack']['$tmp33'] = $Γ['global']['findBestPack']['$tmp32'] = $Γ['global']['findBestPack']['$tmp61'] = $Γ['global']['findBestPack']['$tmp60'] = $Γ['global']['findBestPack']['j'] = 0;
        j = 0;
        $scope($Γ['global']['findBestPack'], 'j', true)['j'] = $Λ[$Λ.length - 1].l;
        $tmp61 = data.length;
        $Γ['global']['findBestPack']['$tmp61'] = sec_lvl('data', 'length', false, $Γ['global']['findBestPack']);
        $Γ['global']['findBestPack']['$tmp61'] instanceof Object ? $Γ['global']['findBestPack']['$tmp61'].Σ = $Γ['global']['findBestPack']['$tmp61'].Σ : $Γ['global']['findBestPack']['$tmp61'] = $Γ['global']['findBestPack']['$tmp61'];
        $tmp60 = j < $tmp61;
        $Γ['global']['findBestPack']['$tmp60'] = sec_lvl('j', null, true, $Γ['global']['findBestPack']);
        $Γ['global']['findBestPack']['$tmp60'] instanceof Object ? $Γ['global']['findBestPack']['$tmp60'].Σ = $Γ['global']['findBestPack']['$tmp60'].Σ : $Γ['global']['findBestPack']['$tmp60'] = $Γ['global']['findBestPack']['$tmp60'];
        $Λ.push({
            l: $Λ[$Λ.length - 1].l,
            id: 'LOOP'
        });
        for (; $tmp60;) {
            var N, $tmp47, base, n, $tmp63, $tmp59, $tmp60, $tmp64;
            $Γ['global']['findBestPack']['$tmp64'] = $Γ['global']['findBestPack']['$tmp60'] = $Γ['global']['findBestPack']['$tmp59'] = $Γ['global']['findBestPack']['$tmp63'] = $Γ['global']['findBestPack']['n'] = $Γ['global']['findBestPack']['base'] = $Γ['global']['findBestPack']['$tmp47'] = $Γ['global']['findBestPack']['N'] = 0;
            $tmp47 = data[j];
            $Γ['global']['findBestPack']['$tmp47'] = sec_lvl('data', j, false, $Γ['global']['findBestPack']);
            $Γ['global']['findBestPack']['$tmp47'] instanceof Object ? $Γ['global']['findBestPack']['$tmp47'].Σ = $Γ['global']['findBestPack']['$tmp47'].Σ : $Γ['global']['findBestPack']['$tmp47'] = $Γ['global']['findBestPack']['$tmp47'];
            N = $tmp47.pieces;
            $scope($Γ['global']['findBestPack'], 'N', true)['N'] = sec_lvl('$tmp47', 'pieces', false, $Γ['global']['findBestPack']);
            $scope($Γ['global']['findBestPack'], 'N', true)['N'] instanceof Object ? $scope($Γ['global']['findBestPack'], 'N', true)['N'].Σ = $scope($Γ['global']['findBestPack'], 'N', true)['N'].Σ : $scope($Γ['global']['findBestPack'], 'N', true)['N'] = $scope($Γ['global']['findBestPack'], 'N', true)['N'];
            base = opts[j];
            $scope($Γ['global']['findBestPack'], 'base', true)['base'] = sec_lvl('opts', j, false, $Γ['global']['findBestPack']);
            $scope($Γ['global']['findBestPack'], 'base', true)['base'] instanceof Object ? $scope($Γ['global']['findBestPack'], 'base', true)['base'].Σ = $scope($Γ['global']['findBestPack'], 'base', true)['base'].Σ : $scope($Γ['global']['findBestPack'], 'base', true)['base'] = $scope($Γ['global']['findBestPack'], 'base', true)['base'];
            n = 1;
            $scope($Γ['global']['findBestPack'], 'n', true)['n'] = $Λ[$Λ.length - 1].l;
            $tmp63 = n <= N;
            $Γ['global']['findBestPack']['$tmp63'] = sec_lvl('n', null, true, $Γ['global']['findBestPack']);
            $Γ['global']['findBestPack']['$tmp63'] instanceof Object ? $Γ['global']['findBestPack']['$tmp63'].Σ = $Γ['global']['findBestPack']['$tmp63'].Σ : $Γ['global']['findBestPack']['$tmp63'] = $Γ['global']['findBestPack']['$tmp63'];
            $Λ.push({
                l: $Λ[$Λ.length - 1].l,
                id: 'LOOP'
            });
            for (; $tmp63;) {
                var W, $tmp65, $tmp47, s, $tmp93, v, $tmp66, $tmp67, I, wN, $tmp68, C, $tmp69, $tmp70, $tmp71, $tmp72, $tmp73, $tmp74, $tmp75, $tmp76, $tmp77, $tmp78, $tmp79, $tmp94, $tmp95, $tmp96, $tmp97, $tmp62, $tmp63;
                $Γ['global']['findBestPack']['$tmp63'] = $Γ['global']['findBestPack']['$tmp62'] = $Γ['global']['findBestPack']['$tmp97'] = $Γ['global']['findBestPack']['$tmp96'] = $Γ['global']['findBestPack']['$tmp95'] = $Γ['global']['findBestPack']['$tmp94'] = $Γ['global']['findBestPack']['$tmp79'] = $Γ['global']['findBestPack']['$tmp78'] = $Γ['global']['findBestPack']['$tmp77'] = $Γ['global']['findBestPack']['$tmp76'] = $Γ['global']['findBestPack']['$tmp75'] = $Γ['global']['findBestPack']['$tmp74'] = $Γ['global']['findBestPack']['$tmp73'] = $Γ['global']['findBestPack']['$tmp72'] = $Γ['global']['findBestPack']['$tmp71'] = $Γ['global']['findBestPack']['$tmp70'] = $Γ['global']['findBestPack']['$tmp69'] = $Γ['global']['findBestPack']['C'] = $Γ['global']['findBestPack']['$tmp68'] = $Γ['global']['findBestPack']['wN'] = $Γ['global']['findBestPack']['I'] = $Γ['global']['findBestPack']['$tmp67'] = $Γ['global']['findBestPack']['$tmp66'] = $Γ['global']['findBestPack']['v'] = $Γ['global']['findBestPack']['$tmp93'] = $Γ['global']['findBestPack']['s'] = $Γ['global']['findBestPack']['$tmp47'] = $Γ['global']['findBestPack']['$tmp65'] = $Γ['global']['findBestPack']['W'] = 0;
                $tmp47 = data[j];
                $Γ['global']['findBestPack']['$tmp47'] = sec_lvl('data', j, false, $Γ['global']['findBestPack']);
                $Γ['global']['findBestPack']['$tmp47'] instanceof Object ? $Γ['global']['findBestPack']['$tmp47'].Σ = $Γ['global']['findBestPack']['$tmp47'].Σ : $Γ['global']['findBestPack']['$tmp47'] = $Γ['global']['findBestPack']['$tmp47'];
                $tmp65 = $tmp47.weight;
                $Γ['global']['findBestPack']['$tmp65'] = sec_lvl('$tmp47', 'weight', false, $Γ['global']['findBestPack']);
                $Γ['global']['findBestPack']['$tmp65'] instanceof Object ? $Γ['global']['findBestPack']['$tmp65'].Σ = $Γ['global']['findBestPack']['$tmp65'].Σ : $Γ['global']['findBestPack']['$tmp65'] = $Γ['global']['findBestPack']['$tmp65'];
                W = n * $tmp65;
                $scope($Γ['global']['findBestPack'], 'W', true)['W'] = sec_lvl('n', null, true, $Γ['global']['findBestPack']);
                $scope($Γ['global']['findBestPack'], 'W', true)['W'] instanceof Object ? $scope($Γ['global']['findBestPack'], 'W', true)['W'].Σ = $scope($Γ['global']['findBestPack'], 'W', true)['W'].Σ : $scope($Γ['global']['findBestPack'], 'W', true)['W'] = $scope($Γ['global']['findBestPack'], 'W', true)['W'];
                $tmp93 = w >= W;
                $Γ['global']['findBestPack']['$tmp93'] = sec_lvl('w', null, true, $Γ['global']['findBestPack']);
                $Γ['global']['findBestPack']['$tmp93'] instanceof Object ? $Γ['global']['findBestPack']['$tmp93'].Σ = $Γ['global']['findBestPack']['$tmp93'].Σ : $Γ['global']['findBestPack']['$tmp93'] = $Γ['global']['findBestPack']['$tmp93'];
                $Λ.push({
                    l: $Λ[$Λ.length - 1].l,
                    id: 'IF'
                });
                if ($tmp93) {
                    s = 1;
                    $scope($Γ['global']['findBestPack'], 's', true)['s'] = $Λ[$Λ.length - 1].l;
                } else {
                    s = 0;
                    $scope($Γ['global']['findBestPack'], 's', true)['s'] = $Λ[$Λ.length - 1].l;
                }
                $Λ.pop();
                $tmp66 = s * n;
                $Γ['global']['findBestPack']['$tmp66'] = sec_lvl('s', null, true, $Γ['global']['findBestPack']);
                $Γ['global']['findBestPack']['$tmp66'] instanceof Object ? $Γ['global']['findBestPack']['$tmp66'].Σ = $Γ['global']['findBestPack']['$tmp66'].Σ : $Γ['global']['findBestPack']['$tmp66'] = $Γ['global']['findBestPack']['$tmp66'];
                $tmp47 = data[j];
                $Γ['global']['findBestPack']['$tmp47'] = sec_lvl('data', j, false, $Γ['global']['findBestPack']);
                $Γ['global']['findBestPack']['$tmp47'] instanceof Object ? $Γ['global']['findBestPack']['$tmp47'].Σ = $Γ['global']['findBestPack']['$tmp47'].Σ : $Γ['global']['findBestPack']['$tmp47'] = $Γ['global']['findBestPack']['$tmp47'];
                $tmp67 = $tmp47.value;
                $Γ['global']['findBestPack']['$tmp67'] = sec_lvl('$tmp47', 'value', false, $Γ['global']['findBestPack']);
                $Γ['global']['findBestPack']['$tmp67'] instanceof Object ? $Γ['global']['findBestPack']['$tmp67'].Σ = $Γ['global']['findBestPack']['$tmp67'].Σ : $Γ['global']['findBestPack']['$tmp67'] = $Γ['global']['findBestPack']['$tmp67'];
                v = $tmp66 * $tmp67;
                $scope($Γ['global']['findBestPack'], 'v', true)['v'] = sec_lvl('$tmp66', null, true, $Γ['global']['findBestPack']);
                $scope($Γ['global']['findBestPack'], 'v', true)['v'] instanceof Object ? $scope($Γ['global']['findBestPack'], 'v', true)['v'].Σ = $scope($Γ['global']['findBestPack'], 'v', true)['v'].Σ : $scope($Γ['global']['findBestPack'], 'v', true)['v'] = $scope($Γ['global']['findBestPack'], 'v', true)['v'];
                I = base + n;
                $scope($Γ['global']['findBestPack'], 'I', true)['I'] = sec_lvl('base', null, true, $Γ['global']['findBestPack']);
                $scope($Γ['global']['findBestPack'], 'I', true)['I'] instanceof Object ? $scope($Γ['global']['findBestPack'], 'I', true)['I'].Σ = $scope($Γ['global']['findBestPack'], 'I', true)['I'].Σ : $scope($Γ['global']['findBestPack'], 'I', true)['I'] = $scope($Γ['global']['findBestPack'], 'I', true)['I'];
                $tmp68 = s * W;
                $Γ['global']['findBestPack']['$tmp68'] = sec_lvl('s', null, true, $Γ['global']['findBestPack']);
                $Γ['global']['findBestPack']['$tmp68'] instanceof Object ? $Γ['global']['findBestPack']['$tmp68'].Σ = $Γ['global']['findBestPack']['$tmp68'].Σ : $Γ['global']['findBestPack']['$tmp68'] = $Γ['global']['findBestPack']['$tmp68'];
                wN = w - $tmp68;
                $scope($Γ['global']['findBestPack'], 'wN', true)['wN'] = sec_lvl('w', null, true, $Γ['global']['findBestPack']);
                $scope($Γ['global']['findBestPack'], 'wN', true)['wN'] instanceof Object ? $scope($Γ['global']['findBestPack'], 'wN', true)['wN'].Σ = $scope($Γ['global']['findBestPack'], 'wN', true)['wN'].Σ : $scope($Γ['global']['findBestPack'], 'wN', true)['wN'] = $scope($Γ['global']['findBestPack'], 'wN', true)['wN'];
                $tmp70 = P[j];
                $Γ['global']['findBestPack']['$tmp70'] = sec_lvl('P', j, false, $Γ['global']['findBestPack']);
                $Γ['global']['findBestPack']['$tmp70'] instanceof Object ? $Γ['global']['findBestPack']['$tmp70'].Σ = $Γ['global']['findBestPack']['$tmp70'].Σ : $Γ['global']['findBestPack']['$tmp70'] = $Γ['global']['findBestPack']['$tmp70'];
                $tmp69 = n * $tmp70;
                $Γ['global']['findBestPack']['$tmp69'] = sec_lvl('n', null, true, $Γ['global']['findBestPack']);
                $Γ['global']['findBestPack']['$tmp69'] instanceof Object ? $Γ['global']['findBestPack']['$tmp69'].Σ = $Γ['global']['findBestPack']['$tmp69'].Σ : $Γ['global']['findBestPack']['$tmp69'] = $Γ['global']['findBestPack']['$tmp69'];
                $tmp72 = b[wN];
                $Γ['global']['findBestPack']['$tmp72'] = {
                    Σ: 0,
                    prototype: { Σ: $Λ[$Λ.length - 1].l }
                };
                $Γ['global']['findBestPack']['$tmp72'] instanceof Object ? $Γ['global']['findBestPack']['$tmp72'].Σ = $Γ['global']['findBestPack']['$tmp72'].Σ : $Γ['global']['findBestPack']['$tmp72'] = $Γ['global']['findBestPack']['$tmp72'];
                $tmp71 = $tmp72[base];
                $Γ['global']['findBestPack']['$tmp71'] = sec_lvl('$tmp72', base, false, $Γ['global']['findBestPack']);
                $Γ['global']['findBestPack']['$tmp71'] instanceof Object ? $Γ['global']['findBestPack']['$tmp71'].Σ = $Γ['global']['findBestPack']['$tmp71'].Σ : $Γ['global']['findBestPack']['$tmp71'] = $Γ['global']['findBestPack']['$tmp71'];
                C = $tmp69 + $tmp71;
                $scope($Γ['global']['findBestPack'], 'C', true)['C'] = sec_lvl('$tmp69', null, true, $Γ['global']['findBestPack']);
                $scope($Γ['global']['findBestPack'], 'C', true)['C'] instanceof Object ? $scope($Γ['global']['findBestPack'], 'C', true)['C'].Σ = $scope($Γ['global']['findBestPack'], 'C', true)['C'].Σ : $scope($Γ['global']['findBestPack'], 'C', true)['C'] = $scope($Γ['global']['findBestPack'], 'C', true)['C'];
                $tmp73 = m[w];
                $Γ['global']['findBestPack']['$tmp73'] = {
                    Σ: 0,
                    prototype: { Σ: $Λ[$Λ.length - 1].l }
                };
                $Γ['global']['findBestPack']['$tmp73'] instanceof Object ? $Γ['global']['findBestPack']['$tmp73'].Σ = $Γ['global']['findBestPack']['$tmp73'].Σ : $Γ['global']['findBestPack']['$tmp73'] = $Γ['global']['findBestPack']['$tmp73'];
                $tmp73 = m[w];
                $Γ['global']['findBestPack']['$tmp73'] = {
                    Σ: 0,
                    prototype: { Σ: $Λ[$Λ.length - 1].l }
                };
                $Γ['global']['findBestPack']['$tmp73'] instanceof Object ? $Γ['global']['findBestPack']['$tmp73'].Σ = $Γ['global']['findBestPack']['$tmp73'].Σ : $Γ['global']['findBestPack']['$tmp73'] = $Γ['global']['findBestPack']['$tmp73'];
                $tmp75 = I - 1;
                $Γ['global']['findBestPack']['$tmp75'] = sec_lvl('I', null, true, $Γ['global']['findBestPack']);
                $Γ['global']['findBestPack']['$tmp75'] instanceof Object ? $Γ['global']['findBestPack']['$tmp75'].Σ = $Γ['global']['findBestPack']['$tmp75'].Σ : $Γ['global']['findBestPack']['$tmp75'] = $Γ['global']['findBestPack']['$tmp75'];
                $tmp74 = $tmp73[$tmp75];
                $Γ['global']['findBestPack']['$tmp74'] = sec_lvl('$tmp73', $tmp75, false, $Γ['global']['findBestPack']);
                $Γ['global']['findBestPack']['$tmp74'] instanceof Object ? $Γ['global']['findBestPack']['$tmp74'].Σ = $Γ['global']['findBestPack']['$tmp74'].Σ : $Γ['global']['findBestPack']['$tmp74'] = $Γ['global']['findBestPack']['$tmp74'];
                $tmp78 = m[wN];
                $Γ['global']['findBestPack']['$tmp78'] = {
                    Σ: 0,
                    prototype: { Σ: $Λ[$Λ.length - 1].l }
                };
                $Γ['global']['findBestPack']['$tmp78'] instanceof Object ? $Γ['global']['findBestPack']['$tmp78'].Σ = $Γ['global']['findBestPack']['$tmp78'].Σ : $Γ['global']['findBestPack']['$tmp78'] = $Γ['global']['findBestPack']['$tmp78'];
                $tmp77 = $tmp78[base];
                $Γ['global']['findBestPack']['$tmp77'] = sec_lvl('$tmp78', base, false, $Γ['global']['findBestPack']);
                $Γ['global']['findBestPack']['$tmp77'] instanceof Object ? $Γ['global']['findBestPack']['$tmp77'].Σ = $Γ['global']['findBestPack']['$tmp77'].Σ : $Γ['global']['findBestPack']['$tmp77'] = $Γ['global']['findBestPack']['$tmp77'];
                $tmp76 = v + $tmp77;
                $Γ['global']['findBestPack']['$tmp76'] = sec_lvl('v', null, true, $Γ['global']['findBestPack']);
                $Γ['global']['findBestPack']['$tmp76'] instanceof Object ? $Γ['global']['findBestPack']['$tmp76'].Σ = $Γ['global']['findBestPack']['$tmp76'].Σ : $Γ['global']['findBestPack']['$tmp76'] = $Γ['global']['findBestPack']['$tmp76'];
                $tmp73[I] = Math.max($tmp74, $tmp76);
                $tmp79 = b[w];
                $Γ['global']['findBestPack']['$tmp79'] = {
                    Σ: 0,
                    prototype: { Σ: $Λ[$Λ.length - 1].l }
                };
                $Γ['global']['findBestPack']['$tmp79'] instanceof Object ? $Γ['global']['findBestPack']['$tmp79'].Σ = $Γ['global']['findBestPack']['$tmp79'].Σ : $Γ['global']['findBestPack']['$tmp79'] = $Γ['global']['findBestPack']['$tmp79'];
                $tmp73 = m[w];
                $Γ['global']['findBestPack']['$tmp73'] = {
                    Σ: 0,
                    prototype: { Σ: $Λ[$Λ.length - 1].l }
                };
                $Γ['global']['findBestPack']['$tmp73'] instanceof Object ? $Γ['global']['findBestPack']['$tmp73'].Σ = $Γ['global']['findBestPack']['$tmp73'].Σ : $Γ['global']['findBestPack']['$tmp73'] = $Γ['global']['findBestPack']['$tmp73'];
                $tmp95 = $tmp73[I];
                $Γ['global']['findBestPack']['$tmp95'] = sec_lvl('$tmp73', I, false, $Γ['global']['findBestPack']);
                $Γ['global']['findBestPack']['$tmp95'] instanceof Object ? $Γ['global']['findBestPack']['$tmp95'].Σ = $Γ['global']['findBestPack']['$tmp95'].Σ : $Γ['global']['findBestPack']['$tmp95'] = $Γ['global']['findBestPack']['$tmp95'];
                $tmp73 = m[w];
                $Γ['global']['findBestPack']['$tmp73'] = {
                    Σ: 0,
                    prototype: { Σ: $Λ[$Λ.length - 1].l }
                };
                $Γ['global']['findBestPack']['$tmp73'] instanceof Object ? $Γ['global']['findBestPack']['$tmp73'].Σ = $Γ['global']['findBestPack']['$tmp73'].Σ : $Γ['global']['findBestPack']['$tmp73'] = $Γ['global']['findBestPack']['$tmp73'];
                $tmp97 = I - 1;
                $Γ['global']['findBestPack']['$tmp97'] = sec_lvl('I', null, true, $Γ['global']['findBestPack']);
                $Γ['global']['findBestPack']['$tmp97'] instanceof Object ? $Γ['global']['findBestPack']['$tmp97'].Σ = $Γ['global']['findBestPack']['$tmp97'].Σ : $Γ['global']['findBestPack']['$tmp97'] = $Γ['global']['findBestPack']['$tmp97'];
                $tmp96 = $tmp73[$tmp97];
                $Γ['global']['findBestPack']['$tmp96'] = sec_lvl('$tmp73', $tmp97, false, $Γ['global']['findBestPack']);
                $Γ['global']['findBestPack']['$tmp96'] instanceof Object ? $Γ['global']['findBestPack']['$tmp96'].Σ = $Γ['global']['findBestPack']['$tmp96'].Σ : $Γ['global']['findBestPack']['$tmp96'] = $Γ['global']['findBestPack']['$tmp96'];
                $tmp94 = $tmp95 > $tmp96;
                $Γ['global']['findBestPack']['$tmp94'] = sec_lvl('$tmp95', null, true, $Γ['global']['findBestPack']);
                $Γ['global']['findBestPack']['$tmp94'] instanceof Object ? $Γ['global']['findBestPack']['$tmp94'].Σ = $Γ['global']['findBestPack']['$tmp94'].Σ : $Γ['global']['findBestPack']['$tmp94'] = $Γ['global']['findBestPack']['$tmp94'];
                $Λ.push({
                    l: $Λ[$Λ.length - 1].l,
                    id: 'IF'
                });
                if ($tmp94) {
                    $tmp79[I] = C;
                    $Γ['global']['findBestPack']['$tmp79']['I'] = sec_lvl('C', null, false, $Γ['global']['findBestPack']);
                    _$tmp = sec_lvl('I', null, false, $Γ['global']['findBestPack']) instanceof Object ? sec_lvl('I', null, false, $Γ['global']['findBestPack']).Σ : sec_lvl('I', null, false, $Γ['global']['findBestPack']);
                    $Γ['global']['findBestPack']['$tmp79']['I'] instanceof Object ? $Γ['global']['findBestPack']['$tmp79']['I'].Σ = $Γ['global']['findBestPack']['$tmp79']['I'].Σ : $Γ['global']['findBestPack']['$tmp79']['I'] = $Γ['global']['findBestPack']['$tmp79']['I'];
                } else {
                    var $tmp79, $tmp98;
                    $Γ['global']['findBestPack']['$tmp98'] = $Γ['global']['findBestPack']['$tmp79'] = 0;
                    $tmp79 = b[w];
                    $Γ['global']['findBestPack']['$tmp79'] = {
                        Σ: 0,
                        prototype: { Σ: $Λ[$Λ.length - 1].l }
                    };
                    $Γ['global']['findBestPack']['$tmp79'] instanceof Object ? $Γ['global']['findBestPack']['$tmp79'].Σ = $Γ['global']['findBestPack']['$tmp79'].Σ : $Γ['global']['findBestPack']['$tmp79'] = $Γ['global']['findBestPack']['$tmp79'];
                    $tmp98 = I - 1;
                    $Γ['global']['findBestPack']['$tmp98'] = sec_lvl('I', null, true, $Γ['global']['findBestPack']);
                    $Γ['global']['findBestPack']['$tmp98'] instanceof Object ? $Γ['global']['findBestPack']['$tmp98'].Σ = $Γ['global']['findBestPack']['$tmp98'].Σ : $Γ['global']['findBestPack']['$tmp98'] = $Γ['global']['findBestPack']['$tmp98'];
                    $tmp79[I] = $tmp79[$tmp98];
                    $Γ['global']['findBestPack']['$tmp79']['I'] = sec_lvl('$tmp79', $tmp98, false, $Γ['global']['findBestPack']);
                    _$tmp = sec_lvl('I', null, false, $Γ['global']['findBestPack']) instanceof Object ? sec_lvl('I', null, false, $Γ['global']['findBestPack']).Σ : sec_lvl('I', null, false, $Γ['global']['findBestPack']);
                    $Γ['global']['findBestPack']['$tmp79']['I'] instanceof Object ? $Γ['global']['findBestPack']['$tmp79']['I'].Σ = $Γ['global']['findBestPack']['$tmp79']['I'].Σ : $Γ['global']['findBestPack']['$tmp79']['I'] = $Γ['global']['findBestPack']['$tmp79']['I'];
                }
                $Λ.pop();
                choose = $tmp79[I];
                $scope($Γ['global']['findBestPack'], 'choose', true)['choose'] = sec_lvl('$tmp79', I, false, $Γ['global']['findBestPack']);
                $scope($Γ['global']['findBestPack'], 'choose', true)['choose'] instanceof Object ? $scope($Γ['global']['findBestPack'], 'choose', true)['choose'].Σ = $scope($Γ['global']['findBestPack'], 'choose', true)['choose'].Σ : $scope($Γ['global']['findBestPack'], 'choose', true)['choose'] = $scope($Γ['global']['findBestPack'], 'choose', true)['choose'];
                $tmp62 = n++;
                $Γ['global']['findBestPack']['$tmp62'] = sec_lvl('n', null, false, $Γ['global']['findBestPack']);
                $Γ['global']['findBestPack']['$tmp62'] instanceof Object ? $Γ['global']['findBestPack']['$tmp62'].Σ = $Γ['global']['findBestPack']['$tmp62'].Σ : $Γ['global']['findBestPack']['$tmp62'] = $Γ['global']['findBestPack']['$tmp62'];
                $tmp63 = n <= N;
                $Γ['global']['findBestPack']['$tmp63'] = sec_lvl('n', null, true, $Γ['global']['findBestPack']);
                $Γ['global']['findBestPack']['$tmp63'] instanceof Object ? $Γ['global']['findBestPack']['$tmp63'].Σ = $Γ['global']['findBestPack']['$tmp63'].Σ : $Γ['global']['findBestPack']['$tmp63'] = $Γ['global']['findBestPack']['$tmp63'];
            }
            $upgrade(['$tmp73'], $Λ[$Λ.length - 1].l, $Γ['global']['findBestPack']);
            $Λ.pop();
            $tmp59 = j++;
            $Γ['global']['findBestPack']['$tmp59'] = sec_lvl('j', null, false, $Γ['global']['findBestPack']);
            $Γ['global']['findBestPack']['$tmp59'] instanceof Object ? $Γ['global']['findBestPack']['$tmp59'].Σ = $Γ['global']['findBestPack']['$tmp59'].Σ : $Γ['global']['findBestPack']['$tmp59'] = $Γ['global']['findBestPack']['$tmp59'];
            $tmp64 = data.length;
            $Γ['global']['findBestPack']['$tmp64'] = sec_lvl('data', 'length', false, $Γ['global']['findBestPack']);
            $Γ['global']['findBestPack']['$tmp64'] instanceof Object ? $Γ['global']['findBestPack']['$tmp64'].Σ = $Γ['global']['findBestPack']['$tmp64'].Σ : $Γ['global']['findBestPack']['$tmp64'] = $Γ['global']['findBestPack']['$tmp64'];
            $tmp60 = j < $tmp64;
            $Γ['global']['findBestPack']['$tmp60'] = sec_lvl('j', null, true, $Γ['global']['findBestPack']);
            $Γ['global']['findBestPack']['$tmp60'] instanceof Object ? $Γ['global']['findBestPack']['$tmp60'].Σ = $Γ['global']['findBestPack']['$tmp60'].Σ : $Γ['global']['findBestPack']['$tmp60'] = $Γ['global']['findBestPack']['$tmp60'];
        }
        $upgrade(['$tmp73'], $Λ[$Λ.length - 1].l, $Γ['global']['findBestPack']);
        $Λ.pop();
        $tmp32 = w++;
        $Γ['global']['findBestPack']['$tmp32'] = sec_lvl('w', null, false, $Γ['global']['findBestPack']);
        $Γ['global']['findBestPack']['$tmp32'] instanceof Object ? $Γ['global']['findBestPack']['$tmp32'].Σ = $Γ['global']['findBestPack']['$tmp32'].Σ : $Γ['global']['findBestPack']['$tmp32'] = $Γ['global']['findBestPack']['$tmp32'];
        $tmp33 = w <= 400;
        $Γ['global']['findBestPack']['$tmp33'] = sec_lvl('w', null, true, $Γ['global']['findBestPack']);
        $Γ['global']['findBestPack']['$tmp33'] instanceof Object ? $Γ['global']['findBestPack']['$tmp33'].Σ = $Γ['global']['findBestPack']['$tmp33'].Σ : $Γ['global']['findBestPack']['$tmp33'] = $Γ['global']['findBestPack']['$tmp33'];
    }
    $upgrade([
        'm',
        'b',
        '$tmp73'
    ], $Λ[$Λ.length - 1].l, $Γ['global']['findBestPack']);
    $Λ.pop();
    best = [];
    $Γ['global']['findBestPack']['best'] = {
        __proto__: {},
        scope: $Γ['global']['findBestPack'],
        Σ: $Λ[$Λ.length - 1].l
    };
    $tmp34 = data.length;
    $Γ['global']['findBestPack']['$tmp34'] = sec_lvl('data', 'length', false, $Γ['global']['findBestPack']);
    $Γ['global']['findBestPack']['$tmp34'] instanceof Object ? $Γ['global']['findBestPack']['$tmp34'].Σ = $Γ['global']['findBestPack']['$tmp34'].Σ : $Γ['global']['findBestPack']['$tmp34'] = $Γ['global']['findBestPack']['$tmp34'];
    j = $tmp34 - 1;
    $scope($Γ['global']['findBestPack'], 'j', true)['j'] = sec_lvl('$tmp34', null, true, $Γ['global']['findBestPack']);
    $scope($Γ['global']['findBestPack'], 'j', true)['j'] instanceof Object ? $scope($Γ['global']['findBestPack'], 'j', true)['j'].Σ = $scope($Γ['global']['findBestPack'], 'j', true)['j'].Σ : $scope($Γ['global']['findBestPack'], 'j', true)['j'] = $scope($Γ['global']['findBestPack'], 'j', true)['j'];
    $tmp36 = j >= 0;
    $Γ['global']['findBestPack']['$tmp36'] = sec_lvl('j', null, true, $Γ['global']['findBestPack']);
    $Γ['global']['findBestPack']['$tmp36'] instanceof Object ? $Γ['global']['findBestPack']['$tmp36'].Σ = $Γ['global']['findBestPack']['$tmp36'].Σ : $Γ['global']['findBestPack']['$tmp36'] = $Γ['global']['findBestPack']['$tmp36'];
    $Λ.push({
        l: $Λ[$Λ.length - 1].l,
        id: 'LOOP'
    });
    for (; $tmp36;) {
        var $tmp80, $tmp81, $tmp82, $tmp83, $tmp35, $tmp36;
        $Γ['global']['findBestPack']['$tmp36'] = $Γ['global']['findBestPack']['$tmp35'] = $Γ['global']['findBestPack']['$tmp83'] = $Γ['global']['findBestPack']['$tmp82'] = $Γ['global']['findBestPack']['$tmp81'] = $Γ['global']['findBestPack']['$tmp80'] = 0;
        $tmp81 = P[j];
        $Γ['global']['findBestPack']['$tmp81'] = sec_lvl('P', j, false, $Γ['global']['findBestPack']);
        $Γ['global']['findBestPack']['$tmp81'] instanceof Object ? $Γ['global']['findBestPack']['$tmp81'].Σ = $Γ['global']['findBestPack']['$tmp81'].Σ : $Γ['global']['findBestPack']['$tmp81'] = $Γ['global']['findBestPack']['$tmp81'];
        $tmp80 = choose / $tmp81;
        $Γ['global']['findBestPack']['$tmp80'] = sec_lvl('choose', null, true, $Γ['global']['findBestPack']);
        $Γ['global']['findBestPack']['$tmp80'] instanceof Object ? $Γ['global']['findBestPack']['$tmp80'].Σ = $Γ['global']['findBestPack']['$tmp80'].Σ : $Γ['global']['findBestPack']['$tmp80'] = $Γ['global']['findBestPack']['$tmp80'];
        best[j] = Math.floor($tmp80);
        $tmp82 = best[j];
        $Γ['global']['findBestPack']['$tmp82'] = sec_lvl('best', j, false, $Γ['global']['findBestPack']);
        $Γ['global']['findBestPack']['$tmp82'] instanceof Object ? $Γ['global']['findBestPack']['$tmp82'].Σ = $Γ['global']['findBestPack']['$tmp82'].Σ : $Γ['global']['findBestPack']['$tmp82'] = $Γ['global']['findBestPack']['$tmp82'];
        $tmp83 = P[j];
        $Γ['global']['findBestPack']['$tmp83'] = sec_lvl('P', j, false, $Γ['global']['findBestPack']);
        $Γ['global']['findBestPack']['$tmp83'] instanceof Object ? $Γ['global']['findBestPack']['$tmp83'].Σ = $Γ['global']['findBestPack']['$tmp83'].Σ : $Γ['global']['findBestPack']['$tmp83'] = $Γ['global']['findBestPack']['$tmp83'];
        choose -= $tmp82 * $tmp83;
        $scope($Γ['global']['findBestPack'], 'choose', true)['choose'] = sec_lvl('$tmp82', null, true, $Γ['global']['findBestPack']);
        $scope($Γ['global']['findBestPack'], 'choose', true)['choose'] instanceof Object ? $scope($Γ['global']['findBestPack'], 'choose', true)['choose'].Σ = $scope($Γ['global']['findBestPack'], 'choose', true)['choose'].Σ : $scope($Γ['global']['findBestPack'], 'choose', true)['choose'] = $scope($Γ['global']['findBestPack'], 'choose', true)['choose'];
        $tmp35 = j--;
        $Γ['global']['findBestPack']['$tmp35'] = sec_lvl('j', null, false, $Γ['global']['findBestPack']);
        $Γ['global']['findBestPack']['$tmp35'] instanceof Object ? $Γ['global']['findBestPack']['$tmp35'].Σ = $Γ['global']['findBestPack']['$tmp35'].Σ : $Γ['global']['findBestPack']['$tmp35'] = $Γ['global']['findBestPack']['$tmp35'];
        $tmp36 = j >= 0;
        $Γ['global']['findBestPack']['$tmp36'] = sec_lvl('j', null, true, $Γ['global']['findBestPack']);
        $Γ['global']['findBestPack']['$tmp36'] instanceof Object ? $Γ['global']['findBestPack']['$tmp36'].Σ = $Γ['global']['findBestPack']['$tmp36'].Σ : $Γ['global']['findBestPack']['$tmp36'] = $Γ['global']['findBestPack']['$tmp36'];
    }
    $upgrade(['best'], $Λ[$Λ.length - 1].l, $Γ['global']['findBestPack']);
    $Λ.pop();
    wgt = 0;
    $scope($Γ['global']['findBestPack'], 'wgt', true)['wgt'] = $Λ[$Λ.length - 1].l;
    val = 0;
    $scope($Γ['global']['findBestPack'], 'val', true)['val'] = $Λ[$Λ.length - 1].l;
    i = 0;
    $scope($Γ['global']['findBestPack'], 'i', true)['i'] = $Λ[$Λ.length - 1].l;
    $tmp39 = best.length;
    $Γ['global']['findBestPack']['$tmp39'] = sec_lvl('best', 'length', false, $Γ['global']['findBestPack']);
    $Γ['global']['findBestPack']['$tmp39'] instanceof Object ? $Γ['global']['findBestPack']['$tmp39'].Σ = $Γ['global']['findBestPack']['$tmp39'].Σ : $Γ['global']['findBestPack']['$tmp39'] = $Γ['global']['findBestPack']['$tmp39'];
    $tmp38 = i < $tmp39;
    $Γ['global']['findBestPack']['$tmp38'] = sec_lvl('i', null, true, $Γ['global']['findBestPack']);
    $Γ['global']['findBestPack']['$tmp38'] instanceof Object ? $Γ['global']['findBestPack']['$tmp38'].Σ = $Γ['global']['findBestPack']['$tmp38'].Σ : $Γ['global']['findBestPack']['$tmp38'] = $Γ['global']['findBestPack']['$tmp38'];
    $Λ.push({
        l: $Λ[$Λ.length - 1].l,
        id: 'LOOP'
    });
    for (; $tmp38;) {
        var $tmp84, $tmp85, $tmp86, $tmp87, $tmp88, $tmp89, $tmp90, $tmp37, $tmp38, $tmp91;
        $Γ['global']['findBestPack']['$tmp91'] = $Γ['global']['findBestPack']['$tmp38'] = $Γ['global']['findBestPack']['$tmp37'] = $Γ['global']['findBestPack']['$tmp90'] = $Γ['global']['findBestPack']['$tmp89'] = $Γ['global']['findBestPack']['$tmp88'] = $Γ['global']['findBestPack']['$tmp87'] = $Γ['global']['findBestPack']['$tmp86'] = $Γ['global']['findBestPack']['$tmp85'] = $Γ['global']['findBestPack']['$tmp84'] = 0;
        $tmp85 = best[i];
        $Γ['global']['findBestPack']['$tmp85'] = sec_lvl('best', i, false, $Γ['global']['findBestPack']);
        $Γ['global']['findBestPack']['$tmp85'] instanceof Object ? $Γ['global']['findBestPack']['$tmp85'].Σ = $Γ['global']['findBestPack']['$tmp85'].Σ : $Γ['global']['findBestPack']['$tmp85'] = $Γ['global']['findBestPack']['$tmp85'];
        $tmp84 = 0 == $tmp85;
        $Γ['global']['findBestPack']['$tmp84'] = $Λ[$Λ.length - 1].l;
        $Γ['global']['findBestPack']['$tmp84'] instanceof Object ? $Γ['global']['findBestPack']['$tmp84'].Σ = $Γ['global']['findBestPack']['$tmp84'].Σ : $Γ['global']['findBestPack']['$tmp84'] = $Γ['global']['findBestPack']['$tmp84'];
        $Λ.push({
            l: $Λ[$Λ.length - 1].l,
            id: 'IF'
        });
        if ($tmp84) {
            var $tmp37, $tmp38, $tmp92;
            $Γ['global']['findBestPack']['$tmp92'] = $Γ['global']['findBestPack']['$tmp38'] = $Γ['global']['findBestPack']['$tmp37'] = 0;
            $tmp37 = i++;
            $Γ['global']['findBestPack']['$tmp37'] = sec_lvl('i', null, false, $Γ['global']['findBestPack']);
            $Γ['global']['findBestPack']['$tmp37'] instanceof Object ? $Γ['global']['findBestPack']['$tmp37'].Σ = $Γ['global']['findBestPack']['$tmp37'].Σ : $Γ['global']['findBestPack']['$tmp37'] = $Γ['global']['findBestPack']['$tmp37'];
            $tmp92 = best.length;
            $Γ['global']['findBestPack']['$tmp92'] = sec_lvl('best', 'length', false, $Γ['global']['findBestPack']);
            $Γ['global']['findBestPack']['$tmp92'] instanceof Object ? $Γ['global']['findBestPack']['$tmp92'].Σ = $Γ['global']['findBestPack']['$tmp92'].Σ : $Γ['global']['findBestPack']['$tmp92'] = $Γ['global']['findBestPack']['$tmp92'];
            $tmp38 = i < $tmp92;
            $Γ['global']['findBestPack']['$tmp38'] = sec_lvl('i', null, true, $Γ['global']['findBestPack']);
            $Γ['global']['findBestPack']['$tmp38'] instanceof Object ? $Γ['global']['findBestPack']['$tmp38'].Σ = $Γ['global']['findBestPack']['$tmp38'].Σ : $Γ['global']['findBestPack']['$tmp38'] = $Γ['global']['findBestPack']['$tmp38'];
            continue;
            var $shouldComp = { 'lbl': 'LOOP' };
        } else {
        }
        if ($shouldComp)
            $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
        $Λ.pop();
        $tmp86 = best[i];
        $Γ['global']['findBestPack']['$tmp86'] = sec_lvl('best', i, false, $Γ['global']['findBestPack']);
        $Γ['global']['findBestPack']['$tmp86'] instanceof Object ? $Γ['global']['findBestPack']['$tmp86'].Σ = $Γ['global']['findBestPack']['$tmp86'].Σ : $Γ['global']['findBestPack']['$tmp86'] = $Γ['global']['findBestPack']['$tmp86'];
        $tmp88 = data[i];
        $Γ['global']['findBestPack']['$tmp88'] = sec_lvl('data', i, false, $Γ['global']['findBestPack']);
        $Γ['global']['findBestPack']['$tmp88'] instanceof Object ? $Γ['global']['findBestPack']['$tmp88'].Σ = $Γ['global']['findBestPack']['$tmp88'].Σ : $Γ['global']['findBestPack']['$tmp88'] = $Γ['global']['findBestPack']['$tmp88'];
        $tmp87 = $tmp88.weight;
        $Γ['global']['findBestPack']['$tmp87'] = sec_lvl('$tmp88', 'weight', false, $Γ['global']['findBestPack']);
        $Γ['global']['findBestPack']['$tmp87'] instanceof Object ? $Γ['global']['findBestPack']['$tmp87'].Σ = $Γ['global']['findBestPack']['$tmp87'].Σ : $Γ['global']['findBestPack']['$tmp87'] = $Γ['global']['findBestPack']['$tmp87'];
        wgt += $tmp86 * $tmp87;
        $scope($Γ['global']['findBestPack'], 'wgt', true)['wgt'] = sec_lvl('$tmp86', null, true, $Γ['global']['findBestPack']);
        $scope($Γ['global']['findBestPack'], 'wgt', true)['wgt'] instanceof Object ? $scope($Γ['global']['findBestPack'], 'wgt', true)['wgt'].Σ = $scope($Γ['global']['findBestPack'], 'wgt', true)['wgt'].Σ : $scope($Γ['global']['findBestPack'], 'wgt', true)['wgt'] = $scope($Γ['global']['findBestPack'], 'wgt', true)['wgt'];
        $tmp89 = best[i];
        $Γ['global']['findBestPack']['$tmp89'] = sec_lvl('best', i, false, $Γ['global']['findBestPack']);
        $Γ['global']['findBestPack']['$tmp89'] instanceof Object ? $Γ['global']['findBestPack']['$tmp89'].Σ = $Γ['global']['findBestPack']['$tmp89'].Σ : $Γ['global']['findBestPack']['$tmp89'] = $Γ['global']['findBestPack']['$tmp89'];
        $tmp88 = data[i];
        $Γ['global']['findBestPack']['$tmp88'] = sec_lvl('data', i, false, $Γ['global']['findBestPack']);
        $Γ['global']['findBestPack']['$tmp88'] instanceof Object ? $Γ['global']['findBestPack']['$tmp88'].Σ = $Γ['global']['findBestPack']['$tmp88'].Σ : $Γ['global']['findBestPack']['$tmp88'] = $Γ['global']['findBestPack']['$tmp88'];
        $tmp90 = $tmp88.value;
        $Γ['global']['findBestPack']['$tmp90'] = sec_lvl('$tmp88', 'value', false, $Γ['global']['findBestPack']);
        $Γ['global']['findBestPack']['$tmp90'] instanceof Object ? $Γ['global']['findBestPack']['$tmp90'].Σ = $Γ['global']['findBestPack']['$tmp90'].Σ : $Γ['global']['findBestPack']['$tmp90'] = $Γ['global']['findBestPack']['$tmp90'];
        val += $tmp89 * $tmp90;
        $scope($Γ['global']['findBestPack'], 'val', true)['val'] = sec_lvl('$tmp89', null, true, $Γ['global']['findBestPack']);
        $scope($Γ['global']['findBestPack'], 'val', true)['val'] instanceof Object ? $scope($Γ['global']['findBestPack'], 'val', true)['val'].Σ = $scope($Γ['global']['findBestPack'], 'val', true)['val'].Σ : $scope($Γ['global']['findBestPack'], 'val', true)['val'] = $scope($Γ['global']['findBestPack'], 'val', true)['val'];
        $tmp37 = i++;
        $Γ['global']['findBestPack']['$tmp37'] = sec_lvl('i', null, false, $Γ['global']['findBestPack']);
        $Γ['global']['findBestPack']['$tmp37'] instanceof Object ? $Γ['global']['findBestPack']['$tmp37'].Σ = $Γ['global']['findBestPack']['$tmp37'].Σ : $Γ['global']['findBestPack']['$tmp37'] = $Γ['global']['findBestPack']['$tmp37'];
        $tmp91 = best.length;
        $Γ['global']['findBestPack']['$tmp91'] = sec_lvl('best', 'length', false, $Γ['global']['findBestPack']);
        $Γ['global']['findBestPack']['$tmp91'] instanceof Object ? $Γ['global']['findBestPack']['$tmp91'].Σ = $Γ['global']['findBestPack']['$tmp91'].Σ : $Γ['global']['findBestPack']['$tmp91'] = $Γ['global']['findBestPack']['$tmp91'];
        $tmp38 = i < $tmp91;
        $Γ['global']['findBestPack']['$tmp38'] = sec_lvl('i', null, true, $Γ['global']['findBestPack']);
        $Γ['global']['findBestPack']['$tmp38'] instanceof Object ? $Γ['global']['findBestPack']['$tmp38'].Σ = $Γ['global']['findBestPack']['$tmp38'].Σ : $Γ['global']['findBestPack']['$tmp38'] = $Γ['global']['findBestPack']['$tmp38'];
    }
    $Λ.pop();
    $tmp41 = 'Total weight: ' + wgt;
    $Γ['global']['findBestPack']['$tmp41'] = $Λ[$Λ.length - 1].l;
    $Γ['global']['findBestPack']['$tmp41'] instanceof Object ? $Γ['global']['findBestPack']['$tmp41'].Σ = $Γ['global']['findBestPack']['$tmp41'].Σ : $Γ['global']['findBestPack']['$tmp41'] = $Γ['global']['findBestPack']['$tmp41'];
    $tmp40 = console.log($tmp41);
    $tmp43 = 'Total value: ' + val;
    $Γ['global']['findBestPack']['$tmp43'] = $Λ[$Λ.length - 1].l;
    $Γ['global']['findBestPack']['$tmp43'] instanceof Object ? $Γ['global']['findBestPack']['$tmp43'].Σ = $Γ['global']['findBestPack']['$tmp43'].Σ : $Γ['global']['findBestPack']['$tmp43'] = $Γ['global']['findBestPack']['$tmp43'];
    $tmp42 = console.log($tmp43);
    return;
}
$rf = $scope($Γ['global'], 'findBestPack', false)['findBestPack'];
$rf.scope = $Γ['global'];
$rf.$this = $Γ['global'];
$Λ.push({
    l: $rf.$fscope,
    id: 'FUNC'
});
$tmp22 = findBestPack();
$Γ['global']['$tmp22'] = $Λ.pop().l;
$Γ['global']['$tmp22'] instanceof Object ? $Γ['global']['$tmp22'].Σ = $Γ['global']['$tmp22'].Σ : $Γ['global']['$tmp22'] = $Γ['global']['$tmp22'];
