
var carbon = require('carbon-io')
var o      = carbon.atom.o(module).main    // Note the .main here since this is the main application
var __     = carbon.fibers.__(module).main // Note the .main here since this is the main application

__(function() {
  module.exports = o({
    _type: carbon.carbond.Service,
    port: 8888,
    dbUri: 'mongodb://localhost:27017/react_carbon',
    endpoints: {
      contacts: o({
        _type: carbon.carbond.mongodb.MongoDBCollection,
        collection: 'contacts'
      })
    }
  })
})
