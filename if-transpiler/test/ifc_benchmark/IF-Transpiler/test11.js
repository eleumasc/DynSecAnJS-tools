var pass = "temp1234";
var j=0;

function chkpassword(pwd) {
	for (; j < 16; j++)
		if (pwd.length == j)
			return ;
}

chkpassword(pass)
console.log(j);
