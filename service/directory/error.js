var create = require('ut-error').define

var RPC = create('Directory')
var UserNotFound = create('UserNotFound', RPC)

module.exports = {
  directory: function (cause) {
    return new RPC(cause)
  },
  userNotFound: function (params) {
    return new UserNotFound({
      message: 'User not found',
      params: params
    })
  }
}
