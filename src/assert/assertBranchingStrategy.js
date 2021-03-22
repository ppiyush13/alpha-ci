import { assertMainVersion } from './assertion.main';
import { assertNextVersion} from './assertion.next';
import { assertLegacyVersion } from './assertion.legacy';
import { Branch, LegacyBranch } from '../constants';

export const assertBranchingStrategy = () => {
    const branchName = process.env.BRANCH_NAME.toLocaleLowerCase();
    const tagName = process.env.TAG_NAME.toLocaleLowerCase();

    if([Branch.main, Branch.master].includes(branchName)) {
        return assertMainVersion({ branchName, tagName });
    }
    else if(branchName === Branch.next) {
        return assertNextVersion({ branchName, tagName });
    }
    else if(LegacyBranch.matchVersion(branchName)) {
        return assertLegacyVersion({ branchName, tagName });
    }
    else {
        throw new Error(`Branch ${branchName} does not meet any branching format`);
    }
};
