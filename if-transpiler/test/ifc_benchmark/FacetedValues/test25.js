var pass = cloakDeepak("temp1234",'h');

var len = 8;

function foo(pwd) {
    // Throw "TypeError: pass (type undefined) has no properties"
    // for the following line.
    if(pwd.length == 9){
        len=9;
        return;
    }

    if(pwd.length == 10){
        len=10;
        return;
    }

    if(pwd.length == 11){
        len=11;
        return;
    }

    if(pwd.length == 12){
        len=12;
        return;
    }
}

foo(pass);
print(len);
