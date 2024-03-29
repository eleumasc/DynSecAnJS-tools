var pass = "temp1234";

var obj = [];

function foo(pwd) {
	if(pwd.length >= 9) {
		obj.pwdLength = 10;
		return;
	}

	obj.pwdLength = 8;
}

foo(pass);

console.log(obj.pwdLength);