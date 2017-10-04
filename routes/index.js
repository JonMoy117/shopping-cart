var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var multer = require('multer');
var upload = multer({ dest: 'public/uploads/' });
var sass = require('node-sass');

sass.render({
  file: "style.css"
}, function(err, result) {  });


/* GET home page. */
router.get('/', function(req, res, next) {
  Product.find({}, function(err, product) {
    res.render('shop/index', { 
      product: product
    });
    
  })
});

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


