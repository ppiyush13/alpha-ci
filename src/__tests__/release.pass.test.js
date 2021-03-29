import mockedEnv from 'mocked-env';
import { mockShell } from '../testUtils/mockShell';
import { mockFetchDistTags } from '../testUtils/mockFetchDistTags';
import { release } from '../release';

describe('testing branching strategy', () => {
    it.each([
        {
            branch: 'main',
            tag: 'v1.0.0',
            previousDistTags: null,
            commands: [
                'npm version v1.0.0',
                'npm publish --tag latest',
                'npm dist-tag add demo-package@1.0.0 next',
            ],
        },
        {
            branch: 'main',
            tag: 'v1.0.0',
            previousDistTags: {
                latest: '1.0.0-rc.5',
            },
            commands: [

                'npm version v1.0.0',
                'npm publish --tag latest',

                'npm dist-tag add demo-package@1.0.0 next',
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

                'npm version v2.5.1',
                'npm publish --tag latest',

                'npm dist-tag add demo-package@2.5.1 next',
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

                'npm version v3.0.0',
                'npm publish --tag latest',

                'npm dist-tag add demo-package@3.0.0 next',
                'npm dist-tag add demo-package@2.5.1 latest-2',
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

                'npm version v3.5.2',
                'npm publish --tag latest',
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

                'npm version v5.0.0',
                'npm publish --tag latest',

                'npm dist-tag add demo-package@5.0.0 next',
                'npm dist-tag add demo-package@4.0.8 latest-4',
            ],
        },
        {
            branch: 'main',
            tag: 'v5.0.1',
            previousDistTags: {
                latest: '5.0.0',
                next: '5.0.0-rc.2',
            },
            commands: [

                'npm version v5.0.1',
                'npm publish --tag latest',

                'npm dist-tag add demo-package@5.0.1 next',
            ],
        },
        {
            branch: 'next',
            tag: 'v3.0.0-rc.0',
            previousDistTags: {
                latest: '2.5.1',
                next: '2.5.1',
            },
            commands: [

                'npm version v3.0.0-rc.0',
                'npm publish --tag next',
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

                'npm version v1.0.19',
                'npm publish --tag latest-1',
            ],
        },
        {
            branch: 'next',
            tag: 'v2.0.0-rc.0',
            previousDistTags: {
                latest: '1.0.19',
            },
            commands: [

                'npm version v2.0.0-rc.0',
                'npm publish --tag next',
            ],
        },
    ])('Positive scenarios', async ({
        branch, tag, previousDistTags, commands,
    }) => {
        /** mock */
        mockFetchDistTags(previousDistTags);
        const getCommandStack = mockShell();
        const restoreEnv = mockedEnv({
            BRANCH_NAME: branch,
            TAG_NAME: tag,
        });

        /** trigger release */
        await release();

        /** assert exact commands executed with sequence  */
        expect(getCommandStack()).toEqual(commands);

        /** restore mocks */
        restoreEnv();
    });
});
