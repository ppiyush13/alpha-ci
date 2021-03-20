import { log } from './logger';
import { executeTest } from './execute-test';

export default async (...args) => {
    try {
        await executeTest(...args);
        process.exit(0);
    }
    catch(ex) {
        const exMsg = ex.cleanTrace || ex;
        log(exMsg);
        process.exit(1);
    }
};
