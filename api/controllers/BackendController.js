/**
 * BackendController
 *
 * @description :: Server-side logic for managing backends
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
  _config: { actions: false, rest: true, shortcuts: false },
  find : function(req, res) {
    Backend.find()
    .where({ user: req.token.sid })
    .exec(function(err, backends) {
      if (err) {
        return res.notAcceptable({err: 'Backend does not exists'});
      }
      return res.ok({
        backends: backends
      });
    });
  },
  findOne : function(req, res) {
    Backend.findOne()
    .where({ user: req.token.sid})
    .where({ id: req.param('id')})
    .exec(function(err, backend) {
      if (err) {
        return res.notAcceptable({err: 'Backend does not exists'});
      }
      return res.ok({
        backend: backend
      });
    });
  },
  update : function(req, res) {
    Backend.findOne()
    .where({ user: req.token.sid})
    .where({ id: req.param('id')})
    .exec(function(err, backend) {
      if (err) {
        return res.notAcceptable({err: 'Backend does not exists' + req.id});
      }
      backend.host = req.param('host');
      backend.save(function(err, backend) {
        if (err) {
          return res.notAcceptable({err: 'Backend not updated'});
        }
        return res.ok({
          backend: backend
        });
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
