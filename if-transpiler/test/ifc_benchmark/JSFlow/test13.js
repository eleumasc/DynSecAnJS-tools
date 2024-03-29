
var pass = upg("temp1234");
var obj={};
obj['i'] = pass.length;

obj.foo = function() {
	// Failed to indicate that the object contains a high security level
	// property i.
	lprint(this);
}

obj.foo();
