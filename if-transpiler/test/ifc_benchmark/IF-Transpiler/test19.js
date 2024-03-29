
var pass = "temp1234";

function foo(pwd) {
	this.i = pwd.length;

	return 5;
}

console.log(new foo(pass)['i']);
