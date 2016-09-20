var error = require('./error')
var user = {
  name: '### #### ######',
  account: 'https://####.###/######',
  currency: 'TZS'
}
var users = {
  'id:00359######': user
}

function callDb (msg, $meta) {
  $meta.method = 'db/' + $meta.method
  return this.bus.importMethod($meta.method)(msg, $meta)
}

module.exports = {
  'user.add': callDb,
  'user.remove': callDb,
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
        .then((u) => {
          if (u && u.length) {
            return {
              name: u[0].name,
              account: user.account,
              currency: user.currency
            }
          } else {
            throw error.userNotFound()
          }
        })
      }
    } else {
      return this.bus.importMethod('ist/directory.user.get')({
        URI: params.URI
      }, $meta)
    }
  }
}
