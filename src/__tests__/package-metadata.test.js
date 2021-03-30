import alphaPackage from '../../package.json';

/**
 * NodeJs sets process.cwd() to calling directory path. For now we are testing packageMetadata
 * module by actual requiring and asserting over root package.json. But in actual it will return
 * calling module's package.json not alpha's package.json
 */

describe('testing pkgMetadata module', () => {
    /** require actual module */
    const { readPackageContent, getPackageMetadata } = jest.requireActual('../package-metadata');

    it('should return root package.json file', async () => {
        /** read package content */
        await readPackageContent();

        /** assert over getPackageMetadata function */
        expect(getPackageMetadata()).toEqual(alphaPackage);
        expect(getPackageMetadata().name).toEqual('alpha');
    });
});
