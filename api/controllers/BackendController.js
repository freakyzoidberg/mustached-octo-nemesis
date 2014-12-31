/**
 * BackendController
 *
 * @description :: Server-side logic for managing backends
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
findAll : function(req, res) {
    Backend.find().exec(function(err, backends) {
      if (!backends) {
        return res.notAcceptable({err: 'User does not exists'});
      }
      return res.ok({
        backends: backends
      });
    });
  }
};
