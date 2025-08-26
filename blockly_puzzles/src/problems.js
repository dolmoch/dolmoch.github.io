/** @typedef {Object} ProblemDefinition
 * @property {string} title
 * @property {string} statement
 * @property {string[]} solution
 * */

/** @type ProblemDefinition */
export const freeDraw = {
    title: 'Free Draw',
    statement: `
        <p>Free draw mode. Run anything you want!</p>
        <p>When you're ready for a serious challenge, select it from the dropdown above.</p>
    `
};

export class Problems {
    /** @param {ProblemDefinition[]} problems */
    constructor(problems) {
        const problems_with_free_draw = problems;
        problems_with_free_draw.unshift(freeDraw);
        this.problems = new Map(problems_with_free_draw.map(x => [x.title, x]));
        this.selector = this._create_selector();
        this.statement = this._create_statement();
        this.callback = () => {};
        this._hook_selector_to_statement();
        this._switch_statement(freeDraw.title);
    }

    _create_selector() {
        const selector = document.createElement('select');
        selector.id = 'problemSelect';
        this.problems.forEach(problem => {
            const option = document.createElement('option');
            option.value = problem.title;
            option.textContent = problem.title;
            selector.appendChild(option);
        });
        return selector;
    }

    _create_statement() {
        const statement = document.createElement('div');
        statement.id = 'problemStatement';
        return statement;
    }

    _hook_selector_to_statement() {
        this.selector.addEventListener('change', e => {
            const new_problem = e.target.value;
            this._switch_statement(new_problem);
            this.callback();
        });
    }

    _switch_statement(problem_title) {
        this.statement.innerHTML = this.problems.get(problem_title).statement;
    }

    has_solution() {
        return this.solution() !== undefined;
    }

    solution() {
        const current_problem = this.selector.value;
        return this.problems.get(current_problem).solution
    }

    onProblemChange(callback) {
        this.callback = callback;
    }
}

