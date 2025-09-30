const { LLData } = require("./LLData");

class LList {
    constructor() {
        this.head = null;
    }

    getFirst() {
        return this.head;
    }

    getLast() {
        if (this.head === null) {
            return null;
        }

        let current = this.head;
        while (current.next !== null) {
            current = current.next;
        }
        return current;
    }

    add(value) {
        const newNode = new LLData(value);

        if (this.head === null) {
            this.head = newNode;
        } else {
            const last = this.getLast();
            last.next = newNode;
        }
    }

    addFromArray(arrayOfData) {
        for (const data of arrayOfData) {
            this.add(data);
        }
    }

    remove(value) {
        if (this.head === null) {
            return false;
        }

        if (this.head.data === value) {
            this.head = this.head.next;
            return true;
        }

        let current = this.head;
        while (current.next !== null) {
            if (current.next.data === value) {
                current.next = current.next.next;
                return true;
            }
            current = current.next;
        }
        return false;
    }

    removeAll(value) {
        while (this.head !== null && this.head.data === value) {
            this.head = this.head.next;
        }

        let current = this.head;
        while (current !== null && current.next !== null) {
            if (current.next.data === value) {
                current.next = current.next.next;
            } else {
                current = current.next;
            }
        }
    }

    contains(value) {
        let current = this.head;
        while (current !== null) {
            if (current.data === value) {
                return true;
            }
            current = current.next;
        }
        return false;
    }

    clear() {
        this.head = null;
    }

    count() {
        let count = 0;
        let current = this.head;
        while (current !== null) {
            count++;
            current = current.next;
        }
        return count;
    }

    toString() {
        let current = this.head;
        let result = [];
        while (current !== null) {
            result.push(current.data);
            current = current.next;
        }
        return result.join(', ');
    }

    filter(callback) {
        const filteredList = new LList();
        for (const data of this) {
            if (callback(data)) {
                filteredList.add(data);
            }
        }
        return filteredList;
    }

    [Symbol.iterator]() {
        let current = this.head;

        return {
            next: function () {
                if (current === null) {
                    return { done: true };
                } else {
                    const value = current.data;
                    current = current.next;
                    return { value: value, done: false };
                }
            }
        };
    }
    getIterator() {
        return this[Symbol.iterator]();
    }
}

module.exports = { LList };