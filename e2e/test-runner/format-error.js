import StackUtils from 'stack-utils';
import stackTraceFilter from './stack-trace-filter';
import { codeFrameColumns } from '@babel/code-frame';
import { readFileSync } from 'fs';
import {  resolve } from 'path';
import chalk from 'chalk';

export const formatError = (error) => {
    try {
        const cwd = process.cwd();
        const stackUtils = new StackUtils({
            cwd, 
            internals: stackTraceFilter,
        });

        const cleanTrace = stackUtils.clean(error.stack);
        const topFrame = cleanTrace.split('\n')[1].trim();
        const { file, line, column } = stackUtils.parseLine(topFrame);
        const fileFullPath = resolve(cwd, file);
        const fileContent = readFileSync(fileFullPath, 'utf8');
        const errorCodeFrame = codeFrameColumns(fileContent, 
            { start: { line, column } }, 
            {  highlightCode: true },
        );

        return `\n${errorCodeFrame}\n\n${chalk.bold.red(error.stack)}`;
    }
    catch(ex) {
        console.log('Encountered error in formatError module', ex);
    }
};
