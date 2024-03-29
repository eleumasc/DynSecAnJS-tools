
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

// This is a JavaScript implementation of the Richards
// benchmark from:
//
//    http://www.cl.cam.ac.uk/~mr10/Bench.html
//
// The benchmark was originally implemented in BCPL by
// Martin Richards.



/**
 * The Richards benchmark simulates the task dispatcher of an
 * operating system.
 **/


$Γ['global']['Packet'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    link: $Λ[$Λ.length - 1].l,
    id: $Λ[$Λ.length - 1].l,
    kind: $Λ[$Λ.length - 1].l
};
$Γ['global']['HandlerTask'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    scheduler: $Λ[$Λ.length - 1].l
};
$Γ['global']['WorkerTask'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    scheduler: $Λ[$Λ.length - 1].l,
    v1: $Λ[$Λ.length - 1].l,
    v2: $Λ[$Λ.length - 1].l
};
$Γ['global']['DeviceTask'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    scheduler: $Λ[$Λ.length - 1].l
};
$Γ['global']['IdleTask'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    scheduler: $Λ[$Λ.length - 1].l,
    v1: $Λ[$Λ.length - 1].l,
    count: $Λ[$Λ.length - 1].l
};
$Γ['global']['TaskControlBlock'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    link: $Λ[$Λ.length - 1].l,
    id: $Λ[$Λ.length - 1].l,
    priority: $Λ[$Λ.length - 1].l,
    queue: $Λ[$Λ.length - 1].l,
    task: $Λ[$Λ.length - 1].l
};
$Γ['global']['Scheduler'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$Γ['global']['runRichards'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
function runRichards() {
    var scheduler, $tmp8, queue, $tmp9, $tmp10, $tmp11, $tmp12, $tmp13, $tmp14, $tmp15, $tmp16, $tmp17, $tmp18, $tmp19;
    $Γ['global']['runRichards']['$tmp19'] = $Γ['global']['runRichards']['$tmp18'] = $Γ['global']['runRichards']['$tmp17'] = $Γ['global']['runRichards']['$tmp16'] = $Γ['global']['runRichards']['$tmp15'] = $Γ['global']['runRichards']['$tmp14'] = $Γ['global']['runRichards']['$tmp13'] = $Γ['global']['runRichards']['$tmp12'] = $Γ['global']['runRichards']['$tmp11'] = $Γ['global']['runRichards']['$tmp10'] = $Γ['global']['runRichards']['$tmp9'] = $Γ['global']['runRichards']['queue'] = $Γ['global']['runRichards']['$tmp8'] = $Γ['global']['runRichards']['scheduler'] = 0;
    $rf = $scope($Γ['global']['runRichards'], 'Scheduler', false)['Scheduler'];
    $rf.scope = $Γ['global']['runRichards'];
    $rf.$this = {
        Σ: $Λ[$Λ.length - 1].l,
        __$proto__: $rf.prototype
    };
    $rf.InvokedAsContr = true;
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    scheduler = new Scheduler();
    $scope($Γ['global']['runRichards'], 'Scheduler', true)['Scheduler'] = $Λ.pop().l;
    $scope($Γ['global']['runRichards'], 'Scheduler', true)['Scheduler'] instanceof Object ? $scope($Γ['global']['runRichards'], 'Scheduler', true)['Scheduler'].Σ = $lub($scope($Γ['global']['runRichards'], 'Scheduler', true)['Scheduler'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['runRichards'], 'Scheduler', true)['Scheduler'] = $lub($scope($Γ['global']['runRichards'], 'Scheduler', true)['Scheduler'], $Λ[$Λ.length - 1].l);
    $rf = $prop('$tmp0', 'addIdleTask', $Γ['global']['runRichards']);
    $rf.scope = $Γ['global']['runRichards'];
    $rf.$this = $Γ['global']['Scheduler'];
    $rf['id'] = $lub(sec_lvl('ID_IDLE', null, true, $Γ['global']['runRichards']), $Λ[$Λ.length - 1].l);
    $rf['priority'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
    $rf['queue'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
    $rf['count'] = $lub(sec_lvl('COUNT', null, true, $Γ['global']['runRichards']), $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp8 = scheduler.addIdleTask(ID_IDLE, 0, null, COUNT);
    $Γ['global']['runRichards']['$tmp8'] = $Λ.pop().l;
    $Γ['global']['runRichards']['$tmp8'] instanceof Object ? $Γ['global']['runRichards']['$tmp8'].Σ = $lub($Γ['global']['runRichards']['$tmp8'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['runRichards']['$tmp8'] = $lub($Γ['global']['runRichards']['$tmp8'], $Λ[$Λ.length - 1].l);
    $rf = $scope($Γ['global']['runRichards'], 'Packet', false)['Packet'];
    $rf.scope = $Γ['global']['runRichards'];
    $rf.$this = {
        Σ: $Λ[$Λ.length - 1].l,
        __$proto__: $rf.prototype
    };
    $rf['link'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
    $rf['id'] = $lub(sec_lvl('ID_WORKER', null, true, $Γ['global']['runRichards']), $Λ[$Λ.length - 1].l);
    $rf['kind'] = $lub(sec_lvl('KIND_WORK', null, true, $Γ['global']['runRichards']), $Λ[$Λ.length - 1].l);
    $rf.InvokedAsContr = true;
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    queue = new Packet(null, ID_WORKER, KIND_WORK);
    $scope($Γ['global']['runRichards'], 'queue', true)['queue'] = $Λ.pop().l;
    $scope($Γ['global']['runRichards'], 'queue', true)['queue'] instanceof Object ? $scope($Γ['global']['runRichards'], 'queue', true)['queue'].Σ = $lub($scope($Γ['global']['runRichards'], 'queue', true)['queue'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['runRichards'], 'queue', true)['queue'] = $lub($scope($Γ['global']['runRichards'], 'queue', true)['queue'], $Λ[$Λ.length - 1].l);
    $rf = $scope($Γ['global']['runRichards'], 'Packet', false)['Packet'];
    $rf.scope = $Γ['global']['runRichards'];
    $rf.$this = {
        Σ: $Λ[$Λ.length - 1].l,
        __$proto__: $rf.prototype
    };
    $rf['link'] = $lub(sec_lvl('queue', null, true, $Γ['global']['runRichards']), $Λ[$Λ.length - 1].l);
    $rf['id'] = $lub(sec_lvl('ID_WORKER', null, true, $Γ['global']['runRichards']), $Λ[$Λ.length - 1].l);
    $rf['kind'] = $lub(sec_lvl('KIND_WORK', null, true, $Γ['global']['runRichards']), $Λ[$Λ.length - 1].l);
    $rf.InvokedAsContr = true;
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    queue = new Packet(queue, ID_WORKER, KIND_WORK);
    $scope($Γ['global']['runRichards'], 'queue', true)['queue'] = $Λ.pop().l;
    $scope($Γ['global']['runRichards'], 'queue', true)['queue'] instanceof Object ? $scope($Γ['global']['runRichards'], 'queue', true)['queue'].Σ = $lub($scope($Γ['global']['runRichards'], 'queue', true)['queue'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['runRichards'], 'queue', true)['queue'] = $lub($scope($Γ['global']['runRichards'], 'queue', true)['queue'], $Λ[$Λ.length - 1].l);
    $rf = $prop('$tmp0', 'addWorkerTask', $Γ['global']['runRichards']);
    $rf.scope = $Γ['global']['runRichards'];
    $rf.$this = $scope($Γ['global']['runRichards'], 'Scheduler', false)['Scheduler'];
    $rf['id'] = $lub(sec_lvl('ID_WORKER', null, true, $Γ['global']['runRichards']), $Λ[$Λ.length - 1].l);
    $rf['priority'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
    $rf['queue'] = $lub(sec_lvl('queue', null, true, $Γ['global']['runRichards']), $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp9 = scheduler.addWorkerTask(ID_WORKER, 1000, queue);
    $Γ['global']['runRichards']['$tmp9'] = $Λ.pop().l;
    $Γ['global']['runRichards']['$tmp9'] instanceof Object ? $Γ['global']['runRichards']['$tmp9'].Σ = $lub($Γ['global']['runRichards']['$tmp9'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['runRichards']['$tmp9'] = $lub($Γ['global']['runRichards']['$tmp9'], $Λ[$Λ.length - 1].l);
    $rf = $scope($Γ['global']['runRichards'], 'Packet', false)['Packet'];
    $rf.scope = $Γ['global']['runRichards'];
    $rf.$this = {
        Σ: $Λ[$Λ.length - 1].l,
        __$proto__: $rf.prototype
    };
    $rf['link'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
    $rf['id'] = $lub(sec_lvl('ID_DEVICE_A', null, true, $Γ['global']['runRichards']), $Λ[$Λ.length - 1].l);
    $rf['kind'] = $lub(sec_lvl('KIND_DEVICE', null, true, $Γ['global']['runRichards']), $Λ[$Λ.length - 1].l);
    $rf.InvokedAsContr = true;
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    queue = new Packet(null, ID_DEVICE_A, KIND_DEVICE);
    $scope($Γ['global']['runRichards'], 'queue', true)['queue'] = $Λ.pop().l;
    $scope($Γ['global']['runRichards'], 'queue', true)['queue'] instanceof Object ? $scope($Γ['global']['runRichards'], 'queue', true)['queue'].Σ = $lub($scope($Γ['global']['runRichards'], 'queue', true)['queue'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['runRichards'], 'queue', true)['queue'] = $lub($scope($Γ['global']['runRichards'], 'queue', true)['queue'], $Λ[$Λ.length - 1].l);
    $rf = $scope($Γ['global']['runRichards'], 'Packet', false)['Packet'];
    $rf.scope = $Γ['global']['runRichards'];
    $rf.$this = {
        Σ: $Λ[$Λ.length - 1].l,
        __$proto__: $rf.prototype
    };
    $rf['link'] = $lub(sec_lvl('queue', null, true, $Γ['global']['runRichards']), $Λ[$Λ.length - 1].l);
    $rf['id'] = $lub(sec_lvl('ID_DEVICE_A', null, true, $Γ['global']['runRichards']), $Λ[$Λ.length - 1].l);
    $rf['kind'] = $lub(sec_lvl('KIND_DEVICE', null, true, $Γ['global']['runRichards']), $Λ[$Λ.length - 1].l);
    $rf.InvokedAsContr = true;
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    queue = new Packet(queue, ID_DEVICE_A, KIND_DEVICE);
    $scope($Γ['global']['runRichards'], 'queue', true)['queue'] = $Λ.pop().l;
    $scope($Γ['global']['runRichards'], 'queue', true)['queue'] instanceof Object ? $scope($Γ['global']['runRichards'], 'queue', true)['queue'].Σ = $lub($scope($Γ['global']['runRichards'], 'queue', true)['queue'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['runRichards'], 'queue', true)['queue'] = $lub($scope($Γ['global']['runRichards'], 'queue', true)['queue'], $Λ[$Λ.length - 1].l);
    $rf = $scope($Γ['global']['runRichards'], 'Packet', false)['Packet'];
    $rf.scope = $Γ['global']['runRichards'];
    $rf.$this = {
        Σ: $Λ[$Λ.length - 1].l,
        __$proto__: $rf.prototype
    };
    $rf['link'] = $lub(sec_lvl('queue', null, true, $Γ['global']['runRichards']), $Λ[$Λ.length - 1].l);
    $rf['id'] = $lub(sec_lvl('ID_DEVICE_A', null, true, $Γ['global']['runRichards']), $Λ[$Λ.length - 1].l);
    $rf['kind'] = $lub(sec_lvl('KIND_DEVICE', null, true, $Γ['global']['runRichards']), $Λ[$Λ.length - 1].l);
    $rf.InvokedAsContr = true;
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    queue = new Packet(queue, ID_DEVICE_A, KIND_DEVICE);
    $scope($Γ['global']['runRichards'], 'queue', true)['queue'] = $Λ.pop().l;
    $scope($Γ['global']['runRichards'], 'queue', true)['queue'] instanceof Object ? $scope($Γ['global']['runRichards'], 'queue', true)['queue'].Σ = $lub($scope($Γ['global']['runRichards'], 'queue', true)['queue'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['runRichards'], 'queue', true)['queue'] = $lub($scope($Γ['global']['runRichards'], 'queue', true)['queue'], $Λ[$Λ.length - 1].l);
    $rf = $prop('$tmp0', 'addHandlerTask', $Γ['global']['runRichards']);
    $rf.scope = $Γ['global']['runRichards'];
    $rf.$this = $scope($Γ['global']['runRichards'], 'Scheduler', false)['Scheduler'];
    $rf['id'] = $lub(sec_lvl('ID_HANDLER_A', null, true, $Γ['global']['runRichards']), $Λ[$Λ.length - 1].l);
    $rf['priority'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
    $rf['queue'] = $lub(sec_lvl('queue', null, true, $Γ['global']['runRichards']), $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp10 = scheduler.addHandlerTask(ID_HANDLER_A, 2000, queue);
    $Γ['global']['runRichards']['$tmp10'] = $Λ.pop().l;
    $Γ['global']['runRichards']['$tmp10'] instanceof Object ? $Γ['global']['runRichards']['$tmp10'].Σ = $lub($Γ['global']['runRichards']['$tmp10'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['runRichards']['$tmp10'] = $lub($Γ['global']['runRichards']['$tmp10'], $Λ[$Λ.length - 1].l);
    $rf = $scope($Γ['global']['runRichards'], 'Packet', false)['Packet'];
    $rf.scope = $Γ['global']['runRichards'];
    $rf.$this = {
        Σ: $Λ[$Λ.length - 1].l,
        __$proto__: $rf.prototype
    };
    $rf['link'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
    $rf['id'] = $lub(sec_lvl('ID_DEVICE_B', null, true, $Γ['global']['runRichards']), $Λ[$Λ.length - 1].l);
    $rf['kind'] = $lub(sec_lvl('KIND_DEVICE', null, true, $Γ['global']['runRichards']), $Λ[$Λ.length - 1].l);
    $rf.InvokedAsContr = true;
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    queue = new Packet(null, ID_DEVICE_B, KIND_DEVICE);
    $scope($Γ['global']['runRichards'], 'queue', true)['queue'] = $Λ.pop().l;
    $scope($Γ['global']['runRichards'], 'queue', true)['queue'] instanceof Object ? $scope($Γ['global']['runRichards'], 'queue', true)['queue'].Σ = $lub($scope($Γ['global']['runRichards'], 'queue', true)['queue'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['runRichards'], 'queue', true)['queue'] = $lub($scope($Γ['global']['runRichards'], 'queue', true)['queue'], $Λ[$Λ.length - 1].l);
    $rf = $scope($Γ['global']['runRichards'], 'Packet', false)['Packet'];
    $rf.scope = $Γ['global']['runRichards'];
    $rf.$this = {
        Σ: $Λ[$Λ.length - 1].l,
        __$proto__: $rf.prototype
    };
    $rf['link'] = $lub(sec_lvl('queue', null, true, $Γ['global']['runRichards']), $Λ[$Λ.length - 1].l);
    $rf['id'] = $lub(sec_lvl('ID_DEVICE_B', null, true, $Γ['global']['runRichards']), $Λ[$Λ.length - 1].l);
    $rf['kind'] = $lub(sec_lvl('KIND_DEVICE', null, true, $Γ['global']['runRichards']), $Λ[$Λ.length - 1].l);
    $rf.InvokedAsContr = true;
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    queue = new Packet(queue, ID_DEVICE_B, KIND_DEVICE);
    $scope($Γ['global']['runRichards'], 'queue', true)['queue'] = $Λ.pop().l;
    $scope($Γ['global']['runRichards'], 'queue', true)['queue'] instanceof Object ? $scope($Γ['global']['runRichards'], 'queue', true)['queue'].Σ = $lub($scope($Γ['global']['runRichards'], 'queue', true)['queue'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['runRichards'], 'queue', true)['queue'] = $lub($scope($Γ['global']['runRichards'], 'queue', true)['queue'], $Λ[$Λ.length - 1].l);
    $rf = $scope($Γ['global']['runRichards'], 'Packet', false)['Packet'];
    $rf.scope = $Γ['global']['runRichards'];
    $rf.$this = {
        Σ: $Λ[$Λ.length - 1].l,
        __$proto__: $rf.prototype
    };
    $rf['link'] = $lub(sec_lvl('queue', null, true, $Γ['global']['runRichards']), $Λ[$Λ.length - 1].l);
    $rf['id'] = $lub(sec_lvl('ID_DEVICE_B', null, true, $Γ['global']['runRichards']), $Λ[$Λ.length - 1].l);
    $rf['kind'] = $lub(sec_lvl('KIND_DEVICE', null, true, $Γ['global']['runRichards']), $Λ[$Λ.length - 1].l);
    $rf.InvokedAsContr = true;
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    queue = new Packet(queue, ID_DEVICE_B, KIND_DEVICE);
    $scope($Γ['global']['runRichards'], 'queue', true)['queue'] = $Λ.pop().l;
    $scope($Γ['global']['runRichards'], 'queue', true)['queue'] instanceof Object ? $scope($Γ['global']['runRichards'], 'queue', true)['queue'].Σ = $lub($scope($Γ['global']['runRichards'], 'queue', true)['queue'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['runRichards'], 'queue', true)['queue'] = $lub($scope($Γ['global']['runRichards'], 'queue', true)['queue'], $Λ[$Λ.length - 1].l);
    $rf = $prop('$tmp0', 'addHandlerTask', $Γ['global']['runRichards']);
    $rf.scope = $Γ['global']['runRichards'];
    $rf.$this = $scope($Γ['global']['runRichards'], 'Scheduler', false)['Scheduler'];
    $rf['id'] = $lub(sec_lvl('ID_HANDLER_B', null, true, $Γ['global']['runRichards']), $Λ[$Λ.length - 1].l);
    $rf['priority'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
    $rf['queue'] = $lub(sec_lvl('queue', null, true, $Γ['global']['runRichards']), $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp11 = scheduler.addHandlerTask(ID_HANDLER_B, 3000, queue);
    $Γ['global']['runRichards']['$tmp11'] = $Λ.pop().l;
    $Γ['global']['runRichards']['$tmp11'] instanceof Object ? $Γ['global']['runRichards']['$tmp11'].Σ = $lub($Γ['global']['runRichards']['$tmp11'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['runRichards']['$tmp11'] = $lub($Γ['global']['runRichards']['$tmp11'], $Λ[$Λ.length - 1].l);
    $rf = $prop('$tmp0', 'addDeviceTask', $Γ['global']['runRichards']);
    $rf.scope = $Γ['global']['runRichards'];
    $rf.$this = $scope($Γ['global']['runRichards'], 'Scheduler', false)['Scheduler'];
    $rf['id'] = $lub(sec_lvl('ID_DEVICE_A', null, true, $Γ['global']['runRichards']), $Λ[$Λ.length - 1].l);
    $rf['priority'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
    $rf['queue'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp12 = scheduler.addDeviceTask(ID_DEVICE_A, 4000, null);
    $Γ['global']['runRichards']['$tmp12'] = $Λ.pop().l;
    $Γ['global']['runRichards']['$tmp12'] instanceof Object ? $Γ['global']['runRichards']['$tmp12'].Σ = $lub($Γ['global']['runRichards']['$tmp12'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['runRichards']['$tmp12'] = $lub($Γ['global']['runRichards']['$tmp12'], $Λ[$Λ.length - 1].l);
    $rf = $prop('$tmp0', 'addDeviceTask', $Γ['global']['runRichards']);
    $rf.scope = $Γ['global']['runRichards'];
    $rf.$this = $scope($Γ['global']['runRichards'], 'Scheduler', false)['Scheduler'];
    $rf['id'] = $lub(sec_lvl('ID_DEVICE_B', null, true, $Γ['global']['runRichards']), $Λ[$Λ.length - 1].l);
    $rf['priority'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
    $rf['queue'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp13 = scheduler.addDeviceTask(ID_DEVICE_B, 5000, null);
    $Γ['global']['runRichards']['$tmp13'] = $Λ.pop().l;
    $Γ['global']['runRichards']['$tmp13'] instanceof Object ? $Γ['global']['runRichards']['$tmp13'].Σ = $lub($Γ['global']['runRichards']['$tmp13'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['runRichards']['$tmp13'] = $lub($Γ['global']['runRichards']['$tmp13'], $Λ[$Λ.length - 1].l);
    $rf = $prop('$tmp0', 'schedule', $Γ['global']['runRichards']);
    $rf.scope = $Γ['global']['runRichards'];
    $rf.$this = $scope($Γ['global']['runRichards'], 'Scheduler', false)['Scheduler'];
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp14 = scheduler.schedule();
    $Γ['global']['runRichards']['$tmp14'] = $Λ.pop().l;
    $Γ['global']['runRichards']['$tmp14'] instanceof Object ? $Γ['global']['runRichards']['$tmp14'].Σ = $lub($Γ['global']['runRichards']['$tmp14'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['runRichards']['$tmp14'] = $lub($Γ['global']['runRichards']['$tmp14'], $Λ[$Λ.length - 1].l);
    $tmp17 = scheduler.queueCount;
    $Γ['global']['runRichards']['$tmp17'] = sec_lvl('Scheduler', 'queueCount', false, $Γ['global']['runRichards']);
    $Γ['global']['runRichards']['$tmp17'] instanceof Object ? $Γ['global']['runRichards']['$tmp17'].Σ = $lub($Γ['global']['runRichards']['$tmp17'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['runRichards']['$tmp17'] = $lub($Γ['global']['runRichards']['$tmp17'], $Λ[$Λ.length - 1].l);
    $tmp16 = $tmp17 != EXPECTED_QUEUE_COUNT;
    $Γ['global']['runRichards']['$tmp16'] = $lub(sec_lvl('$tmp17', null, true, $Γ['global']['runRichards']), sec_lvl('EXPECTED_QUEUE_COUNT', null, true, $Γ['global']['runRichards']));
    $Γ['global']['runRichards']['$tmp16'] instanceof Object ? $Γ['global']['runRichards']['$tmp16'].Σ = $lub($Γ['global']['runRichards']['$tmp16'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['runRichards']['$tmp16'] = $lub($Γ['global']['runRichards']['$tmp16'], $Λ[$Λ.length - 1].l);
    $tmp19 = scheduler.holdCount;
    $Γ['global']['runRichards']['$tmp19'] = sec_lvl('scheduler', 'holdCount', false, $Γ['global']['runRichards']);
    $Γ['global']['runRichards']['$tmp19'] instanceof Object ? $Γ['global']['runRichards']['$tmp19'].Σ = $lub($Γ['global']['runRichards']['$tmp19'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['runRichards']['$tmp19'] = $lub($Γ['global']['runRichards']['$tmp19'], $Λ[$Λ.length - 1].l);
    $tmp18 = $tmp19 != EXPECTED_HOLD_COUNT;
    $Γ['global']['runRichards']['$tmp18'] = $lub(sec_lvl('$tmp19', null, true, $Γ['global']['runRichards']), sec_lvl('EXPECTED_HOLD_COUNT', null, true, $Γ['global']['runRichards']));
    $Γ['global']['runRichards']['$tmp18'] instanceof Object ? $Γ['global']['runRichards']['$tmp18'].Σ = $lub($Γ['global']['runRichards']['$tmp18'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['runRichards']['$tmp18'] = $lub($Γ['global']['runRichards']['$tmp18'], $Λ[$Λ.length - 1].l);
    $tmp15 = $tmp16 || $tmp18;
    $Γ['global']['runRichards']['$tmp15'] = $lub(sec_lvl('$tmp16', null, true, $Γ['global']['runRichards']), sec_lvl('$tmp18', null, true, $Γ['global']['runRichards']));
    $Γ['global']['runRichards']['$tmp15'] instanceof Object ? $Γ['global']['runRichards']['$tmp15'].Σ = $lub($Γ['global']['runRichards']['$tmp15'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['runRichards']['$tmp15'] = $lub($Γ['global']['runRichards']['$tmp15'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp15', null, true, $Γ['global']['runRichards'])),
        id: 'IF'
    });
    if ($tmp15) {
        var msg, $tmp20, $tmp21, $tmp22, $tmp23, $tmp24, $tmp25;
        $Γ['global']['runRichards']['$tmp25'] = $Γ['global']['runRichards']['$tmp24'] = $Γ['global']['runRichards']['$tmp23'] = $Γ['global']['runRichards']['$tmp22'] = $Γ['global']['runRichards']['$tmp21'] = $Γ['global']['runRichards']['$tmp20'] = $Γ['global']['runRichards']['msg'] = 0;
        $tmp23 = scheduler.queueCount;
        $Γ['global']['runRichards']['$tmp23'] = sec_lvl('scheduler', 'queueCount', false, $Γ['global']['runRichards']);
        $Γ['global']['runRichards']['$tmp23'] instanceof Object ? $Γ['global']['runRichards']['$tmp23'].Σ = $lub($Γ['global']['runRichards']['$tmp23'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['runRichards']['$tmp23'] = $lub($Γ['global']['runRichards']['$tmp23'], $Λ[$Λ.length - 1].l);
        $tmp22 = 'Error during execution: queueCount = ' + $tmp23;
        $Γ['global']['runRichards']['$tmp22'] = $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp23', null, true, $Γ['global']['runRichards']));
        $Γ['global']['runRichards']['$tmp22'] instanceof Object ? $Γ['global']['runRichards']['$tmp22'].Σ = $lub($Γ['global']['runRichards']['$tmp22'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['runRichards']['$tmp22'] = $lub($Γ['global']['runRichards']['$tmp22'], $Λ[$Λ.length - 1].l);
        $tmp21 = $tmp22 + ', holdCount = ';
        $Γ['global']['runRichards']['$tmp21'] = $lub(sec_lvl('$tmp22', null, true, $Γ['global']['runRichards']), $Λ[$Λ.length - 1].l);
        $Γ['global']['runRichards']['$tmp21'] instanceof Object ? $Γ['global']['runRichards']['$tmp21'].Σ = $lub($Γ['global']['runRichards']['$tmp21'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['runRichards']['$tmp21'] = $lub($Γ['global']['runRichards']['$tmp21'], $Λ[$Λ.length - 1].l);
        $tmp24 = scheduler.holdCount;
        $Γ['global']['runRichards']['$tmp24'] = sec_lvl('scheduler', 'holdCount', false, $Γ['global']['runRichards']);
        $Γ['global']['runRichards']['$tmp24'] instanceof Object ? $Γ['global']['runRichards']['$tmp24'].Σ = $lub($Γ['global']['runRichards']['$tmp24'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['runRichards']['$tmp24'] = $lub($Γ['global']['runRichards']['$tmp24'], $Λ[$Λ.length - 1].l);
        $tmp20 = $tmp21 + $tmp24;
        $Γ['global']['runRichards']['$tmp20'] = $lub(sec_lvl('$tmp21', null, true, $Γ['global']['runRichards']), sec_lvl('$tmp24', null, true, $Γ['global']['runRichards']));
        $Γ['global']['runRichards']['$tmp20'] instanceof Object ? $Γ['global']['runRichards']['$tmp20'].Σ = $lub($Γ['global']['runRichards']['$tmp20'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['runRichards']['$tmp20'] = $lub($Γ['global']['runRichards']['$tmp20'], $Λ[$Λ.length - 1].l);
        msg = $tmp20 + '.';
        $scope($Γ['global']['runRichards'], 'msg', true)['msg'] = $lub(sec_lvl('$tmp20', null, true, $Γ['global']['runRichards']), $Λ[$Λ.length - 1].l);
        $scope($Γ['global']['runRichards'], 'msg', true)['msg'] instanceof Object ? $scope($Γ['global']['runRichards'], 'msg', true)['msg'].Σ = $lub($scope($Γ['global']['runRichards'], 'msg', true)['msg'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['runRichards'], 'msg', true)['msg'] = $lub($scope($Γ['global']['runRichards'], 'msg', true)['msg'], $Λ[$Λ.length - 1].l);
        $tmp25 = new Error(msg);
        $old_pc = $pc();
        while ($pc().id !== 'FUNC' && $pc().id !== 'TRY') {
            $Λ.pop();
        }
        $Λ[$Λ.length - 1] = { 'l': $lub($old_pc.l, sec_lvl('$tmp25', null, true, $Γ['global']['runRichards'])) };
        throw $tmp25;
        var $shouldComp = { 'lbl': 'FUNC' };
    } else {
        $upgrade([
            'Error',
            '$tmp25'
        ], $Λ[$Λ.length - 1].l, $Γ['global']['runRichards']);
    }
    if ($shouldComp)
        $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
    $Λ.pop();
    return;
}
var COUNT, EXPECTED_QUEUE_COUNT, EXPECTED_HOLD_COUNT, ID_IDLE, ID_WORKER, ID_HANDLER_A, ID_HANDLER_B, ID_DEVICE_A, ID_DEVICE_B, NUMBER_OF_IDS, KIND_DEVICE, KIND_WORK, $tmp0, STATE_RUNNING, STATE_RUNNABLE, STATE_SUSPENDED, STATE_HELD, STATE_SUSPENDED_RUNNABLE, STATE_NOT_HELD, $tmp1, $tmp2, $tmp3, $tmp4, $tmp5, DATA_SIZE, $tmp6, $tmp7;
$Γ['global']['$tmp7'] = $Γ['global']['$tmp6'] = $Γ['global']['DATA_SIZE'] = $Γ['global']['$tmp5'] = $Γ['global']['$tmp4'] = $Γ['global']['$tmp3'] = $Γ['global']['$tmp2'] = $Γ['global']['$tmp1'] = $Γ['global']['STATE_NOT_HELD'] = $Γ['global']['STATE_SUSPENDED_RUNNABLE'] = $Γ['global']['STATE_HELD'] = $Γ['global']['STATE_SUSPENDED'] = $Γ['global']['STATE_RUNNABLE'] = $Γ['global']['STATE_RUNNING'] = $Γ['global']['$tmp0'] = $Γ['global']['KIND_WORK'] = $Γ['global']['KIND_DEVICE'] = $Γ['global']['NUMBER_OF_IDS'] = $Γ['global']['ID_DEVICE_B'] = $Γ['global']['ID_DEVICE_A'] = $Γ['global']['ID_HANDLER_B'] = $Γ['global']['ID_HANDLER_A'] = $Γ['global']['ID_WORKER'] = $Γ['global']['ID_IDLE'] = $Γ['global']['EXPECTED_HOLD_COUNT'] = $Γ['global']['EXPECTED_QUEUE_COUNT'] = $Γ['global']['COUNT'] = 0;
COUNT = 1000;
$Γ['global']['COUNT'] = $Λ[$Λ.length - 1].l;
EXPECTED_QUEUE_COUNT = 2322;
$Γ['global']['EXPECTED_QUEUE_COUNT'] = $Λ[$Λ.length - 1].l;
EXPECTED_HOLD_COUNT = 928;
$Γ['global']['EXPECTED_HOLD_COUNT'] = $Λ[$Λ.length - 1].l;
function Scheduler() {
    this.queueCount = 0;
    $Γ['global']['Scheduler']['$this']['queueCount'] = $Λ[$Λ.length - 1].l;
    this.holdCount = 0;
    $Γ['global']['Scheduler']['$this']['holdCount'] = $Λ[$Λ.length - 1].l;
    this.blocks = new Array(NUMBER_OF_IDS);
    this.list = null;
    $Γ['global']['Scheduler']['$this']['list'] = $Λ[$Λ.length - 1].l;
    this.currentTcb = null;
    $Γ['global']['Scheduler']['$this']['currentTcb'] = $Λ[$Λ.length - 1].l;
    this.currentId = null;
    $Γ['global']['Scheduler']['$this']['currentId'] = $Λ[$Λ.length - 1].l;
    return;
}
ID_IDLE = 0;
$Γ['global']['ID_IDLE'] = $Λ[$Λ.length - 1].l;
ID_WORKER = 1;
$Γ['global']['ID_WORKER'] = $Λ[$Λ.length - 1].l;
ID_HANDLER_A = 2;
$Γ['global']['ID_HANDLER_A'] = $Λ[$Λ.length - 1].l;
ID_HANDLER_B = 3;
$Γ['global']['ID_HANDLER_B'] = $Λ[$Λ.length - 1].l;
ID_DEVICE_A = 4;
$Γ['global']['ID_DEVICE_A'] = $Λ[$Λ.length - 1].l;
ID_DEVICE_B = 5;
$Γ['global']['ID_DEVICE_B'] = $Λ[$Λ.length - 1].l;
NUMBER_OF_IDS = 6;
$Γ['global']['NUMBER_OF_IDS'] = $Λ[$Λ.length - 1].l;
KIND_DEVICE = 0;
$Γ['global']['KIND_DEVICE'] = $Λ[$Λ.length - 1].l;
KIND_WORK = 1;
$Γ['global']['KIND_WORK'] = $Λ[$Λ.length - 1].l;
$tmp0 = Scheduler.prototype;
$Γ['global']['$tmp0'] = sec_lvl('Scheduler', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp0'] instanceof Object ? $Γ['global']['$tmp0'].Σ = $lub($Γ['global']['$tmp0'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0'] = $lub($Γ['global']['$tmp0'], $Λ[$Λ.length - 1].l);
$tmp0.addIdleTask = function (id, priority, queue, count) {
    var $tmp26, $tmp27, $tmp28;
    $Γ['global']['$tmp0']['addIdleTask']['$tmp28'] = $Γ['global']['$tmp0']['addIdleTask']['$tmp27'] = $Γ['global']['$tmp0']['addIdleTask']['$tmp26'] = 0;
    $tmp28 = this;
    $Γ['global']['$tmp0']['addIdleTask']['$tmp28'] = $Γ['global']['$tmp0']['addIdleTask'].$this;
    $Γ['global']['$tmp0']['addIdleTask']['$tmp28'] instanceof Object ? $Γ['global']['$tmp0']['addIdleTask']['$tmp28'].Σ = $lub($Γ['global']['$tmp0']['addIdleTask']['$tmp28'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['addIdleTask']['$tmp28'] = $lub($Γ['global']['$tmp0']['addIdleTask']['$tmp28'], $Λ[$Λ.length - 1].l);
    $rf = $scope($Γ['global']['$tmp0']['addIdleTask'], 'IdleTask', false)['IdleTask'];
    $rf.scope = $Γ['global']['$tmp0']['addIdleTask'];
    $rf.$this = {
        Σ: $Λ[$Λ.length - 1].l,
        __$proto__: $rf.prototype
    };
    $rf['scheduler'] = $lub(sec_lvl('$tmp28', null, true, $Γ['global']['$tmp0']['addIdleTask']), $Λ[$Λ.length - 1].l);
    $rf['v1'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
    $rf['count'] = $lub(sec_lvl('count', null, true, $Γ['global']['$tmp0']['addIdleTask']), $Λ[$Λ.length - 1].l);
    $rf.InvokedAsContr = true;
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp27 = new IdleTask($tmp28, 1, count);
    $Γ['global']['$tmp0']['addIdleTask']['$tmp27'] = $Λ.pop().l;
    $Γ['global']['$tmp0']['addIdleTask']['$tmp27'] instanceof Object ? $Γ['global']['$tmp0']['addIdleTask']['$tmp27'].Σ = $lub($Γ['global']['$tmp0']['addIdleTask']['$tmp27'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['addIdleTask']['$tmp27'] = $lub($Γ['global']['$tmp0']['addIdleTask']['$tmp27'], $Λ[$Λ.length - 1].l);
    $rf = $prop('$tmp0', 'addRunningTask', $Γ['global']['$tmp0']['addIdleTask']);
    $rf.scope = $Γ['global']['$tmp0']['addIdleTask'];
    $rf.$this = $Γ['global']['$tmp0']['addIdleTask']['$this'];
    $rf['id'] = $lub(sec_lvl('id', null, true, $Γ['global']['$tmp0']['addIdleTask']), $Λ[$Λ.length - 1].l);
    $rf['priority'] = $lub(sec_lvl('priority', null, true, $Γ['global']['$tmp0']['addIdleTask']), $Λ[$Λ.length - 1].l);
    $rf['queue'] = $lub(sec_lvl('queue', null, true, $Γ['global']['$tmp0']['addIdleTask']), $Λ[$Λ.length - 1].l);
    $rf['task'] = $lub(sec_lvl('$tmp27', null, true, $Γ['global']['$tmp0']['addIdleTask']), $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp26 = this.addRunningTask(id, priority, queue, $tmp27);
    $Γ['global']['$tmp0']['addIdleTask']['$tmp26'] = $Λ.pop().l;
    $Γ['global']['$tmp0']['addIdleTask']['$tmp26'] instanceof Object ? $Γ['global']['$tmp0']['addIdleTask']['$tmp26'].Σ = $lub($Γ['global']['$tmp0']['addIdleTask']['$tmp26'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['addIdleTask']['$tmp26'] = $lub($Γ['global']['$tmp0']['addIdleTask']['$tmp26'], $Λ[$Λ.length - 1].l);
    return;
};
$Γ['global']['$tmp0']['addIdleTask'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    id: $Λ[$Λ.length - 1].l,
    priority: $Λ[$Λ.length - 1].l,
    queue: $Λ[$Λ.length - 1].l,
    count: $Λ[$Λ.length - 1].l
};
$tmp0 = Scheduler.prototype;
$Γ['global']['$tmp0'] = sec_lvl('Scheduler', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp0'] instanceof Object ? $Γ['global']['$tmp0'].Σ = $lub($Γ['global']['$tmp0'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0'] = $lub($Γ['global']['$tmp0'], $Λ[$Λ.length - 1].l);
$tmp0.addWorkerTask = function (id, priority, queue) {
    var $tmp29, $tmp30, $tmp31;
    $Γ['global']['$tmp0']['addWorkerTask']['$tmp31'] = $Γ['global']['$tmp0']['addWorkerTask']['$tmp30'] = $Γ['global']['$tmp0']['addWorkerTask']['$tmp29'] = 0;
    $tmp31 = this;
    $Γ['global']['$tmp0']['addWorkerTask']['$tmp31'] = $Γ['global']['$tmp0']['addWorkerTask'].$this;
    $Γ['global']['$tmp0']['addWorkerTask']['$tmp31'] instanceof Object ? $Γ['global']['$tmp0']['addWorkerTask']['$tmp31'].Σ = $lub($Γ['global']['$tmp0']['addWorkerTask']['$tmp31'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['addWorkerTask']['$tmp31'] = $lub($Γ['global']['$tmp0']['addWorkerTask']['$tmp31'], $Λ[$Λ.length - 1].l);
    $rf = $scope($Γ['global']['$tmp0']['addWorkerTask'], 'WorkerTask', false)['WorkerTask'];
    $rf.scope = $Γ['global']['$tmp0']['addWorkerTask'];
    $rf.$this = {
        Σ: $Λ[$Λ.length - 1].l,
        __$proto__: $rf.prototype
    };
    $rf['scheduler'] = $lub(sec_lvl('$tmp31', null, true, $Γ['global']['$tmp0']['addWorkerTask']), $Λ[$Λ.length - 1].l);
    $rf['v1'] = $lub(sec_lvl('ID_HANDLER_A', null, true, $Γ['global']['$tmp0']['addWorkerTask']), $Λ[$Λ.length - 1].l);
    $rf['v2'] = $lub($Λ[$Λ.length - 1].l, $Λ[$Λ.length - 1].l);
    $rf.InvokedAsContr = true;
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp30 = new WorkerTask($tmp31, ID_HANDLER_A, 0);
    $Γ['global']['$tmp0']['addWorkerTask']['$tmp30'] = $Λ.pop().l;
    $Γ['global']['$tmp0']['addWorkerTask']['$tmp30'] instanceof Object ? $Γ['global']['$tmp0']['addWorkerTask']['$tmp30'].Σ = $lub($Γ['global']['$tmp0']['addWorkerTask']['$tmp30'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['addWorkerTask']['$tmp30'] = $lub($Γ['global']['$tmp0']['addWorkerTask']['$tmp30'], $Λ[$Λ.length - 1].l);
    $rf = $prop('$tmp0', 'addTask', $Γ['global']['$tmp0']['addWorkerTask']);
    $rf.scope = $Γ['global']['$tmp0']['addWorkerTask'];
    $rf.$this = $Γ['global']['$tmp0']['addWorkerTask']['$this'];
    $rf['id'] = $lub(sec_lvl('id', null, true, $Γ['global']['$tmp0']['addWorkerTask']), $Λ[$Λ.length - 1].l);
    $rf['priority'] = $lub(sec_lvl('priority', null, true, $Γ['global']['$tmp0']['addWorkerTask']), $Λ[$Λ.length - 1].l);
    $rf['queue'] = $lub(sec_lvl('queue', null, true, $Γ['global']['$tmp0']['addWorkerTask']), $Λ[$Λ.length - 1].l);
    $rf['task'] = $lub(sec_lvl('$tmp30', null, true, $Γ['global']['$tmp0']['addWorkerTask']), $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp29 = this.addTask(id, priority, queue, $tmp30);
    $Γ['global']['$tmp0']['addWorkerTask']['$tmp29'] = $Λ.pop().l;
    $Γ['global']['$tmp0']['addWorkerTask']['$tmp29'] instanceof Object ? $Γ['global']['$tmp0']['addWorkerTask']['$tmp29'].Σ = $lub($Γ['global']['$tmp0']['addWorkerTask']['$tmp29'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['addWorkerTask']['$tmp29'] = $lub($Γ['global']['$tmp0']['addWorkerTask']['$tmp29'], $Λ[$Λ.length - 1].l);
    return;
};
$Γ['global']['$tmp0']['addWorkerTask'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    id: $Λ[$Λ.length - 1].l,
    priority: $Λ[$Λ.length - 1].l,
    queue: $Λ[$Λ.length - 1].l
};
$tmp0 = Scheduler.prototype;
$Γ['global']['$tmp0'] = sec_lvl('Scheduler', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp0'] instanceof Object ? $Γ['global']['$tmp0'].Σ = $lub($Γ['global']['$tmp0'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0'] = $lub($Γ['global']['$tmp0'], $Λ[$Λ.length - 1].l);
$tmp0.addHandlerTask = function (id, priority, queue) {
    var $tmp32, $tmp33, $tmp34;
    $Γ['global']['$tmp0']['addHandlerTask']['$tmp34'] = $Γ['global']['$tmp0']['addHandlerTask']['$tmp33'] = $Γ['global']['$tmp0']['addHandlerTask']['$tmp32'] = 0;
    $tmp34 = this;
    $Γ['global']['$tmp0']['addHandlerTask']['$tmp34'] = $Γ['global']['$tmp0']['addHandlerTask'].$this;
    $Γ['global']['$tmp0']['addHandlerTask']['$tmp34'] instanceof Object ? $Γ['global']['$tmp0']['addHandlerTask']['$tmp34'].Σ = $lub($Γ['global']['$tmp0']['addHandlerTask']['$tmp34'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['addHandlerTask']['$tmp34'] = $lub($Γ['global']['$tmp0']['addHandlerTask']['$tmp34'], $Λ[$Λ.length - 1].l);
    $rf = $scope($Γ['global']['$tmp0']['addHandlerTask'], 'HandlerTask', false)['HandlerTask'];
    $rf.scope = $Γ['global']['$tmp0']['addHandlerTask'];
    $rf.$this = {
        Σ: $Λ[$Λ.length - 1].l,
        __$proto__: $rf.prototype
    };
    $rf['scheduler'] = $lub(sec_lvl('$tmp34', null, true, $Γ['global']['$tmp0']['addHandlerTask']), $Λ[$Λ.length - 1].l);
    $rf.InvokedAsContr = true;
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp33 = new HandlerTask($tmp34);
    $Γ['global']['$tmp0']['addHandlerTask']['$tmp33'] = $Λ.pop().l;
    $Γ['global']['$tmp0']['addHandlerTask']['$tmp33'] instanceof Object ? $Γ['global']['$tmp0']['addHandlerTask']['$tmp33'].Σ = $lub($Γ['global']['$tmp0']['addHandlerTask']['$tmp33'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['addHandlerTask']['$tmp33'] = $lub($Γ['global']['$tmp0']['addHandlerTask']['$tmp33'], $Λ[$Λ.length - 1].l);
    $rf = $prop('$tmp0', 'addTask', $Γ['global']['$tmp0']['addHandlerTask']);
    $rf.scope = $Γ['global']['$tmp0']['addHandlerTask'];
    $rf.$this = $Γ['global']['$tmp0']['addHandlerTask']['$this'];
    $rf['id'] = $lub(sec_lvl('id', null, true, $Γ['global']['$tmp0']['addHandlerTask']), $Λ[$Λ.length - 1].l);
    $rf['priority'] = $lub(sec_lvl('priority', null, true, $Γ['global']['$tmp0']['addHandlerTask']), $Λ[$Λ.length - 1].l);
    $rf['queue'] = $lub(sec_lvl('queue', null, true, $Γ['global']['$tmp0']['addHandlerTask']), $Λ[$Λ.length - 1].l);
    $rf['task'] = $lub(sec_lvl('$tmp33', null, true, $Γ['global']['$tmp0']['addHandlerTask']), $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp32 = this.addTask(id, priority, queue, $tmp33);
    $Γ['global']['$tmp0']['addHandlerTask']['$tmp32'] = $Λ.pop().l;
    $Γ['global']['$tmp0']['addHandlerTask']['$tmp32'] instanceof Object ? $Γ['global']['$tmp0']['addHandlerTask']['$tmp32'].Σ = $lub($Γ['global']['$tmp0']['addHandlerTask']['$tmp32'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['addHandlerTask']['$tmp32'] = $lub($Γ['global']['$tmp0']['addHandlerTask']['$tmp32'], $Λ[$Λ.length - 1].l);
    return;
};
$Γ['global']['$tmp0']['addHandlerTask'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    id: $Λ[$Λ.length - 1].l,
    priority: $Λ[$Λ.length - 1].l,
    queue: $Λ[$Λ.length - 1].l
};
$tmp0 = Scheduler.prototype;
$Γ['global']['$tmp0'] = sec_lvl('Scheduler', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp0'] instanceof Object ? $Γ['global']['$tmp0'].Σ = $lub($Γ['global']['$tmp0'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0'] = $lub($Γ['global']['$tmp0'], $Λ[$Λ.length - 1].l);
$tmp0.addDeviceTask = function (id, priority, queue) {
    var $tmp35, $tmp36, $tmp37;
    $Γ['global']['$tmp0']['addDeviceTask']['$tmp37'] = $Γ['global']['$tmp0']['addDeviceTask']['$tmp36'] = $Γ['global']['$tmp0']['addDeviceTask']['$tmp35'] = 0;
    $tmp37 = this;
    $Γ['global']['$tmp0']['addDeviceTask']['$tmp37'] = $Γ['global']['$tmp0']['addDeviceTask'].$this;
    $Γ['global']['$tmp0']['addDeviceTask']['$tmp37'] instanceof Object ? $Γ['global']['$tmp0']['addDeviceTask']['$tmp37'].Σ = $lub($Γ['global']['$tmp0']['addDeviceTask']['$tmp37'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['addDeviceTask']['$tmp37'] = $lub($Γ['global']['$tmp0']['addDeviceTask']['$tmp37'], $Λ[$Λ.length - 1].l);
    $rf = $scope($Γ['global']['$tmp0']['addDeviceTask'], 'DeviceTask', false)['DeviceTask'];
    $rf.scope = $Γ['global']['$tmp0']['addDeviceTask'];
    $rf.$this = {
        Σ: $Λ[$Λ.length - 1].l,
        __$proto__: $rf.prototype
    };
    $rf['scheduler'] = $lub(sec_lvl('$tmp37', null, true, $Γ['global']['$tmp0']['addDeviceTask']), $Λ[$Λ.length - 1].l);
    $rf.InvokedAsContr = true;
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp36 = new DeviceTask($tmp37);
    $Γ['global']['$tmp0']['addDeviceTask']['$tmp36'] = $Λ.pop().l;
    $Γ['global']['$tmp0']['addDeviceTask']['$tmp36'] instanceof Object ? $Γ['global']['$tmp0']['addDeviceTask']['$tmp36'].Σ = $lub($Γ['global']['$tmp0']['addDeviceTask']['$tmp36'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['addDeviceTask']['$tmp36'] = $lub($Γ['global']['$tmp0']['addDeviceTask']['$tmp36'], $Λ[$Λ.length - 1].l);
    $rf = $prop('$tmp0', 'addTask', $Γ['global']['$tmp0']['addDeviceTask']);
    $rf.scope = $Γ['global']['$tmp0']['addDeviceTask'];
    $rf.$this = $Γ['global']['$tmp0']['addDeviceTask']['$this'];
    $rf['id'] = $lub(sec_lvl('id', null, true, $Γ['global']['$tmp0']['addDeviceTask']), $Λ[$Λ.length - 1].l);
    $rf['priority'] = $lub(sec_lvl('priority', null, true, $Γ['global']['$tmp0']['addDeviceTask']), $Λ[$Λ.length - 1].l);
    $rf['queue'] = $lub(sec_lvl('queue', null, true, $Γ['global']['$tmp0']['addDeviceTask']), $Λ[$Λ.length - 1].l);
    $rf['task'] = $lub(sec_lvl('$tmp36', null, true, $Γ['global']['$tmp0']['addDeviceTask']), $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp35 = this.addTask(id, priority, queue, $tmp36);
    $Γ['global']['$tmp0']['addDeviceTask']['$tmp35'] = $Λ.pop().l;
    $Γ['global']['$tmp0']['addDeviceTask']['$tmp35'] instanceof Object ? $Γ['global']['$tmp0']['addDeviceTask']['$tmp35'].Σ = $lub($Γ['global']['$tmp0']['addDeviceTask']['$tmp35'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['addDeviceTask']['$tmp35'] = $lub($Γ['global']['$tmp0']['addDeviceTask']['$tmp35'], $Λ[$Λ.length - 1].l);
    return;
};
$Γ['global']['$tmp0']['addDeviceTask'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    id: $Λ[$Λ.length - 1].l,
    priority: $Λ[$Λ.length - 1].l,
    queue: $Λ[$Λ.length - 1].l
};
$tmp0 = Scheduler.prototype;
$Γ['global']['$tmp0'] = sec_lvl('Scheduler', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp0'] instanceof Object ? $Γ['global']['$tmp0'].Σ = $lub($Γ['global']['$tmp0'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0'] = $lub($Γ['global']['$tmp0'], $Λ[$Λ.length - 1].l);
$tmp0.addRunningTask = function (id, priority, queue, task) {
    var $tmp38, $tmp39, $tmp40;
    $Γ['global']['$tmp0']['addRunningTask']['$tmp40'] = $Γ['global']['$tmp0']['addRunningTask']['$tmp39'] = $Γ['global']['$tmp0']['addRunningTask']['$tmp38'] = 0;
    $rf = $prop('$tmp0', 'addTask', $Γ['global']['$tmp0']['addRunningTask']);
    $rf.scope = $Γ['global']['$tmp0']['addRunningTask'];
    $rf.$this = $Γ['global']['$tmp0']['addRunningTask']['$this'];
    $rf['id'] = $lub(sec_lvl('id', null, true, $Γ['global']['$tmp0']['addRunningTask']), $Λ[$Λ.length - 1].l);
    $rf['priority'] = $lub(sec_lvl('priority', null, true, $Γ['global']['$tmp0']['addRunningTask']), $Λ[$Λ.length - 1].l);
    $rf['queue'] = $lub(sec_lvl('queue', null, true, $Γ['global']['$tmp0']['addRunningTask']), $Λ[$Λ.length - 1].l);
    $rf['task'] = $lub(sec_lvl('task', null, true, $Γ['global']['$tmp0']['addRunningTask']), $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    $tmp38 = this.addTask(id, priority, queue, task);
    $Γ['global']['$tmp0']['addRunningTask']['$tmp38'] = $Λ.pop().l;
    $Γ['global']['$tmp0']['addRunningTask']['$tmp38'] instanceof Object ? $Γ['global']['$tmp0']['addRunningTask']['$tmp38'].Σ = $lub($Γ['global']['$tmp0']['addRunningTask']['$tmp38'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['addRunningTask']['$tmp38'] = $lub($Γ['global']['$tmp0']['addRunningTask']['$tmp38'], $Λ[$Λ.length - 1].l);
    $tmp40 = this.currentTcb;
    $Γ['global']['$tmp0']['addRunningTask']['$tmp40'] = sec_lvl('$tmp0', 'currentTcb', false, $Γ['global']['$tmp0']['addRunningTask']);
    $Γ['global']['$tmp0']['addRunningTask']['$tmp40'] instanceof Object ? $Γ['global']['$tmp0']['addRunningTask']['$tmp40'].Σ = $lub($Γ['global']['$tmp0']['addRunningTask']['$tmp40'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['addRunningTask']['$tmp40'] = $lub($Γ['global']['$tmp0']['addRunningTask']['$tmp40'], $Λ[$Λ.length - 1].l);
    $tmp39 = $tmp40.setRunning();
    return;
};
$Γ['global']['$tmp0']['addRunningTask'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    id: $Λ[$Λ.length - 1].l,
    priority: $Λ[$Λ.length - 1].l,
    queue: $Λ[$Λ.length - 1].l,
    task: $Λ[$Λ.length - 1].l
};
$tmp0 = Scheduler.prototype;
$Γ['global']['$tmp0'] = sec_lvl('Scheduler', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp0'] instanceof Object ? $Γ['global']['$tmp0'].Σ = $lub($Γ['global']['$tmp0'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0'] = $lub($Γ['global']['$tmp0'], $Λ[$Λ.length - 1].l);
$tmp0.addTask = function (id, priority, queue, task) {
    var $tmp41, $tmp42;
    $Γ['global']['$tmp0']['addTask']['$tmp42'] = $Γ['global']['$tmp0']['addTask']['$tmp41'] = 0;
    $tmp41 = this.list;
    $Γ['global']['$tmp0']['addTask']['$tmp41'] = sec_lvl('$tmp0', 'list', false, $Γ['global']['$tmp0']['addTask']);
    $Γ['global']['$tmp0']['addTask']['$tmp41'] instanceof Object ? $Γ['global']['$tmp0']['addTask']['$tmp41'].Σ = $lub($Γ['global']['$tmp0']['addTask']['$tmp41'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['addTask']['$tmp41'] = $lub($Γ['global']['$tmp0']['addTask']['$tmp41'], $Λ[$Λ.length - 1].l);
    $rf = $scope($Γ['global']['$tmp0']['addTask'], 'TaskControlBlock', false)['TaskControlBlock'];
    $rf.scope = $Γ['global']['$tmp0']['addTask'];
    $rf.$this = {
        Σ: $Λ[$Λ.length - 1].l,
        __$proto__: $rf.prototype
    };
    $rf['link'] = $lub(sec_lvl('$tmp41', null, true, $Γ['global']['$tmp0']['addTask']), $Λ[$Λ.length - 1].l);
    $rf['id'] = $lub(sec_lvl('id', null, true, $Γ['global']['$tmp0']['addTask']), $Λ[$Λ.length - 1].l);
    $rf['priority'] = $lub(sec_lvl('priority', null, true, $Γ['global']['$tmp0']['addTask']), $Λ[$Λ.length - 1].l);
    $rf['queue'] = $lub(sec_lvl('queue', null, true, $Γ['global']['$tmp0']['addTask']), $Λ[$Λ.length - 1].l);
    $rf['task'] = $lub(sec_lvl('task', null, true, $Γ['global']['$tmp0']['addTask']), $Λ[$Λ.length - 1].l);
    $rf.InvokedAsContr = true;
    $Λ.push({
        l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
        id: 'FUNC'
    });
    this.currentTcb = new TaskControlBlock($tmp41, id, priority, queue, task);
    $Γ['global']['$tmp0']['addTask']['$this']['currentTcb'] = $Λ.pop().l;
    $Γ['global']['$tmp0']['addTask']['$this']['currentTcb'] instanceof Object ? $Γ['global']['$tmp0']['addTask']['$this']['currentTcb'].Σ = $lub($Γ['global']['$tmp0']['addTask']['$this']['currentTcb'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['addTask']['$this']['currentTcb'] = $lub($Γ['global']['$tmp0']['addTask']['$this']['currentTcb'], $Λ[$Λ.length - 1].l);
    this.list = this.currentTcb;
    $Γ['global']['$tmp0']['addTask']['$this']['list'] = sec_lvl('$tmp0', 'currentTcb', false, $Γ['global']['$tmp0']['addTask']);
    $Γ['global']['$tmp0']['addTask']['$this']['list'] instanceof Object ? $Γ['global']['$tmp0']['addTask']['$this']['list'].Σ = $lub($Γ['global']['$tmp0']['addTask']['$this']['list'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['addTask']['$this']['list'] = $lub($Γ['global']['$tmp0']['addTask']['$this']['list'], $Λ[$Λ.length - 1].l);
    $tmp42 = this.blocks;
    $Γ['global']['$tmp0']['addTask']['$tmp42'] = sec_lvl('$tmp0', 'blocks', false, $Γ['global']['$tmp0']['addTask']);
    $Γ['global']['$tmp0']['addTask']['$tmp42'] instanceof Object ? $Γ['global']['$tmp0']['addTask']['$tmp42'].Σ = $lub($Γ['global']['$tmp0']['addTask']['$tmp42'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['addTask']['$tmp42'] = $lub($Γ['global']['$tmp0']['addTask']['$tmp42'], $Λ[$Λ.length - 1].l);
    $tmp42[id] = this.currentTcb;
    $Γ['global']['$tmp0']['addTask']['$tmp42']['id'] = sec_lvl('$tmp0', 'currentTcb', false, $Γ['global']['$tmp0']['addTask']);
    _$tmp = sec_lvl('id', null, false, $Γ['global']['$tmp0']['addTask']) instanceof Object ? sec_lvl('id', null, false, $Γ['global']['$tmp0']['addTask']).Σ : sec_lvl('id', null, false, $Γ['global']['$tmp0']['addTask']);
    $Γ['global']['$tmp0']['addTask']['$tmp42']['id'] instanceof Object ? $Γ['global']['$tmp0']['addTask']['$tmp42']['id'].Σ = $lub($Γ['global']['$tmp0']['addTask']['$tmp42']['id'].Σ, _$tmp, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['addTask']['$tmp42']['id'] = $lub($Γ['global']['$tmp0']['addTask']['$tmp42']['id'], _$tmp, $Λ[$Λ.length - 1].l);
    return;
};
$Γ['global']['$tmp0']['addTask'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    id: $Λ[$Λ.length - 1].l,
    priority: $Λ[$Λ.length - 1].l,
    queue: $Λ[$Λ.length - 1].l,
    task: $Λ[$Λ.length - 1].l
};
$tmp0 = Scheduler.prototype;
$Γ['global']['$tmp0'] = sec_lvl('Scheduler', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp0'] instanceof Object ? $Γ['global']['$tmp0'].Σ = $lub($Γ['global']['$tmp0'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0'] = $lub($Γ['global']['$tmp0'], $Λ[$Λ.length - 1].l);
$tmp0.schedule = function () {
    this.currentTcb = this.list;
    $Γ['global']['$tmp0']['schedule']['$this']['currentTcb'] = sec_lvl('$tmp0', 'list', false, $Γ['global']['$tmp0']['schedule']);
    $Γ['global']['$tmp0']['schedule']['$this']['currentTcb'] instanceof Object ? $Γ['global']['$tmp0']['schedule']['$this']['currentTcb'].Σ = $lub($Γ['global']['$tmp0']['schedule']['$this']['currentTcb'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['schedule']['$this']['currentTcb'] = $lub($Γ['global']['$tmp0']['schedule']['$this']['currentTcb'], $Λ[$Λ.length - 1].l);
    var $tmp43, $tmp44;
    $Γ['global']['$tmp0']['schedule']['$tmp44'] = $Γ['global']['$tmp0']['schedule']['$tmp43'] = 0;
    $tmp44 = this.currentTcb;
    $Γ['global']['$tmp0']['schedule']['$tmp44'] = sec_lvl('$tmp0', 'currentTcb', false, $Γ['global']['$tmp0']['schedule']);
    $Γ['global']['$tmp0']['schedule']['$tmp44'] instanceof Object ? $Γ['global']['$tmp0']['schedule']['$tmp44'].Σ = $lub($Γ['global']['$tmp0']['schedule']['$tmp44'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['schedule']['$tmp44'] = $lub($Γ['global']['$tmp0']['schedule']['$tmp44'], $Λ[$Λ.length - 1].l);
    $tmp43 = $tmp44 != null;
    $Γ['global']['$tmp0']['schedule']['$tmp43'] = $lub(sec_lvl('$tmp44', null, true, $Γ['global']['$tmp0']['schedule']), $Λ[$Λ.length - 1].l);
    $Γ['global']['$tmp0']['schedule']['$tmp43'] instanceof Object ? $Γ['global']['$tmp0']['schedule']['$tmp43'].Σ = $lub($Γ['global']['$tmp0']['schedule']['$tmp43'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['schedule']['$tmp43'] = $lub($Γ['global']['$tmp0']['schedule']['$tmp43'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp43', null, true, $Γ['global']['$tmp0']['schedule'])),
        id: 'LOOP'
    });
    while ($tmp43) {
        var $tmp45, $tmp40, $tmp43, $tmp46;
        $Γ['global']['$tmp0']['schedule']['$tmp46'] = $Γ['global']['$tmp0']['schedule']['$tmp43'] = $Γ['global']['$tmp0']['schedule']['$tmp40'] = $Γ['global']['$tmp0']['schedule']['$tmp45'] = 0;
        $tmp40 = this.currentTcb;
        $Γ['global']['$tmp0']['schedule']['$tmp40'] = sec_lvl('$tmp0', 'currentTcb', false, $Γ['global']['$tmp0']['schedule']);
        $Γ['global']['$tmp0']['schedule']['$tmp40'] instanceof Object ? $Γ['global']['$tmp0']['schedule']['$tmp40'].Σ = $lub($Γ['global']['$tmp0']['schedule']['$tmp40'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['schedule']['$tmp40'] = $lub($Γ['global']['$tmp0']['schedule']['$tmp40'], $Λ[$Λ.length - 1].l);
        $tmp45 = $tmp40.isHeldOrSuspended();
        $Λ.push({
            l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp45', null, true, $Γ['global']['$tmp0']['schedule'])),
            id: 'IF'
        });
        if ($tmp45) {
            $upgrade([
                '$tmp40.run',
                'this'
            ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp0']['schedule']);
            var $tmp40;
            $Γ['global']['$tmp0']['schedule']['$tmp40'] = 0;
            $tmp40 = this.currentTcb;
            $Γ['global']['$tmp0']['schedule']['$tmp40'] = sec_lvl('$tmp0', 'currentTcb', false, $Γ['global']['$tmp0']['schedule']);
            $Γ['global']['$tmp0']['schedule']['$tmp40'] instanceof Object ? $Γ['global']['$tmp0']['schedule']['$tmp40'].Σ = $lub($Γ['global']['$tmp0']['schedule']['$tmp40'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['schedule']['$tmp40'] = $lub($Γ['global']['$tmp0']['schedule']['$tmp40'], $Λ[$Λ.length - 1].l);
            this.currentTcb = $tmp40.link;
            $Γ['global']['$tmp0']['schedule']['$this']['currentTcb'] = sec_lvl('$tmp40', 'link', false, $Γ['global']['$tmp0']['schedule']);
            $Γ['global']['$tmp0']['schedule']['$this']['currentTcb'] instanceof Object ? $Γ['global']['$tmp0']['schedule']['$this']['currentTcb'].Σ = $lub($Γ['global']['$tmp0']['schedule']['$this']['currentTcb'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['schedule']['$this']['currentTcb'] = $lub($Γ['global']['$tmp0']['schedule']['$this']['currentTcb'], $Λ[$Λ.length - 1].l);
        } else {
            var $tmp40;
            $Γ['global']['$tmp0']['schedule']['$tmp40'] = 0;
            $tmp40 = this.currentTcb;
            $Γ['global']['$tmp0']['schedule']['$tmp40'] = sec_lvl('$tmp0', 'currentTcb', false, $Γ['global']['$tmp0']['schedule']);
            $Γ['global']['$tmp0']['schedule']['$tmp40'] instanceof Object ? $Γ['global']['$tmp0']['schedule']['$tmp40'].Σ = $lub($Γ['global']['$tmp0']['schedule']['$tmp40'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['schedule']['$tmp40'] = $lub($Γ['global']['$tmp0']['schedule']['$tmp40'], $Λ[$Λ.length - 1].l);
            this.currentId = $tmp40.id;
            $Γ['global']['$tmp0']['schedule']['$this']['currentId'] = sec_lvl('$tmp40', 'id', false, $Γ['global']['$tmp0']['schedule']);
            $Γ['global']['$tmp0']['schedule']['$this']['currentId'] instanceof Object ? $Γ['global']['$tmp0']['schedule']['$this']['currentId'].Σ = $lub($Γ['global']['$tmp0']['schedule']['$this']['currentId'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['schedule']['$this']['currentId'] = $lub($Γ['global']['$tmp0']['schedule']['$this']['currentId'], $Λ[$Λ.length - 1].l);
            $tmp40 = this.currentTcb;
            $Γ['global']['$tmp0']['schedule']['$tmp40'] = sec_lvl('$tmp0', 'currentTcb', false, $Γ['global']['$tmp0']['schedule']);
            $Γ['global']['$tmp0']['schedule']['$tmp40'] instanceof Object ? $Γ['global']['$tmp0']['schedule']['$tmp40'].Σ = $lub($Γ['global']['$tmp0']['schedule']['$tmp40'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['schedule']['$tmp40'] = $lub($Γ['global']['$tmp0']['schedule']['$tmp40'], $Λ[$Λ.length - 1].l);
            this.currentTcb = $tmp40.run();
        }
        $Λ.pop();
        $tmp46 = this.currentTcb;
        $Γ['global']['$tmp0']['schedule']['$tmp46'] = sec_lvl('$tmp0', 'currentTcb', false, $Γ['global']['$tmp0']['schedule']);
        $Γ['global']['$tmp0']['schedule']['$tmp46'] instanceof Object ? $Γ['global']['$tmp0']['schedule']['$tmp46'].Σ = $lub($Γ['global']['$tmp0']['schedule']['$tmp46'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['schedule']['$tmp46'] = $lub($Γ['global']['$tmp0']['schedule']['$tmp46'], $Λ[$Λ.length - 1].l);
        $tmp43 = $tmp46 != null;
        $Γ['global']['$tmp0']['schedule']['$tmp43'] = $lub(sec_lvl('$tmp46', null, true, $Γ['global']['$tmp0']['schedule']), $Λ[$Λ.length - 1].l);
        $Γ['global']['$tmp0']['schedule']['$tmp43'] instanceof Object ? $Γ['global']['$tmp0']['schedule']['$tmp43'].Σ = $lub($Γ['global']['$tmp0']['schedule']['$tmp43'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['schedule']['$tmp43'] = $lub($Γ['global']['$tmp0']['schedule']['$tmp43'], $Λ[$Λ.length - 1].l);
    }
    $upgrade([
        '$tmp40.isHeldOrSuspended',
        '$tmp45',
        '$tmp40.run',
        'this'
    ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp0']['schedule']);
    $Λ.pop();
    return;
};
$Γ['global']['$tmp0']['schedule'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$tmp0 = Scheduler.prototype;
$Γ['global']['$tmp0'] = sec_lvl('Scheduler', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp0'] instanceof Object ? $Γ['global']['$tmp0'].Σ = $lub($Γ['global']['$tmp0'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0'] = $lub($Γ['global']['$tmp0'], $Λ[$Λ.length - 1].l);
$tmp0.release = function (id) {
    var tcb, $tmp42, $tmp47, $tmp48, $tmp49, $tmp50, $tmp51, $tmp40;
    $Γ['global']['$tmp0']['release']['$tmp40'] = $Γ['global']['$tmp0']['release']['$tmp51'] = $Γ['global']['$tmp0']['release']['$tmp50'] = $Γ['global']['$tmp0']['release']['$tmp49'] = $Γ['global']['$tmp0']['release']['$tmp48'] = $Γ['global']['$tmp0']['release']['$tmp47'] = $Γ['global']['$tmp0']['release']['$tmp42'] = $Γ['global']['$tmp0']['release']['tcb'] = 0;
    $tmp42 = this.blocks;
    $Γ['global']['$tmp0']['release']['$tmp42'] = sec_lvl('$tmp0', 'blocks', false, $Γ['global']['$tmp0']['release']);
    $Γ['global']['$tmp0']['release']['$tmp42'] instanceof Object ? $Γ['global']['$tmp0']['release']['$tmp42'].Σ = $lub($Γ['global']['$tmp0']['release']['$tmp42'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['release']['$tmp42'] = $lub($Γ['global']['$tmp0']['release']['$tmp42'], $Λ[$Λ.length - 1].l);
    tcb = $tmp42[id];
    $scope($Γ['global']['$tmp0']['release'], 'tcb', true)['tcb'] = sec_lvl('$tmp42', id, false, $Γ['global']['$tmp0']['release']);
    $scope($Γ['global']['$tmp0']['release'], 'tcb', true)['tcb'] instanceof Object ? $scope($Γ['global']['$tmp0']['release'], 'tcb', true)['tcb'].Σ = $lub($scope($Γ['global']['$tmp0']['release'], 'tcb', true)['tcb'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp0']['release'], 'tcb', true)['tcb'] = $lub($scope($Γ['global']['$tmp0']['release'], 'tcb', true)['tcb'], $Λ[$Λ.length - 1].l);
    $tmp47 = tcb == null;
    $Γ['global']['$tmp0']['release']['$tmp47'] = $lub(sec_lvl('tcb', null, true, $Γ['global']['$tmp0']['release']), $Λ[$Λ.length - 1].l);
    $Γ['global']['$tmp0']['release']['$tmp47'] instanceof Object ? $Γ['global']['$tmp0']['release']['$tmp47'].Σ = $lub($Γ['global']['$tmp0']['release']['$tmp47'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['release']['$tmp47'] = $lub($Γ['global']['$tmp0']['release']['$tmp47'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp47', null, true, $Γ['global']['$tmp0']['release'])),
        id: 'IF'
    });
    if ($tmp47) {
        return tcb;
        var $shouldComp = { 'lbl': 'FUNC' };
    } else {
    }
    if ($shouldComp)
        $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
    $Λ.pop();
    $tmp48 = tcb.markAsNotHeld();
    $tmp50 = tcb.priority;
    $Γ['global']['$tmp0']['release']['$tmp50'] = sec_lvl('tcb', 'priority', false, $Γ['global']['$tmp0']['release']);
    $Γ['global']['$tmp0']['release']['$tmp50'] instanceof Object ? $Γ['global']['$tmp0']['release']['$tmp50'].Σ = $lub($Γ['global']['$tmp0']['release']['$tmp50'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['release']['$tmp50'] = $lub($Γ['global']['$tmp0']['release']['$tmp50'], $Λ[$Λ.length - 1].l);
    $tmp40 = this.currentTcb;
    $Γ['global']['$tmp0']['release']['$tmp40'] = sec_lvl('$tmp0', 'currentTcb', false, $Γ['global']['$tmp0']['release']);
    $Γ['global']['$tmp0']['release']['$tmp40'] instanceof Object ? $Γ['global']['$tmp0']['release']['$tmp40'].Σ = $lub($Γ['global']['$tmp0']['release']['$tmp40'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['release']['$tmp40'] = $lub($Γ['global']['$tmp0']['release']['$tmp40'], $Λ[$Λ.length - 1].l);
    $tmp51 = $tmp40.priority;
    $Γ['global']['$tmp0']['release']['$tmp51'] = sec_lvl('$tmp40', 'priority', false, $Γ['global']['$tmp0']['release']);
    $Γ['global']['$tmp0']['release']['$tmp51'] instanceof Object ? $Γ['global']['$tmp0']['release']['$tmp51'].Σ = $lub($Γ['global']['$tmp0']['release']['$tmp51'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['release']['$tmp51'] = $lub($Γ['global']['$tmp0']['release']['$tmp51'], $Λ[$Λ.length - 1].l);
    $tmp49 = $tmp50 > $tmp51;
    $Γ['global']['$tmp0']['release']['$tmp49'] = $lub(sec_lvl('$tmp50', null, true, $Γ['global']['$tmp0']['release']), sec_lvl('$tmp51', null, true, $Γ['global']['$tmp0']['release']));
    $Γ['global']['$tmp0']['release']['$tmp49'] instanceof Object ? $Γ['global']['$tmp0']['release']['$tmp49'].Σ = $lub($Γ['global']['$tmp0']['release']['$tmp49'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['release']['$tmp49'] = $lub($Γ['global']['$tmp0']['release']['$tmp49'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp49', null, true, $Γ['global']['$tmp0']['release'])),
        id: 'IF'
    });
    if ($tmp49) {
        return tcb;
        var $shouldComp = { 'lbl': 'FUNC' };
    } else {
        var $tmp52;
        $Γ['global']['$tmp0']['release']['$tmp52'] = 0;
        $tmp52 = this.currentTcb;
        $Γ['global']['$tmp0']['release']['$tmp52'] = sec_lvl('$tmp0', 'currentTcb', false, $Γ['global']['$tmp0']['release']);
        $Γ['global']['$tmp0']['release']['$tmp52'] instanceof Object ? $Γ['global']['$tmp0']['release']['$tmp52'].Σ = $lub($Γ['global']['$tmp0']['release']['$tmp52'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['release']['$tmp52'] = $lub($Γ['global']['$tmp0']['release']['$tmp52'], $Λ[$Λ.length - 1].l);
        return $tmp52;
        var $shouldComp = { 'lbl': 'FUNC' };
    }
    if ($shouldComp)
        $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
    $Λ.pop();
    return;
};
$Γ['global']['$tmp0']['release'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    id: $Λ[$Λ.length - 1].l
};
$tmp0 = Scheduler.prototype;
$Γ['global']['$tmp0'] = sec_lvl('Scheduler', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp0'] instanceof Object ? $Γ['global']['$tmp0'].Σ = $lub($Γ['global']['$tmp0'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0'] = $lub($Γ['global']['$tmp0'], $Λ[$Λ.length - 1].l);
$tmp0.holdCurrent = function () {
    var $tmp53, $tmp54, $tmp55, $tmp40, $tmp56;
    $Γ['global']['$tmp0']['holdCurrent']['$tmp56'] = $Γ['global']['$tmp0']['holdCurrent']['$tmp40'] = $Γ['global']['$tmp0']['holdCurrent']['$tmp55'] = $Γ['global']['$tmp0']['holdCurrent']['$tmp54'] = $Γ['global']['$tmp0']['holdCurrent']['$tmp53'] = 0;
    $tmp54 = this;
    $Γ['global']['$tmp0']['holdCurrent']['$tmp54'] = $Γ['global']['$tmp0']['holdCurrent'].$this;
    $Γ['global']['$tmp0']['holdCurrent']['$tmp54'] instanceof Object ? $Γ['global']['$tmp0']['holdCurrent']['$tmp54'].Σ = $lub($Γ['global']['$tmp0']['holdCurrent']['$tmp54'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['holdCurrent']['$tmp54'] = $lub($Γ['global']['$tmp0']['holdCurrent']['$tmp54'], $Λ[$Λ.length - 1].l);
    $tmp53 = $tmp54.holdCount++;
    $Γ['global']['$tmp0']['holdCurrent']['$tmp53'] = sec_lvl('$tmp54', 'holdCount', false, $Γ['global']['$tmp0']['holdCurrent']);
    $Γ['global']['$tmp0']['holdCurrent']['$tmp53'] instanceof Object ? $Γ['global']['$tmp0']['holdCurrent']['$tmp53'].Σ = $lub($Γ['global']['$tmp0']['holdCurrent']['$tmp53'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['holdCurrent']['$tmp53'] = $lub($Γ['global']['$tmp0']['holdCurrent']['$tmp53'], $Λ[$Λ.length - 1].l);
    $tmp40 = this.currentTcb;
    $Γ['global']['$tmp0']['holdCurrent']['$tmp40'] = sec_lvl('$tmp0', 'currentTcb', false, $Γ['global']['$tmp0']['holdCurrent']);
    $Γ['global']['$tmp0']['holdCurrent']['$tmp40'] instanceof Object ? $Γ['global']['$tmp0']['holdCurrent']['$tmp40'].Σ = $lub($Γ['global']['$tmp0']['holdCurrent']['$tmp40'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['holdCurrent']['$tmp40'] = $lub($Γ['global']['$tmp0']['holdCurrent']['$tmp40'], $Λ[$Λ.length - 1].l);
    $tmp55 = $tmp40.markAsHeld();
    $tmp40 = this.currentTcb;
    $Γ['global']['$tmp0']['holdCurrent']['$tmp40'] = sec_lvl('$tmp0', 'currentTcb', false, $Γ['global']['$tmp0']['holdCurrent']);
    $Γ['global']['$tmp0']['holdCurrent']['$tmp40'] instanceof Object ? $Γ['global']['$tmp0']['holdCurrent']['$tmp40'].Σ = $lub($Γ['global']['$tmp0']['holdCurrent']['$tmp40'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['holdCurrent']['$tmp40'] = $lub($Γ['global']['$tmp0']['holdCurrent']['$tmp40'], $Λ[$Λ.length - 1].l);
    $tmp56 = $tmp40.link;
    $Γ['global']['$tmp0']['holdCurrent']['$tmp56'] = sec_lvl('$tmp40', 'link', false, $Γ['global']['$tmp0']['holdCurrent']);
    $Γ['global']['$tmp0']['holdCurrent']['$tmp56'] instanceof Object ? $Γ['global']['$tmp0']['holdCurrent']['$tmp56'].Σ = $lub($Γ['global']['$tmp0']['holdCurrent']['$tmp56'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['holdCurrent']['$tmp56'] = $lub($Γ['global']['$tmp0']['holdCurrent']['$tmp56'], $Λ[$Λ.length - 1].l);
    return $tmp56;
};
$Γ['global']['$tmp0']['holdCurrent'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$tmp0 = Scheduler.prototype;
$Γ['global']['$tmp0'] = sec_lvl('Scheduler', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp0'] instanceof Object ? $Γ['global']['$tmp0'].Σ = $lub($Γ['global']['$tmp0'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0'] = $lub($Γ['global']['$tmp0'], $Λ[$Λ.length - 1].l);
$tmp0.suspendCurrent = function () {
    var $tmp57, $tmp40, $tmp58;
    $Γ['global']['$tmp0']['suspendCurrent']['$tmp58'] = $Γ['global']['$tmp0']['suspendCurrent']['$tmp40'] = $Γ['global']['$tmp0']['suspendCurrent']['$tmp57'] = 0;
    $tmp40 = this.currentTcb;
    $Γ['global']['$tmp0']['suspendCurrent']['$tmp40'] = sec_lvl('$tmp0', 'currentTcb', false, $Γ['global']['$tmp0']['suspendCurrent']);
    $Γ['global']['$tmp0']['suspendCurrent']['$tmp40'] instanceof Object ? $Γ['global']['$tmp0']['suspendCurrent']['$tmp40'].Σ = $lub($Γ['global']['$tmp0']['suspendCurrent']['$tmp40'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['suspendCurrent']['$tmp40'] = $lub($Γ['global']['$tmp0']['suspendCurrent']['$tmp40'], $Λ[$Λ.length - 1].l);
    $tmp57 = $tmp40.markAsSuspended();
    $tmp58 = this.currentTcb;
    $Γ['global']['$tmp0']['suspendCurrent']['$tmp58'] = sec_lvl('$tmp0', 'currentTcb', false, $Γ['global']['$tmp0']['suspendCurrent']);
    $Γ['global']['$tmp0']['suspendCurrent']['$tmp58'] instanceof Object ? $Γ['global']['$tmp0']['suspendCurrent']['$tmp58'].Σ = $lub($Γ['global']['$tmp0']['suspendCurrent']['$tmp58'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['suspendCurrent']['$tmp58'] = $lub($Γ['global']['$tmp0']['suspendCurrent']['$tmp58'], $Λ[$Λ.length - 1].l);
    return $tmp58;
};
$Γ['global']['$tmp0']['suspendCurrent'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$tmp0 = Scheduler.prototype;
$Γ['global']['$tmp0'] = sec_lvl('Scheduler', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp0'] instanceof Object ? $Γ['global']['$tmp0'].Σ = $lub($Γ['global']['$tmp0'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0'] = $lub($Γ['global']['$tmp0'], $Λ[$Λ.length - 1].l);
$tmp0.queue = function (packet) {
    var t, $tmp42, $tmp59, $tmp60, $tmp61, $tmp62, $tmp63, $tmp64;
    $Γ['global']['$tmp0']['queue']['$tmp64'] = $Γ['global']['$tmp0']['queue']['$tmp63'] = $Γ['global']['$tmp0']['queue']['$tmp62'] = $Γ['global']['$tmp0']['queue']['$tmp61'] = $Γ['global']['$tmp0']['queue']['$tmp60'] = $Γ['global']['$tmp0']['queue']['$tmp59'] = $Γ['global']['$tmp0']['queue']['$tmp42'] = $Γ['global']['$tmp0']['queue']['t'] = 0;
    $tmp42 = this.blocks;
    $Γ['global']['$tmp0']['queue']['$tmp42'] = sec_lvl('$tmp0', 'blocks', false, $Γ['global']['$tmp0']['queue']);
    $Γ['global']['$tmp0']['queue']['$tmp42'] instanceof Object ? $Γ['global']['$tmp0']['queue']['$tmp42'].Σ = $lub($Γ['global']['$tmp0']['queue']['$tmp42'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['queue']['$tmp42'] = $lub($Γ['global']['$tmp0']['queue']['$tmp42'], $Λ[$Λ.length - 1].l);
    $tmp59 = packet.id;
    $Γ['global']['$tmp0']['queue']['$tmp59'] = sec_lvl('packet', 'id', false, $Γ['global']['$tmp0']['queue']);
    $Γ['global']['$tmp0']['queue']['$tmp59'] instanceof Object ? $Γ['global']['$tmp0']['queue']['$tmp59'].Σ = $lub($Γ['global']['$tmp0']['queue']['$tmp59'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['queue']['$tmp59'] = $lub($Γ['global']['$tmp0']['queue']['$tmp59'], $Λ[$Λ.length - 1].l);
    t = $tmp42[$tmp59];
    $scope($Γ['global']['$tmp0']['queue'], 't', true)['t'] = sec_lvl('$tmp42', $tmp59, false, $Γ['global']['$tmp0']['queue']);
    $scope($Γ['global']['$tmp0']['queue'], 't', true)['t'] instanceof Object ? $scope($Γ['global']['$tmp0']['queue'], 't', true)['t'].Σ = $lub($scope($Γ['global']['$tmp0']['queue'], 't', true)['t'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp0']['queue'], 't', true)['t'] = $lub($scope($Γ['global']['$tmp0']['queue'], 't', true)['t'], $Λ[$Λ.length - 1].l);
    $tmp60 = t == null;
    $Γ['global']['$tmp0']['queue']['$tmp60'] = $lub(sec_lvl('t', null, true, $Γ['global']['$tmp0']['queue']), $Λ[$Λ.length - 1].l);
    $Γ['global']['$tmp0']['queue']['$tmp60'] instanceof Object ? $Γ['global']['$tmp0']['queue']['$tmp60'].Σ = $lub($Γ['global']['$tmp0']['queue']['$tmp60'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['queue']['$tmp60'] = $lub($Γ['global']['$tmp0']['queue']['$tmp60'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp60', null, true, $Γ['global']['$tmp0']['queue'])),
        id: 'IF'
    });
    if ($tmp60) {
        return t;
        var $shouldComp = { 'lbl': 'FUNC' };
    } else {
    }
    if ($shouldComp)
        $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
    $Λ.pop();
    $tmp62 = this;
    $Γ['global']['$tmp0']['queue']['$tmp62'] = $Γ['global']['$tmp0']['queue'].$this;
    $Γ['global']['$tmp0']['queue']['$tmp62'] instanceof Object ? $Γ['global']['$tmp0']['queue']['$tmp62'].Σ = $lub($Γ['global']['$tmp0']['queue']['$tmp62'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['queue']['$tmp62'] = $lub($Γ['global']['$tmp0']['queue']['$tmp62'], $Λ[$Λ.length - 1].l);
    $tmp61 = $tmp62.queueCount++;
    $Γ['global']['$tmp0']['queue']['$tmp61'] = sec_lvl('$tmp62', 'queueCount', false, $Γ['global']['$tmp0']['queue']);
    $Γ['global']['$tmp0']['queue']['$tmp61'] instanceof Object ? $Γ['global']['$tmp0']['queue']['$tmp61'].Σ = $lub($Γ['global']['$tmp0']['queue']['$tmp61'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['queue']['$tmp61'] = $lub($Γ['global']['$tmp0']['queue']['$tmp61'], $Λ[$Λ.length - 1].l);
    packet.link = null;
    $scope($Γ['global']['$tmp0']['queue'], 'packet', false)['link'] = $Λ[$Λ.length - 1].l;
    packet.id = this.currentId;
    $scope($Γ['global']['$tmp0']['queue'], 'packet', false)['id'] = sec_lvl('$tmp0', 'currentId', false, $Γ['global']['$tmp0']['queue']);
    $scope($Γ['global']['$tmp0']['queue'], 'packet', false)['id'] instanceof Object ? $scope($Γ['global']['$tmp0']['queue'], 'packet', false)['id'].Σ = $lub($scope($Γ['global']['$tmp0']['queue'], 'packet', false)['id'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp0']['queue'], 'packet', false)['id'] = $lub($scope($Γ['global']['$tmp0']['queue'], 'packet', false)['id'], $Λ[$Λ.length - 1].l);
    $tmp64 = this.currentTcb;
    $Γ['global']['$tmp0']['queue']['$tmp64'] = sec_lvl('$tmp0', 'currentTcb', false, $Γ['global']['$tmp0']['queue']);
    $Γ['global']['$tmp0']['queue']['$tmp64'] instanceof Object ? $Γ['global']['$tmp0']['queue']['$tmp64'].Σ = $lub($Γ['global']['$tmp0']['queue']['$tmp64'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp0']['queue']['$tmp64'] = $lub($Γ['global']['$tmp0']['queue']['$tmp64'], $Λ[$Λ.length - 1].l);
    $tmp63 = t.checkPriorityAdd($tmp64, packet);
    return $tmp63;
};
$Γ['global']['$tmp0']['queue'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    packet: $Λ[$Λ.length - 1].l
};
function TaskControlBlock(link, id, priority, queue, task) {
    this.link = link;
    $Γ['global']['TaskControlBlock']['$this']['link'] = sec_lvl('link', null, false, $Γ['global']['TaskControlBlock']);
    $Γ['global']['TaskControlBlock']['$this']['link'] instanceof Object ? $Γ['global']['TaskControlBlock']['$this']['link'].Σ = $lub($Γ['global']['TaskControlBlock']['$this']['link'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['TaskControlBlock']['$this']['link'] = $lub($Γ['global']['TaskControlBlock']['$this']['link'], $Λ[$Λ.length - 1].l);
    this.id = id;
    $Γ['global']['TaskControlBlock']['$this']['id'] = sec_lvl('id', null, false, $Γ['global']['TaskControlBlock']);
    $Γ['global']['TaskControlBlock']['$this']['id'] instanceof Object ? $Γ['global']['TaskControlBlock']['$this']['id'].Σ = $lub($Γ['global']['TaskControlBlock']['$this']['id'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['TaskControlBlock']['$this']['id'] = $lub($Γ['global']['TaskControlBlock']['$this']['id'], $Λ[$Λ.length - 1].l);
    this.priority = priority;
    $Γ['global']['TaskControlBlock']['$this']['priority'] = sec_lvl('priority', null, false, $Γ['global']['TaskControlBlock']);
    $Γ['global']['TaskControlBlock']['$this']['priority'] instanceof Object ? $Γ['global']['TaskControlBlock']['$this']['priority'].Σ = $lub($Γ['global']['TaskControlBlock']['$this']['priority'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['TaskControlBlock']['$this']['priority'] = $lub($Γ['global']['TaskControlBlock']['$this']['priority'], $Λ[$Λ.length - 1].l);
    this.queue = queue;
    $Γ['global']['TaskControlBlock']['$this']['queue'] = sec_lvl('queue', null, false, $Γ['global']['TaskControlBlock']);
    $Γ['global']['TaskControlBlock']['$this']['queue'] instanceof Object ? $Γ['global']['TaskControlBlock']['$this']['queue'].Σ = $lub($Γ['global']['TaskControlBlock']['$this']['queue'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['TaskControlBlock']['$this']['queue'] = $lub($Γ['global']['TaskControlBlock']['$this']['queue'], $Λ[$Λ.length - 1].l);
    this.task = task;
    $Γ['global']['TaskControlBlock']['$this']['task'] = sec_lvl('task', null, false, $Γ['global']['TaskControlBlock']);
    $Γ['global']['TaskControlBlock']['$this']['task'] instanceof Object ? $Γ['global']['TaskControlBlock']['$this']['task'].Σ = $lub($Γ['global']['TaskControlBlock']['$this']['task'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['TaskControlBlock']['$this']['task'] = $lub($Γ['global']['TaskControlBlock']['$this']['task'], $Λ[$Λ.length - 1].l);
    var $tmp65;
    $Γ['global']['TaskControlBlock']['$tmp65'] = 0;
    $tmp65 = queue == null;
    $Γ['global']['TaskControlBlock']['$tmp65'] = $lub(sec_lvl('queue', null, true, $Γ['global']['TaskControlBlock']), $Λ[$Λ.length - 1].l);
    $Γ['global']['TaskControlBlock']['$tmp65'] instanceof Object ? $Γ['global']['TaskControlBlock']['$tmp65'].Σ = $lub($Γ['global']['TaskControlBlock']['$tmp65'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['TaskControlBlock']['$tmp65'] = $lub($Γ['global']['TaskControlBlock']['$tmp65'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp65', null, true, $Γ['global']['TaskControlBlock'])),
        id: 'IF'
    });
    if ($tmp65) {
        this.state = STATE_SUSPENDED;
        $Γ['global']['TaskControlBlock']['$this']['state'] = sec_lvl('STATE_SUSPENDED', null, false, $Γ['global']['TaskControlBlock']);
        $Γ['global']['TaskControlBlock']['$this']['state'] instanceof Object ? $Γ['global']['TaskControlBlock']['$this']['state'].Σ = $lub($Γ['global']['TaskControlBlock']['$this']['state'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['TaskControlBlock']['$this']['state'] = $lub($Γ['global']['TaskControlBlock']['$this']['state'], $Λ[$Λ.length - 1].l);
    } else {
        this.state = STATE_SUSPENDED_RUNNABLE;
        $Γ['global']['TaskControlBlock']['$this']['state'] = sec_lvl('STATE_SUSPENDED_RUNNABLE', null, false, $Γ['global']['TaskControlBlock']);
        $Γ['global']['TaskControlBlock']['$this']['state'] instanceof Object ? $Γ['global']['TaskControlBlock']['$this']['state'].Σ = $lub($Γ['global']['TaskControlBlock']['$this']['state'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['TaskControlBlock']['$this']['state'] = $lub($Γ['global']['TaskControlBlock']['$this']['state'], $Λ[$Λ.length - 1].l);
    }
    $Λ.pop();
    return;
}
STATE_RUNNING = 0;
$Γ['global']['STATE_RUNNING'] = $Λ[$Λ.length - 1].l;
STATE_RUNNABLE = 1;
$Γ['global']['STATE_RUNNABLE'] = $Λ[$Λ.length - 1].l;
STATE_SUSPENDED = 2;
$Γ['global']['STATE_SUSPENDED'] = $Λ[$Λ.length - 1].l;
STATE_HELD = 4;
$Γ['global']['STATE_HELD'] = $Λ[$Λ.length - 1].l;
STATE_SUSPENDED_RUNNABLE = STATE_SUSPENDED | STATE_RUNNABLE;
$Γ['global']['STATE_SUSPENDED_RUNNABLE'] = $lub(sec_lvl('STATE_SUSPENDED', null, true, $Γ['global']), sec_lvl('STATE_RUNNABLE', null, true, $Γ['global']));
$Γ['global']['STATE_SUSPENDED_RUNNABLE'] instanceof Object ? $Γ['global']['STATE_SUSPENDED_RUNNABLE'].Σ = $lub($Γ['global']['STATE_SUSPENDED_RUNNABLE'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['STATE_SUSPENDED_RUNNABLE'] = $lub($Γ['global']['STATE_SUSPENDED_RUNNABLE'], $Λ[$Λ.length - 1].l);
STATE_NOT_HELD = ~STATE_HELD;
$Γ['global']['STATE_NOT_HELD'] = sec_lvl('STATE_HELD', null, false, $Γ['global']);
$Γ['global']['STATE_NOT_HELD'] instanceof Object ? $Γ['global']['STATE_NOT_HELD'].Σ = $lub($Γ['global']['STATE_NOT_HELD'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['STATE_NOT_HELD'] = $lub($Γ['global']['STATE_NOT_HELD'], $Λ[$Λ.length - 1].l);
$tmp1 = TaskControlBlock.prototype;
$Γ['global']['$tmp1'] = sec_lvl('TaskControlBlock', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp1'] instanceof Object ? $Γ['global']['$tmp1'].Σ = $lub($Γ['global']['$tmp1'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1'] = $lub($Γ['global']['$tmp1'], $Λ[$Λ.length - 1].l);
$tmp1.setRunning = function () {
    this.state = STATE_RUNNING;
    //$Γ['global']['$tmp1']['setRunning']['$this']['state'] = sec_lvl('STATE_RUNNING', null, false, $Γ['global']['$tmp1']['setRunning']);
    //$Γ['global']['$tmp1']['setRunning']['$this']['state'] instanceof Object ? $Γ['global']['$tmp1']['setRunning']['$this']['state'].Σ = $lub($Γ['global']['$tmp1']['setRunning']['$this']['state'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['setRunning']['$this']['state'] = $lub($Γ['global']['$tmp1']['setRunning']['$this']['state'], $Λ[$Λ.length - 1].l);
    return;
};
$Γ['global']['$tmp1']['setRunning'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$tmp1 = TaskControlBlock.prototype;
$Γ['global']['$tmp1'] = sec_lvl('TaskControlBlock', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp1'] instanceof Object ? $Γ['global']['$tmp1'].Σ = $lub($Γ['global']['$tmp1'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1'] = $lub($Γ['global']['$tmp1'], $Λ[$Λ.length - 1].l);
$tmp1.markAsNotHeld = function () {
    var $tmp66;
    $Γ['global']['$tmp1']['markAsNotHeld']['$tmp66'] = 0;
    $tmp66 = this.state;
    $Γ['global']['$tmp1']['markAsNotHeld']['$tmp66'] = sec_lvl('$tmp1', 'state', false, $Γ['global']['$tmp1']['markAsNotHeld']);
    $Γ['global']['$tmp1']['markAsNotHeld']['$tmp66'] instanceof Object ? $Γ['global']['$tmp1']['markAsNotHeld']['$tmp66'].Σ = $lub($Γ['global']['$tmp1']['markAsNotHeld']['$tmp66'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['markAsNotHeld']['$tmp66'] = $lub($Γ['global']['$tmp1']['markAsNotHeld']['$tmp66'], $Λ[$Λ.length - 1].l);
    this.state = $tmp66 & STATE_NOT_HELD;
    //$Γ['global']['$tmp1']['markAsNotHeld']['$this']['state'] = $lub(sec_lvl('$tmp66', null, true, $Γ['global']['$tmp1']['markAsNotHeld']), sec_lvl('STATE_NOT_HELD', null, true, $Γ['global']['$tmp1']['markAsNotHeld']));
    //$Γ['global']['$tmp1']['markAsNotHeld']['$this']['state'] instanceof Object ? $Γ['global']['$tmp1']['markAsNotHeld']['$this']['state'].Σ = $lub($Γ['global']['$tmp1']['markAsNotHeld']['$this']['state'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['markAsNotHeld']['$this']['state'] = $lub($Γ['global']['$tmp1']['markAsNotHeld']['$this']['state'], $Λ[$Λ.length - 1].l);
    return;
};
$Γ['global']['$tmp1']['markAsNotHeld'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$tmp1 = TaskControlBlock.prototype;
$Γ['global']['$tmp1'] = sec_lvl('TaskControlBlock', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp1'] instanceof Object ? $Γ['global']['$tmp1'].Σ = $lub($Γ['global']['$tmp1'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1'] = $lub($Γ['global']['$tmp1'], $Λ[$Λ.length - 1].l);
$tmp1.markAsHeld = function () {
    var $tmp67;
    $Γ['global']['$tmp1']['markAsHeld']['$tmp67'] = 0;
    $tmp67 = this.state;
    $Γ['global']['$tmp1']['markAsHeld']['$tmp67'] = sec_lvl('$tmp1', 'state', false, $Γ['global']['$tmp1']['markAsHeld']);
    $Γ['global']['$tmp1']['markAsHeld']['$tmp67'] instanceof Object ? $Γ['global']['$tmp1']['markAsHeld']['$tmp67'].Σ = $lub($Γ['global']['$tmp1']['markAsHeld']['$tmp67'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['markAsHeld']['$tmp67'] = $lub($Γ['global']['$tmp1']['markAsHeld']['$tmp67'], $Λ[$Λ.length - 1].l);
    this.state = $tmp67 | STATE_HELD;
    //$Γ['global']['$tmp1']['markAsHeld']['$this']['state'] = $lub(sec_lvl('$tmp67', null, true, $Γ['global']['$tmp1']['markAsHeld']), sec_lvl('STATE_HELD', null, true, $Γ['global']['$tmp1']['markAsHeld']));
    //$Γ['global']['$tmp1']['markAsHeld']['$this']['state'] instanceof Object ? $Γ['global']['$tmp1']['markAsHeld']['$this']['state'].Σ = $lub($Γ['global']['$tmp1']['markAsHeld']['$this']['state'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['markAsHeld']['$this']['state'] = $lub($Γ['global']['$tmp1']['markAsHeld']['$this']['state'], $Λ[$Λ.length - 1].l);
    return;
};
$Γ['global']['$tmp1']['markAsHeld'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$tmp1 = TaskControlBlock.prototype;
$Γ['global']['$tmp1'] = sec_lvl('TaskControlBlock', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp1'] instanceof Object ? $Γ['global']['$tmp1'].Σ = $lub($Γ['global']['$tmp1'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1'] = $lub($Γ['global']['$tmp1'], $Λ[$Λ.length - 1].l);
$tmp1.isHeldOrSuspended = function () {
    var $tmp68, $tmp69, $tmp70, $tmp71, $tmp72, $tmp73;
    $Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp73'] = $Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp72'] = $Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp71'] = $Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp70'] = $Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp69'] = $Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp68'] = 0;
    $tmp71 = this.state;
    $Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp71'] = sec_lvl('$tmp1', 'state', false, $Γ['global']['$tmp1']['isHeldOrSuspended']);
    $Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp71'] instanceof Object ? $Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp71'].Σ = $lub($Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp71'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp71'] = $lub($Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp71'], $Λ[$Λ.length - 1].l);
    $tmp70 = $tmp71 & STATE_HELD;
    $Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp70'] = $lub(sec_lvl('$tmp71', null, true, $Γ['global']['$tmp1']['isHeldOrSuspended']), sec_lvl('STATE_HELD', null, true, $Γ['global']['$tmp1']['isHeldOrSuspended']));
    $Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp70'] instanceof Object ? $Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp70'].Σ = $lub($Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp70'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp70'] = $lub($Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp70'], $Λ[$Λ.length - 1].l);
    $tmp69 = $tmp70 != 0;
    $Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp69'] = $lub(sec_lvl('$tmp70', null, true, $Γ['global']['$tmp1']['isHeldOrSuspended']), $Λ[$Λ.length - 1].l);
    $Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp69'] instanceof Object ? $Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp69'].Σ = $lub($Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp69'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp69'] = $lub($Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp69'], $Λ[$Λ.length - 1].l);
    $tmp73 = this.state;
    $Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp73'] = sec_lvl('$tmp1', 'state', false, $Γ['global']['$tmp1']['isHeldOrSuspended']);
    $Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp73'] instanceof Object ? $Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp73'].Σ = $lub($Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp73'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp73'] = $lub($Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp73'], $Λ[$Λ.length - 1].l);
    $tmp72 = $tmp73 == STATE_SUSPENDED;
    $Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp72'] = $lub(sec_lvl('$tmp73', null, true, $Γ['global']['$tmp1']['isHeldOrSuspended']), sec_lvl('STATE_SUSPENDED', null, true, $Γ['global']['$tmp1']['isHeldOrSuspended']));
    $Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp72'] instanceof Object ? $Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp72'].Σ = $lub($Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp72'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp72'] = $lub($Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp72'], $Λ[$Λ.length - 1].l);
    $tmp68 = $tmp69 || $tmp72;
    $Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp68'] = $lub(sec_lvl('$tmp69', null, true, $Γ['global']['$tmp1']['isHeldOrSuspended']), sec_lvl('$tmp72', null, true, $Γ['global']['$tmp1']['isHeldOrSuspended']));
    $Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp68'] instanceof Object ? $Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp68'].Σ = $lub($Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp68'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp68'] = $lub($Γ['global']['$tmp1']['isHeldOrSuspended']['$tmp68'], $Λ[$Λ.length - 1].l);
    return $tmp68;
};
$Γ['global']['$tmp1']['isHeldOrSuspended'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$tmp1 = TaskControlBlock.prototype;
$Γ['global']['$tmp1'] = sec_lvl('TaskControlBlock', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp1'] instanceof Object ? $Γ['global']['$tmp1'].Σ = $lub($Γ['global']['$tmp1'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1'] = $lub($Γ['global']['$tmp1'], $Λ[$Λ.length - 1].l);
$tmp1.markAsSuspended = function () {
    var $tmp74;
    $Γ['global']['$tmp1']['markAsSuspended']['$tmp74'] = 0;
    $tmp74 = this.state;
    $Γ['global']['$tmp1']['markAsSuspended']['$tmp74'] = sec_lvl('$tmp1', 'state', false, $Γ['global']['$tmp1']['markAsSuspended']);
    $Γ['global']['$tmp1']['markAsSuspended']['$tmp74'] instanceof Object ? $Γ['global']['$tmp1']['markAsSuspended']['$tmp74'].Σ = $lub($Γ['global']['$tmp1']['markAsSuspended']['$tmp74'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['markAsSuspended']['$tmp74'] = $lub($Γ['global']['$tmp1']['markAsSuspended']['$tmp74'], $Λ[$Λ.length - 1].l);
    this.state = $tmp74 | STATE_SUSPENDED;
    //$Γ['global']['$tmp1']['markAsSuspended']['$this']['state'] = $lub(sec_lvl('$tmp74', null, true, $Γ['global']['$tmp1']['markAsSuspended']), sec_lvl('STATE_SUSPENDED', null, true, $Γ['global']['$tmp1']['markAsSuspended']));
    //$Γ['global']['$tmp1']['markAsSuspended']['$this']['state'] instanceof Object ? $Γ['global']['$tmp1']['markAsSuspended']['$this']['state'].Σ = $lub($Γ['global']['$tmp1']['markAsSuspended']['$this']['state'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['markAsSuspended']['$this']['state'] = $lub($Γ['global']['$tmp1']['markAsSuspended']['$this']['state'], $Λ[$Λ.length - 1].l);
    return;
};
$Γ['global']['$tmp1']['markAsSuspended'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$tmp1 = TaskControlBlock.prototype;
$Γ['global']['$tmp1'] = sec_lvl('TaskControlBlock', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp1'] instanceof Object ? $Γ['global']['$tmp1'].Σ = $lub($Γ['global']['$tmp1'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1'] = $lub($Γ['global']['$tmp1'], $Λ[$Λ.length - 1].l);
$tmp1.markAsRunnable = function () {
    var $tmp75;
    $Γ['global']['$tmp1']['markAsRunnable']['$tmp75'] = 0;
    $tmp75 = this.state;
    $Γ['global']['$tmp1']['markAsRunnable']['$tmp75'] = sec_lvl('$tmp1', 'state', false, $Γ['global']['$tmp1']['markAsRunnable']);
    $Γ['global']['$tmp1']['markAsRunnable']['$tmp75'] instanceof Object ? $Γ['global']['$tmp1']['markAsRunnable']['$tmp75'].Σ = $lub($Γ['global']['$tmp1']['markAsRunnable']['$tmp75'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['markAsRunnable']['$tmp75'] = $lub($Γ['global']['$tmp1']['markAsRunnable']['$tmp75'], $Λ[$Λ.length - 1].l);
    this.state = $tmp75 | STATE_RUNNABLE;
    //$Γ['global']['$tmp1']['markAsRunnable']['$this']['state'] = $lub(sec_lvl('$tmp75', null, true, $Γ['global']['$tmp1']['markAsRunnable']), sec_lvl('STATE_RUNNABLE', null, true, $Γ['global']['$tmp1']['markAsRunnable']));
    //$Γ['global']['$tmp1']['markAsRunnable']['$this']['state'] instanceof Object ? $Γ['global']['$tmp1']['markAsRunnable']['$this']['state'].Σ = $lub($Γ['global']['$tmp1']['markAsRunnable']['$this']['state'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['markAsRunnable']['$this']['state'] = $lub($Γ['global']['$tmp1']['markAsRunnable']['$this']['state'], $Λ[$Λ.length - 1].l);
    return;
};
$Γ['global']['$tmp1']['markAsRunnable'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$tmp1 = TaskControlBlock.prototype;
$Γ['global']['$tmp1'] = sec_lvl('TaskControlBlock', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp1'] instanceof Object ? $Γ['global']['$tmp1'].Σ = $lub($Γ['global']['$tmp1'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1'] = $lub($Γ['global']['$tmp1'], $Λ[$Λ.length - 1].l);
$tmp1.run = function () {
    var packet, $tmp76, $tmp77, $tmp78, $tmp79;
    $Γ['global']['$tmp1']['run']['$tmp79'] = $Γ['global']['$tmp1']['run']['$tmp78'] = $Γ['global']['$tmp1']['run']['$tmp77'] = $Γ['global']['$tmp1']['run']['$tmp76'] = $Γ['global']['$tmp1']['run']['packet'] = 0;
    $tmp77 = this.state;
    $Γ['global']['$tmp1']['run']['$tmp77'] = sec_lvl('$tmp1', 'state', false, $Γ['global']['$tmp1']['run']);
    $Γ['global']['$tmp1']['run']['$tmp77'] instanceof Object ? $Γ['global']['$tmp1']['run']['$tmp77'].Σ = $lub($Γ['global']['$tmp1']['run']['$tmp77'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['run']['$tmp77'] = $lub($Γ['global']['$tmp1']['run']['$tmp77'], $Λ[$Λ.length - 1].l);
    $tmp76 = $tmp77 == STATE_SUSPENDED_RUNNABLE;
    $Γ['global']['$tmp1']['run']['$tmp76'] = $lub(sec_lvl('$tmp77', null, true, $Γ['global']['$tmp1']['run']), sec_lvl('STATE_SUSPENDED_RUNNABLE', null, true, $Γ['global']['$tmp1']['run']));
    $Γ['global']['$tmp1']['run']['$tmp76'] instanceof Object ? $Γ['global']['$tmp1']['run']['$tmp76'].Σ = $lub($Γ['global']['$tmp1']['run']['$tmp76'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['run']['$tmp76'] = $lub($Γ['global']['$tmp1']['run']['$tmp76'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp76', null, true, $Γ['global']['$tmp1']['run'])),
        id: 'IF'
    });
    if ($tmp76) {
        packet = this.queue;
        $scope($Γ['global']['$tmp1']['run'], 'packet', true)['packet'] = sec_lvl('$tmp1', 'queue', false, $Γ['global']['$tmp1']['run']);
        $scope($Γ['global']['$tmp1']['run'], 'packet', true)['packet'] instanceof Object ? $scope($Γ['global']['$tmp1']['run'], 'packet', true)['packet'].Σ = $lub($scope($Γ['global']['$tmp1']['run'], 'packet', true)['packet'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp1']['run'], 'packet', true)['packet'] = $lub($scope($Γ['global']['$tmp1']['run'], 'packet', true)['packet'], $Λ[$Λ.length - 1].l);
        this.queue = packet.link;
        //$Γ['global']['$tmp1']['run']['$this']['queue'] = sec_lvl('packet', 'link', false, $Γ['global']['$tmp1']['run']);
        //$Γ['global']['$tmp1']['run']['$this']['queue'] instanceof Object ? $Γ['global']['$tmp1']['run']['$this']['queue'].Σ = $lub($Γ['global']['$tmp1']['run']['$this']['queue'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['run']['$this']['queue'] = $lub($Γ['global']['$tmp1']['run']['$this']['queue'], $Λ[$Λ.length - 1].l);
        var $tmp80, $tmp81;
        $Γ['global']['$tmp1']['run']['$tmp81'] = $Γ['global']['$tmp1']['run']['$tmp80'] = 0;
        $tmp81 = this.queue;
        $Γ['global']['$tmp1']['run']['$tmp81'] = sec_lvl('$tmp1', 'queue', false, $Γ['global']['$tmp1']['run']);
        $Γ['global']['$tmp1']['run']['$tmp81'] instanceof Object ? $Γ['global']['$tmp1']['run']['$tmp81'].Σ = $lub($Γ['global']['$tmp1']['run']['$tmp81'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['run']['$tmp81'] = $lub($Γ['global']['$tmp1']['run']['$tmp81'], $Λ[$Λ.length - 1].l);
        $tmp80 = $tmp81 == null;
        $Γ['global']['$tmp1']['run']['$tmp80'] = $lub(sec_lvl('$tmp81', null, true, $Γ['global']['$tmp1']['run']), $Λ[$Λ.length - 1].l);
        $Γ['global']['$tmp1']['run']['$tmp80'] instanceof Object ? $Γ['global']['$tmp1']['run']['$tmp80'].Σ = $lub($Γ['global']['$tmp1']['run']['$tmp80'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['run']['$tmp80'] = $lub($Γ['global']['$tmp1']['run']['$tmp80'], $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp80', null, true, $Γ['global']['$tmp1']['run'])),
            id: 'IF'
        });
        if ($tmp80) {
            this.state = STATE_RUNNING;
            //$Γ['global']['$tmp1']['run']['$this']['state'] = sec_lvl('STATE_RUNNING', null, false, $Γ['global']['$tmp1']['run']);
            //$Γ['global']['$tmp1']['run']['$this']['state'] instanceof Object ? $Γ['global']['$tmp1']['run']['$this']['state'].Σ = $lub($Γ['global']['$tmp1']['run']['$this']['state'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['run']['$this']['state'] = $lub($Γ['global']['$tmp1']['run']['$this']['state'], $Λ[$Λ.length - 1].l);
        } else {
            this.state = STATE_RUNNABLE;
            //$Γ['global']['$tmp1']['run']['$this']['state'] = sec_lvl('STATE_RUNNABLE', null, false, $Γ['global']['$tmp1']['run']);
            //$Γ['global']['$tmp1']['run']['$this']['state'] instanceof Object ? $Γ['global']['$tmp1']['run']['$this']['state'].Σ = $lub($Γ['global']['$tmp1']['run']['$this']['state'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['run']['$this']['state'] = $lub($Γ['global']['$tmp1']['run']['$this']['state'], $Λ[$Λ.length - 1].l);
        }
        $Λ.pop();
    } else {
        packet = null;
        $scope($Γ['global']['$tmp1']['run'], 'packet', true)['packet'] = $Λ[$Λ.length - 1].l;
    }
    $Λ.pop();
    $tmp79 = this.task;
    $Γ['global']['$tmp1']['run']['$tmp79'] = sec_lvl('$tmp1', 'task', false, $Γ['global']['$tmp1']['run']);
    $Γ['global']['$tmp1']['run']['$tmp79'] instanceof Object ? $Γ['global']['$tmp1']['run']['$tmp79'].Σ = $lub($Γ['global']['$tmp1']['run']['$tmp79'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['run']['$tmp79'] = $lub($Γ['global']['$tmp1']['run']['$tmp79'], $Λ[$Λ.length - 1].l);
    $tmp78 = $tmp79.run(packet);
    return $tmp78;
};
$Γ['global']['$tmp1']['run'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$tmp1 = TaskControlBlock.prototype;
$Γ['global']['$tmp1'] = sec_lvl('TaskControlBlock', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp1'] instanceof Object ? $Γ['global']['$tmp1'].Σ = $lub($Γ['global']['$tmp1'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1'] = $lub($Γ['global']['$tmp1'], $Λ[$Λ.length - 1].l);
$tmp1.checkPriorityAdd = function (task, packet) {
    var $tmp82, $tmp83;
    $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp83'] = $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp82'] = 0;
    $tmp83 = this.queue;
    $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp83'] = sec_lvl('$tmp1', 'queue', false, $Γ['global']['$tmp1']['checkPriorityAdd']);
    $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp83'] instanceof Object ? $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp83'].Σ = $lub($Γ['global']['$tmp1']['checkPriorityAdd']['$tmp83'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp83'] = $lub($Γ['global']['$tmp1']['checkPriorityAdd']['$tmp83'], $Λ[$Λ.length - 1].l);
    $tmp82 = $tmp83 == null;
    $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp82'] = $lub(sec_lvl('$tmp83', null, true, $Γ['global']['$tmp1']['checkPriorityAdd']), $Λ[$Λ.length - 1].l);
    $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp82'] instanceof Object ? $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp82'].Σ = $lub($Γ['global']['$tmp1']['checkPriorityAdd']['$tmp82'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp82'] = $lub($Γ['global']['$tmp1']['checkPriorityAdd']['$tmp82'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp82', null, true, $Γ['global']['$tmp1']['checkPriorityAdd'])),
        id: 'IF'
    });
    if ($tmp82) {
        $upgrade([
            'packet.addTo',
            'this'
        ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp1']['checkPriorityAdd']);
        this.queue = packet;
        //$Γ['global']['$tmp1']['checkPriorityAdd']['$this']['queue'] = sec_lvl('packet', null, false, $Γ['global']['$tmp1']['checkPriorityAdd']);
        //$Γ['global']['$tmp1']['checkPriorityAdd']['$this']['queue'] instanceof Object ? $Γ['global']['$tmp1']['checkPriorityAdd']['$this']['queue'].Σ = $lub($Γ['global']['$tmp1']['checkPriorityAdd']['$this']['queue'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['checkPriorityAdd']['$this']['queue'] = $lub($Γ['global']['$tmp1']['checkPriorityAdd']['$this']['queue'], $Λ[$Λ.length - 1].l);
        var $tmp84, $tmp85, $tmp86, $tmp87;
        $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp87'] = $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp86'] = $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp85'] = $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp84'] = 0;
        $rf = $prop('$tmp1', 'markAsRunnable', $Γ['global']['$tmp1']['checkPriorityAdd']);
        $rf.scope = $Γ['global']['$tmp1']['checkPriorityAdd'];
        $rf.$this = $Γ['global']['$tmp1']['checkPriorityAdd']['$this'];
        $Λ.push({
            l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
            id: 'FUNC'
        });
        $tmp84 = this.markAsRunnable();
        $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp84'] = $Λ.pop().l;
        $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp84'] instanceof Object ? $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp84'].Σ = $lub($Γ['global']['$tmp1']['checkPriorityAdd']['$tmp84'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp84'] = $lub($Γ['global']['$tmp1']['checkPriorityAdd']['$tmp84'], $Λ[$Λ.length - 1].l);
        $tmp86 = this.priority;
        $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp86'] = sec_lvl('$tmp1', 'priority', false, $Γ['global']['$tmp1']['checkPriorityAdd']);
        $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp86'] instanceof Object ? $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp86'].Σ = $lub($Γ['global']['$tmp1']['checkPriorityAdd']['$tmp86'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp86'] = $lub($Γ['global']['$tmp1']['checkPriorityAdd']['$tmp86'], $Λ[$Λ.length - 1].l);
        $tmp87 = task.priority;
        $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp87'] = sec_lvl('task', 'priority', false, $Γ['global']['$tmp1']['checkPriorityAdd']);
        $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp87'] instanceof Object ? $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp87'].Σ = $lub($Γ['global']['$tmp1']['checkPriorityAdd']['$tmp87'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp87'] = $lub($Γ['global']['$tmp1']['checkPriorityAdd']['$tmp87'], $Λ[$Λ.length - 1].l);
        $tmp85 = $tmp86 > $tmp87;
        $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp85'] = $lub(sec_lvl('$tmp86', null, true, $Γ['global']['$tmp1']['checkPriorityAdd']), sec_lvl('$tmp87', null, true, $Γ['global']['$tmp1']['checkPriorityAdd']));
        $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp85'] instanceof Object ? $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp85'].Σ = $lub($Γ['global']['$tmp1']['checkPriorityAdd']['$tmp85'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp85'] = $lub($Γ['global']['$tmp1']['checkPriorityAdd']['$tmp85'], $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp85', null, true, $Γ['global']['$tmp1']['checkPriorityAdd'])),
            id: 'IF'
        });
        if ($tmp85) {
            var $tmp149;
            $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp149'] = 0;
            $tmp149 = this;
            $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp149'] = $Γ['global']['$tmp1']['checkPriorityAdd'].$this;
            $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp149'] instanceof Object ? $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp149'].Σ = $lub($Γ['global']['$tmp1']['checkPriorityAdd']['$tmp149'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp149'] = $lub($Γ['global']['$tmp1']['checkPriorityAdd']['$tmp149'], $Λ[$Λ.length - 1].l);
            return $tmp149;
            var $shouldComp = { 'lbl': 'FUNC' };
        } else {
        }
        if ($shouldComp)
            $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
        $Λ.pop();
    } else {
        $upgrade(['$tmp84'], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp1']['checkPriorityAdd']);
        var $tmp88;
        $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp88'] = 0;
        $tmp88 = this.queue;
        $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp88'] = sec_lvl('$tmp1', 'queue', false, $Γ['global']['$tmp1']['checkPriorityAdd']);
        $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp88'] instanceof Object ? $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp88'].Σ = $lub($Γ['global']['$tmp1']['checkPriorityAdd']['$tmp88'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['checkPriorityAdd']['$tmp88'] = $lub($Γ['global']['$tmp1']['checkPriorityAdd']['$tmp88'], $Λ[$Λ.length - 1].l);
        this.queue = packet.addTo($tmp88);
    }
    $Λ.pop();
    return task;
};
$Γ['global']['$tmp1']['checkPriorityAdd'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    task: $Λ[$Λ.length - 1].l,
    packet: $Λ[$Λ.length - 1].l
};
$tmp1 = TaskControlBlock.prototype;
$Γ['global']['$tmp1'] = sec_lvl('TaskControlBlock', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp1'] instanceof Object ? $Γ['global']['$tmp1'].Σ = $lub($Γ['global']['$tmp1'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1'] = $lub($Γ['global']['$tmp1'], $Λ[$Λ.length - 1].l);
$tmp1.toString = function () {
    var $tmp89, $tmp90, $tmp91, $tmp92, $tmp93, $tmp94;
    $Γ['global']['$tmp1']['toString']['$tmp94'] = $Γ['global']['$tmp1']['toString']['$tmp93'] = $Γ['global']['$tmp1']['toString']['$tmp92'] = $Γ['global']['$tmp1']['toString']['$tmp91'] = $Γ['global']['$tmp1']['toString']['$tmp90'] = $Γ['global']['$tmp1']['toString']['$tmp89'] = 0;
    $tmp93 = this.task;
    $Γ['global']['$tmp1']['toString']['$tmp93'] = sec_lvl('$tmp1', 'task', false, $Γ['global']['$tmp1']['toString']);
    $Γ['global']['$tmp1']['toString']['$tmp93'] instanceof Object ? $Γ['global']['$tmp1']['toString']['$tmp93'].Σ = $lub($Γ['global']['$tmp1']['toString']['$tmp93'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['toString']['$tmp93'] = $lub($Γ['global']['$tmp1']['toString']['$tmp93'], $Λ[$Λ.length - 1].l);
    $tmp92 = 'tcb { ' + $tmp93;
    $Γ['global']['$tmp1']['toString']['$tmp92'] = $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp93', null, true, $Γ['global']['$tmp1']['toString']));
    $Γ['global']['$tmp1']['toString']['$tmp92'] instanceof Object ? $Γ['global']['$tmp1']['toString']['$tmp92'].Σ = $lub($Γ['global']['$tmp1']['toString']['$tmp92'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['toString']['$tmp92'] = $lub($Γ['global']['$tmp1']['toString']['$tmp92'], $Λ[$Λ.length - 1].l);
    $tmp91 = $tmp92 + '@';
    $Γ['global']['$tmp1']['toString']['$tmp91'] = $lub(sec_lvl('$tmp92', null, true, $Γ['global']['$tmp1']['toString']), $Λ[$Λ.length - 1].l);
    $Γ['global']['$tmp1']['toString']['$tmp91'] instanceof Object ? $Γ['global']['$tmp1']['toString']['$tmp91'].Σ = $lub($Γ['global']['$tmp1']['toString']['$tmp91'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['toString']['$tmp91'] = $lub($Γ['global']['$tmp1']['toString']['$tmp91'], $Λ[$Λ.length - 1].l);
    $tmp94 = this.state;
    $Γ['global']['$tmp1']['toString']['$tmp94'] = sec_lvl('$tmp1', 'state', false, $Γ['global']['$tmp1']['toString']);
    $Γ['global']['$tmp1']['toString']['$tmp94'] instanceof Object ? $Γ['global']['$tmp1']['toString']['$tmp94'].Σ = $lub($Γ['global']['$tmp1']['toString']['$tmp94'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['toString']['$tmp94'] = $lub($Γ['global']['$tmp1']['toString']['$tmp94'], $Λ[$Λ.length - 1].l);
    $tmp90 = $tmp91 + $tmp94;
    $Γ['global']['$tmp1']['toString']['$tmp90'] = $lub(sec_lvl('$tmp91', null, true, $Γ['global']['$tmp1']['toString']), sec_lvl('$tmp94', null, true, $Γ['global']['$tmp1']['toString']));
    $Γ['global']['$tmp1']['toString']['$tmp90'] instanceof Object ? $Γ['global']['$tmp1']['toString']['$tmp90'].Σ = $lub($Γ['global']['$tmp1']['toString']['$tmp90'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['toString']['$tmp90'] = $lub($Γ['global']['$tmp1']['toString']['$tmp90'], $Λ[$Λ.length - 1].l);
    $tmp89 = $tmp90 + ' }';
    $Γ['global']['$tmp1']['toString']['$tmp89'] = $lub(sec_lvl('$tmp90', null, true, $Γ['global']['$tmp1']['toString']), $Λ[$Λ.length - 1].l);
    $Γ['global']['$tmp1']['toString']['$tmp89'] instanceof Object ? $Γ['global']['$tmp1']['toString']['$tmp89'].Σ = $lub($Γ['global']['$tmp1']['toString']['$tmp89'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp1']['toString']['$tmp89'] = $lub($Γ['global']['$tmp1']['toString']['$tmp89'], $Λ[$Λ.length - 1].l);
    return $tmp89;
};
$Γ['global']['$tmp1']['toString'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
function IdleTask(scheduler, v1, count) {
    this.scheduler = scheduler;
    $Γ['global']['IdleTask']['$this']['scheduler'] = sec_lvl('scheduler', null, false, $Γ['global']['IdleTask']);
    $Γ['global']['IdleTask']['$this']['scheduler'] instanceof Object ? $Γ['global']['IdleTask']['$this']['scheduler'].Σ = $lub($Γ['global']['IdleTask']['$this']['scheduler'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['IdleTask']['$this']['scheduler'] = $lub($Γ['global']['IdleTask']['$this']['scheduler'], $Λ[$Λ.length - 1].l);
    this.v1 = v1;
    $Γ['global']['IdleTask']['$this']['v1'] = sec_lvl('v1', null, false, $Γ['global']['IdleTask']);
    $Γ['global']['IdleTask']['$this']['v1'] instanceof Object ? $Γ['global']['IdleTask']['$this']['v1'].Σ = $lub($Γ['global']['IdleTask']['$this']['v1'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['IdleTask']['$this']['v1'] = $lub($Γ['global']['IdleTask']['$this']['v1'], $Λ[$Λ.length - 1].l);
    this.count = count;
    $Γ['global']['IdleTask']['$this']['count'] = sec_lvl('count', null, false, $Γ['global']['IdleTask']);
    $Γ['global']['IdleTask']['$this']['count'] instanceof Object ? $Γ['global']['IdleTask']['$this']['count'].Σ = $lub($Γ['global']['IdleTask']['$this']['count'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['IdleTask']['$this']['count'] = $lub($Γ['global']['IdleTask']['$this']['count'], $Λ[$Λ.length - 1].l);
    return;
}
$tmp2 = IdleTask.prototype;
$Γ['global']['$tmp2'] = sec_lvl('IdleTask', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp2'] instanceof Object ? $Γ['global']['$tmp2'].Σ = $lub($Γ['global']['$tmp2'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp2'] = $lub($Γ['global']['$tmp2'], $Λ[$Λ.length - 1].l);
$tmp2.run = function (packet) {
    var $tmp95, $tmp96, $tmp97, $tmp98, $tmp99, $tmp100, $tmp101;
    $Γ['global']['$tmp2']['run']['$tmp101'] = $Γ['global']['$tmp2']['run']['$tmp100'] = $Γ['global']['$tmp2']['run']['$tmp99'] = $Γ['global']['$tmp2']['run']['$tmp98'] = $Γ['global']['$tmp2']['run']['$tmp97'] = $Γ['global']['$tmp2']['run']['$tmp96'] = $Γ['global']['$tmp2']['run']['$tmp95'] = 0;
    $tmp96 = this;
    $Γ['global']['$tmp2']['run']['$tmp96'] = $Γ['global']['$tmp2']['run'].$this;
    $Γ['global']['$tmp2']['run']['$tmp96'] instanceof Object ? $Γ['global']['$tmp2']['run']['$tmp96'].Σ = $lub($Γ['global']['$tmp2']['run']['$tmp96'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp2']['run']['$tmp96'] = $lub($Γ['global']['$tmp2']['run']['$tmp96'], $Λ[$Λ.length - 1].l);
    $tmp95 = $tmp96.count--;
    $Γ['global']['$tmp2']['run']['$tmp95'] = sec_lvl('$tmp96', 'count', false, $Γ['global']['$tmp2']['run']);
    $Γ['global']['$tmp2']['run']['$tmp95'] instanceof Object ? $Γ['global']['$tmp2']['run']['$tmp95'].Σ = $lub($Γ['global']['$tmp2']['run']['$tmp95'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp2']['run']['$tmp95'] = $lub($Γ['global']['$tmp2']['run']['$tmp95'], $Λ[$Λ.length - 1].l);
    $tmp98 = this.count;
    $Γ['global']['$tmp2']['run']['$tmp98'] = sec_lvl('$tmp2', 'count', false, $Γ['global']['$tmp2']['run']);
    $Γ['global']['$tmp2']['run']['$tmp98'] instanceof Object ? $Γ['global']['$tmp2']['run']['$tmp98'].Σ = $lub($Γ['global']['$tmp2']['run']['$tmp98'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp2']['run']['$tmp98'] = $lub($Γ['global']['$tmp2']['run']['$tmp98'], $Λ[$Λ.length - 1].l);
    $tmp97 = $tmp98 == 0;
    $Γ['global']['$tmp2']['run']['$tmp97'] = $lub(sec_lvl('$tmp98', null, true, $Γ['global']['$tmp2']['run']), $Λ[$Λ.length - 1].l);
    $Γ['global']['$tmp2']['run']['$tmp97'] instanceof Object ? $Γ['global']['$tmp2']['run']['$tmp97'].Σ = $lub($Γ['global']['$tmp2']['run']['$tmp97'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp2']['run']['$tmp97'] = $lub($Γ['global']['$tmp2']['run']['$tmp97'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp97', null, true, $Γ['global']['$tmp2']['run'])),
        id: 'IF'
    });
    if ($tmp97) {
        var $tmp150, $tmp104;
        $Γ['global']['$tmp2']['run']['$tmp104'] = $Γ['global']['$tmp2']['run']['$tmp150'] = 0;
        $tmp104 = this.scheduler;
        $Γ['global']['$tmp2']['run']['$tmp104'] = sec_lvl('$tmp2', 'scheduler', false, $Γ['global']['$tmp2']['run']);
        $Γ['global']['$tmp2']['run']['$tmp104'] instanceof Object ? $Γ['global']['$tmp2']['run']['$tmp104'].Σ = $lub($Γ['global']['$tmp2']['run']['$tmp104'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp2']['run']['$tmp104'] = $lub($Γ['global']['$tmp2']['run']['$tmp104'], $Λ[$Λ.length - 1].l);
        $tmp150 = $tmp104.holdCurrent();
        return $tmp150;
        var $shouldComp = { 'lbl': 'FUNC' };
    } else {
        $upgrade([
            '$tmp104.holdCurrent',
            '$tmp150'
        ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp2']['run']);
    }
    if ($shouldComp)
        $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
    $Λ.pop();
    $tmp101 = this.v1;
    $Γ['global']['$tmp2']['run']['$tmp101'] = sec_lvl('$tmp2', 'v1', false, $Γ['global']['$tmp2']['run']);
    $Γ['global']['$tmp2']['run']['$tmp101'] instanceof Object ? $Γ['global']['$tmp2']['run']['$tmp101'].Σ = $lub($Γ['global']['$tmp2']['run']['$tmp101'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp2']['run']['$tmp101'] = $lub($Γ['global']['$tmp2']['run']['$tmp101'], $Λ[$Λ.length - 1].l);
    $tmp100 = $tmp101 & 1;
    $Γ['global']['$tmp2']['run']['$tmp100'] = $lub(sec_lvl('$tmp101', null, true, $Γ['global']['$tmp2']['run']), $Λ[$Λ.length - 1].l);
    $Γ['global']['$tmp2']['run']['$tmp100'] instanceof Object ? $Γ['global']['$tmp2']['run']['$tmp100'].Σ = $lub($Γ['global']['$tmp2']['run']['$tmp100'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp2']['run']['$tmp100'] = $lub($Γ['global']['$tmp2']['run']['$tmp100'], $Λ[$Λ.length - 1].l);
    $tmp99 = $tmp100 == 0;
    $Γ['global']['$tmp2']['run']['$tmp99'] = $lub(sec_lvl('$tmp100', null, true, $Γ['global']['$tmp2']['run']), $Λ[$Λ.length - 1].l);
    $Γ['global']['$tmp2']['run']['$tmp99'] instanceof Object ? $Γ['global']['$tmp2']['run']['$tmp99'].Σ = $lub($Γ['global']['$tmp2']['run']['$tmp99'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp2']['run']['$tmp99'] = $lub($Γ['global']['$tmp2']['run']['$tmp99'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp99', null, true, $Γ['global']['$tmp2']['run'])),
        id: 'IF'
    });
    if ($tmp99) {
        $upgrade([
            '$tmp104.release',
            '$tmp107'
        ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp2']['run']);
        var $tmp102, $tmp103, $tmp104;
        $Γ['global']['$tmp2']['run']['$tmp104'] = $Γ['global']['$tmp2']['run']['$tmp103'] = $Γ['global']['$tmp2']['run']['$tmp102'] = 0;
        $tmp102 = this.v1;
        $Γ['global']['$tmp2']['run']['$tmp102'] = sec_lvl('$tmp2', 'v1', false, $Γ['global']['$tmp2']['run']);
        $Γ['global']['$tmp2']['run']['$tmp102'] instanceof Object ? $Γ['global']['$tmp2']['run']['$tmp102'].Σ = $lub($Γ['global']['$tmp2']['run']['$tmp102'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp2']['run']['$tmp102'] = $lub($Γ['global']['$tmp2']['run']['$tmp102'], $Λ[$Λ.length - 1].l);
        this.v1 = $tmp102 >> 1;
        //$Γ['global']['$tmp2']['run']['$this']['v1'] = $lub(sec_lvl('$tmp102', null, true, $Γ['global']['$tmp2']['run']), $Λ[$Λ.length - 1].l);
        //$Γ['global']['$tmp2']['run']['$this']['v1'] instanceof Object ? $Γ['global']['$tmp2']['run']['$this']['v1'].Σ = $lub($Γ['global']['$tmp2']['run']['$this']['v1'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp2']['run']['$this']['v1'] = $lub($Γ['global']['$tmp2']['run']['$this']['v1'], $Λ[$Λ.length - 1].l);
        $tmp104 = this.scheduler;
        $Γ['global']['$tmp2']['run']['$tmp104'] = sec_lvl('$tmp2', 'scheduler', false, $Γ['global']['$tmp2']['run']);
        $Γ['global']['$tmp2']['run']['$tmp104'] instanceof Object ? $Γ['global']['$tmp2']['run']['$tmp104'].Σ = $lub($Γ['global']['$tmp2']['run']['$tmp104'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp2']['run']['$tmp104'] = $lub($Γ['global']['$tmp2']['run']['$tmp104'], $Λ[$Λ.length - 1].l);
        $tmp103 = $tmp104.release(ID_DEVICE_A);
        return $tmp103;
        var $shouldComp = { 'lbl': 'FUNC' };
    } else {
        $upgrade([
            '$tmp104.release',
            '$tmp103'
        ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp2']['run']);
        var $tmp105, $tmp106, $tmp107, $tmp104;
        $Γ['global']['$tmp2']['run']['$tmp104'] = $Γ['global']['$tmp2']['run']['$tmp107'] = $Γ['global']['$tmp2']['run']['$tmp106'] = $Γ['global']['$tmp2']['run']['$tmp105'] = 0;
        $tmp106 = this.v1;
        $Γ['global']['$tmp2']['run']['$tmp106'] = sec_lvl('$tmp2', 'v1', false, $Γ['global']['$tmp2']['run']);
        $Γ['global']['$tmp2']['run']['$tmp106'] instanceof Object ? $Γ['global']['$tmp2']['run']['$tmp106'].Σ = $lub($Γ['global']['$tmp2']['run']['$tmp106'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp2']['run']['$tmp106'] = $lub($Γ['global']['$tmp2']['run']['$tmp106'], $Λ[$Λ.length - 1].l);
        $tmp105 = $tmp106 >> 1;
        $Γ['global']['$tmp2']['run']['$tmp105'] = $lub(sec_lvl('$tmp106', null, true, $Γ['global']['$tmp2']['run']), $Λ[$Λ.length - 1].l);
        $Γ['global']['$tmp2']['run']['$tmp105'] instanceof Object ? $Γ['global']['$tmp2']['run']['$tmp105'].Σ = $lub($Γ['global']['$tmp2']['run']['$tmp105'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp2']['run']['$tmp105'] = $lub($Γ['global']['$tmp2']['run']['$tmp105'], $Λ[$Λ.length - 1].l);
        this.v1 = $tmp105 ^ 53256;
        //$Γ['global']['$tmp2']['run']['$this']['v1'] = $lub(sec_lvl('$tmp105', null, true, $Γ['global']['$tmp2']['run']), $Λ[$Λ.length - 1].l);
        //$Γ['global']['$tmp2']['run']['$this']['v1'] instanceof Object ? $Γ['global']['$tmp2']['run']['$this']['v1'].Σ = $lub($Γ['global']['$tmp2']['run']['$this']['v1'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp2']['run']['$this']['v1'] = $lub($Γ['global']['$tmp2']['run']['$this']['v1'], $Λ[$Λ.length - 1].l);
        $tmp104 = this.scheduler;
        $Γ['global']['$tmp2']['run']['$tmp104'] = sec_lvl('$tmp2', 'scheduler', false, $Γ['global']['$tmp2']['run']);
        $Γ['global']['$tmp2']['run']['$tmp104'] instanceof Object ? $Γ['global']['$tmp2']['run']['$tmp104'].Σ = $lub($Γ['global']['$tmp2']['run']['$tmp104'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp2']['run']['$tmp104'] = $lub($Γ['global']['$tmp2']['run']['$tmp104'], $Λ[$Λ.length - 1].l);
        $tmp107 = $tmp104.release(ID_DEVICE_B);
        return $tmp107;
        var $shouldComp = { 'lbl': 'FUNC' };
    }
    if ($shouldComp)
        $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
    $Λ.pop();
    return;
};
$Γ['global']['$tmp2']['run'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    packet: $Λ[$Λ.length - 1].l
};
$tmp2 = IdleTask.prototype;
$Γ['global']['$tmp2'] = sec_lvl('IdleTask', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp2'] instanceof Object ? $Γ['global']['$tmp2'].Σ = $lub($Γ['global']['$tmp2'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp2'] = $lub($Γ['global']['$tmp2'], $Λ[$Λ.length - 1].l);
$tmp2.toString = function () {
    var $tmp108;
    $Γ['global']['$tmp2']['toString']['$tmp108'] = 0;
    $tmp108 = 'IdleTask';
    $Γ['global']['$tmp2']['toString']['$tmp108'] = $Λ[$Λ.length - 1].l;
    return $tmp108;
};
$Γ['global']['$tmp2']['toString'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
function DeviceTask(scheduler) {
    this.scheduler = scheduler;
    $Γ['global']['DeviceTask']['$this']['scheduler'] = sec_lvl('scheduler', null, false, $Γ['global']['DeviceTask']);
    $Γ['global']['DeviceTask']['$this']['scheduler'] instanceof Object ? $Γ['global']['DeviceTask']['$this']['scheduler'].Σ = $lub($Γ['global']['DeviceTask']['$this']['scheduler'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['DeviceTask']['$this']['scheduler'] = $lub($Γ['global']['DeviceTask']['$this']['scheduler'], $Λ[$Λ.length - 1].l);
    this.v1 = null;
    $Γ['global']['DeviceTask']['$this']['v1'] = $Λ[$Λ.length - 1].l;
    return;
}
$tmp3 = DeviceTask.prototype;
$Γ['global']['$tmp3'] = sec_lvl('DeviceTask', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp3'] instanceof Object ? $Γ['global']['$tmp3'].Σ = $lub($Γ['global']['$tmp3'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp3'] = $lub($Γ['global']['$tmp3'], $Λ[$Λ.length - 1].l);
$tmp3.run = function (packet) {
    var $tmp109;
    $Γ['global']['$tmp3']['run']['$tmp109'] = 0;
    $tmp109 = packet == null;
    $Γ['global']['$tmp3']['run']['$tmp109'] = $lub(sec_lvl('packet', null, true, $Γ['global']['$tmp3']['run']), $Λ[$Λ.length - 1].l);
    $Γ['global']['$tmp3']['run']['$tmp109'] instanceof Object ? $Γ['global']['$tmp3']['run']['$tmp109'].Σ = $lub($Γ['global']['$tmp3']['run']['$tmp109'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp3']['run']['$tmp109'] = $lub($Γ['global']['$tmp3']['run']['$tmp109'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp109', null, true, $Γ['global']['$tmp3']['run'])),
        id: 'IF'
    });
    if ($tmp109) {
        $upgrade([
            '$tmp104.holdCurrent',
            '$tmp113'
        ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp3']['run']);
        var $tmp110, $tmp111, v, $tmp112, $tmp104;
        $Γ['global']['$tmp3']['run']['$tmp104'] = $Γ['global']['$tmp3']['run']['$tmp112'] = $Γ['global']['$tmp3']['run']['v'] = $Γ['global']['$tmp3']['run']['$tmp111'] = $Γ['global']['$tmp3']['run']['$tmp110'] = 0;
        $tmp111 = this.v1;
        $Γ['global']['$tmp3']['run']['$tmp111'] = sec_lvl('$tmp3', 'v1', false, $Γ['global']['$tmp3']['run']);
        $Γ['global']['$tmp3']['run']['$tmp111'] instanceof Object ? $Γ['global']['$tmp3']['run']['$tmp111'].Σ = $lub($Γ['global']['$tmp3']['run']['$tmp111'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp3']['run']['$tmp111'] = $lub($Γ['global']['$tmp3']['run']['$tmp111'], $Λ[$Λ.length - 1].l);
        $tmp110 = $tmp111 == null;
        $Γ['global']['$tmp3']['run']['$tmp110'] = $lub(sec_lvl('$tmp111', null, true, $Γ['global']['$tmp3']['run']), $Λ[$Λ.length - 1].l);
        $Γ['global']['$tmp3']['run']['$tmp110'] instanceof Object ? $Γ['global']['$tmp3']['run']['$tmp110'].Σ = $lub($Γ['global']['$tmp3']['run']['$tmp110'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp3']['run']['$tmp110'] = $lub($Γ['global']['$tmp3']['run']['$tmp110'], $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp110', null, true, $Γ['global']['$tmp3']['run'])),
            id: 'IF'
        });
        if ($tmp110) {
            var $tmp151, $tmp104;
            $Γ['global']['$tmp3']['run']['$tmp104'] = $Γ['global']['$tmp3']['run']['$tmp151'] = 0;
            $tmp104 = this.scheduler;
            $Γ['global']['$tmp3']['run']['$tmp104'] = sec_lvl('$tmp3', 'scheduler', false, $Γ['global']['$tmp3']['run']);
            $Γ['global']['$tmp3']['run']['$tmp104'] instanceof Object ? $Γ['global']['$tmp3']['run']['$tmp104'].Σ = $lub($Γ['global']['$tmp3']['run']['$tmp104'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp3']['run']['$tmp104'] = $lub($Γ['global']['$tmp3']['run']['$tmp104'], $Λ[$Λ.length - 1].l);
            $tmp151 = $tmp104.suspendCurrent();
            return $tmp151;
            var $shouldComp = { 'lbl': 'FUNC' };
        } else {
            $upgrade([
                '$tmp104.suspendCurrent',
                '$tmp151'
            ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp3']['run']);
        }
        if ($shouldComp)
            $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
        $Λ.pop();
        v = this.v1;
        $scope($Γ['global']['$tmp3']['run'], 'v', true)['v'] = sec_lvl('$tmp3', 'v1', false, $Γ['global']['$tmp3']['run']);
        $scope($Γ['global']['$tmp3']['run'], 'v', true)['v'] instanceof Object ? $scope($Γ['global']['$tmp3']['run'], 'v', true)['v'].Σ = $lub($scope($Γ['global']['$tmp3']['run'], 'v', true)['v'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp3']['run'], 'v', true)['v'] = $lub($scope($Γ['global']['$tmp3']['run'], 'v', true)['v'], $Λ[$Λ.length - 1].l);
        this.v1 = null;
        //$Γ['global']['$tmp3']['run']['$this']['v1'] = $Λ[$Λ.length - 1].l;
        $tmp104 = this.scheduler;
        $Γ['global']['$tmp3']['run']['$tmp104'] = sec_lvl('$tmp3', 'scheduler', false, $Γ['global']['$tmp3']['run']);
        $Γ['global']['$tmp3']['run']['$tmp104'] instanceof Object ? $Γ['global']['$tmp3']['run']['$tmp104'].Σ = $lub($Γ['global']['$tmp3']['run']['$tmp104'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp3']['run']['$tmp104'] = $lub($Γ['global']['$tmp3']['run']['$tmp104'], $Λ[$Λ.length - 1].l);
        $tmp112 = $tmp104.queue(v);
        return $tmp112;
        var $shouldComp = { 'lbl': 'FUNC' };
    } else {
        $upgrade([
            '$tmp104.suspendCurrent',
            '$tmp151',
            '$tmp104.queue',
            '$tmp112'
        ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp3']['run']);
        this.v1 = packet;
        //$Γ['global']['$tmp3']['run']['$this']['v1'] = sec_lvl('packet', null, false, $Γ['global']['$tmp3']['run']);
        //$Γ['global']['$tmp3']['run']['$this']['v1'] instanceof Object ? $Γ['global']['$tmp3']['run']['$this']['v1'].Σ = $lub($Γ['global']['$tmp3']['run']['$this']['v1'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp3']['run']['$this']['v1'] = $lub($Γ['global']['$tmp3']['run']['$this']['v1'], $Λ[$Λ.length - 1].l);
        var $tmp113, $tmp104;
        $Γ['global']['$tmp3']['run']['$tmp104'] = $Γ['global']['$tmp3']['run']['$tmp113'] = 0;
        $tmp104 = this.scheduler;
        $Γ['global']['$tmp3']['run']['$tmp104'] = sec_lvl('$tmp3', 'scheduler', false, $Γ['global']['$tmp3']['run']);
        $Γ['global']['$tmp3']['run']['$tmp104'] instanceof Object ? $Γ['global']['$tmp3']['run']['$tmp104'].Σ = $lub($Γ['global']['$tmp3']['run']['$tmp104'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp3']['run']['$tmp104'] = $lub($Γ['global']['$tmp3']['run']['$tmp104'], $Λ[$Λ.length - 1].l);
        $tmp113 = $tmp104.holdCurrent();
        return $tmp113;
        var $shouldComp = { 'lbl': 'FUNC' };
    }
    if ($shouldComp)
        $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
    $Λ.pop();
    return;
};
$Γ['global']['$tmp3']['run'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    packet: $Λ[$Λ.length - 1].l
};
$tmp3 = DeviceTask.prototype;
$Γ['global']['$tmp3'] = sec_lvl('DeviceTask', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp3'] instanceof Object ? $Γ['global']['$tmp3'].Σ = $lub($Γ['global']['$tmp3'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp3'] = $lub($Γ['global']['$tmp3'], $Λ[$Λ.length - 1].l);
$tmp3.toString = function () {
    var $tmp114;
    $Γ['global']['$tmp3']['toString']['$tmp114'] = 0;
    $tmp114 = 'DeviceTask';
    $Γ['global']['$tmp3']['toString']['$tmp114'] = $Λ[$Λ.length - 1].l;
    return $tmp114;
};
$Γ['global']['$tmp3']['toString'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
function WorkerTask(scheduler, v1, v2) {
    this.scheduler = scheduler;
    $Γ['global']['WorkerTask']['$this']['scheduler'] = sec_lvl('scheduler', null, false, $Γ['global']['WorkerTask']);
    $Γ['global']['WorkerTask']['$this']['scheduler'] instanceof Object ? $Γ['global']['WorkerTask']['$this']['scheduler'].Σ = $lub($Γ['global']['WorkerTask']['$this']['scheduler'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['WorkerTask']['$this']['scheduler'] = $lub($Γ['global']['WorkerTask']['$this']['scheduler'], $Λ[$Λ.length - 1].l);
    this.v1 = v1;
    $Γ['global']['WorkerTask']['$this']['v1'] = sec_lvl('v1', null, false, $Γ['global']['WorkerTask']);
    $Γ['global']['WorkerTask']['$this']['v1'] instanceof Object ? $Γ['global']['WorkerTask']['$this']['v1'].Σ = $lub($Γ['global']['WorkerTask']['$this']['v1'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['WorkerTask']['$this']['v1'] = $lub($Γ['global']['WorkerTask']['$this']['v1'], $Λ[$Λ.length - 1].l);
    this.v2 = v2;
    $Γ['global']['WorkerTask']['$this']['v2'] = sec_lvl('v2', null, false, $Γ['global']['WorkerTask']);
    $Γ['global']['WorkerTask']['$this']['v2'] instanceof Object ? $Γ['global']['WorkerTask']['$this']['v2'].Σ = $lub($Γ['global']['WorkerTask']['$this']['v2'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['WorkerTask']['$this']['v2'] = $lub($Γ['global']['WorkerTask']['$this']['v2'], $Λ[$Λ.length - 1].l);
    return;
}
$tmp4 = WorkerTask.prototype;
$Γ['global']['$tmp4'] = sec_lvl('WorkerTask', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp4'] instanceof Object ? $Γ['global']['$tmp4'].Σ = $lub($Γ['global']['$tmp4'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp4'] = $lub($Γ['global']['$tmp4'], $Λ[$Λ.length - 1].l);
$tmp4.run = function (packet) {
    var $tmp115;
    $Γ['global']['$tmp4']['run']['$tmp115'] = 0;
    $tmp115 = packet == null;
    $Γ['global']['$tmp4']['run']['$tmp115'] = $lub(sec_lvl('packet', null, true, $Γ['global']['$tmp4']['run']), $Λ[$Λ.length - 1].l);
    $Γ['global']['$tmp4']['run']['$tmp115'] instanceof Object ? $Γ['global']['$tmp4']['run']['$tmp115'].Σ = $lub($Γ['global']['$tmp4']['run']['$tmp115'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp4']['run']['$tmp115'] = $lub($Γ['global']['$tmp4']['run']['$tmp115'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp115', null, true, $Γ['global']['$tmp4']['run'])),
        id: 'IF'
    });
    if ($tmp115) {
        $upgrade([
            '$tmp104.queue',
            '$tmp121'
        ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp4']['run']);
        var $tmp116, $tmp104;
        $Γ['global']['$tmp4']['run']['$tmp104'] = $Γ['global']['$tmp4']['run']['$tmp116'] = 0;
        $tmp104 = this.scheduler;
        $Γ['global']['$tmp4']['run']['$tmp104'] = sec_lvl('$tmp4', 'scheduler', false, $Γ['global']['$tmp4']['run']);
        $Γ['global']['$tmp4']['run']['$tmp104'] instanceof Object ? $Γ['global']['$tmp4']['run']['$tmp104'].Σ = $lub($Γ['global']['$tmp4']['run']['$tmp104'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp4']['run']['$tmp104'] = $lub($Γ['global']['$tmp4']['run']['$tmp104'], $Λ[$Λ.length - 1].l);
        $tmp116 = $tmp104.suspendCurrent();
        return $tmp116;
        var $shouldComp = { 'lbl': 'FUNC' };
    } else {
        $upgrade([
            '$tmp104.suspendCurrent',
            '$tmp116'
        ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp4']['run']);
        var $tmp117, $tmp118, i, $tmp120, $tmp121, $tmp104;
        $Γ['global']['$tmp4']['run']['$tmp104'] = $Γ['global']['$tmp4']['run']['$tmp121'] = $Γ['global']['$tmp4']['run']['$tmp120'] = $Γ['global']['$tmp4']['run']['i'] = $Γ['global']['$tmp4']['run']['$tmp118'] = $Γ['global']['$tmp4']['run']['$tmp117'] = 0;
        $tmp118 = this.v1;
        $Γ['global']['$tmp4']['run']['$tmp118'] = sec_lvl('$tmp4', 'v1', false, $Γ['global']['$tmp4']['run']);
        $Γ['global']['$tmp4']['run']['$tmp118'] instanceof Object ? $Γ['global']['$tmp4']['run']['$tmp118'].Σ = $lub($Γ['global']['$tmp4']['run']['$tmp118'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp4']['run']['$tmp118'] = $lub($Γ['global']['$tmp4']['run']['$tmp118'], $Λ[$Λ.length - 1].l);
        $tmp117 = $tmp118 == ID_HANDLER_A;
        $Γ['global']['$tmp4']['run']['$tmp117'] = $lub(sec_lvl('$tmp118', null, true, $Γ['global']['$tmp4']['run']), sec_lvl('ID_HANDLER_A', null, true, $Γ['global']['$tmp4']['run']));
        $Γ['global']['$tmp4']['run']['$tmp117'] instanceof Object ? $Γ['global']['$tmp4']['run']['$tmp117'].Σ = $lub($Γ['global']['$tmp4']['run']['$tmp117'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp4']['run']['$tmp117'] = $lub($Γ['global']['$tmp4']['run']['$tmp117'], $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp117', null, true, $Γ['global']['$tmp4']['run'])),
            id: 'IF'
        });
        if ($tmp117) {
            this.v1 = ID_HANDLER_B;
            //$Γ['global']['$tmp4']['run']['$this']['v1'] = sec_lvl('ID_HANDLER_B', null, false, $Γ['global']['$tmp4']['run']);
            //$Γ['global']['$tmp4']['run']['$this']['v1'] instanceof Object ? $Γ['global']['$tmp4']['run']['$this']['v1'].Σ = $lub($Γ['global']['$tmp4']['run']['$this']['v1'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp4']['run']['$this']['v1'] = $lub($Γ['global']['$tmp4']['run']['$this']['v1'], $Λ[$Λ.length - 1].l);
        } else {
            this.v1 = ID_HANDLER_A;
            //$Γ['global']['$tmp4']['run']['$this']['v1'] = sec_lvl('ID_HANDLER_A', null, false, $Γ['global']['$tmp4']['run']);
            //$Γ['global']['$tmp4']['run']['$this']['v1'] instanceof Object ? $Γ['global']['$tmp4']['run']['$this']['v1'].Σ = $lub($Γ['global']['$tmp4']['run']['$this']['v1'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp4']['run']['$this']['v1'] = $lub($Γ['global']['$tmp4']['run']['$this']['v1'], $Λ[$Λ.length - 1].l);
        }
        $Λ.pop();
        packet.id = this.v1;
        $scope($Γ['global']['$tmp4']['run'], 'packet', false)['id'] = sec_lvl('$tmp4', 'v1', false, $Γ['global']['$tmp4']['run']);
        $scope($Γ['global']['$tmp4']['run'], 'packet', false)['id'] instanceof Object ? $scope($Γ['global']['$tmp4']['run'], 'packet', false)['id'].Σ = $lub($scope($Γ['global']['$tmp4']['run'], 'packet', false)['id'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp4']['run'], 'packet', false)['id'] = $lub($scope($Γ['global']['$tmp4']['run'], 'packet', false)['id'], $Λ[$Λ.length - 1].l);
        packet.a1 = 0;
        $scope($Γ['global']['$tmp4']['run'], 'packet', false)['a1'] = $Λ[$Λ.length - 1].l;
        i = 0;
        $scope($Γ['global']['$tmp4']['run'], 'i', true)['i'] = $Λ[$Λ.length - 1].l;
        $tmp120 = i < DATA_SIZE;
        $Γ['global']['$tmp4']['run']['$tmp120'] = $lub(sec_lvl('i', null, true, $Γ['global']['$tmp4']['run']), sec_lvl('DATA_SIZE', null, true, $Γ['global']['$tmp4']['run']));
        $Γ['global']['$tmp4']['run']['$tmp120'] instanceof Object ? $Γ['global']['$tmp4']['run']['$tmp120'].Σ = $lub($Γ['global']['$tmp4']['run']['$tmp120'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp4']['run']['$tmp120'] = $lub($Γ['global']['$tmp4']['run']['$tmp120'], $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp120', null, true, $Γ['global']['$tmp4']['run'])),
            id: 'LOOP'
        });
        for (; $tmp120;) {
            var $tmp122, $tmp123, $tmp124, $tmp125, $tmp126, $tmp119, $tmp120;
            $Γ['global']['$tmp4']['run']['$tmp120'] = $Γ['global']['$tmp4']['run']['$tmp119'] = $Γ['global']['$tmp4']['run']['$tmp126'] = $Γ['global']['$tmp4']['run']['$tmp125'] = $Γ['global']['$tmp4']['run']['$tmp124'] = $Γ['global']['$tmp4']['run']['$tmp123'] = $Γ['global']['$tmp4']['run']['$tmp122'] = 0;
            $tmp123 = this;
            $Γ['global']['$tmp4']['run']['$tmp123'] = $Γ['global']['$tmp4']['run'].$this;
            $Γ['global']['$tmp4']['run']['$tmp123'] instanceof Object ? $Γ['global']['$tmp4']['run']['$tmp123'].Σ = $lub($Γ['global']['$tmp4']['run']['$tmp123'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp4']['run']['$tmp123'] = $lub($Γ['global']['$tmp4']['run']['$tmp123'], $Λ[$Λ.length - 1].l);
            $tmp122 = $tmp123.v2++;
            $Γ['global']['$tmp4']['run']['$tmp122'] = sec_lvl('$tmp123', 'v2', false, $Γ['global']['$tmp4']['run']);
            $Γ['global']['$tmp4']['run']['$tmp122'] instanceof Object ? $Γ['global']['$tmp4']['run']['$tmp122'].Σ = $lub($Γ['global']['$tmp4']['run']['$tmp122'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp4']['run']['$tmp122'] = $lub($Γ['global']['$tmp4']['run']['$tmp122'], $Λ[$Λ.length - 1].l);
            $tmp125 = this.v2;
            $Γ['global']['$tmp4']['run']['$tmp125'] = sec_lvl('$tmp4', 'v2', false, $Γ['global']['$tmp4']['run']);
            $Γ['global']['$tmp4']['run']['$tmp125'] instanceof Object ? $Γ['global']['$tmp4']['run']['$tmp125'].Σ = $lub($Γ['global']['$tmp4']['run']['$tmp125'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp4']['run']['$tmp125'] = $lub($Γ['global']['$tmp4']['run']['$tmp125'], $Λ[$Λ.length - 1].l);
            $tmp124 = $tmp125 > 26;
            $Γ['global']['$tmp4']['run']['$tmp124'] = $lub(sec_lvl('$tmp125', null, true, $Γ['global']['$tmp4']['run']), $Λ[$Λ.length - 1].l);
            $Γ['global']['$tmp4']['run']['$tmp124'] instanceof Object ? $Γ['global']['$tmp4']['run']['$tmp124'].Σ = $lub($Γ['global']['$tmp4']['run']['$tmp124'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp4']['run']['$tmp124'] = $lub($Γ['global']['$tmp4']['run']['$tmp124'], $Λ[$Λ.length - 1].l);
            $Λ.push({
                l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp124', null, true, $Γ['global']['$tmp4']['run'])),
                id: 'IF'
            });
            if ($tmp124) {
                this.v2 = 1;
                //$Γ['global']['$tmp4']['run']['$this']['v2'] = $Λ[$Λ.length - 1].l;
            } else {
            }
            $Λ.pop();
            $tmp126 = packet.a2;
            $Γ['global']['$tmp4']['run']['$tmp126'] = sec_lvl('packet', 'a2', false, $Γ['global']['$tmp4']['run']);
            $Γ['global']['$tmp4']['run']['$tmp126'] instanceof Object ? $Γ['global']['$tmp4']['run']['$tmp126'].Σ = $lub($Γ['global']['$tmp4']['run']['$tmp126'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp4']['run']['$tmp126'] = $lub($Γ['global']['$tmp4']['run']['$tmp126'], $Λ[$Λ.length - 1].l);
            $tmp126[i] = this.v2;
            $Γ['global']['$tmp4']['run']['$tmp126']['i'] = sec_lvl('$tmp4', 'v2', false, $Γ['global']['$tmp4']['run']);
            _$tmp = sec_lvl('i', null, false, $Γ['global']['$tmp4']['run']) instanceof Object ? sec_lvl('i', null, false, $Γ['global']['$tmp4']['run']).Σ : sec_lvl('i', null, false, $Γ['global']['$tmp4']['run']);
            $Γ['global']['$tmp4']['run']['$tmp126']['i'] instanceof Object ? $Γ['global']['$tmp4']['run']['$tmp126']['i'].Σ = $lub($Γ['global']['$tmp4']['run']['$tmp126']['i'].Σ, _$tmp, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp4']['run']['$tmp126']['i'] = $lub($Γ['global']['$tmp4']['run']['$tmp126']['i'], _$tmp, $Λ[$Λ.length - 1].l);
            $tmp119 = i++;
            $Γ['global']['$tmp4']['run']['$tmp119'] = sec_lvl('i', null, false, $Γ['global']['$tmp4']['run']);
            $Γ['global']['$tmp4']['run']['$tmp119'] instanceof Object ? $Γ['global']['$tmp4']['run']['$tmp119'].Σ = $lub($Γ['global']['$tmp4']['run']['$tmp119'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp4']['run']['$tmp119'] = $lub($Γ['global']['$tmp4']['run']['$tmp119'], $Λ[$Λ.length - 1].l);
            $tmp120 = i < DATA_SIZE;
            $Γ['global']['$tmp4']['run']['$tmp120'] = $lub(sec_lvl('i', null, true, $Γ['global']['$tmp4']['run']), sec_lvl('DATA_SIZE', null, true, $Γ['global']['$tmp4']['run']));
            $Γ['global']['$tmp4']['run']['$tmp120'] instanceof Object ? $Γ['global']['$tmp4']['run']['$tmp120'].Σ = $lub($Γ['global']['$tmp4']['run']['$tmp120'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp4']['run']['$tmp120'] = $lub($Γ['global']['$tmp4']['run']['$tmp120'], $Λ[$Λ.length - 1].l);
        }
        $Λ.pop();
        $tmp104 = this.scheduler;
        $Γ['global']['$tmp4']['run']['$tmp104'] = sec_lvl('$tmp4', 'scheduler', false, $Γ['global']['$tmp4']['run']);
        $Γ['global']['$tmp4']['run']['$tmp104'] instanceof Object ? $Γ['global']['$tmp4']['run']['$tmp104'].Σ = $lub($Γ['global']['$tmp4']['run']['$tmp104'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp4']['run']['$tmp104'] = $lub($Γ['global']['$tmp4']['run']['$tmp104'], $Λ[$Λ.length - 1].l);
        $tmp121 = $tmp104.queue(packet);
        return $tmp121;
        var $shouldComp = { 'lbl': 'FUNC' };
    }
    if ($shouldComp)
        $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
    $Λ.pop();
    return;
};
$Γ['global']['$tmp4']['run'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    packet: $Λ[$Λ.length - 1].l
};
$tmp4 = WorkerTask.prototype;
$Γ['global']['$tmp4'] = sec_lvl('WorkerTask', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp4'] instanceof Object ? $Γ['global']['$tmp4'].Σ = $lub($Γ['global']['$tmp4'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp4'] = $lub($Γ['global']['$tmp4'], $Λ[$Λ.length - 1].l);
$tmp4.toString = function () {
    var $tmp127;
    $Γ['global']['$tmp4']['toString']['$tmp127'] = 0;
    $tmp127 = 'WorkerTask';
    $Γ['global']['$tmp4']['toString']['$tmp127'] = $Λ[$Λ.length - 1].l;
    return $tmp127;
};
$Γ['global']['$tmp4']['toString'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
function HandlerTask(scheduler) {
    this.scheduler = scheduler;
    $Γ['global']['HandlerTask']['$this']['scheduler'] = sec_lvl('scheduler', null, false, $Γ['global']['HandlerTask']);
    $Γ['global']['HandlerTask']['$this']['scheduler'] instanceof Object ? $Γ['global']['HandlerTask']['$this']['scheduler'].Σ = $lub($Γ['global']['HandlerTask']['$this']['scheduler'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['HandlerTask']['$this']['scheduler'] = $lub($Γ['global']['HandlerTask']['$this']['scheduler'], $Λ[$Λ.length - 1].l);
    this.v1 = null;
    $Γ['global']['HandlerTask']['$this']['v1'] = $Λ[$Λ.length - 1].l;
    this.v2 = null;
    $Γ['global']['HandlerTask']['$this']['v2'] = $Λ[$Λ.length - 1].l;
    return;
}
$tmp5 = HandlerTask.prototype;
$Γ['global']['$tmp5'] = sec_lvl('HandlerTask', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp5'] instanceof Object ? $Γ['global']['$tmp5'].Σ = $lub($Γ['global']['$tmp5'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5'] = $lub($Γ['global']['$tmp5'], $Λ[$Λ.length - 1].l);
$tmp5.run = function (packet) {
    var $tmp128, $tmp129, $tmp130, $tmp131, $tmp104;
    $Γ['global']['$tmp5']['run']['$tmp104'] = $Γ['global']['$tmp5']['run']['$tmp131'] = $Γ['global']['$tmp5']['run']['$tmp130'] = $Γ['global']['$tmp5']['run']['$tmp129'] = $Γ['global']['$tmp5']['run']['$tmp128'] = 0;
    $tmp128 = packet != null;
    $Γ['global']['$tmp5']['run']['$tmp128'] = $lub(sec_lvl('packet', null, true, $Γ['global']['$tmp5']['run']), $Λ[$Λ.length - 1].l);
    $Γ['global']['$tmp5']['run']['$tmp128'] instanceof Object ? $Γ['global']['$tmp5']['run']['$tmp128'].Σ = $lub($Γ['global']['$tmp5']['run']['$tmp128'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['run']['$tmp128'] = $lub($Γ['global']['$tmp5']['run']['$tmp128'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp128', null, true, $Γ['global']['$tmp5']['run'])),
        id: 'IF'
    });
    if ($tmp128) {
        var $tmp132, $tmp133;
        $Γ['global']['$tmp5']['run']['$tmp133'] = $Γ['global']['$tmp5']['run']['$tmp132'] = 0;
        $tmp133 = packet.kind;
        $Γ['global']['$tmp5']['run']['$tmp133'] = sec_lvl('packet', 'kind', false, $Γ['global']['$tmp5']['run']);
        $Γ['global']['$tmp5']['run']['$tmp133'] instanceof Object ? $Γ['global']['$tmp5']['run']['$tmp133'].Σ = $lub($Γ['global']['$tmp5']['run']['$tmp133'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['run']['$tmp133'] = $lub($Γ['global']['$tmp5']['run']['$tmp133'], $Λ[$Λ.length - 1].l);
        $tmp132 = $tmp133 == KIND_WORK;
        $Γ['global']['$tmp5']['run']['$tmp132'] = $lub(sec_lvl('$tmp133', null, true, $Γ['global']['$tmp5']['run']), sec_lvl('KIND_WORK', null, true, $Γ['global']['$tmp5']['run']));
        $Γ['global']['$tmp5']['run']['$tmp132'] instanceof Object ? $Γ['global']['$tmp5']['run']['$tmp132'].Σ = $lub($Γ['global']['$tmp5']['run']['$tmp132'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['run']['$tmp132'] = $lub($Γ['global']['$tmp5']['run']['$tmp132'], $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp132', null, true, $Γ['global']['$tmp5']['run'])),
            id: 'IF'
        });
        if ($tmp132) {
            $upgrade([
                'packet.addTo',
                'this'
            ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp5']['run']);
            var $tmp134;
            $Γ['global']['$tmp5']['run']['$tmp134'] = 0;
            $tmp134 = this.v1;
            $Γ['global']['$tmp5']['run']['$tmp134'] = sec_lvl('$tmp5', 'v1', false, $Γ['global']['$tmp5']['run']);
            $Γ['global']['$tmp5']['run']['$tmp134'] instanceof Object ? $Γ['global']['$tmp5']['run']['$tmp134'].Σ = $lub($Γ['global']['$tmp5']['run']['$tmp134'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['run']['$tmp134'] = $lub($Γ['global']['$tmp5']['run']['$tmp134'], $Λ[$Λ.length - 1].l);
            this.v1 = packet.addTo($tmp134);
        } else {
            $upgrade([
                'packet.addTo',
                'this'
            ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp5']['run']);
            var $tmp135;
            $Γ['global']['$tmp5']['run']['$tmp135'] = 0;
            $tmp135 = this.v2;
            $Γ['global']['$tmp5']['run']['$tmp135'] = sec_lvl('$tmp5', 'v2', false, $Γ['global']['$tmp5']['run']);
            $Γ['global']['$tmp5']['run']['$tmp135'] instanceof Object ? $Γ['global']['$tmp5']['run']['$tmp135'].Σ = $lub($Γ['global']['$tmp5']['run']['$tmp135'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['run']['$tmp135'] = $lub($Γ['global']['$tmp5']['run']['$tmp135'], $Λ[$Λ.length - 1].l);
            this.v2 = packet.addTo($tmp135);
        }
        $Λ.pop();
    } else {
        $upgrade([
            'packet.addTo',
            'this'
        ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp5']['run']);
    }
    $Λ.pop();
    $tmp130 = this.v1;
    $Γ['global']['$tmp5']['run']['$tmp130'] = sec_lvl('$tmp5', 'v1', false, $Γ['global']['$tmp5']['run']);
    $Γ['global']['$tmp5']['run']['$tmp130'] instanceof Object ? $Γ['global']['$tmp5']['run']['$tmp130'].Σ = $lub($Γ['global']['$tmp5']['run']['$tmp130'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['run']['$tmp130'] = $lub($Γ['global']['$tmp5']['run']['$tmp130'], $Λ[$Λ.length - 1].l);
    $tmp129 = $tmp130 != null;
    $Γ['global']['$tmp5']['run']['$tmp129'] = $lub(sec_lvl('$tmp130', null, true, $Γ['global']['$tmp5']['run']), $Λ[$Λ.length - 1].l);
    $Γ['global']['$tmp5']['run']['$tmp129'] instanceof Object ? $Γ['global']['$tmp5']['run']['$tmp129'].Σ = $lub($Γ['global']['$tmp5']['run']['$tmp129'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['run']['$tmp129'] = $lub($Γ['global']['$tmp5']['run']['$tmp129'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp129', null, true, $Γ['global']['$tmp5']['run'])),
        id: 'IF'
    });
    if ($tmp129) {
        var count, $tmp136, v, $tmp137;
        $Γ['global']['$tmp5']['run']['$tmp137'] = $Γ['global']['$tmp5']['run']['v'] = $Γ['global']['$tmp5']['run']['$tmp136'] = $Γ['global']['$tmp5']['run']['count'] = 0;
        $tmp136 = this.v1;
        $Γ['global']['$tmp5']['run']['$tmp136'] = sec_lvl('$tmp5', 'v1', false, $Γ['global']['$tmp5']['run']);
        $Γ['global']['$tmp5']['run']['$tmp136'] instanceof Object ? $Γ['global']['$tmp5']['run']['$tmp136'].Σ = $lub($Γ['global']['$tmp5']['run']['$tmp136'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['run']['$tmp136'] = $lub($Γ['global']['$tmp5']['run']['$tmp136'], $Λ[$Λ.length - 1].l);
        count = $tmp136.a1;
        $scope($Γ['global']['$tmp5']['run'], 'count', true)['count'] = sec_lvl('$tmp136', 'a1', false, $Γ['global']['$tmp5']['run']);
        $scope($Γ['global']['$tmp5']['run'], 'count', true)['count'] instanceof Object ? $scope($Γ['global']['$tmp5']['run'], 'count', true)['count'].Σ = $lub($scope($Γ['global']['$tmp5']['run'], 'count', true)['count'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp5']['run'], 'count', true)['count'] = $lub($scope($Γ['global']['$tmp5']['run'], 'count', true)['count'], $Λ[$Λ.length - 1].l);
        $tmp137 = count < DATA_SIZE;
        $Γ['global']['$tmp5']['run']['$tmp137'] = $lub(sec_lvl('count', null, true, $Γ['global']['$tmp5']['run']), sec_lvl('DATA_SIZE', null, true, $Γ['global']['$tmp5']['run']));
        $Γ['global']['$tmp5']['run']['$tmp137'] instanceof Object ? $Γ['global']['$tmp5']['run']['$tmp137'].Σ = $lub($Γ['global']['$tmp5']['run']['$tmp137'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['run']['$tmp137'] = $lub($Γ['global']['$tmp5']['run']['$tmp137'], $Λ[$Λ.length - 1].l);
        $Λ.push({
            l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp137', null, true, $Γ['global']['$tmp5']['run'])),
            id: 'IF'
        });
        if ($tmp137) {
            $upgrade([
                '$tmp104.queue',
                '$tmp142'
            ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp5']['run']);
            var $tmp138, $tmp139;
            $Γ['global']['$tmp5']['run']['$tmp139'] = $Γ['global']['$tmp5']['run']['$tmp138'] = 0;
            $tmp139 = this.v2;
            $Γ['global']['$tmp5']['run']['$tmp139'] = sec_lvl('$tmp5', 'v2', false, $Γ['global']['$tmp5']['run']);
            $Γ['global']['$tmp5']['run']['$tmp139'] instanceof Object ? $Γ['global']['$tmp5']['run']['$tmp139'].Σ = $lub($Γ['global']['$tmp5']['run']['$tmp139'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['run']['$tmp139'] = $lub($Γ['global']['$tmp5']['run']['$tmp139'], $Λ[$Λ.length - 1].l);
            $tmp138 = $tmp139 != null;
            $Γ['global']['$tmp5']['run']['$tmp138'] = $lub(sec_lvl('$tmp139', null, true, $Γ['global']['$tmp5']['run']), $Λ[$Λ.length - 1].l);
            $Γ['global']['$tmp5']['run']['$tmp138'] instanceof Object ? $Γ['global']['$tmp5']['run']['$tmp138'].Σ = $lub($Γ['global']['$tmp5']['run']['$tmp138'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['run']['$tmp138'] = $lub($Γ['global']['$tmp5']['run']['$tmp138'], $Λ[$Λ.length - 1].l);
            $Λ.push({
                l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp138', null, true, $Γ['global']['$tmp5']['run'])),
                id: 'IF'
            });
            if ($tmp138) {
                v = this.v2;
                $scope($Γ['global']['$tmp5']['run'], 'v', true)['v'] = sec_lvl('$tmp5', 'v2', false, $Γ['global']['$tmp5']['run']);
                $scope($Γ['global']['$tmp5']['run'], 'v', true)['v'] instanceof Object ? $scope($Γ['global']['$tmp5']['run'], 'v', true)['v'].Σ = $lub($scope($Γ['global']['$tmp5']['run'], 'v', true)['v'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp5']['run'], 'v', true)['v'] = $lub($scope($Γ['global']['$tmp5']['run'], 'v', true)['v'], $Λ[$Λ.length - 1].l);
                var $tmp140, $tmp136, $tmp141, $tmp104;
                $Γ['global']['$tmp5']['run']['$tmp104'] = $Γ['global']['$tmp5']['run']['$tmp141'] = $Γ['global']['$tmp5']['run']['$tmp136'] = $Γ['global']['$tmp5']['run']['$tmp140'] = 0;
                $tmp140 = this.v2;
                $Γ['global']['$tmp5']['run']['$tmp140'] = sec_lvl('$tmp5', 'v2', false, $Γ['global']['$tmp5']['run']);
                $Γ['global']['$tmp5']['run']['$tmp140'] instanceof Object ? $Γ['global']['$tmp5']['run']['$tmp140'].Σ = $lub($Γ['global']['$tmp5']['run']['$tmp140'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['run']['$tmp140'] = $lub($Γ['global']['$tmp5']['run']['$tmp140'], $Λ[$Λ.length - 1].l);
                this.v2 = $tmp140.link;
                //$Γ['global']['$tmp5']['run']['$this']['v2'] = sec_lvl('$tmp140', 'link', false, $Γ['global']['$tmp5']['run']);
                //$Γ['global']['$tmp5']['run']['$this']['v2'] instanceof Object ? $Γ['global']['$tmp5']['run']['$this']['v2'].Σ = $lub($Γ['global']['$tmp5']['run']['$this']['v2'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['run']['$this']['v2'] = $lub($Γ['global']['$tmp5']['run']['$this']['v2'], $Λ[$Λ.length - 1].l);
                $tmp136 = this.v1;
                $Γ['global']['$tmp5']['run']['$tmp136'] = sec_lvl('$tmp5', 'v1', false, $Γ['global']['$tmp5']['run']);
                $Γ['global']['$tmp5']['run']['$tmp136'] instanceof Object ? $Γ['global']['$tmp5']['run']['$tmp136'].Σ = $lub($Γ['global']['$tmp5']['run']['$tmp136'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['run']['$tmp136'] = $lub($Γ['global']['$tmp5']['run']['$tmp136'], $Λ[$Λ.length - 1].l);
                $tmp = $tmp136.a2;
                $Γ['global']['$tmp5']['run']['$tmp'] = sec_lvl('$tmp136', 'a2', false, $Γ['global']['$tmp5']['run']);
                $Γ['global']['$tmp5']['run']['$tmp'] instanceof Object ? $Γ['global']['$tmp5']['run']['$tmp'].Σ = $lub($Γ['global']['$tmp5']['run']['$tmp'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['run']['$tmp'] = $lub($Γ['global']['$tmp5']['run']['$tmp'], $Λ[$Λ.length - 1].l);
                v.a1 = $tmp[count];
                $scope($Γ['global']['$tmp5']['run'], 'v', false)['a1'] = sec_lvl('$tmp', count, false, $Γ['global']['$tmp5']['run']);
                $scope($Γ['global']['$tmp5']['run'], 'v', false)['a1'] instanceof Object ? $scope($Γ['global']['$tmp5']['run'], 'v', false)['a1'].Σ = $lub($scope($Γ['global']['$tmp5']['run'], 'v', false)['a1'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp5']['run'], 'v', false)['a1'] = $lub($scope($Γ['global']['$tmp5']['run'], 'v', false)['a1'], $Λ[$Λ.length - 1].l);
                $tmp136 = this.v1;
                $Γ['global']['$tmp5']['run']['$tmp136'] = sec_lvl('$tmp5', 'v1', false, $Γ['global']['$tmp5']['run']);
                $Γ['global']['$tmp5']['run']['$tmp136'] instanceof Object ? $Γ['global']['$tmp5']['run']['$tmp136'].Σ = $lub($Γ['global']['$tmp5']['run']['$tmp136'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['run']['$tmp136'] = $lub($Γ['global']['$tmp5']['run']['$tmp136'], $Λ[$Λ.length - 1].l);
                $tmp136.a1 = count + 1;
                $Γ['global']['$tmp5']['run']['$tmp136']['a1'] = $lub(sec_lvl('count', null, true, $Γ['global']['$tmp5']['run']), $Λ[$Λ.length - 1].l);
                $Γ['global']['$tmp5']['run']['$tmp136']['a1'] instanceof Object ? $Γ['global']['$tmp5']['run']['$tmp136']['a1'].Σ = $lub($Γ['global']['$tmp5']['run']['$tmp136']['a1'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['run']['$tmp136']['a1'] = $lub($Γ['global']['$tmp5']['run']['$tmp136']['a1'], $Λ[$Λ.length - 1].l);
                $tmp104 = this.scheduler;
                $Γ['global']['$tmp5']['run']['$tmp104'] = sec_lvl('$tmp5', 'scheduler', false, $Γ['global']['$tmp5']['run']);
                $Γ['global']['$tmp5']['run']['$tmp104'] instanceof Object ? $Γ['global']['$tmp5']['run']['$tmp104'].Σ = $lub($Γ['global']['$tmp5']['run']['$tmp104'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['run']['$tmp104'] = $lub($Γ['global']['$tmp5']['run']['$tmp104'], $Λ[$Λ.length - 1].l);
                $tmp141 = $tmp104.queue(v);
                return $tmp141;
                var $shouldComp = { 'lbl': 'FUNC' };
            } else {
                $upgrade([
                    '$tmp104.queue',
                    '$tmp141'
                ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp5']['run']);
            }
            if ($shouldComp)
                $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
            $Λ.pop();
        } else {
            $upgrade([
                '$tmp104.queue',
                '$tmp141'
            ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp5']['run']);
            v = this.v1;
            $scope($Γ['global']['$tmp5']['run'], 'v', true)['v'] = sec_lvl('$tmp5', 'v1', false, $Γ['global']['$tmp5']['run']);
            $scope($Γ['global']['$tmp5']['run'], 'v', true)['v'] instanceof Object ? $scope($Γ['global']['$tmp5']['run'], 'v', true)['v'].Σ = $lub($scope($Γ['global']['$tmp5']['run'], 'v', true)['v'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp5']['run'], 'v', true)['v'] = $lub($scope($Γ['global']['$tmp5']['run'], 'v', true)['v'], $Λ[$Λ.length - 1].l);
            var $tmp136, $tmp142, $tmp104;
            $Γ['global']['$tmp5']['run']['$tmp104'] = $Γ['global']['$tmp5']['run']['$tmp142'] = $Γ['global']['$tmp5']['run']['$tmp136'] = 0;
            $tmp136 = this.v1;
            $Γ['global']['$tmp5']['run']['$tmp136'] = sec_lvl('$tmp5', 'v1', false, $Γ['global']['$tmp5']['run']);
            $Γ['global']['$tmp5']['run']['$tmp136'] instanceof Object ? $Γ['global']['$tmp5']['run']['$tmp136'].Σ = $lub($Γ['global']['$tmp5']['run']['$tmp136'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['run']['$tmp136'] = $lub($Γ['global']['$tmp5']['run']['$tmp136'], $Λ[$Λ.length - 1].l);
            this.v1 = $tmp136.link;
            //$Γ['global']['$tmp5']['run']['$this']['v1'] = sec_lvl('$tmp136', 'link', false, $Γ['global']['$tmp5']['run']);
            //$Γ['global']['$tmp5']['run']['$this']['v1'] instanceof Object ? $Γ['global']['$tmp5']['run']['$this']['v1'].Σ = $lub($Γ['global']['$tmp5']['run']['$this']['v1'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['run']['$this']['v1'] = $lub($Γ['global']['$tmp5']['run']['$this']['v1'], $Λ[$Λ.length - 1].l);
            $tmp104 = this.scheduler;
            $Γ['global']['$tmp5']['run']['$tmp104'] = sec_lvl('$tmp5', 'scheduler', false, $Γ['global']['$tmp5']['run']);
            $Γ['global']['$tmp5']['run']['$tmp104'] instanceof Object ? $Γ['global']['$tmp5']['run']['$tmp104'].Σ = $lub($Γ['global']['$tmp5']['run']['$tmp104'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['run']['$tmp104'] = $lub($Γ['global']['$tmp5']['run']['$tmp104'], $Λ[$Λ.length - 1].l);
            $tmp142 = $tmp104.queue(v);
            return $tmp142;
            var $shouldComp = { 'lbl': 'FUNC' };
        }
        if ($shouldComp)
            $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
        $Λ.pop();
    } else {
        $upgrade([
            '$tmp104.queue',
            '$tmp141',
            '$tmp142'
        ], $Λ[$Λ.length - 1].l, $Γ['global']['$tmp5']['run']);
    }
    $Λ.pop();
    $tmp104 = this.scheduler;
    $Γ['global']['$tmp5']['run']['$tmp104'] = sec_lvl('$tmp5', 'scheduler', false, $Γ['global']['$tmp5']['run']);
    $Γ['global']['$tmp5']['run']['$tmp104'] instanceof Object ? $Γ['global']['$tmp5']['run']['$tmp104'].Σ = $lub($Γ['global']['$tmp5']['run']['$tmp104'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5']['run']['$tmp104'] = $lub($Γ['global']['$tmp5']['run']['$tmp104'], $Λ[$Λ.length - 1].l);
    $tmp131 = $tmp104.suspendCurrent();
    return $tmp131;
};
$Γ['global']['$tmp5']['run'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    packet: $Λ[$Λ.length - 1].l
};
$tmp5 = HandlerTask.prototype;
$Γ['global']['$tmp5'] = sec_lvl('HandlerTask', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp5'] instanceof Object ? $Γ['global']['$tmp5'].Σ = $lub($Γ['global']['$tmp5'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp5'] = $lub($Γ['global']['$tmp5'], $Λ[$Λ.length - 1].l);
$tmp5.toString = function () {
    var $tmp143;
    $Γ['global']['$tmp5']['toString']['$tmp143'] = 0;
    $tmp143 = 'HandlerTask';
    $Γ['global']['$tmp5']['toString']['$tmp143'] = $Λ[$Λ.length - 1].l;
    return $tmp143;
};
$Γ['global']['$tmp5']['toString'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
DATA_SIZE = 4;
$Γ['global']['DATA_SIZE'] = $Λ[$Λ.length - 1].l;
function Packet(link, id, kind) {
    this.link = link;
    $Γ['global']['Packet']['$this']['link'] = sec_lvl('link', null, false, $Γ['global']['Packet']);
    $Γ['global']['Packet']['$this']['link'] instanceof Object ? $Γ['global']['Packet']['$this']['link'].Σ = $lub($Γ['global']['Packet']['$this']['link'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['Packet']['$this']['link'] = $lub($Γ['global']['Packet']['$this']['link'], $Λ[$Λ.length - 1].l);
    this.id = id;
    $Γ['global']['Packet']['$this']['id'] = sec_lvl('id', null, false, $Γ['global']['Packet']);
    $Γ['global']['Packet']['$this']['id'] instanceof Object ? $Γ['global']['Packet']['$this']['id'].Σ = $lub($Γ['global']['Packet']['$this']['id'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['Packet']['$this']['id'] = $lub($Γ['global']['Packet']['$this']['id'], $Λ[$Λ.length - 1].l);
    this.kind = kind;
    $Γ['global']['Packet']['$this']['kind'] = sec_lvl('kind', null, false, $Γ['global']['Packet']);
    $Γ['global']['Packet']['$this']['kind'] instanceof Object ? $Γ['global']['Packet']['$this']['kind'].Σ = $lub($Γ['global']['Packet']['$this']['kind'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['Packet']['$this']['kind'] = $lub($Γ['global']['Packet']['$this']['kind'], $Λ[$Λ.length - 1].l);
    this.a1 = 0;
    $Γ['global']['Packet']['$this']['a1'] = $Λ[$Λ.length - 1].l;
    this.a2 = new Array(DATA_SIZE);
    return;
}
$tmp6 = Packet.prototype;
$Γ['global']['$tmp6'] = sec_lvl('Packet', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp6'] instanceof Object ? $Γ['global']['$tmp6'].Σ = $lub($Γ['global']['$tmp6'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp6'] = $lub($Γ['global']['$tmp6'], $Λ[$Λ.length - 1].l);
$tmp6.addTo = function (queue) {
    this.link = null;
    //$Γ['global']['$tmp6']['addTo']['$this']['link'] = $Λ[$Λ.length - 1].l;
    var $tmp144, peek, next, $tmp145, $tmp146;
    $Γ['global']['$tmp6']['addTo']['$tmp146'] = $Γ['global']['$tmp6']['addTo']['$tmp145'] = $Γ['global']['$tmp6']['addTo']['next'] = $Γ['global']['$tmp6']['addTo']['peek'] = $Γ['global']['$tmp6']['addTo']['$tmp144'] = 0;
    $tmp144 = queue == null;
    $Γ['global']['$tmp6']['addTo']['$tmp144'] = $lub(sec_lvl('queue', null, true, $Γ['global']['$tmp6']['addTo']), $Λ[$Λ.length - 1].l);
    $Γ['global']['$tmp6']['addTo']['$tmp144'] instanceof Object ? $Γ['global']['$tmp6']['addTo']['$tmp144'].Σ = $lub($Γ['global']['$tmp6']['addTo']['$tmp144'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp6']['addTo']['$tmp144'] = $lub($Γ['global']['$tmp6']['addTo']['$tmp144'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp144', null, true, $Γ['global']['$tmp6']['addTo'])),
        id: 'IF'
    });
    if ($tmp144) {
        var $tmp152;
        $Γ['global']['$tmp6']['addTo']['$tmp152'] = 0;
        $tmp152 = this;
        $Γ['global']['$tmp6']['addTo']['$tmp152'] = $Γ['global']['$tmp6']['addTo'].$this;
        $Γ['global']['$tmp6']['addTo']['$tmp152'] instanceof Object ? $Γ['global']['$tmp6']['addTo']['$tmp152'].Σ = $lub($Γ['global']['$tmp6']['addTo']['$tmp152'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp6']['addTo']['$tmp152'] = $lub($Γ['global']['$tmp6']['addTo']['$tmp152'], $Λ[$Λ.length - 1].l);
        return $tmp152;
        var $shouldComp = { 'lbl': 'FUNC' };
    } else {
    }
    if ($shouldComp)
        $comp($shouldComp.lbl, $Λ[$Λ.length - 1].l);
    $Λ.pop();
    next = queue;
    $scope($Γ['global']['$tmp6']['addTo'], 'next', true)['next'] = sec_lvl('queue', null, false, $Γ['global']['$tmp6']['addTo']);
    $scope($Γ['global']['$tmp6']['addTo'], 'next', true)['next'] instanceof Object ? $scope($Γ['global']['$tmp6']['addTo'], 'next', true)['next'].Σ = $lub($scope($Γ['global']['$tmp6']['addTo'], 'next', true)['next'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp6']['addTo'], 'next', true)['next'] = $lub($scope($Γ['global']['$tmp6']['addTo'], 'next', true)['next'], $Λ[$Λ.length - 1].l);
    peek = next.link;
    $scope($Γ['global']['$tmp6']['addTo'], 'peek', true)['peek'] = sec_lvl('next', 'link', false, $Γ['global']['$tmp6']['addTo']);
    $scope($Γ['global']['$tmp6']['addTo'], 'peek', true)['peek'] instanceof Object ? $scope($Γ['global']['$tmp6']['addTo'], 'peek', true)['peek'].Σ = $lub($scope($Γ['global']['$tmp6']['addTo'], 'peek', true)['peek'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp6']['addTo'], 'peek', true)['peek'] = $lub($scope($Γ['global']['$tmp6']['addTo'], 'peek', true)['peek'], $Λ[$Λ.length - 1].l);
    $tmp146 = peek;
    $Γ['global']['$tmp6']['addTo']['$tmp146'] = sec_lvl('peek', null, false, $Γ['global']['$tmp6']['addTo']);
    $Γ['global']['$tmp6']['addTo']['$tmp146'] instanceof Object ? $Γ['global']['$tmp6']['addTo']['$tmp146'].Σ = $lub($Γ['global']['$tmp6']['addTo']['$tmp146'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp6']['addTo']['$tmp146'] = $lub($Γ['global']['$tmp6']['addTo']['$tmp146'], $Λ[$Λ.length - 1].l);
    $tmp145 = $tmp146 != null;
    $Γ['global']['$tmp6']['addTo']['$tmp145'] = $lub(sec_lvl('$tmp146', null, true, $Γ['global']['$tmp6']['addTo']), $Λ[$Λ.length - 1].l);
    $Γ['global']['$tmp6']['addTo']['$tmp145'] instanceof Object ? $Γ['global']['$tmp6']['addTo']['$tmp145'].Σ = $lub($Γ['global']['$tmp6']['addTo']['$tmp145'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp6']['addTo']['$tmp145'] = $lub($Γ['global']['$tmp6']['addTo']['$tmp145'], $Λ[$Λ.length - 1].l);
    $Λ.push({
        l: $lub($Λ[$Λ.length - 1].l, sec_lvl('$tmp145', null, true, $Γ['global']['$tmp6']['addTo'])),
        id: 'LOOP'
    });
    while ($tmp145) {
        next = peek;
        $scope($Γ['global']['$tmp6']['addTo'], 'next', true)['next'] = sec_lvl('peek', null, false, $Γ['global']['$tmp6']['addTo']);
        $scope($Γ['global']['$tmp6']['addTo'], 'next', true)['next'] instanceof Object ? $scope($Γ['global']['$tmp6']['addTo'], 'next', true)['next'].Σ = $lub($scope($Γ['global']['$tmp6']['addTo'], 'next', true)['next'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp6']['addTo'], 'next', true)['next'] = $lub($scope($Γ['global']['$tmp6']['addTo'], 'next', true)['next'], $Λ[$Λ.length - 1].l);
        var $tmp145, $tmp147;
        $Γ['global']['$tmp6']['addTo']['$tmp147'] = $Γ['global']['$tmp6']['addTo']['$tmp145'] = 0;
        peek = next.link;
        $scope($Γ['global']['$tmp6']['addTo'], 'peek', true)['peek'] = sec_lvl('next', 'link', false, $Γ['global']['$tmp6']['addTo']);
        $scope($Γ['global']['$tmp6']['addTo'], 'peek', true)['peek'] instanceof Object ? $scope($Γ['global']['$tmp6']['addTo'], 'peek', true)['peek'].Σ = $lub($scope($Γ['global']['$tmp6']['addTo'], 'peek', true)['peek'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp6']['addTo'], 'peek', true)['peek'] = $lub($scope($Γ['global']['$tmp6']['addTo'], 'peek', true)['peek'], $Λ[$Λ.length - 1].l);
        $tmp147 = peek;
        $Γ['global']['$tmp6']['addTo']['$tmp147'] = sec_lvl('peek', null, false, $Γ['global']['$tmp6']['addTo']);
        $Γ['global']['$tmp6']['addTo']['$tmp147'] instanceof Object ? $Γ['global']['$tmp6']['addTo']['$tmp147'].Σ = $lub($Γ['global']['$tmp6']['addTo']['$tmp147'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp6']['addTo']['$tmp147'] = $lub($Γ['global']['$tmp6']['addTo']['$tmp147'], $Λ[$Λ.length - 1].l);
        $tmp145 = $tmp147 != null;
        $Γ['global']['$tmp6']['addTo']['$tmp145'] = $lub(sec_lvl('$tmp147', null, true, $Γ['global']['$tmp6']['addTo']), $Λ[$Λ.length - 1].l);
        $Γ['global']['$tmp6']['addTo']['$tmp145'] instanceof Object ? $Γ['global']['$tmp6']['addTo']['$tmp145'].Σ = $lub($Γ['global']['$tmp6']['addTo']['$tmp145'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp6']['addTo']['$tmp145'] = $lub($Γ['global']['$tmp6']['addTo']['$tmp145'], $Λ[$Λ.length - 1].l);
    }
    $Λ.pop();
    next.link = this;
    $scope($Γ['global']['$tmp6']['addTo'], 'next', false)['link'] = $Γ['global']['$tmp6']['addTo'].$this;
    $scope($Γ['global']['$tmp6']['addTo'], 'next', false)['link'] instanceof Object ? $scope($Γ['global']['$tmp6']['addTo'], 'next', false)['link'].Σ = $lub($scope($Γ['global']['$tmp6']['addTo'], 'next', false)['link'].Σ, $Λ[$Λ.length - 1].l) : $scope($Γ['global']['$tmp6']['addTo'], 'next', false)['link'] = $lub($scope($Γ['global']['$tmp6']['addTo'], 'next', false)['link'], $Λ[$Λ.length - 1].l);
    return queue;
};
$Γ['global']['$tmp6']['addTo'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global'],
    queue: $Λ[$Λ.length - 1].l
};
$tmp6 = Packet.prototype;
$Γ['global']['$tmp6'] = sec_lvl('Packet', 'prototype', false, $Γ['global']);
$Γ['global']['$tmp6'] instanceof Object ? $Γ['global']['$tmp6'].Σ = $lub($Γ['global']['$tmp6'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp6'] = $lub($Γ['global']['$tmp6'], $Λ[$Λ.length - 1].l);
$tmp6.toString = function () {
    var $tmp148;
    $Γ['global']['$tmp6']['toString']['$tmp148'] = 0;
    $tmp148 = 'Packet';
    $Γ['global']['$tmp6']['toString']['$tmp148'] = $Λ[$Λ.length - 1].l;
    return $tmp148;
};
$Γ['global']['$tmp6']['toString'] = {
    $fscope: $Λ[$Λ.length - 1].l,
    prototype: { Σ: $Λ[$Λ.length - 1].l },
    Σ: $Λ[$Λ.length - 1].l,
    scope: $Γ['global']
};
$rf = $scope($Γ['global'], 'runRichards', false)['runRichards'];
$rf.scope = $Γ['global'];
$rf.$this = $Γ['global'];
$Λ.push({
    l: $lub($rf.$fscope, $Λ[$Λ.length - 1].l, $rf.Σ),
    id: 'FUNC'
});
$tmp7 = runRichards();
$Γ['global']['$tmp7'] = $Λ.pop().l;
$Γ['global']['$tmp7'] instanceof Object ? $Γ['global']['$tmp7'].Σ = $lub($Γ['global']['$tmp7'].Σ, $Λ[$Λ.length - 1].l) : $Γ['global']['$tmp7'] = $lub($Γ['global']['$tmp7'], $Λ[$Λ.length - 1].l);