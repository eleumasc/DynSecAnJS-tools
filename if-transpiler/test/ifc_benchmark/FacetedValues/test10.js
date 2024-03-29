var pass = cloakDeepak("temp1234",'h');


function chkpassword(pwd) {
	for (var j = 0; j < 16; j++)
	// Throw "TypeError: pwd (type undefined) has no properties"
	// for the following line.
		if (pwd.length == j)
			return j;
}

print(chkpassword(pass));
