import { assertBranchingStrategy } from './assert/assertBranchingStrategy';
import { npmVersion, npmPublish, npmDistTags } from './steps';
import { resolveTagNames } from './resolveTagNames';
import { fetchDistTags } from './dist-tags';
import { readPackageContent, getPackageMetadata } from './packageMetadata';

export const release = async () => {
    /** initializers */
    await readPackageContent();

    /** perform steps */
    const { name: packageName } = getPackageMetadata();
    await fetchDistTags(packageName);

    /** verify branching strategy */
    assertBranchingStrategy();

    /** generate all npm dist-tags for current release */
    const [publishDistTag, ...otherDistTags] = resolveTagNames();

    /** run: npm version */
    npmVersion();

    /** run: npm publish */
    npmPublish(publishDistTag.tag);

    /** run: npm dist-tag add */
    npmDistTags(otherDistTags);
};
