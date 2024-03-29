
var pass;
pass = 'temp1234';

chkpassword(pass);
function chkpassword(pwd) {
    var i;
    for (i in pwd) {
        console.log(pwd[i]);
    }
}