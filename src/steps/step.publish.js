import { exec } from '../execShell';

export const npmPublish = (publishTag) => {
    exec(`npm publish --tag ${publishTag}`);
};
