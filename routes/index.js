var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var csrf = require('csurf');
var passport = require('passport');

router.use('/user', require('./user'))
router.use('/shopping', require('./shopping'))


var csrfProtection = csrf();
router.use(csrfProtection);

/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find({},function(err, product) {
    res.render('shop/index', { 
      product: product

    });
    
  })

  console.log("hi im here");
});
router.post('/sign_up', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/sign_up',
    failureFlash: true,
  }));


router.get('/hello', function(req,res,next){
  res.json(req.body);
})


module.exports = router;


