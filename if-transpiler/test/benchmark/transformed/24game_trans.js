var ar, order, op, val, NOVAL, oper, out, $tmp0, $tmp1, $tmp2;
ar = [];
order = [
    0,
    1,
    2
];
op = [];
val = [];
NOVAL = 9999;
oper = '+-*/';
function rnd(n) {
    var $tmp3, $tmp4, $tmp5;
    $tmp5 = Math.random();
    $tmp4 = $tmp5 * n;
    $tmp3 = Math.floor($tmp4);
    return $tmp3;
}
function say(s) {
    var $tmp6;
    $tmp6 = console.log(s);
    return;
}
function getvalue(x, dir) {
    var r, $tmp7, $tmp8;
    r = NOVAL;
    $tmp7 = dir > 0;
    if ($tmp7) {
        var $tmp9;
        $tmp9 = ++x;
    } else {
    }
    while (1) {
        var $tmp10, $tmp11;
        $tmp11 = val[x];
        $tmp10 = $tmp11 != NOVAL;
        if ($tmp10) {
            r = val[x];
            val[x] = NOVAL;
            break;
        } else {
        }
        x += dir;
    }
    $tmp8 = r * 1;
    return $tmp8;
}
function calc() {
    var c, l, r, x, $tmp12, $tmp13, $tmp14;
    c = 0;
    $tmp = ar.join('/');
    val = $tmp.split('/');
    $tmp12 = c < 3;
    while ($tmp12) {
        x = order[c];
        var $tmp15, $tmp16, $tmp17, $tmp18, $tmp12;
        $tmp15 = -1;
        l = getvalue(x, $tmp15);
        r = getvalue(x, 1);
        $tmp17 = op[x];
        $tmp16 = $tmp17 == 0;
        if ($tmp16) {
            val[x] = l + r;
        } else {
            var $tmp19, $tmp20;
            $tmp20 = op[x];
            $tmp19 = $tmp20 == 1;
            if ($tmp19) {
                val[x] = l - r;
            } else {
                var $tmp21, $tmp22;
                $tmp22 = op[x];
                $tmp21 = $tmp22 == 2;
                if ($tmp21) {
                    val[x] = l * r;
                } else {
                    var $tmp23, $tmp24, $tmp25;
                    $tmp24 = !r;
                    $tmp25 = l % r;
                    $tmp23 = $tmp24 || $tmp25;
                    if ($tmp23) {
                        var $tmp26;
                        $tmp26 = 0;
                        return $tmp26;
                    } else {
                    }
                    val[x] = l / r;
                }
            }
        }
        $tmp18 = ++c;
        $tmp12 = c < 3;
    }
    $tmp14 = -1;
    $tmp13 = getvalue($tmp14, 1);
    return $tmp13;
}
function shuffle(s, n) {
    var x, p, r, t, $tmp27;
    x = n;
    p = eval(s);
    $tmp27 = x--;
    while ($tmp27) {
        r = rnd(n);
        t = p[x];
        p[x] = p[r];
        p[r] = t;
        var $tmp27;
        $tmp27 = x--;
    }
    return;
}
function parenth(n) {
    var $tmp28, $tmp29;
    $tmp28 = n > 0;
    while ($tmp28) {
        var $tmp30, $tmp28;
        $tmp30 = --n;
        out += '(';
        $tmp28 = n > 0;
    }
    ;
    $tmp29 = n < 0;
    while ($tmp29) {
        var $tmp31, $tmp29;
        $tmp31 = ++n;
        out += ')';
        $tmp29 = n < 0;
    }
    ;
    return;
}
function getpriority(x) {
    var z, $tmp32, $tmp33;
    z = 3;
    $tmp32 = z--;
    for (; $tmp32;) {
        var $tmp34, $tmp35, $tmp32;
        $tmp35 = order[z];
        $tmp34 = $tmp35 == x;
        if ($tmp34) {
            var $tmp36;
            $tmp36 = 3 - z;
            return $tmp36;
        } else {
        }
        $tmp32 = z--;
    }
    $tmp33 = 0;
    return $tmp33;
}
function showsolution() {
    var x, p, lp, v, $tmp37, $tmp38, $tmp39, $tmp40;
    x = 0;
    p = 0;
    lp = 0;
    v = 0;
    $tmp37 = x < 4;
    while ($tmp37) {
        var $tmp41, $tmp42, $tmp43, $tmp37;
        $tmp41 = x < 3;
        if ($tmp41) {
            lp = p;
            p = getpriority(x);
            v = p - lp;
            var $tmp44;
            $tmp44 = v > 0;
            if ($tmp44) {
                var $tmp45;
                $tmp45 = parenth(v);
            } else {
            }
        } else {
        }
        out += ar[x];
        $tmp42 = x < 3;
        if ($tmp42) {
            var $tmp46, $tmp47;
            $tmp46 = v < 0;
            if ($tmp46) {
                var $tmp48;
                $tmp48 = parenth(v);
            } else {
            }
            $tmp47 = op[x];
            out += oper.charAt($tmp47);
        } else {
        }
        $tmp43 = ++x;
        $tmp37 = x < 4;
    }
    $tmp39 = -p;
    $tmp38 = parenth($tmp39);
    $tmp40 = say(out);
    return;
}
function solve24(s) {
    var z, r, $tmp49, $tmp50, $tmp51;
    z = 4;
    $tmp49 = z--;
    while ($tmp49) {
        var $tmp52, $tmp49;
        $tmp52 = s.charCodeAt(z);
        ar[z] = $tmp52 - 48;
        $tmp49 = z--;
    }
    out = '';
    z = 100000;
    $tmp50 = z;
    $tmp51 = z--;
    for (; $tmp51;) {
        r = rnd(256);
        op[0] = r & 3;
        var $tmp53, $tmp54, $tmp55, $tmp56, $tmp57, $tmp58, $tmp59, $tmp51;
        $tmp53 = r >> 2;
        op[1] = $tmp53 & 3;
        $tmp54 = r >> 4;
        op[2] = $tmp54 & 3;
        $tmp55 = shuffle('ar', 4);
        $tmp56 = shuffle('order', 3);
        $tmp58 = calc();
        $tmp57 = $tmp58 != 24;
        if ($tmp57) {
            var $tmp51;
            $tmp51 = z--;
            continue;
        } else {
        }
        $tmp59 = showsolution();
        break;
        $tmp51 = z--;
    }
    return;
}
$tmp0 = solve24('1234');
$tmp1 = solve24('6789');
$tmp2 = solve24('1127');