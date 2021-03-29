import { exec } from '../exec-shell';

export const npmPublish = (publishTag) => {
    exec(`npm publish --tag ${publishTag}`);
};
