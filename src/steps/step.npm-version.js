import { exec } from '../execShell';
import { TagAlreadyExistsError } from '../constants';

export const npmVersion = () => {
    const tagName = process.env.TAG_NAME;
    try {
        exec(`npm version ${tagName}`);
    }
    catch (ex) {
        if (TagAlreadyExistsError(tagName, ex.message)) {

        }
        else {
            throw ex;
        }
    }
};
