
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

$Γ['global']['cfft'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    amplitudes: $Λ[$Λ.length - 1].l
};
$Γ['global']['icfft'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    amplitudes: $Λ[$Λ.length - 1].l
};
$Γ['global']['Complex'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    re: $Λ[$Λ.length - 1].l,
    im: $Λ[$Λ.length - 1].l
};
function Complex(re, im) {
    this.re = re;
    $Γ['global']['Complex']['$this']['re'] = sec_lvl('re', null, false, $Γ['global']['Complex']);
    $Γ['global']['Complex']['$this']['re'] instanceof Object ? $Γ['global']['Complex']['$this']['re'].Σ = $Γ['global']['Complex']['$this']['re'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['Complex']['$this']['re'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['Complex']['$this']['re'] = $Γ['global']['Complex']['$this']['re'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['Complex']['$this']['re'] : $Λ[$Λ.length - 1].l;
    this.im = im || 0;
    $Γ['global']['Complex']['$this']['im'] = sec_lvl('im', null, true, $Γ['global']['Complex']) >= $Λ[$Λ.length - 1].l ? sec_lvl('im', null, true, $Γ['global']['Complex']) : $Λ[$Λ.length - 1].l;
    $Γ['global']['Complex']['$this']['im'] instanceof Object ? $Γ['global']['Complex']['$this']['im'].Σ = $Γ['global']['Complex']['$this']['im'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['Complex']['$this']['im'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['Complex']['$this']['im'] = $Γ['global']['Complex']['$this']['im'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['Complex']['$this']['im'] : $Λ[$Λ.length - 1].l;
    return;
}
var $tmp0, $tmp1, $tmp2, $tmp3, $tmp4, $tmp5, $tmp6, $tmp7;
$Γ['global']['$tmp7'] = $Γ['global']['$tmp6'] = $Γ['global']['$tmp5'] = $Γ['global']['$tmp4'] = $Γ['global']['$tmp3'] = $Γ['global']['$tmp2'] = $Γ['global']['$tmp1'] = $Γ['global']['$tmp0'] = 0;
$tmp0 = Complex.prototype;
$Γ['global']['$tmp0'] = sec_lvl('Complex', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp0'] instanceof Object ? $Γ['global']['$tmp0'].Σ = $Γ['global']['$tmp0'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0'] = $Γ['global']['$tmp0'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0'] : $Λ[$Λ.length - 1].l;
$tmp0.add = function (other, dst) {
    var $tmp8, $tmp9, $tmp10, $tmp11;
    $Γ['global']['$tmp0']['add']['$tmp11'] = $Γ['global']['$tmp0']['add']['$tmp10'] = $Γ['global']['$tmp0']['add']['$tmp9'] = $Γ['global']['$tmp0']['add']['$tmp8'] = 0;
    $tmp8 = this.re;
    $Γ['global']['$tmp0']['add']['$tmp8'] = sec_lvl('$tmp0', 're', false, $Γ['global']['$tmp0']['add']);
    $Γ['global']['$tmp0']['add']['$tmp8'] instanceof Object ? $Γ['global']['$tmp0']['add']['$tmp8'].Σ = $Γ['global']['$tmp0']['add']['$tmp8'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['add']['$tmp8'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0']['add']['$tmp8'] = $Γ['global']['$tmp0']['add']['$tmp8'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['add']['$tmp8'] : $Λ[$Λ.length - 1].l;
    $tmp9 = other.re;
    $Γ['global']['$tmp0']['add']['$tmp9'] = sec_lvl('other', 're', false, $Γ['global']['$tmp0']['add']);
    $Γ['global']['$tmp0']['add']['$tmp9'] instanceof Object ? $Γ['global']['$tmp0']['add']['$tmp9'].Σ = $Γ['global']['$tmp0']['add']['$tmp9'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['add']['$tmp9'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0']['add']['$tmp9'] = $Γ['global']['$tmp0']['add']['$tmp9'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['add']['$tmp9'] : $Λ[$Λ.length - 1].l;
    dst.re = $tmp8 + $tmp9;
    $scope($Γ['global']['$tmp0']['add'], 'dst', false)['re'] = sec_lvl('$tmp8', null, true, $Γ['global']['$tmp0']['add']) >= sec_lvl('$tmp9', null, true, $Γ['global']['$tmp0']['add']) ? sec_lvl('$tmp8', null, true, $Γ['global']['$tmp0']['add']) : sec_lvl('$tmp9', null, true, $Γ['global']['$tmp0']['add']);
    $scope($Γ['global']['$tmp0']['add'], 'dst', false)['re'] instanceof Object ? $scope($Γ['global']['$tmp0']['add'], 'dst', false)['re'].Σ = $scope($Γ['global']['$tmp0']['add'], 'dst', false)['re'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['$tmp0']['add'], 'dst', false)['re'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['$tmp0']['add'], 'dst', false)['re'] = $scope($Γ['global']['$tmp0']['add'], 'dst', false)['re'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['$tmp0']['add'], 'dst', false)['re'] : $Λ[$Λ.length - 1].l;
    $tmp10 = this.im;
    $Γ['global']['$tmp0']['add']['$tmp10'] = sec_lvl('$tmp0', 'im', false, $Γ['global']['$tmp0']['add']);
    $Γ['global']['$tmp0']['add']['$tmp10'] instanceof Object ? $Γ['global']['$tmp0']['add']['$tmp10'].Σ = $Γ['global']['$tmp0']['add']['$tmp10'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['add']['$tmp10'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0']['add']['$tmp10'] = $Γ['global']['$tmp0']['add']['$tmp10'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['add']['$tmp10'] : $Λ[$Λ.length - 1].l;
    $tmp11 = other.im;
    $Γ['global']['$tmp0']['add']['$tmp11'] = sec_lvl('other', 'im', false, $Γ['global']['$tmp0']['add']);
    $Γ['global']['$tmp0']['add']['$tmp11'] instanceof Object ? $Γ['global']['$tmp0']['add']['$tmp11'].Σ = $Γ['global']['$tmp0']['add']['$tmp11'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['add']['$tmp11'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0']['add']['$tmp11'] = $Γ['global']['$tmp0']['add']['$tmp11'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['add']['$tmp11'] : $Λ[$Λ.length - 1].l;
    dst.im = $tmp10 + $tmp11;
    $scope($Γ['global']['$tmp0']['add'], 'dst', false)['im'] = sec_lvl('$tmp10', null, true, $Γ['global']['$tmp0']['add']) >= sec_lvl('$tmp11', null, true, $Γ['global']['$tmp0']['add']) ? sec_lvl('$tmp10', null, true, $Γ['global']['$tmp0']['add']) : sec_lvl('$tmp11', null, true, $Γ['global']['$tmp0']['add']);
    $scope($Γ['global']['$tmp0']['add'], 'dst', false)['im'] instanceof Object ? $scope($Γ['global']['$tmp0']['add'], 'dst', false)['im'].Σ = $scope($Γ['global']['$tmp0']['add'], 'dst', false)['im'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['$tmp0']['add'], 'dst', false)['im'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['$tmp0']['add'], 'dst', false)['im'] = $scope($Γ['global']['$tmp0']['add'], 'dst', false)['im'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['$tmp0']['add'], 'dst', false)['im'] : $Λ[$Λ.length - 1].l;
    return dst;
};
$Γ['global']['$tmp0']['add'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    other: $Λ[$Λ.length - 1].l,
    dst: $Λ[$Λ.length - 1].l
};
$tmp0 = Complex.prototype;
$Γ['global']['$tmp0'] = sec_lvl('Complex', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp0'] instanceof Object ? $Γ['global']['$tmp0'].Σ = $Γ['global']['$tmp0'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0'] = $Γ['global']['$tmp0'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0'] : $Λ[$Λ.length - 1].l;
$tmp0.sub = function (other, dst) {
    var $tmp12, $tmp13, $tmp14, $tmp15;
    $Γ['global']['$tmp0']['sub']['$tmp15'] = $Γ['global']['$tmp0']['sub']['$tmp14'] = $Γ['global']['$tmp0']['sub']['$tmp13'] = $Γ['global']['$tmp0']['sub']['$tmp12'] = 0;
    $tmp12 = this.re;
    $Γ['global']['$tmp0']['sub']['$tmp12'] = sec_lvl('$tmp0', 're', false, $Γ['global']['$tmp0']['sub']);
    $Γ['global']['$tmp0']['sub']['$tmp12'] instanceof Object ? $Γ['global']['$tmp0']['sub']['$tmp12'].Σ = $Γ['global']['$tmp0']['sub']['$tmp12'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['sub']['$tmp12'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0']['sub']['$tmp12'] = $Γ['global']['$tmp0']['sub']['$tmp12'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['sub']['$tmp12'] : $Λ[$Λ.length - 1].l;
    $tmp13 = other.re;
    $Γ['global']['$tmp0']['sub']['$tmp13'] = sec_lvl('other', 're', false, $Γ['global']['$tmp0']['sub']);
    $Γ['global']['$tmp0']['sub']['$tmp13'] instanceof Object ? $Γ['global']['$tmp0']['sub']['$tmp13'].Σ = $Γ['global']['$tmp0']['sub']['$tmp13'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['sub']['$tmp13'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0']['sub']['$tmp13'] = $Γ['global']['$tmp0']['sub']['$tmp13'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['sub']['$tmp13'] : $Λ[$Λ.length - 1].l;
    dst.re = $tmp12 - $tmp13;
    $scope($Γ['global']['$tmp0']['sub'], 'dst', false)['re'] = sec_lvl('$tmp12', null, true, $Γ['global']['$tmp0']['sub']) >= sec_lvl('$tmp13', null, true, $Γ['global']['$tmp0']['sub']) ? sec_lvl('$tmp12', null, true, $Γ['global']['$tmp0']['sub']) : sec_lvl('$tmp13', null, true, $Γ['global']['$tmp0']['sub']);
    $scope($Γ['global']['$tmp0']['sub'], 'dst', false)['re'] instanceof Object ? $scope($Γ['global']['$tmp0']['sub'], 'dst', false)['re'].Σ = $scope($Γ['global']['$tmp0']['sub'], 'dst', false)['re'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['$tmp0']['sub'], 'dst', false)['re'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['$tmp0']['sub'], 'dst', false)['re'] = $scope($Γ['global']['$tmp0']['sub'], 'dst', false)['re'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['$tmp0']['sub'], 'dst', false)['re'] : $Λ[$Λ.length - 1].l;
    $tmp14 = this.im;
    $Γ['global']['$tmp0']['sub']['$tmp14'] = sec_lvl('$tmp0', 'im', false, $Γ['global']['$tmp0']['sub']);
    $Γ['global']['$tmp0']['sub']['$tmp14'] instanceof Object ? $Γ['global']['$tmp0']['sub']['$tmp14'].Σ = $Γ['global']['$tmp0']['sub']['$tmp14'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['sub']['$tmp14'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0']['sub']['$tmp14'] = $Γ['global']['$tmp0']['sub']['$tmp14'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['sub']['$tmp14'] : $Λ[$Λ.length - 1].l;
    $tmp15 = other.im;
    $Γ['global']['$tmp0']['sub']['$tmp15'] = sec_lvl('other', 'im', false, $Γ['global']['$tmp0']['sub']);
    $Γ['global']['$tmp0']['sub']['$tmp15'] instanceof Object ? $Γ['global']['$tmp0']['sub']['$tmp15'].Σ = $Γ['global']['$tmp0']['sub']['$tmp15'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['sub']['$tmp15'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0']['sub']['$tmp15'] = $Γ['global']['$tmp0']['sub']['$tmp15'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['sub']['$tmp15'] : $Λ[$Λ.length - 1].l;
    dst.im = $tmp14 - $tmp15;
    $scope($Γ['global']['$tmp0']['sub'], 'dst', false)['im'] = sec_lvl('$tmp14', null, true, $Γ['global']['$tmp0']['sub']) >= sec_lvl('$tmp15', null, true, $Γ['global']['$tmp0']['sub']) ? sec_lvl('$tmp14', null, true, $Γ['global']['$tmp0']['sub']) : sec_lvl('$tmp15', null, true, $Γ['global']['$tmp0']['sub']);
    $scope($Γ['global']['$tmp0']['sub'], 'dst', false)['im'] instanceof Object ? $scope($Γ['global']['$tmp0']['sub'], 'dst', false)['im'].Σ = $scope($Γ['global']['$tmp0']['sub'], 'dst', false)['im'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['$tmp0']['sub'], 'dst', false)['im'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['$tmp0']['sub'], 'dst', false)['im'] = $scope($Γ['global']['$tmp0']['sub'], 'dst', false)['im'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['$tmp0']['sub'], 'dst', false)['im'] : $Λ[$Λ.length - 1].l;
    return dst;
};
$Γ['global']['$tmp0']['sub'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    other: $Λ[$Λ.length - 1].l,
    dst: $Λ[$Λ.length - 1].l
};
$tmp0 = Complex.prototype;
$Γ['global']['$tmp0'] = sec_lvl('Complex', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp0'] instanceof Object ? $Γ['global']['$tmp0'].Σ = $Γ['global']['$tmp0'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0'] = $Γ['global']['$tmp0'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0'] : $Λ[$Λ.length - 1].l;
$tmp0.mul = function (other, dst) {
    var r, $tmp16, $tmp17, $tmp18, $tmp19, $tmp20, $tmp21, $tmp22, $tmp23, $tmp24, $tmp25, $tmp26, $tmp27;
    $Γ['global']['$tmp0']['mul']['$tmp27'] = $Γ['global']['$tmp0']['mul']['$tmp26'] = $Γ['global']['$tmp0']['mul']['$tmp25'] = $Γ['global']['$tmp0']['mul']['$tmp24'] = $Γ['global']['$tmp0']['mul']['$tmp23'] = $Γ['global']['$tmp0']['mul']['$tmp22'] = $Γ['global']['$tmp0']['mul']['$tmp21'] = $Γ['global']['$tmp0']['mul']['$tmp20'] = $Γ['global']['$tmp0']['mul']['$tmp19'] = $Γ['global']['$tmp0']['mul']['$tmp18'] = $Γ['global']['$tmp0']['mul']['$tmp17'] = $Γ['global']['$tmp0']['mul']['$tmp16'] = $Γ['global']['$tmp0']['mul']['r'] = 0;
    $tmp17 = this.re;
    $Γ['global']['$tmp0']['mul']['$tmp17'] = sec_lvl('$tmp0', 're', false, $Γ['global']['$tmp0']['mul']);
    $Γ['global']['$tmp0']['mul']['$tmp17'] instanceof Object ? $Γ['global']['$tmp0']['mul']['$tmp17'].Σ = $Γ['global']['$tmp0']['mul']['$tmp17'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['mul']['$tmp17'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0']['mul']['$tmp17'] = $Γ['global']['$tmp0']['mul']['$tmp17'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['mul']['$tmp17'] : $Λ[$Λ.length - 1].l;
    $tmp18 = other.re;
    $Γ['global']['$tmp0']['mul']['$tmp18'] = sec_lvl('other', 're', false, $Γ['global']['$tmp0']['mul']);
    $Γ['global']['$tmp0']['mul']['$tmp18'] instanceof Object ? $Γ['global']['$tmp0']['mul']['$tmp18'].Σ = $Γ['global']['$tmp0']['mul']['$tmp18'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['mul']['$tmp18'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0']['mul']['$tmp18'] = $Γ['global']['$tmp0']['mul']['$tmp18'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['mul']['$tmp18'] : $Λ[$Λ.length - 1].l;
    $tmp16 = $tmp17 * $tmp18;
    $Γ['global']['$tmp0']['mul']['$tmp16'] = sec_lvl('$tmp17', null, true, $Γ['global']['$tmp0']['mul']) >= sec_lvl('$tmp18', null, true, $Γ['global']['$tmp0']['mul']) ? sec_lvl('$tmp17', null, true, $Γ['global']['$tmp0']['mul']) : sec_lvl('$tmp18', null, true, $Γ['global']['$tmp0']['mul']);
    $Γ['global']['$tmp0']['mul']['$tmp16'] instanceof Object ? $Γ['global']['$tmp0']['mul']['$tmp16'].Σ = $Γ['global']['$tmp0']['mul']['$tmp16'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['mul']['$tmp16'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0']['mul']['$tmp16'] = $Γ['global']['$tmp0']['mul']['$tmp16'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['mul']['$tmp16'] : $Λ[$Λ.length - 1].l;
    $tmp20 = this.im;
    $Γ['global']['$tmp0']['mul']['$tmp20'] = sec_lvl('$tmp0', 'im', false, $Γ['global']['$tmp0']['mul']);
    $Γ['global']['$tmp0']['mul']['$tmp20'] instanceof Object ? $Γ['global']['$tmp0']['mul']['$tmp20'].Σ = $Γ['global']['$tmp0']['mul']['$tmp20'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['mul']['$tmp20'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0']['mul']['$tmp20'] = $Γ['global']['$tmp0']['mul']['$tmp20'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['mul']['$tmp20'] : $Λ[$Λ.length - 1].l;
    $tmp21 = other.im;
    $Γ['global']['$tmp0']['mul']['$tmp21'] = sec_lvl('other', 'im', false, $Γ['global']['$tmp0']['mul']);
    $Γ['global']['$tmp0']['mul']['$tmp21'] instanceof Object ? $Γ['global']['$tmp0']['mul']['$tmp21'].Σ = $Γ['global']['$tmp0']['mul']['$tmp21'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['mul']['$tmp21'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0']['mul']['$tmp21'] = $Γ['global']['$tmp0']['mul']['$tmp21'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['mul']['$tmp21'] : $Λ[$Λ.length - 1].l;
    $tmp19 = $tmp20 * $tmp21;
    $Γ['global']['$tmp0']['mul']['$tmp19'] = sec_lvl('$tmp20', null, true, $Γ['global']['$tmp0']['mul']) >= sec_lvl('$tmp21', null, true, $Γ['global']['$tmp0']['mul']) ? sec_lvl('$tmp20', null, true, $Γ['global']['$tmp0']['mul']) : sec_lvl('$tmp21', null, true, $Γ['global']['$tmp0']['mul']);
    $Γ['global']['$tmp0']['mul']['$tmp19'] instanceof Object ? $Γ['global']['$tmp0']['mul']['$tmp19'].Σ = $Γ['global']['$tmp0']['mul']['$tmp19'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['mul']['$tmp19'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0']['mul']['$tmp19'] = $Γ['global']['$tmp0']['mul']['$tmp19'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['mul']['$tmp19'] : $Λ[$Λ.length - 1].l;
    r = $tmp16 - $tmp19;
    $scope($Γ['global']['$tmp0']['mul'], 'r', true)['r'] = sec_lvl('$tmp16', null, true, $Γ['global']['$tmp0']['mul']) >= sec_lvl('$tmp19', null, true, $Γ['global']['$tmp0']['mul']) ? sec_lvl('$tmp16', null, true, $Γ['global']['$tmp0']['mul']) : sec_lvl('$tmp19', null, true, $Γ['global']['$tmp0']['mul']);
    $scope($Γ['global']['$tmp0']['mul'], 'r', true)['r'] instanceof Object ? $scope($Γ['global']['$tmp0']['mul'], 'r', true)['r'].Σ = $scope($Γ['global']['$tmp0']['mul'], 'r', true)['r'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['$tmp0']['mul'], 'r', true)['r'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['$tmp0']['mul'], 'r', true)['r'] = $scope($Γ['global']['$tmp0']['mul'], 'r', true)['r'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['$tmp0']['mul'], 'r', true)['r'] : $Λ[$Λ.length - 1].l;
    $tmp23 = this.re;
    $Γ['global']['$tmp0']['mul']['$tmp23'] = sec_lvl('$tmp0', 're', false, $Γ['global']['$tmp0']['mul']);
    $Γ['global']['$tmp0']['mul']['$tmp23'] instanceof Object ? $Γ['global']['$tmp0']['mul']['$tmp23'].Σ = $Γ['global']['$tmp0']['mul']['$tmp23'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['mul']['$tmp23'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0']['mul']['$tmp23'] = $Γ['global']['$tmp0']['mul']['$tmp23'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['mul']['$tmp23'] : $Λ[$Λ.length - 1].l;
    $tmp24 = other.im;
    $Γ['global']['$tmp0']['mul']['$tmp24'] = sec_lvl('other', 'im', false, $Γ['global']['$tmp0']['mul']);
    $Γ['global']['$tmp0']['mul']['$tmp24'] instanceof Object ? $Γ['global']['$tmp0']['mul']['$tmp24'].Σ = $Γ['global']['$tmp0']['mul']['$tmp24'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['mul']['$tmp24'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0']['mul']['$tmp24'] = $Γ['global']['$tmp0']['mul']['$tmp24'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['mul']['$tmp24'] : $Λ[$Λ.length - 1].l;
    $tmp22 = $tmp23 * $tmp24;
    $Γ['global']['$tmp0']['mul']['$tmp22'] = sec_lvl('$tmp23', null, true, $Γ['global']['$tmp0']['mul']) >= sec_lvl('$tmp24', null, true, $Γ['global']['$tmp0']['mul']) ? sec_lvl('$tmp23', null, true, $Γ['global']['$tmp0']['mul']) : sec_lvl('$tmp24', null, true, $Γ['global']['$tmp0']['mul']);
    $Γ['global']['$tmp0']['mul']['$tmp22'] instanceof Object ? $Γ['global']['$tmp0']['mul']['$tmp22'].Σ = $Γ['global']['$tmp0']['mul']['$tmp22'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['mul']['$tmp22'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0']['mul']['$tmp22'] = $Γ['global']['$tmp0']['mul']['$tmp22'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['mul']['$tmp22'] : $Λ[$Λ.length - 1].l;
    $tmp26 = this.im;
    $Γ['global']['$tmp0']['mul']['$tmp26'] = sec_lvl('$tmp0', 'im', false, $Γ['global']['$tmp0']['mul']);
    $Γ['global']['$tmp0']['mul']['$tmp26'] instanceof Object ? $Γ['global']['$tmp0']['mul']['$tmp26'].Σ = $Γ['global']['$tmp0']['mul']['$tmp26'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['mul']['$tmp26'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0']['mul']['$tmp26'] = $Γ['global']['$tmp0']['mul']['$tmp26'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['mul']['$tmp26'] : $Λ[$Λ.length - 1].l;
    $tmp27 = other.re;
    $Γ['global']['$tmp0']['mul']['$tmp27'] = sec_lvl('other', 're', false, $Γ['global']['$tmp0']['mul']);
    $Γ['global']['$tmp0']['mul']['$tmp27'] instanceof Object ? $Γ['global']['$tmp0']['mul']['$tmp27'].Σ = $Γ['global']['$tmp0']['mul']['$tmp27'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['mul']['$tmp27'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0']['mul']['$tmp27'] = $Γ['global']['$tmp0']['mul']['$tmp27'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['mul']['$tmp27'] : $Λ[$Λ.length - 1].l;
    $tmp25 = $tmp26 * $tmp27;
    $Γ['global']['$tmp0']['mul']['$tmp25'] = sec_lvl('$tmp26', null, true, $Γ['global']['$tmp0']['mul']) >= sec_lvl('$tmp27', null, true, $Γ['global']['$tmp0']['mul']) ? sec_lvl('$tmp26', null, true, $Γ['global']['$tmp0']['mul']) : sec_lvl('$tmp27', null, true, $Γ['global']['$tmp0']['mul']);
    $Γ['global']['$tmp0']['mul']['$tmp25'] instanceof Object ? $Γ['global']['$tmp0']['mul']['$tmp25'].Σ = $Γ['global']['$tmp0']['mul']['$tmp25'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['mul']['$tmp25'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0']['mul']['$tmp25'] = $Γ['global']['$tmp0']['mul']['$tmp25'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['mul']['$tmp25'] : $Λ[$Λ.length - 1].l;
    dst.im = $tmp22 + $tmp25;
    $scope($Γ['global']['$tmp0']['mul'], 'dst', false)['im'] = sec_lvl('$tmp22', null, true, $Γ['global']['$tmp0']['mul']) >= sec_lvl('$tmp25', null, true, $Γ['global']['$tmp0']['mul']) ? sec_lvl('$tmp22', null, true, $Γ['global']['$tmp0']['mul']) : sec_lvl('$tmp25', null, true, $Γ['global']['$tmp0']['mul']);
    $scope($Γ['global']['$tmp0']['mul'], 'dst', false)['im'] instanceof Object ? $scope($Γ['global']['$tmp0']['mul'], 'dst', false)['im'].Σ = $scope($Γ['global']['$tmp0']['mul'], 'dst', false)['im'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['$tmp0']['mul'], 'dst', false)['im'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['$tmp0']['mul'], 'dst', false)['im'] = $scope($Γ['global']['$tmp0']['mul'], 'dst', false)['im'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['$tmp0']['mul'], 'dst', false)['im'] : $Λ[$Λ.length - 1].l;
    dst.re = r;
    $scope($Γ['global']['$tmp0']['mul'], 'dst', false)['re'] = sec_lvl('r', null, false, $Γ['global']['$tmp0']['mul']);
    $scope($Γ['global']['$tmp0']['mul'], 'dst', false)['re'] instanceof Object ? $scope($Γ['global']['$tmp0']['mul'], 'dst', false)['re'].Σ = $scope($Γ['global']['$tmp0']['mul'], 'dst', false)['re'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['$tmp0']['mul'], 'dst', false)['re'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['$tmp0']['mul'], 'dst', false)['re'] = $scope($Γ['global']['$tmp0']['mul'], 'dst', false)['re'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['$tmp0']['mul'], 'dst', false)['re'] : $Λ[$Λ.length - 1].l;
    return dst;
};
$Γ['global']['$tmp0']['mul'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    other: $Λ[$Λ.length - 1].l,
    dst: $Λ[$Λ.length - 1].l
};
$tmp0 = Complex.prototype;
$Γ['global']['$tmp0'] = sec_lvl('Complex', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp0'] instanceof Object ? $Γ['global']['$tmp0'].Σ = $Γ['global']['$tmp0'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0'] = $Γ['global']['$tmp0'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0'] : $Λ[$Λ.length - 1].l;
$tmp0.cexp = function (dst) {
    var er, $tmp28, $tmp29, $tmp30, $tmp31, $tmp32;
    $Γ['global']['$tmp0']['cexp']['$tmp32'] = $Γ['global']['$tmp0']['cexp']['$tmp31'] = $Γ['global']['$tmp0']['cexp']['$tmp30'] = $Γ['global']['$tmp0']['cexp']['$tmp29'] = $Γ['global']['$tmp0']['cexp']['$tmp28'] = $Γ['global']['$tmp0']['cexp']['er'] = 0;
    $tmp28 = this.re;
    $Γ['global']['$tmp0']['cexp']['$tmp28'] = sec_lvl('$tmp0', 're', false, $Γ['global']['$tmp0']['cexp']);
    $Γ['global']['$tmp0']['cexp']['$tmp28'] instanceof Object ? $Γ['global']['$tmp0']['cexp']['$tmp28'].Σ = $Γ['global']['$tmp0']['cexp']['$tmp28'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['cexp']['$tmp28'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0']['cexp']['$tmp28'] = $Γ['global']['$tmp0']['cexp']['$tmp28'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['cexp']['$tmp28'] : $Λ[$Λ.length - 1].l;
    er = Math.exp($tmp28);
    $tmp30 = this.im;
    $Γ['global']['$tmp0']['cexp']['$tmp30'] = sec_lvl('$tmp0', 'im', false, $Γ['global']['$tmp0']['cexp']);
    $Γ['global']['$tmp0']['cexp']['$tmp30'] instanceof Object ? $Γ['global']['$tmp0']['cexp']['$tmp30'].Σ = $Γ['global']['$tmp0']['cexp']['$tmp30'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['cexp']['$tmp30'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0']['cexp']['$tmp30'] = $Γ['global']['$tmp0']['cexp']['$tmp30'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['cexp']['$tmp30'] : $Λ[$Λ.length - 1].l;
    $tmp29 = Math.cos($tmp30);
    dst.re = er * $tmp29;
    $scope($Γ['global']['$tmp0']['cexp'], 'dst', false)['re'] = sec_lvl('er', null, true, $Γ['global']['$tmp0']['cexp']) >= sec_lvl('$tmp29', null, true, $Γ['global']['$tmp0']['cexp']) ? sec_lvl('er', null, true, $Γ['global']['$tmp0']['cexp']) : sec_lvl('$tmp29', null, true, $Γ['global']['$tmp0']['cexp']);
    $scope($Γ['global']['$tmp0']['cexp'], 'dst', false)['re'] instanceof Object ? $scope($Γ['global']['$tmp0']['cexp'], 'dst', false)['re'].Σ = $scope($Γ['global']['$tmp0']['cexp'], 'dst', false)['re'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['$tmp0']['cexp'], 'dst', false)['re'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['$tmp0']['cexp'], 'dst', false)['re'] = $scope($Γ['global']['$tmp0']['cexp'], 'dst', false)['re'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['$tmp0']['cexp'], 'dst', false)['re'] : $Λ[$Λ.length - 1].l;
    $tmp32 = this.im;
    $Γ['global']['$tmp0']['cexp']['$tmp32'] = sec_lvl('$tmp0', 'im', false, $Γ['global']['$tmp0']['cexp']);
    $Γ['global']['$tmp0']['cexp']['$tmp32'] instanceof Object ? $Γ['global']['$tmp0']['cexp']['$tmp32'].Σ = $Γ['global']['$tmp0']['cexp']['$tmp32'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['cexp']['$tmp32'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0']['cexp']['$tmp32'] = $Γ['global']['$tmp0']['cexp']['$tmp32'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['cexp']['$tmp32'] : $Λ[$Λ.length - 1].l;
    $tmp31 = Math.sin($tmp32);
    dst.im = er * $tmp31;
    $scope($Γ['global']['$tmp0']['cexp'], 'dst', false)['im'] = sec_lvl('er', null, true, $Γ['global']['$tmp0']['cexp']) >= sec_lvl('$tmp31', null, true, $Γ['global']['$tmp0']['cexp']) ? sec_lvl('er', null, true, $Γ['global']['$tmp0']['cexp']) : sec_lvl('$tmp31', null, true, $Γ['global']['$tmp0']['cexp']);
    $scope($Γ['global']['$tmp0']['cexp'], 'dst', false)['im'] instanceof Object ? $scope($Γ['global']['$tmp0']['cexp'], 'dst', false)['im'].Σ = $scope($Γ['global']['$tmp0']['cexp'], 'dst', false)['im'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['$tmp0']['cexp'], 'dst', false)['im'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['$tmp0']['cexp'], 'dst', false)['im'] = $scope($Γ['global']['$tmp0']['cexp'], 'dst', false)['im'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['$tmp0']['cexp'], 'dst', false)['im'] : $Λ[$Λ.length - 1].l;
    return dst;
};
$Γ['global']['$tmp0']['cexp'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    dst: $Λ[$Λ.length - 1].l
};
$tmp0 = Complex.prototype;
$Γ['global']['$tmp0'] = sec_lvl('Complex', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp0'] instanceof Object ? $Γ['global']['$tmp0'].Σ = $Γ['global']['$tmp0'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0'] = $Γ['global']['$tmp0'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0'] : $Λ[$Λ.length - 1].l;
$tmp0.log = function () {
    var $tmp33, $tmp34;
    $Γ['global']['$tmp0']['log']['$tmp34'] = $Γ['global']['$tmp0']['log']['$tmp33'] = 0;
    $tmp34 = this.re;
    $Γ['global']['$tmp0']['log']['$tmp34'] = sec_lvl('$tmp0', 're', false, $Γ['global']['$tmp0']['log']);
    $Γ['global']['$tmp0']['log']['$tmp34'] instanceof Object ? $Γ['global']['$tmp0']['log']['$tmp34'].Σ = $Γ['global']['$tmp0']['log']['$tmp34'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['log']['$tmp34'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0']['log']['$tmp34'] = $Γ['global']['$tmp0']['log']['$tmp34'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['log']['$tmp34'] : $Λ[$Λ.length - 1].l;
    $tmp33 = !$tmp34;
    $Γ['global']['$tmp0']['log']['$tmp33'] = sec_lvl('$tmp34', null, false, $Γ['global']['$tmp0']['log']);
    $Γ['global']['$tmp0']['log']['$tmp33'] instanceof Object ? $Γ['global']['$tmp0']['log']['$tmp33'].Σ = $Γ['global']['$tmp0']['log']['$tmp33'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['log']['$tmp33'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0']['log']['$tmp33'] = $Γ['global']['$tmp0']['log']['$tmp33'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['log']['$tmp33'] : $Λ[$Λ.length - 1].l;
    $Λ.push({
        l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp33', null, true, $Γ['global']['$tmp0']['log']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp33', null, true, $Γ['global']['$tmp0']['log']),
        id: 'IF'
    });
    if ($tmp33) {
        $upgrade([
            '$tmp44',
            '$tmp46',
            '$tmp41',
            '$tmp51',
            '$tmp52',
            '$tmp47'
        ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp0']['log']);
        var $tmp35, $tmp36, $tmp37, $tmp38;
        $Γ['global']['$tmp0']['log']['$tmp38'] = $Γ['global']['$tmp0']['log']['$tmp37'] = $Γ['global']['$tmp0']['log']['$tmp36'] = $Γ['global']['$tmp0']['log']['$tmp35'] = 0;
        $tmp38 = this.im;
        $Γ['global']['$tmp0']['log']['$tmp38'] = sec_lvl('$tmp0', 'im', false, $Γ['global']['$tmp0']['log']);
        $Γ['global']['$tmp0']['log']['$tmp38'] instanceof Object ? $Γ['global']['$tmp0']['log']['$tmp38'].Σ = $Γ['global']['$tmp0']['log']['$tmp38'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['log']['$tmp38'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0']['log']['$tmp38'] = $Γ['global']['$tmp0']['log']['$tmp38'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['log']['$tmp38'] : $Λ[$Λ.length - 1].l;
        $tmp37 = $tmp38.toString();
        $tmp36 = $tmp37 + 'j';
        $Γ['global']['$tmp0']['log']['$tmp36'] = sec_lvl('$tmp37', null, true, $Γ['global']['$tmp0']['log']) >= $Λ[$Λ.length - 1].l ? sec_lvl('$tmp37', null, true, $Γ['global']['$tmp0']['log']) : $Λ[$Λ.length - 1].l;
        $Γ['global']['$tmp0']['log']['$tmp36'] instanceof Object ? $Γ['global']['$tmp0']['log']['$tmp36'].Σ = $Γ['global']['$tmp0']['log']['$tmp36'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['log']['$tmp36'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0']['log']['$tmp36'] = $Γ['global']['$tmp0']['log']['$tmp36'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['log']['$tmp36'] : $Λ[$Λ.length - 1].l;
        $tmp35 = console.log($tmp36);
    } else {
        $upgrade([
            '$tmp37',
            '$tmp35'
        ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp0']['log']);
        var $tmp39, $tmp40;
        $Γ['global']['$tmp0']['log']['$tmp40'] = $Γ['global']['$tmp0']['log']['$tmp39'] = 0;
        $tmp40 = this.im;
        $Γ['global']['$tmp0']['log']['$tmp40'] = sec_lvl('$tmp0', 'im', false, $Γ['global']['$tmp0']['log']);
        $Γ['global']['$tmp0']['log']['$tmp40'] instanceof Object ? $Γ['global']['$tmp0']['log']['$tmp40'].Σ = $Γ['global']['$tmp0']['log']['$tmp40'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['log']['$tmp40'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0']['log']['$tmp40'] = $Γ['global']['$tmp0']['log']['$tmp40'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['log']['$tmp40'] : $Λ[$Λ.length - 1].l;
        $tmp39 = $tmp40 < 0;
        $Γ['global']['$tmp0']['log']['$tmp39'] = sec_lvl('$tmp40', null, true, $Γ['global']['$tmp0']['log']) >= $Λ[$Λ.length - 1].l ? sec_lvl('$tmp40', null, true, $Γ['global']['$tmp0']['log']) : $Λ[$Λ.length - 1].l;
        $Γ['global']['$tmp0']['log']['$tmp39'] instanceof Object ? $Γ['global']['$tmp0']['log']['$tmp39'].Σ = $Γ['global']['$tmp0']['log']['$tmp39'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['log']['$tmp39'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0']['log']['$tmp39'] = $Γ['global']['$tmp0']['log']['$tmp39'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['log']['$tmp39'] : $Λ[$Λ.length - 1].l;
        $Λ.push({
            l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp39', null, true, $Γ['global']['$tmp0']['log']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp39', null, true, $Γ['global']['$tmp0']['log']),
            id: 'IF'
        });
        if ($tmp39) {
            $upgrade([
                '$tmp51',
                '$tmp52',
                '$tmp47'
            ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp0']['log']);
            var $tmp41, $tmp42, $tmp43, $tmp44, $tmp45, $tmp46, $tmp38;
            $Γ['global']['$tmp0']['log']['$tmp38'] = $Γ['global']['$tmp0']['log']['$tmp46'] = $Γ['global']['$tmp0']['log']['$tmp45'] = $Γ['global']['$tmp0']['log']['$tmp44'] = $Γ['global']['$tmp0']['log']['$tmp43'] = $Γ['global']['$tmp0']['log']['$tmp42'] = $Γ['global']['$tmp0']['log']['$tmp41'] = 0;
            $tmp45 = this.re;
            $Γ['global']['$tmp0']['log']['$tmp45'] = sec_lvl('$tmp0', 're', false, $Γ['global']['$tmp0']['log']);
            $Γ['global']['$tmp0']['log']['$tmp45'] instanceof Object ? $Γ['global']['$tmp0']['log']['$tmp45'].Σ = $Γ['global']['$tmp0']['log']['$tmp45'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['log']['$tmp45'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0']['log']['$tmp45'] = $Γ['global']['$tmp0']['log']['$tmp45'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['log']['$tmp45'] : $Λ[$Λ.length - 1].l;
            $tmp44 = $tmp45.toString();
            $tmp38 = this.im;
            $Γ['global']['$tmp0']['log']['$tmp38'] = sec_lvl('$tmp0', 'im', false, $Γ['global']['$tmp0']['log']);
            $Γ['global']['$tmp0']['log']['$tmp38'] instanceof Object ? $Γ['global']['$tmp0']['log']['$tmp38'].Σ = $Γ['global']['$tmp0']['log']['$tmp38'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['log']['$tmp38'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0']['log']['$tmp38'] = $Γ['global']['$tmp0']['log']['$tmp38'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['log']['$tmp38'] : $Λ[$Λ.length - 1].l;
            $tmp46 = $tmp38.toString();
            $tmp43 = $tmp44 + $tmp46;
            $Γ['global']['$tmp0']['log']['$tmp43'] = sec_lvl('$tmp44', null, true, $Γ['global']['$tmp0']['log']) >= sec_lvl('$tmp46', null, true, $Γ['global']['$tmp0']['log']) ? sec_lvl('$tmp44', null, true, $Γ['global']['$tmp0']['log']) : sec_lvl('$tmp46', null, true, $Γ['global']['$tmp0']['log']);
            $Γ['global']['$tmp0']['log']['$tmp43'] instanceof Object ? $Γ['global']['$tmp0']['log']['$tmp43'].Σ = $Γ['global']['$tmp0']['log']['$tmp43'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['log']['$tmp43'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0']['log']['$tmp43'] = $Γ['global']['$tmp0']['log']['$tmp43'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['log']['$tmp43'] : $Λ[$Λ.length - 1].l;
            $tmp42 = $tmp43 + 'j';
            $Γ['global']['$tmp0']['log']['$tmp42'] = sec_lvl('$tmp43', null, true, $Γ['global']['$tmp0']['log']) >= $Λ[$Λ.length - 1].l ? sec_lvl('$tmp43', null, true, $Γ['global']['$tmp0']['log']) : $Λ[$Λ.length - 1].l;
            $Γ['global']['$tmp0']['log']['$tmp42'] instanceof Object ? $Γ['global']['$tmp0']['log']['$tmp42'].Σ = $Γ['global']['$tmp0']['log']['$tmp42'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['log']['$tmp42'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0']['log']['$tmp42'] = $Γ['global']['$tmp0']['log']['$tmp42'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['log']['$tmp42'] : $Λ[$Λ.length - 1].l;
            $tmp41 = console.log($tmp42);
        } else {
            $upgrade([
                '$tmp44',
                '$tmp46',
                '$tmp41'
            ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp0']['log']);
            var $tmp47, $tmp48, $tmp49, $tmp50, $tmp51, $tmp45, $tmp52, $tmp38;
            $Γ['global']['$tmp0']['log']['$tmp38'] = $Γ['global']['$tmp0']['log']['$tmp52'] = $Γ['global']['$tmp0']['log']['$tmp45'] = $Γ['global']['$tmp0']['log']['$tmp51'] = $Γ['global']['$tmp0']['log']['$tmp50'] = $Γ['global']['$tmp0']['log']['$tmp49'] = $Γ['global']['$tmp0']['log']['$tmp48'] = $Γ['global']['$tmp0']['log']['$tmp47'] = 0;
            $tmp45 = this.re;
            $Γ['global']['$tmp0']['log']['$tmp45'] = sec_lvl('$tmp0', 're', false, $Γ['global']['$tmp0']['log']);
            $Γ['global']['$tmp0']['log']['$tmp45'] instanceof Object ? $Γ['global']['$tmp0']['log']['$tmp45'].Σ = $Γ['global']['$tmp0']['log']['$tmp45'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['log']['$tmp45'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0']['log']['$tmp45'] = $Γ['global']['$tmp0']['log']['$tmp45'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['log']['$tmp45'] : $Λ[$Λ.length - 1].l;
            $tmp51 = $tmp45.toString();
            $tmp50 = $tmp51 + '+';
            $Γ['global']['$tmp0']['log']['$tmp50'] = sec_lvl('$tmp51', null, true, $Γ['global']['$tmp0']['log']) >= $Λ[$Λ.length - 1].l ? sec_lvl('$tmp51', null, true, $Γ['global']['$tmp0']['log']) : $Λ[$Λ.length - 1].l;
            $Γ['global']['$tmp0']['log']['$tmp50'] instanceof Object ? $Γ['global']['$tmp0']['log']['$tmp50'].Σ = $Γ['global']['$tmp0']['log']['$tmp50'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['log']['$tmp50'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0']['log']['$tmp50'] = $Γ['global']['$tmp0']['log']['$tmp50'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['log']['$tmp50'] : $Λ[$Λ.length - 1].l;
            $tmp38 = this.im;
            $Γ['global']['$tmp0']['log']['$tmp38'] = sec_lvl('$tmp0', 'im', false, $Γ['global']['$tmp0']['log']);
            $Γ['global']['$tmp0']['log']['$tmp38'] instanceof Object ? $Γ['global']['$tmp0']['log']['$tmp38'].Σ = $Γ['global']['$tmp0']['log']['$tmp38'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['log']['$tmp38'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0']['log']['$tmp38'] = $Γ['global']['$tmp0']['log']['$tmp38'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['log']['$tmp38'] : $Λ[$Λ.length - 1].l;
            $tmp52 = $tmp38.toString();
            $tmp49 = $tmp50 + $tmp52;
            $Γ['global']['$tmp0']['log']['$tmp49'] = sec_lvl('$tmp50', null, true, $Γ['global']['$tmp0']['log']) >= sec_lvl('$tmp52', null, true, $Γ['global']['$tmp0']['log']) ? sec_lvl('$tmp50', null, true, $Γ['global']['$tmp0']['log']) : sec_lvl('$tmp52', null, true, $Γ['global']['$tmp0']['log']);
            $Γ['global']['$tmp0']['log']['$tmp49'] instanceof Object ? $Γ['global']['$tmp0']['log']['$tmp49'].Σ = $Γ['global']['$tmp0']['log']['$tmp49'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['log']['$tmp49'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0']['log']['$tmp49'] = $Γ['global']['$tmp0']['log']['$tmp49'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['log']['$tmp49'] : $Λ[$Λ.length - 1].l;
            $tmp48 = $tmp49 + 'j';
            $Γ['global']['$tmp0']['log']['$tmp48'] = sec_lvl('$tmp49', null, true, $Γ['global']['$tmp0']['log']) >= $Λ[$Λ.length - 1].l ? sec_lvl('$tmp49', null, true, $Γ['global']['$tmp0']['log']) : $Λ[$Λ.length - 1].l;
            $Γ['global']['$tmp0']['log']['$tmp48'] instanceof Object ? $Γ['global']['$tmp0']['log']['$tmp48'].Σ = $Γ['global']['$tmp0']['log']['$tmp48'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['log']['$tmp48'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0']['log']['$tmp48'] = $Γ['global']['$tmp0']['log']['$tmp48'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0']['log']['$tmp48'] : $Λ[$Λ.length - 1].l;
            $tmp47 = console.log($tmp48);
        }
        $Λ.pop();
    }
    $Λ.pop();
    return;
};
$Γ['global']['$tmp0']['log'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
function icfft(amplitudes) {
    var N, iN, i, $tmp54, $tmp56;
    $Γ['global']['icfft']['$tmp56'] = $Γ['global']['icfft']['$tmp54'] = $Γ['global']['icfft']['i'] = $Γ['global']['icfft']['iN'] = $Γ['global']['icfft']['N'] = 0;
    N = amplitudes.length;
    $scope($Γ['global']['icfft'], 'N', true)['N'] = sec_lvl('amplitudes', 'length', false, $Γ['global']['icfft']);
    $scope($Γ['global']['icfft'], 'N', true)['N'] instanceof Object ? $scope($Γ['global']['icfft'], 'N', true)['N'].Σ = $scope($Γ['global']['icfft'], 'N', true)['N'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['icfft'], 'N', true)['N'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['icfft'], 'N', true)['N'] = $scope($Γ['global']['icfft'], 'N', true)['N'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['icfft'], 'N', true)['N'] : $Λ[$Λ.length - 1].l;
    iN = 1 / N;
    $scope($Γ['global']['icfft'], 'iN', true)['iN'] = $Λ[$Λ.length - 1].l >= sec_lvl('N', null, true, $Γ['global']['icfft']) ? $Λ[$Λ.length - 1].l : sec_lvl('N', null, true, $Γ['global']['icfft']);
    $scope($Γ['global']['icfft'], 'iN', true)['iN'] instanceof Object ? $scope($Γ['global']['icfft'], 'iN', true)['iN'].Σ = $scope($Γ['global']['icfft'], 'iN', true)['iN'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['icfft'], 'iN', true)['iN'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['icfft'], 'iN', true)['iN'] = $scope($Γ['global']['icfft'], 'iN', true)['iN'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['icfft'], 'iN', true)['iN'] : $Λ[$Λ.length - 1].l;
    i = 0;
    $scope($Γ['global']['icfft'], 'i', true)['i'] = $Λ[$Λ.length - 1].l;
    $tmp54 = i < N;
    $Γ['global']['icfft']['$tmp54'] = sec_lvl('i', null, true, $Γ['global']['icfft']) >= sec_lvl('N', null, true, $Γ['global']['icfft']) ? sec_lvl('i', null, true, $Γ['global']['icfft']) : sec_lvl('N', null, true, $Γ['global']['icfft']);
    $Γ['global']['icfft']['$tmp54'] instanceof Object ? $Γ['global']['icfft']['$tmp54'].Σ = $Γ['global']['icfft']['$tmp54'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp54'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['icfft']['$tmp54'] = $Γ['global']['icfft']['$tmp54'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp54'] : $Λ[$Λ.length - 1].l;
    $Λ.push({
        l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp54', null, true, $Γ['global']['icfft']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp54', null, true, $Γ['global']['icfft']),
        id: 'LOOP'
    });
    for (; $tmp54;) {
        var $tmp57, $tmp58, $tmp53, $tmp54;
        $Γ['global']['icfft']['$tmp54'] = $Γ['global']['icfft']['$tmp53'] = $Γ['global']['icfft']['$tmp58'] = $Γ['global']['icfft']['$tmp57'] = 0;
        $tmp58 = amplitudes[i];
        $Γ['global']['icfft']['$tmp58'] = sec_lvl('amplitudes', i, false, $Γ['global']['icfft']);
        $Γ['global']['icfft']['$tmp58'] instanceof Object ? $Γ['global']['icfft']['$tmp58'].Σ = $Γ['global']['icfft']['$tmp58'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp58'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['icfft']['$tmp58'] = $Γ['global']['icfft']['$tmp58'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp58'] : $Λ[$Λ.length - 1].l;
        $tmp57 = $tmp58 instanceof Complex;
        $Γ['global']['icfft']['$tmp57'] = sec_lvl('$tmp58', null, true, $Γ['global']['icfft']) >= sec_lvl('Complex', null, true, $Γ['global']['icfft']) ? sec_lvl('$tmp58', null, true, $Γ['global']['icfft']) : sec_lvl('Complex', null, true, $Γ['global']['icfft']);
        $Γ['global']['icfft']['$tmp57'] instanceof Object ? $Γ['global']['icfft']['$tmp57'].Σ = $Γ['global']['icfft']['$tmp57'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp57'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['icfft']['$tmp57'] = $Γ['global']['icfft']['$tmp57'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp57'] : $Λ[$Λ.length - 1].l;
        $Λ.push({
            l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp57', null, true, $Γ['global']['icfft']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp57', null, true, $Γ['global']['icfft']),
            id: 'IF'
        });
        if ($tmp57) {
            var $tmp59, $tmp60;
            $Γ['global']['icfft']['$tmp60'] = $Γ['global']['icfft']['$tmp59'] = 0;
            $tmp59 = amplitudes[i];
            $Γ['global']['icfft']['$tmp59'] = sec_lvl('amplitudes', i, false, $Γ['global']['icfft']);
            $Γ['global']['icfft']['$tmp59'] instanceof Object ? $Γ['global']['icfft']['$tmp59'].Σ = $Γ['global']['icfft']['$tmp59'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp59'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['icfft']['$tmp59'] = $Γ['global']['icfft']['$tmp59'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp59'] : $Λ[$Λ.length - 1].l;
            $tmp59 = amplitudes[i];
            $Γ['global']['icfft']['$tmp59'] = sec_lvl('amplitudes', i, false, $Γ['global']['icfft']);
            $Γ['global']['icfft']['$tmp59'] instanceof Object ? $Γ['global']['icfft']['$tmp59'].Σ = $Γ['global']['icfft']['$tmp59'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp59'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['icfft']['$tmp59'] = $Γ['global']['icfft']['$tmp59'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp59'] : $Λ[$Λ.length - 1].l;
            $tmp60 = $tmp59.im;
            $Γ['global']['icfft']['$tmp60'] = sec_lvl('$tmp59', 'im', false, $Γ['global']['icfft']);
            $Γ['global']['icfft']['$tmp60'] instanceof Object ? $Γ['global']['icfft']['$tmp60'].Σ = $Γ['global']['icfft']['$tmp60'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp60'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['icfft']['$tmp60'] = $Γ['global']['icfft']['$tmp60'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp60'] : $Λ[$Λ.length - 1].l;
            $tmp59.im = -$tmp60;
            $Γ['global']['icfft']['$tmp59']['im'] = sec_lvl('$tmp60', null, false, $Γ['global']['icfft']);
            $Γ['global']['icfft']['$tmp59']['im'] instanceof Object ? $Γ['global']['icfft']['$tmp59']['im'].Σ = $Γ['global']['icfft']['$tmp59']['im'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp59']['im'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['icfft']['$tmp59']['im'] = $Γ['global']['icfft']['$tmp59']['im'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp59']['im'] : $Λ[$Λ.length - 1].l;
        } else {
        }
        $Λ.pop();
        $tmp53 = ++i;
        $Γ['global']['icfft']['$tmp53'] = sec_lvl('i', null, false, $Γ['global']['icfft']);
        $Γ['global']['icfft']['$tmp53'] instanceof Object ? $Γ['global']['icfft']['$tmp53'].Σ = $Γ['global']['icfft']['$tmp53'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp53'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['icfft']['$tmp53'] = $Γ['global']['icfft']['$tmp53'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp53'] : $Λ[$Λ.length - 1].l;
        $tmp54 = i < N;
        $Γ['global']['icfft']['$tmp54'] = sec_lvl('i', null, true, $Γ['global']['icfft']) >= sec_lvl('N', null, true, $Γ['global']['icfft']) ? sec_lvl('i', null, true, $Γ['global']['icfft']) : sec_lvl('N', null, true, $Γ['global']['icfft']);
        $Γ['global']['icfft']['$tmp54'] instanceof Object ? $Γ['global']['icfft']['$tmp54'].Σ = $Γ['global']['icfft']['$tmp54'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp54'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['icfft']['$tmp54'] = $Γ['global']['icfft']['$tmp54'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp54'] : $Λ[$Λ.length - 1].l;
    }
    $Λ.pop();
    $rf = $scope($Γ['global']['icfft'], 'cfft', false)['cfft'];
    $rf.scope = $Γ['global']['icfft'];
    $rf.$this = $Γ['global'];
    $rf['amplitudes'] = sec_lvl('amplitudes', null, true, $Γ['global']['icfft']) >= $Λ[$Λ.length - 1].l ? sec_lvl('amplitudes', null, true, $Γ['global']['icfft']) : $Λ[$Λ.length - 1].l;
    $Λ.push({
        l: $rf.$fscope,
        id: 'FUNC'
    });
    amplitudes = cfft(amplitudes);
    $scope($Γ['global']['icfft'], 'amplitudes', true)['amplitudes'] = $Λ.pop().l;
    $scope($Γ['global']['icfft'], 'amplitudes', true)['amplitudes'] instanceof Object ? $scope($Γ['global']['icfft'], 'amplitudes', true)['amplitudes'].Σ = $scope($Γ['global']['icfft'], 'amplitudes', true)['amplitudes'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['icfft'], 'amplitudes', true)['amplitudes'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['icfft'], 'amplitudes', true)['amplitudes'] = $scope($Γ['global']['icfft'], 'amplitudes', true)['amplitudes'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['icfft'], 'amplitudes', true)['amplitudes'] : $Λ[$Λ.length - 1].l;
    i = 0;
    $scope($Γ['global']['icfft'], 'i', true)['i'] = $Λ[$Λ.length - 1].l;
    $tmp56 = i < N;
    $Γ['global']['icfft']['$tmp56'] = sec_lvl('i', null, true, $Γ['global']['icfft']) >= sec_lvl('N', null, true, $Γ['global']['icfft']) ? sec_lvl('i', null, true, $Γ['global']['icfft']) : sec_lvl('N', null, true, $Γ['global']['icfft']);
    $Γ['global']['icfft']['$tmp56'] instanceof Object ? $Γ['global']['icfft']['$tmp56'].Σ = $Γ['global']['icfft']['$tmp56'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp56'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['icfft']['$tmp56'] = $Γ['global']['icfft']['$tmp56'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp56'] : $Λ[$Λ.length - 1].l;
    $Λ.push({
        l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp56', null, true, $Γ['global']['icfft']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp56', null, true, $Γ['global']['icfft']),
        id: 'LOOP'
    });
    for (; $tmp56;) {
        var $tmp59, $tmp61, $tmp55, $tmp56;
        $Γ['global']['icfft']['$tmp56'] = $Γ['global']['icfft']['$tmp55'] = $Γ['global']['icfft']['$tmp61'] = $Γ['global']['icfft']['$tmp59'] = 0;
        $tmp59 = amplitudes[i];
        $Γ['global']['icfft']['$tmp59'] = sec_lvl('amplitudes', i, false, $Γ['global']['icfft']);
        $Γ['global']['icfft']['$tmp59'] instanceof Object ? $Γ['global']['icfft']['$tmp59'].Σ = $Γ['global']['icfft']['$tmp59'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp59'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['icfft']['$tmp59'] = $Γ['global']['icfft']['$tmp59'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp59'] : $Λ[$Λ.length - 1].l;
        $tmp59 = amplitudes[i];
        $Γ['global']['icfft']['$tmp59'] = sec_lvl('amplitudes', i, false, $Γ['global']['icfft']);
        $Γ['global']['icfft']['$tmp59'] instanceof Object ? $Γ['global']['icfft']['$tmp59'].Σ = $Γ['global']['icfft']['$tmp59'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp59'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['icfft']['$tmp59'] = $Γ['global']['icfft']['$tmp59'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp59'] : $Λ[$Λ.length - 1].l;
        $tmp61 = $tmp59.im;
        $Γ['global']['icfft']['$tmp61'] = sec_lvl('$tmp59', 'im', false, $Γ['global']['icfft']);
        $Γ['global']['icfft']['$tmp61'] instanceof Object ? $Γ['global']['icfft']['$tmp61'].Σ = $Γ['global']['icfft']['$tmp61'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp61'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['icfft']['$tmp61'] = $Γ['global']['icfft']['$tmp61'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp61'] : $Λ[$Λ.length - 1].l;
        $tmp59.im = -$tmp61;
        $Γ['global']['icfft']['$tmp59']['im'] = sec_lvl('$tmp61', null, false, $Γ['global']['icfft']);
        $Γ['global']['icfft']['$tmp59']['im'] instanceof Object ? $Γ['global']['icfft']['$tmp59']['im'].Σ = $Γ['global']['icfft']['$tmp59']['im'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp59']['im'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['icfft']['$tmp59']['im'] = $Γ['global']['icfft']['$tmp59']['im'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp59']['im'] : $Λ[$Λ.length - 1].l;
        $tmp59 = amplitudes[i];
        $Γ['global']['icfft']['$tmp59'] = sec_lvl('amplitudes', i, false, $Γ['global']['icfft']);
        $Γ['global']['icfft']['$tmp59'] instanceof Object ? $Γ['global']['icfft']['$tmp59'].Σ = $Γ['global']['icfft']['$tmp59'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp59'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['icfft']['$tmp59'] = $Γ['global']['icfft']['$tmp59'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp59'] : $Λ[$Λ.length - 1].l;
        $tmp59.re *= iN;
        $Γ['global']['icfft']['$tmp59']['re'] = sec_lvl('iN', null, false, $Γ['global']['icfft']);
        $Γ['global']['icfft']['$tmp59']['re'] instanceof Object ? $Γ['global']['icfft']['$tmp59']['re'].Σ = $Γ['global']['icfft']['$tmp59']['re'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp59']['re'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['icfft']['$tmp59']['re'] = $Γ['global']['icfft']['$tmp59']['re'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp59']['re'] : $Λ[$Λ.length - 1].l;
        $tmp59 = amplitudes[i];
        $Γ['global']['icfft']['$tmp59'] = sec_lvl('amplitudes', i, false, $Γ['global']['icfft']);
        $Γ['global']['icfft']['$tmp59'] instanceof Object ? $Γ['global']['icfft']['$tmp59'].Σ = $Γ['global']['icfft']['$tmp59'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp59'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['icfft']['$tmp59'] = $Γ['global']['icfft']['$tmp59'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp59'] : $Λ[$Λ.length - 1].l;
        $tmp59.im *= iN;
        $Γ['global']['icfft']['$tmp59']['im'] = sec_lvl('iN', null, false, $Γ['global']['icfft']);
        $Γ['global']['icfft']['$tmp59']['im'] instanceof Object ? $Γ['global']['icfft']['$tmp59']['im'].Σ = $Γ['global']['icfft']['$tmp59']['im'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp59']['im'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['icfft']['$tmp59']['im'] = $Γ['global']['icfft']['$tmp59']['im'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp59']['im'] : $Λ[$Λ.length - 1].l;
        $tmp55 = ++i;
        $Γ['global']['icfft']['$tmp55'] = sec_lvl('i', null, false, $Γ['global']['icfft']);
        $Γ['global']['icfft']['$tmp55'] instanceof Object ? $Γ['global']['icfft']['$tmp55'].Σ = $Γ['global']['icfft']['$tmp55'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp55'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['icfft']['$tmp55'] = $Γ['global']['icfft']['$tmp55'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp55'] : $Λ[$Λ.length - 1].l;
        $tmp56 = i < N;
        $Γ['global']['icfft']['$tmp56'] = sec_lvl('i', null, true, $Γ['global']['icfft']) >= sec_lvl('N', null, true, $Γ['global']['icfft']) ? sec_lvl('i', null, true, $Γ['global']['icfft']) : sec_lvl('N', null, true, $Γ['global']['icfft']);
        $Γ['global']['icfft']['$tmp56'] instanceof Object ? $Γ['global']['icfft']['$tmp56'].Σ = $Γ['global']['icfft']['$tmp56'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp56'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['icfft']['$tmp56'] = $Γ['global']['icfft']['$tmp56'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['icfft']['$tmp56'] : $Λ[$Λ.length - 1].l;
    }
    $Λ.pop();
    return amplitudes;
}
function cfft(amplitudes) {
    var N, $tmp62, hN, even, odd, i, $tmp64, a, $tmp65, $tmp66, k, $tmp68;
    $Γ['global']['cfft']['$tmp68'] = $Γ['global']['cfft']['k'] = $Γ['global']['cfft']['$tmp66'] = $Γ['global']['cfft']['$tmp65'] = $Γ['global']['cfft']['a'] = $Γ['global']['cfft']['$tmp64'] = $Γ['global']['cfft']['i'] = $Γ['global']['cfft']['odd'] = $Γ['global']['cfft']['even'] = $Γ['global']['cfft']['hN'] = $Γ['global']['cfft']['$tmp62'] = $Γ['global']['cfft']['N'] = 0;
    N = amplitudes.length;
    $scope($Γ['global']['cfft'], 'N', true)['N'] = sec_lvl('amplitudes', 'length', false, $Γ['global']['cfft']);
    $scope($Γ['global']['cfft'], 'N', true)['N'] instanceof Object ? $scope($Γ['global']['cfft'], 'N', true)['N'].Σ = $scope($Γ['global']['cfft'], 'N', true)['N'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['cfft'], 'N', true)['N'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['cfft'], 'N', true)['N'] = $scope($Γ['global']['cfft'], 'N', true)['N'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['cfft'], 'N', true)['N'] : $Λ[$Λ.length - 1].l;
    $tmp62 = N <= 1;
    $Γ['global']['cfft']['$tmp62'] = sec_lvl('N', null, true, $Γ['global']['cfft']) >= $Λ[$Λ.length - 1].l ? sec_lvl('N', null, true, $Γ['global']['cfft']) : $Λ[$Λ.length - 1].l;
    $Γ['global']['cfft']['$tmp62'] instanceof Object ? $Γ['global']['cfft']['$tmp62'].Σ = $Γ['global']['cfft']['$tmp62'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp62'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['cfft']['$tmp62'] = $Γ['global']['cfft']['$tmp62'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp62'] : $Λ[$Λ.length - 1].l;
    $Λ.push({
        l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp62', null, true, $Γ['global']['cfft']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp62', null, true, $Γ['global']['cfft']),
        id: 'IF'
    });
    if ($tmp62) {
        return amplitudes;
        var $shouldComp = { 'lbl': 'FUNC' };
    } else {
    }
    if ($shouldComp)
        $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
    $Λ.pop();
    hN = N / 2;
    $scope($Γ['global']['cfft'], 'hN', true)['hN'] = sec_lvl('N', null, true, $Γ['global']['cfft']) >= $Λ[$Λ.length - 1].l ? sec_lvl('N', null, true, $Γ['global']['cfft']) : $Λ[$Λ.length - 1].l;
    $scope($Γ['global']['cfft'], 'hN', true)['hN'] instanceof Object ? $scope($Γ['global']['cfft'], 'hN', true)['hN'].Σ = $scope($Γ['global']['cfft'], 'hN', true)['hN'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['cfft'], 'hN', true)['hN'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['cfft'], 'hN', true)['hN'] = $scope($Γ['global']['cfft'], 'hN', true)['hN'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['cfft'], 'hN', true)['hN'] : $Λ[$Λ.length - 1].l;
    even = [];
    $Γ['global']['cfft']['even'] = {
        __proto__: {},
        scope: $Γ['global']['cfft'],
        Σ: $Λ[$Λ.length - 1].l
    };
    odd = [];
    $Γ['global']['cfft']['odd'] = {
        __proto__: {},
        scope: $Γ['global']['cfft'],
        Σ: $Λ[$Λ.length - 1].l
    };
    even.length = hN;
    $scope($Γ['global']['cfft'], 'even', false)['length'] = sec_lvl('hN', null, false, $Γ['global']['cfft']);
    $scope($Γ['global']['cfft'], 'even', false)['length'] instanceof Object ? $scope($Γ['global']['cfft'], 'even', false)['length'].Σ = $scope($Γ['global']['cfft'], 'even', false)['length'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['cfft'], 'even', false)['length'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['cfft'], 'even', false)['length'] = $scope($Γ['global']['cfft'], 'even', false)['length'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['cfft'], 'even', false)['length'] : $Λ[$Λ.length - 1].l;
    odd.length = hN;
    $scope($Γ['global']['cfft'], 'odd', false)['length'] = sec_lvl('hN', null, false, $Γ['global']['cfft']);
    $scope($Γ['global']['cfft'], 'odd', false)['length'] instanceof Object ? $scope($Γ['global']['cfft'], 'odd', false)['length'].Σ = $scope($Γ['global']['cfft'], 'odd', false)['length'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['cfft'], 'odd', false)['length'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['cfft'], 'odd', false)['length'] = $scope($Γ['global']['cfft'], 'odd', false)['length'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['cfft'], 'odd', false)['length'] : $Λ[$Λ.length - 1].l;
    i = 0;
    $scope($Γ['global']['cfft'], 'i', true)['i'] = $Λ[$Λ.length - 1].l;
    $tmp64 = i < hN;
    $Γ['global']['cfft']['$tmp64'] = sec_lvl('i', null, true, $Γ['global']['cfft']) >= sec_lvl('hN', null, true, $Γ['global']['cfft']) ? sec_lvl('i', null, true, $Γ['global']['cfft']) : sec_lvl('hN', null, true, $Γ['global']['cfft']);
    $Γ['global']['cfft']['$tmp64'] instanceof Object ? $Γ['global']['cfft']['$tmp64'].Σ = $Γ['global']['cfft']['$tmp64'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp64'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['cfft']['$tmp64'] = $Γ['global']['cfft']['$tmp64'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp64'] : $Λ[$Λ.length - 1].l;
    $Λ.push({
        l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp64', null, true, $Γ['global']['cfft']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp64', null, true, $Γ['global']['cfft']),
        id: 'LOOP'
    });
    for (; $tmp64;) {
        var $tmp69, $tmp70, $tmp71, $tmp63, $tmp64;
        $Γ['global']['cfft']['$tmp64'] = $Γ['global']['cfft']['$tmp63'] = $Γ['global']['cfft']['$tmp71'] = $Γ['global']['cfft']['$tmp70'] = $Γ['global']['cfft']['$tmp69'] = 0;
        $tmp69 = i * 2;
        $Γ['global']['cfft']['$tmp69'] = sec_lvl('i', null, true, $Γ['global']['cfft']) >= $Λ[$Λ.length - 1].l ? sec_lvl('i', null, true, $Γ['global']['cfft']) : $Λ[$Λ.length - 1].l;
        $Γ['global']['cfft']['$tmp69'] instanceof Object ? $Γ['global']['cfft']['$tmp69'].Σ = $Γ['global']['cfft']['$tmp69'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp69'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['cfft']['$tmp69'] = $Γ['global']['cfft']['$tmp69'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp69'] : $Λ[$Λ.length - 1].l;
        even[i] = amplitudes[$tmp69];
        $scope($Γ['global']['cfft'], 'even', false)[i] = sec_lvl('amplitudes', $tmp69, false, $Γ['global']['cfft']);
        _$tmp = sec_lvl('i', null, false, $Γ['global']['cfft']) instanceof Object ? sec_lvl('i', null, false, $Γ['global']['cfft']).Σ : sec_lvl('i', null, false, $Γ['global']['cfft']);
        $scope($Γ['global']['cfft'], 'even', false)[i] instanceof Object ? $scope($Γ['global']['cfft'], 'even', false)[i].Σ = $scope($Γ['global']['cfft'], 'even', false)[i].Σ : $scope($Γ['global']['cfft'], 'even', false)[i] = $scope($Γ['global']['cfft'], 'even', false)[i];
        $tmp71 = i * 2;
        $Γ['global']['cfft']['$tmp71'] = sec_lvl('i', null, true, $Γ['global']['cfft']) >= $Λ[$Λ.length - 1].l ? sec_lvl('i', null, true, $Γ['global']['cfft']) : $Λ[$Λ.length - 1].l;
        $Γ['global']['cfft']['$tmp71'] instanceof Object ? $Γ['global']['cfft']['$tmp71'].Σ = $Γ['global']['cfft']['$tmp71'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp71'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['cfft']['$tmp71'] = $Γ['global']['cfft']['$tmp71'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp71'] : $Λ[$Λ.length - 1].l;
        $tmp70 = $tmp71 + 1;
        $Γ['global']['cfft']['$tmp70'] = sec_lvl('$tmp71', null, true, $Γ['global']['cfft']) >= $Λ[$Λ.length - 1].l ? sec_lvl('$tmp71', null, true, $Γ['global']['cfft']) : $Λ[$Λ.length - 1].l;
        $Γ['global']['cfft']['$tmp70'] instanceof Object ? $Γ['global']['cfft']['$tmp70'].Σ = $Γ['global']['cfft']['$tmp70'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp70'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['cfft']['$tmp70'] = $Γ['global']['cfft']['$tmp70'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp70'] : $Λ[$Λ.length - 1].l;
        odd[i] = amplitudes[$tmp70];
        $scope($Γ['global']['cfft'], 'odd', false)[i] = sec_lvl('amplitudes', $tmp70, false, $Γ['global']['cfft']);
        _$tmp = sec_lvl('i', null, false, $Γ['global']['cfft']) instanceof Object ? sec_lvl('i', null, false, $Γ['global']['cfft']).Σ : sec_lvl('i', null, false, $Γ['global']['cfft']);
        $scope($Γ['global']['cfft'], 'odd', false)[i] instanceof Object ? $scope($Γ['global']['cfft'], 'odd', false)[i].Σ = $scope($Γ['global']['cfft'], 'odd', false)[i].Σ : $scope($Γ['global']['cfft'], 'odd', false)[i] = $scope($Γ['global']['cfft'], 'odd', false)[i];
        $tmp63 = ++i;
        $Γ['global']['cfft']['$tmp63'] = sec_lvl('i', null, false, $Γ['global']['cfft']);
        $Γ['global']['cfft']['$tmp63'] instanceof Object ? $Γ['global']['cfft']['$tmp63'].Σ = $Γ['global']['cfft']['$tmp63'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp63'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['cfft']['$tmp63'] = $Γ['global']['cfft']['$tmp63'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp63'] : $Λ[$Λ.length - 1].l;
        $tmp64 = i < hN;
        $Γ['global']['cfft']['$tmp64'] = sec_lvl('i', null, true, $Γ['global']['cfft']) >= sec_lvl('hN', null, true, $Γ['global']['cfft']) ? sec_lvl('i', null, true, $Γ['global']['cfft']) : sec_lvl('hN', null, true, $Γ['global']['cfft']);
        $Γ['global']['cfft']['$tmp64'] instanceof Object ? $Γ['global']['cfft']['$tmp64'].Σ = $Γ['global']['cfft']['$tmp64'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp64'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['cfft']['$tmp64'] = $Γ['global']['cfft']['$tmp64'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp64'] : $Λ[$Λ.length - 1].l;
    }
    $Λ.pop();
    $rf = $scope($Γ['global'], 'cfft', false)['cfft'];
    $rf.scope = $Γ['global'];
    $rf.$this = $Γ['global'];
    $rf['amplitudes'] = sec_lvl('even', null, true, $Γ['global']['cfft']) >= $Λ[$Λ.length - 1].l ? sec_lvl('even', null, true, $Γ['global']['cfft']) : $Λ[$Λ.length - 1].l;
    $Λ.push({
        l: $rf.$fscope,
        id: 'FUNC'
    });
    even = cfft(even);
    $scope($Γ['global']['cfft'], 'even', true)['even'] = $Λ.pop().l;
    $scope($Γ['global']['cfft'], 'even', true)['even'] instanceof Object ? $scope($Γ['global']['cfft'], 'even', true)['even'].Σ = $scope($Γ['global']['cfft'], 'even', true)['even'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['cfft'], 'even', true)['even'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['cfft'], 'even', true)['even'] = $scope($Γ['global']['cfft'], 'even', true)['even'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['cfft'], 'even', true)['even'] : $Λ[$Λ.length - 1].l;
    $rf = $scope($Γ['global'], 'cfft', false)['cfft'];
    $rf.scope = $Γ['global'];
    $rf.$this = $Γ['global'];
    $rf['amplitudes'] = sec_lvl('odd', null, true, $Γ['global']['cfft']) >= $Λ[$Λ.length - 1].l ? sec_lvl('odd', null, true, $Γ['global']['cfft']) : $Λ[$Λ.length - 1].l;
    $Λ.push({
        l: $rf.$fscope,
        id: 'FUNC'
    });
    odd = cfft(odd);
    $scope($Γ['global']['cfft'], 'odd', true)['odd'] = $Λ.pop().l;
    $scope($Γ['global']['cfft'], 'odd', true)['odd'] instanceof Object ? $scope($Γ['global']['cfft'], 'odd', true)['odd'].Σ = $scope($Γ['global']['cfft'], 'odd', true)['odd'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['cfft'], 'odd', true)['odd'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['cfft'], 'odd', true)['odd'] = $scope($Γ['global']['cfft'], 'odd', true)['odd'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['cfft'], 'odd', true)['odd'] : $Λ[$Λ.length - 1].l;
    $tmp65 = -2;
    $Γ['global']['cfft']['$tmp65'] = $Λ[$Λ.length - 1].l;
    $Γ['global']['cfft']['$tmp65'] instanceof Object ? $Γ['global']['cfft']['$tmp65'].Σ = $Γ['global']['cfft']['$tmp65'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp65'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['cfft']['$tmp65'] = $Γ['global']['cfft']['$tmp65'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp65'] : $Λ[$Λ.length - 1].l;
    $tmp66 = Math.PI;
    $Γ['global']['cfft']['$tmp66'] = 0 ;// Modified Manually, sicne we don't cover runtime API yet. sec_lvl('Math', 'PI', false, $Γ['global']['cfft']);
    $Γ['global']['cfft']['$tmp66'] instanceof Object ? $Γ['global']['cfft']['$tmp66'].Σ = $Γ['global']['cfft']['$tmp66'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp66'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['cfft']['$tmp66'] = $Γ['global']['cfft']['$tmp66'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp66'] : $Λ[$Λ.length - 1].l;
    a = $tmp65 * $tmp66;
    $scope($Γ['global']['cfft'], 'a', true)['a'] = sec_lvl('$tmp65', null, true, $Γ['global']['cfft']) >= sec_lvl('$tmp66', null, true, $Γ['global']['cfft']) ? sec_lvl('$tmp65', null, true, $Γ['global']['cfft']) : sec_lvl('$tmp66', null, true, $Γ['global']['cfft']);
    $scope($Γ['global']['cfft'], 'a', true)['a'] instanceof Object ? $scope($Γ['global']['cfft'], 'a', true)['a'].Σ = $scope($Γ['global']['cfft'], 'a', true)['a'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['cfft'], 'a', true)['a'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['cfft'], 'a', true)['a'] = $scope($Γ['global']['cfft'], 'a', true)['a'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['cfft'], 'a', true)['a'] : $Λ[$Λ.length - 1].l;
    k = 0;
    $scope($Γ['global']['cfft'], 'k', true)['k'] = $Λ[$Λ.length - 1].l;
    $tmp68 = k < hN;
    $Γ['global']['cfft']['$tmp68'] = sec_lvl('k', null, true, $Γ['global']['cfft']) >= sec_lvl('hN', null, true, $Γ['global']['cfft']) ? sec_lvl('k', null, true, $Γ['global']['cfft']) : sec_lvl('hN', null, true, $Γ['global']['cfft']);
    $Γ['global']['cfft']['$tmp68'] instanceof Object ? $Γ['global']['cfft']['$tmp68'].Σ = $Γ['global']['cfft']['$tmp68'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp68'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['cfft']['$tmp68'] = $Γ['global']['cfft']['$tmp68'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp68'] : $Λ[$Λ.length - 1].l;
    $Λ.push({
        l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp68', null, true, $Γ['global']['cfft']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp68', null, true, $Γ['global']['cfft']),
        id: 'LOOP'
    });
    for (; $tmp68;) {
        var $tmp72, $tmp73, $tmp74, $tmp75, $tmp76, $tmp77, p, t, $tmp78, $tmp79, $tmp80, $tmp81, $tmp82, $tmp83, $tmp84, $tmp67, $tmp68;
        $Γ['global']['cfft']['$tmp68'] = $Γ['global']['cfft']['$tmp67'] = $Γ['global']['cfft']['$tmp84'] = $Γ['global']['cfft']['$tmp83'] = $Γ['global']['cfft']['$tmp82'] = $Γ['global']['cfft']['$tmp81'] = $Γ['global']['cfft']['$tmp80'] = $Γ['global']['cfft']['$tmp79'] = $Γ['global']['cfft']['$tmp78'] = $Γ['global']['cfft']['t'] = $Γ['global']['cfft']['p'] = $Γ['global']['cfft']['$tmp77'] = $Γ['global']['cfft']['$tmp76'] = $Γ['global']['cfft']['$tmp75'] = $Γ['global']['cfft']['$tmp74'] = $Γ['global']['cfft']['$tmp73'] = $Γ['global']['cfft']['$tmp72'] = 0;
        $tmp74 = even[k];
        $Γ['global']['cfft']['$tmp74'] = sec_lvl('even', k, false, $Γ['global']['cfft']);
        $Γ['global']['cfft']['$tmp74'] instanceof Object ? $Γ['global']['cfft']['$tmp74'].Σ = $Γ['global']['cfft']['$tmp74'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp74'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['cfft']['$tmp74'] = $Γ['global']['cfft']['$tmp74'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp74'] : $Λ[$Λ.length - 1].l;
        $tmp73 = $tmp74 instanceof Complex;
        $Γ['global']['cfft']['$tmp73'] = sec_lvl('$tmp74', null, true, $Γ['global']['cfft']) >= sec_lvl('Complex', null, true, $Γ['global']['cfft']) ? sec_lvl('$tmp74', null, true, $Γ['global']['cfft']) : sec_lvl('Complex', null, true, $Γ['global']['cfft']);
        $Γ['global']['cfft']['$tmp73'] instanceof Object ? $Γ['global']['cfft']['$tmp73'].Σ = $Γ['global']['cfft']['$tmp73'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp73'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['cfft']['$tmp73'] = $Γ['global']['cfft']['$tmp73'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp73'] : $Λ[$Λ.length - 1].l;
        $tmp72 = !$tmp73;
        $Γ['global']['cfft']['$tmp72'] = sec_lvl('$tmp73', null, false, $Γ['global']['cfft']);
        $Γ['global']['cfft']['$tmp72'] instanceof Object ? $Γ['global']['cfft']['$tmp72'].Σ = $Γ['global']['cfft']['$tmp72'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp72'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['cfft']['$tmp72'] = $Γ['global']['cfft']['$tmp72'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp72'] : $Λ[$Λ.length - 1].l;
        $Λ.push({
            l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp72', null, true, $Γ['global']['cfft']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp72', null, true, $Γ['global']['cfft']),
            id: 'IF'
        });
        if ($tmp72) {
            var $tmp85;
            $Γ['global']['cfft']['$tmp85'] = 0;
            $tmp85 = even[k];
            $Γ['global']['cfft']['$tmp85'] = sec_lvl('even', k, false, $Γ['global']['cfft']);
            $Γ['global']['cfft']['$tmp85'] instanceof Object ? $Γ['global']['cfft']['$tmp85'].Σ = $Γ['global']['cfft']['$tmp85'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp85'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['cfft']['$tmp85'] = $Γ['global']['cfft']['$tmp85'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp85'] : $Λ[$Λ.length - 1].l;
            $rf = $scope($Γ['global']['cfft'], 'Complex', false)['Complex'];
            $rf.scope = $Γ['global']['cfft'];
            $rf.$this = {
                Σ: $Λ[$Λ.length - 1].l,
                __$proto__: $rf.prototype
            };
            $rf['re'] = sec_lvl('$tmp85', null, true, $Γ['global']['cfft']) >= $Λ[$Λ.length - 1].l ? sec_lvl('$tmp85', null, true, $Γ['global']['cfft']) : $Λ[$Λ.length - 1].l;
            $rf['im'] = $Λ[$Λ.length - 1].l;
            $rf.InvokedAsContr = true;
            $Λ.push({
                l: $rf.$fscope,
                id: 'FUNC'
            });
            even[k] = new Complex($tmp85, 0);
            $scope($Γ['global']['cfft'], 'even', false)[k] = $Λ.pop().l;
            $scope($Γ['global']['cfft'], 'even', false)[k] instanceof Object ? $scope($Γ['global']['cfft'], 'even', false)[k].Σ = $scope($Γ['global']['cfft'], 'even', false)[k].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['cfft'], 'even', false)[k].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['cfft'], 'even', false)[k] = $scope($Γ['global']['cfft'], 'even', false)[k] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['cfft'], 'even', false)[k] : $Λ[$Λ.length - 1].l;
        } else {
            $upgrade(['even'], $Λ[$Λ.length - 1].l, $Γ['global']['cfft']);
        }
        $Λ.pop();
        $tmp77 = odd[k];
        $Γ['global']['cfft']['$tmp77'] = sec_lvl('odd', k, false, $Γ['global']['cfft']);
        $Γ['global']['cfft']['$tmp77'] instanceof Object ? $Γ['global']['cfft']['$tmp77'].Σ = $Γ['global']['cfft']['$tmp77'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp77'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['cfft']['$tmp77'] = $Γ['global']['cfft']['$tmp77'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp77'] : $Λ[$Λ.length - 1].l;
        $tmp76 = $tmp77 instanceof Complex;
        $Γ['global']['cfft']['$tmp76'] = sec_lvl('$tmp77', null, true, $Γ['global']['cfft']) >= sec_lvl('Complex', null, true, $Γ['global']['cfft']) ? sec_lvl('$tmp77', null, true, $Γ['global']['cfft']) : sec_lvl('Complex', null, true, $Γ['global']['cfft']);
        $Γ['global']['cfft']['$tmp76'] instanceof Object ? $Γ['global']['cfft']['$tmp76'].Σ = $Γ['global']['cfft']['$tmp76'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp76'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['cfft']['$tmp76'] = $Γ['global']['cfft']['$tmp76'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp76'] : $Λ[$Λ.length - 1].l;
        $tmp75 = !$tmp76;
        $Γ['global']['cfft']['$tmp75'] = sec_lvl('$tmp76', null, false, $Γ['global']['cfft']);
        $Γ['global']['cfft']['$tmp75'] instanceof Object ? $Γ['global']['cfft']['$tmp75'].Σ = $Γ['global']['cfft']['$tmp75'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp75'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['cfft']['$tmp75'] = $Γ['global']['cfft']['$tmp75'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp75'] : $Λ[$Λ.length - 1].l;
        $Λ.push({
            l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp75', null, true, $Γ['global']['cfft']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp75', null, true, $Γ['global']['cfft']),
            id: 'IF'
        });
        if ($tmp75) {
            var $tmp86;
            $Γ['global']['cfft']['$tmp86'] = 0;
            $tmp86 = odd[k];
            $Γ['global']['cfft']['$tmp86'] = sec_lvl('odd', k, false, $Γ['global']['cfft']);
            $Γ['global']['cfft']['$tmp86'] instanceof Object ? $Γ['global']['cfft']['$tmp86'].Σ = $Γ['global']['cfft']['$tmp86'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp86'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['cfft']['$tmp86'] = $Γ['global']['cfft']['$tmp86'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp86'] : $Λ[$Λ.length - 1].l;
            $rf = $scope($Γ['global']['cfft'], 'Complex', false)['Complex'];
            $rf.scope = $Γ['global']['cfft'];
            $rf.$this = {
                Σ: $Λ[$Λ.length - 1].l,
                __$proto__: $rf.prototype
            };
            $rf['re'] = sec_lvl('$tmp86', null, true, $Γ['global']['cfft']) >= $Λ[$Λ.length - 1].l ? sec_lvl('$tmp86', null, true, $Γ['global']['cfft']) : $Λ[$Λ.length - 1].l;
            $rf['im'] = $Λ[$Λ.length - 1].l;
            $rf.InvokedAsContr = true;
            $Λ.push({
                l: $rf.$fscope,
                id: 'FUNC'
            });
            odd[k] = new Complex($tmp86, 0);
            $scope($Γ['global']['cfft'], 'odd', false)[k] = $Λ.pop().l;
            $scope($Γ['global']['cfft'], 'odd', false)[k] instanceof Object ? $scope($Γ['global']['cfft'], 'odd', false)[k].Σ = $scope($Γ['global']['cfft'], 'odd', false)[k].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['cfft'], 'odd', false)[k].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['cfft'], 'odd', false)[k] = $scope($Γ['global']['cfft'], 'odd', false)[k] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['cfft'], 'odd', false)[k] : $Λ[$Λ.length - 1].l;
        } else {
            $upgrade(['odd'], $Λ[$Λ.length - 1].l, $Γ['global']['cfft']);
        }
        $Λ.pop();
        p = k / N;
        $scope($Γ['global']['cfft'], 'p', true)['p'] = sec_lvl('k', null, true, $Γ['global']['cfft']) >= sec_lvl('N', null, true, $Γ['global']['cfft']) ? sec_lvl('k', null, true, $Γ['global']['cfft']) : sec_lvl('N', null, true, $Γ['global']['cfft']);
        $scope($Γ['global']['cfft'], 'p', true)['p'] instanceof Object ? $scope($Γ['global']['cfft'], 'p', true)['p'].Σ = $scope($Γ['global']['cfft'], 'p', true)['p'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['cfft'], 'p', true)['p'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['cfft'], 'p', true)['p'] = $scope($Γ['global']['cfft'], 'p', true)['p'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['cfft'], 'p', true)['p'] : $Λ[$Λ.length - 1].l;
        $tmp78 = a * p;
        $Γ['global']['cfft']['$tmp78'] = sec_lvl('a', null, true, $Γ['global']['cfft']) >= sec_lvl('p', null, true, $Γ['global']['cfft']) ? sec_lvl('a', null, true, $Γ['global']['cfft']) : sec_lvl('p', null, true, $Γ['global']['cfft']);
        $Γ['global']['cfft']['$tmp78'] instanceof Object ? $Γ['global']['cfft']['$tmp78'].Σ = $Γ['global']['cfft']['$tmp78'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp78'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['cfft']['$tmp78'] = $Γ['global']['cfft']['$tmp78'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp78'] : $Λ[$Λ.length - 1].l;
        $rf = $scope($Γ['global']['cfft'], 'Complex', false)['Complex'];
        $rf.scope = $Γ['global']['cfft'];
        $rf.$this = {
            Σ: $Λ[$Λ.length - 1].l,
            __$proto__: $rf.prototype
        };
        $rf['re'] = $Λ[$Λ.length - 1].l;
        $rf['im'] = sec_lvl('$tmp78', null, true, $Γ['global']['cfft']) >= $Λ[$Λ.length - 1].l ? sec_lvl('$tmp78', null, true, $Γ['global']['cfft']) : $Λ[$Λ.length - 1].l;
        $rf.InvokedAsContr = true;
        $Λ.push({
            l: $rf.$fscope,
            id: 'FUNC'
        });
        t = new Complex(0, $tmp78);
        $scope($Γ['global']['cfft'], 't', true)['t'] = $Λ.pop().l;
        $scope($Γ['global']['cfft'], 't', true)['t'] instanceof Object ? $scope($Γ['global']['cfft'], 't', true)['t'].Σ = $scope($Γ['global']['cfft'], 't', true)['t'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['cfft'], 't', true)['t'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['cfft'], 't', true)['t'] = $scope($Γ['global']['cfft'], 't', true)['t'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['cfft'], 't', true)['t'] : $Λ[$Λ.length - 1].l;
        $tmp = t.cexp(t);
        $tmp80 = odd[k];
        $Γ['global']['cfft']['$tmp80'] = sec_lvl('odd', k, false, $Γ['global']['cfft']);
        $Γ['global']['cfft']['$tmp80'] instanceof Object ? $Γ['global']['cfft']['$tmp80'].Σ = $Γ['global']['cfft']['$tmp80'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp80'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['cfft']['$tmp80'] = $Γ['global']['cfft']['$tmp80'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp80'] : $Λ[$Λ.length - 1].l;
        $tmp79 = $tmp.mul($tmp80, t);
        $tmp81 = even[k];
        $Γ['global']['cfft']['$tmp81'] = sec_lvl('even', k, false, $Γ['global']['cfft']);
        $Γ['global']['cfft']['$tmp81'] instanceof Object ? $Γ['global']['cfft']['$tmp81'].Σ = $Γ['global']['cfft']['$tmp81'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp81'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['cfft']['$tmp81'] = $Γ['global']['cfft']['$tmp81'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp81'] : $Λ[$Λ.length - 1].l;
        $tmp82 = odd[k];
        $Γ['global']['cfft']['$tmp82'] = sec_lvl('odd', k, false, $Γ['global']['cfft']);
        $Γ['global']['cfft']['$tmp82'] instanceof Object ? $Γ['global']['cfft']['$tmp82'].Σ = $Γ['global']['cfft']['$tmp82'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp82'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['cfft']['$tmp82'] = $Γ['global']['cfft']['$tmp82'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp82'] : $Λ[$Λ.length - 1].l;
        amplitudes[k] = $tmp81.add(t, $tmp82);
        $tmp83 = k + hN;
        $Γ['global']['cfft']['$tmp83'] = sec_lvl('k', null, true, $Γ['global']['cfft']) >= sec_lvl('hN', null, true, $Γ['global']['cfft']) ? sec_lvl('k', null, true, $Γ['global']['cfft']) : sec_lvl('hN', null, true, $Γ['global']['cfft']);
        $Γ['global']['cfft']['$tmp83'] instanceof Object ? $Γ['global']['cfft']['$tmp83'].Σ = $Γ['global']['cfft']['$tmp83'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp83'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['cfft']['$tmp83'] = $Γ['global']['cfft']['$tmp83'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp83'] : $Λ[$Λ.length - 1].l;
        $tmp81 = even[k];
        $Γ['global']['cfft']['$tmp81'] = sec_lvl('even', k, false, $Γ['global']['cfft']);
        $Γ['global']['cfft']['$tmp81'] instanceof Object ? $Γ['global']['cfft']['$tmp81'].Σ = $Γ['global']['cfft']['$tmp81'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp81'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['cfft']['$tmp81'] = $Γ['global']['cfft']['$tmp81'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp81'] : $Λ[$Λ.length - 1].l;
        $tmp84 = even[k];
        $Γ['global']['cfft']['$tmp84'] = sec_lvl('even', k, false, $Γ['global']['cfft']);
        $Γ['global']['cfft']['$tmp84'] instanceof Object ? $Γ['global']['cfft']['$tmp84'].Σ = $Γ['global']['cfft']['$tmp84'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp84'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['cfft']['$tmp84'] = $Γ['global']['cfft']['$tmp84'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp84'] : $Λ[$Λ.length - 1].l;
        amplitudes[$tmp83] = $tmp81.sub(t, $tmp84);
        $tmp67 = ++k;
        $Γ['global']['cfft']['$tmp67'] = sec_lvl('k', null, false, $Γ['global']['cfft']);
        $Γ['global']['cfft']['$tmp67'] instanceof Object ? $Γ['global']['cfft']['$tmp67'].Σ = $Γ['global']['cfft']['$tmp67'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp67'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['cfft']['$tmp67'] = $Γ['global']['cfft']['$tmp67'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp67'] : $Λ[$Λ.length - 1].l;
        $tmp68 = k < hN;
        $Γ['global']['cfft']['$tmp68'] = sec_lvl('k', null, true, $Γ['global']['cfft']) >= sec_lvl('hN', null, true, $Γ['global']['cfft']) ? sec_lvl('k', null, true, $Γ['global']['cfft']) : sec_lvl('hN', null, true, $Γ['global']['cfft']);
        $Γ['global']['cfft']['$tmp68'] instanceof Object ? $Γ['global']['cfft']['$tmp68'].Σ = $Γ['global']['cfft']['$tmp68'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp68'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['cfft']['$tmp68'] = $Γ['global']['cfft']['$tmp68'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['cfft']['$tmp68'] : $Λ[$Λ.length - 1].l;
    }
    $upgrade([
        'even',
        'odd',
        't',
        '$tmp',
        '$tmp79',
        'amplitudes'
    ], $Λ[$Λ.length - 1].l, $Γ['global']['cfft']);
    $Λ.pop();
    return amplitudes;
}
$tmp3 = [
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0
];
$Γ['global']['$tmp3'] = {
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
    Σ: $Λ[$Λ.length - 1].l
};
$rf = $scope($Γ['global'], 'cfft', false)['cfft'];
$rf.scope = $Γ['global'];
$rf.$this = $Γ['global'];
$rf['amplitudes'] = sec_lvl('$tmp3', null, true, $Γ['global']) >= $Λ[$Λ.length - 1].l ? sec_lvl('$tmp3', null, true, $Γ['global']) : $Λ[$Λ.length - 1].l;
$Λ.push({
    l: $rf.$fscope,
    id: 'FUNC'
});
$tmp2 = cfft($tmp3);
$Γ['global']['$tmp2'] = $Λ.pop().l;
$Γ['global']['$tmp2'] instanceof Object ? $Γ['global']['$tmp2'].Σ = $Γ['global']['$tmp2'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp2'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp2'] = $Γ['global']['$tmp2'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp2'] : $Λ[$Λ.length - 1].l;
$tmp1 = console.log($tmp2);
$tmp7 = [
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0
];
$Γ['global']['$tmp7'] = {
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
    Σ: $Λ[$Λ.length - 1].l
};
$rf = $scope($Γ['global'], 'cfft', false)['cfft'];
$rf.scope = $Γ['global'];
$rf.$this = $Γ['global'];
$rf['amplitudes'] = sec_lvl('$tmp7', null, true, $Γ['global']) >= $Λ[$Λ.length - 1].l ? sec_lvl('$tmp7', null, true, $Γ['global']) : $Λ[$Λ.length - 1].l;
$Λ.push({
    l: $rf.$fscope,
    id: 'FUNC'
});
$tmp6 = cfft($tmp7);
$Γ['global']['$tmp6'] = $Λ.pop().l;
$Γ['global']['$tmp6'] instanceof Object ? $Γ['global']['$tmp6'].Σ = $Γ['global']['$tmp6'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp6'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp6'] = $Γ['global']['$tmp6'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp6'] : $Λ[$Λ.length - 1].l;
$rf = $scope($Γ['global'], 'icfft', false)['icfft'];
$rf.scope = $Γ['global'];
$rf.$this = $Γ['global'];
$rf['amplitudes'] = sec_lvl('$tmp6', null, true, $Γ['global']) >= $Λ[$Λ.length - 1].l ? sec_lvl('$tmp6', null, true, $Γ['global']) : $Λ[$Λ.length - 1].l;
$Λ.push({
    l: $rf.$fscope,
    id: 'FUNC'
});
$tmp5 = icfft($tmp6);
$Γ['global']['$tmp5'] = $Λ.pop().l;
$Γ['global']['$tmp5'] instanceof Object ? $Γ['global']['$tmp5'].Σ = $Γ['global']['$tmp5'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp5'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp5'] = $Γ['global']['$tmp5'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp5'] : $Λ[$Λ.length - 1].l;
$tmp4 = console.log($tmp5);