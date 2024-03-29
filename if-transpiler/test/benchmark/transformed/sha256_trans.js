'use strict';
var Sha256, $tmp0, $tmp1,_$tmp,$tmp;
Sha256 = {};
Sha256.hash = function (msg) {
    msg = Sha256.utf8Encode(msg);
    var K, H, l, $tmp2, $tmp3, N, $tmp4, M, i, $tmp6, $tmp7, $tmp8, $tmp9, $tmp10, $tmp11, $tmp12, $tmp13, $tmp14, $tmp15, $tmp16, $tmp17, $tmp18, W, a, b, c, d, e, f, g, h, $tmp20, $tmp21, $tmp22, $tmp23, $tmp24, $tmp25, $tmp26, $tmp27, $tmp28, $tmp29, $tmp30, $tmp31, $tmp32, $tmp33, $tmp34, $tmp35, $tmp36, $tmp37, $tmp38, $tmp39, $tmp40, $tmp41, $tmp42, $tmp43;
    K = [
        1116352408,
        1899447441,
        3049323471,
        3921009573,
        961987163,
        1508970993,
        2453635748,
        2870763221,
        3624381080,
        310598401,
        607225278,
        1426881987,
        1925078388,
        2162078206,
        2614888103,
        3248222580,
        3835390401,
        4022224774,
        264347078,
        604807628,
        770255983,
        1249150122,
        1555081692,
        1996064986,
        2554220882,
        2821834349,
        2952996808,
        3210313671,
        3336571891,
        3584528711,
        113926993,
        338241895,
        666307205,
        773529912,
        1294757372,
        1396182291,
        1695183700,
        1986661051,
        2177026350,
        2456956037,
        2730485921,
        2820302411,
        3259730800,
        3345764771,
        3516065817,
        3600352804,
        4094571909,
        275423344,
        430227734,
        506948616,
        659060556,
        883997877,
        958139571,
        1322822218,
        1537002063,
        1747873779,
        1955562222,
        2024104815,
        2227730452,
        2361852424,
        2428436474,
        2756734187,
        3204031479,
        3329325298
    ];
    H = [
        1779033703,
        3144134277,
        1013904242,
        2773480762,
        1359893119,
        2600822924,
        528734635,
        1541459225
    ];
    msg += String.fromCharCode(128);
    $tmp3 = msg.length;
    $tmp2 = $tmp3 / 4;
    l = $tmp2 + 2;
    $tmp4 = l / 16;
    N = Math.ceil($tmp4);
    M = new Array(N);
    i = 0;
    $tmp6 = i < N;
    for (; $tmp6;) {
        M[i] = new Array(16);
        var j, $tmp45, $tmp5, $tmp6;
        j = 0;
        $tmp45 = j < 16;
        for (; $tmp45;) {
            var $tmp46, $tmp47, $tmp48, $tmp49, $tmp50, $tmp51, $tmp52, $tmp53, $tmp54, $tmp55, $tmp56, $tmp57, $tmp58, $tmp59, $tmp60, $tmp61, $tmp62, $tmp63, $tmp64, $tmp65, $tmp66, $tmp67, $tmp68, $tmp69, $tmp70, $tmp44, $tmp45;
            $tmp46 = M[i];
            $tmp52 = i * 64;
            $tmp53 = j * 4;
            $tmp51 = $tmp52 + $tmp53;
            $tmp50 = msg.charCodeAt($tmp51);
            $tmp49 = $tmp50 << 24;
            $tmp58 = i * 64;
            $tmp59 = j * 4;
            $tmp57 = $tmp58 + $tmp59;
            $tmp56 = $tmp57 + 1;
            $tmp55 = msg.charCodeAt($tmp56);
            $tmp54 = $tmp55 << 16;
            $tmp48 = $tmp49 | $tmp54;
            $tmp64 = i * 64;
            $tmp65 = j * 4;
            $tmp63 = $tmp64 + $tmp65;
            $tmp62 = $tmp63 + 2;
            $tmp61 = msg.charCodeAt($tmp62);
            $tmp60 = $tmp61 << 8;
            $tmp47 = $tmp48 | $tmp60;
            $tmp69 = i * 64;
            $tmp70 = j * 4;
            $tmp68 = $tmp69 + $tmp70;
            $tmp67 = $tmp68 + 3;
            $tmp66 = msg.charCodeAt($tmp67);
            $tmp46[j] = $tmp47 | $tmp66;
            $tmp44 = j++;
            $tmp45 = j < 16;
        }
        $tmp5 = i++;
        $tmp6 = i < N;
    }
    $tmp7 = N - 1;
    $tmp = M[$tmp7];
    $tmp10 = msg.length;
    $tmp9 = $tmp10 - 1;
    $tmp8 = $tmp9 * 8;
    $tmp11 = Math.pow(2, 32);
    $tmp[14] = $tmp8 / $tmp11;
    $tmp12 = N - 1;
    $tmp = M[$tmp12];
    $tmp14 = N - 1;
    $tmp = M[$tmp14];
    $tmp13 = $tmp[14];
    $tmp[14] = Math.floor($tmp13);
    $tmp15 = N - 1;
    $tmp = M[$tmp15];
    $tmp18 = msg.length;
    $tmp17 = $tmp18 - 1;
    $tmp16 = $tmp17 * 8;
    $tmp[15] = $tmp16 & 4294967295;
    W = new Array(64);
    i = 0;
    $tmp20 = i < N;
    for (; $tmp20;) {
        var t, $tmp72, $tmp74, $tmp76, $tmp77, $tmp78, $tmp79, $tmp80, $tmp81, $tmp82, $tmp83, $tmp84, $tmp85, $tmp86, $tmp87, $tmp88, $tmp89, $tmp90, $tmp91, $tmp92, $tmp19, $tmp20;
        t = 0;
        $tmp72 = t < 16;
        for (; $tmp72;) {
            var $tmp46, $tmp71, $tmp72;
            $tmp46 = M[i];
            W[t] = $tmp46[t];
            $tmp71 = t++;
            $tmp72 = t < 16;
        }
        t = 16;
        $tmp74 = t < 64;
        for (; $tmp74;) {
            var $tmp93, $tmp94, $tmp95, $tmp96, $tmp97, $tmp98, $tmp99, $tmp100, $tmp101, $tmp102, $tmp103, $tmp104, $tmp105, $tmp73, $tmp74;
            $tmp98 = t - 2;
            $tmp97 = W[$tmp98];
            $tmp96 = Sha256.σ1($tmp97);
            $tmp100 = t - 7;
            $tmp99 = W[$tmp100];
            $tmp95 = $tmp96 + $tmp99;
            $tmp103 = t - 15;
            $tmp102 = W[$tmp103];
            $tmp101 = Sha256.σ0($tmp102);
            $tmp94 = $tmp95 + $tmp101;
            $tmp105 = t - 16;
            $tmp104 = W[$tmp105];
            $tmp93 = $tmp94 + $tmp104;
            W[t] = $tmp93 & 4294967295;
            $tmp73 = t++;
            $tmp74 = t < 64;
        }
        a = H[0];
        b = H[1];
        c = H[2];
        d = H[3];
        e = H[4];
        f = H[5];
        g = H[6];
        h = H[7];
        t = 0;
        $tmp76 = t < 64;
        for (; $tmp76;) {
            var T1, $tmp106, $tmp107, $tmp108, $tmp109, $tmp110, $tmp111, $tmp112, T2, $tmp113, $tmp114, $tmp115, $tmp116, $tmp75, $tmp76;
            $tmp109 = Sha256.Σ1(e);
            $tmp108 = h + $tmp109;
            $tmp110 = Sha256.Ch(e, f, g);
            $tmp107 = $tmp108 + $tmp110;
            $tmp111 = K[t];
            $tmp106 = $tmp107 + $tmp111;
            $tmp112 = W[t];
            T1 = $tmp106 + $tmp112;
            $tmp113 = Sha256.Σ0(a);
            $tmp114 = Sha256.Maj(a, b, c);
            T2 = $tmp113 + $tmp114;
            h = g;
            g = f;
            f = e;
            $tmp115 = d + T1;
            e = $tmp115 & 4294967295;
            d = c;
            c = b;
            b = a;
            $tmp116 = T1 + T2;
            a = $tmp116 & 4294967295;
            $tmp75 = t++;
            $tmp76 = t < 64;
        }
        $tmp78 = H[0];
        $tmp77 = $tmp78 + a;
        H[0] = $tmp77 & 4294967295;
        $tmp80 = H[1];
        $tmp79 = $tmp80 + b;
        H[1] = $tmp79 & 4294967295;
        $tmp82 = H[2];
        $tmp81 = $tmp82 + c;
        H[2] = $tmp81 & 4294967295;
        $tmp84 = H[3];
        $tmp83 = $tmp84 + d;
        H[3] = $tmp83 & 4294967295;
        $tmp86 = H[4];
        $tmp85 = $tmp86 + e;
        H[4] = $tmp85 & 4294967295;
        $tmp88 = H[5];
        $tmp87 = $tmp88 + f;
        H[5] = $tmp87 & 4294967295;
        $tmp90 = H[6];
        $tmp89 = $tmp90 + g;
        H[6] = $tmp89 & 4294967295;
        $tmp92 = H[7];
        $tmp91 = $tmp92 + h;
        H[7] = $tmp91 & 4294967295;
        $tmp19 = i++;
        $tmp20 = i < N;
    }
    $tmp29 = H[0];
    $tmp28 = Sha256.toHexStr($tmp29);
    $tmp31 = H[1];
    $tmp30 = Sha256.toHexStr($tmp31);
    $tmp27 = $tmp28 + $tmp30;
    $tmp33 = H[2];
    $tmp32 = Sha256.toHexStr($tmp33);
    $tmp26 = $tmp27 + $tmp32;
    $tmp35 = H[3];
    $tmp34 = Sha256.toHexStr($tmp35);
    $tmp25 = $tmp26 + $tmp34;
    $tmp37 = H[4];
    $tmp36 = Sha256.toHexStr($tmp37);
    $tmp24 = $tmp25 + $tmp36;
    $tmp39 = H[5];
    $tmp38 = Sha256.toHexStr($tmp39);
    $tmp23 = $tmp24 + $tmp38;
    $tmp41 = H[6];
    $tmp40 = Sha256.toHexStr($tmp41);
    $tmp22 = $tmp23 + $tmp40;
    $tmp43 = H[7];
    $tmp42 = Sha256.toHexStr($tmp43);
    $tmp21 = $tmp22 + $tmp42;
    return $tmp21;
};
Sha256.ROTR = function (n, x) {
    var $tmp117, $tmp118, $tmp119, $tmp120;
    $tmp118 = x >>> n;
    $tmp120 = 32 - n;
    $tmp119 = x << $tmp120;
    $tmp117 = $tmp118 | $tmp119;
    return $tmp117;
};
Sha256.Σ0 = function (x) {
    var $tmp121, $tmp122, $tmp123, $tmp124, $tmp125;
    $tmp123 = Sha256.ROTR(2, x);
    $tmp124 = Sha256.ROTR(13, x);
    $tmp122 = $tmp123 ^ $tmp124;
    $tmp125 = Sha256.ROTR(22, x);
    $tmp121 = $tmp122 ^ $tmp125;
    return $tmp121;
};
Sha256.Σ1 = function (x) {
    var $tmp126, $tmp127, $tmp128, $tmp129, $tmp130;
    $tmp128 = Sha256.ROTR(6, x);
    $tmp129 = Sha256.ROTR(11, x);
    $tmp127 = $tmp128 ^ $tmp129;
    $tmp130 = Sha256.ROTR(25, x);
    $tmp126 = $tmp127 ^ $tmp130;
    return $tmp126;
};
Sha256.σ0 = function (x) {
    var $tmp131, $tmp132, $tmp133, $tmp134, $tmp135;
    $tmp133 = Sha256.ROTR(7, x);
    $tmp134 = Sha256.ROTR(18, x);
    $tmp132 = $tmp133 ^ $tmp134;
    $tmp135 = x >>> 3;
    $tmp131 = $tmp132 ^ $tmp135;
    return $tmp131;
};
Sha256.σ1 = function (x) {
    var $tmp136, $tmp137, $tmp138, $tmp139, $tmp140;
    $tmp138 = Sha256.ROTR(17, x);
    $tmp139 = Sha256.ROTR(19, x);
    $tmp137 = $tmp138 ^ $tmp139;
    $tmp140 = x >>> 10;
    $tmp136 = $tmp137 ^ $tmp140;
    return $tmp136;
};
Sha256.Ch = function (x, y, z) {
    var $tmp141, $tmp142, $tmp143, $tmp144;
    $tmp142 = x & y;
    $tmp144 = ~x;
    $tmp143 = $tmp144 & z;
    $tmp141 = $tmp142 ^ $tmp143;
    return $tmp141;
};
Sha256.Maj = function (x, y, z) {
    var $tmp145, $tmp146, $tmp147, $tmp148, $tmp149;
    $tmp147 = x & y;
    $tmp148 = x & z;
    $tmp146 = $tmp147 ^ $tmp148;
    $tmp149 = y & z;
    $tmp145 = $tmp146 ^ $tmp149;
    return $tmp145;
};
Sha256.toHexStr = function (n) {
    var s, v, i, $tmp151;
    s = '';
    i = 7;
    $tmp151 = i >= 0;
    for (; $tmp151;) {
        var $tmp152, $tmp153, $tmp150, $tmp151;
        $tmp153 = i * 4;
        $tmp152 = n >>> $tmp153;
        v = $tmp152 & 15;
        s += v.toString(16);
        $tmp150 = i--;
        $tmp151 = i >= 0;
    }
    return s;
};
Sha256.utf8Encode = function (str) {
    var $tmp154;
    $tmp154 = encodeURIComponent(str);
    return $tmp154;
};
Sha256.utf8Decode = function (str) {
    try {
        var $tmp155;
        $tmp155 = decodeURIComponent(str);
        return $tmp155;
    } catch (e) {
        return str;
    }
    return;
};
$tmp1 = Sha256.hash('abc');
$tmp0 = console.log($tmp1);