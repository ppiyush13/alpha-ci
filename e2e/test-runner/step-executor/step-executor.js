import { StepSummary } from './step-summary';
import { executionTime } from '../util';

export class StepExecutor {
    error = undefined;

    constructor(steps) {
        this.stepsIterator = steps[Symbol.iterator]();
        this.summary = new StepSummary(steps.length);
    }

    async execute() {
        /** execute steps sequentially */
        const next = async () => {
            const { done, value } = this.stepsIterator.next();
            if (done) {
                /** return if iterator exhausted */
                return undefined;
            }

            const { desc, cb } = value;

            if (this.error) {
                /** skip next step, if any previous steps generated error */
                this.summary.logSkip(desc);
            }
            else {
                /** execute step */
                await this.executeStep(desc, cb);
            }

            /** execute next step recursively */
            return next();
        };

        /** execute first step */
        await next();

        return {
            ...this.summary.getSummary(),
            error: this.error,
        };
    }

    async executeStep(desc, cb) {
        const stop = executionTime();
        try {
            await cb();
        }
        catch (error) {
            this.error = error;
        }
        const totalTime = stop();
        const logFn = this.error
            ? this.summary.logFail.bind(this.summary)
            : this.summary.logPass.bind(this.summary);
        logFn(desc, totalTime);
    }
}
