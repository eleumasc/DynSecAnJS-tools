
var pass = upg("temp1234");

var pwdLengthGreaterThan10 = true;

function foo(pwd) {

	if(true) {
		if (true) {
			if (pwd.length > 10)
				return;

		}
		// JSFlow Failed to detect un-taken branch
		pwdLengthGreaterThan10 = false;
	}
}

foo(pass);

lprint(pwdLengthGreaterThan10);
