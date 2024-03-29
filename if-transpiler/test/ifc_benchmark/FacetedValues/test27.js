var pass = cloakDeepak("temp1234",'h');

var obj = [];

function foo(pwd) {
    // Throw "TypeError: pwd (type undefined) has no properties"
    // for the following line. 
    if(pwd.length >= 9) {
        obj.pwdLength = 10;
        return;
    }

    obj.pwdLength = 8;
}

foo(pass);

print(obj.pwdLength);
