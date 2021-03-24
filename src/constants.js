import escapeStringRegex from 'escape-string-regexp';

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
    return new RegExp(escapeStringRegex(`npm ERR! fatal: tag '${tagName}' already exists`)).test(ex);
};

/** branching strategy utils */
export const MatchTag = {
    isLatest: str => /^v[\d]+.[\d]+.[\d]+$/.test(str),
    isNext: str => /^v[\d]+.[\d]+.[\d]+-rc.[\d]+$/.test(str),
};
export const LegacyBranch = {
    matchVersion: str => /^v[\d]+$/.test(str),
    getVersion: str => {
        const regexResult = str.match(/^v([\d]+)$/);
        return parseInt(regexResult[1]);
    },
};
