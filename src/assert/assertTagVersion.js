import semverMajor from 'semver/functions/major';
import semverGt from 'semver/functions/gt';
import { Branch, LegacyBranch, Tag } from '../constants';
import { throwError } from '../error';
import { getDistTagVersion } from '../dist-tags';

export const verifyMainAndNextVersion = ({ tagName, branchName }) => {
    const { errorKey, tag} = branchName === Branch.next
        ? { errorKey: 'invalidNextTag', tag: Tag.next}
        : { errorKey: 'invalidMainTag', tag: Tag.latest};
    const latestVersion = getDistTagVersion(tag);
    if(latestVersion)
        return semverGt(tagName, latestVersion)
            ? true
            : throwError(errorKey, [tagName, latestVersion]);
    else
        console.log('Seems like first time publish !!');
};

export const verifyLegacyVersion = ({ branchName, tagName }) => {
    /** assert that major version and branch version matches */
    const branchVersion = LegacyBranch.getVersion(branchName);
    const tagMajorVersion = `${semverMajor(tagName)}`;

    return branchVersion === tagMajorVersion
        ? true
        : throwError('invalidLegacyVersion', [branchName, tagMajorVersion]);
};
