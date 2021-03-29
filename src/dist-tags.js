import got from 'got';
import getRegistryUrl from 'registry-url';

/** dist-tags holder */
const result = {
    distTags: {},
};

/** getter */
export const getDistTagVersion = (distTag) => (
    result.distTags[distTag]
);

/** init */
export const fetchDistTags = async (packageName) => {
    try {
        const response = await got(`-/package/${packageName}/dist-tags`, {
            prefixUrl: getRegistryUrl(),
            responseType: 'json',
        });
        result.distTags = response.body;
    }
    catch (ex) {
        if (ex.response && ex.response.statusCode === 404) return;
        throw ex;
    }
};
