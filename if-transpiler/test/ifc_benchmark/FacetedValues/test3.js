
var pass;
pass = cloakDeepak('temp1234','h');

chkpassword(pass);
function chkpassword(pwd) {
    for (var i=0; i < 1; i++) {
        logDeepakFacetedValue(pwd);
        print('pwd:'+ getView(pwd));
    }
}
