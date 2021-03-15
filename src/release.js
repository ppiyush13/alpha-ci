import { assertBranchingStrategy } from './assert/assertBranchingStrategy';
import { resolveTagNames } from './resolveTagNames';
import { npmVersion } from './step.npm-version';
import { publish } from './step.publish';
import { applyDistTags } from './step.dist-tag';
import { fetchDistTags } from './dist-tags';
import { pkgMetadata } from './constants';

export const release = async () => {
    const packageName = pkgMetadata.name();
    await fetchDistTags(packageName);

    /** verify branching strategy */
    assertBranchingStrategy();

    /** generate all npm dist-tags for current release */
    const [publishDistTag, ...otherDistTags] = resolveTagNames();

    /** run: npm version */
    npmVersion();

    /** run: npm publish */
    publish(publishDistTag);

    /** run: npm dist-tag add */
    applyDistTags(otherDistTags);
};
