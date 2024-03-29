
/*
 * @b_sayed:Important Note: this file must be executed using v8
 * (or any other standard JavaScript engine) but not NodeJS.
 * NodeJS implements the semantics of 'this' for the global scope differently.
 * */

var pass = upg("temp1234");
var j=0;

function chkpassword(pwd) {
	var j;
	print('chkpassword')
	for (this.j=0; this.j < 16; this.j++)
		if (pwd.length == this.j)
		// Generated "write context <T> not below return context <>"
		// for the following line.
			return ;
}

print('before function')
chkpassword(pass);
print('after function')
lprint(j);
