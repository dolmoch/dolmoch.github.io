
/** @typedef {typeof import('blockly/core')} BlocklyCore */
/** @typedef {typeof import('blockly/blocks')} BlocklyBlocks */
/** @typedef {typeof import('blockly/python')['pythonGenerator'] & { ORDER_NONE : number }} BlocklyPython */
/** @typedef {typeof import('blockly/javascript')['javascriptGenerator'] & { ORDER_NONE : number }} BlocklyJS */
/** @typedef {BlocklyCore & {Blocks : BlocklyBlocks, Python : BlocklyPython, JavaScript : BlocklyJS}} BlocklyType */

export class ScreenSetup {
    /**
     * @returns {Promise<BlocklyType>}
     */
    async get_blockly() {
        const add_script = (scriptPath) => new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.setAttribute('src', scriptPath);
            document.head.appendChild(script);
            script.addEventListener('load', resolve);
            script.addEventListener('error', reject);
        });
        await add_script('./vendor/blockly.min.js');
        await add_script('./vendor/python_compressed.js');
        // noinspection JSUnresolvedReference
        /** @type {BlocklyType} */
        const blockly = /** @type {any} */ globalThis.Blockly;
        // noinspection JSUnresolvedReference
        delete globalThis.Blockly;
        return blockly;
    }
}
