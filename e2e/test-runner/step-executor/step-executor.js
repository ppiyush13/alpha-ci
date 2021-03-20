import { StepSummary } from './step-summary';
import { executionTime } from '../util';

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
        const stop =executionTime();
        try {
            await cb();
        }
        catch(error) {
            this.error = error;
        }
        const totalTime = stop();
        this.error
            ? this.summary.logFail(desc, totalTime)
            : this.summary.logPass(desc, totalTime);
    }
}
