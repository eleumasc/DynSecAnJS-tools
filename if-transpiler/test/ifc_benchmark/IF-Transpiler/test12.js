
/*
 * @b_sayed:Important Note: this file must be executed using v8
 * (or any other standard JavaScript engine) but not NodeJS.
 * NodeJS implements the semantics of 'this' for the global scope differently.
 * */

var pass = "temp1234";
var j=0;

function chkpassword(pwd) {
	var j;
	for (this.j=0; this.j < 16; this.j++)
		if (pwd.length == this.j)
			return ;
}

chkpassword(pass);
print(j);
