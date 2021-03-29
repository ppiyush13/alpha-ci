import mockedEnv from 'mocked-env';
import { mockShell } from '../testUtils/mockShell';
import { mockFetchDistTags } from '../testUtils/mockFetchDistTags';
import { executeAlpha } from '..';

describe('testing branching and tag strategy', () => {
    it.each([
        {
            branch: 'v1',
            tag: 'v1.0.0',
            previousDistTags: null,
            error: 'First release must be published from main/master branch, but found legacy branch v1',
        },
        {
            branch: 'next',
            tag: 'v1.0.0-rc.0',
            previousDistTags: null,
            error: 'First release must be published from main/master branch, but found branch next',
        },
        {
            branch: 'main',
            tag: 'v1.0.0-rc.4',
            previousDistTags: null,
            error: 'main/master branch can only have tags in format vx.x.x but found tag v1.0.0-rc.4',
        },
        {
            branch: 'main',
            tag: 'v1.0.0',
            previousDistTags: {
                latest: '1.0.4',
                next: '1.0.4',
            },
            error: 'main/master branch tag v1.0.0 should be greater than published package latest version 1.0.4',
        },
        {
            branch: 'next',
            tag: 'v2.0.0',
            previousDistTags: {
                latest: '1.0.4',
                next: '1.0.4',
            },
            error: 'next branch can only have tags in format vx.x.x-rc.x but found tag v2.0.0',
        },
        {
            branch: 'next',
            tag: 'v2.0.0-rc.4',
            previousDistTags: {
                latest: '1.0.4',
                next: '2.0.0',
            },
            error: 'Next branch tag v2.0.0-rc.4 should be greater than published next package version 2.0.0',
        },
        {
            branch: 'v3',
            tag: 'v3.1.5-rc.4',
            previousDistTags: null,
            error: 'Legacy branch can only have tags in format vx.x.x but found tag v3.1.5-rc.4',
        },
        {
            branch: 'v3',
            tag: 'v4.1.5',
            previousDistTags: {
                latest: '4.1.4',
                next: '4.1.4',
            },
            error: 'Legacy branch v3 cannot have tags with version v4.1.5',
        },
        {
            branch: 'feature-branch',
            tag: 'v4.1.5',
            previousDistTags: null,
            error: 'Branch feature-branch does not meet any branching format',
        },
        {
            branch: 'main-pseudo',
            tag: 'v4.1.5',
            previousDistTags: null,
            error: 'Branch main-pseudo does not meet any branching format',
        },
        {
            branch: 'main',
            tag: 'v3.0.0',
            previousDistTags: {
                latest: 'v1.2.0',
            },
            error: 'main/master branch tag v3.0.0 should have major version equal or greater than one of published package latest version v1.2.0',
        },
        {
            branch: 'next',
            tag: 'v4.0.0-rc.0',
            previousDistTags: {
                latest: 'v1.2.0',
                next: 'v1.2.0',
            },
            error: 'For next branch, major version after latest release v1.2.0 should be incremented by 1, but found v4.0.0-rc.0',
        },
        {
            branch: 'main',
            tag: 'v1.3.6',
            previousDistTags: {
                latest: '1.4.0',
            },
            error: 'main/master branch tag v1.3.6 should be greater than published package latest version 1.4.0',
        },
        {
            branch: 'next',
            tag: 'v2.0.0-rc.5',
            previousDistTags: {
                latest: 'v2.0.0-rc.9',
            },
            error: 'For next branch, major version after latest release v2.0.0-rc.9 should be incremented by 1, but found v2.0.0-rc.5',
        },
        {
            branch: 'next',
            tag: 'v2.0.0-rc.5',
            previousDistTags: {
                latest: 'v1.3.0',
                next: 'v2.0.0-rc.9',
            },
            error: 'Next branch tag v2.0.0-rc.5 should be greater than published next package version v2.0.0-rc.9',
        },
        {
            branch: 'v1',
            tag: 'v1.2.0',
            previousDistTags: {
                latest: 'v2.1.0',
                'latest-1': 'v1.2.5',
            },
            error: 'Legacy branch tag v1.2.0 must be greater than latest v1 published version v1.2.5',
        },
        {
            branch: 'v9',
            tag: 'v9.0.1',
            previousDistTags: {
                latest: '4.2.9',
                next: '5.0.0-rc.4',
            },
            error: 'Legacy branch tag v9.0.1 should be lesser than published latest package version 4.2.9',
        },
        {
            branch: 'next',
            tag: 'v1.3.6-rc.0',
            previousDistTags: {
                latest: '1.3.0',
                next: '1.3.0',
            },
            error: 'For next branch, major version after latest release 1.3.0 should be incremented by 1, but found v1.3.6-rc.0',
        },
        {
            branch: 'next',
            tag: 'v1.3.6-rc.0',
            previousDistTags: {
                latest: '1.3.0',
            },
            error: 'For next branch, major version after latest release 1.3.0 should be incremented by 1, but found v1.3.6-rc.0',
        },
        {
            branch: 'v1',
            tag: 'v1.2.5',
            previousDistTags: {
                latest: '1.3.0',
            },
            error: 'Legacy branch v1 should be tracking versions lesser than current latest version 1.3.0',
        },
    ])('must throw error for %p', async ({
        branch, tag, previousDistTags, error,
    }) => {
        /** mocks */
        mockFetchDistTags(previousDistTags);
        const getCommandStack = mockShell();
        const restoreEnv = mockedEnv({
            BRANCH_NAME: branch,
            TAG_NAME: tag,
        });

        /** trigger release */
        await expect(executeAlpha()).rejects.toThrow(error);

        /** assert exact commands executed with sequence  */
        expect(getCommandStack()).toEqual([]);

        /** restore mocks */
        restoreEnv();
    });
});
