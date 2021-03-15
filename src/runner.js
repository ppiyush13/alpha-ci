import { release } from './release';
import { handleGlobalException } from './globalException';

(async () => {
    try {
        await release();
    }
    catch(ex) {
        /** log error and exit */
        handleGlobalException(ex);
    }
})();
