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
    return msg.payload.result
  }
}
