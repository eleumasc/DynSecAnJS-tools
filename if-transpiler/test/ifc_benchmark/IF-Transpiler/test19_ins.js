
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
$Γ['global']['foo'] = {
	$fscope: $Λ[$Λ.length - 1].l,
	prototype: { Σ: $Λ[$Λ.length - 1].l },
	Σ: $Λ[$Λ.length - 1].l,
	scope: $Γ['global'],
	pwd: $Λ[$Λ.length - 1].l
};
var pass, $tmp0, $tmp1;
$Γ['global']['$tmp1'] = $Γ['global']['$tmp0'] = $Γ['global']['pass'] = 0;
pass = 'temp1234';
$Γ['global']['pass'] = 1;

$Γ['global']['pass'] instanceof Object ? $Γ['global']['pass'].Σ = $Γ['global']['pass'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['pass'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['pass'] = $Γ['global']['pass'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['pass'] : $Λ[$Λ.length - 1].l;
function foo(pwd) {
	this.i = pwd.length;
	$Γ['global']['foo']['$this']['i'] = sec_lvl('pwd', 'length', false, $Γ['global']['foo']);
	$Γ['global']['foo']['$this']['i'] instanceof Object ? $Γ['global']['foo']['$this']['i'].Σ = $Γ['global']['foo']['$this']['i'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['foo']['$this']['i'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['foo']['$this']['i'] = $Γ['global']['foo']['$this']['i'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['foo']['$this']['i'] : $Λ[$Λ.length - 1].l;
	$Γ['global']['foo']['$this']['\u03A3'] = $Γ['global']['foo']['$this']['\u03A3'] >= sec_lvl('global', 'i', true, $Γ['global']['foo']) ? $Γ['global']['foo']['$this']['\u03A3'] : sec_lvl('global', 'i', true, $Γ['global']['foo']);
	var $tmp2;
	$Γ['global']['foo']['$tmp2'] = 0;
	$tmp2 = 5;
	$Γ['global']['foo']['$tmp2'] = $Λ[$Λ.length - 1].l;
	$Γ['global']['foo']['$tmp2'] instanceof Object ? $Γ['global']['foo']['$tmp2'].Σ = $Γ['global']['foo']['$tmp2'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['foo']['$tmp2'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['foo']['$tmp2'] = $Γ['global']['foo']['$tmp2'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['foo']['$tmp2'] : $Λ[$Λ.length - 1].l;
	$old_pc = $pc();
	while ($pc().id !== 'FUNC') {
		$Λ.pop();
	}
	$rx = $scope($Γ['global']['foo'], '$tmp2')['$tmp2'];
	if ($rx instanceof Object) {
		$rx.Σ = $rx.Σ >= $old_pc.l ? $rx.Σ : $old_pc.l;
		$Λ[$Λ.length - 1] = { 'l': $rx };
	} else {
		if ($Γ['global']['foo'].InvokedAsContr) {
			$Γ['global']['foo'].$this.Σ = $Γ['global']['foo'].$this.Σ >= $old_pc.l ? $Γ['global']['foo'].$this.Σ : $old_pc.l;
			$Λ[$Λ.length - 1] = { 'l': $Γ['global']['foo'].$this };
		} else {
			$Λ[$Λ.length - 1] = { 'l': $old_pc.l };
		}
	}
	return $tmp2;
}
$rf = $scope($Γ['global'], 'foo', false)['foo'];
$rf.scope = $Γ['global'];
$rf.$this = {
	Σ: $Λ[$Λ.length - 1].l,
	__$proto__: $rf.prototype
};
$rf['pwd'] = sec_lvl('pass', null, true, $Γ['global']) >= $Λ[$Λ.length - 1].l ? sec_lvl('pass', null, true, $Γ['global']) : $Λ[$Λ.length - 1].l;
$rf.InvokedAsContr = true;
$Λ.push({
	l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
	id: 'FUNC'
});
$tmp = new foo(pass);
$Γ['global']['$tmp'] = $Λ.pop().l;
$Γ['global']['$tmp'] instanceof Object ? $Γ['global']['$tmp'].Σ = $Γ['global']['$tmp'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp'] = $Γ['global']['$tmp'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp'] : $Λ[$Λ.length - 1].l;
$tmp1 = $tmp['i'];
$Γ['global']['$tmp1'] = sec_lvl('$tmp', 'i', false, $Γ['global']);
$Γ['global']['$tmp1'] instanceof Object ? $Γ['global']['$tmp1'].Σ = $Γ['global']['$tmp1'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp1'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp1'] = $Γ['global']['$tmp1'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp1'] : $Λ[$Λ.length - 1].l;
$tmp0 = $output('$tmp1',$tmp1,$Γ['global'],0,'suppress',$Λ[$Λ.length - 1].l );
