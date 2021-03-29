import semverGt from 'semver/functions/gt';
import semverClean from 'semver/functions/clean';
import semverMajor from 'semver/functions/major';
import { Branch, Tag } from './constants';
import { getDistTagVersion } from './dist-tags';
import { getConfigs } from './config';

const getLegacyTag = (version) => {
    const majorVersion = semverMajor(version);
    return {
        tag: `${Tag.latest}-${majorVersion}`,
        version,
    };
};

export const resolveTagNames = () => {
    const { branchName, tagName } = getConfigs();
    const pkgVersion = semverClean(tagName);
    const tags = [];

    if ([ Branch.main, Branch.master ].includes(branchName)) {
        /** main/master branch */
        const distTagOfLatest = getDistTagVersion(Tag.latest);
        const distTagOfNext = getDistTagVersion(Tag.next);

        if (
            distTagOfLatest === distTagOfNext
            || (distTagOfLatest && !distTagOfNext)
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

        if (distTagOfLatest && semverMajor(pkgVersion) === semverMajor(distTagOfLatest) + 1) {
            tags.push(getLegacyTag(distTagOfLatest));
        }
    }
    else if (branchName === Branch.next) {
        /** next branch */
        tags.push({
            tag: Tag.next,
            version: pkgVersion,
        });
    }
    else {
        /** legacy branch */
        tags.push(getLegacyTag(pkgVersion));
    }

    return tags;
};
