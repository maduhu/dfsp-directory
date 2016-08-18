var errors = require('ut-error')

module.exports = {
  id: 'ist',
  createPort: require('ut-port-http'),
  url: 'http://localhost:8003/rpc/',
  namespace: ['ist/directory'],
  raw: {
    json: true,
    jar: true,
    strictSSL: false
  },
  parseResponse: false,
  requestTimeout: 300000,
  method: 'post',
  'directory.user.get.request.send': function (msg) {
    return {
      uri: 'directory.user.get',
      payload: {URI: 'id:' + msg.URI}
    }
  },
  'directory.user.get.response.receive': function (msg) {
    var error
    if (msg && msg.payload && msg.payload.error) {
      var type = errors.get(msg.payload.error.type)
      if (type) {
        error = type(msg.payload.error)
      } else {
        error = new Error('Unknown error')
        error.type = 'directory.unknown'
      }
      throw error
    } else if (msg && msg.payload && msg.payload.result) {
      return msg.payload.result
    } else {
      error = new Error('Invalid response from central directory')
      error.type = 'directory.invalid'
      throw error
    }
  }
}
