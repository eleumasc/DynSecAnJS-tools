
var pass = cloakDeepak("temp1234",'h');

var i;
function bar(pwd) {
	function foo(pwd) {
		var i;
		// Throw "TypeError: pwd (type undefined) has no properties"
		// for the following line.
		this.i = pwd.length;

		return 5;
	}

	foo(pwd);
}

bar(pass);

print(i);
