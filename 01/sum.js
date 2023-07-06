function sum(number) {
    let result = 0;

    function innerFunction(number) {
        if (typeof number === 'undefined') {
            return result;
        }

        result += number;

        return innerFunction;
    }

    if (!result) {
        result = number;
    }

    return innerFunction;
}
