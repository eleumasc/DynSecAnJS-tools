var pass = "temp1234";

chkpassword(pass);

function chkpassword(pwd) {
	try {

		for (var j = 0; j < 16; j++) {
			if (pwd.length == j)
				throw j;
		}
	} catch (len) {
		console.log(len);
	}
}

