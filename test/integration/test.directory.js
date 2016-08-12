var test = require('ut-run/test');
var joi = require('joi');

test({
    type: 'integration',
    name: 'Directory service',
    steps: function(test, bus, run) {
        run(test, bus, [{
            method: 'directory.user.get',
            params: {
                URI: '00359######'
            },
            result: (result, assert) => {
                assert.equals(joi.validate(result, {
                    name: joi.string().valid('### #### ######'),
                    account: joi.string().valid('https://####.###/######'),
                    currency: joi.string().valid('USD')
                }).error, null, 'return user name, account and currency');
            }
        }]);
    }
});
