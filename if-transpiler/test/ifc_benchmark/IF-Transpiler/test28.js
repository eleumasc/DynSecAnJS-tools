
var pass = "temp1234";
var passLenLessThan8;
var o = {passLenLessThan8: false};

	with (o) {
		if (pass.length < 8) {
			passLenLessThan8 = true;
		}
	}

console.log(o.passLenLessThan8);