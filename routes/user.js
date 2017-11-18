var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
//var csrf = require('csurf');

router.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    next();
});
//var csrfProtection = csrf({cookie : false});
//router.use(csrfProtection);


router.get('/signup', function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signup');
});

// router.get('/signup', function (req, res, next){
//     res.render('user/signup', {csrfToken: req.csrfToken()});
//     console.log("user sign up route");
//   });
// router.use(function(req,res,next){
//     res.cookie('XSRF-TOKEN', req.csrfToken());
//     res.locals.csrfToken = req.csrfToken();
// })
router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/',
    failureRedirect: '/user/signup',
    failureFlash: true
}));

router.get('/signin', function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signin', {hasErrors: messages.length > 0, messages: messages});
});

router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: 'user/profile',
    failureRedirect: 'user/signin',
    failureFlash: true
}));

router.get('/logout', function(req, res, next) {
    req.logout();
    return res.redirect('/');
});

router.get('/profile', isLoggedIn, function(req, res, next) {
    res.render('user/profile');
});


module.exports = router;

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}