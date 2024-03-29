
/*
 * @b_sayed:Important Note: this file must be executed using v8
 * (or any other standard JavaScript engine) but not NodeJS.
 * NodeJS implements the semantics of 'this' for the global scope differently.
 * */

var pass = cloakDeepak("temp1234",'h');
var j=0;

function chkpassword(pwd) {
	var j;
	print('chkpassword')
	for (this.j=0; this.j < 16; this.j++)
	// Throw "TypeError: pwd (type undefined) has no properties"
	// for the following line.
		if (pwd.length == this.j)
			return ;
}

print('before function')
chkpassword(pass);
print('after function')
print(j);
