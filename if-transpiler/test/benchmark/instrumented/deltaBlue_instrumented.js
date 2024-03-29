
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

$Γ['global']['deltaBlue'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$Γ['global']['change'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    v: $Λ[$Λ.length - 1].l,
    newValue: $Λ[$Λ.length - 1].l
};
$Γ['global']['projectionTest'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    n: $Λ[$Λ.length - 1].l
};
$Γ['global']['chainTest'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    n: $Λ[$Λ.length - 1].l
};
$Γ['global']['Plan'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$Γ['global']['Planner'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$Γ['global']['Variable'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    name: $Λ[$Λ.length - 1].l,
    initialValue: $Λ[$Λ.length - 1].l
};
$Γ['global']['EqualityConstraint'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    var1: $Λ[$Λ.length - 1].l,
    var2: $Λ[$Λ.length - 1].l,
    strength: $Λ[$Λ.length - 1].l
};
$Γ['global']['ScaleConstraint'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    src: $Λ[$Λ.length - 1].l,
    scale: $Λ[$Λ.length - 1].l,
    offset: $Λ[$Λ.length - 1].l,
    dest: $Λ[$Λ.length - 1].l,
    strength: $Λ[$Λ.length - 1].l
};
$Γ['global']['BinaryConstraint'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    var1: $Λ[$Λ.length - 1].l,
    var2: $Λ[$Λ.length - 1].l,
    strength: $Λ[$Λ.length - 1].l
};
$Γ['global']['EditConstraint'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    v: $Λ[$Λ.length - 1].l,
    str: $Λ[$Λ.length - 1].l
};
$Γ['global']['StayConstraint'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    v: $Λ[$Λ.length - 1].l,
    str: $Λ[$Λ.length - 1].l
};
$Γ['global']['UnaryConstraint'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    v: $Λ[$Λ.length - 1].l,
    strength: $Λ[$Λ.length - 1].l
};
$Γ['global']['Constraint'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    strength: $Λ[$Λ.length - 1].l
};
$Γ['global']['Strength'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    strengthValue: $Λ[$Λ.length - 1].l,
    name: $Λ[$Λ.length - 1].l
};
$Γ['global']['OrderedCollection'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
var $tmp0, $tmp1, $tmp2, $tmp3, $tmp4, $tmp5, $tmp6, $tmp7, $tmp8, $tmp9, Direction, $tmp10, $tmp11, $tmp12, $tmp13, $tmp14, $tmp15, $tmp16, $tmp17, $tmp18, planner, $tmp19, $tmp20;
$Γ['global']['$tmp20'] = $Γ['global']['$tmp19'] = $Γ['global']['planner'] = $Γ['global']['$tmp18'] = $Γ['global']['$tmp17'] = $Γ['global']['$tmp16'] = $Γ['global']['$tmp15'] = $Γ['global']['$tmp14'] = $Γ['global']['$tmp13'] = $Γ['global']['$tmp12'] = $Γ['global']['$tmp11'] = $Γ['global']['$tmp10'] = $Γ['global']['Direction'] = $Γ['global']['$tmp9'] = $Γ['global']['$tmp8'] = $Γ['global']['$tmp7'] = $Γ['global']['$tmp6'] = $Γ['global']['$tmp5'] = $Γ['global']['$tmp4'] = $Γ['global']['$tmp3'] = $Γ['global']['$tmp2'] = $Γ['global']['$tmp1'] = $Γ['global']['$tmp0'] = 0;
$tmp0 = Object.prototype;
$Γ['global']['$tmp0'] = {
    Σ: 0,
    prototype: { Σ: $Λ[$Λ.length - 1].l }
};
$Γ['global']['$tmp0'] instanceof Object ? $Γ['global']['$tmp0'].Σ = $lub($Γ['global']['$tmp0'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0'] = $lub($Γ['global']['$tmp0'], $Λ[$Λ.length - 1].l);
$tmp0.inheritsFrom = function (shuper) {
    $Γ['global']['$tmp0']['inheritsFrom']['Inheriter'] = {
        $fscope: $Λ[$Λ.length - 1].l,
        prototype: { Σ: $Λ[$Λ.length - 1].l },
        Σ: $Λ[$Λ.length - 1].l,
        scope: $Γ['global']['$tmp0']['inheritsFrom']
    };
    function Inheriter() {
        return;
    }
    Inheriter.prototype = shuper.prototype;
    $scope($Γ['global']['$tmp0']['inheritsFrom'], 'Inheriter', false)['prototype'] = sec_lvl('shuper', 'prototype', false, $Γ['global']['$tmp0']['inheritsFrom']);
    $scope($Γ['global']['$tmp0']['inheritsFrom'], 'Inheriter', false)['prototype'] instanceof Object ? $scope($Γ['global']['$tmp0']['inheritsFrom'], 'Inheriter', false)['prototype'].Σ = $lub($scope($Γ['global']['$tmp0']['inheritsFrom'], 'Inheriter', false)['prototype'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp0']['inheritsFrom'], 'Inheriter', false)['prototype'] = $lub($scope($Γ['global']['$tmp0']['inheritsFrom'], 'Inheriter', false)['prototype'], $Λ[$Λ.length - 1].l);
    this.prototype = new Inheriter();
    this.superConstructor = shuper;
    $Γ['global']['$tmp0']['inheritsFrom']['$this']['superConstructor'] = sec_lvl('shuper', null, false, $Γ['global']['$tmp0']['inheritsFrom']);
    $Γ['global']['$tmp0']['inheritsFrom']['$this']['superConstructor'] instanceof Object ? $Γ['global']['$tmp0']['inheritsFrom']['$this']['superConstructor'].Σ = $lub($Γ['global']['$tmp0']['inheritsFrom']['$this']['superConstructor'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['inheritsFrom']['$this']['superConstructor'] = $lub($Γ['global']['$tmp0']['inheritsFrom']['$this']['superConstructor'], $Λ[$Λ.length - 1].l);
    return;
};
$Γ['global']['$tmp0']['inheritsFrom'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    shuper: $Λ[$Λ.length - 1].l
};
function OrderedCollection() {
    this.elms = new Array();
    return;
}
$tmp1 = OrderedCollection.prototype;
$Γ['global']['$tmp1'] = sec_lvl('OrderedCollection', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp1'] instanceof Object ? $Γ['global']['$tmp1'].Σ = $lub($Γ['global']['$tmp1'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1'] = $lub($Γ['global']['$tmp1'], $Λ[$Λ.length - 1].l);
$tmp1.add = function (elm) {
    var $tmp21, $tmp22;
    $Γ['global']['$tmp1']['add']['$tmp22'] = $Γ['global']['$tmp1']['add']['$tmp21'] = 0;
    $tmp22 = this.elms;
    $Γ['global']['$tmp1']['add']['$tmp22'] = sec_lvl('$tmp1', 'elms', false, $Γ['global']['$tmp1']['add']);
    $Γ['global']['$tmp1']['add']['$tmp22'] instanceof Object ? $Γ['global']['$tmp1']['add']['$tmp22'].Σ = $lub($Γ['global']['$tmp1']['add']['$tmp22'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['add']['$tmp22'] = $lub($Γ['global']['$tmp1']['add']['$tmp22'], $Λ[$Λ.length - 1].l);
    $tmp21 = $tmp22.push(elm);
    return;
};
$Γ['global']['$tmp1']['add'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    elm: $Λ[$Λ.length - 1].l
};
$tmp1 = OrderedCollection.prototype;
$Γ['global']['$tmp1'] = sec_lvl('OrderedCollection', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp1'] instanceof Object ? $Γ['global']['$tmp1'].Σ = $lub($Γ['global']['$tmp1'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1'] = $lub($Γ['global']['$tmp1'], $Λ[$Λ.length - 1].l);
$tmp1.at = function (index) {
    var $tmp23, $tmp22;
    $Γ['global']['$tmp1']['at']['$tmp22'] = $Γ['global']['$tmp1']['at']['$tmp23'] = 0;
    $tmp22 = this.elms;
    $Γ['global']['$tmp1']['at']['$tmp22'] = sec_lvl('$tmp1', 'elms', false, $Γ['global']['$tmp1']['at']);
    $Γ['global']['$tmp1']['at']['$tmp22'] instanceof Object ? $Γ['global']['$tmp1']['at']['$tmp22'].Σ = $lub($Γ['global']['$tmp1']['at']['$tmp22'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['at']['$tmp22'] = $lub($Γ['global']['$tmp1']['at']['$tmp22'], $Λ[$Λ.length - 1].l);
    $tmp23 = $tmp22[index];
    $Γ['global']['$tmp1']['at']['$tmp23'] = sec_lvl('$tmp22', index, false, $Γ['global']['$tmp1']['at']);
    $Γ['global']['$tmp1']['at']['$tmp23'] instanceof Object ? $Γ['global']['$tmp1']['at']['$tmp23'].Σ = $lub($Γ['global']['$tmp1']['at']['$tmp23'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['at']['$tmp23'] = $lub($Γ['global']['$tmp1']['at']['$tmp23'], $Λ[$Λ.length - 1].l);
    return $tmp23;
};
$Γ['global']['$tmp1']['at'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    index: $Λ[$Λ.length - 1].l
};
$tmp1 = OrderedCollection.prototype;
$Γ['global']['$tmp1'] = sec_lvl('OrderedCollection', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp1'] instanceof Object ? $Γ['global']['$tmp1'].Σ = $lub($Γ['global']['$tmp1'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1'] = $lub($Γ['global']['$tmp1'], $Λ[$Λ.length - 1].l);
$tmp1.size = function () {
    var $tmp24, $tmp22;
    $Γ['global']['$tmp1']['size']['$tmp22'] = $Γ['global']['$tmp1']['size']['$tmp24'] = 0;
    $tmp22 = this.elms;
    $Γ['global']['$tmp1']['size']['$tmp22'] = sec_lvl('$tmp1', 'elms', false, $Γ['global']['$tmp1']['size']);
    $Γ['global']['$tmp1']['size']['$tmp22'] instanceof Object ? $Γ['global']['$tmp1']['size']['$tmp22'].Σ = $lub($Γ['global']['$tmp1']['size']['$tmp22'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['size']['$tmp22'] = $lub($Γ['global']['$tmp1']['size']['$tmp22'], $Λ[$Λ.length - 1].l);
    $tmp24 = $tmp22.length;
    $Γ['global']['$tmp1']['size']['$tmp24'] = sec_lvl('$tmp22', 'length', false, $Γ['global']['$tmp1']['size']);
    $Γ['global']['$tmp1']['size']['$tmp24'] instanceof Object ? $Γ['global']['$tmp1']['size']['$tmp24'].Σ = $lub($Γ['global']['$tmp1']['size']['$tmp24'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['size']['$tmp24'] = $lub($Γ['global']['$tmp1']['size']['$tmp24'], $Λ[$Λ.length - 1].l);
    return $tmp24;
};
$Γ['global']['$tmp1']['size'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$tmp1 = OrderedCollection.prototype;
$Γ['global']['$tmp1'] = sec_lvl('OrderedCollection', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp1'] instanceof Object ? $Γ['global']['$tmp1'].Σ = $lub($Γ['global']['$tmp1'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1'] = $lub($Γ['global']['$tmp1'], $Λ[$Λ.length - 1].l);
$tmp1.removeFirst = function () {
    var $tmp25, $tmp22;
    $Γ['global']['$tmp1']['removeFirst']['$tmp22'] = $Γ['global']['$tmp1']['removeFirst']['$tmp25'] = 0;
    $tmp22 = this.elms;
    $Γ['global']['$tmp1']['removeFirst']['$tmp22'] = sec_lvl('$tmp1', 'elms', false, $Γ['global']['$tmp1']['removeFirst']);
    $Γ['global']['$tmp1']['removeFirst']['$tmp22'] instanceof Object ? $Γ['global']['$tmp1']['removeFirst']['$tmp22'].Σ = $lub($Γ['global']['$tmp1']['removeFirst']['$tmp22'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['removeFirst']['$tmp22'] = $lub($Γ['global']['$tmp1']['removeFirst']['$tmp22'], $Λ[$Λ.length - 1].l);
    $tmp25 = $tmp22.pop();
    return $tmp25;
};
$Γ['global']['$tmp1']['removeFirst'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$tmp1 = OrderedCollection.prototype;
$Γ['global']['$tmp1'] = sec_lvl('OrderedCollection', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp1'] instanceof Object ? $Γ['global']['$tmp1'].Σ = $lub($Γ['global']['$tmp1'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1'] = $lub($Γ['global']['$tmp1'], $Λ[$Λ.length - 1].l);
$tmp1.remove = function (elm) {
    var index, skipped, i, $tmp27, $tmp28, $tmp22, $tmp30;
    $Γ['global']['$tmp1']['remove']['$tmp30'] = $Γ['global']['$tmp1']['remove']['$tmp22'] = $Γ['global']['$tmp1']['remove']['$tmp28'] = $Γ['global']['$tmp1']['remove']['$tmp27'] = $Γ['global']['$tmp1']['remove']['i'] = $Γ['global']['$tmp1']['remove']['skipped'] = $Γ['global']['$tmp1']['remove']['index'] = 0;
    index = 0;
    $scope($Γ['global']['$tmp1']['remove'], 'index', true)['index'] = $Λ[$Λ.length - 1].l;
    skipped = 0;
    $scope($Γ['global']['$tmp1']['remove'], 'skipped', true)['skipped'] = $Λ[$Λ.length - 1].l;
    i = 0;
    $scope($Γ['global']['$tmp1']['remove'], 'i', true)['i'] = $Λ[$Λ.length - 1].l;
    $tmp22 = this.elms;
    $Γ['global']['$tmp1']['remove']['$tmp22'] = sec_lvl('$tmp1', 'elms', false, $Γ['global']['$tmp1']['remove']);
    $Γ['global']['$tmp1']['remove']['$tmp22'] instanceof Object ? $Γ['global']['$tmp1']['remove']['$tmp22'].Σ = $lub($Γ['global']['$tmp1']['remove']['$tmp22'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['remove']['$tmp22'] = $lub($Γ['global']['$tmp1']['remove']['$tmp22'], $Λ[$Λ.length - 1].l);
    $tmp28 = $tmp22.length;
    $Γ['global']['$tmp1']['remove']['$tmp28'] = sec_lvl('$tmp22', 'length', false, $Γ['global']['$tmp1']['remove']);
    $Γ['global']['$tmp1']['remove']['$tmp28'] instanceof Object ? $Γ['global']['$tmp1']['remove']['$tmp28'].Σ = $lub($Γ['global']['$tmp1']['remove']['$tmp28'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['remove']['$tmp28'] = $lub($Γ['global']['$tmp1']['remove']['$tmp28'], $Λ[$Λ.length - 1].l);
    $tmp27 = i < $tmp28;
    $Γ['global']['$tmp1']['remove']['$tmp27'] = $lub(sec_lvl('i', null, true, $Γ['global']['$tmp1']['remove']), sec_lvl('$tmp28', null, true, $Γ['global']['$tmp1']['remove']));
    $Γ['global']['$tmp1']['remove']['$tmp27'] instanceof Object ? $Γ['global']['$tmp1']['remove']['$tmp27'].Σ = $lub($Γ['global']['$tmp1']['remove']['$tmp27'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['remove']['$tmp27'] = $lub($Γ['global']['$tmp1']['remove']['$tmp27'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp27', null, true, $Γ['global']['$tmp1']['remove'])),
        id: 'LOOP'
    });
    for (; $tmp27;) {
        var value, $tmp22, $tmp31, $tmp26, $tmp27, $tmp32;
        $Γ['global']['$tmp1']['remove']['$tmp32'] = $Γ['global']['$tmp1']['remove']['$tmp27'] = $Γ['global']['$tmp1']['remove']['$tmp26'] = $Γ['global']['$tmp1']['remove']['$tmp31'] = $Γ['global']['$tmp1']['remove']['$tmp22'] = $Γ['global']['$tmp1']['remove']['value'] = 0;
        $tmp22 = this.elms;
        $Γ['global']['$tmp1']['remove']['$tmp22'] = sec_lvl('$tmp1', 'elms', false, $Γ['global']['$tmp1']['remove']);
        $Γ['global']['$tmp1']['remove']['$tmp22'] instanceof Object ? $Γ['global']['$tmp1']['remove']['$tmp22'].Σ = $lub($Γ['global']['$tmp1']['remove']['$tmp22'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['remove']['$tmp22'] = $lub($Γ['global']['$tmp1']['remove']['$tmp22'], $Λ[$Λ.length - 1].l);
        value = $tmp22[i];
        $scope($Γ['global']['$tmp1']['remove'], 'value', true)['value'] = sec_lvl('$tmp22', i, false, $Γ['global']['$tmp1']['remove']);
        $scope($Γ['global']['$tmp1']['remove'], 'value', true)['value'] instanceof Object ? $scope($Γ['global']['$tmp1']['remove'], 'value', true)['value'].Σ = $lub($scope($Γ['global']['$tmp1']['remove'], 'value', true)['value'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp1']['remove'], 'value', true)['value'] = $lub($scope($Γ['global']['$tmp1']['remove'], 'value', true)['value'], $Λ[$Λ.length - 1].l);
        $tmp31 = value != elm;
        $Γ['global']['$tmp1']['remove']['$tmp31'] = $lub(sec_lvl('value', null, true, $Γ['global']['$tmp1']['remove']), sec_lvl('elm', null, true, $Γ['global']['$tmp1']['remove']));
        $Γ['global']['$tmp1']['remove']['$tmp31'] instanceof Object ? $Γ['global']['$tmp1']['remove']['$tmp31'].Σ = $lub($Γ['global']['$tmp1']['remove']['$tmp31'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['remove']['$tmp31'] = $lub($Γ['global']['$tmp1']['remove']['$tmp31'], $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp31', null, true, $Γ['global']['$tmp1']['remove'])),
            id: 'IF'
        });
        if ($tmp31) {
            var $tmp22, $tmp33;
            $Γ['global']['$tmp1']['remove']['$tmp33'] = $Γ['global']['$tmp1']['remove']['$tmp22'] = 0;
            $tmp22 = this.elms;
            $Γ['global']['$tmp1']['remove']['$tmp22'] = sec_lvl('$tmp1', 'elms', false, $Γ['global']['$tmp1']['remove']);
            $Γ['global']['$tmp1']['remove']['$tmp22'] instanceof Object ? $Γ['global']['$tmp1']['remove']['$tmp22'].Σ = $lub($Γ['global']['$tmp1']['remove']['$tmp22'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['remove']['$tmp22'] = $lub($Γ['global']['$tmp1']['remove']['$tmp22'], $Λ[$Λ.length - 1].l);
            $tmp22[index] = value;
            $Γ['global']['$tmp1']['remove']['$tmp22']['index'] = sec_lvl('value', null, false, $Γ['global']['$tmp1']['remove']);
            _$tmp = sec_lvl('index', null, false, $Γ['global']['$tmp1']['remove']) instanceof Object ? sec_lvl('index', null, false, $Γ['global']['$tmp1']['remove']).Σ : sec_lvl('index', null, false, $Γ['global']['$tmp1']['remove']);
            $Γ['global']['$tmp1']['remove']['$tmp22']['index'] instanceof Object ? $Γ['global']['$tmp1']['remove']['$tmp22']['index'].Σ = $lub($Γ['global']['$tmp1']['remove']['$tmp22']['index'].Σ, _$tmp, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['remove']['$tmp22']['index'] = $lub($Γ['global']['$tmp1']['remove']['$tmp22']['index'], _$tmp, $Λ[$Λ.length - 1].l);
            $tmp33 = index++;
            $Γ['global']['$tmp1']['remove']['$tmp33'] = sec_lvl('index', null, false, $Γ['global']['$tmp1']['remove']);
            $Γ['global']['$tmp1']['remove']['$tmp33'] instanceof Object ? $Γ['global']['$tmp1']['remove']['$tmp33'].Σ = $lub($Γ['global']['$tmp1']['remove']['$tmp33'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['remove']['$tmp33'] = $lub($Γ['global']['$tmp1']['remove']['$tmp33'], $Λ[$Λ.length - 1].l);
        } else {
            var $tmp34;
            $Γ['global']['$tmp1']['remove']['$tmp34'] = 0;
            $tmp34 = skipped++;
            $Γ['global']['$tmp1']['remove']['$tmp34'] = sec_lvl('skipped', null, false, $Γ['global']['$tmp1']['remove']);
            $Γ['global']['$tmp1']['remove']['$tmp34'] instanceof Object ? $Γ['global']['$tmp1']['remove']['$tmp34'].Σ = $lub($Γ['global']['$tmp1']['remove']['$tmp34'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['remove']['$tmp34'] = $lub($Γ['global']['$tmp1']['remove']['$tmp34'], $Λ[$Λ.length - 1].l);
        }
        $Λ.pop();
        $tmp26 = i++;
        $Γ['global']['$tmp1']['remove']['$tmp26'] = sec_lvl('i', null, false, $Γ['global']['$tmp1']['remove']);
        $Γ['global']['$tmp1']['remove']['$tmp26'] instanceof Object ? $Γ['global']['$tmp1']['remove']['$tmp26'].Σ = $lub($Γ['global']['$tmp1']['remove']['$tmp26'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['remove']['$tmp26'] = $lub($Γ['global']['$tmp1']['remove']['$tmp26'], $Λ[$Λ.length - 1].l);
        $tmp22 = this.elms;
        $Γ['global']['$tmp1']['remove']['$tmp22'] = sec_lvl('$tmp1', 'elms', false, $Γ['global']['$tmp1']['remove']);
        $Γ['global']['$tmp1']['remove']['$tmp22'] instanceof Object ? $Γ['global']['$tmp1']['remove']['$tmp22'].Σ = $lub($Γ['global']['$tmp1']['remove']['$tmp22'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['remove']['$tmp22'] = $lub($Γ['global']['$tmp1']['remove']['$tmp22'], $Λ[$Λ.length - 1].l);
        $tmp32 = $tmp22.length;
        $Γ['global']['$tmp1']['remove']['$tmp32'] = sec_lvl('$tmp22', 'length', false, $Γ['global']['$tmp1']['remove']);
        $Γ['global']['$tmp1']['remove']['$tmp32'] instanceof Object ? $Γ['global']['$tmp1']['remove']['$tmp32'].Σ = $lub($Γ['global']['$tmp1']['remove']['$tmp32'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['remove']['$tmp32'] = $lub($Γ['global']['$tmp1']['remove']['$tmp32'], $Λ[$Λ.length - 1].l);
        $tmp27 = i < $tmp32;
        $Γ['global']['$tmp1']['remove']['$tmp27'] = $lub(sec_lvl('i', null, true, $Γ['global']['$tmp1']['remove']), sec_lvl('$tmp32', null, true, $Γ['global']['$tmp1']['remove']));
        $Γ['global']['$tmp1']['remove']['$tmp27'] instanceof Object ? $Γ['global']['$tmp1']['remove']['$tmp27'].Σ = $lub($Γ['global']['$tmp1']['remove']['$tmp27'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['remove']['$tmp27'] = $lub($Γ['global']['$tmp1']['remove']['$tmp27'], $Λ[$Λ.length - 1].l);
    }
    $Λ.pop();
    i = 0;
    $scope($Γ['global']['$tmp1']['remove'], 'i', true)['i'] = $Λ[$Λ.length - 1].l;
    $tmp30 = i < skipped;
    $Γ['global']['$tmp1']['remove']['$tmp30'] = $lub(sec_lvl('i', null, true, $Γ['global']['$tmp1']['remove']), sec_lvl('skipped', null, true, $Γ['global']['$tmp1']['remove']));
    $Γ['global']['$tmp1']['remove']['$tmp30'] instanceof Object ? $Γ['global']['$tmp1']['remove']['$tmp30'].Σ = $lub($Γ['global']['$tmp1']['remove']['$tmp30'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['remove']['$tmp30'] = $lub($Γ['global']['$tmp1']['remove']['$tmp30'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp30', null, true, $Γ['global']['$tmp1']['remove'])),
        id: 'LOOP'
    });
    for (; $tmp30;) {
        var $tmp35, $tmp22, $tmp29, $tmp30;
        $Γ['global']['$tmp1']['remove']['$tmp30'] = $Γ['global']['$tmp1']['remove']['$tmp29'] = $Γ['global']['$tmp1']['remove']['$tmp22'] = $Γ['global']['$tmp1']['remove']['$tmp35'] = 0;
        $tmp22 = this.elms;
        $Γ['global']['$tmp1']['remove']['$tmp22'] = sec_lvl('$tmp1', 'elms', false, $Γ['global']['$tmp1']['remove']);
        $Γ['global']['$tmp1']['remove']['$tmp22'] instanceof Object ? $Γ['global']['$tmp1']['remove']['$tmp22'].Σ = $lub($Γ['global']['$tmp1']['remove']['$tmp22'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['remove']['$tmp22'] = $lub($Γ['global']['$tmp1']['remove']['$tmp22'], $Λ[$Λ.length - 1].l);
        $tmp35 = $tmp22.pop();
        $tmp29 = i++;
        $Γ['global']['$tmp1']['remove']['$tmp29'] = sec_lvl('i', null, false, $Γ['global']['$tmp1']['remove']);
        $Γ['global']['$tmp1']['remove']['$tmp29'] instanceof Object ? $Γ['global']['$tmp1']['remove']['$tmp29'].Σ = $lub($Γ['global']['$tmp1']['remove']['$tmp29'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['remove']['$tmp29'] = $lub($Γ['global']['$tmp1']['remove']['$tmp29'], $Λ[$Λ.length - 1].l);
        $tmp30 = i < skipped;
        $Γ['global']['$tmp1']['remove']['$tmp30'] = $lub(sec_lvl('i', null, true, $Γ['global']['$tmp1']['remove']), sec_lvl('skipped', null, true, $Γ['global']['$tmp1']['remove']));
        $Γ['global']['$tmp1']['remove']['$tmp30'] instanceof Object ? $Γ['global']['$tmp1']['remove']['$tmp30'].Σ = $lub($Γ['global']['$tmp1']['remove']['$tmp30'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['remove']['$tmp30'] = $lub($Γ['global']['$tmp1']['remove']['$tmp30'], $Λ[$Λ.length - 1].l);
    }
    $upgrade([
        '$tmp22.pop',
        '$tmp35'
    ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp1']['remove']);
    $Λ.pop();
    return;
};
$Γ['global']['$tmp1']['remove'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    elm: $Λ[$Λ.length - 1].l
};
function Strength(strengthValue, name) {
    this.strengthValue = strengthValue;
    $Γ['global']['Strength']['$this']['strengthValue'] = sec_lvl('strengthValue', null, false, $Γ['global']['Strength']);
    $Γ['global']['Strength']['$this']['strengthValue'] instanceof Object ? $Γ['global']['Strength']['$this']['strengthValue'].Σ = $lub($Γ['global']['Strength']['$this']['strengthValue'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['Strength']['$this']['strengthValue'] = $lub($Γ['global']['Strength']['$this']['strengthValue'], $Λ[$Λ.length - 1].l);
    this.name = name;
    $Γ['global']['Strength']['$this']['name'] = sec_lvl('name', null, false, $Γ['global']['Strength']);
    $Γ['global']['Strength']['$this']['name'] instanceof Object ? $Γ['global']['Strength']['$this']['name'].Σ = $lub($Γ['global']['Strength']['$this']['name'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['Strength']['$this']['name'] = $lub($Γ['global']['Strength']['$this']['name'], $Λ[$Λ.length - 1].l);
    return;
}
Strength.stronger = function (s1, s2) {
    var $tmp36, $tmp37, $tmp38;
    $Γ['global']['Strength']['stronger']['$tmp38'] = $Γ['global']['Strength']['stronger']['$tmp37'] = $Γ['global']['Strength']['stronger']['$tmp36'] = 0;
    $tmp37 = s1.strengthValue;
    $Γ['global']['Strength']['stronger']['$tmp37'] = sec_lvl('s1', 'strengthValue', false, $Γ['global']['Strength']['stronger']);
    $Γ['global']['Strength']['stronger']['$tmp37'] instanceof Object ? $Γ['global']['Strength']['stronger']['$tmp37'].Σ = $lub($Γ['global']['Strength']['stronger']['$tmp37'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['Strength']['stronger']['$tmp37'] = $lub($Γ['global']['Strength']['stronger']['$tmp37'], $Λ[$Λ.length - 1].l);
    $tmp38 = s2.strengthValue;
    $Γ['global']['Strength']['stronger']['$tmp38'] = sec_lvl('s2', 'strengthValue', false, $Γ['global']['Strength']['stronger']);
    $Γ['global']['Strength']['stronger']['$tmp38'] instanceof Object ? $Γ['global']['Strength']['stronger']['$tmp38'].Σ = $lub($Γ['global']['Strength']['stronger']['$tmp38'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['Strength']['stronger']['$tmp38'] = $lub($Γ['global']['Strength']['stronger']['$tmp38'], $Λ[$Λ.length - 1].l);
    $tmp36 = $tmp37 < $tmp38;
    $Γ['global']['Strength']['stronger']['$tmp36'] = $lub(sec_lvl('$tmp37', null, true, $Γ['global']['Strength']['stronger']), sec_lvl('$tmp38', null, true, $Γ['global']['Strength']['stronger']));
    $Γ['global']['Strength']['stronger']['$tmp36'] instanceof Object ? $Γ['global']['Strength']['stronger']['$tmp36'].Σ = $lub($Γ['global']['Strength']['stronger']['$tmp36'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['Strength']['stronger']['$tmp36'] = $lub($Γ['global']['Strength']['stronger']['$tmp36'], $Λ[$Λ.length - 1].l);
    return $tmp36;
};
$Γ['global']['Strength']['stronger'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    s1: $Λ[$Λ.length - 1].l,
    s2: $Λ[$Λ.length - 1].l
};
Strength.weaker = function (s1, s2) {
    var $tmp39, $tmp40, $tmp41;
    $Γ['global']['Strength']['weaker']['$tmp41'] = $Γ['global']['Strength']['weaker']['$tmp40'] = $Γ['global']['Strength']['weaker']['$tmp39'] = 0;
    $tmp40 = s1.strengthValue;
    $Γ['global']['Strength']['weaker']['$tmp40'] = sec_lvl('s1', 'strengthValue', false, $Γ['global']['Strength']['weaker']);
    $Γ['global']['Strength']['weaker']['$tmp40'] instanceof Object ? $Γ['global']['Strength']['weaker']['$tmp40'].Σ = $lub($Γ['global']['Strength']['weaker']['$tmp40'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['Strength']['weaker']['$tmp40'] = $lub($Γ['global']['Strength']['weaker']['$tmp40'], $Λ[$Λ.length - 1].l);
    $tmp41 = s2.strengthValue;
    $Γ['global']['Strength']['weaker']['$tmp41'] = sec_lvl('s2', 'strengthValue', false, $Γ['global']['Strength']['weaker']);
    $Γ['global']['Strength']['weaker']['$tmp41'] instanceof Object ? $Γ['global']['Strength']['weaker']['$tmp41'].Σ = $lub($Γ['global']['Strength']['weaker']['$tmp41'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['Strength']['weaker']['$tmp41'] = $lub($Γ['global']['Strength']['weaker']['$tmp41'], $Λ[$Λ.length - 1].l);
    $tmp39 = $tmp40 > $tmp41;
    $Γ['global']['Strength']['weaker']['$tmp39'] = $lub(sec_lvl('$tmp40', null, true, $Γ['global']['Strength']['weaker']), sec_lvl('$tmp41', null, true, $Γ['global']['Strength']['weaker']));
    $Γ['global']['Strength']['weaker']['$tmp39'] instanceof Object ? $Γ['global']['Strength']['weaker']['$tmp39'].Σ = $lub($Γ['global']['Strength']['weaker']['$tmp39'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['Strength']['weaker']['$tmp39'] = $lub($Γ['global']['Strength']['weaker']['$tmp39'], $Λ[$Λ.length - 1].l);
    return $tmp39;
};
$Γ['global']['Strength']['weaker'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    s1: $Λ[$Λ.length - 1].l,
    s2: $Λ[$Λ.length - 1].l
};
Strength.weakestOf = function (s1, s2) {
    var $tmp42, $tmp303;
    $Γ['global']['Strength']['weakestOf']['$tmp303'] = $Γ['global']['Strength']['weakestOf']['$tmp42'] = 0;
    $rf = $prop('Strength', 'weaker', $Γ['global']['Strength']['weakestOf']);
    $rf.scope = $Γ['global']['Strength']['weakestOf'];
    $rf.$this = $Γ['global']['Strength']['weakestOf']['$this'];
    $rf['s1'] = $lub(sec_lvl('s1', null, true, $Γ['global']['Strength']['weakestOf']), $Λ[$Λ.length - 1].l);
    $rf['s2'] = $lub(sec_lvl('s2', null, true, $Γ['global']['Strength']['weakestOf']), $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp303 = this.weaker(s1, s2);
    $Γ['global']['Strength']['weakestOf']['$tmp303'] = $Λ.pop().l;
    $Γ['global']['Strength']['weakestOf']['$tmp303'] instanceof Object ? $Γ['global']['Strength']['weakestOf']['$tmp303'].Σ = $lub($Γ['global']['Strength']['weakestOf']['$tmp303'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['Strength']['weakestOf']['$tmp303'] = $lub($Γ['global']['Strength']['weakestOf']['$tmp303'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp303', null, true, $Γ['global']['Strength']['weakestOf'])),
        id: 'IF'
    });
    if ($tmp303) {
        $tmp42 = s1;
        $Γ['global']['Strength']['weakestOf']['$tmp42'] = sec_lvl('s1', null, false, $Γ['global']['Strength']['weakestOf']);
        $Γ['global']['Strength']['weakestOf']['$tmp42'] instanceof Object ? $Γ['global']['Strength']['weakestOf']['$tmp42'].Σ = $lub($Γ['global']['Strength']['weakestOf']['$tmp42'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['Strength']['weakestOf']['$tmp42'] = $lub($Γ['global']['Strength']['weakestOf']['$tmp42'], $Λ[$Λ.length - 1].l);
    } else {
        $tmp42 = s2;
        $Γ['global']['Strength']['weakestOf']['$tmp42'] = sec_lvl('s2', null, false, $Γ['global']['Strength']['weakestOf']);
        $Γ['global']['Strength']['weakestOf']['$tmp42'] instanceof Object ? $Γ['global']['Strength']['weakestOf']['$tmp42'].Σ = $lub($Γ['global']['Strength']['weakestOf']['$tmp42'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['Strength']['weakestOf']['$tmp42'] = $lub($Γ['global']['Strength']['weakestOf']['$tmp42'], $Λ[$Λ.length - 1].l);
    }
    $Λ.pop();
    return $tmp42;
};
$Γ['global']['Strength']['weakestOf'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    s1: $Λ[$Λ.length - 1].l,
    s2: $Λ[$Λ.length - 1].l
};
Strength.strongest = function (s1, s2) {
    var $tmp43, $tmp304;
    $Γ['global']['Strength']['strongest']['$tmp304'] = $Γ['global']['Strength']['strongest']['$tmp43'] = 0;
    $rf = $prop('Strength', 'stronger', $Γ['global']['Strength']['strongest']);
    $rf.scope = $Γ['global']['Strength']['strongest'];
    $rf.$this = $Γ['global']['Strength']['strongest']['$this'];
    $rf['s1'] = $lub(sec_lvl('s1', null, true, $Γ['global']['Strength']['strongest']), $Λ[$Λ.length - 1].l);
    $rf['s2'] = $lub(sec_lvl('s2', null, true, $Γ['global']['Strength']['strongest']), $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp304 = this.stronger(s1, s2);
    $Γ['global']['Strength']['strongest']['$tmp304'] = $Λ.pop().l;
    $Γ['global']['Strength']['strongest']['$tmp304'] instanceof Object ? $Γ['global']['Strength']['strongest']['$tmp304'].Σ = $lub($Γ['global']['Strength']['strongest']['$tmp304'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['Strength']['strongest']['$tmp304'] = $lub($Γ['global']['Strength']['strongest']['$tmp304'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp304', null, true, $Γ['global']['Strength']['strongest'])),
        id: 'IF'
    });
    if ($tmp304) {
        $tmp43 = s1;
        $Γ['global']['Strength']['strongest']['$tmp43'] = sec_lvl('s1', null, false, $Γ['global']['Strength']['strongest']);
        $Γ['global']['Strength']['strongest']['$tmp43'] instanceof Object ? $Γ['global']['Strength']['strongest']['$tmp43'].Σ = $lub($Γ['global']['Strength']['strongest']['$tmp43'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['Strength']['strongest']['$tmp43'] = $lub($Γ['global']['Strength']['strongest']['$tmp43'], $Λ[$Λ.length - 1].l);
    } else {
        $tmp43 = s2;
        $Γ['global']['Strength']['strongest']['$tmp43'] = sec_lvl('s2', null, false, $Γ['global']['Strength']['strongest']);
        $Γ['global']['Strength']['strongest']['$tmp43'] instanceof Object ? $Γ['global']['Strength']['strongest']['$tmp43'].Σ = $lub($Γ['global']['Strength']['strongest']['$tmp43'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['Strength']['strongest']['$tmp43'] = $lub($Γ['global']['Strength']['strongest']['$tmp43'], $Λ[$Λ.length - 1].l);
    }
    $Λ.pop();
    return $tmp43;
};
$Γ['global']['Strength']['strongest'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    s1: $Λ[$Λ.length - 1].l,
    s2: $Λ[$Λ.length - 1].l
};
$tmp2 = Strength.prototype;
$Γ['global']['$tmp2'] = sec_lvl('Strength', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp2'] instanceof Object ? $Γ['global']['$tmp2'].Σ = $lub($Γ['global']['$tmp2'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp2'] = $lub($Γ['global']['$tmp2'], $Λ[$Λ.length - 1].l);
$tmp2.nextWeaker = function () {
    switch (this.strengthValue) {
        case 0:
            return Strength.WEAKEST;
        case 1:
            return Strength.WEAK_DEFAULT;
        case 2:
            return Strength.NORMAL;
        case 3:
            return Strength.STRONG_DEFAULT;
        case 4:
            return Strength.PREFERRED;
        case 5:
            return Strength.REQUIRED;
    }
    return;
};
$Γ['global']['$tmp2']['nextWeaker'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$rf = $scope($Γ['global'], 'Strength', false)['Strength'];
$rf.scope = $Γ['global'];
$rf.$this = {
    Σ: $Λ[$Λ.length - 1].l,
    __$proto__: $rf.prototype
};
$rf['strengthValue'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
$rf['name'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
$rf.InvokedAsContr = true;
$Λ.push({
    l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
    id: 'FUNC'
});
Strength.REQUIRED = new Strength(0, 'required');
$Γ['global']['Strength']['REQUIRED'] = $Λ.pop().l;
$Γ['global']['Strength']['REQUIRED'] instanceof Object ? $Γ['global']['Strength']['REQUIRED'].Σ = $lub($Γ['global']['Strength']['REQUIRED'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['Strength']['REQUIRED'] = $lub($Γ['global']['Strength']['REQUIRED'], $Λ[$Λ.length - 1].l);
$rf = $scope($Γ['global'], 'Strength', false)['Strength'];
$rf.scope = $Γ['global'];
$rf.$this = {
    Σ: $Λ[$Λ.length - 1].l,
    __$proto__: $rf.prototype
};
$rf['strengthValue'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
$rf['name'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
$rf.InvokedAsContr = true;
$Λ.push({
    l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
    id: 'FUNC'
});
Strength.STONG_PREFERRED = new Strength(1, 'strongPreferred');
$Γ['global']['Strength']['STONG_PREFERRED'] = $Λ.pop().l;
$Γ['global']['Strength']['STONG_PREFERRED'] instanceof Object ? $Γ['global']['Strength']['STONG_PREFERRED'].Σ = $lub($Γ['global']['Strength']['STONG_PREFERRED'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['Strength']['STONG_PREFERRED'] = $lub($Γ['global']['Strength']['STONG_PREFERRED'], $Λ[$Λ.length - 1].l);
$rf = $scope($Γ['global'], 'Strength', false)['Strength'];
$rf.scope = $Γ['global'];
$rf.$this = {
    Σ: $Λ[$Λ.length - 1].l,
    __$proto__: $rf.prototype
};
$rf['strengthValue'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
$rf['name'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
$rf.InvokedAsContr = true;
$Λ.push({
    l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
    id: 'FUNC'
});
Strength.PREFERRED = new Strength(2, 'preferred');
$Γ['global']['Strength']['PREFERRED'] = $Λ.pop().l;
$Γ['global']['Strength']['PREFERRED'] instanceof Object ? $Γ['global']['Strength']['PREFERRED'].Σ = $lub($Γ['global']['Strength']['PREFERRED'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['Strength']['PREFERRED'] = $lub($Γ['global']['Strength']['PREFERRED'], $Λ[$Λ.length - 1].l);
$rf = $scope($Γ['global'], 'Strength', false)['Strength'];
$rf.scope = $Γ['global'];
$rf.$this = {
    Σ: $Λ[$Λ.length - 1].l,
    __$proto__: $rf.prototype
};
$rf['strengthValue'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
$rf['name'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
$rf.InvokedAsContr = true;
$Λ.push({
    l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
    id: 'FUNC'
});
Strength.STRONG_DEFAULT = new Strength(3, 'strongDefault');
$Γ['global']['Strength']['STRONG_DEFAULT'] = $Λ.pop().l;
$Γ['global']['Strength']['STRONG_DEFAULT'] instanceof Object ? $Γ['global']['Strength']['STRONG_DEFAULT'].Σ = $lub($Γ['global']['Strength']['STRONG_DEFAULT'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['Strength']['STRONG_DEFAULT'] = $lub($Γ['global']['Strength']['STRONG_DEFAULT'], $Λ[$Λ.length - 1].l);
$rf = $scope($Γ['global'], 'Strength', false)['Strength'];
$rf.scope = $Γ['global'];
$rf.$this = {
    Σ: $Λ[$Λ.length - 1].l,
    __$proto__: $rf.prototype
};
$rf['strengthValue'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
$rf['name'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
$rf.InvokedAsContr = true;
$Λ.push({
    l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
    id: 'FUNC'
});
Strength.NORMAL = new Strength(4, 'normal');
$Γ['global']['Strength']['NORMAL'] = $Λ.pop().l;
$Γ['global']['Strength']['NORMAL'] instanceof Object ? $Γ['global']['Strength']['NORMAL'].Σ = $lub($Γ['global']['Strength']['NORMAL'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['Strength']['NORMAL'] = $lub($Γ['global']['Strength']['NORMAL'], $Λ[$Λ.length - 1].l);
$rf = $scope($Γ['global'], 'Strength', false)['Strength'];
$rf.scope = $Γ['global'];
$rf.$this = {
    Σ: $Λ[$Λ.length - 1].l,
    __$proto__: $rf.prototype
};
$rf['strengthValue'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
$rf['name'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
$rf.InvokedAsContr = true;
$Λ.push({
    l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
    id: 'FUNC'
});
Strength.WEAK_DEFAULT = new Strength(5, 'weakDefault');
$Γ['global']['Strength']['WEAK_DEFAULT'] = $Λ.pop().l;
$Γ['global']['Strength']['WEAK_DEFAULT'] instanceof Object ? $Γ['global']['Strength']['WEAK_DEFAULT'].Σ = $lub($Γ['global']['Strength']['WEAK_DEFAULT'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['Strength']['WEAK_DEFAULT'] = $lub($Γ['global']['Strength']['WEAK_DEFAULT'], $Λ[$Λ.length - 1].l);
$rf = $scope($Γ['global'], 'Strength', false)['Strength'];
$rf.scope = $Γ['global'];
$rf.$this = {
    Σ: $Λ[$Λ.length - 1].l,
    __$proto__: $rf.prototype
};
$rf['strengthValue'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
$rf['name'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
$rf.InvokedAsContr = true;
$Λ.push({
    l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
    id: 'FUNC'
});
Strength.WEAKEST = new Strength(6, 'weakest');
$Γ['global']['Strength']['WEAKEST'] = $Λ.pop().l;
$Γ['global']['Strength']['WEAKEST'] instanceof Object ? $Γ['global']['Strength']['WEAKEST'].Σ = $lub($Γ['global']['Strength']['WEAKEST'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['Strength']['WEAKEST'] = $lub($Γ['global']['Strength']['WEAKEST'], $Λ[$Λ.length - 1].l);
function Constraint(strength) {
    this.strength = strength;
    $Γ['global']['Constraint']['$this']['strength'] = sec_lvl('strength', null, false, $Γ['global']['Constraint']);
    $Γ['global']['Constraint']['$this']['strength'] instanceof Object ? $Γ['global']['Constraint']['$this']['strength'].Σ = $lub($Γ['global']['Constraint']['$this']['strength'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['Constraint']['$this']['strength'] = $lub($Γ['global']['Constraint']['$this']['strength'], $Λ[$Λ.length - 1].l);
    return;
}
$tmp3 = Constraint.prototype;
$Γ['global']['$tmp3'] = sec_lvl('Constraint', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp3'] instanceof Object ? $Γ['global']['$tmp3'].Σ = $lub($Γ['global']['$tmp3'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp3'] = $lub($Γ['global']['$tmp3'], $Λ[$Λ.length - 1].l);
$tmp3.addConstraint = function () {
    var $tmp44, $tmp45, $tmp46;
    $Γ['global']['$tmp3']['addConstraint']['$tmp46'] = $Γ['global']['$tmp3']['addConstraint']['$tmp45'] = $Γ['global']['$tmp3']['addConstraint']['$tmp44'] = 0;
    $tmp44 = this.addToGraph();
    $tmp46 = this;
    $Γ['global']['$tmp3']['addConstraint']['$tmp46'] = $Γ['global']['$tmp3']['addConstraint'].$this;
    $Γ['global']['$tmp3']['addConstraint']['$tmp46'] instanceof Object ? $Γ['global']['$tmp3']['addConstraint']['$tmp46'].Σ = $lub($Γ['global']['$tmp3']['addConstraint']['$tmp46'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp3']['addConstraint']['$tmp46'] = $lub($Γ['global']['$tmp3']['addConstraint']['$tmp46'], $Λ[$Λ.length - 1].l);
    $rf = $prop('planner', 'incrementalAdd', $Γ['global']['$tmp3']['addConstraint']);
    $rf.scope = $Γ['global']['$tmp3']['addConstraint'];
    $rf.$this = $scope($Γ['global']['$tmp3']['addConstraint'], 'planner', false)['planner'];
    $rf['c'] = $lub(sec_lvl('$tmp46', null, true, $Γ['global']['$tmp3']['addConstraint']), $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp45 = planner.incrementalAdd($tmp46);
    $Γ['global']['$tmp3']['addConstraint']['$tmp45'] = $Λ.pop().l;
    $Γ['global']['$tmp3']['addConstraint']['$tmp45'] instanceof Object ? $Γ['global']['$tmp3']['addConstraint']['$tmp45'].Σ = $lub($Γ['global']['$tmp3']['addConstraint']['$tmp45'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp3']['addConstraint']['$tmp45'] = $lub($Γ['global']['$tmp3']['addConstraint']['$tmp45'], $Λ[$Λ.length - 1].l);
    return;
};
$Γ['global']['$tmp3']['addConstraint'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$tmp3 = Constraint.prototype;
$Γ['global']['$tmp3'] = sec_lvl('Constraint', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp3'] instanceof Object ? $Γ['global']['$tmp3'].Σ = $lub($Γ['global']['$tmp3'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp3'] = $lub($Γ['global']['$tmp3'], $Λ[$Λ.length - 1].l);
$tmp3.satisfy = function (mark) {
    var $tmp47, $tmp48, $tmp49, $tmp50, out, overridden, $tmp51, $tmp52, $tmp53, $tmp54;
    $Γ['global']['$tmp3']['satisfy']['$tmp54'] = $Γ['global']['$tmp3']['satisfy']['$tmp53'] = $Γ['global']['$tmp3']['satisfy']['$tmp52'] = $Γ['global']['$tmp3']['satisfy']['$tmp51'] = $Γ['global']['$tmp3']['satisfy']['overridden'] = $Γ['global']['$tmp3']['satisfy']['out'] = $Γ['global']['$tmp3']['satisfy']['$tmp50'] = $Γ['global']['$tmp3']['satisfy']['$tmp49'] = $Γ['global']['$tmp3']['satisfy']['$tmp48'] = $Γ['global']['$tmp3']['satisfy']['$tmp47'] = 0;
    $tmp47 = this.chooseMethod(mark);
    $tmp49 = this.isSatisfied();
    $tmp48 = !$tmp49;
    $Γ['global']['$tmp3']['satisfy']['$tmp48'] = sec_lvl('$tmp49', null, false, $Γ['global']['$tmp3']['satisfy']);
    $Γ['global']['$tmp3']['satisfy']['$tmp48'] instanceof Object ? $Γ['global']['$tmp3']['satisfy']['$tmp48'].Σ = $lub($Γ['global']['$tmp3']['satisfy']['$tmp48'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp3']['satisfy']['$tmp48'] = $lub($Γ['global']['$tmp3']['satisfy']['$tmp48'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp48', null, true, $Γ['global']['$tmp3']['satisfy'])),
        id: 'IF'
    });
    if ($tmp48) {
        var $tmp55, $tmp56, $tmp57, $tmp58;
        $Γ['global']['$tmp3']['satisfy']['$tmp58'] = $Γ['global']['$tmp3']['satisfy']['$tmp57'] = $Γ['global']['$tmp3']['satisfy']['$tmp56'] = $Γ['global']['$tmp3']['satisfy']['$tmp55'] = 0;
        $tmp56 = this.strength;
        $Γ['global']['$tmp3']['satisfy']['$tmp56'] = sec_lvl('$tmp3', 'strength', false, $Γ['global']['$tmp3']['satisfy']);
        $Γ['global']['$tmp3']['satisfy']['$tmp56'] instanceof Object ? $Γ['global']['$tmp3']['satisfy']['$tmp56'].Σ = $lub($Γ['global']['$tmp3']['satisfy']['$tmp56'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp3']['satisfy']['$tmp56'] = $lub($Γ['global']['$tmp3']['satisfy']['$tmp56'], $Λ[$Λ.length - 1].l);
        $tmp57 = Strength.REQUIRED;
        $Γ['global']['$tmp3']['satisfy']['$tmp57'] = sec_lvl('Strength', 'REQUIRED', false, $Γ['global']['$tmp3']['satisfy']);
        $Γ['global']['$tmp3']['satisfy']['$tmp57'] instanceof Object ? $Γ['global']['$tmp3']['satisfy']['$tmp57'].Σ = $lub($Γ['global']['$tmp3']['satisfy']['$tmp57'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp3']['satisfy']['$tmp57'] = $lub($Γ['global']['$tmp3']['satisfy']['$tmp57'], $Λ[$Λ.length - 1].l);
        $tmp55 = $tmp56 == $tmp57;
        $Γ['global']['$tmp3']['satisfy']['$tmp55'] = $lub(sec_lvl('$tmp56', null, true, $Γ['global']['$tmp3']['satisfy']), sec_lvl('$tmp57', null, true, $Γ['global']['$tmp3']['satisfy']));
        $Γ['global']['$tmp3']['satisfy']['$tmp55'] instanceof Object ? $Γ['global']['$tmp3']['satisfy']['$tmp55'].Σ = $lub($Γ['global']['$tmp3']['satisfy']['$tmp55'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp3']['satisfy']['$tmp55'] = $lub($Γ['global']['$tmp3']['satisfy']['$tmp55'], $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp55', null, true, $Γ['global']['$tmp3']['satisfy'])),
            id: 'IF'
        });
        if ($tmp55) {
            var $tmp305;
            $Γ['global']['$tmp3']['satisfy']['$tmp305'] = 0;
            $tmp305 = alert('Could not satisfy a required constraint!');
        } else {
            $upgrade([
                'alert',
                '$tmp305'
            ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp3']['satisfy']);
        }
        $Λ.pop();
        $tmp58 = null;
        $Γ['global']['$tmp3']['satisfy']['$tmp58'] = $Λ[$Λ.length - 1].l;
        return $tmp58;
        var $shouldComp = { 'lbl': 'FUNC' };
    } else {
        $upgrade([
            'alert',
            '$tmp305'
        ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp3']['satisfy']);
    }
    if ($shouldComp)
        $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
    $Λ.pop();
    $tmp50 = this.markInputs(mark);
    out = this.output();
    overridden = out.determinedBy;
    $scope($Γ['global']['$tmp3']['satisfy'], 'overridden', true)['overridden'] = sec_lvl('out', 'determinedBy', false, $Γ['global']['$tmp3']['satisfy']);
    $scope($Γ['global']['$tmp3']['satisfy'], 'overridden', true)['overridden'] instanceof Object ? $scope($Γ['global']['$tmp3']['satisfy'], 'overridden', true)['overridden'].Σ = $lub($scope($Γ['global']['$tmp3']['satisfy'], 'overridden', true)['overridden'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp3']['satisfy'], 'overridden', true)['overridden'] = $lub($scope($Γ['global']['$tmp3']['satisfy'], 'overridden', true)['overridden'], $Λ[$Λ.length - 1].l);
    $tmp51 = overridden != null;
    $Γ['global']['$tmp3']['satisfy']['$tmp51'] = $lub(sec_lvl('overridden', null, true, $Γ['global']['$tmp3']['satisfy']), $Λ[$Λ.length - 1].l);
    $Γ['global']['$tmp3']['satisfy']['$tmp51'] instanceof Object ? $Γ['global']['$tmp3']['satisfy']['$tmp51'].Σ = $lub($Γ['global']['$tmp3']['satisfy']['$tmp51'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp3']['satisfy']['$tmp51'] = $lub($Γ['global']['$tmp3']['satisfy']['$tmp51'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp51', null, true, $Γ['global']['$tmp3']['satisfy'])),
        id: 'IF'
    });
    if ($tmp51) {
        var $tmp306;
        $Γ['global']['$tmp3']['satisfy']['$tmp306'] = 0;
        $tmp306 = overridden.markUnsatisfied();
    } else {
        $upgrade([
            'overridden.markUnsatisfied',
            '$tmp306'
        ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp3']['satisfy']);
    }
    $Λ.pop();
    out.determinedBy = this;
    $scope($Γ['global']['$tmp3']['satisfy'], 'out', false)['determinedBy'] = $Γ['global']['$tmp3']['satisfy'].$this;
    $scope($Γ['global']['$tmp3']['satisfy'], 'out', false)['determinedBy'] instanceof Object ? $scope($Γ['global']['$tmp3']['satisfy'], 'out', false)['determinedBy'].Σ = $lub($scope($Γ['global']['$tmp3']['satisfy'], 'out', false)['determinedBy'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp3']['satisfy'], 'out', false)['determinedBy'] = $lub($scope($Γ['global']['$tmp3']['satisfy'], 'out', false)['determinedBy'], $Λ[$Λ.length - 1].l);
    $tmp54 = this;
    $Γ['global']['$tmp3']['satisfy']['$tmp54'] = $Γ['global']['$tmp3']['satisfy'].$this;
    $Γ['global']['$tmp3']['satisfy']['$tmp54'] instanceof Object ? $Γ['global']['$tmp3']['satisfy']['$tmp54'].Σ = $lub($Γ['global']['$tmp3']['satisfy']['$tmp54'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp3']['satisfy']['$tmp54'] = $lub($Γ['global']['$tmp3']['satisfy']['$tmp54'], $Λ[$Λ.length - 1].l);
    $rf = $prop('planner', 'addPropagate', $Γ['global']['$tmp3']['satisfy']);
    $rf.scope = $Γ['global']['$tmp3']['satisfy'];
    $rf.$this = $scope($Γ['global']['$tmp3']['satisfy'], 'planner', false)['planner'];
    $rf['c'] = $lub(sec_lvl('$tmp54', null, true, $Γ['global']['$tmp3']['satisfy']), $Λ[$Λ.length - 1].l);
    $rf['mark'] = $lub(sec_lvl('mark', null, true, $Γ['global']['$tmp3']['satisfy']), $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp53 = planner.addPropagate($tmp54, mark);
    $Γ['global']['$tmp3']['satisfy']['$tmp53'] = $Λ.pop().l;
    $Γ['global']['$tmp3']['satisfy']['$tmp53'] instanceof Object ? $Γ['global']['$tmp3']['satisfy']['$tmp53'].Σ = $lub($Γ['global']['$tmp3']['satisfy']['$tmp53'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp3']['satisfy']['$tmp53'] = $lub($Γ['global']['$tmp3']['satisfy']['$tmp53'], $Λ[$Λ.length - 1].l);
    $tmp52 = !$tmp53;
    $Γ['global']['$tmp3']['satisfy']['$tmp52'] = sec_lvl('$tmp53', null, false, $Γ['global']['$tmp3']['satisfy']);
    $Γ['global']['$tmp3']['satisfy']['$tmp52'] instanceof Object ? $Γ['global']['$tmp3']['satisfy']['$tmp52'].Σ = $lub($Γ['global']['$tmp3']['satisfy']['$tmp52'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp3']['satisfy']['$tmp52'] = $lub($Γ['global']['$tmp3']['satisfy']['$tmp52'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp52', null, true, $Γ['global']['$tmp3']['satisfy'])),
        id: 'IF'
    });
    if ($tmp52) {
        var $tmp307;
        $Γ['global']['$tmp3']['satisfy']['$tmp307'] = 0;
        $tmp307 = alert('Cycle encountered');
    } else {
        $upgrade([
            'alert',
            '$tmp307'
        ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp3']['satisfy']);
    }
    $Λ.pop();
    out.mark = mark;
    $scope($Γ['global']['$tmp3']['satisfy'], 'out', false)['mark'] = sec_lvl('mark', null, false, $Γ['global']['$tmp3']['satisfy']);
    $scope($Γ['global']['$tmp3']['satisfy'], 'out', false)['mark'] instanceof Object ? $scope($Γ['global']['$tmp3']['satisfy'], 'out', false)['mark'].Σ = $lub($scope($Γ['global']['$tmp3']['satisfy'], 'out', false)['mark'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp3']['satisfy'], 'out', false)['mark'] = $lub($scope($Γ['global']['$tmp3']['satisfy'], 'out', false)['mark'], $Λ[$Λ.length - 1].l);
    return overridden;
};
$Γ['global']['$tmp3']['satisfy'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    mark: $Λ[$Λ.length - 1].l
};
$tmp3 = Constraint.prototype;
$Γ['global']['$tmp3'] = sec_lvl('Constraint', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp3'] instanceof Object ? $Γ['global']['$tmp3'].Σ = $lub($Γ['global']['$tmp3'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp3'] = $lub($Γ['global']['$tmp3'], $Λ[$Λ.length - 1].l);
$tmp3.destroyConstraint = function () {
    var $tmp59;
    $Γ['global']['$tmp3']['destroyConstraint']['$tmp59'] = 0;
    $tmp59 = this.isSatisfied();
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp59', null, true, $Γ['global']['$tmp3']['destroyConstraint'])),
        id: 'IF'
    });
    if ($tmp59) {
        $upgrade([
            'this.removeFromGraph',
            '$tmp310'
        ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp3']['destroyConstraint']);
        var $tmp308, $tmp309;
        $Γ['global']['$tmp3']['destroyConstraint']['$tmp309'] = $Γ['global']['$tmp3']['destroyConstraint']['$tmp308'] = 0;
        $tmp309 = this;
        $Γ['global']['$tmp3']['destroyConstraint']['$tmp309'] = $Γ['global']['$tmp3']['destroyConstraint'].$this;
        $Γ['global']['$tmp3']['destroyConstraint']['$tmp309'] instanceof Object ? $Γ['global']['$tmp3']['destroyConstraint']['$tmp309'].Σ = $lub($Γ['global']['$tmp3']['destroyConstraint']['$tmp309'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp3']['destroyConstraint']['$tmp309'] = $lub($Γ['global']['$tmp3']['destroyConstraint']['$tmp309'], $Λ[$Λ.length - 1].l);
        $rf = $prop('planner', 'incrementalRemove', $Γ['global']['$tmp3']['destroyConstraint']);
        $rf.scope = $Γ['global']['$tmp3']['destroyConstraint'];
        $rf.$this = $scope($Γ['global']['$tmp3']['destroyConstraint'], 'planner', false)['planner'];
        $rf['c'] = $lub(sec_lvl('$tmp309', null, true, $Γ['global']['$tmp3']['destroyConstraint']), $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
            id: 'FUNC'
        });
        $tmp308 = planner.incrementalRemove($tmp309);
        $Γ['global']['$tmp3']['destroyConstraint']['$tmp308'] = $Λ.pop().l;
        $Γ['global']['$tmp3']['destroyConstraint']['$tmp308'] instanceof Object ? $Γ['global']['$tmp3']['destroyConstraint']['$tmp308'].Σ = $lub($Γ['global']['$tmp3']['destroyConstraint']['$tmp308'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp3']['destroyConstraint']['$tmp308'] = $lub($Γ['global']['$tmp3']['destroyConstraint']['$tmp308'], $Λ[$Λ.length - 1].l);
    } else {
        $upgrade(['$tmp308'], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp3']['destroyConstraint']);
        var $tmp310;
        $Γ['global']['$tmp3']['destroyConstraint']['$tmp310'] = 0;
        $tmp310 = this.removeFromGraph();
    }
    $Λ.pop();
    return;
};
$Γ['global']['$tmp3']['destroyConstraint'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$tmp3 = Constraint.prototype;
$Γ['global']['$tmp3'] = sec_lvl('Constraint', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp3'] instanceof Object ? $Γ['global']['$tmp3'].Σ = $lub($Γ['global']['$tmp3'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp3'] = $lub($Γ['global']['$tmp3'], $Λ[$Λ.length - 1].l);
$tmp3.isInput = function () {
    var $tmp60;
    $Γ['global']['$tmp3']['isInput']['$tmp60'] = 0;
    $tmp60 = false;
    $Γ['global']['$tmp3']['isInput']['$tmp60'] = $Λ[$Λ.length - 1].l;
    return $tmp60;
};
$Γ['global']['$tmp3']['isInput'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
function UnaryConstraint(v, strength) {
    var $tmp61, $tmp62, $tmp63, $tmp64;
    $Γ['global']['UnaryConstraint']['$tmp64'] = $Γ['global']['UnaryConstraint']['$tmp63'] = $Γ['global']['UnaryConstraint']['$tmp62'] = $Γ['global']['UnaryConstraint']['$tmp61'] = 0;
    $tmp62 = UnaryConstraint.superConstructor;
    $Γ['global']['UnaryConstraint']['$tmp62'] = sec_lvl('UnaryConstraint', 'superConstructor', false, $Γ['global']['UnaryConstraint']);
    $Γ['global']['UnaryConstraint']['$tmp62'] instanceof Object ? $Γ['global']['UnaryConstraint']['$tmp62'].Σ = $lub($Γ['global']['UnaryConstraint']['$tmp62'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['UnaryConstraint']['$tmp62'] = $lub($Γ['global']['UnaryConstraint']['$tmp62'], $Λ[$Λ.length - 1].l);
    $tmp63 = this;
    $Γ['global']['UnaryConstraint']['$tmp63'] = $Γ['global']['UnaryConstraint'].$this;
    $Γ['global']['UnaryConstraint']['$tmp63'] instanceof Object ? $Γ['global']['UnaryConstraint']['$tmp63'].Σ = $lub($Γ['global']['UnaryConstraint']['$tmp63'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['UnaryConstraint']['$tmp63'] = $lub($Γ['global']['UnaryConstraint']['$tmp63'], $Λ[$Λ.length - 1].l);
    $tmp61 = $tmp62.call($tmp63, strength);
    this.myOutput = v;
    $Γ['global']['UnaryConstraint']['$this']['myOutput'] = sec_lvl('v', null, false, $Γ['global']['UnaryConstraint']);
    $Γ['global']['UnaryConstraint']['$this']['myOutput'] instanceof Object ? $Γ['global']['UnaryConstraint']['$this']['myOutput'].Σ = $lub($Γ['global']['UnaryConstraint']['$this']['myOutput'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['UnaryConstraint']['$this']['myOutput'] = $lub($Γ['global']['UnaryConstraint']['$this']['myOutput'], $Λ[$Λ.length - 1].l);
    this.satisfied = false;
    $Γ['global']['UnaryConstraint']['$this']['satisfied'] = $Λ[$Λ.length - 1].l;
    $tmp64 = this.addConstraint();
    return;
}
$tmp4 = UnaryConstraint.inheritsFrom(Constraint);
$tmp5 = UnaryConstraint.prototype;
$Γ['global']['$tmp5'] = sec_lvl('UnaryConstraint', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp5'] instanceof Object ? $Γ['global']['$tmp5'].Σ = $lub($Γ['global']['$tmp5'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5'] = $lub($Γ['global']['$tmp5'], $Λ[$Λ.length - 1].l);
$tmp5.addToGraph = function () {
    var $tmp65, $tmp66, $tmp67;
    $Γ['global']['$tmp5']['addToGraph']['$tmp67'] = $Γ['global']['$tmp5']['addToGraph']['$tmp66'] = $Γ['global']['$tmp5']['addToGraph']['$tmp65'] = 0;
    $tmp66 = this.myOutput;
    $Γ['global']['$tmp5']['addToGraph']['$tmp66'] = sec_lvl('$tmp5', 'myOutput', false, $Γ['global']['$tmp5']['addToGraph']);
    $Γ['global']['$tmp5']['addToGraph']['$tmp66'] instanceof Object ? $Γ['global']['$tmp5']['addToGraph']['$tmp66'].Σ = $lub($Γ['global']['$tmp5']['addToGraph']['$tmp66'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['addToGraph']['$tmp66'] = $lub($Γ['global']['$tmp5']['addToGraph']['$tmp66'], $Λ[$Λ.length - 1].l);
    $tmp67 = this;
    $Γ['global']['$tmp5']['addToGraph']['$tmp67'] = $Γ['global']['$tmp5']['addToGraph'].$this;
    $Γ['global']['$tmp5']['addToGraph']['$tmp67'] instanceof Object ? $Γ['global']['$tmp5']['addToGraph']['$tmp67'].Σ = $lub($Γ['global']['$tmp5']['addToGraph']['$tmp67'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['addToGraph']['$tmp67'] = $lub($Γ['global']['$tmp5']['addToGraph']['$tmp67'], $Λ[$Λ.length - 1].l);
    $tmp65 = $tmp66.addConstraint($tmp67);
    this.satisfied = false;
    $Γ['global']['$tmp5']['addToGraph']['$this']['satisfied'] = $Λ[$Λ.length - 1].l;
    return;
};
$Γ['global']['$tmp5']['addToGraph'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$tmp5 = UnaryConstraint.prototype;
$Γ['global']['$tmp5'] = sec_lvl('UnaryConstraint', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp5'] instanceof Object ? $Γ['global']['$tmp5'].Σ = $lub($Γ['global']['$tmp5'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5'] = $lub($Γ['global']['$tmp5'], $Λ[$Λ.length - 1].l);
$tmp5.chooseMethod = function (mark) {
    var $tmp68, $tmp69, $tmp66, $tmp70, $tmp71, $tmp72;
    $Γ['global']['$tmp5']['chooseMethod']['$tmp72'] = $Γ['global']['$tmp5']['chooseMethod']['$tmp71'] = $Γ['global']['$tmp5']['chooseMethod']['$tmp70'] = $Γ['global']['$tmp5']['chooseMethod']['$tmp66'] = $Γ['global']['$tmp5']['chooseMethod']['$tmp69'] = $Γ['global']['$tmp5']['chooseMethod']['$tmp68'] = 0;
    $tmp66 = this.myOutput;
    $Γ['global']['$tmp5']['chooseMethod']['$tmp66'] = sec_lvl('$tmp5', 'myOutput', false, $Γ['global']['$tmp5']['chooseMethod']);
    $Γ['global']['$tmp5']['chooseMethod']['$tmp66'] instanceof Object ? $Γ['global']['$tmp5']['chooseMethod']['$tmp66'].Σ = $lub($Γ['global']['$tmp5']['chooseMethod']['$tmp66'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['chooseMethod']['$tmp66'] = $lub($Γ['global']['$tmp5']['chooseMethod']['$tmp66'], $Λ[$Λ.length - 1].l);
    $tmp69 = $tmp66.mark;
    $Γ['global']['$tmp5']['chooseMethod']['$tmp69'] = sec_lvl('$tmp66', 'mark', false, $Γ['global']['$tmp5']['chooseMethod']);
    $Γ['global']['$tmp5']['chooseMethod']['$tmp69'] instanceof Object ? $Γ['global']['$tmp5']['chooseMethod']['$tmp69'].Σ = $lub($Γ['global']['$tmp5']['chooseMethod']['$tmp69'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['chooseMethod']['$tmp69'] = $lub($Γ['global']['$tmp5']['chooseMethod']['$tmp69'], $Λ[$Λ.length - 1].l);
    $tmp68 = $tmp69 != mark;
    $Γ['global']['$tmp5']['chooseMethod']['$tmp68'] = $lub(sec_lvl('$tmp69', null, true, $Γ['global']['$tmp5']['chooseMethod']), sec_lvl('mark', null, true, $Γ['global']['$tmp5']['chooseMethod']));
    $Γ['global']['$tmp5']['chooseMethod']['$tmp68'] instanceof Object ? $Γ['global']['$tmp5']['chooseMethod']['$tmp68'].Σ = $lub($Γ['global']['$tmp5']['chooseMethod']['$tmp68'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['chooseMethod']['$tmp68'] = $lub($Γ['global']['$tmp5']['chooseMethod']['$tmp68'], $Λ[$Λ.length - 1].l);
    $tmp71 = this.strength;
    $Γ['global']['$tmp5']['chooseMethod']['$tmp71'] = sec_lvl('$tmp5', 'strength', false, $Γ['global']['$tmp5']['chooseMethod']);
    $Γ['global']['$tmp5']['chooseMethod']['$tmp71'] instanceof Object ? $Γ['global']['$tmp5']['chooseMethod']['$tmp71'].Σ = $lub($Γ['global']['$tmp5']['chooseMethod']['$tmp71'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['chooseMethod']['$tmp71'] = $lub($Γ['global']['$tmp5']['chooseMethod']['$tmp71'], $Λ[$Λ.length - 1].l);
    $tmp66 = this.myOutput;
    $Γ['global']['$tmp5']['chooseMethod']['$tmp66'] = sec_lvl('$tmp5', 'myOutput', false, $Γ['global']['$tmp5']['chooseMethod']);
    $Γ['global']['$tmp5']['chooseMethod']['$tmp66'] instanceof Object ? $Γ['global']['$tmp5']['chooseMethod']['$tmp66'].Σ = $lub($Γ['global']['$tmp5']['chooseMethod']['$tmp66'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['chooseMethod']['$tmp66'] = $lub($Γ['global']['$tmp5']['chooseMethod']['$tmp66'], $Λ[$Λ.length - 1].l);
    $tmp72 = $tmp66.walkStrength;
    $Γ['global']['$tmp5']['chooseMethod']['$tmp72'] = sec_lvl('$tmp66', 'walkStrength', false, $Γ['global']['$tmp5']['chooseMethod']);
    $Γ['global']['$tmp5']['chooseMethod']['$tmp72'] instanceof Object ? $Γ['global']['$tmp5']['chooseMethod']['$tmp72'].Σ = $lub($Γ['global']['$tmp5']['chooseMethod']['$tmp72'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['chooseMethod']['$tmp72'] = $lub($Γ['global']['$tmp5']['chooseMethod']['$tmp72'], $Λ[$Λ.length - 1].l);
    $rf = $prop('Strength', 'stronger', $Γ['global']['$tmp5']['chooseMethod']);
    $rf.scope = $Γ['global']['$tmp5']['chooseMethod'];
    $rf.$this = $scope($Γ['global']['$tmp5']['chooseMethod'], 'Strength', false)['Strength'];
    $rf['s1'] = $lub(sec_lvl('$tmp71', null, true, $Γ['global']['$tmp5']['chooseMethod']), $Λ[$Λ.length - 1].l);
    $rf['s2'] = $lub(sec_lvl('$tmp72', null, true, $Γ['global']['$tmp5']['chooseMethod']), $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp70 = Strength.stronger($tmp71, $tmp72);
    $Γ['global']['$tmp5']['chooseMethod']['$tmp70'] = $Λ.pop().l;
    $Γ['global']['$tmp5']['chooseMethod']['$tmp70'] instanceof Object ? $Γ['global']['$tmp5']['chooseMethod']['$tmp70'].Σ = $lub($Γ['global']['$tmp5']['chooseMethod']['$tmp70'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['chooseMethod']['$tmp70'] = $lub($Γ['global']['$tmp5']['chooseMethod']['$tmp70'], $Λ[$Λ.length - 1].l);
    this.satisfied = $tmp68 && $tmp70;
    $Γ['global']['$tmp5']['chooseMethod']['$this']['satisfied'] = $lub(sec_lvl('$tmp68', null, true, $Γ['global']['$tmp5']['chooseMethod']), sec_lvl('$tmp70', null, true, $Γ['global']['$tmp5']['chooseMethod']));
    $Γ['global']['$tmp5']['chooseMethod']['$this']['satisfied'] instanceof Object ? $Γ['global']['$tmp5']['chooseMethod']['$this']['satisfied'].Σ = $lub($Γ['global']['$tmp5']['chooseMethod']['$this']['satisfied'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['chooseMethod']['$this']['satisfied'] = $lub($Γ['global']['$tmp5']['chooseMethod']['$this']['satisfied'], $Λ[$Λ.length - 1].l);
    return;
};
$Γ['global']['$tmp5']['chooseMethod'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    mark: $Λ[$Λ.length - 1].l
};
$tmp5 = UnaryConstraint.prototype;
$Γ['global']['$tmp5'] = sec_lvl('UnaryConstraint', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp5'] instanceof Object ? $Γ['global']['$tmp5'].Σ = $lub($Γ['global']['$tmp5'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5'] = $lub($Γ['global']['$tmp5'], $Λ[$Λ.length - 1].l);
$tmp5.isSatisfied = function () {
    var $tmp73;
    $Γ['global']['$tmp5']['isSatisfied']['$tmp73'] = 0;
    $tmp73 = this.satisfied;
    $Γ['global']['$tmp5']['isSatisfied']['$tmp73'] = sec_lvl('$tmp5', 'satisfied', false, $Γ['global']['$tmp5']['isSatisfied']);
    $Γ['global']['$tmp5']['isSatisfied']['$tmp73'] instanceof Object ? $Γ['global']['$tmp5']['isSatisfied']['$tmp73'].Σ = $lub($Γ['global']['$tmp5']['isSatisfied']['$tmp73'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['isSatisfied']['$tmp73'] = $lub($Γ['global']['$tmp5']['isSatisfied']['$tmp73'], $Λ[$Λ.length - 1].l);
    return $tmp73;
};
$Γ['global']['$tmp5']['isSatisfied'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$tmp5 = UnaryConstraint.prototype;
$Γ['global']['$tmp5'] = sec_lvl('UnaryConstraint', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp5'] instanceof Object ? $Γ['global']['$tmp5'].Σ = $lub($Γ['global']['$tmp5'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5'] = $lub($Γ['global']['$tmp5'], $Λ[$Λ.length - 1].l);
$tmp5.markInputs = function (mark) {
    return;
};
$Γ['global']['$tmp5']['markInputs'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    mark: $Λ[$Λ.length - 1].l
};
$tmp5 = UnaryConstraint.prototype;
$Γ['global']['$tmp5'] = sec_lvl('UnaryConstraint', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp5'] instanceof Object ? $Γ['global']['$tmp5'].Σ = $lub($Γ['global']['$tmp5'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5'] = $lub($Γ['global']['$tmp5'], $Λ[$Λ.length - 1].l);
$tmp5.output = function () {
    var $tmp74;
    $Γ['global']['$tmp5']['output']['$tmp74'] = 0;
    $tmp74 = this.myOutput;
    $Γ['global']['$tmp5']['output']['$tmp74'] = sec_lvl('$tmp5', 'myOutput', false, $Γ['global']['$tmp5']['output']);
    $Γ['global']['$tmp5']['output']['$tmp74'] instanceof Object ? $Γ['global']['$tmp5']['output']['$tmp74'].Σ = $lub($Γ['global']['$tmp5']['output']['$tmp74'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['output']['$tmp74'] = $lub($Γ['global']['$tmp5']['output']['$tmp74'], $Λ[$Λ.length - 1].l);
    return $tmp74;
};
$Γ['global']['$tmp5']['output'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$tmp5 = UnaryConstraint.prototype;
$Γ['global']['$tmp5'] = sec_lvl('UnaryConstraint', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp5'] instanceof Object ? $Γ['global']['$tmp5'].Σ = $lub($Γ['global']['$tmp5'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5'] = $lub($Γ['global']['$tmp5'], $Λ[$Λ.length - 1].l);
$tmp5.recalculate = function () {
    var $tmp66, $tmp75, $tmp76;
    $Γ['global']['$tmp5']['recalculate']['$tmp76'] = $Γ['global']['$tmp5']['recalculate']['$tmp75'] = $Γ['global']['$tmp5']['recalculate']['$tmp66'] = 0;
    $tmp66 = this.myOutput;
    $Γ['global']['$tmp5']['recalculate']['$tmp66'] = sec_lvl('$tmp5', 'myOutput', false, $Γ['global']['$tmp5']['recalculate']);
    $Γ['global']['$tmp5']['recalculate']['$tmp66'] instanceof Object ? $Γ['global']['$tmp5']['recalculate']['$tmp66'].Σ = $lub($Γ['global']['$tmp5']['recalculate']['$tmp66'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['recalculate']['$tmp66'] = $lub($Γ['global']['$tmp5']['recalculate']['$tmp66'], $Λ[$Λ.length - 1].l);
    $tmp66.walkStrength = this.strength;
    $Γ['global']['$tmp5']['recalculate']['$tmp66']['walkStrength'] = sec_lvl('$tmp5', 'strength', false, $Γ['global']['$tmp5']['recalculate']);
    $Γ['global']['$tmp5']['recalculate']['$tmp66']['walkStrength'] instanceof Object ? $Γ['global']['$tmp5']['recalculate']['$tmp66']['walkStrength'].Σ = $lub($Γ['global']['$tmp5']['recalculate']['$tmp66']['walkStrength'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['recalculate']['$tmp66']['walkStrength'] = $lub($Γ['global']['$tmp5']['recalculate']['$tmp66']['walkStrength'], $Λ[$Λ.length - 1].l);
    $tmp66 = this.myOutput;
    $Γ['global']['$tmp5']['recalculate']['$tmp66'] = sec_lvl('$tmp5', 'myOutput', false, $Γ['global']['$tmp5']['recalculate']);
    $Γ['global']['$tmp5']['recalculate']['$tmp66'] instanceof Object ? $Γ['global']['$tmp5']['recalculate']['$tmp66'].Σ = $lub($Γ['global']['$tmp5']['recalculate']['$tmp66'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['recalculate']['$tmp66'] = $lub($Γ['global']['$tmp5']['recalculate']['$tmp66'], $Λ[$Λ.length - 1].l);
    $tmp75 = this.isInput();
    $tmp66.stay = !$tmp75;
    $Γ['global']['$tmp5']['recalculate']['$tmp66']['stay'] = sec_lvl('$tmp75', null, false, $Γ['global']['$tmp5']['recalculate']);
    $Γ['global']['$tmp5']['recalculate']['$tmp66']['stay'] instanceof Object ? $Γ['global']['$tmp5']['recalculate']['$tmp66']['stay'].Σ = $lub($Γ['global']['$tmp5']['recalculate']['$tmp66']['stay'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['recalculate']['$tmp66']['stay'] = $lub($Γ['global']['$tmp5']['recalculate']['$tmp66']['stay'], $Λ[$Λ.length - 1].l);
    $tmp66 = this.myOutput;
    $Γ['global']['$tmp5']['recalculate']['$tmp66'] = sec_lvl('$tmp5', 'myOutput', false, $Γ['global']['$tmp5']['recalculate']);
    $Γ['global']['$tmp5']['recalculate']['$tmp66'] instanceof Object ? $Γ['global']['$tmp5']['recalculate']['$tmp66'].Σ = $lub($Γ['global']['$tmp5']['recalculate']['$tmp66'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['recalculate']['$tmp66'] = $lub($Γ['global']['$tmp5']['recalculate']['$tmp66'], $Λ[$Λ.length - 1].l);
    $tmp76 = $tmp66.stay;
    $Γ['global']['$tmp5']['recalculate']['$tmp76'] = sec_lvl('$tmp66', 'stay', false, $Γ['global']['$tmp5']['recalculate']);
    $Γ['global']['$tmp5']['recalculate']['$tmp76'] instanceof Object ? $Γ['global']['$tmp5']['recalculate']['$tmp76'].Σ = $lub($Γ['global']['$tmp5']['recalculate']['$tmp76'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['recalculate']['$tmp76'] = $lub($Γ['global']['$tmp5']['recalculate']['$tmp76'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp76', null, true, $Γ['global']['$tmp5']['recalculate'])),
        id: 'IF'
    });
    if ($tmp76) {
        var $tmp311;
        $Γ['global']['$tmp5']['recalculate']['$tmp311'] = 0;
        $tmp311 = this.execute();
    } else {
        $upgrade([
            'this.execute',
            '$tmp311'
        ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp5']['recalculate']);
    }
    $Λ.pop();
    return;
};
$Γ['global']['$tmp5']['recalculate'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$tmp5 = UnaryConstraint.prototype;
$Γ['global']['$tmp5'] = sec_lvl('UnaryConstraint', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp5'] instanceof Object ? $Γ['global']['$tmp5'].Σ = $lub($Γ['global']['$tmp5'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5'] = $lub($Γ['global']['$tmp5'], $Λ[$Λ.length - 1].l);
$tmp5.markUnsatisfied = function () {
    this.satisfied = false;
    $Γ['global']['$tmp5']['markUnsatisfied']['$this']['satisfied'] = $Λ[$Λ.length - 1].l;
    return;
};
$Γ['global']['$tmp5']['markUnsatisfied'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$tmp5 = UnaryConstraint.prototype;
$Γ['global']['$tmp5'] = sec_lvl('UnaryConstraint', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp5'] instanceof Object ? $Γ['global']['$tmp5'].Σ = $lub($Γ['global']['$tmp5'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5'] = $lub($Γ['global']['$tmp5'], $Λ[$Λ.length - 1].l);
$tmp5.inputsKnown = function () {
    var $tmp77;
    $Γ['global']['$tmp5']['inputsKnown']['$tmp77'] = 0;
    $tmp77 = true;
    $Γ['global']['$tmp5']['inputsKnown']['$tmp77'] = $Λ[$Λ.length - 1].l;
    return $tmp77;
};
$Γ['global']['$tmp5']['inputsKnown'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$tmp5 = UnaryConstraint.prototype;
$Γ['global']['$tmp5'] = sec_lvl('UnaryConstraint', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp5'] instanceof Object ? $Γ['global']['$tmp5'].Σ = $lub($Γ['global']['$tmp5'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5'] = $lub($Γ['global']['$tmp5'], $Λ[$Λ.length - 1].l);
$tmp5.removeFromGraph = function () {
    var $tmp78, $tmp79;
    $Γ['global']['$tmp5']['removeFromGraph']['$tmp79'] = $Γ['global']['$tmp5']['removeFromGraph']['$tmp78'] = 0;
    $tmp79 = this.myOutput;
    $Γ['global']['$tmp5']['removeFromGraph']['$tmp79'] = sec_lvl('$tmp5', 'myOutput', false, $Γ['global']['$tmp5']['removeFromGraph']);
    $Γ['global']['$tmp5']['removeFromGraph']['$tmp79'] instanceof Object ? $Γ['global']['$tmp5']['removeFromGraph']['$tmp79'].Σ = $lub($Γ['global']['$tmp5']['removeFromGraph']['$tmp79'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['removeFromGraph']['$tmp79'] = $lub($Γ['global']['$tmp5']['removeFromGraph']['$tmp79'], $Λ[$Λ.length - 1].l);
    $tmp78 = $tmp79 != null;
    $Γ['global']['$tmp5']['removeFromGraph']['$tmp78'] = $lub(sec_lvl('$tmp79', null, true, $Γ['global']['$tmp5']['removeFromGraph']), $Λ[$Λ.length - 1].l);
    $Γ['global']['$tmp5']['removeFromGraph']['$tmp78'] instanceof Object ? $Γ['global']['$tmp5']['removeFromGraph']['$tmp78'].Σ = $lub($Γ['global']['$tmp5']['removeFromGraph']['$tmp78'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['removeFromGraph']['$tmp78'] = $lub($Γ['global']['$tmp5']['removeFromGraph']['$tmp78'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp78', null, true, $Γ['global']['$tmp5']['removeFromGraph'])),
        id: 'IF'
    });
    if ($tmp78) {
        var $tmp312, $tmp66, $tmp313;
        $Γ['global']['$tmp5']['removeFromGraph']['$tmp313'] = $Γ['global']['$tmp5']['removeFromGraph']['$tmp66'] = $Γ['global']['$tmp5']['removeFromGraph']['$tmp312'] = 0;
        $tmp66 = this.myOutput;
        $Γ['global']['$tmp5']['removeFromGraph']['$tmp66'] = sec_lvl('$tmp5', 'myOutput', false, $Γ['global']['$tmp5']['removeFromGraph']);
        $Γ['global']['$tmp5']['removeFromGraph']['$tmp66'] instanceof Object ? $Γ['global']['$tmp5']['removeFromGraph']['$tmp66'].Σ = $lub($Γ['global']['$tmp5']['removeFromGraph']['$tmp66'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['removeFromGraph']['$tmp66'] = $lub($Γ['global']['$tmp5']['removeFromGraph']['$tmp66'], $Λ[$Λ.length - 1].l);
        $tmp313 = this;
        $Γ['global']['$tmp5']['removeFromGraph']['$tmp313'] = $Γ['global']['$tmp5']['removeFromGraph'].$this;
        $Γ['global']['$tmp5']['removeFromGraph']['$tmp313'] instanceof Object ? $Γ['global']['$tmp5']['removeFromGraph']['$tmp313'].Σ = $lub($Γ['global']['$tmp5']['removeFromGraph']['$tmp313'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['removeFromGraph']['$tmp313'] = $lub($Γ['global']['$tmp5']['removeFromGraph']['$tmp313'], $Λ[$Λ.length - 1].l);
        $tmp312 = $tmp66.removeConstraint($tmp313);
    } else {
        $upgrade([
            '$tmp66.removeConstraint',
            '$tmp312'
        ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp5']['removeFromGraph']);
    }
    $Λ.pop();
    this.satisfied = false;
    $Γ['global']['$tmp5']['removeFromGraph']['$this']['satisfied'] = $Λ[$Λ.length - 1].l;
    return;
};
$Γ['global']['$tmp5']['removeFromGraph'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
function StayConstraint(v, str) {
    var $tmp80, $tmp81, $tmp82;
    $Γ['global']['StayConstraint']['$tmp82'] = $Γ['global']['StayConstraint']['$tmp81'] = $Γ['global']['StayConstraint']['$tmp80'] = 0;
    $tmp81 = StayConstraint.superConstructor;
    $Γ['global']['StayConstraint']['$tmp81'] = sec_lvl('StayConstraint', 'superConstructor', false, $Γ['global']['StayConstraint']);
    $Γ['global']['StayConstraint']['$tmp81'] instanceof Object ? $Γ['global']['StayConstraint']['$tmp81'].Σ = $lub($Γ['global']['StayConstraint']['$tmp81'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['StayConstraint']['$tmp81'] = $lub($Γ['global']['StayConstraint']['$tmp81'], $Λ[$Λ.length - 1].l);
    $tmp82 = this;
    $Γ['global']['StayConstraint']['$tmp82'] = $Γ['global']['StayConstraint'].$this;
    $Γ['global']['StayConstraint']['$tmp82'] instanceof Object ? $Γ['global']['StayConstraint']['$tmp82'].Σ = $lub($Γ['global']['StayConstraint']['$tmp82'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['StayConstraint']['$tmp82'] = $lub($Γ['global']['StayConstraint']['$tmp82'], $Λ[$Λ.length - 1].l);
    $tmp80 = $tmp81.call($tmp82, v, str);
    return;
}
$tmp6 = StayConstraint.inheritsFrom(UnaryConstraint);
$tmp7 = StayConstraint.prototype;
$Γ['global']['$tmp7'] = sec_lvl('StayConstraint', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp7'] instanceof Object ? $Γ['global']['$tmp7'].Σ = $lub($Γ['global']['$tmp7'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp7'] = $lub($Γ['global']['$tmp7'], $Λ[$Λ.length - 1].l);
$tmp7.execute = function () {
    return;
};
$Γ['global']['$tmp7']['execute'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
function EditConstraint(v, str) {
    var $tmp83, $tmp84, $tmp85;
    $Γ['global']['EditConstraint']['$tmp85'] = $Γ['global']['EditConstraint']['$tmp84'] = $Γ['global']['EditConstraint']['$tmp83'] = 0;
    $tmp84 = EditConstraint.superConstructor;
    $Γ['global']['EditConstraint']['$tmp84'] = sec_lvl('EditConstraint', 'superConstructor', false, $Γ['global']['EditConstraint']);
    $Γ['global']['EditConstraint']['$tmp84'] instanceof Object ? $Γ['global']['EditConstraint']['$tmp84'].Σ = $lub($Γ['global']['EditConstraint']['$tmp84'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['EditConstraint']['$tmp84'] = $lub($Γ['global']['EditConstraint']['$tmp84'], $Λ[$Λ.length - 1].l);
    $tmp85 = this;
    $Γ['global']['EditConstraint']['$tmp85'] = $Γ['global']['EditConstraint'].$this;
    $Γ['global']['EditConstraint']['$tmp85'] instanceof Object ? $Γ['global']['EditConstraint']['$tmp85'].Σ = $lub($Γ['global']['EditConstraint']['$tmp85'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['EditConstraint']['$tmp85'] = $lub($Γ['global']['EditConstraint']['$tmp85'], $Λ[$Λ.length - 1].l);
    $tmp83 = $tmp84.call($tmp85, v, str);
    return;
}
$tmp8 = EditConstraint.inheritsFrom(UnaryConstraint);
$tmp9 = EditConstraint.prototype;
$Γ['global']['$tmp9'] = sec_lvl('EditConstraint', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp9'] instanceof Object ? $Γ['global']['$tmp9'].Σ = $lub($Γ['global']['$tmp9'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp9'] = $lub($Γ['global']['$tmp9'], $Λ[$Λ.length - 1].l);
$tmp9.isInput = function () {
    var $tmp86;
    $Γ['global']['$tmp9']['isInput']['$tmp86'] = 0;
    $tmp86 = true;
    $Γ['global']['$tmp9']['isInput']['$tmp86'] = $Λ[$Λ.length - 1].l;
    return $tmp86;
};
$Γ['global']['$tmp9']['isInput'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$tmp9 = EditConstraint.prototype;
$Γ['global']['$tmp9'] = sec_lvl('EditConstraint', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp9'] instanceof Object ? $Γ['global']['$tmp9'].Σ = $lub($Γ['global']['$tmp9'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp9'] = $lub($Γ['global']['$tmp9'], $Λ[$Λ.length - 1].l);
$tmp9.execute = function () {
    return;
};
$Γ['global']['$tmp9']['execute'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
Direction = new Object();
Direction.NONE = 0;
$Γ['global']['Direction']['NONE'] = $Λ[$Λ.length - 1].l;
Direction.FORWARD = 1;
$Γ['global']['Direction']['FORWARD'] = $Λ[$Λ.length - 1].l;
Direction.BACKWARD = -1;
$Γ['global']['Direction']['BACKWARD'] = $Λ[$Λ.length - 1].l;
$Γ['global']['Direction']['BACKWARD'] instanceof Object ? $Γ['global']['Direction']['BACKWARD'].Σ = $lub($Γ['global']['Direction']['BACKWARD'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['Direction']['BACKWARD'] = $lub($Γ['global']['Direction']['BACKWARD'], $Λ[$Λ.length - 1].l);
function BinaryConstraint(var1, var2, strength) {
    var $tmp87, $tmp88, $tmp89, $tmp90;
    $Γ['global']['BinaryConstraint']['$tmp90'] = $Γ['global']['BinaryConstraint']['$tmp89'] = $Γ['global']['BinaryConstraint']['$tmp88'] = $Γ['global']['BinaryConstraint']['$tmp87'] = 0;
    $tmp88 = BinaryConstraint.superConstructor;
    $Γ['global']['BinaryConstraint']['$tmp88'] = sec_lvl('BinaryConstraint', 'superConstructor', false, $Γ['global']['BinaryConstraint']);
    $Γ['global']['BinaryConstraint']['$tmp88'] instanceof Object ? $Γ['global']['BinaryConstraint']['$tmp88'].Σ = $lub($Γ['global']['BinaryConstraint']['$tmp88'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['BinaryConstraint']['$tmp88'] = $lub($Γ['global']['BinaryConstraint']['$tmp88'], $Λ[$Λ.length - 1].l);
    $tmp89 = this;
    $Γ['global']['BinaryConstraint']['$tmp89'] = $Γ['global']['BinaryConstraint'].$this;
    $Γ['global']['BinaryConstraint']['$tmp89'] instanceof Object ? $Γ['global']['BinaryConstraint']['$tmp89'].Σ = $lub($Γ['global']['BinaryConstraint']['$tmp89'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['BinaryConstraint']['$tmp89'] = $lub($Γ['global']['BinaryConstraint']['$tmp89'], $Λ[$Λ.length - 1].l);
    $tmp87 = $tmp88.call($tmp89, strength);
    this.v1 = var1;
    $Γ['global']['BinaryConstraint']['$this']['v1'] = sec_lvl('var1', null, false, $Γ['global']['BinaryConstraint']);
    $Γ['global']['BinaryConstraint']['$this']['v1'] instanceof Object ? $Γ['global']['BinaryConstraint']['$this']['v1'].Σ = $lub($Γ['global']['BinaryConstraint']['$this']['v1'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['BinaryConstraint']['$this']['v1'] = $lub($Γ['global']['BinaryConstraint']['$this']['v1'], $Λ[$Λ.length - 1].l);
    this.v2 = var2;
    $Γ['global']['BinaryConstraint']['$this']['v2'] = sec_lvl('var2', null, false, $Γ['global']['BinaryConstraint']);
    $Γ['global']['BinaryConstraint']['$this']['v2'] instanceof Object ? $Γ['global']['BinaryConstraint']['$this']['v2'].Σ = $lub($Γ['global']['BinaryConstraint']['$this']['v2'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['BinaryConstraint']['$this']['v2'] = $lub($Γ['global']['BinaryConstraint']['$this']['v2'], $Λ[$Λ.length - 1].l);
    this.direction = Direction.NONE;
    $Γ['global']['BinaryConstraint']['$this']['direction'] = sec_lvl('Direction', 'NONE', false, $Γ['global']['BinaryConstraint']);
    $Γ['global']['BinaryConstraint']['$this']['direction'] instanceof Object ? $Γ['global']['BinaryConstraint']['$this']['direction'].Σ = $lub($Γ['global']['BinaryConstraint']['$this']['direction'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['BinaryConstraint']['$this']['direction'] = $lub($Γ['global']['BinaryConstraint']['$this']['direction'], $Λ[$Λ.length - 1].l);
    $tmp90 = this.addConstraint();
    return;
}
$tmp10 = BinaryConstraint.inheritsFrom(Constraint);
$tmp11 = BinaryConstraint.prototype;
$Γ['global']['$tmp11'] = sec_lvl('BinaryConstraint', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp11'] instanceof Object ? $Γ['global']['$tmp11'].Σ = $lub($Γ['global']['$tmp11'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11'] = $lub($Γ['global']['$tmp11'], $Λ[$Λ.length - 1].l);
$tmp11.chooseMethod = function (mark) {
    var $tmp91, $tmp92, $tmp93, $tmp94, $tmp95, $tmp96, $tmp97, $tmp98, $tmp99;
    $Γ['global']['$tmp11']['chooseMethod']['$tmp99'] = $Γ['global']['$tmp11']['chooseMethod']['$tmp98'] = $Γ['global']['$tmp11']['chooseMethod']['$tmp97'] = $Γ['global']['$tmp11']['chooseMethod']['$tmp96'] = $Γ['global']['$tmp11']['chooseMethod']['$tmp95'] = $Γ['global']['$tmp11']['chooseMethod']['$tmp94'] = $Γ['global']['$tmp11']['chooseMethod']['$tmp93'] = $Γ['global']['$tmp11']['chooseMethod']['$tmp92'] = $Γ['global']['$tmp11']['chooseMethod']['$tmp91'] = 0;
    $tmp93 = this.v1;
    $Γ['global']['$tmp11']['chooseMethod']['$tmp93'] = sec_lvl('$tmp11', 'v1', false, $Γ['global']['$tmp11']['chooseMethod']);
    $Γ['global']['$tmp11']['chooseMethod']['$tmp93'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$tmp93'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp93'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$tmp93'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp93'], $Λ[$Λ.length - 1].l);
    $tmp92 = $tmp93.mark;
    $Γ['global']['$tmp11']['chooseMethod']['$tmp92'] = sec_lvl('$tmp93', 'mark', false, $Γ['global']['$tmp11']['chooseMethod']);
    $Γ['global']['$tmp11']['chooseMethod']['$tmp92'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$tmp92'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp92'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$tmp92'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp92'], $Λ[$Λ.length - 1].l);
    $tmp91 = $tmp92 == mark;
    $Γ['global']['$tmp11']['chooseMethod']['$tmp91'] = $lub(sec_lvl('$tmp92', null, true, $Γ['global']['$tmp11']['chooseMethod']), sec_lvl('mark', null, true, $Γ['global']['$tmp11']['chooseMethod']));
    $Γ['global']['$tmp11']['chooseMethod']['$tmp91'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$tmp91'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp91'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$tmp91'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp91'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp91', null, true, $Γ['global']['$tmp11']['chooseMethod'])),
        id: 'IF'
    });
    if ($tmp91) {
        var $tmp314, $tmp315, $tmp316, $tmp96, $tmp317, $tmp318, $tmp319;
        $Γ['global']['$tmp11']['chooseMethod']['$tmp319'] = $Γ['global']['$tmp11']['chooseMethod']['$tmp318'] = $Γ['global']['$tmp11']['chooseMethod']['$tmp317'] = $Γ['global']['$tmp11']['chooseMethod']['$tmp96'] = $Γ['global']['$tmp11']['chooseMethod']['$tmp316'] = $Γ['global']['$tmp11']['chooseMethod']['$tmp315'] = $Γ['global']['$tmp11']['chooseMethod']['$tmp314'] = 0;
        $tmp96 = this.v2;
        $Γ['global']['$tmp11']['chooseMethod']['$tmp96'] = sec_lvl('$tmp11', 'v2', false, $Γ['global']['$tmp11']['chooseMethod']);
        $Γ['global']['$tmp11']['chooseMethod']['$tmp96'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$tmp96'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp96'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$tmp96'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp96'], $Λ[$Λ.length - 1].l);
        $tmp316 = $tmp96.mark;
        $Γ['global']['$tmp11']['chooseMethod']['$tmp316'] = sec_lvl('$tmp96', 'mark', false, $Γ['global']['$tmp11']['chooseMethod']);
        $Γ['global']['$tmp11']['chooseMethod']['$tmp316'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$tmp316'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp316'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$tmp316'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp316'], $Λ[$Λ.length - 1].l);
        $tmp315 = $tmp316 != mark;
        $Γ['global']['$tmp11']['chooseMethod']['$tmp315'] = $lub(sec_lvl('$tmp316', null, true, $Γ['global']['$tmp11']['chooseMethod']), sec_lvl('mark', null, true, $Γ['global']['$tmp11']['chooseMethod']));
        $Γ['global']['$tmp11']['chooseMethod']['$tmp315'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$tmp315'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp315'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$tmp315'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp315'], $Λ[$Λ.length - 1].l);
        $tmp318 = this.strength;
        $Γ['global']['$tmp11']['chooseMethod']['$tmp318'] = sec_lvl('$tmp11', 'strength', false, $Γ['global']['$tmp11']['chooseMethod']);
        $Γ['global']['$tmp11']['chooseMethod']['$tmp318'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$tmp318'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp318'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$tmp318'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp318'], $Λ[$Λ.length - 1].l);
        $tmp96 = this.v2;
        $Γ['global']['$tmp11']['chooseMethod']['$tmp96'] = sec_lvl('$tmp11', 'v2', false, $Γ['global']['$tmp11']['chooseMethod']);
        $Γ['global']['$tmp11']['chooseMethod']['$tmp96'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$tmp96'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp96'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$tmp96'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp96'], $Λ[$Λ.length - 1].l);
        $tmp319 = $tmp96.walkStrength;
        $Γ['global']['$tmp11']['chooseMethod']['$tmp319'] = sec_lvl('$tmp96', 'walkStrength', false, $Γ['global']['$tmp11']['chooseMethod']);
        $Γ['global']['$tmp11']['chooseMethod']['$tmp319'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$tmp319'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp319'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$tmp319'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp319'], $Λ[$Λ.length - 1].l);
        $rf = $prop('Strength', 'stronger', $Γ['global']['$tmp11']['chooseMethod']);
        $rf.scope = $Γ['global']['$tmp11']['chooseMethod'];
        $rf.$this = $scope($Γ['global']['$tmp11']['chooseMethod'], 'Strength', false)['Strength'];
        $rf['s1'] = $lub(sec_lvl('$tmp318', null, true, $Γ['global']['$tmp11']['chooseMethod']), $Λ[$Λ.length - 1].l);
        $rf['s2'] = $lub(sec_lvl('$tmp319', null, true, $Γ['global']['$tmp11']['chooseMethod']), $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
            id: 'FUNC'
        });
        $tmp317 = Strength.stronger($tmp318, $tmp319);
        $Γ['global']['$tmp11']['chooseMethod']['$tmp317'] = $Λ.pop().l;
        $Γ['global']['$tmp11']['chooseMethod']['$tmp317'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$tmp317'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp317'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$tmp317'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp317'], $Λ[$Λ.length - 1].l);
        $tmp314 = $tmp315 && $tmp317;
        $Γ['global']['$tmp11']['chooseMethod']['$tmp314'] = $lub(sec_lvl('$tmp315', null, true, $Γ['global']['$tmp11']['chooseMethod']), sec_lvl('$tmp317', null, true, $Γ['global']['$tmp11']['chooseMethod']));
        $Γ['global']['$tmp11']['chooseMethod']['$tmp314'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$tmp314'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp314'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$tmp314'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp314'], $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp314', null, true, $Γ['global']['$tmp11']['chooseMethod'])),
            id: 'IF'
        });
        if ($tmp314) {
            this.direction = Direction.FORWARD;
            $Γ['global']['$tmp11']['chooseMethod']['$this']['direction'] = sec_lvl('Direction', 'FORWARD', false, $Γ['global']['$tmp11']['chooseMethod']);
            $Γ['global']['$tmp11']['chooseMethod']['$this']['direction'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$this']['direction'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$this']['direction'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$this']['direction'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$this']['direction'], $Λ[$Λ.length - 1].l);
        } else {
            this.direction = Direction.NONE;
            $Γ['global']['$tmp11']['chooseMethod']['$this']['direction'] = sec_lvl('Direction', 'NONE', false, $Γ['global']['$tmp11']['chooseMethod']);
            $Γ['global']['$tmp11']['chooseMethod']['$this']['direction'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$this']['direction'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$this']['direction'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$this']['direction'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$this']['direction'], $Λ[$Λ.length - 1].l);
        }
        $Λ.pop();
    } else {
        $upgrade(['$tmp317'], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp11']['chooseMethod']);
    }
    $Λ.pop();
    $tmp96 = this.v2;
    $Γ['global']['$tmp11']['chooseMethod']['$tmp96'] = sec_lvl('$tmp11', 'v2', false, $Γ['global']['$tmp11']['chooseMethod']);
    $Γ['global']['$tmp11']['chooseMethod']['$tmp96'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$tmp96'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp96'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$tmp96'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp96'], $Λ[$Λ.length - 1].l);
    $tmp95 = $tmp96.mark;
    $Γ['global']['$tmp11']['chooseMethod']['$tmp95'] = sec_lvl('$tmp96', 'mark', false, $Γ['global']['$tmp11']['chooseMethod']);
    $Γ['global']['$tmp11']['chooseMethod']['$tmp95'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$tmp95'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp95'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$tmp95'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp95'], $Λ[$Λ.length - 1].l);
    $tmp94 = $tmp95 == mark;
    $Γ['global']['$tmp11']['chooseMethod']['$tmp94'] = $lub(sec_lvl('$tmp95', null, true, $Γ['global']['$tmp11']['chooseMethod']), sec_lvl('mark', null, true, $Γ['global']['$tmp11']['chooseMethod']));
    $Γ['global']['$tmp11']['chooseMethod']['$tmp94'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$tmp94'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp94'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$tmp94'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp94'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp94', null, true, $Γ['global']['$tmp11']['chooseMethod'])),
        id: 'IF'
    });
    if ($tmp94) {
        var $tmp320, $tmp321, $tmp322, $tmp93, $tmp323, $tmp324, $tmp325;
        $Γ['global']['$tmp11']['chooseMethod']['$tmp325'] = $Γ['global']['$tmp11']['chooseMethod']['$tmp324'] = $Γ['global']['$tmp11']['chooseMethod']['$tmp323'] = $Γ['global']['$tmp11']['chooseMethod']['$tmp93'] = $Γ['global']['$tmp11']['chooseMethod']['$tmp322'] = $Γ['global']['$tmp11']['chooseMethod']['$tmp321'] = $Γ['global']['$tmp11']['chooseMethod']['$tmp320'] = 0;
        $tmp93 = this.v1;
        $Γ['global']['$tmp11']['chooseMethod']['$tmp93'] = sec_lvl('$tmp11', 'v1', false, $Γ['global']['$tmp11']['chooseMethod']);
        $Γ['global']['$tmp11']['chooseMethod']['$tmp93'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$tmp93'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp93'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$tmp93'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp93'], $Λ[$Λ.length - 1].l);
        $tmp322 = $tmp93.mark;
        $Γ['global']['$tmp11']['chooseMethod']['$tmp322'] = sec_lvl('$tmp93', 'mark', false, $Γ['global']['$tmp11']['chooseMethod']);
        $Γ['global']['$tmp11']['chooseMethod']['$tmp322'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$tmp322'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp322'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$tmp322'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp322'], $Λ[$Λ.length - 1].l);
        $tmp321 = $tmp322 != mark;
        $Γ['global']['$tmp11']['chooseMethod']['$tmp321'] = $lub(sec_lvl('$tmp322', null, true, $Γ['global']['$tmp11']['chooseMethod']), sec_lvl('mark', null, true, $Γ['global']['$tmp11']['chooseMethod']));
        $Γ['global']['$tmp11']['chooseMethod']['$tmp321'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$tmp321'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp321'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$tmp321'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp321'], $Λ[$Λ.length - 1].l);
        $tmp324 = this.strength;
        $Γ['global']['$tmp11']['chooseMethod']['$tmp324'] = sec_lvl('$tmp11', 'strength', false, $Γ['global']['$tmp11']['chooseMethod']);
        $Γ['global']['$tmp11']['chooseMethod']['$tmp324'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$tmp324'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp324'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$tmp324'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp324'], $Λ[$Λ.length - 1].l);
        $tmp93 = this.v1;
        $Γ['global']['$tmp11']['chooseMethod']['$tmp93'] = sec_lvl('$tmp11', 'v1', false, $Γ['global']['$tmp11']['chooseMethod']);
        $Γ['global']['$tmp11']['chooseMethod']['$tmp93'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$tmp93'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp93'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$tmp93'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp93'], $Λ[$Λ.length - 1].l);
        $tmp325 = $tmp93.walkStrength;
        $Γ['global']['$tmp11']['chooseMethod']['$tmp325'] = sec_lvl('$tmp93', 'walkStrength', false, $Γ['global']['$tmp11']['chooseMethod']);
        $Γ['global']['$tmp11']['chooseMethod']['$tmp325'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$tmp325'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp325'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$tmp325'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp325'], $Λ[$Λ.length - 1].l);
        $rf = $prop('Strength', 'stronger', $Γ['global']['$tmp11']['chooseMethod']);
        $rf.scope = $Γ['global']['$tmp11']['chooseMethod'];
        $rf.$this = $scope($Γ['global']['$tmp11']['chooseMethod'], 'Strength', false)['Strength'];
        $rf['s1'] = $lub(sec_lvl('$tmp324', null, true, $Γ['global']['$tmp11']['chooseMethod']), $Λ[$Λ.length - 1].l);
        $rf['s2'] = $lub(sec_lvl('$tmp325', null, true, $Γ['global']['$tmp11']['chooseMethod']), $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
            id: 'FUNC'
        });
        $tmp323 = Strength.stronger($tmp324, $tmp325);
        $Γ['global']['$tmp11']['chooseMethod']['$tmp323'] = $Λ.pop().l;
        $Γ['global']['$tmp11']['chooseMethod']['$tmp323'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$tmp323'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp323'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$tmp323'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp323'], $Λ[$Λ.length - 1].l);
        $tmp320 = $tmp321 && $tmp323;
        $Γ['global']['$tmp11']['chooseMethod']['$tmp320'] = $lub(sec_lvl('$tmp321', null, true, $Γ['global']['$tmp11']['chooseMethod']), sec_lvl('$tmp323', null, true, $Γ['global']['$tmp11']['chooseMethod']));
        $Γ['global']['$tmp11']['chooseMethod']['$tmp320'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$tmp320'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp320'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$tmp320'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp320'], $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp320', null, true, $Γ['global']['$tmp11']['chooseMethod'])),
            id: 'IF'
        });
        if ($tmp320) {
            this.direction = Direction.BACKWARD;
            $Γ['global']['$tmp11']['chooseMethod']['$this']['direction'] = sec_lvl('Direction', 'BACKWARD', false, $Γ['global']['$tmp11']['chooseMethod']);
            $Γ['global']['$tmp11']['chooseMethod']['$this']['direction'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$this']['direction'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$this']['direction'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$this']['direction'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$this']['direction'], $Λ[$Λ.length - 1].l);
        } else {
            this.direction = Direction.NONE;
            $Γ['global']['$tmp11']['chooseMethod']['$this']['direction'] = sec_lvl('Direction', 'NONE', false, $Γ['global']['$tmp11']['chooseMethod']);
            $Γ['global']['$tmp11']['chooseMethod']['$this']['direction'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$this']['direction'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$this']['direction'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$this']['direction'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$this']['direction'], $Λ[$Λ.length - 1].l);
        }
        $Λ.pop();
    } else {
        $upgrade(['$tmp323'], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp11']['chooseMethod']);
    }
    $Λ.pop();
    $tmp93 = this.v1;
    $Γ['global']['$tmp11']['chooseMethod']['$tmp93'] = sec_lvl('$tmp11', 'v1', false, $Γ['global']['$tmp11']['chooseMethod']);
    $Γ['global']['$tmp11']['chooseMethod']['$tmp93'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$tmp93'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp93'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$tmp93'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp93'], $Λ[$Λ.length - 1].l);
    $tmp98 = $tmp93.walkStrength;
    $Γ['global']['$tmp11']['chooseMethod']['$tmp98'] = sec_lvl('$tmp93', 'walkStrength', false, $Γ['global']['$tmp11']['chooseMethod']);
    $Γ['global']['$tmp11']['chooseMethod']['$tmp98'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$tmp98'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp98'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$tmp98'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp98'], $Λ[$Λ.length - 1].l);
    $tmp96 = this.v2;
    $Γ['global']['$tmp11']['chooseMethod']['$tmp96'] = sec_lvl('$tmp11', 'v2', false, $Γ['global']['$tmp11']['chooseMethod']);
    $Γ['global']['$tmp11']['chooseMethod']['$tmp96'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$tmp96'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp96'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$tmp96'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp96'], $Λ[$Λ.length - 1].l);
    $tmp99 = $tmp96.walkStrength;
    $Γ['global']['$tmp11']['chooseMethod']['$tmp99'] = sec_lvl('$tmp96', 'walkStrength', false, $Γ['global']['$tmp11']['chooseMethod']);
    $Γ['global']['$tmp11']['chooseMethod']['$tmp99'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$tmp99'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp99'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$tmp99'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp99'], $Λ[$Λ.length - 1].l);
    $rf = $prop('Strength', 'weaker', $Γ['global']['$tmp11']['chooseMethod']);
    $rf.scope = $Γ['global']['$tmp11']['chooseMethod'];
    $rf.$this = $scope($Γ['global']['$tmp11']['chooseMethod'], 'Strength', false)['Strength'];
    $rf['s1'] = $lub(sec_lvl('$tmp98', null, true, $Γ['global']['$tmp11']['chooseMethod']), $Λ[$Λ.length - 1].l);
    $rf['s2'] = $lub(sec_lvl('$tmp99', null, true, $Γ['global']['$tmp11']['chooseMethod']), $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp97 = Strength.weaker($tmp98, $tmp99);
    $Γ['global']['$tmp11']['chooseMethod']['$tmp97'] = $Λ.pop().l;
    $Γ['global']['$tmp11']['chooseMethod']['$tmp97'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$tmp97'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp97'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$tmp97'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp97'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp97', null, true, $Γ['global']['$tmp11']['chooseMethod'])),
        id: 'IF'
    });
    if ($tmp97) {
        $upgrade(['$tmp329'], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp11']['chooseMethod']);
        var $tmp326, $tmp327, $tmp328, $tmp93;
        $Γ['global']['$tmp11']['chooseMethod']['$tmp93'] = $Γ['global']['$tmp11']['chooseMethod']['$tmp328'] = $Γ['global']['$tmp11']['chooseMethod']['$tmp327'] = $Γ['global']['$tmp11']['chooseMethod']['$tmp326'] = 0;
        $tmp327 = this.strength;
        $Γ['global']['$tmp11']['chooseMethod']['$tmp327'] = sec_lvl('$tmp11', 'strength', false, $Γ['global']['$tmp11']['chooseMethod']);
        $Γ['global']['$tmp11']['chooseMethod']['$tmp327'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$tmp327'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp327'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$tmp327'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp327'], $Λ[$Λ.length - 1].l);
        $tmp93 = this.v1;
        $Γ['global']['$tmp11']['chooseMethod']['$tmp93'] = sec_lvl('$tmp11', 'v1', false, $Γ['global']['$tmp11']['chooseMethod']);
        $Γ['global']['$tmp11']['chooseMethod']['$tmp93'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$tmp93'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp93'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$tmp93'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp93'], $Λ[$Λ.length - 1].l);
        $tmp328 = $tmp93.walkStrength;
        $Γ['global']['$tmp11']['chooseMethod']['$tmp328'] = sec_lvl('$tmp93', 'walkStrength', false, $Γ['global']['$tmp11']['chooseMethod']);
        $Γ['global']['$tmp11']['chooseMethod']['$tmp328'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$tmp328'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp328'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$tmp328'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp328'], $Λ[$Λ.length - 1].l);
        $rf = $prop('Strength', 'stronger', $Γ['global']['$tmp11']['chooseMethod']);
        $rf.scope = $Γ['global']['$tmp11']['chooseMethod'];
        $rf.$this = $scope($Γ['global']['$tmp11']['chooseMethod'], 'Strength', false)['Strength'];
        $rf['s1'] = $lub(sec_lvl('$tmp327', null, true, $Γ['global']['$tmp11']['chooseMethod']), $Λ[$Λ.length - 1].l);
        $rf['s2'] = $lub(sec_lvl('$tmp328', null, true, $Γ['global']['$tmp11']['chooseMethod']), $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
            id: 'FUNC'
        });
        $tmp326 = Strength.stronger($tmp327, $tmp328);
        $Γ['global']['$tmp11']['chooseMethod']['$tmp326'] = $Λ.pop().l;
        $Γ['global']['$tmp11']['chooseMethod']['$tmp326'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$tmp326'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp326'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$tmp326'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp326'], $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp326', null, true, $Γ['global']['$tmp11']['chooseMethod'])),
            id: 'IF'
        });
        if ($tmp326) {
            this.direction = Direction.BACKWARD;
            $Γ['global']['$tmp11']['chooseMethod']['$this']['direction'] = sec_lvl('Direction', 'BACKWARD', false, $Γ['global']['$tmp11']['chooseMethod']);
            $Γ['global']['$tmp11']['chooseMethod']['$this']['direction'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$this']['direction'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$this']['direction'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$this']['direction'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$this']['direction'], $Λ[$Λ.length - 1].l);
        } else {
            this.direction = Direction.NONE;
            $Γ['global']['$tmp11']['chooseMethod']['$this']['direction'] = sec_lvl('Direction', 'NONE', false, $Γ['global']['$tmp11']['chooseMethod']);
            $Γ['global']['$tmp11']['chooseMethod']['$this']['direction'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$this']['direction'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$this']['direction'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$this']['direction'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$this']['direction'], $Λ[$Λ.length - 1].l);
        }
        $Λ.pop();
    } else {
        $upgrade(['$tmp326'], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp11']['chooseMethod']);
        var $tmp329, $tmp330, $tmp331, $tmp96;
        $Γ['global']['$tmp11']['chooseMethod']['$tmp96'] = $Γ['global']['$tmp11']['chooseMethod']['$tmp331'] = $Γ['global']['$tmp11']['chooseMethod']['$tmp330'] = $Γ['global']['$tmp11']['chooseMethod']['$tmp329'] = 0;
        $tmp330 = this.strength;
        $Γ['global']['$tmp11']['chooseMethod']['$tmp330'] = sec_lvl('$tmp11', 'strength', false, $Γ['global']['$tmp11']['chooseMethod']);
        $Γ['global']['$tmp11']['chooseMethod']['$tmp330'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$tmp330'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp330'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$tmp330'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp330'], $Λ[$Λ.length - 1].l);
        $tmp96 = this.v2;
        $Γ['global']['$tmp11']['chooseMethod']['$tmp96'] = sec_lvl('$tmp11', 'v2', false, $Γ['global']['$tmp11']['chooseMethod']);
        $Γ['global']['$tmp11']['chooseMethod']['$tmp96'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$tmp96'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp96'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$tmp96'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp96'], $Λ[$Λ.length - 1].l);
        $tmp331 = $tmp96.walkStrength;
        $Γ['global']['$tmp11']['chooseMethod']['$tmp331'] = sec_lvl('$tmp96', 'walkStrength', false, $Γ['global']['$tmp11']['chooseMethod']);
        $Γ['global']['$tmp11']['chooseMethod']['$tmp331'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$tmp331'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp331'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$tmp331'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp331'], $Λ[$Λ.length - 1].l);
        $rf = $prop('Strength', 'stronger', $Γ['global']['$tmp11']['chooseMethod']);
        $rf.scope = $Γ['global']['$tmp11']['chooseMethod'];
        $rf.$this = $scope($Γ['global']['$tmp11']['chooseMethod'], 'Strength', false)['Strength'];
        $rf['s1'] = $lub(sec_lvl('$tmp330', null, true, $Γ['global']['$tmp11']['chooseMethod']), $Λ[$Λ.length - 1].l);
        $rf['s2'] = $lub(sec_lvl('$tmp331', null, true, $Γ['global']['$tmp11']['chooseMethod']), $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
            id: 'FUNC'
        });
        $tmp329 = Strength.stronger($tmp330, $tmp331);
        $Γ['global']['$tmp11']['chooseMethod']['$tmp329'] = $Λ.pop().l;
        $Γ['global']['$tmp11']['chooseMethod']['$tmp329'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$tmp329'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp329'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$tmp329'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$tmp329'], $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp329', null, true, $Γ['global']['$tmp11']['chooseMethod'])),
            id: 'IF'
        });
        if ($tmp329) {
            this.direction = Direction.FORWARD;
            $Γ['global']['$tmp11']['chooseMethod']['$this']['direction'] = sec_lvl('Direction', 'FORWARD', false, $Γ['global']['$tmp11']['chooseMethod']);
            $Γ['global']['$tmp11']['chooseMethod']['$this']['direction'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$this']['direction'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$this']['direction'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$this']['direction'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$this']['direction'], $Λ[$Λ.length - 1].l);
        } else {
            this.direction = Direction.BACKWARD;
            $Γ['global']['$tmp11']['chooseMethod']['$this']['direction'] = sec_lvl('Direction', 'BACKWARD', false, $Γ['global']['$tmp11']['chooseMethod']);
            $Γ['global']['$tmp11']['chooseMethod']['$this']['direction'] instanceof Object ? $Γ['global']['$tmp11']['chooseMethod']['$this']['direction'].Σ = $lub($Γ['global']['$tmp11']['chooseMethod']['$this']['direction'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['chooseMethod']['$this']['direction'] = $lub($Γ['global']['$tmp11']['chooseMethod']['$this']['direction'], $Λ[$Λ.length - 1].l);
        }
        $Λ.pop();
    }
    $Λ.pop();
    return;
};
$Γ['global']['$tmp11']['chooseMethod'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    mark: $Λ[$Λ.length - 1].l
};
$tmp11 = BinaryConstraint.prototype;
$Γ['global']['$tmp11'] = sec_lvl('BinaryConstraint', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp11'] instanceof Object ? $Γ['global']['$tmp11'].Σ = $lub($Γ['global']['$tmp11'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11'] = $lub($Γ['global']['$tmp11'], $Λ[$Λ.length - 1].l);
$tmp11.addToGraph = function () {
    var $tmp100, $tmp93, $tmp101, $tmp102, $tmp96, $tmp103;
    $Γ['global']['$tmp11']['addToGraph']['$tmp103'] = $Γ['global']['$tmp11']['addToGraph']['$tmp96'] = $Γ['global']['$tmp11']['addToGraph']['$tmp102'] = $Γ['global']['$tmp11']['addToGraph']['$tmp101'] = $Γ['global']['$tmp11']['addToGraph']['$tmp93'] = $Γ['global']['$tmp11']['addToGraph']['$tmp100'] = 0;
    $tmp93 = this.v1;
    $Γ['global']['$tmp11']['addToGraph']['$tmp93'] = sec_lvl('$tmp11', 'v1', false, $Γ['global']['$tmp11']['addToGraph']);
    $Γ['global']['$tmp11']['addToGraph']['$tmp93'] instanceof Object ? $Γ['global']['$tmp11']['addToGraph']['$tmp93'].Σ = $lub($Γ['global']['$tmp11']['addToGraph']['$tmp93'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['addToGraph']['$tmp93'] = $lub($Γ['global']['$tmp11']['addToGraph']['$tmp93'], $Λ[$Λ.length - 1].l);
    $tmp101 = this;
    $Γ['global']['$tmp11']['addToGraph']['$tmp101'] = $Γ['global']['$tmp11']['addToGraph'].$this;
    $Γ['global']['$tmp11']['addToGraph']['$tmp101'] instanceof Object ? $Γ['global']['$tmp11']['addToGraph']['$tmp101'].Σ = $lub($Γ['global']['$tmp11']['addToGraph']['$tmp101'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['addToGraph']['$tmp101'] = $lub($Γ['global']['$tmp11']['addToGraph']['$tmp101'], $Λ[$Λ.length - 1].l);
    $tmp100 = $tmp93.addConstraint($tmp101);
    $tmp96 = this.v2;
    $Γ['global']['$tmp11']['addToGraph']['$tmp96'] = sec_lvl('$tmp11', 'v2', false, $Γ['global']['$tmp11']['addToGraph']);
    $Γ['global']['$tmp11']['addToGraph']['$tmp96'] instanceof Object ? $Γ['global']['$tmp11']['addToGraph']['$tmp96'].Σ = $lub($Γ['global']['$tmp11']['addToGraph']['$tmp96'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['addToGraph']['$tmp96'] = $lub($Γ['global']['$tmp11']['addToGraph']['$tmp96'], $Λ[$Λ.length - 1].l);
    $tmp103 = this;
    $Γ['global']['$tmp11']['addToGraph']['$tmp103'] = $Γ['global']['$tmp11']['addToGraph'].$this;
    $Γ['global']['$tmp11']['addToGraph']['$tmp103'] instanceof Object ? $Γ['global']['$tmp11']['addToGraph']['$tmp103'].Σ = $lub($Γ['global']['$tmp11']['addToGraph']['$tmp103'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['addToGraph']['$tmp103'] = $lub($Γ['global']['$tmp11']['addToGraph']['$tmp103'], $Λ[$Λ.length - 1].l);
    $tmp102 = $tmp96.addConstraint($tmp103);
    this.direction = Direction.NONE;
    $Γ['global']['$tmp11']['addToGraph']['$this']['direction'] = sec_lvl('Direction', 'NONE', false, $Γ['global']['$tmp11']['addToGraph']);
    $Γ['global']['$tmp11']['addToGraph']['$this']['direction'] instanceof Object ? $Γ['global']['$tmp11']['addToGraph']['$this']['direction'].Σ = $lub($Γ['global']['$tmp11']['addToGraph']['$this']['direction'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['addToGraph']['$this']['direction'] = $lub($Γ['global']['$tmp11']['addToGraph']['$this']['direction'], $Λ[$Λ.length - 1].l);
    return;
};
$Γ['global']['$tmp11']['addToGraph'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$tmp11 = BinaryConstraint.prototype;
$Γ['global']['$tmp11'] = sec_lvl('BinaryConstraint', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp11'] instanceof Object ? $Γ['global']['$tmp11'].Σ = $lub($Γ['global']['$tmp11'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11'] = $lub($Γ['global']['$tmp11'], $Λ[$Λ.length - 1].l);
$tmp11.isSatisfied = function () {
    var $tmp104, $tmp105, $tmp106;
    $Γ['global']['$tmp11']['isSatisfied']['$tmp106'] = $Γ['global']['$tmp11']['isSatisfied']['$tmp105'] = $Γ['global']['$tmp11']['isSatisfied']['$tmp104'] = 0;
    $tmp105 = this.direction;
    $Γ['global']['$tmp11']['isSatisfied']['$tmp105'] = sec_lvl('$tmp11', 'direction', false, $Γ['global']['$tmp11']['isSatisfied']);
    $Γ['global']['$tmp11']['isSatisfied']['$tmp105'] instanceof Object ? $Γ['global']['$tmp11']['isSatisfied']['$tmp105'].Σ = $lub($Γ['global']['$tmp11']['isSatisfied']['$tmp105'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['isSatisfied']['$tmp105'] = $lub($Γ['global']['$tmp11']['isSatisfied']['$tmp105'], $Λ[$Λ.length - 1].l);
    $tmp106 = Direction.NONE;
    $Γ['global']['$tmp11']['isSatisfied']['$tmp106'] = sec_lvl('Direction', 'NONE', false, $Γ['global']['$tmp11']['isSatisfied']);
    $Γ['global']['$tmp11']['isSatisfied']['$tmp106'] instanceof Object ? $Γ['global']['$tmp11']['isSatisfied']['$tmp106'].Σ = $lub($Γ['global']['$tmp11']['isSatisfied']['$tmp106'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['isSatisfied']['$tmp106'] = $lub($Γ['global']['$tmp11']['isSatisfied']['$tmp106'], $Λ[$Λ.length - 1].l);
    $tmp104 = $tmp105 != $tmp106;
    $Γ['global']['$tmp11']['isSatisfied']['$tmp104'] = $lub(sec_lvl('$tmp105', null, true, $Γ['global']['$tmp11']['isSatisfied']), sec_lvl('$tmp106', null, true, $Γ['global']['$tmp11']['isSatisfied']));
    $Γ['global']['$tmp11']['isSatisfied']['$tmp104'] instanceof Object ? $Γ['global']['$tmp11']['isSatisfied']['$tmp104'].Σ = $lub($Γ['global']['$tmp11']['isSatisfied']['$tmp104'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['isSatisfied']['$tmp104'] = $lub($Γ['global']['$tmp11']['isSatisfied']['$tmp104'], $Λ[$Λ.length - 1].l);
    return $tmp104;
};
$Γ['global']['$tmp11']['isSatisfied'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$tmp11 = BinaryConstraint.prototype;
$Γ['global']['$tmp11'] = sec_lvl('BinaryConstraint', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp11'] instanceof Object ? $Γ['global']['$tmp11'].Σ = $lub($Γ['global']['$tmp11'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11'] = $lub($Γ['global']['$tmp11'], $Λ[$Λ.length - 1].l);
$tmp11.markInputs = function (mark) {
    var $tmp;
    $Γ['global']['$tmp11']['markInputs']['$tmp'] = 0;
    $rf = $prop('$tmp11', 'input', $Γ['global']['$tmp11']['markInputs']);
    $rf.scope = $Γ['global']['$tmp11']['markInputs'];
    $rf.$this = $Γ['global']['$tmp11']['markInputs']['$this'];
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp = this.input();
    $Γ['global']['$tmp11']['markInputs']['$tmp'] = $Λ.pop().l;
    $Γ['global']['$tmp11']['markInputs']['$tmp'] instanceof Object ? $Γ['global']['$tmp11']['markInputs']['$tmp'].Σ = $lub($Γ['global']['$tmp11']['markInputs']['$tmp'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['markInputs']['$tmp'] = $lub($Γ['global']['$tmp11']['markInputs']['$tmp'], $Λ[$Λ.length - 1].l);
    $tmp.mark = mark;
    $Γ['global']['$tmp11']['markInputs']['$tmp']['mark'] = sec_lvl('mark', null, false, $Γ['global']['$tmp11']['markInputs']);
    $Γ['global']['$tmp11']['markInputs']['$tmp']['mark'] instanceof Object ? $Γ['global']['$tmp11']['markInputs']['$tmp']['mark'].Σ = $lub($Γ['global']['$tmp11']['markInputs']['$tmp']['mark'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['markInputs']['$tmp']['mark'] = $lub($Γ['global']['$tmp11']['markInputs']['$tmp']['mark'], $Λ[$Λ.length - 1].l);
    return;
};
$Γ['global']['$tmp11']['markInputs'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    mark: $Λ[$Λ.length - 1].l
};
$tmp11 = BinaryConstraint.prototype;
$Γ['global']['$tmp11'] = sec_lvl('BinaryConstraint', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp11'] instanceof Object ? $Γ['global']['$tmp11'].Σ = $lub($Γ['global']['$tmp11'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11'] = $lub($Γ['global']['$tmp11'], $Λ[$Λ.length - 1].l);
$tmp11.input = function () {
    var $tmp107, $tmp332, $tmp333, $tmp334;
    $Γ['global']['$tmp11']['input']['$tmp334'] = $Γ['global']['$tmp11']['input']['$tmp333'] = $Γ['global']['$tmp11']['input']['$tmp332'] = $Γ['global']['$tmp11']['input']['$tmp107'] = 0;
    $tmp333 = this.direction;
    $Γ['global']['$tmp11']['input']['$tmp333'] = sec_lvl('$tmp11', 'direction', false, $Γ['global']['$tmp11']['input']);
    $Γ['global']['$tmp11']['input']['$tmp333'] instanceof Object ? $Γ['global']['$tmp11']['input']['$tmp333'].Σ = $lub($Γ['global']['$tmp11']['input']['$tmp333'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['input']['$tmp333'] = $lub($Γ['global']['$tmp11']['input']['$tmp333'], $Λ[$Λ.length - 1].l);
    $tmp334 = Direction.FORWARD;
    $Γ['global']['$tmp11']['input']['$tmp334'] = sec_lvl('Direction', 'FORWARD', false, $Γ['global']['$tmp11']['input']);
    $Γ['global']['$tmp11']['input']['$tmp334'] instanceof Object ? $Γ['global']['$tmp11']['input']['$tmp334'].Σ = $lub($Γ['global']['$tmp11']['input']['$tmp334'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['input']['$tmp334'] = $lub($Γ['global']['$tmp11']['input']['$tmp334'], $Λ[$Λ.length - 1].l);
    $tmp332 = $tmp333 == $tmp334;
    $Γ['global']['$tmp11']['input']['$tmp332'] = $lub(sec_lvl('$tmp333', null, true, $Γ['global']['$tmp11']['input']), sec_lvl('$tmp334', null, true, $Γ['global']['$tmp11']['input']));
    $Γ['global']['$tmp11']['input']['$tmp332'] instanceof Object ? $Γ['global']['$tmp11']['input']['$tmp332'].Σ = $lub($Γ['global']['$tmp11']['input']['$tmp332'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['input']['$tmp332'] = $lub($Γ['global']['$tmp11']['input']['$tmp332'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp332', null, true, $Γ['global']['$tmp11']['input'])),
        id: 'IF'
    });
    if ($tmp332) {
        $tmp107 = this.v1;
        $Γ['global']['$tmp11']['input']['$tmp107'] = sec_lvl('$tmp11', 'v1', false, $Γ['global']['$tmp11']['input']);
        $Γ['global']['$tmp11']['input']['$tmp107'] instanceof Object ? $Γ['global']['$tmp11']['input']['$tmp107'].Σ = $lub($Γ['global']['$tmp11']['input']['$tmp107'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['input']['$tmp107'] = $lub($Γ['global']['$tmp11']['input']['$tmp107'], $Λ[$Λ.length - 1].l);
    } else {
        $tmp107 = this.v2;
        $Γ['global']['$tmp11']['input']['$tmp107'] = sec_lvl('$tmp11', 'v2', false, $Γ['global']['$tmp11']['input']);
        $Γ['global']['$tmp11']['input']['$tmp107'] instanceof Object ? $Γ['global']['$tmp11']['input']['$tmp107'].Σ = $lub($Γ['global']['$tmp11']['input']['$tmp107'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['input']['$tmp107'] = $lub($Γ['global']['$tmp11']['input']['$tmp107'], $Λ[$Λ.length - 1].l);
    }
    $Λ.pop();
    return $tmp107;
};
$Γ['global']['$tmp11']['input'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$tmp11 = BinaryConstraint.prototype;
$Γ['global']['$tmp11'] = sec_lvl('BinaryConstraint', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp11'] instanceof Object ? $Γ['global']['$tmp11'].Σ = $lub($Γ['global']['$tmp11'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11'] = $lub($Γ['global']['$tmp11'], $Λ[$Λ.length - 1].l);
$tmp11.output = function () {
    var $tmp108, $tmp335, $tmp336, $tmp337;
    $Γ['global']['$tmp11']['output']['$tmp337'] = $Γ['global']['$tmp11']['output']['$tmp336'] = $Γ['global']['$tmp11']['output']['$tmp335'] = $Γ['global']['$tmp11']['output']['$tmp108'] = 0;
    $tmp336 = this.direction;
    $Γ['global']['$tmp11']['output']['$tmp336'] = sec_lvl('$tmp11', 'direction', false, $Γ['global']['$tmp11']['output']);
    $Γ['global']['$tmp11']['output']['$tmp336'] instanceof Object ? $Γ['global']['$tmp11']['output']['$tmp336'].Σ = $lub($Γ['global']['$tmp11']['output']['$tmp336'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['output']['$tmp336'] = $lub($Γ['global']['$tmp11']['output']['$tmp336'], $Λ[$Λ.length - 1].l);
    $tmp337 = Direction.FORWARD;
    $Γ['global']['$tmp11']['output']['$tmp337'] = sec_lvl('Direction', 'FORWARD', false, $Γ['global']['$tmp11']['output']);
    $Γ['global']['$tmp11']['output']['$tmp337'] instanceof Object ? $Γ['global']['$tmp11']['output']['$tmp337'].Σ = $lub($Γ['global']['$tmp11']['output']['$tmp337'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['output']['$tmp337'] = $lub($Γ['global']['$tmp11']['output']['$tmp337'], $Λ[$Λ.length - 1].l);
    $tmp335 = $tmp336 == $tmp337;
    $Γ['global']['$tmp11']['output']['$tmp335'] = $lub(sec_lvl('$tmp336', null, true, $Γ['global']['$tmp11']['output']), sec_lvl('$tmp337', null, true, $Γ['global']['$tmp11']['output']));
    $Γ['global']['$tmp11']['output']['$tmp335'] instanceof Object ? $Γ['global']['$tmp11']['output']['$tmp335'].Σ = $lub($Γ['global']['$tmp11']['output']['$tmp335'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['output']['$tmp335'] = $lub($Γ['global']['$tmp11']['output']['$tmp335'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp335', null, true, $Γ['global']['$tmp11']['output'])),
        id: 'IF'
    });
    if ($tmp335) {
        $tmp108 = this.v2;
        $Γ['global']['$tmp11']['output']['$tmp108'] = sec_lvl('$tmp11', 'v2', false, $Γ['global']['$tmp11']['output']);
        $Γ['global']['$tmp11']['output']['$tmp108'] instanceof Object ? $Γ['global']['$tmp11']['output']['$tmp108'].Σ = $lub($Γ['global']['$tmp11']['output']['$tmp108'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['output']['$tmp108'] = $lub($Γ['global']['$tmp11']['output']['$tmp108'], $Λ[$Λ.length - 1].l);
    } else {
        $tmp108 = this.v1;
        $Γ['global']['$tmp11']['output']['$tmp108'] = sec_lvl('$tmp11', 'v1', false, $Γ['global']['$tmp11']['output']);
        $Γ['global']['$tmp11']['output']['$tmp108'] instanceof Object ? $Γ['global']['$tmp11']['output']['$tmp108'].Σ = $lub($Γ['global']['$tmp11']['output']['$tmp108'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['output']['$tmp108'] = $lub($Γ['global']['$tmp11']['output']['$tmp108'], $Λ[$Λ.length - 1].l);
    }
    $Λ.pop();
    return $tmp108;
};
$Γ['global']['$tmp11']['output'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$tmp11 = BinaryConstraint.prototype;
$Γ['global']['$tmp11'] = sec_lvl('BinaryConstraint', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp11'] instanceof Object ? $Γ['global']['$tmp11'].Σ = $lub($Γ['global']['$tmp11'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11'] = $lub($Γ['global']['$tmp11'], $Λ[$Λ.length - 1].l);
$tmp11.recalculate = function () {
    var ihn, out, $tmp109, $tmp110, $tmp111;
    $Γ['global']['$tmp11']['recalculate']['$tmp111'] = $Γ['global']['$tmp11']['recalculate']['$tmp110'] = $Γ['global']['$tmp11']['recalculate']['$tmp109'] = $Γ['global']['$tmp11']['recalculate']['out'] = $Γ['global']['$tmp11']['recalculate']['ihn'] = 0;
    $rf = $prop('$tmp11', 'input', $Γ['global']['$tmp11']['recalculate']);
    $rf.scope = $Γ['global']['$tmp11']['recalculate'];
    $rf.$this = $Γ['global']['$tmp11']['recalculate']['$this'];
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    ihn = this.input();
    $scope($Γ['global']['$tmp11']['recalculate'], 'ihn', true)['ihn'] = $Λ.pop().l;
    $scope($Γ['global']['$tmp11']['recalculate'], 'ihn', true)['ihn'] instanceof Object ? $scope($Γ['global']['$tmp11']['recalculate'], 'ihn', true)['ihn'].Σ = $lub($scope($Γ['global']['$tmp11']['recalculate'], 'ihn', true)['ihn'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp11']['recalculate'], 'ihn', true)['ihn'] = $lub($scope($Γ['global']['$tmp11']['recalculate'], 'ihn', true)['ihn'], $Λ[$Λ.length - 1].l);
    $rf = $prop('$tmp11', 'output', $Γ['global']['$tmp11']['recalculate']);
    $rf.scope = $Γ['global']['$tmp11']['recalculate'];
    $rf.$this = $Γ['global']['$tmp11']['recalculate']['$this'];
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    out = this.output();
    $scope($Γ['global']['$tmp11']['recalculate'], 'out', true)['out'] = $Λ.pop().l;
    $scope($Γ['global']['$tmp11']['recalculate'], 'out', true)['out'] instanceof Object ? $scope($Γ['global']['$tmp11']['recalculate'], 'out', true)['out'].Σ = $lub($scope($Γ['global']['$tmp11']['recalculate'], 'out', true)['out'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp11']['recalculate'], 'out', true)['out'] = $lub($scope($Γ['global']['$tmp11']['recalculate'], 'out', true)['out'], $Λ[$Λ.length - 1].l);
    $tmp109 = this.strength;
    $Γ['global']['$tmp11']['recalculate']['$tmp109'] = sec_lvl('$tmp11', 'strength', false, $Γ['global']['$tmp11']['recalculate']);
    $Γ['global']['$tmp11']['recalculate']['$tmp109'] instanceof Object ? $Γ['global']['$tmp11']['recalculate']['$tmp109'].Σ = $lub($Γ['global']['$tmp11']['recalculate']['$tmp109'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['recalculate']['$tmp109'] = $lub($Γ['global']['$tmp11']['recalculate']['$tmp109'], $Λ[$Λ.length - 1].l);
    $tmp110 = ihn.walkStrength;
    $Γ['global']['$tmp11']['recalculate']['$tmp110'] = sec_lvl('ihn', 'walkStrength', false, $Γ['global']['$tmp11']['recalculate']);
    $Γ['global']['$tmp11']['recalculate']['$tmp110'] instanceof Object ? $Γ['global']['$tmp11']['recalculate']['$tmp110'].Σ = $lub($Γ['global']['$tmp11']['recalculate']['$tmp110'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['recalculate']['$tmp110'] = $lub($Γ['global']['$tmp11']['recalculate']['$tmp110'], $Λ[$Λ.length - 1].l);
    $rf = $prop('Strength', 'weakestOf', $Γ['global']['$tmp11']['recalculate']);
    $rf.scope = $Γ['global']['$tmp11']['recalculate'];
    $rf.$this = $scope($Γ['global']['$tmp11']['recalculate'], 'Strength', false)['Strength'];
    $rf['s1'] = $lub(sec_lvl('$tmp109', null, true, $Γ['global']['$tmp11']['recalculate']), $Λ[$Λ.length - 1].l);
    $rf['s2'] = $lub(sec_lvl('$tmp110', null, true, $Γ['global']['$tmp11']['recalculate']), $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    out.walkStrength = Strength.weakestOf($tmp109, $tmp110);
    $scope($Γ['global']['$tmp11']['recalculate'], 'out', false)['walkStrength'] = $Λ.pop().l;
    $scope($Γ['global']['$tmp11']['recalculate'], 'out', false)['walkStrength'] instanceof Object ? $scope($Γ['global']['$tmp11']['recalculate'], 'out', false)['walkStrength'].Σ = $lub($scope($Γ['global']['$tmp11']['recalculate'], 'out', false)['walkStrength'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp11']['recalculate'], 'out', false)['walkStrength'] = $lub($scope($Γ['global']['$tmp11']['recalculate'], 'out', false)['walkStrength'], $Λ[$Λ.length - 1].l);
    out.stay = ihn.stay;
    $scope($Γ['global']['$tmp11']['recalculate'], 'out', false)['stay'] = sec_lvl('ihn', 'stay', false, $Γ['global']['$tmp11']['recalculate']);
    $scope($Γ['global']['$tmp11']['recalculate'], 'out', false)['stay'] instanceof Object ? $scope($Γ['global']['$tmp11']['recalculate'], 'out', false)['stay'].Σ = $lub($scope($Γ['global']['$tmp11']['recalculate'], 'out', false)['stay'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp11']['recalculate'], 'out', false)['stay'] = $lub($scope($Γ['global']['$tmp11']['recalculate'], 'out', false)['stay'], $Λ[$Λ.length - 1].l);
    $tmp111 = out.stay;
    $Γ['global']['$tmp11']['recalculate']['$tmp111'] = sec_lvl('out', 'stay', false, $Γ['global']['$tmp11']['recalculate']);
    $Γ['global']['$tmp11']['recalculate']['$tmp111'] instanceof Object ? $Γ['global']['$tmp11']['recalculate']['$tmp111'].Σ = $lub($Γ['global']['$tmp11']['recalculate']['$tmp111'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['recalculate']['$tmp111'] = $lub($Γ['global']['$tmp11']['recalculate']['$tmp111'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp111', null, true, $Γ['global']['$tmp11']['recalculate'])),
        id: 'IF'
    });
    if ($tmp111) {
        var $tmp338;
        $Γ['global']['$tmp11']['recalculate']['$tmp338'] = 0;
        $tmp338 = this.execute();
    } else {
        $upgrade([
            'this.execute',
            '$tmp338'
        ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp11']['recalculate']);
    }
    $Λ.pop();
    return;
};
$Γ['global']['$tmp11']['recalculate'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$tmp11 = BinaryConstraint.prototype;
$Γ['global']['$tmp11'] = sec_lvl('BinaryConstraint', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp11'] instanceof Object ? $Γ['global']['$tmp11'].Σ = $lub($Γ['global']['$tmp11'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11'] = $lub($Γ['global']['$tmp11'], $Λ[$Λ.length - 1].l);
$tmp11.markUnsatisfied = function () {
    this.direction = Direction.NONE;
    $Γ['global']['$tmp11']['markUnsatisfied']['$this']['direction'] = sec_lvl('Direction', 'NONE', false, $Γ['global']['$tmp11']['markUnsatisfied']);
    $Γ['global']['$tmp11']['markUnsatisfied']['$this']['direction'] instanceof Object ? $Γ['global']['$tmp11']['markUnsatisfied']['$this']['direction'].Σ = $lub($Γ['global']['$tmp11']['markUnsatisfied']['$this']['direction'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['markUnsatisfied']['$this']['direction'] = $lub($Γ['global']['$tmp11']['markUnsatisfied']['$this']['direction'], $Λ[$Λ.length - 1].l);
    return;
};
$Γ['global']['$tmp11']['markUnsatisfied'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$tmp11 = BinaryConstraint.prototype;
$Γ['global']['$tmp11'] = sec_lvl('BinaryConstraint', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp11'] instanceof Object ? $Γ['global']['$tmp11'].Σ = $lub($Γ['global']['$tmp11'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11'] = $lub($Γ['global']['$tmp11'], $Λ[$Λ.length - 1].l);
$tmp11.inputsKnown = function (mark) {
    var i, $tmp112, $tmp113, $tmp114, $tmp115, $tmp116, $tmp117, $tmp118;
    $Γ['global']['$tmp11']['inputsKnown']['$tmp118'] = $Γ['global']['$tmp11']['inputsKnown']['$tmp117'] = $Γ['global']['$tmp11']['inputsKnown']['$tmp116'] = $Γ['global']['$tmp11']['inputsKnown']['$tmp115'] = $Γ['global']['$tmp11']['inputsKnown']['$tmp114'] = $Γ['global']['$tmp11']['inputsKnown']['$tmp113'] = $Γ['global']['$tmp11']['inputsKnown']['$tmp112'] = $Γ['global']['$tmp11']['inputsKnown']['i'] = 0;
    $rf = $prop('$tmp11', 'input', $Γ['global']['$tmp11']['inputsKnown']);
    $rf.scope = $Γ['global']['$tmp11']['inputsKnown'];
    $rf.$this = $Γ['global']['$tmp11']['inputsKnown']['$this'];
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    i = this.input();
    $scope($Γ['global']['$tmp11']['inputsKnown'], 'i', true)['i'] = $Λ.pop().l;
    $scope($Γ['global']['$tmp11']['inputsKnown'], 'i', true)['i'] instanceof Object ? $scope($Γ['global']['$tmp11']['inputsKnown'], 'i', true)['i'].Σ = $lub($scope($Γ['global']['$tmp11']['inputsKnown'], 'i', true)['i'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp11']['inputsKnown'], 'i', true)['i'] = $lub($scope($Γ['global']['$tmp11']['inputsKnown'], 'i', true)['i'], $Λ[$Λ.length - 1].l);
    $tmp115 = i.mark;
    $Γ['global']['$tmp11']['inputsKnown']['$tmp115'] = {
        Σ: 0,
        prototype: { Σ: $Λ[$Λ.length - 1].l }
    };
    $Γ['global']['$tmp11']['inputsKnown']['$tmp115'] instanceof Object ? $Γ['global']['$tmp11']['inputsKnown']['$tmp115'].Σ = $lub($Γ['global']['$tmp11']['inputsKnown']['$tmp115'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['inputsKnown']['$tmp115'] = $lub($Γ['global']['$tmp11']['inputsKnown']['$tmp115'], $Λ[$Λ.length - 1].l);
    $tmp114 = $tmp115 == mark;
    $Γ['global']['$tmp11']['inputsKnown']['$tmp114'] = $lub(sec_lvl('$tmp115', null, true, $Γ['global']['$tmp11']['inputsKnown']), sec_lvl('mark', null, true, $Γ['global']['$tmp11']['inputsKnown']));
    $Γ['global']['$tmp11']['inputsKnown']['$tmp114'] instanceof Object ? $Γ['global']['$tmp11']['inputsKnown']['$tmp114'].Σ = $lub($Γ['global']['$tmp11']['inputsKnown']['$tmp114'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['inputsKnown']['$tmp114'] = $lub($Γ['global']['$tmp11']['inputsKnown']['$tmp114'], $Λ[$Λ.length - 1].l);
    $tmp116 = i.stay;
    $Γ['global']['$tmp11']['inputsKnown']['$tmp116'] = {
        Σ: 0,
        prototype: { Σ: $Λ[$Λ.length - 1].l }
    };
    $Γ['global']['$tmp11']['inputsKnown']['$tmp116'] instanceof Object ? $Γ['global']['$tmp11']['inputsKnown']['$tmp116'].Σ = $lub($Γ['global']['$tmp11']['inputsKnown']['$tmp116'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['inputsKnown']['$tmp116'] = $lub($Γ['global']['$tmp11']['inputsKnown']['$tmp116'], $Λ[$Λ.length - 1].l);
    $tmp113 = $tmp114 || $tmp116;
    $Γ['global']['$tmp11']['inputsKnown']['$tmp113'] = $lub(sec_lvl('$tmp114', null, true, $Γ['global']['$tmp11']['inputsKnown']), sec_lvl('$tmp116', null, true, $Γ['global']['$tmp11']['inputsKnown']));
    $Γ['global']['$tmp11']['inputsKnown']['$tmp113'] instanceof Object ? $Γ['global']['$tmp11']['inputsKnown']['$tmp113'].Σ = $lub($Γ['global']['$tmp11']['inputsKnown']['$tmp113'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['inputsKnown']['$tmp113'] = $lub($Γ['global']['$tmp11']['inputsKnown']['$tmp113'], $Λ[$Λ.length - 1].l);
    $tmp118 = i.determinedBy;
    $Γ['global']['$tmp11']['inputsKnown']['$tmp118'] = {
        Σ: 0,
        prototype: { Σ: $Λ[$Λ.length - 1].l }
    };
    $Γ['global']['$tmp11']['inputsKnown']['$tmp118'] instanceof Object ? $Γ['global']['$tmp11']['inputsKnown']['$tmp118'].Σ = $lub($Γ['global']['$tmp11']['inputsKnown']['$tmp118'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['inputsKnown']['$tmp118'] = $lub($Γ['global']['$tmp11']['inputsKnown']['$tmp118'], $Λ[$Λ.length - 1].l);
    $tmp117 = $tmp118 == null;
    $Γ['global']['$tmp11']['inputsKnown']['$tmp117'] = $lub(sec_lvl('$tmp118', null, true, $Γ['global']['$tmp11']['inputsKnown']), $Λ[$Λ.length - 1].l);
    $Γ['global']['$tmp11']['inputsKnown']['$tmp117'] instanceof Object ? $Γ['global']['$tmp11']['inputsKnown']['$tmp117'].Σ = $lub($Γ['global']['$tmp11']['inputsKnown']['$tmp117'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['inputsKnown']['$tmp117'] = $lub($Γ['global']['$tmp11']['inputsKnown']['$tmp117'], $Λ[$Λ.length - 1].l);
    $tmp112 = $tmp113 || $tmp117;
    $Γ['global']['$tmp11']['inputsKnown']['$tmp112'] = $lub(sec_lvl('$tmp113', null, true, $Γ['global']['$tmp11']['inputsKnown']), sec_lvl('$tmp117', null, true, $Γ['global']['$tmp11']['inputsKnown']));
    $Γ['global']['$tmp11']['inputsKnown']['$tmp112'] instanceof Object ? $Γ['global']['$tmp11']['inputsKnown']['$tmp112'].Σ = $lub($Γ['global']['$tmp11']['inputsKnown']['$tmp112'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['inputsKnown']['$tmp112'] = $lub($Γ['global']['$tmp11']['inputsKnown']['$tmp112'], $Λ[$Λ.length - 1].l);
    return $tmp112;
};
$Γ['global']['$tmp11']['inputsKnown'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    mark: $Λ[$Λ.length - 1].l
};
$tmp11 = BinaryConstraint.prototype;
$Γ['global']['$tmp11'] = sec_lvl('BinaryConstraint', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp11'] instanceof Object ? $Γ['global']['$tmp11'].Σ = $lub($Γ['global']['$tmp11'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11'] = $lub($Γ['global']['$tmp11'], $Λ[$Λ.length - 1].l);
$tmp11.removeFromGraph = function () {
    var $tmp119, $tmp120, $tmp121, $tmp122;
    $Γ['global']['$tmp11']['removeFromGraph']['$tmp122'] = $Γ['global']['$tmp11']['removeFromGraph']['$tmp121'] = $Γ['global']['$tmp11']['removeFromGraph']['$tmp120'] = $Γ['global']['$tmp11']['removeFromGraph']['$tmp119'] = 0;
    $tmp120 = this.v1;
    $Γ['global']['$tmp11']['removeFromGraph']['$tmp120'] = sec_lvl('$tmp11', 'v1', false, $Γ['global']['$tmp11']['removeFromGraph']);
    $Γ['global']['$tmp11']['removeFromGraph']['$tmp120'] instanceof Object ? $Γ['global']['$tmp11']['removeFromGraph']['$tmp120'].Σ = $lub($Γ['global']['$tmp11']['removeFromGraph']['$tmp120'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['removeFromGraph']['$tmp120'] = $lub($Γ['global']['$tmp11']['removeFromGraph']['$tmp120'], $Λ[$Λ.length - 1].l);
    $tmp119 = $tmp120 != null;
    $Γ['global']['$tmp11']['removeFromGraph']['$tmp119'] = $lub(sec_lvl('$tmp120', null, true, $Γ['global']['$tmp11']['removeFromGraph']), $Λ[$Λ.length - 1].l);
    $Γ['global']['$tmp11']['removeFromGraph']['$tmp119'] instanceof Object ? $Γ['global']['$tmp11']['removeFromGraph']['$tmp119'].Σ = $lub($Γ['global']['$tmp11']['removeFromGraph']['$tmp119'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['removeFromGraph']['$tmp119'] = $lub($Γ['global']['$tmp11']['removeFromGraph']['$tmp119'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp119', null, true, $Γ['global']['$tmp11']['removeFromGraph'])),
        id: 'IF'
    });
    if ($tmp119) {
        var $tmp339, $tmp93, $tmp340;
        $Γ['global']['$tmp11']['removeFromGraph']['$tmp340'] = $Γ['global']['$tmp11']['removeFromGraph']['$tmp93'] = $Γ['global']['$tmp11']['removeFromGraph']['$tmp339'] = 0;
        $tmp93 = this.v1;
        $Γ['global']['$tmp11']['removeFromGraph']['$tmp93'] = sec_lvl('$tmp11', 'v1', false, $Γ['global']['$tmp11']['removeFromGraph']);
        $Γ['global']['$tmp11']['removeFromGraph']['$tmp93'] instanceof Object ? $Γ['global']['$tmp11']['removeFromGraph']['$tmp93'].Σ = $lub($Γ['global']['$tmp11']['removeFromGraph']['$tmp93'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['removeFromGraph']['$tmp93'] = $lub($Γ['global']['$tmp11']['removeFromGraph']['$tmp93'], $Λ[$Λ.length - 1].l);
        $tmp340 = this;
        $Γ['global']['$tmp11']['removeFromGraph']['$tmp340'] = $Γ['global']['$tmp11']['removeFromGraph'].$this;
        $Γ['global']['$tmp11']['removeFromGraph']['$tmp340'] instanceof Object ? $Γ['global']['$tmp11']['removeFromGraph']['$tmp340'].Σ = $lub($Γ['global']['$tmp11']['removeFromGraph']['$tmp340'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['removeFromGraph']['$tmp340'] = $lub($Γ['global']['$tmp11']['removeFromGraph']['$tmp340'], $Λ[$Λ.length - 1].l);
        $tmp339 = $tmp93.removeConstraint($tmp340);
    } else {
        $upgrade([
            '$tmp93.removeConstraint',
            '$tmp339'
        ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp11']['removeFromGraph']);
    }
    $Λ.pop();
    $tmp122 = this.v2;
    $Γ['global']['$tmp11']['removeFromGraph']['$tmp122'] = sec_lvl('$tmp11', 'v2', false, $Γ['global']['$tmp11']['removeFromGraph']);
    $Γ['global']['$tmp11']['removeFromGraph']['$tmp122'] instanceof Object ? $Γ['global']['$tmp11']['removeFromGraph']['$tmp122'].Σ = $lub($Γ['global']['$tmp11']['removeFromGraph']['$tmp122'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['removeFromGraph']['$tmp122'] = $lub($Γ['global']['$tmp11']['removeFromGraph']['$tmp122'], $Λ[$Λ.length - 1].l);
    $tmp121 = $tmp122 != null;
    $Γ['global']['$tmp11']['removeFromGraph']['$tmp121'] = $lub(sec_lvl('$tmp122', null, true, $Γ['global']['$tmp11']['removeFromGraph']), $Λ[$Λ.length - 1].l);
    $Γ['global']['$tmp11']['removeFromGraph']['$tmp121'] instanceof Object ? $Γ['global']['$tmp11']['removeFromGraph']['$tmp121'].Σ = $lub($Γ['global']['$tmp11']['removeFromGraph']['$tmp121'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['removeFromGraph']['$tmp121'] = $lub($Γ['global']['$tmp11']['removeFromGraph']['$tmp121'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp121', null, true, $Γ['global']['$tmp11']['removeFromGraph'])),
        id: 'IF'
    });
    if ($tmp121) {
        var $tmp341, $tmp96, $tmp342;
        $Γ['global']['$tmp11']['removeFromGraph']['$tmp342'] = $Γ['global']['$tmp11']['removeFromGraph']['$tmp96'] = $Γ['global']['$tmp11']['removeFromGraph']['$tmp341'] = 0;
        $tmp96 = this.v2;
        $Γ['global']['$tmp11']['removeFromGraph']['$tmp96'] = sec_lvl('$tmp11', 'v2', false, $Γ['global']['$tmp11']['removeFromGraph']);
        $Γ['global']['$tmp11']['removeFromGraph']['$tmp96'] instanceof Object ? $Γ['global']['$tmp11']['removeFromGraph']['$tmp96'].Σ = $lub($Γ['global']['$tmp11']['removeFromGraph']['$tmp96'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['removeFromGraph']['$tmp96'] = $lub($Γ['global']['$tmp11']['removeFromGraph']['$tmp96'], $Λ[$Λ.length - 1].l);
        $tmp342 = this;
        $Γ['global']['$tmp11']['removeFromGraph']['$tmp342'] = $Γ['global']['$tmp11']['removeFromGraph'].$this;
        $Γ['global']['$tmp11']['removeFromGraph']['$tmp342'] instanceof Object ? $Γ['global']['$tmp11']['removeFromGraph']['$tmp342'].Σ = $lub($Γ['global']['$tmp11']['removeFromGraph']['$tmp342'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['removeFromGraph']['$tmp342'] = $lub($Γ['global']['$tmp11']['removeFromGraph']['$tmp342'], $Λ[$Λ.length - 1].l);
        $tmp341 = $tmp96.removeConstraint($tmp342);
    } else {
        $upgrade([
            '$tmp96.removeConstraint',
            '$tmp341'
        ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp11']['removeFromGraph']);
    }
    $Λ.pop();
    this.direction = Direction.NONE;
    $Γ['global']['$tmp11']['removeFromGraph']['$this']['direction'] = sec_lvl('Direction', 'NONE', false, $Γ['global']['$tmp11']['removeFromGraph']);
    $Γ['global']['$tmp11']['removeFromGraph']['$this']['direction'] instanceof Object ? $Γ['global']['$tmp11']['removeFromGraph']['$this']['direction'].Σ = $lub($Γ['global']['$tmp11']['removeFromGraph']['$this']['direction'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp11']['removeFromGraph']['$this']['direction'] = $lub($Γ['global']['$tmp11']['removeFromGraph']['$this']['direction'], $Λ[$Λ.length - 1].l);
    return;
};
$Γ['global']['$tmp11']['removeFromGraph'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
function ScaleConstraint(src, scale, offset, dest, strength) {
    this.direction = Direction.NONE;
    $Γ['global']['ScaleConstraint']['$this']['direction'] = sec_lvl('Direction', 'NONE', false, $Γ['global']['ScaleConstraint']);
    $Γ['global']['ScaleConstraint']['$this']['direction'] instanceof Object ? $Γ['global']['ScaleConstraint']['$this']['direction'].Σ = $lub($Γ['global']['ScaleConstraint']['$this']['direction'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['ScaleConstraint']['$this']['direction'] = $lub($Γ['global']['ScaleConstraint']['$this']['direction'], $Λ[$Λ.length - 1].l);
    this.scale = scale;
    $Γ['global']['ScaleConstraint']['$this']['scale'] = sec_lvl('scale', null, false, $Γ['global']['ScaleConstraint']);
    $Γ['global']['ScaleConstraint']['$this']['scale'] instanceof Object ? $Γ['global']['ScaleConstraint']['$this']['scale'].Σ = $lub($Γ['global']['ScaleConstraint']['$this']['scale'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['ScaleConstraint']['$this']['scale'] = $lub($Γ['global']['ScaleConstraint']['$this']['scale'], $Λ[$Λ.length - 1].l);
    this.offset = offset;
    $Γ['global']['ScaleConstraint']['$this']['offset'] = sec_lvl('offset', null, false, $Γ['global']['ScaleConstraint']);
    $Γ['global']['ScaleConstraint']['$this']['offset'] instanceof Object ? $Γ['global']['ScaleConstraint']['$this']['offset'].Σ = $lub($Γ['global']['ScaleConstraint']['$this']['offset'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['ScaleConstraint']['$this']['offset'] = $lub($Γ['global']['ScaleConstraint']['$this']['offset'], $Λ[$Λ.length - 1].l);
    var $tmp123, $tmp124, $tmp125;
    $Γ['global']['ScaleConstraint']['$tmp125'] = $Γ['global']['ScaleConstraint']['$tmp124'] = $Γ['global']['ScaleConstraint']['$tmp123'] = 0;
    $tmp124 = ScaleConstraint.superConstructor;
    $Γ['global']['ScaleConstraint']['$tmp124'] = sec_lvl('ScaleConstraint', 'superConstructor', false, $Γ['global']['ScaleConstraint']);
    $Γ['global']['ScaleConstraint']['$tmp124'] instanceof Object ? $Γ['global']['ScaleConstraint']['$tmp124'].Σ = $lub($Γ['global']['ScaleConstraint']['$tmp124'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['ScaleConstraint']['$tmp124'] = $lub($Γ['global']['ScaleConstraint']['$tmp124'], $Λ[$Λ.length - 1].l);
    $tmp125 = this;
    $Γ['global']['ScaleConstraint']['$tmp125'] = $Γ['global']['ScaleConstraint'].$this;
    $Γ['global']['ScaleConstraint']['$tmp125'] instanceof Object ? $Γ['global']['ScaleConstraint']['$tmp125'].Σ = $lub($Γ['global']['ScaleConstraint']['$tmp125'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['ScaleConstraint']['$tmp125'] = $lub($Γ['global']['ScaleConstraint']['$tmp125'], $Λ[$Λ.length - 1].l);
    $tmp123 = $tmp124.call($tmp125, src, dest, strength);
    return;
}
$tmp12 = ScaleConstraint.inheritsFrom(BinaryConstraint);
$tmp13 = ScaleConstraint.prototype;
$Γ['global']['$tmp13'] = sec_lvl('ScaleConstraint', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp13'] instanceof Object ? $Γ['global']['$tmp13'].Σ = $lub($Γ['global']['$tmp13'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13'] = $lub($Γ['global']['$tmp13'], $Λ[$Λ.length - 1].l);
$tmp13.addToGraph = function () {
    var $tmp126, $tmp124, $tmp127, $tmp128, $tmp129, $tmp130, $tmp131, $tmp132, $tmp133;
    $Γ['global']['$tmp13']['addToGraph']['$tmp133'] = $Γ['global']['$tmp13']['addToGraph']['$tmp132'] = $Γ['global']['$tmp13']['addToGraph']['$tmp131'] = $Γ['global']['$tmp13']['addToGraph']['$tmp130'] = $Γ['global']['$tmp13']['addToGraph']['$tmp129'] = $Γ['global']['$tmp13']['addToGraph']['$tmp128'] = $Γ['global']['$tmp13']['addToGraph']['$tmp127'] = $Γ['global']['$tmp13']['addToGraph']['$tmp124'] = $Γ['global']['$tmp13']['addToGraph']['$tmp126'] = 0;
    $tmp124 = ScaleConstraint.superConstructor;
    $Γ['global']['$tmp13']['addToGraph']['$tmp124'] = sec_lvl('ScaleConstraint', 'superConstructor', false, $Γ['global']['$tmp13']['addToGraph']);
    $Γ['global']['$tmp13']['addToGraph']['$tmp124'] instanceof Object ? $Γ['global']['$tmp13']['addToGraph']['$tmp124'].Σ = $lub($Γ['global']['$tmp13']['addToGraph']['$tmp124'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['addToGraph']['$tmp124'] = $lub($Γ['global']['$tmp13']['addToGraph']['$tmp124'], $Λ[$Λ.length - 1].l);
    $tmp = $tmp124.prototype;
    $Γ['global']['$tmp13']['addToGraph']['$tmp'] = sec_lvl('$tmp124', 'prototype', false, $Γ['global']['$tmp13']['addToGraph']);
    $Γ['global']['$tmp13']['addToGraph']['$tmp'] instanceof Object ? $Γ['global']['$tmp13']['addToGraph']['$tmp'].Σ = $lub($Γ['global']['$tmp13']['addToGraph']['$tmp'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['addToGraph']['$tmp'] = $lub($Γ['global']['$tmp13']['addToGraph']['$tmp'], $Λ[$Λ.length - 1].l);
    $tmp = $tmp.addToGraph;
    $Γ['global']['$tmp13']['addToGraph']['$tmp'] = sec_lvl('$tmp', 'addToGraph', false, $Γ['global']['$tmp13']['addToGraph']);
    $Γ['global']['$tmp13']['addToGraph']['$tmp'] instanceof Object ? $Γ['global']['$tmp13']['addToGraph']['$tmp'].Σ = $lub($Γ['global']['$tmp13']['addToGraph']['$tmp'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['addToGraph']['$tmp'] = $lub($Γ['global']['$tmp13']['addToGraph']['$tmp'], $Λ[$Λ.length - 1].l);
    $tmp127 = this;
    $Γ['global']['$tmp13']['addToGraph']['$tmp127'] = $Γ['global']['$tmp13']['addToGraph'].$this;
    $Γ['global']['$tmp13']['addToGraph']['$tmp127'] instanceof Object ? $Γ['global']['$tmp13']['addToGraph']['$tmp127'].Σ = $lub($Γ['global']['$tmp13']['addToGraph']['$tmp127'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['addToGraph']['$tmp127'] = $lub($Γ['global']['$tmp13']['addToGraph']['$tmp127'], $Λ[$Λ.length - 1].l);
    $tmp126 = $tmp.call($tmp127);
    $tmp129 = this.scale;
    $Γ['global']['$tmp13']['addToGraph']['$tmp129'] = sec_lvl('$tmp13', 'scale', false, $Γ['global']['$tmp13']['addToGraph']);
    $Γ['global']['$tmp13']['addToGraph']['$tmp129'] instanceof Object ? $Γ['global']['$tmp13']['addToGraph']['$tmp129'].Σ = $lub($Γ['global']['$tmp13']['addToGraph']['$tmp129'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['addToGraph']['$tmp129'] = $lub($Γ['global']['$tmp13']['addToGraph']['$tmp129'], $Λ[$Λ.length - 1].l);
    $tmp130 = this;
    $Γ['global']['$tmp13']['addToGraph']['$tmp130'] = $Γ['global']['$tmp13']['addToGraph'].$this;
    $Γ['global']['$tmp13']['addToGraph']['$tmp130'] instanceof Object ? $Γ['global']['$tmp13']['addToGraph']['$tmp130'].Σ = $lub($Γ['global']['$tmp13']['addToGraph']['$tmp130'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['addToGraph']['$tmp130'] = $lub($Γ['global']['$tmp13']['addToGraph']['$tmp130'], $Λ[$Λ.length - 1].l);
    $tmp128 = $tmp129.addConstraint($tmp130);
    $tmp132 = this.offset;
    $Γ['global']['$tmp13']['addToGraph']['$tmp132'] = sec_lvl('$tmp13', 'offset', false, $Γ['global']['$tmp13']['addToGraph']);
    $Γ['global']['$tmp13']['addToGraph']['$tmp132'] instanceof Object ? $Γ['global']['$tmp13']['addToGraph']['$tmp132'].Σ = $lub($Γ['global']['$tmp13']['addToGraph']['$tmp132'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['addToGraph']['$tmp132'] = $lub($Γ['global']['$tmp13']['addToGraph']['$tmp132'], $Λ[$Λ.length - 1].l);
    $tmp133 = this;
    $Γ['global']['$tmp13']['addToGraph']['$tmp133'] = $Γ['global']['$tmp13']['addToGraph'].$this;
    $Γ['global']['$tmp13']['addToGraph']['$tmp133'] instanceof Object ? $Γ['global']['$tmp13']['addToGraph']['$tmp133'].Σ = $lub($Γ['global']['$tmp13']['addToGraph']['$tmp133'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['addToGraph']['$tmp133'] = $lub($Γ['global']['$tmp13']['addToGraph']['$tmp133'], $Λ[$Λ.length - 1].l);
    $tmp131 = $tmp132.addConstraint($tmp133);
    return;
};
$Γ['global']['$tmp13']['addToGraph'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$tmp13 = ScaleConstraint.prototype;
$Γ['global']['$tmp13'] = sec_lvl('ScaleConstraint', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp13'] instanceof Object ? $Γ['global']['$tmp13'].Σ = $lub($Γ['global']['$tmp13'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13'] = $lub($Γ['global']['$tmp13'], $Λ[$Λ.length - 1].l);
$tmp13.removeFromGraph = function () {
    var $tmp134, $tmp124, $tmp135, $tmp136, $tmp137, $tmp138, $tmp139;
    $Γ['global']['$tmp13']['removeFromGraph']['$tmp139'] = $Γ['global']['$tmp13']['removeFromGraph']['$tmp138'] = $Γ['global']['$tmp13']['removeFromGraph']['$tmp137'] = $Γ['global']['$tmp13']['removeFromGraph']['$tmp136'] = $Γ['global']['$tmp13']['removeFromGraph']['$tmp135'] = $Γ['global']['$tmp13']['removeFromGraph']['$tmp124'] = $Γ['global']['$tmp13']['removeFromGraph']['$tmp134'] = 0;
    $tmp124 = ScaleConstraint.superConstructor;
    $Γ['global']['$tmp13']['removeFromGraph']['$tmp124'] = sec_lvl('ScaleConstraint', 'superConstructor', false, $Γ['global']['$tmp13']['removeFromGraph']);
    $Γ['global']['$tmp13']['removeFromGraph']['$tmp124'] instanceof Object ? $Γ['global']['$tmp13']['removeFromGraph']['$tmp124'].Σ = $lub($Γ['global']['$tmp13']['removeFromGraph']['$tmp124'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['removeFromGraph']['$tmp124'] = $lub($Γ['global']['$tmp13']['removeFromGraph']['$tmp124'], $Λ[$Λ.length - 1].l);
    $tmp = $tmp124.prototype;
    $Γ['global']['$tmp13']['removeFromGraph']['$tmp'] = sec_lvl('$tmp124', 'prototype', false, $Γ['global']['$tmp13']['removeFromGraph']);
    $Γ['global']['$tmp13']['removeFromGraph']['$tmp'] instanceof Object ? $Γ['global']['$tmp13']['removeFromGraph']['$tmp'].Σ = $lub($Γ['global']['$tmp13']['removeFromGraph']['$tmp'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['removeFromGraph']['$tmp'] = $lub($Γ['global']['$tmp13']['removeFromGraph']['$tmp'], $Λ[$Λ.length - 1].l);
    $tmp = $tmp.removeFromGraph;
    $Γ['global']['$tmp13']['removeFromGraph']['$tmp'] = sec_lvl('$tmp', 'removeFromGraph', false, $Γ['global']['$tmp13']['removeFromGraph']);
    $Γ['global']['$tmp13']['removeFromGraph']['$tmp'] instanceof Object ? $Γ['global']['$tmp13']['removeFromGraph']['$tmp'].Σ = $lub($Γ['global']['$tmp13']['removeFromGraph']['$tmp'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['removeFromGraph']['$tmp'] = $lub($Γ['global']['$tmp13']['removeFromGraph']['$tmp'], $Λ[$Λ.length - 1].l);
    $tmp135 = this;
    $Γ['global']['$tmp13']['removeFromGraph']['$tmp135'] = $Γ['global']['$tmp13']['removeFromGraph'].$this;
    $Γ['global']['$tmp13']['removeFromGraph']['$tmp135'] instanceof Object ? $Γ['global']['$tmp13']['removeFromGraph']['$tmp135'].Σ = $lub($Γ['global']['$tmp13']['removeFromGraph']['$tmp135'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['removeFromGraph']['$tmp135'] = $lub($Γ['global']['$tmp13']['removeFromGraph']['$tmp135'], $Λ[$Λ.length - 1].l);
    $tmp134 = $tmp.call($tmp135);
    $tmp137 = this.scale;
    $Γ['global']['$tmp13']['removeFromGraph']['$tmp137'] = sec_lvl('$tmp13', 'scale', false, $Γ['global']['$tmp13']['removeFromGraph']);
    $Γ['global']['$tmp13']['removeFromGraph']['$tmp137'] instanceof Object ? $Γ['global']['$tmp13']['removeFromGraph']['$tmp137'].Σ = $lub($Γ['global']['$tmp13']['removeFromGraph']['$tmp137'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['removeFromGraph']['$tmp137'] = $lub($Γ['global']['$tmp13']['removeFromGraph']['$tmp137'], $Λ[$Λ.length - 1].l);
    $tmp136 = $tmp137 != null;
    $Γ['global']['$tmp13']['removeFromGraph']['$tmp136'] = $lub(sec_lvl('$tmp137', null, true, $Γ['global']['$tmp13']['removeFromGraph']), $Λ[$Λ.length - 1].l);
    $Γ['global']['$tmp13']['removeFromGraph']['$tmp136'] instanceof Object ? $Γ['global']['$tmp13']['removeFromGraph']['$tmp136'].Σ = $lub($Γ['global']['$tmp13']['removeFromGraph']['$tmp136'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['removeFromGraph']['$tmp136'] = $lub($Γ['global']['$tmp13']['removeFromGraph']['$tmp136'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp136', null, true, $Γ['global']['$tmp13']['removeFromGraph'])),
        id: 'IF'
    });
    if ($tmp136) {
        var $tmp343, $tmp129, $tmp344;
        $Γ['global']['$tmp13']['removeFromGraph']['$tmp344'] = $Γ['global']['$tmp13']['removeFromGraph']['$tmp129'] = $Γ['global']['$tmp13']['removeFromGraph']['$tmp343'] = 0;
        $tmp129 = this.scale;
        $Γ['global']['$tmp13']['removeFromGraph']['$tmp129'] = sec_lvl('$tmp13', 'scale', false, $Γ['global']['$tmp13']['removeFromGraph']);
        $Γ['global']['$tmp13']['removeFromGraph']['$tmp129'] instanceof Object ? $Γ['global']['$tmp13']['removeFromGraph']['$tmp129'].Σ = $lub($Γ['global']['$tmp13']['removeFromGraph']['$tmp129'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['removeFromGraph']['$tmp129'] = $lub($Γ['global']['$tmp13']['removeFromGraph']['$tmp129'], $Λ[$Λ.length - 1].l);
        $tmp344 = this;
        $Γ['global']['$tmp13']['removeFromGraph']['$tmp344'] = $Γ['global']['$tmp13']['removeFromGraph'].$this;
        $Γ['global']['$tmp13']['removeFromGraph']['$tmp344'] instanceof Object ? $Γ['global']['$tmp13']['removeFromGraph']['$tmp344'].Σ = $lub($Γ['global']['$tmp13']['removeFromGraph']['$tmp344'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['removeFromGraph']['$tmp344'] = $lub($Γ['global']['$tmp13']['removeFromGraph']['$tmp344'], $Λ[$Λ.length - 1].l);
        $tmp343 = $tmp129.removeConstraint($tmp344);
    } else {
        $upgrade([
            '$tmp129.removeConstraint',
            '$tmp343'
        ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp13']['removeFromGraph']);
    }
    $Λ.pop();
    $tmp139 = this.offset;
    $Γ['global']['$tmp13']['removeFromGraph']['$tmp139'] = sec_lvl('$tmp13', 'offset', false, $Γ['global']['$tmp13']['removeFromGraph']);
    $Γ['global']['$tmp13']['removeFromGraph']['$tmp139'] instanceof Object ? $Γ['global']['$tmp13']['removeFromGraph']['$tmp139'].Σ = $lub($Γ['global']['$tmp13']['removeFromGraph']['$tmp139'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['removeFromGraph']['$tmp139'] = $lub($Γ['global']['$tmp13']['removeFromGraph']['$tmp139'], $Λ[$Λ.length - 1].l);
    $tmp138 = $tmp139 != null;
    $Γ['global']['$tmp13']['removeFromGraph']['$tmp138'] = $lub(sec_lvl('$tmp139', null, true, $Γ['global']['$tmp13']['removeFromGraph']), $Λ[$Λ.length - 1].l);
    $Γ['global']['$tmp13']['removeFromGraph']['$tmp138'] instanceof Object ? $Γ['global']['$tmp13']['removeFromGraph']['$tmp138'].Σ = $lub($Γ['global']['$tmp13']['removeFromGraph']['$tmp138'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['removeFromGraph']['$tmp138'] = $lub($Γ['global']['$tmp13']['removeFromGraph']['$tmp138'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp138', null, true, $Γ['global']['$tmp13']['removeFromGraph'])),
        id: 'IF'
    });
    if ($tmp138) {
        var $tmp345, $tmp132, $tmp346;
        $Γ['global']['$tmp13']['removeFromGraph']['$tmp346'] = $Γ['global']['$tmp13']['removeFromGraph']['$tmp132'] = $Γ['global']['$tmp13']['removeFromGraph']['$tmp345'] = 0;
        $tmp132 = this.offset;
        $Γ['global']['$tmp13']['removeFromGraph']['$tmp132'] = sec_lvl('$tmp13', 'offset', false, $Γ['global']['$tmp13']['removeFromGraph']);
        $Γ['global']['$tmp13']['removeFromGraph']['$tmp132'] instanceof Object ? $Γ['global']['$tmp13']['removeFromGraph']['$tmp132'].Σ = $lub($Γ['global']['$tmp13']['removeFromGraph']['$tmp132'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['removeFromGraph']['$tmp132'] = $lub($Γ['global']['$tmp13']['removeFromGraph']['$tmp132'], $Λ[$Λ.length - 1].l);
        $tmp346 = this;
        $Γ['global']['$tmp13']['removeFromGraph']['$tmp346'] = $Γ['global']['$tmp13']['removeFromGraph'].$this;
        $Γ['global']['$tmp13']['removeFromGraph']['$tmp346'] instanceof Object ? $Γ['global']['$tmp13']['removeFromGraph']['$tmp346'].Σ = $lub($Γ['global']['$tmp13']['removeFromGraph']['$tmp346'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['removeFromGraph']['$tmp346'] = $lub($Γ['global']['$tmp13']['removeFromGraph']['$tmp346'], $Λ[$Λ.length - 1].l);
        $tmp345 = $tmp132.removeConstraint($tmp346);
    } else {
        $upgrade([
            '$tmp132.removeConstraint',
            '$tmp345'
        ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp13']['removeFromGraph']);
    }
    $Λ.pop();
    return;
};
$Γ['global']['$tmp13']['removeFromGraph'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$tmp13 = ScaleConstraint.prototype;
$Γ['global']['$tmp13'] = sec_lvl('ScaleConstraint', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp13'] instanceof Object ? $Γ['global']['$tmp13'].Σ = $lub($Γ['global']['$tmp13'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13'] = $lub($Γ['global']['$tmp13'], $Λ[$Λ.length - 1].l);
$tmp13.markInputs = function (mark) {
    var $tmp140, $tmp124, $tmp141, $tmp129, $tmp132;
    $Γ['global']['$tmp13']['markInputs']['$tmp132'] = $Γ['global']['$tmp13']['markInputs']['$tmp129'] = $Γ['global']['$tmp13']['markInputs']['$tmp141'] = $Γ['global']['$tmp13']['markInputs']['$tmp124'] = $Γ['global']['$tmp13']['markInputs']['$tmp140'] = 0;
    $tmp124 = ScaleConstraint.superConstructor;
    $Γ['global']['$tmp13']['markInputs']['$tmp124'] = sec_lvl('ScaleConstraint', 'superConstructor', false, $Γ['global']['$tmp13']['markInputs']);
    $Γ['global']['$tmp13']['markInputs']['$tmp124'] instanceof Object ? $Γ['global']['$tmp13']['markInputs']['$tmp124'].Σ = $lub($Γ['global']['$tmp13']['markInputs']['$tmp124'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['markInputs']['$tmp124'] = $lub($Γ['global']['$tmp13']['markInputs']['$tmp124'], $Λ[$Λ.length - 1].l);
    $tmp = $tmp124.prototype;
    $Γ['global']['$tmp13']['markInputs']['$tmp'] = sec_lvl('$tmp124', 'prototype', false, $Γ['global']['$tmp13']['markInputs']);
    $Γ['global']['$tmp13']['markInputs']['$tmp'] instanceof Object ? $Γ['global']['$tmp13']['markInputs']['$tmp'].Σ = $lub($Γ['global']['$tmp13']['markInputs']['$tmp'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['markInputs']['$tmp'] = $lub($Γ['global']['$tmp13']['markInputs']['$tmp'], $Λ[$Λ.length - 1].l);
    $tmp = $tmp.markInputs;
    $Γ['global']['$tmp13']['markInputs']['$tmp'] = sec_lvl('$tmp', 'markInputs', false, $Γ['global']['$tmp13']['markInputs']);
    $Γ['global']['$tmp13']['markInputs']['$tmp'] instanceof Object ? $Γ['global']['$tmp13']['markInputs']['$tmp'].Σ = $lub($Γ['global']['$tmp13']['markInputs']['$tmp'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['markInputs']['$tmp'] = $lub($Γ['global']['$tmp13']['markInputs']['$tmp'], $Λ[$Λ.length - 1].l);
    $tmp141 = this;
    $Γ['global']['$tmp13']['markInputs']['$tmp141'] = $Γ['global']['$tmp13']['markInputs'].$this;
    $Γ['global']['$tmp13']['markInputs']['$tmp141'] instanceof Object ? $Γ['global']['$tmp13']['markInputs']['$tmp141'].Σ = $lub($Γ['global']['$tmp13']['markInputs']['$tmp141'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['markInputs']['$tmp141'] = $lub($Γ['global']['$tmp13']['markInputs']['$tmp141'], $Λ[$Λ.length - 1].l);
    $tmp140 = $tmp.call($tmp141, mark);
    $tmp129 = this.scale;
    $Γ['global']['$tmp13']['markInputs']['$tmp129'] = sec_lvl('$tmp13', 'scale', false, $Γ['global']['$tmp13']['markInputs']);
    $Γ['global']['$tmp13']['markInputs']['$tmp129'] instanceof Object ? $Γ['global']['$tmp13']['markInputs']['$tmp129'].Σ = $lub($Γ['global']['$tmp13']['markInputs']['$tmp129'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['markInputs']['$tmp129'] = $lub($Γ['global']['$tmp13']['markInputs']['$tmp129'], $Λ[$Λ.length - 1].l);
    $tmp132 = this.offset;
    $Γ['global']['$tmp13']['markInputs']['$tmp132'] = sec_lvl('$tmp13', 'offset', false, $Γ['global']['$tmp13']['markInputs']);
    $Γ['global']['$tmp13']['markInputs']['$tmp132'] instanceof Object ? $Γ['global']['$tmp13']['markInputs']['$tmp132'].Σ = $lub($Γ['global']['$tmp13']['markInputs']['$tmp132'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['markInputs']['$tmp132'] = $lub($Γ['global']['$tmp13']['markInputs']['$tmp132'], $Λ[$Λ.length - 1].l);
    $tmp132.mark = mark;
    $Γ['global']['$tmp13']['markInputs']['$tmp132']['mark'] = sec_lvl('mark', null, false, $Γ['global']['$tmp13']['markInputs']);
    $Γ['global']['$tmp13']['markInputs']['$tmp132']['mark'] instanceof Object ? $Γ['global']['$tmp13']['markInputs']['$tmp132']['mark'].Σ = $lub($Γ['global']['$tmp13']['markInputs']['$tmp132']['mark'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['markInputs']['$tmp132']['mark'] = $lub($Γ['global']['$tmp13']['markInputs']['$tmp132']['mark'], $Λ[$Λ.length - 1].l);
    $tmp129.mark = $tmp132.mark;
    $Γ['global']['$tmp13']['markInputs']['$tmp129']['mark'] = sec_lvl('$tmp132', 'mark', false, $Γ['global']['$tmp13']['markInputs']);
    $Γ['global']['$tmp13']['markInputs']['$tmp129']['mark'] instanceof Object ? $Γ['global']['$tmp13']['markInputs']['$tmp129']['mark'].Σ = $lub($Γ['global']['$tmp13']['markInputs']['$tmp129']['mark'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['markInputs']['$tmp129']['mark'] = $lub($Γ['global']['$tmp13']['markInputs']['$tmp129']['mark'], $Λ[$Λ.length - 1].l);
    return;
};
$Γ['global']['$tmp13']['markInputs'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    mark: $Λ[$Λ.length - 1].l
};
$tmp13 = ScaleConstraint.prototype;
$Γ['global']['$tmp13'] = sec_lvl('ScaleConstraint', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp13'] instanceof Object ? $Γ['global']['$tmp13'].Σ = $lub($Γ['global']['$tmp13'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13'] = $lub($Γ['global']['$tmp13'], $Λ[$Λ.length - 1].l);
$tmp13.execute = function () {
    var $tmp142, $tmp143, $tmp144;
    $Γ['global']['$tmp13']['execute']['$tmp144'] = $Γ['global']['$tmp13']['execute']['$tmp143'] = $Γ['global']['$tmp13']['execute']['$tmp142'] = 0;
    $tmp143 = this.direction;
    $Γ['global']['$tmp13']['execute']['$tmp143'] = sec_lvl('$tmp13', 'direction', false, $Γ['global']['$tmp13']['execute']);
    $Γ['global']['$tmp13']['execute']['$tmp143'] instanceof Object ? $Γ['global']['$tmp13']['execute']['$tmp143'].Σ = $lub($Γ['global']['$tmp13']['execute']['$tmp143'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['execute']['$tmp143'] = $lub($Γ['global']['$tmp13']['execute']['$tmp143'], $Λ[$Λ.length - 1].l);
    $tmp144 = Direction.FORWARD;
    $Γ['global']['$tmp13']['execute']['$tmp144'] = sec_lvl('Direction', 'FORWARD', false, $Γ['global']['$tmp13']['execute']);
    $Γ['global']['$tmp13']['execute']['$tmp144'] instanceof Object ? $Γ['global']['$tmp13']['execute']['$tmp144'].Σ = $lub($Γ['global']['$tmp13']['execute']['$tmp144'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['execute']['$tmp144'] = $lub($Γ['global']['$tmp13']['execute']['$tmp144'], $Λ[$Λ.length - 1].l);
    $tmp142 = $tmp143 == $tmp144;
    $Γ['global']['$tmp13']['execute']['$tmp142'] = $lub(sec_lvl('$tmp143', null, true, $Γ['global']['$tmp13']['execute']), sec_lvl('$tmp144', null, true, $Γ['global']['$tmp13']['execute']));
    $Γ['global']['$tmp13']['execute']['$tmp142'] instanceof Object ? $Γ['global']['$tmp13']['execute']['$tmp142'].Σ = $lub($Γ['global']['$tmp13']['execute']['$tmp142'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['execute']['$tmp142'] = $lub($Γ['global']['$tmp13']['execute']['$tmp142'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp142', null, true, $Γ['global']['$tmp13']['execute'])),
        id: 'IF'
    });
    if ($tmp142) {
        var $tmp96, $tmp145, $tmp146, $tmp93, $tmp147, $tmp129, $tmp148, $tmp132;
        $Γ['global']['$tmp13']['execute']['$tmp132'] = $Γ['global']['$tmp13']['execute']['$tmp148'] = $Γ['global']['$tmp13']['execute']['$tmp129'] = $Γ['global']['$tmp13']['execute']['$tmp147'] = $Γ['global']['$tmp13']['execute']['$tmp93'] = $Γ['global']['$tmp13']['execute']['$tmp146'] = $Γ['global']['$tmp13']['execute']['$tmp145'] = $Γ['global']['$tmp13']['execute']['$tmp96'] = 0;
        $tmp96 = this.v2;
        $Γ['global']['$tmp13']['execute']['$tmp96'] = sec_lvl('$tmp13', 'v2', false, $Γ['global']['$tmp13']['execute']);
        $Γ['global']['$tmp13']['execute']['$tmp96'] instanceof Object ? $Γ['global']['$tmp13']['execute']['$tmp96'].Σ = $lub($Γ['global']['$tmp13']['execute']['$tmp96'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['execute']['$tmp96'] = $lub($Γ['global']['$tmp13']['execute']['$tmp96'], $Λ[$Λ.length - 1].l);
        $tmp93 = this.v1;
        $Γ['global']['$tmp13']['execute']['$tmp93'] = sec_lvl('$tmp13', 'v1', false, $Γ['global']['$tmp13']['execute']);
        $Γ['global']['$tmp13']['execute']['$tmp93'] instanceof Object ? $Γ['global']['$tmp13']['execute']['$tmp93'].Σ = $lub($Γ['global']['$tmp13']['execute']['$tmp93'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['execute']['$tmp93'] = $lub($Γ['global']['$tmp13']['execute']['$tmp93'], $Λ[$Λ.length - 1].l);
        $tmp146 = $tmp93.value;
        $Γ['global']['$tmp13']['execute']['$tmp146'] = sec_lvl('$tmp93', 'value', false, $Γ['global']['$tmp13']['execute']);
        $Γ['global']['$tmp13']['execute']['$tmp146'] instanceof Object ? $Γ['global']['$tmp13']['execute']['$tmp146'].Σ = $lub($Γ['global']['$tmp13']['execute']['$tmp146'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['execute']['$tmp146'] = $lub($Γ['global']['$tmp13']['execute']['$tmp146'], $Λ[$Λ.length - 1].l);
        $tmp129 = this.scale;
        $Γ['global']['$tmp13']['execute']['$tmp129'] = sec_lvl('$tmp13', 'scale', false, $Γ['global']['$tmp13']['execute']);
        $Γ['global']['$tmp13']['execute']['$tmp129'] instanceof Object ? $Γ['global']['$tmp13']['execute']['$tmp129'].Σ = $lub($Γ['global']['$tmp13']['execute']['$tmp129'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['execute']['$tmp129'] = $lub($Γ['global']['$tmp13']['execute']['$tmp129'], $Λ[$Λ.length - 1].l);
        $tmp147 = $tmp129.value;
        $Γ['global']['$tmp13']['execute']['$tmp147'] = sec_lvl('$tmp129', 'value', false, $Γ['global']['$tmp13']['execute']);
        $Γ['global']['$tmp13']['execute']['$tmp147'] instanceof Object ? $Γ['global']['$tmp13']['execute']['$tmp147'].Σ = $lub($Γ['global']['$tmp13']['execute']['$tmp147'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['execute']['$tmp147'] = $lub($Γ['global']['$tmp13']['execute']['$tmp147'], $Λ[$Λ.length - 1].l);
        $tmp145 = $tmp146 * $tmp147;
        $Γ['global']['$tmp13']['execute']['$tmp145'] = $lub(sec_lvl('$tmp146', null, true, $Γ['global']['$tmp13']['execute']), sec_lvl('$tmp147', null, true, $Γ['global']['$tmp13']['execute']));
        $Γ['global']['$tmp13']['execute']['$tmp145'] instanceof Object ? $Γ['global']['$tmp13']['execute']['$tmp145'].Σ = $lub($Γ['global']['$tmp13']['execute']['$tmp145'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['execute']['$tmp145'] = $lub($Γ['global']['$tmp13']['execute']['$tmp145'], $Λ[$Λ.length - 1].l);
        $tmp132 = this.offset;
        $Γ['global']['$tmp13']['execute']['$tmp132'] = sec_lvl('$tmp13', 'offset', false, $Γ['global']['$tmp13']['execute']);
        $Γ['global']['$tmp13']['execute']['$tmp132'] instanceof Object ? $Γ['global']['$tmp13']['execute']['$tmp132'].Σ = $lub($Γ['global']['$tmp13']['execute']['$tmp132'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['execute']['$tmp132'] = $lub($Γ['global']['$tmp13']['execute']['$tmp132'], $Λ[$Λ.length - 1].l);
        $tmp148 = $tmp132.value;
        $Γ['global']['$tmp13']['execute']['$tmp148'] = sec_lvl('$tmp132', 'value', false, $Γ['global']['$tmp13']['execute']);
        $Γ['global']['$tmp13']['execute']['$tmp148'] instanceof Object ? $Γ['global']['$tmp13']['execute']['$tmp148'].Σ = $lub($Γ['global']['$tmp13']['execute']['$tmp148'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['execute']['$tmp148'] = $lub($Γ['global']['$tmp13']['execute']['$tmp148'], $Λ[$Λ.length - 1].l);
        $tmp96.value = $tmp145 + $tmp148;
        $Γ['global']['$tmp13']['execute']['$tmp96']['value'] = $lub(sec_lvl('$tmp145', null, true, $Γ['global']['$tmp13']['execute']), sec_lvl('$tmp148', null, true, $Γ['global']['$tmp13']['execute']));
        $Γ['global']['$tmp13']['execute']['$tmp96']['value'] instanceof Object ? $Γ['global']['$tmp13']['execute']['$tmp96']['value'].Σ = $lub($Γ['global']['$tmp13']['execute']['$tmp96']['value'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['execute']['$tmp96']['value'] = $lub($Γ['global']['$tmp13']['execute']['$tmp96']['value'], $Λ[$Λ.length - 1].l);
    } else {
        var $tmp93, $tmp149, $tmp150, $tmp96, $tmp151, $tmp132, $tmp152, $tmp129;
        $Γ['global']['$tmp13']['execute']['$tmp129'] = $Γ['global']['$tmp13']['execute']['$tmp152'] = $Γ['global']['$tmp13']['execute']['$tmp132'] = $Γ['global']['$tmp13']['execute']['$tmp151'] = $Γ['global']['$tmp13']['execute']['$tmp96'] = $Γ['global']['$tmp13']['execute']['$tmp150'] = $Γ['global']['$tmp13']['execute']['$tmp149'] = $Γ['global']['$tmp13']['execute']['$tmp93'] = 0;
        $tmp93 = this.v1;
        $Γ['global']['$tmp13']['execute']['$tmp93'] = sec_lvl('$tmp13', 'v1', false, $Γ['global']['$tmp13']['execute']);
        $Γ['global']['$tmp13']['execute']['$tmp93'] instanceof Object ? $Γ['global']['$tmp13']['execute']['$tmp93'].Σ = $lub($Γ['global']['$tmp13']['execute']['$tmp93'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['execute']['$tmp93'] = $lub($Γ['global']['$tmp13']['execute']['$tmp93'], $Λ[$Λ.length - 1].l);
        $tmp96 = this.v2;
        $Γ['global']['$tmp13']['execute']['$tmp96'] = sec_lvl('$tmp13', 'v2', false, $Γ['global']['$tmp13']['execute']);
        $Γ['global']['$tmp13']['execute']['$tmp96'] instanceof Object ? $Γ['global']['$tmp13']['execute']['$tmp96'].Σ = $lub($Γ['global']['$tmp13']['execute']['$tmp96'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['execute']['$tmp96'] = $lub($Γ['global']['$tmp13']['execute']['$tmp96'], $Λ[$Λ.length - 1].l);
        $tmp150 = $tmp96.value;
        $Γ['global']['$tmp13']['execute']['$tmp150'] = sec_lvl('$tmp96', 'value', false, $Γ['global']['$tmp13']['execute']);
        $Γ['global']['$tmp13']['execute']['$tmp150'] instanceof Object ? $Γ['global']['$tmp13']['execute']['$tmp150'].Σ = $lub($Γ['global']['$tmp13']['execute']['$tmp150'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['execute']['$tmp150'] = $lub($Γ['global']['$tmp13']['execute']['$tmp150'], $Λ[$Λ.length - 1].l);
        $tmp132 = this.offset;
        $Γ['global']['$tmp13']['execute']['$tmp132'] = sec_lvl('$tmp13', 'offset', false, $Γ['global']['$tmp13']['execute']);
        $Γ['global']['$tmp13']['execute']['$tmp132'] instanceof Object ? $Γ['global']['$tmp13']['execute']['$tmp132'].Σ = $lub($Γ['global']['$tmp13']['execute']['$tmp132'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['execute']['$tmp132'] = $lub($Γ['global']['$tmp13']['execute']['$tmp132'], $Λ[$Λ.length - 1].l);
        $tmp151 = $tmp132.value;
        $Γ['global']['$tmp13']['execute']['$tmp151'] = sec_lvl('$tmp132', 'value', false, $Γ['global']['$tmp13']['execute']);
        $Γ['global']['$tmp13']['execute']['$tmp151'] instanceof Object ? $Γ['global']['$tmp13']['execute']['$tmp151'].Σ = $lub($Γ['global']['$tmp13']['execute']['$tmp151'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['execute']['$tmp151'] = $lub($Γ['global']['$tmp13']['execute']['$tmp151'], $Λ[$Λ.length - 1].l);
        $tmp149 = $tmp150 - $tmp151;
        $Γ['global']['$tmp13']['execute']['$tmp149'] = $lub(sec_lvl('$tmp150', null, true, $Γ['global']['$tmp13']['execute']), sec_lvl('$tmp151', null, true, $Γ['global']['$tmp13']['execute']));
        $Γ['global']['$tmp13']['execute']['$tmp149'] instanceof Object ? $Γ['global']['$tmp13']['execute']['$tmp149'].Σ = $lub($Γ['global']['$tmp13']['execute']['$tmp149'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['execute']['$tmp149'] = $lub($Γ['global']['$tmp13']['execute']['$tmp149'], $Λ[$Λ.length - 1].l);
        $tmp129 = this.scale;
        $Γ['global']['$tmp13']['execute']['$tmp129'] = sec_lvl('$tmp13', 'scale', false, $Γ['global']['$tmp13']['execute']);
        $Γ['global']['$tmp13']['execute']['$tmp129'] instanceof Object ? $Γ['global']['$tmp13']['execute']['$tmp129'].Σ = $lub($Γ['global']['$tmp13']['execute']['$tmp129'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['execute']['$tmp129'] = $lub($Γ['global']['$tmp13']['execute']['$tmp129'], $Λ[$Λ.length - 1].l);
        $tmp152 = $tmp129.value;
        $Γ['global']['$tmp13']['execute']['$tmp152'] = sec_lvl('$tmp129', 'value', false, $Γ['global']['$tmp13']['execute']);
        $Γ['global']['$tmp13']['execute']['$tmp152'] instanceof Object ? $Γ['global']['$tmp13']['execute']['$tmp152'].Σ = $lub($Γ['global']['$tmp13']['execute']['$tmp152'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['execute']['$tmp152'] = $lub($Γ['global']['$tmp13']['execute']['$tmp152'], $Λ[$Λ.length - 1].l);
        $tmp93.value = $tmp149 / $tmp152;
        $Γ['global']['$tmp13']['execute']['$tmp93']['value'] = $lub(sec_lvl('$tmp149', null, true, $Γ['global']['$tmp13']['execute']), sec_lvl('$tmp152', null, true, $Γ['global']['$tmp13']['execute']));
        $Γ['global']['$tmp13']['execute']['$tmp93']['value'] instanceof Object ? $Γ['global']['$tmp13']['execute']['$tmp93']['value'].Σ = $lub($Γ['global']['$tmp13']['execute']['$tmp93']['value'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['execute']['$tmp93']['value'] = $lub($Γ['global']['$tmp13']['execute']['$tmp93']['value'], $Λ[$Λ.length - 1].l);
    }
    $Λ.pop();
    return;
};
$Γ['global']['$tmp13']['execute'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$tmp13 = ScaleConstraint.prototype;
$Γ['global']['$tmp13'] = sec_lvl('ScaleConstraint', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp13'] instanceof Object ? $Γ['global']['$tmp13'].Σ = $lub($Γ['global']['$tmp13'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13'] = $lub($Γ['global']['$tmp13'], $Λ[$Λ.length - 1].l);
$tmp13.recalculate = function () {
    var ihn, out, $tmp153, $tmp154, $tmp155, $tmp156, $tmp157, $tmp129, $tmp158, $tmp132, $tmp159;
    $Γ['global']['$tmp13']['recalculate']['$tmp159'] = $Γ['global']['$tmp13']['recalculate']['$tmp132'] = $Γ['global']['$tmp13']['recalculate']['$tmp158'] = $Γ['global']['$tmp13']['recalculate']['$tmp129'] = $Γ['global']['$tmp13']['recalculate']['$tmp157'] = $Γ['global']['$tmp13']['recalculate']['$tmp156'] = $Γ['global']['$tmp13']['recalculate']['$tmp155'] = $Γ['global']['$tmp13']['recalculate']['$tmp154'] = $Γ['global']['$tmp13']['recalculate']['$tmp153'] = $Γ['global']['$tmp13']['recalculate']['out'] = $Γ['global']['$tmp13']['recalculate']['ihn'] = 0;
    ihn = this.input();
    out = this.output();
    $tmp153 = this.strength;
    $Γ['global']['$tmp13']['recalculate']['$tmp153'] = sec_lvl('$tmp13', 'strength', false, $Γ['global']['$tmp13']['recalculate']);
    $Γ['global']['$tmp13']['recalculate']['$tmp153'] instanceof Object ? $Γ['global']['$tmp13']['recalculate']['$tmp153'].Σ = $lub($Γ['global']['$tmp13']['recalculate']['$tmp153'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['recalculate']['$tmp153'] = $lub($Γ['global']['$tmp13']['recalculate']['$tmp153'], $Λ[$Λ.length - 1].l);
    $tmp154 = ihn.walkStrength;
    $Γ['global']['$tmp13']['recalculate']['$tmp154'] = sec_lvl('ihn', 'walkStrength', false, $Γ['global']['$tmp13']['recalculate']);
    $Γ['global']['$tmp13']['recalculate']['$tmp154'] instanceof Object ? $Γ['global']['$tmp13']['recalculate']['$tmp154'].Σ = $lub($Γ['global']['$tmp13']['recalculate']['$tmp154'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['recalculate']['$tmp154'] = $lub($Γ['global']['$tmp13']['recalculate']['$tmp154'], $Λ[$Λ.length - 1].l);
    $rf = $prop('Strength', 'weakestOf', $Γ['global']['$tmp13']['recalculate']);
    $rf.scope = $Γ['global']['$tmp13']['recalculate'];
    $rf.$this = $scope($Γ['global']['$tmp13']['recalculate'], 'Strength', false)['Strength'];
    $rf['s1'] = $lub(sec_lvl('$tmp153', null, true, $Γ['global']['$tmp13']['recalculate']), $Λ[$Λ.length - 1].l);
    $rf['s2'] = $lub(sec_lvl('$tmp154', null, true, $Γ['global']['$tmp13']['recalculate']), $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    out.walkStrength = Strength.weakestOf($tmp153, $tmp154);
    $scope($Γ['global']['$tmp13']['recalculate'], 'out', false)['walkStrength'] = $Λ.pop().l;
    $scope($Γ['global']['$tmp13']['recalculate'], 'out', false)['walkStrength'] instanceof Object ? $scope($Γ['global']['$tmp13']['recalculate'], 'out', false)['walkStrength'].Σ = $lub($scope($Γ['global']['$tmp13']['recalculate'], 'out', false)['walkStrength'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp13']['recalculate'], 'out', false)['walkStrength'] = $lub($scope($Γ['global']['$tmp13']['recalculate'], 'out', false)['walkStrength'], $Λ[$Λ.length - 1].l);
    $tmp156 = ihn.stay;
    $Γ['global']['$tmp13']['recalculate']['$tmp156'] = sec_lvl('ihn', 'stay', false, $Γ['global']['$tmp13']['recalculate']);
    $Γ['global']['$tmp13']['recalculate']['$tmp156'] instanceof Object ? $Γ['global']['$tmp13']['recalculate']['$tmp156'].Σ = $lub($Γ['global']['$tmp13']['recalculate']['$tmp156'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['recalculate']['$tmp156'] = $lub($Γ['global']['$tmp13']['recalculate']['$tmp156'], $Λ[$Λ.length - 1].l);
    $tmp129 = this.scale;
    $Γ['global']['$tmp13']['recalculate']['$tmp129'] = sec_lvl('$tmp13', 'scale', false, $Γ['global']['$tmp13']['recalculate']);
    $Γ['global']['$tmp13']['recalculate']['$tmp129'] instanceof Object ? $Γ['global']['$tmp13']['recalculate']['$tmp129'].Σ = $lub($Γ['global']['$tmp13']['recalculate']['$tmp129'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['recalculate']['$tmp129'] = $lub($Γ['global']['$tmp13']['recalculate']['$tmp129'], $Λ[$Λ.length - 1].l);
    $tmp157 = $tmp129.stay;
    $Γ['global']['$tmp13']['recalculate']['$tmp157'] = sec_lvl('$tmp129', 'stay', false, $Γ['global']['$tmp13']['recalculate']);
    $Γ['global']['$tmp13']['recalculate']['$tmp157'] instanceof Object ? $Γ['global']['$tmp13']['recalculate']['$tmp157'].Σ = $lub($Γ['global']['$tmp13']['recalculate']['$tmp157'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['recalculate']['$tmp157'] = $lub($Γ['global']['$tmp13']['recalculate']['$tmp157'], $Λ[$Λ.length - 1].l);
    $tmp155 = $tmp156 && $tmp157;
    $Γ['global']['$tmp13']['recalculate']['$tmp155'] = $lub(sec_lvl('$tmp156', null, true, $Γ['global']['$tmp13']['recalculate']), sec_lvl('$tmp157', null, true, $Γ['global']['$tmp13']['recalculate']));
    $Γ['global']['$tmp13']['recalculate']['$tmp155'] instanceof Object ? $Γ['global']['$tmp13']['recalculate']['$tmp155'].Σ = $lub($Γ['global']['$tmp13']['recalculate']['$tmp155'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['recalculate']['$tmp155'] = $lub($Γ['global']['$tmp13']['recalculate']['$tmp155'], $Λ[$Λ.length - 1].l);
    $tmp132 = this.offset;
    $Γ['global']['$tmp13']['recalculate']['$tmp132'] = sec_lvl('$tmp13', 'offset', false, $Γ['global']['$tmp13']['recalculate']);
    $Γ['global']['$tmp13']['recalculate']['$tmp132'] instanceof Object ? $Γ['global']['$tmp13']['recalculate']['$tmp132'].Σ = $lub($Γ['global']['$tmp13']['recalculate']['$tmp132'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['recalculate']['$tmp132'] = $lub($Γ['global']['$tmp13']['recalculate']['$tmp132'], $Λ[$Λ.length - 1].l);
    $tmp158 = $tmp132.stay;
    $Γ['global']['$tmp13']['recalculate']['$tmp158'] = sec_lvl('$tmp132', 'stay', false, $Γ['global']['$tmp13']['recalculate']);
    $Γ['global']['$tmp13']['recalculate']['$tmp158'] instanceof Object ? $Γ['global']['$tmp13']['recalculate']['$tmp158'].Σ = $lub($Γ['global']['$tmp13']['recalculate']['$tmp158'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['recalculate']['$tmp158'] = $lub($Γ['global']['$tmp13']['recalculate']['$tmp158'], $Λ[$Λ.length - 1].l);
    out.stay = $tmp155 && $tmp158;
    $scope($Γ['global']['$tmp13']['recalculate'], 'out', false)['stay'] = $lub(sec_lvl('$tmp155', null, true, $Γ['global']['$tmp13']['recalculate']), sec_lvl('$tmp158', null, true, $Γ['global']['$tmp13']['recalculate']));
    $scope($Γ['global']['$tmp13']['recalculate'], 'out', false)['stay'] instanceof Object ? $scope($Γ['global']['$tmp13']['recalculate'], 'out', false)['stay'].Σ = $lub($scope($Γ['global']['$tmp13']['recalculate'], 'out', false)['stay'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp13']['recalculate'], 'out', false)['stay'] = $lub($scope($Γ['global']['$tmp13']['recalculate'], 'out', false)['stay'], $Λ[$Λ.length - 1].l);
    $tmp159 = out.stay;
    $Γ['global']['$tmp13']['recalculate']['$tmp159'] = sec_lvl('out', 'stay', false, $Γ['global']['$tmp13']['recalculate']);
    $Γ['global']['$tmp13']['recalculate']['$tmp159'] instanceof Object ? $Γ['global']['$tmp13']['recalculate']['$tmp159'].Σ = $lub($Γ['global']['$tmp13']['recalculate']['$tmp159'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['recalculate']['$tmp159'] = $lub($Γ['global']['$tmp13']['recalculate']['$tmp159'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp159', null, true, $Γ['global']['$tmp13']['recalculate'])),
        id: 'IF'
    });
    if ($tmp159) {
        var $tmp347;
        $Γ['global']['$tmp13']['recalculate']['$tmp347'] = 0;
        $rf = $prop('$tmp13', 'execute', $Γ['global']['$tmp13']['recalculate']);
        $rf.scope = $Γ['global']['$tmp13']['recalculate'];
        $rf.$this = $Γ['global']['$tmp13']['recalculate']['$this'];
        $Λ.push({
            l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
            id: 'FUNC'
        });
        $tmp347 = this.execute();
        $Γ['global']['$tmp13']['recalculate']['$tmp347'] = $Λ.pop().l;
        $Γ['global']['$tmp13']['recalculate']['$tmp347'] instanceof Object ? $Γ['global']['$tmp13']['recalculate']['$tmp347'].Σ = $lub($Γ['global']['$tmp13']['recalculate']['$tmp347'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp13']['recalculate']['$tmp347'] = $lub($Γ['global']['$tmp13']['recalculate']['$tmp347'], $Λ[$Λ.length - 1].l);
    } else {
        $upgrade(['$tmp347'], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp13']['recalculate']);
    }
    $Λ.pop();
    return;
};
$Γ['global']['$tmp13']['recalculate'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
function EqualityConstraint(var1, var2, strength) {
    var $tmp160, $tmp161, $tmp162;
    $Γ['global']['EqualityConstraint']['$tmp162'] = $Γ['global']['EqualityConstraint']['$tmp161'] = $Γ['global']['EqualityConstraint']['$tmp160'] = 0;
    $tmp161 = EqualityConstraint.superConstructor;
    $Γ['global']['EqualityConstraint']['$tmp161'] = sec_lvl('EqualityConstraint', 'superConstructor', false, $Γ['global']['EqualityConstraint']);
    $Γ['global']['EqualityConstraint']['$tmp161'] instanceof Object ? $Γ['global']['EqualityConstraint']['$tmp161'].Σ = $lub($Γ['global']['EqualityConstraint']['$tmp161'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['EqualityConstraint']['$tmp161'] = $lub($Γ['global']['EqualityConstraint']['$tmp161'], $Λ[$Λ.length - 1].l);
    $tmp162 = this;
    $Γ['global']['EqualityConstraint']['$tmp162'] = $Γ['global']['EqualityConstraint'].$this;
    $Γ['global']['EqualityConstraint']['$tmp162'] instanceof Object ? $Γ['global']['EqualityConstraint']['$tmp162'].Σ = $lub($Γ['global']['EqualityConstraint']['$tmp162'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['EqualityConstraint']['$tmp162'] = $lub($Γ['global']['EqualityConstraint']['$tmp162'], $Λ[$Λ.length - 1].l);
    $tmp160 = $tmp161.call($tmp162, var1, var2, strength);
    return;
}
$tmp14 = EqualityConstraint.inheritsFrom(BinaryConstraint);
$tmp15 = EqualityConstraint.prototype;
$Γ['global']['$tmp15'] = sec_lvl('EqualityConstraint', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp15'] instanceof Object ? $Γ['global']['$tmp15'].Σ = $lub($Γ['global']['$tmp15'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp15'] = $lub($Γ['global']['$tmp15'], $Λ[$Λ.length - 1].l);
$tmp15.execute = function () {
    var $tmp;
    $Γ['global']['$tmp15']['execute']['$tmp'] = 0;
    $tmp = this.output();
    $tmp = this.input();
    $tmp.value = $tmp.value;
    $Γ['global']['$tmp15']['execute']['$tmp']['value'] = sec_lvl('$tmp', 'value', false, $Γ['global']['$tmp15']['execute']);
    $Γ['global']['$tmp15']['execute']['$tmp']['value'] instanceof Object ? $Γ['global']['$tmp15']['execute']['$tmp']['value'].Σ = $lub($Γ['global']['$tmp15']['execute']['$tmp']['value'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp15']['execute']['$tmp']['value'] = $lub($Γ['global']['$tmp15']['execute']['$tmp']['value'], $Λ[$Λ.length - 1].l);
    return;
};
$Γ['global']['$tmp15']['execute'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
function Variable(name, initialValue) {
    this.value = initialValue || 0;
    $Γ['global']['Variable']['$this']['value'] = $lub(sec_lvl('initialValue', null, true, $Γ['global']['Variable']), $Λ[$Λ.length - 1].l);
    $Γ['global']['Variable']['$this']['value'] instanceof Object ? $Γ['global']['Variable']['$this']['value'].Σ = $lub($Γ['global']['Variable']['$this']['value'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['Variable']['$this']['value'] = $lub($Γ['global']['Variable']['$this']['value'], $Λ[$Λ.length - 1].l);
    $rf = $scope($Γ['global']['Variable'], 'OrderedCollection', false)['OrderedCollection'];
    $rf.scope = $Γ['global']['Variable'];
    $rf.$this = {
        Σ: $Λ[$Λ.length - 1].l,
        __$proto__: $rf.prototype
    };
    $rf.InvokedAsContr = true;
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    this.constraints = new OrderedCollection();
    $Γ['global']['Variable']['$this']['constraints'] = $Λ.pop().l;
    $Γ['global']['Variable']['$this']['constraints'] instanceof Object ? $Γ['global']['Variable']['$this']['constraints'].Σ = $lub($Γ['global']['Variable']['$this']['constraints'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['Variable']['$this']['constraints'] = $lub($Γ['global']['Variable']['$this']['constraints'], $Λ[$Λ.length - 1].l);
    this.determinedBy = null;
    $Γ['global']['Variable']['$this']['determinedBy'] = $Λ[$Λ.length - 1].l;
    this.mark = 0;
    $Γ['global']['Variable']['$this']['mark'] = $Λ[$Λ.length - 1].l;
    this.walkStrength = Strength.WEAKEST;
    $Γ['global']['Variable']['$this']['walkStrength'] = sec_lvl('Strength', 'WEAKEST', false, $Γ['global']['Variable']);
    $Γ['global']['Variable']['$this']['walkStrength'] instanceof Object ? $Γ['global']['Variable']['$this']['walkStrength'].Σ = $lub($Γ['global']['Variable']['$this']['walkStrength'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['Variable']['$this']['walkStrength'] = $lub($Γ['global']['Variable']['$this']['walkStrength'], $Λ[$Λ.length - 1].l);
    this.stay = true;
    $Γ['global']['Variable']['$this']['stay'] = $Λ[$Λ.length - 1].l;
    this.name = name;
    $Γ['global']['Variable']['$this']['name'] = sec_lvl('name', null, false, $Γ['global']['Variable']);
    $Γ['global']['Variable']['$this']['name'] instanceof Object ? $Γ['global']['Variable']['$this']['name'].Σ = $lub($Γ['global']['Variable']['$this']['name'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['Variable']['$this']['name'] = $lub($Γ['global']['Variable']['$this']['name'], $Λ[$Λ.length - 1].l);
    return;
}
$tmp16 = Variable.prototype;
$Γ['global']['$tmp16'] = sec_lvl('Variable', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp16'] instanceof Object ? $Γ['global']['$tmp16'].Σ = $lub($Γ['global']['$tmp16'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp16'] = $lub($Γ['global']['$tmp16'], $Λ[$Λ.length - 1].l);
$tmp16.addConstraint = function (c) {
    var $tmp163, $tmp164;
    $Γ['global']['$tmp16']['addConstraint']['$tmp164'] = $Γ['global']['$tmp16']['addConstraint']['$tmp163'] = 0;
    $tmp164 = this.constraints;
    $Γ['global']['$tmp16']['addConstraint']['$tmp164'] = sec_lvl('$tmp16', 'constraints', false, $Γ['global']['$tmp16']['addConstraint']);
    $Γ['global']['$tmp16']['addConstraint']['$tmp164'] instanceof Object ? $Γ['global']['$tmp16']['addConstraint']['$tmp164'].Σ = $lub($Γ['global']['$tmp16']['addConstraint']['$tmp164'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp16']['addConstraint']['$tmp164'] = $lub($Γ['global']['$tmp16']['addConstraint']['$tmp164'], $Λ[$Λ.length - 1].l);
    $tmp163 = $tmp164.add(c);
    return;
};
$Γ['global']['$tmp16']['addConstraint'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    c: $Λ[$Λ.length - 1].l
};
$tmp16 = Variable.prototype;
$Γ['global']['$tmp16'] = sec_lvl('Variable', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp16'] instanceof Object ? $Γ['global']['$tmp16'].Σ = $lub($Γ['global']['$tmp16'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp16'] = $lub($Γ['global']['$tmp16'], $Λ[$Λ.length - 1].l);
$tmp16.removeConstraint = function (c) {
    var $tmp165, $tmp164, $tmp166, $tmp167;
    $Γ['global']['$tmp16']['removeConstraint']['$tmp167'] = $Γ['global']['$tmp16']['removeConstraint']['$tmp166'] = $Γ['global']['$tmp16']['removeConstraint']['$tmp164'] = $Γ['global']['$tmp16']['removeConstraint']['$tmp165'] = 0;
    $tmp164 = this.constraints;
    $Γ['global']['$tmp16']['removeConstraint']['$tmp164'] = sec_lvl('$tmp16', 'constraints', false, $Γ['global']['$tmp16']['removeConstraint']);
    $Γ['global']['$tmp16']['removeConstraint']['$tmp164'] instanceof Object ? $Γ['global']['$tmp16']['removeConstraint']['$tmp164'].Σ = $lub($Γ['global']['$tmp16']['removeConstraint']['$tmp164'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp16']['removeConstraint']['$tmp164'] = $lub($Γ['global']['$tmp16']['removeConstraint']['$tmp164'], $Λ[$Λ.length - 1].l);
    $tmp165 = $tmp164.remove(c);
    $tmp167 = this.determinedBy;
    $Γ['global']['$tmp16']['removeConstraint']['$tmp167'] = sec_lvl('$tmp16', 'determinedBy', false, $Γ['global']['$tmp16']['removeConstraint']);
    $Γ['global']['$tmp16']['removeConstraint']['$tmp167'] instanceof Object ? $Γ['global']['$tmp16']['removeConstraint']['$tmp167'].Σ = $lub($Γ['global']['$tmp16']['removeConstraint']['$tmp167'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp16']['removeConstraint']['$tmp167'] = $lub($Γ['global']['$tmp16']['removeConstraint']['$tmp167'], $Λ[$Λ.length - 1].l);
    $tmp166 = $tmp167 == c;
    $Γ['global']['$tmp16']['removeConstraint']['$tmp166'] = $lub(sec_lvl('$tmp167', null, true, $Γ['global']['$tmp16']['removeConstraint']), sec_lvl('c', null, true, $Γ['global']['$tmp16']['removeConstraint']));
    $Γ['global']['$tmp16']['removeConstraint']['$tmp166'] instanceof Object ? $Γ['global']['$tmp16']['removeConstraint']['$tmp166'].Σ = $lub($Γ['global']['$tmp16']['removeConstraint']['$tmp166'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp16']['removeConstraint']['$tmp166'] = $lub($Γ['global']['$tmp16']['removeConstraint']['$tmp166'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp166', null, true, $Γ['global']['$tmp16']['removeConstraint'])),
        id: 'IF'
    });
    if ($tmp166) {
        this.determinedBy = null;
        $Γ['global']['$tmp16']['removeConstraint']['$this']['determinedBy'] = $Λ[$Λ.length - 1].l;
    } else {
    }
    $Λ.pop();
    return;
};
$Γ['global']['$tmp16']['removeConstraint'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    c: $Λ[$Λ.length - 1].l
};
function Planner() {
    this.currentMark = 0;
    $Γ['global']['Planner']['$this']['currentMark'] = $Λ[$Λ.length - 1].l;
    return;
}
$tmp17 = Planner.prototype;
$Γ['global']['$tmp17'] = sec_lvl('Planner', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp17'] instanceof Object ? $Γ['global']['$tmp17'].Σ = $lub($Γ['global']['$tmp17'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17'] = $lub($Γ['global']['$tmp17'], $Λ[$Λ.length - 1].l);
$tmp17.incrementalAdd = function (c) {
    var mark, overridden, $tmp168;
    $Γ['global']['$tmp17']['incrementalAdd']['$tmp168'] = $Γ['global']['$tmp17']['incrementalAdd']['overridden'] = $Γ['global']['$tmp17']['incrementalAdd']['mark'] = 0;
    $rf = $prop('$tmp17', 'newMark', $Γ['global']['$tmp17']['incrementalAdd']);
    $rf.scope = $Γ['global']['$tmp17']['incrementalAdd'];
    $rf.$this = $Γ['global']['$tmp17']['incrementalAdd']['$this'];
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    mark = this.newMark();
    $scope($Γ['global']['$tmp17']['incrementalAdd'], 'mark', true)['mark'] = $Λ.pop().l;
    $scope($Γ['global']['$tmp17']['incrementalAdd'], 'mark', true)['mark'] instanceof Object ? $scope($Γ['global']['$tmp17']['incrementalAdd'], 'mark', true)['mark'].Σ = $lub($scope($Γ['global']['$tmp17']['incrementalAdd'], 'mark', true)['mark'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp17']['incrementalAdd'], 'mark', true)['mark'] = $lub($scope($Γ['global']['$tmp17']['incrementalAdd'], 'mark', true)['mark'], $Λ[$Λ.length - 1].l);
    overridden = c.satisfy(mark);
    $tmp168 = overridden != null;
    $Γ['global']['$tmp17']['incrementalAdd']['$tmp168'] = $lub(sec_lvl('overridden', null, true, $Γ['global']['$tmp17']['incrementalAdd']), $Λ[$Λ.length - 1].l);
    $Γ['global']['$tmp17']['incrementalAdd']['$tmp168'] instanceof Object ? $Γ['global']['$tmp17']['incrementalAdd']['$tmp168'].Σ = $lub($Γ['global']['$tmp17']['incrementalAdd']['$tmp168'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['incrementalAdd']['$tmp168'] = $lub($Γ['global']['$tmp17']['incrementalAdd']['$tmp168'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp168', null, true, $Γ['global']['$tmp17']['incrementalAdd'])),
        id: 'LOOP'
    });
    while ($tmp168) {
        overridden = overridden.satisfy(mark);
        var $tmp168;
        $Γ['global']['$tmp17']['incrementalAdd']['$tmp168'] = 0;
        $tmp168 = overridden != null;
        $Γ['global']['$tmp17']['incrementalAdd']['$tmp168'] = $lub(sec_lvl('overridden', null, true, $Γ['global']['$tmp17']['incrementalAdd']), $Λ[$Λ.length - 1].l);
        $Γ['global']['$tmp17']['incrementalAdd']['$tmp168'] instanceof Object ? $Γ['global']['$tmp17']['incrementalAdd']['$tmp168'].Σ = $lub($Γ['global']['$tmp17']['incrementalAdd']['$tmp168'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['incrementalAdd']['$tmp168'] = $lub($Γ['global']['$tmp17']['incrementalAdd']['$tmp168'], $Λ[$Λ.length - 1].l);
    }
    $upgrade([
        'overridden.satisfy',
        'overridden'
    ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp17']['incrementalAdd']);
    $Λ.pop();
    return;
};
$Γ['global']['$tmp17']['incrementalAdd'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    c: $Λ[$Λ.length - 1].l
};
$tmp17 = Planner.prototype;
$Γ['global']['$tmp17'] = sec_lvl('Planner', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp17'] instanceof Object ? $Γ['global']['$tmp17'].Σ = $lub($Γ['global']['$tmp17'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17'] = $lub($Γ['global']['$tmp17'], $Λ[$Λ.length - 1].l);
$tmp17.incrementalRemove = function (c) {
    var out, $tmp169, $tmp170, unsatisfied, strength, $tmp171;
    $Γ['global']['$tmp17']['incrementalRemove']['$tmp171'] = $Γ['global']['$tmp17']['incrementalRemove']['strength'] = $Γ['global']['$tmp17']['incrementalRemove']['unsatisfied'] = $Γ['global']['$tmp17']['incrementalRemove']['$tmp170'] = $Γ['global']['$tmp17']['incrementalRemove']['$tmp169'] = $Γ['global']['$tmp17']['incrementalRemove']['out'] = 0;
    out = c.output();
    $tmp169 = c.markUnsatisfied();
    $tmp170 = c.removeFromGraph();
    $rf = $prop('$tmp17', 'removePropagateFrom', $Γ['global']['$tmp17']['incrementalRemove']);
    $rf.scope = $Γ['global']['$tmp17']['incrementalRemove'];
    $rf.$this = $Γ['global']['$tmp17']['incrementalRemove']['$this'];
    $rf['out'] = $lub(sec_lvl('out', null, true, $Γ['global']['$tmp17']['incrementalRemove']), $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    unsatisfied = this.removePropagateFrom(out);
    $scope($Γ['global']['$tmp17']['incrementalRemove'], 'unsatisfied', true)['unsatisfied'] = $Λ.pop().l;
    $scope($Γ['global']['$tmp17']['incrementalRemove'], 'unsatisfied', true)['unsatisfied'] instanceof Object ? $scope($Γ['global']['$tmp17']['incrementalRemove'], 'unsatisfied', true)['unsatisfied'].Σ = $lub($scope($Γ['global']['$tmp17']['incrementalRemove'], 'unsatisfied', true)['unsatisfied'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp17']['incrementalRemove'], 'unsatisfied', true)['unsatisfied'] = $lub($scope($Γ['global']['$tmp17']['incrementalRemove'], 'unsatisfied', true)['unsatisfied'], $Λ[$Λ.length - 1].l);
    strength = Strength.REQUIRED;
    $scope($Γ['global']['$tmp17']['incrementalRemove'], 'strength', true)['strength'] = sec_lvl('Strength', 'REQUIRED', false, $Γ['global']['$tmp17']['incrementalRemove']);
    $scope($Γ['global']['$tmp17']['incrementalRemove'], 'strength', true)['strength'] instanceof Object ? $scope($Γ['global']['$tmp17']['incrementalRemove'], 'strength', true)['strength'].Σ = $lub($scope($Γ['global']['$tmp17']['incrementalRemove'], 'strength', true)['strength'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp17']['incrementalRemove'], 'strength', true)['strength'] = $lub($scope($Γ['global']['$tmp17']['incrementalRemove'], 'strength', true)['strength'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp171', null, true, $Γ['global']['$tmp17']['incrementalRemove'])),
        id: 'LOOP'
    });
    do {
        var i, $tmp173, $tmp174, $tmp171, $tmp175;
        $Γ['global']['$tmp17']['incrementalRemove']['$tmp175'] = $Γ['global']['$tmp17']['incrementalRemove']['$tmp171'] = $Γ['global']['$tmp17']['incrementalRemove']['$tmp174'] = $Γ['global']['$tmp17']['incrementalRemove']['$tmp173'] = $Γ['global']['$tmp17']['incrementalRemove']['i'] = 0;
        i = 0;
        $scope($Γ['global']['$tmp17']['incrementalRemove'], 'i', true)['i'] = $Λ[$Λ.length - 1].l;
        $tmp174 = unsatisfied.size();
        $tmp173 = i < $tmp174;
        $Γ['global']['$tmp17']['incrementalRemove']['$tmp173'] = $lub(sec_lvl('i', null, true, $Γ['global']['$tmp17']['incrementalRemove']), sec_lvl('$tmp174', null, true, $Γ['global']['$tmp17']['incrementalRemove']));
        $Γ['global']['$tmp17']['incrementalRemove']['$tmp173'] instanceof Object ? $Γ['global']['$tmp17']['incrementalRemove']['$tmp173'].Σ = $lub($Γ['global']['$tmp17']['incrementalRemove']['$tmp173'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['incrementalRemove']['$tmp173'] = $lub($Γ['global']['$tmp17']['incrementalRemove']['$tmp173'], $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp173', null, true, $Γ['global']['$tmp17']['incrementalRemove'])),
            id: 'LOOP'
        });
        for (; $tmp173;) {
            var u, $tmp176, $tmp177, $tmp172, $tmp173, $tmp178;
            $Γ['global']['$tmp17']['incrementalRemove']['$tmp178'] = $Γ['global']['$tmp17']['incrementalRemove']['$tmp173'] = $Γ['global']['$tmp17']['incrementalRemove']['$tmp172'] = $Γ['global']['$tmp17']['incrementalRemove']['$tmp177'] = $Γ['global']['$tmp17']['incrementalRemove']['$tmp176'] = $Γ['global']['$tmp17']['incrementalRemove']['u'] = 0;
            u = unsatisfied.at(i);
            $tmp177 = u.strength;
            $Γ['global']['$tmp17']['incrementalRemove']['$tmp177'] = {
                Σ: 0,
                prototype: { Σ: $Λ[$Λ.length - 1].l }
            };
            $Γ['global']['$tmp17']['incrementalRemove']['$tmp177'] instanceof Object ? $Γ['global']['$tmp17']['incrementalRemove']['$tmp177'].Σ = $lub($Γ['global']['$tmp17']['incrementalRemove']['$tmp177'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['incrementalRemove']['$tmp177'] = $lub($Γ['global']['$tmp17']['incrementalRemove']['$tmp177'], $Λ[$Λ.length - 1].l);
            $tmp176 = $tmp177 == strength;
            $Γ['global']['$tmp17']['incrementalRemove']['$tmp176'] = $lub(sec_lvl('$tmp177', null, true, $Γ['global']['$tmp17']['incrementalRemove']), sec_lvl('strength', null, true, $Γ['global']['$tmp17']['incrementalRemove']));
            $Γ['global']['$tmp17']['incrementalRemove']['$tmp176'] instanceof Object ? $Γ['global']['$tmp17']['incrementalRemove']['$tmp176'].Σ = $lub($Γ['global']['$tmp17']['incrementalRemove']['$tmp176'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['incrementalRemove']['$tmp176'] = $lub($Γ['global']['$tmp17']['incrementalRemove']['$tmp176'], $Λ[$Λ.length - 1].l);
            $Λ.push({
                l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp176', null, true, $Γ['global']['$tmp17']['incrementalRemove'])),
                id: 'IF'
            });
            if ($tmp176) {
                var $tmp348;
                $Γ['global']['$tmp17']['incrementalRemove']['$tmp348'] = 0;
                $rf = $prop('$tmp17', 'incrementalAdd', $Γ['global']['$tmp17']['incrementalRemove']);
                $rf.scope = $Γ['global']['$tmp17']['incrementalRemove'];
                $rf.$this = $Γ['global']['$tmp17']['incrementalRemove']['$this'];
                $rf['c'] = $lub(sec_lvl('u', null, true, $Γ['global']['$tmp17']['incrementalRemove']), $Λ[$Λ.length - 1].l);
                $Λ.push({
                    l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
                    id: 'FUNC'
                });
                $tmp348 = this.incrementalAdd(u);
                $Γ['global']['$tmp17']['incrementalRemove']['$tmp348'] = $Λ.pop().l;
                $Γ['global']['$tmp17']['incrementalRemove']['$tmp348'] instanceof Object ? $Γ['global']['$tmp17']['incrementalRemove']['$tmp348'].Σ = $lub($Γ['global']['$tmp17']['incrementalRemove']['$tmp348'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['incrementalRemove']['$tmp348'] = $lub($Γ['global']['$tmp17']['incrementalRemove']['$tmp348'], $Λ[$Λ.length - 1].l);
            } else {
                $upgrade(['$tmp348'], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp17']['incrementalRemove']);
            }
            $Λ.pop();
            $tmp172 = i++;
            $Γ['global']['$tmp17']['incrementalRemove']['$tmp172'] = sec_lvl('i', null, false, $Γ['global']['$tmp17']['incrementalRemove']);
            $Γ['global']['$tmp17']['incrementalRemove']['$tmp172'] instanceof Object ? $Γ['global']['$tmp17']['incrementalRemove']['$tmp172'].Σ = $lub($Γ['global']['$tmp17']['incrementalRemove']['$tmp172'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['incrementalRemove']['$tmp172'] = $lub($Γ['global']['$tmp17']['incrementalRemove']['$tmp172'], $Λ[$Λ.length - 1].l);
            $tmp178 = unsatisfied.size();
            $tmp173 = i < $tmp178;
            $Γ['global']['$tmp17']['incrementalRemove']['$tmp173'] = $lub(sec_lvl('i', null, true, $Γ['global']['$tmp17']['incrementalRemove']), sec_lvl('$tmp178', null, true, $Γ['global']['$tmp17']['incrementalRemove']));
            $Γ['global']['$tmp17']['incrementalRemove']['$tmp173'] instanceof Object ? $Γ['global']['$tmp17']['incrementalRemove']['$tmp173'].Σ = $lub($Γ['global']['$tmp17']['incrementalRemove']['$tmp173'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['incrementalRemove']['$tmp173'] = $lub($Γ['global']['$tmp17']['incrementalRemove']['$tmp173'], $Λ[$Λ.length - 1].l);
        }
        $upgrade([
            'unsatisfied.at',
            'u',
            '$tmp348',
            'unsatisfied.size',
            '$tmp178'
        ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp17']['incrementalRemove']);
        $Λ.pop();
        strength = strength.nextWeaker();
        $tmp175 = Strength.WEAKEST;
        $Γ['global']['$tmp17']['incrementalRemove']['$tmp175'] = sec_lvl('Strength', 'WEAKEST', false, $Γ['global']['$tmp17']['incrementalRemove']);
        $Γ['global']['$tmp17']['incrementalRemove']['$tmp175'] instanceof Object ? $Γ['global']['$tmp17']['incrementalRemove']['$tmp175'].Σ = $lub($Γ['global']['$tmp17']['incrementalRemove']['$tmp175'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['incrementalRemove']['$tmp175'] = $lub($Γ['global']['$tmp17']['incrementalRemove']['$tmp175'], $Λ[$Λ.length - 1].l);
        $tmp171 = strength != $tmp175;
        $Γ['global']['$tmp17']['incrementalRemove']['$tmp171'] = $lub(sec_lvl('strength', null, true, $Γ['global']['$tmp17']['incrementalRemove']), sec_lvl('$tmp175', null, true, $Γ['global']['$tmp17']['incrementalRemove']));
        $Γ['global']['$tmp17']['incrementalRemove']['$tmp171'] instanceof Object ? $Γ['global']['$tmp17']['incrementalRemove']['$tmp171'].Σ = $lub($Γ['global']['$tmp17']['incrementalRemove']['$tmp171'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['incrementalRemove']['$tmp171'] = $lub($Γ['global']['$tmp17']['incrementalRemove']['$tmp171'], $Λ[$Λ.length - 1].l);
    } while ($tmp171);
    $upgrade([
        'unsatisfied.size',
        '$tmp174',
        'unsatisfied.at',
        'u',
        '$tmp348',
        '$tmp178',
        'strength.nextWeaker',
        'strength'
    ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp17']['incrementalRemove']);
    $Λ.pop();
    return;
};
$Γ['global']['$tmp17']['incrementalRemove'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    c: $Λ[$Λ.length - 1].l
};
$tmp17 = Planner.prototype;
$Γ['global']['$tmp17'] = sec_lvl('Planner', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp17'] instanceof Object ? $Γ['global']['$tmp17'].Σ = $lub($Γ['global']['$tmp17'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17'] = $lub($Γ['global']['$tmp17'], $Λ[$Λ.length - 1].l);
$tmp17.newMark = function () {
    var $tmp179, $tmp180;
    $Γ['global']['$tmp17']['newMark']['$tmp180'] = $Γ['global']['$tmp17']['newMark']['$tmp179'] = 0;
    $tmp180 = this;
    $Γ['global']['$tmp17']['newMark']['$tmp180'] = $Γ['global']['$tmp17']['newMark'].$this;
    $Γ['global']['$tmp17']['newMark']['$tmp180'] instanceof Object ? $Γ['global']['$tmp17']['newMark']['$tmp180'].Σ = $lub($Γ['global']['$tmp17']['newMark']['$tmp180'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['newMark']['$tmp180'] = $lub($Γ['global']['$tmp17']['newMark']['$tmp180'], $Λ[$Λ.length - 1].l);
    $tmp179 = ++$tmp180.currentMark;
    $Γ['global']['$tmp17']['newMark']['$tmp179'] = sec_lvl('$tmp180', 'currentMark', false, $Γ['global']['$tmp17']['newMark']);
    $Γ['global']['$tmp17']['newMark']['$tmp179'] instanceof Object ? $Γ['global']['$tmp17']['newMark']['$tmp179'].Σ = $lub($Γ['global']['$tmp17']['newMark']['$tmp179'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['newMark']['$tmp179'] = $lub($Γ['global']['$tmp17']['newMark']['$tmp179'], $Λ[$Λ.length - 1].l);
    return $tmp179;
};
$Γ['global']['$tmp17']['newMark'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$tmp17 = Planner.prototype;
$Γ['global']['$tmp17'] = sec_lvl('Planner', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp17'] instanceof Object ? $Γ['global']['$tmp17'].Σ = $lub($Γ['global']['$tmp17'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17'] = $lub($Γ['global']['$tmp17'], $Λ[$Λ.length - 1].l);
$tmp17.makePlan = function (sources) {
    var mark, plan, todo, $tmp181, $tmp182;
    $Γ['global']['$tmp17']['makePlan']['$tmp182'] = $Γ['global']['$tmp17']['makePlan']['$tmp181'] = $Γ['global']['$tmp17']['makePlan']['todo'] = $Γ['global']['$tmp17']['makePlan']['plan'] = $Γ['global']['$tmp17']['makePlan']['mark'] = 0;
    $rf = $prop('$tmp17', 'newMark', $Γ['global']['$tmp17']['makePlan']);
    $rf.scope = $Γ['global']['$tmp17']['makePlan'];
    $rf.$this = $Γ['global']['$tmp17']['makePlan']['$this'];
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    mark = this.newMark();
    $scope($Γ['global']['$tmp17']['makePlan'], 'mark', true)['mark'] = $Λ.pop().l;
    $scope($Γ['global']['$tmp17']['makePlan'], 'mark', true)['mark'] instanceof Object ? $scope($Γ['global']['$tmp17']['makePlan'], 'mark', true)['mark'].Σ = $lub($scope($Γ['global']['$tmp17']['makePlan'], 'mark', true)['mark'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp17']['makePlan'], 'mark', true)['mark'] = $lub($scope($Γ['global']['$tmp17']['makePlan'], 'mark', true)['mark'], $Λ[$Λ.length - 1].l);
    $rf = $scope($Γ['global']['$tmp17']['makePlan'], 'Plan', false)['Plan'];
    $rf.scope = $Γ['global']['$tmp17']['makePlan'];
    $rf.$this = {
        Σ: $Λ[$Λ.length - 1].l,
        __$proto__: $rf.prototype
    };
    $rf.InvokedAsContr = true;
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    plan = new Plan();
    $scope($Γ['global']['$tmp17']['makePlan'], 'plan', true)['plan'] = $Λ.pop().l;
    $scope($Γ['global']['$tmp17']['makePlan'], 'plan', true)['plan'] instanceof Object ? $scope($Γ['global']['$tmp17']['makePlan'], 'plan', true)['plan'].Σ = $lub($scope($Γ['global']['$tmp17']['makePlan'], 'plan', true)['plan'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp17']['makePlan'], 'plan', true)['plan'] = $lub($scope($Γ['global']['$tmp17']['makePlan'], 'plan', true)['plan'], $Λ[$Λ.length - 1].l);
    todo = sources;
    $scope($Γ['global']['$tmp17']['makePlan'], 'todo', true)['todo'] = sec_lvl('sources', null, false, $Γ['global']['$tmp17']['makePlan']);
    $scope($Γ['global']['$tmp17']['makePlan'], 'todo', true)['todo'] instanceof Object ? $scope($Γ['global']['$tmp17']['makePlan'], 'todo', true)['todo'].Σ = $lub($scope($Γ['global']['$tmp17']['makePlan'], 'todo', true)['todo'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp17']['makePlan'], 'todo', true)['todo'] = $lub($scope($Γ['global']['$tmp17']['makePlan'], 'todo', true)['todo'], $Λ[$Λ.length - 1].l);
    $tmp182 = todo.size();
    $tmp181 = $tmp182 > 0;
    $Γ['global']['$tmp17']['makePlan']['$tmp181'] = $lub(sec_lvl('$tmp182', null, true, $Γ['global']['$tmp17']['makePlan']), $Λ[$Λ.length - 1].l);
    $Γ['global']['$tmp17']['makePlan']['$tmp181'] instanceof Object ? $Γ['global']['$tmp17']['makePlan']['$tmp181'].Σ = $lub($Γ['global']['$tmp17']['makePlan']['$tmp181'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['makePlan']['$tmp181'] = $lub($Γ['global']['$tmp17']['makePlan']['$tmp181'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp181', null, true, $Γ['global']['$tmp17']['makePlan'])),
        id: 'LOOP'
    });
    while ($tmp181) {
        var c, $tmp183, $tmp184, $tmp185, $tmp186, $tmp181, $tmp187;
        $Γ['global']['$tmp17']['makePlan']['$tmp187'] = $Γ['global']['$tmp17']['makePlan']['$tmp181'] = $Γ['global']['$tmp17']['makePlan']['$tmp186'] = $Γ['global']['$tmp17']['makePlan']['$tmp185'] = $Γ['global']['$tmp17']['makePlan']['$tmp184'] = $Γ['global']['$tmp17']['makePlan']['$tmp183'] = $Γ['global']['$tmp17']['makePlan']['c'] = 0;
        c = todo.removeFirst();
        $tmp = c.output();
        $tmp185 = $tmp.mark;
        $Γ['global']['$tmp17']['makePlan']['$tmp185'] = sec_lvl('$tmp', 'mark', false, $Γ['global']['$tmp17']['makePlan']);
        $Γ['global']['$tmp17']['makePlan']['$tmp185'] instanceof Object ? $Γ['global']['$tmp17']['makePlan']['$tmp185'].Σ = $lub($Γ['global']['$tmp17']['makePlan']['$tmp185'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['makePlan']['$tmp185'] = $lub($Γ['global']['$tmp17']['makePlan']['$tmp185'], $Λ[$Λ.length - 1].l);
        $tmp184 = $tmp185 != mark;
        $Γ['global']['$tmp17']['makePlan']['$tmp184'] = $lub(sec_lvl('$tmp185', null, true, $Γ['global']['$tmp17']['makePlan']), sec_lvl('mark', null, true, $Γ['global']['$tmp17']['makePlan']));
        $Γ['global']['$tmp17']['makePlan']['$tmp184'] instanceof Object ? $Γ['global']['$tmp17']['makePlan']['$tmp184'].Σ = $lub($Γ['global']['$tmp17']['makePlan']['$tmp184'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['makePlan']['$tmp184'] = $lub($Γ['global']['$tmp17']['makePlan']['$tmp184'], $Λ[$Λ.length - 1].l);
        $tmp186 = c.inputsKnown(mark);
        $tmp183 = $tmp184 && $tmp186;
        $Γ['global']['$tmp17']['makePlan']['$tmp183'] = $lub(sec_lvl('$tmp184', null, true, $Γ['global']['$tmp17']['makePlan']), sec_lvl('$tmp186', null, true, $Γ['global']['$tmp17']['makePlan']));
        $Γ['global']['$tmp17']['makePlan']['$tmp183'] instanceof Object ? $Γ['global']['$tmp17']['makePlan']['$tmp183'].Σ = $lub($Γ['global']['$tmp17']['makePlan']['$tmp183'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['makePlan']['$tmp183'] = $lub($Γ['global']['$tmp17']['makePlan']['$tmp183'], $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp183', null, true, $Γ['global']['$tmp17']['makePlan'])),
            id: 'IF'
        });
        if ($tmp183) {
            var $tmp188, $tmp189, $tmp190;
            $Γ['global']['$tmp17']['makePlan']['$tmp190'] = $Γ['global']['$tmp17']['makePlan']['$tmp189'] = $Γ['global']['$tmp17']['makePlan']['$tmp188'] = 0;
            $tmp188 = plan.addConstraint(c);
            $tmp = c.output();
            $tmp.mark = mark;
            $Γ['global']['$tmp17']['makePlan']['$tmp']['mark'] = sec_lvl('mark', null, false, $Γ['global']['$tmp17']['makePlan']);
            $Γ['global']['$tmp17']['makePlan']['$tmp']['mark'] instanceof Object ? $Γ['global']['$tmp17']['makePlan']['$tmp']['mark'].Σ = $lub($Γ['global']['$tmp17']['makePlan']['$tmp']['mark'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['makePlan']['$tmp']['mark'] = $lub($Γ['global']['$tmp17']['makePlan']['$tmp']['mark'], $Λ[$Λ.length - 1].l);
            $tmp190 = c.output();
            $rf = $prop('$tmp17', 'addConstraintsConsumingTo', $Γ['global']['$tmp17']['makePlan']);
            $rf.scope = $Γ['global']['$tmp17']['makePlan'];
            $rf.$this = $Γ['global']['$tmp17']['makePlan']['$this'];
            $rf['v'] = $lub(sec_lvl('$tmp190', null, true, $Γ['global']['$tmp17']['makePlan']), $Λ[$Λ.length - 1].l);
            $rf['coll'] = $lub(sec_lvl('todo', null, true, $Γ['global']['$tmp17']['makePlan']), $Λ[$Λ.length - 1].l);
            $Λ.push({
                l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
                id: 'FUNC'
            });
            $tmp189 = this.addConstraintsConsumingTo($tmp190, todo);
            $Γ['global']['$tmp17']['makePlan']['$tmp189'] = $Λ.pop().l;
            $Γ['global']['$tmp17']['makePlan']['$tmp189'] instanceof Object ? $Γ['global']['$tmp17']['makePlan']['$tmp189'].Σ = $lub($Γ['global']['$tmp17']['makePlan']['$tmp189'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['makePlan']['$tmp189'] = $lub($Γ['global']['$tmp17']['makePlan']['$tmp189'], $Λ[$Λ.length - 1].l);
        } else {
            $upgrade([
                'plan.addConstraint',
                '$tmp188',
                'c.output',
                '$tmp',
                '$tmp190',
                '$tmp189'
            ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp17']['makePlan']);
        }
        $Λ.pop();
        $tmp187 = todo.size();
        $tmp181 = $tmp187 > 0;
        $Γ['global']['$tmp17']['makePlan']['$tmp181'] = $lub(sec_lvl('$tmp187', null, true, $Γ['global']['$tmp17']['makePlan']), $Λ[$Λ.length - 1].l);
        $Γ['global']['$tmp17']['makePlan']['$tmp181'] instanceof Object ? $Γ['global']['$tmp17']['makePlan']['$tmp181'].Σ = $lub($Γ['global']['$tmp17']['makePlan']['$tmp181'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['makePlan']['$tmp181'] = $lub($Γ['global']['$tmp17']['makePlan']['$tmp181'], $Λ[$Λ.length - 1].l);
    }
    $upgrade([
        'todo.removeFirst',
        'c',
        'c.output',
        '$tmp',
        'c.inputsKnown',
        '$tmp186',
        'plan.addConstraint',
        '$tmp188',
        '$tmp190',
        '$tmp189',
        'todo.size',
        '$tmp187'
    ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp17']['makePlan']);
    $Λ.pop();
    return plan;
};
$Γ['global']['$tmp17']['makePlan'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    sources: $Λ[$Λ.length - 1].l
};
$tmp17 = Planner.prototype;
$Γ['global']['$tmp17'] = sec_lvl('Planner', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp17'] instanceof Object ? $Γ['global']['$tmp17'].Σ = $lub($Γ['global']['$tmp17'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17'] = $lub($Γ['global']['$tmp17'], $Λ[$Λ.length - 1].l);
$tmp17.extractPlanFromConstraints = function (constraints) {
    var sources, i, $tmp192, $tmp193, $tmp194;
    $Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp194'] = $Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp193'] = $Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp192'] = $Γ['global']['$tmp17']['extractPlanFromConstraints']['i'] = $Γ['global']['$tmp17']['extractPlanFromConstraints']['sources'] = 0;
    $rf = $scope($Γ['global']['$tmp17']['extractPlanFromConstraints'], 'OrderedCollection', false)['OrderedCollection'];
    $rf.scope = $Γ['global']['$tmp17']['extractPlanFromConstraints'];
    $rf.$this = {
        Σ: $Λ[$Λ.length - 1].l,
        __$proto__: $rf.prototype
    };
    $rf.InvokedAsContr = true;
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    sources = new OrderedCollection();
    $scope($Γ['global']['$tmp17']['extractPlanFromConstraints'], 'sources', true)['sources'] = $Λ.pop().l;
    $scope($Γ['global']['$tmp17']['extractPlanFromConstraints'], 'sources', true)['sources'] instanceof Object ? $scope($Γ['global']['$tmp17']['extractPlanFromConstraints'], 'sources', true)['sources'].Σ = $lub($scope($Γ['global']['$tmp17']['extractPlanFromConstraints'], 'sources', true)['sources'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp17']['extractPlanFromConstraints'], 'sources', true)['sources'] = $lub($scope($Γ['global']['$tmp17']['extractPlanFromConstraints'], 'sources', true)['sources'], $Λ[$Λ.length - 1].l);
    i = 0;
    $scope($Γ['global']['$tmp17']['extractPlanFromConstraints'], 'i', true)['i'] = $Λ[$Λ.length - 1].l;
    $tmp193 = constraints.size();
    $tmp192 = i < $tmp193;
    $Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp192'] = $lub(sec_lvl('i', null, true, $Γ['global']['$tmp17']['extractPlanFromConstraints']), sec_lvl('$tmp193', null, true, $Γ['global']['$tmp17']['extractPlanFromConstraints']));
    $Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp192'] instanceof Object ? $Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp192'].Σ = $lub($Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp192'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp192'] = $lub($Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp192'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp192', null, true, $Γ['global']['$tmp17']['extractPlanFromConstraints'])),
        id: 'LOOP'
    });
    for (; $tmp192;) {
        var c, $tmp195, $tmp196, $tmp197, $tmp191, $tmp192, $tmp198;
        $Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp198'] = $Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp192'] = $Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp191'] = $Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp197'] = $Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp196'] = $Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp195'] = $Γ['global']['$tmp17']['extractPlanFromConstraints']['c'] = 0;
        c = constraints.at(i);
        $tmp196 = c.isInput();
        $tmp197 = c.isSatisfied();
        $tmp195 = $tmp196 && $tmp197;
        $Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp195'] = $lub(sec_lvl('$tmp196', null, true, $Γ['global']['$tmp17']['extractPlanFromConstraints']), sec_lvl('$tmp197', null, true, $Γ['global']['$tmp17']['extractPlanFromConstraints']));
        $Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp195'] instanceof Object ? $Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp195'].Σ = $lub($Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp195'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp195'] = $lub($Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp195'], $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp195', null, true, $Γ['global']['$tmp17']['extractPlanFromConstraints'])),
            id: 'IF'
        });
        if ($tmp195) {
            var $tmp349;
            $Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp349'] = 0;
            $tmp349 = sources.add(c);
        } else {
            $upgrade([
                'sources.add',
                '$tmp349'
            ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp17']['extractPlanFromConstraints']);
        }
        $Λ.pop();
        $tmp191 = i++;
        $Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp191'] = sec_lvl('i', null, false, $Γ['global']['$tmp17']['extractPlanFromConstraints']);
        $Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp191'] instanceof Object ? $Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp191'].Σ = $lub($Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp191'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp191'] = $lub($Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp191'], $Λ[$Λ.length - 1].l);
        $tmp198 = constraints.size();
        $tmp192 = i < $tmp198;
        $Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp192'] = $lub(sec_lvl('i', null, true, $Γ['global']['$tmp17']['extractPlanFromConstraints']), sec_lvl('$tmp198', null, true, $Γ['global']['$tmp17']['extractPlanFromConstraints']));
        $Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp192'] instanceof Object ? $Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp192'].Σ = $lub($Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp192'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp192'] = $lub($Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp192'], $Λ[$Λ.length - 1].l);
    }
    $upgrade([
        'constraints.at',
        'c',
        'c.isInput',
        '$tmp196',
        'c.isSatisfied',
        '$tmp197',
        'sources.add',
        '$tmp349',
        'constraints.size',
        '$tmp198'
    ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp17']['extractPlanFromConstraints']);
    $Λ.pop();
    $rf = $prop('$tmp17', 'makePlan', $Γ['global']['$tmp17']['extractPlanFromConstraints']);
    $rf.scope = $Γ['global']['$tmp17']['extractPlanFromConstraints'];
    $rf.$this = $Γ['global']['$tmp17']['extractPlanFromConstraints']['$this'];
    $rf['sources'] = $lub(sec_lvl('sources', null, true, $Γ['global']['$tmp17']['extractPlanFromConstraints']), $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp194 = this.makePlan(sources);
    $Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp194'] = $Λ.pop().l;
    $Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp194'] instanceof Object ? $Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp194'].Σ = $lub($Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp194'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp194'] = $lub($Γ['global']['$tmp17']['extractPlanFromConstraints']['$tmp194'], $Λ[$Λ.length - 1].l);
    return $tmp194;
};
$Γ['global']['$tmp17']['extractPlanFromConstraints'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    constraints: $Λ[$Λ.length - 1].l
};
$tmp17 = Planner.prototype;
$Γ['global']['$tmp17'] = sec_lvl('Planner', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp17'] instanceof Object ? $Γ['global']['$tmp17'].Σ = $lub($Γ['global']['$tmp17'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17'] = $lub($Γ['global']['$tmp17'], $Λ[$Λ.length - 1].l);
$tmp17.addPropagate = function (c, mark) {
    var todo, $tmp199, $tmp200, $tmp201, $tmp202;
    $Γ['global']['$tmp17']['addPropagate']['$tmp202'] = $Γ['global']['$tmp17']['addPropagate']['$tmp201'] = $Γ['global']['$tmp17']['addPropagate']['$tmp200'] = $Γ['global']['$tmp17']['addPropagate']['$tmp199'] = $Γ['global']['$tmp17']['addPropagate']['todo'] = 0;
    $rf = $scope($Γ['global']['$tmp17']['addPropagate'], 'OrderedCollection', false)['OrderedCollection'];
    $rf.scope = $Γ['global']['$tmp17']['addPropagate'];
    $rf.$this = {
        Σ: $Λ[$Λ.length - 1].l,
        __$proto__: $rf.prototype
    };
    $rf.InvokedAsContr = true;
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    todo = new OrderedCollection();
    $scope($Γ['global']['$tmp17']['addPropagate'], 'todo', true)['todo'] = $Λ.pop().l;
    $scope($Γ['global']['$tmp17']['addPropagate'], 'todo', true)['todo'] instanceof Object ? $scope($Γ['global']['$tmp17']['addPropagate'], 'todo', true)['todo'].Σ = $lub($scope($Γ['global']['$tmp17']['addPropagate'], 'todo', true)['todo'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp17']['addPropagate'], 'todo', true)['todo'] = $lub($scope($Γ['global']['$tmp17']['addPropagate'], 'todo', true)['todo'], $Λ[$Λ.length - 1].l);
    $tmp199 = todo.add(c);
    $tmp201 = todo.size();
    $tmp200 = $tmp201 > 0;
    $Γ['global']['$tmp17']['addPropagate']['$tmp200'] = $lub(sec_lvl('$tmp201', null, true, $Γ['global']['$tmp17']['addPropagate']), $Λ[$Λ.length - 1].l);
    $Γ['global']['$tmp17']['addPropagate']['$tmp200'] instanceof Object ? $Γ['global']['$tmp17']['addPropagate']['$tmp200'].Σ = $lub($Γ['global']['$tmp17']['addPropagate']['$tmp200'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['addPropagate']['$tmp200'] = $lub($Γ['global']['$tmp17']['addPropagate']['$tmp200'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp200', null, true, $Γ['global']['$tmp17']['addPropagate'])),
        id: 'LOOP'
    });
    while ($tmp200) {
        var d, $tmp203, $tmp204, $tmp205, $tmp206, $tmp207, $tmp200, $tmp208;
        $Γ['global']['$tmp17']['addPropagate']['$tmp208'] = $Γ['global']['$tmp17']['addPropagate']['$tmp200'] = $Γ['global']['$tmp17']['addPropagate']['$tmp207'] = $Γ['global']['$tmp17']['addPropagate']['$tmp206'] = $Γ['global']['$tmp17']['addPropagate']['$tmp205'] = $Γ['global']['$tmp17']['addPropagate']['$tmp204'] = $Γ['global']['$tmp17']['addPropagate']['$tmp203'] = $Γ['global']['$tmp17']['addPropagate']['d'] = 0;
        d = todo.removeFirst();
        $tmp = d.output();
        $tmp204 = $tmp.mark;
        $Γ['global']['$tmp17']['addPropagate']['$tmp204'] = sec_lvl('$tmp', 'mark', false, $Γ['global']['$tmp17']['addPropagate']);
        $Γ['global']['$tmp17']['addPropagate']['$tmp204'] instanceof Object ? $Γ['global']['$tmp17']['addPropagate']['$tmp204'].Σ = $lub($Γ['global']['$tmp17']['addPropagate']['$tmp204'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['addPropagate']['$tmp204'] = $lub($Γ['global']['$tmp17']['addPropagate']['$tmp204'], $Λ[$Λ.length - 1].l);
        $tmp203 = $tmp204 == mark;
        $Γ['global']['$tmp17']['addPropagate']['$tmp203'] = $lub(sec_lvl('$tmp204', null, true, $Γ['global']['$tmp17']['addPropagate']), sec_lvl('mark', null, true, $Γ['global']['$tmp17']['addPropagate']));
        $Γ['global']['$tmp17']['addPropagate']['$tmp203'] instanceof Object ? $Γ['global']['$tmp17']['addPropagate']['$tmp203'].Σ = $lub($Γ['global']['$tmp17']['addPropagate']['$tmp203'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['addPropagate']['$tmp203'] = $lub($Γ['global']['$tmp17']['addPropagate']['$tmp203'], $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp203', null, true, $Γ['global']['$tmp17']['addPropagate'])),
            id: 'IF'
        });
        if ($tmp203) {
            var $tmp209, $tmp210;
            $Γ['global']['$tmp17']['addPropagate']['$tmp210'] = $Γ['global']['$tmp17']['addPropagate']['$tmp209'] = 0;
            $rf = $prop('$tmp17', 'incrementalRemove', $Γ['global']['$tmp17']['addPropagate']);
            $rf.scope = $Γ['global']['$tmp17']['addPropagate'];
            $rf.$this = $Γ['global']['$tmp17']['addPropagate']['$this'];
            $rf['c'] = $lub(sec_lvl('c', null, true, $Γ['global']['$tmp17']['addPropagate']), $Λ[$Λ.length - 1].l);
            $Λ.push({
                l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
                id: 'FUNC'
            });
            $tmp209 = this.incrementalRemove(c);
            $Γ['global']['$tmp17']['addPropagate']['$tmp209'] = $Λ.pop().l;
            $Γ['global']['$tmp17']['addPropagate']['$tmp209'] instanceof Object ? $Γ['global']['$tmp17']['addPropagate']['$tmp209'].Σ = $lub($Γ['global']['$tmp17']['addPropagate']['$tmp209'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['addPropagate']['$tmp209'] = $lub($Γ['global']['$tmp17']['addPropagate']['$tmp209'], $Λ[$Λ.length - 1].l);
            $tmp210 = false;
            $Γ['global']['$tmp17']['addPropagate']['$tmp210'] = $Λ[$Λ.length - 1].l;
            return $tmp210;
            var $shouldComp = { 'lbl': 'FUNC' };
        } else {
            $upgrade(['$tmp209'], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp17']['addPropagate']);
        }
        if ($shouldComp)
            $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
        $Λ.pop();
        $tmp205 = d.recalculate();
        $tmp207 = d.output();
        $rf = $prop('$tmp17', 'addConstraintsConsumingTo', $Γ['global']['$tmp17']['addPropagate']);
        $rf.scope = $Γ['global']['$tmp17']['addPropagate'];
        $rf.$this = $Γ['global']['$tmp17']['addPropagate']['$this'];
        $rf['v'] = $lub(sec_lvl('$tmp207', null, true, $Γ['global']['$tmp17']['addPropagate']), $Λ[$Λ.length - 1].l);
        $rf['coll'] = $lub(sec_lvl('todo', null, true, $Γ['global']['$tmp17']['addPropagate']), $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
            id: 'FUNC'
        });
        $tmp206 = this.addConstraintsConsumingTo($tmp207, todo);
        $Γ['global']['$tmp17']['addPropagate']['$tmp206'] = $Λ.pop().l;
        $Γ['global']['$tmp17']['addPropagate']['$tmp206'] instanceof Object ? $Γ['global']['$tmp17']['addPropagate']['$tmp206'].Σ = $lub($Γ['global']['$tmp17']['addPropagate']['$tmp206'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['addPropagate']['$tmp206'] = $lub($Γ['global']['$tmp17']['addPropagate']['$tmp206'], $Λ[$Λ.length - 1].l);
        $tmp208 = todo.size();
        $tmp200 = $tmp208 > 0;
        $Γ['global']['$tmp17']['addPropagate']['$tmp200'] = $lub(sec_lvl('$tmp208', null, true, $Γ['global']['$tmp17']['addPropagate']), $Λ[$Λ.length - 1].l);
        $Γ['global']['$tmp17']['addPropagate']['$tmp200'] instanceof Object ? $Γ['global']['$tmp17']['addPropagate']['$tmp200'].Σ = $lub($Γ['global']['$tmp17']['addPropagate']['$tmp200'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['addPropagate']['$tmp200'] = $lub($Γ['global']['$tmp17']['addPropagate']['$tmp200'], $Λ[$Λ.length - 1].l);
    }
    $upgrade([
        'todo.removeFirst',
        'd',
        'd.output',
        '$tmp',
        '$tmp209',
        'd.recalculate',
        '$tmp205',
        '$tmp207',
        '$tmp206',
        'todo.size',
        '$tmp208'
    ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp17']['addPropagate']);
    $Λ.pop();
    $tmp202 = true;
    $Γ['global']['$tmp17']['addPropagate']['$tmp202'] = $Λ[$Λ.length - 1].l;
    return $tmp202;
};
$Γ['global']['$tmp17']['addPropagate'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    c: $Λ[$Λ.length - 1].l,
    mark: $Λ[$Λ.length - 1].l
};
$tmp17 = Planner.prototype;
$Γ['global']['$tmp17'] = sec_lvl('Planner', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp17'] instanceof Object ? $Γ['global']['$tmp17'].Σ = $lub($Γ['global']['$tmp17'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17'] = $lub($Γ['global']['$tmp17'], $Λ[$Λ.length - 1].l);
$tmp17.removePropagateFrom = function (out) {
    out.determinedBy = null;
    $scope($Γ['global']['$tmp17']['removePropagateFrom'], 'out', false)['determinedBy'] = $Λ[$Λ.length - 1].l;
    out.walkStrength = Strength.WEAKEST;
    $scope($Γ['global']['$tmp17']['removePropagateFrom'], 'out', false)['walkStrength'] = sec_lvl('Strength', 'WEAKEST', false, $Γ['global']['$tmp17']['removePropagateFrom']);
    $scope($Γ['global']['$tmp17']['removePropagateFrom'], 'out', false)['walkStrength'] instanceof Object ? $scope($Γ['global']['$tmp17']['removePropagateFrom'], 'out', false)['walkStrength'].Σ = $lub($scope($Γ['global']['$tmp17']['removePropagateFrom'], 'out', false)['walkStrength'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp17']['removePropagateFrom'], 'out', false)['walkStrength'] = $lub($scope($Γ['global']['$tmp17']['removePropagateFrom'], 'out', false)['walkStrength'], $Λ[$Λ.length - 1].l);
    out.stay = true;
    $scope($Γ['global']['$tmp17']['removePropagateFrom'], 'out', false)['stay'] = $Λ[$Λ.length - 1].l;
    var unsatisfied, todo, $tmp211, $tmp212, $tmp213;
    $Γ['global']['$tmp17']['removePropagateFrom']['$tmp213'] = $Γ['global']['$tmp17']['removePropagateFrom']['$tmp212'] = $Γ['global']['$tmp17']['removePropagateFrom']['$tmp211'] = $Γ['global']['$tmp17']['removePropagateFrom']['todo'] = $Γ['global']['$tmp17']['removePropagateFrom']['unsatisfied'] = 0;
    $rf = $scope($Γ['global']['$tmp17']['removePropagateFrom'], 'OrderedCollection', false)['OrderedCollection'];
    $rf.scope = $Γ['global']['$tmp17']['removePropagateFrom'];
    $rf.$this = {
        Σ: $Λ[$Λ.length - 1].l,
        __$proto__: $rf.prototype
    };
    $rf.InvokedAsContr = true;
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    unsatisfied = new OrderedCollection();
    $scope($Γ['global']['$tmp17']['removePropagateFrom'], 'unsatisfied', true)['unsatisfied'] = $Λ.pop().l;
    $scope($Γ['global']['$tmp17']['removePropagateFrom'], 'unsatisfied', true)['unsatisfied'] instanceof Object ? $scope($Γ['global']['$tmp17']['removePropagateFrom'], 'unsatisfied', true)['unsatisfied'].Σ = $lub($scope($Γ['global']['$tmp17']['removePropagateFrom'], 'unsatisfied', true)['unsatisfied'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp17']['removePropagateFrom'], 'unsatisfied', true)['unsatisfied'] = $lub($scope($Γ['global']['$tmp17']['removePropagateFrom'], 'unsatisfied', true)['unsatisfied'], $Λ[$Λ.length - 1].l);
    $rf = $scope($Γ['global']['$tmp17']['removePropagateFrom'], 'OrderedCollection', false)['OrderedCollection'];
    $rf.scope = $Γ['global']['$tmp17']['removePropagateFrom'];
    $rf.$this = {
        Σ: $Λ[$Λ.length - 1].l,
        __$proto__: $rf.prototype
    };
    $rf.InvokedAsContr = true;
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    todo = new OrderedCollection();
    $scope($Γ['global']['$tmp17']['removePropagateFrom'], 'todo', true)['todo'] = $Λ.pop().l;
    $scope($Γ['global']['$tmp17']['removePropagateFrom'], 'todo', true)['todo'] instanceof Object ? $scope($Γ['global']['$tmp17']['removePropagateFrom'], 'todo', true)['todo'].Σ = $lub($scope($Γ['global']['$tmp17']['removePropagateFrom'], 'todo', true)['todo'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp17']['removePropagateFrom'], 'todo', true)['todo'] = $lub($scope($Γ['global']['$tmp17']['removePropagateFrom'], 'todo', true)['todo'], $Λ[$Λ.length - 1].l);
    $tmp211 = todo.add(out);
    $tmp213 = todo.size();
    $tmp212 = $tmp213 > 0;
    $Γ['global']['$tmp17']['removePropagateFrom']['$tmp212'] = $lub(sec_lvl('$tmp213', null, true, $Γ['global']['$tmp17']['removePropagateFrom']), $Λ[$Λ.length - 1].l);
    $Γ['global']['$tmp17']['removePropagateFrom']['$tmp212'] instanceof Object ? $Γ['global']['$tmp17']['removePropagateFrom']['$tmp212'].Σ = $lub($Γ['global']['$tmp17']['removePropagateFrom']['$tmp212'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['removePropagateFrom']['$tmp212'] = $lub($Γ['global']['$tmp17']['removePropagateFrom']['$tmp212'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp212', null, true, $Γ['global']['$tmp17']['removePropagateFrom'])),
        id: 'LOOP'
    });
    while ($tmp212) {
        var v, i, $tmp215, $tmp216, $tmp217, determining, $tmp219, $tmp220, $tmp212, $tmp221;
        $Γ['global']['$tmp17']['removePropagateFrom']['$tmp221'] = $Γ['global']['$tmp17']['removePropagateFrom']['$tmp212'] = $Γ['global']['$tmp17']['removePropagateFrom']['$tmp220'] = $Γ['global']['$tmp17']['removePropagateFrom']['$tmp219'] = $Γ['global']['$tmp17']['removePropagateFrom']['determining'] = $Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'] = $Γ['global']['$tmp17']['removePropagateFrom']['$tmp216'] = $Γ['global']['$tmp17']['removePropagateFrom']['$tmp215'] = $Γ['global']['$tmp17']['removePropagateFrom']['i'] = $Γ['global']['$tmp17']['removePropagateFrom']['v'] = 0;
        v = todo.removeFirst();
        i = 0;
        $scope($Γ['global']['$tmp17']['removePropagateFrom'], 'i', true)['i'] = $Λ[$Λ.length - 1].l;
        $tmp217 = v.constraints;
        $Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'] = sec_lvl('v', 'constraints', false, $Γ['global']['$tmp17']['removePropagateFrom']);
        $Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'] instanceof Object ? $Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'].Σ = $lub($Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'] = $lub($Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'], $Λ[$Λ.length - 1].l);
        $tmp216 = $tmp217.size();
        $tmp215 = i < $tmp216;
        $Γ['global']['$tmp17']['removePropagateFrom']['$tmp215'] = $lub(sec_lvl('i', null, true, $Γ['global']['$tmp17']['removePropagateFrom']), sec_lvl('$tmp216', null, true, $Γ['global']['$tmp17']['removePropagateFrom']));
        $Γ['global']['$tmp17']['removePropagateFrom']['$tmp215'] instanceof Object ? $Γ['global']['$tmp17']['removePropagateFrom']['$tmp215'].Σ = $lub($Γ['global']['$tmp17']['removePropagateFrom']['$tmp215'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['removePropagateFrom']['$tmp215'] = $lub($Γ['global']['$tmp17']['removePropagateFrom']['$tmp215'], $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp215', null, true, $Γ['global']['$tmp17']['removePropagateFrom'])),
            id: 'LOOP'
        });
        for (; $tmp215;) {
            var c, $tmp217, $tmp222, $tmp223, $tmp214, $tmp215, $tmp224;
            $Γ['global']['$tmp17']['removePropagateFrom']['$tmp224'] = $Γ['global']['$tmp17']['removePropagateFrom']['$tmp215'] = $Γ['global']['$tmp17']['removePropagateFrom']['$tmp214'] = $Γ['global']['$tmp17']['removePropagateFrom']['$tmp223'] = $Γ['global']['$tmp17']['removePropagateFrom']['$tmp222'] = $Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'] = $Γ['global']['$tmp17']['removePropagateFrom']['c'] = 0;
            $tmp217 = v.constraints;
            $Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'] = sec_lvl('v', 'constraints', false, $Γ['global']['$tmp17']['removePropagateFrom']);
            $Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'] instanceof Object ? $Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'].Σ = $lub($Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'] = $lub($Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'], $Λ[$Λ.length - 1].l);
            c = $tmp217.at(i);
            $tmp223 = c.isSatisfied();
            $tmp222 = !$tmp223;
            $Γ['global']['$tmp17']['removePropagateFrom']['$tmp222'] = sec_lvl('$tmp223', null, false, $Γ['global']['$tmp17']['removePropagateFrom']);
            $Γ['global']['$tmp17']['removePropagateFrom']['$tmp222'] instanceof Object ? $Γ['global']['$tmp17']['removePropagateFrom']['$tmp222'].Σ = $lub($Γ['global']['$tmp17']['removePropagateFrom']['$tmp222'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['removePropagateFrom']['$tmp222'] = $lub($Γ['global']['$tmp17']['removePropagateFrom']['$tmp222'], $Λ[$Λ.length - 1].l);
            $Λ.push({
                l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp222', null, true, $Γ['global']['$tmp17']['removePropagateFrom'])),
                id: 'IF'
            });
            if ($tmp222) {
                var $tmp350;
                $Γ['global']['$tmp17']['removePropagateFrom']['$tmp350'] = 0;
                $tmp350 = unsatisfied.add(c);
            } else {
                $upgrade([
                    'unsatisfied.add',
                    '$tmp350'
                ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp17']['removePropagateFrom']);
            }
            $Λ.pop();
            $tmp214 = i++;
            $Γ['global']['$tmp17']['removePropagateFrom']['$tmp214'] = sec_lvl('i', null, false, $Γ['global']['$tmp17']['removePropagateFrom']);
            $Γ['global']['$tmp17']['removePropagateFrom']['$tmp214'] instanceof Object ? $Γ['global']['$tmp17']['removePropagateFrom']['$tmp214'].Σ = $lub($Γ['global']['$tmp17']['removePropagateFrom']['$tmp214'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['removePropagateFrom']['$tmp214'] = $lub($Γ['global']['$tmp17']['removePropagateFrom']['$tmp214'], $Λ[$Λ.length - 1].l);
            $tmp217 = v.constraints;
            $Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'] = sec_lvl('v', 'constraints', false, $Γ['global']['$tmp17']['removePropagateFrom']);
            $Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'] instanceof Object ? $Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'].Σ = $lub($Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'] = $lub($Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'], $Λ[$Λ.length - 1].l);
            $tmp224 = $tmp217.size();
            $tmp215 = i < $tmp224;
            $Γ['global']['$tmp17']['removePropagateFrom']['$tmp215'] = $lub(sec_lvl('i', null, true, $Γ['global']['$tmp17']['removePropagateFrom']), sec_lvl('$tmp224', null, true, $Γ['global']['$tmp17']['removePropagateFrom']));
            $Γ['global']['$tmp17']['removePropagateFrom']['$tmp215'] instanceof Object ? $Γ['global']['$tmp17']['removePropagateFrom']['$tmp215'].Σ = $lub($Γ['global']['$tmp17']['removePropagateFrom']['$tmp215'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['removePropagateFrom']['$tmp215'] = $lub($Γ['global']['$tmp17']['removePropagateFrom']['$tmp215'], $Λ[$Λ.length - 1].l);
        }
        $upgrade([
            '$tmp217.at',
            'c',
            'c.isSatisfied',
            '$tmp223',
            'unsatisfied.add',
            '$tmp350',
            '$tmp217.size',
            '$tmp224'
        ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp17']['removePropagateFrom']);
        $Λ.pop();
        determining = v.determinedBy;
        $scope($Γ['global']['$tmp17']['removePropagateFrom'], 'determining', true)['determining'] = sec_lvl('v', 'determinedBy', false, $Γ['global']['$tmp17']['removePropagateFrom']);
        $scope($Γ['global']['$tmp17']['removePropagateFrom'], 'determining', true)['determining'] instanceof Object ? $scope($Γ['global']['$tmp17']['removePropagateFrom'], 'determining', true)['determining'].Σ = $lub($scope($Γ['global']['$tmp17']['removePropagateFrom'], 'determining', true)['determining'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp17']['removePropagateFrom'], 'determining', true)['determining'] = $lub($scope($Γ['global']['$tmp17']['removePropagateFrom'], 'determining', true)['determining'], $Λ[$Λ.length - 1].l);
        i = 0;
        $scope($Γ['global']['$tmp17']['removePropagateFrom'], 'i', true)['i'] = $Λ[$Λ.length - 1].l;
        $tmp217 = v.constraints;
        $Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'] = sec_lvl('v', 'constraints', false, $Γ['global']['$tmp17']['removePropagateFrom']);
        $Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'] instanceof Object ? $Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'].Σ = $lub($Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'] = $lub($Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'], $Λ[$Λ.length - 1].l);
        $tmp220 = $tmp217.size();
        $tmp219 = i < $tmp220;
        $Γ['global']['$tmp17']['removePropagateFrom']['$tmp219'] = $lub(sec_lvl('i', null, true, $Γ['global']['$tmp17']['removePropagateFrom']), sec_lvl('$tmp220', null, true, $Γ['global']['$tmp17']['removePropagateFrom']));
        $Γ['global']['$tmp17']['removePropagateFrom']['$tmp219'] instanceof Object ? $Γ['global']['$tmp17']['removePropagateFrom']['$tmp219'].Σ = $lub($Γ['global']['$tmp17']['removePropagateFrom']['$tmp219'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['removePropagateFrom']['$tmp219'] = $lub($Γ['global']['$tmp17']['removePropagateFrom']['$tmp219'], $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp219', null, true, $Γ['global']['$tmp17']['removePropagateFrom'])),
            id: 'LOOP'
        });
        for (; $tmp219;) {
            var next, $tmp217, $tmp225, $tmp226, $tmp227, $tmp218, $tmp219, $tmp228;
            $Γ['global']['$tmp17']['removePropagateFrom']['$tmp228'] = $Γ['global']['$tmp17']['removePropagateFrom']['$tmp219'] = $Γ['global']['$tmp17']['removePropagateFrom']['$tmp218'] = $Γ['global']['$tmp17']['removePropagateFrom']['$tmp227'] = $Γ['global']['$tmp17']['removePropagateFrom']['$tmp226'] = $Γ['global']['$tmp17']['removePropagateFrom']['$tmp225'] = $Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'] = $Γ['global']['$tmp17']['removePropagateFrom']['next'] = 0;
            $tmp217 = v.constraints;
            $Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'] = sec_lvl('v', 'constraints', false, $Γ['global']['$tmp17']['removePropagateFrom']);
            $Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'] instanceof Object ? $Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'].Σ = $lub($Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'] = $lub($Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'], $Λ[$Λ.length - 1].l);
            next = $tmp217.at(i);
            $tmp226 = next != determining;
            $Γ['global']['$tmp17']['removePropagateFrom']['$tmp226'] = $lub(sec_lvl('next', null, true, $Γ['global']['$tmp17']['removePropagateFrom']), sec_lvl('determining', null, true, $Γ['global']['$tmp17']['removePropagateFrom']));
            $Γ['global']['$tmp17']['removePropagateFrom']['$tmp226'] instanceof Object ? $Γ['global']['$tmp17']['removePropagateFrom']['$tmp226'].Σ = $lub($Γ['global']['$tmp17']['removePropagateFrom']['$tmp226'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['removePropagateFrom']['$tmp226'] = $lub($Γ['global']['$tmp17']['removePropagateFrom']['$tmp226'], $Λ[$Λ.length - 1].l);
            $tmp227 = next.isSatisfied();
            $tmp225 = $tmp226 && $tmp227;
            $Γ['global']['$tmp17']['removePropagateFrom']['$tmp225'] = $lub(sec_lvl('$tmp226', null, true, $Γ['global']['$tmp17']['removePropagateFrom']), sec_lvl('$tmp227', null, true, $Γ['global']['$tmp17']['removePropagateFrom']));
            $Γ['global']['$tmp17']['removePropagateFrom']['$tmp225'] instanceof Object ? $Γ['global']['$tmp17']['removePropagateFrom']['$tmp225'].Σ = $lub($Γ['global']['$tmp17']['removePropagateFrom']['$tmp225'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['removePropagateFrom']['$tmp225'] = $lub($Γ['global']['$tmp17']['removePropagateFrom']['$tmp225'], $Λ[$Λ.length - 1].l);
            $Λ.push({
                l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp225', null, true, $Γ['global']['$tmp17']['removePropagateFrom'])),
                id: 'IF'
            });
            if ($tmp225) {
                var $tmp229, $tmp230, $tmp231;
                $Γ['global']['$tmp17']['removePropagateFrom']['$tmp231'] = $Γ['global']['$tmp17']['removePropagateFrom']['$tmp230'] = $Γ['global']['$tmp17']['removePropagateFrom']['$tmp229'] = 0;
                $tmp229 = next.recalculate();
                $tmp231 = next.output();
                $tmp230 = todo.add($tmp231);
            } else {
                $upgrade([
                    'next.recalculate',
                    '$tmp229',
                    'next.output',
                    '$tmp231',
                    'todo.add',
                    '$tmp230'
                ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp17']['removePropagateFrom']);
            }
            $Λ.pop();
            $tmp218 = i++;
            $Γ['global']['$tmp17']['removePropagateFrom']['$tmp218'] = sec_lvl('i', null, false, $Γ['global']['$tmp17']['removePropagateFrom']);
            $Γ['global']['$tmp17']['removePropagateFrom']['$tmp218'] instanceof Object ? $Γ['global']['$tmp17']['removePropagateFrom']['$tmp218'].Σ = $lub($Γ['global']['$tmp17']['removePropagateFrom']['$tmp218'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['removePropagateFrom']['$tmp218'] = $lub($Γ['global']['$tmp17']['removePropagateFrom']['$tmp218'], $Λ[$Λ.length - 1].l);
            $tmp217 = v.constraints;
            $Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'] = sec_lvl('v', 'constraints', false, $Γ['global']['$tmp17']['removePropagateFrom']);
            $Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'] instanceof Object ? $Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'].Σ = $lub($Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'] = $lub($Γ['global']['$tmp17']['removePropagateFrom']['$tmp217'], $Λ[$Λ.length - 1].l);
            $tmp228 = $tmp217.size();
            $tmp219 = i < $tmp228;
            $Γ['global']['$tmp17']['removePropagateFrom']['$tmp219'] = $lub(sec_lvl('i', null, true, $Γ['global']['$tmp17']['removePropagateFrom']), sec_lvl('$tmp228', null, true, $Γ['global']['$tmp17']['removePropagateFrom']));
            $Γ['global']['$tmp17']['removePropagateFrom']['$tmp219'] instanceof Object ? $Γ['global']['$tmp17']['removePropagateFrom']['$tmp219'].Σ = $lub($Γ['global']['$tmp17']['removePropagateFrom']['$tmp219'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['removePropagateFrom']['$tmp219'] = $lub($Γ['global']['$tmp17']['removePropagateFrom']['$tmp219'], $Λ[$Λ.length - 1].l);
        }
        $upgrade([
            '$tmp217.at',
            'next',
            'next.isSatisfied',
            '$tmp227',
            'next.recalculate',
            '$tmp229',
            'next.output',
            '$tmp231',
            'todo.add',
            '$tmp230',
            '$tmp217.size',
            '$tmp228'
        ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp17']['removePropagateFrom']);
        $Λ.pop();
        $tmp221 = todo.size();
        $tmp212 = $tmp221 > 0;
        $Γ['global']['$tmp17']['removePropagateFrom']['$tmp212'] = $lub(sec_lvl('$tmp221', null, true, $Γ['global']['$tmp17']['removePropagateFrom']), $Λ[$Λ.length - 1].l);
        $Γ['global']['$tmp17']['removePropagateFrom']['$tmp212'] instanceof Object ? $Γ['global']['$tmp17']['removePropagateFrom']['$tmp212'].Σ = $lub($Γ['global']['$tmp17']['removePropagateFrom']['$tmp212'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['removePropagateFrom']['$tmp212'] = $lub($Γ['global']['$tmp17']['removePropagateFrom']['$tmp212'], $Λ[$Λ.length - 1].l);
    }
    $upgrade([
        'todo.removeFirst',
        'v',
        '$tmp217.size',
        '$tmp216',
        '$tmp217.at',
        'c',
        'c.isSatisfied',
        '$tmp223',
        'unsatisfied.add',
        '$tmp350',
        '$tmp224',
        '$tmp220',
        'next',
        'next.isSatisfied',
        '$tmp227',
        'next.recalculate',
        '$tmp229',
        'next.output',
        '$tmp231',
        'todo.add',
        '$tmp230',
        '$tmp228',
        'todo.size',
        '$tmp221'
    ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp17']['removePropagateFrom']);
    $Λ.pop();
    return unsatisfied;
};
$Γ['global']['$tmp17']['removePropagateFrom'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    out: $Λ[$Λ.length - 1].l
};
$tmp17 = Planner.prototype;
$Γ['global']['$tmp17'] = sec_lvl('Planner', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp17'] instanceof Object ? $Γ['global']['$tmp17'].Σ = $lub($Γ['global']['$tmp17'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17'] = $lub($Γ['global']['$tmp17'], $Λ[$Λ.length - 1].l);
$tmp17.addConstraintsConsumingTo = function (v, coll) {
    var determining, cc, i, $tmp233, $tmp234;
    $Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp234'] = $Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp233'] = $Γ['global']['$tmp17']['addConstraintsConsumingTo']['i'] = $Γ['global']['$tmp17']['addConstraintsConsumingTo']['cc'] = $Γ['global']['$tmp17']['addConstraintsConsumingTo']['determining'] = 0;
    determining = v.determinedBy;
    $scope($Γ['global']['$tmp17']['addConstraintsConsumingTo'], 'determining', true)['determining'] = sec_lvl('v', 'determinedBy', false, $Γ['global']['$tmp17']['addConstraintsConsumingTo']);
    $scope($Γ['global']['$tmp17']['addConstraintsConsumingTo'], 'determining', true)['determining'] instanceof Object ? $scope($Γ['global']['$tmp17']['addConstraintsConsumingTo'], 'determining', true)['determining'].Σ = $lub($scope($Γ['global']['$tmp17']['addConstraintsConsumingTo'], 'determining', true)['determining'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp17']['addConstraintsConsumingTo'], 'determining', true)['determining'] = $lub($scope($Γ['global']['$tmp17']['addConstraintsConsumingTo'], 'determining', true)['determining'], $Λ[$Λ.length - 1].l);
    cc = v.constraints;
    $scope($Γ['global']['$tmp17']['addConstraintsConsumingTo'], 'cc', true)['cc'] = sec_lvl('v', 'constraints', false, $Γ['global']['$tmp17']['addConstraintsConsumingTo']);
    $scope($Γ['global']['$tmp17']['addConstraintsConsumingTo'], 'cc', true)['cc'] instanceof Object ? $scope($Γ['global']['$tmp17']['addConstraintsConsumingTo'], 'cc', true)['cc'].Σ = $lub($scope($Γ['global']['$tmp17']['addConstraintsConsumingTo'], 'cc', true)['cc'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp17']['addConstraintsConsumingTo'], 'cc', true)['cc'] = $lub($scope($Γ['global']['$tmp17']['addConstraintsConsumingTo'], 'cc', true)['cc'], $Λ[$Λ.length - 1].l);
    i = 0;
    $scope($Γ['global']['$tmp17']['addConstraintsConsumingTo'], 'i', true)['i'] = $Λ[$Λ.length - 1].l;
    $tmp234 = cc.size();
    $tmp233 = i < $tmp234;
    $Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp233'] = $lub(sec_lvl('i', null, true, $Γ['global']['$tmp17']['addConstraintsConsumingTo']), sec_lvl('$tmp234', null, true, $Γ['global']['$tmp17']['addConstraintsConsumingTo']));
    $Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp233'] instanceof Object ? $Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp233'].Σ = $lub($Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp233'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp233'] = $lub($Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp233'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp233', null, true, $Γ['global']['$tmp17']['addConstraintsConsumingTo'])),
        id: 'LOOP'
    });
    for (; $tmp233;) {
        var c, $tmp235, $tmp236, $tmp237, $tmp232, $tmp233, $tmp238;
        $Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp238'] = $Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp233'] = $Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp232'] = $Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp237'] = $Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp236'] = $Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp235'] = $Γ['global']['$tmp17']['addConstraintsConsumingTo']['c'] = 0;
        c = cc.at(i);
        $tmp236 = c != determining;
        $Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp236'] = $lub(sec_lvl('c', null, true, $Γ['global']['$tmp17']['addConstraintsConsumingTo']), sec_lvl('determining', null, true, $Γ['global']['$tmp17']['addConstraintsConsumingTo']));
        $Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp236'] instanceof Object ? $Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp236'].Σ = $lub($Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp236'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp236'] = $lub($Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp236'], $Λ[$Λ.length - 1].l);
        $tmp237 = c.isSatisfied();
        $tmp235 = $tmp236 && $tmp237;
        $Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp235'] = $lub(sec_lvl('$tmp236', null, true, $Γ['global']['$tmp17']['addConstraintsConsumingTo']), sec_lvl('$tmp237', null, true, $Γ['global']['$tmp17']['addConstraintsConsumingTo']));
        $Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp235'] instanceof Object ? $Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp235'].Σ = $lub($Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp235'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp235'] = $lub($Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp235'], $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp235', null, true, $Γ['global']['$tmp17']['addConstraintsConsumingTo'])),
            id: 'IF'
        });
        if ($tmp235) {
            var $tmp351;
            $Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp351'] = 0;
            $tmp351 = coll.add(c);
        } else {
            $upgrade([
                'coll.add',
                '$tmp351'
            ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp17']['addConstraintsConsumingTo']);
        }
        $Λ.pop();
        $tmp232 = i++;
        $Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp232'] = sec_lvl('i', null, false, $Γ['global']['$tmp17']['addConstraintsConsumingTo']);
        $Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp232'] instanceof Object ? $Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp232'].Σ = $lub($Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp232'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp232'] = $lub($Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp232'], $Λ[$Λ.length - 1].l);
        $tmp238 = cc.size();
        $tmp233 = i < $tmp238;
        $Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp233'] = $lub(sec_lvl('i', null, true, $Γ['global']['$tmp17']['addConstraintsConsumingTo']), sec_lvl('$tmp238', null, true, $Γ['global']['$tmp17']['addConstraintsConsumingTo']));
        $Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp233'] instanceof Object ? $Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp233'].Σ = $lub($Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp233'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp233'] = $lub($Γ['global']['$tmp17']['addConstraintsConsumingTo']['$tmp233'], $Λ[$Λ.length - 1].l);
    }
    $upgrade([
        'cc.at',
        'c',
        'c.isSatisfied',
        '$tmp237',
        'coll.add',
        '$tmp351',
        'cc.size',
        '$tmp238'
    ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp17']['addConstraintsConsumingTo']);
    $Λ.pop();
    return;
};
$Γ['global']['$tmp17']['addConstraintsConsumingTo'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    v: $Λ[$Λ.length - 1].l,
    coll: $Λ[$Λ.length - 1].l
};
function Plan() {
    $rf = $scope($Γ['global']['Plan'], 'OrderedCollection', false)['OrderedCollection'];
    $rf.scope = $Γ['global']['Plan'];
    $rf.$this = {
        Σ: $Λ[$Λ.length - 1].l,
        __$proto__: $rf.prototype
    };
    $rf.InvokedAsContr = true;
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    this.v = new OrderedCollection();
    $Γ['global']['Plan']['$this']['v'] = $Λ.pop().l;
    $Γ['global']['Plan']['$this']['v'] instanceof Object ? $Γ['global']['Plan']['$this']['v'].Σ = $lub($Γ['global']['Plan']['$this']['v'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['Plan']['$this']['v'] = $lub($Γ['global']['Plan']['$this']['v'], $Λ[$Λ.length - 1].l);
    return;
}
$tmp18 = Plan.prototype;
$Γ['global']['$tmp18'] = sec_lvl('Plan', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp18'] instanceof Object ? $Γ['global']['$tmp18'].Σ = $lub($Γ['global']['$tmp18'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp18'] = $lub($Γ['global']['$tmp18'], $Λ[$Λ.length - 1].l);
$tmp18.addConstraint = function (c) {
    var $tmp239, $tmp240;
    $Γ['global']['$tmp18']['addConstraint']['$tmp240'] = $Γ['global']['$tmp18']['addConstraint']['$tmp239'] = 0;
    $tmp240 = this.v;
    $Γ['global']['$tmp18']['addConstraint']['$tmp240'] = sec_lvl('$tmp18', 'v', false, $Γ['global']['$tmp18']['addConstraint']);
    $Γ['global']['$tmp18']['addConstraint']['$tmp240'] instanceof Object ? $Γ['global']['$tmp18']['addConstraint']['$tmp240'].Σ = $lub($Γ['global']['$tmp18']['addConstraint']['$tmp240'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp18']['addConstraint']['$tmp240'] = $lub($Γ['global']['$tmp18']['addConstraint']['$tmp240'], $Λ[$Λ.length - 1].l);
    $tmp239 = $tmp240.add(c);
    return;
};
$Γ['global']['$tmp18']['addConstraint'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    c: $Λ[$Λ.length - 1].l
};
$tmp18 = Plan.prototype;
$Γ['global']['$tmp18'] = sec_lvl('Plan', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp18'] instanceof Object ? $Γ['global']['$tmp18'].Σ = $lub($Γ['global']['$tmp18'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp18'] = $lub($Γ['global']['$tmp18'], $Λ[$Λ.length - 1].l);
$tmp18.size = function () {
    var $tmp241, $tmp240;
    $Γ['global']['$tmp18']['size']['$tmp240'] = $Γ['global']['$tmp18']['size']['$tmp241'] = 0;
    $tmp240 = this.v;
    $Γ['global']['$tmp18']['size']['$tmp240'] = sec_lvl('$tmp18', 'v', false, $Γ['global']['$tmp18']['size']);
    $Γ['global']['$tmp18']['size']['$tmp240'] instanceof Object ? $Γ['global']['$tmp18']['size']['$tmp240'].Σ = $lub($Γ['global']['$tmp18']['size']['$tmp240'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp18']['size']['$tmp240'] = $lub($Γ['global']['$tmp18']['size']['$tmp240'], $Λ[$Λ.length - 1].l);
    $tmp241 = $tmp240.size();
    return $tmp241;
};
$Γ['global']['$tmp18']['size'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$tmp18 = Plan.prototype;
$Γ['global']['$tmp18'] = sec_lvl('Plan', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp18'] instanceof Object ? $Γ['global']['$tmp18'].Σ = $lub($Γ['global']['$tmp18'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp18'] = $lub($Γ['global']['$tmp18'], $Λ[$Λ.length - 1].l);
$tmp18.constraintAt = function (index) {
    var $tmp242, $tmp240;
    $Γ['global']['$tmp18']['constraintAt']['$tmp240'] = $Γ['global']['$tmp18']['constraintAt']['$tmp242'] = 0;
    $tmp240 = this.v;
    $Γ['global']['$tmp18']['constraintAt']['$tmp240'] = sec_lvl('$tmp18', 'v', false, $Γ['global']['$tmp18']['constraintAt']);
    $Γ['global']['$tmp18']['constraintAt']['$tmp240'] instanceof Object ? $Γ['global']['$tmp18']['constraintAt']['$tmp240'].Σ = $lub($Γ['global']['$tmp18']['constraintAt']['$tmp240'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp18']['constraintAt']['$tmp240'] = $lub($Γ['global']['$tmp18']['constraintAt']['$tmp240'], $Λ[$Λ.length - 1].l);
    $tmp242 = $tmp240.at(index);
    return $tmp242;
};
$Γ['global']['$tmp18']['constraintAt'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    index: $Λ[$Λ.length - 1].l
};
$tmp18 = Plan.prototype;
$Γ['global']['$tmp18'] = sec_lvl('Plan', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp18'] instanceof Object ? $Γ['global']['$tmp18'].Σ = $lub($Γ['global']['$tmp18'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp18'] = $lub($Γ['global']['$tmp18'], $Λ[$Λ.length - 1].l);
$tmp18.execute = function () {
    var i, $tmp244, $tmp245;
    $Γ['global']['$tmp18']['execute']['$tmp245'] = $Γ['global']['$tmp18']['execute']['$tmp244'] = $Γ['global']['$tmp18']['execute']['i'] = 0;
    i = 0;
    $scope($Γ['global']['$tmp18']['execute'], 'i', true)['i'] = $Λ[$Λ.length - 1].l;
    $rf = $prop('$tmp18', 'size', $Γ['global']['$tmp18']['execute']);
    $rf.scope = $Γ['global']['$tmp18']['execute'];
    $rf.$this = $Γ['global']['$tmp18']['execute']['$this'];
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp245 = this.size();
    $Γ['global']['$tmp18']['execute']['$tmp245'] = $Λ.pop().l;
    $Γ['global']['$tmp18']['execute']['$tmp245'] instanceof Object ? $Γ['global']['$tmp18']['execute']['$tmp245'].Σ = $lub($Γ['global']['$tmp18']['execute']['$tmp245'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp18']['execute']['$tmp245'] = $lub($Γ['global']['$tmp18']['execute']['$tmp245'], $Λ[$Λ.length - 1].l);
    $tmp244 = i < $tmp245;
    $Γ['global']['$tmp18']['execute']['$tmp244'] = $lub(sec_lvl('i', null, true, $Γ['global']['$tmp18']['execute']), sec_lvl('$tmp245', null, true, $Γ['global']['$tmp18']['execute']));
    $Γ['global']['$tmp18']['execute']['$tmp244'] instanceof Object ? $Γ['global']['$tmp18']['execute']['$tmp244'].Σ = $lub($Γ['global']['$tmp18']['execute']['$tmp244'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp18']['execute']['$tmp244'] = $lub($Γ['global']['$tmp18']['execute']['$tmp244'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp244', null, true, $Γ['global']['$tmp18']['execute'])),
        id: 'LOOP'
    });
    for (; $tmp244;) {
        var c, $tmp246, $tmp243, $tmp244, $tmp247;
        $Γ['global']['$tmp18']['execute']['$tmp247'] = $Γ['global']['$tmp18']['execute']['$tmp244'] = $Γ['global']['$tmp18']['execute']['$tmp243'] = $Γ['global']['$tmp18']['execute']['$tmp246'] = $Γ['global']['$tmp18']['execute']['c'] = 0;
        $rf = $prop('$tmp18', 'constraintAt', $Γ['global']['$tmp18']['execute']);
        $rf.scope = $Γ['global']['$tmp18']['execute'];
        $rf.$this = $Γ['global']['$tmp18']['execute']['$this'];
        $rf['index'] = $lub(sec_lvl('i', null, true, $Γ['global']['$tmp18']['execute']), $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
            id: 'FUNC'
        });
        c = this.constraintAt(i);
        $scope($Γ['global']['$tmp18']['execute'], 'c', true)['c'] = $Λ.pop().l;
        $scope($Γ['global']['$tmp18']['execute'], 'c', true)['c'] instanceof Object ? $scope($Γ['global']['$tmp18']['execute'], 'c', true)['c'].Σ = $lub($scope($Γ['global']['$tmp18']['execute'], 'c', true)['c'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp18']['execute'], 'c', true)['c'] = $lub($scope($Γ['global']['$tmp18']['execute'], 'c', true)['c'], $Λ[$Λ.length - 1].l);
        $tmp246 = c.execute();
        $tmp243 = i++;
        $Γ['global']['$tmp18']['execute']['$tmp243'] = sec_lvl('i', null, false, $Γ['global']['$tmp18']['execute']);
        $Γ['global']['$tmp18']['execute']['$tmp243'] instanceof Object ? $Γ['global']['$tmp18']['execute']['$tmp243'].Σ = $lub($Γ['global']['$tmp18']['execute']['$tmp243'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp18']['execute']['$tmp243'] = $lub($Γ['global']['$tmp18']['execute']['$tmp243'], $Λ[$Λ.length - 1].l);
        $rf = $prop('$tmp18', 'size', $Γ['global']['$tmp18']['execute']);
        $rf.scope = $Γ['global']['$tmp18']['execute'];
        $rf.$this = $Γ['global']['$tmp18']['execute']['$this'];
        $Λ.push({
            l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
            id: 'FUNC'
        });
        $tmp247 = this.size();
        $Γ['global']['$tmp18']['execute']['$tmp247'] = $Λ.pop().l;
        $Γ['global']['$tmp18']['execute']['$tmp247'] instanceof Object ? $Γ['global']['$tmp18']['execute']['$tmp247'].Σ = $lub($Γ['global']['$tmp18']['execute']['$tmp247'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp18']['execute']['$tmp247'] = $lub($Γ['global']['$tmp18']['execute']['$tmp247'], $Λ[$Λ.length - 1].l);
        $tmp244 = i < $tmp247;
        $Γ['global']['$tmp18']['execute']['$tmp244'] = $lub(sec_lvl('i', null, true, $Γ['global']['$tmp18']['execute']), sec_lvl('$tmp247', null, true, $Γ['global']['$tmp18']['execute']));
        $Γ['global']['$tmp18']['execute']['$tmp244'] instanceof Object ? $Γ['global']['$tmp18']['execute']['$tmp244'].Σ = $lub($Γ['global']['$tmp18']['execute']['$tmp244'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp18']['execute']['$tmp244'] = $lub($Γ['global']['$tmp18']['execute']['$tmp244'], $Λ[$Λ.length - 1].l);
    }
    $upgrade([
        'c',
        'c.execute',
        '$tmp246',
        '$tmp247'
    ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp18']['execute']);
    $Λ.pop();
    return;
};
$Γ['global']['$tmp18']['execute'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
function chainTest(n) {
    $rf = $scope($Γ['global']['chainTest'], 'Planner', false)['Planner'];
    $rf.scope = $Γ['global']['chainTest'];
    $rf.$this = {
        Σ: $Λ[$Λ.length - 1].l,
        __$proto__: $rf.prototype
    };
    $rf.InvokedAsContr = true;
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    planner = new Planner();
    $scope($Γ['global']['chainTest'], 'planner', true)['planner'] = $Λ.pop().l;
    $scope($Γ['global']['chainTest'], 'planner', true)['planner'] instanceof Object ? $scope($Γ['global']['chainTest'], 'planner', true)['planner'].Σ = $lub($scope($Γ['global']['chainTest'], 'planner', true)['planner'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['chainTest'], 'planner', true)['planner'] = $lub($scope($Γ['global']['chainTest'], 'planner', true)['planner'], $Λ[$Λ.length - 1].l);
    var prev, first, last, i, $tmp249, $tmp250, $tmp251, edit, $tmp252, edits, $tmp253, plan, $tmp255;
    $Γ['global']['chainTest']['$tmp255'] = $Γ['global']['chainTest']['plan'] = $Γ['global']['chainTest']['$tmp253'] = $Γ['global']['chainTest']['edits'] = $Γ['global']['chainTest']['$tmp252'] = $Γ['global']['chainTest']['edit'] = $Γ['global']['chainTest']['$tmp251'] = $Γ['global']['chainTest']['$tmp250'] = $Γ['global']['chainTest']['$tmp249'] = $Γ['global']['chainTest']['i'] = $Γ['global']['chainTest']['last'] = $Γ['global']['chainTest']['first'] = $Γ['global']['chainTest']['prev'] = 0;
    prev = null;
    $scope($Γ['global']['chainTest'], 'prev', true)['prev'] = $Λ[$Λ.length - 1].l;
    first = null;
    $scope($Γ['global']['chainTest'], 'first', true)['first'] = $Λ[$Λ.length - 1].l;
    last = null;
    $scope($Γ['global']['chainTest'], 'last', true)['last'] = $Λ[$Λ.length - 1].l;
    i = 0;
    $scope($Γ['global']['chainTest'], 'i', true)['i'] = $Λ[$Λ.length - 1].l;
    $tmp249 = i <= n;
    $Γ['global']['chainTest']['$tmp249'] = $lub(sec_lvl('i', null, true, $Γ['global']['chainTest']), sec_lvl('n', null, true, $Γ['global']['chainTest']));
    $Γ['global']['chainTest']['$tmp249'] instanceof Object ? $Γ['global']['chainTest']['$tmp249'].Σ = $lub($Γ['global']['chainTest']['$tmp249'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['chainTest']['$tmp249'] = $lub($Γ['global']['chainTest']['$tmp249'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp249', null, true, $Γ['global']['chainTest'])),
        id: 'LOOP'
    });
    for (; $tmp249;) {
        var name, v, $tmp256, $tmp257, $tmp258, $tmp248, $tmp249;
        $Γ['global']['chainTest']['$tmp249'] = $Γ['global']['chainTest']['$tmp248'] = $Γ['global']['chainTest']['$tmp258'] = $Γ['global']['chainTest']['$tmp257'] = $Γ['global']['chainTest']['$tmp256'] = $Γ['global']['chainTest']['v'] = $Γ['global']['chainTest']['name'] = 0;
        name = 'v' + i;
        $scope($Γ['global']['chainTest'], 'name', true)['name'] = $lub($Λ[$Λ.length - 1].l, sec_lvl('i', null, true, $Γ['global']['chainTest']));
        $scope($Γ['global']['chainTest'], 'name', true)['name'] instanceof Object ? $scope($Γ['global']['chainTest'], 'name', true)['name'].Σ = $lub($scope($Γ['global']['chainTest'], 'name', true)['name'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['chainTest'], 'name', true)['name'] = $lub($scope($Γ['global']['chainTest'], 'name', true)['name'], $Λ[$Λ.length - 1].l);
        $rf = $scope($Γ['global']['chainTest'], 'Variable', false)['Variable'];
        $rf.scope = $Γ['global']['chainTest'];
        $rf.$this = {
            Σ: $Λ[$Λ.length - 1].l,
            __$proto__: $rf.prototype
        };
        $rf['name'] = $lub(sec_lvl('name', null, true, $Γ['global']['chainTest']), $Λ[$Λ.length - 1].l);
        $rf['initialValue'] = $Λ[$Λ.length - 1].l;
        $rf.InvokedAsContr = true;
        $Λ.push({
            l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
            id: 'FUNC'
        });
        v = new Variable(name);
        $scope($Γ['global']['chainTest'], 'v', true)['v'] = $Λ.pop().l;
        $scope($Γ['global']['chainTest'], 'v', true)['v'] instanceof Object ? $scope($Γ['global']['chainTest'], 'v', true)['v'].Σ = $lub($scope($Γ['global']['chainTest'], 'v', true)['v'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['chainTest'], 'v', true)['v'] = $lub($scope($Γ['global']['chainTest'], 'v', true)['v'], $Λ[$Λ.length - 1].l);
        $tmp256 = prev != null;
        $Γ['global']['chainTest']['$tmp256'] = $lub(sec_lvl('prev', null, true, $Γ['global']['chainTest']), $Λ[$Λ.length - 1].l);
        $Γ['global']['chainTest']['$tmp256'] instanceof Object ? $Γ['global']['chainTest']['$tmp256'].Σ = $lub($Γ['global']['chainTest']['$tmp256'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['chainTest']['$tmp256'] = $lub($Γ['global']['chainTest']['$tmp256'], $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp256', null, true, $Γ['global']['chainTest'])),
            id: 'IF'
        });
        if ($tmp256) {
            var $tmp352, $tmp353;
            $Γ['global']['chainTest']['$tmp353'] = $Γ['global']['chainTest']['$tmp352'] = 0;
            $tmp353 = Strength.REQUIRED;
            $Γ['global']['chainTest']['$tmp353'] = sec_lvl('Strength', 'REQUIRED', false, $Γ['global']['chainTest']);
            $Γ['global']['chainTest']['$tmp353'] instanceof Object ? $Γ['global']['chainTest']['$tmp353'].Σ = $lub($Γ['global']['chainTest']['$tmp353'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['chainTest']['$tmp353'] = $lub($Γ['global']['chainTest']['$tmp353'], $Λ[$Λ.length - 1].l);
            $rf = $scope($Γ['global']['chainTest'], 'EqualityConstraint', false)['EqualityConstraint'];
            $rf.scope = $Γ['global']['chainTest'];
            $rf.$this = {
                Σ: $Λ[$Λ.length - 1].l,
                __$proto__: $rf.prototype
            };
            $rf['var1'] = $lub(sec_lvl('prev', null, true, $Γ['global']['chainTest']), $Λ[$Λ.length - 1].l);
            $rf['var2'] = $lub(sec_lvl('v', null, true, $Γ['global']['chainTest']), $Λ[$Λ.length - 1].l);
            $rf['strength'] = $lub(sec_lvl('$tmp353', null, true, $Γ['global']['chainTest']), $Λ[$Λ.length - 1].l);
            $rf.InvokedAsContr = true;
            $Λ.push({
                l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
                id: 'FUNC'
            });
            $tmp352 = new EqualityConstraint(prev, v, $tmp353);
            $Γ['global']['chainTest']['$tmp352'] = $Λ.pop().l;
            $Γ['global']['chainTest']['$tmp352'] instanceof Object ? $Γ['global']['chainTest']['$tmp352'].Σ = $lub($Γ['global']['chainTest']['$tmp352'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['chainTest']['$tmp352'] = $lub($Γ['global']['chainTest']['$tmp352'], $Λ[$Λ.length - 1].l);
        } else {
            $upgrade(['$tmp352'], $Λ[$Λ.length - 1].l, $Γ['global']['chainTest']);
        }
        $Λ.pop();
        $tmp257 = i == 0;
        $Γ['global']['chainTest']['$tmp257'] = $lub(sec_lvl('i', null, true, $Γ['global']['chainTest']), $Λ[$Λ.length - 1].l);
        $Γ['global']['chainTest']['$tmp257'] instanceof Object ? $Γ['global']['chainTest']['$tmp257'].Σ = $lub($Γ['global']['chainTest']['$tmp257'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['chainTest']['$tmp257'] = $lub($Γ['global']['chainTest']['$tmp257'], $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp257', null, true, $Γ['global']['chainTest'])),
            id: 'IF'
        });
        if ($tmp257) {
            first = v;
            $scope($Γ['global']['chainTest'], 'first', true)['first'] = sec_lvl('v', null, false, $Γ['global']['chainTest']);
            $scope($Γ['global']['chainTest'], 'first', true)['first'] instanceof Object ? $scope($Γ['global']['chainTest'], 'first', true)['first'].Σ = $lub($scope($Γ['global']['chainTest'], 'first', true)['first'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['chainTest'], 'first', true)['first'] = $lub($scope($Γ['global']['chainTest'], 'first', true)['first'], $Λ[$Λ.length - 1].l);
        } else {
        }
        $Λ.pop();
        $tmp258 = i == n;
        $Γ['global']['chainTest']['$tmp258'] = $lub(sec_lvl('i', null, true, $Γ['global']['chainTest']), sec_lvl('n', null, true, $Γ['global']['chainTest']));
        $Γ['global']['chainTest']['$tmp258'] instanceof Object ? $Γ['global']['chainTest']['$tmp258'].Σ = $lub($Γ['global']['chainTest']['$tmp258'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['chainTest']['$tmp258'] = $lub($Γ['global']['chainTest']['$tmp258'], $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp258', null, true, $Γ['global']['chainTest'])),
            id: 'IF'
        });
        if ($tmp258) {
            last = v;
            $scope($Γ['global']['chainTest'], 'last', true)['last'] = sec_lvl('v', null, false, $Γ['global']['chainTest']);
            $scope($Γ['global']['chainTest'], 'last', true)['last'] instanceof Object ? $scope($Γ['global']['chainTest'], 'last', true)['last'].Σ = $lub($scope($Γ['global']['chainTest'], 'last', true)['last'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['chainTest'], 'last', true)['last'] = $lub($scope($Γ['global']['chainTest'], 'last', true)['last'], $Λ[$Λ.length - 1].l);
        } else {
        }
        $Λ.pop();
        prev = v;
        $scope($Γ['global']['chainTest'], 'prev', true)['prev'] = sec_lvl('v', null, false, $Γ['global']['chainTest']);
        $scope($Γ['global']['chainTest'], 'prev', true)['prev'] instanceof Object ? $scope($Γ['global']['chainTest'], 'prev', true)['prev'].Σ = $lub($scope($Γ['global']['chainTest'], 'prev', true)['prev'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['chainTest'], 'prev', true)['prev'] = $lub($scope($Γ['global']['chainTest'], 'prev', true)['prev'], $Λ[$Λ.length - 1].l);
        $tmp248 = i++;
        $Γ['global']['chainTest']['$tmp248'] = sec_lvl('i', null, false, $Γ['global']['chainTest']);
        $Γ['global']['chainTest']['$tmp248'] instanceof Object ? $Γ['global']['chainTest']['$tmp248'].Σ = $lub($Γ['global']['chainTest']['$tmp248'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['chainTest']['$tmp248'] = $lub($Γ['global']['chainTest']['$tmp248'], $Λ[$Λ.length - 1].l);
        $tmp249 = i <= n;
        $Γ['global']['chainTest']['$tmp249'] = $lub(sec_lvl('i', null, true, $Γ['global']['chainTest']), sec_lvl('n', null, true, $Γ['global']['chainTest']));
        $Γ['global']['chainTest']['$tmp249'] instanceof Object ? $Γ['global']['chainTest']['$tmp249'].Σ = $lub($Γ['global']['chainTest']['$tmp249'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['chainTest']['$tmp249'] = $lub($Γ['global']['chainTest']['$tmp249'], $Λ[$Λ.length - 1].l);
    }
    $upgrade([
        'v',
        '$tmp352'
    ], $Λ[$Λ.length - 1].l, $Γ['global']['chainTest']);
    $Λ.pop();
    $tmp251 = Strength.STRONG_DEFAULT;
    $Γ['global']['chainTest']['$tmp251'] = sec_lvl('Strength', 'STRONG_DEFAULT', false, $Γ['global']['chainTest']);
    $Γ['global']['chainTest']['$tmp251'] instanceof Object ? $Γ['global']['chainTest']['$tmp251'].Σ = $lub($Γ['global']['chainTest']['$tmp251'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['chainTest']['$tmp251'] = $lub($Γ['global']['chainTest']['$tmp251'], $Λ[$Λ.length - 1].l);
    $rf = $scope($Γ['global']['chainTest'], 'StayConstraint', false)['StayConstraint'];
    $rf.scope = $Γ['global']['chainTest'];
    $rf.$this = {
        Σ: $Λ[$Λ.length - 1].l,
        __$proto__: $rf.prototype
    };
    $rf['v'] = $lub(sec_lvl('last', null, true, $Γ['global']['chainTest']), $Λ[$Λ.length - 1].l);
    $rf['str'] = $lub(sec_lvl('$tmp251', null, true, $Γ['global']['chainTest']), $Λ[$Λ.length - 1].l);
    $rf.InvokedAsContr = true;
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp250 = new StayConstraint(last, $tmp251);
    $Γ['global']['chainTest']['$tmp250'] = $Λ.pop().l;
    $Γ['global']['chainTest']['$tmp250'] instanceof Object ? $Γ['global']['chainTest']['$tmp250'].Σ = $lub($Γ['global']['chainTest']['$tmp250'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['chainTest']['$tmp250'] = $lub($Γ['global']['chainTest']['$tmp250'], $Λ[$Λ.length - 1].l);
    $tmp252 = Strength.PREFERRED;
    $Γ['global']['chainTest']['$tmp252'] = sec_lvl('Strength', 'PREFERRED', false, $Γ['global']['chainTest']);
    $Γ['global']['chainTest']['$tmp252'] instanceof Object ? $Γ['global']['chainTest']['$tmp252'].Σ = $lub($Γ['global']['chainTest']['$tmp252'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['chainTest']['$tmp252'] = $lub($Γ['global']['chainTest']['$tmp252'], $Λ[$Λ.length - 1].l);
    $rf = $scope($Γ['global']['chainTest'], 'EditConstraint', false)['EditConstraint'];
    $rf.scope = $Γ['global']['chainTest'];
    $rf.$this = {
        Σ: $Λ[$Λ.length - 1].l,
        __$proto__: $rf.prototype
    };
    $rf['v'] = $lub(sec_lvl('first', null, true, $Γ['global']['chainTest']), $Λ[$Λ.length - 1].l);
    $rf['str'] = $lub(sec_lvl('$tmp252', null, true, $Γ['global']['chainTest']), $Λ[$Λ.length - 1].l);
    $rf.InvokedAsContr = true;
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    edit = new EditConstraint(first, $tmp252);
    $scope($Γ['global']['chainTest'], 'edit', true)['edit'] = $Λ.pop().l;
    $scope($Γ['global']['chainTest'], 'edit', true)['edit'] instanceof Object ? $scope($Γ['global']['chainTest'], 'edit', true)['edit'].Σ = $lub($scope($Γ['global']['chainTest'], 'edit', true)['edit'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['chainTest'], 'edit', true)['edit'] = $lub($scope($Γ['global']['chainTest'], 'edit', true)['edit'], $Λ[$Λ.length - 1].l);
    $rf = $scope($Γ['global']['chainTest'], 'OrderedCollection', false)['OrderedCollection'];
    $rf.scope = $Γ['global']['chainTest'];
    $rf.$this = {
        Σ: $Λ[$Λ.length - 1].l,
        __$proto__: $rf.prototype
    };
    $rf.InvokedAsContr = true;
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    edits = new OrderedCollection();
    $scope($Γ['global']['chainTest'], 'edits', true)['edits'] = $Λ.pop().l;
    $scope($Γ['global']['chainTest'], 'edits', true)['edits'] instanceof Object ? $scope($Γ['global']['chainTest'], 'edits', true)['edits'].Σ = $lub($scope($Γ['global']['chainTest'], 'edits', true)['edits'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['chainTest'], 'edits', true)['edits'] = $lub($scope($Γ['global']['chainTest'], 'edits', true)['edits'], $Λ[$Λ.length - 1].l);
    $rf = $prop('edits', 'add', $Γ['global']['chainTest']);
    $rf.scope = $Γ['global']['chainTest'];
    $rf.$this = $scope($Γ['global']['chainTest'], 'edits', false)['edits'];
    $rf['elm'] = $lub(sec_lvl('edit', null, true, $Γ['global']['chainTest']), $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp253 = edits.add(edit);
    $Γ['global']['chainTest']['$tmp253'] = $Λ.pop().l;
    $Γ['global']['chainTest']['$tmp253'] instanceof Object ? $Γ['global']['chainTest']['$tmp253'].Σ = $lub($Γ['global']['chainTest']['$tmp253'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['chainTest']['$tmp253'] = $lub($Γ['global']['chainTest']['$tmp253'], $Λ[$Λ.length - 1].l);
    $rf = $prop('planner', 'extractPlanFromConstraints', $Γ['global']['chainTest']);
    $rf.scope = $Γ['global']['chainTest'];
    $rf.$this = $scope($Γ['global']['chainTest'], 'planner', false)['planner'];
    $rf['constraints'] = $lub(sec_lvl('edits', null, true, $Γ['global']['chainTest']), $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    plan = planner.extractPlanFromConstraints(edits);
    $scope($Γ['global']['chainTest'], 'plan', true)['plan'] = $Λ.pop().l;
    $scope($Γ['global']['chainTest'], 'plan', true)['plan'] instanceof Object ? $scope($Γ['global']['chainTest'], 'plan', true)['plan'].Σ = $lub($scope($Γ['global']['chainTest'], 'plan', true)['plan'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['chainTest'], 'plan', true)['plan'] = $lub($scope($Γ['global']['chainTest'], 'plan', true)['plan'], $Λ[$Λ.length - 1].l);
    i = 0;
    $scope($Γ['global']['chainTest'], 'i', true)['i'] = $Λ[$Λ.length - 1].l;
    $tmp255 = i < 100;
    $Γ['global']['chainTest']['$tmp255'] = $lub(sec_lvl('i', null, true, $Γ['global']['chainTest']), $Λ[$Λ.length - 1].l);
    $Γ['global']['chainTest']['$tmp255'] instanceof Object ? $Γ['global']['chainTest']['$tmp255'].Σ = $lub($Γ['global']['chainTest']['$tmp255'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['chainTest']['$tmp255'] = $lub($Γ['global']['chainTest']['$tmp255'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp255', null, true, $Γ['global']['chainTest'])),
        id: 'LOOP'
    });
    for (; $tmp255;) {
        first.value = i;
        $scope($Γ['global']['chainTest'], 'first', false)['value'] = sec_lvl('i', null, false, $Γ['global']['chainTest']);
        $scope($Γ['global']['chainTest'], 'first', false)['value'] instanceof Object ? $scope($Γ['global']['chainTest'], 'first', false)['value'].Σ = $lub($scope($Γ['global']['chainTest'], 'first', false)['value'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['chainTest'], 'first', false)['value'] = $lub($scope($Γ['global']['chainTest'], 'first', false)['value'], $Λ[$Λ.length - 1].l);
        var $tmp259, $tmp260, $tmp261, $tmp254, $tmp255;
        $Γ['global']['chainTest']['$tmp255'] = $Γ['global']['chainTest']['$tmp254'] = $Γ['global']['chainTest']['$tmp261'] = $Γ['global']['chainTest']['$tmp260'] = $Γ['global']['chainTest']['$tmp259'] = 0;
        $tmp259 = plan.execute();
        $tmp261 = last.value;
        $Γ['global']['chainTest']['$tmp261'] = sec_lvl('last', 'value', false, $Γ['global']['chainTest']);
        $Γ['global']['chainTest']['$tmp261'] instanceof Object ? $Γ['global']['chainTest']['$tmp261'].Σ = $lub($Γ['global']['chainTest']['$tmp261'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['chainTest']['$tmp261'] = $lub($Γ['global']['chainTest']['$tmp261'], $Λ[$Λ.length - 1].l);
        $tmp260 = $tmp261 != i;
        $Γ['global']['chainTest']['$tmp260'] = $lub(sec_lvl('$tmp261', null, true, $Γ['global']['chainTest']), sec_lvl('i', null, true, $Γ['global']['chainTest']));
        $Γ['global']['chainTest']['$tmp260'] instanceof Object ? $Γ['global']['chainTest']['$tmp260'].Σ = $lub($Γ['global']['chainTest']['$tmp260'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['chainTest']['$tmp260'] = $lub($Γ['global']['chainTest']['$tmp260'], $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp260', null, true, $Γ['global']['chainTest'])),
            id: 'IF'
        });
        if ($tmp260) {
            var $tmp354;
            $Γ['global']['chainTest']['$tmp354'] = 0;
            $tmp354 = alert('Chain test failed.');
        } else {
            $upgrade([
                'alert',
                '$tmp354'
            ], $Λ[$Λ.length - 1].l, $Γ['global']['chainTest']);
        }
        $Λ.pop();
        $tmp254 = i++;
        $Γ['global']['chainTest']['$tmp254'] = sec_lvl('i', null, false, $Γ['global']['chainTest']);
        $Γ['global']['chainTest']['$tmp254'] instanceof Object ? $Γ['global']['chainTest']['$tmp254'].Σ = $lub($Γ['global']['chainTest']['$tmp254'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['chainTest']['$tmp254'] = $lub($Γ['global']['chainTest']['$tmp254'], $Λ[$Λ.length - 1].l);
        $tmp255 = i < 100;
        $Γ['global']['chainTest']['$tmp255'] = $lub(sec_lvl('i', null, true, $Γ['global']['chainTest']), $Λ[$Λ.length - 1].l);
        $Γ['global']['chainTest']['$tmp255'] instanceof Object ? $Γ['global']['chainTest']['$tmp255'].Σ = $lub($Γ['global']['chainTest']['$tmp255'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['chainTest']['$tmp255'] = $lub($Γ['global']['chainTest']['$tmp255'], $Λ[$Λ.length - 1].l);
    }
    $upgrade([
        'plan.execute',
        '$tmp259',
        'alert',
        '$tmp354'
    ], $Λ[$Λ.length - 1].l, $Γ['global']['chainTest']);
    $Λ.pop();
    return;
}
function projectionTest(n) {
    $rf = $scope($Γ['global']['projectionTest'], 'Planner', false)['Planner'];
    $rf.scope = $Γ['global']['projectionTest'];
    $rf.$this = {
        Σ: $Λ[$Λ.length - 1].l,
        __$proto__: $rf.prototype
    };
    $rf.InvokedAsContr = true;
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    planner = new Planner();
    $scope($Γ['global']['projectionTest'], 'planner', true)['planner'] = $Λ.pop().l;
    $scope($Γ['global']['projectionTest'], 'planner', true)['planner'] instanceof Object ? $scope($Γ['global']['projectionTest'], 'planner', true)['planner'].Σ = $lub($scope($Γ['global']['projectionTest'], 'planner', true)['planner'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['projectionTest'], 'planner', true)['planner'] = $lub($scope($Γ['global']['projectionTest'], 'planner', true)['planner'], $Λ[$Λ.length - 1].l);
    var scale, offset, src, dst, dests, i, $tmp263, $tmp264, $tmp265, $tmp266, $tmp267, $tmp268, $tmp269, $tmp270, $tmp272, $tmp273, $tmp274, $tmp276, $tmp277;
    $Γ['global']['projectionTest']['$tmp277'] = $Γ['global']['projectionTest']['$tmp276'] = $Γ['global']['projectionTest']['$tmp274'] = $Γ['global']['projectionTest']['$tmp273'] = $Γ['global']['projectionTest']['$tmp272'] = $Γ['global']['projectionTest']['$tmp270'] = $Γ['global']['projectionTest']['$tmp269'] = $Γ['global']['projectionTest']['$tmp268'] = $Γ['global']['projectionTest']['$tmp267'] = $Γ['global']['projectionTest']['$tmp266'] = $Γ['global']['projectionTest']['$tmp265'] = $Γ['global']['projectionTest']['$tmp264'] = $Γ['global']['projectionTest']['$tmp263'] = $Γ['global']['projectionTest']['i'] = $Γ['global']['projectionTest']['dests'] = $Γ['global']['projectionTest']['dst'] = $Γ['global']['projectionTest']['src'] = $Γ['global']['projectionTest']['offset'] = $Γ['global']['projectionTest']['scale'] = 0;
    $rf = $scope($Γ['global']['projectionTest'], 'Variable', false)['Variable'];
    $rf.scope = $Γ['global']['projectionTest'];
    $rf.$this = {
        Σ: $Λ[$Λ.length - 1].l,
        __$proto__: $rf.prototype
    };
    $rf['name'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
    $rf['initialValue'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
    $rf.InvokedAsContr = true;
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    scale = new Variable('scale', 10);
    $scope($Γ['global']['projectionTest'], 'scale', true)['scale'] = $Λ.pop().l;
    $scope($Γ['global']['projectionTest'], 'scale', true)['scale'] instanceof Object ? $scope($Γ['global']['projectionTest'], 'scale', true)['scale'].Σ = $lub($scope($Γ['global']['projectionTest'], 'scale', true)['scale'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['projectionTest'], 'scale', true)['scale'] = $lub($scope($Γ['global']['projectionTest'], 'scale', true)['scale'], $Λ[$Λ.length - 1].l);
    $rf = $scope($Γ['global']['projectionTest'], 'Variable', false)['Variable'];
    $rf.scope = $Γ['global']['projectionTest'];
    $rf.$this = {
        Σ: $Λ[$Λ.length - 1].l,
        __$proto__: $rf.prototype
    };
    $rf['name'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
    $rf['initialValue'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
    $rf.InvokedAsContr = true;
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    offset = new Variable('offset', 1000);
    $scope($Γ['global']['projectionTest'], 'offset', true)['offset'] = $Λ.pop().l;
    $scope($Γ['global']['projectionTest'], 'offset', true)['offset'] instanceof Object ? $scope($Γ['global']['projectionTest'], 'offset', true)['offset'].Σ = $lub($scope($Γ['global']['projectionTest'], 'offset', true)['offset'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['projectionTest'], 'offset', true)['offset'] = $lub($scope($Γ['global']['projectionTest'], 'offset', true)['offset'], $Λ[$Λ.length - 1].l);
    src = null;
    $scope($Γ['global']['projectionTest'], 'src', true)['src'] = $Λ[$Λ.length - 1].l;
    dst = null;
    $scope($Γ['global']['projectionTest'], 'dst', true)['dst'] = $Λ[$Λ.length - 1].l;
    $rf = $scope($Γ['global']['projectionTest'], 'OrderedCollection', false)['OrderedCollection'];
    $rf.scope = $Γ['global']['projectionTest'];
    $rf.$this = {
        Σ: $Λ[$Λ.length - 1].l,
        __$proto__: $rf.prototype
    };
    $rf.InvokedAsContr = true;
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    dests = new OrderedCollection();
    $scope($Γ['global']['projectionTest'], 'dests', true)['dests'] = $Λ.pop().l;
    $scope($Γ['global']['projectionTest'], 'dests', true)['dests'] instanceof Object ? $scope($Γ['global']['projectionTest'], 'dests', true)['dests'].Σ = $lub($scope($Γ['global']['projectionTest'], 'dests', true)['dests'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['projectionTest'], 'dests', true)['dests'] = $lub($scope($Γ['global']['projectionTest'], 'dests', true)['dests'], $Λ[$Λ.length - 1].l);
    i = 0;
    $scope($Γ['global']['projectionTest'], 'i', true)['i'] = $Λ[$Λ.length - 1].l;
    $tmp263 = i < n;
    $Γ['global']['projectionTest']['$tmp263'] = $lub(sec_lvl('i', null, true, $Γ['global']['projectionTest']), sec_lvl('n', null, true, $Γ['global']['projectionTest']));
    $Γ['global']['projectionTest']['$tmp263'] instanceof Object ? $Γ['global']['projectionTest']['$tmp263'].Σ = $lub($Γ['global']['projectionTest']['$tmp263'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['projectionTest']['$tmp263'] = $lub($Γ['global']['projectionTest']['$tmp263'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp263', null, true, $Γ['global']['projectionTest'])),
        id: 'LOOP'
    });
    for (; $tmp263;) {
        var $tmp278, $tmp279, $tmp280, $tmp281, $tmp282, $tmp283, $tmp284, $tmp262, $tmp263;
        $Γ['global']['projectionTest']['$tmp263'] = $Γ['global']['projectionTest']['$tmp262'] = $Γ['global']['projectionTest']['$tmp284'] = $Γ['global']['projectionTest']['$tmp283'] = $Γ['global']['projectionTest']['$tmp282'] = $Γ['global']['projectionTest']['$tmp281'] = $Γ['global']['projectionTest']['$tmp280'] = $Γ['global']['projectionTest']['$tmp279'] = $Γ['global']['projectionTest']['$tmp278'] = 0;
        $tmp278 = 'src' + i;
        $Γ['global']['projectionTest']['$tmp278'] = $lub($Λ[$Λ.length - 1].l, sec_lvl('i', null, true, $Γ['global']['projectionTest']));
        $Γ['global']['projectionTest']['$tmp278'] instanceof Object ? $Γ['global']['projectionTest']['$tmp278'].Σ = $lub($Γ['global']['projectionTest']['$tmp278'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['projectionTest']['$tmp278'] = $lub($Γ['global']['projectionTest']['$tmp278'], $Λ[$Λ.length - 1].l);
        $rf = $scope($Γ['global']['projectionTest'], 'Variable', false)['Variable'];
        $rf.scope = $Γ['global']['projectionTest'];
        $rf.$this = {
            Σ: $Λ[$Λ.length - 1].l,
            __$proto__: $rf.prototype
        };
        $rf['name'] = $lub(sec_lvl('$tmp278', null, true, $Γ['global']['projectionTest']), $Λ[$Λ.length - 1].l);
        $rf['initialValue'] = $lub(sec_lvl('i', null, true, $Γ['global']['projectionTest']), $Λ[$Λ.length - 1].l);
        $rf.InvokedAsContr = true;
        $Λ.push({
            l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
            id: 'FUNC'
        });
        src = new Variable($tmp278, i);
        $scope($Γ['global']['projectionTest'], 'src', true)['src'] = $Λ.pop().l;
        $scope($Γ['global']['projectionTest'], 'src', true)['src'] instanceof Object ? $scope($Γ['global']['projectionTest'], 'src', true)['src'].Σ = $lub($scope($Γ['global']['projectionTest'], 'src', true)['src'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['projectionTest'], 'src', true)['src'] = $lub($scope($Γ['global']['projectionTest'], 'src', true)['src'], $Λ[$Λ.length - 1].l);
        $tmp279 = 'dst' + i;
        $Γ['global']['projectionTest']['$tmp279'] = $lub($Λ[$Λ.length - 1].l, sec_lvl('i', null, true, $Γ['global']['projectionTest']));
        $Γ['global']['projectionTest']['$tmp279'] instanceof Object ? $Γ['global']['projectionTest']['$tmp279'].Σ = $lub($Γ['global']['projectionTest']['$tmp279'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['projectionTest']['$tmp279'] = $lub($Γ['global']['projectionTest']['$tmp279'], $Λ[$Λ.length - 1].l);
        $rf = $scope($Γ['global']['projectionTest'], 'Variable', false)['Variable'];
        $rf.scope = $Γ['global']['projectionTest'];
        $rf.$this = {
            Σ: $Λ[$Λ.length - 1].l,
            __$proto__: $rf.prototype
        };
        $rf['name'] = $lub(sec_lvl('$tmp279', null, true, $Γ['global']['projectionTest']), $Λ[$Λ.length - 1].l);
        $rf['initialValue'] = $lub(sec_lvl('i', null, true, $Γ['global']['projectionTest']), $Λ[$Λ.length - 1].l);
        $rf.InvokedAsContr = true;
        $Λ.push({
            l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
            id: 'FUNC'
        });
        dst = new Variable($tmp279, i);
        $scope($Γ['global']['projectionTest'], 'dst', true)['dst'] = $Λ.pop().l;
        $scope($Γ['global']['projectionTest'], 'dst', true)['dst'] instanceof Object ? $scope($Γ['global']['projectionTest'], 'dst', true)['dst'].Σ = $lub($scope($Γ['global']['projectionTest'], 'dst', true)['dst'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['projectionTest'], 'dst', true)['dst'] = $lub($scope($Γ['global']['projectionTest'], 'dst', true)['dst'], $Λ[$Λ.length - 1].l);
        $rf = $prop('dests', 'add', $Γ['global']['projectionTest']);
        $rf.scope = $Γ['global']['projectionTest'];
        $rf.$this = $scope($Γ['global']['projectionTest'], 'dests', false)['dests'];
        $rf['elm'] = $lub(sec_lvl('dst', null, true, $Γ['global']['projectionTest']), $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
            id: 'FUNC'
        });
        $tmp280 = dests.add(dst);
        $Γ['global']['projectionTest']['$tmp280'] = $Λ.pop().l;
        $Γ['global']['projectionTest']['$tmp280'] instanceof Object ? $Γ['global']['projectionTest']['$tmp280'].Σ = $lub($Γ['global']['projectionTest']['$tmp280'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['projectionTest']['$tmp280'] = $lub($Γ['global']['projectionTest']['$tmp280'], $Λ[$Λ.length - 1].l);
        $tmp282 = Strength.NORMAL;
        $Γ['global']['projectionTest']['$tmp282'] = sec_lvl('Strength', 'NORMAL', false, $Γ['global']['projectionTest']);
        $Γ['global']['projectionTest']['$tmp282'] instanceof Object ? $Γ['global']['projectionTest']['$tmp282'].Σ = $lub($Γ['global']['projectionTest']['$tmp282'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['projectionTest']['$tmp282'] = $lub($Γ['global']['projectionTest']['$tmp282'], $Λ[$Λ.length - 1].l);
        $rf = $scope($Γ['global']['projectionTest'], 'StayConstraint', false)['StayConstraint'];
        $rf.scope = $Γ['global']['projectionTest'];
        $rf.$this = {
            Σ: $Λ[$Λ.length - 1].l,
            __$proto__: $rf.prototype
        };
        $rf['v'] = $lub(sec_lvl('src', null, true, $Γ['global']['projectionTest']), $Λ[$Λ.length - 1].l);
        $rf['str'] = $lub(sec_lvl('$tmp282', null, true, $Γ['global']['projectionTest']), $Λ[$Λ.length - 1].l);
        $rf.InvokedAsContr = true;
        $Λ.push({
            l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
            id: 'FUNC'
        });
        $tmp281 = new StayConstraint(src, $tmp282);
        $Γ['global']['projectionTest']['$tmp281'] = $Λ.pop().l;
        $Γ['global']['projectionTest']['$tmp281'] instanceof Object ? $Γ['global']['projectionTest']['$tmp281'].Σ = $lub($Γ['global']['projectionTest']['$tmp281'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['projectionTest']['$tmp281'] = $lub($Γ['global']['projectionTest']['$tmp281'], $Λ[$Λ.length - 1].l);
        $tmp284 = Strength.REQUIRED;
        $Γ['global']['projectionTest']['$tmp284'] = sec_lvl('Strength', 'REQUIRED', false, $Γ['global']['projectionTest']);
        $Γ['global']['projectionTest']['$tmp284'] instanceof Object ? $Γ['global']['projectionTest']['$tmp284'].Σ = $lub($Γ['global']['projectionTest']['$tmp284'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['projectionTest']['$tmp284'] = $lub($Γ['global']['projectionTest']['$tmp284'], $Λ[$Λ.length - 1].l);
        $rf = $scope($Γ['global']['projectionTest'], 'ScaleConstraint', false)['ScaleConstraint'];
        $rf.scope = $Γ['global']['projectionTest'];
        $rf.$this = {
            Σ: $Λ[$Λ.length - 1].l,
            __$proto__: $rf.prototype
        };
        $rf['src'] = $lub(sec_lvl('src', null, true, $Γ['global']['projectionTest']), $Λ[$Λ.length - 1].l);
        $rf['scale'] = $lub(sec_lvl('scale', null, true, $Γ['global']['projectionTest']), $Λ[$Λ.length - 1].l);
        $rf['offset'] = $lub(sec_lvl('offset', null, true, $Γ['global']['projectionTest']), $Λ[$Λ.length - 1].l);
        $rf['dest'] = $lub(sec_lvl('dst', null, true, $Γ['global']['projectionTest']), $Λ[$Λ.length - 1].l);
        $rf['strength'] = $lub(sec_lvl('$tmp284', null, true, $Γ['global']['projectionTest']), $Λ[$Λ.length - 1].l);
        $rf.InvokedAsContr = true;
        $Λ.push({
            l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
            id: 'FUNC'
        });
        $tmp283 = new ScaleConstraint(src, scale, offset, dst, $tmp284);
        $Γ['global']['projectionTest']['$tmp283'] = $Λ.pop().l;
        $Γ['global']['projectionTest']['$tmp283'] instanceof Object ? $Γ['global']['projectionTest']['$tmp283'].Σ = $lub($Γ['global']['projectionTest']['$tmp283'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['projectionTest']['$tmp283'] = $lub($Γ['global']['projectionTest']['$tmp283'], $Λ[$Λ.length - 1].l);
        $tmp262 = i++;
        $Γ['global']['projectionTest']['$tmp262'] = sec_lvl('i', null, false, $Γ['global']['projectionTest']);
        $Γ['global']['projectionTest']['$tmp262'] instanceof Object ? $Γ['global']['projectionTest']['$tmp262'].Σ = $lub($Γ['global']['projectionTest']['$tmp262'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['projectionTest']['$tmp262'] = $lub($Γ['global']['projectionTest']['$tmp262'], $Λ[$Λ.length - 1].l);
        $tmp263 = i < n;
        $Γ['global']['projectionTest']['$tmp263'] = $lub(sec_lvl('i', null, true, $Γ['global']['projectionTest']), sec_lvl('n', null, true, $Γ['global']['projectionTest']));
        $Γ['global']['projectionTest']['$tmp263'] instanceof Object ? $Γ['global']['projectionTest']['$tmp263'].Σ = $lub($Γ['global']['projectionTest']['$tmp263'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['projectionTest']['$tmp263'] = $lub($Γ['global']['projectionTest']['$tmp263'], $Λ[$Λ.length - 1].l);
    }
    $upgrade([
        'src',
        'dst',
        '$tmp280',
        '$tmp281',
        '$tmp283'
    ], $Λ[$Λ.length - 1].l, $Γ['global']['projectionTest']);
    $Λ.pop();
    $rf = $scope($Γ['global']['projectionTest'], 'change', false)['change'];
    $rf.scope = $Γ['global']['projectionTest'];
    $rf.$this = $Γ['global'];
    $rf['v'] = $lub(sec_lvl('src', null, true, $Γ['global']['projectionTest']), $Λ[$Λ.length - 1].l);
    $rf['newValue'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp264 = change(src, 17);
    $Γ['global']['projectionTest']['$tmp264'] = $Λ.pop().l;
    $Γ['global']['projectionTest']['$tmp264'] instanceof Object ? $Γ['global']['projectionTest']['$tmp264'].Σ = $lub($Γ['global']['projectionTest']['$tmp264'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['projectionTest']['$tmp264'] = $lub($Γ['global']['projectionTest']['$tmp264'], $Λ[$Λ.length - 1].l);
    $tmp266 = dst.value;
    $Γ['global']['projectionTest']['$tmp266'] = sec_lvl('dst', 'value', false, $Γ['global']['projectionTest']);
    $Γ['global']['projectionTest']['$tmp266'] instanceof Object ? $Γ['global']['projectionTest']['$tmp266'].Σ = $lub($Γ['global']['projectionTest']['$tmp266'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['projectionTest']['$tmp266'] = $lub($Γ['global']['projectionTest']['$tmp266'], $Λ[$Λ.length - 1].l);
    $tmp265 = $tmp266 != 1170;
    $Γ['global']['projectionTest']['$tmp265'] = $lub(sec_lvl('$tmp266', null, true, $Γ['global']['projectionTest']), $Λ[$Λ.length - 1].l);
    $Γ['global']['projectionTest']['$tmp265'] instanceof Object ? $Γ['global']['projectionTest']['$tmp265'].Σ = $lub($Γ['global']['projectionTest']['$tmp265'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['projectionTest']['$tmp265'] = $lub($Γ['global']['projectionTest']['$tmp265'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp265', null, true, $Γ['global']['projectionTest'])),
        id: 'IF'
    });
    if ($tmp265) {
        var $tmp355;
        $Γ['global']['projectionTest']['$tmp355'] = 0;
        $tmp355 = alert('Projection 1 failed');
    } else {
        $upgrade([
            'alert',
            '$tmp355'
        ], $Λ[$Λ.length - 1].l, $Γ['global']['projectionTest']);
    }
    $Λ.pop();
    $rf = $scope($Γ['global']['projectionTest'], 'change', false)['change'];
    $rf.scope = $Γ['global']['projectionTest'];
    $rf.$this = $Γ['global'];
    $rf['v'] = $lub(sec_lvl('dst', null, true, $Γ['global']['projectionTest']), $Λ[$Λ.length - 1].l);
    $rf['newValue'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp267 = change(dst, 1050);
    $Γ['global']['projectionTest']['$tmp267'] = $Λ.pop().l;
    $Γ['global']['projectionTest']['$tmp267'] instanceof Object ? $Γ['global']['projectionTest']['$tmp267'].Σ = $lub($Γ['global']['projectionTest']['$tmp267'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['projectionTest']['$tmp267'] = $lub($Γ['global']['projectionTest']['$tmp267'], $Λ[$Λ.length - 1].l);
    $tmp269 = src.value;
    $Γ['global']['projectionTest']['$tmp269'] = sec_lvl('src', 'value', false, $Γ['global']['projectionTest']);
    $Γ['global']['projectionTest']['$tmp269'] instanceof Object ? $Γ['global']['projectionTest']['$tmp269'].Σ = $lub($Γ['global']['projectionTest']['$tmp269'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['projectionTest']['$tmp269'] = $lub($Γ['global']['projectionTest']['$tmp269'], $Λ[$Λ.length - 1].l);
    $tmp268 = $tmp269 != 5;
    $Γ['global']['projectionTest']['$tmp268'] = $lub(sec_lvl('$tmp269', null, true, $Γ['global']['projectionTest']), $Λ[$Λ.length - 1].l);
    $Γ['global']['projectionTest']['$tmp268'] instanceof Object ? $Γ['global']['projectionTest']['$tmp268'].Σ = $lub($Γ['global']['projectionTest']['$tmp268'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['projectionTest']['$tmp268'] = $lub($Γ['global']['projectionTest']['$tmp268'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp268', null, true, $Γ['global']['projectionTest'])),
        id: 'IF'
    });
    if ($tmp268) {
        var $tmp356;
        $Γ['global']['projectionTest']['$tmp356'] = 0;
        $tmp356 = alert('Projection 2 failed');
    } else {
        $upgrade([
            'alert',
            '$tmp356'
        ], $Λ[$Λ.length - 1].l, $Γ['global']['projectionTest']);
    }
    $Λ.pop();
    $rf = $scope($Γ['global']['projectionTest'], 'change', false)['change'];
    $rf.scope = $Γ['global']['projectionTest'];
    $rf.$this = $Γ['global'];
    $rf['v'] = $lub(sec_lvl('scale', null, true, $Γ['global']['projectionTest']), $Λ[$Λ.length - 1].l);
    $rf['newValue'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp270 = change(scale, 5);
    $Γ['global']['projectionTest']['$tmp270'] = $Λ.pop().l;
    $Γ['global']['projectionTest']['$tmp270'] instanceof Object ? $Γ['global']['projectionTest']['$tmp270'].Σ = $lub($Γ['global']['projectionTest']['$tmp270'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['projectionTest']['$tmp270'] = $lub($Γ['global']['projectionTest']['$tmp270'], $Λ[$Λ.length - 1].l);
    i = 0;
    $scope($Γ['global']['projectionTest'], 'i', true)['i'] = $Λ[$Λ.length - 1].l;
    $tmp273 = n - 1;
    $Γ['global']['projectionTest']['$tmp273'] = $lub(sec_lvl('n', null, true, $Γ['global']['projectionTest']), $Λ[$Λ.length - 1].l);
    $Γ['global']['projectionTest']['$tmp273'] instanceof Object ? $Γ['global']['projectionTest']['$tmp273'].Σ = $lub($Γ['global']['projectionTest']['$tmp273'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['projectionTest']['$tmp273'] = $lub($Γ['global']['projectionTest']['$tmp273'], $Λ[$Λ.length - 1].l);
    $tmp272 = i < $tmp273;
    $Γ['global']['projectionTest']['$tmp272'] = $lub(sec_lvl('i', null, true, $Γ['global']['projectionTest']), sec_lvl('$tmp273', null, true, $Γ['global']['projectionTest']));
    $Γ['global']['projectionTest']['$tmp272'] instanceof Object ? $Γ['global']['projectionTest']['$tmp272'].Σ = $lub($Γ['global']['projectionTest']['$tmp272'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['projectionTest']['$tmp272'] = $lub($Γ['global']['projectionTest']['$tmp272'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp272', null, true, $Γ['global']['projectionTest'])),
        id: 'LOOP'
    });
    for (; $tmp272;) {
        var $tmp285, $tmp286, $tmp287, $tmp288, $tmp271, $tmp272, $tmp289;
        $Γ['global']['projectionTest']['$tmp289'] = $Γ['global']['projectionTest']['$tmp272'] = $Γ['global']['projectionTest']['$tmp271'] = $Γ['global']['projectionTest']['$tmp288'] = $Γ['global']['projectionTest']['$tmp287'] = $Γ['global']['projectionTest']['$tmp286'] = $Γ['global']['projectionTest']['$tmp285'] = 0;
        $rf = $prop('dests', 'at', $Γ['global']['projectionTest']);
        $rf.scope = $Γ['global']['projectionTest'];
        $rf.$this = $scope($Γ['global']['projectionTest'], 'dests', false)['dests'];
        $rf['index'] = $lub(sec_lvl('i', null, true, $Γ['global']['projectionTest']), $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
            id: 'FUNC'
        });
        $tmp = dests.at(i);
        $Γ['global']['projectionTest']['$tmp'] = $Λ.pop().l;
        $Γ['global']['projectionTest']['$tmp'] instanceof Object ? $Γ['global']['projectionTest']['$tmp'].Σ = $lub($Γ['global']['projectionTest']['$tmp'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['projectionTest']['$tmp'] = $lub($Γ['global']['projectionTest']['$tmp'], $Λ[$Λ.length - 1].l);
        $tmp286 = $tmp.value;
        $Γ['global']['projectionTest']['$tmp286'] = sec_lvl('$tmp', 'value', false, $Γ['global']['projectionTest']);
        $Γ['global']['projectionTest']['$tmp286'] instanceof Object ? $Γ['global']['projectionTest']['$tmp286'].Σ = $lub($Γ['global']['projectionTest']['$tmp286'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['projectionTest']['$tmp286'] = $lub($Γ['global']['projectionTest']['$tmp286'], $Λ[$Λ.length - 1].l);
        $tmp288 = i * 5;
        $Γ['global']['projectionTest']['$tmp288'] = $lub(sec_lvl('i', null, true, $Γ['global']['projectionTest']), $Λ[$Λ.length - 1].l);
        $Γ['global']['projectionTest']['$tmp288'] instanceof Object ? $Γ['global']['projectionTest']['$tmp288'].Σ = $lub($Γ['global']['projectionTest']['$tmp288'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['projectionTest']['$tmp288'] = $lub($Γ['global']['projectionTest']['$tmp288'], $Λ[$Λ.length - 1].l);
        $tmp287 = $tmp288 + 1000;
        $Γ['global']['projectionTest']['$tmp287'] = $lub(sec_lvl('$tmp288', null, true, $Γ['global']['projectionTest']), $Λ[$Λ.length - 1].l);
        $Γ['global']['projectionTest']['$tmp287'] instanceof Object ? $Γ['global']['projectionTest']['$tmp287'].Σ = $lub($Γ['global']['projectionTest']['$tmp287'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['projectionTest']['$tmp287'] = $lub($Γ['global']['projectionTest']['$tmp287'], $Λ[$Λ.length - 1].l);
        $tmp285 = $tmp286 != $tmp287;
        $Γ['global']['projectionTest']['$tmp285'] = $lub(sec_lvl('$tmp286', null, true, $Γ['global']['projectionTest']), sec_lvl('$tmp287', null, true, $Γ['global']['projectionTest']));
        $Γ['global']['projectionTest']['$tmp285'] instanceof Object ? $Γ['global']['projectionTest']['$tmp285'].Σ = $lub($Γ['global']['projectionTest']['$tmp285'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['projectionTest']['$tmp285'] = $lub($Γ['global']['projectionTest']['$tmp285'], $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp285', null, true, $Γ['global']['projectionTest'])),
            id: 'IF'
        });
        if ($tmp285) {
            var $tmp357;
            $Γ['global']['projectionTest']['$tmp357'] = 0;
            $tmp357 = alert('Projection 3 failed');
        } else {
            $upgrade([
                'alert',
                '$tmp357'
            ], $Λ[$Λ.length - 1].l, $Γ['global']['projectionTest']);
        }
        $Λ.pop();
        $tmp271 = i++;
        $Γ['global']['projectionTest']['$tmp271'] = sec_lvl('i', null, false, $Γ['global']['projectionTest']);
        $Γ['global']['projectionTest']['$tmp271'] instanceof Object ? $Γ['global']['projectionTest']['$tmp271'].Σ = $lub($Γ['global']['projectionTest']['$tmp271'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['projectionTest']['$tmp271'] = $lub($Γ['global']['projectionTest']['$tmp271'], $Λ[$Λ.length - 1].l);
        $tmp289 = n - 1;
        $Γ['global']['projectionTest']['$tmp289'] = $lub(sec_lvl('n', null, true, $Γ['global']['projectionTest']), $Λ[$Λ.length - 1].l);
        $Γ['global']['projectionTest']['$tmp289'] instanceof Object ? $Γ['global']['projectionTest']['$tmp289'].Σ = $lub($Γ['global']['projectionTest']['$tmp289'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['projectionTest']['$tmp289'] = $lub($Γ['global']['projectionTest']['$tmp289'], $Λ[$Λ.length - 1].l);
        $tmp272 = i < $tmp289;
        $Γ['global']['projectionTest']['$tmp272'] = $lub(sec_lvl('i', null, true, $Γ['global']['projectionTest']), sec_lvl('$tmp289', null, true, $Γ['global']['projectionTest']));
        $Γ['global']['projectionTest']['$tmp272'] instanceof Object ? $Γ['global']['projectionTest']['$tmp272'].Σ = $lub($Γ['global']['projectionTest']['$tmp272'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['projectionTest']['$tmp272'] = $lub($Γ['global']['projectionTest']['$tmp272'], $Λ[$Λ.length - 1].l);
    }
    $upgrade([
        '$tmp',
        'alert',
        '$tmp357'
    ], $Λ[$Λ.length - 1].l, $Γ['global']['projectionTest']);
    $Λ.pop();
    $rf = $scope($Γ['global']['projectionTest'], 'change', false)['change'];
    $rf.scope = $Γ['global']['projectionTest'];
    $rf.$this = $Γ['global'];
    $rf['v'] = $lub(sec_lvl('offset', null, true, $Γ['global']['projectionTest']), $Λ[$Λ.length - 1].l);
    $rf['newValue'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp274 = change(offset, 2000);
    $Γ['global']['projectionTest']['$tmp274'] = $Λ.pop().l;
    $Γ['global']['projectionTest']['$tmp274'] instanceof Object ? $Γ['global']['projectionTest']['$tmp274'].Σ = $lub($Γ['global']['projectionTest']['$tmp274'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['projectionTest']['$tmp274'] = $lub($Γ['global']['projectionTest']['$tmp274'], $Λ[$Λ.length - 1].l);
    i = 0;
    $scope($Γ['global']['projectionTest'], 'i', true)['i'] = $Λ[$Λ.length - 1].l;
    $tmp277 = n - 1;
    $Γ['global']['projectionTest']['$tmp277'] = $lub(sec_lvl('n', null, true, $Γ['global']['projectionTest']), $Λ[$Λ.length - 1].l);
    $Γ['global']['projectionTest']['$tmp277'] instanceof Object ? $Γ['global']['projectionTest']['$tmp277'].Σ = $lub($Γ['global']['projectionTest']['$tmp277'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['projectionTest']['$tmp277'] = $lub($Γ['global']['projectionTest']['$tmp277'], $Λ[$Λ.length - 1].l);
    $tmp276 = i < $tmp277;
    $Γ['global']['projectionTest']['$tmp276'] = $lub(sec_lvl('i', null, true, $Γ['global']['projectionTest']), sec_lvl('$tmp277', null, true, $Γ['global']['projectionTest']));
    $Γ['global']['projectionTest']['$tmp276'] instanceof Object ? $Γ['global']['projectionTest']['$tmp276'].Σ = $lub($Γ['global']['projectionTest']['$tmp276'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['projectionTest']['$tmp276'] = $lub($Γ['global']['projectionTest']['$tmp276'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp276', null, true, $Γ['global']['projectionTest'])),
        id: 'LOOP'
    });
    for (; $tmp276;) {
        var $tmp290, $tmp291, $tmp292, $tmp293, $tmp275, $tmp276, $tmp294;
        $Γ['global']['projectionTest']['$tmp294'] = $Γ['global']['projectionTest']['$tmp276'] = $Γ['global']['projectionTest']['$tmp275'] = $Γ['global']['projectionTest']['$tmp293'] = $Γ['global']['projectionTest']['$tmp292'] = $Γ['global']['projectionTest']['$tmp291'] = $Γ['global']['projectionTest']['$tmp290'] = 0;
        $rf = $prop('dests', 'at', $Γ['global']['projectionTest']);
        $rf.scope = $Γ['global']['projectionTest'];
        $rf.$this = $scope($Γ['global']['projectionTest'], 'dests', false)['dests'];
        $rf['index'] = $lub(sec_lvl('i', null, true, $Γ['global']['projectionTest']), $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
            id: 'FUNC'
        });
        $tmp = dests.at(i);
        $Γ['global']['projectionTest']['$tmp'] = $Λ.pop().l;
        $Γ['global']['projectionTest']['$tmp'] instanceof Object ? $Γ['global']['projectionTest']['$tmp'].Σ = $lub($Γ['global']['projectionTest']['$tmp'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['projectionTest']['$tmp'] = $lub($Γ['global']['projectionTest']['$tmp'], $Λ[$Λ.length - 1].l);
        $tmp291 = $tmp.value;
        $Γ['global']['projectionTest']['$tmp291'] = sec_lvl('$tmp', 'value', false, $Γ['global']['projectionTest']);
        $Γ['global']['projectionTest']['$tmp291'] instanceof Object ? $Γ['global']['projectionTest']['$tmp291'].Σ = $lub($Γ['global']['projectionTest']['$tmp291'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['projectionTest']['$tmp291'] = $lub($Γ['global']['projectionTest']['$tmp291'], $Λ[$Λ.length - 1].l);
        $tmp293 = i * 5;
        $Γ['global']['projectionTest']['$tmp293'] = $lub(sec_lvl('i', null, true, $Γ['global']['projectionTest']), $Λ[$Λ.length - 1].l);
        $Γ['global']['projectionTest']['$tmp293'] instanceof Object ? $Γ['global']['projectionTest']['$tmp293'].Σ = $lub($Γ['global']['projectionTest']['$tmp293'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['projectionTest']['$tmp293'] = $lub($Γ['global']['projectionTest']['$tmp293'], $Λ[$Λ.length - 1].l);
        $tmp292 = $tmp293 + 2000;
        $Γ['global']['projectionTest']['$tmp292'] = $lub(sec_lvl('$tmp293', null, true, $Γ['global']['projectionTest']), $Λ[$Λ.length - 1].l);
        $Γ['global']['projectionTest']['$tmp292'] instanceof Object ? $Γ['global']['projectionTest']['$tmp292'].Σ = $lub($Γ['global']['projectionTest']['$tmp292'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['projectionTest']['$tmp292'] = $lub($Γ['global']['projectionTest']['$tmp292'], $Λ[$Λ.length - 1].l);
        $tmp290 = $tmp291 != $tmp292;
        $Γ['global']['projectionTest']['$tmp290'] = $lub(sec_lvl('$tmp291', null, true, $Γ['global']['projectionTest']), sec_lvl('$tmp292', null, true, $Γ['global']['projectionTest']));
        $Γ['global']['projectionTest']['$tmp290'] instanceof Object ? $Γ['global']['projectionTest']['$tmp290'].Σ = $lub($Γ['global']['projectionTest']['$tmp290'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['projectionTest']['$tmp290'] = $lub($Γ['global']['projectionTest']['$tmp290'], $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp290', null, true, $Γ['global']['projectionTest'])),
            id: 'IF'
        });
        if ($tmp290) {
            var $tmp358;
            $Γ['global']['projectionTest']['$tmp358'] = 0;
            $tmp358 = alert('Projection 4 failed');
        } else {
            $upgrade([
                'alert',
                '$tmp358'
            ], $Λ[$Λ.length - 1].l, $Γ['global']['projectionTest']);
        }
        $Λ.pop();
        $tmp275 = i++;
        $Γ['global']['projectionTest']['$tmp275'] = sec_lvl('i', null, false, $Γ['global']['projectionTest']);
        $Γ['global']['projectionTest']['$tmp275'] instanceof Object ? $Γ['global']['projectionTest']['$tmp275'].Σ = $lub($Γ['global']['projectionTest']['$tmp275'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['projectionTest']['$tmp275'] = $lub($Γ['global']['projectionTest']['$tmp275'], $Λ[$Λ.length - 1].l);
        $tmp294 = n - 1;
        $Γ['global']['projectionTest']['$tmp294'] = $lub(sec_lvl('n', null, true, $Γ['global']['projectionTest']), $Λ[$Λ.length - 1].l);
        $Γ['global']['projectionTest']['$tmp294'] instanceof Object ? $Γ['global']['projectionTest']['$tmp294'].Σ = $lub($Γ['global']['projectionTest']['$tmp294'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['projectionTest']['$tmp294'] = $lub($Γ['global']['projectionTest']['$tmp294'], $Λ[$Λ.length - 1].l);
        $tmp276 = i < $tmp294;
        $Γ['global']['projectionTest']['$tmp276'] = $lub(sec_lvl('i', null, true, $Γ['global']['projectionTest']), sec_lvl('$tmp294', null, true, $Γ['global']['projectionTest']));
        $Γ['global']['projectionTest']['$tmp276'] instanceof Object ? $Γ['global']['projectionTest']['$tmp276'].Σ = $lub($Γ['global']['projectionTest']['$tmp276'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['projectionTest']['$tmp276'] = $lub($Γ['global']['projectionTest']['$tmp276'], $Λ[$Λ.length - 1].l);
    }
    $upgrade([
        '$tmp',
        'alert',
        '$tmp358'
    ], $Λ[$Λ.length - 1].l, $Γ['global']['projectionTest']);
    $Λ.pop();
    return;
}
function change(v, newValue) {
    var edit, $tmp295, edits, $tmp296, plan, i, $tmp298, $tmp299;
    $Γ['global']['change']['$tmp299'] = $Γ['global']['change']['$tmp298'] = $Γ['global']['change']['i'] = $Γ['global']['change']['plan'] = $Γ['global']['change']['$tmp296'] = $Γ['global']['change']['edits'] = $Γ['global']['change']['$tmp295'] = $Γ['global']['change']['edit'] = 0;
    $tmp295 = Strength.PREFERRED;
    $Γ['global']['change']['$tmp295'] = sec_lvl('Strength', 'PREFERRED', false, $Γ['global']['change']);
    $Γ['global']['change']['$tmp295'] instanceof Object ? $Γ['global']['change']['$tmp295'].Σ = $lub($Γ['global']['change']['$tmp295'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['change']['$tmp295'] = $lub($Γ['global']['change']['$tmp295'], $Λ[$Λ.length - 1].l);
    $rf = $scope($Γ['global']['change'], 'EditConstraint', false)['EditConstraint'];
    $rf.scope = $Γ['global']['change'];
    $rf.$this = {
        Σ: $Λ[$Λ.length - 1].l,
        __$proto__: $rf.prototype
    };
    $rf['v'] = $lub(sec_lvl('v', null, true, $Γ['global']['change']), $Λ[$Λ.length - 1].l);
    $rf['str'] = $lub(sec_lvl('$tmp295', null, true, $Γ['global']['change']), $Λ[$Λ.length - 1].l);
    $rf.InvokedAsContr = true;
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    edit = new EditConstraint(v, $tmp295);
    $scope($Γ['global']['change'], 'edit', true)['edit'] = $Λ.pop().l;
    $scope($Γ['global']['change'], 'edit', true)['edit'] instanceof Object ? $scope($Γ['global']['change'], 'edit', true)['edit'].Σ = $lub($scope($Γ['global']['change'], 'edit', true)['edit'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['change'], 'edit', true)['edit'] = $lub($scope($Γ['global']['change'], 'edit', true)['edit'], $Λ[$Λ.length - 1].l);
    $rf = $scope($Γ['global']['change'], 'OrderedCollection', false)['OrderedCollection'];
    $rf.scope = $Γ['global']['change'];
    $rf.$this = {
        Σ: $Λ[$Λ.length - 1].l,
        __$proto__: $rf.prototype
    };
    $rf.InvokedAsContr = true;
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    edits = new OrderedCollection();
    $scope($Γ['global']['change'], 'edits', true)['edits'] = $Λ.pop().l;
    $scope($Γ['global']['change'], 'edits', true)['edits'] instanceof Object ? $scope($Γ['global']['change'], 'edits', true)['edits'].Σ = $lub($scope($Γ['global']['change'], 'edits', true)['edits'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['change'], 'edits', true)['edits'] = $lub($scope($Γ['global']['change'], 'edits', true)['edits'], $Λ[$Λ.length - 1].l);
    $rf = $prop('edits', 'add', $Γ['global']['change']);
    $rf.scope = $Γ['global']['change'];
    $rf.$this = $scope($Γ['global']['change'], 'edits', false)['edits'];
    $rf['elm'] = $lub(sec_lvl('edit', null, true, $Γ['global']['change']), $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp296 = edits.add(edit);
    $Γ['global']['change']['$tmp296'] = $Λ.pop().l;
    $Γ['global']['change']['$tmp296'] instanceof Object ? $Γ['global']['change']['$tmp296'].Σ = $lub($Γ['global']['change']['$tmp296'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['change']['$tmp296'] = $lub($Γ['global']['change']['$tmp296'], $Λ[$Λ.length - 1].l);
    $rf = $prop('planner', 'extractPlanFromConstraints', $Γ['global']['change']);
    $rf.scope = $Γ['global']['change'];
    $rf.$this = $scope($Γ['global']['change'], 'planner', false)['planner'];
    $rf['constraints'] = $lub(sec_lvl('edits', null, true, $Γ['global']['change']), $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    plan = planner.extractPlanFromConstraints(edits);
    $scope($Γ['global']['change'], 'plan', true)['plan'] = $Λ.pop().l;
    $scope($Γ['global']['change'], 'plan', true)['plan'] instanceof Object ? $scope($Γ['global']['change'], 'plan', true)['plan'].Σ = $lub($scope($Γ['global']['change'], 'plan', true)['plan'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['change'], 'plan', true)['plan'] = $lub($scope($Γ['global']['change'], 'plan', true)['plan'], $Λ[$Λ.length - 1].l);
    i = 0;
    $scope($Γ['global']['change'], 'i', true)['i'] = $Λ[$Λ.length - 1].l;
    $tmp298 = i < 10;
    $Γ['global']['change']['$tmp298'] = $lub(sec_lvl('i', null, true, $Γ['global']['change']), $Λ[$Λ.length - 1].l);
    $Γ['global']['change']['$tmp298'] instanceof Object ? $Γ['global']['change']['$tmp298'].Σ = $lub($Γ['global']['change']['$tmp298'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['change']['$tmp298'] = $lub($Γ['global']['change']['$tmp298'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp298', null, true, $Γ['global']['change'])),
        id: 'LOOP'
    });
    for (; $tmp298;) {
        v.value = newValue;
        $scope($Γ['global']['change'], 'v', false)['value'] = sec_lvl('newValue', null, false, $Γ['global']['change']);
        $scope($Γ['global']['change'], 'v', false)['value'] instanceof Object ? $scope($Γ['global']['change'], 'v', false)['value'].Σ = $lub($scope($Γ['global']['change'], 'v', false)['value'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['change'], 'v', false)['value'] = $lub($scope($Γ['global']['change'], 'v', false)['value'], $Λ[$Λ.length - 1].l);
        var $tmp300, $tmp297, $tmp298;
        $Γ['global']['change']['$tmp298'] = $Γ['global']['change']['$tmp297'] = $Γ['global']['change']['$tmp300'] = 0;
        $tmp300 = plan.execute();
        $tmp297 = i++;
        $Γ['global']['change']['$tmp297'] = sec_lvl('i', null, false, $Γ['global']['change']);
        $Γ['global']['change']['$tmp297'] instanceof Object ? $Γ['global']['change']['$tmp297'].Σ = $lub($Γ['global']['change']['$tmp297'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['change']['$tmp297'] = $lub($Γ['global']['change']['$tmp297'], $Λ[$Λ.length - 1].l);
        $tmp298 = i < 10;
        $Γ['global']['change']['$tmp298'] = $lub(sec_lvl('i', null, true, $Γ['global']['change']), $Λ[$Λ.length - 1].l);
        $Γ['global']['change']['$tmp298'] instanceof Object ? $Γ['global']['change']['$tmp298'].Σ = $lub($Γ['global']['change']['$tmp298'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['change']['$tmp298'] = $lub($Γ['global']['change']['$tmp298'], $Λ[$Λ.length - 1].l);
    }
    $upgrade([
        'plan.execute',
        '$tmp300'
    ], $Λ[$Λ.length - 1].l, $Γ['global']['change']);
    $Λ.pop();
    $tmp299 = edit.destroyConstraint();
    return;
}
planner = null;
$Γ['global']['planner'] = $Λ[$Λ.length - 1].l;
function deltaBlue() {
    var $tmp301, $tmp302;
    $Γ['global']['deltaBlue']['$tmp302'] = $Γ['global']['deltaBlue']['$tmp301'] = 0;
    $rf = $scope($Γ['global']['deltaBlue'], 'chainTest', false)['chainTest'];
    $rf.scope = $Γ['global']['deltaBlue'];
    $rf.$this = $Γ['global'];
    $rf['n'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp301 = chainTest(100);
    $Γ['global']['deltaBlue']['$tmp301'] = $Λ.pop().l;
    $Γ['global']['deltaBlue']['$tmp301'] instanceof Object ? $Γ['global']['deltaBlue']['$tmp301'].Σ = $lub($Γ['global']['deltaBlue']['$tmp301'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['deltaBlue']['$tmp301'] = $lub($Γ['global']['deltaBlue']['$tmp301'], $Λ[$Λ.length - 1].l);
    $rf = $scope($Γ['global']['deltaBlue'], 'projectionTest', false)['projectionTest'];
    $rf.scope = $Γ['global']['deltaBlue'];
    $rf.$this = $Γ['global'];
    $rf['n'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp302 = projectionTest(100);
    $Γ['global']['deltaBlue']['$tmp302'] = $Λ.pop().l;
    $Γ['global']['deltaBlue']['$tmp302'] instanceof Object ? $Γ['global']['deltaBlue']['$tmp302'].Σ = $lub($Γ['global']['deltaBlue']['$tmp302'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['deltaBlue']['$tmp302'] = $lub($Γ['global']['deltaBlue']['$tmp302'], $Λ[$Λ.length - 1].l);
    return;
}
$rf = $scope($Γ['global'], 'deltaBlue', false)['deltaBlue'];
$rf.scope = $Γ['global'];
$rf.$this = $Γ['global'];
$Λ.push({
    l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
    id: 'FUNC'
});
$tmp19 = deltaBlue();
$Γ['global']['$tmp19'] = $Λ.pop().l;
$Γ['global']['$tmp19'] instanceof Object ? $Γ['global']['$tmp19'].Σ = $lub($Γ['global']['$tmp19'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp19'] = $lub($Γ['global']['$tmp19'], $Λ[$Λ.length - 1].l);
$tmp20 = console.log('DeltaBlue Done');
