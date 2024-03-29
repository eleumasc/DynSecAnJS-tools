
var pass = "temp1234";

var pwdLengthGreaterThan10 = true;

function foo(pwd) {

	if(true) {
		if (true) {
			if (pwd.length > 10)
				return;

		}
		pwdLengthGreaterThan10 = false;
	}
}

foo(pass);

console.log(pwdLengthGreaterThan10);
