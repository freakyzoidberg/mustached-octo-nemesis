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
        res.json(err);
      } else {
        res.json(user);
      }
    });
  },

  passport_local: function(req, res) {
    passport.authenticate('local', function(err, user, info) {
      if (err) {
        res.json(500, err);
        return;
      }
      if (!user) {
        res.json(400, info);
        return;
      }
      req.logIn(user, function(err) {
        if (err) {
          res.json(500, err);
          return;
        }
        res.json(200, user);
        return;
      });
    })(req, res);
  },

  logout: function(req, res) {
    req.logout();
    res.json(200, {
      redirect: '/'
    })
  },
};
