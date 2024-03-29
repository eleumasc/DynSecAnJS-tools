
var pass = upg("temp1234");
var obj={};
obj['i'] = pass.length;

obj.foo = function() {
	lprint(this.i);
}

obj.foo();
