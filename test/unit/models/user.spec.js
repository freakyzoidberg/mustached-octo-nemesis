var should = require('chai').should()

describe('UsersModel', function() {

  describe('#find()', function() {
    it('should check find function', function(done) {
      User.find()
        .then(function(results) {
          // some tests
          done();
        })
        .catch(done);
    });
  });

  describe('Password', function() {
    it('password at least 6 char long', function(done) {
      User.create({
          "email": "test@test.com",
          "password": "12345"
        })
        .exec(function(err, user) {
          should.exist(err);
          "minLength".should.equal(err.invalidAttributes.password[0].rule);
          done();
        })
    });
    it('password is hashed', function(done) {
      User.create({
        "email": "test@test.com",
        "password": "123456"
      })
      .exec(function(err, user) {
        should.not.exist(err);
        user.password.should.not.equal("123456");
        done();
      })
    });
    it('Users are unique by email', function(done) {
      User.create({
        "email": "test@test.com",
        "password": "dummydumy"
      })
      .exec(function(err, user) {
        should.not.exist(user);
        should.exist(err);
        "unique".should.equal(err.invalidAttributes.email[0].rule);
        User.find().exec(function(err, users) {
          users.length.should.equal(1);
          done();
        });
      })
    });
  });
});
