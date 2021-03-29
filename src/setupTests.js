/** auto-mock not working as expected, so mocked pkgMetadata here */
jest.mock('./packageMetadata', () => ({
    readPackageContent: () => {},
    getPackageMetadata: () => ({ name: 'demo-package' }),
}));

/** mock main field of package.json */
jest.mock('../package.json', () => ({
    ...jest.requireActual('../package.json'),
    main: 'src/index.js',
}));
