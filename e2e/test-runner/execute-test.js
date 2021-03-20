import chalk from 'chalk';
import { collectHooks } from './collect-hooks';
import { StepExecutor } from './step-executor/step-executor';
import { log } from './logger';
import { formatError } from './format-error/format-error';

export const executeTest = async (desc, testCallback) => {
    const { steps, setup, tear } = collectHooks(testCallback);
    try {
        await setup();
        const stepExecutor = new StepExecutor(steps);
        log(`\n${desc}`);
        const { total, pass, skip, error } = await stepExecutor.execute();
        log(`\nTests: ${chalk.bold.green('%i passed')}, ${chalk.bold.yellow('%i skipped')}, %i total`, pass, skip, total);
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
