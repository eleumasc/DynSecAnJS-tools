var pass = cloakDeepak("temp1234",'h');

chkpassword(pass);

function chkpassword(pwd) {

	for(var j=0;j<16;j++)
		// Throw "TypeError: pwd (type undefined) has no properties"
		// for the following line.
		if(pwd.length == j)
			break;

	print(j);
}
