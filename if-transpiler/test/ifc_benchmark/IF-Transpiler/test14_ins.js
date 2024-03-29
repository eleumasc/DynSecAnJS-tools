
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

		//console.log($$csCopy);
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

function $comp(lblObj, lvl) {
	var i = $Λ.length -1 ;
	while (i > 1 && $Λ[i].id !== lblObj.lbl) {
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

	var argSecLvl = sec_lvl(arg, null, true, $$cs);

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
var pass, obj, $tmp0;
$Γ['global']['$tmp0'] = $Γ['global']['obj'] = $Γ['global']['pass'] = 0;
pass = 'temp1234';
// changed the pass variable security level to 1 to make it private.
$Γ['global']['pass'] = 1;

$Γ['global']['pass'] instanceof Object ? $Γ['global']['pass'].Σ = $Γ['global']['pass'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['pass'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['pass'] = $Γ['global']['pass'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['pass'] : $Λ[$Λ.length - 1].l;
obj = {};
$Γ['global']['obj'] = {
	__proto__: {},
	scope: $Γ['global'],
	Σ: $Λ[$Λ.length - 1].l
};
obj['i'] = pass.length;
$Γ['global']['obj']['i'] = sec_lvl('pass', 'length', false, $Γ['global']);
_$tmp = 0;
$Γ['global']['obj']['i'] instanceof Object ? $Γ['global']['obj']['i'].Σ = $lub($Γ['global']['obj']['i'].Σ, _$tmp, $Λ[$Λ.length - 1].l) : $Γ['global']['obj']['i'] = $lub($Γ['global']['obj']['i'], _$tmp, $Λ[$Λ.length - 1].l);
$scope($Γ['global'], 'obj', false)['obj']['\u03A3'] = $scope($Γ['global'], 'obj', false)['obj']['\u03A3'] >= sec_lvl('obj', 'i', true, $Γ['global']) ? $scope($Γ['global'], 'obj', false)['obj']['\u03A3'] : sec_lvl('obj', 'i', true, $Γ['global']);
obj.foo = function () {
	var $tmp1, $tmp2;
	$Γ['global']['obj']['foo']['$tmp2'] = $Γ['global']['obj']['foo']['$tmp1'] = 0;
	$tmp2 = this.i;
	$Γ['global']['obj']['foo']['$tmp2'] = sec_lvl('obj', 'i', false, $Γ['global']['obj']['foo']);
	$Γ['global']['obj']['foo']['$tmp2'] instanceof Object ? $Γ['global']['obj']['foo']['$tmp2'].Σ = $Γ['global']['obj']['foo']['$tmp2'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['obj']['foo']['$tmp2'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['obj']['foo']['$tmp2'] = $Γ['global']['obj']['foo']['$tmp2'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['obj']['foo']['$tmp2'] : $Λ[$Λ.length - 1].l;
	$tmp1 = $output('$tmp2',$tmp2,$Γ['global']['obj']['foo'],0,'suppress',$Λ[$Λ.length - 1].l);
	$old_pc = $pc();
	while ($pc().id !== 'FUNC') {
		$Λ.pop();
	}
	if ($Γ['global']['obj']['foo'].InvokedAsContr) {
		$Γ['global']['obj']['foo'].$this.Σ = $Γ['global']['obj']['foo'].$this.Σ >= $old_pc.l ? $Γ['global']['obj']['foo'].$this.Σ : $old_pc.l;
		$Λ[$Λ.length - 1] = { 'l': $Γ['global']['obj']['foo'].$this };
	} else {
		$Λ[$Λ.length - 1] = { 'l': $old_pc.l };
	}
	return;
};
$Γ['global']['obj']['foo'] = {
	$fscope: $Λ[$Λ.length - 1].l,
	prototype: { Σ: $Λ[$Λ.length - 1].l },
	Σ: $Λ[$Λ.length - 1].l,
	scope: $Γ['global']
};
$rf = $prop('obj', 'foo', $Γ['global']);
$rf.scope = $scope($Γ['global'], 'obj', false)['obj'];
$rf.$this = $scope($Γ['global'], 'obj', false)['obj'];
$Λ.push({
	l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
	id: 'FUNC'
});
$tmp0 = obj.foo();
$Γ['global']['$tmp0'] = $Λ.pop().l;
$Γ['global']['$tmp0'] instanceof Object ? $Γ['global']['$tmp0'].Σ = $Γ['global']['$tmp0'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0'] = $Γ['global']['$tmp0'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0'] : $Λ[$Λ.length - 1].l;

