import { exec } from '../execShell';
import { TagAlreadyExistsError } from '../constants';
import { getConfigs } from '../config';

export const npmVersion = () => {
    const { tagName } = getConfigs();
    try {
        exec(`npm version ${tagName}`);
    }
    catch (ex) {
        if (TagAlreadyExistsError(tagName, ex.message)) {
            /** tag already exists, proceed ahead */
        }
        else {
            throw ex;
        }
    }
};
