
var pass = cloakDeepak("temp1234",'h');

function foo(){};
// Throw "TypeError: pass (type undefined) has no properties"
// for the following line.
foo.prototype.i = pass.length;
print(new foo()['i']);
