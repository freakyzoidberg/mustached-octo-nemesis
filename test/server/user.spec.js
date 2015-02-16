var request = require('supertest');
var chai = require('chai');

chai.should();

describe('UsersModel', function() {

  describe('user API', function(){

    var url = "http://localhost:1337/";
    before(function(done){
      User.destroy().exec(function(err, users) {
        if (err) throw err;
        done();
      });
    });
    it("Start with 0 users", function(done){
      User.find().exec(function(err, users){
        if (err) throw err;
        users.length.should.equal(0);
        done();
      });
    });
    it("Signup with missing fields", function(done){
      var email = {
        'email': 'sample@email.com'
        };
      request(url)
      .post('user/signup')
      .send(email)
      .expect(406, function(err, data) {
        if (err) throw err;
        data.body.should.not.include.key('token');
        User.find().exec(function(err, users){
          if (err) done(err);
          users.length.should.equal(0);
          done();
        });
      });
    });
    it("Signup with small password", function(done){
      var email = {
        'email': 'sample@email.com',
        'password': '12345'
        };
      //Calling rest api with email as a part of req body
      request(url)
      .post('user/signup')
      .send(email)
      .expect(406, function(err, data) {
        if (err) throw err;
        data.body.should.not.include.key('token');
        User.find().exec(function(err, users){
          if (err) throw err;
          users.length.should.equal(0);
          done();
        });
      });
    });
    it("Signup correctly", function(done){
      var email = {
        'email': 'sample@email.com',
        'password': '12345678'
      };
      //Calling rest api with email as a part of req body
      request(url)
      .post('user/signup')
      .send(email)
      .expect(200, function(err, data) {
        if (err) throw err;
        data.body.should.include.key('token');
        User.find().exec(function(err, users){
          if (err) throw err;
          users.length.should.equal(1);
          done();
        });
      });
    });
    it("no double Signup with same email", function(done){
      var email = {
        'email': 'sample@email.com',
        'password': '12345678'
      };
      //Calling rest api with email as a part of req body
      request(url)
      .post('user/signup')
      .send(email)
      .expect(406, function(err, data) {
        if (err) throw err;
        data.body.should.include.key('error');
        User.find().exec(function(err, users){
          if (err) throw err;
          users.length.should.equal(1);
          done();
        });
      });
    });
  });
});
