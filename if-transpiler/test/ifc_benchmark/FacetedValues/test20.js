
var pass = cloakDeepak("temp1234",'h');

var pwdLengthGreaterThan10 = true;

function foo(pwd) {

	if(true) {
		if (true) {
			// Throw "TypeError: pwd (type undefined) has no properties"
			// for the following line.
			if (pwd.length > 10)
				return;
		}
		pwdLengthGreaterThan10 = false;
	}
}

foo(pass);

print(pwdLengthGreaterThan10);
