import tmp from 'tmp';
import exitHook from 'exit-hook';
import shell from 'shelljs';

export const setupTestDir = () => {
    const { name, removeCallback } = tmp.dirSync({ 
        prefix: 'demo-pkg', 
        unsafeCleanup: true, 
        discardDescriptor: true 
    });

    exitHook(() => {
        shell.cd('/');
        removeCallback();
    });

    return name;
};
