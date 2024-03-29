
var pass = upg("temp1234");

function foo(pwd) {
	this.i = pwd.length;
}

lprint(new foo(pass)['i']);
