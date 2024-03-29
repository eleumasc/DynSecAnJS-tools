var pass = upg("temp1234");


function foo(pwd) {
    if(pwd.length >= 9) {
        lengthIsEqualOrGreaterThan9();
        return;
    }

    lengthIsLessThan9();
}

function lengthIsLessThan9() {
    lprint("Length is less than 9");
}

function lengthIsEqualOrGreaterThan9() {
    lprint("length is equal or greater than 9");
}
// JSFlow failed to indicate that the string printed by lengthIsLessThan9() is private
foo(pass);
