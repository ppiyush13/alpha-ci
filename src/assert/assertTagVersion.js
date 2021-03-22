import semverMajor from 'semver/functions/major';
import semverGt from 'semver/functions/gt';
import semverLt from 'semver/functions/lt';
import { LegacyBranch, Tag } from '../constants';
import { throwError } from '../error';
import { getDistTagVersion } from '../dist-tags';
import { assert } from 'chai';

const versionIncrementsByOne = (newVersion, previousVersion) => {
    const majorVersionOfNew = semverMajor(newVersion);
    const majorVersionOfPrevious = semverMajor(previousVersion);

    if(majorVersionOfNew === majorVersionOfPrevious) return true;
    if(majorVersionOfNew === majorVersionOfPrevious + 1 ) return true;
    throwError('invalidMajorVersion', [previousVersion, newVersion]);
};

const nextVersionIncrementByOne = ( newVersion, previousVersion ) => {
    const majorVersionOfNew = semverMajor(newVersion);
    const majorVersionOfPrevious = semverMajor(previousVersion);

    if(majorVersionOfNew === majorVersionOfPrevious + 1 ) return true;
    throw new Error(`Major version after latest release ${previousVersion} should be incremented by 1, but found ${newVersion}`);
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

export const verifyNextVersion = ({ tagName, }) => {
    const nextVersion = getDistTagVersion(Tag.next);
    const latestVersion = getDistTagVersion(Tag.latest);

    if(!latestVersion) throw new Error(`First release must be published from main/master branch, but found [next]`);

    if(nextVersion) {
        if(semverGt(tagName, nextVersion)) {
            return nextVersionIncrementByOne(tagName, latestVersion);
        }
        else {
            throwError('invalidNextTag', [tagName, nextVersion]);
        }
    }
    else {
        if(semverGt(tagName, latestVersion)) {
            return nextVersionIncrementByOne(tagName, latestVersion);
        }
        else {
            throwError('invalidNextTag', [tagName, latestVersion]);
        }
    }
};

export const verifyLegacyVersion = ({ branchName, tagName }) => {
    const branchVersion = LegacyBranch.getVersion(branchName); // v1 -> 1
    const latestLegacyVersion = getDistTagVersion(`${Tag.latest}-${branchVersion}`); // latest-1: 1.3.5
    const latestVersion = getDistTagVersion(Tag.latest); // latest: 2.2.0

    assert.exists(
        latestVersion, 
        `First release must be published from main/master branch, but found legacy branch ${branchName}`
    );
    assert.strictEqual(
        branchVersion, semverMajor(tagName),
        `Legacy branch ${branchName} cannot have tags with version ${tagName}`
    );
    assert.isTrue(
        semverLt(tagName, latestVersion), 
        `Legacy branch tag ${tagName} should be lesser than published latest package version ${latestVersion}`
    );
    assert.notStrictEqual(
        semverMajor(tagName), semverMajor(latestVersion),
        `Legacy branch ${branchName} should be tracking versions lesser than current latest version ${latestVersion}`
    );

    if(latestLegacyVersion) {
        assert.isTrue(
            semverGt(tagName, latestLegacyVersion),
            `Legacy branch tag ${tagName} must be greater than latest ${branchName} published version ${latestLegacyVersion}`,
        );
    }
    else {
        console.log(`Seems like first time deployment from legacy branch ${branchName}`);
    }
};
