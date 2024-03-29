
var pass = cloakDeepak("temp1234",'h');
var passLenLessThan8;
var o = {passLenLessThan8: false};

	with (o) {
		if (pass.length < 8) {
			passLenLessThan8 = true;
		}
	}

print(o.passLenLessThan8);