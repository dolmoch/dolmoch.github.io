import {Grader} from './grader.js';
import {Solutions} from './solutions.js';
import {ScreenSetup} from './screen_setup.js';
import {Win} from './win.js';
import {Problems} from './problems.js';

export async function main() {
    const win = new Win(document.getElementById('win-show'));
    /** @type {ProblemDefinition[]} */
    const problem_definitions = [
        {title: 'Hello World', statement: `
                <p>Write the string "Hello World!" <math><mn>100</mn></math> times, one time on each line.</p>
                <details>
                    <summary>Hints</summary>
                    <p>Put the print block inside a loop block to avoid repetition.</p>
                </details>
            `, solution: new Solutions(100).hello()},
        {title: 'FizzBuzz', statement: `
                <p>Write the first <math><mn>100</mn></math> FizzBuzz numbers, one number per line.</p>
                <p>A FizzBuzz number is the number itself, replacing any number divisible by three with the word “Fizz”,
                and any number divisible by five with the word “Buzz”, and any number divisible by both three and five
                with the word “FizzBuzz”.</p>
                <p>For example, the first <math><mn>15</mn></math> numbers are: 1, 2, Fizz, 4, Buzz, Fizz, 7, 8, Fizz,
                Buzz, 11, Fizz, 13, 14, FizzBuzz, …</p>
                <details>
                    <summary>Hints</summary>
                    <p>Use the blocks from loops to iterate a variable.</p>
                    <p>Use logic and math blocks to control what gets printed on each line.</p>
                    <p>For the logic “if” block, use the cogwheel icon to add “else if” and “else” branches that will
                     cover all the cases.</p>
                    <p>A common way to test if a number is divisible by <math><mi>n</mi></math>, is to test if its
                    remainder after division by <math><mi>n</mi></math> is <math><mn>0</mn></math>.</p>
                </details>
            `, solution: new Solutions(100).fizzbuzz()},
        {title: 'Binary Counting', statement: `
                <p>Count in binary starting from <math><mn>00000000</mn></math> (<math><mn>8</mn></math> digits) to 
                <math><mn>11111111</mn></math>, one binary number per line.</p>
                <p>Your output should thus have <math><msup><mn>2</mn><mn>8</mn></msup><mo>=</mo><mn>100</mn></math>
                lines like so: 00000000, 00000001, 00000010, 00000011, …</p>
                <details>
                    <summary>Hints</summary>
                    <p>You can't solve this using a single loop. There is no built-in function to conveniently convert
                    a decimal number to binary. Instead, we need to write strings.</p>
                    <p>Utilize a divide and conquer recursive approach. Realize that all binary numbers of 
                    <math><mi>n</mi></math> digits can be written as
                    <ul>
                        <li>the digit <math><mn>0</mn></math> followed by all binary numbers of 
                            <math><mi>n</mi><mo>-</mo><mn>1</mn></math> digits and</li>
                        <li>the digit <math><mn>1</mn></math> followed by all binary numbers of 
                            <math><mi>n</mi><mo>-</mo><mn>1</mn></math> digits.</li>
                    </ul>                  
                    </p>
                    <p>Example: using this approach, we can create numbers of <math><mi>3</mi></math> digits if we
                    have all numbers of <math><mi>2</mi></math> digits. And we can create all numbers of 
                    <math><mi>2</mi></math> digits if we have all numbers of <math><mi>1</mi></math> digits. Which are
                    just <math><mi>0</mi></math> and <math><mi>1</mi></math>.</p>
                    <p>To do this in blocks, create a procedure that will have two inputs: a “prefix” and a “size”.
                    This procedure will:
                    <ul>
                        <li>If size is non-zero: call itself twice:
                        <ul>
                            <li>First call with inputs: join “prefix” and “0”, “size” decreased by 
                            <math><mi>1</mi></math>.</li>
                            <li>Second call with inputs: join “prefix” and “1”, “size” decreased by 
                            <math><mi>1</mi></math>.</li>
                        </ul>
                        </li>
                        <li>If size is zero: print the “prefix”.</li>
                    </ul>
                    </p>
                    <p>Finally, call your procedure with the inputs: empty string, <math><mi>8</mi></math>.</p>
                </details>
        `, solution: new Solutions(8).binary_count()}
    ];

    const toolbox = {
        "kind": "categoryToolbox",
        "contents": [
            {"kind": "category", "name": "Logic", "colour": 210,
                "contents": [
                    { "kind": "block", "type": "controls_if" },
                    { "kind": "block", "type": "logic_compare" },
                    { "kind": "block", "type": "logic_operation" },
            ]},
            {"kind": "category", "name": "Loops", "colour": 120,
                "contents": [
                    { "kind": "block", "type": "controls_repeat_ext" },
                    { "kind": "block", "type": "controls_for" },
            ]},
            {"kind": "category", "name": "Math", "colour": 230,
                "contents": [
                    { "kind": "block", "type": "math_number" },
                    { "kind": "block", "type": "math_modulo" },
                    { "kind": "block", "type": "math_arithmetic" },
            ]},
            {"kind": "category", "name": "Text", "colour": 160,
                "contents": [
                    { "kind": "block", "type": "console_print" },
                    { "kind": "block", "type": "text" },
                    { "kind": "block", "type": "text_join" },
            ]},
            {"kind": "category", "name": "Procedures", "colour": 290, "custom": "PROCEDURE"},
            {"kind": "category", "name": "Variables", "colour": 330, "custom": "VARIABLE"},
        ]
    }

    const problems = new Problems(problem_definitions);
    document.getElementById('problemSelect').replaceWith(problems.selector);
    document.getElementById('problemStatement').replaceWith(problems.statement);
    problems.onProblemChange(() => {win.stop();})

    const blockly = await new ScreenSetup().get_blockly();

    blockly.Blocks['console_print'] = {
        init() {
            this.appendValueInput('MSG').appendField('print');
            this.setPreviousStatement(true);
            this.setNextStatement(true);
            this.setColour(160);
        }
    };

    blockly.JavaScript.forBlock['console_print'] = function (block, generator) {
        const msg = generator.valueToCode(block, 'MSG', blockly.JavaScript.ORDER_NONE) || "''";
        return 'logpush(' + msg + ');\n';
    };

    blockly.Python.forBlock['console_print'] = function (block, generator) {
        const msg = generator.valueToCode(block, 'MSG', blockly.Python.ORDER_NONE) || "''";
        return 'print(' + msg + ')\n';
    };

    const workspace = blockly.inject(document.getElementById('workBench'), {
        toolbox: toolbox,
        grid: {spacing: 20, length: 3, colour: '#ccc', snap: true}
    });

    document.getElementById('saveButton').addEventListener('click', () => {
        const state = blockly.serialization.workspaces.save(workspace);
        const blob = new Blob([JSON.stringify(state, null, 2)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'workspace.json';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    });

    document.getElementById('fileLoadButton').addEventListener('click', () => {
        document.getElementById('fileLoad').click();
    });

    document.getElementById('fileLoad').addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
            try {
                const state = JSON.parse(evt.target.result.toString());
                workspace.clear();
                blockly.serialization.workspaces.load(state, workspace);
            } catch (err) {
                alert('Bad or corrupt workspace file:\n' + err.message);
            }
        };
        reader.readAsText(file);
        e.target.value = '';
    });

    const worker = new Worker('./src/worker.js', {type: 'module'});
    const grader = new Grader(document.getElementById('terminal'));
    const log = [];
    grader.log_info('Program output will appear here…')

    worker.onmessage = (e) => {
        switch (e.data.type) {
            case 'logpush':
                const line = e.data.text;
                log.push(line);
                grader.log_normal(line);
                break;
            case 'done':
                if (log.length === 0) {
                    grader.log_info('Program has produced no output…');
                }
                if (problems.has_solution() && grader.validate(log, problems.solution())) {
                    win.start();
                }
                break;
        }
    };

    document.getElementById('runButton').addEventListener('click', () => {
        grader.log_clear();
        log.length = 0;

        const code = blockly.JavaScript.workspaceToCode(workspace);
        worker.postMessage({type: 'run', code});
    });

    document.getElementById('pythonButton').addEventListener('click', () => {
        grader.log_clear();
        log.length = 0;

        const code = blockly.Python.workspaceToCode(workspace);
        code.split('\n').forEach(line => {
            grader.log_normal(line);
        })
    });
}