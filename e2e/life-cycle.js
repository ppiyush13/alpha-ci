//import CliSteps from 'cli-step';
import chalk from 'chalk';
import prettyMs from 'pretty-ms';

const bold = chalk.bold; 


const callbacks = {
    beforeAll: () => undefined,
    afterAll: () => undefined,
};

class Steps {
    SuccessChar = chalk.green('√');
    ErrorChar = chalk.red('×');
    SkipChar = chalk.yellow('○');

    constructor(callback) {
        this.stepArray = [];
        callback(this.collect);
        //this.cliSteps = new CliSteps(this.stepArray.length, true);
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

            //const cliStep = this.cliSteps.advance(`  ${desc}`);
            try {
               // cliStep.start();
                const ms = await this.executeAndRecordExecutionTime(cb);
                console.log('%c %s (%s)', this.SuccessChar, desc, ms);
                //cliStep.success(`${this.SuccessChar} ${desc} (${ms})`);
                result.pass++;
            }
            catch(ex) {
                result.exception = ex;
                //cliStep.success(`${this.ErrorChar} ${desc}`);
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
        //this.cliSteps.startRecording();
        await cb();
        //const ns = this.cliSteps.stopRecording();
        // return prettyMs(
        //     Math.round(ns / 1000 / 1000),
        //     { secondsDecimalDigits: 3 },
        // );
        return '2 s';
    }
}

export const setup = cb => callbacks.beforeAll = cb;
export const tear = cb => callbacks.afterAll = cb;

export default async cb => {
    console.log();
    try {
        const steps = new Steps(cb);

        console.log('Execute beforeAll\n');
        await callbacks.beforeAll();
        const { total, pass, skip, exception } = await steps.execute();

        console.log(`\nTests: ${bold.green('%i passed')}, ${bold.yellow('%i skipped')}, %i total`, pass, skip, total);

        if(exception) {
            console.log('\nTest execution halted because of below error:');
            throw exception
        };
    }
    catch(ex) {
        //console.log('\n');
        console.log(bold.red(ex.stack));
        throw ex;
    }
    finally {
        await callbacks.afterAll();
    }
};

const tearDown = async () => {
    try {
        await callbacks.afterAll();
        process.exit(0);
    }
    catch(ex) {
        console.log('Encountered error while test tear-down', ex);
        process.exit(1);
    }
};

process.on('uncaughtException', tearDown);
process.on('unhandledRejection', tearDown);
