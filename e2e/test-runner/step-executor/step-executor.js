import prettyMs from 'pretty-ms';
import { StepSummary } from './step-summary';

export class StepExecutor {
    error = undefined;

    constructor(steps) {
        this.stepsIterator = steps[Symbol.iterator]();
        this.summary = new StepSummary(steps.length);
    }

    async execute() {
        while(true) {
            const { done, value } = this.stepsIterator.next();
            if(done) {
                break;
            }
            else {
                const { desc, cb } = value;
                this.error
                    ? this.summary.logSkip(desc)
                    : await this.executeStep(desc, cb);
            }
        }

        return {
            ...this.summary.getSummary(),
            error: this.error,
        };
    }

    async executeStep(desc, cb) {
        const start = Date.now();
        try {
            await cb();
        }
        catch(error) {
            this.error = error;
        }
        const totalTime = Date.now() - start;
        const ms = prettyMs(totalTime, { secondsDecimalDigits: 3 });
        this.error
            ? this.summary.logFail(desc, ms)
            : this.summary.logPass(desc, ms);
    }
}
