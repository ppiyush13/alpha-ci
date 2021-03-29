import { exec } from '../exec-shell';
import { getPackageMetadata } from '../package-metadata';
import { error } from '../logger';

export const npmDistTags = (distTags) => {
    if (distTags.length === 0) return;

    const { name: packageName } = getPackageMetadata();

    try {
        distTags.forEach(({ tag, version }) => {
            exec(`npm dist-tag add ${packageName}@${version} ${tag}`);
        });
    }
    catch (ex) {
        error('Dist-tagging failed, please consider doing it manually');
    }
};
