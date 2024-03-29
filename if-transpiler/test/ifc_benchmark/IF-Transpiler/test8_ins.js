
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
	var array, i, $tmp2, j, $tmp4, k, $tmp6;
	$Γ['global']['chkpassword']['$tmp6'] = $Γ['global']['chkpassword']['k'] = $Γ['global']['chkpassword']['$tmp4'] = $Γ['global']['chkpassword']['j'] = $Γ['global']['chkpassword']['$tmp2'] = $Γ['global']['chkpassword']['i'] = $Γ['global']['chkpassword']['array'] = 0;
	array = [];
	$Γ['global']['chkpassword']['array'] = {
		__proto__: {},
		scope: $Γ['global']['chkpassword'],
		Σ: $Λ[$Λ.length - 1].l
	};
	i = 0;
	$scope($Γ['global']['chkpassword'], 'i', true)['i']['i'] = $Λ[$Λ.length - 1].l;
	$scope($Γ['global']['chkpassword'], 'i', true)['i']['i'] instanceof Object ? $scope($Γ['global']['chkpassword'], 'i', true)['i']['i'].Σ = $scope($Γ['global']['chkpassword'], 'i', true)['i']['i'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['chkpassword'], 'i', true)['i']['i'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['chkpassword'], 'i', true)['i']['i'] = $scope($Γ['global']['chkpassword'], 'i', true)['i']['i'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['chkpassword'], 'i', true)['i']['i'] : $Λ[$Λ.length - 1].l;
	$tmp2 = i < 16;
	$Γ['global']['chkpassword']['$tmp2'] = sec_lvl('i', null, true, $Γ['global']['chkpassword']) >= $Λ[$Λ.length - 1].l ? sec_lvl('i', null, true, $Γ['global']['chkpassword']) : $Λ[$Λ.length - 1].l;
	$Γ['global']['chkpassword']['$tmp2'] instanceof Object ? $Γ['global']['chkpassword']['$tmp2'].Σ = $Γ['global']['chkpassword']['$tmp2'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp2'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['chkpassword']['$tmp2'] = $Γ['global']['chkpassword']['$tmp2'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp2'] : $Λ[$Λ.length - 1].l;
	$Λ.push({
		l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp2', null, true, $Γ['global']['chkpassword']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp2', null, true, $Γ['global']['chkpassword']),
		id: 'LOOP'
	});
	for (; $tmp2;) {
		array[i] = true;
		$scope($Γ['global']['chkpassword'], 'array', false)['array'][i] = $Λ[$Λ.length - 1].l;
		_$tmp = sec_lvl('i', null, false, $Γ['global']['chkpassword']) instanceof Object ? sec_lvl('i', null, false, $Γ['global']['chkpassword']).Σ : sec_lvl('i', null, false, $Γ['global']['chkpassword']);
		$scope($Γ['global']['chkpassword'], 'array', false)['array'][i] instanceof Object ? $scope($Γ['global']['chkpassword'], 'array', false)['array'][i].Σ = $lub($scope($Γ['global']['chkpassword'], 'array', false)['array'][i].Σ, _$tmp, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['chkpassword'], 'array', false)['array'][i] = $lub($scope($Γ['global']['chkpassword'], 'array', false)['array'][i], _$tmp, $Λ[$Λ.length - 1].l);
		var $tmp1, $tmp2;
		$Γ['global']['chkpassword']['$tmp2'] = $Γ['global']['chkpassword']['$tmp1'] = 0;
		$tmp1 = i++;
		$Γ['global']['chkpassword']['$tmp1'] = sec_lvl('i', null, false, $Γ['global']['chkpassword']);
		$Γ['global']['chkpassword']['$tmp1'] instanceof Object ? $Γ['global']['chkpassword']['$tmp1'].Σ = $Γ['global']['chkpassword']['$tmp1'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp1'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['chkpassword']['$tmp1'] = $Γ['global']['chkpassword']['$tmp1'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp1'] : $Λ[$Λ.length - 1].l;
		$tmp2 = i < 16;
		$Γ['global']['chkpassword']['$tmp2'] = sec_lvl('i', null, true, $Γ['global']['chkpassword']) >= $Λ[$Λ.length - 1].l ? sec_lvl('i', null, true, $Γ['global']['chkpassword']) : $Λ[$Λ.length - 1].l;
		$Γ['global']['chkpassword']['$tmp2'] instanceof Object ? $Γ['global']['chkpassword']['$tmp2'].Σ = $Γ['global']['chkpassword']['$tmp2'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp2'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['chkpassword']['$tmp2'] = $Γ['global']['chkpassword']['$tmp2'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp2'] : $Λ[$Λ.length - 1].l;
	}
	$Λ.pop();
	j = 0;
	$scope($Γ['global']['chkpassword'], 'j', true)['j']['j'] = $Λ[$Λ.length - 1].l;
	$scope($Γ['global']['chkpassword'], 'j', true)['j']['j'] instanceof Object ? $scope($Γ['global']['chkpassword'], 'j', true)['j']['j'].Σ = $scope($Γ['global']['chkpassword'], 'j', true)['j']['j'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['chkpassword'], 'j', true)['j']['j'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['chkpassword'], 'j', true)['j']['j'] = $scope($Γ['global']['chkpassword'], 'j', true)['j']['j'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['chkpassword'], 'j', true)['j']['j'] : $Λ[$Λ.length - 1].l;
	$tmp4 = j < 16;
	$Γ['global']['chkpassword']['$tmp4'] = sec_lvl('j', null, true, $Γ['global']['chkpassword']) >= $Λ[$Λ.length - 1].l ? sec_lvl('j', null, true, $Γ['global']['chkpassword']) : $Λ[$Λ.length - 1].l;
	$Γ['global']['chkpassword']['$tmp4'] instanceof Object ? $Γ['global']['chkpassword']['$tmp4'].Σ = $Γ['global']['chkpassword']['$tmp4'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp4'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['chkpassword']['$tmp4'] = $Γ['global']['chkpassword']['$tmp4'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp4'] : $Λ[$Λ.length - 1].l;
	$Λ.push({
		l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp4', null, true, $Γ['global']['chkpassword']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp4', null, true, $Γ['global']['chkpassword']),
		id: 'LOOP'
	});
	for (; $tmp4;) {
		var $tmp7, $tmp8, $tmp3, $tmp4;
		$Γ['global']['chkpassword']['$tmp4'] = $Γ['global']['chkpassword']['$tmp3'] = $Γ['global']['chkpassword']['$tmp8'] = $Γ['global']['chkpassword']['$tmp7'] = 0;
		$tmp8 = pwd.length;
		$Γ['global']['chkpassword']['$tmp8'] = sec_lvl('pwd', 'length', false, $Γ['global']['chkpassword']);
		$Γ['global']['chkpassword']['$tmp8'] instanceof Object ? $Γ['global']['chkpassword']['$tmp8'].Σ = $Γ['global']['chkpassword']['$tmp8'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp8'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['chkpassword']['$tmp8'] = $Γ['global']['chkpassword']['$tmp8'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp8'] : $Λ[$Λ.length - 1].l;
		$tmp7 = $tmp8 == j;
		$Γ['global']['chkpassword']['$tmp7'] = sec_lvl('$tmp8', null, true, $Γ['global']['chkpassword']) >= sec_lvl('j', null, true, $Γ['global']['chkpassword']) ? sec_lvl('$tmp8', null, true, $Γ['global']['chkpassword']) : sec_lvl('j', null, true, $Γ['global']['chkpassword']);
		$Γ['global']['chkpassword']['$tmp7'] instanceof Object ? $Γ['global']['chkpassword']['$tmp7'].Σ = $Γ['global']['chkpassword']['$tmp7'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp7'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['chkpassword']['$tmp7'] = $Γ['global']['chkpassword']['$tmp7'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp7'] : $Λ[$Λ.length - 1].l;
		$Λ.push({
			l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp7', null, true, $Γ['global']['chkpassword']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp7', null, true, $Γ['global']['chkpassword']),
			id: 'IF'
		});
		if ($tmp7) {
			var $tmp3, $tmp4;
			$Γ['global']['chkpassword']['$tmp4'] = $Γ['global']['chkpassword']['$tmp3'] = 0;
			$tmp3 = j++;
			$Γ['global']['chkpassword']['$tmp3'] = sec_lvl('j', null, false, $Γ['global']['chkpassword']);
			$Γ['global']['chkpassword']['$tmp3'] instanceof Object ? $Γ['global']['chkpassword']['$tmp3'].Σ = $Γ['global']['chkpassword']['$tmp3'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp3'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['chkpassword']['$tmp3'] = $Γ['global']['chkpassword']['$tmp3'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp3'] : $Λ[$Λ.length - 1].l;
			$tmp4 = j < 16;
			$Γ['global']['chkpassword']['$tmp4'] = sec_lvl('j', null, true, $Γ['global']['chkpassword']) >= $Λ[$Λ.length - 1].l ? sec_lvl('j', null, true, $Γ['global']['chkpassword']) : $Λ[$Λ.length - 1].l;
			$Γ['global']['chkpassword']['$tmp4'] instanceof Object ? $Γ['global']['chkpassword']['$tmp4'].Σ = $Γ['global']['chkpassword']['$tmp4'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp4'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['chkpassword']['$tmp4'] = $Γ['global']['chkpassword']['$tmp4'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp4'] : $Λ[$Λ.length - 1].l;
			continue;
		} else {
		}
		$comp({ 'lbl': 'LOOP' }, $Λ[$Λ.length - 1].l);
		$Λ.pop();
		array[j] = false;
		$scope($Γ['global']['chkpassword'], 'array', false)['array'][j] = $Λ[$Λ.length - 1].l;
		_$tmp = sec_lvl('j', null, false, $Γ['global']['chkpassword']) instanceof Object ? sec_lvl('j', null, false, $Γ['global']['chkpassword']).Σ : sec_lvl('j', null, false, $Γ['global']['chkpassword']);
		$scope($Γ['global']['chkpassword'], 'array', false)['array'][j] instanceof Object ? $scope($Γ['global']['chkpassword'], 'array', false)['array'][j].Σ = $lub($scope($Γ['global']['chkpassword'], 'array', false)['array'][j].Σ, _$tmp, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['chkpassword'], 'array', false)['array'][j] = $lub($scope($Γ['global']['chkpassword'], 'array', false)['array'][j], _$tmp, $Λ[$Λ.length - 1].l);
		$tmp3 = j++;
		$Γ['global']['chkpassword']['$tmp3'] = sec_lvl('j', null, false, $Γ['global']['chkpassword']);
		$Γ['global']['chkpassword']['$tmp3'] instanceof Object ? $Γ['global']['chkpassword']['$tmp3'].Σ = $Γ['global']['chkpassword']['$tmp3'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp3'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['chkpassword']['$tmp3'] = $Γ['global']['chkpassword']['$tmp3'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp3'] : $Λ[$Λ.length - 1].l;
		$tmp4 = j < 16;
		$Γ['global']['chkpassword']['$tmp4'] = sec_lvl('j', null, true, $Γ['global']['chkpassword']) >= $Λ[$Λ.length - 1].l ? sec_lvl('j', null, true, $Γ['global']['chkpassword']) : $Λ[$Λ.length - 1].l;
		$Γ['global']['chkpassword']['$tmp4'] instanceof Object ? $Γ['global']['chkpassword']['$tmp4'].Σ = $Γ['global']['chkpassword']['$tmp4'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp4'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['chkpassword']['$tmp4'] = $Γ['global']['chkpassword']['$tmp4'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp4'] : $Λ[$Λ.length - 1].l;
	}
	$Λ.pop();
	k = 0;
	$scope($Γ['global']['chkpassword'], 'k', true)['k']['k'] = $Λ[$Λ.length - 1].l;
	$scope($Γ['global']['chkpassword'], 'k', true)['k']['k'] instanceof Object ? $scope($Γ['global']['chkpassword'], 'k', true)['k']['k'].Σ = $scope($Γ['global']['chkpassword'], 'k', true)['k']['k'].Σ >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['chkpassword'], 'k', true)['k']['k'].Σ : $Λ[$Λ.length - 1].l : $scope($Γ['global']['chkpassword'], 'k', true)['k']['k'] = $scope($Γ['global']['chkpassword'], 'k', true)['k']['k'] >= $Λ[$Λ.length - 1].l ? $scope($Γ['global']['chkpassword'], 'k', true)['k']['k'] : $Λ[$Λ.length - 1].l;
	$tmp6 = k < 16;
	$Γ['global']['chkpassword']['$tmp6'] = sec_lvl('k', null, true, $Γ['global']['chkpassword']) >= $Λ[$Λ.length - 1].l ? sec_lvl('k', null, true, $Γ['global']['chkpassword']) : $Λ[$Λ.length - 1].l;
	$Γ['global']['chkpassword']['$tmp6'] instanceof Object ? $Γ['global']['chkpassword']['$tmp6'].Σ = $Γ['global']['chkpassword']['$tmp6'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp6'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['chkpassword']['$tmp6'] = $Γ['global']['chkpassword']['$tmp6'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp6'] : $Λ[$Λ.length - 1].l;
	$Λ.push({
		l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp6', null, true, $Γ['global']['chkpassword']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp6', null, true, $Γ['global']['chkpassword']),
		id: 'LOOP'
	});
	for (; $tmp6;) {
		var $tmp9, $tmp5, $tmp6;
		$Γ['global']['chkpassword']['$tmp6'] = $Γ['global']['chkpassword']['$tmp5'] = $Γ['global']['chkpassword']['$tmp9'] = 0;
		$tmp9 = array[k];
		$Γ['global']['chkpassword']['$tmp9'] = sec_lvl('array', k, false, $Γ['global']['chkpassword']);
		$Γ['global']['chkpassword']['$tmp9'] instanceof Object ? $Γ['global']['chkpassword']['$tmp9'].Σ = $Γ['global']['chkpassword']['$tmp9'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp9'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['chkpassword']['$tmp9'] = $Γ['global']['chkpassword']['$tmp9'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp9'] : $Λ[$Λ.length - 1].l;
		$Λ.push({
			l: $Λ[$Λ.length - 1].l >= sec_lvl('$tmp9', null, true, $Γ['global']['chkpassword']) ? $Λ[$Λ.length - 1].l : sec_lvl('$tmp9', null, true, $Γ['global']['chkpassword']),
			id: 'IF'
		});
		if ($tmp9) {
			var $tmp10;
			$Γ['global']['chkpassword']['$tmp10'] = 0;
			$tmp10 = $output('k',k,$Γ['global']['chkpassword'],0,'suppress',$Λ[$Λ.length - 1].l);
		} else {
			$upgrade(['$tmp10'], $Λ[$Λ.length - 1].l, $Γ['global']['chkpassword']);
		}
		$Λ.pop();
		$tmp5 = k++;
		$Γ['global']['chkpassword']['$tmp5'] = sec_lvl('k', null, false, $Γ['global']['chkpassword']);
		$Γ['global']['chkpassword']['$tmp5'] instanceof Object ? $Γ['global']['chkpassword']['$tmp5'].Σ = $Γ['global']['chkpassword']['$tmp5'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp5'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['chkpassword']['$tmp5'] = $Γ['global']['chkpassword']['$tmp5'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp5'] : $Λ[$Λ.length - 1].l;
		$tmp6 = k < 16;
		$Γ['global']['chkpassword']['$tmp6'] = sec_lvl('k', null, true, $Γ['global']['chkpassword']) >= $Λ[$Λ.length - 1].l ? sec_lvl('k', null, true, $Γ['global']['chkpassword']) : $Λ[$Λ.length - 1].l;
		$Γ['global']['chkpassword']['$tmp6'] instanceof Object ? $Γ['global']['chkpassword']['$tmp6'].Σ = $Γ['global']['chkpassword']['$tmp6'].Σ >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp6'].Σ : $Λ[$Λ.length - 1].l : $Γ['global']['chkpassword']['$tmp6'] = $Γ['global']['chkpassword']['$tmp6'] >= $Λ[$Λ.length - 1].l ? $Γ['global']['chkpassword']['$tmp6'] : $Λ[$Λ.length - 1].l;
	}
	$upgrade(['$tmp10'], $Λ[$Λ.length - 1].l, $Γ['global']['chkpassword']);
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

    //$output('pwd',pwd,$Γ['global']['chkpassword'],0,'suppress',$Λ[$Λ.length - 1].l);

    return;
}