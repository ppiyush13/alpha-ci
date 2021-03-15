import { exec } from './shell/exec';
import { pkgMetadata } from './constants';

export const applyDistTags = distTags => {
    const { name, version } = pkgMetadata;

    try {
        distTags.map(tag => {
            const command = `npm dist-tag add ${name()}@${version()} ${tag}`;
            console.log(`Executing command: ${command}`);
            exec(command);
        });
    }
    catch(ex) {
        console.error('Dist-tagging failed, please consider doing it manually');
    }
};
