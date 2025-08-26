import {assert} from "@esm-bundle/chai";
import {Win} from "./win";

describe("winning ceremony", () => {
    it("attaches to a container", () => {
        const container = document.createElement('div');
        const win = new Win(container);
        assert.strictEqual(container.children.length, 1);
        const canvas = container.children[0];
        assert.strictEqual(canvas.tagName, 'CANVAS');
        win.start();
    });
    it("runs a fireworks show", () => {
        const container = document.createElement('div');
        const win = new Win(container);
        win.start();
        assert.strictEqual(win.fw.isRunning, true);
    });
    it("can be stopped", () => {
        const container = document.createElement('div');
        const win = new Win(container);
        win.start();
        win.stop();
        assert.strictEqual(win.fw.isRunning, false);
    });
});