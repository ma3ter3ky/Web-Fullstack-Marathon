function concat(str1, str2) {
    if (typeof str2 === "string") {
        return str1 + " " + str2;
    }

    func.count = 0;

    function func() {
        const str2 = prompt("Enter second string:") || "";
        func.count++;
        if (str2 === "") return str1;
        return str1 + " " + str2;

    }
    return func;
}
