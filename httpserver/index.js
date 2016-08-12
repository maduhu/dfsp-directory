var path = require('path');
module.exports = {
    id: 'httpserver',
    createPort: require('ut-port-httpserver'),
    logLevel: 'trace',
    api: ['directory'],
    port: 8003,
    bundle: 'directory',
    dist: path.resolve(__dirname, '../dist'),
    routes: {
        rpc: {
            method: '*',
            path: '/rpc/{method?}',
            config: {
                auth: false
            }
        }
    }
};
