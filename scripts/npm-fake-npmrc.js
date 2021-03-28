import getAuthToken from 'registry-auth-token';
import { Volume } from 'memfs';
import * as fs from 'fs';
import { Union } from 'unionfs';
import { patchRequire, patchFs } from 'fs-monkey';

const mockVolume = volumeJson => {

    /** create vol from given dir map */
    const vol = Volume.fromJSON(volumeJson);
    
    /** unify fs and mock vol */
    const ufs = new Union();
    ufs.use(fs).use(vol);

    /** monkey patch node's require and fs modules */
    patchRequire(ufs);
    patchFs(ufs);
};

export const fakeNpmrc = ({ registry, authToken, filePaths }) => {

    const npmrcContent = [
        `//${new URL(registry).host}/:_authToken = ${authToken}`,
        `registry = ${registry}`,
    ].join('\n');

    const volumeJson = filePaths.reduce((acc, filePath) => {
        return {
            ...acc,
            [filePath]: npmrcContent,
        };
    }, {});

    mockVolume(volumeJson);
};
