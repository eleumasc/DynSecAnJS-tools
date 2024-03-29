
var pass = "temp1234";

function foo(pwd) {
	this.i = pwd.length;
}

console.log(new foo(pass)['i']);
