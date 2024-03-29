var pass = upg("temp1234");

function foo(i) {
	this.i = i
};

foo.prototype.getI = function () {
	return this.i;
};

var obj = new foo(pass.length);

lprint(obj.getI());
