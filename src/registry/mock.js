import * as dependency from 'registry-url';

jest.mock('registry-url');

export const mockRegistry = mockUrl => {
    dependency.default.mockImplementation(() => mockUrl);
};
