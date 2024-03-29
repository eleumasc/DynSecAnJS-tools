
var pass = "temp1234";

function foo(pwd) {
	var obj = {};
	obj.i = pwd.length;

	return obj;
}

console.log(new foo(pass)['i']);
