import CliSteps from 'cli-step';
import chalk from 'chalk';
import prettyMs from 'pretty-ms';

const bold = chalk.bold; 

const callbacks = {
    beforeAll: () => undefined,
    afterAll: () => undefined,
};


export const setup = cb => callbacks.beforeAll = cb;
export const tear = cb => callbacks.afterAll = cb;

export default async cb => {
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
        //throw ex;
    }
    finally {
        await tearDown();
    }
};

const tearDown = async () => {
    try {
        console.log('tear down');
        await callbacks.afterAll();
        //process.exit(0);
    }
    catch(ex) {
        console.log('Encountered error while test tear-down', ex);
        //process.exit(1);
    }
};

//process.on('uncaughtException', tearDown);
process.on('unhandledRejection', () => {
    tearDown();
    //process.exit(1);
});
