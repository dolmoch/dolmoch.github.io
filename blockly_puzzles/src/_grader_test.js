import {assert} from '@esm-bundle/chai';
import {Grader} from "./grader";

describe('grader', () => {
    function create_grader() {
        const terminal = document.createElement('pre');
        const grader = new Grader(terminal);
        return {terminal, grader};
    }

    it('clears the terminal', () => {
        const {terminal, grader} = create_grader();
        terminal.innerHTML = 'text';
        grader.validate([], []);
        assert.strictEqual(terminal.innerHTML, '');
        terminal.innerHTML = 'text';
        grader.log_clear();
        assert.strictEqual(terminal.innerHTML, '');
    });

    function assertElement(element, tagName, className, textContent) {
        assert.strictEqual(element.tagName, tagName);
        assert.strictEqual(element.className, className);
        assert.strictEqual(element.textContent, textContent);
    }

    it('creates neutral lines when actual log matches expected', () => {
        const {terminal, grader} = create_grader();
        const result = grader.validate(['hello', 'world'], ['hello', 'world']);
        assert.strictEqual(result, true);
        assert.strictEqual(terminal.children.length, 2);
        assertElement(terminal.children.item(0), 'SPAN', 'neutral', 'hello\n');
        assertElement(terminal.children.item(1), 'SPAN', 'neutral', 'world\n');
    });

    it('creates diff lines when actual log does not match expected', () => {
        const {terminal, grader} = create_grader();
        const result = grader.validate(['wrong'], ['hello']);
        assert.strictEqual(result, false);
        assert.strictEqual(terminal.children.length, 2);
        assertElement(terminal.children.item(0), 'SPAN', 'negative', 'wrong\n');
        assertElement(terminal.children.item(1), 'SPAN', 'positive', 'hello\n');
    });

    it('creates diff lines for extraneous lines in actual log', () => {
        const {terminal, grader} = create_grader();
        const result = grader.validate(['wrong'], []);
        assert.strictEqual(result, false);
        assert.strictEqual(terminal.children.length, 2);
        assertElement(terminal.children.item(0), 'SPAN', 'negative', 'wrong\n');
        assertElement(terminal.children.item(1), 'SPAN', 'positive', '\n');
    });

    it('creates diff lines for missing lines in actual log', () => {
        const {terminal, grader} = create_grader();
        const result = grader.validate([], ['hello']);
        assert.strictEqual(result, false);
        assert.strictEqual(terminal.children.length, 2);
        assertElement(terminal.children.item(0), 'SPAN', 'negative', '\n');
        assertElement(terminal.children.item(1), 'SPAN', 'positive', 'hello\n');
    });

    it('shows only the first mismatch as error', () => {
        const {terminal, grader} = create_grader();
        const result = grader.validate(['wrong', 'extra line'], ['hello']);
        assert.strictEqual(result, false);
        assert.strictEqual(terminal.children.length, 3);
        assertElement(terminal.children.item(0), 'SPAN', 'negative', 'wrong\n');
        assertElement(terminal.children.item(1), 'SPAN', 'positive', 'hello\n');
        assertElement(terminal.children.item(2), 'SPAN', 'neutral', 'extra line\n');
    });


});
