module.exports = {
    ports: [
        require('../httpserver'),
        require('../script')
    ],
    modules: {
        identity: require('../service/identity'),
        directory: require('../service/directory')
    },
    validations: {
        directory: require('../api/directory')
    }
};
