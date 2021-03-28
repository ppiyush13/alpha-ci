import NpmClient from 'npm-registry-client';

/** create npm-client instance */
const npmClient = new NpmClient({  });

export const addNpmUser = (registry, auth) => new Promise((resolve, reject) => {
    
    /** prepare params */
    const params = { auth };

    /** trigger add-user call */
    npmClient.adduser(registry, params, (err, data) => {
        if(err) reject(err);
        else resolve(data);
    });
});
