var pass = "temp1234";

chkpassword(pass);

function chkpassword(pwd) {

	for(var j=0;j<16;j++)
		if(pwd.length == j)
			break;

	console.log(j);

}

