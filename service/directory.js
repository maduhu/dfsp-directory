module.exports = {
    'name.get': function(params) {
        return {
            '00359######': {
                name: '### #### ######',
                account: 'https://####.###/######',
                currency: 'USD'
            }
        }[params.userNumber] || {};
    }
};
