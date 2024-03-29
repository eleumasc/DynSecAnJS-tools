
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

function $output(argSecLvl,argValue,ch_lvl,policy,pcLvl) {

	debugger;
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
$Γ['global']['lengthIsEqualOrGreaterThan9'] = {
	$fscope: $Λ[$Λ.length - 1].l,
	prototype: { Σ: $Λ[$Λ.length - 1].l },
	Σ: $Λ[$Λ.length - 1].l,
	scope: $Γ['global']
};
$Γ['global']['lengthIsLessThan9'] = {
	$fscope: $Λ[$Λ.length - 1].l,
	prototype: { Σ: $Λ[$Λ.length - 1].l },
	Σ: $Λ[$Λ.length - 1].l,
	scope: $Γ['global']
};
$Γ['global']['foo'] = {
	$fscope: $Λ[$Λ.length - 1].l,
	prototype: { Σ: $Λ[$Λ.length - 1].l },
	Σ: $Λ[$Λ.length - 1].l,
	scope: $Γ['global'],
	pwd: $Λ[$Λ.length - 1].l
};
var pass, $tmp0;
$Γ['global']['$tmp0'] = $Γ['global']['pass'] = 0;
pass = 'temp1234';

$Γ['global']['pass'] = 1;


$Γ['global']['pass'] instanceof Object ? $Γ['global']['pass'].Σ = $Γ['global']['pass'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['pass'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['pass'] = $Γ['global']['pass'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['pass'] : $Λ[$Λ.length - 1].l;
function foo(pwd) {
	var $tmp1, $tmp2, $tmp3;
	$Γ['global']['foo']['$tmp3'] = $Γ['global']['foo']['$tmp2'] = $Γ['global']['foo']['$tmp1'] = 0;
	$tmp2 = pwd.length;
	$Γ['global']['foo']['$tmp2'] = sec_lvl('pwd', 'length', false, $Γ['global']['foo']);
	$Γ['global']['foo']['$tmp2'] instanceof Object ? $Γ['global']['foo']['$tmp2'].Σ = $Γ['global']['foo']['$tmp2'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['foo']['$tmp2'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['foo']['$tmp2'] = $Γ['global']['foo']['$tmp2'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['foo']['$tmp2'] : $Λ[$Λ.length - 1].l;
	$tmp1 = $tmp2 >= 9;
	$Γ['global']['foo']['$tmp1'] = sec_lvl('$tmp2', null, true, $Γ['global']['foo']) >= $Λ[$Λ.length - 1].l ? sec_lvl('$tmp2', null, true, $Γ['global']['foo']) : $Λ[$Λ.length - 1].l;
	$Γ['global']['foo']['$tmp1'] instanceof Object ? $Γ['global']['foo']['$tmp1'].Σ = $Γ['global']['foo']['$tmp1'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['foo']['$tmp1'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['foo']['$tmp1'] = $Γ['global']['foo']['$tmp1'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['foo']['$tmp1'] : $Λ[$Λ.length - 1].l;
	$Λ.push({
		l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp1', null, true, $Γ['global']['foo']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp1', null, true, $Γ['global']['foo']),
		id: 'IF'
	});
	if ($tmp1) {
		var $tmp4;
		$Γ['global']['foo']['$tmp4'] = 0;
		$rf = $scope($Γ['global']['foo'], 'lengthIsEqualOrGreaterThan9', false)['lengthIsEqualOrGreaterThan9'];
		$rf.scope = $Γ['global']['foo'];
		$rf.$this = $Γ['global'];
		$Λ.push({
			l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
			id: 'FUNC'
		});
		$tmp4 = lengthIsEqualOrGreaterThan9();
		$Γ['global']['foo']['$tmp4'] = $Λ.pop().l;
		$Γ['global']['foo']['$tmp4'] instanceof Object ? $Γ['global']['foo']['$tmp4'].Σ = $Γ['global']['foo']['$tmp4'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['foo']['$tmp4'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['foo']['$tmp4'] = $Γ['global']['foo']['$tmp4'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['foo']['$tmp4'] : $Λ[$Λ.length - 1].l;
		$old_pc = $pc();
		while ($pc().id !== 'FUNC') {
			$Λ.pop();
		}
		if ($Γ['global']['foo'].InvokedAsContr) {
			$Γ['global']['foo'].$this.Σ = $Γ['global']['foo'].$this.Σ >= $old_pc.l ? $Γ['global']['foo'].$this.Σ : $old_pc.l;
			$Λ[$Λ.length - 1] = { 'l': $Γ['global']['foo'].$this };
		} else {
			$Λ[$Λ.length - 1] = { 'l': $old_pc.l };
		}
		return;
	} else {
		$upgrade(['$tmp4'], $Λ[$Λ.length - 1].l, $Γ['global']['foo']);
	}
	$comp({ 'lbl': 'FUNC' }, $Λ[$Λ.length - 1].l);
	$Λ.pop();
	$rf = $scope($Γ['global']['foo'], 'lengthIsLessThan9', false)['lengthIsLessThan9'];
	$rf.scope = $Γ['global']['foo'];
	$rf.$this = $Γ['global'];
	$Λ.push({
		l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
		id: 'FUNC'
	});
	$tmp3 = lengthIsLessThan9();
	$Γ['global']['foo']['$tmp3'] = $Λ.pop().l;
	$Γ['global']['foo']['$tmp3'] instanceof Object ? $Γ['global']['foo']['$tmp3'].Σ = $Γ['global']['foo']['$tmp3'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['foo']['$tmp3'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['foo']['$tmp3'] = $Γ['global']['foo']['$tmp3'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['foo']['$tmp3'] : $Λ[$Λ.length - 1].l;
	$old_pc = $pc();
	while ($pc().id !== 'FUNC') {
		$Λ.pop();
	}
	if ($Γ['global']['foo'].InvokedAsContr) {
		$Γ['global']['foo'].$this.Σ = $Γ['global']['foo'].$this.Σ >= $old_pc.l ? $Γ['global']['foo'].$this.Σ : $old_pc.l;
		$Λ[$Λ.length - 1] = { 'l': $Γ['global']['foo'].$this };
	} else {
		$Λ[$Λ.length - 1] = { 'l': $old_pc.l };
	}
	return;
}
function lengthIsLessThan9() {
	var $tmp5;
	$Γ['global']['lengthIsLessThan9']['$tmp5'] = 0;
	$output(0,'length is less than 9',0,'suppress',$Λ[$Λ.length - 1].l );
	$old_pc = $pc();
	while ($pc().id !== 'FUNC') {
		$Λ.pop();
	}
	if ($Γ['global']['lengthIsLessThan9'].InvokedAsContr) {
		$Γ['global']['lengthIsLessThan9'].$this.Σ = $Γ['global']['lengthIsLessThan9'].$this.Σ >= $old_pc.l ? $Γ['global']['lengthIsLessThan9'].$this.Σ : $old_pc.l;
		$Λ[$Λ.length - 1] = { 'l': $Γ['global']['lengthIsLessThan9'].$this };
	} else {
		$Λ[$Λ.length - 1] = { 'l': $old_pc.l };
	}
	return;
}
function lengthIsEqualOrGreaterThan9() {
	var $tmp6;
	$Γ['global']['lengthIsEqualOrGreaterThan9']['$tmp6'] = 0;
	$output(0,'length is equal or greater than 9',0,'suppress',$Λ[$Λ.length - 1].l );
	$old_pc = $pc();
	while ($pc().id !== 'FUNC') {
		$Λ.pop();
	}
	if ($Γ['global']['lengthIsEqualOrGreaterThan9'].InvokedAsContr) {
		$Γ['global']['lengthIsEqualOrGreaterThan9'].$this.Σ = $Γ['global']['lengthIsEqualOrGreaterThan9'].$this.Σ >= $old_pc.l ? $Γ['global']['lengthIsEqualOrGreaterThan9'].$this.Σ : $old_pc.l;
		$Λ[$Λ.length - 1] = { 'l': $Γ['global']['lengthIsEqualOrGreaterThan9'].$this };
	} else {
		$Λ[$Λ.length - 1] = { 'l': $old_pc.l };
	}
	return;
}
$rf = $scope($Γ['global'], 'foo', false)['foo'];
$rf.scope = $Γ['global'];
$rf.$this = $Γ['global'];
$rf['pwd'] = sec_lvl('pass', null, true, $Γ['global']) >= $Λ[$Λ.length - 1].l ? sec_lvl('pass', null, true, $Γ['global']) : $Λ[$Λ.length - 1].l;
$Λ.push({
	l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
	id: 'FUNC'
});
$tmp0 = foo(pass);
$Γ['global']['$tmp0'] = $Λ.pop().l;
$Γ['global']['$tmp0'] instanceof Object ? $Γ['global']['$tmp0'].Σ = $Γ['global']['$tmp0'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0'] = $Γ['global']['$tmp0'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0'] : $Λ[$Λ.length - 1].l;

//var argSecLvl = sec_lvl('$tmp2',null,true,$Γ['global']);
//$tmp1 = $output(argSecLvl,$tmp2,0,'suppress',$Λ[$Λ.length - 1].l );
