var test = require('ut-run/test')
var joi = require('joi')
const remoteURI = 'http://centraldirectory.com/griffin'
const localURI = '00359######'

test({
  type: 'integration',
  name: 'Directory service',
  client: require('../client'),
  clientConfig: require('../client/test'),
  steps: function (test, bus, run) {
    run(test, bus, [{
      name: 'Get existing user from remote',
      method: 'directory.user.get',
      params: {
        URI: remoteURI
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, {
          name: joi.string().valid('### #### ######').required(),
          account: joi.string().valid('https://####.###/######').required(),
          currency: joi.string().valid('TZS').required()
        }).error, null, 'return user name, account and currency')
      }
    }, {
      name: 'Get existing user from local',
      method: 'directory.user.get',
      params: {
        URI: localURI
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, {
          name: joi.string().valid('### #### ######').required(),
          account: joi.string().valid('https://####.###/######').required(),
          currency: joi.string().valid('TZS').required()
        }).error, null, 'return user name, account and currency')
      }
    }, {
      name: 'Get non existing user',
      method: 'directory.user.get',
      params: {
        URI: 'nonexisting'
      },
      error: (error, assert) => {
        assert.equals(joi.validate(error, joi.object().keys({
          code: joi.number().required(),
          errorPrint: joi.string(),
          message: joi.string().required()
          // type: joi.valid('Directory.UserNotFound').required()
        }).required()).error, null, 'return code and type of the failure')
      }
    }, {
      name: 'Get without user',
      method: 'directory.user.get',
      params: {
      },
      error: (error, assert) => {
        assert.equals(joi.validate(error, joi.object().keys({
          code: joi.number().required(),
          errorPrint: joi.string().required(),
          message: joi.string().required(),
          type: joi.valid('PortHTTP').required() // todo should be Directory.UserNotFound
        }).required()).error, null, 'return code and type of the failure')
      }
    }, {
      name: 'Get with null user',
      method: 'directory.user.get',
      params: {
        URI: null
      },
      error: (error, assert) => {
        assert.equals(joi.validate(error, joi.object().keys({
          code: joi.number().required(),
          errorPrint: joi.string().required(),
          message: joi.string().required(),
          type: joi.valid('PortHTTP').required() // todo should be Directory.UserNotFound
        }).required()).error, null, 'return code and type of the failure')
      }
    }, {
      name: 'Get with id:uri',
      method: 'directory.user.get',
      params: {
        URI: 'id:' + localURI
      },
      result: (result, assert) => {
        assert.equals(joi.validate(result, {
          name: joi.string().valid('### #### ######').required(),
          account: joi.string().valid('https://####.###/######').required(),
          currency: joi.string().valid('TZS').required()
        }).error, null, 'return user name, account and currency')
      }
    }])
  }
})
