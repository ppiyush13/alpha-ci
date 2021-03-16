import { release } from './release';
import { handleGlobalException } from './globalException';

export const run = async () => {
    try {
        await release();
        //console.log(process.env.BRANCH_NAME);
    }
    catch(ex) {
        /** log error and exit */
        handleGlobalException(ex);
    }
};
