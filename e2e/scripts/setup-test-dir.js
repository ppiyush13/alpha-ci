import tmp from 'tmp';
import exitHook from 'exit-hook';
import shell from 'shelljs';

export const setupTestDir = () => {
    const { name, removeCallback } = tmp.dirSync({ 
        prefix: 'demo-pkg', 
        unsafeCleanup: true, 
        discardDescriptor: true 
    });
    debugger
    exitHook(() => {
        //shell.cd('..');
        removeCallback();
        //shell.rm('-rf', name);
    });

    return name;
};
