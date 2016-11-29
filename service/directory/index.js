var path = require('path')
var error = require('./error')
module.exports = {
  schema: [{
    path: path.join(__dirname, 'schema'),
    linkSP: true
  }],
  'user.get.response.receive': function(msg, $meta) {
    if (Array.isArray(msg) && !msg.length) {
      throw error.userNotFound()
    }
    return msg
  }
}
