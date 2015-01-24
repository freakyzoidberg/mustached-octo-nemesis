var request = require('supertest');
var chai = require('chai');

chai.should();

describe('BackendModel', function() {

  describe('user API', function(){

    var url = "http://localhost:1337/";
    before(function(done){
      User.destroy().exec(function(err, users) {
        if (err) throw err;
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
    });
    it("Start with 1 user", function(done){
      User.find().exec(function(err, users){
        if (err) throw err;
        users.length.should.equal(1);
        done();
      });
    });
  });
});
