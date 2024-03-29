var pass = upg("temp1234");
var j=0;

function chkpassword(pwd) {
	for (; j < 16; j++)
		if (pwd.length == j)
		// Generated the following exception "write context <T> not below return context <>"
		// for the following line.
			return ;
}

chkpassword(pass)
lprint(j);
