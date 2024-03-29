
var pass = "temp1234";

var x ={};
var y = x;
x.i = true;

if(pass.length == 8)
	delete y.i;

if(x.i == undefined)
	console.log(8);