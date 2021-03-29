/*
    eslint-disable import/no-dynamic-require, global-require
*/

import { getBinPathSync } from 'get-bin-path';
import { mockProcessExit } from 'jest-mock-process';
import nextTick from 'tick-promise';
import { mockArgv } from '../testUtils/mockArgv';
import { release as releaseMock } from '../release';
import { error as logErrorMock } from '../logger';

/** mock release module */
jest.mock('../release');

describe('testing alpha bin scripts', () => {
    const binPath = getBinPathSync();

    it('should execute executeAlpha function of index.js', async () => {
        /** mocks */
        const argvMockRestore = mockArgv();
        const exitMock = mockProcessExit();
        releaseMock.mockResolvedValueOnce(5);

        /** require bin module in isolation */
        jest.isolateModules(() => {
            require(binPath);
        });

        /** wait for next tick */
        await nextTick();

        /** assert */
        expect(exitMock).toHaveBeenCalledTimes(1);
        expect(exitMock).toHaveBeenCalledWith(0);

        /** restore mock */
        argvMockRestore();
        exitMock.mockRestore();
    });

    it('should throw error, if executeAlpha throws', async () => {
        /** mocks */
        const argvMockRestore = mockArgv();
        const exitMock = mockProcessExit();
        const err = new Error('Release error');
        releaseMock.mockRejectedValue(err);

        /** require bin module in isolation */
        jest.isolateModules(() => {
            require(binPath);
        });

        /** wait for next tick */
        await nextTick();

        /** assert */
        expect(exitMock).toHaveBeenCalledTimes(1);
        expect(exitMock).toHaveBeenCalledWith(1);
        expect(logErrorMock).toHaveBeenCalledWith(new Error('Release error'));

        /** restore mock */
        argvMockRestore();
        exitMock.mockRestore();
    });
});
