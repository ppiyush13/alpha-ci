import StackUtils from 'stack-utils';
import stackTraceFilter from './stack-trace-filter';
import { codeFrameColumns } from '@babel/code-frame';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import chalk from 'chalk';
import indent from 'indent-string';

export const formatError = error => {
    try {
        const { topFrame, trace } = formatStack(error.stack);
        const errorCodeFrame = getCodeFrame(topFrame);

        const errorMessage = chalk.bold.cyan(error.message);
        const errorTrace = indent(chalk.bold.red(trace), 2);
        return `\n${errorCodeFrame}\n\n${errorMessage}\n${errorTrace}`;
    }
    catch(ex) {
        console.log('Encountered error in formatError module', ex);
    }
};

const formatStack = stack => {
    const stackUtils = new StackUtils({
        cwd: process.cwd(), 
        internals: stackTraceFilter,
    });
    const traceLineRegEx = /(^\s*at .*?\(?)([^()]+)(:[0-9]+:[0-9]+\)?.*$)/;
    const lines = stack.split('\n');

    const traceLineList = lines
        .map(str => traceLineRegEx.test(str) && str)
        .filter(Boolean);

    return {
        topFrame: stackUtils.parseLine(traceLineList[0]),
        trace: stackUtils.clean(traceLineList),
    };
};

const getCodeFrame = ({ file, line, column }) => {
    const fileFullPath = resolve(process.cwd(), file);
    const fileContent = readFileSync(fileFullPath, 'utf8');
    return codeFrameColumns(fileContent, 
        { start: { line, column } }, 
        {  highlightCode: true },
    );
};