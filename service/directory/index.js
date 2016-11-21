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
    if (params.URI === '00359######') { // keep the mock
      params.URI = 'id:' + params.URI
    }
    if (typeof params.URI === 'string' && params.URI.startsWith('actor:')) {
      return this.bus.importMethod('db/directory.user.get')({
        actorId: params.URI.split(':').pop()
      }, $meta)
    } else if (typeof params.URI === 'string' && params.URI.startsWith('id:')) {
      if (this.config.mock) {
        var result = users[params && params.URI]
        if (result) {
          return result
        } else {
          throw error.userNotFound()
        }
      } else {
        return this.bus.importMethod('db/directory.user.get')({
          userNumber: params.URI.split(':').pop()
        }, $meta)
        .then((u) => {
          if (u && u.name) {
            return {
              name: u.name,
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
