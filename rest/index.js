var errors = require('./errors')

module.exports = {
  id: 'ist',
  createPort: require('ut-port-http'),
  url: 'http://ec2-35-163-231-111.us-west-2.compute.amazonaws.com:8088/directory/v1/user',
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
    if (msg.URI === '00359######') { // keep the mock
      return {
        url: 'http://localhost:8011/rpc/',
        uri: 'directory.user.get',
        payload: {URI: 'id:' + msg.URI}
      }
    }
    return {
      uri: '/get',
      payload: {
        id: '1',
        jsonrpc: '2.0',
        method: 'directory.user.get',
        params: {
          userURI: msg.URI
        }
      }
    }
  },
  'directory.user.add.request.send': function (msg) {
    return {
      uri: '/add',
      payload: {
        id: '1',
        jsonrpc: '2.0',
        method: 'directory.user.add',
        params: msg
      }
    }
  },
  'receive': function (msg, $meta) {
    if ($meta.mtid === 'error') {
      return msg
    }
    if (msg && msg.payload) {
      if (msg.payload.result) {
        return msg.payload.result
      } else if (msg.payload.error) {
        throw msg.payload.error
      }
      throw errors.wrongJsonRpcFormat(msg)
    }
    throw errors.generic(msg)
  }
}
