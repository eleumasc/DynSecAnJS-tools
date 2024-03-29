var pass = cloakDeepak("temp1234",'h');
var j=0;

function chkpassword(pwd) {
	for (; j < 16; j++)
	// Throw "TypeError: pwd (type undefined) has no properties"
	// for the following line.
		if (pwd.length == j)
			return ;
}

chkpassword(pass)
print(j);
