var pass = cloakDeepak("temp1234",'h');


function foo(pwd) {
    // Throw "TypeError: pwd (type undefined) has no properties"
    // for the following line.
    if(pwd.length >= 9) {
        lengthIsEqualOrGreaterThan9();
        return;
    }

    lengthIsLessThan9();
}

function lengthIsLessThan9() {
    print("Length is less than 9");
}

function lengthIsEqualOrGreaterThan9() {
    print("length is equal or greater than 9");
}

foo(pass);
