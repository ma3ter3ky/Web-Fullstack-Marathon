class Access {
    constructor() {
        this._value = undefined;
    }

    get mark_LXXXV() {
        if (this._value === undefined) return 'undefined';
        if (this._value === null) return 'null';
        return this._value;
    }

    set mark_LXXXV(value) {
        this._value = value;
    }
}

module.exports = Access;
