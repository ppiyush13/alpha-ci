import { assertBranchingStrategy } from './assert/assert-branching-strategy';
import { npmVersion, npmPublish, npmDistTags } from './steps';
import { resolveTagNames } from './resolve-tag-names';
import { fetchDistTags } from './dist-tags';
import { readPackageContent, getPackageMetadata } from './package-metadata';
import { initConfigs } from './config';

export const release = async () => {
    /** initializers */
    initConfigs();
    await readPackageContent();

    /** perform steps */
    const { name: packageName } = getPackageMetadata();
    await fetchDistTags(packageName);

    /** verify branching strategy */
    assertBranchingStrategy();

    /** generate all npm dist-tags for current release */
    const [ publishDistTag, ...otherDistTags ] = resolveTagNames();

    /** run: npm version */
    npmVersion();

    /** run: npm publish */
    npmPublish(publishDistTag.tag);

    /** run: npm dist-tag add */
    npmDistTags(otherDistTags);
};
