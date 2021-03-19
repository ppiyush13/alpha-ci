import Steps from './steps';
import { log } from './logger';

const lifeCycleCbs = {
    setup: undefined,
    tear: undefined,
};

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
            console.log('\nTest execution halted because of below error:');
            throw exception
        };
    }
    catch(ex) {
        console.log(bold.red(ex.stack));
    }
    finally {
        await tear();
    }
};
