
var pass = upg("temp1234");

function foo(pwd) {
	this.i = pwd.length;

	return 5;
}

lprint(new foo(pass)['i']);
