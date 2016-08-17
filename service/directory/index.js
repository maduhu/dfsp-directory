var error = require('./error')
const users = {
  '00359######': {
    name: '### #### ######',
    account: 'https://####.###/######',
    currency: 'USD'
  }
}

module.exports = {
  'user.get': function (params, $meta) {
    if (this.config.mock) {
      var result = users[params && params.URI]
      if (result) {
        return result
      } else {
        throw error.userNotFound()
      }
    } else {
      return this.bus.importMethod('db/directory.user.get')({userNumber: params.URI}, $meta)
    }
  }
}
