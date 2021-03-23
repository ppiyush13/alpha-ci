import { assert } from 'chai';
import semverMajor from 'semver/functions/major';
import semverGt from 'semver/functions/gt';
import { MatchTag, Tag } from '../constants';
import { getDistTagVersion } from '../dist-tags';

export const assertNextVersion = ({ tagName }) => {
    const nextVersion = getDistTagVersion(Tag.next);
    const latestVersion = getDistTagVersion(Tag.latest);

    assert.isTrue(
        MatchTag.isNext(tagName),
        `next branch can only have tags in format vx.x.x-rc.x but found tag ${tagName}`,
    );
    assert.exists(
        latestVersion, 
        `First release must be published from main/master branch, but found branch next`,
    );
    assert.strictEqual(
        semverMajor(tagName), semverMajor(latestVersion) + 1,
        `For next branch, major version after latest release ${latestVersion} should be incremented by 1, but found ${tagName}`,
    );

    if(nextVersion) {
        assert.isTrue(
            semverGt(tagName, nextVersion),
            `Next branch tag ${tagName} should be greater than published next package version ${nextVersion}`,
        );
    }
    else {
        console.log('Seems like first release from next branch in a while');
    }
};
