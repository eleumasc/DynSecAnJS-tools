
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

var LZW, comp, decomp, $tmp0, $tmp1;
$Γ['global']['$tmp1'] = $Γ['global']['$tmp0'] = $Γ['global']['decomp'] = $Γ['global']['comp'] = $Γ['global']['LZW'] = 0;
LZW = {};
$Γ['global']['LZW'] = {
    __proto__: {},
    Σ: $Λ[$Λ.length - 1].l
};
LZW.decompress = function (compressed) {
    "use strict";
    var i, dictionary, w, result, k, entry, dictSize, $tmp2, $tmp4, $tmp5, $tmp6, $tmp8, $tmp9;
    $Γ['global']['LZW']['decompress']['$tmp9'] = $Γ['global']['LZW']['decompress']['$tmp8'] = $Γ['global']['LZW']['decompress']['$tmp6'] = $Γ['global']['LZW']['decompress']['$tmp5'] = $Γ['global']['LZW']['decompress']['$tmp4'] = $Γ['global']['LZW']['decompress']['$tmp2'] = $Γ['global']['LZW']['decompress']['dictSize'] = $Γ['global']['LZW']['decompress']['entry'] = $Γ['global']['LZW']['decompress']['k'] = $Γ['global']['LZW']['decompress']['result'] = $Γ['global']['LZW']['decompress']['w'] = $Γ['global']['LZW']['decompress']['dictionary'] = $Γ['global']['LZW']['decompress']['i'] = 0;
    dictionary = [];
    $Γ['global']['LZW']['decompress']['dictionary'] = {
        __proto__: {},
        scope: $Γ['global']['LZW']['decompress'],
        Σ: $Λ[$Λ.length - 1].l
    };
    entry = '';
    $scope($Γ['global']['LZW']['decompress'], 'entry', true)['entry'] = $Λ[$Λ.length - 1].l;
    dictSize = 256;
    $scope($Γ['global']['LZW']['decompress'], 'dictSize', true)['dictSize'] = $Λ[$Λ.length - 1].l;
    i = 0;
    $scope($Γ['global']['LZW']['decompress'], 'i', true)['i'] = $Λ[$Λ.length - 1].l;
    $tmp2 = i;
    $Γ['global']['LZW']['decompress']['$tmp2'] = sec_lvl('i', null, false, $Γ['global']['LZW']['decompress']);
    $Γ['global']['LZW']['decompress']['$tmp2'] instanceof Object ? $Γ['global']['LZW']['decompress']['$tmp2'].Σ = $Γ['global']['LZW']['decompress']['$tmp2'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['decompress']['$tmp2'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['LZW']['decompress']['$tmp2'] = $Γ['global']['LZW']['decompress']['$tmp2'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['decompress']['$tmp2'] : $Λ[$Λ.length - 1].l;
    $tmp4 = i < 256;
    $Γ['global']['LZW']['decompress']['$tmp4'] = sec_lvl('i', null, true, $Γ['global']['LZW']['decompress']) >= $Λ[$Λ.length - 1].l ? sec_lvl('i', null, true, $Γ['global']['LZW']['decompress']) : $Λ[$Λ.length - 1].l;
    $Γ['global']['LZW']['decompress']['$tmp4'] instanceof Object ? $Γ['global']['LZW']['decompress']['$tmp4'].Σ = $Γ['global']['LZW']['decompress']['$tmp4'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['decompress']['$tmp4'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['LZW']['decompress']['$tmp4'] = $Γ['global']['LZW']['decompress']['$tmp4'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['decompress']['$tmp4'] : $Λ[$Λ.length - 1].l;
    $Λ.push({
        l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp4', null, true, $Γ['global']['LZW']['decompress']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp4', null, true, $Γ['global']['LZW']['decompress']),
        id: 'LOOP'
    });
    for (; $tmp4;) {
        dictionary[i] = String.fromCharCode(i);
        var $tmp3, $tmp4;
        $Γ['global']['LZW']['decompress']['$tmp4'] = $Γ['global']['LZW']['decompress']['$tmp3'] = 0;
        i += 1;
        $scope($Γ['global']['LZW']['decompress'], 'i', true)['i'] = $Λ[$Λ.length - 1].l;
        $tmp3 = i;
        $Γ['global']['LZW']['decompress']['$tmp3'] = sec_lvl('i', null, false, $Γ['global']['LZW']['decompress']);
        $Γ['global']['LZW']['decompress']['$tmp3'] instanceof Object ? $Γ['global']['LZW']['decompress']['$tmp3'].Σ = $Γ['global']['LZW']['decompress']['$tmp3'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['decompress']['$tmp3'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['LZW']['decompress']['$tmp3'] = $Γ['global']['LZW']['decompress']['$tmp3'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['decompress']['$tmp3'] : $Λ[$Λ.length - 1].l;
        $tmp4 = i < 256;
        $Γ['global']['LZW']['decompress']['$tmp4'] = sec_lvl('i', null, true, $Γ['global']['LZW']['decompress']) >= $Λ[$Λ.length - 1].l ? sec_lvl('i', null, true, $Γ['global']['LZW']['decompress']) : $Λ[$Λ.length - 1].l;
        $Γ['global']['LZW']['decompress']['$tmp4'] instanceof Object ? $Γ['global']['LZW']['decompress']['$tmp4'].Σ = $Γ['global']['LZW']['decompress']['$tmp4'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['decompress']['$tmp4'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['LZW']['decompress']['$tmp4'] = $Γ['global']['LZW']['decompress']['$tmp4'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['decompress']['$tmp4'] : $Λ[$Λ.length - 1].l;
    }
    $upgrade(['dictionary'], $Λ[$Λ.length - 1].l, $Γ['global']['LZW']['decompress']);
    $Λ.pop();
    $tmp5 = compressed[0];
    $Γ['global']['LZW']['decompress']['$tmp5'] = sec_lvl('compressed', 0, false, $Γ['global']['LZW']['decompress']);
    $Γ['global']['LZW']['decompress']['$tmp5'] instanceof Object ? $Γ['global']['LZW']['decompress']['$tmp5'].Σ = $Γ['global']['LZW']['decompress']['$tmp5'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['decompress']['$tmp5'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['LZW']['decompress']['$tmp5'] = $Γ['global']['LZW']['decompress']['$tmp5'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['decompress']['$tmp5'] : $Λ[$Λ.length - 1].l;
    w = String.fromCharCode($tmp5);
    result = w;
    $scope($Γ['global']['LZW']['decompress'], 'result', true)['result'] = sec_lvl('w', null, false, $Γ['global']['LZW']['decompress']);
    $scope($Γ['global']['LZW']['decompress'], 'result', true)['result'] instanceof Object ? $scope($Γ['global']['LZW']['decompress'], 'result', true)['result'].Σ = $scope($Γ['global']['LZW']['decompress'], 'result', true)['result'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['LZW']['decompress'], 'result', true)['result'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['LZW']['decompress'], 'result', true)['result'] = $scope($Γ['global']['LZW']['decompress'], 'result', true)['result'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['LZW']['decompress'], 'result', true)['result'] : $Λ[$Λ.length - 1].l;
    i = 1;
    $scope($Γ['global']['LZW']['decompress'], 'i', true)['i'] = $Λ[$Λ.length - 1].l;
    $tmp6 = i;
    $Γ['global']['LZW']['decompress']['$tmp6'] = sec_lvl('i', null, false, $Γ['global']['LZW']['decompress']);
    $Γ['global']['LZW']['decompress']['$tmp6'] instanceof Object ? $Γ['global']['LZW']['decompress']['$tmp6'].Σ = $Γ['global']['LZW']['decompress']['$tmp6'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['decompress']['$tmp6'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['LZW']['decompress']['$tmp6'] = $Γ['global']['LZW']['decompress']['$tmp6'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['decompress']['$tmp6'] : $Λ[$Λ.length - 1].l;
    $tmp9 = compressed.length;
    $Γ['global']['LZW']['decompress']['$tmp9'] = sec_lvl('compressed', 'length', false, $Γ['global']['LZW']['decompress']);
    $Γ['global']['LZW']['decompress']['$tmp9'] instanceof Object ? $Γ['global']['LZW']['decompress']['$tmp9'].Σ = $Γ['global']['LZW']['decompress']['$tmp9'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['decompress']['$tmp9'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['LZW']['decompress']['$tmp9'] = $Γ['global']['LZW']['decompress']['$tmp9'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['decompress']['$tmp9'] : $Λ[$Λ.length - 1].l;
    $tmp8 = i < $tmp9;
    $Γ['global']['LZW']['decompress']['$tmp8'] = sec_lvl('i', null, true, $Γ['global']['LZW']['decompress']) >= sec_lvl('$tmp9', null, true, $Γ['global']['LZW']['decompress']) ? sec_lvl('i', null, true, $Γ['global']['LZW']['decompress']) : sec_lvl('$tmp9', null, true, $Γ['global']['LZW']['decompress']);
    $Γ['global']['LZW']['decompress']['$tmp8'] instanceof Object ? $Γ['global']['LZW']['decompress']['$tmp8'].Σ = $Γ['global']['LZW']['decompress']['$tmp8'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['decompress']['$tmp8'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['LZW']['decompress']['$tmp8'] = $Γ['global']['LZW']['decompress']['$tmp8'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['decompress']['$tmp8'] : $Λ[$Λ.length - 1].l;
    $Λ.push({
        l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp8', null, true, $Γ['global']['LZW']['decompress']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp8', null, true, $Γ['global']['LZW']['decompress']),
        id: 'LOOP'
    });
    for (; $tmp8;) {
        k = compressed[i];
        $scope($Γ['global']['LZW']['decompress'], 'k', true)['k'] = sec_lvl('compressed', i, false, $Γ['global']['LZW']['decompress']);
        $scope($Γ['global']['LZW']['decompress'], 'k', true)['k'] instanceof Object ? $scope($Γ['global']['LZW']['decompress'], 'k', true)['k'].Σ = $scope($Γ['global']['LZW']['decompress'], 'k', true)['k'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['LZW']['decompress'], 'k', true)['k'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['LZW']['decompress'], 'k', true)['k'] = $scope($Γ['global']['LZW']['decompress'], 'k', true)['k'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['LZW']['decompress'], 'k', true)['k'] : $Λ[$Λ.length - 1].l;
        var $tmp10, $tmp11, $tmp12, $tmp7, $tmp8, $tmp13;
        $Γ['global']['LZW']['decompress']['$tmp13'] = $Γ['global']['LZW']['decompress']['$tmp8'] = $Γ['global']['LZW']['decompress']['$tmp7'] = $Γ['global']['LZW']['decompress']['$tmp12'] = $Γ['global']['LZW']['decompress']['$tmp11'] = $Γ['global']['LZW']['decompress']['$tmp10'] = 0;
        $tmp10 = dictionary[k];
        $Γ['global']['LZW']['decompress']['$tmp10'] = sec_lvl('dictionary', k, false, $Γ['global']['LZW']['decompress']);
        $Γ['global']['LZW']['decompress']['$tmp10'] instanceof Object ? $Γ['global']['LZW']['decompress']['$tmp10'].Σ = $Γ['global']['LZW']['decompress']['$tmp10'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['decompress']['$tmp10'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['LZW']['decompress']['$tmp10'] = $Γ['global']['LZW']['decompress']['$tmp10'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['decompress']['$tmp10'] : $Λ[$Λ.length - 1].l;
        $Λ.push({
            l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp10', null, true, $Γ['global']['LZW']['decompress']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp10', null, true, $Γ['global']['LZW']['decompress']),
            id: 'IF'
        });
        if ($tmp10) {
            $upgrade(['$tmp15'], $Λ[$Λ.length - 1].l, $Γ['global']['LZW']['decompress']);
            entry = dictionary[k];
            $scope($Γ['global']['LZW']['decompress'], 'entry', true)['entry'] = sec_lvl('dictionary', k, false, $Γ['global']['LZW']['decompress']);
            $scope($Γ['global']['LZW']['decompress'], 'entry', true)['entry'] instanceof Object ? $scope($Γ['global']['LZW']['decompress'], 'entry', true)['entry'].Σ = $scope($Γ['global']['LZW']['decompress'], 'entry', true)['entry'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['LZW']['decompress'], 'entry', true)['entry'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['LZW']['decompress'], 'entry', true)['entry'] = $scope($Γ['global']['LZW']['decompress'], 'entry', true)['entry'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['LZW']['decompress'], 'entry', true)['entry'] : $Λ[$Λ.length - 1].l;
        } else {
            var $tmp14;
            $Γ['global']['LZW']['decompress']['$tmp14'] = 0;
            $tmp14 = k === dictSize;
            $Γ['global']['LZW']['decompress']['$tmp14'] = sec_lvl('k', null, true, $Γ['global']['LZW']['decompress']) >= sec_lvl('dictSize', null, true, $Γ['global']['LZW']['decompress']) ? sec_lvl('k', null, true, $Γ['global']['LZW']['decompress']) : sec_lvl('dictSize', null, true, $Γ['global']['LZW']['decompress']);
            $Γ['global']['LZW']['decompress']['$tmp14'] instanceof Object ? $Γ['global']['LZW']['decompress']['$tmp14'].Σ = $Γ['global']['LZW']['decompress']['$tmp14'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['decompress']['$tmp14'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['LZW']['decompress']['$tmp14'] = $Γ['global']['LZW']['decompress']['$tmp14'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['decompress']['$tmp14'] : $Λ[$Λ.length - 1].l;
            $Λ.push({
                l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp14', null, true, $Γ['global']['LZW']['decompress']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp14', null, true, $Γ['global']['LZW']['decompress']),
                id: 'IF'
            });
            if ($tmp14) {
                var $tmp15;
                $Γ['global']['LZW']['decompress']['$tmp15'] = 0;
                $tmp15 = w.charAt(0);
                entry = w + $tmp15;
                $scope($Γ['global']['LZW']['decompress'], 'entry', true)['entry'] = sec_lvl('w', null, true, $Γ['global']['LZW']['decompress']) >= sec_lvl('$tmp15', null, true, $Γ['global']['LZW']['decompress']) ? sec_lvl('w', null, true, $Γ['global']['LZW']['decompress']) : sec_lvl('$tmp15', null, true, $Γ['global']['LZW']['decompress']);
                $scope($Γ['global']['LZW']['decompress'], 'entry', true)['entry'] instanceof Object ? $scope($Γ['global']['LZW']['decompress'], 'entry', true)['entry'].Σ = $scope($Γ['global']['LZW']['decompress'], 'entry', true)['entry'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['LZW']['decompress'], 'entry', true)['entry'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['LZW']['decompress'], 'entry', true)['entry'] = $scope($Γ['global']['LZW']['decompress'], 'entry', true)['entry'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['LZW']['decompress'], 'entry', true)['entry'] : $Λ[$Λ.length - 1].l;
            } else {
                $upgrade(['$tmp15'], $Λ[$Λ.length - 1].l, $Γ['global']['LZW']['decompress']);
                var $tmp16;
                $Γ['global']['LZW']['decompress']['$tmp16'] = 0;
                $tmp16 = null;
                $Γ['global']['LZW']['decompress']['$tmp16'] = $Λ[$Λ.length - 1].l;
                return $tmp16;
                var $shouldComp = { 'lbl': 'FUNC' };
            }
            if ($shouldComp)
                $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
            $Λ.pop();
        }
        $Λ.pop();
        result += entry;
        $scope($Γ['global']['LZW']['decompress'], 'result', true)['result'] = sec_lvl('entry', null, false, $Γ['global']['LZW']['decompress']);
        $scope($Γ['global']['LZW']['decompress'], 'result', true)['result'] instanceof Object ? $scope($Γ['global']['LZW']['decompress'], 'result', true)['result'].Σ = $scope($Γ['global']['LZW']['decompress'], 'result', true)['result'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['LZW']['decompress'], 'result', true)['result'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['LZW']['decompress'], 'result', true)['result'] = $scope($Γ['global']['LZW']['decompress'], 'result', true)['result'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['LZW']['decompress'], 'result', true)['result'] : $Λ[$Λ.length - 1].l;
        $tmp11 = dictSize++;
        $Γ['global']['LZW']['decompress']['$tmp11'] = sec_lvl('dictSize', null, false, $Γ['global']['LZW']['decompress']);
        $Γ['global']['LZW']['decompress']['$tmp11'] instanceof Object ? $Γ['global']['LZW']['decompress']['$tmp11'].Σ = $Γ['global']['LZW']['decompress']['$tmp11'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['decompress']['$tmp11'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['LZW']['decompress']['$tmp11'] = $Γ['global']['LZW']['decompress']['$tmp11'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['decompress']['$tmp11'] : $Λ[$Λ.length - 1].l;
        $tmp12 = entry.charAt(0);
        dictionary[$tmp11] = w + $tmp12;
        $scope($Γ['global']['LZW']['decompress'], 'dictionary', false)[$tmp11] = sec_lvl('w', null, true, $Γ['global']['LZW']['decompress']) >= sec_lvl('$tmp12', null, true, $Γ['global']['LZW']['decompress']) ? sec_lvl('w', null, true, $Γ['global']['LZW']['decompress']) : sec_lvl('$tmp12', null, true, $Γ['global']['LZW']['decompress']);
        _$tmp = sec_lvl('$tmp11', null, false, $Γ['global']['LZW']['decompress']) instanceof Object ? sec_lvl('$tmp11', null, false, $Γ['global']['LZW']['decompress']).Σ : sec_lvl('$tmp11', null, false, $Γ['global']['LZW']['decompress']);
        $scope($Γ['global']['LZW']['decompress'], 'dictionary', false)[$tmp11] instanceof Object ? $scope($Γ['global']['LZW']['decompress'], 'dictionary', false)[$tmp11].Σ = $scope($Γ['global']['LZW']['decompress'], 'dictionary', false)[$tmp11].Σ : $scope($Γ['global']['LZW']['decompress'], 'dictionary', false)[$tmp11] = $scope($Γ['global']['LZW']['decompress'], 'dictionary', false)[$tmp11];
        w = entry;
        $scope($Γ['global']['LZW']['decompress'], 'w', true)['w'] = sec_lvl('entry', null, false, $Γ['global']['LZW']['decompress']);
        $scope($Γ['global']['LZW']['decompress'], 'w', true)['w'] instanceof Object ? $scope($Γ['global']['LZW']['decompress'], 'w', true)['w'].Σ = $scope($Γ['global']['LZW']['decompress'], 'w', true)['w'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['LZW']['decompress'], 'w', true)['w'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['LZW']['decompress'], 'w', true)['w'] = $scope($Γ['global']['LZW']['decompress'], 'w', true)['w'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['LZW']['decompress'], 'w', true)['w'] : $Λ[$Λ.length - 1].l;
        i += 1;
        $scope($Γ['global']['LZW']['decompress'], 'i', true)['i'] = $Λ[$Λ.length - 1].l;
        $tmp7 = i;
        $Γ['global']['LZW']['decompress']['$tmp7'] = sec_lvl('i', null, false, $Γ['global']['LZW']['decompress']);
        $Γ['global']['LZW']['decompress']['$tmp7'] instanceof Object ? $Γ['global']['LZW']['decompress']['$tmp7'].Σ = $Γ['global']['LZW']['decompress']['$tmp7'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['decompress']['$tmp7'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['LZW']['decompress']['$tmp7'] = $Γ['global']['LZW']['decompress']['$tmp7'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['decompress']['$tmp7'] : $Λ[$Λ.length - 1].l;
        $tmp13 = compressed.length;
        $Γ['global']['LZW']['decompress']['$tmp13'] = sec_lvl('compressed', 'length', false, $Γ['global']['LZW']['decompress']);
        $Γ['global']['LZW']['decompress']['$tmp13'] instanceof Object ? $Γ['global']['LZW']['decompress']['$tmp13'].Σ = $Γ['global']['LZW']['decompress']['$tmp13'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['decompress']['$tmp13'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['LZW']['decompress']['$tmp13'] = $Γ['global']['LZW']['decompress']['$tmp13'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['decompress']['$tmp13'] : $Λ[$Λ.length - 1].l;
        $tmp8 = i < $tmp13;
        $Γ['global']['LZW']['decompress']['$tmp8'] = sec_lvl('i', null, true, $Γ['global']['LZW']['decompress']) >= sec_lvl('$tmp13', null, true, $Γ['global']['LZW']['decompress']) ? sec_lvl('i', null, true, $Γ['global']['LZW']['decompress']) : sec_lvl('$tmp13', null, true, $Γ['global']['LZW']['decompress']);
        $Γ['global']['LZW']['decompress']['$tmp8'] instanceof Object ? $Γ['global']['LZW']['decompress']['$tmp8'].Σ = $Γ['global']['LZW']['decompress']['$tmp8'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['decompress']['$tmp8'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['LZW']['decompress']['$tmp8'] = $Γ['global']['LZW']['decompress']['$tmp8'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['decompress']['$tmp8'] : $Λ[$Λ.length - 1].l;
    }
    $upgrade([
        '$tmp15',
        '$tmp12'
    ], $Λ[$Λ.length - 1].l, $Γ['global']['LZW']['decompress']);
    $Λ.pop();
    return result;
};
$Γ['global']['LZW']['decompress'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    compressed: $Λ[$Λ.length - 1].l
};
LZW.compress = function (uncompressed) {
    "use strict";
    var i, dictionary, c, wc, w, result, dictSize, $tmp17, $tmp19, $tmp20, $tmp22, $tmp23, $tmp24;
    $Γ['global']['LZW']['compress']['$tmp24'] = $Γ['global']['LZW']['compress']['$tmp23'] = $Γ['global']['LZW']['compress']['$tmp22'] = $Γ['global']['LZW']['compress']['$tmp20'] = $Γ['global']['LZW']['compress']['$tmp19'] = $Γ['global']['LZW']['compress']['$tmp17'] = $Γ['global']['LZW']['compress']['dictSize'] = $Γ['global']['LZW']['compress']['result'] = $Γ['global']['LZW']['compress']['w'] = $Γ['global']['LZW']['compress']['wc'] = $Γ['global']['LZW']['compress']['c'] = $Γ['global']['LZW']['compress']['dictionary'] = $Γ['global']['LZW']['compress']['i'] = 0;
    dictionary = {};
    $Γ['global']['LZW']['compress']['dictionary'] = {
        __proto__: {},
        Σ: $Λ[$Λ.length - 1].l
    };
    w = '';
    $scope($Γ['global']['LZW']['compress'], 'w', true)['w'] = $Λ[$Λ.length - 1].l;
    result = [];
    $Γ['global']['LZW']['compress']['result'] = {
        __proto__: {},
        scope: $Γ['global']['LZW']['compress'],
        Σ: $Λ[$Λ.length - 1].l
    };
    dictSize = 256;
    $scope($Γ['global']['LZW']['compress'], 'dictSize', true)['dictSize'] = $Λ[$Λ.length - 1].l;
    i = 0;
    $scope($Γ['global']['LZW']['compress'], 'i', true)['i'] = $Λ[$Λ.length - 1].l;
    $tmp17 = i;
    $Γ['global']['LZW']['compress']['$tmp17'] = sec_lvl('i', null, false, $Γ['global']['LZW']['compress']);
    $Γ['global']['LZW']['compress']['$tmp17'] instanceof Object ? $Γ['global']['LZW']['compress']['$tmp17'].Σ = $Γ['global']['LZW']['compress']['$tmp17'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['compress']['$tmp17'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['LZW']['compress']['$tmp17'] = $Γ['global']['LZW']['compress']['$tmp17'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['compress']['$tmp17'] : $Λ[$Λ.length - 1].l;
    $tmp19 = i < 256;
    $Γ['global']['LZW']['compress']['$tmp19'] = sec_lvl('i', null, true, $Γ['global']['LZW']['compress']) >= $Λ[$Λ.length - 1].l ? sec_lvl('i', null, true, $Γ['global']['LZW']['compress']) : $Λ[$Λ.length - 1].l;
    $Γ['global']['LZW']['compress']['$tmp19'] instanceof Object ? $Γ['global']['LZW']['compress']['$tmp19'].Σ = $Γ['global']['LZW']['compress']['$tmp19'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['compress']['$tmp19'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['LZW']['compress']['$tmp19'] = $Γ['global']['LZW']['compress']['$tmp19'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['compress']['$tmp19'] : $Λ[$Λ.length - 1].l;
    $Λ.push({
        l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp19', null, true, $Γ['global']['LZW']['compress']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp19', null, true, $Γ['global']['LZW']['compress']),
        id: 'LOOP'
    });
    for (; $tmp19;) {
        var $tmp25, $tmp18, $tmp19;
        $Γ['global']['LZW']['compress']['$tmp19'] = $Γ['global']['LZW']['compress']['$tmp18'] = $Γ['global']['LZW']['compress']['$tmp25'] = 0;
        $tmp25 = String.fromCharCode(i);
        dictionary[$tmp25] = i;
        $scope($Γ['global']['LZW']['compress'], 'dictionary', false)[$tmp25] = sec_lvl('i', null, false, $Γ['global']['LZW']['compress']);
        _$tmp = sec_lvl('$tmp25', null, false, $Γ['global']['LZW']['compress']) instanceof Object ? sec_lvl('$tmp25', null, false, $Γ['global']['LZW']['compress']).Σ : sec_lvl('$tmp25', null, false, $Γ['global']['LZW']['compress']);
        $scope($Γ['global']['LZW']['compress'], 'dictionary', false)[$tmp25] instanceof Object ? $scope($Γ['global']['LZW']['compress'], 'dictionary', false)[$tmp25].Σ = $scope($Γ['global']['LZW']['compress'], 'dictionary', false)[$tmp25].Σ : $scope($Γ['global']['LZW']['compress'], 'dictionary', false)[$tmp25] = $scope($Γ['global']['LZW']['compress'], 'dictionary', false)[$tmp25];
        i += 1;
        $scope($Γ['global']['LZW']['compress'], 'i', true)['i'] = $Λ[$Λ.length - 1].l;
        $tmp18 = i;
        $Γ['global']['LZW']['compress']['$tmp18'] = sec_lvl('i', null, false, $Γ['global']['LZW']['compress']);
        $Γ['global']['LZW']['compress']['$tmp18'] instanceof Object ? $Γ['global']['LZW']['compress']['$tmp18'].Σ = $Γ['global']['LZW']['compress']['$tmp18'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['compress']['$tmp18'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['LZW']['compress']['$tmp18'] = $Γ['global']['LZW']['compress']['$tmp18'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['compress']['$tmp18'] : $Λ[$Λ.length - 1].l;
        $tmp19 = i < 256;
        $Γ['global']['LZW']['compress']['$tmp19'] = sec_lvl('i', null, true, $Γ['global']['LZW']['compress']) >= $Λ[$Λ.length - 1].l ? sec_lvl('i', null, true, $Γ['global']['LZW']['compress']) : $Λ[$Λ.length - 1].l;
        $Γ['global']['LZW']['compress']['$tmp19'] instanceof Object ? $Γ['global']['LZW']['compress']['$tmp19'].Σ = $Γ['global']['LZW']['compress']['$tmp19'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['compress']['$tmp19'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['LZW']['compress']['$tmp19'] = $Γ['global']['LZW']['compress']['$tmp19'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['compress']['$tmp19'] : $Λ[$Λ.length - 1].l;
    }
    $upgrade(['$tmp25'], $Λ[$Λ.length - 1].l, $Γ['global']['LZW']['compress']);
    $Λ.pop();
    i = 0;
    $scope($Γ['global']['LZW']['compress'], 'i', true)['i'] = $Λ[$Λ.length - 1].l;
    $tmp20 = i;
    $Γ['global']['LZW']['compress']['$tmp20'] = sec_lvl('i', null, false, $Γ['global']['LZW']['compress']);
    $Γ['global']['LZW']['compress']['$tmp20'] instanceof Object ? $Γ['global']['LZW']['compress']['$tmp20'].Σ = $Γ['global']['LZW']['compress']['$tmp20'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['compress']['$tmp20'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['LZW']['compress']['$tmp20'] = $Γ['global']['LZW']['compress']['$tmp20'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['compress']['$tmp20'] : $Λ[$Λ.length - 1].l;
    $tmp23 = uncompressed.length;
    $Γ['global']['LZW']['compress']['$tmp23'] = sec_lvl('uncompressed', 'length', false, $Γ['global']['LZW']['compress']);
    $Γ['global']['LZW']['compress']['$tmp23'] instanceof Object ? $Γ['global']['LZW']['compress']['$tmp23'].Σ = $Γ['global']['LZW']['compress']['$tmp23'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['compress']['$tmp23'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['LZW']['compress']['$tmp23'] = $Γ['global']['LZW']['compress']['$tmp23'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['compress']['$tmp23'] : $Λ[$Λ.length - 1].l;
    $tmp22 = i < $tmp23;
    $Γ['global']['LZW']['compress']['$tmp22'] = sec_lvl('i', null, true, $Γ['global']['LZW']['compress']) >= sec_lvl('$tmp23', null, true, $Γ['global']['LZW']['compress']) ? sec_lvl('i', null, true, $Γ['global']['LZW']['compress']) : sec_lvl('$tmp23', null, true, $Γ['global']['LZW']['compress']);
    $Γ['global']['LZW']['compress']['$tmp22'] instanceof Object ? $Γ['global']['LZW']['compress']['$tmp22'].Σ = $Γ['global']['LZW']['compress']['$tmp22'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['compress']['$tmp22'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['LZW']['compress']['$tmp22'] = $Γ['global']['LZW']['compress']['$tmp22'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['compress']['$tmp22'] : $Λ[$Λ.length - 1].l;
    $Λ.push({
        l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp22', null, true, $Γ['global']['LZW']['compress']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp22', null, true, $Γ['global']['LZW']['compress']),
        id: 'LOOP'
    });
    for (; $tmp22;) {
        c = uncompressed.charAt(i);
        wc = w + c;
        $scope($Γ['global']['LZW']['compress'], 'wc', true)['wc'] = sec_lvl('w', null, true, $Γ['global']['LZW']['compress']) >= sec_lvl('c', null, true, $Γ['global']['LZW']['compress']) ? sec_lvl('w', null, true, $Γ['global']['LZW']['compress']) : sec_lvl('c', null, true, $Γ['global']['LZW']['compress']);
        $scope($Γ['global']['LZW']['compress'], 'wc', true)['wc'] instanceof Object ? $scope($Γ['global']['LZW']['compress'], 'wc', true)['wc'].Σ = $scope($Γ['global']['LZW']['compress'], 'wc', true)['wc'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['LZW']['compress'], 'wc', true)['wc'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['LZW']['compress'], 'wc', true)['wc'] = $scope($Γ['global']['LZW']['compress'], 'wc', true)['wc'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['LZW']['compress'], 'wc', true)['wc'] : $Λ[$Λ.length - 1].l;
        var $tmp26, $tmp21, $tmp22, $tmp27;
        $Γ['global']['LZW']['compress']['$tmp27'] = $Γ['global']['LZW']['compress']['$tmp22'] = $Γ['global']['LZW']['compress']['$tmp21'] = $Γ['global']['LZW']['compress']['$tmp26'] = 0;
        $tmp26 = dictionary.hasOwnProperty(wc);
        $Λ.push({
            l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp26', null, true, $Γ['global']['LZW']['compress']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp26', null, true, $Γ['global']['LZW']['compress']),
            id: 'IF'
        });
        if ($tmp26) {
            $upgrade([
                '$tmp28',
                'w'
            ], $Λ[$Λ.length - 1].l, $Γ['global']['LZW']['compress']);
            w = wc;
            $scope($Γ['global']['LZW']['compress'], 'w', true)['w'] = sec_lvl('wc', null, false, $Γ['global']['LZW']['compress']);
            $scope($Γ['global']['LZW']['compress'], 'w', true)['w'] instanceof Object ? $scope($Γ['global']['LZW']['compress'], 'w', true)['w'].Σ = $scope($Γ['global']['LZW']['compress'], 'w', true)['w'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['LZW']['compress'], 'w', true)['w'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['LZW']['compress'], 'w', true)['w'] = $scope($Γ['global']['LZW']['compress'], 'w', true)['w'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['LZW']['compress'], 'w', true)['w'] : $Λ[$Λ.length - 1].l;
        } else {
            var $tmp28, $tmp29;
            $Γ['global']['LZW']['compress']['$tmp29'] = $Γ['global']['LZW']['compress']['$tmp28'] = 0;
            $tmp29 = dictionary[w];
            $Γ['global']['LZW']['compress']['$tmp29'] = sec_lvl('dictionary', w, false, $Γ['global']['LZW']['compress']);
            $Γ['global']['LZW']['compress']['$tmp29'] instanceof Object ? $Γ['global']['LZW']['compress']['$tmp29'].Σ = $Γ['global']['LZW']['compress']['$tmp29'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['compress']['$tmp29'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['LZW']['compress']['$tmp29'] = $Γ['global']['LZW']['compress']['$tmp29'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['compress']['$tmp29'] : $Λ[$Λ.length - 1].l;
            $tmp28 = result.push($tmp29);
            dictionary[wc] = dictSize++;
            $scope($Γ['global']['LZW']['compress'], 'dictionary', false)[wc] = sec_lvl('dictSize', null, false, $Γ['global']['LZW']['compress']);
            _$tmp = sec_lvl('wc', null, false, $Γ['global']['LZW']['compress']) instanceof Object ? sec_lvl('wc', null, false, $Γ['global']['LZW']['compress']).Σ : sec_lvl('wc', null, false, $Γ['global']['LZW']['compress']);
            $scope($Γ['global']['LZW']['compress'], 'dictionary', false)[wc] instanceof Object ? $scope($Γ['global']['LZW']['compress'], 'dictionary', false)[wc].Σ = $scope($Γ['global']['LZW']['compress'], 'dictionary', false)[wc].Σ : $scope($Γ['global']['LZW']['compress'], 'dictionary', false)[wc] = $scope($Γ['global']['LZW']['compress'], 'dictionary', false)[wc];
            w = String(c);
        }
        $Λ.pop();
        i += 1;
        $scope($Γ['global']['LZW']['compress'], 'i', true)['i'] = $Λ[$Λ.length - 1].l;
        $tmp21 = i;
        $Γ['global']['LZW']['compress']['$tmp21'] = sec_lvl('i', null, false, $Γ['global']['LZW']['compress']);
        $Γ['global']['LZW']['compress']['$tmp21'] instanceof Object ? $Γ['global']['LZW']['compress']['$tmp21'].Σ = $Γ['global']['LZW']['compress']['$tmp21'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['compress']['$tmp21'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['LZW']['compress']['$tmp21'] = $Γ['global']['LZW']['compress']['$tmp21'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['compress']['$tmp21'] : $Λ[$Λ.length - 1].l;
        $tmp27 = uncompressed.length;
        $Γ['global']['LZW']['compress']['$tmp27'] = sec_lvl('uncompressed', 'length', false, $Γ['global']['LZW']['compress']);
        $Γ['global']['LZW']['compress']['$tmp27'] instanceof Object ? $Γ['global']['LZW']['compress']['$tmp27'].Σ = $Γ['global']['LZW']['compress']['$tmp27'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['compress']['$tmp27'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['LZW']['compress']['$tmp27'] = $Γ['global']['LZW']['compress']['$tmp27'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['compress']['$tmp27'] : $Λ[$Λ.length - 1].l;
        $tmp22 = i < $tmp27;
        $Γ['global']['LZW']['compress']['$tmp22'] = sec_lvl('i', null, true, $Γ['global']['LZW']['compress']) >= sec_lvl('$tmp27', null, true, $Γ['global']['LZW']['compress']) ? sec_lvl('i', null, true, $Γ['global']['LZW']['compress']) : sec_lvl('$tmp27', null, true, $Γ['global']['LZW']['compress']);
        $Γ['global']['LZW']['compress']['$tmp22'] instanceof Object ? $Γ['global']['LZW']['compress']['$tmp22'].Σ = $Γ['global']['LZW']['compress']['$tmp22'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['compress']['$tmp22'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['LZW']['compress']['$tmp22'] = $Γ['global']['LZW']['compress']['$tmp22'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['compress']['$tmp22'] : $Λ[$Λ.length - 1].l;
    }
    $upgrade([
        'c',
        '$tmp26',
        '$tmp28',
        'w'
    ], $Λ[$Λ.length - 1].l, $Γ['global']['LZW']['compress']);
    $Λ.pop();
    $tmp24 = w !== '';
    $Γ['global']['LZW']['compress']['$tmp24'] = sec_lvl('w', null, true, $Γ['global']['LZW']['compress']) >= $Λ[$Λ.length - 1].l ? sec_lvl('w', null, true, $Γ['global']['LZW']['compress']) : $Λ[$Λ.length - 1].l;
    $Γ['global']['LZW']['compress']['$tmp24'] instanceof Object ? $Γ['global']['LZW']['compress']['$tmp24'].Σ = $Γ['global']['LZW']['compress']['$tmp24'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['compress']['$tmp24'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['LZW']['compress']['$tmp24'] = $Γ['global']['LZW']['compress']['$tmp24'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['compress']['$tmp24'] : $Λ[$Λ.length - 1].l;
    $Λ.push({
        l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp24', null, true, $Γ['global']['LZW']['compress']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp24', null, true, $Γ['global']['LZW']['compress']),
        id: 'IF'
    });
    if ($tmp24) {
        var $tmp30, $tmp31;
        $Γ['global']['LZW']['compress']['$tmp31'] = $Γ['global']['LZW']['compress']['$tmp30'] = 0;
        $tmp31 = dictionary[w];
        $Γ['global']['LZW']['compress']['$tmp31'] = sec_lvl('dictionary', w, false, $Γ['global']['LZW']['compress']);
        $Γ['global']['LZW']['compress']['$tmp31'] instanceof Object ? $Γ['global']['LZW']['compress']['$tmp31'].Σ = $Γ['global']['LZW']['compress']['$tmp31'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['compress']['$tmp31'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['LZW']['compress']['$tmp31'] = $Γ['global']['LZW']['compress']['$tmp31'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['LZW']['compress']['$tmp31'] : $Λ[$Λ.length - 1].l;
        $tmp30 = result.push($tmp31);
    } else {
        $upgrade(['$tmp30'], $Λ[$Λ.length - 1].l, $Γ['global']['LZW']['compress']);
    }
    $Λ.pop();
    return result;
};
$Γ['global']['LZW']['compress'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    uncompressed: $Λ[$Λ.length - 1].l
};
$rf = $prop('LZW', 'compress', $Γ['global']);
$rf.scope = $scope($Γ['global'], 'LZW', false)['LZW'];
$rf.$this = $scope($Γ['global'], 'LZW', false)['LZW'];
$rf['uncompressed'] = $Λ[$Λ.length - 1].l;
$Λ.push({
    l: $rf.$fscope,
    id: 'FUNC'
});
comp = LZW.compress('The quick brown fox jumps over the lazy dogThe quick brown fox jumps over the lazy dogThe quick brown fox jumps over the lazy dogThe quick brown fox jumps over the lazy dog');
$Γ['global']['comp'] = $Λ.pop().l;
$Γ['global']['comp'] instanceof Object ? $Γ['global']['comp'].Σ = $Γ['global']['comp'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['comp'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['comp'] = $Γ['global']['comp'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['comp'] : $Λ[$Λ.length - 1].l;
$rf = $prop('LZW', 'decompress', $Γ['global']);
$rf.scope = $scope($Γ['global'], 'LZW', false)['LZW'];
$rf.$this = $scope($Γ['global'], 'LZW', false)['LZW'];
$rf['compressed'] = sec_lvl('comp', null, true, $Γ['global']) >= $Λ[$Λ.length - 1].l ? sec_lvl('comp', null, true, $Γ['global']) : $Λ[$Λ.length - 1].l;
$Λ.push({
    l: $rf.$fscope,
    id: 'FUNC'
});
decomp = LZW.decompress(comp);
$Γ['global']['decomp'] = $Λ.pop().l;
$Γ['global']['decomp'] instanceof Object ? $Γ['global']['decomp'].Σ = $Γ['global']['decomp'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['decomp'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['decomp'] = $Γ['global']['decomp'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['decomp'] : $Λ[$Λ.length - 1].l;
$tmp0 = console.log(comp);
$tmp1 = console.log(decomp);