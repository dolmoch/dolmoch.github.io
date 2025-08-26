import {assert} from "@esm-bundle/chai";
import {Solutions} from "./solutions";

describe("Solutions", () => {
    it('has correct fizzbuzz', function() {
       const fizz = new Solutions(100).fizzbuzz();
       assert.strictEqual(100, fizz.length);
       assert.deepEqual(['1', '2', 'Fizz', '4', 'Buzz', 'Fizz', '7', '8', 'Fizz',
           'Buzz', '11', 'Fizz', '13', '14', 'FizzBuzz', '16'], fizz.slice(0, 16));
    });

    it('has correct hello', function() {
       const hello = new Solutions(100).hello();
       const expected = Array.from({ length: 100 }).fill('Hello World!');
       assert.deepEqual(hello, expected);
    });

    it('has correct binary counts', function() {
        const count = new Solutions(3).binary_count();
        const expected = ['000', '001', '010', '011', '100', '101', '110', '111'];
        assert.deepEqual(count, expected);
    });

});