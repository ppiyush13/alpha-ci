import waterfall from 'p-waterfall';

export class TestLifeCycle {
    /** hooks holder */

    stepHooks = new Set();
    setupHooks = new Set();
    tearHooks = new Set();

    constructor(testCallback) {
        testCallback({
            step: this.step.bind(this),
            setup: this.setup.bind(this),
            tear: this.tear.bind(this),
        });
    }

    /** hooks registrar */
    step(desc, cb) {
        this.stepHooks.add({ desc, cb });
    }

    setup(cb) {
        this.setupHooks.add(cb);
    }

    tear(cb) {
        this.tearHooks.add(cb);
    }

    /** execute hooks */
    executeSetup() {
        return waterfall(this.setupHooks);
    }

    executeTear() {
        return waterfall(this.tearHooks);
    }

    /** getters */
    getSteps() {
        return this.stepHooks;
    }
}
