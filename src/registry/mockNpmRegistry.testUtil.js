import * as dependency from 'registry-url';

jest.mock('registry-url');

export const mockNpmRegistry = mockUrl => {
    dependency.default.mockImplementation(() => mockUrl);
};
