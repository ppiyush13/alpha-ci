import shell from 'shelljs';

/** replace actual fn with mock functions */
const execMock = jest.fn();
shell.exec = execMock;

/** clear mocks after every test case */
afterEach(() => execMock.mockClear());

export const mockShell = (mocks = {}) => {
    execMock.mockImplementation((command) => mocks[command] || '');
    /** getCommandStack function */
    return () => execMock.mock.calls.map((args) => args[0]);
};
