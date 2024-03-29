var $tmp0, $tmp1, $tmp2, $tmp3, $tmp4, $tmp5, x, $tmp7, $tmp8, $λ0, $tmp9, $tmp10, $tmp11, $tmp12, y;
$tmp0 = g();
$tmp0.z = 4;
$tmp1 = x.y;
$tmp1.z = g();
$tmp2 = g();
$tmp3 = k();
$tmp2.y = x[$tmp3];
$tmp4 = foo();
$tmp5 = ++i;
h = $tmp4[$tmp5];
function x() {
    var x, y, $tmp14, $tmp15;
    x = 0;
    y = 0;
    $tmp14 = x > y;
    for (; $tmp14;) {
        var $tmp16, $tmp17, $tmp13, $tmp14;
        $tmp16 = blah();
        $tmp17 = boo();
        $tmp13 = x++;
        $tmp14 = x > y;
    }
    $tmp15 = y();
    return $tmp15;
}
x = 0;
y = 0;
$tmp7 = x > y;
for (; $tmp7;) {
    ;
    var $tmp6, $tmp7;
    $tmp6 = x++;
    $tmp7 = x > y;
}
$tmp8 = {
    x: 'this is x',
    y: 'this is y'
};
with ($tmp8) {
    x;
}
$λ0 = function (x) {
};
$tmp9 = $λ0(5, 6, 7);
$tmp10 = f();
while ($tmp10) {
    ;
    var $tmp10;
    $tmp10 = f();
}
$tmp11 = h();
if ($tmp11) {
    with (obj) {
        var $tmp18;
        $tmp18 = g();
        do {
            var $tmp19, $tmp18;
            $tmp19 = k();
            $tmp18 = g();
        } while ($tmp18);
    }
} else {
}
$tmp12 = x < y;
for (; $tmp12;) {
    ;
    var $tmp12;
    $tmp12 = x < y;
}
y = g();
for (y in obj) {
    blah;
}