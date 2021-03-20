import chalk from 'chalk';
import { collectHooks } from './collect-hooks';
import { StepExecutor } from './step-executor/step-executor';
import { log } from './logger';
import { formatError } from './format-error/format-error';
import { executionTime } from './util';

export const executeTest = async (desc, testCallback) => {
    const { steps, setup, tear } = collectHooks(testCallback);
    try {
        await setup();
        const stepExecutor = new StepExecutor(steps);

        log(`\n${desc}`);

        const stop = executionTime();
        const { total, pass, skip, error } = await stepExecutor.execute();
        const totalExecTime = stop();

        log(`\nTests: ${chalk.bold.green(`${pass} passed`)}, ${chalk.bold.yellow(`${skip} skipped`)}, ${total} total`);
        log(`Time:  ${totalExecTime}`);

        if(error) {
            log('\nTest execution halted because of below error:');
            error.cleanTrace = formatError(error);
            throw error;
        };
    }
    finally {
        await tear();
    }
};
