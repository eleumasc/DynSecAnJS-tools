/*
 * @b_sayed:Important Note: this file must be executed using v8
 * (or any other standard JavaScript engine) but not NodeJS.
 * NodeJS implements the semantics of 'this' in the global scope differently.
 * */

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
	//print($$cs)
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

		//print($$csCopy);
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
				print(argValue);
			else
				print('Suppressed');
			break;

		case 'default':
			if($lub(argSecLvl,pcLvl) <= ch_lvl)
				print(argValue);
			else
				print('Default');
			break;

		case 'fail':
			if($lub(argSecLvl,pcLvl) <= ch_lvl)
				print(argValue);
			else
				while(true) ; //Infinite loop
			break;
	}

}
//-------------------------------------------------------------------------------
$Γ['global']['bar'] = {
	$fscope: $Λ[$Λ.length - 1].l,
	prototype: { Σ: $Λ[$Λ.length - 1].l },
	Σ: $Λ[$Λ.length - 1].l,
	scope: $Γ['global'],
	pwd: $Λ[$Λ.length - 1].l
};
var pass, i, $tmp0, $tmp1;
$Γ['global']['$tmp1'] = $Γ['global']['$tmp0'] = $Γ['global']['i'] = $Γ['global']['pass'] = 0;
pass = 'temp1234';

$Γ['global']['pass'] = 1;

$Γ['global']['pass'] instanceof Object ? $Γ['global']['pass'].Σ = $Γ['global']['pass'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['pass'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['pass'] = $Γ['global']['pass'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['pass'] : $Λ[$Λ.length - 1].l;
function bar(pwd) {
	$Γ['global']['bar']['foo'] = {
		$fscope: $Λ[$Λ.length - 1].l,
		prototype: { Σ: $Λ[$Λ.length - 1].l },
		Σ: $Λ[$Λ.length - 1].l,
		scope: $Γ['global']['bar'],
		pwd: $Λ[$Λ.length - 1].l
	};
	function foo(pwd) {
		var i, $tmp3;
		$Γ['global']['bar']['foo']['$tmp3'] = $Γ['global']['bar']['foo']['i'] = 0;
		this.i = pwd.length;
		$Γ['global']['bar']['foo']['$this']['i'] = sec_lvl('pwd', 'length', false, $Γ['global']['bar']['foo']);
		$Γ['global']['bar']['foo']['$this']['i'] instanceof Object ? $Γ['global']['bar']['foo']['$this']['i'].Σ = $Γ['global']['bar']['foo']['$this']['i'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['bar']['foo']['$this']['i'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['bar']['foo']['$this']['i'] = $Γ['global']['bar']['foo']['$this']['i'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['bar']['foo']['$this']['i'] : $Λ[$Λ.length - 1].l;
		$Γ['global']['bar']['foo']['$this']['\u03A3'] = $Γ['global']['bar']['foo']['$this']['\u03A3'] >= sec_lvl('bar', 'i', true, $Γ['global']['bar']['foo']) ? $Γ['global']['bar']['foo']['$this']['\u03A3'] : sec_lvl('bar', 'i', true, $Γ['global']['bar']['foo']);
		$tmp3 = 5;
		$Γ['global']['bar']['foo']['$tmp3'] = $Λ[$Λ.length - 1].l;
		$Γ['global']['bar']['foo']['$tmp3'] instanceof Object ? $Γ['global']['bar']['foo']['$tmp3'].Σ = $Γ['global']['bar']['foo']['$tmp3'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['bar']['foo']['$tmp3'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['bar']['foo']['$tmp3'] = $Γ['global']['bar']['foo']['$tmp3'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['bar']['foo']['$tmp3'] : $Λ[$Λ.length - 1].l;
		$old_pc = $pc();
		while ($pc().id !== 'FUNC') {
			$Λ.pop();
		}
		$rx = $scope($Γ['global']['bar']['foo'], '$tmp3')['$tmp3'];
		if ($rx instanceof Object) {
			$rx.Σ = $rx.Σ >= $old_pc.l ? $rx.Σ : $old_pc.l;
			$Λ[$Λ.length - 1] = { 'l': $rx };
		} else {
			if ($Γ['global']['bar']['foo'].InvokedAsContr) {
				$Γ['global']['bar']['foo'].$this.Σ = $Γ['global']['bar']['foo'].$this.Σ >= $old_pc.l ? $Γ['global']['bar']['foo'].$this.Σ : $old_pc.l;
				$Λ[$Λ.length - 1] = { 'l': $Γ['global']['bar']['foo'].$this };
			} else {
				$Λ[$Λ.length - 1] = { 'l': $old_pc.l };
			}
		}
		return $tmp3;
	}
	var $tmp2;
	$Γ['global']['bar']['$tmp2'] = 0;
	$rf = $scope($Γ['global']['bar'], 'foo', false)['foo'];
	$rf.scope = $Γ['global']['bar'];
	$rf.$this = $Γ['global'];
	$rf['pwd'] = sec_lvl('pwd', null, true, $Γ['global']['bar']) >= $Λ[$Λ.length - 1].l ? sec_lvl('pwd', null, true, $Γ['global']['bar']) : $Λ[$Λ.length - 1].l;
	$Λ.push({
		l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
		id: 'FUNC'
	});
	$tmp2 = foo(pwd);
	$Γ['global']['bar']['$tmp2'] = $Λ.pop().l;
	$Γ['global']['bar']['$tmp2'] instanceof Object ? $Γ['global']['bar']['$tmp2'].Σ = $Γ['global']['bar']['$tmp2'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['bar']['$tmp2'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['bar']['$tmp2'] = $Γ['global']['bar']['$tmp2'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['bar']['$tmp2'] : $Λ[$Λ.length - 1].l;
	$old_pc = $pc();
	while ($pc().id !== 'FUNC') {
		$Λ.pop();
	}
	if ($Γ['global']['bar'].InvokedAsContr) {
		$Γ['global']['bar'].$this.Σ = $Γ['global']['bar'].$this.Σ >= $old_pc.l ? $Γ['global']['bar'].$this.Σ : $old_pc.l;
		$Λ[$Λ.length - 1] = { 'l': $Γ['global']['bar'].$this };
	} else {
		$Λ[$Λ.length - 1] = { 'l': $old_pc.l };
	}
	return;
}
$rf = $scope($Γ['global'], 'bar', false)['bar'];
$rf.scope = $Γ['global'];
$rf.$this = $Γ['global'];
$rf['pwd'] = sec_lvl('pass', null, true, $Γ['global']) >= $Λ[$Λ.length - 1].l ? sec_lvl('pass', null, true, $Γ['global']) : $Λ[$Λ.length - 1].l;
$Λ.push({
	l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
	id: 'FUNC'
});
$tmp0 = bar(pass);
$Γ['global']['$tmp0'] = $Λ.pop().l;
$Γ['global']['$tmp0'] instanceof Object ? $Γ['global']['$tmp0'].Σ = $Γ['global']['$tmp0'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp0'] = $Γ['global']['$tmp0'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp0'] : $Λ[$Λ.length - 1].l;
$tmp1 = $output('i',i,$Γ['global'],0,'suppress',$Λ[$Λ.length - 1].l );
