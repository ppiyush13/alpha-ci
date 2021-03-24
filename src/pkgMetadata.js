import { resolve } from 'path';

let pkgContent = {};

export const readPkgContent = async () => {
    const packageJsonPath = resolve(process.cwd(), 'package.json');
    pkgContent = await import(packageJsonPath);
};

export const getPkgMetadata = () => pkgContent;
