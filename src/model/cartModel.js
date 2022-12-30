const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const cartSchema = new mongoose.Schema({

    items: [{
        productId: {
            type: ObjectId,
            ref: "Product",
            require: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        _id: false
    }],

    totalItems: {
        type: Number,
        required: true,
    }

}, { timestamps: true })

module.exports = new mongoose.model("Cart", cartSchema)