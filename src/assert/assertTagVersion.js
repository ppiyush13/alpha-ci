import semverMajor from 'semver/functions/major';
import semverGt from 'semver/functions/gt';
import semverLt from 'semver/functions/lt';
import { LegacyBranch, Tag } from '../constants';
import { throwError } from '../error';
import { getDistTagVersion } from '../dist-tags';

const versionIncrementsByOne = (newVersion, previousVersion) => {
    const majorVersionOfNew = semverMajor(newVersion);
    const majorVersionOfPrevious = semverMajor(previousVersion);

    if(majorVersionOfNew === majorVersionOfPrevious) return true;
    if(majorVersionOfNew === majorVersionOfPrevious + 1 ) return true;
    throwError('invalidMajorVersion', [previousVersion, newVersion]);
};

export const verifyMainVersion = ({ tagName }) => {
    const latestVersion = getDistTagVersion(Tag.latest);
    if(latestVersion) {
        if(semverGt(tagName, latestVersion)) {
            return versionIncrementsByOne(tagName, latestVersion);
        }
        else {
            throwError('invalidMainTag', [tagName, latestVersion]);
        }
    }
    else {
        console.log('Seems like first time publish !!');
    }
};

export const verifyNextVersion = ({ tagName }) => {
    const nextVersion = getDistTagVersion(Tag.next);
    const latestVersion = getDistTagVersion(Tag.latest);
    if(nextVersion) {
        if(semverGt(tagName, nextVersion)) {
            return versionIncrementsByOne(tagName, latestVersion);
        }
        else {
            throwError('invalidNextTag', [tagName, nextVersion]);
        }
    }
    else {
        if(semverGt(tagName, latestVersion)) {
            return versionIncrementsByOne(tagName, latestVersion);
        }
        else {
            throwError('invalidNextTag', [tagName, latestVersion]);
        }
    }
};

export const verifyLegacyVersion = ({ branchName, tagName }) => {
    /** assert that major version and branch version matches */
    const branchVersion = LegacyBranch.getVersion(branchName);
    const tagMajorVersion = `${semverMajor(tagName)}`;

    if(branchVersion === tagMajorVersion) {
        const latestVersion = getDistTagVersion(Tag.latest);

        if(latestVersion) {
            if(semverLt(tagName, latestVersion)) {
                const latestLegacyVersion = getDistTagVersion(`${Tag.latest}-${branchVersion}`);
                if(latestLegacyVersion) {
                    if(semverGt(tagName, latestLegacyVersion))return true;
                    else throwError('invalidLegacyProceedingVersion', [tagName, latestLegacyVersion]);
                }
                else {
                    /** not latest-leg tag exists */
                }
            }
            else {
                throwError('invalidLegacyTagGreaterThanLatest', [tagName, latestVersion]);
            }
        }
        else {
            throwError('invalidFirstReleaseFromLegacyBranch', [branchName]);
        }
    }
    else {
        throwError('invalidLegacyVersion', [branchName, tagMajorVersion]);
    }
};
