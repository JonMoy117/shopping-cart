var express = require('express');
var router = express.Router();
var passport = require('passport');
var csrf = require('csurf');
var multer = require('multer');
var upload = multer({ dest: 'public/uploads/' });


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

  router.get('/shopping/checkout', function(req, res) {
    res.render('./shop/checkout');
  });

  module.exports = router;