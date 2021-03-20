import { log } from './logger';
import { setup, tear, register } from './life-cycle';

export { setup, tear };
export default async (cb) => {
    try {
        await register(cb);
        process.exit(0);
    }
    catch(ex) {
        const exMsg = ex.cleanTrace || ex;
        log(exMsg);
        process.exit(1);
    }
};
