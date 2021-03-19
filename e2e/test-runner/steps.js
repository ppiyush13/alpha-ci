
export default class Steps {
    SuccessChar = chalk.green('√');
    ErrorChar = chalk.red('×');
    SkipChar = chalk.yellow('○');

    constructor(callback) {
        this.stepArray = [];
        callback(this.collect);
        this.cliSteps = new CliSteps(this.stepArray.length, true);
    }

    collect = (desc, cb) => {
        this.stepArray.push({ desc, cb });
    }

    async execute() {
        const stepsIterator = this.stepArray[Symbol.iterator]();
        const result = {
            exception: undefined,
            total: this.stepArray.length,
            pass: 0,
            skip: 0,
        };

        while(true) {
            const { done, value } = stepsIterator.next();

            if(done) break;
            const { desc, cb } = value;

            const cliStep = this.cliSteps.advance(`  ${desc}`);
            try {
                cliStep.start();
                const ms = await this.executeAndRecordExecutionTime(cb);
                //console.log('%c %s (%s)', this.SuccessChar, desc, ms);
                cliStep.success(`${this.SuccessChar} ${desc} (${ms})`);
                result.pass++;
            }
            catch(ex) {
                result.exception = ex;
                cliStep.success(`${this.ErrorChar} ${desc}`);
                console.log('%c %s', this.ErrorChar, desc);
                break;
            }
        }

        while(true) {
            const { done, value } = stepsIterator.next();

            if(done) break;
            const { desc } = value;
            const cliStep = this.cliSteps.advance(`  ${desc}`);
            cliStep.start();
            cliStep.success(`${this.SkipChar} ${desc}`);
            result.skip++;
        }

        return result;
    }

    async executeAndRecordExecutionTime(cb) {
        this.cliSteps.startRecording();
        await cb();
        const ns = this.cliSteps.stopRecording();
        return prettyMs(
            Math.round(ns / 1000 / 1000),
            { secondsDecimalDigits: 3 },
        );
    }
}
