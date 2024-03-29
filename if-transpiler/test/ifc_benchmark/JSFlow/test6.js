var pass = upg("temp1234");


chkpassword(pass);

function chkpassword(pwd) {

	var array = [];

// Throw exception at the following line:
// Array.prototype.DefineOwnProperty: write context {{wc}} not below length label {{ll}}
	array[pwd.length] = true;

	for(var j in array)
		if(array[j])
			lprint(j);

}
