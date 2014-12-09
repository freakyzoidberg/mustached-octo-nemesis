var Sails = require('sails');


before(function(done) {
  Sails.lift({
    environment: 'test',
    port: 1337,
    log: {
      level: 'error'
    },
    models: {
      connection: 'memory',
    }
  }, function(err, sails) {
    if (err) return done(err);
    // here you can load fixtures, etc.
    done(err, sails);
  });
});

after(function(done) {
  // here you can clear fixtures, etc.
  sails.lower(done);
});
