import { release } from './release';
import { handleGlobalException } from './globalException';

export const executeAlpha = async () => {
    try {
        await release();
        process.exit(0);
    }
    catch (ex) {
        /** log error and exit */
        handleGlobalException(ex);
    }
};
