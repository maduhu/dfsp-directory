var create = require('ut-error').define

var RPC = create('Directory')
var UserNotFound = create('UserNotFound', RPC)
var defaultErrorCode = 400

module.exports = {
  directory: function (cause) {
    return new RPC(cause)
  },
  userNotFound: function (params) {
    return new UserNotFound({
      message: 'User not found',
      params: params
    })
  },
  error: [
    {
      type: 'directory',
      message: 'directory error'
    },
    {
      id: 'NotUniqueCombinationIdentifierTypeCodeIdentifier',
      type: 'directory.notUniqueCombinationIdentifierTypeCodeIdentifier',
      message: 'There is already registered user with this identifier!',
      statusCode: 422
    }
  ].reduce((exporting, error) => {
    var typePath = error.type.split('.')
    var Ctor = create(typePath.pop(), typePath.join('.'), error.message)
    /**
     * Exceptions thrown from the db procedures will not execute this function
     * It will only be executed if an error is throw from JS
     */
    exporting[error.type] = function (params) {
      return new Ctor({
        isJsError: true,
        params: params,
        statusCode: error.statusCode || defaultErrorCode,
        id: error.id || error.type
      })
    }
    return exporting
  }, {})
}
