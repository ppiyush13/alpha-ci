import { MatchTag, Branch, LegacyBranch } from '../constants';
import { throwError } from '../error';
import { verifyMainAndNextVersion, verifyLegacyVersion } from './assertTagVersion';

export const assertBranchingStrategy = () => {
    const branchName = process.env.BRANCH_NAME.toLocaleLowerCase();
    const tagName = process.env.TAG_NAME.toLocaleLowerCase();

    if([Branch.main, Branch.master].includes(branchName)) {
        return MatchTag.latest(tagName)
            ? verifyMainAndNextVersion({ branchName, tagName })
            : throwError('invalidMainTagFormat');
    }
    else if(branchName === Branch.next) {
        return MatchTag.next(tagName)
            ? verifyMainAndNextVersion({ branchName, tagName })
            : throwError('invalidNextTagFormat');
    }
    else if(LegacyBranch.matchVersion(branchName)) {
        return MatchTag.latest(tagName)
            ? verifyLegacyVersion({ branchName, tagName })
            : throwError('invalidLegacyTagFormat');
    }
    else {
        throwError('invalidBranchingStrategy', [branchName]);
    }
};
