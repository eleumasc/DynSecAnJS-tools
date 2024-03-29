
var pass = cloakDeepak("temp1234",'h');

var x ={};
var y = x;
x.i = true;

// Throw "TypeError: pass (type undefined) has no properties"
// for the following line.
if(pass.length == 8)
	delete y.i;

if(x.i == undefined)
	lprint(8);
