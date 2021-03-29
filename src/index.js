import { release } from './release';
import { handleGlobalException } from './global-exception';

export const executeAlpha = async () => {
    try {
        await release();
    }
    catch (ex) {
        /** log error and exit */
        handleGlobalException(ex);
    }
};
