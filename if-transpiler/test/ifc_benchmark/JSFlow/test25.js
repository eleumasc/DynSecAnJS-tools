var pass = upg("temp1234");

var len = 8;

function foo(pwd) {
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
//JSFlow failed to indicate that len is private now
lprint(len);
