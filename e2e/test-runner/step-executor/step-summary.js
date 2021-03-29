import chalk from 'chalk';
import indentString from 'indent-string';
import { IndentSize } from '../constants';
import { log } from '../logger';

const indentAndLog = (str) => log(indentString(str, IndentSize));
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

    logPass(desc, ms) {
        this.pass += 1;
        indentAndLog(`${this.passChar} ${desc} (${ms})`);
    }

    logFail(desc, ms) {
        this.fail += 1;
        indentAndLog(`${this.failChar} ${chalk.bold.red(`${desc} (${ms})`)}`);
    }

    logSkip(desc) {
        this.skip += 1;
        indentAndLog(`${this.skipChar} ${chalk.grey(`skipped: ${desc}`)}`);
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
