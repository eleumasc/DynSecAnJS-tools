var LZW, comp, decomp, $tmp0, $tmp1;
LZW = {};
LZW.decompress = function (compressed) {
    "use strict";
    var i, dictionary, w, result, k, entry, dictSize, $tmp2, $tmp4, $tmp5, $tmp6, $tmp8, $tmp9;
    dictionary = [];
    entry = '';
    dictSize = 256;
    i = 0;
    $tmp2 = i;
    $tmp4 = i < 256;
    for (; $tmp4;) {
        dictionary[i] = String.fromCharCode(i);
        var $tmp3, $tmp4;
        i += 1;
        $tmp3 = i;
        $tmp4 = i < 256;
    }
    $tmp5 = compressed[0];
    w = String.fromCharCode($tmp5);
    result = w;
    i = 1;
    $tmp6 = i;
    $tmp9 = compressed.length;
    $tmp8 = i < $tmp9;
    for (; $tmp8;) {
        k = compressed[i];
        var $tmp10, $tmp11, $tmp12, $tmp7, $tmp8, $tmp13;
        $tmp10 = dictionary[k];
        if ($tmp10) {
            entry = dictionary[k];
        } else {
            var $tmp14;
            $tmp14 = k === dictSize;
            if ($tmp14) {
                var $tmp15;
                $tmp15 = w.charAt(0);
                entry = w + $tmp15;
            } else {
                var $tmp16;
                $tmp16 = null;
                return $tmp16;
            }
        }
        result += entry;
        $tmp11 = dictSize++;
        $tmp12 = entry.charAt(0);
        dictionary[$tmp11] = w + $tmp12;
        w = entry;
        i += 1;
        $tmp7 = i;
        $tmp13 = compressed.length;
        $tmp8 = i < $tmp13;
    }
    return result;
};
LZW.compress = function (uncompressed) {
    "use strict";
    var i, dictionary, c, wc, w, result, dictSize, $tmp17, $tmp19, $tmp20, $tmp22, $tmp23, $tmp24;
    dictionary = {};
    w = '';
    result = [];
    dictSize = 256;
    i = 0;
    $tmp17 = i;
    $tmp19 = i < 256;
    for (; $tmp19;) {
        var $tmp25, $tmp18, $tmp19;
        $tmp25 = String.fromCharCode(i);
        dictionary[$tmp25] = i;
        i += 1;
        $tmp18 = i;
        $tmp19 = i < 256;
    }
    i = 0;
    $tmp20 = i;
    $tmp23 = uncompressed.length;
    $tmp22 = i < $tmp23;
    for (; $tmp22;) {
        c = uncompressed.charAt(i);
        wc = w + c;
        var $tmp26, $tmp21, $tmp22, $tmp27;
        $tmp26 = dictionary.hasOwnProperty(wc);
        if ($tmp26) {
            w = wc;
        } else {
            var $tmp28, $tmp29;
            $tmp29 = dictionary[w];
            $tmp28 = result.push($tmp29);
            dictionary[wc] = dictSize++;
            w = String(c);
        }
        i += 1;
        $tmp21 = i;
        $tmp27 = uncompressed.length;
        $tmp22 = i < $tmp27;
    }
    $tmp24 = w !== '';
    if ($tmp24) {
        var $tmp30, $tmp31;
        $tmp31 = dictionary[w];
        $tmp30 = result.push($tmp31);
    } else {
    }
    return result;
};
comp = LZW.compress('The quick brown fox jumps over the lazy dogThe quick brown fox jumps over the lazy dogThe quick brown fox jumps over the lazy dogThe quick brown fox jumps over the lazy dog');
decomp = LZW.decompress(comp);
$tmp0 = console.log(comp);
$tmp1 = console.log(decomp);