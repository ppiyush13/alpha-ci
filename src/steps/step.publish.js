import { exec } from '../shell/exec';

export const npmPublish = (publishTag) => {
    exec(`npm publish --tag ${publishTag}`);
};
