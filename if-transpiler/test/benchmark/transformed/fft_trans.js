function Complex(re, im) {
    this.re = re;
    this.im = im || 0;
    return;
}
var $tmp0, $tmp1, $tmp2, $tmp3, $tmp4, $tmp5, $tmp6, $tmp7;
$tmp0 = Complex.prototype;
$tmp0.add = function (other, dst) {
    var $tmp8, $tmp9, $tmp10, $tmp11;
    $tmp8 = this.re;
    $tmp9 = other.re;
    dst.re = $tmp8 + $tmp9;
    $tmp10 = this.im;
    $tmp11 = other.im;
    dst.im = $tmp10 + $tmp11;
    return dst;
};
$tmp0 = Complex.prototype;
$tmp0.sub = function (other, dst) {
    var $tmp12, $tmp13, $tmp14, $tmp15;
    $tmp12 = this.re;
    $tmp13 = other.re;
    dst.re = $tmp12 - $tmp13;
    $tmp14 = this.im;
    $tmp15 = other.im;
    dst.im = $tmp14 - $tmp15;
    return dst;
};
$tmp0 = Complex.prototype;
$tmp0.mul = function (other, dst) {
    var r, $tmp16, $tmp17, $tmp18, $tmp19, $tmp20, $tmp21, $tmp22, $tmp23, $tmp24, $tmp25, $tmp26, $tmp27;
    $tmp17 = this.re;
    $tmp18 = other.re;
    $tmp16 = $tmp17 * $tmp18;
    $tmp20 = this.im;
    $tmp21 = other.im;
    $tmp19 = $tmp20 * $tmp21;
    r = $tmp16 - $tmp19;
    $tmp23 = this.re;
    $tmp24 = other.im;
    $tmp22 = $tmp23 * $tmp24;
    $tmp26 = this.im;
    $tmp27 = other.re;
    $tmp25 = $tmp26 * $tmp27;
    dst.im = $tmp22 + $tmp25;
    dst.re = r;
    return dst;
};
$tmp0 = Complex.prototype;
$tmp0.cexp = function (dst) {
    var er, $tmp28, $tmp29, $tmp30, $tmp31, $tmp32;
    $tmp28 = this.re;
    er = Math.exp($tmp28);
    $tmp30 = this.im;
    $tmp29 = Math.cos($tmp30);
    dst.re = er * $tmp29;
    $tmp32 = this.im;
    $tmp31 = Math.sin($tmp32);
    dst.im = er * $tmp31;
    return dst;
};
$tmp0 = Complex.prototype;
$tmp0.log = function () {
    var $tmp33, $tmp34;
    $tmp34 = this.re;
    $tmp33 = !$tmp34;
    if ($tmp33) {
        var $tmp35, $tmp36, $tmp37, $tmp38;
        $tmp38 = this.im;
        $tmp37 = $tmp38.toString();
        $tmp36 = $tmp37 + 'j';
        $tmp35 = console.log($tmp36);
    } else {
        var $tmp39, $tmp40;
        $tmp40 = this.im;
        $tmp39 = $tmp40 < 0;
        if ($tmp39) {
            var $tmp41, $tmp42, $tmp43, $tmp44, $tmp45, $tmp46, $tmp38;
            $tmp45 = this.re;
            $tmp44 = $tmp45.toString();
            $tmp38 = this.im;
            $tmp46 = $tmp38.toString();
            $tmp43 = $tmp44 + $tmp46;
            $tmp42 = $tmp43 + 'j';
            $tmp41 = console.log($tmp42);
        } else {
            var $tmp47, $tmp48, $tmp49, $tmp50, $tmp51, $tmp45, $tmp52, $tmp38;
            $tmp45 = this.re;
            $tmp51 = $tmp45.toString();
            $tmp50 = $tmp51 + '+';
            $tmp38 = this.im;
            $tmp52 = $tmp38.toString();
            $tmp49 = $tmp50 + $tmp52;
            $tmp48 = $tmp49 + 'j';
            $tmp47 = console.log($tmp48);
        }
    }
    return;
};
function icfft(amplitudes) {
    var N, iN, i, $tmp54, $tmp56;
    N = amplitudes.length;
    iN = 1 / N;
    i = 0;
    $tmp54 = i < N;
    for (; $tmp54;) {
        var $tmp57, $tmp58, $tmp53, $tmp54;
        $tmp58 = amplitudes[i];
        $tmp57 = $tmp58 instanceof Complex;
        if ($tmp57) {
            var $tmp59, $tmp60;
            $tmp59 = amplitudes[i];
            $tmp59 = amplitudes[i];
            $tmp60 = $tmp59.im;
            $tmp59.im = -$tmp60;
        } else {
        }
        $tmp53 = ++i;
        $tmp54 = i < N;
    }
    amplitudes = cfft(amplitudes);
    i = 0;
    $tmp56 = i < N;
    for (; $tmp56;) {
        var $tmp59, $tmp61, $tmp55, $tmp56;
        $tmp59 = amplitudes[i];
        $tmp59 = amplitudes[i];
        $tmp61 = $tmp59.im;
        $tmp59.im = -$tmp61;
        $tmp59 = amplitudes[i];
        $tmp59.re *= iN;
        $tmp59 = amplitudes[i];
        $tmp59.im *= iN;
        $tmp55 = ++i;
        $tmp56 = i < N;
    }
    return amplitudes;
}
function cfft(amplitudes) {
    var N, $tmp62, hN, even, odd, i, $tmp64, a, $tmp65, $tmp66, k, $tmp68;
    N = amplitudes.length;
    $tmp62 = N <= 1;
    if ($tmp62) {
        return amplitudes;
    } else {
    }
    hN = N / 2;
    even = [];
    odd = [];
    even.length = hN;
    odd.length = hN;
    i = 0;
    $tmp64 = i < hN;
    for (; $tmp64;) {
        var $tmp69, $tmp70, $tmp71, $tmp63, $tmp64;
        $tmp69 = i * 2;
        even[i] = amplitudes[$tmp69];
        $tmp71 = i * 2;
        $tmp70 = $tmp71 + 1;
        odd[i] = amplitudes[$tmp70];
        $tmp63 = ++i;
        $tmp64 = i < hN;
    }
    even = cfft(even);
    odd = cfft(odd);
    $tmp65 = -2;
    $tmp66 = Math.PI;
    a = $tmp65 * $tmp66;
    k = 0;
    $tmp68 = k < hN;
    for (; $tmp68;) {
        var $tmp72, $tmp73, $tmp74, $tmp75, $tmp76, $tmp77, p, t, $tmp78, $tmp79, $tmp80, $tmp81, $tmp82, $tmp83, $tmp84, $tmp67, $tmp68;
        $tmp74 = even[k];
        $tmp73 = $tmp74 instanceof Complex;
        $tmp72 = !$tmp73;
        if ($tmp72) {
            var $tmp85;
            $tmp85 = even[k];
            even[k] = new Complex($tmp85, 0);
        } else {
        }
        $tmp77 = odd[k];
        $tmp76 = $tmp77 instanceof Complex;
        $tmp75 = !$tmp76;
        if ($tmp75) {
            var $tmp86;
            $tmp86 = odd[k];
            odd[k] = new Complex($tmp86, 0);
        } else {
        }
        p = k / N;
        $tmp78 = a * p;
        t = new Complex(0, $tmp78);
        $tmp = t.cexp(t);
        $tmp80 = odd[k];
        $tmp79 = $tmp.mul($tmp80, t);
        $tmp81 = even[k];
        $tmp82 = odd[k];
        amplitudes[k] = $tmp81.add(t, $tmp82);
        $tmp83 = k + hN;
        $tmp81 = even[k];
        $tmp84 = even[k];
        amplitudes[$tmp83] = $tmp81.sub(t, $tmp84);
        $tmp67 = ++k;
        $tmp68 = k < hN;
    }
    return amplitudes;
}
$tmp3 = [
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0
];
$tmp2 = cfft($tmp3);
$tmp1 = console.log($tmp2);
$tmp7 = [
    1,
    1,
    1,
    1,
    0,
    0,
    0,
    0
];
$tmp6 = cfft($tmp7);
$tmp5 = icfft($tmp6);
$tmp4 = console.log($tmp5);