import semverGt from 'semver/functions/gt';
import semverClean from 'semver/functions/clean';
import semverMajor from 'semver/functions/major';
import { Branch, Tag, LegacyBranch } from './constants';
import { getDistTagVersion } from './dist-tags';

export const resolveTagNames = () => {
    const branchName = process.env.BRANCH_NAME.toLocaleLowerCase();
    const tagName = process.env.TAG_NAME.toLocaleLowerCase();
    const pkgVersion = semverClean(tagName);
    const tags = [];

    if([Branch.main, Branch.master].includes(branchName)) {
        const distTagOfLatest =  getDistTagVersion(Tag.latest);
        const distTagOfNext = getDistTagVersion(Tag.next);

        if(
            distTagOfLatest === distTagOfNext
            || distTagOfLatest && !distTagOfNext
            || semverGt(tagName, distTagOfNext)
        ) {
            tags.push({
                tag: Tag.latest,
                version: pkgVersion,
            });
            tags.push({
                tag: Tag.next,
                version: pkgVersion,
            });
        }
        else {
            tags.push({
                tag: Tag.latest,
                version: pkgVersion,
            });
        }

        if(distTagOfLatest && semverMajor(pkgVersion) === semverMajor(distTagOfLatest) + 1) {
            tags.push(getLegacyTag(distTagOfLatest));
        }
    }
    else if(branchName === Branch.next) {
        tags.push({
            tag: Tag.next,
            version: pkgVersion,
        });
    }
    else if(LegacyBranch.matchVersion(branchName)) {
        tags.push(getLegacyTag(pkgVersion));
    }

    return tags;
}

const getLegacyTag = version => {
    const majorVersion = semverMajor(version);
    return {
        tag: `${Tag.latest}-${majorVersion}`,
        version: version,
    };
};
