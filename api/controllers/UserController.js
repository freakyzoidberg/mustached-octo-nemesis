/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  authenticate: function(req, res) {
    var email = req.param('email');
    var password = req.param('password');

    if (!email || !password) {
      return res.forbidden({err: 'invalid username or password'});
    }

    User.findOne({
      email : email
    }).exec(function(err, user) {
      if (!user) {
        return res.forbidden({err: 'invalid username or password'});
      }

      User.validPassword(password, user, function(err, match) {
        if (err) {
          return res.forbidden(err);
        }
        if (match) {
          return res.ok({
            user: user,
            token: sailsAuthToken.issueToken({sid: user.id})
            });
        } else {
          return res.forbidden({err: 'invalid username or password'});
        }
      });
    });
  },

  register: function(req, res) {
    //TODO: Do some validation on the input

    User.create(req.params.all()).exec(function(err, user) {
      if (err) {
        res.badRequest(err);
      } else {
        res.ok({user: user, token: sailsAuthToken.issueToken({sid: user.id})})
      }
    });
  }
};
