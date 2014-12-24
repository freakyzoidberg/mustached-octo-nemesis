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
      return res.json(401, {err: 'username and password required'});
    }

    User.findOne({
      email : email
    }).exec(function(err, user) {
      if (!user) {
        return res.json(401, {err: 'invalid username or password'});
      }

      bcrypt.compare(password, user.password, function(err, match) {
        if (err) {
          return res.json(403, {err: 'forbidden'});
        }
        if (match) {
          return res.ok({
            user: user,
            token: sailsAuthToken.issueToken({sid: user.id})
            });
        } else {
          return res.json(401, {err: 'invalid username or password'});
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
