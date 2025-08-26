import {assert} from "@esm-bundle/chai";
import {ScreenSetup} from "./screen_setup";

describe("screen setup", () => {
    it("imports and returns blockly", async () => {
        const screen_setup = new ScreenSetup();
        const blockly = await screen_setup.get_blockly();
        assert.exists(blockly.inject, 'inject exists')
        assert.exists(blockly.Blocks, 'Blocks exists')
        assert.exists(blockly.JavaScript, 'JavaScript exists')
        assert.exists(blockly.Python, 'Python exists')
        assert.exists(blockly.JavaScript.ORDER_NONE, 'JavaScript ordering exists')
        assert.exists(blockly.Python.ORDER_NONE, 'Python ordering exists')
    });
});
