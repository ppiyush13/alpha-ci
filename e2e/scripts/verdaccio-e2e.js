import { setup, teardown } from 'jest-dev-server';
import getPort from 'get-port';

/** setup verdaccio */
export const setupVerdaccio = async (preferredPort) => {
    /** get available TCP port */
    const allotedPort = await getPort({ port: preferredPort });

    /** run verdaccio:e2e, listen on alloted port */
    await setup({
        command: `npm run verdaccio:e2e -- -l ${allotedPort}`,
    });

    /** return alloted port */
    return allotedPort;
};

/** teardown verdaccio */
export const teardownVerdaccio = () => (
    teardown()
);
