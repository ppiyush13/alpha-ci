/** auto-mock not working as expected, so mocked pkgMetadata here */
jest.mock('./package-metadata', () => ({
    readPackageContent: () => {},
    getPackageMetadata: () => ({ name: 'demo-package' }),
}));

/** mock main field of package.json */
jest.mock('../package.json', () => ({
    ...jest.requireActual('../package.json'),
    main: 'src/index.js',
}));

/** mock logger module */
jest.mock('./logger');
