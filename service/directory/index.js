var error = require('./error')
const users = {
  'id:00359######': {
    name: '### #### ######',
    account: 'https://####.###/######',
    currency: 'USD'
  }
}

module.exports = {
  'user.get': function (params, $meta) {
    if (typeof params.URI === 'string' && params.URI.startsWith('id:')) {
      if (this.config.mock) {
        var result = users[params && params.URI]
        if (result) {
          return result
        } else {
          throw error.userNotFound()
        }
      } else {
        return this.bus.importMethod('db/directory.user.get')({
          userNumber: params.URI.substr(3)
        }, $meta)
      }
    } else {
      return this.bus.importMethod('ist/directory.user.get')({
        URI: params.URI
      }, $meta)
    }
  }
}
