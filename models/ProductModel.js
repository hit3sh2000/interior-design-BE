const mongoose = require('mongoose');  //importing mongoose
const bcrypt = require('bcrypt');       //importing bcrypt

//productSchema for Product
var productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        lowercase: true
    },
    productInfo: {
        type: String,
        required: true,
    },
    productDetails: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    image: [String],
    price: String,
    madeBy: String,
},
    { timestamps: true });
module.exports = mongoose.model('Product', productSchema); //exporting schema
