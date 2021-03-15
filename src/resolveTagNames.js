import semverGt from 'semver/functions/gt';
import { Branch, Tag, LegacyBranch } from './constants';
import { getDistTagVersion } from './dist-tags';

export const resolveTagNames = () => {
    const branchName = process.env.BRANCH_NAME.toLocaleLowerCase();
    const tagName = process.env.TAG_NAME.toLocaleLowerCase();

    if([Branch.main, Branch.master].includes(branchName)) {
        const distTagOfLatest =  getDistTagVersion(Tag.latest);
        const distTagOfNext = getDistTagVersion(Tag.next);

        if(
            distTagOfLatest === distTagOfNext
            || distTagOfLatest && !distTagOfNext
            || semverGt(tagName, distTagOfNext)
        )
            return [Tag.latest, Tag.next];

        return [Tag.latest];
    }
    else if(branchName === Branch.next) {
        return [Tag.next];
    }
    else if(LegacyBranch.matchVersion(branchName)) {
        const version = LegacyBranch.getVersion(branchName);
        return [ `${Tag.latest}-${version}` ];
    }
}
