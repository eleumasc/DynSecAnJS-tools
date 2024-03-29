
var $Γ = { 'global': { 'scope': null, 'Σ': 0 } };

$Γ['global'].$this = $Γ['global'];

$Λ = [{ 'l': 0, id: 'global' }];
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

$Γ['global']['SplayTree'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$Γ['global']['SplayRun'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$Γ['global']['SplayTearDown'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$Γ['global']['SplaySetup'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$Γ['global']['InsertNewNode'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$Γ['global']['SplayUpdateStats'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    time: $Λ[$Λ.length - 1].l
};
$Γ['global']['SplayRMS'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$Γ['global']['GenerateKey'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$Γ['global']['GeneratePayloadTree'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    depth: $Λ[$Λ.length - 1].l,
    tag: $Λ[$Λ.length - 1].l
};
var performance, $tmp0, $λ0, kSplayTreeSize, kSplayTreeModifications, kSplayTreePayloadDepth, splayTree, splaySampleTimeStart, splaySamples, splaySumOfSquaredPauses, $tmp1, $tmp2, $tmp3, $tmp4, $tmp5;
$Γ['global']['$tmp5'] = $Γ['global']['$tmp4'] = $Γ['global']['$tmp3'] = $Γ['global']['$tmp2'] = $Γ['global']['$tmp1'] = $Γ['global']['splaySumOfSquaredPauses'] = $Γ['global']['splaySamples'] = $Γ['global']['splaySampleTimeStart'] = $Γ['global']['splayTree'] = $Γ['global']['kSplayTreePayloadDepth'] = $Γ['global']['kSplayTreeModifications'] = $Γ['global']['kSplayTreeSize'] = $Γ['global']['$\u03BB0'] = $Γ['global']['$tmp0'] = $Γ['global']['performance'] = 0;
$tmp0 = {};
$Γ['global']['$tmp0'] = {
    __proto__: {},
    Σ: $Λ[$Λ.length - 1].l
};
performance = performance || $tmp0;
$Γ['global']['performance'] = $lub(sec_lvl('performance', null, true, $Γ['global']), sec_lvl('$tmp0', null, true, $Γ['global']));
$Γ['global']['performance'] instanceof Object ? $Γ['global']['performance'].Σ = $lub($Γ['global']['performance'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['performance'] = $lub($Γ['global']['performance'], $Λ[$Λ.length - 1].l);
$λ0 = function () {
    var $tmp6, $tmp7, $tmp8, $tmp9, $tmp10, $tmp11, $tmp12, $tmp13, $tmp14, $tmp15, $tmp16;
    $Γ['global']['$\u03BB0']['$tmp16'] = $Γ['global']['$\u03BB0']['$tmp15'] = $Γ['global']['$\u03BB0']['$tmp14'] = $Γ['global']['$\u03BB0']['$tmp13'] = $Γ['global']['$\u03BB0']['$tmp12'] = $Γ['global']['$\u03BB0']['$tmp11'] = $Γ['global']['$\u03BB0']['$tmp10'] = $Γ['global']['$\u03BB0']['$tmp9'] = $Γ['global']['$\u03BB0']['$tmp8'] = $Γ['global']['$\u03BB0']['$tmp7'] = $Γ['global']['$\u03BB0']['$tmp6'] = 0;
    $tmp11 = performance.now;
    $Γ['global']['$\u03BB0']['$tmp11'] = sec_lvl('performance', 'now', false, $Γ['global']['$\u03BB0']);
    $Γ['global']['$\u03BB0']['$tmp11'] instanceof Object ? $Γ['global']['$\u03BB0']['$tmp11'].Σ = $lub($Γ['global']['$\u03BB0']['$tmp11'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$\u03BB0']['$tmp11'] = $lub($Γ['global']['$\u03BB0']['$tmp11'], $Λ[$Λ.length - 1].l);
    $tmp12 = performance.mozNow;
    $Γ['global']['$\u03BB0']['$tmp12'] = sec_lvl('performance', 'mozNow', false, $Γ['global']['$\u03BB0']);
    $Γ['global']['$\u03BB0']['$tmp12'] instanceof Object ? $Γ['global']['$\u03BB0']['$tmp12'].Σ = $lub($Γ['global']['$\u03BB0']['$tmp12'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$\u03BB0']['$tmp12'] = $lub($Γ['global']['$\u03BB0']['$tmp12'], $Λ[$Λ.length - 1].l);
    $tmp10 = $tmp11 || $tmp12;
    $Γ['global']['$\u03BB0']['$tmp10'] = $lub(sec_lvl('$tmp11', null, true, $Γ['global']['$\u03BB0']), sec_lvl('$tmp12', null, true, $Γ['global']['$\u03BB0']));
    $Γ['global']['$\u03BB0']['$tmp10'] instanceof Object ? $Γ['global']['$\u03BB0']['$tmp10'].Σ = $lub($Γ['global']['$\u03BB0']['$tmp10'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$\u03BB0']['$tmp10'] = $lub($Γ['global']['$\u03BB0']['$tmp10'], $Λ[$Λ.length - 1].l);
    $tmp13 = performance.msNow;
    $Γ['global']['$\u03BB0']['$tmp13'] = sec_lvl('performance', 'msNow', false, $Γ['global']['$\u03BB0']);
    $Γ['global']['$\u03BB0']['$tmp13'] instanceof Object ? $Γ['global']['$\u03BB0']['$tmp13'].Σ = $lub($Γ['global']['$\u03BB0']['$tmp13'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$\u03BB0']['$tmp13'] = $lub($Γ['global']['$\u03BB0']['$tmp13'], $Λ[$Λ.length - 1].l);
    $tmp9 = $tmp10 || $tmp13;
    $Γ['global']['$\u03BB0']['$tmp9'] = $lub(sec_lvl('$tmp10', null, true, $Γ['global']['$\u03BB0']), sec_lvl('$tmp13', null, true, $Γ['global']['$\u03BB0']));
    $Γ['global']['$\u03BB0']['$tmp9'] instanceof Object ? $Γ['global']['$\u03BB0']['$tmp9'].Σ = $lub($Γ['global']['$\u03BB0']['$tmp9'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$\u03BB0']['$tmp9'] = $lub($Γ['global']['$\u03BB0']['$tmp9'], $Λ[$Λ.length - 1].l);
    $tmp14 = performance.oNow;
    $Γ['global']['$\u03BB0']['$tmp14'] = sec_lvl('performance', 'oNow', false, $Γ['global']['$\u03BB0']);
    $Γ['global']['$\u03BB0']['$tmp14'] instanceof Object ? $Γ['global']['$\u03BB0']['$tmp14'].Σ = $lub($Γ['global']['$\u03BB0']['$tmp14'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$\u03BB0']['$tmp14'] = $lub($Γ['global']['$\u03BB0']['$tmp14'], $Λ[$Λ.length - 1].l);
    $tmp8 = $tmp9 || $tmp14;
    $Γ['global']['$\u03BB0']['$tmp8'] = $lub(sec_lvl('$tmp9', null, true, $Γ['global']['$\u03BB0']), sec_lvl('$tmp14', null, true, $Γ['global']['$\u03BB0']));
    $Γ['global']['$\u03BB0']['$tmp8'] instanceof Object ? $Γ['global']['$\u03BB0']['$tmp8'].Σ = $lub($Γ['global']['$\u03BB0']['$tmp8'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$\u03BB0']['$tmp8'] = $lub($Γ['global']['$\u03BB0']['$tmp8'], $Λ[$Λ.length - 1].l);
    $tmp15 = performance.webkitNow;
    $Γ['global']['$\u03BB0']['$tmp15'] = sec_lvl('performance', 'webkitNow', false, $Γ['global']['$\u03BB0']);
    $Γ['global']['$\u03BB0']['$tmp15'] instanceof Object ? $Γ['global']['$\u03BB0']['$tmp15'].Σ = $lub($Γ['global']['$\u03BB0']['$tmp15'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$\u03BB0']['$tmp15'] = $lub($Γ['global']['$\u03BB0']['$tmp15'], $Λ[$Λ.length - 1].l);
    $tmp7 = $tmp8 || $tmp15;
    $Γ['global']['$\u03BB0']['$tmp7'] = $lub(sec_lvl('$tmp8', null, true, $Γ['global']['$\u03BB0']), sec_lvl('$tmp15', null, true, $Γ['global']['$\u03BB0']));
    $Γ['global']['$\u03BB0']['$tmp7'] instanceof Object ? $Γ['global']['$\u03BB0']['$tmp7'].Σ = $lub($Γ['global']['$\u03BB0']['$tmp7'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$\u03BB0']['$tmp7'] = $lub($Γ['global']['$\u03BB0']['$tmp7'], $Λ[$Λ.length - 1].l);
    $tmp16 = Date.now;
    $Γ['global']['$\u03BB0']['$tmp16'] = {
        Σ: 0,
        prototype: { Σ: $Λ[$Λ.length - 1].l }
    };
    $Γ['global']['$\u03BB0']['$tmp16'] instanceof Object ? $Γ['global']['$\u03BB0']['$tmp16'].Σ = $lub($Γ['global']['$\u03BB0']['$tmp16'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$\u03BB0']['$tmp16'] = $lub($Γ['global']['$\u03BB0']['$tmp16'], $Λ[$Λ.length - 1].l);
    $tmp6 = $tmp7 || $tmp16;
    $Γ['global']['$\u03BB0']['$tmp6'] = $lub(sec_lvl('$tmp7', null, true, $Γ['global']['$\u03BB0']), sec_lvl('$tmp16', null, true, $Γ['global']['$\u03BB0']));
    $Γ['global']['$\u03BB0']['$tmp6'] instanceof Object ? $Γ['global']['$\u03BB0']['$tmp6'].Σ = $lub($Γ['global']['$\u03BB0']['$tmp6'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$\u03BB0']['$tmp6'] = $lub($Γ['global']['$\u03BB0']['$tmp6'], $Λ[$Λ.length - 1].l);
    return $tmp6;
};
$Γ['global']['$\u03BB0'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
performance.now = $λ0();
kSplayTreeSize = 8000;
$Γ['global']['kSplayTreeSize'] = $Λ[$Λ.length - 1].l;
kSplayTreeModifications = 80;
$Γ['global']['kSplayTreeModifications'] = $Λ[$Λ.length - 1].l;
kSplayTreePayloadDepth = 5;
$Γ['global']['kSplayTreePayloadDepth'] = $Λ[$Λ.length - 1].l;
splayTree = null;
$Γ['global']['splayTree'] = $Λ[$Λ.length - 1].l;
splaySampleTimeStart = 0;
$Γ['global']['splaySampleTimeStart'] = $Λ[$Λ.length - 1].l;
function GeneratePayloadTree(depth, tag) {
    var $tmp17;
    $Γ['global']['GeneratePayloadTree']['$tmp17'] = 0;
    $tmp17 = depth == 0;
    $Γ['global']['GeneratePayloadTree']['$tmp17'] = $lub(sec_lvl('depth', null, true, $Γ['global']['GeneratePayloadTree']), $Λ[$Λ.length - 1].l);
    $Γ['global']['GeneratePayloadTree']['$tmp17'] instanceof Object ? $Γ['global']['GeneratePayloadTree']['$tmp17'].Σ = $lub($Γ['global']['GeneratePayloadTree']['$tmp17'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['GeneratePayloadTree']['$tmp17'] = $lub($Γ['global']['GeneratePayloadTree']['$tmp17'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp17', null, true, $Γ['global']['GeneratePayloadTree'])),
        id: 'IF'
    });
    if ($tmp17) {
        $upgrade([
            '$tmp23',
            '$tmp25',
            '$tmp22'
        ], $Λ[$Λ.length - 1].l, $Γ['global']['GeneratePayloadTree']);
        var $tmp18, $tmp19, $tmp20, $tmp21;
        $Γ['global']['GeneratePayloadTree']['$tmp21'] = $Γ['global']['GeneratePayloadTree']['$tmp20'] = $Γ['global']['GeneratePayloadTree']['$tmp19'] = $Γ['global']['GeneratePayloadTree']['$tmp18'] = 0;
        $tmp19 = [
            0,
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9
        ];
        $Γ['global']['GeneratePayloadTree']['$tmp19'] = {
            __proto__: {},
            scope: $Γ['global']['GeneratePayloadTree'],
            0: $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l),
            1: $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l),
            2: $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l),
            3: $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l),
            4: $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l),
            5: $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l),
            6: $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l),
            7: $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l),
            8: $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l),
            9: $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l),
            Σ: $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l)
        };
        $tmp21 = 'String for key ' + tag;
        $Γ['global']['GeneratePayloadTree']['$tmp21'] = $lub($Λ[$Λ.length - 1].l, sec_lvl('tag', null, true, $Γ['global']['GeneratePayloadTree']));
        $Γ['global']['GeneratePayloadTree']['$tmp21'] instanceof Object ? $Γ['global']['GeneratePayloadTree']['$tmp21'].Σ = $lub($Γ['global']['GeneratePayloadTree']['$tmp21'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['GeneratePayloadTree']['$tmp21'] = $lub($Γ['global']['GeneratePayloadTree']['$tmp21'], $Λ[$Λ.length - 1].l);
        $tmp20 = $tmp21 + ' in leaf node';
        $Γ['global']['GeneratePayloadTree']['$tmp20'] = $lub(sec_lvl('$tmp21', null, true, $Γ['global']['GeneratePayloadTree']), $Λ[$Λ.length - 1].l);
        $Γ['global']['GeneratePayloadTree']['$tmp20'] instanceof Object ? $Γ['global']['GeneratePayloadTree']['$tmp20'].Σ = $lub($Γ['global']['GeneratePayloadTree']['$tmp20'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['GeneratePayloadTree']['$tmp20'] = $lub($Γ['global']['GeneratePayloadTree']['$tmp20'], $Λ[$Λ.length - 1].l);
        $tmp18 = {
            array: $tmp19,
            string: $tmp20
        };
        $Γ['global']['GeneratePayloadTree']['$tmp18'] = {
            __proto__: {},
            array: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp19', null, true, $Γ['global']['GeneratePayloadTree'])),
            string: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp20', null, true, $Γ['global']['GeneratePayloadTree'])),
            Σ: $lub(sec_lvl('$tmp19', null, true, $Γ['global']['GeneratePayloadTree']), sec_lvl('$tmp20', null, true, $Γ['global']['GeneratePayloadTree']), $Λ[$Λ.length - 1].l)
        };
        return $tmp18;
        var $shouldComp = { 'lbl': 'FUNC' };
    } else {
        $upgrade([
            '$tmp19',
            '$tmp18'
        ], $Λ[$Λ.length - 1].l, $Γ['global']['GeneratePayloadTree']);
        var $tmp22, $tmp23, $tmp24, $tmp25, $tmp26;
        $Γ['global']['GeneratePayloadTree']['$tmp26'] = $Γ['global']['GeneratePayloadTree']['$tmp25'] = $Γ['global']['GeneratePayloadTree']['$tmp24'] = $Γ['global']['GeneratePayloadTree']['$tmp23'] = $Γ['global']['GeneratePayloadTree']['$tmp22'] = 0;
        $tmp24 = depth - 1;
        $Γ['global']['GeneratePayloadTree']['$tmp24'] = $lub(sec_lvl('depth', null, true, $Γ['global']['GeneratePayloadTree']), $Λ[$Λ.length - 1].l);
        $Γ['global']['GeneratePayloadTree']['$tmp24'] instanceof Object ? $Γ['global']['GeneratePayloadTree']['$tmp24'].Σ = $lub($Γ['global']['GeneratePayloadTree']['$tmp24'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['GeneratePayloadTree']['$tmp24'] = $lub($Γ['global']['GeneratePayloadTree']['$tmp24'], $Λ[$Λ.length - 1].l);
        $rf = $scope($Γ['global'], 'GeneratePayloadTree', false)['GeneratePayloadTree'];
        $rf.scope = $Γ['global']['GeneratePayloadTree'];
        $rf.$this = $Γ['global'];
        $rf['depth'] = $lub(sec_lvl('$tmp24', null, true, $Γ['global']['GeneratePayloadTree']), $Λ[$Λ.length - 1].l);
        $rf['tag'] = $lub(sec_lvl('tag', null, true, $Γ['global']['GeneratePayloadTree']), $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
            id: 'FUNC'
        });
        $tmp23 = GeneratePayloadTree($tmp24, tag);
        $Γ['global']['GeneratePayloadTree']['$tmp23'] = $Λ.pop().l;
        $Γ['global']['GeneratePayloadTree']['$tmp23'] instanceof Object ? $Γ['global']['GeneratePayloadTree']['$tmp23'].Σ = $lub($Γ['global']['GeneratePayloadTree']['$tmp23'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['GeneratePayloadTree']['$tmp23'] = $lub($Γ['global']['GeneratePayloadTree']['$tmp23'], $Λ[$Λ.length - 1].l);
        $tmp26 = depth - 1;
        $Γ['global']['GeneratePayloadTree']['$tmp26'] = $lub(sec_lvl('depth', null, true, $Γ['global']['GeneratePayloadTree']), $Λ[$Λ.length - 1].l);
        $Γ['global']['GeneratePayloadTree']['$tmp26'] instanceof Object ? $Γ['global']['GeneratePayloadTree']['$tmp26'].Σ = $lub($Γ['global']['GeneratePayloadTree']['$tmp26'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['GeneratePayloadTree']['$tmp26'] = $lub($Γ['global']['GeneratePayloadTree']['$tmp26'], $Λ[$Λ.length - 1].l);
        $rf = $scope($Γ['global'], 'GeneratePayloadTree', false)['GeneratePayloadTree'];
        $rf.scope = $Γ['global']['GeneratePayloadTree'];
        $rf.$this = $Γ['global'];
        $rf['depth'] = $lub(sec_lvl('$tmp26', null, true, $Γ['global']['GeneratePayloadTree']), $Λ[$Λ.length - 1].l);
        $rf['tag'] = $lub(sec_lvl('tag', null, true, $Γ['global']['GeneratePayloadTree']), $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
            id: 'FUNC'
        });
        $tmp25 = GeneratePayloadTree($tmp26, tag);
        $Γ['global']['GeneratePayloadTree']['$tmp25'] = $Λ.pop().l;
        $Γ['global']['GeneratePayloadTree']['$tmp25'] instanceof Object ? $Γ['global']['GeneratePayloadTree']['$tmp25'].Σ = $lub($Γ['global']['GeneratePayloadTree']['$tmp25'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['GeneratePayloadTree']['$tmp25'] = $lub($Γ['global']['GeneratePayloadTree']['$tmp25'], $Λ[$Λ.length - 1].l);
        $tmp22 = {
            left: $tmp23,
            right: $tmp25
        };
        $Γ['global']['GeneratePayloadTree']['$tmp22'] = {
            __proto__: {},
            left: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp23', null, true, $Γ['global']['GeneratePayloadTree'])),
            right: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp25', null, true, $Γ['global']['GeneratePayloadTree'])),
            Σ: $lub(sec_lvl('$tmp23', null, true, $Γ['global']['GeneratePayloadTree']), sec_lvl('$tmp25', null, true, $Γ['global']['GeneratePayloadTree']), $Λ[$Λ.length - 1].l)
        };
        return $tmp22;
        var $shouldComp = { 'lbl': 'FUNC' };
    }
    if ($shouldComp)
        $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
    $Λ.pop();
    return;
}
function GenerateKey() {
    var $tmp27;
    $Γ['global']['GenerateKey']['$tmp27'] = 0;
    $tmp27 = Math.random();
    return $tmp27;
}
splaySamples = 0;
$Γ['global']['splaySamples'] = $Λ[$Λ.length - 1].l;
splaySumOfSquaredPauses = 0;
$Γ['global']['splaySumOfSquaredPauses'] = $Λ[$Λ.length - 1].l;
function SplayRMS() {
    var $tmp28, $tmp29, $tmp30, $tmp31;
    $Γ['global']['SplayRMS']['$tmp31'] = $Γ['global']['SplayRMS']['$tmp30'] = $Γ['global']['SplayRMS']['$tmp29'] = $Γ['global']['SplayRMS']['$tmp28'] = 0;
    $tmp31 = splaySumOfSquaredPauses / splaySamples;
    $Γ['global']['SplayRMS']['$tmp31'] = $lub(sec_lvl('splaySumOfSquaredPauses', null, true, $Γ['global']['SplayRMS']), sec_lvl('splaySamples', null, true, $Γ['global']['SplayRMS']));
    $Γ['global']['SplayRMS']['$tmp31'] instanceof Object ? $Γ['global']['SplayRMS']['$tmp31'].Σ = $lub($Γ['global']['SplayRMS']['$tmp31'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['SplayRMS']['$tmp31'] = $lub($Γ['global']['SplayRMS']['$tmp31'], $Λ[$Λ.length - 1].l);
    $tmp30 = Math.sqrt($tmp31);
    $tmp29 = $tmp30 * 10000;
    $Γ['global']['SplayRMS']['$tmp29'] = $lub(sec_lvl('$tmp30', null, true, $Γ['global']['SplayRMS']), $Λ[$Λ.length - 1].l);
    $Γ['global']['SplayRMS']['$tmp29'] instanceof Object ? $Γ['global']['SplayRMS']['$tmp29'].Σ = $lub($Γ['global']['SplayRMS']['$tmp29'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['SplayRMS']['$tmp29'] = $lub($Γ['global']['SplayRMS']['$tmp29'], $Λ[$Λ.length - 1].l);
    $tmp28 = Math.round($tmp29);
    return $tmp28;
}
function SplayUpdateStats(time) {
    var pause, $tmp32;
    $Γ['global']['SplayUpdateStats']['$tmp32'] = $Γ['global']['SplayUpdateStats']['pause'] = 0;
    pause = time - splaySampleTimeStart;
    $scope($Γ['global']['SplayUpdateStats'], 'pause', true)['pause'] = $lub(sec_lvl('time', null, true, $Γ['global']['SplayUpdateStats']), sec_lvl('splaySampleTimeStart', null, true, $Γ['global']['SplayUpdateStats']));
    $scope($Γ['global']['SplayUpdateStats'], 'pause', true)['pause'] instanceof Object ? $scope($Γ['global']['SplayUpdateStats'], 'pause', true)['pause'].Σ = $lub($scope($Γ['global']['SplayUpdateStats'], 'pause', true)['pause'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['SplayUpdateStats'], 'pause', true)['pause'] = $lub($scope($Γ['global']['SplayUpdateStats'], 'pause', true)['pause'], $Λ[$Λ.length - 1].l);
    splaySampleTimeStart = time;
    $scope($Γ['global']['SplayUpdateStats'], 'splaySampleTimeStart', true)['splaySampleTimeStart'] = sec_lvl('time', null, false, $Γ['global']['SplayUpdateStats']);
    $scope($Γ['global']['SplayUpdateStats'], 'splaySampleTimeStart', true)['splaySampleTimeStart'] instanceof Object ? $scope($Γ['global']['SplayUpdateStats'], 'splaySampleTimeStart', true)['splaySampleTimeStart'].Σ = $lub($scope($Γ['global']['SplayUpdateStats'], 'splaySampleTimeStart', true)['splaySampleTimeStart'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['SplayUpdateStats'], 'splaySampleTimeStart', true)['splaySampleTimeStart'] = $lub($scope($Γ['global']['SplayUpdateStats'], 'splaySampleTimeStart', true)['splaySampleTimeStart'], $Λ[$Λ.length - 1].l);
    $tmp32 = splaySamples++;
    $Γ['global']['SplayUpdateStats']['$tmp32'] = sec_lvl('splaySamples', null, false, $Γ['global']['SplayUpdateStats']);
    $Γ['global']['SplayUpdateStats']['$tmp32'] instanceof Object ? $Γ['global']['SplayUpdateStats']['$tmp32'].Σ = $lub($Γ['global']['SplayUpdateStats']['$tmp32'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['SplayUpdateStats']['$tmp32'] = $lub($Γ['global']['SplayUpdateStats']['$tmp32'], $Λ[$Λ.length - 1].l);
    splaySumOfSquaredPauses += pause * pause;
    $scope($Γ['global']['SplayUpdateStats'], 'splaySumOfSquaredPauses', true)['splaySumOfSquaredPauses'] = $lub(sec_lvl('pause', null, true, $Γ['global']['SplayUpdateStats']), sec_lvl('pause', null, true, $Γ['global']['SplayUpdateStats']));
    $scope($Γ['global']['SplayUpdateStats'], 'splaySumOfSquaredPauses', true)['splaySumOfSquaredPauses'] instanceof Object ? $scope($Γ['global']['SplayUpdateStats'], 'splaySumOfSquaredPauses', true)['splaySumOfSquaredPauses'].Σ = $lub($scope($Γ['global']['SplayUpdateStats'], 'splaySumOfSquaredPauses', true)['splaySumOfSquaredPauses'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['SplayUpdateStats'], 'splaySumOfSquaredPauses', true)['splaySumOfSquaredPauses'] = $lub($scope($Γ['global']['SplayUpdateStats'], 'splaySumOfSquaredPauses', true)['splaySumOfSquaredPauses'], $Λ[$Λ.length - 1].l);
    return;
}
function InsertNewNode() {
    var key, $tmp33, payload, $tmp34, $tmp35;
    $Γ['global']['InsertNewNode']['$tmp35'] = $Γ['global']['InsertNewNode']['$tmp34'] = $Γ['global']['InsertNewNode']['payload'] = $Γ['global']['InsertNewNode']['$tmp33'] = $Γ['global']['InsertNewNode']['key'] = 0;
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp33', null, true, $Γ['global']['InsertNewNode'])),
        id: 'LOOP'
    });
    do {
        $rf = $scope($Γ['global']['InsertNewNode'], 'GenerateKey', false)['GenerateKey'];
        $rf.scope = $Γ['global']['InsertNewNode'];
        $rf.$this = $Γ['global'];
        $Λ.push({
            l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
            id: 'FUNC'
        });
        key = GenerateKey();
        $scope($Γ['global']['InsertNewNode'], 'key', true)['key'] = $Λ.pop().l;
        $scope($Γ['global']['InsertNewNode'], 'key', true)['key'] instanceof Object ? $scope($Γ['global']['InsertNewNode'], 'key', true)['key'].Σ = $lub($scope($Γ['global']['InsertNewNode'], 'key', true)['key'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['InsertNewNode'], 'key', true)['key'] = $lub($scope($Γ['global']['InsertNewNode'], 'key', true)['key'], $Λ[$Λ.length - 1].l);
        var $tmp33, $tmp36;
        $Γ['global']['InsertNewNode']['$tmp36'] = $Γ['global']['InsertNewNode']['$tmp33'] = 0;
        $rf = $prop('$tmp1', 'find', $Γ['global']['InsertNewNode']);
        $rf.scope = $Γ['global']['InsertNewNode'];
        $rf.$this = $scope($Γ['global']['InsertNewNode'], 'SplayTree', false)['SplayTree'];
        $rf['key'] = $lub(sec_lvl('key', null, true, $Γ['global']['InsertNewNode']), $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
            id: 'FUNC'
        });
        $tmp36 = splayTree.find(key);
        $Γ['global']['InsertNewNode']['$tmp36'] = $Λ.pop().l;
        $Γ['global']['InsertNewNode']['$tmp36'] instanceof Object ? $Γ['global']['InsertNewNode']['$tmp36'].Σ = $lub($Γ['global']['InsertNewNode']['$tmp36'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['InsertNewNode']['$tmp36'] = $lub($Γ['global']['InsertNewNode']['$tmp36'], $Λ[$Λ.length - 1].l);
        $tmp33 = $tmp36 != null;
        $Γ['global']['InsertNewNode']['$tmp33'] = $lub(sec_lvl('$tmp36', null, true, $Γ['global']['InsertNewNode']), $Λ[$Λ.length - 1].l);
        $Γ['global']['InsertNewNode']['$tmp33'] instanceof Object ? $Γ['global']['InsertNewNode']['$tmp33'].Σ = $lub($Γ['global']['InsertNewNode']['$tmp33'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['InsertNewNode']['$tmp33'] = $lub($Γ['global']['InsertNewNode']['$tmp33'], $Λ[$Λ.length - 1].l);
    } while ($tmp33);
    $upgrade([
        'key',
        '$tmp36'
    ], $Λ[$Λ.length - 1].l, $Γ['global']['InsertNewNode']);
    $Λ.pop();
    $tmp34 = String(key);
    $rf = $scope($Γ['global']['InsertNewNode'], 'GeneratePayloadTree', false)['GeneratePayloadTree'];
    $rf.scope = $Γ['global']['InsertNewNode'];
    $rf.$this = $Γ['global'];
    $rf['depth'] = $lub(sec_lvl('kSplayTreePayloadDepth', null, true, $Γ['global']['InsertNewNode']), $Λ[$Λ.length - 1].l);
    $rf['tag'] = $lub(sec_lvl('$tmp34', null, true, $Γ['global']['InsertNewNode']), $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    payload = GeneratePayloadTree(kSplayTreePayloadDepth, $tmp34);
    $scope($Γ['global']['InsertNewNode'], 'payload', true)['payload'] = $Λ.pop().l;
    $scope($Γ['global']['InsertNewNode'], 'payload', true)['payload'] instanceof Object ? $scope($Γ['global']['InsertNewNode'], 'payload', true)['payload'].Σ = $lub($scope($Γ['global']['InsertNewNode'], 'payload', true)['payload'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['InsertNewNode'], 'payload', true)['payload'] = $lub($scope($Γ['global']['InsertNewNode'], 'payload', true)['payload'], $Λ[$Λ.length - 1].l);
    $rf = $prop('$tmp1', 'insert', $Γ['global']['InsertNewNode']);
    $rf.scope = $Γ['global']['InsertNewNode'];
    $rf.$this = $scope($Γ['global']['InsertNewNode'], 'SplayTree', false)['SplayTree'];
    $rf['key'] = $lub(sec_lvl('key', null, true, $Γ['global']['InsertNewNode']), $Λ[$Λ.length - 1].l);
    $rf['value'] = $lub(sec_lvl('payload', null, true, $Γ['global']['InsertNewNode']), $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp35 = splayTree.insert(key, payload);
    $Γ['global']['InsertNewNode']['$tmp35'] = $Λ.pop().l;
    $Γ['global']['InsertNewNode']['$tmp35'] instanceof Object ? $Γ['global']['InsertNewNode']['$tmp35'].Σ = $lub($Γ['global']['InsertNewNode']['$tmp35'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['InsertNewNode']['$tmp35'] = $lub($Γ['global']['InsertNewNode']['$tmp35'], $Λ[$Λ.length - 1].l);
    return key;
}
function SplaySetup() {
    var $tmp37, $tmp38, i, $tmp40;
    $Γ['global']['SplaySetup']['$tmp40'] = $Γ['global']['SplaySetup']['i'] = $Γ['global']['SplaySetup']['$tmp38'] = $Γ['global']['SplaySetup']['$tmp37'] = 0;
    $tmp38 = performance.now;
    $Γ['global']['SplaySetup']['$tmp38'] = sec_lvl('performance', 'now', false, $Γ['global']['SplaySetup']);
    $Γ['global']['SplaySetup']['$tmp38'] instanceof Object ? $Γ['global']['SplaySetup']['$tmp38'].Σ = $lub($Γ['global']['SplaySetup']['$tmp38'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['SplaySetup']['$tmp38'] = $lub($Γ['global']['SplaySetup']['$tmp38'], $Λ[$Λ.length - 1].l);
    $tmp37 = !$tmp38;
    $Γ['global']['SplaySetup']['$tmp37'] = sec_lvl('$tmp38', null, false, $Γ['global']['SplaySetup']);
    $Γ['global']['SplaySetup']['$tmp37'] instanceof Object ? $Γ['global']['SplaySetup']['$tmp37'].Σ = $lub($Γ['global']['SplaySetup']['$tmp37'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['SplaySetup']['$tmp37'] = $lub($Γ['global']['SplaySetup']['$tmp37'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp37', null, true, $Γ['global']['SplaySetup'])),
        id: 'IF'
    });
    if ($tmp37) {
        var $tmp41;
        $Γ['global']['SplaySetup']['$tmp41'] = 0;
        $tmp41 = 'PerformanceNowUnsupported';
        $Γ['global']['SplaySetup']['$tmp41'] = $Λ[$Λ.length - 1].l;
        $old_pc = $pc();
        while ($pc().id !== 'FUNC' && $pc().id !== 'TRY') {
            $Λ.pop();
        }
        $Λ[$Λ.length - 1] = { 'l': $lub($old_pc.l, sec_lvl('$tmp41', null, true, $Γ['global']['SplaySetup'])) };
        throw $tmp41;
        var $shouldComp = { 'lbl': 'FUNC' };
    } else {
    }
    if ($shouldComp)
        $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
    $Λ.pop();
    $rf = $scope($Γ['global']['SplaySetup'], 'SplayTree', false)['SplayTree'];
    $rf.scope = $Γ['global']['SplaySetup'];
    $rf.$this = {
        Σ: $Λ[$Λ.length - 1].l,
        __$proto__: $rf.prototype
    };
    $rf.InvokedAsContr = true;
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    splayTree = new SplayTree();
    $scope($Γ['global']['SplaySetup'], 'splayTree', true)['splayTree'] = $Λ.pop().l;
    $scope($Γ['global']['SplaySetup'], 'splayTree', true)['splayTree'] instanceof Object ? $scope($Γ['global']['SplaySetup'], 'splayTree', true)['splayTree'].Σ = $lub($scope($Γ['global']['SplaySetup'], 'splayTree', true)['splayTree'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['SplaySetup'], 'splayTree', true)['splayTree'] = $lub($scope($Γ['global']['SplaySetup'], 'splayTree', true)['splayTree'], $Λ[$Λ.length - 1].l);
    splaySampleTimeStart = performance.now();
    i = 0;
    $scope($Γ['global']['SplaySetup'], 'i', true)['i'] = $Λ[$Λ.length - 1].l;
    $tmp40 = i < kSplayTreeSize;
    $Γ['global']['SplaySetup']['$tmp40'] = $lub(sec_lvl('i', null, true, $Γ['global']['SplaySetup']), sec_lvl('kSplayTreeSize', null, true, $Γ['global']['SplaySetup']));
    $Γ['global']['SplaySetup']['$tmp40'] instanceof Object ? $Γ['global']['SplaySetup']['$tmp40'].Σ = $lub($Γ['global']['SplaySetup']['$tmp40'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['SplaySetup']['$tmp40'] = $lub($Γ['global']['SplaySetup']['$tmp40'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp40', null, true, $Γ['global']['SplaySetup'])),
        id: 'LOOP'
    });
    for (; $tmp40;) {
        var $tmp42, $tmp43, $tmp44, $tmp45, $tmp39, $tmp40;
        $Γ['global']['SplaySetup']['$tmp40'] = $Γ['global']['SplaySetup']['$tmp39'] = $Γ['global']['SplaySetup']['$tmp45'] = $Γ['global']['SplaySetup']['$tmp44'] = $Γ['global']['SplaySetup']['$tmp43'] = $Γ['global']['SplaySetup']['$tmp42'] = 0;
        $rf = $scope($Γ['global']['SplaySetup'], 'InsertNewNode', false)['InsertNewNode'];
        $rf.scope = $Γ['global']['SplaySetup'];
        $rf.$this = $Γ['global'];
        $Λ.push({
            l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
            id: 'FUNC'
        });
        $tmp42 = InsertNewNode();
        $Γ['global']['SplaySetup']['$tmp42'] = $Λ.pop().l;
        $Γ['global']['SplaySetup']['$tmp42'] instanceof Object ? $Γ['global']['SplaySetup']['$tmp42'].Σ = $lub($Γ['global']['SplaySetup']['$tmp42'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['SplaySetup']['$tmp42'] = $lub($Γ['global']['SplaySetup']['$tmp42'], $Λ[$Λ.length - 1].l);
        $tmp45 = i + 1;
        $Γ['global']['SplaySetup']['$tmp45'] = $lub(sec_lvl('i', null, true, $Γ['global']['SplaySetup']), $Λ[$Λ.length - 1].l);
        $Γ['global']['SplaySetup']['$tmp45'] instanceof Object ? $Γ['global']['SplaySetup']['$tmp45'].Σ = $lub($Γ['global']['SplaySetup']['$tmp45'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['SplaySetup']['$tmp45'] = $lub($Γ['global']['SplaySetup']['$tmp45'], $Λ[$Λ.length - 1].l);
        $tmp44 = $tmp45 % 20;
        $Γ['global']['SplaySetup']['$tmp44'] = $lub(sec_lvl('$tmp45', null, true, $Γ['global']['SplaySetup']), $Λ[$Λ.length - 1].l);
        $Γ['global']['SplaySetup']['$tmp44'] instanceof Object ? $Γ['global']['SplaySetup']['$tmp44'].Σ = $lub($Γ['global']['SplaySetup']['$tmp44'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['SplaySetup']['$tmp44'] = $lub($Γ['global']['SplaySetup']['$tmp44'], $Λ[$Λ.length - 1].l);
        $tmp43 = $tmp44 == 19;
        $Γ['global']['SplaySetup']['$tmp43'] = $lub(sec_lvl('$tmp44', null, true, $Γ['global']['SplaySetup']), $Λ[$Λ.length - 1].l);
        $Γ['global']['SplaySetup']['$tmp43'] instanceof Object ? $Γ['global']['SplaySetup']['$tmp43'].Σ = $lub($Γ['global']['SplaySetup']['$tmp43'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['SplaySetup']['$tmp43'] = $lub($Γ['global']['SplaySetup']['$tmp43'], $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp43', null, true, $Γ['global']['SplaySetup'])),
            id: 'IF'
        });
        if ($tmp43) {
            var $tmp46, $tmp47;
            $Γ['global']['SplaySetup']['$tmp47'] = $Γ['global']['SplaySetup']['$tmp46'] = 0;
            $tmp47 = performance.now();
            $rf = $scope($Γ['global']['SplaySetup'], 'SplayUpdateStats', false)['SplayUpdateStats'];
            $rf.scope = $Γ['global']['SplaySetup'];
            $rf.$this = $Γ['global'];
            $rf['time'] = $lub(sec_lvl('$tmp47', null, true, $Γ['global']['SplaySetup']), $Λ[$Λ.length - 1].l);
            $Λ.push({
                l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
                id: 'FUNC'
            });
            $tmp46 = SplayUpdateStats($tmp47);
            $Γ['global']['SplaySetup']['$tmp46'] = $Λ.pop().l;
            $Γ['global']['SplaySetup']['$tmp46'] instanceof Object ? $Γ['global']['SplaySetup']['$tmp46'].Σ = $lub($Γ['global']['SplaySetup']['$tmp46'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['SplaySetup']['$tmp46'] = $lub($Γ['global']['SplaySetup']['$tmp46'], $Λ[$Λ.length - 1].l);
        } else {
            $upgrade([
                'performance.now',
                '$tmp47',
                '$tmp46'
            ], $Λ[$Λ.length - 1].l, $Γ['global']['SplaySetup']);
        }
        $Λ.pop();
        $tmp39 = i++;
        $Γ['global']['SplaySetup']['$tmp39'] = sec_lvl('i', null, false, $Γ['global']['SplaySetup']);
        $Γ['global']['SplaySetup']['$tmp39'] instanceof Object ? $Γ['global']['SplaySetup']['$tmp39'].Σ = $lub($Γ['global']['SplaySetup']['$tmp39'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['SplaySetup']['$tmp39'] = $lub($Γ['global']['SplaySetup']['$tmp39'], $Λ[$Λ.length - 1].l);
        $tmp40 = i < kSplayTreeSize;
        $Γ['global']['SplaySetup']['$tmp40'] = $lub(sec_lvl('i', null, true, $Γ['global']['SplaySetup']), sec_lvl('kSplayTreeSize', null, true, $Γ['global']['SplaySetup']));
        $Γ['global']['SplaySetup']['$tmp40'] instanceof Object ? $Γ['global']['SplaySetup']['$tmp40'].Σ = $lub($Γ['global']['SplaySetup']['$tmp40'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['SplaySetup']['$tmp40'] = $lub($Γ['global']['SplaySetup']['$tmp40'], $Λ[$Λ.length - 1].l);
    }
    $upgrade([
        '$tmp42',
        'performance.now',
        '$tmp47',
        '$tmp46'
    ], $Λ[$Λ.length - 1].l, $Γ['global']['SplaySetup']);
    $Λ.pop();
    return;
}
function SplayTearDown() {
    var keys, length, $tmp48, i, $tmp50, $tmp51;
    $Γ['global']['SplayTearDown']['$tmp51'] = $Γ['global']['SplayTearDown']['$tmp50'] = $Γ['global']['SplayTearDown']['i'] = $Γ['global']['SplayTearDown']['$tmp48'] = $Γ['global']['SplayTearDown']['length'] = $Γ['global']['SplayTearDown']['keys'] = 0;
    $rf = $prop('$tmp1', 'exportKeys', $Γ['global']['SplayTearDown']);
    $rf.scope = $Γ['global']['SplayTearDown'];
    $rf.$this = $scope($Γ['global']['SplayTearDown'], 'SplayTree', false)['SplayTree'];
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    keys = splayTree.exportKeys();
    $scope($Γ['global']['SplayTearDown'], 'keys', true)['keys'] = $Λ.pop().l;
    $scope($Γ['global']['SplayTearDown'], 'keys', true)['keys'] instanceof Object ? $scope($Γ['global']['SplayTearDown'], 'keys', true)['keys'].Σ = $lub($scope($Γ['global']['SplayTearDown'], 'keys', true)['keys'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['SplayTearDown'], 'keys', true)['keys'] = $lub($scope($Γ['global']['SplayTearDown'], 'keys', true)['keys'], $Λ[$Λ.length - 1].l);
    splayTree = null;
    $scope($Γ['global']['SplayTearDown'], 'splayTree', true)['splayTree'] = $Λ[$Λ.length - 1].l;
    splaySamples = 0;
    $scope($Γ['global']['SplayTearDown'], 'splaySamples', true)['splaySamples'] = $Λ[$Λ.length - 1].l;
    splaySumOfSquaredPauses = 0;
    $scope($Γ['global']['SplayTearDown'], 'splaySumOfSquaredPauses', true)['splaySumOfSquaredPauses'] = $Λ[$Λ.length - 1].l;
    length = keys.length;
    $scope($Γ['global']['SplayTearDown'], 'length', true)['length'] = sec_lvl('keys', 'length', false, $Γ['global']['SplayTearDown']);
    $scope($Γ['global']['SplayTearDown'], 'length', true)['length'] instanceof Object ? $scope($Γ['global']['SplayTearDown'], 'length', true)['length'].Σ = $lub($scope($Γ['global']['SplayTearDown'], 'length', true)['length'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['SplayTearDown'], 'length', true)['length'] = $lub($scope($Γ['global']['SplayTearDown'], 'length', true)['length'], $Λ[$Λ.length - 1].l);
    $tmp48 = length != kSplayTreeSize;
    $Γ['global']['SplayTearDown']['$tmp48'] = $lub(sec_lvl('length', null, true, $Γ['global']['SplayTearDown']), sec_lvl('kSplayTreeSize', null, true, $Γ['global']['SplayTearDown']));
    $Γ['global']['SplayTearDown']['$tmp48'] instanceof Object ? $Γ['global']['SplayTearDown']['$tmp48'].Σ = $lub($Γ['global']['SplayTearDown']['$tmp48'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['SplayTearDown']['$tmp48'] = $lub($Γ['global']['SplayTearDown']['$tmp48'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp48', null, true, $Γ['global']['SplayTearDown'])),
        id: 'IF'
    });
    if ($tmp48) {
        var $tmp52;
        $Γ['global']['SplayTearDown']['$tmp52'] = 0;
        $tmp52 = new Error('Splay tree has wrong size');
        $old_pc = $pc();
        while ($pc().id !== 'FUNC' && $pc().id !== 'TRY') {
            $Λ.pop();
        }
        $Λ[$Λ.length - 1] = { 'l': $lub($old_pc.l, sec_lvl('$tmp52', null, true, $Γ['global']['SplayTearDown'])) };
        throw $tmp52;
        var $shouldComp = { 'lbl': 'FUNC' };
    } else {
        $upgrade([
            'Error',
            '$tmp52'
        ], $Λ[$Λ.length - 1].l, $Γ['global']['SplayTearDown']);
    }
    if ($shouldComp)
        $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
    $Λ.pop();
    i = 0;
    $scope($Γ['global']['SplayTearDown'], 'i', true)['i'] = $Λ[$Λ.length - 1].l;
    $tmp51 = length - 1;
    $Γ['global']['SplayTearDown']['$tmp51'] = $lub(sec_lvl('length', null, true, $Γ['global']['SplayTearDown']), $Λ[$Λ.length - 1].l);
    $Γ['global']['SplayTearDown']['$tmp51'] instanceof Object ? $Γ['global']['SplayTearDown']['$tmp51'].Σ = $lub($Γ['global']['SplayTearDown']['$tmp51'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['SplayTearDown']['$tmp51'] = $lub($Γ['global']['SplayTearDown']['$tmp51'], $Λ[$Λ.length - 1].l);
    $tmp50 = i < $tmp51;
    $Γ['global']['SplayTearDown']['$tmp50'] = $lub(sec_lvl('i', null, true, $Γ['global']['SplayTearDown']), sec_lvl('$tmp51', null, true, $Γ['global']['SplayTearDown']));
    $Γ['global']['SplayTearDown']['$tmp50'] instanceof Object ? $Γ['global']['SplayTearDown']['$tmp50'].Σ = $lub($Γ['global']['SplayTearDown']['$tmp50'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['SplayTearDown']['$tmp50'] = $lub($Γ['global']['SplayTearDown']['$tmp50'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp50', null, true, $Γ['global']['SplayTearDown'])),
        id: 'LOOP'
    });
    for (; $tmp50;) {
        var $tmp53, $tmp54, $tmp55, $tmp56, $tmp49, $tmp50, $tmp57;
        $Γ['global']['SplayTearDown']['$tmp57'] = $Γ['global']['SplayTearDown']['$tmp50'] = $Γ['global']['SplayTearDown']['$tmp49'] = $Γ['global']['SplayTearDown']['$tmp56'] = $Γ['global']['SplayTearDown']['$tmp55'] = $Γ['global']['SplayTearDown']['$tmp54'] = $Γ['global']['SplayTearDown']['$tmp53'] = 0;
        $tmp54 = keys[i];
        $Γ['global']['SplayTearDown']['$tmp54'] = sec_lvl('keys', i, false, $Γ['global']['SplayTearDown']);
        $Γ['global']['SplayTearDown']['$tmp54'] instanceof Object ? $Γ['global']['SplayTearDown']['$tmp54'].Σ = $lub($Γ['global']['SplayTearDown']['$tmp54'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['SplayTearDown']['$tmp54'] = $lub($Γ['global']['SplayTearDown']['$tmp54'], $Λ[$Λ.length - 1].l);
        $tmp56 = i + 1;
        $Γ['global']['SplayTearDown']['$tmp56'] = $lub(sec_lvl('i', null, true, $Γ['global']['SplayTearDown']), $Λ[$Λ.length - 1].l);
        $Γ['global']['SplayTearDown']['$tmp56'] instanceof Object ? $Γ['global']['SplayTearDown']['$tmp56'].Σ = $lub($Γ['global']['SplayTearDown']['$tmp56'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['SplayTearDown']['$tmp56'] = $lub($Γ['global']['SplayTearDown']['$tmp56'], $Λ[$Λ.length - 1].l);
        $tmp55 = keys[$tmp56];
        $Γ['global']['SplayTearDown']['$tmp55'] = sec_lvl('keys', $tmp56, false, $Γ['global']['SplayTearDown']);
        $Γ['global']['SplayTearDown']['$tmp55'] instanceof Object ? $Γ['global']['SplayTearDown']['$tmp55'].Σ = $lub($Γ['global']['SplayTearDown']['$tmp55'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['SplayTearDown']['$tmp55'] = $lub($Γ['global']['SplayTearDown']['$tmp55'], $Λ[$Λ.length - 1].l);
        $tmp53 = $tmp54 >= $tmp55;
        $Γ['global']['SplayTearDown']['$tmp53'] = $lub(sec_lvl('$tmp54', null, true, $Γ['global']['SplayTearDown']), sec_lvl('$tmp55', null, true, $Γ['global']['SplayTearDown']));
        $Γ['global']['SplayTearDown']['$tmp53'] instanceof Object ? $Γ['global']['SplayTearDown']['$tmp53'].Σ = $lub($Γ['global']['SplayTearDown']['$tmp53'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['SplayTearDown']['$tmp53'] = $lub($Γ['global']['SplayTearDown']['$tmp53'], $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp53', null, true, $Γ['global']['SplayTearDown'])),
            id: 'IF'
        });
        if ($tmp53) {
            var $tmp58;
            $Γ['global']['SplayTearDown']['$tmp58'] = 0;
            $tmp58 = new Error('Splay tree not sorted');
            $old_pc = $pc();
            while ($pc().id !== 'FUNC' && $pc().id !== 'TRY') {
                $Λ.pop();
            }
            $Λ[$Λ.length - 1] = { 'l': $lub($old_pc.l, sec_lvl('$tmp58', null, true, $Γ['global']['SplayTearDown'])) };
            throw $tmp58;
            var $shouldComp = { 'lbl': 'FUNC' };
        } else {
            $upgrade([
                'Error',
                '$tmp58'
            ], $Λ[$Λ.length - 1].l, $Γ['global']['SplayTearDown']);
        }
        if ($shouldComp)
            $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
        $Λ.pop();
        $tmp49 = i++;
        $Γ['global']['SplayTearDown']['$tmp49'] = sec_lvl('i', null, false, $Γ['global']['SplayTearDown']);
        $Γ['global']['SplayTearDown']['$tmp49'] instanceof Object ? $Γ['global']['SplayTearDown']['$tmp49'].Σ = $lub($Γ['global']['SplayTearDown']['$tmp49'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['SplayTearDown']['$tmp49'] = $lub($Γ['global']['SplayTearDown']['$tmp49'], $Λ[$Λ.length - 1].l);
        $tmp57 = length - 1;
        $Γ['global']['SplayTearDown']['$tmp57'] = $lub(sec_lvl('length', null, true, $Γ['global']['SplayTearDown']), $Λ[$Λ.length - 1].l);
        $Γ['global']['SplayTearDown']['$tmp57'] instanceof Object ? $Γ['global']['SplayTearDown']['$tmp57'].Σ = $lub($Γ['global']['SplayTearDown']['$tmp57'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['SplayTearDown']['$tmp57'] = $lub($Γ['global']['SplayTearDown']['$tmp57'], $Λ[$Λ.length - 1].l);
        $tmp50 = i < $tmp57;
        $Γ['global']['SplayTearDown']['$tmp50'] = $lub(sec_lvl('i', null, true, $Γ['global']['SplayTearDown']), sec_lvl('$tmp57', null, true, $Γ['global']['SplayTearDown']));
        $Γ['global']['SplayTearDown']['$tmp50'] instanceof Object ? $Γ['global']['SplayTearDown']['$tmp50'].Σ = $lub($Γ['global']['SplayTearDown']['$tmp50'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['SplayTearDown']['$tmp50'] = $lub($Γ['global']['SplayTearDown']['$tmp50'], $Λ[$Λ.length - 1].l);
    }
    $upgrade([
        'Error',
        '$tmp58'
    ], $Λ[$Λ.length - 1].l, $Γ['global']['SplayTearDown']);
    $Λ.pop();
    return;
}
function SplayRun() {
    var i, $tmp60, $tmp61, $tmp62;
    $Γ['global']['SplayRun']['$tmp62'] = $Γ['global']['SplayRun']['$tmp61'] = $Γ['global']['SplayRun']['$tmp60'] = $Γ['global']['SplayRun']['i'] = 0;
    i = 0;
    $scope($Γ['global']['SplayRun'], 'i', true)['i'] = $Λ[$Λ.length - 1].l;
    $tmp60 = i < kSplayTreeModifications;
    $Γ['global']['SplayRun']['$tmp60'] = $lub(sec_lvl('i', null, true, $Γ['global']['SplayRun']), sec_lvl('kSplayTreeModifications', null, true, $Γ['global']['SplayRun']));
    $Γ['global']['SplayRun']['$tmp60'] instanceof Object ? $Γ['global']['SplayRun']['$tmp60'].Σ = $lub($Γ['global']['SplayRun']['$tmp60'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['SplayRun']['$tmp60'] = $lub($Γ['global']['SplayRun']['$tmp60'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp60', null, true, $Γ['global']['SplayRun'])),
        id: 'LOOP'
    });
    for (; $tmp60;) {
        var key, greatest, $tmp63, $tmp59, $tmp60;
        $Γ['global']['SplayRun']['$tmp60'] = $Γ['global']['SplayRun']['$tmp59'] = $Γ['global']['SplayRun']['$tmp63'] = $Γ['global']['SplayRun']['greatest'] = $Γ['global']['SplayRun']['key'] = 0;
        $rf = $scope($Γ['global']['SplayRun'], 'InsertNewNode', false)['InsertNewNode'];
        $rf.scope = $Γ['global']['SplayRun'];
        $rf.$this = $Γ['global'];
        $Λ.push({
            l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
            id: 'FUNC'
        });
        key = InsertNewNode();
        $scope($Γ['global']['SplayRun'], 'key', true)['key'] = $Λ.pop().l;
        $scope($Γ['global']['SplayRun'], 'key', true)['key'] instanceof Object ? $scope($Γ['global']['SplayRun'], 'key', true)['key'].Σ = $lub($scope($Γ['global']['SplayRun'], 'key', true)['key'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['SplayRun'], 'key', true)['key'] = $lub($scope($Γ['global']['SplayRun'], 'key', true)['key'], $Λ[$Λ.length - 1].l);
        $rf = $prop('$tmp1', 'findGreatestLessThan', $Γ['global']['SplayRun']);
        $rf.scope = $Γ['global']['SplayRun'];
        $rf.$this = $scope($Γ['global']['SplayRun'], 'SplayTree', false)['SplayTree'];
        $rf['key'] = $lub(sec_lvl('key', null, true, $Γ['global']['SplayRun']), $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
            id: 'FUNC'
        });
        greatest = splayTree.findGreatestLessThan(key);
        $scope($Γ['global']['SplayRun'], 'greatest', true)['greatest'] = $Λ.pop().l;
        $scope($Γ['global']['SplayRun'], 'greatest', true)['greatest'] instanceof Object ? $scope($Γ['global']['SplayRun'], 'greatest', true)['greatest'].Σ = $lub($scope($Γ['global']['SplayRun'], 'greatest', true)['greatest'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['SplayRun'], 'greatest', true)['greatest'] = $lub($scope($Γ['global']['SplayRun'], 'greatest', true)['greatest'], $Λ[$Λ.length - 1].l);
        $tmp63 = greatest == null;
        $Γ['global']['SplayRun']['$tmp63'] = $lub(sec_lvl('greatest', null, true, $Γ['global']['SplayRun']), $Λ[$Λ.length - 1].l);
        $Γ['global']['SplayRun']['$tmp63'] instanceof Object ? $Γ['global']['SplayRun']['$tmp63'].Σ = $lub($Γ['global']['SplayRun']['$tmp63'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['SplayRun']['$tmp63'] = $lub($Γ['global']['SplayRun']['$tmp63'], $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp63', null, true, $Γ['global']['SplayRun'])),
            id: 'IF'
        });
        if ($tmp63) {
            $upgrade(['$tmp65'], $Λ[$Λ.length - 1].l, $Γ['global']['SplayRun']);
            var $tmp64;
            $Γ['global']['SplayRun']['$tmp64'] = 0;
            $rf = $prop('$tmp1', 'remove', $Γ['global']['SplayRun']);
            $rf.scope = $Γ['global']['SplayRun'];
            $rf.$this = $scope($Γ['global']['SplayRun'], 'SplayTree', false)['SplayTree'];
            $rf['key'] = $lub(sec_lvl('key', null, true, $Γ['global']['SplayRun']), $Λ[$Λ.length - 1].l);
            $Λ.push({
                l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
                id: 'FUNC'
            });
            $tmp64 = splayTree.remove(key);
            $Γ['global']['SplayRun']['$tmp64'] = $Λ.pop().l;
            $Γ['global']['SplayRun']['$tmp64'] instanceof Object ? $Γ['global']['SplayRun']['$tmp64'].Σ = $lub($Γ['global']['SplayRun']['$tmp64'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['SplayRun']['$tmp64'] = $lub($Γ['global']['SplayRun']['$tmp64'], $Λ[$Λ.length - 1].l);
        } else {
            $upgrade(['$tmp64'], $Λ[$Λ.length - 1].l, $Γ['global']['SplayRun']);
            var $tmp65, $tmp66;
            $Γ['global']['SplayRun']['$tmp66'] = $Γ['global']['SplayRun']['$tmp65'] = 0;
            $tmp66 = greatest.key;
            $Γ['global']['SplayRun']['$tmp66'] = sec_lvl('greatest', 'key', false, $Γ['global']['SplayRun']);
            $Γ['global']['SplayRun']['$tmp66'] instanceof Object ? $Γ['global']['SplayRun']['$tmp66'].Σ = $lub($Γ['global']['SplayRun']['$tmp66'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['SplayRun']['$tmp66'] = $lub($Γ['global']['SplayRun']['$tmp66'], $Λ[$Λ.length - 1].l);
            $rf = $prop('$tmp1', 'remove', $Γ['global']['SplayRun']);
            $rf.scope = $Γ['global']['SplayRun'];
            $rf.$this = $scope($Γ['global']['SplayRun'], 'SplayTree', false)['SplayTree'];
            $rf['key'] = $lub(sec_lvl('$tmp66', null, true, $Γ['global']['SplayRun']), $Λ[$Λ.length - 1].l);
            $Λ.push({
                l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
                id: 'FUNC'
            });
            $tmp65 = splayTree.remove($tmp66);
            $Γ['global']['SplayRun']['$tmp65'] = $Λ.pop().l;
            $Γ['global']['SplayRun']['$tmp65'] instanceof Object ? $Γ['global']['SplayRun']['$tmp65'].Σ = $lub($Γ['global']['SplayRun']['$tmp65'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['SplayRun']['$tmp65'] = $lub($Γ['global']['SplayRun']['$tmp65'], $Λ[$Λ.length - 1].l);
        }
        $Λ.pop();
        $tmp59 = i++;
        $Γ['global']['SplayRun']['$tmp59'] = sec_lvl('i', null, false, $Γ['global']['SplayRun']);
        $Γ['global']['SplayRun']['$tmp59'] instanceof Object ? $Γ['global']['SplayRun']['$tmp59'].Σ = $lub($Γ['global']['SplayRun']['$tmp59'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['SplayRun']['$tmp59'] = $lub($Γ['global']['SplayRun']['$tmp59'], $Λ[$Λ.length - 1].l);
        $tmp60 = i < kSplayTreeModifications;
        $Γ['global']['SplayRun']['$tmp60'] = $lub(sec_lvl('i', null, true, $Γ['global']['SplayRun']), sec_lvl('kSplayTreeModifications', null, true, $Γ['global']['SplayRun']));
        $Γ['global']['SplayRun']['$tmp60'] instanceof Object ? $Γ['global']['SplayRun']['$tmp60'].Σ = $lub($Γ['global']['SplayRun']['$tmp60'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['SplayRun']['$tmp60'] = $lub($Γ['global']['SplayRun']['$tmp60'], $Λ[$Λ.length - 1].l);
    }
    $upgrade([
        'key',
        'greatest',
        '$tmp64',
        '$tmp65'
    ], $Λ[$Λ.length - 1].l, $Γ['global']['SplayRun']);
    $Λ.pop();
    $tmp62 = performance.now();
    $rf = $scope($Γ['global']['SplayRun'], 'SplayUpdateStats', false)['SplayUpdateStats'];
    $rf.scope = $Γ['global']['SplayRun'];
    $rf.$this = $Γ['global'];
    $rf['time'] = $lub(sec_lvl('$tmp62', null, true, $Γ['global']['SplayRun']), $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp61 = SplayUpdateStats($tmp62);
    $Γ['global']['SplayRun']['$tmp61'] = $Λ.pop().l;
    $Γ['global']['SplayRun']['$tmp61'] instanceof Object ? $Γ['global']['SplayRun']['$tmp61'].Σ = $lub($Γ['global']['SplayRun']['$tmp61'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['SplayRun']['$tmp61'] = $lub($Γ['global']['SplayRun']['$tmp61'], $Λ[$Λ.length - 1].l);
    return;
}
function SplayTree() {
    return;
}
;
$tmp1 = SplayTree.prototype;
$Γ['global']['$tmp1'] = sec_lvl('SplayTree', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp1'] instanceof Object ? $Γ['global']['$tmp1'].Σ = $lub($Γ['global']['$tmp1'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1'] = $lub($Γ['global']['$tmp1'], $Λ[$Λ.length - 1].l);
$tmp1.root_ = null;
$Γ['global']['$tmp1']['root_'] = $Λ[$Λ.length - 1].l;
$tmp1 = SplayTree.prototype;
$Γ['global']['$tmp1'] = sec_lvl('SplayTree', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp1'] instanceof Object ? $Γ['global']['$tmp1'].Σ = $lub($Γ['global']['$tmp1'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1'] = $lub($Γ['global']['$tmp1'], $Λ[$Λ.length - 1].l);
$tmp1.isEmpty = function () {
    var $tmp67, $tmp68;
    $Γ['global']['$tmp1']['isEmpty']['$tmp68'] = $Γ['global']['$tmp1']['isEmpty']['$tmp67'] = 0;
    $tmp68 = this.root_;
    $Γ['global']['$tmp1']['isEmpty']['$tmp68'] = sec_lvl('$tmp1', 'root_', false, $Γ['global']['$tmp1']['isEmpty']);
    $Γ['global']['$tmp1']['isEmpty']['$tmp68'] instanceof Object ? $Γ['global']['$tmp1']['isEmpty']['$tmp68'].Σ = $lub($Γ['global']['$tmp1']['isEmpty']['$tmp68'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['isEmpty']['$tmp68'] = $lub($Γ['global']['$tmp1']['isEmpty']['$tmp68'], $Λ[$Λ.length - 1].l);
    $tmp67 = !$tmp68;
    $Γ['global']['$tmp1']['isEmpty']['$tmp67'] = sec_lvl('$tmp68', null, false, $Γ['global']['$tmp1']['isEmpty']);
    $Γ['global']['$tmp1']['isEmpty']['$tmp67'] instanceof Object ? $Γ['global']['$tmp1']['isEmpty']['$tmp67'].Σ = $lub($Γ['global']['$tmp1']['isEmpty']['$tmp67'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['isEmpty']['$tmp67'] = $lub($Γ['global']['$tmp1']['isEmpty']['$tmp67'], $Λ[$Λ.length - 1].l);
    return $tmp67;
};
$Γ['global']['$tmp1']['isEmpty'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$tmp1 = SplayTree.prototype;
$Γ['global']['$tmp1'] = sec_lvl('SplayTree', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp1'] instanceof Object ? $Γ['global']['$tmp1'].Σ = $lub($Γ['global']['$tmp1'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1'] = $lub($Γ['global']['$tmp1'], $Λ[$Λ.length - 1].l);
$tmp1.insert = function (key, value) {
    var $tmp69, $tmp70, $tmp71, $tmp72, $tmp73, node, $tmp74, $tmp75;
    $Γ['global']['$tmp1']['insert']['$tmp75'] = $Γ['global']['$tmp1']['insert']['$tmp74'] = $Γ['global']['$tmp1']['insert']['node'] = $Γ['global']['$tmp1']['insert']['$tmp73'] = $Γ['global']['$tmp1']['insert']['$tmp72'] = $Γ['global']['$tmp1']['insert']['$tmp71'] = $Γ['global']['$tmp1']['insert']['$tmp70'] = $Γ['global']['$tmp1']['insert']['$tmp69'] = 0;
    $rf = $prop('$tmp1', 'isEmpty', $Γ['global']['$tmp1']['insert']);
    $rf.scope = $Γ['global']['$tmp1']['insert'];
    $rf.$this = $Γ['global']['$tmp1']['insert']['$this'];
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp69 = this.isEmpty();
    $Γ['global']['$tmp1']['insert']['$tmp69'] = $Λ.pop().l;
    $Γ['global']['$tmp1']['insert']['$tmp69'] instanceof Object ? $Γ['global']['$tmp1']['insert']['$tmp69'].Σ = $lub($Γ['global']['$tmp1']['insert']['$tmp69'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['insert']['$tmp69'] = $lub($Γ['global']['$tmp1']['insert']['$tmp69'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp69', null, true, $Γ['global']['$tmp1']['insert'])),
        id: 'IF'
    });
    if ($tmp69) {
        $rf = $prop('SplayTree', 'Node', $Γ['global']['$tmp1']['insert']);
        $rf.scope = $Γ['global']['$tmp1']['insert'];
        $rf.$this = {
            Σ: $Λ[$Λ.length - 1].l,
            __$proto__: $rf.prototype
        };
        $rf['key'] = $lub(sec_lvl('key', null, true, $Γ['global']['$tmp1']['insert']), $Λ[$Λ.length - 1].l);
        $rf['value'] = $lub(sec_lvl('value', null, true, $Γ['global']['$tmp1']['insert']), $Λ[$Λ.length - 1].l);
        $rf.InvokedAsContr = true;
        $Λ.push({
            l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
            id: 'FUNC'
        });
        this.root_ = new SplayTree.Node(key, value);
        $Γ['global']['$tmp1']['insert']['$this']['root_'] = $Λ.pop().l;
        $Γ['global']['$tmp1']['insert']['$this']['root_'] instanceof Object ? $Γ['global']['$tmp1']['insert']['$this']['root_'].Σ = $lub($Γ['global']['$tmp1']['insert']['$this']['root_'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['insert']['$this']['root_'] = $lub($Γ['global']['$tmp1']['insert']['$this']['root_'], $Λ[$Λ.length - 1].l);
        return;
        var $shouldComp = { 'lbl': 'FUNC' };
    } else {
        $upgrade(['this'], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp1']['insert']);
    }
    if ($shouldComp)
        $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
    $Λ.pop();
    $rf = $prop('$tmp1', 'splay_', $Γ['global']['$tmp1']['insert']);
    $rf.scope = $Γ['global']['$tmp1']['insert'];
    $rf.$this = $Γ['global']['$tmp1']['insert']['$this'];
    $rf['key'] = $lub(sec_lvl('key', null, true, $Γ['global']['$tmp1']['insert']), $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp70 = this.splay_(key);
    $Γ['global']['$tmp1']['insert']['$tmp70'] = $Λ.pop().l;
    $Γ['global']['$tmp1']['insert']['$tmp70'] instanceof Object ? $Γ['global']['$tmp1']['insert']['$tmp70'].Σ = $lub($Γ['global']['$tmp1']['insert']['$tmp70'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['insert']['$tmp70'] = $lub($Γ['global']['$tmp1']['insert']['$tmp70'], $Λ[$Λ.length - 1].l);
    $tmp73 = this.root_;
    $Γ['global']['$tmp1']['insert']['$tmp73'] = sec_lvl('$tmp1', 'root_', false, $Γ['global']['$tmp1']['insert']);
    $Γ['global']['$tmp1']['insert']['$tmp73'] instanceof Object ? $Γ['global']['$tmp1']['insert']['$tmp73'].Σ = $lub($Γ['global']['$tmp1']['insert']['$tmp73'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['insert']['$tmp73'] = $lub($Γ['global']['$tmp1']['insert']['$tmp73'], $Λ[$Λ.length - 1].l);
    $tmp72 = $tmp73.key;
    $Γ['global']['$tmp1']['insert']['$tmp72'] = sec_lvl('$tmp73', 'key', false, $Γ['global']['$tmp1']['insert']);
    $Γ['global']['$tmp1']['insert']['$tmp72'] instanceof Object ? $Γ['global']['$tmp1']['insert']['$tmp72'].Σ = $lub($Γ['global']['$tmp1']['insert']['$tmp72'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['insert']['$tmp72'] = $lub($Γ['global']['$tmp1']['insert']['$tmp72'], $Λ[$Λ.length - 1].l);
    $tmp71 = $tmp72 == key;
    $Γ['global']['$tmp1']['insert']['$tmp71'] = $lub(sec_lvl('$tmp72', null, true, $Γ['global']['$tmp1']['insert']), sec_lvl('key', null, true, $Γ['global']['$tmp1']['insert']));
    $Γ['global']['$tmp1']['insert']['$tmp71'] instanceof Object ? $Γ['global']['$tmp1']['insert']['$tmp71'].Σ = $lub($Γ['global']['$tmp1']['insert']['$tmp71'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['insert']['$tmp71'] = $lub($Γ['global']['$tmp1']['insert']['$tmp71'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp71', null, true, $Γ['global']['$tmp1']['insert'])),
        id: 'IF'
    });
    if ($tmp71) {
        return;
        var $shouldComp = { 'lbl': 'FUNC' };
    } else {
    }
    if ($shouldComp)
        $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
    $Λ.pop();
    $rf = $prop('SplayTree', 'Node', $Γ['global']['$tmp1']['insert']);
    $rf.scope = $Γ['global']['$tmp1']['insert'];
    $rf.$this = {
        Σ: $Λ[$Λ.length - 1].l,
        __$proto__: $rf.prototype
    };
    $rf['key'] = $lub(sec_lvl('key', null, true, $Γ['global']['$tmp1']['insert']), $Λ[$Λ.length - 1].l);
    $rf['value'] = $lub(sec_lvl('value', null, true, $Γ['global']['$tmp1']['insert']), $Λ[$Λ.length - 1].l);
    $rf.InvokedAsContr = true;
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    node = new SplayTree.Node(key, value);
    $scope($Γ['global']['$tmp1']['insert'], 'node', true)['node'] = $Λ.pop().l;
    $scope($Γ['global']['$tmp1']['insert'], 'node', true)['node'] instanceof Object ? $scope($Γ['global']['$tmp1']['insert'], 'node', true)['node'].Σ = $lub($scope($Γ['global']['$tmp1']['insert'], 'node', true)['node'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp1']['insert'], 'node', true)['node'] = $lub($scope($Γ['global']['$tmp1']['insert'], 'node', true)['node'], $Λ[$Λ.length - 1].l);
    $tmp73 = this.root_;
    $Γ['global']['$tmp1']['insert']['$tmp73'] = sec_lvl('$tmp1', 'root_', false, $Γ['global']['$tmp1']['insert']);
    $Γ['global']['$tmp1']['insert']['$tmp73'] instanceof Object ? $Γ['global']['$tmp1']['insert']['$tmp73'].Σ = $lub($Γ['global']['$tmp1']['insert']['$tmp73'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['insert']['$tmp73'] = $lub($Γ['global']['$tmp1']['insert']['$tmp73'], $Λ[$Λ.length - 1].l);
    $tmp75 = $tmp73.key;
    $Γ['global']['$tmp1']['insert']['$tmp75'] = sec_lvl('$tmp73', 'key', false, $Γ['global']['$tmp1']['insert']);
    $Γ['global']['$tmp1']['insert']['$tmp75'] instanceof Object ? $Γ['global']['$tmp1']['insert']['$tmp75'].Σ = $lub($Γ['global']['$tmp1']['insert']['$tmp75'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['insert']['$tmp75'] = $lub($Γ['global']['$tmp1']['insert']['$tmp75'], $Λ[$Λ.length - 1].l);
    $tmp74 = key > $tmp75;
    $Γ['global']['$tmp1']['insert']['$tmp74'] = $lub(sec_lvl('key', null, true, $Γ['global']['$tmp1']['insert']), sec_lvl('$tmp75', null, true, $Γ['global']['$tmp1']['insert']));
    $Γ['global']['$tmp1']['insert']['$tmp74'] instanceof Object ? $Γ['global']['$tmp1']['insert']['$tmp74'].Σ = $lub($Γ['global']['$tmp1']['insert']['$tmp74'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['insert']['$tmp74'] = $lub($Γ['global']['$tmp1']['insert']['$tmp74'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp74', null, true, $Γ['global']['$tmp1']['insert'])),
        id: 'IF'
    });
    if ($tmp74) {
        node.left = this.root_;
        $scope($Γ['global']['$tmp1']['insert'], 'node', false)['left'] = sec_lvl('$tmp1', 'root_', false, $Γ['global']['$tmp1']['insert']);
        $scope($Γ['global']['$tmp1']['insert'], 'node', false)['left'] instanceof Object ? $scope($Γ['global']['$tmp1']['insert'], 'node', false)['left'].Σ = $lub($scope($Γ['global']['$tmp1']['insert'], 'node', false)['left'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp1']['insert'], 'node', false)['left'] = $lub($scope($Γ['global']['$tmp1']['insert'], 'node', false)['left'], $Λ[$Λ.length - 1].l);
        var $tmp73;
        $Γ['global']['$tmp1']['insert']['$tmp73'] = 0;
        $tmp73 = this.root_;
        $Γ['global']['$tmp1']['insert']['$tmp73'] = sec_lvl('$tmp1', 'root_', false, $Γ['global']['$tmp1']['insert']);
        $Γ['global']['$tmp1']['insert']['$tmp73'] instanceof Object ? $Γ['global']['$tmp1']['insert']['$tmp73'].Σ = $lub($Γ['global']['$tmp1']['insert']['$tmp73'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['insert']['$tmp73'] = $lub($Γ['global']['$tmp1']['insert']['$tmp73'], $Λ[$Λ.length - 1].l);
        node.right = $tmp73.right;
        $scope($Γ['global']['$tmp1']['insert'], 'node', false)['right'] = sec_lvl('$tmp73', 'right', false, $Γ['global']['$tmp1']['insert']);
        $scope($Γ['global']['$tmp1']['insert'], 'node', false)['right'] instanceof Object ? $scope($Γ['global']['$tmp1']['insert'], 'node', false)['right'].Σ = $lub($scope($Γ['global']['$tmp1']['insert'], 'node', false)['right'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp1']['insert'], 'node', false)['right'] = $lub($scope($Γ['global']['$tmp1']['insert'], 'node', false)['right'], $Λ[$Λ.length - 1].l);
        $tmp73 = this.root_;
        $Γ['global']['$tmp1']['insert']['$tmp73'] = sec_lvl('$tmp1', 'root_', false, $Γ['global']['$tmp1']['insert']);
        $Γ['global']['$tmp1']['insert']['$tmp73'] instanceof Object ? $Γ['global']['$tmp1']['insert']['$tmp73'].Σ = $lub($Γ['global']['$tmp1']['insert']['$tmp73'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['insert']['$tmp73'] = $lub($Γ['global']['$tmp1']['insert']['$tmp73'], $Λ[$Λ.length - 1].l);
        $tmp73.right = null;
        $Γ['global']['$tmp1']['insert']['$tmp73']['right'] = $Λ[$Λ.length - 1].l;
    } else {
        node.right = this.root_;
        $scope($Γ['global']['$tmp1']['insert'], 'node', false)['right'] = sec_lvl('$tmp1', 'root_', false, $Γ['global']['$tmp1']['insert']);
        $scope($Γ['global']['$tmp1']['insert'], 'node', false)['right'] instanceof Object ? $scope($Γ['global']['$tmp1']['insert'], 'node', false)['right'].Σ = $lub($scope($Γ['global']['$tmp1']['insert'], 'node', false)['right'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp1']['insert'], 'node', false)['right'] = $lub($scope($Γ['global']['$tmp1']['insert'], 'node', false)['right'], $Λ[$Λ.length - 1].l);
        var $tmp73;
        $Γ['global']['$tmp1']['insert']['$tmp73'] = 0;
        $tmp73 = this.root_;
        $Γ['global']['$tmp1']['insert']['$tmp73'] = sec_lvl('$tmp1', 'root_', false, $Γ['global']['$tmp1']['insert']);
        $Γ['global']['$tmp1']['insert']['$tmp73'] instanceof Object ? $Γ['global']['$tmp1']['insert']['$tmp73'].Σ = $lub($Γ['global']['$tmp1']['insert']['$tmp73'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['insert']['$tmp73'] = $lub($Γ['global']['$tmp1']['insert']['$tmp73'], $Λ[$Λ.length - 1].l);
        node.left = $tmp73.left;
        $scope($Γ['global']['$tmp1']['insert'], 'node', false)['left'] = sec_lvl('$tmp73', 'left', false, $Γ['global']['$tmp1']['insert']);
        $scope($Γ['global']['$tmp1']['insert'], 'node', false)['left'] instanceof Object ? $scope($Γ['global']['$tmp1']['insert'], 'node', false)['left'].Σ = $lub($scope($Γ['global']['$tmp1']['insert'], 'node', false)['left'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp1']['insert'], 'node', false)['left'] = $lub($scope($Γ['global']['$tmp1']['insert'], 'node', false)['left'], $Λ[$Λ.length - 1].l);
        $tmp73 = this.root_;
        $Γ['global']['$tmp1']['insert']['$tmp73'] = sec_lvl('$tmp1', 'root_', false, $Γ['global']['$tmp1']['insert']);
        $Γ['global']['$tmp1']['insert']['$tmp73'] instanceof Object ? $Γ['global']['$tmp1']['insert']['$tmp73'].Σ = $lub($Γ['global']['$tmp1']['insert']['$tmp73'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['insert']['$tmp73'] = $lub($Γ['global']['$tmp1']['insert']['$tmp73'], $Λ[$Λ.length - 1].l);
        $tmp73.left = null;
        $Γ['global']['$tmp1']['insert']['$tmp73']['left'] = $Λ[$Λ.length - 1].l;
    }
    $Λ.pop();
    this.root_ = node;
    $Γ['global']['$tmp1']['insert']['$this']['root_'] = sec_lvl('node', null, false, $Γ['global']['$tmp1']['insert']);
    $Γ['global']['$tmp1']['insert']['$this']['root_'] instanceof Object ? $Γ['global']['$tmp1']['insert']['$this']['root_'].Σ = $lub($Γ['global']['$tmp1']['insert']['$this']['root_'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['insert']['$this']['root_'] = $lub($Γ['global']['$tmp1']['insert']['$this']['root_'], $Λ[$Λ.length - 1].l);
    return;
};
$Γ['global']['$tmp1']['insert'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    key: $Λ[$Λ.length - 1].l,
    value: $Λ[$Λ.length - 1].l
};
$tmp1 = SplayTree.prototype;
$Γ['global']['$tmp1'] = sec_lvl('SplayTree', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp1'] instanceof Object ? $Γ['global']['$tmp1'].Σ = $lub($Γ['global']['$tmp1'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1'] = $lub($Γ['global']['$tmp1'], $Λ[$Λ.length - 1].l);
$tmp1.remove = function (key) {
    var $tmp76, $tmp77, $tmp78, $tmp79, $tmp73, removed, $tmp80, $tmp81;
    $Γ['global']['$tmp1']['remove']['$tmp81'] = $Γ['global']['$tmp1']['remove']['$tmp80'] = $Γ['global']['$tmp1']['remove']['removed'] = $Γ['global']['$tmp1']['remove']['$tmp73'] = $Γ['global']['$tmp1']['remove']['$tmp79'] = $Γ['global']['$tmp1']['remove']['$tmp78'] = $Γ['global']['$tmp1']['remove']['$tmp77'] = $Γ['global']['$tmp1']['remove']['$tmp76'] = 0;
    $rf = $prop('$tmp1', 'isEmpty', $Γ['global']['$tmp1']['remove']);
    $rf.scope = $Γ['global']['$tmp1']['remove'];
    $rf.$this = $Γ['global']['$tmp1']['remove']['$this'];
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp76 = this.isEmpty();
    $Γ['global']['$tmp1']['remove']['$tmp76'] = $Λ.pop().l;
    $Γ['global']['$tmp1']['remove']['$tmp76'] instanceof Object ? $Γ['global']['$tmp1']['remove']['$tmp76'].Σ = $lub($Γ['global']['$tmp1']['remove']['$tmp76'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['remove']['$tmp76'] = $lub($Γ['global']['$tmp1']['remove']['$tmp76'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp76', null, true, $Γ['global']['$tmp1']['remove'])),
        id: 'IF'
    });
    if ($tmp76) {
        var $tmp82, $tmp83;
        $Γ['global']['$tmp1']['remove']['$tmp83'] = $Γ['global']['$tmp1']['remove']['$tmp82'] = 0;
        $tmp83 = 'Key not found: ' + key;
        $Γ['global']['$tmp1']['remove']['$tmp83'] = $lub($Λ[$Λ.length - 1].l, sec_lvl('key', null, true, $Γ['global']['$tmp1']['remove']));
        $Γ['global']['$tmp1']['remove']['$tmp83'] instanceof Object ? $Γ['global']['$tmp1']['remove']['$tmp83'].Σ = $lub($Γ['global']['$tmp1']['remove']['$tmp83'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['remove']['$tmp83'] = $lub($Γ['global']['$tmp1']['remove']['$tmp83'], $Λ[$Λ.length - 1].l);
        $tmp82 = Error($tmp83);
        $old_pc = $pc();
        while ($pc().id !== 'FUNC' && $pc().id !== 'TRY') {
            $Λ.pop();
        }
        $Λ[$Λ.length - 1] = { 'l': $lub($old_pc.l, sec_lvl('$tmp82', null, true, $Γ['global']['$tmp1']['remove'])) };
        throw $tmp82;
        var $shouldComp = { 'lbl': 'FUNC' };
    } else {
        $upgrade([
            'Error',
            '$tmp82'
        ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp1']['remove']);
    }
    if ($shouldComp)
        $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
    $Λ.pop();
    $rf = $prop('$tmp1', 'splay_', $Γ['global']['$tmp1']['remove']);
    $rf.scope = $Γ['global']['$tmp1']['remove'];
    $rf.$this = $Γ['global']['$tmp1']['remove']['$this'];
    $rf['key'] = $lub(sec_lvl('key', null, true, $Γ['global']['$tmp1']['remove']), $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp77 = this.splay_(key);
    $Γ['global']['$tmp1']['remove']['$tmp77'] = $Λ.pop().l;
    $Γ['global']['$tmp1']['remove']['$tmp77'] instanceof Object ? $Γ['global']['$tmp1']['remove']['$tmp77'].Σ = $lub($Γ['global']['$tmp1']['remove']['$tmp77'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['remove']['$tmp77'] = $lub($Γ['global']['$tmp1']['remove']['$tmp77'], $Λ[$Λ.length - 1].l);
    $tmp73 = this.root_;
    $Γ['global']['$tmp1']['remove']['$tmp73'] = sec_lvl('$tmp1', 'root_', false, $Γ['global']['$tmp1']['remove']);
    $Γ['global']['$tmp1']['remove']['$tmp73'] instanceof Object ? $Γ['global']['$tmp1']['remove']['$tmp73'].Σ = $lub($Γ['global']['$tmp1']['remove']['$tmp73'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['remove']['$tmp73'] = $lub($Γ['global']['$tmp1']['remove']['$tmp73'], $Λ[$Λ.length - 1].l);
    $tmp79 = $tmp73.key;
    $Γ['global']['$tmp1']['remove']['$tmp79'] = sec_lvl('$tmp73', 'key', false, $Γ['global']['$tmp1']['remove']);
    $Γ['global']['$tmp1']['remove']['$tmp79'] instanceof Object ? $Γ['global']['$tmp1']['remove']['$tmp79'].Σ = $lub($Γ['global']['$tmp1']['remove']['$tmp79'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['remove']['$tmp79'] = $lub($Γ['global']['$tmp1']['remove']['$tmp79'], $Λ[$Λ.length - 1].l);
    $tmp78 = $tmp79 != key;
    $Γ['global']['$tmp1']['remove']['$tmp78'] = $lub(sec_lvl('$tmp79', null, true, $Γ['global']['$tmp1']['remove']), sec_lvl('key', null, true, $Γ['global']['$tmp1']['remove']));
    $Γ['global']['$tmp1']['remove']['$tmp78'] instanceof Object ? $Γ['global']['$tmp1']['remove']['$tmp78'].Σ = $lub($Γ['global']['$tmp1']['remove']['$tmp78'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['remove']['$tmp78'] = $lub($Γ['global']['$tmp1']['remove']['$tmp78'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp78', null, true, $Γ['global']['$tmp1']['remove'])),
        id: 'IF'
    });
    if ($tmp78) {
        var $tmp84, $tmp85;
        $Γ['global']['$tmp1']['remove']['$tmp85'] = $Γ['global']['$tmp1']['remove']['$tmp84'] = 0;
        $tmp85 = 'Key not found: ' + key;
        $Γ['global']['$tmp1']['remove']['$tmp85'] = $lub($Λ[$Λ.length - 1].l, sec_lvl('key', null, true, $Γ['global']['$tmp1']['remove']));
        $Γ['global']['$tmp1']['remove']['$tmp85'] instanceof Object ? $Γ['global']['$tmp1']['remove']['$tmp85'].Σ = $lub($Γ['global']['$tmp1']['remove']['$tmp85'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['remove']['$tmp85'] = $lub($Γ['global']['$tmp1']['remove']['$tmp85'], $Λ[$Λ.length - 1].l);
        $tmp84 = Error($tmp85);
        $old_pc = $pc();
        while ($pc().id !== 'FUNC' && $pc().id !== 'TRY') {
            $Λ.pop();
        }
        $Λ[$Λ.length - 1] = { 'l': $lub($old_pc.l, sec_lvl('$tmp84', null, true, $Γ['global']['$tmp1']['remove'])) };
        throw $tmp84;
        var $shouldComp = { 'lbl': 'FUNC' };
    } else {
        $upgrade([
            'Error',
            '$tmp84'
        ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp1']['remove']);
    }
    if ($shouldComp)
        $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
    $Λ.pop();
    removed = this.root_;
    $scope($Γ['global']['$tmp1']['remove'], 'removed', true)['removed'] = sec_lvl('$tmp1', 'root_', false, $Γ['global']['$tmp1']['remove']);
    $scope($Γ['global']['$tmp1']['remove'], 'removed', true)['removed'] instanceof Object ? $scope($Γ['global']['$tmp1']['remove'], 'removed', true)['removed'].Σ = $lub($scope($Γ['global']['$tmp1']['remove'], 'removed', true)['removed'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp1']['remove'], 'removed', true)['removed'] = $lub($scope($Γ['global']['$tmp1']['remove'], 'removed', true)['removed'], $Λ[$Λ.length - 1].l);
    $tmp73 = this.root_;
    $Γ['global']['$tmp1']['remove']['$tmp73'] = sec_lvl('$tmp1', 'root_', false, $Γ['global']['$tmp1']['remove']);
    $Γ['global']['$tmp1']['remove']['$tmp73'] instanceof Object ? $Γ['global']['$tmp1']['remove']['$tmp73'].Σ = $lub($Γ['global']['$tmp1']['remove']['$tmp73'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['remove']['$tmp73'] = $lub($Γ['global']['$tmp1']['remove']['$tmp73'], $Λ[$Λ.length - 1].l);
    $tmp81 = $tmp73.left;
    $Γ['global']['$tmp1']['remove']['$tmp81'] = sec_lvl('$tmp73', 'left', false, $Γ['global']['$tmp1']['remove']);
    $Γ['global']['$tmp1']['remove']['$tmp81'] instanceof Object ? $Γ['global']['$tmp1']['remove']['$tmp81'].Σ = $lub($Γ['global']['$tmp1']['remove']['$tmp81'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['remove']['$tmp81'] = $lub($Γ['global']['$tmp1']['remove']['$tmp81'], $Λ[$Λ.length - 1].l);
    $tmp80 = !$tmp81;
    $Γ['global']['$tmp1']['remove']['$tmp80'] = sec_lvl('$tmp81', null, false, $Γ['global']['$tmp1']['remove']);
    $Γ['global']['$tmp1']['remove']['$tmp80'] instanceof Object ? $Γ['global']['$tmp1']['remove']['$tmp80'].Σ = $lub($Γ['global']['$tmp1']['remove']['$tmp80'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['remove']['$tmp80'] = $lub($Γ['global']['$tmp1']['remove']['$tmp80'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp80', null, true, $Γ['global']['$tmp1']['remove'])),
        id: 'IF'
    });
    if ($tmp80) {
        $upgrade(['$tmp86'], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp1']['remove']);
        var $tmp73;
        $Γ['global']['$tmp1']['remove']['$tmp73'] = 0;
        $tmp73 = this.root_;
        $Γ['global']['$tmp1']['remove']['$tmp73'] = sec_lvl('$tmp1', 'root_', false, $Γ['global']['$tmp1']['remove']);
        $Γ['global']['$tmp1']['remove']['$tmp73'] instanceof Object ? $Γ['global']['$tmp1']['remove']['$tmp73'].Σ = $lub($Γ['global']['$tmp1']['remove']['$tmp73'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['remove']['$tmp73'] = $lub($Γ['global']['$tmp1']['remove']['$tmp73'], $Λ[$Λ.length - 1].l);
        this.root_ = $tmp73.right;
        $Γ['global']['$tmp1']['remove']['$this']['root_'] = sec_lvl('$tmp73', 'right', false, $Γ['global']['$tmp1']['remove']);
        $Γ['global']['$tmp1']['remove']['$this']['root_'] instanceof Object ? $Γ['global']['$tmp1']['remove']['$this']['root_'].Σ = $lub($Γ['global']['$tmp1']['remove']['$this']['root_'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['remove']['$this']['root_'] = $lub($Γ['global']['$tmp1']['remove']['$this']['root_'], $Λ[$Λ.length - 1].l);
    } else {
        var right, $tmp73, $tmp86;
        $Γ['global']['$tmp1']['remove']['$tmp86'] = $Γ['global']['$tmp1']['remove']['$tmp73'] = $Γ['global']['$tmp1']['remove']['right'] = 0;
        $tmp73 = this.root_;
        $Γ['global']['$tmp1']['remove']['$tmp73'] = sec_lvl('$tmp1', 'root_', false, $Γ['global']['$tmp1']['remove']);
        $Γ['global']['$tmp1']['remove']['$tmp73'] instanceof Object ? $Γ['global']['$tmp1']['remove']['$tmp73'].Σ = $lub($Γ['global']['$tmp1']['remove']['$tmp73'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['remove']['$tmp73'] = $lub($Γ['global']['$tmp1']['remove']['$tmp73'], $Λ[$Λ.length - 1].l);
        right = $tmp73.right;
        $scope($Γ['global']['$tmp1']['remove'], 'right', true)['right'] = sec_lvl('$tmp73', 'right', false, $Γ['global']['$tmp1']['remove']);
        $scope($Γ['global']['$tmp1']['remove'], 'right', true)['right'] instanceof Object ? $scope($Γ['global']['$tmp1']['remove'], 'right', true)['right'].Σ = $lub($scope($Γ['global']['$tmp1']['remove'], 'right', true)['right'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp1']['remove'], 'right', true)['right'] = $lub($scope($Γ['global']['$tmp1']['remove'], 'right', true)['right'], $Λ[$Λ.length - 1].l);
        $tmp73 = this.root_;
        $Γ['global']['$tmp1']['remove']['$tmp73'] = sec_lvl('$tmp1', 'root_', false, $Γ['global']['$tmp1']['remove']);
        $Γ['global']['$tmp1']['remove']['$tmp73'] instanceof Object ? $Γ['global']['$tmp1']['remove']['$tmp73'].Σ = $lub($Γ['global']['$tmp1']['remove']['$tmp73'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['remove']['$tmp73'] = $lub($Γ['global']['$tmp1']['remove']['$tmp73'], $Λ[$Λ.length - 1].l);
        this.root_ = $tmp73.left;
        $Γ['global']['$tmp1']['remove']['$this']['root_'] = sec_lvl('$tmp73', 'left', false, $Γ['global']['$tmp1']['remove']);
        $Γ['global']['$tmp1']['remove']['$this']['root_'] instanceof Object ? $Γ['global']['$tmp1']['remove']['$this']['root_'].Σ = $lub($Γ['global']['$tmp1']['remove']['$this']['root_'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['remove']['$this']['root_'] = $lub($Γ['global']['$tmp1']['remove']['$this']['root_'], $Λ[$Λ.length - 1].l);
        $rf = $prop('$tmp1', 'splay_', $Γ['global']['$tmp1']['remove']);
        $rf.scope = $Γ['global']['$tmp1']['remove'];
        $rf.$this = $Γ['global']['$tmp1']['remove']['$this'];
        $rf['key'] = $lub(sec_lvl('key', null, true, $Γ['global']['$tmp1']['remove']), $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
            id: 'FUNC'
        });
        $tmp86 = this.splay_(key);
        $Γ['global']['$tmp1']['remove']['$tmp86'] = $Λ.pop().l;
        $Γ['global']['$tmp1']['remove']['$tmp86'] instanceof Object ? $Γ['global']['$tmp1']['remove']['$tmp86'].Σ = $lub($Γ['global']['$tmp1']['remove']['$tmp86'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['remove']['$tmp86'] = $lub($Γ['global']['$tmp1']['remove']['$tmp86'], $Λ[$Λ.length - 1].l);
        $tmp73 = this.root_;
        $Γ['global']['$tmp1']['remove']['$tmp73'] = sec_lvl('$tmp1', 'root_', false, $Γ['global']['$tmp1']['remove']);
        $Γ['global']['$tmp1']['remove']['$tmp73'] instanceof Object ? $Γ['global']['$tmp1']['remove']['$tmp73'].Σ = $lub($Γ['global']['$tmp1']['remove']['$tmp73'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['remove']['$tmp73'] = $lub($Γ['global']['$tmp1']['remove']['$tmp73'], $Λ[$Λ.length - 1].l);
        $tmp73.right = right;
        $Γ['global']['$tmp1']['remove']['$tmp73']['right'] = sec_lvl('right', null, false, $Γ['global']['$tmp1']['remove']);
        $Γ['global']['$tmp1']['remove']['$tmp73']['right'] instanceof Object ? $Γ['global']['$tmp1']['remove']['$tmp73']['right'].Σ = $lub($Γ['global']['$tmp1']['remove']['$tmp73']['right'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['remove']['$tmp73']['right'] = $lub($Γ['global']['$tmp1']['remove']['$tmp73']['right'], $Λ[$Λ.length - 1].l);
    }
    $Λ.pop();
    return removed;
};
$Γ['global']['$tmp1']['remove'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    key: $Λ[$Λ.length - 1].l
};
$tmp1 = SplayTree.prototype;
$Γ['global']['$tmp1'] = sec_lvl('SplayTree', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp1'] instanceof Object ? $Γ['global']['$tmp1'].Σ = $lub($Γ['global']['$tmp1'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1'] = $lub($Γ['global']['$tmp1'], $Λ[$Λ.length - 1].l);
$tmp1.find = function (key) {
    var $tmp87, $tmp88, $tmp89, $tmp128, $tmp129, $tmp73;
    $Γ['global']['$tmp1']['find']['$tmp73'] = $Γ['global']['$tmp1']['find']['$tmp129'] = $Γ['global']['$tmp1']['find']['$tmp128'] = $Γ['global']['$tmp1']['find']['$tmp89'] = $Γ['global']['$tmp1']['find']['$tmp88'] = $Γ['global']['$tmp1']['find']['$tmp87'] = 0;
    $rf = $prop('$tmp1', 'isEmpty', $Γ['global']['$tmp1']['find']);
    $rf.scope = $Γ['global']['$tmp1']['find'];
    $rf.$this = $Γ['global']['$tmp1']['find']['$this'];
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp87 = this.isEmpty();
    $Γ['global']['$tmp1']['find']['$tmp87'] = $Λ.pop().l;
    $Γ['global']['$tmp1']['find']['$tmp87'] instanceof Object ? $Γ['global']['$tmp1']['find']['$tmp87'].Σ = $lub($Γ['global']['$tmp1']['find']['$tmp87'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['find']['$tmp87'] = $lub($Γ['global']['$tmp1']['find']['$tmp87'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp87', null, true, $Γ['global']['$tmp1']['find'])),
        id: 'IF'
    });
    if ($tmp87) {
        var $tmp90;
        $Γ['global']['$tmp1']['find']['$tmp90'] = 0;
        $tmp90 = null;
        $Γ['global']['$tmp1']['find']['$tmp90'] = $Λ[$Λ.length - 1].l;
        return $tmp90;
        var $shouldComp = { 'lbl': 'FUNC' };
    } else {
    }
    if ($shouldComp)
        $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
    $Λ.pop();
    $rf = $prop('$tmp1', 'splay_', $Γ['global']['$tmp1']['find']);
    $rf.scope = $Γ['global']['$tmp1']['find'];
    $rf.$this = $Γ['global']['$tmp1']['find']['$this'];
    $rf['key'] = $lub(sec_lvl('key', null, true, $Γ['global']['$tmp1']['find']), $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp88 = this.splay_(key);
    $Γ['global']['$tmp1']['find']['$tmp88'] = $Λ.pop().l;
    $Γ['global']['$tmp1']['find']['$tmp88'] instanceof Object ? $Γ['global']['$tmp1']['find']['$tmp88'].Σ = $lub($Γ['global']['$tmp1']['find']['$tmp88'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['find']['$tmp88'] = $lub($Γ['global']['$tmp1']['find']['$tmp88'], $Λ[$Λ.length - 1].l);
    $tmp73 = this.root_;
    $Γ['global']['$tmp1']['find']['$tmp73'] = sec_lvl('$tmp1', 'root_', false, $Γ['global']['$tmp1']['find']);
    $Γ['global']['$tmp1']['find']['$tmp73'] instanceof Object ? $Γ['global']['$tmp1']['find']['$tmp73'].Σ = $lub($Γ['global']['$tmp1']['find']['$tmp73'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['find']['$tmp73'] = $lub($Γ['global']['$tmp1']['find']['$tmp73'], $Λ[$Λ.length - 1].l);
    $tmp129 = $tmp73.key;
    $Γ['global']['$tmp1']['find']['$tmp129'] = sec_lvl('$tmp73', 'key', false, $Γ['global']['$tmp1']['find']);
    $Γ['global']['$tmp1']['find']['$tmp129'] instanceof Object ? $Γ['global']['$tmp1']['find']['$tmp129'].Σ = $lub($Γ['global']['$tmp1']['find']['$tmp129'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['find']['$tmp129'] = $lub($Γ['global']['$tmp1']['find']['$tmp129'], $Λ[$Λ.length - 1].l);
    $tmp128 = $tmp129 == key;
    $Γ['global']['$tmp1']['find']['$tmp128'] = $lub(sec_lvl('$tmp129', null, true, $Γ['global']['$tmp1']['find']), sec_lvl('key', null, true, $Γ['global']['$tmp1']['find']));
    $Γ['global']['$tmp1']['find']['$tmp128'] instanceof Object ? $Γ['global']['$tmp1']['find']['$tmp128'].Σ = $lub($Γ['global']['$tmp1']['find']['$tmp128'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['find']['$tmp128'] = $lub($Γ['global']['$tmp1']['find']['$tmp128'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp128', null, true, $Γ['global']['$tmp1']['find'])),
        id: 'IF'
    });
    if ($tmp128) {
        $tmp89 = this.root_;
        $Γ['global']['$tmp1']['find']['$tmp89'] = sec_lvl('$tmp1', 'root_', false, $Γ['global']['$tmp1']['find']);
        $Γ['global']['$tmp1']['find']['$tmp89'] instanceof Object ? $Γ['global']['$tmp1']['find']['$tmp89'].Σ = $lub($Γ['global']['$tmp1']['find']['$tmp89'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['find']['$tmp89'] = $lub($Γ['global']['$tmp1']['find']['$tmp89'], $Λ[$Λ.length - 1].l);
    } else {
        $tmp89 = null;
        $Γ['global']['$tmp1']['find']['$tmp89'] = $Λ[$Λ.length - 1].l;
    }
    $Λ.pop();
    return $tmp89;
};
$Γ['global']['$tmp1']['find'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    key: $Λ[$Λ.length - 1].l
};
$tmp1 = SplayTree.prototype;
$Γ['global']['$tmp1'] = sec_lvl('SplayTree', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp1'] instanceof Object ? $Γ['global']['$tmp1'].Σ = $lub($Γ['global']['$tmp1'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1'] = $lub($Γ['global']['$tmp1'], $Λ[$Λ.length - 1].l);
$tmp1.findMax = function (opt_startNode) {
    var $tmp91, current, $tmp92, $tmp93;
    $Γ['global']['$tmp1']['findMax']['$tmp93'] = $Γ['global']['$tmp1']['findMax']['$tmp92'] = $Γ['global']['$tmp1']['findMax']['current'] = $Γ['global']['$tmp1']['findMax']['$tmp91'] = 0;
    $rf = $prop('$tmp1', 'isEmpty', $Γ['global']['$tmp1']['findMax']);
    $rf.scope = $Γ['global']['$tmp1']['findMax'];
    $rf.$this = $Γ['global']['$tmp1']['findMax']['$this'];
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp91 = this.isEmpty();
    $Γ['global']['$tmp1']['findMax']['$tmp91'] = $Λ.pop().l;
    $Γ['global']['$tmp1']['findMax']['$tmp91'] instanceof Object ? $Γ['global']['$tmp1']['findMax']['$tmp91'].Σ = $lub($Γ['global']['$tmp1']['findMax']['$tmp91'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['findMax']['$tmp91'] = $lub($Γ['global']['$tmp1']['findMax']['$tmp91'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp91', null, true, $Γ['global']['$tmp1']['findMax'])),
        id: 'IF'
    });
    if ($tmp91) {
        var $tmp94;
        $Γ['global']['$tmp1']['findMax']['$tmp94'] = 0;
        $tmp94 = null;
        $Γ['global']['$tmp1']['findMax']['$tmp94'] = $Λ[$Λ.length - 1].l;
        return $tmp94;
        var $shouldComp = { 'lbl': 'FUNC' };
    } else {
    }
    if ($shouldComp)
        $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
    $Λ.pop();
    $tmp92 = this.root_;
    $Γ['global']['$tmp1']['findMax']['$tmp92'] = sec_lvl('$tmp1', 'root_', false, $Γ['global']['$tmp1']['findMax']);
    $Γ['global']['$tmp1']['findMax']['$tmp92'] instanceof Object ? $Γ['global']['$tmp1']['findMax']['$tmp92'].Σ = $lub($Γ['global']['$tmp1']['findMax']['$tmp92'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['findMax']['$tmp92'] = $lub($Γ['global']['$tmp1']['findMax']['$tmp92'], $Λ[$Λ.length - 1].l);
    current = opt_startNode || $tmp92;
    $scope($Γ['global']['$tmp1']['findMax'], 'current', true)['current'] = $lub(sec_lvl('opt_startNode', null, true, $Γ['global']['$tmp1']['findMax']), sec_lvl('$tmp92', null, true, $Γ['global']['$tmp1']['findMax']));
    $scope($Γ['global']['$tmp1']['findMax'], 'current', true)['current'] instanceof Object ? $scope($Γ['global']['$tmp1']['findMax'], 'current', true)['current'].Σ = $lub($scope($Γ['global']['$tmp1']['findMax'], 'current', true)['current'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp1']['findMax'], 'current', true)['current'] = $lub($scope($Γ['global']['$tmp1']['findMax'], 'current', true)['current'], $Λ[$Λ.length - 1].l);
    $tmp93 = current.right;
    $Γ['global']['$tmp1']['findMax']['$tmp93'] = sec_lvl('current', 'right', false, $Γ['global']['$tmp1']['findMax']);
    $Γ['global']['$tmp1']['findMax']['$tmp93'] instanceof Object ? $Γ['global']['$tmp1']['findMax']['$tmp93'].Σ = $lub($Γ['global']['$tmp1']['findMax']['$tmp93'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['findMax']['$tmp93'] = $lub($Γ['global']['$tmp1']['findMax']['$tmp93'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp93', null, true, $Γ['global']['$tmp1']['findMax'])),
        id: 'LOOP'
    });
    while ($tmp93) {
        current = current.right;
        $scope($Γ['global']['$tmp1']['findMax'], 'current', true)['current'] = sec_lvl('current', 'right', false, $Γ['global']['$tmp1']['findMax']);
        $scope($Γ['global']['$tmp1']['findMax'], 'current', true)['current'] instanceof Object ? $scope($Γ['global']['$tmp1']['findMax'], 'current', true)['current'].Σ = $lub($scope($Γ['global']['$tmp1']['findMax'], 'current', true)['current'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp1']['findMax'], 'current', true)['current'] = $lub($scope($Γ['global']['$tmp1']['findMax'], 'current', true)['current'], $Λ[$Λ.length - 1].l);
        var $tmp93;
        $Γ['global']['$tmp1']['findMax']['$tmp93'] = 0;
        $tmp93 = current.right;
        $Γ['global']['$tmp1']['findMax']['$tmp93'] = sec_lvl('current', 'right', false, $Γ['global']['$tmp1']['findMax']);
        $Γ['global']['$tmp1']['findMax']['$tmp93'] instanceof Object ? $Γ['global']['$tmp1']['findMax']['$tmp93'].Σ = $lub($Γ['global']['$tmp1']['findMax']['$tmp93'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['findMax']['$tmp93'] = $lub($Γ['global']['$tmp1']['findMax']['$tmp93'], $Λ[$Λ.length - 1].l);
    }
    $Λ.pop();
    return current;
};
$Γ['global']['$tmp1']['findMax'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    opt_startNode: $Λ[$Λ.length - 1].l
};
$tmp1 = SplayTree.prototype;
$Γ['global']['$tmp1'] = sec_lvl('SplayTree', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp1'] instanceof Object ? $Γ['global']['$tmp1'].Σ = $lub($Γ['global']['$tmp1'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1'] = $lub($Γ['global']['$tmp1'], $Λ[$Λ.length - 1].l);
$tmp1.findGreatestLessThan = function (key) {
    var $tmp95, $tmp96, $tmp97, $tmp98, $tmp73;
    $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp73'] = $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp98'] = $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp97'] = $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp96'] = $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp95'] = 0;
    $rf = $prop('$tmp1', 'isEmpty', $Γ['global']['$tmp1']['findGreatestLessThan']);
    $rf.scope = $Γ['global']['$tmp1']['findGreatestLessThan'];
    $rf.$this = $Γ['global']['$tmp1']['findGreatestLessThan']['$this'];
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp95 = this.isEmpty();
    $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp95'] = $Λ.pop().l;
    $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp95'] instanceof Object ? $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp95'].Σ = $lub($Γ['global']['$tmp1']['findGreatestLessThan']['$tmp95'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp95'] = $lub($Γ['global']['$tmp1']['findGreatestLessThan']['$tmp95'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp95', null, true, $Γ['global']['$tmp1']['findGreatestLessThan'])),
        id: 'IF'
    });
    if ($tmp95) {
        var $tmp99;
        $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp99'] = 0;
        $tmp99 = null;
        $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp99'] = $Λ[$Λ.length - 1].l;
        return $tmp99;
        var $shouldComp = { 'lbl': 'FUNC' };
    } else {
    }
    if ($shouldComp)
        $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
    $Λ.pop();
    $rf = $prop('$tmp1', 'splay_', $Γ['global']['$tmp1']['findGreatestLessThan']);
    $rf.scope = $Γ['global']['$tmp1']['findGreatestLessThan'];
    $rf.$this = $Γ['global']['$tmp1']['findGreatestLessThan']['$this'];
    $rf['key'] = $lub(sec_lvl('key', null, true, $Γ['global']['$tmp1']['findGreatestLessThan']), $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp96 = this.splay_(key);
    $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp96'] = $Λ.pop().l;
    $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp96'] instanceof Object ? $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp96'].Σ = $lub($Γ['global']['$tmp1']['findGreatestLessThan']['$tmp96'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp96'] = $lub($Γ['global']['$tmp1']['findGreatestLessThan']['$tmp96'], $Λ[$Λ.length - 1].l);
    $tmp73 = this.root_;
    $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp73'] = sec_lvl('$tmp1', 'root_', false, $Γ['global']['$tmp1']['findGreatestLessThan']);
    $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp73'] instanceof Object ? $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp73'].Σ = $lub($Γ['global']['$tmp1']['findGreatestLessThan']['$tmp73'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp73'] = $lub($Γ['global']['$tmp1']['findGreatestLessThan']['$tmp73'], $Λ[$Λ.length - 1].l);
    $tmp98 = $tmp73.key;
    $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp98'] = sec_lvl('$tmp73', 'key', false, $Γ['global']['$tmp1']['findGreatestLessThan']);
    $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp98'] instanceof Object ? $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp98'].Σ = $lub($Γ['global']['$tmp1']['findGreatestLessThan']['$tmp98'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp98'] = $lub($Γ['global']['$tmp1']['findGreatestLessThan']['$tmp98'], $Λ[$Λ.length - 1].l);
    $tmp97 = $tmp98 < key;
    $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp97'] = $lub(sec_lvl('$tmp98', null, true, $Γ['global']['$tmp1']['findGreatestLessThan']), sec_lvl('key', null, true, $Γ['global']['$tmp1']['findGreatestLessThan']));
    $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp97'] instanceof Object ? $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp97'].Σ = $lub($Γ['global']['$tmp1']['findGreatestLessThan']['$tmp97'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp97'] = $lub($Γ['global']['$tmp1']['findGreatestLessThan']['$tmp97'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp97', null, true, $Γ['global']['$tmp1']['findGreatestLessThan'])),
        id: 'IF'
    });
    if ($tmp97) {
        $upgrade(['$tmp101'], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp1']['findGreatestLessThan']);
        var $tmp100;
        $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp100'] = 0;
        $tmp100 = this.root_;
        $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp100'] = sec_lvl('$tmp1', 'root_', false, $Γ['global']['$tmp1']['findGreatestLessThan']);
        $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp100'] instanceof Object ? $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp100'].Σ = $lub($Γ['global']['$tmp1']['findGreatestLessThan']['$tmp100'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp100'] = $lub($Γ['global']['$tmp1']['findGreatestLessThan']['$tmp100'], $Λ[$Λ.length - 1].l);
        return $tmp100;
        var $shouldComp = { 'lbl': 'FUNC' };
    } else {
        var $tmp130, $tmp73;
        $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp73'] = $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp130'] = 0;
        $tmp73 = this.root_;
        $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp73'] = sec_lvl('$tmp1', 'root_', false, $Γ['global']['$tmp1']['findGreatestLessThan']);
        $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp73'] instanceof Object ? $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp73'].Σ = $lub($Γ['global']['$tmp1']['findGreatestLessThan']['$tmp73'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp73'] = $lub($Γ['global']['$tmp1']['findGreatestLessThan']['$tmp73'], $Λ[$Λ.length - 1].l);
        $tmp130 = $tmp73.left;
        $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp130'] = sec_lvl('$tmp73', 'left', false, $Γ['global']['$tmp1']['findGreatestLessThan']);
        $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp130'] instanceof Object ? $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp130'].Σ = $lub($Γ['global']['$tmp1']['findGreatestLessThan']['$tmp130'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp130'] = $lub($Γ['global']['$tmp1']['findGreatestLessThan']['$tmp130'], $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp130', null, true, $Γ['global']['$tmp1']['findGreatestLessThan'])),
            id: 'IF'
        });
        if ($tmp130) {
            var $tmp101, $tmp102, $tmp73;
            $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp73'] = $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp102'] = $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp101'] = 0;
            $tmp73 = this.root_;
            $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp73'] = sec_lvl('$tmp1', 'root_', false, $Γ['global']['$tmp1']['findGreatestLessThan']);
            $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp73'] instanceof Object ? $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp73'].Σ = $lub($Γ['global']['$tmp1']['findGreatestLessThan']['$tmp73'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp73'] = $lub($Γ['global']['$tmp1']['findGreatestLessThan']['$tmp73'], $Λ[$Λ.length - 1].l);
            $tmp102 = $tmp73.left;
            $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp102'] = sec_lvl('$tmp73', 'left', false, $Γ['global']['$tmp1']['findGreatestLessThan']);
            $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp102'] instanceof Object ? $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp102'].Σ = $lub($Γ['global']['$tmp1']['findGreatestLessThan']['$tmp102'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp102'] = $lub($Γ['global']['$tmp1']['findGreatestLessThan']['$tmp102'], $Λ[$Λ.length - 1].l);
            $rf = $prop('$tmp1', 'findMax', $Γ['global']['$tmp1']['findGreatestLessThan']);
            $rf.scope = $Γ['global']['$tmp1']['findGreatestLessThan'];
            $rf.$this = $Γ['global']['$tmp1']['findGreatestLessThan']['$this'];
            $rf['opt_startNode'] = $lub(sec_lvl('$tmp102', null, true, $Γ['global']['$tmp1']['findGreatestLessThan']), $Λ[$Λ.length - 1].l);
            $Λ.push({
                l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
                id: 'FUNC'
            });
            $tmp101 = this.findMax($tmp102);
            $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp101'] = $Λ.pop().l;
            $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp101'] instanceof Object ? $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp101'].Σ = $lub($Γ['global']['$tmp1']['findGreatestLessThan']['$tmp101'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp101'] = $lub($Γ['global']['$tmp1']['findGreatestLessThan']['$tmp101'], $Λ[$Λ.length - 1].l);
            return $tmp101;
            var $shouldComp = { 'lbl': 'FUNC' };
        } else {
            $upgrade(['$tmp101'], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp1']['findGreatestLessThan']);
            var $tmp103;
            $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp103'] = 0;
            $tmp103 = null;
            $Γ['global']['$tmp1']['findGreatestLessThan']['$tmp103'] = $Λ[$Λ.length - 1].l;
            return $tmp103;
            var $shouldComp = { 'lbl': 'FUNC' };
        }
        if ($shouldComp)
            $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
        $Λ.pop();
    }
    if ($shouldComp)
        $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
    $Λ.pop();
    return;
};
$Γ['global']['$tmp1']['findGreatestLessThan'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    key: $Λ[$Λ.length - 1].l
};
$tmp1 = SplayTree.prototype;
$Γ['global']['$tmp1'] = sec_lvl('SplayTree', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp1'] instanceof Object ? $Γ['global']['$tmp1'].Σ = $lub($Γ['global']['$tmp1'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1'] = $lub($Γ['global']['$tmp1'], $Λ[$Λ.length - 1].l);
$tmp1.exportKeys = function () {
    var result, $tmp104, $tmp105;
    $Γ['global']['$tmp1']['exportKeys']['$tmp105'] = $Γ['global']['$tmp1']['exportKeys']['$tmp104'] = $Γ['global']['$tmp1']['exportKeys']['result'] = 0;
    result = [];
    $Γ['global']['$tmp1']['exportKeys']['result'] = {
        __proto__: {},
        scope: $Γ['global']['$tmp1']['exportKeys'],
        Σ: $lub($Λ[$Λ.length - 1].l)
    };
    $rf = $prop('$tmp1', 'isEmpty', $Γ['global']['$tmp1']['exportKeys']);
    $rf.scope = $Γ['global']['$tmp1']['exportKeys'];
    $rf.$this = $Γ['global']['$tmp1']['exportKeys']['$this'];
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp105 = this.isEmpty();
    $Γ['global']['$tmp1']['exportKeys']['$tmp105'] = $Λ.pop().l;
    $Γ['global']['$tmp1']['exportKeys']['$tmp105'] instanceof Object ? $Γ['global']['$tmp1']['exportKeys']['$tmp105'].Σ = $lub($Γ['global']['$tmp1']['exportKeys']['$tmp105'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['exportKeys']['$tmp105'] = $lub($Γ['global']['$tmp1']['exportKeys']['$tmp105'], $Λ[$Λ.length - 1].l);
    $tmp104 = !$tmp105;
    $Γ['global']['$tmp1']['exportKeys']['$tmp104'] = sec_lvl('$tmp105', null, false, $Γ['global']['$tmp1']['exportKeys']);
    $Γ['global']['$tmp1']['exportKeys']['$tmp104'] instanceof Object ? $Γ['global']['$tmp1']['exportKeys']['$tmp104'].Σ = $lub($Γ['global']['$tmp1']['exportKeys']['$tmp104'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['exportKeys']['$tmp104'] = $lub($Γ['global']['$tmp1']['exportKeys']['$tmp104'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp104', null, true, $Γ['global']['$tmp1']['exportKeys'])),
        id: 'IF'
    });
    if ($tmp104) {
        var $tmp106, $tmp73, $tmp107;
        $Γ['global']['$tmp1']['exportKeys']['$tmp107'] = $Γ['global']['$tmp1']['exportKeys']['$tmp73'] = $Γ['global']['$tmp1']['exportKeys']['$tmp106'] = 0;
        $tmp73 = this.root_;
        $Γ['global']['$tmp1']['exportKeys']['$tmp73'] = sec_lvl('$tmp1', 'root_', false, $Γ['global']['$tmp1']['exportKeys']);
        $Γ['global']['$tmp1']['exportKeys']['$tmp73'] instanceof Object ? $Γ['global']['$tmp1']['exportKeys']['$tmp73'].Σ = $lub($Γ['global']['$tmp1']['exportKeys']['$tmp73'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['exportKeys']['$tmp73'] = $lub($Γ['global']['$tmp1']['exportKeys']['$tmp73'], $Λ[$Λ.length - 1].l);
        $tmp107 = function (node) {
            var $tmp108, $tmp109;
            $Γ['global']['$tmp1']['exportKeys']['$tmp107']['$tmp109'] = $Γ['global']['$tmp1']['exportKeys']['$tmp107']['$tmp108'] = 0;
            $tmp109 = node.key;
            $Γ['global']['$tmp1']['exportKeys']['$tmp107']['$tmp109'] = sec_lvl('node', 'key', false, $Γ['global']['$tmp1']['exportKeys']['$tmp107']);
            $Γ['global']['$tmp1']['exportKeys']['$tmp107']['$tmp109'] instanceof Object ? $Γ['global']['$tmp1']['exportKeys']['$tmp107']['$tmp109'].Σ = $lub($Γ['global']['$tmp1']['exportKeys']['$tmp107']['$tmp109'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['exportKeys']['$tmp107']['$tmp109'] = $lub($Γ['global']['$tmp1']['exportKeys']['$tmp107']['$tmp109'], $Λ[$Λ.length - 1].l);
            $tmp108 = result.push($tmp109);
            return;
        };
        $Γ['global']['$tmp1']['exportKeys']['$tmp107'] = {
            $fscope: $Λ[$Λ.length - 1].l,
            prototype: { Σ: $Λ[$Λ.length - 1].l },
            Σ: $Λ[$Λ.length - 1].l,
            scope: $Γ['global']['$tmp1']['exportKeys'],
            node: $Λ[$Λ.length - 1].l
        };
        $tmp106 = $tmp73.traverse_($tmp107);
    } else {
        $upgrade([
            'result.push',
            '$tmp108',
            '$tmp107',
            '$tmp73.traverse_',
            '$tmp106'
        ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp1']['exportKeys']);
    }
    $Λ.pop();
    return result;
};
$Γ['global']['$tmp1']['exportKeys'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$tmp1 = SplayTree.prototype;
$Γ['global']['$tmp1'] = sec_lvl('SplayTree', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp1'] instanceof Object ? $Γ['global']['$tmp1'].Σ = $lub($Γ['global']['$tmp1'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1'] = $lub($Γ['global']['$tmp1'], $Λ[$Λ.length - 1].l);
$tmp1.splay_ = function (key) {
    var $tmp110, dummy, left, right, current;
    $Γ['global']['$tmp1']['splay_']['current'] = $Γ['global']['$tmp1']['splay_']['right'] = $Γ['global']['$tmp1']['splay_']['left'] = $Γ['global']['$tmp1']['splay_']['dummy'] = $Γ['global']['$tmp1']['splay_']['$tmp110'] = 0;
    $rf = $prop('$tmp1', 'isEmpty', $Γ['global']['$tmp1']['splay_']);
    $rf.scope = $Γ['global']['$tmp1']['splay_'];
    $rf.$this = $Γ['global']['$tmp1']['splay_']['$this'];
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp110 = this.isEmpty();
    $Γ['global']['$tmp1']['splay_']['$tmp110'] = $Λ.pop().l;
    $Γ['global']['$tmp1']['splay_']['$tmp110'] instanceof Object ? $Γ['global']['$tmp1']['splay_']['$tmp110'].Σ = $lub($Γ['global']['$tmp1']['splay_']['$tmp110'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['splay_']['$tmp110'] = $lub($Γ['global']['$tmp1']['splay_']['$tmp110'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp110', null, true, $Γ['global']['$tmp1']['splay_'])),
        id: 'IF'
    });
    if ($tmp110) {
        return;
        var $shouldComp = { 'lbl': 'FUNC' };
    } else {
    }
    if ($shouldComp)
        $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
    $Λ.pop();
    $rf = $prop('SplayTree', 'Node', $Γ['global']['$tmp1']['splay_']);
    $rf.scope = $Γ['global']['$tmp1']['splay_'];
    $rf.$this = {
        Σ: $Λ[$Λ.length - 1].l,
        __$proto__: $rf.prototype
    };
    $rf['key'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
    $rf['value'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
    $rf.InvokedAsContr = true;
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    right = new SplayTree.Node(null, null);
    $scope($Γ['global']['$tmp1']['splay_'], 'right', true)['right'] = $Λ.pop().l;
    $scope($Γ['global']['$tmp1']['splay_'], 'right', true)['right'] instanceof Object ? $scope($Γ['global']['$tmp1']['splay_'], 'right', true)['right'].Σ = $lub($scope($Γ['global']['$tmp1']['splay_'], 'right', true)['right'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp1']['splay_'], 'right', true)['right'] = $lub($scope($Γ['global']['$tmp1']['splay_'], 'right', true)['right'], $Λ[$Λ.length - 1].l);
    left = right;
    $scope($Γ['global']['$tmp1']['splay_'], 'left', true)['left'] = sec_lvl('right', null, false, $Γ['global']['$tmp1']['splay_']);
    $scope($Γ['global']['$tmp1']['splay_'], 'left', true)['left'] instanceof Object ? $scope($Γ['global']['$tmp1']['splay_'], 'left', true)['left'].Σ = $lub($scope($Γ['global']['$tmp1']['splay_'], 'left', true)['left'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp1']['splay_'], 'left', true)['left'] = $lub($scope($Γ['global']['$tmp1']['splay_'], 'left', true)['left'], $Λ[$Λ.length - 1].l);
    dummy = left;
    $scope($Γ['global']['$tmp1']['splay_'], 'dummy', true)['dummy'] = sec_lvl('left', null, false, $Γ['global']['$tmp1']['splay_']);
    $scope($Γ['global']['$tmp1']['splay_'], 'dummy', true)['dummy'] instanceof Object ? $scope($Γ['global']['$tmp1']['splay_'], 'dummy', true)['dummy'].Σ = $lub($scope($Γ['global']['$tmp1']['splay_'], 'dummy', true)['dummy'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp1']['splay_'], 'dummy', true)['dummy'] = $lub($scope($Γ['global']['$tmp1']['splay_'], 'dummy', true)['dummy'], $Λ[$Λ.length - 1].l);
    current = this.root_;
    $scope($Γ['global']['$tmp1']['splay_'], 'current', true)['current'] = sec_lvl('$tmp1', 'root_', false, $Γ['global']['$tmp1']['splay_']);
    $scope($Γ['global']['$tmp1']['splay_'], 'current', true)['current'] instanceof Object ? $scope($Γ['global']['$tmp1']['splay_'], 'current', true)['current'].Σ = $lub($scope($Γ['global']['$tmp1']['splay_'], 'current', true)['current'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp1']['splay_'], 'current', true)['current'] = $lub($scope($Γ['global']['$tmp1']['splay_'], 'current', true)['current'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l),
        id: 'LOOP'
    });
    while (true) {
        var $tmp111, $tmp112;
        $Γ['global']['$tmp1']['splay_']['$tmp112'] = $Γ['global']['$tmp1']['splay_']['$tmp111'] = 0;
        $tmp112 = current.key;
        $Γ['global']['$tmp1']['splay_']['$tmp112'] = sec_lvl('current', 'key', false, $Γ['global']['$tmp1']['splay_']);
        $Γ['global']['$tmp1']['splay_']['$tmp112'] instanceof Object ? $Γ['global']['$tmp1']['splay_']['$tmp112'].Σ = $lub($Γ['global']['$tmp1']['splay_']['$tmp112'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['splay_']['$tmp112'] = $lub($Γ['global']['$tmp1']['splay_']['$tmp112'], $Λ[$Λ.length - 1].l);
        $tmp111 = key < $tmp112;
        $Γ['global']['$tmp1']['splay_']['$tmp111'] = $lub(sec_lvl('key', null, true, $Γ['global']['$tmp1']['splay_']), sec_lvl('$tmp112', null, true, $Γ['global']['$tmp1']['splay_']));
        $Γ['global']['$tmp1']['splay_']['$tmp111'] instanceof Object ? $Γ['global']['$tmp1']['splay_']['$tmp111'].Σ = $lub($Γ['global']['$tmp1']['splay_']['$tmp111'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['splay_']['$tmp111'] = $lub($Γ['global']['$tmp1']['splay_']['$tmp111'], $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp111', null, true, $Γ['global']['$tmp1']['splay_'])),
            id: 'IF'
        });
        if ($tmp111) {
            var $tmp113, $tmp114, $tmp115, $tmp116, $tmp117;
            $Γ['global']['$tmp1']['splay_']['$tmp117'] = $Γ['global']['$tmp1']['splay_']['$tmp116'] = $Γ['global']['$tmp1']['splay_']['$tmp115'] = $Γ['global']['$tmp1']['splay_']['$tmp114'] = $Γ['global']['$tmp1']['splay_']['$tmp113'] = 0;
            $tmp114 = current.left;
            $Γ['global']['$tmp1']['splay_']['$tmp114'] = sec_lvl('current', 'left', false, $Γ['global']['$tmp1']['splay_']);
            $Γ['global']['$tmp1']['splay_']['$tmp114'] instanceof Object ? $Γ['global']['$tmp1']['splay_']['$tmp114'].Σ = $lub($Γ['global']['$tmp1']['splay_']['$tmp114'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['splay_']['$tmp114'] = $lub($Γ['global']['$tmp1']['splay_']['$tmp114'], $Λ[$Λ.length - 1].l);
            $tmp113 = !$tmp114;
            $Γ['global']['$tmp1']['splay_']['$tmp113'] = sec_lvl('$tmp114', null, false, $Γ['global']['$tmp1']['splay_']);
            $Γ['global']['$tmp1']['splay_']['$tmp113'] instanceof Object ? $Γ['global']['$tmp1']['splay_']['$tmp113'].Σ = $lub($Γ['global']['$tmp1']['splay_']['$tmp113'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['splay_']['$tmp113'] = $lub($Γ['global']['$tmp1']['splay_']['$tmp113'], $Λ[$Λ.length - 1].l);
            $Λ.push({
                l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp113', null, true, $Γ['global']['$tmp1']['splay_'])),
                id: 'IF'
            });
            if ($tmp113) {
                break;
                var $shouldComp = { 'lbl': 'LOOP' };
            } else {
            }
            if ($shouldComp)
                $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
            $Λ.pop();
            $tmp117 = current.left;
            $Γ['global']['$tmp1']['splay_']['$tmp117'] = sec_lvl('current', 'left', false, $Γ['global']['$tmp1']['splay_']);
            $Γ['global']['$tmp1']['splay_']['$tmp117'] instanceof Object ? $Γ['global']['$tmp1']['splay_']['$tmp117'].Σ = $lub($Γ['global']['$tmp1']['splay_']['$tmp117'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['splay_']['$tmp117'] = $lub($Γ['global']['$tmp1']['splay_']['$tmp117'], $Λ[$Λ.length - 1].l);
            $tmp116 = $tmp117.key;
            $Γ['global']['$tmp1']['splay_']['$tmp116'] = sec_lvl('$tmp117', 'key', false, $Γ['global']['$tmp1']['splay_']);
            $Γ['global']['$tmp1']['splay_']['$tmp116'] instanceof Object ? $Γ['global']['$tmp1']['splay_']['$tmp116'].Σ = $lub($Γ['global']['$tmp1']['splay_']['$tmp116'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['splay_']['$tmp116'] = $lub($Γ['global']['$tmp1']['splay_']['$tmp116'], $Λ[$Λ.length - 1].l);
            $tmp115 = key < $tmp116;
            $Γ['global']['$tmp1']['splay_']['$tmp115'] = $lub(sec_lvl('key', null, true, $Γ['global']['$tmp1']['splay_']), sec_lvl('$tmp116', null, true, $Γ['global']['$tmp1']['splay_']));
            $Γ['global']['$tmp1']['splay_']['$tmp115'] instanceof Object ? $Γ['global']['$tmp1']['splay_']['$tmp115'].Σ = $lub($Γ['global']['$tmp1']['splay_']['$tmp115'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['splay_']['$tmp115'] = $lub($Γ['global']['$tmp1']['splay_']['$tmp115'], $Λ[$Λ.length - 1].l);
            $Λ.push({
                l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp115', null, true, $Γ['global']['$tmp1']['splay_'])),
                id: 'IF'
            });
            if ($tmp115) {
                var tmp, $tmp118, $tmp119;
                $Γ['global']['$tmp1']['splay_']['$tmp119'] = $Γ['global']['$tmp1']['splay_']['$tmp118'] = $Γ['global']['$tmp1']['splay_']['tmp'] = 0;
                tmp = current.left;
                $scope($Γ['global']['$tmp1']['splay_'], 'tmp', true)['tmp'] = sec_lvl('current', 'left', false, $Γ['global']['$tmp1']['splay_']);
                $scope($Γ['global']['$tmp1']['splay_'], 'tmp', true)['tmp'] instanceof Object ? $scope($Γ['global']['$tmp1']['splay_'], 'tmp', true)['tmp'].Σ = $lub($scope($Γ['global']['$tmp1']['splay_'], 'tmp', true)['tmp'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp1']['splay_'], 'tmp', true)['tmp'] = $lub($scope($Γ['global']['$tmp1']['splay_'], 'tmp', true)['tmp'], $Λ[$Λ.length - 1].l);
                current.left = tmp.right;
                $scope($Γ['global']['$tmp1']['splay_'], 'current', false)['left'] = sec_lvl('tmp', 'right', false, $Γ['global']['$tmp1']['splay_']);
                $scope($Γ['global']['$tmp1']['splay_'], 'current', false)['left'] instanceof Object ? $scope($Γ['global']['$tmp1']['splay_'], 'current', false)['left'].Σ = $lub($scope($Γ['global']['$tmp1']['splay_'], 'current', false)['left'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp1']['splay_'], 'current', false)['left'] = $lub($scope($Γ['global']['$tmp1']['splay_'], 'current', false)['left'], $Λ[$Λ.length - 1].l);
                tmp.right = current;
                $scope($Γ['global']['$tmp1']['splay_'], 'tmp', false)['right'] = sec_lvl('current', null, false, $Γ['global']['$tmp1']['splay_']);
                $scope($Γ['global']['$tmp1']['splay_'], 'tmp', false)['right'] instanceof Object ? $scope($Γ['global']['$tmp1']['splay_'], 'tmp', false)['right'].Σ = $lub($scope($Γ['global']['$tmp1']['splay_'], 'tmp', false)['right'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp1']['splay_'], 'tmp', false)['right'] = $lub($scope($Γ['global']['$tmp1']['splay_'], 'tmp', false)['right'], $Λ[$Λ.length - 1].l);
                current = tmp;
                $scope($Γ['global']['$tmp1']['splay_'], 'current', true)['current'] = sec_lvl('tmp', null, false, $Γ['global']['$tmp1']['splay_']);
                $scope($Γ['global']['$tmp1']['splay_'], 'current', true)['current'] instanceof Object ? $scope($Γ['global']['$tmp1']['splay_'], 'current', true)['current'].Σ = $lub($scope($Γ['global']['$tmp1']['splay_'], 'current', true)['current'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp1']['splay_'], 'current', true)['current'] = $lub($scope($Γ['global']['$tmp1']['splay_'], 'current', true)['current'], $Λ[$Λ.length - 1].l);
                $tmp119 = current.left;
                $Γ['global']['$tmp1']['splay_']['$tmp119'] = sec_lvl('current', 'left', false, $Γ['global']['$tmp1']['splay_']);
                $Γ['global']['$tmp1']['splay_']['$tmp119'] instanceof Object ? $Γ['global']['$tmp1']['splay_']['$tmp119'].Σ = $lub($Γ['global']['$tmp1']['splay_']['$tmp119'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['splay_']['$tmp119'] = $lub($Γ['global']['$tmp1']['splay_']['$tmp119'], $Λ[$Λ.length - 1].l);
                $tmp118 = !$tmp119;
                $Γ['global']['$tmp1']['splay_']['$tmp118'] = sec_lvl('$tmp119', null, false, $Γ['global']['$tmp1']['splay_']);
                $Γ['global']['$tmp1']['splay_']['$tmp118'] instanceof Object ? $Γ['global']['$tmp1']['splay_']['$tmp118'].Σ = $lub($Γ['global']['$tmp1']['splay_']['$tmp118'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['splay_']['$tmp118'] = $lub($Γ['global']['$tmp1']['splay_']['$tmp118'], $Λ[$Λ.length - 1].l);
                $Λ.push({
                    l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp118', null, true, $Γ['global']['$tmp1']['splay_'])),
                    id: 'IF'
                });
                if ($tmp118) {
                    break;
                    var $shouldComp = { 'lbl': 'LOOP' };
                } else {
                }
                if ($shouldComp)
                    $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
                $Λ.pop();
            } else {
            }
            $Λ.pop();
            right.left = current;
            $scope($Γ['global']['$tmp1']['splay_'], 'right', false)['left'] = sec_lvl('current', null, false, $Γ['global']['$tmp1']['splay_']);
            $scope($Γ['global']['$tmp1']['splay_'], 'right', false)['left'] instanceof Object ? $scope($Γ['global']['$tmp1']['splay_'], 'right', false)['left'].Σ = $lub($scope($Γ['global']['$tmp1']['splay_'], 'right', false)['left'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp1']['splay_'], 'right', false)['left'] = $lub($scope($Γ['global']['$tmp1']['splay_'], 'right', false)['left'], $Λ[$Λ.length - 1].l);
            right = current;
            $scope($Γ['global']['$tmp1']['splay_'], 'right', true)['right'] = sec_lvl('current', null, false, $Γ['global']['$tmp1']['splay_']);
            $scope($Γ['global']['$tmp1']['splay_'], 'right', true)['right'] instanceof Object ? $scope($Γ['global']['$tmp1']['splay_'], 'right', true)['right'].Σ = $lub($scope($Γ['global']['$tmp1']['splay_'], 'right', true)['right'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp1']['splay_'], 'right', true)['right'] = $lub($scope($Γ['global']['$tmp1']['splay_'], 'right', true)['right'], $Λ[$Λ.length - 1].l);
            current = current.left;
            $scope($Γ['global']['$tmp1']['splay_'], 'current', true)['current'] = sec_lvl('current', 'left', false, $Γ['global']['$tmp1']['splay_']);
            $scope($Γ['global']['$tmp1']['splay_'], 'current', true)['current'] instanceof Object ? $scope($Γ['global']['$tmp1']['splay_'], 'current', true)['current'].Σ = $lub($scope($Γ['global']['$tmp1']['splay_'], 'current', true)['current'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp1']['splay_'], 'current', true)['current'] = $lub($scope($Γ['global']['$tmp1']['splay_'], 'current', true)['current'], $Λ[$Λ.length - 1].l);
        } else {
            var $tmp131, $tmp132;
            $Γ['global']['$tmp1']['splay_']['$tmp132'] = $Γ['global']['$tmp1']['splay_']['$tmp131'] = 0;
            $tmp132 = current.key;
            $Γ['global']['$tmp1']['splay_']['$tmp132'] = sec_lvl('current', 'key', false, $Γ['global']['$tmp1']['splay_']);
            $Γ['global']['$tmp1']['splay_']['$tmp132'] instanceof Object ? $Γ['global']['$tmp1']['splay_']['$tmp132'].Σ = $lub($Γ['global']['$tmp1']['splay_']['$tmp132'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['splay_']['$tmp132'] = $lub($Γ['global']['$tmp1']['splay_']['$tmp132'], $Λ[$Λ.length - 1].l);
            $tmp131 = key > $tmp132;
            $Γ['global']['$tmp1']['splay_']['$tmp131'] = $lub(sec_lvl('key', null, true, $Γ['global']['$tmp1']['splay_']), sec_lvl('$tmp132', null, true, $Γ['global']['$tmp1']['splay_']));
            $Γ['global']['$tmp1']['splay_']['$tmp131'] instanceof Object ? $Γ['global']['$tmp1']['splay_']['$tmp131'].Σ = $lub($Γ['global']['$tmp1']['splay_']['$tmp131'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['splay_']['$tmp131'] = $lub($Γ['global']['$tmp1']['splay_']['$tmp131'], $Λ[$Λ.length - 1].l);
            $Λ.push({
                l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp131', null, true, $Γ['global']['$tmp1']['splay_'])),
                id: 'IF'
            });
            if ($tmp131) {
                var $tmp120, $tmp121, $tmp122, $tmp123, $tmp124;
                $Γ['global']['$tmp1']['splay_']['$tmp124'] = $Γ['global']['$tmp1']['splay_']['$tmp123'] = $Γ['global']['$tmp1']['splay_']['$tmp122'] = $Γ['global']['$tmp1']['splay_']['$tmp121'] = $Γ['global']['$tmp1']['splay_']['$tmp120'] = 0;
                $tmp121 = current.right;
                $Γ['global']['$tmp1']['splay_']['$tmp121'] = sec_lvl('current', 'right', false, $Γ['global']['$tmp1']['splay_']);
                $Γ['global']['$tmp1']['splay_']['$tmp121'] instanceof Object ? $Γ['global']['$tmp1']['splay_']['$tmp121'].Σ = $lub($Γ['global']['$tmp1']['splay_']['$tmp121'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['splay_']['$tmp121'] = $lub($Γ['global']['$tmp1']['splay_']['$tmp121'], $Λ[$Λ.length - 1].l);
                $tmp120 = !$tmp121;
                $Γ['global']['$tmp1']['splay_']['$tmp120'] = sec_lvl('$tmp121', null, false, $Γ['global']['$tmp1']['splay_']);
                $Γ['global']['$tmp1']['splay_']['$tmp120'] instanceof Object ? $Γ['global']['$tmp1']['splay_']['$tmp120'].Σ = $lub($Γ['global']['$tmp1']['splay_']['$tmp120'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['splay_']['$tmp120'] = $lub($Γ['global']['$tmp1']['splay_']['$tmp120'], $Λ[$Λ.length - 1].l);
                $Λ.push({
                    l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp120', null, true, $Γ['global']['$tmp1']['splay_'])),
                    id: 'IF'
                });
                if ($tmp120) {
                    break;
                    var $shouldComp = { 'lbl': 'LOOP' };
                } else {
                }
                if ($shouldComp)
                    $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
                $Λ.pop();
                $tmp124 = current.right;
                $Γ['global']['$tmp1']['splay_']['$tmp124'] = sec_lvl('current', 'right', false, $Γ['global']['$tmp1']['splay_']);
                $Γ['global']['$tmp1']['splay_']['$tmp124'] instanceof Object ? $Γ['global']['$tmp1']['splay_']['$tmp124'].Σ = $lub($Γ['global']['$tmp1']['splay_']['$tmp124'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['splay_']['$tmp124'] = $lub($Γ['global']['$tmp1']['splay_']['$tmp124'], $Λ[$Λ.length - 1].l);
                $tmp123 = $tmp124.key;
                $Γ['global']['$tmp1']['splay_']['$tmp123'] = sec_lvl('$tmp124', 'key', false, $Γ['global']['$tmp1']['splay_']);
                $Γ['global']['$tmp1']['splay_']['$tmp123'] instanceof Object ? $Γ['global']['$tmp1']['splay_']['$tmp123'].Σ = $lub($Γ['global']['$tmp1']['splay_']['$tmp123'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['splay_']['$tmp123'] = $lub($Γ['global']['$tmp1']['splay_']['$tmp123'], $Λ[$Λ.length - 1].l);
                $tmp122 = key > $tmp123;
                $Γ['global']['$tmp1']['splay_']['$tmp122'] = $lub(sec_lvl('key', null, true, $Γ['global']['$tmp1']['splay_']), sec_lvl('$tmp123', null, true, $Γ['global']['$tmp1']['splay_']));
                $Γ['global']['$tmp1']['splay_']['$tmp122'] instanceof Object ? $Γ['global']['$tmp1']['splay_']['$tmp122'].Σ = $lub($Γ['global']['$tmp1']['splay_']['$tmp122'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['splay_']['$tmp122'] = $lub($Γ['global']['$tmp1']['splay_']['$tmp122'], $Λ[$Λ.length - 1].l);
                $Λ.push({
                    l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp122', null, true, $Γ['global']['$tmp1']['splay_'])),
                    id: 'IF'
                });
                if ($tmp122) {
                    var tmp, $tmp125, $tmp126;
                    $Γ['global']['$tmp1']['splay_']['$tmp126'] = $Γ['global']['$tmp1']['splay_']['$tmp125'] = $Γ['global']['$tmp1']['splay_']['tmp'] = 0;
                    tmp = current.right;
                    $scope($Γ['global']['$tmp1']['splay_'], 'tmp', true)['tmp'] = sec_lvl('current', 'right', false, $Γ['global']['$tmp1']['splay_']);
                    $scope($Γ['global']['$tmp1']['splay_'], 'tmp', true)['tmp'] instanceof Object ? $scope($Γ['global']['$tmp1']['splay_'], 'tmp', true)['tmp'].Σ = $lub($scope($Γ['global']['$tmp1']['splay_'], 'tmp', true)['tmp'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp1']['splay_'], 'tmp', true)['tmp'] = $lub($scope($Γ['global']['$tmp1']['splay_'], 'tmp', true)['tmp'], $Λ[$Λ.length - 1].l);
                    current.right = tmp.left;
                    $scope($Γ['global']['$tmp1']['splay_'], 'current', false)['right'] = sec_lvl('tmp', 'left', false, $Γ['global']['$tmp1']['splay_']);
                    $scope($Γ['global']['$tmp1']['splay_'], 'current', false)['right'] instanceof Object ? $scope($Γ['global']['$tmp1']['splay_'], 'current', false)['right'].Σ = $lub($scope($Γ['global']['$tmp1']['splay_'], 'current', false)['right'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp1']['splay_'], 'current', false)['right'] = $lub($scope($Γ['global']['$tmp1']['splay_'], 'current', false)['right'], $Λ[$Λ.length - 1].l);
                    tmp.left = current;
                    $scope($Γ['global']['$tmp1']['splay_'], 'tmp', false)['left'] = sec_lvl('current', null, false, $Γ['global']['$tmp1']['splay_']);
                    $scope($Γ['global']['$tmp1']['splay_'], 'tmp', false)['left'] instanceof Object ? $scope($Γ['global']['$tmp1']['splay_'], 'tmp', false)['left'].Σ = $lub($scope($Γ['global']['$tmp1']['splay_'], 'tmp', false)['left'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp1']['splay_'], 'tmp', false)['left'] = $lub($scope($Γ['global']['$tmp1']['splay_'], 'tmp', false)['left'], $Λ[$Λ.length - 1].l);
                    current = tmp;
                    $scope($Γ['global']['$tmp1']['splay_'], 'current', true)['current'] = sec_lvl('tmp', null, false, $Γ['global']['$tmp1']['splay_']);
                    $scope($Γ['global']['$tmp1']['splay_'], 'current', true)['current'] instanceof Object ? $scope($Γ['global']['$tmp1']['splay_'], 'current', true)['current'].Σ = $lub($scope($Γ['global']['$tmp1']['splay_'], 'current', true)['current'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp1']['splay_'], 'current', true)['current'] = $lub($scope($Γ['global']['$tmp1']['splay_'], 'current', true)['current'], $Λ[$Λ.length - 1].l);
                    $tmp126 = current.right;
                    $Γ['global']['$tmp1']['splay_']['$tmp126'] = sec_lvl('current', 'right', false, $Γ['global']['$tmp1']['splay_']);
                    $Γ['global']['$tmp1']['splay_']['$tmp126'] instanceof Object ? $Γ['global']['$tmp1']['splay_']['$tmp126'].Σ = $lub($Γ['global']['$tmp1']['splay_']['$tmp126'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['splay_']['$tmp126'] = $lub($Γ['global']['$tmp1']['splay_']['$tmp126'], $Λ[$Λ.length - 1].l);
                    $tmp125 = !$tmp126;
                    $Γ['global']['$tmp1']['splay_']['$tmp125'] = sec_lvl('$tmp126', null, false, $Γ['global']['$tmp1']['splay_']);
                    $Γ['global']['$tmp1']['splay_']['$tmp125'] instanceof Object ? $Γ['global']['$tmp1']['splay_']['$tmp125'].Σ = $lub($Γ['global']['$tmp1']['splay_']['$tmp125'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['splay_']['$tmp125'] = $lub($Γ['global']['$tmp1']['splay_']['$tmp125'], $Λ[$Λ.length - 1].l);
                    $Λ.push({
                        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp125', null, true, $Γ['global']['$tmp1']['splay_'])),
                        id: 'IF'
                    });
                    if ($tmp125) {
                        break;
                        var $shouldComp = { 'lbl': 'LOOP' };
                    } else {
                    }
                    if ($shouldComp)
                        $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
                    $Λ.pop();
                } else {
                }
                $Λ.pop();
                left.right = current;
                $scope($Γ['global']['$tmp1']['splay_'], 'left', false)['right'] = sec_lvl('current', null, false, $Γ['global']['$tmp1']['splay_']);
                $scope($Γ['global']['$tmp1']['splay_'], 'left', false)['right'] instanceof Object ? $scope($Γ['global']['$tmp1']['splay_'], 'left', false)['right'].Σ = $lub($scope($Γ['global']['$tmp1']['splay_'], 'left', false)['right'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp1']['splay_'], 'left', false)['right'] = $lub($scope($Γ['global']['$tmp1']['splay_'], 'left', false)['right'], $Λ[$Λ.length - 1].l);
                left = current;
                $scope($Γ['global']['$tmp1']['splay_'], 'left', true)['left'] = sec_lvl('current', null, false, $Γ['global']['$tmp1']['splay_']);
                $scope($Γ['global']['$tmp1']['splay_'], 'left', true)['left'] instanceof Object ? $scope($Γ['global']['$tmp1']['splay_'], 'left', true)['left'].Σ = $lub($scope($Γ['global']['$tmp1']['splay_'], 'left', true)['left'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp1']['splay_'], 'left', true)['left'] = $lub($scope($Γ['global']['$tmp1']['splay_'], 'left', true)['left'], $Λ[$Λ.length - 1].l);
                current = current.right;
                $scope($Γ['global']['$tmp1']['splay_'], 'current', true)['current'] = sec_lvl('current', 'right', false, $Γ['global']['$tmp1']['splay_']);
                $scope($Γ['global']['$tmp1']['splay_'], 'current', true)['current'] instanceof Object ? $scope($Γ['global']['$tmp1']['splay_'], 'current', true)['current'].Σ = $lub($scope($Γ['global']['$tmp1']['splay_'], 'current', true)['current'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp1']['splay_'], 'current', true)['current'] = $lub($scope($Γ['global']['$tmp1']['splay_'], 'current', true)['current'], $Λ[$Λ.length - 1].l);
            } else {
                break;
                var $shouldComp = { 'lbl': 'LOOP' };
            }
            if ($shouldComp)
                $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
            $Λ.pop();
        }
        $Λ.pop();
    }
    $Λ.pop();
    left.right = current.left;
    $scope($Γ['global']['$tmp1']['splay_'], 'left', false)['right'] = sec_lvl('current', 'left', false, $Γ['global']['$tmp1']['splay_']);
    $scope($Γ['global']['$tmp1']['splay_'], 'left', false)['right'] instanceof Object ? $scope($Γ['global']['$tmp1']['splay_'], 'left', false)['right'].Σ = $lub($scope($Γ['global']['$tmp1']['splay_'], 'left', false)['right'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp1']['splay_'], 'left', false)['right'] = $lub($scope($Γ['global']['$tmp1']['splay_'], 'left', false)['right'], $Λ[$Λ.length - 1].l);
    right.left = current.right;
    $scope($Γ['global']['$tmp1']['splay_'], 'right', false)['left'] = sec_lvl('current', 'right', false, $Γ['global']['$tmp1']['splay_']);
    $scope($Γ['global']['$tmp1']['splay_'], 'right', false)['left'] instanceof Object ? $scope($Γ['global']['$tmp1']['splay_'], 'right', false)['left'].Σ = $lub($scope($Γ['global']['$tmp1']['splay_'], 'right', false)['left'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp1']['splay_'], 'right', false)['left'] = $lub($scope($Γ['global']['$tmp1']['splay_'], 'right', false)['left'], $Λ[$Λ.length - 1].l);
    current.left = dummy.right;
    $scope($Γ['global']['$tmp1']['splay_'], 'current', false)['left'] = sec_lvl('dummy', 'right', false, $Γ['global']['$tmp1']['splay_']);
    $scope($Γ['global']['$tmp1']['splay_'], 'current', false)['left'] instanceof Object ? $scope($Γ['global']['$tmp1']['splay_'], 'current', false)['left'].Σ = $lub($scope($Γ['global']['$tmp1']['splay_'], 'current', false)['left'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp1']['splay_'], 'current', false)['left'] = $lub($scope($Γ['global']['$tmp1']['splay_'], 'current', false)['left'], $Λ[$Λ.length - 1].l);
    current.right = dummy.left;
    $scope($Γ['global']['$tmp1']['splay_'], 'current', false)['right'] = sec_lvl('dummy', 'left', false, $Γ['global']['$tmp1']['splay_']);
    $scope($Γ['global']['$tmp1']['splay_'], 'current', false)['right'] instanceof Object ? $scope($Γ['global']['$tmp1']['splay_'], 'current', false)['right'].Σ = $lub($scope($Γ['global']['$tmp1']['splay_'], 'current', false)['right'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp1']['splay_'], 'current', false)['right'] = $lub($scope($Γ['global']['$tmp1']['splay_'], 'current', false)['right'], $Λ[$Λ.length - 1].l);
    this.root_ = current;
    $Γ['global']['$tmp1']['splay_']['$this']['root_'] = sec_lvl('current', null, false, $Γ['global']['$tmp1']['splay_']);
    $Γ['global']['$tmp1']['splay_']['$this']['root_'] instanceof Object ? $Γ['global']['$tmp1']['splay_']['$this']['root_'].Σ = $lub($Γ['global']['$tmp1']['splay_']['$this']['root_'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['splay_']['$this']['root_'] = $lub($Γ['global']['$tmp1']['splay_']['$this']['root_'], $Λ[$Λ.length - 1].l);
    return;
};
$Γ['global']['$tmp1']['splay_'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    key: $Λ[$Λ.length - 1].l
};
SplayTree.Node = function (key, value) {
    this.key = key;
    $Γ['global']['SplayTree']['Node']['$this']['key'] = sec_lvl('key', null, false, $Γ['global']['SplayTree']['Node']);
    $Γ['global']['SplayTree']['Node']['$this']['key'] instanceof Object ? $Γ['global']['SplayTree']['Node']['$this']['key'].Σ = $lub($Γ['global']['SplayTree']['Node']['$this']['key'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['SplayTree']['Node']['$this']['key'] = $lub($Γ['global']['SplayTree']['Node']['$this']['key'], $Λ[$Λ.length - 1].l);
    this.value = value;
    $Γ['global']['SplayTree']['Node']['$this']['value'] = sec_lvl('value', null, false, $Γ['global']['SplayTree']['Node']);
    $Γ['global']['SplayTree']['Node']['$this']['value'] instanceof Object ? $Γ['global']['SplayTree']['Node']['$this']['value'].Σ = $lub($Γ['global']['SplayTree']['Node']['$this']['value'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['SplayTree']['Node']['$this']['value'] = $lub($Γ['global']['SplayTree']['Node']['$this']['value'], $Λ[$Λ.length - 1].l);
    return;
};
$Γ['global']['SplayTree']['Node'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    key: $Λ[$Λ.length - 1].l,
    value: $Λ[$Λ.length - 1].l
};
$tmp2 = SplayTree.Node;
$Γ['global']['$tmp2'] = sec_lvl('SplayTree', 'Node', false, $Γ['global']);
$Γ['global']['$tmp2'] instanceof Object ? $Γ['global']['$tmp2'].Σ = $lub($Γ['global']['$tmp2'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp2'] = $lub($Γ['global']['$tmp2'], $Λ[$Λ.length - 1].l);
$tmp = $tmp2.prototype;
$Γ['global']['$tmp'] = sec_lvl('$tmp2', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp'] instanceof Object ? $Γ['global']['$tmp'].Σ = $lub($Γ['global']['$tmp'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp'] = $lub($Γ['global']['$tmp'], $Λ[$Λ.length - 1].l);
$tmp.left = null;
$Γ['global']['$tmp']['left'] = $Λ[$Λ.length - 1].l;
$tmp2 = SplayTree.Node;
$Γ['global']['$tmp2'] = sec_lvl('SplayTree', 'Node', false, $Γ['global']);
$Γ['global']['$tmp2'] instanceof Object ? $Γ['global']['$tmp2'].Σ = $lub($Γ['global']['$tmp2'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp2'] = $lub($Γ['global']['$tmp2'], $Λ[$Λ.length - 1].l);
$tmp = $tmp2.prototype;
$Γ['global']['$tmp'] = sec_lvl('$tmp2', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp'] instanceof Object ? $Γ['global']['$tmp'].Σ = $lub($Γ['global']['$tmp'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp'] = $lub($Γ['global']['$tmp'], $Λ[$Λ.length - 1].l);
$tmp.right = null;
$Γ['global']['$tmp']['right'] = $Λ[$Λ.length - 1].l;
$tmp2 = SplayTree.Node;
$Γ['global']['$tmp2'] = sec_lvl('SplayTree', 'Node', false, $Γ['global']);
$Γ['global']['$tmp2'] instanceof Object ? $Γ['global']['$tmp2'].Σ = $lub($Γ['global']['$tmp2'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp2'] = $lub($Γ['global']['$tmp2'], $Λ[$Λ.length - 1].l);
$tmp = $tmp2.prototype;
$Γ['global']['$tmp'] = sec_lvl('$tmp2', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp'] instanceof Object ? $Γ['global']['$tmp'].Σ = $lub($Γ['global']['$tmp'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp'] = $lub($Γ['global']['$tmp'], $Λ[$Λ.length - 1].l);
$tmp.traverse_ = function (f) {
    var current;
    $Γ['global']['$tmp']['traverse_']['current'] = 0;
    current = this;
    $scope($Γ['global']['$tmp']['traverse_'], 'current', true)['current'] = $Γ['global']['$tmp']['traverse_'].$this;
    $scope($Γ['global']['$tmp']['traverse_'], 'current', true)['current'] instanceof Object ? $scope($Γ['global']['$tmp']['traverse_'], 'current', true)['current'].Σ = $lub($scope($Γ['global']['$tmp']['traverse_'], 'current', true)['current'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp']['traverse_'], 'current', true)['current'] = $lub($scope($Γ['global']['$tmp']['traverse_'], 'current', true)['current'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('current', null, true, $Γ['global']['$tmp']['traverse_'])),
        id: 'LOOP'
    });
    while (current) {
        var left, $tmp127;
        $Γ['global']['$tmp']['traverse_']['$tmp127'] = $Γ['global']['$tmp']['traverse_']['left'] = 0;
        left = current.left;
        $scope($Γ['global']['$tmp']['traverse_'], 'left', true)['left'] = sec_lvl('current', 'left', false, $Γ['global']['$tmp']['traverse_']);
        $scope($Γ['global']['$tmp']['traverse_'], 'left', true)['left'] instanceof Object ? $scope($Γ['global']['$tmp']['traverse_'], 'left', true)['left'].Σ = $lub($scope($Γ['global']['$tmp']['traverse_'], 'left', true)['left'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp']['traverse_'], 'left', true)['left'] = $lub($scope($Γ['global']['$tmp']['traverse_'], 'left', true)['left'], $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($Λ[$Λ.length - 1].l, sec_lvl('left', null, true, $Γ['global']['$tmp']['traverse_'])),
            id: 'IF'
        });
        if (left) {
            var $tmp133;
            $Γ['global']['$tmp']['traverse_']['$tmp133'] = 0;
            $tmp133 = left.traverse_(f);
        } else {
            $upgrade([
                'left.traverse_',
                '$tmp133'
            ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp']['traverse_']);
        }
        $Λ.pop();
        $tmp127 = f(current);
        current = current.right;
        $scope($Γ['global']['$tmp']['traverse_'], 'current', true)['current'] = sec_lvl('current', 'right', false, $Γ['global']['$tmp']['traverse_']);
        $scope($Γ['global']['$tmp']['traverse_'], 'current', true)['current'] instanceof Object ? $scope($Γ['global']['$tmp']['traverse_'], 'current', true)['current'].Σ = $lub($scope($Γ['global']['$tmp']['traverse_'], 'current', true)['current'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp']['traverse_'], 'current', true)['current'] = $lub($scope($Γ['global']['$tmp']['traverse_'], 'current', true)['current'], $Λ[$Λ.length - 1].l);
    }
    $upgrade([
        'left.traverse_',
        '$tmp133',
        'f',
        '$tmp127'
    ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp']['traverse_']);
    $Λ.pop();
    return;
};
$Γ['global']['$tmp']['traverse_'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    f: $Λ[$Λ.length - 1].l
};
$rf = $scope($Γ['global'], 'SplaySetup', false)['SplaySetup'];
$rf.scope = $Γ['global'];
$rf.$this = $Γ['global'];
$Λ.push({
    l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
    id: 'FUNC'
});
$tmp3 = SplaySetup();
$Γ['global']['$tmp3'] = $Λ.pop().l;
$Γ['global']['$tmp3'] instanceof Object ? $Γ['global']['$tmp3'].Σ = $lub($Γ['global']['$tmp3'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp3'] = $lub($Γ['global']['$tmp3'], $Λ[$Λ.length - 1].l);
$rf = $scope($Γ['global'], 'SplayRun', false)['SplayRun'];
$rf.scope = $Γ['global'];
$rf.$this = $Γ['global'];
$Λ.push({
    l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
    id: 'FUNC'
});
$tmp4 = SplayRun();
$Γ['global']['$tmp4'] = $Λ.pop().l;
$Γ['global']['$tmp4'] instanceof Object ? $Γ['global']['$tmp4'].Σ = $lub($Γ['global']['$tmp4'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp4'] = $lub($Γ['global']['$tmp4'], $Λ[$Λ.length - 1].l);
$rf = $scope($Γ['global'], 'SplayTearDown', false)['SplayTearDown'];
$rf.scope = $Γ['global'];
$rf.$this = $Γ['global'];
$Λ.push({
    l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
    id: 'FUNC'
});
$tmp5 = SplayTearDown();
$Γ['global']['$tmp5'] = $Λ.pop().l;
$Γ['global']['$tmp5'] instanceof Object ? $Γ['global']['$tmp5'].Σ = $lub($Γ['global']['$tmp5'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5'] = $lub($Γ['global']['$tmp5'], $Λ[$Λ.length - 1].l);

