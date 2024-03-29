var pass = upg("temp1234");

var obj = [];

function foo(pwd) {
    if(pwd.length >= 9) {
        obj.pwdLength = 10;
        return;
    }

    obj.pwdLength = 8;
}

foo(pass);

//JSFlow failed to indicate that obj.pwdLength contains a private information
lprint(obj.pwdLength);
