// var errors = require('./errors')

module.exports = {
  id: 'ist',
  createPort: require('ut-port-http'),
  headers: {
    Authorization: 'Basic ' + new Buffer('dfsp1' + ':' + 'dfsp1').toString('base64')
  },
  url: 'http://ec2-35-163-231-111.us-west-2.compute.amazonaws.com:8088/directory/v1',
  namespace: ['ist/directory'],
  raw: {
    json: true,
    jar: true,
    strictSSL: false
  },
  parseResponse: false,
  requestTimeout: 300000,
  method: 'post',
  'directory.user.add.request.send': function (msg) {
    return {
      uri: '/user-registration/users',
      payload: msg
    }
  },
  'directory.user.add.response.receive': function (msg) {
    return msg.payload
  }
}
