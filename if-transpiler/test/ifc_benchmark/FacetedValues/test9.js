var pass = cloakDeepak("temp1234",'h');

chkpassword(pass);

function chkpassword(pwd) {
	try {

		for (var j = 0; j < 16; j++) {
			// Throw "TypeError: pwd (type undefined) has no properties"
			// for the following line.
			if (pwd.length == j)
				throw j;
		}
	} catch (len) {
		print(len);
	}
}
