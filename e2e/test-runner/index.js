import { log } from './logger';
import { executeTest } from './execute-test';

export default async (...args) => {
    try {
        await executeTest(...args);
    }
    catch (ex) {
        const exMsg = ex.cleanTrace || ex;
        log(exMsg);
        throw ex;
    }
};
