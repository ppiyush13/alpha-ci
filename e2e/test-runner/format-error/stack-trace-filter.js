import { nodeInternals } from 'stack-utils';

export default [
    ...nodeInternals(),
    /^\s+at(?:(?:.jasmine\-)|\s+jasmine\.buildExpectationResult)/,
    /^\s+at.*?jest(-.*?)?(\/|\\)(build|node_modules|packages)(\/|\\)/,
    /^\s+at.*?test-runner/,
    /(\/|\\)node_modules(\/|\\)/,
    /^\s+at <anonymous>.*$/,
    /^\s+at (new )?Promise \(<anonymous>\).*$/,
    /^\s+at Generator.next \(<anonymous>\).*$/,
    /^\s+at next \(native\).*$/,
];
