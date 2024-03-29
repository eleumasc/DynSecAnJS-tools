var pass = upg("temp1234");


function chkpassword(pwd) {
	for (var j = 0; j < 16; j++)
		if (pwd.length == j)
		// Generated "write context <T> not below return context <>"
		// for the following line.
			return j;
}

lprint(chkpassword(pass));
