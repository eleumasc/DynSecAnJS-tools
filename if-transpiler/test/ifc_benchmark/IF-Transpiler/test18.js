
var pass = "temp1234";

var i;
function bar(pwd) {
	function foo(pwd) {
		var i;
		this.i = pwd.length;

		return 5;
	}

	foo(pwd);
}

bar(pass);

print(i);
