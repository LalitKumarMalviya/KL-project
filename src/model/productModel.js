const mongoose = require('mongoose');

//-------------------------product Schema-------------------------------//

const productSchema = new mongoose.Schema({

    productName: {
        type: String,
        required: true,
        trim: true
    },

    productImage: {
        type: String,
        trim: true
    },

    Description: {
        type: String,
        required: true,
        trim: true
    },

    Quantity: {
        type: Number,
        default: 0
    },

    UnitPrice: {
        type: Number,
        require: true
    }
    
}, { timestamps: true });

module.exports = new mongoose.model('Product', productSchema)