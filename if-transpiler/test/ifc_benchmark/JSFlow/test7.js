var pass = upg("temp1234");

chkpassword(pass);

function chkpassword(pwd) {

	for(var j=0;j<16;j++)
		if(pwd.length == j)
		// Throw "write context <T> not below label context <>"
		// for the following line.
			break;

	lprint(j);

}
