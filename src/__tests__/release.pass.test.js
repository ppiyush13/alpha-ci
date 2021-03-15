import nock from 'nock';
import mockedEnv from 'mocked-env';
import mockConsole from "jest-mock-console";
import semverClean from 'semver/functions/clean';
import { mockShell } from '../shell/mock';
import { mockRegistry } from '../registry/mock';
import { release } from '../release';

nock.disableNetConnect()
mockRegistry('http://npm-registry-url');

const mockNpmLatestVersion = previousDistTags => {
    const response = previousDistTags
        ? [ 200, { 'dist-tags': previousDistTags }]
        : [ 404, { "error": "Not found" } ];

    nock('http://npm-registry-url')
        .get('/demo-package')
        .reply(...response); 
};

describe('testing branching strategy', () => {
    afterEach(() => nock.cleanAll()); 

    it.each([
        {
            branch: 'main',
            tag: 'v1.0.0',
            previousDistTags: null,
            commands: [
                `node -p "require('./package.json').name"`,
                "npm version v1.0.0",
                "npm publish --tag latest",
                `node -p "require('./package.json').name"`,
                `node -p "require('./package.json').version"`,
                "npm dist-tag add demo-package@1.0.0 next",
            ],
        },
        {
            branch: 'main',
            tag: 'v1.0.0',
            previousDistTags: {
                latest: '1.0.0-rc.5',
            },
            commands: [
                `node -p "require('./package.json').name"`,
                "npm version v1.0.0",
                "npm publish --tag latest",
                `node -p "require('./package.json').name"`,
                `node -p "require('./package.json').version"`,
                "npm dist-tag add demo-package@1.0.0 next",
            ],
        },
        {
            branch: 'master',
            tag: 'v2.5.1',
            previousDistTags: {
                latest: '2.5.0',
                next: '2.5.0',
            },
            commands: [
                `node -p "require('./package.json').name"`,
                "npm version v2.5.1",
                "npm publish --tag latest",
                `node -p "require('./package.json').name"`,
                `node -p "require('./package.json').version"`,
                "npm dist-tag add demo-package@2.5.1 next",
            ],
        },
        {
            branch: 'main',
            tag: 'v3.0.0',
            previousDistTags: {
                latest: '2.5.1',
                next: '2.5.1',
            },
            commands: [
                `node -p "require('./package.json').name"`,
                "npm version v3.0.0",
                "npm publish --tag latest",
                `node -p "require('./package.json').name"`,
                `node -p "require('./package.json').version"`,
                "npm dist-tag add demo-package@3.0.0 next",
            ],
        },
        {
            branch: 'main',
            tag: 'v3.5.2',
            previousDistTags: {
                latest: '3.5.1',
                next: '4.0.0-rc.4',
            },
            commands: [
                `node -p "require('./package.json').name"`,
                "npm version v3.5.2",
                "npm publish --tag latest",
            ],
        },
        {
            branch: 'main',
            tag: 'v5.0.0',
            previousDistTags: {
                latest: '4.0.8',
                next: '5.0.0-rc.2',
            },
            commands: [
                `node -p "require('./package.json').name"`,
                "npm version v5.0.0",
                "npm publish --tag latest",
                `node -p "require('./package.json').name"`,
                `node -p "require('./package.json').version"`,
                "npm dist-tag add demo-package@5.0.0 next",
            ]
        },
        {
            branch: 'main',
            tag: 'v5.0.1',
            previousDistTags: {
                latest: '5.0.0',
                next: '5.0.0-rc.2',
            },
            commands: [
                `node -p "require('./package.json').name"`,
                "npm version v5.0.1",
                "npm publish --tag latest",
                `node -p "require('./package.json').name"`,
                `node -p "require('./package.json').version"`,
                "npm dist-tag add demo-package@5.0.1 next",
            ]
        },
        {
            branch: 'next',
            tag: 'v3.0.0-rc.0',
            previousDistTags: {
                latest: '2.5.1',
                next: '2.5.1',
            },
            commands: [
                `node -p "require('./package.json').name"`,
                "npm version v3.0.0-rc.0",
                "npm publish --tag next",
            ],
        },
        {
            branch: 'v1',
            tag: 'v1.0.19',
            previousDistTags: {
                latest: '2.5.1',
                next: 'v3.0.0-rc.0',
            },
            commands: [
                `node -p "require('./package.json').name"`,
                "npm version v1.0.19",
                "npm publish --tag latest-1",
            ],
        },
    ])('Positive scenarios', async ({ branch, tag, previousDistTags, commands }) => {
        const restoreConsole = mockConsole();
        mockedEnv({
            BRANCH_NAME: branch,
            TAG_NAME: tag,
        });
        const getCommandStack = mockShell({
            [`node -p "require('./package.json').name"`]: 'demo-package',
            [`node -p "require('./package.json').version"`]: semverClean(tag),
        });
        mockNpmLatestVersion(previousDistTags);
        await release();
        expect(getCommandStack()).toEqual(commands);
        restoreConsole();
    });
});
