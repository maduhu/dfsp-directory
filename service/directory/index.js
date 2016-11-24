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
  'user.remove': callDb,
  'user.add': function(params, $meta) {
    return this.bus.importMethod('ist/directory.user.add')({
      url: 'http://localhost:8010'
    }, $meta)
    .then((res) => {
      return this.bus.importMethod('db/directory.user.add')({
        userNumber: res.number,
        name: params.name
      }, $meta)
    })
  },
  'user.get': function (params, $meta) {
    return this.bus.importMethod('db/directory.user.get')(params, $meta)
  }
}
