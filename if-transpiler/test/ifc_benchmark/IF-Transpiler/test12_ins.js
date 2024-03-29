
/*
 * @b_sayed:Important Note: this file must be executed using v8
 * (or any other standard JavaScript engine) but not NodeJS.
 * NodeJS implements the semantics of 'this' for the global scope differently.
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
$Γ['global']['chkpassword'] = {
	$fscope: $Λ[$Λ.length - 1].l,
	prototype: { Σ: $Λ[$Λ.length - 1].l },
	Σ: $Λ[$Λ.length - 1].l,
	scope: $Γ['global'],
	pwd: $Λ[$Λ.length - 1].l
};
var pass, j, $tmp0, $tmp1;
$Γ['global']['$tmp1'] = $Γ['global']['$tmp0'] = $Γ['global']['j'] = $Γ['global']['pass'] = 0;
pass = 'temp1234';
$Γ['global']['pass'] = 1;

$Γ['global']['pass'] instanceof Object ? $Γ['global']['pass'].Σ = $Γ['global']['pass'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['pass'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['pass'] = $Γ['global']['pass'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['pass'] : $Λ[$Λ.length - 1].l;
j = 0;
$Γ['global']['j'] = $Λ[$Λ.length - 1].l;
$Γ['global']['j'] instanceof Object ? $Γ['global']['j'].Σ = $Γ['global']['j'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['j'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['j'] = $Γ['global']['j'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['j'] : $Λ[$Λ.length - 1].l;
function chkpassword(pwd) {
	var j, $tmp2, $tmp4, $tmp5;
	$Γ['global']['chkpassword']['$tmp5'] = $Γ['global']['chkpassword']['$tmp4'] = $Γ['global']['chkpassword']['$tmp2'] = $Γ['global']['chkpassword']['j'] = 0;
	this.j = 0;
	$Γ['global']['chkpassword']['$this']['j'] = $Λ[$Λ.length - 1].l;
	$Γ['global']['chkpassword']['$this']['j'] instanceof Object ? $Γ['global']['chkpassword']['$this']['j'].Σ = $Γ['global']['chkpassword']['$this']['j'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$this']['j'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['chkpassword']['$this']['j'] = $Γ['global']['chkpassword']['$this']['j'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$this']['j'] : $Λ[$Λ.length - 1].l;
	$tmp2 = this.j;
	$Γ['global']['chkpassword']['$tmp2'] = sec_lvl('global', 'j', false, $Γ['global']['chkpassword']);
	$Γ['global']['chkpassword']['$tmp2'] instanceof Object ? $Γ['global']['chkpassword']['$tmp2'].Σ = $Γ['global']['chkpassword']['$tmp2'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp2'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['chkpassword']['$tmp2'] = $Γ['global']['chkpassword']['$tmp2'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp2'] : $Λ[$Λ.length - 1].l;
	$tmp5 = this.j;
	$Γ['global']['chkpassword']['$tmp5'] = sec_lvl('global', 'j', false, $Γ['global']['chkpassword']);
	$Γ['global']['chkpassword']['$tmp5'] instanceof Object ? $Γ['global']['chkpassword']['$tmp5'].Σ = $Γ['global']['chkpassword']['$tmp5'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp5'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['chkpassword']['$tmp5'] = $Γ['global']['chkpassword']['$tmp5'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp5'] : $Λ[$Λ.length - 1].l;
	$tmp4 = $tmp5 < 16;
	$Γ['global']['chkpassword']['$tmp4'] = sec_lvl('$tmp5', null, true, $Γ['global']['chkpassword']) >= $Λ[$Λ.length - 1].l ? sec_lvl('$tmp5', null, true, $Γ['global']['chkpassword']) : $Λ[$Λ.length - 1].l;
	$Γ['global']['chkpassword']['$tmp4'] instanceof Object ? $Γ['global']['chkpassword']['$tmp4'].Σ = $Γ['global']['chkpassword']['$tmp4'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp4'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['chkpassword']['$tmp4'] = $Γ['global']['chkpassword']['$tmp4'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp4'] : $Λ[$Λ.length - 1].l;
	$Λ.push({
		l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp4', null, true, $Γ['global']['chkpassword']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp4', null, true, $Γ['global']['chkpassword']),
		id: 'LOOP'
	});
	for (; $tmp4;) {
		var $tmp6, $tmp7, $tmp8, $tmp3, $tmp4, $tmp9;
		$Γ['global']['chkpassword']['$tmp9'] = $Γ['global']['chkpassword']['$tmp4'] = $Γ['global']['chkpassword']['$tmp3'] = $Γ['global']['chkpassword']['$tmp8'] = $Γ['global']['chkpassword']['$tmp7'] = $Γ['global']['chkpassword']['$tmp6'] = 0;
		$tmp7 = pwd.length;
		$Γ['global']['chkpassword']['$tmp7'] = sec_lvl('pwd', 'length', false, $Γ['global']['chkpassword']);
		$Γ['global']['chkpassword']['$tmp7'] instanceof Object ? $Γ['global']['chkpassword']['$tmp7'].Σ = $Γ['global']['chkpassword']['$tmp7'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp7'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['chkpassword']['$tmp7'] = $Γ['global']['chkpassword']['$tmp7'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp7'] : $Λ[$Λ.length - 1].l;
		$tmp8 = this.j;
		$Γ['global']['chkpassword']['$tmp8'] = sec_lvl('global', 'j', false, $Γ['global']['chkpassword']);
		$Γ['global']['chkpassword']['$tmp8'] instanceof Object ? $Γ['global']['chkpassword']['$tmp8'].Σ = $Γ['global']['chkpassword']['$tmp8'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp8'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['chkpassword']['$tmp8'] = $Γ['global']['chkpassword']['$tmp8'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp8'] : $Λ[$Λ.length - 1].l;
		$tmp6 = $tmp7 == $tmp8;
		$Γ['global']['chkpassword']['$tmp6'] = sec_lvl('$tmp7', null, true, $Γ['global']['chkpassword']) >= sec_lvl('$tmp8', null, true, $Γ['global']['chkpassword']) ? sec_lvl('$tmp7', null, true, $Γ['global']['chkpassword']) : sec_lvl('$tmp8', null, true, $Γ['global']['chkpassword']);
		$Γ['global']['chkpassword']['$tmp6'] instanceof Object ? $Γ['global']['chkpassword']['$tmp6'].Σ = $Γ['global']['chkpassword']['$tmp6'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp6'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['chkpassword']['$tmp6'] = $Γ['global']['chkpassword']['$tmp6'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp6'] : $Λ[$Λ.length - 1].l;
		$Λ.push({
			l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp6', null, true, $Γ['global']['chkpassword']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp6', null, true, $Γ['global']['chkpassword']),
			id: 'IF'
		});
		if ($tmp6) {
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
			return;
		} else {
		}
		$comp({ 'lbl': 'FUNC' }, $Λ[$Λ.length - 1].l);
		$Λ.pop();
		$tmp3 = this.j++;
		$Γ['global']['chkpassword']['$this']['j'] = sec_lvl('global', 'j', false, $Γ['global']['chkpassword']) >= $Λ[$Λ.length - 1].l ? sec_lvl('global', 'j', false, $Γ['global']['chkpassword']) : $Λ[$Λ.length - 1].l;
		$Γ['global']['chkpassword']['$tmp3'] = sec_lvl('global', 'j', false, $Γ['global']['chkpassword']);
		$Γ['global']['chkpassword']['$tmp3'] instanceof Object ? $Γ['global']['chkpassword']['$tmp3'].Σ = $Γ['global']['chkpassword']['$tmp3'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp3'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['chkpassword']['$tmp3'] = $Γ['global']['chkpassword']['$tmp3'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp3'] : $Λ[$Λ.length - 1].l;
		$tmp9 = this.j;
		$Γ['global']['chkpassword']['$tmp9'] = sec_lvl('global', 'j', false, $Γ['global']['chkpassword']);
		$Γ['global']['chkpassword']['$tmp9'] instanceof Object ? $Γ['global']['chkpassword']['$tmp9'].Σ = $Γ['global']['chkpassword']['$tmp9'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp9'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['chkpassword']['$tmp9'] = $Γ['global']['chkpassword']['$tmp9'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp9'] : $Λ[$Λ.length - 1].l;
		$tmp4 = $tmp9 < 16;
		$Γ['global']['chkpassword']['$tmp4'] = sec_lvl('$tmp9', null, true, $Γ['global']['chkpassword']) >= $Λ[$Λ.length - 1].l ? sec_lvl('$tmp9', null, true, $Γ['global']['chkpassword']) : $Λ[$Λ.length - 1].l;
		$Γ['global']['chkpassword']['$tmp4'] instanceof Object ? $Γ['global']['chkpassword']['$tmp4'].Σ = $Γ['global']['chkpassword']['$tmp4'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp4'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['chkpassword']['$tmp4'] = $Γ['global']['chkpassword']['$tmp4'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp4'] : $Λ[$Λ.length - 1].l;
	}
	$Λ.pop();
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
	return;
}
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

$tmp1 = $output('j',j,$Γ['global'],0,'suppress',$Λ[$Λ.length - 1].l);