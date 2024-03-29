\\ Success

var pass = cloakDeepak("temp1234",'h');
chkpassword(pass);

function chkpassword(pwd) {

	var array = [];

// Throw exception at the following line:
// TypeError: pwd (type undefined) has no properties
	array[pwd.length] = true;

	for(var j in array)
		if(array[j])
			print(j);

}
