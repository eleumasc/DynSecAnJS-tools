var _primes, i, nprimes, t, $tmp0, $tmp2;
_primes = [
    2,
    3,
    5,
    7,
    11,
    13,
    17,
    19,
    23,
    29,
    31,
    37
];
function log(text) {
    var $tmp3;
    $tmp3 = console.log(text);
    return;
}
function big(exponents) {
    var i, e, val, $tmp4, $tmp6, $tmp7, $tmp8;
    val = 1;
    i = 0;
    $tmp4 = i;
    $tmp7 = exponents.length;
    $tmp6 = i < $tmp7;
    for (; $tmp6;) {
        var $tmp9, $tmp11, $tmp12, $tmp5, $tmp6, $tmp13;
        e = 0;
        $tmp9 = e;
        $tmp12 = exponents[i];
        $tmp11 = e < $tmp12;
        for (; $tmp11;) {
            var $tmp14, $tmp10, $tmp11, $tmp15;
            $tmp14 = _primes[i];
            val = val * $tmp14;
            $tmp10 = e++;
            $tmp15 = exponents[i];
            $tmp11 = e < $tmp15;
        }
        $tmp5 = i++;
        $tmp13 = exponents.length;
        $tmp6 = i < $tmp13;
    }
    $tmp8 = val.toString();
    return $tmp8;
}
function hamming(n, nprimes) {
    var i, iter, p, q, min, equal, x, hammings, $tmp16, $tmp18, hammlogs, primelogs, listlogs, $tmp19, $tmp21, indexes, $tmp22, $tmp24, listheads, $tmp25, $tmp27, $tmp28, $tmp30, $tmp31, $tmp32;
    hammings = new Array(n);
    hammings[0] = new Array(nprimes);
    p = 0;
    $tmp16 = p;
    $tmp18 = p < nprimes;
    for (; $tmp18;) {
        var $tmp33, $tmp17, $tmp18;
        $tmp33 = hammings[0];
        $tmp33[p] = 0;
        $tmp17 = p++;
        $tmp18 = p < nprimes;
    }
    hammlogs = new Array(n);
    hammlogs[0] = 0;
    primelogs = new Array(nprimes);
    listlogs = new Array(nprimes);
    p = 0;
    $tmp19 = p;
    $tmp21 = p < nprimes;
    for (; $tmp21;) {
        var $tmp34, $tmp20, $tmp21;
        $tmp34 = _primes[p];
        listlogs[p] = Math.log($tmp34);
        primelogs[p] = listlogs[p];
        $tmp20 = p++;
        $tmp21 = p < nprimes;
    }
    indexes = new Array(nprimes);
    p = 0;
    $tmp22 = p;
    $tmp24 = p < nprimes;
    for (; $tmp24;) {
        indexes[p] = 0;
        var $tmp23, $tmp24;
        $tmp23 = p++;
        $tmp24 = p < nprimes;
    }
    listheads = new Array(nprimes);
    p = 0;
    $tmp25 = p;
    $tmp27 = p < nprimes;
    for (; $tmp27;) {
        listheads[p] = new Array(nprimes);
        var $tmp35, $tmp37, $tmp38, $tmp26, $tmp27;
        q = 0;
        $tmp35 = q;
        $tmp37 = q < nprimes;
        for (; $tmp37;) {
            var $tmp38, $tmp36, $tmp37;
            $tmp38 = listheads[p];
            $tmp38[q] = 0;
            $tmp36 = q++;
            $tmp37 = q < nprimes;
        }
        $tmp38 = listheads[p];
        $tmp38[p] = 1;
        $tmp26 = p++;
        $tmp27 = p < nprimes;
    }
    iter = 1;
    $tmp28 = iter;
    $tmp30 = iter < n;
    for (; $tmp30;) {
        min = 0;
        var $tmp39, $tmp41, $tmp42, $tmp43, $tmp45, $tmp29, $tmp30;
        p = 1;
        $tmp39 = p;
        $tmp41 = p < nprimes;
        for (; $tmp41;) {
            var $tmp46, $tmp47, $tmp48, $tmp40, $tmp41;
            $tmp47 = listlogs[p];
            $tmp48 = listlogs[min];
            $tmp46 = $tmp47 < $tmp48;
            if ($tmp46) {
                min = p;
            } else {
            }
            $tmp40 = p++;
            $tmp41 = p < nprimes;
        }
        hammlogs[iter] = listlogs[min];
        $tmp42 = listheads[min];
        hammings[iter] = $tmp42.slice();
        p = 0;
        $tmp43 = p;
        $tmp45 = p < nprimes;
        for (; $tmp45;) {
            equal = true;
            var $tmp49, $tmp51, $tmp44, $tmp45;
            i = 0;
            $tmp49 = i;
            $tmp51 = i < nprimes;
            for (; $tmp51;) {
                var $tmp52, $tmp53, $tmp54, $tmp55, $tmp38, $tmp50, $tmp51;
                $tmp54 = hammings[iter];
                $tmp53 = $tmp54[i];
                $tmp38 = listheads[p];
                $tmp55 = $tmp38[i];
                $tmp52 = $tmp53 != $tmp55;
                if ($tmp52) {
                    equal = false;
                    break;
                } else {
                }
                $tmp50 = i++;
                $tmp51 = i < nprimes;
            }
            if (equal) {
                x = ++indexes[p];
                var $tmp56, $tmp38, $tmp57, $tmp58;
                $tmp56 = hammings[x];
                listheads[p] = $tmp56.slice();
                $tmp38 = listheads[p];
                $tmp38[p] += 1;
                $tmp57 = hammlogs[x];
                $tmp58 = primelogs[p];
                listlogs[p] = $tmp57 + $tmp58;
            } else {
            }
            $tmp44 = p++;
            $tmp45 = p < nprimes;
        }
        $tmp29 = iter++;
        $tmp30 = iter < n;
    }
    $tmp32 = n - 1;
    $tmp31 = hammings[$tmp32];
    return $tmp31;
}
t = [
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    1691
];
nprimes = 3;
$tmp0 = nprimes;
$tmp2 = nprimes <= 4;
for (; $tmp2;) {
    var $tmp59, $tmp60, $tmp61, $tmp62, $tmp63, $tmp65, $tmp66, $tmp1, $tmp2;
    $tmp62 = nprimes - 1;
    $tmp61 = _primes[$tmp62];
    $tmp60 = $tmp61 + '-Smooth:';
    $tmp59 = log($tmp60);
    i = 0;
    $tmp63 = i;
    $tmp66 = t.length;
    $tmp65 = i < $tmp66;
    for (; $tmp65;) {
        var $tmp67, $tmp68, $tmp69, $tmp70, $tmp71, $tmp72, $tmp73, $tmp64, $tmp65, $tmp74;
        $tmp70 = t[i];
        $tmp69 = $tmp70 + ':';
        $tmp73 = t[i];
        $tmp72 = hamming($tmp73, nprimes);
        $tmp71 = big($tmp72);
        $tmp68 = $tmp69 + $tmp71;
        $tmp67 = console.log($tmp68);
        $tmp64 = i++;
        $tmp74 = t.length;
        $tmp65 = i < $tmp74;
    }
    $tmp1 = nprimes++;
    $tmp2 = nprimes <= 4;
}