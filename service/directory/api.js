var joi = require('joi')
module.exports = {
  'user.get': {
    // tags: ['tag1', 'tag2'],
    description: 'Lookup name, default account and currency of end user, given the end user number',
    notes: 'When the central directory service is asked to return information about the user (user.lookup API on the top level architect diagram), first it will check internally and find the URL of the default DFSP of the user, then it will send a call to this DFSP getting the information about the name of the user, default currency of the user and default account of the user (ILP address) and finally will return this information as a response to user.lookup API request.',
    auth: false,
    params: joi.object({
      actorId: joi.string().default('1000'),
      userNumber: joi.string().default('1')
    }),
    result: joi.object({
      name: joi.string().required(),
      account: joi.string(),
      currency: joi.string(),
      actorId: joi.number(),
      endUserNumber: joi.string(),
      spspServer: joi.string()
    })
  },
  'user.fetch': {
    // tags: ['tag1', 'tag2'],
    description: '',
    notes: '',
    auth: false,
    params: joi.any(),
    result: joi.any()
  },
  'user.add': {
    // tags: ['tag1', 'tag2'],
    description: '',
    notes: '',
    auth: false,
    params: joi.any(),
    result: joi.any()
  },
  'user.remove': {
    // tags: ['tag1', 'tag2'],
    description: '',
    notes: '',
    auth: false,
    params: joi.any(),
    result: joi.any()
  }
}
