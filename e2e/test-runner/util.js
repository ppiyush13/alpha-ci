import prettyMs from 'pretty-ms';

export const executionTime = () => {
    const start = Date.now();
    return () => {
        const totalTime = Date.now() - start;
        return prettyMs(totalTime, { secondsDecimalDigits: 3 });
    };
};
