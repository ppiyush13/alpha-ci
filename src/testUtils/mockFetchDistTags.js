import nock from 'nock';
import getRegistryUrlMock from 'registry-url';

/** mock npm-registry */
jest.mock('registry-url');
getRegistryUrlMock.mockReturnValue('http://npm-registry-url');

/** disable net so all the un-mocked calls throw error */
nock.disableNetConnect();

/** clear nock mocks after every test case */
afterEach(() => nock.cleanAll());

export const mockFetchDistTags = (previousDistTags) => {
    /** if dist-tags exists resolve with 200 and dist-tags otherwise resolve with 404 */
    const response = previousDistTags
        ? [ 200, { ...previousDistTags } ]
        : [ 404, { error: 'Not found' } ];

    nock('http://npm-registry-url/-/')
        .get('/package/demo-package/dist-tags')
        .reply(...response);
};
