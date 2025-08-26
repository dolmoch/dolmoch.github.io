import {Fireworks} from "../vendor/fireworks-js.es.js";

export class Win {
    constructor(container) {
        this.fw = new Fireworks(container);
    }

    start() {
        this.fw.start();
    }

    stop() {
        this.fw.stop();
    }
}