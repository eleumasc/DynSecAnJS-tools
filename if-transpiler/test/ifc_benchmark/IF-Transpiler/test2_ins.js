
var $Γ = { 'global': { 'scope': null, 'Σ': 0 } };
var _$tmp,$tmp,$rf;

$Γ['global'].$this = $Γ['global'];

var $Λ = [{'l': 0, id: 'global'}];
var $Δ = [];
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

		console.log($$csCopy);
		throw new Error("Can't find variable " + $var + " in scope chain ");
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
	return $t.Σ ? $t.Σ: $t;
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

function $output(arg,argValue,$$cs,ch_lvl,policy,pcLvl) {
	var argSecLvl = sec_lvl(arg,null,true,$$cs);
	switch (policy) {
		case 'suppress':
			if($lub(argSecLvl,pcLvl) <= ch_lvl)
				console.log(argValue);
			else
				console.log('Suppressed');
			break;

		case 'default':
			if($lub(argSecLvl,pcLvl) <= ch_lvl)
				console.log(argValue);
			else
				console.log('Default');
			break;

		case 'fail':
			if($lub(argSecLvl,pcLvl) <= ch_lvl)
				console.log(argValue);
			else
				while(true) ; //Infinite loop
			break;
	}

}
//-------------------------------------------------------------------------------
$Γ['global']['chkpassword'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    pwd: $Λ[$Λ.length - 1].l
};
var pass, $tmp0;
$Γ['global']['$tmp0'] = $Γ['global']['pass'] = 0;
pass = 'temp1234';
// changed the pass variable security level to 1 to make it private.
$Γ['global']['pass'] = 1;


$rf = $scope($Γ['global'], 'chkpassword', false)['chkpassword'];
$rf.scope = $Γ['global'];
$rf.$this = $Γ['global'];
$rf['pwd'] = sec_lvl('pass', null, true, $Γ['global']) >= $Λ[$Λ.length - 1].l ? sec_lvl('pass', null, true, $Γ['global']) : $Λ[$Λ.length - 1].l;
$Λ.push({
    l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
    id: 'FUNC'
});
$tmp0 = chkpassword(pass);
$Γ['global']['$tmp0'] = $Λ.pop().l;
$Γ['global']['$tmp0'] instanceof Object ? $Γ['global']['$tmp0'].Σ = $Γ['global']['$tmp0'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0'] = $Γ['global']['$tmp0'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0'] : $Λ[$Λ.length - 1].l;
function chkpassword(pwd) {
    var $tmp1;
    $Γ['global']['chkpassword']['$tmp1'] = 0;
    $tmp1 = 5 > 6;
    $Γ['global']['chkpassword']['$tmp1'] = $Λ[$Λ.length - 1].l;
    $Γ['global']['chkpassword']['$tmp1'] instanceof Object ? $Γ['global']['chkpassword']['$tmp1'].Σ = $Γ['global']['chkpassword']['$tmp1'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp1'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['chkpassword']['$tmp1'] = $Γ['global']['chkpassword']['$tmp1'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp1'] : $Λ[$Λ.length - 1].l;
    $Λ.push({
        l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp1', null, true, $Γ['global']['chkpassword']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp1', null, true, $Γ['global']['chkpassword']),
        id: 'IF'
    });
    if ($tmp1) {
        $upgrade(['$tmp2'], $Λ[$Λ.length - 1].l, $Γ['global']['chkpassword']);
        ;
    } else {
        var $tmp2;
        $Γ['global']['chkpassword']['$tmp2'] = 0;
        $tmp2 = $output('pwd',pwd,$Γ['global']['chkpassword'],0,'suppress');
    }

    $old_pc = $pc();
    while ($pc().id !== 'FUNC') {
        $Λ.pop();
    }
    if ($Γ['global']['chkpassword'].InvokedAsContr) {
        $Γ['global']['chkpassword'].$this.Σ = $Γ['global']['chkpassword'].$this.Σ >= $old_pc.l ? $Γ['global']['chkpassword'].$this.Σ : $old_pc.l;
        $Λ[$Λ.length - 1] = { 'l': $Γ['global']['chkpassword'].$this };
    } else {
        $Λ[$Λ.length - 1] = { 'l': $old_pc.l };
    }

    //$output('pwd',pwd,$Γ['global']['chkpassword'],0,'suppress');

    return;
}