
var pass = upg("temp1234");

function foo(pwd) {
	var obj = {};
	obj.i = pwd.length;

	return obj;
}

lprint(new foo(pass)['i']);
