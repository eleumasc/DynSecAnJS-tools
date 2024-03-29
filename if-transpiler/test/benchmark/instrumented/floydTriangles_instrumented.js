
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

$Γ['global']['rightAligned'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    n: $Λ[$Λ.length - 1].l,
    width: $Λ[$Λ.length - 1].l
};
$Γ['global']['range'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    m: $Λ[$Λ.length - 1].l,
    n: $Λ[$Λ.length - 1].l
};
$Γ['global']['colsSpacedRight'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    lstLines: $Λ[$Λ.length - 1].l,
    nColWidth: $Λ[$Λ.length - 1].l
};
$Γ['global']['floydIntegerLists'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    nRows: $Λ[$Λ.length - 1].l
};
$Γ['global']['main'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
function main() {
    var nMargin, $tmp2, $λ0, $tmp3;
    $Γ['global']['main']['$tmp3'] = $Γ['global']['main']['$\u03BB0'] = $Γ['global']['main']['$tmp2'] = $Γ['global']['main']['nMargin'] = 0;
    nMargin = 1;
    $scope($Γ['global']['main'], 'nMargin', true)['nMargin'] = $Λ[$Λ.length - 1].l;
    $λ0 = function (lstN) {
        var $tmp4, $tmp5;
        $Γ['global']['main']['$\u03BB0']['$tmp5'] = $Γ['global']['main']['$\u03BB0']['$tmp4'] = 0;
        $tmp5 = function (nFloydRows) {
            var lstRows, iLast, $tmp6, $tmp7, $tmp8, $tmp9;
            $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp9'] = $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp8'] = $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp7'] = $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp6'] = $Γ['global']['main']['$\u03BB0']['$tmp5']['iLast'] = $Γ['global']['main']['$\u03BB0']['$tmp5']['lstRows'] = 0;
            $rf = $scope($Γ['global']['main']['$\u03BB0']['$tmp5'], 'floydIntegerLists', false)['floydIntegerLists'];
            $rf.scope = $Γ['global']['main']['$\u03BB0']['$tmp5'];
            $rf.$this = $Γ['global'];
            $rf['nRows'] = sec_lvl('nFloydRows', null, true, $Γ['global']['main']['$\u03BB0']['$tmp5']) >= $Λ[$Λ.length - 1].l ? sec_lvl('nFloydRows', null, true, $Γ['global']['main']['$\u03BB0']['$tmp5']) : $Λ[$Λ.length - 1].l;
            $Λ.push({
                l: $rf.$fscope,
                id: 'FUNC'
            });
            lstRows = floydIntegerLists(nFloydRows);
            $scope($Γ['global']['main']['$\u03BB0']['$tmp5'], 'lstRows', true)['lstRows'] = $Λ.pop().l;
            $scope($Γ['global']['main']['$\u03BB0']['$tmp5'], 'lstRows', true)['lstRows'] instanceof Object ? $scope($Γ['global']['main']['$\u03BB0']['$tmp5'], 'lstRows', true)['lstRows'].Σ = $scope($Γ['global']['main']['$\u03BB0']['$tmp5'], 'lstRows', true)['lstRows'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['main']['$\u03BB0']['$tmp5'], 'lstRows', true)['lstRows'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['main']['$\u03BB0']['$tmp5'], 'lstRows', true)['lstRows'] = $scope($Γ['global']['main']['$\u03BB0']['$tmp5'], 'lstRows', true)['lstRows'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['main']['$\u03BB0']['$tmp5'], 'lstRows', true)['lstRows'] : $Λ[$Λ.length - 1].l;
            iLast = nFloydRows - 1;
            $scope($Γ['global']['main']['$\u03BB0']['$tmp5'], 'iLast', true)['iLast'] = sec_lvl('nFloydRows', null, true, $Γ['global']['main']['$\u03BB0']['$tmp5']) >= $Λ[$Λ.length - 1].l ? sec_lvl('nFloydRows', null, true, $Γ['global']['main']['$\u03BB0']['$tmp5']) : $Λ[$Λ.length - 1].l;
            $scope($Γ['global']['main']['$\u03BB0']['$tmp5'], 'iLast', true)['iLast'] instanceof Object ? $scope($Γ['global']['main']['$\u03BB0']['$tmp5'], 'iLast', true)['iLast'].Σ = $scope($Γ['global']['main']['$\u03BB0']['$tmp5'], 'iLast', true)['iLast'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['main']['$\u03BB0']['$tmp5'], 'iLast', true)['iLast'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['main']['$\u03BB0']['$tmp5'], 'iLast', true)['iLast'] = $scope($Γ['global']['main']['$\u03BB0']['$tmp5'], 'iLast', true)['iLast'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['main']['$\u03BB0']['$tmp5'], 'iLast', true)['iLast'] : $Λ[$Λ.length - 1].l;
            $tmp9 = lstRows[iLast];
            $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp9'] = sec_lvl('lstRows', iLast, false, $Γ['global']['main']['$\u03BB0']['$tmp5']);
            $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp9'] instanceof Object ? $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp9'].Σ = $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp9'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp9'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp9'] = $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp9'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp9'] : $Λ[$Λ.length - 1].l;
            $tmp = $tmp9[iLast];
            $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp'] = sec_lvl('$tmp9', iLast, false, $Γ['global']['main']['$\u03BB0']['$tmp5']);
            $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp'] instanceof Object ? $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp'].Σ = $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp'] = $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp'] : $Λ[$Λ.length - 1].l;
            $tmp = $tmp.toString();
            $tmp8 = $tmp.length;
            $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp8'] = sec_lvl('$tmp', 'length', false, $Γ['global']['main']['$\u03BB0']['$tmp5']);
            $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp8'] instanceof Object ? $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp8'].Σ = $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp8'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp8'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp8'] = $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp8'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp8'] : $Λ[$Λ.length - 1].l;
            $tmp7 = $tmp8 + nMargin;
            $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp7'] = sec_lvl('$tmp8', null, true, $Γ['global']['main']['$\u03BB0']['$tmp5']) >= sec_lvl('nMargin', null, true, $Γ['global']['main']['$\u03BB0']['$tmp5']) ? sec_lvl('$tmp8', null, true, $Γ['global']['main']['$\u03BB0']['$tmp5']) : sec_lvl('nMargin', null, true, $Γ['global']['main']['$\u03BB0']['$tmp5']);
            $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp7'] instanceof Object ? $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp7'].Σ = $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp7'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp7'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp7'] = $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp7'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp7'] : $Λ[$Λ.length - 1].l;
            $rf = $scope($Γ['global']['main']['$\u03BB0']['$tmp5'], 'colsSpacedRight', false)['colsSpacedRight'];
            $rf.scope = $Γ['global']['main']['$\u03BB0']['$tmp5'];
            $rf.$this = $Γ['global'];
            $rf['lstLines'] = sec_lvl('lstRows', null, true, $Γ['global']['main']['$\u03BB0']['$tmp5']) >= $Λ[$Λ.length - 1].l ? sec_lvl('lstRows', null, true, $Γ['global']['main']['$\u03BB0']['$tmp5']) : $Λ[$Λ.length - 1].l;
            $rf['nColWidth'] = sec_lvl('$tmp7', null, true, $Γ['global']['main']['$\u03BB0']['$tmp5']) >= $Λ[$Λ.length - 1].l ? sec_lvl('$tmp7', null, true, $Γ['global']['main']['$\u03BB0']['$tmp5']) : $Λ[$Λ.length - 1].l;
            $Λ.push({
                l: $rf.$fscope,
                id: 'FUNC'
            });
            $tmp6 = colsSpacedRight(lstRows, $tmp7);
            $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp6'] = $Λ.pop().l;
            $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp6'] instanceof Object ? $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp6'].Σ = $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp6'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp6'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp6'] = $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp6'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['main']['$\u03BB0']['$tmp5']['$tmp6'] : $Λ[$Λ.length - 1].l;
            return $tmp6;
        };
        $Γ['global']['main']['$\u03BB0']['$tmp5'] = {
            $fscope: $Λ[$Λ.length - 1].l,
            prototype: { Σ: $Λ[$Λ.length - 1].l },
            Σ: $Λ[$Λ.length - 1].l,
            scope: $Γ['global']['main']['$\u03BB0'],
            nFloydRows: $Λ[$Λ.length - 1].l
        };
        $tmp = lstN.map($tmp5);
        $tmp4 = $tmp.join('\n\n');
        return $tmp4;
    };
    $Γ['global']['main']['$\u03BB0'] = {
        $fscope: $Λ[$Λ.length - 1].l,
        prototype: { Σ: $Λ[$Λ.length - 1].l },
        Σ: $Λ[$Λ.length - 1].l,
        scope: $Γ['global']['main'],
        lstN: $Λ[$Λ.length - 1].l
    };
    $tmp3 = [
        5,
        14,
        21
    ];
    $Γ['global']['main']['$tmp3'] = {
        __proto__: {},
        scope: $Γ['global']['main'],
        0: $Λ[$Λ.length - 1].l,
        1: $Λ[$Λ.length - 1].l,
        2: $Λ[$Λ.length - 1].l,
        Σ: $Λ[$Λ.length - 1].l
    };
    $tmp2 = $λ0($tmp3);
    return $tmp2;
}
function floydIntegerLists(nRows) {
    var $tmp10, triangleNumbers, $tmp11, $tmp12, $tmp13, $tmp14, $tmp15, $tmp16, $tmp17;
    $Γ['global']['floydIntegerLists']['$tmp17'] = $Γ['global']['floydIntegerLists']['$tmp16'] = $Γ['global']['floydIntegerLists']['$tmp15'] = $Γ['global']['floydIntegerLists']['$tmp14'] = $Γ['global']['floydIntegerLists']['$tmp13'] = $Γ['global']['floydIntegerLists']['$tmp12'] = $Γ['global']['floydIntegerLists']['$tmp11'] = $Γ['global']['floydIntegerLists']['triangleNumbers'] = $Γ['global']['floydIntegerLists']['$tmp10'] = 0;
    triangleNumbers = function (lstInt, startWidth) {
        var n, $tmp18, $tmp37, $tmp38;
        $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp38'] = $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp37'] = $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp18'] = $Γ['global']['floydIntegerLists']['triangleNumbers']['n'] = 0;
        n = startWidth || 1;
        $scope($Γ['global']['floydIntegerLists']['triangleNumbers'], 'n', true)['n'] = sec_lvl('startWidth', null, true, $Γ['global']['floydIntegerLists']['triangleNumbers']) >= $Λ[$Λ.length - 1].l ? sec_lvl('startWidth', null, true, $Γ['global']['floydIntegerLists']['triangleNumbers']) : $Λ[$Λ.length - 1].l;
        $scope($Γ['global']['floydIntegerLists']['triangleNumbers'], 'n', true)['n'] instanceof Object ? $scope($Γ['global']['floydIntegerLists']['triangleNumbers'], 'n', true)['n'].Σ = $scope($Γ['global']['floydIntegerLists']['triangleNumbers'], 'n', true)['n'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['floydIntegerLists']['triangleNumbers'], 'n', true)['n'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['floydIntegerLists']['triangleNumbers'], 'n', true)['n'] = $scope($Γ['global']['floydIntegerLists']['triangleNumbers'], 'n', true)['n'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['floydIntegerLists']['triangleNumbers'], 'n', true)['n'] : $Λ[$Λ.length - 1].l;
        $tmp38 = lstInt.length;
        $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp38'] = sec_lvl('lstInt', 'length', false, $Γ['global']['floydIntegerLists']['triangleNumbers']);
        $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp38'] instanceof Object ? $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp38'].Σ = $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp38'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp38'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp38'] = $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp38'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp38'] : $Λ[$Λ.length - 1].l;
        $tmp37 = n > $tmp38;
        $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp37'] = sec_lvl('n', null, true, $Γ['global']['floydIntegerLists']['triangleNumbers']) >= sec_lvl('$tmp38', null, true, $Γ['global']['floydIntegerLists']['triangleNumbers']) ? sec_lvl('n', null, true, $Γ['global']['floydIntegerLists']['triangleNumbers']) : sec_lvl('$tmp38', null, true, $Γ['global']['floydIntegerLists']['triangleNumbers']);
        $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp37'] instanceof Object ? $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp37'].Σ = $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp37'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp37'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp37'] = $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp37'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp37'] : $Λ[$Λ.length - 1].l;
        $Λ.push({
            l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp37', null, true, $Γ['global']['floydIntegerLists']['triangleNumbers']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp37', null, true, $Γ['global']['floydIntegerLists']['triangleNumbers']),
            id: 'IF'
        });
        if ($tmp37) {
            $upgrade([
                '$tmp39',
                '$tmp',
                '$tmp41',
                '$tmp40',
                '$tmp18'
            ], $Λ[$Λ.length - 1].l, $Γ['global']['floydIntegerLists']['triangleNumbers']);
            $tmp18 = [];
            $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp18'] = {
                __proto__: {},
                scope: $Γ['global']['floydIntegerLists']['triangleNumbers'],
                Σ: $Λ[$Λ.length - 1].l
            };
        } else {
            $upgrade(['$tmp18'], $Λ[$Λ.length - 1].l, $Γ['global']['floydIntegerLists']['triangleNumbers']);
            var $tmp, $tmp39, $tmp40, $tmp41, $tmp42;
            $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp42'] = $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp41'] = $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp40'] = $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp39'] = $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp'] = 0;
            $tmp39 = lstInt.slice(0, n);
            $tmp = [$tmp39];
            $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp'] = {
                __proto__: {},
                scope: $Γ['global']['floydIntegerLists']['triangleNumbers'],
                0: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp39', null, false, $Γ['global']['floydIntegerLists']['triangleNumbers']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp39', null, false, $Γ['global']['floydIntegerLists']['triangleNumbers']),
                Σ: sec_lvl('$tmp39', null, false, $Γ['global']['floydIntegerLists']['triangleNumbers']) >= $Λ[$Λ.length - 1].l ? sec_lvl('$tmp39', null, false, $Γ['global']['floydIntegerLists']['triangleNumbers']) : $Λ[$Λ.length - 1].l
            };
            $tmp41 = lstInt.slice(n);
            $tmp42 = n + 1;
            $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp42'] = sec_lvl('n', null, true, $Γ['global']['floydIntegerLists']['triangleNumbers']) >= $Λ[$Λ.length - 1].l ? sec_lvl('n', null, true, $Γ['global']['floydIntegerLists']['triangleNumbers']) : $Λ[$Λ.length - 1].l;
            $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp42'] instanceof Object ? $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp42'].Σ = $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp42'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp42'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp42'] = $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp42'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp42'] : $Λ[$Λ.length - 1].l;
            $rf = $scope($Γ['global']['floydIntegerLists'], 'triangleNumbers', false)['triangleNumbers'];
            $rf.scope = $Γ['global']['floydIntegerLists'];
            $rf.$this = $Γ['global'];
            $rf['lstInt'] = sec_lvl('$tmp41', null, true, $Γ['global']['floydIntegerLists']['triangleNumbers']) >= $Λ[$Λ.length - 1].l ? sec_lvl('$tmp41', null, true, $Γ['global']['floydIntegerLists']['triangleNumbers']) : $Λ[$Λ.length - 1].l;
            $rf['startWidth'] = sec_lvl('$tmp42', null, true, $Γ['global']['floydIntegerLists']['triangleNumbers']) >= $Λ[$Λ.length - 1].l ? sec_lvl('$tmp42', null, true, $Γ['global']['floydIntegerLists']['triangleNumbers']) : $Λ[$Λ.length - 1].l;
            $Λ.push({
                l: $rf.$fscope,
                id: 'FUNC'
            });
            $tmp40 = triangleNumbers($tmp41, $tmp42);
            $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp40'] = $Λ.pop().l;
            $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp40'] instanceof Object ? $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp40'].Σ = $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp40'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp40'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp40'] = $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp40'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['floydIntegerLists']['triangleNumbers']['$tmp40'] : $Λ[$Λ.length - 1].l;
            $tmp18 = $tmp.concat($tmp40);
        }
        $Λ.pop();
        return $tmp18;
    };
    $Γ['global']['floydIntegerLists']['triangleNumbers'] = {
        $fscope: $Λ[$Λ.length - 1].l,
        prototype: { Σ: $Λ[$Λ.length - 1].l },
        Σ: $Λ[$Λ.length - 1].l,
        scope: $Γ['global']['floydIntegerLists'],
        lstInt: $Λ[$Λ.length - 1].l,
        startWidth: $Λ[$Λ.length - 1].l
    };
    $tmp15 = nRows * nRows;
    $Γ['global']['floydIntegerLists']['$tmp15'] = sec_lvl('nRows', null, true, $Γ['global']['floydIntegerLists']);
    $Γ['global']['floydIntegerLists']['$tmp15'] instanceof Object ? $Γ['global']['floydIntegerLists']['$tmp15'].Σ = $Γ['global']['floydIntegerLists']['$tmp15'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['floydIntegerLists']['$tmp15'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['floydIntegerLists']['$tmp15'] = $Γ['global']['floydIntegerLists']['$tmp15'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['floydIntegerLists']['$tmp15'] : $Λ[$Λ.length - 1].l;
    $tmp14 = $tmp15 / 2;
    $Γ['global']['floydIntegerLists']['$tmp14'] = sec_lvl('$tmp15', null, true, $Γ['global']['floydIntegerLists']) >= $Λ[$Λ.length - 1].l ? sec_lvl('$tmp15', null, true, $Γ['global']['floydIntegerLists']) : $Λ[$Λ.length - 1].l;
    $Γ['global']['floydIntegerLists']['$tmp14'] instanceof Object ? $Γ['global']['floydIntegerLists']['$tmp14'].Σ = $Γ['global']['floydIntegerLists']['$tmp14'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['floydIntegerLists']['$tmp14'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['floydIntegerLists']['$tmp14'] = $Γ['global']['floydIntegerLists']['$tmp14'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['floydIntegerLists']['$tmp14'] : $Λ[$Λ.length - 1].l;
    $tmp13 = Math.floor($tmp14);
    $tmp17 = nRows / 2;
    $Γ['global']['floydIntegerLists']['$tmp17'] = sec_lvl('nRows', null, true, $Γ['global']['floydIntegerLists']) >= $Λ[$Λ.length - 1].l ? sec_lvl('nRows', null, true, $Γ['global']['floydIntegerLists']) : $Λ[$Λ.length - 1].l;
    $Γ['global']['floydIntegerLists']['$tmp17'] instanceof Object ? $Γ['global']['floydIntegerLists']['$tmp17'].Σ = $Γ['global']['floydIntegerLists']['$tmp17'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['floydIntegerLists']['$tmp17'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['floydIntegerLists']['$tmp17'] = $Γ['global']['floydIntegerLists']['$tmp17'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['floydIntegerLists']['$tmp17'] : $Λ[$Λ.length - 1].l;
    $tmp16 = Math.ceil($tmp17);
    $tmp12 = $tmp13 + $tmp16;
    $Γ['global']['floydIntegerLists']['$tmp12'] = sec_lvl('$tmp13', null, true, $Γ['global']['floydIntegerLists']) >= sec_lvl('$tmp16', null, true, $Γ['global']['floydIntegerLists']) ? sec_lvl('$tmp13', null, true, $Γ['global']['floydIntegerLists']) : sec_lvl('$tmp16', null, true, $Γ['global']['floydIntegerLists']);
    $Γ['global']['floydIntegerLists']['$tmp12'] instanceof Object ? $Γ['global']['floydIntegerLists']['$tmp12'].Σ = $Γ['global']['floydIntegerLists']['$tmp12'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['floydIntegerLists']['$tmp12'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['floydIntegerLists']['$tmp12'] = $Γ['global']['floydIntegerLists']['$tmp12'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['floydIntegerLists']['$tmp12'] : $Λ[$Λ.length - 1].l;
    $rf = $scope($Γ['global']['floydIntegerLists'], 'range', false)['range'];
    $rf.scope = $Γ['global']['floydIntegerLists'];
    $rf.$this = $Γ['global'];
    $rf['m'] = $Λ[$Λ.length - 1].l;
    $rf['n'] = sec_lvl('$tmp12', null, true, $Γ['global']['floydIntegerLists']) >= $Λ[$Λ.length - 1].l ? sec_lvl('$tmp12', null, true, $Γ['global']['floydIntegerLists']) : $Λ[$Λ.length - 1].l;
    $Λ.push({
        l: $rf.$fscope,
        id: 'FUNC'
    });
    $tmp11 = range(1, $tmp12);
    $Γ['global']['floydIntegerLists']['$tmp11'] = $Λ.pop().l;
    $Γ['global']['floydIntegerLists']['$tmp11'] instanceof Object ? $Γ['global']['floydIntegerLists']['$tmp11'].Σ = $Γ['global']['floydIntegerLists']['$tmp11'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['floydIntegerLists']['$tmp11'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['floydIntegerLists']['$tmp11'] = $Γ['global']['floydIntegerLists']['$tmp11'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['floydIntegerLists']['$tmp11'] : $Λ[$Λ.length - 1].l;
    $tmp10 = triangleNumbers($tmp11);
    return $tmp10;
}
function colsSpacedRight(lstLines, nColWidth) {
    var $tmp19, $tmp20;
    $Γ['global']['colsSpacedRight']['$tmp20'] = $Γ['global']['colsSpacedRight']['$tmp19'] = 0;
    $tmp20 = function (s, line) {
        var $tmp21, $tmp22, $tmp23, $tmp24;
        $Γ['global']['colsSpacedRight']['$tmp20']['$tmp24'] = $Γ['global']['colsSpacedRight']['$tmp20']['$tmp23'] = $Γ['global']['colsSpacedRight']['$tmp20']['$tmp22'] = $Γ['global']['colsSpacedRight']['$tmp20']['$tmp21'] = 0;
        $tmp24 = function (n) {
            var $tmp25;
            $Γ['global']['colsSpacedRight']['$tmp20']['$tmp24']['$tmp25'] = 0;
            $rf = $scope($Γ['global']['colsSpacedRight']['$tmp20']['$tmp24'], 'rightAligned', false)['rightAligned'];
            $rf.scope = $Γ['global']['colsSpacedRight']['$tmp20']['$tmp24'];
            $rf.$this = $Γ['global'];
            $rf['n'] = sec_lvl('n', null, true, $Γ['global']['colsSpacedRight']['$tmp20']['$tmp24']) >= $Λ[$Λ.length - 1].l ? sec_lvl('n', null, true, $Γ['global']['colsSpacedRight']['$tmp20']['$tmp24']) : $Λ[$Λ.length - 1].l;
            $rf['width'] = sec_lvl('nColWidth', null, true, $Γ['global']['colsSpacedRight']['$tmp20']['$tmp24']) >= $Λ[$Λ.length - 1].l ? sec_lvl('nColWidth', null, true, $Γ['global']['colsSpacedRight']['$tmp20']['$tmp24']) : $Λ[$Λ.length - 1].l;
            $Λ.push({
                l: $rf.$fscope,
                id: 'FUNC'
            });
            $tmp25 = rightAligned(n, nColWidth);
            $Γ['global']['colsSpacedRight']['$tmp20']['$tmp24']['$tmp25'] = $Λ.pop().l;
            $Γ['global']['colsSpacedRight']['$tmp20']['$tmp24']['$tmp25'] instanceof Object ? $Γ['global']['colsSpacedRight']['$tmp20']['$tmp24']['$tmp25'].Σ = $Γ['global']['colsSpacedRight']['$tmp20']['$tmp24']['$tmp25'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['colsSpacedRight']['$tmp20']['$tmp24']['$tmp25'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['colsSpacedRight']['$tmp20']['$tmp24']['$tmp25'] = $Γ['global']['colsSpacedRight']['$tmp20']['$tmp24']['$tmp25'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['colsSpacedRight']['$tmp20']['$tmp24']['$tmp25'] : $Λ[$Λ.length - 1].l;
            return $tmp25;
        };
        $Γ['global']['colsSpacedRight']['$tmp20']['$tmp24'] = {
            $fscope: $Λ[$Λ.length - 1].l,
            prototype: { Σ: $Λ[$Λ.length - 1].l },
            Σ: $Λ[$Λ.length - 1].l,
            scope: $Γ['global']['colsSpacedRight']['$tmp20'],
            n: $Λ[$Λ.length - 1].l
        };
        $tmp = line.map($tmp24);
        $tmp23 = $tmp.join('');
        $tmp22 = s + $tmp23;
        $Γ['global']['colsSpacedRight']['$tmp20']['$tmp22'] = sec_lvl('s', null, true, $Γ['global']['colsSpacedRight']['$tmp20']) >= sec_lvl('$tmp23', null, true, $Γ['global']['colsSpacedRight']['$tmp20']) ? sec_lvl('s', null, true, $Γ['global']['colsSpacedRight']['$tmp20']) : sec_lvl('$tmp23', null, true, $Γ['global']['colsSpacedRight']['$tmp20']);
        $Γ['global']['colsSpacedRight']['$tmp20']['$tmp22'] instanceof Object ? $Γ['global']['colsSpacedRight']['$tmp20']['$tmp22'].Σ = $Γ['global']['colsSpacedRight']['$tmp20']['$tmp22'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['colsSpacedRight']['$tmp20']['$tmp22'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['colsSpacedRight']['$tmp20']['$tmp22'] = $Γ['global']['colsSpacedRight']['$tmp20']['$tmp22'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['colsSpacedRight']['$tmp20']['$tmp22'] : $Λ[$Λ.length - 1].l;
        $tmp21 = $tmp22 + '\n';
        $Γ['global']['colsSpacedRight']['$tmp20']['$tmp21'] = sec_lvl('$tmp22', null, true, $Γ['global']['colsSpacedRight']['$tmp20']) >= $Λ[$Λ.length - 1].l ? sec_lvl('$tmp22', null, true, $Γ['global']['colsSpacedRight']['$tmp20']) : $Λ[$Λ.length - 1].l;
        $Γ['global']['colsSpacedRight']['$tmp20']['$tmp21'] instanceof Object ? $Γ['global']['colsSpacedRight']['$tmp20']['$tmp21'].Σ = $Γ['global']['colsSpacedRight']['$tmp20']['$tmp21'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['colsSpacedRight']['$tmp20']['$tmp21'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['colsSpacedRight']['$tmp20']['$tmp21'] = $Γ['global']['colsSpacedRight']['$tmp20']['$tmp21'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['colsSpacedRight']['$tmp20']['$tmp21'] : $Λ[$Λ.length - 1].l;
        return $tmp21;
    };
    $Γ['global']['colsSpacedRight']['$tmp20'] = {
        $fscope: $Λ[$Λ.length - 1].l,
        prototype: { Σ: $Λ[$Λ.length - 1].l },
        Σ: $Λ[$Λ.length - 1].l,
        scope: $Γ['global']['colsSpacedRight'],
        s: $Λ[$Λ.length - 1].l,
        line: $Λ[$Λ.length - 1].l
    };
    $tmp19 = lstLines.reduce($tmp20, '');
    return $tmp19;
}
function range(m, n) {
    var $tmp26, $tmp27, $tmp28, $tmp29, $tmp30;
    $Γ['global']['range']['$tmp30'] = $Γ['global']['range']['$tmp29'] = $Γ['global']['range']['$tmp28'] = $Γ['global']['range']['$tmp27'] = $Γ['global']['range']['$tmp26'] = 0;
    $tmp29 = n - m;
    $Γ['global']['range']['$tmp29'] = sec_lvl('n', null, true, $Γ['global']['range']) >= sec_lvl('m', null, true, $Γ['global']['range']) ? sec_lvl('n', null, true, $Γ['global']['range']) : sec_lvl('m', null, true, $Γ['global']['range']);
    $Γ['global']['range']['$tmp29'] instanceof Object ? $Γ['global']['range']['$tmp29'].Σ = $Γ['global']['range']['$tmp29'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['range']['$tmp29'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['range']['$tmp29'] = $Γ['global']['range']['$tmp29'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['range']['$tmp29'] : $Λ[$Λ.length - 1].l;
    $tmp28 = $tmp29 + 1;
    $Γ['global']['range']['$tmp28'] = sec_lvl('$tmp29', null, true, $Γ['global']['range']) >= $Λ[$Λ.length - 1].l ? sec_lvl('$tmp29', null, true, $Γ['global']['range']) : $Λ[$Λ.length - 1].l;
    $Γ['global']['range']['$tmp28'] instanceof Object ? $Γ['global']['range']['$tmp28'].Σ = $Γ['global']['range']['$tmp28'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['range']['$tmp28'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['range']['$tmp28'] = $Γ['global']['range']['$tmp28'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['range']['$tmp28'] : $Λ[$Λ.length - 1].l;
    $tmp27 = Array($tmp28);
    $tmp = Array.apply(null, $tmp27);
    $tmp30 = function (x, i) {
        var $tmp31;
        $Γ['global']['range']['$tmp30']['$tmp31'] = 0;
        $tmp31 = m + i;
        $Γ['global']['range']['$tmp30']['$tmp31'] = sec_lvl('m', null, true, $Γ['global']['range']['$tmp30']) >= sec_lvl('i', null, true, $Γ['global']['range']['$tmp30']) ? sec_lvl('m', null, true, $Γ['global']['range']['$tmp30']) : sec_lvl('i', null, true, $Γ['global']['range']['$tmp30']);
        $Γ['global']['range']['$tmp30']['$tmp31'] instanceof Object ? $Γ['global']['range']['$tmp30']['$tmp31'].Σ = $Γ['global']['range']['$tmp30']['$tmp31'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['range']['$tmp30']['$tmp31'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['range']['$tmp30']['$tmp31'] = $Γ['global']['range']['$tmp30']['$tmp31'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['range']['$tmp30']['$tmp31'] : $Λ[$Λ.length - 1].l;
        return $tmp31;
    };
    $Γ['global']['range']['$tmp30'] = {
        $fscope: $Λ[$Λ.length - 1].l,
        prototype: { Σ: $Λ[$Λ.length - 1].l },
        Σ: $Λ[$Λ.length - 1].l,
        scope: $Γ['global']['range'],
        x: $Λ[$Λ.length - 1].l,
        i: $Λ[$Λ.length - 1].l
    };
    $tmp26 = $tmp.map($tmp30);
    return $tmp26;
}
function rightAligned(n, width) {
    var strN, $tmp32, $tmp33, $tmp34, $tmp35, $tmp36;
    $Γ['global']['rightAligned']['$tmp36'] = $Γ['global']['rightAligned']['$tmp35'] = $Γ['global']['rightAligned']['$tmp34'] = $Γ['global']['rightAligned']['$tmp33'] = $Γ['global']['rightAligned']['$tmp32'] = $Γ['global']['rightAligned']['strN'] = 0;
    strN = n.toString();
    $tmp36 = strN.length;
    $Γ['global']['rightAligned']['$tmp36'] = sec_lvl('strN', 'length', false, $Γ['global']['rightAligned']);
    $Γ['global']['rightAligned']['$tmp36'] instanceof Object ? $Γ['global']['rightAligned']['$tmp36'].Σ = $Γ['global']['rightAligned']['$tmp36'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['rightAligned']['$tmp36'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['rightAligned']['$tmp36'] = $Γ['global']['rightAligned']['$tmp36'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['rightAligned']['$tmp36'] : $Λ[$Λ.length - 1].l;
    $tmp35 = width - $tmp36;
    $Γ['global']['rightAligned']['$tmp35'] = sec_lvl('width', null, true, $Γ['global']['rightAligned']) >= sec_lvl('$tmp36', null, true, $Γ['global']['rightAligned']) ? sec_lvl('width', null, true, $Γ['global']['rightAligned']) : sec_lvl('$tmp36', null, true, $Γ['global']['rightAligned']);
    $Γ['global']['rightAligned']['$tmp35'] instanceof Object ? $Γ['global']['rightAligned']['$tmp35'].Σ = $Γ['global']['rightAligned']['$tmp35'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['rightAligned']['$tmp35'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['rightAligned']['$tmp35'] = $Γ['global']['rightAligned']['$tmp35'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['rightAligned']['$tmp35'] : $Λ[$Λ.length - 1].l;
    $tmp34 = $tmp35 + 1;
    $Γ['global']['rightAligned']['$tmp34'] = sec_lvl('$tmp35', null, true, $Γ['global']['rightAligned']) >= $Λ[$Λ.length - 1].l ? sec_lvl('$tmp35', null, true, $Γ['global']['rightAligned']) : $Λ[$Λ.length - 1].l;
    $Γ['global']['rightAligned']['$tmp34'] instanceof Object ? $Γ['global']['rightAligned']['$tmp34'].Σ = $Γ['global']['rightAligned']['$tmp34'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['rightAligned']['$tmp34'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['rightAligned']['$tmp34'] = $Γ['global']['rightAligned']['$tmp34'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['rightAligned']['$tmp34'] : $Λ[$Λ.length - 1].l;
    $tmp = Array($tmp34);
    $tmp33 = $tmp.join(' ');
    $tmp32 = $tmp33 + strN;
    $Γ['global']['rightAligned']['$tmp32'] = sec_lvl('$tmp33', null, true, $Γ['global']['rightAligned']) >= sec_lvl('strN', null, true, $Γ['global']['rightAligned']) ? sec_lvl('$tmp33', null, true, $Γ['global']['rightAligned']) : sec_lvl('strN', null, true, $Γ['global']['rightAligned']);
    $Γ['global']['rightAligned']['$tmp32'] instanceof Object ? $Γ['global']['rightAligned']['$tmp32'].Σ = $Γ['global']['rightAligned']['$tmp32'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['rightAligned']['$tmp32'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['rightAligned']['$tmp32'] = $Γ['global']['rightAligned']['$tmp32'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['rightAligned']['$tmp32'] : $Λ[$Λ.length - 1].l;
    return $tmp32;
}
var $tmp0, $tmp1;
$Γ['global']['$tmp1'] = $Γ['global']['$tmp0'] = 0;
$rf = $scope($Γ['global'], 'main', false)['main'];
$rf.scope = $Γ['global'];
$rf.$this = $Γ['global'];
$Λ.push({
    l: $rf.$fscope,
    id: 'FUNC'
});
$tmp1 = main();
$Γ['global']['$tmp1'] = $Λ.pop().l;
$Γ['global']['$tmp1'] instanceof Object ? $Γ['global']['$tmp1'].Σ = $Γ['global']['$tmp1'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp1'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp1'] = $Γ['global']['$tmp1'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp1'] : $Λ[$Λ.length - 1].l;
$tmp0 = console.log($tmp1);