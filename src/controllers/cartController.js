const cartModel = require('../model/cartModel')

//-------------------------------------------[ CART APIS ]-----------------------------------------------//

const addToCart = async function (req, res) {
    try {
        let data = req.body
        let totalItems = data.totalItems

        totalItems = data.items.length

        let q = {
            ...data,
            totalItems
        }

        let savedData = await cartModel.create(q)
        res.status(201).send({ status: true, data: savedData })

    } catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}

//----------------------------------------[ UPDATE CART APIS ]-------------------------------------------//

const updateCart = async function (req, res) {
    try {
        let data = req.body
        let cartId = req.params.cartId
        let items = data.items

        let totalItems = data.totalItems
        totalItems = data.items.length

        let updatedData = await cartModel.findOneAndUpdate(
            { _id: cartId },
            {
                $set: {
                    items: items,
                    totalItems: totalItems
                }
            },
            { new: true }
        )

        res.status(200).send({ status: true, data: updatedData })

    } catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}

//----------------------------------------[ LIST CART APIS ]-------------------------------------------//

const getCart = async function (req, res) {
    try {
        let cartId = req.params.cartId

        let cartData = await cartModel.findById(cartId).populate('items.productId')

        if (!cartData) {
            return res.status(404).send({ status: false, msg: "Cart Data Not Found!" })
        }

        res.status(200).send({ status: true, data: cartData })


    } catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }

}

module.exports = { addToCart, updateCart, getCart }