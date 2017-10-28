var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var productSchema = new Schema({
    imagePath: {type: String},
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number}

});

module.exports = mongoose.model('Product', productSchema);
