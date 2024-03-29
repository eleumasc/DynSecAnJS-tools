var pass = upg("temp1234");

chkpassword(pass);

function chkpassword(pwd) {
	try {

		for (var j = 0; j < 16; j++) {
			if (pwd.length == j)
			// Generated "exception in <T> not allowed with exception label <>"
			// for the following line.
				throw j;
		}
	} catch (len) {
		lprint(len);
	}
}
