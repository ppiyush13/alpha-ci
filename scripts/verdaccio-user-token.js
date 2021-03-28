import  verdaccioE2eConfig from '../verdaccio-configs/e2e.config.json';

export const getTestUserAuthToken = () => {
    const { name, password } = verdaccioE2eConfig['auth']['auth-memory']['users']['volte'];

    return Buffer
        .from(`${name}:${password}`)
        .toString('base64');

};
