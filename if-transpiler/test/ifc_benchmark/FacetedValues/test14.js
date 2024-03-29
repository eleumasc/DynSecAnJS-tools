
var pass = cloakDeepak("temp1234",'h');
var obj={};
// Throw "TypeError: pass (type undefined) has no properties"
// for the following line.
obj['i'] = pass.length;

obj.foo = function() {
	print(this.i);
}

obj.foo();
