var pass = "temp1234";

if (pass.length == 8) {
	function foo() {
		console.log("foo() 8");
	}

	bar();
} else {
	function bar() {
		console.log(" bar() 8");
	}

	foo();
}

