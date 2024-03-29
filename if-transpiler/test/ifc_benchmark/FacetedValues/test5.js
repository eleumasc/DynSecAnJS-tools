// Success
var pass;
pass = cloakDeepak('temp1234','h');

chkpassword(pass);
function chkpassword(pwd) {
    var i;
    for (i in pwd) {
        // Generated runtime TypeError: pwd (type undefined) has no properties
        print(getView(pwd[i]));
    }
}
