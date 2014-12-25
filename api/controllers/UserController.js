/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  me: function(req, res) {
    return res.json({});
  },

  authenticate: function(req, res) {
    var email = req.param('email');
    var password = req.param('password');

    if (!email || !password) {
      return res.notAcceptable({err: 'invalid username or password'});
    }

    User.findOne({
      email : email
    }).exec(function(err, user) {
      if (!user) {
        return res.notAcceptable({err: 'invalid username or password'});
      }

      User.validPassword(password, user, function(err, match) {
        if (err) {
          return res.notAcceptable(err);
        }
        if (match) {
          return res.ok({
            user: user,
            token: sailsAuthToken.issueToken({sid: user.id})
            });
        } else {
          return res.notAcceptable({err: 'invalid username or password'});
        }
      });
    });
  },

  register: function(req, res) {
    //TODO: Do some validation on the input

    User.create(req.params.all()).exec(function(err, user) {
      if (err) {
        res.notAcceptable(err);
      } else {
        res.ok({user: user, token: sailsAuthToken.issueToken({sid: user.id})})
      }
    });
  }
};
