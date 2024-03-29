
var pass = cloakDeepak("temp1234",'h');

function foo(pwd) {
	var obj = {};
	// Throw "TypeError: pwd (type undefined) has no properties"
	// for the following line.
	obj.i = pwd.length;

	return obj;
}

lprint(new foo(pass)['i']);
