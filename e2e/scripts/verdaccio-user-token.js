import { Buffer } from 'buffer';
import verdaccioE2eConfig from '../verdaccio-configs/config-e2e.json';

/** get test user auth token using legacy token format */
export const getTestUserAuthToken = () => {
    /** retrieve test username and password */
    const { name, password } = verdaccioE2eConfig.auth['auth-memory'].users.alpha;

    /** return base64 format of <userName>:<password> */
    return Buffer
        .from(`${name}:${password}`)
        .toString('base64');
};
