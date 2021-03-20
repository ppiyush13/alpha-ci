import chalk from 'chalk';
import Steps from './steps';
import { log } from './logger';
import { formatError } from './format-error';

const lifeCycleCbs = {
    setup: undefined,
    tear: undefined,
};

const bold = chalk.bold;
export const setup = cb => lifeCycleCbs.setup = cb;
export const tear = cb => lifeCycleCbs.tear = cb;

export const register = async cb => {
    const { setup, tear } = lifeCycleCbs;
    try {
        await setup();
        const steps = new Steps(cb);
        const { total, pass, skip, exception } = await steps.execute();
        log(`\nTests: ${bold.green('%i passed')}, ${bold.yellow('%i skipped')}, %i total`, pass, skip, total);
        if(exception) {
            log('\nTest execution halted because of below error:');
            exception.cleanTrace = formatError(exception);
            throw exception;
        };
    }
    finally {
        await tear();
    }
};
