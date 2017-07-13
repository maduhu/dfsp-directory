var path = require('path')
module.exports = {
  id: 'httpserver',
  createPort: require('ut-port-httpserver'),
  logLevel: 'trace',
  log: {
    transform: {
      payee: 'hide',
      name: 'hide',
      firstName: 'hide',
      lastName: 'hide',
      nationalId: 'hide',
      dob: 'hide'
    }
  },
  api: ['directory'],
  imports: ['directory.start'],
  port: 8011,
  allowXFF: true,
  disableXsrf: {
    http: true,
    ws: true
  },
  bundle: 'directory',
  dist: path.resolve(__dirname, '../dist'),
  routes: {
    rpc: {
      method: '*',
      path: '/rpc/{method?}',
      config: {
        app: {
          skipIdentityCheck: true
        },
        tags: ['rpc'],
        auth: false
      }
    }
  }
}
