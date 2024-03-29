
var pass = cloakDeepak("temp1234",'h');

function foo(pwd) {
	// Throw "TypeError: pwd (type undefined) has no properties"
	// for the following line.
	this.i = pwd.length;
}

lprint(new foo(pass)['i']);
