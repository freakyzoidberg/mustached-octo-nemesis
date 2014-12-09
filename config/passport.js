var passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;
bcrypt = require('bcrypt');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOneById(id).exec(function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  function(email, password, done) {
    console.log("look for", email);
    User.findOne({
      email: email
    }).exec(function(err, user) {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(err, null, {
          message: 'Unknown user ' + email
        });
      }
      bcrypt.compare(password, user.password, function(err, match) {
        if (err) {
          return done(err);
        }
        if (match) {
          return done(err, user);
        } else {
          return done(err, null, {
            message: 'Invalid password'
          });
        }
      });
    });
  }
));
