
/** auto-mock not working as expected, so mocked pkgMetadata here */
jest.mock('./packageMetadata', () => ({
    readPackageContent: () => {},
    getPackageMetadata: () => ({ name: 'demo-package'}),
}));
