var pass = upg("temp1234");

chkpassword(pass);

function chkpassword(pwd) {

	var array = [];
	for(var i=0;i < 16; i++)
		array[i] = true;

	for(var j=0;j<16;j++) {
		if (pwd.length == j)
		// Generated "write context <T> not below label context <>"
		// for the following line.
			continue;
		array[j] = false;
	}

	for(var k=0;k<16;k++)
		if(array[k])
			lprint(k);

}
