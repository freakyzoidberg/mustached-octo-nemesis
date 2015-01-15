/**
 * BackendController
 *
 * @description :: Server-side logic for managing backends
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
findAll : function(req, res) {
    Backend.find({ user : req.token.sid }).exec(function(err, backends) {
      if (!backends) {
        return res.notAcceptable({err: 'User does not exists'});
      }
      return res.ok({
        backends: backends
      });
    });
  },
create : function(req, res) {
  var backend = {
    'host' : req.param('host'),
    'user' : req.token.sid
  };
  Backend.create(backend).exec(function(err, backend) {
    if (err) {
      res.notAcceptable(err);
    } else {
      res.ok({
        backend: backend
      });
    }
  });
  }
};
