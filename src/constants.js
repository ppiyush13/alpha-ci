//import memoize from 'memoizee';
import { exec } from './shell/exec';

/** branch */
export const Branch = {
    main: 'main',
    master: 'master',
    next: 'next',
};

/** tags */
export const Tag = {
    latest: 'latest',
    next: 'next',
};

/** error */
export const TagAlreadyExistsError = (tagName, ex) => {
    return new RegExp(`npm ERR! fatal: tag '${tagName}' already exists`)
        .test(ex);
};

/** branching strategy utils */
export const MatchTag = {
    latest: str => /^v[\d]+.[\d]+.[\d]+$/.test(str),
    next: str => /^v[\d]+.[\d]+.[\d]+-rc.[\d]+$/.test(str),
};
export const LegacyBranch = {
    matchVersion: str => /^v[\d]+$/.test(str),
    getVersion: str => str.match(/^v([\d]+)$/)[1],
};

export const pkgMetadata = {
    version: () => exec(`node -p "require('./package.json').version"`).trim(),
    name: () => exec(`node -p "require('./package.json').name"`).trim(),
    // name: memoize(
    //     () => exec(`node -p "require('./package.json').name"`).trim(), 
    //     { length: 0 }
    // ),
};
