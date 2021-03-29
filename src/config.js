import { env } from 'process';

const result = {
    configs: {},
};

export const initConfigs = () => {
    result.configs = {
        branchName: env.BRANCH_NAME.toLocaleLowerCase(),
        tagName: env.TAG_NAME.toLocaleLowerCase(),
    };
};

export const getConfigs = () => result.configs;
