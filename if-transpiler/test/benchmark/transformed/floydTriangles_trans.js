function main() {
    var nMargin, $tmp2, $λ0, $tmp3;
    nMargin = 1;
    $λ0 = function (lstN) {
        var $tmp4, $tmp5;
        $tmp5 = function (nFloydRows) {
            var lstRows, iLast, $tmp6, $tmp7, $tmp8, $tmp9;
            lstRows = floydIntegerLists(nFloydRows);
            iLast = nFloydRows - 1;
            $tmp9 = lstRows[iLast];
            $tmp = $tmp9[iLast];
            $tmp = $tmp.toString();
            $tmp8 = $tmp.length;
            $tmp7 = $tmp8 + nMargin;
            $tmp6 = colsSpacedRight(lstRows, $tmp7);
            return $tmp6;
        };
        $tmp = lstN.map($tmp5);
        $tmp4 = $tmp.join('\n\n');
        return $tmp4;
    };
    $tmp3 = [
        5,
        14,
        21
    ];
    $tmp2 = $λ0($tmp3);
    return $tmp2;
}
function floydIntegerLists(nRows) {
    var $tmp10, triangleNumbers, $tmp11, $tmp12, $tmp13, $tmp14, $tmp15, $tmp16, $tmp17;
    triangleNumbers = function (lstInt, startWidth) {
        var n, $tmp18, $tmp37, $tmp38;
        n = startWidth || 1;
        $tmp38 = lstInt.length;
        $tmp37 = n > $tmp38;
        if ($tmp37) {
            $tmp18 = [];
        } else {
            var $tmp, $tmp39, $tmp40, $tmp41, $tmp42;
            $tmp39 = lstInt.slice(0, n);
            $tmp = [$tmp39];
            $tmp41 = lstInt.slice(n);
            $tmp42 = n + 1;
            $tmp40 = triangleNumbers($tmp41, $tmp42);
            $tmp18 = $tmp.concat($tmp40);
        }
        return $tmp18;
    };
    $tmp15 = nRows * nRows;
    $tmp14 = $tmp15 / 2;
    $tmp13 = Math.floor($tmp14);
    $tmp17 = nRows / 2;
    $tmp16 = Math.ceil($tmp17);
    $tmp12 = $tmp13 + $tmp16;
    $tmp11 = range(1, $tmp12);
    $tmp10 = triangleNumbers($tmp11);
    return $tmp10;
}
function colsSpacedRight(lstLines, nColWidth) {
    var $tmp19, $tmp20;
    $tmp20 = function (s, line) {
        var $tmp21, $tmp22, $tmp23, $tmp24;
        $tmp24 = function (n) {
            var $tmp25;
            $tmp25 = rightAligned(n, nColWidth);
            return $tmp25;
        };
        $tmp = line.map($tmp24);
        $tmp23 = $tmp.join('');
        $tmp22 = s + $tmp23;
        $tmp21 = $tmp22 + '\n';
        return $tmp21;
    };
    $tmp19 = lstLines.reduce($tmp20, '');
    return $tmp19;
}
function range(m, n) {
    var $tmp26, $tmp27, $tmp28, $tmp29, $tmp30;
    $tmp29 = n - m;
    $tmp28 = $tmp29 + 1;
    $tmp27 = Array($tmp28);
    $tmp = Array.apply(null, $tmp27);
    $tmp30 = function (x, i) {
        var $tmp31;
        $tmp31 = m + i;
        return $tmp31;
    };
    $tmp26 = $tmp.map($tmp30);
    return $tmp26;
}
function rightAligned(n, width) {
    var strN, $tmp32, $tmp33, $tmp34, $tmp35, $tmp36;
    strN = n.toString();
    $tmp36 = strN.length;
    $tmp35 = width - $tmp36;
    $tmp34 = $tmp35 + 1;
    $tmp = Array($tmp34);
    $tmp33 = $tmp.join(' ');
    $tmp32 = $tmp33 + strN;
    return $tmp32;
}
var $tmp0, $tmp1;
$tmp1 = main();
$tmp0 = console.log($tmp1);