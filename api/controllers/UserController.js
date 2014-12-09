/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var passport = require('passport');
module.exports = {


  signup: function(req, res) {
    User.create(req.params.all()).exec(function(err, user) {
      if (err) {
        res.badRequest(err);
      } else {
        res.ok(user);
      }
    });
  },

  passport_local: function(req, res) {
    passport.authenticate('local', function(err, user, info) {
      if (err) {
        res.serverError(err);
        return;
      }
      if (!user) {
        res.badRequest(info);
        return;
      }
      req.logIn(user, function(err) {
        if (err) {
          res.serverError(err);
          return;
        }
        res.ok(user);
        return;
      });
    })(req, res);
  },

  logout: function(req, res) {
    req.logout();
    res.ok({
      redirect: '/'
    })
  },
};
