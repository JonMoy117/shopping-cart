var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/shopping');

    var products = [
        new Product({
        imagePath: '525efa6cec574ac2738056b7b4025f6b',
        title: 'Poop',
        description: 'Sk8beoard',
        price: 9001,
    }),
    new Product({
        imagePath: 'bc24d63728cf37e678c498671cae6fec',
        title: 'Poopie Butt',
        description: 'Sk8beoard1',
        price: 1337,
    }),
    new Product({
        imagePath: 'c68d5e300b61854ba5553915c8ed65d0',
        title: 'Poopie ButtWhole',
        description: 'Sk8beoard2',
        price: 666,
    })
    

];

var done = 0;
for( var i=0; i < products.length; i++) {
    products[i].save(function(err, result){ 
        done++;
        if( done === products.length) {
            exit();
        }
    })
};

function exit() {
    mongoose.disconnect();
};

// products[0].title