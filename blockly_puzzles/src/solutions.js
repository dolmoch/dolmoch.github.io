
export class Solutions {

    constructor(length) {
        this.length = length;
    }

    fizzbuzz() {
        return Array.from({length: this.length}, (_, n) => {
            const i = n + 1;
            return i % 15 === 0 ? 'FizzBuzz' : i % 3 === 0 ? 'Fizz' : i % 5 === 0 ? 'Buzz' : i.toString();
        });
    }

    hello() {
        return Array.from({length: this.length}, () => "Hello World!");
    }

    binary_count() {
        const r = [];
        const fn = (prefix, len) => {
            if (len === 0) {
                r.push(prefix);
            } else {
                fn(prefix + '0', len - 1);
                fn(prefix + '1', len - 1);
            }
        }
        fn('', this.length);
        return r;
    }
}