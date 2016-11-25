module.exports = {
  ports: [
    require('../db'),
    require('../httpserver'),
    require('../script')
  ],
  modules: {
    directory: require('../service/directory'),
    identity: require('../service/identity')
  },
  validations: {
    directory: require('../service/directory/api')
  }
}
