import { assert } from 'chai';
import semverMajor from 'semver/functions/major';
import semverGt from 'semver/functions/gt';
import { MatchTag, Tag } from '../constants';
import { getDistTagVersion } from '../dist-tags';

export const assertMainVersion = ({ tagName }) => {
    const latestVersion = getDistTagVersion(Tag.latest);

    assert.isTrue(
        MatchTag.isLatest(tagName), 
        `main/master branch can only have tags in format vx.x.x but found tag ${tagName}`,
    );

    if(latestVersion) {
        assert.oneOf(
            semverMajor(tagName), [semverMajor(latestVersion), semverMajor(latestVersion) + 1] ,
            `main/master branch tag ${tagName} should have major version equal or greater than one of published package latest version ${latestVersion}`,
        );

        assert.isTrue(
            semverGt(tagName, latestVersion),
            `main/master branch tag ${tagName} should be greater than published package latest version ${latestVersion}`,
        );
    }
    else {
        console.log('Seems like first time publish !!');
    }
};
