
var pass = cloakDeepak("temp1234",'h');

function foo(pwd) {
	// Throw "TypeError: pwd (type undefined) has no properties"
	// for the following line.
	this.i = pwd.length;

	return 5;
}

print(new foo(pass)['i']);
