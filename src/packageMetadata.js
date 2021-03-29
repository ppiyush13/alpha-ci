import { resolve } from 'path';
import { cwd } from 'process';

/** result holder object */
const result = {
    packageContent: undefined,
};

/** read package content */
export const readPackageContent = async () => {
    /** process.cwd is always set to the calling directory */
    const packageJsonPath = resolve(cwd(), 'package.json');
    const { default: packageContent } = await import(packageJsonPath);
    result.packageContent = packageContent;
};

/** getter */
export const getPackageMetadata = () => (
    result.packageContent
);
