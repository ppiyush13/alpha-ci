
/** auto-mock not working as expected, so mocked pkgMetadata here */
jest.mock('./pkgMetadata', () => ({
    readPkgContent: () => {},
    getPkgMetadata: () => ({ name: 'demo-package'}),
}));
