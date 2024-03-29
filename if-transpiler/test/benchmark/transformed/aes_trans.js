var Aes, $tmp0, $tmp1, $tmp2, $tmp3, $tmp4, $tmp5, $tmp6, $tmp7, $tmp8, $tmp9, $tmp10, $tmp11, encr, decr, $tmp12, $tmp13, $tmp14, $tmp15;
Aes = {};
Aes.cipher = function (input, w) {
    var Nb, Nr, $tmp16, $tmp17, state, $tmp18, $tmp19, $tmp20, $tmp21, i, $tmp23, $tmp24, round, $tmp26, output, $tmp27, $tmp29, $tmp30;
    Nb = 4;
    $tmp17 = w.length;
    $tmp16 = $tmp17 / Nb;
    Nr = $tmp16 - 1;
    $tmp18 = [];
    $tmp19 = [];
    $tmp20 = [];
    $tmp21 = [];
    state = [
        $tmp18,
        $tmp19,
        $tmp20,
        $tmp21
    ];
    i = 0;
    $tmp24 = 4 * Nb;
    $tmp23 = i < $tmp24;
    for (; $tmp23;) {
        var $tmp, $tmp31, $tmp32, $tmp33, $tmp22, $tmp23, $tmp34;
        $tmp31 = i % 4;
        $tmp = state[$tmp31];
        $tmp33 = i / 4;
        $tmp32 = Math.floor($tmp33);
        $tmp[$tmp32] = input[i];
        $tmp22 = i++;
        $tmp34 = 4 * Nb;
        $tmp23 = i < $tmp34;
    }
    state = Aes.addRoundKey(state, w, 0, Nb);
    round = 1;
    $tmp26 = round < Nr;
    for (; $tmp26;) {
        state = Aes.subBytes(state, Nb);
        state = Aes.shiftRows(state, Nb);
        state = Aes.mixColumns(state, Nb);
        state = Aes.addRoundKey(state, w, round, Nb);
        var $tmp25, $tmp26;
        $tmp25 = round++;
        $tmp26 = round < Nr;
    }
    state = Aes.subBytes(state, Nb);
    state = Aes.shiftRows(state, Nb);
    state = Aes.addRoundKey(state, w, Nr, Nb);
    $tmp27 = 4 * Nb;
    output = new Array($tmp27);
    i = 0;
    $tmp30 = 4 * Nb;
    $tmp29 = i < $tmp30;
    for (; $tmp29;) {
        var $tmp, $tmp35, $tmp36, $tmp37, $tmp28, $tmp29, $tmp38;
        $tmp35 = i % 4;
        $tmp = state[$tmp35];
        $tmp37 = i / 4;
        $tmp36 = Math.floor($tmp37);
        output[i] = $tmp[$tmp36];
        $tmp28 = i++;
        $tmp38 = 4 * Nb;
        $tmp29 = i < $tmp38;
    }
    return output;
};
Aes.keyExpansion = function (key) {
    var Nb, Nk, $tmp39, Nr, w, $tmp40, $tmp41, temp, i, $tmp43, $tmp45, $tmp46, $tmp47;
    Nb = 4;
    $tmp39 = key.length;
    Nk = $tmp39 / 4;
    Nr = Nk + 6;
    $tmp41 = Nr + 1;
    $tmp40 = Nb * $tmp41;
    w = new Array($tmp40);
    temp = new Array(4);
    i = 0;
    $tmp43 = i < Nk;
    for (; $tmp43;) {
        var r, $tmp48, $tmp49, $tmp50, $tmp51, $tmp52, $tmp53, $tmp54, $tmp55, $tmp56, $tmp57, $tmp58, $tmp42, $tmp43;
        $tmp49 = 4 * i;
        $tmp48 = key[$tmp49];
        $tmp52 = 4 * i;
        $tmp51 = $tmp52 + 1;
        $tmp50 = key[$tmp51];
        $tmp55 = 4 * i;
        $tmp54 = $tmp55 + 2;
        $tmp53 = key[$tmp54];
        $tmp58 = 4 * i;
        $tmp57 = $tmp58 + 3;
        $tmp56 = key[$tmp57];
        r = [
            $tmp48,
            $tmp50,
            $tmp53,
            $tmp56
        ];
        w[i] = r;
        $tmp42 = i++;
        $tmp43 = i < Nk;
    }
    i = Nk;
    $tmp47 = Nr + 1;
    $tmp46 = Nb * $tmp47;
    $tmp45 = i < $tmp46;
    for (; $tmp45;) {
        w[i] = new Array(4);
        var t, $tmp60, $tmp61, $tmp62, $tmp64, $tmp44, $tmp45, $tmp65, $tmp66;
        t = 0;
        $tmp60 = t < 4;
        for (; $tmp60;) {
            var $tmp, $tmp67, $tmp59, $tmp60;
            $tmp67 = i - 1;
            $tmp = w[$tmp67];
            temp[t] = $tmp[t];
            $tmp59 = t++;
            $tmp60 = t < 4;
        }
        $tmp62 = i % Nk;
        $tmp61 = $tmp62 == 0;
        if ($tmp61) {
            var $tmp68, t, $tmp70;
            $tmp68 = Aes.rotWord(temp);
            temp = Aes.subWord($tmp68);
            t = 0;
            $tmp70 = t < 4;
            for (; $tmp70;) {
                var $tmp, $tmp71, $tmp72, $tmp69, $tmp70;
                $tmp71 = Aes.rCon;
                $tmp72 = i / Nk;
                $tmp = $tmp71[$tmp72];
                temp[t] ^= $tmp[t];
                $tmp69 = t++;
                $tmp70 = t < 4;
            }
        } else {
            var $tmp73, $tmp74, $tmp75, $tmp76;
            $tmp74 = Nk > 6;
            $tmp76 = i % Nk;
            $tmp75 = $tmp76 == 4;
            $tmp73 = $tmp74 && $tmp75;
            if ($tmp73) {
                temp = Aes.subWord(temp);
            } else {
            }
        }
        t = 0;
        $tmp64 = t < 4;
        for (; $tmp64;) {
            var $tmp77, $tmp78, $tmp79, $tmp80, $tmp63, $tmp64;
            $tmp77 = w[i];
            $tmp79 = i - Nk;
            $tmp = w[$tmp79];
            $tmp78 = $tmp[t];
            $tmp80 = temp[t];
            $tmp77[t] = $tmp78 ^ $tmp80;
            $tmp63 = t++;
            $tmp64 = t < 4;
        }
        $tmp44 = i++;
        $tmp66 = Nr + 1;
        $tmp65 = Nb * $tmp66;
        $tmp45 = i < $tmp65;
    }
    return w;
};
Aes.subBytes = function (s, Nb) {
    var r, $tmp82;
    r = 0;
    $tmp82 = r < 4;
    for (; $tmp82;) {
        var c, $tmp84, $tmp81, $tmp82;
        c = 0;
        $tmp84 = c < Nb;
        for (; $tmp84;) {
            var $tmp85, $tmp86, $tmp87, $tmp83, $tmp84;
            $tmp85 = s[r];
            $tmp86 = Aes.sBox;
            $tmp85 = s[r];
            $tmp87 = $tmp85[c];
            $tmp85[c] = $tmp86[$tmp87];
            $tmp83 = c++;
            $tmp84 = c < Nb;
        }
        $tmp81 = r++;
        $tmp82 = r < 4;
    }
    return s;
};
Aes.shiftRows = function (s, Nb) {
    var t, r, $tmp89;
    t = new Array(4);
    r = 1;
    $tmp89 = r < 4;
    for (; $tmp89;) {
        var c, $tmp91, $tmp93, $tmp88, $tmp89;
        c = 0;
        $tmp91 = c < 4;
        for (; $tmp91;) {
            var $tmp85, $tmp94, $tmp95, $tmp90, $tmp91;
            $tmp85 = s[r];
            $tmp95 = c + r;
            $tmp94 = $tmp95 % Nb;
            t[c] = $tmp85[$tmp94];
            $tmp90 = c++;
            $tmp91 = c < 4;
        }
        c = 0;
        $tmp93 = c < 4;
        for (; $tmp93;) {
            var $tmp85, $tmp92, $tmp93;
            $tmp85 = s[r];
            $tmp85[c] = t[c];
            $tmp92 = c++;
            $tmp93 = c < 4;
        }
        $tmp88 = r++;
        $tmp89 = r < 4;
    }
    return s;
};
Aes.mixColumns = function (s, Nb) {
    var c, $tmp97;
    c = 0;
    $tmp97 = c < 4;
    for (; $tmp97;) {
        var a, b, i, $tmp99, $tmp100, $tmp101, $tmp102, $tmp103, $tmp104, $tmp105, $tmp106, $tmp107, $tmp108, $tmp109, $tmp110, $tmp111, $tmp112, $tmp113, $tmp114, $tmp115, $tmp116, $tmp117, $tmp118, $tmp119, $tmp120, $tmp121, $tmp122, $tmp123, $tmp124, $tmp125, $tmp126, $tmp127, $tmp128, $tmp129, $tmp130, $tmp131, $tmp132, $tmp133, $tmp134, $tmp135, $tmp96, $tmp97;
        a = new Array(4);
        b = new Array(4);
        i = 0;
        $tmp99 = i < 4;
        for (; $tmp99;) {
            var $tmp136, $tmp267, $tmp268, $tmp98, $tmp99;
            $tmp136 = s[i];
            a[i] = $tmp136[c];
            $tmp136 = s[i];
            $tmp268 = $tmp136[c];
            $tmp267 = $tmp268 & 128;
            if ($tmp267) {
                var $tmp269, $tmp270, $tmp136;
                $tmp136 = s[i];
                $tmp270 = $tmp136[c];
                $tmp269 = $tmp270 << 1;
                b[i] = $tmp269 ^ 283;
            } else {
                var $tmp271, $tmp136;
                $tmp136 = s[i];
                $tmp271 = $tmp136[c];
                b[i] = $tmp271 << 1;
            }
            $tmp98 = i++;
            $tmp99 = i < 4;
        }
        $tmp100 = s[0];
        $tmp104 = b[0];
        $tmp105 = a[1];
        $tmp103 = $tmp104 ^ $tmp105;
        $tmp106 = b[1];
        $tmp102 = $tmp103 ^ $tmp106;
        $tmp107 = a[2];
        $tmp101 = $tmp102 ^ $tmp107;
        $tmp108 = a[3];
        $tmp100[c] = $tmp101 ^ $tmp108;
        $tmp109 = s[1];
        $tmp113 = a[0];
        $tmp114 = b[1];
        $tmp112 = $tmp113 ^ $tmp114;
        $tmp115 = a[2];
        $tmp111 = $tmp112 ^ $tmp115;
        $tmp116 = b[2];
        $tmp110 = $tmp111 ^ $tmp116;
        $tmp117 = a[3];
        $tmp109[c] = $tmp110 ^ $tmp117;
        $tmp118 = s[2];
        $tmp122 = a[0];
        $tmp123 = a[1];
        $tmp121 = $tmp122 ^ $tmp123;
        $tmp124 = b[2];
        $tmp120 = $tmp121 ^ $tmp124;
        $tmp125 = a[3];
        $tmp119 = $tmp120 ^ $tmp125;
        $tmp126 = b[3];
        $tmp118[c] = $tmp119 ^ $tmp126;
        $tmp127 = s[3];
        $tmp131 = a[0];
        $tmp132 = b[0];
        $tmp130 = $tmp131 ^ $tmp132;
        $tmp133 = a[1];
        $tmp129 = $tmp130 ^ $tmp133;
        $tmp134 = a[2];
        $tmp128 = $tmp129 ^ $tmp134;
        $tmp135 = b[3];
        $tmp127[c] = $tmp128 ^ $tmp135;
        $tmp96 = c++;
        $tmp97 = c < 4;
    }
    return s;
};
Aes.addRoundKey = function (state, w, rnd, Nb) {
    var r, $tmp138;
    r = 0;
    $tmp138 = r < 4;
    for (; $tmp138;) {
        var c, $tmp140, $tmp137, $tmp138;
        c = 0;
        $tmp140 = c < Nb;
        for (; $tmp140;) {
            var $tmp141, $tmp142, $tmp143, $tmp139, $tmp140;
            $tmp141 = state[r];
            $tmp143 = rnd * 4;
            $tmp142 = $tmp143 + c;
            $tmp = w[$tmp142];
            $tmp141[c] ^= $tmp[r];
            $tmp139 = c++;
            $tmp140 = c < Nb;
        }
        $tmp137 = r++;
        $tmp138 = r < 4;
    }
    return state;
};
Aes.subWord = function (w) {
    var i, $tmp145;
    i = 0;
    $tmp145 = i < 4;
    for (; $tmp145;) {
        var $tmp86, $tmp146, $tmp144, $tmp145;
        $tmp86 = Aes.sBox;
        $tmp146 = w[i];
        w[i] = $tmp86[$tmp146];
        $tmp144 = i++;
        $tmp145 = i < 4;
    }
    return w;
};
Aes.rotWord = function (w) {
    var tmp, i, $tmp148;
    tmp = w[0];
    i = 0;
    $tmp148 = i < 3;
    for (; $tmp148;) {
        var $tmp149, $tmp147, $tmp148;
        $tmp149 = i + 1;
        w[i] = w[$tmp149];
        $tmp147 = i++;
        $tmp148 = i < 3;
    }
    w[3] = tmp;
    return w;
};
Aes.sBox = [
    99,
    124,
    119,
    123,
    242,
    107,
    111,
    197,
    48,
    1,
    103,
    43,
    254,
    215,
    171,
    118,
    202,
    130,
    201,
    125,
    250,
    89,
    71,
    240,
    173,
    212,
    162,
    175,
    156,
    164,
    114,
    192,
    183,
    253,
    147,
    38,
    54,
    63,
    247,
    204,
    52,
    165,
    229,
    241,
    113,
    216,
    49,
    21,
    4,
    199,
    35,
    195,
    24,
    150,
    5,
    154,
    7,
    18,
    128,
    226,
    235,
    39,
    178,
    117,
    9,
    131,
    44,
    26,
    27,
    110,
    90,
    160,
    82,
    59,
    214,
    179,
    41,
    227,
    47,
    132,
    83,
    209,
    0,
    237,
    32,
    252,
    177,
    91,
    106,
    203,
    190,
    57,
    74,
    76,
    88,
    207,
    208,
    239,
    170,
    251,
    67,
    77,
    51,
    133,
    69,
    249,
    2,
    127,
    80,
    60,
    159,
    168,
    81,
    163,
    64,
    143,
    146,
    157,
    56,
    245,
    188,
    182,
    218,
    33,
    16,
    255,
    243,
    210,
    205,
    12,
    19,
    236,
    95,
    151,
    68,
    23,
    196,
    167,
    126,
    61,
    100,
    93,
    25,
    115,
    96,
    129,
    79,
    220,
    34,
    42,
    144,
    136,
    70,
    238,
    184,
    20,
    222,
    94,
    11,
    219,
    224,
    50,
    58,
    10,
    73,
    6,
    36,
    92,
    194,
    211,
    172,
    98,
    145,
    149,
    228,
    121,
    231,
    200,
    55,
    109,
    141,
    213,
    78,
    169,
    108,
    86,
    244,
    234,
    101,
    122,
    174,
    8,
    186,
    120,
    37,
    46,
    28,
    166,
    180,
    198,
    232,
    221,
    116,
    31,
    75,
    189,
    139,
    138,
    112,
    62,
    181,
    102,
    72,
    3,
    246,
    14,
    97,
    53,
    87,
    185,
    134,
    193,
    29,
    158,
    225,
    248,
    152,
    17,
    105,
    217,
    142,
    148,
    155,
    30,
    135,
    233,
    206,
    85,
    40,
    223,
    140,
    161,
    137,
    13,
    191,
    230,
    66,
    104,
    65,
    153,
    45,
    15,
    176,
    84,
    187,
    22
];
$tmp0 = [
    0,
    0,
    0,
    0
];
$tmp1 = [
    1,
    0,
    0,
    0
];
$tmp2 = [
    2,
    0,
    0,
    0
];
$tmp3 = [
    4,
    0,
    0,
    0
];
$tmp4 = [
    8,
    0,
    0,
    0
];
$tmp5 = [
    16,
    0,
    0,
    0
];
$tmp6 = [
    32,
    0,
    0,
    0
];
$tmp7 = [
    64,
    0,
    0,
    0
];
$tmp8 = [
    128,
    0,
    0,
    0
];
$tmp9 = [
    27,
    0,
    0,
    0
];
$tmp10 = [
    54,
    0,
    0,
    0
];
Aes.rCon = [
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
    $tmp10
];
Aes.Ctr = {};
$tmp11 = Aes.Ctr;
$tmp11.encrypt = function (plaintext, password, nBits) {
    var blockSize, $tmp150, $tmp151, $tmp152, $tmp153, $tmp154, $tmp155, nBytes, pwBytes, i, $tmp157, key, $tmp158, $tmp159, $tmp160, counterBlock, nonce, nonceMs, nonceSec, $tmp161, nonceRnd, $tmp162, $tmp163, $tmp165, $tmp167, $tmp169, ctrTxt, $tmp171, keySchedule, blockCount, $tmp172, $tmp173, ciphertxt, b, $tmp175, ciphertext, $tmp176;
    blockSize = 16;
    $tmp153 = nBits == 128;
    $tmp154 = nBits == 192;
    $tmp152 = $tmp153 || $tmp154;
    $tmp155 = nBits == 256;
    $tmp151 = $tmp152 || $tmp155;
    $tmp150 = !$tmp151;
    if ($tmp150) {
        var $tmp177;
        $tmp177 = '';
        return $tmp177;
    } else {
    }
    plaintext = Aes.utf8Encode(plaintext);
    password = Aes.utf8Encode(password);
    nBytes = nBits / 8;
    pwBytes = new Array(nBytes);
    i = 0;
    $tmp157 = i < nBytes;
    for (; $tmp157;) {
        var $tmp272, $tmp273, $tmp156, $tmp157;
        $tmp273 = password.charCodeAt(i);
        $tmp272 = isNaN($tmp273);
        if ($tmp272) {
            pwBytes[i] = 0;
        } else {
            pwBytes[i] = password.charCodeAt(i);
        }
        $tmp156 = i++;
        $tmp157 = i < nBytes;
    }
    $tmp158 = Aes.keyExpansion(pwBytes);
    key = Aes.cipher(pwBytes, $tmp158);
    $tmp160 = nBytes - 16;
    $tmp159 = key.slice(0, $tmp160);
    key = key.concat($tmp159);
    counterBlock = new Array(blockSize);
    $tmp = new Date();
    nonce = $tmp.getTime();
    nonceMs = nonce % 1000;
    $tmp161 = nonce / 1000;
    nonceSec = Math.floor($tmp161);
    $tmp163 = Math.random();
    $tmp162 = $tmp163 * 65535;
    nonceRnd = Math.floor($tmp162);
    i = 0;
    $tmp165 = i < 2;
    for (; $tmp165;) {
        var $tmp178, $tmp179, $tmp164, $tmp165;
        $tmp179 = i * 8;
        $tmp178 = nonceMs >>> $tmp179;
        counterBlock[i] = $tmp178 & 255;
        $tmp164 = i++;
        $tmp165 = i < 2;
    }
    i = 0;
    $tmp167 = i < 2;
    for (; $tmp167;) {
        var $tmp180, $tmp181, $tmp182, $tmp166, $tmp167;
        $tmp180 = i + 2;
        $tmp182 = i * 8;
        $tmp181 = nonceRnd >>> $tmp182;
        counterBlock[$tmp180] = $tmp181 & 255;
        $tmp166 = i++;
        $tmp167 = i < 2;
    }
    i = 0;
    $tmp169 = i < 4;
    for (; $tmp169;) {
        var $tmp183, $tmp184, $tmp185, $tmp168, $tmp169;
        $tmp183 = i + 4;
        $tmp185 = i * 8;
        $tmp184 = nonceSec >>> $tmp185;
        counterBlock[$tmp183] = $tmp184 & 255;
        $tmp168 = i++;
        $tmp169 = i < 4;
    }
    ctrTxt = '';
    i = 0;
    $tmp171 = i < 8;
    for (; $tmp171;) {
        var $tmp186, $tmp170, $tmp171;
        $tmp186 = counterBlock[i];
        ctrTxt += String.fromCharCode($tmp186);
        $tmp170 = i++;
        $tmp171 = i < 8;
    }
    keySchedule = Aes.keyExpansion(key);
    $tmp173 = plaintext.length;
    $tmp172 = $tmp173 / blockSize;
    blockCount = Math.ceil($tmp172);
    ciphertxt = new Array(blockCount);
    b = 0;
    $tmp175 = b < blockCount;
    for (; $tmp175;) {
        var c, $tmp188, $tmp190, cipherCntr, blockLength, $tmp274, $tmp275, cipherChar, i, $tmp192, $tmp174, $tmp175;
        c = 0;
        $tmp188 = c < 4;
        for (; $tmp188;) {
            var $tmp193, $tmp194, $tmp195, $tmp187, $tmp188;
            $tmp193 = 15 - c;
            $tmp195 = c * 8;
            $tmp194 = b >>> $tmp195;
            counterBlock[$tmp193] = $tmp194 & 255;
            $tmp187 = c++;
            $tmp188 = c < 4;
        }
        c = 0;
        $tmp190 = c < 4;
        for (; $tmp190;) {
            var $tmp196, $tmp197, $tmp198, $tmp199, $tmp189, $tmp190;
            $tmp197 = 15 - c;
            $tmp196 = $tmp197 - 4;
            $tmp198 = b / 4294967296;
            $tmp199 = c * 8;
            counterBlock[$tmp196] = $tmp198 >>> $tmp199;
            $tmp189 = c++;
            $tmp190 = c < 4;
        }
        cipherCntr = Aes.cipher(counterBlock, keySchedule);
        $tmp275 = blockCount - 1;
        $tmp274 = b < $tmp275;
        if ($tmp274) {
            blockLength = blockSize;
        } else {
            var $tmp276, $tmp277, $tmp278;
            $tmp278 = plaintext.length;
            $tmp277 = $tmp278 - 1;
            $tmp276 = $tmp277 % blockSize;
            blockLength = $tmp276 + 1;
        }
        cipherChar = new Array(blockLength);
        i = 0;
        $tmp192 = i < blockLength;
        for (; $tmp192;) {
            var $tmp200, $tmp201, $tmp202, $tmp203, $tmp204, $tmp191, $tmp192;
            $tmp200 = cipherCntr[i];
            $tmp203 = b * blockSize;
            $tmp202 = $tmp203 + i;
            $tmp201 = plaintext.charCodeAt($tmp202);
            cipherChar[i] = $tmp200 ^ $tmp201;
            $tmp204 = cipherChar[i];
            cipherChar[i] = String.fromCharCode($tmp204);
            $tmp191 = i++;
            $tmp192 = i < blockLength;
        }
        ciphertxt[b] = cipherChar.join('');
        $tmp174 = b++;
        $tmp175 = b < blockCount;
    }
    $tmp176 = ciphertxt.join('');
    ciphertext = ctrTxt + $tmp176;
    ciphertext = Aes.base64Encode(ciphertext);
    return ciphertext;
};
$tmp11 = Aes.Ctr;
$tmp11.decrypt = function (ciphertext, password, nBits) {
    var blockSize, $tmp205, $tmp206, $tmp207, $tmp208, $tmp209, $tmp210, $tmp211, $tmp212, nBytes, pwBytes, i, $tmp214, key, $tmp215, $tmp216, $tmp217, counterBlock, ctrTxt, $tmp219, keySchedule, nBlocks, $tmp220, $tmp221, $tmp222, ct, b, $tmp224, plaintxt, $tmp225, $tmp227, plaintext;
    blockSize = 16;
    $tmp208 = nBits == 128;
    $tmp209 = nBits == 192;
    $tmp207 = $tmp208 || $tmp209;
    $tmp210 = nBits == 256;
    $tmp206 = $tmp207 || $tmp210;
    $tmp205 = !$tmp206;
    if ($tmp205) {
        var $tmp228;
        $tmp228 = '';
        return $tmp228;
    } else {
    }
    $tmp211 = ciphertext + '';
    ciphertext = Aes.base64Decode($tmp211);
    $tmp212 = password + '';
    password = Aes.utf8Encode($tmp212);
    nBytes = nBits / 8;
    pwBytes = new Array(nBytes);
    i = 0;
    $tmp214 = i < nBytes;
    for (; $tmp214;) {
        var $tmp279, $tmp280, $tmp213, $tmp214;
        $tmp280 = password.charCodeAt(i);
        $tmp279 = isNaN($tmp280);
        if ($tmp279) {
            pwBytes[i] = 0;
        } else {
            pwBytes[i] = password.charCodeAt(i);
        }
        $tmp213 = i++;
        $tmp214 = i < nBytes;
    }
    $tmp215 = Aes.keyExpansion(pwBytes);
    key = Aes.cipher(pwBytes, $tmp215);
    $tmp217 = nBytes - 16;
    $tmp216 = key.slice(0, $tmp217);
    key = key.concat($tmp216);
    counterBlock = new Array(8);
    ctrTxt = ciphertext.slice(0, 8);
    i = 0;
    $tmp219 = i < 8;
    for (; $tmp219;) {
        counterBlock[i] = ctrTxt.charCodeAt(i);
        var $tmp218, $tmp219;
        $tmp218 = i++;
        $tmp219 = i < 8;
    }
    keySchedule = Aes.keyExpansion(key);
    $tmp222 = ciphertext.length;
    $tmp221 = $tmp222 - 8;
    $tmp220 = $tmp221 / blockSize;
    nBlocks = Math.ceil($tmp220);
    ct = new Array(nBlocks);
    b = 0;
    $tmp224 = b < nBlocks;
    for (; $tmp224;) {
        var $tmp229, $tmp230, $tmp231, $tmp232, $tmp233, $tmp223, $tmp224;
        $tmp230 = b * blockSize;
        $tmp229 = 8 + $tmp230;
        $tmp233 = b * blockSize;
        $tmp232 = 8 + $tmp233;
        $tmp231 = $tmp232 + blockSize;
        ct[b] = ciphertext.slice($tmp229, $tmp231);
        $tmp223 = b++;
        $tmp224 = b < nBlocks;
    }
    ciphertext = ct;
    $tmp225 = ciphertext.length;
    plaintxt = new Array($tmp225);
    b = 0;
    $tmp227 = b < nBlocks;
    for (; $tmp227;) {
        var c, $tmp235, $tmp237, cipherCntr, plaintxtByte, $tmp238, $tmp239, i, $tmp241, $tmp242, $tmp226, $tmp227;
        c = 0;
        $tmp235 = c < 4;
        for (; $tmp235;) {
            var $tmp243, $tmp244, $tmp245, $tmp234, $tmp235;
            $tmp243 = 15 - c;
            $tmp245 = c * 8;
            $tmp244 = b >>> $tmp245;
            counterBlock[$tmp243] = $tmp244 & 255;
            $tmp234 = c++;
            $tmp235 = c < 4;
        }
        c = 0;
        $tmp237 = c < 4;
        for (; $tmp237;) {
            var $tmp246, $tmp247, $tmp248, $tmp249, $tmp250, $tmp251, $tmp252, $tmp236, $tmp237;
            $tmp247 = 15 - c;
            $tmp246 = $tmp247 - 4;
            $tmp251 = b + 1;
            $tmp250 = $tmp251 / 4294967296;
            $tmp249 = $tmp250 - 1;
            $tmp252 = c * 8;
            $tmp248 = $tmp249 >>> $tmp252;
            counterBlock[$tmp246] = $tmp248 & 255;
            $tmp236 = c++;
            $tmp237 = c < 4;
        }
        cipherCntr = Aes.cipher(counterBlock, keySchedule);
        $tmp239 = ciphertext[b];
        $tmp238 = $tmp239.length;
        plaintxtByte = new Array($tmp238);
        i = 0;
        $tmp239 = ciphertext[b];
        $tmp242 = $tmp239.length;
        $tmp241 = i < $tmp242;
        for (; $tmp241;) {
            var $tmp253, $tmp254, $tmp239, $tmp255, $tmp240, $tmp241, $tmp256;
            $tmp253 = cipherCntr[i];
            $tmp239 = ciphertext[b];
            $tmp254 = $tmp239.charCodeAt(i);
            plaintxtByte[i] = $tmp253 ^ $tmp254;
            $tmp255 = plaintxtByte[i];
            plaintxtByte[i] = String.fromCharCode($tmp255);
            $tmp240 = i++;
            $tmp239 = ciphertext[b];
            $tmp256 = $tmp239.length;
            $tmp241 = i < $tmp256;
        }
        plaintxt[b] = plaintxtByte.join('');
        $tmp226 = b++;
        $tmp227 = b < nBlocks;
    }
    plaintext = plaintxt.join('');
    plaintext = Aes.utf8Decode(plaintext);
    return plaintext;
};
Aes.utf8Encode = function (str) {
    var $tmp257;
    $tmp257 = encodeURIComponent(str);
    return $tmp257;
};
Aes.utf8Decode = function (str) {
    try {
        var $tmp258;
        $tmp258 = decodeURIComponent(str);
        return $tmp258;
    } catch (e) {
        return str;
    }
    return;
};
Aes.base64Encode = function (str) {
    var $tmp259, $tmp260, $tmp261;
    $tmp260 = typeof Buffer;
    $tmp259 = $tmp260 != 'undefined';
    if ($tmp259) {
        var $tmp262;
        $tmp = new Buffer(str, 'utf8');
        $tmp262 = $tmp.toString('base64');
        return $tmp262;
    } else {
    }
    $tmp261 = new Error('No Base64 Encode');
    throw $tmp261;
    return;
};
Aes.base64Decode = function (str) {
    var $tmp263, $tmp264, $tmp265;
    $tmp264 = typeof Buffer;
    $tmp263 = $tmp264 != 'undefined';
    if ($tmp263) {
        var $tmp266;
        $tmp = new Buffer(str, 'base64');
        $tmp266 = $tmp.toString('utf8');
        return $tmp266;
    } else {
    }
    $tmp265 = new Error('No Base64 Decode');
    throw $tmp265;
    return;
};
$tmp11 = Aes.Ctr;
encr = $tmp11.encrypt('In this section we present the results of two experiments. The first experiment compares our modified JavaScript code that contains the information flow statements to the original code.', 'password', 256);
$tmp11 = Aes.Ctr;
decr = $tmp11.decrypt(encr, 'password', 256);
$tmp13 = 'encr output ==> ' + encr;
$tmp12 = console.log($tmp13);
$tmp15 = 'decr output ==> ' + decr;
$tmp14 = console.log($tmp15);