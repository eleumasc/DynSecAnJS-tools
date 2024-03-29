var pass = "temp1234";


function foo(pwd) {
	if(pwd.length >= 9) {
		lengthIsEqualOrGreaterThan9();
		return;
	}

	lengthIsLessThan9();
}

function lengthIsLessThan9() {
	console.log("Length is less than 9");
}

function lengthIsEqualOrGreaterThan9() {
	console.log("length is equal or greater than 9");
}

foo(pass);
