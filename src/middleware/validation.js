const { isValidObjectId } = require("mongoose")
const productModel = require("../model/productModel")
const cartModel = require("../model/cartModel")

//===========================================================================================//
//-------------------------------------[ MIDDLEWARE ]----------------------------------------//
//===========================================================================================//

//-----------------------------[ Product Validation Middleware ]-----------------------------//

const productValidation = async function (req, res, next) {
    try {
        let data = req.body
        let { productName, Description, Quantity, unitPrice } = data

        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, msg: "Please Provide Data!" })
        }

        //Product Name Validation
        if (productName) {
            if (typeof productName != 'string') {
                return res.status(400).send({ status: false, msg: "Product Name Is Invalid!" })
            }
        }

        // Description Validation
        if (Description) {
            if (typeof Description != 'string') {
                return res.status(400).send({ status: false, msg: "Description Is Invalid!" })
            }
        }

        // Quantity Validation
        if (Quantity) {
            if (typeof Quantity != 'number') {
                return res.status(400).send({ status: false, msg: "Quantity Is Invalid!" })
            }
        }

        // UnitPrice Validation
        if (unitPrice) {
            if (typeof unitPrice != 'number') {
                return res.status(400).send({ status: false, msg: "UnitPrice Is Invalid!" })
            }
        }

        console.log('MW-product Validation')

    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }

    next()

}

//------------------------------[ Cart Validation Middleware ]------------------------------//

const cartValidation = async function (req, res, next) {
    try {
        let data = req.body
        let items = data.items

        if (items.length === 0) {
            return res.status(400).send({ status: false, msg: "Please Add to Cart First!" })
        }

        for (let i = 0; i < items.length; i++) {
            let productId = items[i].productId
            let quantity = items[i].quantity

            // Product Id Validation

            if (!productId) {
                return res.status(400).send({ status: false, msg: "Please Provide Product Id!" })
            }
            productId = productId.trim()
            if (!isValidObjectId(productId)) {
                return res.status(400).send({ status: false, msg: `index: ${i}, ${productId}: Product Id Is Invalid!` })
            }

            // quantity validation
            if (!quantity || typeof quantity != 'number') {
                return res.status(400).send({ status: false, msg: `index: ${i}, ${quantity}: Quantity Is Invalid!` })
            }

            // DB call for check product
            let checkProduct = await productModel.findById(productId)
            if (!checkProduct) {
                return res.status(404).send({ status: false, msg: `index: ${i}, Product Id:${productId} Product Data Not Found!` })
            }

        }

        console.log('MW-cartValidation')

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }

    next()
}

//-----------------------------[ Cart Id Validation Middleware ]------------------------------//

const cartIdValidation = async function (req, res, next) {
    try {
        let cartId = req.params.cartId

        if (!cartId) {
            return res.status(400).send({ status: false, msg: "Please Provide cart Id" })
        }
        cartId = cartId.trim()
        if (!isValidObjectId(cartId)) {
            return res.status(400).send({ status: false, msg: "Cart Id Is Invalid!" })
        }

        let cartExist = await cartModel.findById(cartId)
        if (!cartExist) {
            return res.status(404).send({ status: false, msg: "Cart Is Not Found!" })
        }

        console.log("MW-cartIdValidation")

    }
    catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }

    next()
}

module.exports = { productValidation, cartValidation, cartIdValidation }