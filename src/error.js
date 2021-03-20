
const errors = {
    invalidMainTagFormat: () => 'main/master branch can only have tags in format vx.x.x',
    invalidMainTag: (tagName, version) => `main/master branch tag [${tagName}] should be greater than published package version [${version}]`,
    invalidNextTagFormat: () => `next branch can only have tags in format vx.x.x-rc.x`,
    invalidNextTag: (tagName, version) => `next branch tag [${tagName}] should be greater than published package version [${version}]`,
    invalidLegacyTagFormat: () => `Legacy branch can only have tags in format vx.x.x`,
    invalidLegacyVersion: (branch, majorVersion) => `Legacy branch [${branch}] cannot have tags with major version [${majorVersion}]`,
    invalidLegacyProceedingVersion: (tagName, version) => `Legacy branch tag [${tagName}] should be greater than published package version [${version}]`,
    invalidLegacyTagGreaterThanLatest: (tagName, latestVersion) => `Legacy branch tag [tagName] should be lesser than published latest version [${latestVersion}]`,
    invalidBranchingStrategy: branch => `Branch ${branch} does not meet any branching format`,
    invalidFirstReleaseFromLegacyBranch: (branch) => `First release must be published from main/master branch, but found [${branch}]`,
    invalidMajorVersion: (prevVersion, newVersion) => `Major version after latest release ${prevVersion} can be incremented by 1, but found ${newVersion}`,
};

export const throwError = (key, args) => {
    throw getError(key, args);
};

export const getError = (key, args = []) => {
    const errorFn = errors[key];
    return new Error(
        errorFn(...args),
    );
};
