
var pass = "temp1234";

function foo(){};
foo.prototype.i = pass.length;
console.log(new foo()['i']);