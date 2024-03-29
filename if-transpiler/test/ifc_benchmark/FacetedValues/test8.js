var pass = cloakDeepak("temp1234",'h');

chkpassword(pass);

function chkpassword(pwd) {

	var array = [];
	for(var i=0;i < 16; i++)
		array[i] = true;

	for(var j=0;j<16;j++) {
		// Throw "TypeError: pwd (type undefined) has no properties"
		// for the following line.
		if (pwd.length == j)
			continue;
		array[j] = false;
	}

	for(var k=0;k<16;k++)
		if(array[k])
			print(k);

}
