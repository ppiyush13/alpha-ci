import tmp from 'tmp';

export const setupTestDir = () => {
    const { name: dirName } = tmp.dirSync({
        prefix: 'demo-pkg',
        unsafeCleanup: true,
        discardDescriptor: true,
    });

    return dirName;
};
