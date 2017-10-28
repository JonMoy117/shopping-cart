var express = require('express');
var router = express.Router();
var passport = require('passport');
var csrf = require('csurf');

router.use(function (req, res, next) {
    res.locals.login = req.isAuthenticated();
    next();
});

router.get('/sign_up', function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signup', {hasErrors: messages.length > 0, messages: messages});
});

router.post('/sign_up', passport.authenticate('local.signup', {
    successRedirect: '/signup',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/signin', function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signin', {hasErrors: messages.length > 0, messages: messages});
});

router.post('/signin', passport.authenticate('local.signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
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