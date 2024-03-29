var pass = "temp1234";


function chkpassword(pwd) {
	for (var j = 0; j < 16; j++)
		if (pwd.length == j)
			return j;
}

console.log(chkpassword(pass));
