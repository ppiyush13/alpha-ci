import nock from 'nock';
import mockedEnv from 'mocked-env';
import mockConsole from "jest-mock-console";
import semverClean from 'semver/functions/clean';
import { mockRegistry } from '../registry/mock';
import { mockShell } from '../shell/mock';
import { release } from '../release';
import { getError } from '../error';

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

describe('testing branching and tag strategy', () => {
    afterEach(() => nock.cleanAll()); 

    it.each([
        {
            branch: 'main',
            tag: 'v1.0.0-rc.4',
            previousDistTags: null,
            error: getError('invalidMainTagFormat'),
            commands: [
                `node -p "require('./package.json').name"`,
            ],
        },
        {
            branch: 'main',
            tag: 'v1.0.0',
            previousDistTags: {
                latest: '1.0.4',
                next: '1.0.4'
            }, 
            error: getError('invalidMainTag', ['v1.0.0', '1.0.4']),
            commands: [
                `node -p "require('./package.json').name"`,
            ],
        },
        {
            branch: 'next',
            tag: 'v2.0.0',
            previousDistTags: {
                latest: '1.0.4',
                next: '1.0.4'
            }, 
            error: getError('invalidNextTagFormat'),
            commands: [
                `node -p "require('./package.json').name"`,
            ],
        },
        {
            branch: 'next',
            tag: 'v2.0.0-rc.4',
            previousDistTags: {
                latest: '1.0.4',
                next: '2.0.0',
            }, 
            error: getError('invalidNextTag',['v2.0.0-rc.4', '2.0.0']),
            commands: [
                `node -p "require('./package.json').name"`,
            ],
        },
        {
            branch: 'v3',
            tag: 'v3.1.5-rc.4',
            previousDistTags: null, 
            error: getError('invalidLegacyTagFormat'),
            commands: [
                `node -p "require('./package.json').name"`,
            ],
        },
        {
            branch: 'v3',
            tag: 'v4.1.5',
            previousDistTags: {
                latest: '4.1.4',
                next: '4.1.4'
            }, 
            error: getError('invalidLegacyVersion', ['v3', '4']),
            commands: [
                `node -p "require('./package.json').name"`,
            ],
        },
        {
            branch: 'feature-branch',
            tag: 'v4.1.5',
            previousDistTags: null, 
            error: getError('invalidBranchingStrategy', ['feature-branch']),
            commands: [
                `node -p "require('./package.json').name"`,
            ],
        },
        {
            branch: 'main-pseudo',
            tag: 'v4.1.5',
            previousDistTags: null, 
            error: getError('invalidBranchingStrategy', ['main-pseudo']),
            commands: [
                `node -p "require('./package.json').name"`,
            ],
        },
    ])('Negative scenarios', async ({ branch, tag, previousDistTags, commands, error }) => {
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
        await expect(release()).rejects.toEqual(error);
        expect(getCommandStack()).toEqual(commands);
        restoreConsole();
    });
});

