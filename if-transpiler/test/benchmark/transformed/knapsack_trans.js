var data, $tmp0, $tmp1, $tmp2, $tmp3, $tmp4, $tmp5, $tmp6, $tmp7, $tmp8, $tmp9, $tmp10, $tmp11, $tmp12, $tmp13, $tmp14, $tmp15, $tmp16, $tmp17, $tmp18, $tmp19, $tmp20, $tmp21, $tmp22;
$tmp0 = {
    name: 'map',
    weight: 9,
    value: 150,
    pieces: 1
};
$tmp1 = {
    name: 'compass',
    weight: 13,
    value: 35,
    pieces: 1
};
$tmp2 = {
    name: 'water',
    weight: 153,
    value: 200,
    pieces: 2
};
$tmp3 = {
    name: 'sandwich',
    weight: 50,
    value: 60,
    pieces: 2
};
$tmp4 = {
    name: 'glucose',
    weight: 15,
    value: 60,
    pieces: 2
};
$tmp5 = {
    name: 'tin',
    weight: 68,
    value: 45,
    pieces: 3
};
$tmp6 = {
    name: 'banana',
    weight: 27,
    value: 60,
    pieces: 3
};
$tmp7 = {
    name: 'apple',
    weight: 39,
    value: 40,
    pieces: 3
};
$tmp8 = {
    name: 'cheese',
    weight: 23,
    value: 30,
    pieces: 1
};
$tmp9 = {
    name: 'beer',
    weight: 52,
    value: 10,
    pieces: 3
};
$tmp10 = {
    name: 'suntan, cream',
    weight: 11,
    value: 70,
    pieces: 1
};
$tmp11 = {
    name: 'camera',
    weight: 32,
    value: 30,
    pieces: 1
};
$tmp12 = {
    name: 'T-shirt',
    weight: 24,
    value: 15,
    pieces: 2
};
$tmp13 = {
    name: 'trousers',
    weight: 48,
    value: 10,
    pieces: 2
};
$tmp14 = {
    name: 'umbrella',
    weight: 73,
    value: 40,
    pieces: 1
};
$tmp15 = {
    name: 'waterproof, trousers',
    weight: 42,
    value: 70,
    pieces: 1
};
$tmp16 = {
    name: 'waterproof, overclothes',
    weight: 43,
    value: 75,
    pieces: 1
};
$tmp17 = {
    name: 'note-case',
    weight: 22,
    value: 80,
    pieces: 1
};
$tmp18 = {
    name: 'sunglasses',
    weight: 7,
    value: 20,
    pieces: 1
};
$tmp19 = {
    name: 'towel',
    weight: 18,
    value: 12,
    pieces: 2
};
$tmp20 = {
    name: 'socks',
    weight: 4,
    value: 50,
    pieces: 1
};
$tmp21 = {
    name: 'book',
    weight: 30,
    value: 10,
    pieces: 2
};
data = [
    $tmp0,
    $tmp1,
    $tmp2,
    $tmp3,
    $tmp4,
    $tmp5,
    $tmp6,
    $tmp7,
    $tmp8,
    $tmp9,
    $tmp10,
    $tmp11,
    $tmp12,
    $tmp13,
    $tmp14,
    $tmp15,
    $tmp16,
    $tmp17,
    $tmp18,
    $tmp19,
    $tmp20,
    $tmp21
];
function findBestPack() {
    var m, $tmp23, b, $tmp24, opts, P, choose, j, $tmp26, $tmp27, $tmp29, $tmp30, $tmp31, w, $tmp33, best, $tmp34, $tmp36, wgt, val, i, $tmp38, $tmp39, $tmp40, $tmp41, $tmp42, $tmp43;
    $tmp23 = [0];
    m = [$tmp23];
    $tmp24 = [0];
    b = [$tmp24];
    opts = [0];
    P = [1];
    choose = 0;
    j = 0;
    $tmp27 = data.length;
    $tmp26 = j < $tmp27;
    for (; $tmp26;) {
        var $tmp44, $tmp45, $tmp46, $tmp47, $tmp48, $tmp49, $tmp50, $tmp51, $tmp25, $tmp26, $tmp52;
        $tmp44 = j + 1;
        $tmp45 = opts[j];
        $tmp47 = data[j];
        $tmp46 = $tmp47.pieces;
        opts[$tmp44] = $tmp45 + $tmp46;
        $tmp48 = j + 1;
        $tmp49 = P[j];
        $tmp47 = data[j];
        $tmp51 = $tmp47.pieces;
        $tmp50 = 1 + $tmp51;
        P[$tmp48] = $tmp49 * $tmp50;
        $tmp25 = j++;
        $tmp52 = data.length;
        $tmp26 = j < $tmp52;
    }
    j = 0;
    $tmp31 = data.length;
    $tmp30 = opts[$tmp31];
    $tmp29 = j < $tmp30;
    for (; $tmp29;) {
        var $tmp53, $tmp54, $tmp55, $tmp56, $tmp28, $tmp29, $tmp57, $tmp58;
        $tmp53 = m[0];
        $tmp54 = j + 1;
        $tmp55 = b[0];
        $tmp56 = j + 1;
        $tmp55[$tmp56] = 0;
        $tmp53[$tmp54] = $tmp55[$tmp56];
        $tmp28 = j++;
        $tmp58 = data.length;
        $tmp57 = opts[$tmp58];
        $tmp29 = j < $tmp57;
    }
    w = 1;
    $tmp33 = w <= 400;
    for (; $tmp33;) {
        m[w] = [0];
        b[w] = [0];
        var j, $tmp60, $tmp61, $tmp32, $tmp33;
        j = 0;
        $tmp61 = data.length;
        $tmp60 = j < $tmp61;
        for (; $tmp60;) {
            var N, $tmp47, base, n, $tmp63, $tmp59, $tmp60, $tmp64;
            $tmp47 = data[j];
            N = $tmp47.pieces;
            base = opts[j];
            n = 1;
            $tmp63 = n <= N;
            for (; $tmp63;) {
                var W, $tmp65, $tmp47, s, $tmp93, v, $tmp66, $tmp67, I, wN, $tmp68, C, $tmp69, $tmp70, $tmp71, $tmp72, $tmp73, $tmp74, $tmp75, $tmp76, $tmp77, $tmp78, $tmp79, $tmp94, $tmp95, $tmp96, $tmp97, $tmp62, $tmp63;
                $tmp47 = data[j];
                $tmp65 = $tmp47.weight;
                W = n * $tmp65;
                $tmp93 = w >= W;
                if ($tmp93) {
                    s = 1;
                } else {
                    s = 0;
                }
                $tmp66 = s * n;
                $tmp47 = data[j];
                $tmp67 = $tmp47.value;
                v = $tmp66 * $tmp67;
                I = base + n;
                $tmp68 = s * W;
                wN = w - $tmp68;
                $tmp70 = P[j];
                $tmp69 = n * $tmp70;
                $tmp72 = b[wN];
                $tmp71 = $tmp72[base];
                C = $tmp69 + $tmp71;
                $tmp73 = m[w];
                $tmp73 = m[w];
                $tmp75 = I - 1;
                $tmp74 = $tmp73[$tmp75];
                $tmp78 = m[wN];
                $tmp77 = $tmp78[base];
                $tmp76 = v + $tmp77;
                $tmp73[I] = Math.max($tmp74, $tmp76);
                $tmp79 = b[w];
                $tmp73 = m[w];
                $tmp95 = $tmp73[I];
                $tmp73 = m[w];
                $tmp97 = I - 1;
                $tmp96 = $tmp73[$tmp97];
                $tmp94 = $tmp95 > $tmp96;
                if ($tmp94) {
                    $tmp79[I] = C;
                } else {
                    var $tmp79, $tmp98;
                    $tmp79 = b[w];
                    $tmp98 = I - 1;
                    $tmp79[I] = $tmp79[$tmp98];
                }
                choose = $tmp79[I];
                $tmp62 = n++;
                $tmp63 = n <= N;
            }
            $tmp59 = j++;
            $tmp64 = data.length;
            $tmp60 = j < $tmp64;
        }
        $tmp32 = w++;
        $tmp33 = w <= 400;
    }
    best = [];
    $tmp34 = data.length;
    j = $tmp34 - 1;
    $tmp36 = j >= 0;
    for (; $tmp36;) {
        var $tmp80, $tmp81, $tmp82, $tmp83, $tmp35, $tmp36;
        $tmp81 = P[j];
        $tmp80 = choose / $tmp81;
        best[j] = Math.floor($tmp80);
        $tmp82 = best[j];
        $tmp83 = P[j];
        choose -= $tmp82 * $tmp83;
        $tmp35 = j--;
        $tmp36 = j >= 0;
    }
    wgt = 0;
    val = 0;
    i = 0;
    $tmp39 = best.length;
    $tmp38 = i < $tmp39;
    for (; $tmp38;) {
        var $tmp84, $tmp85, $tmp86, $tmp87, $tmp88, $tmp89, $tmp90, $tmp37, $tmp38, $tmp91;
        $tmp85 = best[i];
        $tmp84 = 0 == $tmp85;
        if ($tmp84) {
            var $tmp37, $tmp38, $tmp92;
            $tmp37 = i++;
            $tmp92 = best.length;
            $tmp38 = i < $tmp92;
            continue;
        } else {
        }
        $tmp86 = best[i];
        $tmp88 = data[i];
        $tmp87 = $tmp88.weight;
        wgt += $tmp86 * $tmp87;
        $tmp89 = best[i];
        $tmp88 = data[i];
        $tmp90 = $tmp88.value;
        val += $tmp89 * $tmp90;
        $tmp37 = i++;
        $tmp91 = best.length;
        $tmp38 = i < $tmp91;
    }
    $tmp41 = 'Total weight: ' + wgt;
    $tmp40 = console.log($tmp41);
    $tmp43 = 'Total value: ' + val;
    $tmp42 = console.log($tmp43);
    return;
}
$tmp22 = findBestPack();