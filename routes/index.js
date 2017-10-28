var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var multer = require('multer');
var upload = multer({ dest: 'public/uploads/' });
var csrf = require('csurf');
var passport = require('passport');


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

router.get('user/sign_up', function (req, res, next){
  res.render('user/signup', {csrfToken: req.csrfToken()});
  console.log("user sign up route");
});

router.post('/sign_up', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/sign_up',
    failureFlash: true,
  }));

router.get('user/profile', function(req, res, next){
  res.render('user/profile');
});

router.get('/hello', function(req,res,next){
  res.json(req.body);
})

router.get('/shopping/items/add', function(req, res) {
  res.render('shop/add_item')
})

router.post('/shopping/items/add/newitem', upload.single('imagePath'), function(req, res) {
  var newProduct = new Product() 
  newProduct.title = req.body.title
  newProduct.description = req.body.description
  newProduct.imagePath = req.file.filename
  newProduct.price = req.body.price
  newProduct.save(function() {
    res.redirect('/')
  })
})

router.get('/shopping/items/:id', function(req, res) {
  Product.findOne({_id: req.params.id}, function(err, product) {
    res.render('./shop/product_showpage', {
      product: product
    })
  })
})

router.get('/shopping/checkout', function(req, res) {
  res.render('./shop/checkout');
});

module.exports = router;


