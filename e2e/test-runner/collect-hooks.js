
const lifeCycleCbs = {
    steps: [],
    setup: async () => {},
    tear: async () => {},
};

export const setup = cb => lifeCycleCbs.setup = cb;
export const tear = cb => lifeCycleCbs.tear = cb;
const step = (desc, cb) => {
    lifeCycleCbs.steps.push({ desc, cb });
}; 

export const collectHooks = testCallback => {
    testCallback({ step, setup, tear });

    return { ...lifeCycleCbs };
};
