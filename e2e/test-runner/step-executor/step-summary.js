import chalk from 'chalk';
import indentString from 'indent-string';
import { IndentSize } from '../constants';

export class StepSummary {
    passChar = chalk.green('√');
    failChar = chalk.bold.red('×');
    skipChar = chalk.bold.yellow('○');
    total = 0;
    pass = 0;
    fail = 0;
    skip = 0;

    constructor(total) {
        this.total = total;
    }

    log(str) {
        console.log(indentString(str, IndentSize));
    }

    logPass(desc, ms) {
        this.pass++;
        this.log(`${this.passChar} ${desc} (${ms})`);
    }

    logFail(desc, ms) {
        this.fail++;
        this.log(`${this.failChar} ${chalk.bold.red(`${desc} (${ms})`)}`);
    }

    logSkip(desc) {
        this.skip++;
        this.log(`${this.skipChar} ${chalk.grey(`skipped: ${desc}`)}`);
    }

    getSummary() {
        return {
            pass: this.pass,
            fail: this.fail,
            skip: this.skip,
            total: this.total,
        };
    }
}
