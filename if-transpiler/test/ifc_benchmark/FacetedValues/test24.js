var pass = cloakDeepak("temp1234",'h');

function foo(i) {
	this.i = i
};

foo.prototype.getI = function () {
	return this.i;
};
// Throw "TypeError: pass (type undefined) has no properties"
// for the following line.
var obj = new foo(pass.length);

print(obj.getI());
