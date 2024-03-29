
var pass = "temp1234";
var obj={};
obj['i'] = pass.length;

obj.foo = function() {
	console.log(this);
}

obj.foo();
