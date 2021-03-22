import { assert } from 'chai';
import semverMajor from 'semver/functions/major';
import semverGt from 'semver/functions/gt';
import semverLt from 'semver/functions/lt';
import { MatchTag, LegacyBranch, Tag } from '../constants';
import { getDistTagVersion } from '../dist-tags';

export const assertLegacyVersion = ({ branchName, tagName }) => {
    const branchVersion = LegacyBranch.getVersion(branchName); // v1 -> 1
    const latestLegacyVersion = getDistTagVersion(`${Tag.latest}-${branchVersion}`); // latest-1: 1.3.5
    const latestVersion = getDistTagVersion(Tag.latest); // latest: 2.2.0

    assert.isTrue(
        MatchTag.isLatest(tagName), 
        `Legacy branch can only have tags in format vx.x.x but found tag ${tagName}`,
    );
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
