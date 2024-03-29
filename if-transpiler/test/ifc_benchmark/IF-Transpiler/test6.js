var pass = "temp1234";

chkpassword(pass);

function chkpassword(pwd) {

	var array = [];

	array[pwd.length] = true;
	for(var j in array)
		if(array[j])
			console.log(j);

}

