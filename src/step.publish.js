import { exec } from './shell/exec';

export const publish = (publishTag) => {
    exec(`npm publish --tag ${publishTag}`);
};
