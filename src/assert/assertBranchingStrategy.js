import { assertMainVersion } from './assertion.main';
import { assertNextVersion } from './assertion.next';
import { assertLegacyVersion } from './assertion.legacy';
import { Branch, LegacyBranch } from '../constants';
import { getConfigs } from '../config';

export const assertBranchingStrategy = () => {
    const { branchName, tagName } = getConfigs();

    if ([ Branch.main, Branch.master ].includes(branchName)) {
        return assertMainVersion({ branchName, tagName });
    }
    if (branchName === Branch.next) {
        return assertNextVersion({ branchName, tagName });
    }
    if (LegacyBranch.matchVersion(branchName)) {
        return assertLegacyVersion({ branchName, tagName });
    }

    throw new Error(`Branch ${branchName} does not meet any branching format`);
};
