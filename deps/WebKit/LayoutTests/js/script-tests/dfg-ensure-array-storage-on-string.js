description(
"Checks that trying to arrayify a string to have array storage doesn't crash."
);

function foo(array) {
    var result = 0;
    for (var i = 0; i < array.length; ++i)
        result += array[i];
    return result;
}

noInline(foo);

var array = [1, 2, 3];
while (!dfgCompiled({f:foo}))
    foo(array);

array = [1, , 3];
array.__defineGetter__(1, function() { return 6; });

while (!dfgCompiled({f:foo, compiles:2}))
    foo(array);

shouldBe("foo(\"hello\")", "\"0hello\"");
