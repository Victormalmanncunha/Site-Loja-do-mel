const mongoose = require('mongoose')

const Product = mongoose.model('Product', {
    name: String,
    price: Number,
    image: String,
})

module.exports = Product