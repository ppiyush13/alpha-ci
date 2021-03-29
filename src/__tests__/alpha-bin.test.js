import { getBinPathSync } from 'get-bin-path';
import { mockArgv } from '../test-utils/mock-argv';
import { executeAlpha as executeAlphaMock } from '..';

/** mock release module */
jest.mock('..');

describe('testing alpha bin scripts', () => {
    const binPath = getBinPathSync();

    it('should exercise bin module', async () => {
        /** mocks */
        const mockFn = jest.fn();
        const argvMockRestore = mockArgv();

        /** mock executeAlpha function */
        executeAlphaMock.mockImplementation(() => {
            mockFn('This is mocked and return from alpha/src/index.js');
        });

        /** require bin module */
        await jest.isolateModules(() => import(binPath));

        /**
         * assert that mockFn is called.
         * This ensures that bin is indeed calling executeAlpha function /src/index.js
         * */
        expect(mockFn).toHaveBeenCalledWith('This is mocked and return from alpha/src/index.js');

        /** restore mocks */
        argvMockRestore();
    });
});
