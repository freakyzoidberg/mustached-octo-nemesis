/**
 * FrontController
 *
 * @description :: Dummy Server-side logic for managing main page
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var passport = require('passport');
module.exports = {
  index: function(req, res){
    res.view(); // sending the view in /views/{controller_name}/index.ejs
    return;
  }
};
