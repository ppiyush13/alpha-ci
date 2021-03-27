

export const mockArgv = (mockedArgs = []) => {

    const oldArgv = process.argv;
    process.argv = [...oldArgv.slice(0, 2), ...mockedArgs];

    return () => {
        process.argv = oldArgv;
    };
};
