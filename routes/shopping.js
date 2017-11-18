var express = require('express');
var router = express.Router();
var passport = require('passport');
var csrf = require('csurf');
var Product = require('../models/product');
var multer = require('multer');
var upload = multer({ dest: 'public/uploads/' });
var Cart = require('../models/cart')

router.get('/add_item', function(req, res) {
    //console.log('hi')
    res.render('shop/add_item');
})

router.post('/items/add/newitem', upload.single('imagePath'), function(req, res) {
  console.log(req.file)
  var newProduct = new Product() 
  newProduct.title = req.body.title
  newProduct.description = req.body.description
  newProduct.imagePath = req.file.filename
  newProduct.price = req.body.price
  newProduct.save(function() {
    res.redirect('/')
  })
})

router.post('/:id/add_to_cart', function(req, res) {
  //console.log(req.params.id)
  var cart = new Cart(req.session.cart ? req.session.cart : {} )
  Product.findById(req.params.id, function(err, product) {
      if(err) {
          return res.redirect('./shop/index')
      }
      cart.add(product, product.id)
      req.session.cart = cart;
      console.log(req.session.cart)
      //req.flash('success_messages', 'successfully added card to your cart')
      res.redirect('/')
  })
  
})

router.get('/:id/product_showpage', function(req,res) {
    res.render('./shop/product_showpage')
})


router.get('/checkout', function(req, res) {
    res.render('./shop/checkout');
});

module.exports = router;


// v This is to access the params variable. This only works cause of express
//:id

// underscore id is for accessing mongodb id. 
//_id