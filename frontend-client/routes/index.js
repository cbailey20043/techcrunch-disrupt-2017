var express = require('express');
var router = express.Router();
var request = require('request')
var fs = require('fs');
var passport = require('passport')
var session = require('express-session');

var mongoose = require('mongoose');
var passport = require('passport');

var	 flash    = require('connect-flash');

var configDB = require('../config/database.js');
mongoose.connect(configDB.url);
require('../config/passport')(passport); // pass passport for configuration

module.exports = router;

// required for passport
router.use(session({ secret: 'ijustdontgetthisshitandiamnotkidding' })); // session secret
router.use(passport.initialize());
router.use(passport.session()); // persistent login sessions
router.use(flash()); // use connect-flash for flash messages stored in session

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

// process the login form
router.post('/', passport.authenticate('local-login', {
    successRedirect : '/profile', // redirect to the secure profile section
    failureRedirect : '/', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}));

router.get('/about',function(req,res){
    res.render('about',{title:'About'});
});

router.get('/contact',function(req,res){
    res.render('contact',{title:'Contact Us'});
})
router.get('/profile',function(req,res){
    res.render('profile',{title:'home page',user:req.user})
});

router.get('/newUserData',function(req,res){
    res.render('newUserData',{title: 'Create New User'
    });
    console.log(req.body);
});

router.post('/newUserData',function(req,res){
    var username = req.body.username;
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
   // save to mongodb
    res.redirect('/createUser');

});
router.get('/createUser',function(req,res){
    res.render('createUser',{title: 'Successfully created'});
    console.log(req.query.name);
});

router.get('/registerGroup',function(req,res){
    res.render('registerGroup',{title: 'Successfully created'});
     // request.post(
    //     'http://URL/sendLocation',
    //     { json: { key: req.username  } },
    //     function (error, response, body) {
    //         if (!error && response.statusCode == 200) {
    //             console.log(body)
    //         }
    //     }
    // );
    console.log(req.query.name);
});

router.get('/map',function(req,res) {
   res.render('map' , {title: 'location',locations:'[[37.774929, -122.419416],[37.774929, -120.419416]]'});

});