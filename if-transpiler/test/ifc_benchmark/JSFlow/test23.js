
var pass = upg("temp1234");

function foo(){};
foo.prototype.i = pass.length;
lprint(new foo()['i']);
