function copyObj(obj) {
    let cpy = {};
    for (let key in obj) {
        cpy[key] = obj[key];
    }
    return cpy;
}