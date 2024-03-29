
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
$Γ['global']['chkpassword'] = {
	$fscope: $Λ[$Λ.length - 1].l,
	prototype: { Σ: $Λ[$Λ.length - 1].l },
	Σ: $Λ[$Λ.length - 1].l,
	scope: $Γ['global'],
	pwd: $Λ[$Λ.length - 1].l
};
var pass, $tmp0, $tmp1;
$Γ['global']['$tmp1'] = $Γ['global']['$tmp0'] = $Γ['global']['pass'] = 0;
pass = 'temp1234';

// Higher security level variable
$Γ['global']['pass'] = 1;

$Γ['global']['pass'] instanceof Object ? $Γ['global']['pass'].Σ = $Γ['global']['pass'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['pass'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['pass'] = $Γ['global']['pass'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['pass'] : $Λ[$Λ.length - 1].l;
function chkpassword(pwd) {

	var j, $tmp3;
	$Γ['global']['chkpassword']['$tmp3'] = $Γ['global']['chkpassword']['j'] = 0;
	j = 0;
	$scope($Γ['global']['chkpassword'], 'j', true)['j'] = $Λ[$Λ.length - 1].l;
	$scope($Γ['global']['chkpassword'], 'j', true)['j'] instanceof Object ? $scope($Γ['global']['chkpassword'], 'j', true)['j'].Σ = $scope($Γ['global']['chkpassword'], 'j', true)['j'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['chkpassword'], 'j', true)['j'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['chkpassword'], 'j', true)['j'] = $scope($Γ['global']['chkpassword'], 'j', true)['j'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['chkpassword'], 'j', true)['j'] : $Λ[$Λ.length - 1].l;
	$tmp3 = j < 16;
	$Γ['global']['chkpassword']['$tmp3'] = sec_lvl('j', null, true, $Γ['global']['chkpassword']) >= $Λ[$Λ.length - 1].l ? sec_lvl('j', null, true, $Γ['global']['chkpassword']) : $Λ[$Λ.length - 1].l;
	$Γ['global']['chkpassword']['$tmp3'] instanceof Object ? $Γ['global']['chkpassword']['$tmp3'].Σ = $Γ['global']['chkpassword']['$tmp3'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp3'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['chkpassword']['$tmp3'] = $Γ['global']['chkpassword']['$tmp3'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp3'] : $Λ[$Λ.length - 1].l;
	$Λ.push({
		l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp3', null, true, $Γ['global']['chkpassword']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp3', null, true, $Γ['global']['chkpassword']),
		id: 'LOOP'
	});
	for (; $tmp3;) {
		var $tmp4, $tmp5, $tmp2, $tmp3;
		$Γ['global']['chkpassword']['$tmp3'] = $Γ['global']['chkpassword']['$tmp2'] = $Γ['global']['chkpassword']['$tmp5'] = $Γ['global']['chkpassword']['$tmp4'] = 0;
		$tmp5 = pwd.length;
		$Γ['global']['chkpassword']['$tmp5'] = sec_lvl('pwd', 'length', false, $Γ['global']['chkpassword']);
		$Γ['global']['chkpassword']['$tmp5'] instanceof Object ? $Γ['global']['chkpassword']['$tmp5'].Σ = $Γ['global']['chkpassword']['$tmp5'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp5'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['chkpassword']['$tmp5'] = $Γ['global']['chkpassword']['$tmp5'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp5'] : $Λ[$Λ.length - 1].l;
		$tmp4 = $tmp5 == j;
		$Γ['global']['chkpassword']['$tmp4'] = sec_lvl('$tmp5', null, true, $Γ['global']['chkpassword']) >= sec_lvl('j', null, true, $Γ['global']['chkpassword']) ? sec_lvl('$tmp5', null, true, $Γ['global']['chkpassword']) : sec_lvl('j', null, true, $Γ['global']['chkpassword']);
		$Γ['global']['chkpassword']['$tmp4'] instanceof Object ? $Γ['global']['chkpassword']['$tmp4'].Σ = $Γ['global']['chkpassword']['$tmp4'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp4'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['chkpassword']['$tmp4'] = $Γ['global']['chkpassword']['$tmp4'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp4'] : $Λ[$Λ.length - 1].l;
		$Λ.push({
			l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp4', null, true, $Γ['global']['chkpassword']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp4', null, true, $Γ['global']['chkpassword']),
			id: 'IF'
		});
		if ($tmp4) {
			$old_pc = $pc();
			while ($pc().id !== 'FUNC') {
				$Λ.pop();
			}
			$rx = $scope($Γ['global']['chkpassword'], 'j')['j'];
			if ($rx instanceof Object) {
				$rx.Σ = $rx.Σ >= $old_pc.l ? $rx.Σ : $old_pc.l;
				$Λ[$Λ.length - 1] = { 'l': $rx };
			} else {
				if ($Γ['global']['chkpassword'].InvokedAsContr) {
					$Γ['global']['chkpassword'].$this.Σ = $Γ['global']['chkpassword'].$this.Σ >= $old_pc.l ? $Γ['global']['chkpassword'].$this.Σ : $old_pc.l;
					$Λ[$Λ.length - 1] = { 'l': $Γ['global']['chkpassword'].$this };
				} else {
					$Λ[$Λ.length - 1] = { 'l': $old_pc.l };
				}
			}
			return j;
		} else {
		}
		$comp({ 'lbl': 'FUNC' }, $Λ[$Λ.length - 1].l);
		$Λ.pop();
		$tmp2 = j++;
		$Γ['global']['chkpassword']['$tmp2'] = sec_lvl('j', null, false, $Γ['global']['chkpassword']);
		$Γ['global']['chkpassword']['$tmp2'] instanceof Object ? $Γ['global']['chkpassword']['$tmp2'].Σ = $Γ['global']['chkpassword']['$tmp2'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp2'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['chkpassword']['$tmp2'] = $Γ['global']['chkpassword']['$tmp2'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp2'] : $Λ[$Λ.length - 1].l;
		$tmp3 = j < 16;
		$Γ['global']['chkpassword']['$tmp3'] = sec_lvl('j', null, true, $Γ['global']['chkpassword']) >= $Λ[$Λ.length - 1].l ? sec_lvl('j', null, true, $Γ['global']['chkpassword']) : $Λ[$Λ.length - 1].l;
		$Γ['global']['chkpassword']['$tmp3'] instanceof Object ? $Γ['global']['chkpassword']['$tmp3'].Σ = $Γ['global']['chkpassword']['$tmp3'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp3'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['chkpassword']['$tmp3'] = $Γ['global']['chkpassword']['$tmp3'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp3'] : $Λ[$Λ.length - 1].l;
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
$tmp1 = chkpassword(pass);
$Γ['global']['$tmp1'] = $Λ.pop().l;
$Γ['global']['$tmp1'] instanceof Object ? $Γ['global']['$tmp1'].Σ = $Γ['global']['$tmp1'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp1'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['$tmp1'] = $Γ['global']['$tmp1'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['$tmp1'] : $Λ[$Λ.length - 1].l;

$tmp0 = $output('$tmp1',$tmp1,$Γ['global'],0,'suppress',$Λ[$Λ.length - 1].l);