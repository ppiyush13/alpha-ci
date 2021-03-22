import { exec } from '../shell/exec';
import { pkgMetadata } from '../constants';

export const npmDistTags = distTags => {
    if(distTags.length === 0) return;
    
    const { name } = pkgMetadata;
    const packageName = name();

    try {
        distTags.map(({ tag, version }) => {
            const command = `npm dist-tag add ${packageName}@${version} ${tag}`;
            console.log(`Executing command: ${command}`);
            exec(command);
        });
    }
    catch(ex) {
        console.error('Dist-tagging failed, please consider doing it manually');
    }
};
