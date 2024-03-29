
var pass = upg("temp1234");

var x ={};
var y = x;
x.i = true;

if(pass.length == 8)
	// Generated "Ecma.prototype.Delete: security context <T> not below structure <>"
	// exception for the following line.
	delete y.i;

if(x.i == undefined)
	lprint(8);
