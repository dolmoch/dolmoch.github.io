import {assert} from "@esm-bundle/chai";
import {freeDraw, Problems} from "./problems";
import {Solutions} from "./solutions";

function map_children(selector, map_function) {
    return Array.prototype.slice.call(selector.children).map(map_function);
}

/** @type {ProblemDefinition[]} */
const testing_problems = [
    {title: 'Problem 1', statement: 'Problem 1 statement'},
    {title: 'Problem 2', statement: 'Problem 2 statement'},
];

describe('Problems', () => {
    it('creates the problem selector', () => {
        const problems = new Problems(testing_problems);
        assert.strictEqual(problems.selector.tagName, 'SELECT');
        assert.strictEqual(problems.selector.id, 'problemSelect');
        assert.deepEqual(map_children(problems.selector, x => x.tagName),
            ['OPTION', 'OPTION', 'OPTION']);
        assert.deepEqual(map_children(problems.selector, x => x.value),
            [freeDraw.title, 'Problem 1', 'Problem 2']);
        assert.deepEqual(map_children(problems.selector, x => x.textContent),
            [freeDraw.title, 'Problem 1', 'Problem 2']);
    });

    it('creates problem statement', () => {
        const problems = new Problems([]);
        assert.strictEqual(problems.statement.tagName, 'DIV');
        assert.strictEqual(problems.statement.id, 'problemStatement');
    });

    it('hooks statement to selector', () => {
        const problems = new Problems(testing_problems);
        problems.selector.value = 'Problem 1';
        problems.selector.dispatchEvent(new Event('change'));
        assert.strictEqual(problems.statement.innerHTML, 'Problem 1 statement');
    });

    it('calls you back when problem is changed', () => {
        const problems = new Problems(testing_problems);
        var changed = false;
        problems.onProblemChange(() => { changed = true; });
        problems.selector.dispatchEvent(new Event('change'));
        assert.strictEqual(changed, true);
    });

    it('default is free draw', () => {
        const problems = new Problems(testing_problems);
        assert.strictEqual(problems.selector.selectedIndex, 0);
        assert.strictEqual(problems.statement.innerHTML, freeDraw.statement);
    });

    it('can tell if solution exists', () => {
        const problems = new Problems([]);
        assert.strictEqual(problems.has_solution(), false);
    });

    it('provides solution when it exists', () => {
        const solutions = new Solutions(100);
        /** @type {ProblemDefinition} */
        const problem = {title: 'FizzBuzz', statement: 'IRRELEVANT', solution: solutions.fizzbuzz()};
        const problems = new Problems([problem]);
        problems.selector.value = 'FizzBuzz';
        assert.strictEqual(problems.has_solution(), true);
        assert.deepEqual(problems.solution(), solutions.fizzbuzz());
    });
});
