
var pass = cloakDeepak("temp1234",'h');

var x ={};
var y = x;
// Throw "TypeError: pass (type undefined) has no properties"
// for the following line.
x.i = pass.length;

print(y.i);
